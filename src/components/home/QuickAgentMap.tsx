"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SEED_AGENTS } from "@/constants/seedData";
import { AgentMap } from "@/components/maps/AgentMap";
import { Search, MapPin, Phone, Clock, ArrowRight, Navigation } from "lucide-react";

export const QuickAgentMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(SEED_AGENTS[0].id);

  const filteredAgents = SEED_AGENTS.filter((agent) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      agent.storeName.toLowerCase().includes(q) ||
      agent.city.toLowerCase().includes(q) ||
      agent.address.toLowerCase().includes(q) ||
      agent.zip.includes(q)
    );
  });

  return (
    <section className="py-20 sm:py-28 border-b border-[#E8E1D5] bg-[#F4EFE6]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encabezado Desahogado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
              Encuentra tu Tienda o Agente Cercano
            </h2>
            <p className="text-base text-slate-700 leading-relaxed text-pretty">
              Puntos hispanos autorizados en Milwaukee, Racine y Sheboygan. Entrega tu caja con atención en tu idioma y comprobante digital firmado.
            </p>
          </div>

          <Link
            href="/agentes"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0E283F] hover:text-[#3E5C10] uppercase tracking-wider shrink-0 bg-white px-5 py-3 rounded-xl border border-[#E8E1D5] shadow-2xs hover:shadow-xs transition"
          >
            <span>Ver todas las tiendas</span>
            <ArrowRight size={15} className="text-[#3E5C10]" />
          </Link>
        </div>

        {/* Layout Amplio a Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Lado izquierdo: Buscador y Tarjetas Espaciosas */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por ciudad o código postal (Milwaukee, 53204)..."
                className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm border border-[#E8E1D5] rounded-2xl bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#0E283F] font-medium text-[#0E283F] placeholder-slate-500"
              />
            </div>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#0E283F] shadow-md ring-2 ring-[#3E5C10]/20"
                        : "bg-white/95 border-[#E8E1D5] hover:border-[#0E283F]/40 shadow-2xs hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#0E283F] leading-snug">
                          {agent.storeName}
                        </h3>
                        <span className="text-xs text-slate-600 block mt-0.5">
                          Atención: {agent.contactName}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#F4EFE6] text-[#0E283F] font-mono text-xs font-bold uppercase shrink-0 border border-[#E8E1D5]">
                        {agent.city}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 my-3">
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="text-[#3E5C10] shrink-0 mt-0.5" />
                        <span>
                          {agent.address}, {agent.city}, {agent.state} {agent.zip}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={13} className="text-slate-500 shrink-0" />
                        <span>{agent.hours}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={13} className="text-slate-500 shrink-0" />
                        <span className="font-bold text-[#0E283F]">{agent.phone}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs">
                      <span className="text-xs font-bold text-[#0E283F] hover:underline flex items-center gap-1.5">
                        <Navigation size={13} className="text-[#3E5C10]" />
                        <span>Ubicar en mapa</span>
                      </span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${agent.storeName} ${agent.address} ${agent.city} ${agent.state}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-bold text-slate-800 hover:text-[#0E283F] bg-[#FAF8F5] hover:bg-[#F4EFE6] px-3.5 py-1.5 rounded-lg border border-[#E8E1D5] transition shadow-2xs"
                      >
                        Cómo llegar ↗
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredAgents.length === 0 && (
                <div className="p-8 bg-white rounded-2xl text-center text-xs text-slate-600 border border-[#E8E1D5]">
                  No se encontraron agentes para ese criterio de búsqueda.
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Mapa Amplio con altura de 560px */}
          <div className="lg:col-span-7">
            <AgentMap
              agents={filteredAgents}
              selectedAgentId={selectedAgentId}
              onSelectAgent={(agent) => setSelectedAgentId(agent.id)}
              className="h-[560px] w-full rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm"
              zoom={11}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
