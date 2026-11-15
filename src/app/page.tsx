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
    <div>
      {/* 1. Hero Amplio y Despejado con Barra Rápida */}
      <HeroSection />

      {/* 2. Trayecto en 4 Pasos Espaciosos y Visuales */}
      <HowItWorks />

      {/* 3. Directorio y Mapa Satelital Desahogado */}
      <QuickAgentMap />

      {/* 4. Respaldo Familiar, Tarifa Fija y FAQs */}
      <TrustAndFaqRow />
    </div>
  );
}
