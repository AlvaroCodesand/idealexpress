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
      title: "¿Cuánto tarda mi envío?",
      content:
        "El tiempo habitual es de 2 a 3 semanas. Contamos con transporte consolidado desde Milwaukee a Laredo y entrega directa a domicilio con paqueterías líderes en México.",
    },
    {
      id: "faq-2",
      title: "¿Qué puedo enviar?",
      content:
        "Puedes enviar ropa, calzado, cobijas, juguetes, despensa seca y artículos de uso personal o del hogar. No se permiten armas, medicamentos controlados ni dinero en efectivo.",
    },
    {
      id: "faq-3",
      title: "¿Cuánto cuesta enviar?",
      content:
        `La tarifa estándar es de $${TARIFF_CONFIG.pricePerPound} USD por libra, con un mínimo cobrable de 15 libras ($${TARIFF_CONFIG.minPriceUSD} USD).`,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      {/* 3 Columnas idénticas al Wireframe PC 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Columna 1: 5. Confianza */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-[#8FB838] uppercase tracking-widest block">
              Trayectoria
            </span>
            <h3 className="text-xl font-black text-[#1E3A5F]">5. Confianza</h3>
            <p className="text-xs font-semibold text-slate-700">
              Más de 10 años enviando · Empresa 100% familiar · Bodega matriz propia
            </p>
          </div>

          <div className="relative h-44 w-full rounded-xl overflow-hidden shadow-inner bg-slate-100">
            <Image
              src="/images/family-trust.jpg"
              alt="Familia hispana recibiendo apoyo de Ideal Express"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2438]/70 to-transparent"></div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] text-white font-medium">
              Cuidamos cada caja como si fuera para nuestra propia familia.
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#8FB838] shrink-0" />
              <span>Cruce legal con manifiesto aduanal</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-[#1E3A5F] shrink-0" />
              <span>Garantía de entrega a domicilio</span>
            </div>
          </div>
        </div>

        {/* Columna 2: 6. Tarifa Resumida */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F2438] text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-[#8FB838] uppercase tracking-widest block">
              Precio Claro
            </span>
            <h3 className="text-xl font-black text-white">6. Tarifa Resumida</h3>
            <p className="text-xs text-slate-300">
              Tarifa única sin cobros sorpresa en destino.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/15 space-y-3">
            <div className="text-center">
              <span className="text-3xl font-black text-white">
                US${TARIFF_CONFIG.pricePerPound}
              </span>
              <span className="text-sm font-semibold text-[#8FB838] block mt-0.5">
                por libra
              </span>
            </div>
            <div className="border-t border-white/10 pt-3 text-center text-xs text-slate-300">
              Mínimo cobrable: <strong>{TARIFF_CONFIG.minPounds} libras</strong> (${TARIFF_CONFIG.minPriceUSD} USD)
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-normal">
            Aceptamos cajas de 30 a 140 libras para fácil manejo y protección de tus artículos.
          </p>

          <Link
            href="/tarifas"
            className="block w-full py-3 text-center bg-white hover:bg-slate-100 text-[#1E3A5F] font-black rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
          >
            Ver todas las tarifas y medidas →
          </Link>
        </div>

        {/* Columna 3: 7. Preguntas Frecuentes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-[#8FB838] uppercase tracking-widest block">
              Respuestas Rápidas
            </span>
            <h3 className="text-xl font-black text-[#1E3A5F]">7. Preguntas frecuentes</h3>
            <p className="text-xs text-slate-500">
              Lo que más nos preguntan nuestros clientes en tienda:
            </p>
          </div>

          <Accordion items={faqItems} defaultOpenId="faq-1" />

          <Link
            href="/como-enviar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#8FB838] pt-1"
          >
            <span>Ver guía paso a paso y regulaciones</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
