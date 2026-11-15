"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TARIFF_RULES } from "@/data/mocks";
import { MessageCircle } from "lucide-react";

export const WhatsAppFloat: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/portal/impresion")) {
    return null;
  }

  const waUrl = `https://wa.me/${TARIFF_RULES.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-hidden"
      aria-label="Atención por WhatsApp"
    >
      <MessageCircle size={24} className="shrink-0" />
      <span className="hidden sm:inline text-sm font-semibold">¿Dudas? Escríbenos</span>
    </a>
  );
};
