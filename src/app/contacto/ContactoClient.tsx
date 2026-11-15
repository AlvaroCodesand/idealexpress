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
      {/* 1. HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#8FB838] text-xs font-black uppercase tracking-widest">
          Atención Directa
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] tracking-tight">
          6. Contacto y Bodega Matriz
        </h1>
        <p className="text-sm text-slate-600">
          Un solo lugar con los datos oficiales y confirmados de Ideal Express en Milwaukee.
        </p>
      </div>

      {/* 2. LAYOUT A 2 COLUMNAS (PC 6 DEL WIREFRAME) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Datos Oficiales y Programar Recolección */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#1E3A5F] border-b border-stone-100 pb-3">
              Datos de Contacto Directo
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">WhatsApp Oficial:</strong>
                  <span className="text-emerald-700 font-black text-base">
                    {TARIFF_CONFIG.whatsappDisplay}
                  </span>
                  <a
                    href={`https://wa.me/${TARIFF_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-bold text-emerald-600 hover:underline mt-0.5"
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

          {/* Bloque: Programar Recolección (Wireframe PC 6) */}
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F2438] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md border-t-4 border-[#8FB838]">
            <div className="flex items-center gap-2 text-[#8FB838] font-bold text-xs uppercase tracking-wider">
              <Truck size={18} />
              <span>Servicio a Domicilio</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Programar recolección
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ¿Tienes una caja de más de 40 lbs o no tienes cómo trasladarla? Pide que pasemos a recolectarla a tu domicilio en el área metropolitana de Milwaukee con 24 horas hábiles de anticipación.
            </p>
            <a
              href={`https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20quisiera%20solicitar%20recolección%20de%20caja%20a%20domicilio%20en%20Milwaukee.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8FB838] hover:bg-[#7EA62F] text-[#0F2438] font-black rounded-xl text-xs uppercase tracking-wider transition active:scale-95 shadow-md"
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
              <h3 className="font-bold text-base text-[#1E3A5F] flex items-center gap-2">
                <MapPin size={18} className="text-[#8FB838]" />
                <span>Ubicación de la Bodega Matriz</span>
              </h3>
              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                Milwaukee, WI
              </span>
            </div>

            <WarehouseMap />
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">Envíanos un mensaje</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs space-y-2">
                <CheckCircle size={32} className="text-emerald-600 mx-auto" />
                <p className="font-bold text-emerald-900">¡Mensaje recibido con éxito!</p>
                <p className="text-emerald-700">Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50"
                      placeholder="(414) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Motivo:</label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50"
                    placeholder="Escribe tus dudas sobre envíos o detalles de recolección..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A5F] hover:bg-[#152B47] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-95"
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
