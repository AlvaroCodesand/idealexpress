import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, ShieldCheck, CheckCircle2 } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 overflow-hidden border-b border-[#E8E1D5]">
      {/* Detalle sutil de fondo editorial */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7BA029]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado izquierdo: Composición Tipográfica Editorial */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag de Ruta Logística Postal */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] border border-[#E8E1D5] text-[#0E283F] font-mono text-[11px] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#7BA029]"></span>
              <span>RUTA DIRECTA: MILWAUKEE ➔ LAREDO ➔ TODO MÉXICO</span>
            </div>

            {/* Titular con Libre Baskerville (Serif cálido y humano) */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] text-[#0E283F] leading-[1.12] tracking-tight">
              Tus envíos a México, con el cuidado de una{" "}
              <span className="italic font-normal text-[#7BA029]">familia</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
              Más de 10 años conectando hogares. Entrega tu caja en la tienda de tu barrio en Wisconsin; nosotros la trasladamos con manifiesto legal hasta las manos de tu familia en{" "}
              <strong className="text-[#0E283F] font-semibold underline decoration-[#7BA029] decoration-2 underline-offset-4">
                2 a 3 semanas
              </strong>.
            </p>

            {/* Ficha de Tarifa Base Rápida */}
            <div className="inline-flex items-center gap-4 p-3 bg-white rounded-xl border border-[#E8E1D5] shadow-2xs">
              <div className="px-3 py-1.5 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5] text-center font-mono">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Tarifa fija</span>
                <span className="text-xl font-black text-[#0E283F]">${TARIFF_CONFIG.pricePerPound}</span>
                <span className="text-[10px] text-slate-500"> / lb</span>
              </div>
              <div className="text-xs text-slate-600 space-y-0.5 pr-2">
                <p className="font-bold text-[#0E283F]">Mínimo 15 lbs (${TARIFF_CONFIG.minPriceUSD} USD)</p>
                <p className="text-[11px] text-slate-500">Sin cargos ocultos ni trámites aduanales en destino</p>
              </div>
            </div>

            {/* 3 Botones Principales con Acabado Artesanal */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition active:scale-95 text-xs sm:text-sm tracking-wide"
              >
                <MessageCircle size={18} />
                <span>Enviar por WhatsApp</span>
              </a>

              <Link
                href="/agentes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl shadow-xs transition text-xs sm:text-sm tracking-wide"
              >
                <MapPin size={17} className="text-[#8FB838]" />
                <span>Encuentra tu agente</span>
              </Link>

              <Link
                href="/tarifas"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] shadow-2xs transition text-xs sm:text-sm"
              >
                <Package size={17} className="text-slate-500" />
                <span>Ver tarifas</span>
              </Link>
            </div>

            {/* Garantías */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#7BA029] shrink-0" />
                <span>Cruce directo en Laredo</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#7BA029] shrink-0" />
                <span>Entrega a domicilio</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#7BA029] shrink-0" />
                <span>Póliza de seguro opcional</span>
              </span>
            </div>
          </div>

          {/* Lado derecho: Composición Editorial de Fotografía */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Marco fotográfico estilo postal */}
              <div className="relative rounded-2xl overflow-hidden bg-white p-2.5 shadow-xl border border-[#E8E1D5]">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/hero-warehouse.jpg"
                    alt="Bodega matriz de Ideal Express en Milwaukee"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E283F]/90 via-transparent to-transparent"></div>

                  {/* Sello de despacho aduanal en esquina */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#0E283F] border border-[#E8E1D5] uppercase tracking-wider shadow-xs">
                    EMBARQUE AUTORIZADO · WI
                  </div>

                  {/* Leyenda al pie */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
                    <span className="bg-[#7BA029] text-[#0E283F] font-mono font-black text-[10px] uppercase px-2 py-0.5 rounded tracking-wider inline-block">
                      FOTO REAL
                    </span>
                    <p className="font-serif font-bold text-sm sm:text-base">
                      Bodega Matriz Milwaukee · 1565 W Greenfield Ave
                    </p>
                    <p className="text-[11px] text-slate-200">
                      Básculas certificadas y consolidación para camiones semanales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante táctil (Aliados de entrega en México) */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-6 bg-white p-3.5 rounded-xl border border-[#E8E1D5] shadow-lg">
                <div className="w-9 h-9 rounded-lg bg-[#F4EFE6] text-[#0E283F] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-[#7BA029]" />
                </div>
                <div className="text-xs">
                  <strong className="block text-[#0E283F] font-bold">Última milla garantizada</strong>
                  <span className="text-[11px] text-slate-500">Estafeta · Paquetexpress · FedEx</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
