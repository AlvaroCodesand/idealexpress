import { Shipment } from "@/types";

export interface CompactShipmentPayload {
  box: string;
  fol: string;
  fec: string;
  age: string;
  rem: string;
  rtk: string;
  rad: string;
  rci: string;
  res: string;
  rcp: string;
  des: string;
  dt1: string;
  dt2?: string;
  tip: "Domicilio" | "Oficina de Estafeta";
  dir: string;
  col?: string;
  ciu: string;
  est: string;
  cp: string;
  ref?: string;
  pes: number;
  med: string;
  srv?: string;
  con: string;
  fle: number;
  caj?: number;
  ase?: number;
  asv?: number;
  tv?: number;
  tvs?: string;
  dto?: number;
  tot: number;
}

export function encodeShipmentToQR(shipment: Shipment): string {
  try {
    const payload: CompactShipmentPayload = {
      box: shipment.packageDetails?.boxNumber || shipment.folio,
      fol: shipment.folio,
      fec: shipment.packageDetails?.date || new Date(shipment.createdAt).toLocaleDateString("es-MX"),
      age: shipment.agentName,
      rem: shipment.sender.fullName,
      rtk: shipment.sender.phone,
      rad: shipment.sender.address,
      rci: shipment.sender.city,
      res: shipment.sender.state,
      rcp: shipment.sender.zip,
      des: shipment.recipient.fullName,
      dt1: shipment.recipient.phone,
      dt2: shipment.recipient.phone2 || undefined,
      tip: shipment.recipient.deliveryType || "Domicilio",
      dir: shipment.recipient.address,
      col: shipment.recipient.colonia || undefined,
      ciu: shipment.recipient.city,
      est: shipment.recipient.state,
      cp: shipment.recipient.zip,
      ref: shipment.recipient.references || undefined,
      pes: shipment.packageDetails.weightLbs,
      med: shipment.packageDetails.boxSize,
      srv: shipment.packageDetails.serviceType || "Regular",
      con: shipment.packageDetails.declaredContent,
      fle: shipment.packageDetails.shippingCostUSD,
      caj: shipment.packageDetails.boxPriceUSD || undefined,
      ase: shipment.packageDetails.insuranceCostUSD || undefined,
      asv: shipment.packageDetails.declaredValueUSD || undefined,
      tv: shipment.packageDetails.tvPriceUSD || undefined,
      tvs: shipment.packageDetails.tvSizeInches || undefined,
      dto: shipment.packageDetails.discountUSD || undefined,
      tot: shipment.packageDetails.totalUSD,
    };

    const jsonStr = JSON.stringify(payload);
    // Codificación UTF-8 compatible con base64 seguro para URL
    if (typeof window !== "undefined") {
      return btoa(unescape(encodeURIComponent(jsonStr)));
    } else {
      return Buffer.from(jsonStr).toString("base64");
    }
  } catch (err) {
    console.error("Error encoding QR payload", err);
    return "";
  }
}

export function decodeShipmentFromQR(encodedStr: string): Shipment | null {
  try {
    let jsonStr = "";
    if (typeof window !== "undefined") {
      jsonStr = decodeURIComponent(escape(atob(encodedStr)));
    } else {
      jsonStr = Buffer.from(encodedStr, "base64").toString("utf-8");
    }

    const p: CompactShipmentPayload = JSON.parse(jsonStr);

    return {
      id: `QR-${p.fol.replace(/[^A-Za-z0-9]/g, "")}`,
      folio: p.fol,
      createdAt: new Date().toISOString(),
      agentId: "AG-01",
      agentName: p.age,
      sender: {
        fullName: p.rem,
        phone: p.rtk,
        address: p.rad,
        city: p.rci,
        state: p.res,
        zip: p.rcp,
      },
      recipient: {
        fullName: p.des,
        phone: p.dt1,
        phone2: p.dt2,
        deliveryType: p.tip,
        address: p.dir,
        colonia: p.col,
        city: p.ciu,
        state: p.est,
        zip: p.cp,
        references: p.ref,
      },
      packageDetails: {
        serviceType: (p.srv as "Regular" | "Plus" | "Express") || "Regular",
        weightLbs: p.pes,
        boxSize: p.med,
        declaredContent: p.con,
        hasInsurance: Boolean(p.ase && p.ase > 0),
        declaredValueUSD: p.asv || 0,
        shippingCostUSD: p.fle,
        insuranceCostUSD: p.ase || 0,
        boxPriceUSD: p.caj || 0,
        tvSizeInches: p.tvs,
        tvPriceUSD: p.tv || 0,
        discountUSD: p.dto || 0,
        totalUSD: p.tot,
        boxNumber: p.box,
        date: p.fec,
      },
      status: "Recibido en Tienda",
    };
  } catch (err) {
    console.error("Error decoding QR payload", err);
    return null;
  }
}
