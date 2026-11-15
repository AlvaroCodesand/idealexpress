import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, FileCheck2, Truck, Home } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: MapPin,
      stage: "Tienda Local",
      title: "Lleva tu caja",
      desc: "Acude a la tienda hispana aliada más cercana en tu barrio con tus artículos empacados.",
      image: "/images/step1-pack.jpg",
    },
    {
      num: "02",
      icon: FileCheck2,
      stage: "Registro Digital",
      title: "Llenado de datos",
      desc: "El encargado registra remitente y destinatario en el sistema y te entrega tu comprobante.",
      image: "/images/step2-counter.jpg",
    },
    {
      num: "03",
      icon: Truck,
      stage: "Consolidado & Cruce",
      title: "Nosotros la llevamos",
      desc: "Nuestros camiones llevan la carga a Texas para inspección aduanal legal sin riesgos.",
      image: "/images/step3-truck.jpg",
    },
    {
      num: "04",
      icon: Home,
      stage: "Destino Final",
      title: "Tu familia la recibe",
      desc: "Entrega directa a domicilio en cualquier estado de México en un plazo de 2 a 3 semanas.",
      image: "/images/step4-delivery.jpg",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E8E1D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encabezado Espacioso */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0E283F] tracking-tight text-balance">
            ¿Cómo viaja tu paquete a México?
          </h2>
          <p className="text-base text-slate-700 leading-relaxed text-pretty">
            Un proceso transparente en 4 etapas, desde el mostrador de tu barrio hasta la puerta de tu gente.
          </p>
        </div>

        {/* 4 Pasos Espaciosos y Desahogados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0E283F] text-white font-mono font-bold text-xs shadow-xs">
                      Paso {step.num}
                    </div>

                    <div className="absolute bottom-3 right-3 text-white">
                      <Icon size={20} className="text-[#8FB838]" />
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wider">
                      {step.stage}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#0E283F]">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/como-enviar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] text-xs uppercase tracking-wider transition shadow-2xs hover:shadow-xs active:scale-95"
          >
            <span>Conoce los artículos permitidos y reglas de aduana</span>
            <ArrowRight size={15} className="text-[#3E5C10]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
