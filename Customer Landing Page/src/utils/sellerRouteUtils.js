import { ONBOARDING_STEPS } from '../config/sellerOnboardingConfig';

export function isSectionComplete(key, data) {
  const section = data?.[key];
  if (!section) return false;
  switch (key) {
    case 'basicInfo':
      return Boolean(section.fullName && section.email && section.mobile);
    case 'businessInfo':
      return Boolean(section.storeName && section.businessName && section.description?.length >= 20);
    case 'address':
      return Boolean(section.state && section.city && section.pincode && section.address);
    case 'delivery':
      return Boolean(section.mode && section.radius);
    case 'documents':
      return Boolean(section.aadhaar && section.pan && section.cancelledCheque && section.shopPhoto);
    case 'bank':
      return Boolean(section.accountHolder && section.bankName && section.accountNumber && section.ifsc);
    case 'tax':
      return true;
    case 'onboardingFee':
      return section.paymentStatus === 'paid';
    default:
      return false;
  }
}

export function getLastIncompleteStepPath(data) {
  for (const step of ONBOARDING_STEPS) {
    if (!isSectionComplete(step.section, data)) {
      return step.path;
    }
  }
  return '/seller/review';
}

export function getResumeOnboardingPath(data) {
  if (data?.meta?.lastVisitedStep && ONBOARDING_PATHS.includes(data.meta.lastVisitedStep)) {
    return data.meta.lastVisitedStep;
  }
  return getLastIncompleteStepPath(data);
}

export function getApplicationStatus(data, seller) {
  return data?.status || seller?.status || 'draft';
}

export function isApproved(data, seller) {
  const status = getApplicationStatus(data, seller);
  return status === 'approved';
}

export function isVerificationPending(data, seller) {
  const status = getApplicationStatus(data, seller);
  return status === 'submitted' || status === 'pending';
}

export function getPostLoginRedirect(data, seller) {
  if (isApproved(data, seller)) return '/seller/dashboard';
  if (isVerificationPending(data, seller)) return '/seller/submitted';
  return getResumeOnboardingPath(data);
}

export const ONBOARDING_PATHS = [
  '/seller/basic-information',
  '/seller/business-information',
  '/seller/address',
  '/seller/delivery',
  '/seller/documents',
  '/seller/bank',
  '/seller/tax',
  '/seller/onboarding-fee',
  '/seller/review',
  '/seller/submitted',
  '/seller/payment-success',
];

export const PUBLIC_SELLER_PATHS = [
  '/seller',
  '/seller/welcome',
  '/seller/login',
  '/seller/register',
  '/seller/terms',
  '/seller/pricing',
  '/seller/membership',
  '/seller/onboarding-fee',
  '/seller/branding',
];

export function isOnboardingPath(pathname) {
  return ONBOARDING_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
