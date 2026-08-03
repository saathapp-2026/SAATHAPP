import pricingData from '../sellerPricing.json';

export const pricingConfig = pricingData;

export function getPricingConfig() {
  return pricingConfig;
}

export function getLocationTiers() {
  return pricingConfig.locationTiers;
}

export function getCategoryFees() {
  return pricingConfig.baseCategoryFees;
}

export function getFeeModifiers() {
  return pricingConfig.modifiers;
}

export default pricingConfig;
