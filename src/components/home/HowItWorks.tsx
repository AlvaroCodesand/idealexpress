import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import {
  StoreDropoffIllustration,
  DigitalReceiptIllustration,
  HighwayFreightIllustration,
  HomeDeliveryIllustration,
} from "./illustrations/ProcessIllustrations";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      speedTag: "3 MINUTOS",
      title: "Entrega en Tienda",
      stage: "Recepción en Mostrador",
      desc: "Llegas a la tienda hispana aliada de tu barrio con tu caja lista y la entregas sin filas.",
      illustration: <StoreDropoffIllustration />,
    },
    {
      num: "02",
      speedTag: "AL INSTANTE",
      title: "Registro Digital",
      stage: "Folio & Comprobante",
      desc: "El encargado captura tus datos en pantalla táctil y te entrega tu comprobante firmado.",
      illustration: <DigitalReceiptIllustration />,
    },
    {
      num: "03",
      speedTag: "SALIDA SEMANAL",
      title: "Tránsito & Aduana",
      stage: "Ruta Directa a Texas",
      desc: "Camiones propios concentran la carga en Milwaukee y cruzan con manifiesto legal en Laredo.",
      illustration: <HighwayFreightIllustration />,
    },
    {
      num: "04",
      speedTag: "2 A 3 SEMANAS",
      title: "Entrega en Domicilio",
      stage: "En Manos de tu Familia",
      desc: "Tu familiar recibe la caja directamente en la puerta de su casa en cualquier estado de México.",
      illustration: <HomeDeliveryIllustration />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Encabezado con Enfoque de Agilidad y Rapidez */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono font-semibold text-[#0E283F] mb-1">
            <Clock size={13} className="text-[#3E5C10]" />
            <span>CIRCUITO LOGÍSTICO CONTINUO</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
            De tu tienda en Wisconsin a la puerta de tu gente
          </h2>
          <p className="text-base text-slate-700 leading-relaxed text-pretty font-normal">
            Un circuito logístico coordinado que ahorra tiempo en mostrador y garantiza el cruce ágil en frontera.
          </p>
        </div>

        {/* Diagrama de 4 Estaciones con Línea de Ruta Interconectada */}
        <div className="relative">
          {/* Línea de tránsito punteada entre estaciones en desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#7BA029]/30 z-0 pointer-events-none"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] hover:border-[#0E283F] transition-all duration-300 group flex flex-col justify-between space-y-5 hover:shadow-xs"
              >
                <div className="space-y-4">
                  {/* Cabecera del paso sin borde anidado */}
                  <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                    <span className="font-mono font-black text-2xl text-[#0E283F]">
                      {step.num}
                    </span>
                    <span className="text-[#3E5C10] font-mono font-bold text-xs uppercase tracking-wider">
                      {step.speedTag}
                    </span>
                  </div>

                  {/* Ilustración Vectorial Editorial */}
                  <div className="w-full flex items-center justify-center py-2">
                    {step.illustration}
                  </div>

                  {/* Título y descripción */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-mono font-semibold text-slate-700 block uppercase tracking-wider">
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
                  <span>Estación {step.num} de 04</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[#3E5C10]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Barra de Certidumbre */}
        <div className="mt-14 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck size={20} className="text-[#3E5C10] shrink-0" />
            <span>
              <strong>Sin papeleos tardados:</strong> El llenado se hace en pantalla digital en tienda y toma menos de 3 minutos.
            </span>
          </div>

          <Link
            href="/contacto"
            className="inline-flex items-center gap-1.5 font-bold text-[#0E283F] hover:text-[#3E5C10] transition shrink-0"
          >
            <span>¿Dudas sobre tu paquete? Contáctanos directamente</span>
            <ArrowRight size={15} className="text-[#3E5C10]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
