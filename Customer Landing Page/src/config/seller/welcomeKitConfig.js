import { membershipPlansConfig } from './membershipPlans.js';

export const welcomeKitConfig = membershipPlansConfig.welcomeKit;

export function getWelcomeKitConfig() {
  return welcomeKitConfig;
}

export function isWelcomeKitEligible(planId) {
  return welcomeKitConfig.eligiblePlans.includes(planId);
}

export function getWelcomeKitItems() {
  return welcomeKitConfig.items;
}

export const WELCOME_KIT_STATUSES = ['preparing', 'packed', 'shipped', 'delivered'];

export default welcomeKitConfig;
