export const DOC_STATUSES = {
  DRAFT: 'draft',
  UPLOADED: 'uploaded',
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
};

export const STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  uploaded: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  under_review: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  verified: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  expired: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
};

export const EXPIRY_BADGES = {
  valid: { label: 'Valid', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  expiring_soon: { label: 'Expiring Soon', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  expired: { label: 'Expired', className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  renewal: { label: 'Renewal Required', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' },
  none: { label: 'No Expiry', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
};

export const DOC_CATEGORIES = [
  {
    id: 'kyc',
    label: 'Business Verification',
    types: [
      { id: 'aadhaar', label: 'Aadhaar Card' },
      { id: 'pan', label: 'PAN Card' },
      { id: 'gst', label: 'GST Certificate' },
      { id: 'shop_license', label: 'Shop License' },
      { id: 'trade_license', label: 'Trade License' },
      { id: 'msme', label: 'MSME Certificate' },
      { id: 'udyam', label: 'UDYAM Registration' },
      { id: 'fssai', label: 'FSSAI License' },
      { id: 'ptax', label: 'Professional Tax Certificate' },
    ],
  },
  {
    id: 'banking',
    label: 'Banking',
    types: [
      { id: 'cancelled_cheque', label: 'Cancelled Cheque' },
      { id: 'passbook', label: 'Bank Passbook' },
      { id: 'bank_statement', label: 'Bank Statement' },
      { id: 'account_letter', label: 'Account Verification Letter' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    types: [
      { id: 'business_reg', label: 'Business Registration' },
      { id: 'partnership', label: 'Partnership Deed' },
      { id: 'llp', label: 'LLP Certificate' },
      { id: 'incorporation', label: 'Incorporation Certificate' },
    ],
  },
  {
    id: 'tax',
    label: 'Tax',
    types: [
      { id: 'gst_reg', label: 'GST Registration' },
      { id: 'gst_returns', label: 'GST Returns' },
      { id: 'tan', label: 'TAN Certificate' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    types: [
      { id: 'trademark', label: 'Trademark Certificate' },
      { id: 'brand_auth', label: 'Brand Authorization Letter' },
    ],
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    types: [
      { id: 'warehouse_license', label: 'Warehouse License' },
      { id: 'warehouse_agreement', label: 'Warehouse Agreement' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    types: [
      { id: 'biz_insurance', label: 'Business Insurance' },
      { id: 'product_insurance', label: 'Product Insurance' },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    types: [{ id: 'custom', label: 'Custom Document' }],
  },
];

export const ALL_DOC_TYPES = DOC_CATEGORIES.flatMap((c) =>
  c.types.map((t) => ({ ...t, categoryId: c.id, categoryLabel: c.label }))
);

export const WIZARD_STEPS = [
  { id: 1, label: 'Type' },
  { id: 2, label: 'Upload' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Submit' },
];

export const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const MAX_FILE_MB = 10;

export function getDocType(id) {
  return ALL_DOC_TYPES.find((t) => t.id === id) || ALL_DOC_TYPES[0];
}

export function getCategory(id) {
  return DOC_CATEGORIES.find((c) => c.id === id) || DOC_CATEGORIES[0];
}

export function maskAadhaar(v) {
  const s = String(v || '').replace(/\D/g, '');
  if (s.length < 4) return 'XXXX-XXXX-XXXX';
  return `XXXX-XXXX-${s.slice(-4)}`;
}

export function maskAccount(v) {
  const s = String(v || '');
  if (s.length < 4) return 'XXXXXXXX';
  return `${'X'.repeat(Math.max(0, s.length - 4))}${s.slice(-4)}`;
}

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getExpiryState(expiryAt) {
  if (!expiryAt) return 'none';
  const now = new Date();
  const exp = new Date(expiryAt);
  const days = Math.ceil((exp - now) / 86400000);
  if (days < 0) return 'expired';
  if (days <= 7) return 'renewal';
  if (days <= 30) return 'expiring_soon';
  return 'valid';
}

export function statusLabel(s) {
  if (!s) return '—';
  if (s === 'under_review') return 'Under Verification';
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
