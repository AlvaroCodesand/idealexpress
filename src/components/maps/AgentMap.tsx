"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si IntersectionObserver no está soportado, cargar de inmediato
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px", // Precargar 300px antes de que el usuario haga scroll hacia el mapa
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={props.className || "h-[560px] w-full"}>
      {isVisible ? (
        <DynamicLeafletMap {...props} />
      ) : (
        <div className="h-full w-full bg-stone-100 rounded-3xl flex flex-col items-center justify-center p-6 text-stone-400 border border-[#E8E1D5]">
          <div className="w-10 h-10 border-4 border-[#0E283F] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs font-semibold">Cargando mapa satelital de agentes...</p>
        </div>
      )}
    </div>
  );
};
