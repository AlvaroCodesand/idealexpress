"use client";

import React, { useState } from "react";
import { TARIFF_CONFIG, APP_CONFIG } from "@/constants/config";
import { WarehouseMap } from "@/components/maps/WarehouseMap";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function ContactoClient() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    tipo: "consulta",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. HEADER (Sin kicker artificial) */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
          Contacto y Bodega Matriz
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed text-pretty">
          Información oficial confirmada de Ideal Express en Milwaukee, Wisconsin.
        </p>
      </div>

      {/* 2. LAYOUT A 2 COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Datos Oficiales y Programar Recolección */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#0E283F] border-b border-slate-100 pb-3">
              Datos de Contacto Directo
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">WhatsApp Oficial:</strong>
                  <span className="text-emerald-800 font-mono font-bold text-base">
                    {TARIFF_CONFIG.whatsappDisplay}
                  </span>
                  <a
                    href={`https://wa.me/${TARIFF_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-bold text-emerald-800 hover:underline mt-0.5"
                  >
                    Abrir chat de WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3F7] text-[#1E3A5F] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Teléfonos:</strong>
                  <p>
                    <a href="tel:4147638705" className="hover:text-[#1E3A5F] font-bold">
                      (414) 763-8705
                    </a>
                  </p>
                  <p>
                    <a href="tel:4143398747" className="hover:text-[#1E3A5F] font-semibold">
                      (414) 339-8747
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3F7] text-[#1E3A5F] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Correo Electrónico:</strong>
                  <span>{APP_CONFIG.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3F7] text-[#1E3A5F] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Horarios de Atención:</strong>
                  <p>Bodega: Lunes a Viernes 9:00 AM – 5:00 PM</p>
                  <p>Atención telefónica: 10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque: Programar Recolección */}
          <div className="bg-[#0E283F] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md border border-[#183D61]">
            <div className="flex items-center gap-2 text-[#8FB838] font-bold text-xs uppercase tracking-wider">
              <Truck size={18} />
              <span>Servicio a Domicilio</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Programar recolección
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-pretty">
              ¿Tienes una caja de más de 40 lbs o no tienes cómo trasladarla? Pide que pasemos a recolectarla a tu domicilio en el área metropolitana de Milwaukee con 24 horas hábiles de anticipación.
            </p>
            <a
              href={`https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20solicitar%20recolección%20de%20caja%20a%20domicilio%20en%20Milwaukee.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7BA029] hover:bg-[#6C8E24] text-[#0E283F] font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-95 shadow-md"
            >
              <span>Solicitar recolección por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Columna Derecha: Mapa de la Bodega y Formulario */}
        <div className="lg:col-span-6 space-y-6">
          {/* Mapa Interactivo de la Bodega */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-[#0E283F] flex items-center gap-2">
                <MapPin size={18} className="text-[#3E5C10]" />
                <span>Ubicación de la Bodega Matriz</span>
              </h2>
              <span className="text-xs font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                Milwaukee, WI
              </span>
            </div>

            <WarehouseMap />
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-base text-slate-900">Envíanos un mensaje</h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs space-y-2">
                <CheckCircle size={32} className="text-emerald-700 mx-auto" />
                <p className="font-bold text-emerald-900">¡Mensaje recibido con éxito!</p>
                <p className="text-emerald-800">Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-[#0E283F]"
                    placeholder="Tu nombre y apellido"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Teléfono:</label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-[#0E283F]"
                      placeholder="(414) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Motivo:</label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-[#0E283F]"
                    >
                      <option value="consulta">Consulta de Tarifas</option>
                      <option value="recoleccion">Solicitar Recolección</option>
                      <option value="agente">Quiero ser Agente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mensaje o Dirección:</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-[#0E283F]"
                    placeholder="Escribe tus dudas sobre envíos o detalles de recolección..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0E283F] hover:bg-[#183D61] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-95 shadow-xs"
                >
                  Enviar Formulario
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
