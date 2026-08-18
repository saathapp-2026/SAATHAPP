/**
 * Seller product catalog constants — lifecycle, wizard steps, validation helpers.
 */

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PENDING_REVIEW: 'pending_review',
  PUBLISHED: 'published',
  HIDDEN: 'hidden',
  ARCHIVED: 'archived',
  REJECTED: 'rejected',
};

export const PRODUCT_STATUS_LABELS = {
  [PRODUCT_STATUS.DRAFT]: 'Draft',
  [PRODUCT_STATUS.SCHEDULED]: 'Scheduled',
  [PRODUCT_STATUS.PENDING_REVIEW]: 'Pending Review',
  [PRODUCT_STATUS.PUBLISHED]: 'Published',
  [PRODUCT_STATUS.HIDDEN]: 'Hidden',
  [PRODUCT_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_STATUS.REJECTED]: 'Rejected',
};

export const PRODUCT_STATUS_COLORS = {
  [PRODUCT_STATUS.DRAFT]: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-500',
  },
  [PRODUCT_STATUS.SCHEDULED]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  [PRODUCT_STATUS.PENDING_REVIEW]: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  [PRODUCT_STATUS.PUBLISHED]: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  [PRODUCT_STATUS.HIDDEN]: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
  },
  [PRODUCT_STATUS.ARCHIVED]: {
    bg: 'bg-slate-200 dark:bg-slate-700',
    text: 'text-slate-600 dark:text-slate-300',
    dot: 'bg-slate-500',
  },
  [PRODUCT_STATUS.REJECTED]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
};

export const WIZARD_STEPS = [
  { id: 1, key: 'basic', label: 'Basic Info' },
  { id: 2, key: 'media', label: 'Images' },
  { id: 3, key: 'description', label: 'Description' },
  { id: 4, key: 'pricing', label: 'Pricing' },
  { id: 5, key: 'inventory', label: 'Inventory' },
  { id: 6, key: 'variants', label: 'Variants' },
  { id: 7, key: 'delivery', label: 'Shipping' },
  { id: 8, key: 'preview', label: 'Preview' },
];

import { MASTER_CATEGORIES, GIFT_SET_CATEGORY } from '../categoryConfig';

export const PRODUCT_CATEGORIES = [
  ...MASTER_CATEGORIES.map(c => ({
    id: c.id,
    label: c.name,
    sub: c.subcategories || [],
    isOfficialOnly: !!c.isOfficialOnly
  })),
  {
    id: 'fmcg',
    label: 'FMCG & Personal Care',
    sub: ['Personal Care', 'Home Care', 'Beverages', 'Snacks', 'Dairy'],
  },
  {
    id: GIFT_SET_CATEGORY.id,
    label: GIFT_SET_CATEGORY.name,
    sub: GIFT_SET_CATEGORY.subcategories,
    isMarketplaceOpen: true
  }
];

export const GST_SLABS = [0, 5, 12, 18, 28];

export const PRODUCT_CONDITIONS = [
  { id: 'new', label: 'New' },
  { id: 'refurbished', label: 'Refurbished' },
];

export const UNITS = ['Piece', 'Kg', 'Litre', 'Tin', 'Pack', 'Box', 'Dozen', 'Meter'];

export const VARIANT_TYPES = ['Color', 'Size', 'Storage', 'Material', 'Weight', 'Pack Size'];

export const DELIVERY_MODES = [
  { id: 'self', label: 'Self Delivery' },
  { id: 'saath', label: 'Saath Delivery' },
  { id: 'courier', label: 'Courier' },
];

export const SHIPPING_OPTIONS = [
  { id: 'same_day', label: 'Same Day' },
  { id: 'next_day', label: 'Next Day' },
  { id: 'express', label: 'Express' },
  { id: 'standard', label: 'Standard' },
];

export const WAREHOUSES = [
  { id: 'wh_main', label: 'Main Warehouse — Bengaluru' },
  { id: 'wh_city', label: 'City Store Stock' },
  { id: 'wh_north', label: 'North Hub — Delhi' },
];

export const PLATFORM_COMMISSION_RATE = 0.05;
export const PLATFORM_FEE_FLAT = 12;

export function emptyProductDraft() {
  return {
    id: null,
    status: PRODUCT_STATUS.DRAFT,
    completedSteps: [],
    language: 'en',
    basic: {
      name: '',
      shortName: '',
      category: '',
      subCategory: '',
      brand: '',
      manufacturer: '',
      modelNumber: '',
      sku: '',
      skuManual: false,
      barcode: '',
      upc: '',
      ean: '',
      hsn: '',
      countryOfOrigin: 'India',
      condition: 'new',
      taxSlab: 5,
      unit: 'Piece',
      tags: [],
    },
    media: {
      mainImage: null,
      gallery: [],
      thumbnail: null,
      lifestyle: [],
      images360: [],
      video: null,
      youtubeUrl: '',
      pdfCatalogue: null,
    },
    description: {
      short: '',
      long: '',
      keyFeatures: [''],
      specifications: [{ key: '', value: '' }],
      boxContents: '',
      warranty: '',
      returnPolicy: '',
      careInstructions: '',
      seoTitle: '',
      seoKeywords: '',
    },
    pricing: {
      mrp: '',
      sellingPrice: '',
      offerPrice: '',
      discountPct: 0,
      gstPct: 5,
      taxInclusive: true,
      packagingCharges: 0,
      wholesalePrice: '',
      moq: 1,
      maxOrderQty: '',
    },
    inventory: {
      initialStock: '',
      warehouse: 'wh_main',
      shelfLocation: '',
      minStockAlert: 10,
      maxStock: '',
      reservedStock: 0,
      weight: '',
      length: '',
      width: '',
      height: '',
    },
    variants: {
      enabled: false,
      type: 'Size',
      items: [],
    },
    delivery: {
      modes: ['saath'],
      shipping: ['standard'],
      cod: true,
      pickupAvailable: false,
      returnAvailable: true,
      replacementAvailable: true,
      visibility: 'draft',
      publishAt: '',
    },
    approval: {
      required: false,
      stage: null,
      remarks: '',
    },
    analytics: {
      views: 0,
      clicks: 0,
      orders: 0,
      revenue: 0,
      returns: 0,
    },
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };
}

export function calcPricing(pricing) {
  const mrp = Number(pricing.mrp) || 0;
  const selling = Number(pricing.sellingPrice) || 0;
  const offer = Number(pricing.offerPrice) || selling || 0;
  const base = offer || selling;
  const discountPct = mrp > 0 && base > 0 ? Math.round(((mrp - base) / mrp) * 10000) / 100 : Number(pricing.discountPct) || 0;
  const gstPct = Number(pricing.gstPct) || 0;
  const packaging = Number(pricing.packagingCharges) || 0;
  const gstAmount = pricing.taxInclusive ? (base * gstPct) / (100 + gstPct) : (base * gstPct) / 100;
  const commission = base * PLATFORM_COMMISSION_RATE;
  const platformFee = PLATFORM_FEE_FLAT;
  const net = base - commission - platformFee;
  const costBasis = Number(pricing.wholesalePrice) || base * 0.7;
  const profit = net - costBasis;
  const margin = base > 0 ? Math.round((profit / base) * 10000) / 100 : 0;

  return {
    mrp,
    selling,
    offer,
    discountPct,
    gstPct,
    gstAmount: Math.round(gstAmount * 100) / 100,
    commission: Math.round(commission * 100) / 100,
    platformFee,
    packaging,
    netEarnings: Math.round(net * 100) / 100,
    profitMargin: margin,
  };
}

export function validateHsn(hsn) {
  if (!hsn) return 'HSN code is required';
  if (!/^\d{4}(\d{2})?(\d{2})?$/.test(String(hsn).trim())) return 'HSN must be 4, 6, or 8 digits';
  return '';
}

export function validateBarcode(code, type = 'barcode') {
  if (!code) return '';
  const digits = String(code).replace(/\D/g, '');
  if (type === 'upc' && digits.length !== 12) return 'UPC must be 12 digits';
  if (type === 'ean' && ![8, 13].includes(digits.length)) return 'EAN must be 8 or 13 digits';
  if (type === 'barcode' && digits.length > 0 && (digits.length < 8 || digits.length > 14)) {
    return 'Barcode should be 8–14 digits';
  }
  return '';
}

export function generateSku(name = '') {
  const prefix = (name || 'PRD')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 3)
    .toUpperCase() || 'PRD';
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${rand}`;
}

export const QUICK_TIPS = [
  'Use clear product images on white background',
  'Ensure correct HSN code & GST slab',
  'Add accurate MOQ and stock for wholesale buyers',
  'Write keyword-rich short descriptions for search',
  'Keep variant SKUs unique across your catalog',
];
