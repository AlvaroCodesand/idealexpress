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
    <section className="py-16 border-y border-[#E8E1D5] bg-[#F4EFE6]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E283F] tracking-tight text-balance">
              Encuentra tu Tienda o Agente Cercano
            </h2>
            <p className="text-sm text-slate-700 mt-1 text-pretty">
              Puntos hispanos autorizados en Milwaukee, Racine y Sheboygan. Haz clic en cualquiera para ver su ubicación en el mapa.
            </p>
          </div>

          <Link
            href="/agentes"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0E283F] hover:text-[#3E5C10] uppercase tracking-wider shrink-0 bg-white px-4 py-2.5 rounded-lg border border-[#E8E1D5] shadow-2xs transition"
          >
            <span>Directorio completo</span>
            <ArrowRight size={14} className="text-[#3E5C10]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado izquierdo: Buscador y Tarjetas */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe tu ciudad o código postal (Milwaukee, 53204)..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-[#E8E1D5] rounded-xl bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#0E283F] font-medium placeholder-slate-500 text-[#0E283F]"
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
                        ? "bg-white border-[#0E283F] shadow-md ring-2 ring-[#3E5C10]/20"
                        : "bg-white/95 border-[#E8E1D5] hover:border-[#0E283F]/40 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#0E283F] leading-snug">
                          {agent.storeName}
                        </h3>
                        <span className="text-xs text-slate-600 block">
                          Atención: {agent.contactName}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#F4EFE6] text-[#0E283F] font-mono text-xs font-bold uppercase shrink-0 border border-[#E8E1D5]">
                        {agent.city}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 my-2.5">
                      <p className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-[#3E5C10] shrink-0 mt-0.5" />
                        <span>
                          {agent.address}, {agent.city}, {agent.state} {agent.zip}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-500 shrink-0" />
                        <span>{agent.hours}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone size={13} className="text-slate-500 shrink-0" />
                        <span className="font-bold text-[#0E283F]">{agent.phone}</span>
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#F4EFE6] flex items-center justify-between text-xs">
                      <span className="text-xs font-bold text-[#0E283F] hover:underline flex items-center gap-1">
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
                        className="text-xs font-mono font-bold text-slate-800 hover:text-[#0E283F] bg-[#FAF8F5] hover:bg-[#F4EFE6] px-3 py-1 rounded border border-[#E8E1D5] transition"
                      >
                        Cómo llegar ↗
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredAgents.length === 0 && (
                <div className="p-6 bg-white rounded-xl text-center text-xs text-slate-600 border border-[#E8E1D5]">
                  No se encontraron agentes para esa búsqueda.
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Mapa */}
          <div className="lg:col-span-7">
            <AgentMap
              agents={filteredAgents}
              selectedAgentId={selectedAgentId}
              onSelectAgent={(agent) => setSelectedAgentId(agent.id)}
              className="h-[540px] w-full rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-xs"
              zoom={11}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
