import membershipData from '../sellerMembership.json';

export const membershipPlansConfig = membershipData;

export function getMembershipPlans() {
  return membershipPlansConfig.plans;
}

export function getPlanById(planId) {
  return membershipPlansConfig.plans.find((p) => p.id === planId) || membershipPlansConfig.plans[0];
}

export function getFeatureComparison() {
  return membershipPlansConfig.featureComparison;
}

export function getOnboardingFeeRange() {
  return membershipPlansConfig.onboardingFeeRange;
}

export default membershipPlansConfig;
