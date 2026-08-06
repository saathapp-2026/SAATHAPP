export const SELLER_PUBLIC_ROUTES = {
  welcome: '/seller/welcome',
  landing: '/seller',
  login: '/seller/login',
  register: '/seller/register',
  pricing: '/seller/pricing',
  terms: '/seller/terms',
  membership: '/seller/membership',
  branding: '/seller/branding',
};

export const SELLER_ONBOARDING_ROUTES = {
  basicInformation: '/seller/basic-information',
  businessInformation: '/seller/business-information',
  address: '/seller/address',
  delivery: '/seller/delivery',
  documents: '/seller/documents',
  bank: '/seller/bank',
  tax: '/seller/tax',
  onboardingFee: '/seller/onboarding-fee',
  paymentSuccess: '/seller/payment-success',
  review: '/seller/review',
  submitted: '/seller/submitted',
};

export const SELLER_DASHBOARD_ROUTES = {
  home: '/seller/dashboard',
  orders: '/seller/dashboard/orders',
  products: '/seller/dashboard/products',
  inventory: '/seller/dashboard/inventory',
  customers: '/seller/dashboard/customers',
  marketing: '/seller/dashboard/marketing',
  analytics: '/seller/dashboard/analytics',
  wallet: '/seller/dashboard/wallet',
  payments: '/seller/dashboard/payments',
  invoices: '/seller/dashboard/invoices',
  reports: '/seller/dashboard/reports',
  coupons: '/seller/dashboard/coupons',
  onboarding: '/seller/dashboard/onboarding',
  membership: '/seller/dashboard/membership',
  welcomeKit: '/seller/dashboard/welcome-kit',
  branding: '/seller/dashboard/branding',
  settings: '/seller/dashboard/settings',
  documents: '/seller/dashboard/documents',
  support: '/seller/dashboard/support',
};

export const OFFICIAL_PROCESS_FLOW = [
  { step: 1, label: 'Customer Landing Page', path: '/' },
  { step: 2, label: 'Become a Seller', path: '/seller' },
  { step: 3, label: 'Seller Welcome', path: '/seller/welcome' },
  { step: 4, label: 'Login / Register', path: '/seller/login' },
  { step: 5, label: 'Basic Information', path: '/seller/basic-information' },
  { step: 6, label: 'Business Information', path: '/seller/business-information' },
  { step: 7, label: 'Address', path: '/seller/address' },
  { step: 8, label: 'Delivery Configuration', path: '/seller/delivery' },
  { step: 9, label: 'Documents', path: '/seller/documents' },
  { step: 10, label: 'Bank Details', path: '/seller/bank' },
  { step: 11, label: 'Tax Information', path: '/seller/tax' },
  { step: 12, label: 'One-Time Onboarding Fee', path: '/seller/onboarding-fee' },
  { step: 13, label: 'Payment', path: '/seller/onboarding-fee' },
  { step: 14, label: 'Review', path: '/seller/review' },
  { step: 15, label: 'Submit Application', path: '/seller/review' },
  { step: 16, label: 'Verification', path: '/seller/submitted' },
  { step: 17, label: 'Seller Approved', path: '/seller/submitted' },
  { step: 18, label: 'Seller Dashboard', path: '/seller/dashboard' },
  { step: 19, label: 'Start Selling', path: '/seller/dashboard' },
  { step: 20, label: 'Purchase Membership (Optional)', path: '/seller/dashboard/membership', optional: true },
];

export const BUSINESS_MODEL = {
  onboardingFee: {
    mandatory: true,
    label: 'One-Time Seller Onboarding Fee',
    validityYears: 2,
    renewalPercent: 50,
  },
  membership: {
    optional: true,
    label: 'Monthly Seller Membership',
    note: 'NOT required for seller registration. Can be purchased during registration or anytime after approval.',
    plans: [
      { id: 'free', name: 'Free', price: 0 },
      { id: 'starter', name: 'Starter', price: 799 },
      { id: 'growth', name: 'Growth', price: 2499 },
      { id: 'enterprise', name: 'Enterprise', price: 4999 },
    ],
  },
};

export default {
  public: SELLER_PUBLIC_ROUTES,
  onboarding: SELLER_ONBOARDING_ROUTES,
  dashboard: SELLER_DASHBOARD_ROUTES,
  flow: OFFICIAL_PROCESS_FLOW,
  businessModel: BUSINESS_MODEL,
};
