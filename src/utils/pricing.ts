import { TARIFF_CONFIG } from "@/constants/config";

export interface PricingResult {
  weightLbs: number;
  billableWeightLbs: number;
  shippingCostUSD: number;
  insuranceCostUSD: number;
  totalUSD: number;
  isMinimumApplied: boolean;
}

export function calculateShipmentCost(
  weightLbs: number,
  hasInsurance: boolean,
  declaredValueUSD: number = 0
): PricingResult {
  const safeWeight = Math.max(0, weightLbs || 0);
  const billableWeightLbs = Math.max(safeWeight, TARIFF_CONFIG.minPounds);
  const isMinimumApplied = safeWeight < TARIFF_CONFIG.minPounds;

  const shippingCostUSD = Number(
    (billableWeightLbs * TARIFF_CONFIG.pricePerPound).toFixed(2)
  );

  let insuranceCostUSD = 0;
  if (hasInsurance && declaredValueUSD > 0) {
    const calculatedPercentage = declaredValueUSD * TARIFF_CONFIG.insurancePercentage;
    insuranceCostUSD = Number(
      Math.max(TARIFF_CONFIG.minInsuranceUSD, calculatedPercentage).toFixed(2)
    );
  }

  const totalUSD = Number((shippingCostUSD + insuranceCostUSD).toFixed(2));

  return {
    weightLbs: safeWeight,
    billableWeightLbs,
    shippingCostUSD,
    insuranceCostUSD,
    totalUSD,
    isMinimumApplied,
  };
}
