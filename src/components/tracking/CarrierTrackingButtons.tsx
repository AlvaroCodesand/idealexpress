import React from "react";
import { CARRIERS } from "@/constants/config";
import { ExternalLink } from "lucide-react";

export const CarrierTrackingButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {CARRIERS.map((carrier) => (
        <a
          key={carrier.name}
          href={carrier.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-stone-300 hover:border-slate-900 bg-white hover:bg-stone-50 text-slate-800 font-bold text-xs sm:text-sm transition shadow-xs active:scale-95 group"
          title={`Rastrear en el portal oficial de ${carrier.name}`}
        >
          <span>{carrier.name}</span>
          <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-900 transition" />
        </a>
      ))}
    </div>
  );
};
