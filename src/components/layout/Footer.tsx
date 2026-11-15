"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TARIFF_CONFIG } from "@/constants/config";
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/portal/impresion")) {
    return null;
  }

  return (
    <footer className="bg-[#0F2438] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Empresa y Logo Oficial */}
          <div>
            <div className="mb-4 bg-white inline-block p-2 rounded-xl shadow-xs">
              <Image
                src="/logo.png"
                alt="Ideal Express Logo Oficial"
                width={140}
                height={35}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Más de 10 años conectando familias en Wisconsin con sus seres queridos en todo México. Envíos seguros, directos y con trato familiar de confianza.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8FB838] font-medium">
              <ShieldCheck size={16} />
              <span>Cruce aduanal seguro en Texas y entrega garantizada</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#8FB838] pl-2">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition">Inicio</Link>
              </li>
              <li>
                <Link href="/como-enviar" className="hover:text-white transition">¿Cómo funciona el envío?</Link>
              </li>
              <li>
                <Link href="/tarifas" className="hover:text-white transition">Precios por libra y medidas</Link>
              </li>
              <li>
                <Link href="/calendario" className="hover:text-white transition">Calendario Navideño</Link>
              </li>
              <li>
                <Link href="/agentes" className="hover:text-white transition">Directorio de tiendas aliadas</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">Bodega central y teléfonos</Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/portal" className="text-[#8FB838] hover:text-white font-semibold transition">
                  Acceso exclusivo para Agentes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Bodega Central */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#8FB838] pl-2">
              Bodega Central
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#8FB838] shrink-0 mt-0.5" />
                <span>1565 W Greenfield Ave, Milwaukee, WI 53204</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#8FB838] shrink-0" />
                <span>(414) 763-8705 / (414) 339-8747</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#8FB838] shrink-0" />
                <span>info@idealgroupwi.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#8FB838] shrink-0 mt-0.5" />
                <div>
                  <p>Bodega: Lun - Vie 9:00 AM - 5:00 PM</p>
                  <p>Atención: Lun - Vie 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Compromiso */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#8FB838] pl-2 flex items-center gap-2">
              <HeartHandshake size={15} className="text-[#8FB838]" />
              <span>Trato Familiar y Seguro</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed text-pretty">
              Sabemos el esfuerzo que hay detrás de cada caja. Su paquete viaja protegido hasta las manos de su destinatario a través de paqueterías líderes en México.
            </p>
            <div className="pt-2 text-xs text-slate-300">
              WhatsApp de atención directa: <br />
              <strong className="text-white font-mono text-sm">{TARIFF_CONFIG.whatsappDisplay}</strong>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© 2026 Ideal Express. Todos los derechos reservados.</p>
          <p>
            Transformación Digital e Imagen de Marca por <strong className="text-slate-200">Codesand</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
};
