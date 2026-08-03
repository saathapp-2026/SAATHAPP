import membershipData from '../professionalMembership.json';

export const welcomeKitConfig = {
  title: membershipData.welcomeKit.label,
  badge: membershipData.welcomeKit.badge,
  description: `Included with Growth (₹2,499/month) or Enterprise (₹4,999/month) membership — only after successful verification AND activation.`,
  eligiblePlans: membershipData.welcomeKit.eligiblePlans,
  items: membershipData.welcomeKit.items.map((name, index) => ({
    id: `kit_${index}`,
    name,
    included: true,
  })),
  rules: membershipData.welcomeKit.rules,
};

export function getWelcomeKitConfig() {
  return welcomeKitConfig;
}

export function getWelcomeKitItems() {
  return welcomeKitConfig.items;
}

/** Eligible only for Growth/Enterprise AND verification complete AND activation complete */
export function isWelcomeKitEligible(planId, applicationStatus) {
  const planOk = welcomeKitConfig.eligiblePlans.includes(planId);
  const verifiedAndActive = applicationStatus === 'approved' || applicationStatus === 'activated';
  return planOk && verifiedAndActive;
}

export function getWelcomeKitEligibilityStatus(planId, applicationStatus) {
  const planOk = welcomeKitConfig.eligiblePlans.includes(planId);
  const verifiedAndActive = applicationStatus === 'approved' || applicationStatus === 'activated';
  return {
    eligible: planOk && verifiedAndActive,
    planOk,
    verifiedAndActive,
    requiresPlan: !planOk,
    requiresVerificationActivation: !verifiedAndActive,
  };
}

export default welcomeKitConfig;
