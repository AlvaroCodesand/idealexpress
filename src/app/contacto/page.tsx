import React from "react";
import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto y Bodega Matriz en Milwaukee, WI | Ideal Express",
  description:
    "Comunícate con Ideal Express. Bodega matriz en 1565 W Greenfield Ave, Milwaukee, WI 53204. Teléfonos (414) 763-8705, WhatsApp directo y servicio de recolección de cajas a domicilio.",
  keywords: [
    "teléfono ideal express milwaukee",
    "dirección bodega ideal express",
    "recolección de paquetes a domicilio milwaukee",
    "contacto paquetería a méxico wisconsin",
    "oficina paquetería greenfield ave milwaukee",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com/contacto",
  },
  other: {
    "geo.region": "US-WI",
    "geo.placename": "Milwaukee, Wisconsin",
    "geo.position": "43.0163;-87.9333",
    "ICBM": "43.0163, -87.9333",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
