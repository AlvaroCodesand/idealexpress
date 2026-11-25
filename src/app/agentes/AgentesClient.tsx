"use client";

import React, { useState } from "react";
import { Agent } from "@/types";
import { SEED_AGENTS } from "@/constants/seedData";
import { TARIFF_CONFIG } from "@/constants/config";
import { AgentMap } from "@/components/maps/AgentMap";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Building2,
  MessageCircle,
  Navigation,
} from "lucide-react";

interface AgentesClientProps {
  initialAgents?: Agent[];
}

export default function AgentesClient({ initialAgents }: AgentesClientProps) {
  const allAgents = initialAgents && initialAgents.length > 0 ? initialAgents : SEED_AGENTS;
  const [filterCity, setFilterCity] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(allAgents[0]?.id || null);

  const filteredAgents = allAgents.filter((agent) => {
    const matchesCity =
      filterCity === "todos" || agent.city.toLowerCase() === filterCity.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      agent.storeName.toLowerCase().includes(query) ||
      agent.address.toLowerCase().includes(query) ||
      agent.city.toLowerCase().includes(query) ||
      agent.zip.includes(query);
    return matchesCity && matchesSearch;
  });

  const cities = ["todos", ...Array.from(new Set(allAgents.map((a) => a.city)))];
  const waAgentUrl = `https://wa.me/${TARIFF_CONFIG.whatsappNumber}?text=Hola,%20tengo%20un%20negocio%20y%20me%20gustaría%20ser%20agente%20de%20Ideal%20Express.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-16">
      {/* 1. HEADER (Sin kicker artificial) */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
          Directorio de Tiendas y Agentes Aliados
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed text-pretty">
          Entrega tu paquete en el comercio hispano de tu comunidad. Selecciona cualquier agente para ver su ubicación en el mapa interactivo.
        </p>
      </div>

      {/* 2. FILTRO POR CIUDAD */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Escribe tu ciudad, tienda o código postal (Milwaukee, Madison, Kenosha)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E283F] bg-slate-50 text-[#0E283F] placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-600 mr-1">Filtrar:</span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setFilterCity(city)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                filterCity === city
                  ? "bg-[#0E283F] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LAYOUT DEL WIREFRAME PC 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Lista de Agentes */}
        <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
          {filteredAgents.map((agent) => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#0E283F] shadow-md ring-2 ring-[#3E5C10]/20"
                    : "bg-white border-slate-200 hover:border-[#0E283F]/40 shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h2 className="font-display font-bold text-base text-[#0E283F] leading-snug">
                      {agent.storeName}
                    </h2>
                    <span className="text-xs text-slate-600 block">
                      Atención: {agent.contactName}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#F4EFE6] text-[#0E283F] rounded-md font-mono text-xs font-bold uppercase shrink-0 border border-[#E8E1D5]">
                    {agent.city}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="text-[#3E5C10] shrink-0 mt-0.5" />
                    <span>
                      {agent.address}, {agent.city}, {agent.state} {agent.zip}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-500 shrink-0" />
                    <span>{agent.hours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-500 shrink-0" />
                    <span className="font-bold text-[#0E283F]">{agent.phone}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${agent.storeName} ${agent.address} ${agent.city} ${agent.state}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Navigation size={13} className="text-[#3E5C10]" />
                    <span>Cómo llegar</span>
                  </a>
                  <a
                    href={`tel:${agent.phone.replace(/\D/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 text-center bg-[#0E283F] hover:bg-[#183D61] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Phone size={13} />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            );
          })}

          {filteredAgents.length === 0 && (
            <div className="p-8 bg-white rounded-2xl text-center text-xs text-slate-600 border border-slate-200">
              No se encontraron agentes disponibles para ese filtro.
            </div>
          )}
        </div>

        {/* Columna Derecha: Mapa Grande */}
        <div className="lg:col-span-7 sticky top-24">
          <AgentMap
            agents={filteredAgents}
            selectedAgentId={selectedAgentId}
            onSelectAgent={(agent) => setSelectedAgentId(agent.id)}
            className="h-[580px] w-full rounded-2xl shadow-md border border-slate-200"
            zoom={11}
          />
        </div>
      </div>

      {/* 4. BLOQUE: ¿TIENES UN NEGOCIO? SÚMATE A LA RED */}
      <div className="bg-[#0E283F] text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-[#183D61]">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#8FB838]">
            <Building2 size={15} />
            <span>Red de Agentes Autorizados</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            ¿Tienes un comercio hispano en Wisconsin?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-pretty">
            Súmate a la red de puntos de Ideal Express. Atrae tráfico de clientes hispanos a tu tienda y obtén comisiones por cada caja registrada desde tu mostrador.
          </p>
        </div>

        <a
          href={waAgentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition active:scale-95"
        >
          <MessageCircle size={18} />
          <span>Quiero ser Agente</span>
        </a>
      </div>
    </div>
  );
}
