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
  
  // Existing location mapping
  const locationTier = onboardingData.address?.locationTier || 'village';
  const category = onboardingData.businessInfo?.category || 'grocery';
  
  // Existing estimated business investment value
  const investment = Number(onboardingData.businessInfo?.investment || onboardingData.investment || 0);

  let slabIndex = 0;
  if (investment < 50000) slabIndex = 0;
  else if (investment < 100000) slabIndex = 1;
  else if (investment < 1000000) slabIndex = 2;
  else if (investment < 5000000) slabIndex = 3;
  else if (investment < 10000000) slabIndex = 4;
  else if (investment <= 100000000) slabIndex = 5;
  else slabIndex = 6;

  const rateMatrix = {
    village: [0.05, 0.025, 0.01, 0.002, 0.001,  0.001,  0.001],
    tier3:   [0.05, 0.025, 0.01, 0.004, 0.002,  0.0015, 0.001],
    tier2:   [0.05, 0.025, 0.01, 0.005, 0.003,  0.0015, 0.001],
    tier1:   [0.05, 0.025, 0.01, 0.005, 0.004,  0.002,  0.0015],
    metro:   [0.05, 0.025, 0.01, 0.005, 0.005,  0.002,  0.0015],
  };

  const rates = rateMatrix[locationTier] || rateMatrix.village;
  const percentage = rates[slabIndex];
  
  const fee = Math.round(investment * percentage);
  const minFee = fee;
  const maxFee = fee;

  // We no longer use factors/breakdown to calculate the fee, but we retain 
  // the data structure so we don't break existing UI or downstream code.
  const tierLabel = config.locationTiers?.find((t) => t.id === locationTier)?.label || locationTier;
  const categoryLabel = config.categoryLabels?.[category] || category;
  const validityYears = config.validityYears;
  const renewalAmount = Math.round(fee * (config.renewalPercentage / 100));

  const breakdown = [
    { label: 'Investment Amount', value: `₹${investment.toLocaleString('en-IN')}`, type: 'info' },
    { label: 'Location Tier', value: tierLabel, type: 'info' },
    { label: 'Applicable Rate', value: `${(percentage * 100).toFixed(2)}%`, type: 'factor' },
  ];

  return {
    fee,
    minFee,
    maxFee,
    locationTier,
    locationTierLabel: tierLabel,
    category,
    categoryLabel,
    weightedScore: 1, // hardcoded as no longer applicable
    factors: {}, // no longer applicable
    breakdown,
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
