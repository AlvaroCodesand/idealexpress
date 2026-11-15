import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative bg-gradient-to-b from-[#EBF3F7] via-slate-50 to-white pt-10 sm:pt-16 pb-14 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado izquierdo: Textos y CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F2D6] text-[#4A6B1A] text-xs font-bold uppercase tracking-wider border border-[#CDE5B3]">
              <span className="w-2 h-2 rounded-full bg-[#8FB838] animate-pulse"></span>
              Más de 10 años conectando familias
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1E3A5F] tracking-tight leading-tight">
              Envía tu paquete a México con la confianza de una{" "}
              <span className="text-[#8FB838]">empresa familiar</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Entrega tu caja en la tienda de tu barrio en Wisconsin. Nosotros la llevamos protegida hasta la puerta de tu familia en cualquier estado de México en{" "}
              <strong className="text-[#1E3A5F]">2 a 3 semanas</strong>.
            </p>

            {/* 3 Botones Principales del Wireframe */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition active:scale-95 text-sm sm:text-base"
              >
                <MessageCircle size={20} />
                <span>Enviar por WhatsApp</span>
              </a>

              <Link
                href="/agentes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1E3A5F] hover:bg-[#152B47] text-white font-bold rounded-xl shadow-xs transition text-sm sm:text-base"
              >
                <MapPin size={18} />
                <span>Encuentra tu agente</span>
              </Link>

              <Link
                href="/tarifas"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-[#1E3A5F] font-bold rounded-xl border-2 border-[#1E3A5F] shadow-xs transition text-sm sm:text-base"
              >
                <Package size={18} className="text-[#8FB838]" />
                <span>Ver tarifas</span>
              </Link>
            </div>

            <div className="pt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-[#8FB838] shrink-0" />
              <span>
                Cruce aduanal seguro en Texas · Sin trámites difíciles · Pago directo en tienda
              </span>
            </div>
          </div>

          {/* Lado derecho: Foto Real de la Bodega y Operación */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src="/images/hero-warehouse.jpg"
                  alt="Bodega central de Ideal Express y manejo de paquetería"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2438]/85 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
                <span className="bg-[#8FB838] text-[#0F2438] font-black text-[10px] uppercase px-2.5 py-0.5 rounded tracking-wider inline-block">
                  Foto Real
                </span>
                <p className="font-bold text-sm">Bodega Matriz y Centro Logístico Milwaukee</p>
                <p className="text-[11px] text-slate-300">
                  Recepción, pesado y consolidación para cruce directo en Laredo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
