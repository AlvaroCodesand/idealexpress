import { TARIFF_CONFIG } from "@/constants/config";

export interface PricingResult {
  weightLbs: number;
  billableWeightLbs: number;
  shippingCostUSD: number;
  insuranceCostUSD: number;
  boxPriceUSD: number;
  tvPriceUSD: number;
  discountUSD: number;
  totalUSD: number;
  isMinimumApplied: boolean;
}

export function calculateShipmentCost(
  weightLbs: number,
  hasInsurance: boolean,
  declaredValueUSD: number = 0,
  boxPriceUSD: number = 0,
  tvPriceUSD: number = 0,
  discountUSD: number = 0
): PricingResult {
  const safeWeight = Math.max(0, weightLbs || 0);
  const billableWeightLbs = Math.max(safeWeight, TARIFF_CONFIG.minPounds);
  const isMinimumApplied = safeWeight < TARIFF_CONFIG.minPounds;

  const shippingCostUSD = Number(
    (billableWeightLbs * TARIFF_CONFIG.pricePerPound).toFixed(2)
  );

  let insuranceCostUSD = 0;
  if (hasInsurance && declaredValueUSD > 0) {
    // Oficial: 5% del valor declarado según Forma de Envío física
    const calculatedPercentage = declaredValueUSD * TARIFF_CONFIG.insurancePercentage;
    insuranceCostUSD = Number(
      Math.max(TARIFF_CONFIG.minInsuranceUSD, calculatedPercentage).toFixed(2)
    );
  }

  const subtotal = shippingCostUSD + insuranceCostUSD + (boxPriceUSD || 0) + (tvPriceUSD || 0);
  const totalUSD = Number(Math.max(0, subtotal - (discountUSD || 0)).toFixed(2));

  return {
    weightLbs: safeWeight,
    billableWeightLbs,
    shippingCostUSD,
    insuranceCostUSD,
    boxPriceUSD: Number(boxPriceUSD || 0),
    tvPriceUSD: Number(tvPriceUSD || 0),
    discountUSD: Number(discountUSD || 0),
    totalUSD,
    isMinimumApplied,
  };
}
