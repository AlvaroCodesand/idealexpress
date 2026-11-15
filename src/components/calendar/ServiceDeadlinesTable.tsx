import React from "react";
import { TARIFF_CONFIG } from "@/constants/config";
import { Clock, ShieldCheck, Info } from "lucide-react";

export const ServiceDeadlinesTable: React.FC = () => {
  const deadlines = [
    {
      level: "Servicio Regular Estándar",
      deadline: "2 de Diciembre de 2026",
      coverage: "Todos los municipios de México (Reparto Domiciliar)",
      time: "2 a 3 semanas",
      status: "Recomendado",
    },
    {
      level: "Servicio Plus Laredo",
      deadline: "4 de Diciembre de 2026",
      coverage: "Zona Centro, Bajío, Michoacán y Jalisco",
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
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
      <div className="space-y-1 pb-2 border-b border-stone-100">
        <span className="text-[11px] font-black text-[#8FB838] uppercase tracking-widest block">
          Programación Operativa
        </span>
        <h3 className="text-xl font-black text-[#1E3A5F] flex items-center gap-2">
          <Clock size={22} className="text-[#8FB838]" />
          <span>Fechas Límite por Nivel de Servicio</span>
        </h3>
        <p className="text-xs text-slate-500">
          Fechas máximas de recepción en tiendas para garantizar entrega previa a Nochebuena.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100 text-slate-700 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <th className="py-3 px-3">Nivel de Servicio</th>
              <th className="py-3 px-3">Enviar a más tardar</th>
              <th className="py-3 px-3">Cobertura Principal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {deadlines.map((item, idx) => (
              <tr key={idx} className="hover:bg-stone-50 transition">
                <td className="py-3.5 px-3">
                  <strong className="block text-slate-900 font-bold text-sm">
                    {item.level}
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Tránsito: {item.time}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#E5F2D6] text-[#2D450D] border border-[#CDE5B3] font-bold text-xs">
                    {item.deadline}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">
                  {item.coverage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>Compromiso de entrega de temporada:</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Nuestra logística cuenta con salidas semanales fijas de camiones desde Milwaukee directamente al cruce fronterizo en Texas. Recomendamos empacar y acudir a tu tienda con al menos 3 días de margen sobre la fecha límite.
        </p>
      </div>
    </div>
  );
};
