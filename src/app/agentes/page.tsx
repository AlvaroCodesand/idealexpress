import React from "react";
import type { Metadata } from "next";
import { getAllAgentsFromDb } from "@/lib/db";
import AgentesClient from "./AgentesClient";

export const metadata: Metadata = {
  title: "Directorio de Tiendas y Agentes Aliados en Wisconsin | Ideal Express",
  description:
    "Encuentra la tienda hispana aliada más cercana en Milwaukee, Racine, Sheboygan y Caledonia para entregar tu caja a México. Mapa interactivo, direcciones y horarios.",
  keywords: [
    "tiendas para enviar cajas a méxico milwaukee",
    "agentes paquetería wisconsin",
    "dónde dejar paquete a méxico racine sheboygan",
    "agencia paquetería ideal express",
    "tiendas hispanas milwaukee paquetería",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com/agentes",
  },
  other: {
    "geo.region": "US-WI",
    "geo.placename": "Milwaukee, Racine, Sheboygan, Wisconsin",
  },
};

export default function AgentesPage() {
  const agents = getAllAgentsFromDb();
  return <AgentesClient initialAgents={agents} />;
}
