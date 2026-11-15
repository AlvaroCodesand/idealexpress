import React from "react";

// ILUSTRACIÓN 1: Entrega de caja en mostrador de tienda aliada
export const StoreDropoffIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg
    viewBox="0 0 220 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 group-hover:scale-105`}
    aria-hidden="true"
  >
    {/* Fondo sutil */}
    <rect x="10" y="10" width="200" height="130" rx="16" fill="#F4EFE6" fillOpacity="0.6" />
    <circle cx="170" cy="40" r="30" fill="#7BA029" fillOpacity="0.12" />

    {/* Mostrador de la tienda */}
    <rect x="25" y="105" width="170" height="14" rx="4" fill="#0E283F" />
    <rect x="35" y="119" width="150" height="16" fill="#E8E1D5" />

    {/* Caja de cartón corrugado */}
    <rect x="65" y="45" width="90" height="60" rx="6" fill="#D9C5A5" stroke="#C4B08F" strokeWidth="2" />
    {/* Cinta de embalaje */}
    <rect x="102" y="45" width="16" height="60" fill="#C49A45" fillOpacity="0.5" />
    <rect x="65" y="70" width="90" height="12" fill="#C49A45" fillOpacity="0.3" />

    {/* Etiqueta de envío con código de barras en la caja */}
    <rect x="73" y="52" width="32" height="22" rx="3" fill="#FFFFFF" />
    <line x1="77" y1="58" x2="95" y2="58" stroke="#0E283F" strokeWidth="2" strokeLinecap="round" />
    <line x1="77" y1="63" x2="88" y2="63" stroke="#0E283F" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="77" y1="67" x2="100" y2="67" stroke="#7BA029" strokeWidth="2" strokeLinecap="round" />

    {/* Toldo / Awning de la tienda hispana */}
    <path d="M40 28 L180 28 L170 42 L50 42 Z" fill="#0E283F" />
    <path d="M50 42 C50 45 45 47 42 45 C39 43 40 40 40 38" stroke="#7BA029" strokeWidth="2" fill="none" />
    {/* Rayas verdes del toldo */}
    <path d="M65 28 L72 42 L82 42 L75 28 Z" fill="#7BA029" />
    <path d="M100 28 L107 42 L117 42 L110 28 Z" fill="#7BA029" />
    <path d="M135 28 L142 42 L152 42 L145 28 Z" fill="#7BA029" />

    {/* Pin de ubicación Milwaukee */}
    <g transform="translate(155, 30)">
      <path d="M10 0 C4.5 0 0 4.5 0 10 C0 17 10 26 10 26 C10 26 20 17 20 10 C20 4.5 15.5 0 10 0 Z" fill="#7BA029" />
      <circle cx="10" cy="9" r="4" fill="#FFFFFF" />
    </g>
  </svg>
);

// ILUSTRACIÓN 2: Registro digital en tablet / pantalla táctil con recibo y folio
export const DigitalReceiptIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg
    viewBox="0 0 220 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 group-hover:scale-105`}
    aria-hidden="true"
  >
    {/* Fondo sutil */}
    <rect x="10" y="10" width="200" height="130" rx="16" fill="#F4EFE6" fillOpacity="0.6" />
    <circle cx="45" cy="50" r="28" fill="#183D61" fillOpacity="0.08" />

    {/* Terminal Tablet POS */}
    <rect x="45" y="30" width="130" height="85" rx="10" fill="#0E283F" stroke="#183D61" strokeWidth="2" />
    <rect x="52" y="37" width="116" height="71" rx="6" fill="#FFFFFF" />

    {/* Contenido de la pantalla: Formulario Digital de Envío */}
    <rect x="60" y="45" width="40" height="5" rx="2.5" fill="#0E283F" />
    <rect x="60" y="55" width="98" height="8" rx="3" fill="#FAF8F5" stroke="#E8E1D5" />
    <rect x="64" y="58" width="45" height="3" rx="1.5" fill="#7BA029" />

    <rect x="60" y="67" width="45" height="8" rx="3" fill="#FAF8F5" stroke="#E8E1D5" />
    <rect x="110" y="67" width="48" height="8" rx="3" fill="#FAF8F5" stroke="#E8E1D5" />

    {/* Botón táctil 'REGISTRAR' en pantalla */}
    <rect x="60" y="82" width="55" height="16" rx="4" fill="#7BA029" />
    <rect x="70" y="88" width="35" height="4" rx="2" fill="#FFFFFF" />

    {/* Folio y Checkmark de Aprobación */}
    <g transform="translate(132, 75)">
      <circle cx="16" cy="16" r="16" fill="#0E283F" />
      <circle cx="16" cy="16" r="13" fill="#3E5C10" />
      <path d="M11 16 L14 19 L21 12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Destello de agilidad */}
    <path d="M185 25 L190 35 L200 38 L190 42 L185 52 L180 42 L170 38 L180 35 Z" fill="#7BA029" opacity="0.6" />
  </svg>
);

// ILUSTRACIÓN 3: Camión de flete consolidado en carretera con líneas de velocidad
export const HighwayFreightIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg
    viewBox="0 0 220 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 group-hover:scale-105`}
    aria-hidden="true"
  >
    {/* Fondo sutil */}
    <rect x="10" y="10" width="200" height="130" rx="16" fill="#F4EFE6" fillOpacity="0.6" />
    
    {/* Carretera con líneas de tránsito */}
    <rect x="15" y="105" width="190" height="18" rx="4" fill="#0E283F" />
    <line x1="30" y1="114" x2="60" y2="114" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" />
    <line x1="80" y1="114" x2="120" y2="114" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" />
    <line x1="140" y1="114" x2="190" y2="114" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" />

    {/* Estelas de velocidad cinética detrás del camión */}
    <line x1="20" y1="65" x2="45" y2="65" stroke="#7BA029" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="15" y1="75" x2="40" y2="75" stroke="#7BA029" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="25" y1="85" x2="48" y2="85" stroke="#7BA029" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

    {/* Remolque del camión de carga Ideal Express */}
    <rect x="50" y="45" width="90" height="50" rx="5" fill="#FFFFFF" stroke="#0E283F" strokeWidth="2" />
    {/* Franja de marca en el remolque */}
    <rect x="52" y="65" width="86" height="8" fill="#0E283F" />
    <rect x="52" y="73" width="86" height="4" fill="#7BA029" />
    <rect x="58" y="52" width="40" height="6" rx="2" fill="#0E283F" />

    {/* Cabina del camión */}
    <path d="M140 60 L165 60 L180 75 L180 95 L140 95 Z" fill="#0E283F" />
    {/* Parabrisas con reflejo */}
    <path d="M148 65 L163 65 L174 76 L148 76 Z" fill="#EBF3F7" />
    {/* Luz delantera */}
    <rect x="177" y="85" width="5" height="6" rx="1" fill="#ECE656" />

    {/* Ruedas dobles con rines */}
    <circle cx="70" cy="98" r="9" fill="#0A1928" />
    <circle cx="70" cy="98" r="4" fill="#E8E1D5" />

    <circle cx="115" cy="98" r="9" fill="#0A1928" />
    <circle cx="115" cy="98" r="4" fill="#E8E1D5" />

    <circle cx="165" cy="98" r="9" fill="#0A1928" />
    <circle cx="165" cy="98" r="4" fill="#E8E1D5" />
  </svg>
);

// ILUSTRACIÓN 4: Entrega en domicilio en México con paquete y confirmación
export const HomeDeliveryIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg
    viewBox="0 0 220 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 group-hover:scale-105`}
    aria-hidden="true"
  >
    {/* Fondo sutil */}
    <rect x="10" y="10" width="200" height="130" rx="16" fill="#F4EFE6" fillOpacity="0.6" />
    <circle cx="165" cy="45" r="28" fill="#7BA029" fillOpacity="0.1" />

    {/* Casa en México */}
    <path d="M45 60 L85 28 L125 60 L125 110 L45 110 Z" fill="#FFFFFF" stroke="#0E283F" strokeWidth="2" />
    {/* Techo de teja tradicional */}
    <path d="M38 60 L85 24 L132 60 Z" fill="#0E283F" />
    
    {/* Puerta principal */}
    <rect x="70" y="72" width="25" height="38" rx="2" fill="#FAF8F5" stroke="#E8E1D5" strokeWidth="1.5" />
    <circle cx="75" cy="92" r="1.5" fill="#0E283F" />

    {/* Ventana con marco */}
    <rect x="98" y="68" width="18" height="18" rx="2" fill="#EBF3F7" stroke="#0E283F" strokeWidth="1.5" />
    <line x1="107" y1="68" x2="107" y2="86" stroke="#0E283F" strokeWidth="1" />
    <line x1="98" y1="77" x2="116" y2="77" stroke="#0E283F" strokeWidth="1" />

    {/* Paquete entregado en la puerta */}
    <rect x="135" y="80" width="45" height="30" rx="3" fill="#D9C5A5" stroke="#C4B08F" strokeWidth="1.5" />
    <rect x="153" y="80" width="9" height="30" fill="#C49A45" fillOpacity="0.5" />
    <rect x="135" y="91" width="45" height="7" fill="#C49A45" fillOpacity="0.3" />

    {/* Escudo / Sello de Entrega Exitosa */}
    <g transform="translate(145, 40)">
      <path d="M18 0 C9 2 0 8 0 16 C0 27 18 36 18 36 C18 36 36 27 36 16 C36 8 27 2 18 0 Z" fill="#3E5C10" />
      <path d="M11 17 L16 22 L26 12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
