"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Shipment } from "@/types";
import { INITIAL_SHIPMENTS } from "@/constants/seedData";
import { TARIFF_CONFIG } from "@/constants/config";
import { Printer, ArrowLeft, CheckCircle2, ShieldCheck, QrCode } from "lucide-react";

function ImpresionEnvioContent() {
  const params = useParams();
  const router = useRouter();
  const shipmentId = params?.id as string;

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShipment() {
      try {
        const res = await fetch(`/api/envios?id=${encodeURIComponent(shipmentId)}`);
        const json = await res.json();
        if (json.success && json.data) {
          setShipment(json.data);
        } else {
          setShipment(INITIAL_SHIPMENTS[0]);
        }
      } catch (err) {
        console.error(err);
        setShipment(INITIAL_SHIPMENTS[0]);
      } finally {
        setLoading(false);
      }
    }
    loadShipment();
  }, [shipmentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-slate-600">
        Cargando formato de impresión...
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
        <p className="text-slate-800 font-bold">No se encontró la información del envío.</p>
        <button
          onClick={() => router.push("/portal/captura")}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          Volver a Captura
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-200 min-h-screen py-8 print:py-0 print:bg-white text-slate-900 font-sans">
      {/* BARRA FLOTANTE DE ACCIONES (SE OCULTA AL IMPRIMIR) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/portal/captura")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
            >
              <ArrowLeft size={16} />
              <span>Volver a Captura</span>
            </button>
            <div>
              <strong className="text-xs sm:text-sm text-slate-900 block">
                Envío Registrado: {shipment.folio}
              </strong>
              <span className="text-[11px] text-slate-500">
                Se generarán 2 páginas tamaño carta (Hoja 1: Cliente, Hoja 2: Caja).
              </span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-95"
          >
            <Printer size={18} />
            <span>Imprimir Hojas Ahora</span>
          </button>
        </div>
      </div>

      {/* CONTENEDOR DE HOJAS IMPRIMIBLES */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0 print:max-w-none">
        {/* ======================================================== */}
        {/* HOJA 1: COMPROBANTE DEL CLIENTE (FIRMA Y TÉRMINOS) */}
        {/* ======================================================== */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-stone-300 print:border-none print:shadow-none print:p-8 print:rounded-none min-h-[1050px] flex flex-col justify-between print:break-after-page">
          <div className="space-y-6">
            {/* Header con Logo Oficial de la Marca */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <div className="relative h-11 w-48 mb-1">
                  <img
                    src="/logo.png"
                    alt="Ideal Express Logo Oficial"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block">
                  Encomiendas y Paquetería a todo México
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bodega Matriz: {TARIFF_CONFIG.mainOfficeAddress} · Tel: (414) 763-8705
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Copia para el Cliente
                </span>
                <span className="text-xl font-mono font-black text-slate-900 block">
                  {shipment.folio}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Fecha: {new Date(shipment.createdAt).toLocaleDateString("es-MX", { dateStyle: "long" })}
                </span>
              </div>
            </div>

            {/* Agente Receptor */}
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs flex justify-between">
              <div>
                <span className="text-slate-500 font-semibold">Agente Receptor: </span>
                <strong className="text-slate-900">{shipment.agentName}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Plazo Estipulado: </span>
                <strong className="text-orange-700">{TARIFF_CONFIG.deliveryWindowDays}</strong>
              </div>
            </div>

            {/* Datos de Remitente y Destinatario */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="border border-stone-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block border-b border-stone-200 pb-1">
                  1. Remitente (EE.UU.)
                </span>
                <p className="font-bold text-sm text-slate-900">{shipment.sender.fullName}</p>
                <p className="text-slate-600">{shipment.sender.address}</p>
                <p className="text-slate-700 font-medium">Tel: {shipment.sender.phone}</p>
              </div>

              <div className="border border-stone-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block border-b border-stone-200 pb-1">
                  2. Destinatario (México)
                </span>
                <p className="font-bold text-sm text-slate-900">{shipment.recipient.fullName}</p>
                <p className="text-slate-600">{shipment.recipient.address}</p>
                <p className="text-slate-800 font-semibold">
                  {shipment.recipient.city}, {shipment.recipient.state} C.P. {shipment.recipient.zip}
                </p>
                <p className="text-slate-700 font-medium">Tel: {shipment.recipient.phone}</p>
                {shipment.recipient.references && (
                  <p className="text-[11px] text-slate-500 italic">
                    Ref: {shipment.recipient.references}
                  </p>
                )}
              </div>
            </div>

            {/* Detalle del Paquete */}
            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-100 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5">Descripción de Contenido</th>
                    <th className="p-2.5 text-center">Medida</th>
                    <th className="p-2.5 text-center">Peso</th>
                    <th className="p-2.5 text-right">Tarifa / lb</th>
                    <th className="p-2.5 text-right">Importe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-2.5">
                      <strong>{shipment.packageDetails.declaredContent}</strong>
                    </td>
                    <td className="p-2.5 text-center font-mono">
                      {shipment.packageDetails.boxSize}&quot;
                    </td>
                    <td className="p-2.5 text-center font-bold">
                      {shipment.packageDetails.weightLbs} lbs
                    </td>
                    <td className="p-2.5 text-right">${TARIFF_CONFIG.pricePerPound} USD</td>
                    <td className="p-2.5 text-right font-medium">
                      ${shipment.packageDetails.shippingCostUSD.toFixed(2)} USD
                    </td>
                  </tr>
                  {shipment.packageDetails.hasInsurance && (
                    <tr className="bg-stone-50">
                      <td colSpan={4} className="p-2.5 text-slate-700">
                        Seguro de Envío (Valor declarado: ${shipment.packageDetails.declaredValueUSD} USD)
                      </td>
                      <td className="p-2.5 text-right font-medium text-emerald-800">
                        +${shipment.packageDetails.insuranceCostUSD.toFixed(2)} USD
                      </td>
                    </tr>
                  )}
                  <tr className="bg-stone-100 font-bold text-sm">
                    <td colSpan={4} className="p-3 text-right uppercase tracking-wider text-slate-800">
                      Total Pagado en Tienda:
                    </td>
                    <td className="p-3 text-right text-orange-600 font-black text-base">
                      ${shipment.packageDetails.totalUSD.toFixed(2)} USD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Términos y Condiciones */}
            <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/60 text-[10px] text-slate-600 leading-normal space-y-1">
              <strong className="text-slate-800 block text-[11px]">Términos del Servicio y Póliza:</strong>
              <p>
                1. <strong>Plazo de Entrega:</strong> El tiempo regular de tránsito es de 2 a 3 semanas a partir de la recepción en bodega central, sujeto a inspecciones de la autoridad aduanera.
              </p>
              <p>
                2. <strong>Contenido Declarado:</strong> El remitente manifiesta bajo protesta de decir verdad que este bulto no contiene armas, explosivos, drogas, dinero en efectivo ni artículos prohibidos.
              </p>
              <p>
                3. <strong>Reclamaciones:</strong> Cualquier anomalía debe reportarse dentro de las 24 horas siguientes a la recepción con el comprobante original.
              </p>
            </div>
          </div>

          {/* Firma del Cliente */}
          <div className="pt-8 border-t border-stone-200 mt-6 grid grid-cols-2 gap-8 items-end text-xs">
            <div>
              <p className="text-[11px] text-slate-500 mb-1">
                Acepto los términos, condiciones y plazo de 2 a 3 semanas estipulado:
              </p>
              <div className="border-b-2 border-slate-900 h-14"></div>
              <p className="text-center font-bold text-slate-800 mt-1">
                Firma de Conformidad del Remitente
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-500 space-y-1">
              <p>Conserve este recibo para cualquier aclaración o seguimiento.</p>
              <p>Atención al cliente: <strong>{TARIFF_CONFIG.whatsappDisplay}</strong></p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HOJA 2: ETIQUETA ADHESIVA PARA LA CAJA (CON QR) */}
        {/* ======================================================== */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-stone-300 print:border-none print:shadow-none print:p-8 print:rounded-none min-h-[1050px] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-4 border-slate-950 p-4 rounded-xl flex items-center justify-between bg-stone-100">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Ideal Express"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <span className="text-[11px] font-black tracking-widest uppercase text-slate-600 block">
                    ETIQUETA DE CONTROL LOGÍSTICO Y CRUCE
                  </span>
                  <span className="text-3xl font-mono font-black text-slate-950 tracking-tight">
                    {shipment.folio}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block">Bulto: 1 de 1</span>
                <span className="text-lg font-black text-[#1E3A5F] block">
                  {shipment.packageDetails.weightLbs} LBS
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {shipment.packageDetails.boxSize}&quot;
                </span>
              </div>
            </div>

            {/* DESTINO EN GRANDE */}
            <div className="bg-slate-950 text-white p-6 rounded-2xl space-y-1 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                DESTINO FINAL MÉXICO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                {shipment.recipient.city}, {shipment.recipient.state}
              </h2>
              <span className="text-lg font-mono font-bold text-slate-300 block">
                C.P. {shipment.recipient.zip}
              </span>
            </div>

            {/* DATOS COMPLETOS DE ENTREGA */}
            <div className="border-2 border-stone-300 rounded-2xl p-6 space-y-4 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Recibe en Domicilio:
                </span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {shipment.recipient.fullName}
                </p>
                <p className="text-base font-bold text-slate-800 mt-1">
                  Teléfono: {shipment.recipient.phone}
                </p>
              </div>

              <div className="border-t border-stone-200 pt-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Dirección de Entrega:
                </span>
                <p className="text-lg font-bold text-slate-900 leading-snug">
                  {shipment.recipient.address}
                </p>
                <p className="text-base text-slate-800">
                  {shipment.recipient.city}, {shipment.recipient.state} · C.P. {shipment.recipient.zip}
                </p>
                {shipment.recipient.references && (
                  <p className="text-xs text-slate-600 bg-stone-100 p-2.5 rounded-lg mt-2 font-medium">
                    <strong>Referencias:</strong> {shipment.recipient.references}
                  </p>
                )}
              </div>
            </div>

            {/* Remitente y Origen */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Remitente (Origen):
                </span>
                <p className="font-bold text-slate-900">{shipment.sender.fullName}</p>
                <p className="text-slate-600">{shipment.sender.city}, {shipment.sender.state}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tienda de Recepción:
                </span>
                <p className="font-bold text-slate-900">{shipment.agentName}</p>
                <p className="text-slate-600">ID: {shipment.agentId}</p>
              </div>
            </div>
          </div>

          {/* CÓDIGO QR */}
          <div className="pt-6 border-t-2 border-dashed border-stone-300 mt-6 flex items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-slate-900 block">
                CONTROL DE CRUCE ADUANAL LAREDO
              </span>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Escaneo obligatorio en descarga de camión en Milwaukee y cruce en bodega Texas.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-600 font-bold">
                <span>[BARCODE: {shipment.folio.replace(/-/g, "")}]</span>
              </div>
            </div>

            <div className="border-4 border-slate-950 p-3 rounded-2xl bg-white shadow-sm flex flex-col items-center shrink-0">
              <div className="w-28 h-28 bg-slate-950 text-white flex flex-col items-center justify-center rounded-lg p-2 relative overflow-hidden">
                <QrCode size={90} className="text-white" />
              </div>
              <span className="text-[10px] font-mono font-bold mt-1 text-slate-800">
                {shipment.folio}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImpresionEnvioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-6 text-slate-600">
          Cargando formato de impresión...
        </div>
      }
    >
      <ImpresionEnvioContent />
    </Suspense>
  );
}
