"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TARIFF_CONFIG } from "@/constants/config";
import { Menu, X, MessageCircle, Lock } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Ocultar Navbar en vistas de impresión
  if (pathname?.startsWith("/portal/impresion")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/como-enviar", label: "Cómo enviar" },
    { href: "/tarifas", label: "Servicios y Tarifas" },
    { href: "/calendario", label: "Calendario de Envíos" },
    { href: "/agentes", label: "Agentes y Sucursales" },
    { href: "/contacto", label: "Contacto" },
  ];

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20deseo%20información%20para%20enviar%20un%20paquete%20a%20México.`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial de Ideal Express */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-44 sm:w-48">
              <Image
                src="/logo.png"
                alt="Ideal Express - Encomiendas y Paquetería a todo México"
                fill
                priority
                className="object-contain object-left group-hover:opacity-95 transition"
              />
            </div>
          </Link>

          {/* Enlaces de Navegación (Colores oficiales: Azul #1E3A5F y Verde #8FB838) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition py-1 ${
                    active
                      ? "text-[#1E3A5F] border-b-2 border-[#8FB838] font-bold"
                      : "text-slate-700 hover:text-[#1E3A5F]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Botones de Acción */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1E3A5F] hover:text-white bg-[#EBF3F7] hover:bg-[#1E3A5F] rounded-lg transition border border-slate-200"
              title="Portal exclusivo para tiendas aliadas"
            >
              <Lock size={14} className="text-[#2B5B75]" />
              <span>Portal Agentes</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition active:scale-95"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:text-emerald-700 sm:hidden"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Abrir menú"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="lg:hidden bg-slate-50 border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  pathname === link.href
                    ? "bg-[#1E3A5F] text-white"
                    : "text-slate-800 hover:bg-slate-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-[#1E3A5F] bg-white border border-slate-300 rounded-lg"
            >
              <Lock size={16} />
              <span>Acceso Agentes (Captura de Envíos)</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 rounded-lg"
            >
              <MessageCircle size={18} />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
