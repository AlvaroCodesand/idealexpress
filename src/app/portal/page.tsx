"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SEED_AGENTS } from "@/constants/seedData";
import { Agent } from "@/types";
import { Lock, Store, KeyRound, ArrowRight, ShieldCheck, Info } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [selectedAgentId, setSelectedAgentId] = useState<string>(SEED_AGENTS[0].id);
  const [pin, setPin] = useState<string>("ideal2026");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const agent = SEED_AGENTS.find((a) => a.id === selectedAgentId);
    if (!agent) {
      setError("Por favor seleccione un agente válido.");
      return;
    }

    if (agent.pin !== pin.trim()) {
      setError("Clave o PIN incorrecto. Revisa las credenciales de prueba abajo.");
      return;
    }

    localStorage.setItem("ideal_active_agent", JSON.stringify(agent));
    router.push("/portal/captura");
  };

  const handleSelectQuickAgent = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    setPin(agent.pin);
    setError("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xl">
        {/* Cabecera */}
        <div className="text-center space-y-3">
          <div className="relative h-12 w-48 mx-auto mb-2">
            <img
              src="/logo.png"
              alt="Ideal Express"
              className="h-10 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-2xl font-black text-[#1E3A5F] tracking-tight">
            Portal de Agentes
          </h1>
          <p className="text-xs text-slate-500">
            Acceso exclusivo para tiendas aliadas y captura de envíos frente al cliente.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Store size={15} className="text-[#1E3A5F]" />
              <span>Tienda / Agente Autorizado:</span>
            </label>
            <select
              value={selectedAgentId}
              onChange={(e) => {
                setSelectedAgentId(e.target.value);
                const ag = SEED_AGENTS.find((a) => a.id === e.target.value);
                if (ag) setPin(ag.pin);
                setError("");
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] bg-white"
            >
              {SEED_AGENTS.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.storeName} ({agent.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <KeyRound size={15} className="text-[#1E3A5F]" />
              <span>Clave de Acceso (PIN):</span>
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              placeholder="Ingresa la clave del agente..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#1E3A5F]"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1E3A5F] hover:bg-[#152B47] text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-95"
          >
            <span>Ingresar al Sistema de Captura</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Accesos rápidos de prueba para la demo */}
        <div className="pt-4 border-t border-stone-100 bg-stone-50 p-4 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold">
            <Info size={14} className="text-orange-600" />
            <span>Accesos rápidos de demostración:</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Haz clic en cualquiera para autocompletar las credenciales:
          </p>
          <div className="space-y-1.5 pt-1">
            {SEED_AGENTS.map((agent) => (
              <button
                key={agent.id}
                type="button"
                onClick={() => handleSelectQuickAgent(agent)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] flex justify-between items-center transition ${
                  selectedAgentId === agent.id
                    ? "bg-orange-100 text-orange-900 font-bold border border-orange-200"
                    : "hover:bg-stone-200 text-slate-700"
                }`}
              >
                <span>{agent.storeName}</span>
                <code className="text-slate-500 font-mono text-[10px]">{agent.pin}</code>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Conexión segura con Microsoft 365 Lists</span>
        </div>
      </div>
    </div>
  );
}
