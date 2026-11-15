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
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
      <div className="space-y-1 pb-2 border-b border-stone-100">
        <span className="text-[11px] font-black text-[#8FB838] uppercase tracking-widest block">
          Herramienta Interactiva
        </span>
        <h3 className="text-xl font-black text-[#1E3A5F] flex items-center gap-2">
          <Calendar size={22} className="text-[#8FB838]" />
          <span>¿Llega a tiempo para Navidad?</span>
        </h3>
        <p className="text-xs text-slate-500">
          Elige la fecha en que piensas entregar tu caja en la tienda para verificar la entrega antes del 24 de Diciembre.
        </p>
      </div>

      <form onSubmit={handleCheck} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Fecha estimada de entrega en tienda:
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-stone-50 font-medium focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-95 shrink-0"
            >
              Revisar Fecha
            </button>
          </div>
        </div>
      </form>

      {/* Estados del resultado según el Wireframe */}
      {result.status === "on-time" && (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              A TIEMPO PARA NAVIDAD
            </span>
            <span className="text-xs font-bold text-emerald-800">Garantía Confirmada</span>
          </div>
          <p className="text-sm font-bold text-emerald-950 mt-1">{result.message}</p>
          <p className="text-xs text-emerald-800 leading-relaxed">{result.subMessage}</p>
        </div>
      )}

      {result.status === "late" && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-amber-600 text-white rounded-md text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={14} />
              NO ALCANZA GARANTÍA
            </span>
            <span className="text-xs font-bold text-amber-800">Tránsito Regular</span>
          </div>
          <p className="text-sm font-bold text-amber-950 mt-1">{result.message}</p>
          <p className="text-xs text-amber-800 leading-relaxed">{result.subMessage}</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
          >
            <MessageCircle size={16} />
            <span>Consultar Opciones por WhatsApp</span>
          </a>
        </div>
      )}

      {result.status === "unselected" && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center text-xs text-slate-500">
          <HelpCircle size={24} className="mx-auto text-slate-400 mb-1" />
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};
