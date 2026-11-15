import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { Accordion } from "@/components/common/Accordion";
import { ShieldCheck, Award, ArrowRight } from "lucide-react";

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
        {/* Columna 1: Confianza */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#0E283F]">
              Trato de Familia a Familia
            </h3>
            <p className="text-xs text-slate-600 text-pretty">
              Más de 10 años en Milwaukee · Empresa 100% familiar · Bodega matriz propia.
            </p>
          </div>

          <div className="relative h-48 w-full overflow-hidden bg-slate-900">
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
              <ShieldCheck size={16} className="text-[#3E5C10] shrink-0" />
              <span>Cruce legal con manifiesto aduanal</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-[#183D61] shrink-0" />
              <span>Garantía de entrega puerta a puerta</span>
            </div>
          </div>
        </div>

        {/* Columna 2: Ficha de Tarifa (Aplanada, sin nested card) */}
        <div className="bg-[#0E283F] text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="uppercase tracking-wider font-bold text-[#8FB838]">
                Tarifa Fija 2026
              </span>
              <span>Milwaukee ➔ México</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Costo Claro por Libra
            </h3>
            <p className="text-xs text-slate-300 text-pretty">
              Sin cobros sorpresa ni aranceles adicionales al entregar en el destino.
            </p>
          </div>

          {/* Tarifa aplanada */}
          <div className="py-2 text-center font-mono space-y-2">
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              ${TARIFF_CONFIG.pricePerPound}
              <span className="text-sm font-sans font-normal text-slate-300 ml-1.5">USD / lb</span>
            </div>
            <p className="text-xs text-[#8FB838]">
              Mínimo 15 libras (${TARIFF_CONFIG.minPriceUSD} USD)
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10">
            <p className="text-xs text-slate-300 leading-relaxed text-pretty">
              Aceptamos bultos de 30 a 140 libras para fácil manejo y protección del contenido.
            </p>
            <Link
              href="/tarifas"
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-center text-white hover:text-[#8FB838] font-bold text-xs uppercase tracking-wider transition font-sans"
            >
              <span>Ver medidas y calculadora de tarifas</span>
              <ArrowRight size={14} className="text-[#8FB838]" />
            </Link>
          </div>
        </div>

        {/* Columna 3: Preguntas Frecuentes */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#0E283F]">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-slate-600 text-pretty">
              Lo que más nos consultan nuestros clientes antes de enviar:
            </p>
          </div>

          <Accordion items={faqItems} defaultOpenId="faq-1" />

          <Link
            href="/como-enviar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E283F] hover:text-[#3E5C10] pt-2 transition"
          >
            <span>Ver guía completa de regulaciones</span>
            <ArrowRight size={14} className="text-[#3E5C10]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
