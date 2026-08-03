import pricingConfig from './professional/pricingConfig.js';
import { commissionMatrix as commissionConfig } from './professional/commissionMatrix.js';
import { getStoredProfessionalMembership } from './professional/membershipPlans.js';

export const PROFESSIONAL_STORAGE_KEYS = {
  onboarding: 'saathapp-professional-onboarding',
  payment: 'saathapp-professional-payment',
  membership: 'saathapp-professional-membership',
};

export const PROFESSIONAL_ONBOARDING_STEPS = [
  { id: 'accountInfo', path: '/professional/register', label: 'Account Information', section: 'accountInfo' },
  { id: 'serviceLocation', path: '/professional/register', label: 'Service Location', section: 'serviceLocation' },
  { id: 'documents', path: '/professional/register', label: 'Documents', section: 'documents' },
  { id: 'onboardingFee', path: '/professional/onboarding-fee', label: 'Onboarding Fee', section: 'onboardingFee' },
  { id: 'review', path: '/professional/review', label: 'Review & Submit', section: 'review' },
];

export const SERVICE_CATEGORIES = Object.entries(pricingConfig.categoryLabels).map(([id, label]) => ({
  id,
  label,
  group: Object.entries(pricingConfig.categoryGroups || {}).find(([, g]) => g.categories.includes(id))?.[1]?.label,
}));

export const LOCATION_TIERS = pricingConfig.locationTiers;

export const VERIFICATION_DOCUMENTS = [
  { key: 'aadhaar', label: 'Aadhaar Card', required: true },
  { key: 'pan', label: 'PAN Card', required: true },
  { key: 'photo', label: 'Passport Photo', required: true },
  { key: 'selfie', label: 'Selfie', required: true },
  { key: 'bankDetails', label: 'Bank Details / Passbook', required: false },
  { key: 'drivingLicense', label: 'Driving License', required: false },
  { key: 'tradeLicense', label: 'Trade License', required: false },
  { key: 'skillCertificate', label: 'Skill Certificate', required: false },
  { key: 'experienceProof', label: 'Experience Certificate', required: false },
  { key: 'workPhotos', label: 'Professional Work Photos', required: false },
  { key: 'businessRegistration', label: 'Business Registration', required: false },
];

export const VERIFICATION_CHECKS = [
  'Identity Verification',
  'Background Verification',
  'Skill Verification',
  'Experience Verification',
  'Compliance Review',
  'Internal Quality Standards',
  'Platform Eligibility',
  'Police Verification',
  'Character Verification',
  'Criminal Background Verification',
  'Address Verification',
  'Home Visit',
  'Office Verification',
  'Live Video Verification',
];

export function getProfessionalPricingConfig() {
  return pricingConfig;
}

export function getProfessionalCommissionConfig() {
  return commissionConfig;
}

export const defaultProfessionalOnboardingData = {
  accountInfo: {
    name: '',
    phone: '',
    email: '',
    password: '',
    category: 'electrician',
    experience: '1-3 Years',
    entityType: 'individual',
    staffCount: '1',
    equipmentLevel: 'none',
    businessScale: 'solo',
  },
  serviceLocation: {
    state: '',
    city: '',
    pincode: '',
    locationTier: 'village',
    serviceRadius: '0-5',
    workingHours: '9:00 AM - 6:00 PM',
  },
  documents: {
    aadhaar: null,
    pan: null,
    photo: null,
    selfie: null,
    bankDetails: null,
    drivingLicense: null,
    tradeLicense: null,
    skillCertificate: null,
    experienceProof: null,
    workPhotos: null,
    businessRegistration: null,
    verificationLevel: 'basic',
  },
  onboardingFee: {
    calculatedFee: null,
    breakdown: null,
    termsAccepted: false,
    paymentStatus: 'pending',
    paymentId: null,
    paidAt: null,
    validityStart: null,
    validityEnd: null,
    renewalAmount: null,
  },
  membership: {
    planId: 'free',
    planName: 'Free',
    subscribed: false,
    subscribedAt: null,
    status: 'free',
  },
  digitalServices: [],
  meta: {
    lastVisitedStep: '/professional/register',
    partnerId: null,
  },
  status: 'draft',
};

export function getDefaultOnboardingWithMembership() {
  const storedMembership = typeof window !== 'undefined' ? getStoredProfessionalMembership() : null;
  const base = { ...defaultProfessionalOnboardingData };
  if (storedMembership) {
    base.membership = { ...base.membership, ...storedMembership };
  }
  return base;
}
