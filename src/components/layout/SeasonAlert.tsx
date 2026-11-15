import React from "react";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

export const SeasonAlert: React.FC = () => {
  return (
    <div className="bg-[#0E283F] text-white py-2.5 px-4 border-b border-[#1E3A5F] shadow-xs relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7BA029]/20 text-[#8FB838] font-mono text-xs font-bold uppercase tracking-wider border border-[#7BA029]/40">
            <Sparkles size={12} className="text-[#8FB838]" />
            Garantía Navideña
          </span>
          <span className="text-slate-200">
            Para entrega garantizada antes del 24 de diciembre a México, envía a más tardar el{" "}
            <strong className="text-white font-bold underline decoration-[#7BA029] decoration-2 underline-offset-4">
              {TARIFF_CONFIG.christmasDeadlineDisplay}
            </strong>.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-slate-300 font-medium">
            <Clock size={13} className="text-[#8FB838]" />
            <span>Tránsito habitual: 2 a 3 semanas</span>
          </div>
          <Link
            href="/calendario"
            className="inline-flex items-center gap-1 font-bold text-[#8FB838] hover:text-white transition"
          >
            <span>Consultar calendario</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
