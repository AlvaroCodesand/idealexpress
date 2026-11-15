import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Package,
  Store,
  FileCheck2,
  Truck,
  Home,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      speedTag: "3 MINUTOS",
      title: "Entrega en Tienda",
      stage: "Recepción Rápida",
      desc: "Llegas a la tienda hispana aliada más cercana en tu barrio y entregas tu paquete directamente en mostrador.",
      icon: (
        <div className="relative w-14 h-14 rounded-2xl bg-[#F4EFE6] text-[#0E283F] flex items-center justify-center group-hover:bg-[#0E283F] group-hover:text-white transition-colors duration-300">
          <Store size={26} className="text-[#0E283F] group-hover:text-white transition-colors" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-md bg-[#3E5C10] text-white flex items-center justify-center animate-subtle-float">
            <Package size={13} />
          </div>
        </div>
      ),
    },
    {
      num: "02",
      speedTag: "AL INSTANTE",
      title: "Registro Digital",
      stage: "Comprobante con Folio",
      desc: "El encargado captura los datos en segundos y te entrega tu recibo oficial firmado con folio único de rastreo.",
      icon: (
        <div className="relative w-14 h-14 rounded-2xl bg-[#EBF3DC] text-[#3E5C10] flex items-center justify-center group-hover:bg-[#3E5C10] group-hover:text-white transition-colors duration-300">
          <FileCheck2 size={26} className="text-[#3E5C10] group-hover:text-white transition-colors" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0E283F] text-white flex items-center justify-center">
            <CheckCircle2 size={12} className="text-[#8FB838]" />
          </div>
        </div>
      ),
    },
    {
      num: "03",
      speedTag: "SALIDA SEMANAL",
      title: "Tránsito & Aduana",
      stage: "Ruta Directa a Texas",
      desc: "Nuestros camiones concentran la carga en Milwaukee y avanzan a Laredo para inspección aduanal legal sin demoras.",
      icon: (
        <div className="relative w-14 h-14 rounded-2xl bg-[#EBF3F7] text-[#183D61] flex items-center justify-center group-hover:bg-[#183D61] group-hover:text-white transition-colors duration-300 overflow-hidden">
          <div className="animate-truck-glide">
            <Truck size={28} className="text-[#183D61] group-hover:text-white transition-colors" />
          </div>
          <div className="absolute bottom-1.5 left-2 flex gap-0.5 opacity-60">
            <span className="w-2 h-0.5 bg-[#8FB838] rounded-full"></span>
            <span className="w-1 h-0.5 bg-[#8FB838] rounded-full"></span>
          </div>
        </div>
      ),
    },
    {
      num: "04",
      speedTag: "2 A 3 SEMANAS",
      title: "Entrega en Domicilio",
      stage: "En Manos de tu Familia",
      desc: "Tu destinatario recibe la caja directamente en la puerta de su casa en cualquier municipio de la República Mexicana.",
      icon: (
        <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#E8E1D5] text-[#0E283F] flex items-center justify-center group-hover:border-[#3E5C10] transition-colors duration-300">
          <Home size={26} className="text-[#0E283F] group-hover:scale-105 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#3E5C10] text-white flex items-center justify-center">
            <ShieldCheck size={12} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Encabezado con Enfoque de Agilidad y Rapidez */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono font-semibold text-[#0E283F] mb-1">
            <Clock size={13} className="text-[#3E5C10]" />
            <span>FLUJO ÁGIL Y RASTREABLE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
            De tu tienda en Wisconsin a la puerta de tu gente
          </h2>
          <p className="text-base text-slate-700 leading-relaxed text-pretty font-normal">
            Un circuito logístico coordinado que ahorra tiempo en mostrador y garantiza el cruce ágil en frontera.
          </p>
        </div>

        {/* Ruta Conectada con Iconos en Movimiento Dinámico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#FAF8F5] rounded-3xl p-7 border border-[#E8E1D5] hover:border-[#0E283F] transition-all duration-300 group flex flex-col justify-between space-y-6 hover:shadow-xs"
            >
              <div className="space-y-5">
                {/* Cabecera del paso con icono animado y badge de velocidad */}
                <div className="flex items-center justify-between">
                  {step.icon}
                  <div className="text-right">
                    <span className="font-mono font-bold text-xl text-slate-600 group-hover:text-[#0E283F] transition-colors block">
                      {step.num}
                    </span>
                    <span className="inline-block text-[#3E5C10] font-mono font-bold text-xs uppercase tracking-wider">
                      {step.speedTag}
                    </span>
                  </div>
                </div>

                {/* Título y descripción ágil */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-semibold text-slate-500 block uppercase tracking-wider">
                    {step.stage}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#0E283F] group-hover:text-[#183D61] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-pretty font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Indicador de avance hacia el siguiente paso */}
              <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs font-mono text-slate-600 group-hover:text-[#0E283F] transition-colors">
                <span>Paso {step.num} de 04</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[#3E5C10]" />
              </div>
            </div>
          ))}
        </div>

        {/* Barra de Certidumbre y Velocidad */}
        <div className="mt-14 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck size={20} className="text-[#3E5C10] shrink-0" />
            <span>
              <strong>Sin papeleos tardados:</strong> El llenado se hace en pantalla táctil en tienda y toma menos de 3 minutos.
            </span>
          </div>

          <Link
            href="/como-enviar"
            className="inline-flex items-center gap-1.5 font-bold text-[#0E283F] hover:text-[#3E5C10] transition shrink-0"
          >
            <span>Ver detalles de aduana y empaque</span>
            <ArrowRight size={15} className="text-[#3E5C10]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
