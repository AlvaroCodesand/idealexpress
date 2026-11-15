"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SEED_AGENTS } from "@/constants/seedData";
import { AgentMap } from "@/components/maps/AgentMap";
import { Search, MapPin, Phone, Clock, ArrowRight, Navigation, Sparkles } from "lucide-react";

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
    <section className="py-16 border-y border-[#E8E1D5] bg-[#F4EFE6]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#7BA029] font-mono text-xs font-bold uppercase tracking-widest block">
              PUNTOS DE RECOLECCIÓN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E283F] tracking-tight mt-1">
              Encuentra tu Tienda o Agente Cercano
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Comercios hispanos autorizados en Milwaukee, Racine y Sheboygan. Selecciona uno para ubicarlo en el mapa.
            </p>
          </div>

          <Link
            href="/agentes"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0E283F] hover:text-[#7BA029] uppercase tracking-wider shrink-0 bg-white px-3.5 py-2 rounded-lg border border-[#E8E1D5] shadow-2xs transition"
          >
            <span>Directorio completo</span>
            <ArrowRight size={14} className="text-[#7BA029]" />
          </Link>
        </div>

        {/* Layout a dos columnas con acabado artesanal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado izquierdo: Buscador y Tarjetas Táctiles */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe tu ciudad o código postal (Milwaukee, 53204)..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-[#E8E1D5] rounded-xl bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#0E283F] font-medium"
              />
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#0E283F] shadow-md ring-2 ring-[#7BA029]/30"
                        : "bg-white/90 border-[#E8E1D5] hover:border-[#0E283F]/40 hover:bg-white shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h3 className="font-serif font-bold text-sm sm:text-base text-[#0E283F] leading-snug">
                          {agent.storeName}
                        </h3>
                        <span className="text-[11px] text-slate-500 block">
                          Atención: {agent.contactName}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#F4EFE6] text-[#0E283F] font-mono text-[10px] font-bold uppercase shrink-0 border border-[#E8E1D5]">
                        {agent.city}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 my-2.5">
                      <p className="flex items-start gap-1.5">
                        <MapPin size={13} className="text-[#7BA029] shrink-0 mt-0.5" />
                        <span>
                          {agent.address}, {agent.city}, {agent.state} {agent.zip}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400 shrink-0" />
                        <span className="text-[11px]">{agent.hours}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400 shrink-0" />
                        <span className="font-bold text-[#0E283F]">{agent.phone}</span>
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#F4EFE6] flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-[#0E283F] hover:underline flex items-center gap-1">
                        <Navigation size={12} className="text-[#7BA029]" />
                        <span>Ubicar en mapa</span>
                      </span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${agent.storeName} ${agent.address} ${agent.city} ${agent.state}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-mono font-bold text-slate-700 hover:text-[#0E283F] bg-[#FAF8F5] hover:bg-[#F4EFE6] px-2.5 py-1 rounded border border-[#E8E1D5] transition"
                      >
                        Cómo llegar ↗
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredAgents.length === 0 && (
                <div className="p-6 bg-white rounded-xl text-center text-xs text-slate-500 border border-[#E8E1D5]">
                  No se encontraron agentes para ese criterio.
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Mapa Grande Interactivo con Marco de Precisión */}
          <div className="lg:col-span-7 bg-white p-2 rounded-2xl border border-[#E8E1D5] shadow-sm">
            <div className="relative">
              <AgentMap
                agents={filteredAgents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={(agent) => setSelectedAgentId(agent.id)}
                className="h-[520px] w-full rounded-xl overflow-hidden"
                zoom={11}
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#0E283F] border border-[#E8E1D5] uppercase tracking-wider z-20 shadow-2xs">
                LOCALIZADOR SATELITAL Y COMERCIAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
