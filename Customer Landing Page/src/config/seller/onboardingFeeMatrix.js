import pricingConfig from './pricingConfig.js';

export const onboardingFeeMatrix = {
  validityYears: pricingConfig.validityYears,
  renewalPercentage: pricingConfig.renewalPercentage,
  locationTiers: pricingConfig.locationTiers,
  categoryFees: pricingConfig.baseCategoryFees,
  categoryLabels: pricingConfig.categoryLabels,
  modifiers: pricingConfig.modifiers,
  factorWeights: pricingConfig.factorWeights,
};

export function getOnboardingFeeMatrix() {
  return onboardingFeeMatrix;
}

export default onboardingFeeMatrix;
