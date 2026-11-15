import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: "Lleva tu caja",
      desc: "Al agente o tienda hispana más cercana a ti en tu barrio.",
      image: "/images/step1-pack.jpg",
      alt: "Persona empacando caja de cartón para envío",
    },
    {
      num: 2,
      title: "Llena el formato",
      desc: "Tus datos y los de tu familia. Recibes tu comprobante firmado.",
      image: "/images/step2-counter.jpg",
      alt: "Encargado de tienda atendiendo en mostrador",
    },
    {
      num: 3,
      title: "Nosotros la llevamos",
      desc: "Pasa por nuestra bodega de Milwaukee y cruza segura a México en Texas.",
      image: "/images/step3-truck.jpg",
      alt: "Camión de transporte de carga en carretera",
    },
    {
      num: 4,
      title: "Tu familia la recibe",
      desc: "Directamente en su domicilio en un plazo de 2 a 3 semanas.",
      image: "/images/step4-delivery.jpg",
      alt: "Entrega de paquete a domicilio para la familia",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="text-[#8FB838] text-xs font-black uppercase tracking-widest">
          Transparente y Sencillo
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] tracking-tight">
          3. ¿Cómo funciona?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          En 4 sencillos pasos tu paquete viaja seguro desde Wisconsin hasta cualquier rincón de México.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-[#1E3A5F] text-white font-black flex items-center justify-center text-sm shadow-md border-2 border-[#8FB838]">
                  {step.num}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/como-enviar"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-100 text-slate-800 font-bold rounded-xl border border-stone-300 shadow-xs text-xs sm:text-sm transition"
        >
          <span>Ver guía completa sobre cómo enviar</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};
