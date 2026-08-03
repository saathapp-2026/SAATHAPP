import pricingConfig from './seller/pricingConfig.js';
import { commissionMatrix as commissionConfig } from './seller/commissionMatrix.js';

export const SELLER_STORAGE_KEYS = {
  auth: 'saathapp-seller-auth',
  onboarding: 'saathapp-seller-onboarding',
  payment: 'saathapp-seller-payment',
};

export const ONBOARDING_STEPS = [
  { id: 'basicInfo', path: '/seller/basic-information', label: 'Basic Information', section: 'basicInfo' },
  { id: 'businessInfo', path: '/seller/business-information', label: 'Business Information', section: 'businessInfo' },
  { id: 'address', path: '/seller/address', label: 'Address', section: 'address' },
  { id: 'delivery', path: '/seller/delivery', label: 'Delivery Configuration', section: 'delivery' },
  { id: 'documents', path: '/seller/documents', label: 'Documents', section: 'documents' },
  { id: 'bank', path: '/seller/bank', label: 'Bank Details', section: 'bank' },
  { id: 'tax', path: '/seller/tax', label: 'Tax Information', section: 'tax' },
  { id: 'onboardingFee', path: '/seller/onboarding-fee', label: 'Onboarding Fee', section: 'onboardingFee' },
  { id: 'review', path: '/seller/review', label: 'Review & Submit', section: 'review' },
];

export const BUSINESS_CATEGORIES = Object.entries(pricingConfig.categoryLabels).map(([id, label]) => ({
  id,
  label,
}));

export const LOCATION_TIERS = pricingConfig.locationTiers;

export const BUSINESS_SERVICES = [
  { id: 'home_delivery', label: 'Home Delivery' },
  { id: 'pickup', label: 'Store Pickup' },
  { id: 'bulk_orders', label: 'Bulk Orders' },
  { id: 'installation', label: 'Installation Service' },
  { id: 'warranty_support', label: 'Warranty Support' },
  { id: 'cod', label: 'Cash on Delivery' },
];

export function getPricingConfig() {
  return pricingConfig;
}

export function getCommissionConfig() {
  return commissionConfig;
}

export const defaultOnboardingData = {
  basicInfo: {
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    businessType: 'individual',
    profilePhoto: null,
  },
  businessInfo: {
    storeName: '',
    businessName: '',
    description: '',
    category: 'grocery',
    subcategory: '',
    brandName: '',
    experience: '1-3 years',
    productCount: '1-25',
    storeSize: 'small',
    warehouseSize: 'none',
    annualTurnover: 'under_5L',
    services: [],
  },
  address: {
    state: '',
    district: '',
    city: '',
    pincode: '',
    address: '',
    landmark: '',
    locationTier: 'village',
    latitude: null,
    longitude: null,
  },
  delivery: {
    mode: 'both',
    radius: '0-5',
    hours: '9:00 AM - 9:00 PM',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    emergencyContact: '',
    instantDelivery: false,
  },
  documents: {
    aadhaar: null,
    pan: null,
    cancelledCheque: null,
    shopPhoto: null,
    gstCertificate: null,
    fssai: null,
    tradeLicense: null,
  },
  bank: {
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: '',
    settlementPreference: 'weekly',
  },
  tax: {
    gstApplicable: false,
    gstNumber: '',
    invoicePreference: 'digital',
    hsnSupport: false,
    billingAddress: '',
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
    validUntil: null,
    paymentHistory: [],
  },
  meta: {
    lastVisitedStep: '/seller/basic-information',
  },
  status: 'draft',
};
