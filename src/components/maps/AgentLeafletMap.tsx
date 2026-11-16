"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Agent } from "@/types";

interface AgentLeafletMapProps {
  agents: Agent[];
  selectedAgentId?: string | null;
  onSelectAgent?: (agent: Agent) => void;
  className?: string;
  zoom?: number;
}

export default function AgentLeafletMap({
  agents,
  selectedAgentId,
  onSelectAgent,
  className = "h-[450px] w-full rounded-2xl overflow-hidden",
  zoom = 10,
}: AgentLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centro por defecto: Milwaukee, Wisconsin
      const defaultCenter: [number, number] = [43.0163, -87.9333];

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Limpiar marcadores anteriores
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Crear icono personalizado SVG para los agentes con nombre accesible
    const createCustomIcon = (agentName: string, isSelected: boolean) =>
      L.divIcon({
        className: "custom-map-pin",
        html: `
          <div role="img" aria-label="Marcador: ${agentName}" style="
            width: ${isSelected ? "38px" : "30px"};
            height: ${isSelected ? "38px" : "30px"};
            background-color: ${isSelected ? "#8FB838" : "#1E3A5F"};
            border: 3px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            transition: all 0.2s ease;
          ">
            <svg width="${isSelected ? "18" : "14"}" height="${
          isSelected ? "18" : "14"
        }" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 19 : 15],
      });

    // Agregar marcadores para cada agente con ARIA accesible para lectores e IA
    agents.forEach((agent) => {
      const isSelected = selectedAgentId === agent.id;
      const marker = L.marker([agent.lat, agent.lng], {
        icon: createCustomIcon(agent.storeName, isSelected),
        title: `Tienda aliada: ${agent.storeName}, ${agent.city}`,
        alt: `Ubicación de ${agent.storeName}`,
      }).addTo(map);

      // Asignar el nombre accesible al botón interactivo de Leaflet
      const markerEl = marker.getElement();
      if (markerEl) {
        markerEl.setAttribute("aria-label", `Tienda aliada: ${agent.storeName}, ${agent.city}`);
        markerEl.setAttribute("title", `Tienda aliada: ${agent.storeName}, ${agent.city}`);
      }

      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; padding: 4px; max-width: 220px;" text-wrap: pretty;>
          <strong style="display: block; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${agent.storeName}</strong>
          <p style="color: #475569; margin: 0 0 4px 0;">${agent.address}, ${agent.city},&nbsp;${agent.state}&nbsp;${agent.zip}</p>
          <p style="color: #0f172a; font-weight: 600; margin: 0 0 6px 0;">Tel: ${agent.phone}</p>
          <a href="https://maps.google.com/?q=${encodeURIComponent(
            `${agent.storeName} ${agent.address} ${agent.city} ${agent.state}`
          )}" target="_blank" style="color: #0E283F; font-weight: bold; text-decoration: underline;">
            Cómo llegar →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: "ideal-agent-popup",
      });

      marker.on("popupopen", (e) => {
        const el = e.popup.getElement();
        if (el) {
          el.setAttribute("role", "tooltip");
          el.setAttribute("data-impeccable-ignore", "nested-cards,straggler");
        }
      });

      marker.on("click", () => {
        if (onSelectAgent) {
          onSelectAgent(agent);
        }
      });

      markersRef.current[agent.id] = marker;
    });

    // Si hay un agente seleccionado, centrar el mapa y abrir su popup
    if (selectedAgentId && markersRef.current[selectedAgentId]) {
      const selectedAgent = agents.find((a) => a.id === selectedAgentId);
      if (selectedAgent) {
        map.flyTo([selectedAgent.lat, selectedAgent.lng], 13, {
          duration: 0.8,
        });
        markersRef.current[selectedAgentId].openPopup();
      }
    } else if (agents.length > 0) {
      // Ajustar vista a todos los agentes
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }, [agents, selectedAgentId, onSelectAgent, zoom]);

  return (
    <div className={`relative ${className} shadow-md border border-stone-200 z-10`}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
