"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shipment } from "@/types";
import { SEED_AGENTS } from "@/constants/seedData";
import {
  Search,
  Plus,
  Printer,
  FileSpreadsheet,
  Package,
  Store,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export default function ManifiestoEnviosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState("todos");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadShipments = async (q = "", agent = "todos") => {
    setLoading(true);
    try {
      const url = `/api/envios?q=${encodeURIComponent(q)}&agentId=${encodeURIComponent(agent)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setShipments(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadShipments(searchQuery, agentFilter);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, agentFilter]);

  // Exportar manifiesto del camión a Excel / CSV con UTF-8 BOM
  const handleExportCSV = () => {
    if (shipments.length === 0) {
      alert("No hay envíos en la lista para exportar.");
      return;
    }

    const headers = [
      "Número de Caja",
      "Folio",
      "Fecha",
      "Tienda / Agente",
      "Remitente",
      "Tel Remitente",
      "Destinatario",
      "Tel Destinatario 1",
      "Tel Destinatario 2",
      "Dirección México",
      "Colonia",
      "Ciudad",
      "Estado",
      "C.P.",
      "Tipo Entrega",
      "Peso (lbs)",
      "Medidas",
      "Contenido",
      "Flete (USD)",
      "Caja (USD)",
      "Aseguranza (USD)",
      "Total (USD)",
      "Estatus",
    ];

    const rows = shipments.map((s) => [
      `"${s.packageDetails?.boxNumber || s.folio}"`,
      `"${s.folio}"`,
      `"${s.packageDetails?.date || new Date(s.createdAt).toLocaleDateString("es-MX")}"`,
      `"${s.agentName}"`,
      `"${s.sender.fullName}"`,
      `"${s.sender.phone}"`,
      `"${s.recipient.fullName}"`,
      `"${s.recipient.phone}"`,
      `"${s.recipient.phone2 || ""}"`,
      `"${s.recipient.address}"`,
      `"${s.recipient.colonia || ""}"`,
      `"${s.recipient.city}"`,
      `"${s.recipient.state}"`,
      `"${s.recipient.zip}"`,
      `"${s.recipient.deliveryType || "Domicilio"}"`,
      s.packageDetails.weightLbs,
      `"${s.packageDetails.boxSize}"`,
      `"${s.packageDetails.declaredContent.replace(/"/g, '""')}"`,
      s.packageDetails.shippingCostUSD,
      s.packageDetails.boxPriceUSD || 0,
      s.packageDetails.insuranceCostUSD || 0,
      s.packageDetails.totalUSD,
      `"${s.status}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Manifiesto_Ideal_Express_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* HEADER PRINCIPAL */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E5C10]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E283F]">
              CONTROL CENTRAL DE CARGA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#0E283F]">
            Manifiesto y Cajas Registradas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Consulta en tiempo real en SQLite. Busca cajas por número, reimprime comprobantes y genera el manifiesto del camión.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#EBF3DC] hover:bg-[#d8e8c0] text-[#3E5C10] font-bold rounded-xl text-xs uppercase tracking-wider transition border border-[#7BA029]/40 cursor-pointer shadow-xs active:scale-95"
            title="Descargar lista completa en Excel"
          >
            <FileSpreadsheet size={16} />
            <span>Descargar Manifiesto (Excel / CSV)</span>
          </button>

          <Link
            href="/portal/captura"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm active:scale-95"
          >
            <Plus size={16} className="text-[#8FB838]" />
            <span>+ Nueva Captura</span>
          </Link>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Número de Caja (ej. BC-1306), Folio, Remitente, Destinatario, Ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border-2 border-stone-200 focus:border-[#0E283F] rounded-xl bg-[#FAF8F5] focus:outline-hidden font-medium text-slate-900 placeholder:text-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtro por Tienda / Agente */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase shrink-0">
              Tienda:
            </span>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-3 py-2.5 text-xs font-bold border border-stone-300 rounded-xl bg-white text-slate-800"
            >
              <option value="todos">Todas las tiendas</option>
              {SEED_AGENTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.storeName} ({a.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador y Estatus de Base de Datos */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-stone-100">
          <span>
            Mostrando <strong>{shipments.length}</strong> caja(s) registradas en SQLite
          </span>
          <span className="font-mono text-xs text-[#3E5C10] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3E5C10]"></span>
            <span>SQLite Persistente en Disco (/app/data/ideal.db)</span>
          </span>
        </div>
      </div>

      {/* LISTADO DE CAJAS REGISTRADAS */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-stone-200">
            <div className="w-8 h-8 border-3 border-[#0E283F] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-bold">Consultando cajas en la base de datos...</p>
          </div>
        ) : shipments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-stone-200 space-y-3">
            <Package size={40} className="text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              No se encontraron cajas con ese criterio
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Intenta con otro número de caja, folio o nombre de destinatario.
            </p>
          </div>
        ) : (
          shipments.map((s) => {
            const boxCode = s.packageDetails?.boxNumber || s.folio;
            const dateStr = s.packageDetails?.date || new Date(s.createdAt).toLocaleDateString("es-MX");
            const deliveryType = s.recipient.deliveryType || "Domicilio";

            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-all group space-y-4"
              >
                {/* Fila 1: Encabezado de la Caja y Estatus */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    {/* Recuadro de Número de Caja Oficial */}
                    <div className="border-2 border-black px-3.5 py-1 bg-amber-50 rounded-lg font-mono font-black text-lg text-black tracking-wider shadow-2xs">
                      {boxCode}
                    </div>

                    <div>
                      <span className="font-mono text-xs font-bold text-slate-500 block">
                        Folio: {s.folio} · Fecha: {dateStr}
                      </span>
                      <span className="text-xs text-slate-700 flex items-center gap-1 mt-0.5">
                        <Store size={13} className="text-[#7BA029]" />
                        <strong>{s.agentName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {s.status}
                    </span>
                    <span className="font-mono font-black text-xl text-[#0E283F]">
                      ${s.packageDetails.totalUSD?.toFixed(2)}{" "}
                      <span className="text-xs font-normal text-slate-500">USD</span>
                    </span>
                  </div>
                </div>

                {/* Fila 2: Ruta y Datos del Paquete Desanidados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2 text-xs">
                  {/* Remitente */}
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-slate-500 block">
                      Quién Envía (Origen):
                    </span>
                    <strong className="block text-sm text-slate-900">{s.sender.fullName}</strong>
                    <span className="text-slate-600 block">
                      Tel: {s.sender.phone} · {s.sender.city}, {s.sender.state}
                    </span>
                  </div>

                  {/* Destinatario */}
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-slate-500 block">
                      Quién Recibe ({deliveryType}):
                    </span>
                    <strong className="block text-sm text-slate-900">{s.recipient.fullName}</strong>
                    <span className="text-slate-600 block">
                      {s.recipient.city}, {s.recipient.state} · Tel: {s.recipient.phone}
                    </span>
                    <span className="text-xs text-slate-500 block truncate">
                      {s.recipient.address}{s.recipient.colonia ? `, Col. ${s.recipient.colonia}` : ""}
                    </span>
                  </div>

                  {/* Paquete */}
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-slate-500 block">
                      Detalles del Bulto:
                    </span>
                    <strong className="block text-sm font-mono text-[#0E283F]">
                      {s.packageDetails.weightLbs} lbs · {s.packageDetails.boxSize}&quot;
                    </strong>
                    <span className="text-xs text-slate-600 block truncate">
                      {s.packageDetails.declaredContent}
                    </span>
                    {s.packageDetails.hasInsurance && (
                      <span className="text-xs font-bold text-[#3E5C10] block">
                        ✓ Con Aseguranza al 5%
                      </span>
                    )}
                  </div>
                </div>

                {/* Fila 3: Botones de Acción */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                  <div className="text-xs text-slate-500 font-mono">
                    ID Interno: {s.id}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Botón WhatsApp al cliente */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Hola ${s.sender.fullName}, tu caja con número ${boxCode} (Folio ${s.folio}) ha sido registrada en Ideal Express con destino a ${s.recipient.city}, ${s.recipient.state}. Puedes consultar el estatus aquí: https://idealexpress.codesand.online/portal/impresion/${s.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition border border-emerald-200"
                    >
                      <MessageCircle size={14} />
                      <span>Notificar por WhatsApp</span>
                    </a>

                    {/* Botón Reimprimir Hoja 1 y 2 */}
                    <Link
                      href={`/portal/impresion/${s.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-lg text-xs transition shadow-2xs"
                    >
                      <Printer size={14} className="text-[#8FB838]" />
                      <span>Ver / Reimprimir Forma y QR</span>
                      <ExternalLink size={12} className="opacity-70 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
