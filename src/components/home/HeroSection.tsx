import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, ArrowRight, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden bg-[#0E283F]">
      {/* 1. Fotografía Panorámica de Fondo con Velo Asimétrico Izquierda-Derecha */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-warehouse.jpg"
          alt="Bodega matriz de Ideal Express en Milwaukee"
          fill
          priority
          className="object-cover object-right-top sm:object-center scale-105"
        />
        {/* Velo más sólido a la izquierda para texto y translúcido a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E283F] via-[#0E283F]/90 to-[#0E283F]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E283F] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* 2. Contenido Alineado a la Izquierda (Patrón Dinámico Logístico) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-left space-y-7">
        {/* Tag de Ruta */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#8FB838]"></span>
          <span>Wisconsin ➔ Cruce Seguro Laredo ➔ Todo México</span>
        </div>

        {/* Titular Asimétrico con Aplomo */}
        <div className="max-w-3xl space-y-4">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.14] tracking-tight text-balance">
            Tus envíos a México, seguros y de familia a familia.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed text-pretty font-normal max-w-2xl">
            Más de 10 años conectando hogares. Entrega tu caja en la tienda hispana de tu barrio en Wisconsin; nosotros la trasladamos con manifiesto aduanal hasta el domicilio de tu gente en{" "}
            <strong className="text-white font-bold underline decoration-[#8FB838] decoration-2 underline-offset-4">
              2 a 3 semanas
            </strong>.
          </p>
        </div>

        {/* 3. Barra de Servicio Horizontal Alineada al Eje de Lectura */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/40 text-[#0E283F] max-w-4xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
            {/* Pilares a la Izquierda */}
            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-6 text-xs divide-x divide-[#E8E1D5]">
              <div className="text-left">
                <span className="text-slate-500 block font-mono text-[11px] uppercase">Tarifa fija oficial</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-[#0E283F]">
                  ${TARIFF_CONFIG.pricePerPound}{" "}
                  <span className="text-xs font-normal text-slate-600">USD/lb</span>
                </span>
                <span className="text-slate-500 block text-[11px]">Mínimo 15 lbs</span>
              </div>

              <div className="pl-6 text-left">
                <span className="text-slate-500 block font-mono text-[11px] uppercase">Tiempo de entrega</span>
                <span className="text-lg sm:text-xl font-display font-bold text-[#0E283F] block">
                  2 a 3 semanas
                </span>
                <span className="text-slate-500 block text-[11px]">Directo a domicilio</span>
              </div>

              <div className="pl-6 text-left hidden sm:block">
                <span className="text-slate-500 block font-mono text-[11px] uppercase">Logística semanal</span>
                <span className="text-base font-display font-bold text-[#0E283F] block">
                  Salidas Directas
                </span>
                <span className="text-slate-500 block text-[11px]">Milwaukee a Laredo</span>
              </div>
            </div>

            {/* Botones de Acción Directos */}
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8E1D5]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition shadow-xs active:scale-95 text-xs sm:text-sm tracking-wide"
              >
                <MessageCircle size={17} />
                <span>Cotizar por WhatsApp</span>
              </a>

              <Link
                href="/agentes"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl transition shadow-xs text-xs sm:text-sm tracking-wide"
              >
                <MapPin size={16} className="text-[#8FB838]" />
                <span>Buscar Tienda</span>
              </Link>

              <Link
                href="/tarifas"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] transition text-xs sm:text-sm"
              >
                <Package size={16} className="text-slate-600" />
                <span>Ver Tarifas</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Garantías sutiles al pie */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-medium pt-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#8FB838]" />
            <span>Manifiesto aduanal legal</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#8FB838]" />
            <span>Sin trámites para tu familiar en México</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#8FB838]" />
            <span>Última milla con Estafeta, FedEx & Paquetexpress</span>
          </span>
        </div>
      </div>
    </section>
  );
};
