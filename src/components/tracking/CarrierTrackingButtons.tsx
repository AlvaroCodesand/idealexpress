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
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-white text-[#0E283F] font-mono font-bold text-xs sm:text-sm transition shadow-2xs hover:shadow-xs active:scale-95 group"
          title={`Rastrear guía en el portal oficial de ${carrier.name}`}
        >
          <span>{carrier.name}</span>
          <ExternalLink size={13} className="text-[#7BA029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      ))}
    </div>
  );
};
