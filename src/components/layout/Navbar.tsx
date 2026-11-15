"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TARIFF_CONFIG } from "@/constants/config";
import { Menu, X, MessageCircle, Lock, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/portal/impresion")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/como-enviar", label: "Cómo enviar" },
    { href: "/tarifas", label: "Servicios y Tarifas" },
    { href: "/calendario", label: "Calendario Navideño" },
    { href: "/agentes", label: "Tiendas y Sucursales" },
    { href: "/contacto", label: "Contacto" },
  ];

  const waUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20deseo%20información%20para%20enviar%20un%20paquete%20a%20México.`;

  return (
    <nav className="bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial de Ideal Express */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <div className="relative h-11 w-44 sm:w-48 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Ideal Express - Encomiendas y Paquetería a todo México"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Enlaces de Navegación */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-semibold transition py-1.5 relative ${
                    active
                      ? "text-[#0E283F] font-bold"
                      : "text-slate-600 hover:text-[#0E283F]"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7BA029] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Botones de Acción */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-[#0E283F] hover:text-white bg-[#F4EFE6] hover:bg-[#0E283F] rounded-lg transition border border-[#E8E1D5] shadow-2xs"
              title="Portal exclusivo para tiendas aliadas"
            >
              <Lock size={12} className="text-[#7BA029]" />
              <span>Portal Agentes</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition active:scale-95"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Menú Móvil */}
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
              className="p-2 rounded-lg text-slate-800 hover:bg-[#F4EFE6] transition focus:outline-hidden"
              aria-label="Abrir menú"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Móvil */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E8E1D5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  pathname === link.href
                    ? "bg-[#0E283F] text-white"
                    : "text-slate-800 hover:bg-[#F4EFE6]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E1D5] flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-mono font-bold text-[#0E283F] bg-white border border-[#E8E1D5] rounded-lg"
            >
              <Lock size={14} className="text-[#7BA029]" />
              <span>Acceso Agentes (Punto de Venta)</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 text-xs uppercase tracking-wider font-bold text-white bg-emerald-700 rounded-lg shadow-sm"
            >
              <MessageCircle size={16} />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
