import { ONBOARDING_STEPS } from '../config/sellerOnboardingConfig';
import { isSectionComplete, getLastIncompleteStepPath } from './sellerRouteUtils';

const STEP_PATHS = ONBOARDING_STEPS.map((s) => s.path);

const SPECIAL_ROUTES = {
  '/seller/payment-success': (data) => data?.onboardingFee?.paymentStatus === 'paid',
  '/seller/review': (data) => ONBOARDING_STEPS.every((s) => isSectionComplete(s.section, data)),
  '/seller/membership': () => true,
};

export function getOnboardingStepIndex(pathname) {
  return STEP_PATHS.indexOf(pathname);
}

export function canAccessOnboardingStep(pathname, data) {
  if (SPECIAL_ROUTES[pathname]) {
    return SPECIAL_ROUTES[pathname](data);
  }

  const stepIndex = getOnboardingStepIndex(pathname);
  if (stepIndex === -1) return true;

  for (let i = 0; i < stepIndex; i += 1) {
    const prev = ONBOARDING_STEPS[i];
    if (!isSectionComplete(prev.section, data)) {
      return false;
    }
  }
  return true;
}

export function getOnboardingRedirectPath(pathname, data) {
  if (canAccessOnboardingStep(pathname, data)) return null;
  return getLastIncompleteStepPath(data);
}
