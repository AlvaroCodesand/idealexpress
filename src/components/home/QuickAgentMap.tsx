"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SEED_AGENTS } from "@/constants/seedData";
import { Agent } from "@/types";
import { AgentMap } from "@/components/maps/AgentMap";
import { Search, MapPin, Phone, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <section className="bg-stone-100/80 py-16 border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#8FB838] text-xs font-black uppercase tracking-widest">
              Cerca de Ti
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] tracking-tight mt-1">
              4. Encuentra tu Agente o Tienda Aliada
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Haz clic en cualquier agente para ubicarlo en el mapa interactivo.
            </p>
          </div>

          <Link
            href="/agentes"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E3A5F] hover:text-[#8FB838] uppercase tracking-wider shrink-0"
          >
            <span>Ver todos los agentes</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Diseño a dos columnas idéntico a PC 1 & PC 5 del Wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado izquierdo: Buscador y Tarjetas de Agentes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe tu ciudad o código postal (ej. Milwaukee, Racine, 53204)..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#1E3A5F] shadow-md ring-2 ring-[#8FB838]/40"
                        : "bg-white/90 border-stone-200 hover:border-[#1E3A5F]/40 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {agent.storeName}
                      </h3>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-slate-600 shrink-0">
                        {agent.city}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <p className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-[#8FB838] shrink-0 mt-0.5" />
                        <span>
                          {agent.address}, {agent.city}, {agent.state} {agent.zip}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span className="text-[11px]">{agent.hours}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone size={13} className="text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800">{agent.phone}</span>
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-[#1E3A5F] hover:underline">
                        Ver en mapa
                      </span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${agent.storeName} ${agent.address} ${agent.city} ${agent.state}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold text-slate-700 hover:text-[#1E3A5F] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition"
                      >
                        Cómo llegar ↗
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredAgents.length === 0 && (
                <div className="p-6 bg-white rounded-xl text-center text-xs text-slate-500 border border-stone-200">
                  No se encontraron agentes para esa búsqueda.
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Mapa Grande Interactivo con Pines */}
          <div className="lg:col-span-7">
            <AgentMap
              agents={filteredAgents}
              selectedAgentId={selectedAgentId}
              onSelectAgent={(agent) => setSelectedAgentId(agent.id)}
              className="h-[520px] w-full rounded-2xl"
              zoom={11}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
