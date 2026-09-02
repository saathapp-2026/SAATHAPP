import pricingData from '../professionalPricing.json' with { type: 'json' };

const pricingConfig = { ...pricingData };

export const onboardingFeeMatrix = {
  validityYears: pricingData.validityYears,
  renewalPercentage: pricingData.renewalPercentage,
  feeRangeDisplay: pricingData.feeRangeDisplay,
  locationTiers: pricingData.locationTiers,
  villageFees: pricingData.villageFees,
  tier3Fees: pricingData.tier3Fees,
  tier2Fees: pricingData.tier2Fees,
  metroFees: pricingData.metroFees,
  categoryLabels: pricingData.categoryLabels,
  modifiers: pricingData.modifiers,
  factorWeights: pricingData.factorWeights,
};

export function getOnboardingFeeMatrix() {
  return onboardingFeeMatrix;
}

export default pricingConfig;
