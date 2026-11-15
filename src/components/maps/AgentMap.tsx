"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Agent } from "@/types";

interface AgentMapProps {
  agents: Agent[];
  selectedAgentId?: string | null;
  onSelectAgent?: (agent: Agent) => void;
  className?: string;
  zoom?: number;
}

const DynamicLeafletMap = dynamic(() => import("./AgentLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] w-full bg-stone-100 rounded-3xl flex flex-col items-center justify-center p-6 text-stone-400 border border-[#E8E1D5]">
      <div className="w-10 h-10 border-4 border-[#0E283F] border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xs font-semibold">Cargando mapa interactivo de agentes...</p>
    </div>
  ),
});

export const AgentMap: React.FC<AgentMapProps> = (props) => {
  return <DynamicLeafletMap {...props} />;
};
