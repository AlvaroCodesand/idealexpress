export interface Agent {
  id: string;
  pin: string;
  storeName: string;
  contactName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

export interface Recipient {
  id?: string;
  clientId?: string;
  fullName: string;
  phone: string;
  phone2?: string;
  deliveryType?: "Domicilio" | "Oficina de Estafeta";
  street: string;
  colonia: string;
  city: string;
  state: string;
  zip: string;
  references?: string;
}

export interface Client {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  recipients: Recipient[];
}

export interface PackageDetails {
  serviceType?: "Regular" | "Plus" | "Express";
  weightLbs: number;
  boxSize: string;
  declaredContent: string;
  hasInsurance: boolean;
  declaredValueUSD: number;
  shippingCostUSD: number;
  insuranceCostUSD: number;
  boxPriceUSD?: number;
  tvSizeInches?: string;
  tvPriceUSD?: number;
  discountUSD?: number;
  boxNumber?: string;
  date?: string;
  totalUSD: number;
}

export interface Shipment {
  id: string;
  folio: string;
  createdAt: string;
  agentId: string;
  agentName: string;
  sender: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  recipient: {
    fullName: string;
    phone: string;
    phone2?: string;
    deliveryType?: "Domicilio" | "Oficina de Estafeta";
    address: string;
    colonia?: string;
    city: string;
    state: string;
    zip: string;
    references?: string;
  };
  packageDetails: PackageDetails;
  status:
    | "Recibido en Tienda"
    | "En Bodega Milwaukee"
    | "En Tránsito a Laredo"
    | "Cruce Aduanal"
    | "En Reparto México"
    | "Entregado";
  carrierTrackingUrl?: string;
  carrierName?: "Estafeta" | "Paquetexpress" | "FedEx";
}

export interface TariffConfig {
  pricePerPound: number;
  minPounds: number;
  minPriceUSD: number;
  insurancePercentage: number;
  minInsuranceUSD: number;
  maxDeclaredValueUSD: number;
  christmasDeadlineDate: string; // YYYY-MM-DD
  christmasDeadlineDisplay: string;
  deliveryWindowDays: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  mainOfficeAddress: string;
  allowedItems: string[];
  prohibitedItems: string[];
}

export interface HolidayCheckResult {
  status: "on-time" | "late" | "unselected";
  message: string;
  subMessage?: string;
  suggestedAction?: "ship-now" | "contact-whatsapp";
}
