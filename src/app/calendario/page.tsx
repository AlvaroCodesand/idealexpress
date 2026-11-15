import React from "react";
import type { Metadata } from "next";
import { DeliveryDateChecker } from "@/components/calendar/DeliveryDateChecker";
import { ServiceDeadlinesTable } from "@/components/calendar/ServiceDeadlinesTable";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Calendario de Envíos Navideños a México 2026 | Ideal Express",
  description:
    "Fechas límite de envío a México para garantizar entrega antes del 24 de diciembre. Revisa si tu fecha llega a tiempo con nuestro verificador interactivo.",
  keywords: [
    "fecha límite envíos navidad méxico",
    "cuándo mandar caja para navidad",
    "calendario de envíos ideal express",
    "garantía entrega 24 de diciembre méxico",
    "paquetería temporada navideña wisconsin",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com/calendario",
  },
};

export default function CalendarioPage() {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20deseo%20confirmar%20fechas%20de%20envío%20para%20Navidad.`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">
          Temporada Alta 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Calendario de Envíos Navideños
        </h1>
        <p className="text-sm text-slate-600">
          Asegura que los regalos y ropa para tu familia lleguen antes del 24 de Diciembre a cualquier estado de México.
        </p>
      </div>

      {/* DISEÑO A 2 COLUMNAS IDÉNTICO AL WIREFRAME PC 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <DeliveryDateChecker />
        </div>
        <div className="lg:col-span-6">
          <ServiceDeadlinesTable />
        </div>
      </div>

      {/* CTA DE AYUDA DIRECTA */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-white">¿Tienes un caso especial o fecha límite ajustada?</h3>
          <p className="text-xs text-slate-400">
            Podemos orientarte por WhatsApp sobre la ruta de camión más próxima desde Milwaukee.
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shrink-0 active:scale-95"
        >
          <MessageCircle size={18} />
          <span>Preguntar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
