import React from "react";
import { TARIFF_CONFIG, APP_CONFIG } from "@/constants/config";

export const LocalBusinessJsonLd: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DeliveryService"],
    "@id": "https://www.idealexpresswi.com/#localbusiness",
    "name": "Ideal Express",
    "alternateName": "Ideal Express Milwaukee",
    "legalName": "Ideal Express Group LLC",
    "url": "https://www.idealexpresswi.com",
    "logo": "https://www.idealexpresswi.com/logo.png",
    "image": "https://www.idealexpresswi.com/images/hero-warehouse.jpg",
    "description":
      "Servicio especializado de encomiendas y paquetería familiar a todo México desde Milwaukee, Wisconsin. Más de 10 años conectando familias con entrega garantizada a domicilio de 2 a 3 semanas.",
    "telephone": "+1-414-763-8705",
    "email": APP_CONFIG.email,
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1565 W Greenfield Ave",
      "addressLocality": "Milwaukee",
      "addressRegion": "WI",
      "postalCode": "53204",
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.0163,
      "longitude": -87.9333,
    },
    "hasMap":
      "https://maps.google.com/?q=1565+W+Greenfield+Ave+Milwaukee+WI+53204",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00",
      },
    ],
    "areaServed": [
      { "@type": "City", "name": "Milwaukee", "sameAs": "https://en.wikipedia.org/wiki/Milwaukee" },
      { "@type": "City", "name": "Racine", "sameAs": "https://en.wikipedia.org/wiki/Racine,_Wisconsin" },
      { "@type": "City", "name": "Sheboygan", "sameAs": "https://en.wikipedia.org/wiki/Sheboygan,_Wisconsin" },
      { "@type": "City", "name": "Caledonia", "sameAs": "https://en.wikipedia.org/wiki/Caledonia,_Wisconsin" },
      { "@type": "City", "name": "Kenosha", "sameAs": "https://en.wikipedia.org/wiki/Kenosha,_Wisconsin" },
      { "@type": "City", "name": "Waukesha", "sameAs": "https://en.wikipedia.org/wiki/Waukesha,_Wisconsin" },
      { "@type": "Country", "name": "Mexico", "sameAs": "https://en.wikipedia.org/wiki/Mexico" },
    ],
    "serviceType": [
      "Envío de paquetes a México",
      "Paquetería familiar a domicilio",
      "Cruce aduanal Laredo",
      "Transporte de cajas y encomiendas",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Envío",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Envío de Paquete Regular a México",
            "description": "Tarifa estándar por libra con entrega a domicilio en 2 a 3 semanas.",
          },
          "price": "2.99",
          "priceCurrency": "USD",
          "unitCode": "LBR",
        },
      ],
    },
    "sameAs": [
      "https://www.facebook.com/idealexpresswi",
      "https://wa.me/14147638705",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FaqJsonLd: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto tarda en llegar un paquete a México desde Milwaukee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "El tiempo habitual de entrega es de 2 a 3 semanas. Contamos con transporte consolidado directo desde nuestra bodega en Milwaukee hasta el cruce en Laredo, Texas, y convenios de última milla con Estafeta, FedEx y Paquetexpress para entrega en cualquier domicilio de México.",
        },
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la tarifa por libra para enviar cajas a México?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "La tarifa oficial es de $2.99 USD por libra, con un mínimo cobrable de 15 libras ($44.85 USD). Se aceptan cajas de 30 a 140 libras.",
        },
      },
      {
        "@type": "Question",
        "name": "¿Qué artículos están permitidos enviar a México?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ropa y calzado (nuevo o usado limpio), juguetes, cobijas, artículos del hogar, enseres de cocina no eléctricos y despensa seca envasada. Están prohibidos armas, medicamentos controlados, dinero en efectivo y perecederos.",
        },
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la fecha límite de envío para que llegue antes de Navidad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Para entrega garantizada antes del 24 de diciembre de 2026, la fecha límite oficial para entregar tu caja en cualquiera de nuestras tiendas aliadas es el 2 de Diciembre de 2026.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
