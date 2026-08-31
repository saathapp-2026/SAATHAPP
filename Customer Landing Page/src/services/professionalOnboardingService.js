import { getProfessionalPricingConfig, getProfessionalCommissionConfig } from '../config/professionalOnboardingConfig.js';

export function normalizeCategoryKey(category) {
  if (!category) return null;
  const config = getProfessionalPricingConfig();
  if (config.categoryLabels[category]) return category;
  const byLabel = Object.entries(config.categoryLabels).find(([, label]) => label === category);
  if (byLabel) return byLabel[0];
  const lower = String(category).toLowerCase().replace(/\s+/g, '_').replace(/&/g, '').replace(/__+/g, '_');
  if (config.categoryLabels[lower]) return lower;
  return null;
}

function getModifierValue(modifiers, key, value) {
  const map = modifiers[key];
  if (!map || value == null) return 0;
  return map[value] ?? 0;
}

function getExperienceModifier(config, experience) {
  const option = config.experienceOptions?.find((o) => o.id === experience);
  return option?.modifier ?? 0;
}

function findGroupFee(groupMap, categoryKey, entityType, staffCount, businessScale) {
  const staffNum = parseStaffCount(staffCount);
  const matches = [];

  Object.values(groupMap).forEach((group) => {
    // Require explicit category lists — empty category arrays are staff/scale overlays only
    if (group.categories && group.categories.length) {
      if (!group.categories.includes(categoryKey)) return;
    } else if (!group.minStaff && !group.businessScale) {
      // Unscoped empty groups are not valid pricing mappings
      return;
    }
    if (group.entityTypes && !group.entityTypes.includes(entityType)) return;
    if (group.minStaff && staffNum < group.minStaff) return;
    if (group.businessScale && !group.businessScale.includes(businessScale)) return;
    matches.push(group);
  });

  if (!matches.length) {
    throw new Error(`No pricing group for category="${categoryKey}" entity="${entityType}" staff="${staffCount}" scale="${businessScale}"`);
  }

  return matches.sort((a, b) => b.min - a.min)[0];
}

function parseStaffCount(staffCount) {
  if (!staffCount) return 1;
  if (staffCount === '1') return 1;
  if (staffCount === '2-5') return 3;
  if (staffCount === '6-15') return 10;
  if (staffCount === '16-50') return 30;
  if (staffCount === '50+') return 50;
  return Number(staffCount) || 1;
}

export function resolveFeeRange(onboardingData) {
  const config = getProfessionalPricingConfig();
  const locationTier = onboardingData.serviceLocation?.locationTier || 'village';
  const categoryKey = normalizeCategoryKey(onboardingData.accountInfo?.category);
  if (!categoryKey) {
    throw new Error('Service category is required for fee calculation');
  }
  if (!config.villageFees[categoryKey]) {
    throw new Error(`Missing village pricing for profession: ${categoryKey}`);
  }

  const entityType = onboardingData.accountInfo?.entityType || 'individual';
  const staffCount = onboardingData.accountInfo?.staffCount || '1';
  const businessScale = onboardingData.accountInfo?.businessScale || 'solo';
  const categoryLabel = config.categoryLabels[categoryKey];
  const tierMeta = config.locationTiers.find((t) => t.id === locationTier);
  const tierLabel = tierMeta?.label || 'Village';

  let range;
  let commissionMin;
  let commissionMax;
  let groupLabel = categoryLabel;

  if (locationTier === 'village') {
    const village = config.villageFees[categoryKey];
    range = { min: village.min, max: village.max };
    commissionMin = village.commissionMin;
    commissionMax = village.commissionMax;
  } else if (locationTier === 'tier3') {
    const group = findGroupFee(config.tier3Fees, categoryKey, entityType, staffCount, businessScale);
    range = { min: group.min, max: group.max };
    commissionMin = group.commissionMin;
    commissionMax = group.commissionMax;
    groupLabel = group.label;
  } else if (locationTier === 'tier2') {
    const group = findGroupFee(config.tier2Fees, categoryKey, entityType, staffCount, businessScale);
    range = { min: group.min, max: group.max };
    commissionMin = group.commissionMin;
    commissionMax = group.commissionMax;
    groupLabel = group.label;
  } else if (locationTier === 'tier1') {
    const group = findGroupFee(config.metroFees, categoryKey, entityType, staffCount, businessScale);
    range = { min: group.min, max: group.max };
    commissionMin = group.commissionMin;
    commissionMax = group.commissionMax;
    groupLabel = group.label;
  } else {
    throw new Error(`Unknown location tier: ${locationTier}`);
  }

  return {
    min: range.min,
    max: range.max,
    tierLabel,
    locationTier,
    categoryKey,
    categoryLabel,
    groupLabel,
    commissionMin,
    commissionMax,
  };
}

function buildBreakdown(factors, resolved) {
  return [
    { label: 'Location Tier', value: resolved.tierLabel, type: 'info' },
    { label: 'Pricing Group', value: resolved.groupLabel, type: 'info' },
    { label: 'Service Category', value: resolved.categoryLabel, type: 'info' },
    { label: 'Base Fee Range', value: `₹${resolved.min.toLocaleString('en-IN')} – ₹${resolved.max.toLocaleString('en-IN')}`, type: 'info' },
    { label: 'Commission Range', value: `${resolved.commissionMin}–${resolved.commissionMax}%`, type: 'info' },
    { label: 'Experience', value: `${Math.round(factors.experience * 100)}% impact`, type: 'factor' },
    { label: 'Service Radius', value: `${Math.round(factors.serviceRadius * 100)}% impact`, type: 'factor' },
    { label: 'Individual / Agency', value: `${Math.round(factors.entityType * 100)}% impact`, type: 'factor' },
    { label: 'Staff Count', value: `${Math.round(factors.staffCount * 100)}% impact`, type: 'factor' },
    { label: 'Equipment & Machinery', value: `${Math.round(factors.equipmentLevel * 100)}% impact`, type: 'factor' },
    { label: 'Verification Level', value: `${Math.round(factors.verificationLevel * 100)}% impact`, type: 'factor' },
    { label: 'Business Scale', value: `${Math.round(factors.businessScale * 100)}% impact`, type: 'factor' },
  ];
}

export function calculateOnboardingFee(onboardingData) {
  const config = getProfessionalPricingConfig();
  const locationTier = onboardingData.serviceLocation?.locationTier || 'village';

  const fixedFeeMap = {
    village: 750,
    tier3: 1250,
    tier2: 1850,
    tier1: 2550,
    metro: 3500
  };

  const fee = fixedFeeMap[locationTier] || 750;
  
  const tierLabel = config.locationTiers?.find((t) => t.id === locationTier)?.label || locationTier;
  const category = onboardingData.accountInfo?.category || 'service';
  const categoryLabel = config.categoryLabels?.[category] || category;

  const breakdown = [
    { label: 'Location Tier', value: tierLabel, type: 'info' },
    { label: 'Fixed Onboarding Fee', value: `₹${fee.toLocaleString('en-IN')}`, type: 'info' }
  ];

  return {
    fee,
    minFee: fee,
    maxFee: fee,
    locationTier,
    locationTierLabel: tierLabel,
    category,
    categoryLabel,
    weightedScore: 1,
    factors: {},
    breakdown,
    validityYears: config.validityYears,
    renewalPercentage: config.renewalPercentage,
    renewalAmount: Math.round(fee * (config.renewalPercentage / 100)),
    currency: 'INR',
    calculatedAt: new Date().toISOString(),
  };
}

export function getCommissionRate(category, locationTier, entityType, staffCount, businessScale) {
  const config = getProfessionalCommissionConfig();
  const categoryKey = normalizeCategoryKey(category);
  if (!categoryKey || !config.categories[categoryKey]) {
    throw new Error(`Missing commission mapping for profession: ${category}`);
  }
  const resolved = resolveFeeRange({
    accountInfo: { category: categoryKey, entityType, staffCount, businessScale },
    serviceLocation: { locationTier: locationTier || 'village' },
  });
  return {
    category: categoryKey,
    min: resolved.commissionMin,
    max: resolved.commissionMax,
    display: `${resolved.commissionMin}–${resolved.commissionMax}%`,
    note: config.note,
    renewalPercentage: getProfessionalPricingConfig().renewalPercentage,
    validityYears: getProfessionalPricingConfig().validityYears,
  };
}

export function getRenewalAmount(originalFee) {
  const config = getProfessionalPricingConfig();
  const amount = Math.round(originalFee * (config.renewalPercentage / 100));
  return {
    originalFee,
    renewalAmount: amount,
    renewalPercentage: config.renewalPercentage,
    validityYears: config.validityYears,
  };
}

export function getValidityDates(paidAt = new Date()) {
  const config = getProfessionalPricingConfig();
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

export function getStoredProfessionalOnboarding() {
  try {
    const stored = localStorage.getItem('saathapp-professional-onboarding');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveProfessionalOnboarding(data) {
  localStorage.setItem('saathapp-professional-onboarding', JSON.stringify(data));
}

export function clearProfessionalOnboarding() {
  localStorage.removeItem('saathapp-professional-onboarding');
}
