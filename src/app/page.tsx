import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { QuickAgentMap } from "@/components/home/QuickAgentMap";
import { TrustAndFaqRow } from "@/components/home/TrustSection";

export const metadata: Metadata = {
  title: "Ideal Express | Envíos y Paquetería a todo México desde Milwaukee",
  description:
    "Más de 10 años conectando familias en Milwaukee, Racine, Sheboygan y Wisconsin con todo México. Entrega garantizada en 2 a 3 semanas. Tarifas desde $2.99/lb.",
  keywords: [
    "envíos a México desde Milwaukee",
    "paquetería a México en Milwaukee Wisconsin",
    "enviar paquete a México",
    "encomiendas a México",
    "cajas a México Racine Caledonia",
    "paquetería mexicana Milwaukee",
    "Ideal Express",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com",
  },
};

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero con Foto Real y 3 Botones Principales */}
      <HeroSection />

      {/* 2. Proceso en 4 Pasos con Fotos Reales */}
      <HowItWorks />

      {/* 3. Encuentra tu Agente: Lista + Mapa Interactivo */}
      <QuickAgentMap />

      {/* 4. Fila Compartida de 3 Columnas: Confianza, Tarifa Resumida y FAQs */}
      <TrustAndFaqRow />
    </div>
  );
}
