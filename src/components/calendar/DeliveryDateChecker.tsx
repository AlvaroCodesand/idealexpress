"use client";

import React, { useState } from "react";
import { checkChristmasArrival } from "@/utils/calendar";
import { HolidayCheckResult } from "@/types";
import { TARIFF_CONFIG } from "@/constants/config";
import { Calendar, CheckCircle2, AlertTriangle, HelpCircle, MessageCircle } from "lucide-react";

export const DeliveryDateChecker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-28");
  const [result, setResult] = useState<HolidayCheckResult>(() =>
    checkChristmasArrival("2026-11-28")
  );

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(checkChristmasArrival(selectedDate));
  };

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hola Ideal Express, deseo consultar si llevando mi caja el ${selectedDate} aún alcanza a llegar a México para Navidad.`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
      <div className="space-y-1.5 pb-3 border-b border-[#E8E1D5]">
        <h2 className="font-display text-2xl font-bold text-[#0E283F] flex items-center gap-2">
          <Calendar size={22} className="text-[#3E5C10]" />
          <span>¿Llega a tiempo para Navidad?</span>
        </h2>
        <p className="text-xs text-slate-600">
          Elige la fecha en que llevarás tu caja al agente para corroborar si alcanza a llegar antes del 24 de diciembre.
        </p>
      </div>

      <form onSubmit={handleCheck} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Fecha estimada de entrega en tienda:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-3 text-xs sm:text-sm border border-[#E8E1D5] rounded-xl bg-[#FAF8F5] font-mono font-bold text-[#0E283F] focus:ring-2 focus:ring-[#0E283F]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-95 shrink-0 shadow-2xs font-sans"
            >
              Revisar Fecha
            </button>
          </div>
        </div>
      </form>

      {/* Estados del resultado */}
      {result.status === "on-time" && (
        <div className="bg-[#EBF3DC] border-2 border-[#7BA029] rounded-2xl p-5 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 bg-[#3E5C10] text-white rounded-md font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              A TIEMPO PARA NAVIDAD
            </span>
            <span className="font-mono font-bold text-[#2D450D]">Garantía Confirmada</span>
          </div>
          <p className="font-display text-base font-bold text-[#2D450D] mt-1">{result.message}</p>
          <p className="text-xs text-[#2D450D]/90 leading-relaxed font-sans">{result.subMessage}</p>
        </div>
      )}

      {result.status === "late" && (
        <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 bg-amber-700 text-white rounded-md font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={13} />
              SUPERA LA FECHA LÍMITE
            </span>
            <span className="font-mono font-bold text-amber-900">Tránsito Regular</span>
          </div>
          <p className="font-display text-base font-bold text-amber-950 mt-1">{result.message}</p>
          <p className="text-xs text-amber-900 leading-relaxed font-sans">{result.subMessage}</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition"
          >
            <MessageCircle size={15} />
            <span>Consultar Opciones por WhatsApp</span>
          </a>
        </div>
      )}

      {result.status === "unselected" && (
        <div className="bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl p-5 text-center text-xs text-slate-600">
          <HelpCircle size={22} className="mx-auto text-slate-400 mb-1" />
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};
