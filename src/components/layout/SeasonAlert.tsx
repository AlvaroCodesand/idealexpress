import React from "react";
import { TARIFF_CONFIG } from "@/constants/config";
import { Bell, Clock } from "lucide-react";

export const SeasonAlert: React.FC = () => {
  return (
    <div className="bg-[#0F2438] text-white font-medium text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#8FB838] text-[#0F2438] p-1 rounded-full text-xs font-bold">
            <Bell size={13} />
          </span>
          <span className="text-slate-200">
            <strong className="text-white">Aviso de Temporada Navideña:</strong> Para entrega garantizada antes del 24 de diciembre, envía a más tardar el{" "}
            <strong className="text-[#8FB838] underline decoration-1 underline-offset-2">
              {TARIFF_CONFIG.christmasDeadlineDisplay}
            </strong>.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-slate-300 text-xs font-semibold whitespace-nowrap">
          <Clock size={13} className="text-[#8FB838]" />
          <span>Tiempo de tránsito habitual: 2–3 semanas</span>
        </div>
      </div>
    </div>
  );
};
