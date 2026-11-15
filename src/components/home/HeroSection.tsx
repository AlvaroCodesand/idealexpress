import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, CheckCircle2, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center pt-16 pb-24 overflow-hidden bg-[#0E283F]">
      {/* 1. Fotografía Panorámica de Fondo con Velo Marino */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-warehouse.jpg"
          alt="Bodega central de Ideal Express en Milwaukee"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Velo oscuro gradual para máxima legibilidad tipográfica */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E283F]/90 via-[#0E283F]/85 to-[#0E283F]"></div>
      </div>

      {/* 2. Contenido Central Desahogado y Espacioso */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
        {/* Tag de Ruta Logística */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#8FB838]"></span>
          <span>Wisconsin ➔ Cruce Seguro Laredo ➔ Todo México</span>
        </div>

        {/* Titular Principal en Archivo Moderno */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.15] tracking-tight text-balance">
          Tus envíos a México, seguros y de familia a familia.
        </h1>

        {/* Párrafo Despejado y Legible */}
        <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto text-pretty font-normal">
          Más de 10 años conectando hogares. Entrega tu caja en la tienda hispana de tu barrio en Wisconsin; nosotros la trasladamos con manifiesto aduanal legal hasta la puerta de tu gente en{" "}
          <strong className="text-white font-bold underline decoration-[#8FB838] decoration-2 underline-offset-4">
            2 a 3 semanas
          </strong>.
        </p>

        {/* 3. Mostrador Flotante Espacioso (Patrón Estafeta / FedEx) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 text-left text-[#0E283F] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-[#E8E1D5] text-center sm:text-left">
            {/* Pilar 1: Tarifa */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Tarifa Fija Oficial
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1 font-mono">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0E283F]">${TARIFF_CONFIG.pricePerPound}</span>
                <span className="text-xs font-bold text-slate-600 uppercase">USD / lb</span>
              </div>
              <p className="text-xs text-slate-500">Mínimo 15 lbs (${TARIFF_CONFIG.minPriceUSD} USD)</p>
            </div>

            {/* Pilar 2: Tiempo */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Tiempo de Tránsito
              </span>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0E283F] pt-0.5">
                2 a 3 semanas
              </div>
              <p className="text-xs text-slate-500">Entrega garantizada a domicilio</p>
            </div>

            {/* Pilar 3: Salidas */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Flota y Logística
              </span>
              <div className="text-lg sm:text-xl font-display font-bold text-[#0E283F] pt-1">
                Salidas Semanales
              </div>
              <p className="text-xs text-slate-500">Desde Milwaukee directo a Laredo</p>
            </div>
          </div>

          {/* Botones de Acción Directos con Mayor Tamaño y Confort Táctil */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl transition shadow-sm active:scale-95 text-sm tracking-wide w-full sm:w-auto"
              >
                <MessageCircle size={19} />
                <span>Cotizar por WhatsApp</span>
              </a>

              <Link
                href="/agentes"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-2xl transition shadow-xs text-sm tracking-wide w-full sm:w-auto"
              >
                <MapPin size={18} className="text-[#8FB838]" />
                <span>Encuentra tu Tienda</span>
              </Link>

              <Link
                href="/tarifas"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#F4EFE6] hover:bg-[#E8E1D5] text-[#0E283F] font-bold rounded-2xl transition text-sm w-full sm:w-auto"
              >
                <Package size={18} className="text-slate-600" />
                <span>Ver Tarifas</span>
              </Link>
            </div>

            <div className="text-xs text-slate-500 font-medium text-center sm:text-right hidden lg:block">
              Bodega Matriz: 1565 W Greenfield Ave · Tel: (414) 763-8705
            </div>
          </div>
        </div>

        {/* Puntos de Confianza Inferiores */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs sm:text-sm text-slate-300 font-medium pt-2">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#8FB838]" />
            <span>Manifiesto aduanal legal</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#8FB838]" />
            <span>Sin trámites para tu familiar en México</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#8FB838]" />
            <span>Última milla con Estafeta, FedEx & Paquetexpress</span>
          </span>
        </div>
      </div>
    </section>
  );
};
