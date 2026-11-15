"use client";

import React from "react";
import { AgentMap } from "./AgentMap";
import { APP_CONFIG } from "@/constants/config";
import { Agent } from "@/types";

export const WarehouseMap: React.FC = () => {
  const warehouseAgent: Agent = {
    id: "BODEGA-01",
    pin: "",
    storeName: "Bodega Matriz Ideal Express",
    contactName: "Oficina Central",
    address: APP_CONFIG.warehouseAddress,
    city: "Milwaukee",
    state: "WI",
    zip: "53204",
    phone: APP_CONFIG.phones[0],
    hours: "Lun - Vie 9:00 AM - 5:00 PM",
    lat: APP_CONFIG.warehouseCoords.lat,
    lng: APP_CONFIG.warehouseCoords.lng,
  };

  return (
    <div className="space-y-3">
      <AgentMap
        agents={[warehouseAgent]}
        selectedAgentId="BODEGA-01"
        className="h-80 w-full rounded-2xl"
        zoom={14}
      />
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-slate-500 font-medium">1565 W Greenfield Ave, Milwaukee, WI</span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            "1565 W Greenfield Ave, Milwaukee, WI 53204"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-orange-600 hover:underline"
        >
          Abrir en Google Maps ↗
        </a>
      </div>
    </div>
  );
};
