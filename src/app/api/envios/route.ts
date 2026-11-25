import { NextRequest, NextResponse } from "next/server";
import { Shipment } from "@/types";
import { saveShipmentToDb, getShipmentFromDb, getAllShipmentsFromDb } from "@/lib/db";

// GET: Consultar un envío específico o buscar en el manifiesto general
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const q = searchParams.get("q") || undefined;
    const agentId = searchParams.get("agentId") || undefined;

    if (id) {
      const shipment = getShipmentFromDb(id);
      if (!shipment) {
        return NextResponse.json(
          { success: false, error: "Envío no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: shipment });
    }

    // Listar y filtrar envíos
    const shipments = getAllShipmentsFromDb(q, agentId);
    return NextResponse.json({
      success: true,
      total: shipments.length,
      data: shipments,
    });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "digest" in err && (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw err;
    }
    console.error("Error en GET /api/envios", err);
    return NextResponse.json(
      { success: false, error: "Error al consultar envíos" },
      { status: 500 }
    );
  }
}

// POST: Registrar nueva caja, folio y sincronizar cliente/destinatario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generar folio único secuencial si no viene
    const nextFolioNum = 100 + Math.floor(Math.random() * 900);
    const folio = `IE-2026-B${nextFolioNum}`;
    const id = `SHIP-${Date.now().toString().slice(-6)}`;

    const newShipment: Shipment = {
      id,
      folio,
      createdAt: new Date().toISOString(),
      agentId: body.agentId || "AG-01",
      agentName: body.agentName || "El Correcaminos Multiservicios",
      sender: body.sender,
      recipient: body.recipient,
      packageDetails: {
        ...body.packageDetails,
        boxNumber: body.packageDetails?.boxNumber || `BC-${nextFolioNum}`,
      },
      status: "Recibido en Tienda",
    };

    // Guardar en SQLite y ejecutar Upsert automático en clientes
    saveShipmentToDb(newShipment);

    return NextResponse.json({
      success: true,
      message: "Envío registrado con éxito en la base de datos",
      data: newShipment,
    });
  } catch (err) {
    console.error("Error en POST /api/envios", err);
    return NextResponse.json(
      { success: false, error: "Error al registrar el envío en la base de datos" },
      { status: 400 }
    );
  }
}
