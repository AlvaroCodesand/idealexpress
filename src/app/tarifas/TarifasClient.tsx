"use client";

import React, { useState } from "react";
import { TARIFF_CONFIG } from "@/constants/config";
import { calculateShipmentCost } from "@/utils/pricing";
import {
  MessageCircle,
  Clock,
  ShieldCheck,
  Info,
  Check,
} from "lucide-react";

export default function TarifasClient() {
  const [weight, setWeight] = useState<number>(45);
  const [boxSize, setBoxSize] = useState<string>("18x18x18");
  const [withInsurance, setWithInsurance] = useState<boolean>(false);
  const [declaredValue, setDeclaredValue] = useState<number>(200);

  const pricing = calculateShipmentCost(weight, withInsurance, declaredValue);

  const quickPresets = [
    { label: "Caja Ropa Ligera", weight: 25, size: "16x16x16", note: "Prendas y calzado" },
    { label: "Familiar Estándar", weight: 45, size: "18x18x18", note: "La más enviada" },
    { label: "Encomienda Navideña", weight: 75, size: "20x20x20", note: "Juguetes y regalos" },
    { label: "Caja Grande Máxima", weight: 110, size: "24x24x24", note: "Cobijas y despensa" },
  ];

  const waQuoteText = encodeURIComponent(
    `Hola Ideal Express, coticé en su mostrador virtual:\n- Peso: ${weight} lbs (Facturable: ${pricing.billableWeightLbs} lbs)\n- Medida: ${boxSize}\n- Seguro: ${
      withInsurance ? `Sí (Valor declarado $${declaredValue} USD)` : "No"
    }\n- Total estimado: $${pricing.totalUSD} USD\n¿Me confirman qué tienda me queda más cerca para entregar?`
  );

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=${waQuoteText}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">
      {/* 1. HEADER EDITORIAL (Sin chip artificial de IA) */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
          Tarifas Claras y Mostrador Virtual
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed text-pretty">
          Facturación en báscula al momento de entregar tu caja en tienda. Sin cargos sorpresa ni aranceles en México.
        </p>
      </div>

      {/* 2. NIVELES DE SERVICIO EN 3 FICHAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nivel 1 */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#0E283F] shadow-sm relative space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#0E283F] uppercase">
                Servicio Estándar
              </span>
              <span className="font-mono font-bold text-[#3E5C10]">
                Recomendado
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#0E283F]">
              Servicio Regular México
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-black text-[#0E283F]">
                  ${TARIFF_CONFIG.pricePerPound}
                </span>
                <span className="text-xs text-slate-600 font-bold uppercase">USD / libra</span>
              </div>
              <span className="text-xs text-slate-600 block">
                Mínimo {TARIFF_CONFIG.minPounds} lbs (${TARIFF_CONFIG.minPriceUSD} USD)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Entrega directa a domicilio en cualquier estado y municipio de la República Mexicana.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E8E1D5]">
            <Clock size={13} className="text-[#3E5C10]" />
            <span>Tránsito: 2 a 3 semanas</span>
          </div>
        </div>

        {/* Nivel 2 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8E1D5] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-mono font-bold uppercase">
                Prioritario
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#0E283F]">
              Servicio Plus Bajío / Centro
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-black text-[#0E283F]">
                  $3.49
                </span>
                <span className="text-xs text-slate-600 font-bold uppercase">USD / libra</span>
              </div>
              <span className="text-xs text-slate-600 block">
                Despacho acelerado con conexión inmediata
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Guanajuato, Michoacán, Jalisco, Estado de México, CDMX, Puebla y Querétaro.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E8E1D5]">
            <Clock size={13} className="text-[#3E5C10]" />
            <span>Tránsito: 10 a 14 días</span>
          </div>
        </div>

        {/* Nivel 3 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8E1D5] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-mono font-bold uppercase">
                Fronterizo
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#0E283F]">
              Servicio Frontera Norte
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-black text-[#0E283F]">
                  $2.79
                </span>
                <span className="text-xs text-slate-600 font-bold uppercase">USD / libra</span>
              </div>
              <span className="text-xs text-slate-600 block">
                Ruta directa interestatal hacia el norte
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Nuevo León (Monterrey y área metropolitana), Coahuila y Tamaulipas.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E8E1D5]">
            <Clock size={13} className="text-[#3E5C10]" />
            <span>Tránsito: 7 a 10 días</span>
          </div>
        </div>
      </div>

      {/* 3. MOSTRADOR DE PESAJE VIRTUAL (SIMULADOR DE BÁSCULA) */}
      <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Lado izquierdo: Parámetros y Presets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-[#E8E1D5] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#0E283F]">
                Calcula tu caja antes de acudir
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Ajusta el peso y medidas o elige una de las opciones frecuentes.
              </p>
            </div>

            {/* Presets Rápidos */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Selección rápida por tipo de caja:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setWeight(preset.weight);
                      setBoxSize(preset.size);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      weight === preset.weight
                        ? "bg-[#0E283F] text-white border-[#0E283F] shadow-xs"
                        : "bg-[#FAF8F5] hover:bg-[#F4EFE6] text-slate-800 border-[#E8E1D5]"
                    }`}
                  >
                    <span className="block text-xs font-bold leading-tight">{preset.label}</span>
                    <span className="block text-xs font-mono opacity-80 mt-1">
                      {preset.weight} lbs ({preset.size}&quot;)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Peso */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Peso en báscula:</span>
                <span className="text-xl font-mono font-black text-[#0E283F]">{weight} lbs</span>
              </div>
              <input
                type="range"
                min="10"
                max="140"
                step="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#0E283F] cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-slate-600">
                <span>Mín. 15 lbs</span>
                <span>45 lbs (Promedio)</span>
                <span>80 lbs</span>
                <span>Máx. 140 lbs</span>
              </div>
              {pricing.isMinimumApplied && (
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                  <Info size={14} className="shrink-0" />
                  Cajas menores a 15 lbs se cobran a la tarifa mínima base de ${TARIFF_CONFIG.minPriceUSD} USD.
                </p>
              )}
            </div>

            {/* Medida de caja */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700">Medida de la caja (pulgadas):</label>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs font-bold">
                {["16x16x16", "18x18x18", "20x20x20", "24x24x24"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setBoxSize(sz)}
                    className={`py-2 rounded-lg border transition ${
                      boxSize === sz
                        ? "bg-[#0E283F] text-white border-[#0E283F]"
                        : "bg-[#FAF8F5] text-slate-700 border-[#E8E1D5] hover:bg-[#F4EFE6]"
                    }`}
                  >
                    {sz}&quot;
                  </button>
                ))}
              </div>
            </div>

            {/* Seguro Opcional */}
            <div className="pt-2 border-t border-[#E8E1D5]">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withInsurance}
                  onChange={(e) => setWithInsurance(e.target.checked)}
                  className="w-4 h-4 text-[#3E5C10] rounded accent-[#3E5C10]"
                />
                <span className="text-xs font-bold text-slate-800">
                  Agregar seguro de valor declarado (10% sobre mercancía)
                </span>
              </label>

              {withInsurance && (
                <div className="mt-3 pl-6 flex items-center gap-3 text-xs">
                  <span className="text-slate-600 font-medium">Valor declarado:</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span className="font-bold">$</span>
                    <input
                      type="number"
                      min="50"
                      max={TARIFF_CONFIG.maxDeclaredValueUSD}
                      value={declaredValue}
                      onChange={(e) => setDeclaredValue(Number(e.target.value))}
                      className="w-28 px-3 py-1 font-bold border border-slate-300 rounded-lg text-slate-900 bg-white"
                    />
                    <span className="text-slate-600 ml-2">Póliza: ${pricing.insuranceCostUSD} USD</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Desglose de Cobro */}
          <div className="lg:col-span-5 bg-[#0E283F] text-white p-7 rounded-2xl shadow-md space-y-6 flex flex-col justify-between border border-[#183D61]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 text-xs font-mono">
                <span className="text-[#8FB838] font-bold">DESGLOSE ESTIMADO</span>
                <span className="text-slate-400">TICKET VIRTUAL</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Tarifa estándar:</span>
                  <span className="text-white">${TARIFF_CONFIG.pricePerPound} USD / lb</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Peso a facturar:</span>
                  <span className="text-white">{pricing.billableWeightLbs} lbs</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Medida seleccionada:</span>
                  <span className="text-white">{boxSize}&quot;</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Flete base:</span>
                  <span className="text-white">${pricing.shippingCostUSD.toFixed(2)} USD</span>
                </div>
                {withInsurance && (
                  <div className="flex justify-between text-[#8FB838] pt-1">
                    <span>Seguro (10% s/${declaredValue}):</span>
                    <span>+${pricing.insuranceCostUSD.toFixed(2)} USD</span>
                  </div>
                )}
              </div>

              <div className="border-t border-dashed border-white/20 pt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-slate-400 block">
                    Total Estimado en Tienda:
                  </span>
                  <span className="text-xs text-[#8FB838]">Pago en mostrador al entregar</span>
                </div>
                <span className="text-3xl font-mono font-black text-white tracking-tight">
                  ${pricing.totalUSD.toFixed(2)} <span className="text-sm font-sans font-normal text-slate-300">USD</span>
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide transition shadow-xs active:scale-95"
              >
                <MessageCircle size={18} />
                <span>Enviar Esta Cotización a WhatsApp</span>
              </a>
              <p className="text-xs text-center text-slate-400">
                * El peso final se verifica en la báscula de la tienda receptora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
