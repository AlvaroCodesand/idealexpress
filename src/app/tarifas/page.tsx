import React from "react";
import type { Metadata } from "next";
import TarifasClient from "./TarifasClient";

export const metadata: Metadata = {
  title: "Tarifas por Libra y Cotizador de Envíos a México | Ideal Express",
  description:
    "Tarifa estándar de $2.99 USD por libra (mínimo 15 lbs). Medidas de cajas permitidas, calculadora interactiva y seguro de envío con entrega directa a domicilio.",
  keywords: [
    "precio por libra méxico",
    "cuánto cuesta enviar caja a méxico desde milwaukee",
    "medidas de cajas paquetería méxico",
    "seguro de envío méxico",
    "cotizador de envíos a méxico",
    "paquetería económica wisconsin",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com/tarifas",
  },
};

export default function TarifasPage() {
  return <TarifasClient />;
}
