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
      desc: "Acude al comercio hispano aliado más cercano en tu barrio.",
      image: "/images/step1-pack.jpg",
      note: "Embala en cartón resistente y cinta canela.",
    },
    {
      num: "02",
      icon: FileCheck2,
      stage: "Registro Digital",
      title: "Llenado de datos",
      desc: "El encargado registra remitente y destinatario en el sistema digital.",
      image: "/images/step2-counter.jpg",
      note: "Recibes tu comprobante oficial firmado con folio.",
    },
    {
      num: "03",
      icon: Truck,
      stage: "Consolidado & Cruce",
      title: "Nosotros la llevamos",
      desc: "Camiones directos hacia nuestra base en Laredo para inspección aduanal.",
      image: "/images/step3-truck.jpg",
      note: "Manifiesto legal y salidas semanales fijas.",
    },
    {
      num: "04",
      icon: Home,
      stage: "Destino Final",
      title: "Tu familia la recibe",
      desc: "Entrega directa a domicilio en cualquier estado de México.",
      image: "/images/step4-delivery.jpg",
      note: "Garantía de entrega habitual de 2 a 3 semanas.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Encabezado sin kicker redundante (regla Impeccable) */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E283F] tracking-tight text-balance">
          ¿Cómo viaja tu paquete a México?
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed text-pretty">
          Un proceso transparente y ordenado, sin formatos confusos a mano ni riesgos en frontera.
        </p>
      </div>

      {/* Línea de Trayecto Conectada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0E283F] text-white font-mono font-bold text-xs shadow-xs">
                    Paso {step.num}
                  </div>

                  <div className="absolute bottom-3 right-3 text-white">
                    <Icon size={18} className="text-[#3E5C10]" />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-500 block">
                    {step.stage}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#0E283F]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E8E1D5] text-xs text-slate-600 font-medium">
                {step.note}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/como-enviar"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F4EFE6] text-[#0E283F] font-bold rounded-xl border border-[#E8E1D5] text-xs uppercase tracking-wider transition"
        >
          <span>Conoce qué artículos puedes enviar y las reglas de aduana</span>
          <ArrowRight size={15} className="text-[#3E5C10]" />
        </Link>
      </div>
    </section>
  );
};
