export const MIN_ONBOARDING_FEE = 500;
export const MAX_ONBOARDING_FEE = 200000;
export const ONBOARDING_VALIDITY_YEARS = 2;

export const CITY_TYPES = ['Village', 'Tier 3', 'Tier 2', 'Tier 1', 'Metro'];

export const CITY_TYPE_MULTIPLIERS = {
  Village: 1,
  'Tier 3': 1.6,
  'Tier 2': 2.8,
  'Tier 1': 4.5,
  Metro: 7,
};

export const BUSINESS_TYPE_MULTIPLIERS = {
  Manufacturer: 2.4,
  Wholesaler: 2,
  Distributor: 2.2,
  Importer: 2.6,
  Exporter: 2.5,
  Supplier: 1.8,
  Factory: 2.8,
  'Brand Owner': 2.3,
  Stockist: 1.7,
};

export const COVERAGE_MULTIPLIERS = {
  Local: 1,
  District: 1.4,
  State: 2.2,
  'Multi-State': 3.8,
  'PAN India': 6,
  International: 9,
};

export const CATEGORY_MULTIPLIERS = {
  Grocery: 1.2,
  FMCG: 1.4,
  Hardware: 1.6,
  Electrical: 1.8,
  'Construction Materials': 2,
  Furniture: 1.7,
  Agriculture: 1.5,
  Fashion: 1.6,
  'Mobile & Electronics': 2.4,
  Pharmacy: 3.2,
  'Restaurant Supplies': 1.9,
  'Industrial Equipment': 3,
  Others: 1.3,
};

export const PLAN_MULTIPLIERS = {
  Free: 1,
  Starter: 1.6,
  Business: 2.8,
  Enterprise: 5.5,
};

export function calculateOnboardingFee({
  cityType = 'Tier 2',
  businessType = 'Wholesaler',
  serviceCoverageArea = 'District',
  businessCategory = 'FMCG',
  selectedPlan = 'Starter',
} = {}) {
  const cityMul = CITY_TYPE_MULTIPLIERS[cityType] ?? 1;
  const businessMul = BUSINESS_TYPE_MULTIPLIERS[businessType] ?? 1.5;
  const coverageMul = COVERAGE_MULTIPLIERS[serviceCoverageArea] ?? 1;
  const categoryMul = CATEGORY_MULTIPLIERS[businessCategory] ?? 1.2;
  const planMul = PLAN_MULTIPLIERS[selectedPlan] ?? 1;

  const raw =
    MIN_ONBOARDING_FEE * cityMul * businessMul * coverageMul * categoryMul * planMul;

  const amount = Math.min(
    MAX_ONBOARDING_FEE,
    Math.max(MIN_ONBOARDING_FEE, Math.round(raw / 100) * 100)
  );

  return {
    amount,
    breakdown: {
      baseFee: MIN_ONBOARDING_FEE,
      cityType,
      cityMultiplier: cityMul,
      businessType,
      businessMultiplier: businessMul,
      serviceCoverageArea,
      coverageMultiplier: coverageMul,
      businessCategory,
      categoryMultiplier: categoryMul,
      selectedPlan,
      planMultiplier: planMul,
    },
  };
}

export function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getValidityExpiryDate(fromDate = new Date()) {
  const expiry = new Date(fromDate);
  expiry.setFullYear(expiry.getFullYear() + ONBOARDING_VALIDITY_YEARS);
  return expiry.toISOString().split('T')[0];
}

export function getValidityLabel(expiryDate) {
  if (!expiryDate) return `${ONBOARDING_VALIDITY_YEARS} years from payment`;
  return `Valid until ${new Date(expiryDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}
