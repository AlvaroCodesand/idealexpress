"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SEED_AGENTS } from "@/constants/seedData";
import { Agent } from "@/types";
import { Store, KeyRound, ArrowRight, ShieldCheck, Info } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>(SEED_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(SEED_AGENTS[0].id);
  const [pin, setPin] = useState<string>("ideal2026");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/agentes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAgents(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: selectedAgentId, pin: pin.trim() }),
      });

      const json = await res.json();
      if (!json.success || !json.data) {
        setError(json.error || "Clave o PIN incorrecto.");
        return;
      }

      localStorage.setItem("ideal_active_agent", JSON.stringify(json.data));
      router.push("/portal/captura");
    } catch {
      setError("Error de conexión al validar credenciales.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectQuickAgent = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    setError("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xl">
        {/* Cabecera */}
        <div className="text-center space-y-3">
          <div className="relative h-12 w-48 mx-auto mb-2">
            <Image
              src="/logo.png"
              alt="Ideal Express"
              width={192}
              height={40}
              priority
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
                const ag = agents.find((a) => a.id === e.target.value);
                if (ag) setPin(ag.pin);
                setError("");
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] bg-white"
            >
              {agents.map((agent) => (
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
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1E3A5F] hover:bg-[#152B47] disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-95"
          >
            <span>{isSubmitting ? "Validando..." : "Ingresar al Sistema de Captura"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Accesos rápidos de prueba para la demo */}
        <div className="pt-4 border-t border-stone-100 bg-stone-50 p-4 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold">
            <Info size={14} className="text-orange-600" />
            <span>Selección rápida de tienda:</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Haz clic en tu sucursal e ingresa tu PIN de acceso:
          </p>
          <div className="space-y-1.5 pt-1 max-h-48 overflow-y-auto">
            {agents.map((agent) => (
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
                <span className="text-slate-400 font-mono text-[10px]">{agent.city}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Validación segura y cifrada contra base de datos</span>
        </div>
      </div>
    </div>
  );
}
