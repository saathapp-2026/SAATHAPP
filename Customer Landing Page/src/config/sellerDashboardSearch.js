export const DASHBOARD_SEARCH_INDEX = [
  { keywords: ['order', 'orders', 'fulfillment', 'delivery'], path: '/seller/dashboard/orders', label: 'Orders' },
  { keywords: ['product', 'products', 'catalog', 'sku', 'listing'], path: '/seller/dashboard/products', label: 'Products' },
  { keywords: ['inventory', 'stock', 'warehouse', 'sku'], path: '/seller/dashboard/inventory', label: 'Inventory' },
  { keywords: ['customer', 'customers', 'buyer', 'client'], path: '/seller/dashboard/customers', label: 'Customers' },
  { keywords: ['marketing', 'campaign', 'promotion', 'ads'], path: '/seller/dashboard/marketing', label: 'Marketing' },
  { keywords: ['analytics', 'insight', 'metric', 'chart'], path: '/seller/dashboard/analytics', label: 'Analytics' },
  { keywords: ['wallet', 'balance', 'withdraw', 'settlement'], path: '/seller/dashboard/wallet', label: 'Wallet' },
  { keywords: ['payment', 'payments', 'payout', 'transaction'], path: '/seller/dashboard/payments', label: 'Payments' },
  { keywords: ['invoice', 'invoices', 'gst', 'billing'], path: '/seller/dashboard/invoices', label: 'Invoices' },
  { keywords: ['report', 'reports', 'profit', 'loss', 'p&l'], path: '/seller/dashboard/reports', label: 'Reports' },
  { keywords: ['coupon', 'coupons', 'discount', 'promo code'], path: '/seller/dashboard/coupons', label: 'Coupons' },
  { keywords: ['onboarding', 'verification', 'kyc', 'fee'], path: '/seller/dashboard/onboarding', label: 'Onboarding' },
  { keywords: ['membership', 'plan', 'subscription', 'upgrade'], path: '/seller/dashboard/membership', label: 'Membership' },
  { keywords: ['welcome kit', 'welcomekit', 'kit'], path: '/seller/dashboard/welcome-kit', label: 'Welcome Kit' },
  { keywords: ['branding', 'merchandise', 'quote', 'hardware'], path: '/seller/dashboard/branding', label: 'Branding Store' },
  { keywords: ['setting', 'settings', 'store', 'profile', 'configuration'], path: '/seller/dashboard/settings', label: 'Store Settings' },
  { keywords: ['document', 'documents', 'kyc', 'license', 'certificate'], path: '/seller/dashboard/documents', label: 'Documents' },
  { keywords: ['support', 'help', 'ticket', 'contact'], path: '/seller/dashboard/support', label: 'Support' },
  { keywords: ['dashboard', 'home', 'overview'], path: '/seller/dashboard', label: 'Dashboard' },
];

export function resolveDashboardSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const match = DASHBOARD_SEARCH_INDEX.find((entry) =>
    entry.keywords.some((kw) => q.includes(kw) || kw.includes(q))
  );

  return match?.path || '/seller/dashboard';
}
