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
      num: 1,
      title: "Lleva tu caja",
      desc: "Al agente más cercano a ti en tu tienda hispana del barrio.",
      image: "/images/step1-pack.jpg",
      detail: "Usa cartón resistente y sella bien esquinas con cinta.",
    },
    {
      num: 2,
      title: "Llena el formato",
      desc: "Tus datos, los de quien recibe y qué envías. Firmas de conformidad.",
      image: "/images/step2-counter.jpg",
      detail: "Se registra en sistema digital y recibes tu copia oficial.",
    },
    {
      num: 3,
      title: "Nosotros la llevamos",
      desc: "Pasa por nuestra bodega de Milwaukee y cruza segura a México en Texas.",
      image: "/images/step3-truck.jpg",
      detail: "Camiones propios con manifiesto aduanal legal.",
    },
    {
      num: 4,
      title: "Tu familia la recibe",
      desc: "Directamente en su domicilio en un plazo estipulado de 2 a 3 semanas.",
      image: "/images/step4-delivery.jpg",
      detail: "Entrega puerta a puerta sin trámites para tu familiar.",
    },
  ];

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20tengo%20dudas%20sobre%20el%20envío%20de%20mi%20paquete.`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">
          Paso a Paso
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Cómo enviar tu paquete a México
        </h1>
        <p className="text-base text-slate-600">
          Es fácil y lo hacemos contigo, en tu tienda de confianza.
        </p>
      </div>

      {/* 2. LOS 4 PASOS EN 4 TARJETAS CON FOTOS REALES (PC 2 DEL WIREFRAME) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                  {step.num}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                <p className="text-[11px] text-orange-700 font-medium pt-1">
                  {step.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. BLOQUE: ¿YA TE DIERON TU NÚMERO DE GUÍA? (DEL WIREFRAME) */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-3">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest block">
              Rastreo de Paquetería
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              ¿Ya te dieron tu número de guía?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La guía mexicana se asigna cuando tu carga cruza la aduana en Texas y se transfiere a la paquetería de última milla. El rastreo se consulta directamente en el portal oficial de la paquetería asignada.
            </p>
            <p className="text-xs text-slate-500 pt-1">
              ¿Dudas con tu número de guía?{" "}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
              >
                <MessageCircle size={14} />
                <span>Escríbenos por WhatsApp</span>
              </a>
            </p>
          </div>

          <div className="md:col-span-6 space-y-3 bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <span className="text-xs font-bold text-slate-700 block">
              Consulta en el portal de la paquetería aliada:
            </span>
            <CarrierTrackingButtons />
            <p className="text-[11px] text-slate-400">
              * Cada botón abre el sitio oficial de rastreo de la paquetería en otra pestaña.
            </p>
          </div>
        </div>
      </div>

      {/* 4. BLOQUE: ¿CUÁNTO TARDA? */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0F2438] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border-t-4 border-[#8FB838]">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[#8FB838] text-xs font-bold uppercase tracking-wider">
            <Clock size={16} />
            <span>Tiempo de Tránsito Garantizado</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            ¿Cuánto tarda en llegar?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            El tiempo habitual de entrega es de <strong className="text-white">2 a 3 semanas</strong> desde que lo entregas a tu agente.
          </p>
        </div>

        <Link
          href="/agentes"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#8FB838] hover:bg-[#7EA62F] text-[#0F2438] font-black rounded-xl text-xs uppercase tracking-wider transition shadow-lg shrink-0 active:scale-95"
        >
          <span>Encontrar agente cercano</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* 5. REGULACIONES: PERMITIDOS VS RESTRINGIDOS */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
            Artículos Permitidos y Prohibidos en Aduana
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Revisar esta lista antes de empacar evitará revisiones especiales y demoras en el cruce de Texas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50/60 rounded-xl p-6 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
              <PackageCheck size={20} className="text-emerald-600" />
              <span>Artículos Permitidos</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {TARIFF_CONFIG.allowedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/60 rounded-xl p-6 border border-rose-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
              <ShieldAlert size={20} className="text-rose-600" />
              <span>Artículos Prohibidos</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {TARIFF_CONFIG.prohibitedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
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
