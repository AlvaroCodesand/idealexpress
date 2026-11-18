import { TariffConfig } from "@/types";

export const APP_CONFIG = {
  companyName: "Ideal Express",
  tagline: "Encomiendas y Paquetería a todo México",
  foundedYear: 2014,
  experienceYearsText: "Más de 10 años",
  email: "info@idealgroupwi.com",
  phones: ["(414) 763-8705", "(414) 339-8747"],
  warehouseAddress: "1565 W Greenfield Ave, Milwaukee, WI 53204",
  warehouseCoords: { lat: 43.0163, lng: -87.9333 },
  deliveryWindowText: "2 a 3 semanas",
};

export const TARIFF_CONFIG: TariffConfig = {
  pricePerPound: 2.99,
  minPounds: 15,
  minPriceUSD: 44.85,
  insurancePercentage: 0.05, // 5% oficial según Forma de Envío física
  minInsuranceUSD: 5.0,
  maxDeclaredValueUSD: 2000,
  christmasDeadlineDate: "2026-12-02",
  christmasDeadlineDisplay: "2 de Diciembre de 2026",
  deliveryWindowDays: "14 a 21 días (2–3 semanas)",
  whatsappNumber: "14147638705",
  whatsappDisplay: "+1 (414) 763-8705",
  mainOfficeAddress: "1565 W Greenfield Ave, Milwaukee, WI 53204",
  allowedItems: [
    "Ropa, calzado nuevo o usado en buen estado",
    "Juguetes, artículos escolares y regalos familiares",
    "Cobijas, colchas, sábanas y blancos de cama",
    "Utensilios de cocina y enseres domésticos no eléctricos",
    "Despensa seca, dulces y abarrotes sellados",
  ],
  prohibitedItems: [
    "Armas de fuego, cartuchos, municiones y pirotecnia",
    "Medicamentos controlados, sustancias ilícitas y drogas",
    "Joyas de alto valor, monedas y dinero en efectivo",
    "Líquidos inflamables, químicos corrosivos y aerosoles",
    "Alimentos perecederos o frescos sin refrigeración",
  ],
};

export const CARRIERS = [
  {
    name: "Estafeta",
    trackingUrl: "https://www.estafeta.com/Herramientas/Rastreo",
    logoColor: "text-red-600 border-red-600 hover:bg-red-50",
  },
  {
    name: "Paquetexpress",
    trackingUrl: "https://www.paquetexpress.com.mx/rastreo",
    logoColor: "text-blue-700 border-blue-700 hover:bg-blue-50",
  },
  {
    name: "FedEx",
    trackingUrl: "https://www.fedex.com/es-mx/tracking.html",
    logoColor: "text-purple-700 border-purple-700 hover:bg-purple-50",
  },
];
