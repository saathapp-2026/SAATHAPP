import { delay } from './_sellerServiceUtils';
import {
  PRODUCT_STATUS,
  emptyProductDraft,
  generateSku,
  calcPricing,
  validateHsn,
  validateBarcode,
} from '../../config/seller/productConstants';

const PRODUCTS_KEY = 'saathapp-seller-products-v2';
const DRAFT_KEY = 'saathapp-seller-product-draft-v2';

function seedProducts() {
  return Array.from({ length: 3 }, (_, i) => ({
    ...emptyProductDraft(),
    id: crypto.randomUUID(),
    status: PRODUCT_STATUS.PUBLISHED,
    basic: { ...emptyProductDraft().basic, name: '\u00A0', sku: '\u00A0', category: '\u00A0' },
    pricing: { ...emptyProductDraft().pricing, mrp: 0, sellingPrice: 0, offerPrice: 0 },
    inventory: { ...emptyProductDraft().inventory, initialStock: 0 },
    createdAt: Date.now(),
    updatedAt: Date.now()
  }));
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  const seeded = seedProducts();
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  return list;
}

export function loadProductDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export function saveProductDraftLocal(draft) {
  try {
    const payload = { ...draft, updatedAt: Date.now() };
    // Avoid blowing localStorage quota with huge data-URLs — keep a slim copy for recovery
    const slim = {
      ...payload,
      media: {
        ...payload.media,
        mainImage: payload.media?.mainImage
          ? {
              id: payload.media.mainImage.id,
              name: payload.media.mainImage.name,
              progress: payload.media.mainImage.progress,
              // Persist data/http URLs; blob URLs are session-only
              url: payload.media.mainImage.url?.startsWith('blob:')
                ? ''
                : payload.media.mainImage.url,
            }
          : null,
        gallery: (payload.media?.gallery || []).map((g) => ({
          id: g.id,
          name: g.name,
          progress: g.progress,
          url: g.url?.startsWith('blob:') ? '' : g.url,
        })),
      },
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(slim));
    return payload;
  } catch {
    return draft;
  }
}

export function clearProductDraftLocal() {
  localStorage.removeItem(DRAFT_KEY);
}

export async function getProducts(filters = {}) {
  await delay(300);
  let list = loadProducts();
  const {
    search = '',
    statuses = [],
    stock = '',
    sortBy = 'newest',
    page = 1,
    pageSize = 8,
  } = filters;

  if (search) {
    const q = search.toLowerCase();
    list = list.filter((p) =>
      [p.basic.name, p.basic.sku, p.basic.barcode, p.basic.brand, p.basic.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  if (statuses.length) list = list.filter((p) => statuses.includes(p.status));
  if (stock === 'out') list = list.filter((p) => Number(p.inventory.initialStock) <= 0);
  if (stock === 'low') {
    list = list.filter(
      (p) =>
        Number(p.inventory.initialStock) > 0 &&
        Number(p.inventory.initialStock) <= Number(p.inventory.minStockAlert || 10)
    );
  }

  list = [...list].sort((a, b) => {
    if (sortBy === 'oldest') return a.createdAt - b.createdAt;
    if (sortBy === 'stock') return Number(b.inventory.initialStock) - Number(a.inventory.initialStock);
    if (sortBy === 'price') return Number(b.pricing.offerPrice || b.pricing.sellingPrice) - Number(a.pricing.offerPrice || a.pricing.sellingPrice);
    if (sortBy === 'name') return (a.basic.name || '').localeCompare(b.basic.name || '');
    if (sortBy === 'revenue') return (b.analytics?.revenue || 0) - (a.analytics?.revenue || 0);
    return b.updatedAt - a.updatedAt;
  });

  const total = list.length;
  const start = (page - 1) * pageSize;
  return {
    success: true,
    data: list.slice(start, start + pageSize),
    meta: { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
  };
}

export async function getProductById(id) {
  await delay(200);
  const product = loadProducts().find((p) => p.id === id);
  if (!product) return { success: false, error: 'Product not found' };
  return { success: true, data: product };
}

export async function getProductSummaryStats() {
  await delay(250);
  const list = loadProducts();
  return {
    success: true,
    data: {
      total: list.length,
      published: list.filter((p) => p.status === PRODUCT_STATUS.PUBLISHED).length,
      draft: list.filter((p) => p.status === PRODUCT_STATUS.DRAFT).length,
      pending: list.filter((p) => p.status === PRODUCT_STATUS.PENDING_REVIEW).length,
      outOfStock: list.filter((p) => Number(p.inventory.initialStock) <= 0).length,
      lowStock: list.filter(
        (p) =>
          Number(p.inventory.initialStock) > 0 &&
          Number(p.inventory.initialStock) <= Number(p.inventory.minStockAlert || 10)
      ).length,
      views: list.reduce((s, p) => s + (p.analytics?.views || 0), 0),
    },
  };
}

export async function getProductAnalytics() {
  await delay(350);
  const list = loadProducts();
  const published = list.filter((p) => p.status === PRODUCT_STATUS.PUBLISHED);
  const views = published.reduce((s, p) => s + (p.analytics?.views || 0), 0);
  const clicks = published.reduce((s, p) => s + (p.analytics?.clicks || 0), 0);
  const orders = published.reduce((s, p) => s + (p.analytics?.orders || 0), 0);
  const revenue = published.reduce((s, p) => s + (p.analytics?.revenue || 0), 0);
  const returns = published.reduce((s, p) => s + (p.analytics?.returns || 0), 0);

  const top = [...published].sort((a, b) => (b.analytics?.revenue || 0) - (a.analytics?.revenue || 0)).slice(0, 5);
  const low = list
    .filter((p) => Number(p.inventory.initialStock) <= Number(p.inventory.minStockAlert || 10))
    .slice(0, 5);
  const worst = [...published].sort((a, b) => (a.analytics?.orders || 0) - (b.analytics?.orders || 0)).slice(0, 5);

  const daily = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    return {
      label: day.toLocaleDateString('en-IN', { weekday: 'short' }),
      views: 0,
      orders: 0,
      revenue: 0,
    };
  });

  return {
    success: true,
    data: {
      views,
      clicks,
      ctr: views ? Math.round((clicks / views) * 10000) / 100 : 0,
      orders,
      conversionRate: clicks ? Math.round((orders / clicks) * 10000) / 100 : 0,
      revenue,
      returns,
      top,
      low,
      worst,
      daily,
    },
  };
}

export function validateProductStep(draft, step) {
  const errors = {};
  if (step === 1) {
    const b = draft.basic;
    if (!b.name?.trim()) errors.name = 'Product name is required';
    if (!b.category) errors.category = 'Category is required';
    if (!b.subCategory) errors.subCategory = 'Sub category is required';
    if (!b.sku?.trim()) errors.sku = 'SKU is required';
    const hsnErr = validateHsn(b.hsn);
    if (hsnErr) errors.hsn = hsnErr;
    const bcErr = validateBarcode(b.barcode);
    if (bcErr) errors.barcode = bcErr;
    const upcErr = validateBarcode(b.upc, 'upc');
    if (upcErr) errors.upc = upcErr;
    const eanErr = validateBarcode(b.ean, 'ean');
    if (eanErr) errors.ean = eanErr;
    const others = loadProducts().filter((p) => p.id !== draft.id);
    if (others.some((p) => p.basic.sku?.toLowerCase() === b.sku?.toLowerCase())) {
      errors.sku = 'SKU already exists';
    }
  }
  if (step === 2) {
    const main = draft?.media?.mainImage;
    const url = main?.url;
    const hasValidImage =
      !!main &&
      typeof url === 'string' &&
      url.length > 32 &&
      (url.startsWith('data:image') || url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://'));
    if (!hasValidImage) {
      errors.mainImage = 'Main image is required';
    }
  }
  if (step === 3) {
    if (!draft.description.short?.trim()) errors.short = 'Short description is required';
    if ((draft.description.short || '').length > 150) errors.short = 'Max 150 characters';
  }
  if (step === 4) {
    const p = draft.pricing;
    if (!p.mrp || Number(p.mrp) <= 0) errors.mrp = 'Valid MRP is required';
    if (!p.sellingPrice || Number(p.sellingPrice) <= 0) errors.sellingPrice = 'Selling price is required';
    if (Number(p.offerPrice) < 0) errors.offerPrice = 'Cannot be negative';
    if (Number(p.sellingPrice) > Number(p.mrp)) errors.sellingPrice = 'Selling price cannot exceed MRP';
  }
  if (step === 5) {
    if (draft.inventory.initialStock === '' || Number(draft.inventory.initialStock) < 0) {
      errors.initialStock = 'Initial stock is required';
    }
    if (!draft.inventory.warehouse) errors.warehouse = 'Warehouse is required';
  }
  if (step === 6 && draft.variants.enabled) {
    if (!draft.variants.items?.length) errors.variants = 'Add at least one variant';
    const skus = draft.variants.items.map((v) => v.sku);
    if (new Set(skus).size !== skus.length) errors.variants = 'Variant SKUs must be unique';
  }
  if (step === 7) {
    if (!draft.delivery.modes?.length) errors.modes = 'Select at least one delivery mode';
  }
  return errors;
}

export async function saveProduct(draft, { publish = false, submitReview = false } = {}) {
  await delay(400);
  const list = loadProducts();
  let status = draft.status || PRODUCT_STATUS.DRAFT;
  if (publish) status = draft.approval?.required ? PRODUCT_STATUS.PENDING_REVIEW : PRODUCT_STATUS.PUBLISHED;
  if (submitReview) status = PRODUCT_STATUS.PENDING_REVIEW;
  if (draft.delivery?.visibility === 'schedule' && draft.delivery.publishAt) status = PRODUCT_STATUS.SCHEDULED;
  if (draft.delivery?.visibility === 'hide') status = PRODUCT_STATUS.HIDDEN;

  const product = {
    ...draft,
    id: draft.id || `prd_${Date.now()}`,
    status,
    updatedAt: Date.now(),
    createdAt: draft.createdAt || Date.now(),
    pricing: {
      ...draft.pricing,
      discountPct: calcPricing(draft.pricing).discountPct,
    },
  };

  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) list[idx] = product;
  else list.unshift(product);
  saveProducts(list);
  clearProductDraftLocal();
  return { success: true, data: product };
}

export async function createProduct(payload) {
  return saveProduct({ ...emptyProductDraft(), ...payload, basic: { ...emptyProductDraft().basic, ...payload } });
}

export async function duplicateProduct(id) {
  await delay(350);
  const list = loadProducts();
  const src = list.find((p) => p.id === id);
  if (!src) return { success: false, error: 'Not found' };
  const copy = {
    ...JSON.parse(JSON.stringify(src)),
    id: `prd_${Date.now()}`,
    status: PRODUCT_STATUS.DRAFT,
    basic: {
      ...src.basic,
      name: `${src.basic.name} (Copy)`,
      sku: generateSku(src.basic.name),
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  list.unshift(copy);
  saveProducts(list);
  return { success: true, data: copy };
}

export async function bulkUpdateProducts(ids, action) {
  await delay(400);
  let list = loadProducts();
  if (action === 'delete') {
    list = list.filter((p) => !ids.includes(p.id));
  } else {
    list = list.map((p) => {
      if (!ids.includes(p.id)) return p;
      if (action === 'publish') return { ...p, status: PRODUCT_STATUS.PUBLISHED, updatedAt: Date.now() };
      if (action === 'hide') return { ...p, status: PRODUCT_STATUS.HIDDEN, updatedAt: Date.now() };
      if (action === 'archive') return { ...p, status: PRODUCT_STATUS.ARCHIVED, updatedAt: Date.now() };
      return p;
    });
  }
  saveProducts(list);
  return { success: true };
}

export async function suggestCategory(title = '') {
  await delay(500);
  const t = title.toLowerCase();
  if (t.includes('oil') || t.includes('ghee')) {
    return { success: true, data: { category: 'grocery', subCategory: 'Oils & Ghee', tags: ['oil', 'wholesale', 'cooking'] } };
  }
  if (t.includes('rice') || t.includes('basmati')) {
    return { success: true, data: { category: 'grocery', subCategory: 'Rice & Grains', tags: ['rice', 'staple'] } };
  }
  if (t.includes('tea') || t.includes('coffee')) {
    return { success: true, data: { category: 'fmcg', subCategory: 'Beverages', tags: ['beverage'] } };
  }
  if (t.includes('phone') || t.includes('mobile')) {
    return { success: true, data: { category: 'electronics', subCategory: 'Mobiles', tags: ['electronics'] } };
  }
  return { success: true, data: { category: 'fmcg', subCategory: 'Home Care', tags: ['general'] } };
}

export async function aiDescriptionTools(action, text = '', name = '') {
  await delay(600);
  const base = text || `${name} is a high-quality wholesale product suitable for retailers and bulk buyers.`;
  if (action === 'generate') {
    return {
      success: true,
      data: {
        short: `${name || 'Product'} — premium wholesale quality. Ideal for retailers.`.slice(0, 150),
        long: `${base}\n\nKey benefits include consistent quality, competitive wholesale pricing, and reliable supply for your store.`,
      },
    };
  }
  if (action === 'rewrite') {
    return { success: true, data: { text: `${base} Crafted for modern retail shelves with trusted quality standards.` } };
  }
  if (action === 'translate') {
    return { success: true, data: { text: `${base}\n\n(हिन्दी) यह उत्पाद थोक खरीदारों के लिए उच्च गुणवत्ता वाला विकल्प है।` } };
  }
  if (action === 'seo') {
    return {
      success: true,
      data: {
        text: `${base} Buy wholesale ${name || 'products'} online. Best price, GST invoice, fast delivery.`,
        keywords: `${name}, wholesale, bulk, GST, delivery`,
      },
    };
  }
  if (action === 'grammar') {
    return { success: true, data: { text: base.replace(/\s+/g, ' ').trim() } };
  }
  if (action === 'keywords') {
    return { success: true, data: { keywords: [name, 'wholesale', 'bulk pack', 'GST invoice', 'fast delivery'].filter(Boolean) } };
  }
  return { success: true, data: { text: base } };
}

export async function importProductsCsv(csvText) {
  await delay(700);
  const lines = csvText.trim().split('\n').filter(Boolean);
  if (lines.length < 2) return { success: false, error: 'Empty file', report: { ok: 0, failed: 0, errors: ['No rows'] } };
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const required = ['name', 'sku', 'mrp', 'sellingprice', 'stock'];
  const missing = required.filter((r) => !headers.includes(r));
  if (missing.length) {
    return { success: false, error: `Missing columns: ${missing.join(', ')}`, report: { ok: 0, failed: lines.length - 1, errors: missing } };
  }
  const list = loadProducts();
  const errors = [];
  let ok = 0;
  for (let i = 1; i < lines.length; i += 1) {
    const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    const row = Object.fromEntries(headers.map((h, idx) => [h, cols[idx]]));
    if (!row.name || !row.sku) {
      errors.push(`Row ${i + 1}: name/sku required`);
      continue;
    }
    if (list.some((p) => p.basic.sku === row.sku)) {
      errors.push(`Row ${i + 1}: duplicate SKU ${row.sku}`);
      continue;
    }
    const draft = emptyProductDraft();
    draft.id = `prd_${Date.now()}_${i}`;
    draft.status = PRODUCT_STATUS.DRAFT;
    draft.basic.name = row.name;
    draft.basic.sku = row.sku;
    draft.basic.category = row.category || 'grocery';
    draft.basic.subCategory = row.subcategory || 'Oils & Ghee';
    draft.basic.hsn = row.hsn || '1512';
    draft.pricing.mrp = Number(row.mrp) || 0;
    draft.pricing.sellingPrice = Number(row.sellingprice) || 0;
    draft.pricing.offerPrice = Number(row.offerprice || row.sellingprice) || 0;
    draft.inventory.initialStock = Number(row.stock) || 0;
    draft.completedSteps = [1];
    list.unshift(draft);
    ok += 1;
  }
  saveProducts(list);
  return { success: true, report: { ok, failed: errors.length, errors } };
}

export function getCsvTemplate() {
  return 'name,sku,category,subcategory,hsn,mrp,sellingprice,offerprice,stock\nSample Oil 5L,SMP-0001,grocery,Oils & Ghee,1514,900,820,799,100\n';
}

export async function autoGenerateSku(name) {
  await delay(150);
  return { success: true, data: generateSku(name) };
}

export function resetProductsDemoData() {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(DRAFT_KEY);
  return loadProducts();
}
