import { getPricingConfig, getCommissionConfig } from '../config/sellerOnboardingConfig';

function getModifierValue(modifiers, key, value) {
  const map = modifiers[key];
  if (!map || value == null) return 0;
  return map[value] ?? 0;
}

function getCategoryFeeRange(locationTier, category) {
  const config = getPricingConfig();
  const base = config.baseCategoryFees[category] || config.baseCategoryFees.grocery;
  const tier = config.locationTiers.find((t) => t.id === locationTier);
  const multiplier = tier?.multiplier ?? 1;

  return {
    min: Math.round(base.min * multiplier),
    max: Math.round(base.max * multiplier),
    tierLabel: tier?.label ?? 'Village',
    categoryLabel: config.categoryLabels[category] ?? category,
  };
}

function buildBreakdown(factors, weights, range) {
  return [
    { label: 'Base Category Range', value: `₹${range.min.toLocaleString('en-IN')} – ₹${range.max.toLocaleString('en-IN')}`, type: 'info' },
    { label: 'Location Tier', value: range.tierLabel, type: 'info' },
    { label: 'Delivery Radius', value: `${Math.round(factors.deliveryRadius * 100)}% impact`, type: 'factor' },
    { label: 'Product Count', value: `${Math.round(factors.productCount * 100)}% impact`, type: 'factor' },
    { label: 'Store Size', value: `${Math.round(factors.storeSize * 100)}% impact`, type: 'factor' },
    { label: 'Warehouse Size', value: `${Math.round(factors.warehouseSize * 100)}% impact`, type: 'factor' },
    { label: 'Annual Turnover', value: `${Math.round(factors.annualTurnover * 100)}% impact`, type: 'factor' },
    { label: 'Verification Level', value: `${Math.round(factors.verificationLevel * 100)}% impact`, type: 'factor' },
    { label: 'Business Services', value: `${Math.round(factors.businessServices * 100)}% impact`, type: 'factor' },
  ];
}

export function calculateOnboardingFee(onboardingData) {
  const config = getPricingConfig();
  const { modifiers, factorWeights } = config;

  const locationTier = onboardingData.address?.locationTier || 'village';
  const category = onboardingData.businessInfo?.category || 'grocery';
  const range = getCategoryFeeRange(locationTier, category);

  const services = onboardingData.businessInfo?.services || [];
  const serviceCount = Math.min(services.length, modifiers.businessServices.maxServices);
  const serviceModifier = serviceCount * modifiers.businessServices.perService;

  const factors = {
    deliveryRadius: getModifierValue(modifiers, 'deliveryRadius', onboardingData.delivery?.radius),
    productCount: getModifierValue(modifiers, 'productCount', onboardingData.businessInfo?.productCount),
    storeSize: getModifierValue(modifiers, 'storeSize', onboardingData.businessInfo?.storeSize),
    warehouseSize: getModifierValue(modifiers, 'warehouseSize', onboardingData.businessInfo?.warehouseSize),
    annualTurnover: getModifierValue(modifiers, 'annualTurnover', onboardingData.businessInfo?.annualTurnover),
    verificationLevel: getModifierValue(modifiers, 'verificationLevel', onboardingData.documents?.verificationLevel || 'basic'),
    businessServices: serviceModifier,
  };

  let weightedScore = 0;
  Object.keys(factorWeights).forEach((key) => {
    weightedScore += (factors[key] || 0) * factorWeights[key];
  });

  weightedScore = Math.min(1, Math.max(0, weightedScore));
  const fee = Math.round(range.min + (range.max - range.min) * weightedScore);

  const validityYears = config.validityYears;
  const renewalAmount = Math.round(fee * (config.renewalPercentage / 100));

  return {
    fee,
    minFee: range.min,
    maxFee: range.max,
    locationTier,
    locationTierLabel: range.tierLabel,
    category,
    categoryLabel: range.categoryLabel,
    weightedScore,
    factors,
    breakdown: buildBreakdown(factors, factorWeights, range),
    validityYears,
    renewalPercentage: config.renewalPercentage,
    renewalAmount,
    currency: 'INR',
    calculatedAt: new Date().toISOString(),
  };
}

export function getCommissionRate(category) {
  const config = getCommissionConfig();
  const rate = config.categories[category] || config.defaultRange;
  return {
    category,
    min: rate.min,
    max: rate.max,
    display: `${rate.min}–${rate.max}%`,
    note: config.note,
  };
}

export function getRenewalAmount(originalFee) {
  const config = getPricingConfig();
  const amount = Math.round(originalFee * (config.renewalPercentage / 100));
  return {
    originalFee,
    renewalAmount: amount,
    renewalPercentage: config.renewalPercentage,
    validityYears: config.validityYears,
  };
}

export function getValidityDates(paidAt = new Date()) {
  const config = getPricingConfig();
  const start = new Date(paidAt);
  const end = new Date(paidAt);
  end.setFullYear(end.getFullYear() + config.validityYears);

  const now = new Date();
  const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  return {
    validityStart: start.toISOString(),
    validityEnd: end.toISOString(),
    daysRemaining,
    isNearingExpiry: daysRemaining <= 60,
    isExpired: daysRemaining === 0 && now > end,
  };
}
