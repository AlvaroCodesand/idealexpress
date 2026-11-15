import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TARIFF_CONFIG } from "@/constants/config";
import { MessageCircle, MapPin, Package, CheckCircle2 } from "lucide-react";

export const HeroSection: React.FC = () => {
  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20cotizar%20un%20envío%20a%20México.`;

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 overflow-hidden border-b border-[#E8E1D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado izquierdo: Composición Tipográfica */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0E283F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E5C10]"></span>
              <span>Ruta directa: Milwaukee ➔ Laredo ➔ Todo México</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#0E283F] leading-[1.16] tracking-tight text-balance">
              Tus envíos a México, con la seriedad de una empresa familiar.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl text-pretty">
              Más de 10 años conectando hogares. Entrega tu caja en la tienda hispana de tu barrio en Wisconsin; nosotros la trasladamos con manifiesto aduanal legal hasta el domicilio de tu familia en un plazo habitual de 2 a 3 semanas.
            </p>

            {/* Fila de Tarifa Base Rápida (Aplanada, sin tarjeta anidada) */}
            <div className="flex flex-wrap items-center gap-6 py-2 border-y border-[#E8E1D5] text-xs">
              <div className="font-mono">
                <span className="text-slate-500 block">Tarifa fija estándar</span>
                <span className="text-2xl font-bold text-[#0E283F]">${TARIFF_CONFIG.pricePerPound}</span>
                <span className="text-slate-600 font-bold"> USD / lb</span>
              </div>
              <div className="h-8 w-px bg-[#E8E1D5] hidden sm:block"></div>
              <div className="space-y-0.5 text-slate-600">
                <p className="font-bold text-[#0E283F]">Mínimo 15 libras (${TARIFF_CONFIG.minPriceUSD} USD)</p>
                <p className="text-slate-500">Sin aranceles imprevistos ni trámites para tu destinatario</p>
              </div>
            </div>

            {/* 3 Botones Principales */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition active:scale-95 text-xs sm:text-sm tracking-wide"
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] transition text-xs sm:text-sm"
              >
                <Package size={17} className="text-slate-500" />
                <span>Ver tarifas</span>
              </Link>
            </div>

            {/* Puntos destacados */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Cruce directo en Laredo</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Entrega a domicilio</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#3E5C10] shrink-0" />
                <span>Póliza de seguro opcional</span>
              </span>
            </div>
          </div>

          {/* Lado derecho: Fotografía limpia sin elementos anidados */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-[#E8E1D5]">
              <Image
                src="/images/hero-warehouse.jpg"
                alt="Bodega matriz de Ideal Express en Milwaukee"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E283F]/85 via-transparent to-transparent"></div>

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-mono font-bold text-[#0E283F] uppercase shadow-2xs">
                Bodega Milwaukee · WI
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="bg-[#3E5C10] text-white font-mono font-bold text-xs uppercase px-2 py-0.5 rounded inline-block">
                  OPERACIÓN CENTRAL
                </span>
                <p className="font-serif font-bold text-base sm:text-lg">
                  1565 W Greenfield Ave, Milwaukee
                </p>
                <p className="text-xs text-slate-200">
                  Básculas certificadas y consolidación para camiones semanales.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E1D5] flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold text-[#0E283F]">Última milla en México:</span>
              <span className="font-mono text-slate-700">Estafeta · Paquetexpress · FedEx</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
