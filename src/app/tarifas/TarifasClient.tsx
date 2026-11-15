"use client";

import React, { useState } from "react";
import { TARIFF_CONFIG } from "@/constants/config";
import { calculateShipmentCost } from "@/utils/pricing";
import {
  Calculator,
  MessageCircle,
  Clock,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function TarifasClient() {
  const [weight, setWeight] = useState<number>(30);
  const [boxSize, setBoxSize] = useState<string>("18x18x18");
  const [withInsurance, setWithInsurance] = useState<boolean>(false);
  const [declaredValue, setDeclaredValue] = useState<number>(150);

  const pricing = calculateShipmentCost(weight, withInsurance, declaredValue);

  const waQuoteText = encodeURIComponent(
    `Hola Ideal Express, coticé en su sitio web:\n- Peso: ${weight} lbs (Mínimo facturado: ${pricing.billableWeightLbs} lbs)\n- Medida: ${boxSize}\n- Seguro: ${
      withInsurance ? `Sí ($${declaredValue} USD declarado)` : "No"
    }\n- Total estimado: $${pricing.totalUSD} USD\n¿En qué tienda puedo entregar mi caja?`
  );

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=${waQuoteText}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">
      {/* 1. HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#8FB838] text-xs font-black uppercase tracking-widest">
          Transparencia y Claridad
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] tracking-tight">
          3. Servicios y Tarifas
        </h1>
        <p className="text-sm text-slate-600">
          Precio claro y sin sorpresas. Facturamos por peso real con entrega puerta a puerta en México.
        </p>
      </div>

      {/* 2. NIVELES DE SERVICIO EN 3 TARJETAS (DEL WIREFRAME PC 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nivel 1 */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#1E3A5F] shadow-sm relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-[#E5F2D6] text-[#2D450D] font-bold text-[10px] uppercase rounded border border-[#CDE5B3]">
              Servicio Estándar
            </span>
            <span className="text-xs font-bold text-[#8FB838]">Más Popular</span>
          </div>
          <h2 className="text-xl font-black text-[#1E3A5F]">Servicio Regular México</h2>
          <div className="space-y-0.5">
            <span className="text-3xl font-black text-slate-900">
              US${TARIFF_CONFIG.pricePerPound}
            </span>
            <span className="text-xs text-slate-500 block font-medium">
              por libra · mínimo {TARIFF_CONFIG.minPounds} libras (${TARIFF_CONFIG.minPriceUSD} USD)
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
            Entrega a domicilio en cualquier estado y municipio de la República Mexicana.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Clock size={14} className="text-[#8FB838]" />
            <span>Tiempo estimado: 2 a 3 semanas</span>
          </div>
        </div>

        {/* Nivel 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase rounded">
              Servicio Prioritario
            </span>
          </div>
          <h2 className="text-xl font-black text-[#1E3A5F]">Servicio Plus Bajío / Centro</h2>
          <div className="space-y-0.5">
            <span className="text-3xl font-black text-slate-900">US$3.49</span>
            <span className="text-xs text-slate-500 block font-medium">
              por libra · despacho acelerado en Laredo
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
            Ruta prioritaria con conexión exprés para Guanajuato, Michoacán, Jalisco, Edo. Méx y CDMX.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Clock size={14} className="text-[#8FB838]" />
            <span>Tiempo estimado: 10 a 14 días</span>
          </div>
        </div>

        {/* Nivel 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase rounded">
              Servicio Fronterizo
            </span>
          </div>
          <h2 className="text-xl font-black text-[#1E3A5F]">Servicio Frontera Norte</h2>
          <div className="space-y-0.5">
            <span className="text-3xl font-black text-slate-900">US$2.79</span>
            <span className="text-xs text-slate-500 block font-medium">
              por libra · entrega rápida en estados limítrofes
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
            Ruta directa para Nuevo León (Monterrey), Coahuila y Tamaulipas.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Clock size={14} className="text-[#8FB838]" />
            <span>Tiempo estimado: 7 a 10 días</span>
          </div>
        </div>
      </div>

      {/* 3. PESO, MEDIDAS Y CALCULADORA (PC 3 A 2 COLUMNAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Tabla de Peso, Medidas y Seguro */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-[#1E3A5F] border-b border-stone-100 pb-3">
              Peso y Medidas Permitidas
            </h3>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Concepto</th>
                  <th className="py-2.5 px-3">Especificación Oficial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Peso por caja</td>
                  <td className="py-3 px-3 text-slate-700">
                    30 a 140 libras (mínimo cobrable 15 lbs)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Medidas estándar</td>
                  <td className="py-3 px-3 text-slate-700">
                    16x16x16&quot;, 18x18x18&quot;, 20x20x20&quot;, 24x24x24&quot;
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Tipo de embalaje</td>
                  <td className="py-3 px-3 text-slate-700">
                    Cartón corrugado de doble pared, sellado con cinta canela
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Póliza de seguro</td>
                  <td className="py-3 px-3 text-slate-700">
                    10% del valor declarado (mínimo $5 USD hasta $2,000 USD)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <ShieldCheck size={18} className="text-[#8FB838]" />
              <span>Regla Vigente de Seguro:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toda caja cuenta con cobertura básica de flete. Para artículos de especial aprecio o valor elevado, el seguro opcional del 10% cubre reposición económica en caso de siniestro durante el trayecto.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Calculadora Interactiva */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3F7] text-[#1E3A5F] flex items-center justify-center">
              <Calculator size={22} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Calculadora de Cotización</h3>
              <p className="text-xs text-slate-500">Calcula tu costo aproximado antes de ir a la tienda</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Peso estimado (libras):</span>
                <span className="text-[#1E3A5F] font-black text-sm">{weight} lbs</span>
              </div>
              <input
                type="range"
                min="10"
                max="140"
                step="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#1E3A5F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Mín. 15 lbs</span>
                <span>50 lbs</span>
                <span>100 lbs</span>
                <span>Máx. 140 lbs</span>
              </div>
              {pricing.isMinimumApplied && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 flex items-center gap-1.5 border border-amber-200">
                  <Info size={13} className="shrink-0" />
                  Cajas menores a 15 lbs se cobran a la tarifa mínima de ${TARIFF_CONFIG.minPriceUSD} USD.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Medida de la caja:</label>
              <div className="grid grid-cols-4 gap-2">
                {["16x16x16", "18x18x18", "20x20x20", "24x24x24"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setBoxSize(sz)}
                    className={`py-2 text-xs font-bold rounded-lg border transition ${
                      boxSize === sz
                        ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                        : "bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {sz}&quot;
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withInsurance}
                  onChange={(e) => setWithInsurance(e.target.checked)}
                  className="w-4 h-4 text-[#8FB838] rounded accent-[#8FB838]"
                />
                <span className="text-xs font-bold text-slate-800">
                  Agregar seguro de valor declarado (10%)
                </span>
              </label>

              {withInsurance && (
                <div className="mt-2 pl-6 flex items-center gap-3">
                  <span className="text-xs text-slate-600">Valor declarado:</span>
                  <input
                    type="number"
                    min="50"
                    max={TARIFF_CONFIG.maxDeclaredValueUSD}
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(Number(e.target.value))}
                    className="w-28 px-3 py-1 text-xs font-bold border border-stone-300 rounded-lg"
                  />
                  <span className="text-xs text-slate-500">
                    Póliza: ${pricing.insuranceCostUSD} USD
                  </span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between text-slate-900 border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">
                  Total Estimado:
                </span>
                <span className="text-2xl font-black text-[#1E3A5F]">
                  ${pricing.totalUSD.toFixed(2)} USD
                </span>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-sm active:scale-95"
              >
                <MessageCircle size={16} />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
