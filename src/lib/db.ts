import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { Client, Recipient, Shipment } from "@/types";
import { SEED_CLIENTS, INITIAL_SHIPMENTS } from "@/constants/seedData";

// Singleton para Next.js en desarrollo y producción
const globalForDb = globalThis as unknown as {
  idealDb?: Database.Database;
};

function initDatabase(): Database.Database {
  if (globalForDb.idealDb) {
    return globalForDb.idealDb;
  }

  // Carpeta data/ en la raíz del proyecto
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "ideal.db");
  const db = new Database(dbPath);

  // Modo WAL para máximo rendimiento concurrente (Google standard)
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");

  // Tabla 1: Clientes y Remitentes (Historial y Autocompletado)
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      phone_clean TEXT NOT NULL,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      recipients_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_clientes_phone_clean ON clientes(phone_clean);
    CREATE INDEX IF NOT EXISTS idx_clientes_full_name ON clientes(full_name);
  `);

  // Tabla 2: Envíos y Cajas (Manifiesto de Carga y Estatus)
  db.exec(`
    CREATE TABLE IF NOT EXISTS envios (
      id TEXT PRIMARY KEY,
      folio TEXT NOT NULL UNIQUE,
      box_number TEXT NOT NULL,
      agent_id TEXT NOT NULL,
      agent_name TEXT NOT NULL,
      date TEXT NOT NULL,
      sender_name TEXT NOT NULL,
      sender_phone TEXT NOT NULL,
      sender_json TEXT NOT NULL,
      recipient_name TEXT NOT NULL,
      recipient_city TEXT NOT NULL,
      recipient_state TEXT NOT NULL,
      recipient_phone TEXT NOT NULL,
      recipient_json TEXT NOT NULL,
      delivery_type TEXT NOT NULL,
      service_type TEXT NOT NULL,
      weight_lbs REAL NOT NULL,
      box_size TEXT NOT NULL,
      declared_content TEXT NOT NULL,
      shipping_cost_usd REAL NOT NULL,
      box_price_usd REAL DEFAULT 0,
      insurance_cost_usd REAL DEFAULT 0,
      tv_price_usd REAL DEFAULT 0,
      discount_usd REAL DEFAULT 0,
      total_usd REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'Recibido en Tienda',
      package_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_envios_folio ON envios(folio);
    CREATE INDEX IF NOT EXISTS idx_envios_box_number ON envios(box_number);
    CREATE INDEX IF NOT EXISTS idx_envios_created_at ON envios(created_at);
  `);

  // Semilla inicial si la base de datos está vacía
  const clientCount = db.prepare("SELECT COUNT(*) as count FROM clientes").get() as { count: number };
  if (clientCount.count === 0) {
    const insertClient = db.prepare(`
      INSERT INTO clientes (id, full_name, phone, phone_clean, street, city, state, zip, recipients_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const c of SEED_CLIENTS) {
      const clean = c.phone.replace(/\D/g, "");
      insertClient.run(
        c.id,
        c.fullName,
        c.phone,
        clean,
        c.street,
        c.city,
        c.state,
        c.zip,
        JSON.stringify(c.recipients)
      );
    }
  }

  const shipmentCount = db.prepare("SELECT COUNT(*) as count FROM envios").get() as { count: number };
  if (shipmentCount.count === 0) {
    const insertShipment = db.prepare(`
      INSERT INTO envios (
        id, folio, box_number, agent_id, agent_name, date,
        sender_name, sender_phone, sender_json,
        recipient_name, recipient_city, recipient_state, recipient_phone, recipient_json,
        delivery_type, service_type, weight_lbs, box_size, declared_content,
        shipping_cost_usd, box_price_usd, insurance_cost_usd, tv_price_usd, discount_usd,
        total_usd, status, package_json, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `);

    for (const s of INITIAL_SHIPMENTS) {
      insertShipment.run(
        s.id,
        s.folio,
        s.packageDetails?.boxNumber || s.folio,
        s.agentId,
        s.agentName,
        s.packageDetails?.date || new Date(s.createdAt).toLocaleDateString("es-MX"),
        s.sender.fullName,
        s.sender.phone,
        JSON.stringify(s.sender),
        s.recipient.fullName,
        s.recipient.city,
        s.recipient.state,
        s.recipient.phone,
        JSON.stringify(s.recipient),
        s.recipient.deliveryType || "Domicilio",
        s.packageDetails.serviceType || "Regular",
        s.packageDetails.weightLbs,
        s.packageDetails.boxSize,
        s.packageDetails.declaredContent,
        s.packageDetails.shippingCostUSD,
        s.packageDetails.boxPriceUSD || 0,
        s.packageDetails.insuranceCostUSD || 0,
        s.packageDetails.tvPriceUSD || 0,
        s.packageDetails.discountUSD || 0,
        s.packageDetails.totalUSD,
        s.status,
        JSON.stringify(s.packageDetails),
        s.createdAt
      );
    }
  }

  globalForDb.idealDb = db;
  return db;
}

export const getDb = () => initDatabase();

// ==========================================
// MÉTODOS DE NEGOCIO PARA CLIENTES Y ENVÍOS
// ==========================================

export function searchClientsFromDb(query: string): Client[] {
  const db = getDb();
  const q = query.trim().toLowerCase();
  const cleanPhone = q.replace(/\D/g, "");

  let rows: Array<{
    id: string;
    full_name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    recipients_json: string;
  }> = [];

  if (!q) {
    rows = db.prepare("SELECT * FROM clientes ORDER BY updated_at DESC LIMIT 6").all() as typeof rows;
  } else {
    rows = db
      .prepare(
        `SELECT * FROM clientes
         WHERE LOWER(full_name) LIKE ? OR (length(?) >= 2 AND phone_clean LIKE ?)
         ORDER BY updated_at DESC
         LIMIT 8`
      )
      .all(`%${q}%`, cleanPhone, `%${cleanPhone}%`) as typeof rows;
  }

  return rows.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    street: r.street,
    city: r.city,
    state: r.state,
    zip: r.zip,
    recipients: JSON.parse(r.recipients_json || "[]") as Recipient[],
  }));
}

export function upsertClientAndRecipient(
  sender: { fullName: string; phone: string; address: string; city: string; state: string; zip: string },
  recipient: Recipient
) {
  const db = getDb();
  const cleanPhone = sender.phone.replace(/\D/g, "");
  if (!cleanPhone && !sender.fullName) return;

  const existing = db
    .prepare("SELECT * FROM clientes WHERE phone_clean = ? OR LOWER(full_name) = ?")
    .get(cleanPhone, sender.fullName.toLowerCase()) as
    | { id: string; recipients_json: string }
    | undefined;

  if (existing) {
    // Actualizar cliente y agregar/actualizar destinatario
    let recipients: Recipient[] = [];
    try {
      recipients = JSON.parse(existing.recipients_json || "[]");
    } catch {
      recipients = [];
    }

    // Comprobar si este destinatario ya existía
    const existingRecIdx = recipients.findIndex(
      (r) =>
        r.fullName.toLowerCase().trim() === recipient.fullName.toLowerCase().trim() ||
        (r.phone && recipient.phone && r.phone.replace(/\D/g, "") === recipient.phone.replace(/\D/g, ""))
    );

    if (existingRecIdx >= 0) {
      recipients[existingRecIdx] = { ...recipients[existingRecIdx], ...recipient };
    } else {
      recipients.unshift(recipient); // Poner al inicio de la lista
    }

    db.prepare(`
      UPDATE clientes
      SET full_name = ?, phone = ?, street = ?, city = ?, state = ?, zip = ?, recipients_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      sender.fullName,
      sender.phone,
      sender.address,
      sender.city,
      sender.state,
      sender.zip,
      JSON.stringify(recipients.slice(0, 10)), // Guardar hasta 10 destinatarios frecuentes
      existing.id
    );
  } else {
    // Insertar nuevo cliente
    const newId = `CLI-${Date.now().toString().slice(-6)}`;
    const recipients = [recipient];

    db.prepare(`
      INSERT INTO clientes (id, full_name, phone, phone_clean, street, city, state, zip, recipients_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newId,
      sender.fullName,
      sender.phone,
      cleanPhone,
      sender.address,
      sender.city,
      sender.state,
      sender.zip,
      JSON.stringify(recipients)
    );
  }
}

export function saveShipmentToDb(shipment: Shipment) {
  const db = getDb();
  const boxNumber = shipment.packageDetails?.boxNumber || shipment.folio;
  const dateStr = shipment.packageDetails?.date || new Date().toLocaleDateString("es-MX");

  db.prepare(`
    INSERT OR REPLACE INTO envios (
      id, folio, box_number, agent_id, agent_name, date,
      sender_name, sender_phone, sender_json,
      recipient_name, recipient_city, recipient_state, recipient_phone, recipient_json,
      delivery_type, service_type, weight_lbs, box_size, declared_content,
      shipping_cost_usd, box_price_usd, insurance_cost_usd, tv_price_usd, discount_usd,
      total_usd, status, package_json, created_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    shipment.id,
    shipment.folio,
    boxNumber,
    shipment.agentId,
    shipment.agentName,
    dateStr,
    shipment.sender.fullName,
    shipment.sender.phone,
    JSON.stringify(shipment.sender),
    shipment.recipient.fullName,
    shipment.recipient.city,
    shipment.recipient.state,
    shipment.recipient.phone,
    JSON.stringify(shipment.recipient),
    shipment.recipient.deliveryType || "Domicilio",
    shipment.packageDetails.serviceType || "Regular",
    shipment.packageDetails.weightLbs,
    shipment.packageDetails.boxSize,
    shipment.packageDetails.declaredContent,
    shipment.packageDetails.shippingCostUSD,
    shipment.packageDetails.boxPriceUSD || 0,
    shipment.packageDetails.insuranceCostUSD || 0,
    shipment.packageDetails.tvPriceUSD || 0,
    shipment.packageDetails.discountUSD || 0,
    shipment.packageDetails.totalUSD,
    shipment.status || "Recibido en Tienda",
    JSON.stringify(shipment.packageDetails),
    shipment.createdAt || new Date().toISOString()
  );

  // Aprendizaje automático: sincronizar cliente y destinatario en el historial
  const rec: Recipient = {
    ...shipment.recipient,
    street: shipment.recipient.address || "",
    colonia: shipment.recipient.colonia || "",
  };
  upsertClientAndRecipient(shipment.sender, rec);
}

export function getShipmentFromDb(idOrFolioOrBox: string): Shipment | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT * FROM envios
       WHERE id = ? OR folio = ? OR box_number = ?
       LIMIT 1`
    )
    .get(idOrFolioOrBox, idOrFolioOrBox, idOrFolioOrBox) as
    | {
        id: string;
        folio: string;
        box_number: string;
        agent_id: string;
        agent_name: string;
        sender_json: string;
        recipient_json: string;
        package_json: string;
        status: Shipment["status"];
        created_at: string;
      }
    | undefined;

  if (!row) return null;

  return {
    id: row.id,
    folio: row.folio,
    createdAt: row.created_at,
    agentId: row.agent_id,
    agentName: row.agent_name,
    sender: JSON.parse(row.sender_json),
    recipient: JSON.parse(row.recipient_json),
    packageDetails: JSON.parse(row.package_json),
    status: row.status,
  };
}

export function getAllShipmentsFromDb(query?: string, agentId?: string): Shipment[] {
  const db = getDb();
  let sql = `SELECT * FROM envios WHERE 1=1`;
  const params: unknown[] = [];

  if (agentId && agentId !== "todos") {
    sql += ` AND agent_id = ?`;
    params.push(agentId);
  }

  if (query && query.trim()) {
    const q = `%${query.trim().toLowerCase()}%`;
    sql += ` AND (
      LOWER(box_number) LIKE ? OR
      LOWER(folio) LIKE ? OR
      LOWER(sender_name) LIKE ? OR
      LOWER(recipient_name) LIKE ? OR
      LOWER(recipient_city) LIKE ? OR
      LOWER(recipient_state) LIKE ?
    )`;
    params.push(q, q, q, q, q, q);
  }

  sql += ` ORDER BY created_at DESC LIMIT 100`;

  const rows = db.prepare(sql).all(...params) as Array<{
    id: string;
    folio: string;
    box_number: string;
    agent_id: string;
    agent_name: string;
    sender_json: string;
    recipient_json: string;
    package_json: string;
    status: Shipment["status"];
    created_at: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    folio: row.folio,
    createdAt: row.created_at,
    agentId: row.agent_id,
    agentName: row.agent_name,
    sender: JSON.parse(row.sender_json),
    recipient: JSON.parse(row.recipient_json),
    packageDetails: JSON.parse(row.package_json),
    status: row.status,
  }));
}
