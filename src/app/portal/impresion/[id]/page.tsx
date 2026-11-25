"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Shipment } from "@/types";
import { INITIAL_SHIPMENTS } from "@/constants/seedData";
import { TARIFF_CONFIG } from "@/constants/config";
import { Printer, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { decodeShipmentFromQR, encodeShipmentToQR } from "@/utils/qrPayload";

function ImpresionEnvioContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipmentId = params?.id as string;
  const encodedParam = searchParams.get("d");

  const initialShipment = useMemo(() => {
    if (encodedParam) {
      return decodeShipmentFromQR(encodedParam);
    }
    return null;
  }, [encodedParam]);

  const [shipment, setShipment] = useState<Shipment | null>(initialShipment);
  const [loading, setLoading] = useState(!initialShipment);

  useEffect(() => {
    // Si ya fue reconstruido directamente desde el parámetro QR (?d=...), no se requiere consulta
    if (initialShipment) {
      return;
    }

    // Consulta a la API como respaldo si no viene ?d=
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
  }, [shipmentId, initialShipment]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-slate-600 font-sans">
        Cargando formato oficial de impresión...
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 font-sans">
        <p className="text-slate-800 font-bold">No se encontró la información del envío.</p>
        <button
          onClick={() => router.push("/portal/captura")}
          className="px-4 py-2 bg-[#0E283F] text-white rounded-xl text-xs font-bold"
        >
          Volver a Captura
        </button>
      </div>
    );
  }

  const deliveryType = shipment.recipient.deliveryType || "Domicilio";
  const serviceType = shipment.packageDetails.serviceType || "Regular";
  const boxCode = shipment.packageDetails?.boxNumber || shipment.folio;

  // URL Autónoma Autocontenida (Stateless QR): Contiene todos los datos comprimidos
  const b64Data = encodeShipmentToQR(shipment);
  const qrUrl = `https://idealexpress.codesand.online/portal/impresion/view?d=${encodeURIComponent(b64Data)}`;

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
              <strong className="text-xs sm:text-sm text-slate-900 block font-display">
                Caja Registrada: {boxCode} ({shipment.folio})
              </strong>
              <span className="text-[11px] text-slate-500 font-mono">
                QR Autónomo Autocontenido (Reconstruye la hoja completa en cualquier celular sin base de datos).
              </span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0E283F] hover:bg-[#183D61] text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-95"
          >
            <Printer size={18} className="text-[#8FB838]" />
            <span>Imprimir Hojas Ahora</span>
          </button>
        </div>
      </div>

      {/* CONTENEDOR DE HOJAS IMPRIMIBLES */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0 print:max-w-none">
        {/* ======================================================== */}
        {/* HOJA 1: FORMA DE ENVÍO OFICIAL (IDÉNTICA AL FORMATO FÍSICO) */}
        {/* ======================================================== */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md border border-stone-300 print:border-none print:shadow-none print:p-6 print:rounded-none min-h-[1050px] flex flex-col justify-between print:break-after-page text-xs leading-tight">
          <div className="space-y-4">
            {/* Header Oficial con Barra Azul y Logo */}
            <div className="bg-[#0E283F] text-white p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Ideal Express Paquetería"
                  width={140}
                  height={36}
                  unoptimized
                  priority
                  className="h-9 w-auto object-contain bg-white p-1 rounded"
                />
                <div>
                  <span className="font-display font-black text-lg tracking-wider block">
                    IDEALEXPRESS
                  </span>
                  <span className="font-mono text-xs tracking-widest text-[#8FB838] uppercase block">
                    PAQUETERIA
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-300">
                Milwaukee, WI · Tel: (414) 763-8705
              </span>
            </div>

            {/* Título y Número de Caja */}
            <div className="flex items-end justify-between border-b-2 border-black pb-2 pt-1">
              <div>
                <h1 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                  FORMA DE ENVÍO
                </h1>
              </div>

              {/* Recuadro Negro Oficial de NÚMERO DE CAJA y QR del Cliente */}
              <div className="flex items-center gap-3">
                <div className="border border-stone-300 p-1 bg-white rounded shadow-2xs print:border-black">
                  <QRCodeSVG
                    value={qrUrl}
                    size={46}
                    level="L"
                    marginSize={0}
                  />
                </div>

                <div>
                  <span className="font-mono font-bold text-xs uppercase tracking-wider block text-right">
                    NÚMERO DE CAJA:
                  </span>
                  <div className="border-3 border-black px-4 py-1.5 font-mono font-black text-xl bg-stone-50 rounded text-center">
                    {boxCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Fila Oficial de Agente y Fecha exactamente como en la hoja física */}
            <div className="grid grid-cols-12 gap-4 pb-2 border-b border-black font-mono text-xs">
              <div className="col-span-8 flex items-baseline gap-2">
                <span className="font-bold text-black uppercase shrink-0">Agente:</span>
                <span className="border-b border-stone-400 flex-1 pl-1 font-bold text-slate-900">
                  {shipment.agentName}
                </span>
              </div>
              <div className="col-span-4 flex items-baseline gap-2">
                <span className="font-bold text-black uppercase shrink-0">Fecha:</span>
                <span className="border-b border-stone-400 flex-1 pl-1 font-bold text-slate-900">
                  {shipment.packageDetails?.date || new Date(shipment.createdAt).toLocaleDateString("es-MX")}
                </span>
              </div>
            </div>

            {/* 1. QUIÉN ENVÍA */}
            <div className="border border-stone-300 rounded-lg p-3 space-y-1.5 bg-stone-50/50">
              <strong className="text-xs uppercase font-display font-bold block text-slate-900 border-b border-stone-200 pb-1">
                Quién Envía:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">Nombre y Apellido(s): </span>
                  <strong className="text-slate-900">{shipment.sender.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Teléfono: </span>
                  <span className="font-mono font-bold text-slate-900">{shipment.sender.phone}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-semibold">Dirección: </span>
                  <span>{shipment.sender.address}, {shipment.sender.city}, {shipment.sender.state} C.P. {shipment.sender.zip}</span>
                </div>
              </div>
            </div>

            {/* 2. QUIÉN RECIBE */}
            <div className="border border-stone-300 rounded-lg p-3 space-y-2 bg-stone-50/50">
              <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                <strong className="text-xs uppercase font-display font-bold block text-slate-900">
                  Quién Recibe:
                </strong>

                {/* Casillas de Recibe En */}
                <div className="flex items-center gap-4 text-xs font-bold font-mono">
                  <span>Recibe En:</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3.5 h-3.5 border-2 border-black text-center leading-2.5 text-[10px]">
                      {deliveryType === "Domicilio" ? "X" : ""}
                    </span>
                    <span>Domicilio</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3.5 h-3.5 border-2 border-black text-center leading-2.5 text-[10px]">
                      {deliveryType === "Oficina de Estafeta" ? "X" : ""}
                    </span>
                    <span>Oficina de Estafeta</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">Nombre y Apellido(s): </span>
                  <strong className="text-slate-900 font-bold">{shipment.recipient.fullName}</strong>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-slate-500 font-semibold">Teléfono 1: </span>
                    <span className="font-mono font-bold text-slate-900">{shipment.recipient.phone}</span>
                  </div>
                  {shipment.recipient.phone2 && (
                    <div>
                      <span className="text-slate-500 font-semibold">Teléfono 2: </span>
                      <span className="font-mono font-bold text-slate-900">{shipment.recipient.phone2}</span>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-semibold">Dirección: </span>
                  <span>{shipment.recipient.address}</span>
                  {shipment.recipient.colonia && (
                    <span>, Col. <strong>{shipment.recipient.colonia}</strong></span>
                  )}
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-4">
                  <div>
                    <span className="text-slate-500 font-semibold">Ciudad/Municipio: </span>
                    <strong>{shipment.recipient.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Estado: </span>
                    <strong>{shipment.recipient.state}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Código Postal: </span>
                    <strong className="font-mono">{shipment.recipient.zip}</strong>
                  </div>
                </div>
                {shipment.recipient.references && (
                  <div className="sm:col-span-2 text-[11px] text-slate-600 italic">
                    <strong>Referencias:</strong> {shipment.recipient.references}
                  </div>
                )}
              </div>
            </div>

            {/* 3. TABLA DE PAQUETE Y COSTOS (FORMATO FÍSICO EXACTO) */}
            <div className="grid grid-cols-1 md:grid-cols-12 border-2 border-black rounded-lg overflow-hidden text-xs">
              {/* Lado izquierdo: Paquete y Aseguranza */}
              <div className="md:col-span-7 p-3 border-b md:border-b-0 md:border-r border-black space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 font-bold">
                  <span className="uppercase font-mono">Envío:</span>
                  <div className="flex gap-3 font-mono text-[11px]">
                    <span>[ {serviceType === "Regular" ? "X" : " "} ] Regular</span>
                    <span>[ {serviceType === "Plus" ? "X" : " "} ] Plus</span>
                    <span>[ {serviceType === "Express" ? "X" : " "} ] Express</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 font-semibold">Medidas: </span>
                    <strong className="font-mono">{shipment.packageDetails.boxSize}&quot;</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Peso: </span>
                    <strong className="font-mono">{shipment.packageDetails.weightLbs} lbs</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 font-semibold">Sobrepeso / Tarifa: </span>
                    <span className="font-mono">${TARIFF_CONFIG.pricePerPound} USD / lb</span>
                  </div>
                  {shipment.packageDetails.tvSizeInches && (
                    <div className="col-span-2">
                      <span className="text-slate-500 font-semibold">TV - Tamaño: </span>
                      <strong className="font-mono">{shipment.packageDetails.tvSizeInches}&quot;</strong>
                      <span> = ${shipment.packageDetails.tvPriceUSD?.toFixed(2)} USD</span>
                    </div>
                  )}
                </div>

                {/* Bloque Aseguranza al 5% */}
                <div className="border-t border-stone-200 pt-2 space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="font-mono uppercase">Aseguranza:*</span>
                    <span className="font-mono text-[#3E5C10]">
                      {shipment.packageDetails.hasInsurance
                        ? `Valor: $${shipment.packageDetails.declaredValueUSD} × 5% = $${shipment.packageDetails.insuranceCostUSD.toFixed(2)} USD`
                        : "No contratada"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight italic">
                    *La Aseguranza solo aplica a la Pérdida Total del paquete y solo cubre el contenido del envío declarado al momento de enviar su paquete y del cual el cliente tenga evidencia de compra de este al momento de hacer alguna reclamación, si la misma excede $500. La Aseguranza de Ideal Express NO CUBRE herramientas, electrónicos ni objetos frágiles ni perecederos, ni paquetes mal empacados por el cliente.
                  </p>
                </div>
              </div>

              {/* Lado derecho: Desglose de Costo */}
              <div className="md:col-span-5 p-3 bg-stone-50 flex flex-col justify-between space-y-2">
                <div>
                  <strong className="font-mono font-bold block uppercase border-b border-black pb-1 mb-2 text-slate-900">
                    Costo Paquetería:
                  </strong>
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>Envío / Flete:</span>
                      <strong>${shipment.packageDetails.shippingCostUSD.toFixed(2)}</strong>
                    </div>
                    {Number(shipment.packageDetails.boxPriceUSD || 0) > 0 && (
                      <div className="flex justify-between">
                        <span>Caja:</span>
                        <span>+${Number(shipment.packageDetails.boxPriceUSD).toFixed(2)}</span>
                      </div>
                    )}
                    {shipment.packageDetails.hasInsurance && (
                      <div className="flex justify-between text-emerald-800 font-bold">
                        <span>Aseguranza (5%):</span>
                        <span>+${shipment.packageDetails.insuranceCostUSD.toFixed(2)}</span>
                      </div>
                    )}
                    {Number(shipment.packageDetails.tvPriceUSD || 0) > 0 && (
                      <div className="flex justify-between">
                        <span>TV Especial:</span>
                        <span>+${Number(shipment.packageDetails.tvPriceUSD).toFixed(2)}</span>
                      </div>
                    )}
                    {Number(shipment.packageDetails.discountUSD || 0) > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Descuento:</span>
                        <span>-${Number(shipment.packageDetails.discountUSD).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t-2 border-black pt-2 flex justify-between items-baseline">
                  <span className="font-mono font-black text-sm uppercase">TOTAL:</span>
                  <span className="font-mono font-black text-xl text-black">
                    ${shipment.packageDetails.totalUSD.toFixed(2)} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido del Paquete */}
            <div className="border border-stone-300 rounded-lg p-2.5 bg-white">
              <strong className="text-[11px] font-mono uppercase block text-slate-600 mb-0.5">
                Contenido del Paquete:
              </strong>
              <p className="text-xs font-medium text-slate-900">
                {shipment.packageDetails.declaredContent}
              </p>
            </div>

            {/* POLÍTICA GENERAL DE ENVÍOS (TEXTO EXACTO DE LA FORMA FÍSICA) */}
            <div className="border-t border-black pt-2 space-y-1 text-[9.5px] leading-tight text-slate-700">
              <strong className="uppercase block font-bold text-black">
                POLÍTICA GENERAL DE ENVÍOS:
              </strong>
              <p>
                El cliente se compromete a proporcionar una dirección valida localizable dentro de la República Mexicana donde pueda entregársele el pedido. <strong>NOTA:</strong> La información de destino del paquete debe ser escrita por el cliente con su puño y letra. En caso de que el cliente proporcione una dirección que no sea localizable por la paquetería, cualquier otro costo adicional será cubierto por el cliente mismo. Una vez recibido el paquete por alguna persona en la dirección de entrega, cuenta con <strong>24 horas para reportar anomalías</strong> por daño físico o faltante en su pedido, después de este plazo no procede a ninguna reclamación. Ideal Express no es responsable por ninguna pérdida, daño o retraso de envío asimismo no daremos crédito o devolución de dinero como resultado de información mal proporcionada por el cliente a excepción de algún tipo de negligencia por parte de nuestra compañía, en cuyo caso cubriremos el valor máximo declarado a través de la Aseguranza Requerida. El llenar esta hoja con información incompleta o errónea puede conllevar con el retraso de su paquete.
              </p>
            </div>
          </div>

          {/* Firma del Cliente y Fecha al Pie */}
          <div className="pt-3 border-t-2 border-black mt-2 text-xs space-y-2">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-8">
                <div className="border-b-2 border-black h-10 mb-1"></div>
                <p className="font-bold text-black uppercase text-[11px]">
                  Firma del Cliente: _____________________________________________
                </p>
              </div>
              <div className="col-span-4 text-right">
                <div className="border-b-2 border-black h-10 mb-1"></div>
                <p className="font-bold text-black uppercase text-[11px]">
                  Fecha: _____________________
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 pt-1 border-t border-stone-200">
              <p className="font-semibold text-black">
                Cliente: Favor de recordar que los días de entrega son hábiles, no incluyen fines de semana ni días festivos.
              </p>
              <p className="font-bold font-mono text-black">
                Ideal Express: (414) 339-8747 o (414) 763-8705
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HOJA 2: ETIQUETA ADHESIVA PARA LA CAJA (CON QR AUTÓNOMO) */}
        {/* ======================================================== */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-stone-300 print:border-none print:shadow-none print:p-8 print:rounded-none min-h-[1050px] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-4 border-slate-950 p-4 rounded-xl flex items-center justify-between bg-stone-100">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="Ideal Express"
                  width={150}
                  height={40}
                  unoptimized
                  priority
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <span className="text-[11px] font-black tracking-widest uppercase text-slate-600 block font-mono">
                    ETIQUETA DE CONTROL LOGÍSTICO Y CRUCE
                  </span>
                  <span className="text-3xl font-mono font-black text-slate-950 tracking-tight">
                    {boxCode}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block">Bulto: 1 de 1</span>
                <span className="text-lg font-black text-[#1E3A5F] block font-mono">
                  {shipment.packageDetails.weightLbs} LBS
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {shipment.packageDetails.boxSize}&quot;
                </span>
              </div>
            </div>

            {/* DESTINO EN GRANDE */}
            <div className="bg-[#0E283F] text-white p-6 rounded-2xl space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight">
                {shipment.recipient.city}, {shipment.recipient.state}
              </h2>
              <p className="text-xs font-mono font-bold text-[#8FB838] uppercase tracking-wider">
                DESTINO FINAL MÉXICO ({deliveryType.toUpperCase()}) · C.P. {shipment.recipient.zip}
              </p>
            </div>

            {/* DATOS COMPLETOS DE ENTREGA */}
            <div className="border-2 border-stone-300 rounded-2xl p-6 space-y-4 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Recibe en {deliveryType}:
                </span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {shipment.recipient.fullName}
                </p>
                <p className="text-base font-bold text-slate-800 mt-1 font-mono">
                  Tel: {shipment.recipient.phone} {shipment.recipient.phone2 ? `| Alt: ${shipment.recipient.phone2}` : ""}
                </p>
              </div>

              <div className="border-t border-stone-200 pt-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Dirección de Entrega:
                </span>
                <p className="text-lg font-bold text-slate-900 leading-snug">
                  {shipment.recipient.address}
                  {shipment.recipient.colonia && `, Col. ${shipment.recipient.colonia}`}
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
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Remitente (Origen):
                </span>
                <p className="font-bold text-slate-900">{shipment.sender.fullName}</p>
                <p className="text-slate-600">{shipment.sender.city}, {shipment.sender.state}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Tienda de Recepción:
                </span>
                <p className="font-bold text-slate-900">{shipment.agentName}</p>
                <p className="text-slate-600">ID: {shipment.agentId}</p>
              </div>
            </div>
          </div>

          {/* CÓDIGO QR AUTÓNOMO Y MANIFIESTO */}
          <div className="pt-6 border-t-2 border-dashed border-stone-300 mt-6 flex items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-slate-900 block font-display">
                CONTROL DE CRUCE ADUANAL LAREDO
              </span>
              <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed">
                Código QR autónomo. Al escanear con la cámara del celular abre y reconstruye la Forma de Envío completa en pantalla sin requerir base de datos.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-700 font-bold">
                <span>[CAJA: {boxCode}]</span>
                <span>·</span>
                <span>[FOLIO: {shipment.folio}]</span>
              </div>
            </div>

            <div className="border-4 border-slate-950 p-3 rounded-2xl bg-white shadow-xs flex flex-col items-center shrink-0">
              <div className="p-1.5 bg-white flex items-center justify-center">
                <QRCodeSVG
                  value={qrUrl}
                  size={120}
                  level="M"
                  marginSize={1}
                />
              </div>
              <span className="text-xs font-mono font-black mt-1 text-black tracking-wider">
                {boxCode}
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase">
                Escanear con Cámara
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
