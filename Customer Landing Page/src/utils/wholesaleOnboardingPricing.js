export const MIN_REQUIRED_CAPITAL = 1000000; // ₹10,00,000
export const MIN_ONBOARDING_FEE = 5000;
export const MAX_ONBOARDING_FEE = 1500000;
export const ONBOARDING_VALIDITY_YEARS = 2;

export const CITY_TYPES = ['Village', 'Tier 3', 'Tier 2', 'Tier 1', 'Metro'];

export const LOCATION_FEE_RATES = {
  'Village': [
    { max: 2500000, rate: 0.50 },        // ₹10L to < ₹25L: 0.50%
    { max: 5000000, rate: 0.30 },        // ₹25L to < ₹50L: 0.30%
    { max: 10000000, rate: 0.20 },       // ₹50L to < ₹1Cr: 0.20%
    { max: 100000000, rate: 0.10 },      // ₹1Cr to <= ₹10Cr: 0.10%
    { max: Infinity, rate: 0.05 },       // > ₹10Cr: 0.05%
  ],
  'Tier 3': [
    { max: 2500000, rate: 0.60 },        // ₹10L to < ₹25L: 0.60%
    { max: 5000000, rate: 0.40 },        // ₹25L to < ₹50L: 0.40%
    { max: 10000000, rate: 0.25 },       // ₹50L to < ₹1Cr: 0.25%
    { max: 100000000, rate: 0.12 },      // ₹1Cr to <= ₹10Cr: 0.12%
    { max: Infinity, rate: 0.06 },       // > ₹10Cr: 0.06%
  ],
  'Tier 2': [
    { max: 2500000, rate: 0.75 },        // ₹10L to < ₹25L: 0.75%
    { max: 5000000, rate: 0.50 },        // ₹25L to < ₹50L: 0.50%
    { max: 10000000, rate: 0.30 },       // ₹50L to < ₹1Cr: 0.30%
    { max: 100000000, rate: 0.15 },      // ₹1Cr to <= ₹10Cr: 0.15%
    { max: Infinity, rate: 0.08 },       // > ₹10Cr: 0.08%
  ],
  'Tier 1': [
    { max: 2500000, rate: 1.00 },        // ₹10L to < ₹25L: 1.00%
    { max: 5000000, rate: 0.60 },        // ₹25L to < ₹50L: 0.60%
    { max: 10000000, rate: 0.40 },       // ₹50L to < ₹1Cr: 0.40%
    { max: 100000000, rate: 0.20 },      // ₹1Cr to <= ₹10Cr: 0.20%
    { max: Infinity, rate: 0.10 },       // > ₹10Cr: 0.10%
  ],
  'Metro': [
    { max: 2500000, rate: 1.00 },        // ₹10L to < ₹25L: 1.00%
    { max: 5000000, rate: 0.75 },        // ₹25L to < ₹50L: 0.75%
    { max: 10000000, rate: 0.50 },       // ₹50L to < ₹1Cr: 0.50%
    { max: 100000000, rate: 0.25 },      // ₹1Cr to <= ₹10Cr: 0.25%
    { max: Infinity, rate: 0.10 },       // > ₹10Cr: 0.10%
  ],
};

// Normalize city tier alias strings safely
export function normalizeCityTier(cityType = 'Tier 2') {
  if (!cityType) return 'Tier 2';
  const str = String(cityType).toLowerCase();
  if (str.includes('village') || str.includes('rural')) return 'Village';
  if (str.includes('tier 3') || str.includes('tier3')) return 'Tier 3';
  if (str.includes('tier 1') || str.includes('tier1')) return 'Tier 1';
  if (str.includes('metro')) return 'Metro';
  return 'Tier 2';
}

export function checkCapitalEligibility(capital) {
  const cap = Number(capital) || 0;
  return {
    isEligible: cap >= MIN_REQUIRED_CAPITAL,
    capital: cap,
    minRequired: MIN_REQUIRED_CAPITAL,
    message: cap < MIN_REQUIRED_CAPITAL
      ? `Wholesale / Supplier / Dealer onboarding requires a minimum business capital of ${formatInr(MIN_REQUIRED_CAPITAL)}.`
      : 'Capital meets minimum requirement.',
  };
}

export function getApplicableFeeRate(cityType = 'Tier 2', capital = 2500000) {
  const normCity = normalizeCityTier(cityType);
  const cap = Number(capital) || 0;
  const rates = LOCATION_FEE_RATES[normCity] || LOCATION_FEE_RATES['Tier 2'];

  for (const slab of rates) {
    if (cap < slab.max || (slab.max === 100000000 && cap <= 100000000)) {
      return slab.rate;
    }
  }
  return rates[rates.length - 1].rate;
}

export function calculateOnboardingFee(params = {}) {
  let cityType = 'Tier 2';
  let capital = 2500000;

  if (typeof params === 'string') {
    cityType = params;
    capital = arguments[2] || 2500000;
  } else if (typeof params === 'object' && params !== null) {
    cityType = params.cityType || params.locationTier || 'Tier 2';
    capital = params.businessCapital ?? params.capital ?? 2500000;
  }

  const cap = Number(capital) || 0;
  const eligibility = checkCapitalEligibility(cap);

  if (!eligibility.isEligible) {
    return {
      fee: 0,
      amount: 0,
      percentage: 0,
      rate: 0,
      applicableRate: '0.00',
      isEligible: false,
      error: eligibility.message,
      range: 'Not Eligible (Below ₹10L)',
      comm: 'N/A',
      breakdown: {
        cityType,
        capital: cap,
        minRequired: MIN_REQUIRED_CAPITAL,
        rate: 0,
      },
    };
  }

  const rate = getApplicableFeeRate(cityType, cap);
  const calculatedFee = Math.round((cap * rate) / 100);

  return {
    fee: calculatedFee,
    amount: calculatedFee,
    percentage: rate,
    rate: rate,
    applicableRate: rate.toFixed(2),
    isEligible: true,
    range: `${rate.toFixed(2)}% of Capital`,
    comm: '3–8%',
    breakdown: {
      cityType,
      capital: cap,
      rate,
      calculatedFee,
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

