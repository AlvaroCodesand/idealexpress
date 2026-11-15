import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-[#E8E1D5] bg-gradient-to-b from-[#F4EFE6]/60 via-[#FAF8F5] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lado izquierdo: Tipografía amplia y aireada */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E1D5] text-[#0E283F] font-mono text-xs shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#3E5C10]"></span>
              <span>Wisconsin ➔ Laredo ➔ Todo México</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#0E283F] leading-[1.14] tracking-tight text-balance">
                Tus envíos a México, seguros y de familia a familia.
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl text-pretty font-normal">
                Llevamos tus paquetes desde Wisconsin hasta la puerta de tu familia en cualquier estado de México en{" "}
                <strong className="text-[#0E283F] font-semibold underline decoration-[#7BA029] decoration-2 underline-offset-4">
                  2 a 3 semanas
                </strong>. Entrega en la tienda hispana de tu barrio sin complicaciones.
              </p>
            </div>

            {/* Barra de Utilidad Rápida (Patrón Estafeta / FedEx desahogado) */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-[#E8E1D5] text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Tarifa fija por libra</span>
                  <span className="text-2xl font-mono font-bold text-[#0E283F]">${TARIFF_CONFIG.pricePerPound}</span>
                  <span className="text-slate-500 font-mono"> USD</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Mínimo cobrable</span>
                  <span className="text-2xl font-mono font-bold text-[#0E283F]">{TARIFF_CONFIG.minPounds}</span>
                  <span className="text-slate-500 font-mono"> lbs (${TARIFF_CONFIG.minPriceUSD})</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block font-medium">Tiempo de entrega</span>
                  <span className="text-lg font-serif font-bold text-[#0E283F]">2 a 3 semanas</span>
                </div>
              </div>

              {/* Botones de acción directos */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition shadow-xs active:scale-95 text-xs sm:text-sm tracking-wide"
                >
                  <MessageCircle size={18} />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <Link
                  href="/agentes"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl transition text-xs sm:text-sm tracking-wide shadow-xs"
                >
                  <MapPin size={17} className="text-[#8FB838]" />
                  <span>Buscar Tienda</span>
                </Link>

                <Link
                  href="/tarifas"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] transition text-xs sm:text-sm"
                >
                  <Package size={17} className="text-slate-500" />
                  <span>Ver Tarifas</span>
                </Link>
              </div>
            </div>

            {/* Garantías al pie del hero */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Salidas semanales desde Milwaukee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Cruce directo en Laredo, Texas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Entrega con Estafeta, FedEx y Paquetexpress</span>
              </span>
            </div>
          </div>

          {/* Lado derecho: Fotografía limpia y espaciosa */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-lg bg-slate-900 border border-[#E8E1D5]">
              <Image
                src="/images/hero-warehouse.jpg"
                alt="Bodega matriz de Ideal Express en Milwaukee"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E283F]/85 via-black/20 to-transparent"></div>

              {/* Tag superior */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#0E283F] uppercase shadow-xs">
                Bodega Matriz · Milwaukee, WI
              </div>

              {/* Leyenda inferior desahogada */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="font-serif font-bold text-lg sm:text-xl leading-snug">
                  1565 W Greenfield Ave, Milwaukee
                </p>
                <p className="text-xs text-slate-300">
                  Centro logístico de recepción, pesado y consolidación aduanal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
