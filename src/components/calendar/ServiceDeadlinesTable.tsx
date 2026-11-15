import React from "react";
import { TARIFF_CONFIG } from "@/constants/config";
import { Clock, ShieldCheck } from "lucide-react";

export const ServiceDeadlinesTable: React.FC = () => {
  const deadlines = [
    {
      level: "Servicio Regular Estándar",
      deadline: "2 de Diciembre de 2026",
      coverage: "Todos los municipios de México (Reparto a Domicilio)",
      time: "2 a 3 semanas",
      status: "Recomendado",
    },
    {
      level: "Servicio Plus Bajío / Centro",
      deadline: "4 de Diciembre de 2026",
      coverage: "Guanajuato, Michoacán, Jalisco, Edo. Méx y CDMX",
      time: "10 a 14 días",
      status: "Prioritario",
    },
    {
      level: "Servicio Frontera Norte",
      deadline: "8 de Diciembre de 2026",
      coverage: "Nuevo León, Coahuila y Tamaulipas",
      time: "7 a 10 días",
      status: "Ruta Directa",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
      <div className="space-y-1.5 pb-3 border-b border-[#E8E1D5]">
        <h2 className="font-display text-2xl font-bold text-[#0E283F] flex items-center gap-2">
          <Clock size={22} className="text-[#3E5C10]" />
          <span>Fechas Límite por Servicio</span>
        </h2>
        <p className="text-xs text-slate-600">
          Fechas máximas de entrega en tienda para garantizar que el paquete esté bajo el árbol de Navidad.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF8F5] text-slate-700 font-mono text-xs uppercase tracking-wider border-b border-[#E8E1D5]">
              <th className="py-3 px-3.5">Nivel de Servicio</th>
              <th className="py-3 px-3.5">Fecha Límite</th>
              <th className="py-3 px-3.5">Cobertura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E1D5]">
            {deadlines.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#FAF8F5]/80 transition">
                <td className="py-4 px-3.5">
                  <strong className="block text-[#0E283F] font-display font-bold text-sm">
                    {item.level}
                  </strong>
                  <span className="text-xs font-mono text-slate-600">
                    Tránsito: {item.time}
                  </span>
                </td>
                <td className="py-4 px-3.5">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#EBF3DC] text-[#2D450D] border border-[#7BA029]/30 font-mono font-bold text-xs">
                    {item.deadline}
                  </span>
                </td>
                <td className="py-4 px-3.5 text-slate-600 font-medium">
                  {item.coverage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E1D5] text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#0E283F]">
          <ShieldCheck size={16} className="text-[#3E5C10] shrink-0" />
          <span>Compromiso de salida garantizada:</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-600">
          Nuestra flota cuenta con salidas programadas desde Milwaukee hacia Laredo, Texas. Recomendamos empacar y acudir a tu tienda con al menos 2 días de anticipación sobre la fecha límite.
        </p>
      </div>
    </div>
  );
};
