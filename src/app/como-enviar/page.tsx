import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { CarrierTrackingButtons } from "@/components/tracking/CarrierTrackingButtons";
import {
  PackageCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Enviar tu Paquete a México Paso a Paso | Ideal Express",
  description:
    "Guía completa paso a paso: lleva tu caja a tu tienda hispana aliada, registro digital en tienda, cruce seguro en Texas y entrega garantizada a domicilio en 2 a 3 semanas. Conoce artículos permitidos y prohibidos.",
  keywords: [
    "cómo enviar paquete a méxico",
    "requisitos para mandar cajas a méxico",
    "paquetería laredo méxico",
    "tiempos de entrega ideal express",
    "artículos permitidos aduana méxico",
    "cajas paquetería wisconsin",
  ],
  alternates: {
    canonical: "https://www.idealexpresswi.com/como-enviar",
  },
};

export default function ComoEnviarPage() {
  const steps = [
    {
      num: "01",
      title: "Lleva tu caja a la tienda",
      desc: "Acude al comercio hispano aliado más cercano en tu barrio.",
      image: "/images/step1-pack.jpg",
      detail: "Usa cartón resistente y sella bien esquinas con cinta.",
    },
    {
      num: "02",
      title: "Llenado de datos en digital",
      desc: "El encargado registra tus datos y los de tu familia en el sistema.",
      image: "/images/step2-counter.jpg",
      detail: "Se entrega tu comprobante firmado con folio de rastreo.",
    },
    {
      num: "03",
      title: "Nosotros la llevamos",
      desc: "Pasa por nuestra bodega de Milwaukee y cruza segura en Texas.",
      image: "/images/step3-truck.jpg",
      detail: "Camiones propios con manifiesto aduanal legal.",
    },
    {
      num: "04",
      title: "Tu familia la recibe",
      desc: "Directamente en su domicilio en un plazo habitual de 2 a 3 semanas.",
      image: "/images/step4-delivery.jpg",
      detail: "Entrega puerta a puerta sin trámites para tu familiar.",
    },
  ];

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20tengo%20dudas%20sobre%20el%20envío%20de%20mi%20paquete.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-20">
      {/* 1. HEADER (Sin kicker artificial) */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
          Cómo enviar tu paquete a México
        </h1>
        <p className="text-base text-slate-700 leading-relaxed text-pretty">
          Un proceso ágil y transparente en tu tienda hispana de confianza, sin formatos confusos a mano.
        </p>
      </div>

      {/* 2. LOS 4 PASOS EN 4 TARJETAS CON FOTOS REALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-900">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0E283F] text-white font-mono font-bold text-xs shadow-xs">
                  Paso {step.num}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h2 className="font-display font-bold text-base text-[#0E283F]">{step.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                <p className="text-xs text-[#3E5C10] font-semibold pt-1">
                  {step.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. BLOQUE: ¿YA TE DIERON TU NÚMERO DE GUÍA? (Aplanado, sin nested card) */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8E1D5] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E283F]">
              ¿Ya te dieron tu número de guía?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty">
              La guía mexicana se asigna cuando tu carga cruza la aduana en Texas y se transfiere a la paquetería de última milla. El rastreo se consulta directamente en el portal oficial de la paquetería asignada.
            </p>
            <p className="text-xs text-slate-600 pt-1">
              ¿Dudas con tu número de guía?{" "}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
              >
                <MessageCircle size={14} />
                <span>Escríbenos por WhatsApp</span>
              </a>
            </p>
          </div>

          <div className="md:col-span-6 space-y-3 pt-2">
            <span className="text-xs font-mono font-bold text-[#0E283F] block uppercase tracking-wider">
              Consulta en el portal de la paquetería aliada:
            </span>
            <CarrierTrackingButtons />
            <p className="text-xs text-slate-500">
              * Cada botón abre el sitio oficial de rastreo de la paquetería en otra pestaña.
            </p>
          </div>
        </div>
      </div>

      {/* 4. BLOQUE: ¿CUÁNTO TARDA? */}
      <div className="bg-[#0E283F] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#183D61]">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[#8FB838] text-xs font-bold uppercase tracking-wider">
            <Clock size={16} />
            <span>Tiempo de Tránsito Garantizado</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            ¿Cuánto tarda en llegar?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 text-pretty">
            El tiempo habitual de entrega es de <strong className="text-white">2 a 3 semanas</strong> desde que lo entregas a tu agente.
          </p>
        </div>

        <Link
          href="/agentes"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#7BA029] hover:bg-[#6C8E24] text-[#0E283F] font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm shrink-0 active:scale-95"
        >
          <span>Encontrar agente cercano</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* 5. REGULACIONES: PERMITIDOS VS RESTRINGIDOS */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0E283F] mb-1">
            Artículos Permitidos y Prohibidos en Aduana
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Revisar esta lista antes de empacar evitará revisiones especiales y demoras en el cruce de Texas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#E8E1D5] space-y-4">
            <div className="flex items-center gap-2 text-[#3E5C10] font-bold text-base">
              <PackageCheck size={20} className="text-[#3E5C10]" />
              <span>Artículos Permitidos</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {TARIFF_CONFIG.allowedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#E8E1D5] space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
              <ShieldAlert size={20} className="text-rose-700" />
              <span>Artículos Prohibidos</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {TARIFF_CONFIG.prohibitedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle size={15} className="text-rose-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
