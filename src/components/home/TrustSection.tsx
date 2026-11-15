import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { Accordion } from "@/components/common/Accordion";
import { ShieldCheck, Award, ArrowRight, Check } from "lucide-react";

export const TrustAndFaqRow: React.FC = () => {
  const faqItems = [
    {
      id: "faq-1",
      title: "¿Cuánto tarda mi envío en llegar?",
      content:
        "El tiempo habitual es de 2 a 3 semanas. Contamos con transporte consolidado desde Milwaukee a Laredo y entrega directa a domicilio con Estafeta, FedEx y Paquetexpress en México.",
    },
    {
      id: "faq-2",
      title: "¿Qué puedo enviar en mi caja?",
      content:
        "Ropa, calzado, cobijas, juguetes, despensa seca y artículos de uso personal o del hogar. No se permiten armas, medicamentos controlados ni dinero en efectivo.",
    },
    {
      id: "faq-3",
      title: "¿Cómo se calcula el precio?",
      content:
        `La tarifa fija es de $${TARIFF_CONFIG.pricePerPound} USD por libra en báscula, con un mínimo facturable de 15 libras ($${TARIFF_CONFIG.minPriceUSD} USD).`,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Columna 1: Confianza (Estilo Postal / Editorial) */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#7BA029] uppercase tracking-widest block">
              RESPALDO COMUNITARIO
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0E283F]">
              Trato de Familia a Familia
            </h3>
            <p className="text-xs text-slate-600">
              Más de 10 años en Milwaukee · Empresa 100% familiar · Bodega matriz propia.
            </p>
          </div>

          <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-inner bg-slate-900">
            <Image
              src="/images/family-trust.jpg"
              alt="Familia hispana enviando con Ideal Express"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E283F]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium">
              «Sabemos el esfuerzo que hay detrás de cada paquete».
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#7BA029] shrink-0" />
              <span>Cruce legal con manifiesto aduanal</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-[#183D61] shrink-0" />
              <span>Garantía de entrega puerta a puerta</span>
            </div>
          </div>
        </div>

        {/* Columna 2: Ficha Postal de Tarifa (Ticket de Embarque) */}
        <div className="bg-[#0E283F] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#8FB838] uppercase tracking-widest">
                TARIFA FIJA 2026
              </span>
              <span className="text-[10px] font-mono text-slate-400">ID: IE-RATE</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Costo Claro por Libra
            </h3>
            <p className="text-xs text-slate-300">
              Sin cobros sorpresa ni impuestos adicionales al entregar en México.
            </p>
          </div>

          {/* Tarjeta interior tipo ticket kraft */}
          <div className="bg-[#183D61]/60 p-5 rounded-xl border border-white/10 space-y-3 font-mono">
            <div className="text-center">
              <span className="text-4xl font-black text-white tracking-tight">
                ${TARIFF_CONFIG.pricePerPound}
              </span>
              <span className="text-xs text-[#8FB838] block mt-0.5 uppercase tracking-wider font-bold">
                USD por libra
              </span>
            </div>
            <div className="border-t border-white/10 pt-3 text-center text-xs text-slate-300">
              Mínimo: <strong>{TARIFF_CONFIG.minPounds} lbs</strong> (${TARIFF_CONFIG.minPriceUSD} USD)
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Aceptamos cajas de 30 a 140 libras para fácil manejo y protección del contenido.
            </p>
            <Link
              href="/tarifas"
              className="block w-full py-3 text-center bg-white hover:bg-[#FAF8F5] text-[#0E283F] font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm font-sans"
            >
              Ver medidas y calculadora →
            </Link>
          </div>
        </div>

        {/* Columna 3: Preguntas Frecuentes */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#7BA029] uppercase tracking-widest block">
              DUDAS HABITUALES
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0E283F]">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-slate-500">
              Lo que más nos consultan nuestros clientes en tienda:
            </p>
          </div>

          <Accordion items={faqItems} defaultOpenId="faq-1" />

          <Link
            href="/como-enviar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E283F] hover:text-[#7BA029] pt-2 transition"
          >
            <span>Ver guía completa de regulaciones</span>
            <ArrowRight size={13} className="text-[#7BA029]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
