import { delay } from './_sellerServiceUtils';
import {
  COUPON_TYPES,
  AD_TYPES,
  BANNER_TYPES,
  POSTER_TYPES,
  SPONSORED_TYPES,
  CAMPAIGN_TYPES,
  PROMO_STATUSES,
  formatINR,
  getPromoType,
} from '../../config/seller/couponConstants';

const STORAGE_KEY = 'saathapp_seller_coupons_v1';
const DRAFT_KEY = 'saathapp_seller_coupon_wizard_draft';

function daysFromNow(n, h = 10) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return fallback;
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function seedPromos() {
  const base = [
    {
      id: 'cpn-1001',
      kind: 'coupon',
      typeId: 'percentage',
      name: 'Summer Sale 20%',
      code: 'SUMMER20',
      description: '20% off on grocery orders',
      discountType: 'percentage',
      discountValue: 20,
      maxDiscount: 200,
      minOrder: 500,
      maxUses: 100,
      used: 45,
      perCustomer: 1,
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-10),
      endAt: daysFromNow(20),
      revenue: 28400,
      applicability: 'store',
      stackable: false,
      codAllowed: true,
      createdAt: daysFromNow(-12),
    },
    {
      id: 'cpn-1002',
      kind: 'coupon',
      typeId: 'flat',
      name: 'New User ₹100',
      code: 'NEW100',
      description: 'Flat ₹100 for first orders',
      discountType: 'flat',
      discountValue: 100,
      maxDiscount: 100,
      minOrder: 300,
      maxUses: 200,
      used: 89,
      perCustomer: 1,
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-5),
      endAt: daysFromNow(40),
      revenue: 15600,
      applicability: 'new',
      stackable: false,
      codAllowed: true,
      createdAt: daysFromNow(-6),
    },
    {
      id: 'cpn-1003',
      kind: 'coupon',
      typeId: 'festival',
      name: 'Festival Special',
      code: 'FESTIVAL',
      description: '15% festival offer',
      discountType: 'percentage',
      discountValue: 15,
      maxDiscount: 300,
      minOrder: 1000,
      maxUses: 50,
      used: 12,
      perCustomer: 2,
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-2),
      endAt: daysFromNow(15),
      revenue: 9200,
      applicability: 'categories',
      categories: ['Grocery', 'FMCG'],
      stackable: false,
      codAllowed: false,
      createdAt: daysFromNow(-3),
    },
    {
      id: 'cpn-1004',
      kind: 'coupon',
      typeId: 'flat',
      name: 'VIP Flat 50',
      code: 'VIP50',
      description: 'VIP exclusive flat discount',
      discountType: 'flat',
      discountValue: 50,
      maxDiscount: 50,
      minOrder: 200,
      maxUses: 200,
      used: 200,
      perCustomer: 1,
      status: PROMO_STATUSES.EXPIRED,
      startAt: daysFromNow(-40),
      endAt: daysFromNow(-5),
      revenue: 7800,
      applicability: 'vip',
      stackable: false,
      codAllowed: true,
      createdAt: daysFromNow(-42),
    },
    {
      id: 'cpn-1005',
      kind: 'coupon',
      typeId: 'first_order',
      name: 'Welcome Offer',
      code: 'WELCOME',
      description: '10% welcome discount',
      discountType: 'percentage',
      discountValue: 10,
      maxDiscount: 150,
      minOrder: 0,
      maxUses: 0,
      used: 156,
      perCustomer: 1,
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-60),
      endAt: daysFromNow(90),
      revenue: 22100,
      applicability: 'new',
      stackable: true,
      codAllowed: true,
      createdAt: daysFromNow(-60),
    },
    {
      id: 'cmp-2001',
      kind: 'campaign',
      typeId: 'campaign_flash',
      name: 'Weekend Flash Sale',
      code: 'FLASH-WKND',
      description: '48-hour flash sale campaign',
      status: PROMO_STATUSES.RUNNING || 'active',
      startAt: daysFromNow(0),
      endAt: daysFromNow(2),
      budget: 25000,
      spent: 8200,
      revenue: 48600,
      used: 64,
      discountValue: 25,
      discountType: 'percentage',
      createdAt: daysFromNow(-1),
    },
    {
      id: 'ban-3001',
      kind: 'banner',
      typeId: 'banner_home',
      name: 'Homepage Mega Banner',
      code: 'BAN-HOME-01',
      description: 'Hero banner for grocery fest',
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-3),
      endAt: daysFromNow(10),
      cta: 'Shop Now',
      destinationUrl: '/shop/grocery',
      priority: 1,
      revenue: 12000,
      used: 0,
      createdAt: daysFromNow(-3),
    },
    {
      id: 'ad-4001',
      kind: 'ad',
      typeId: 'ad_image',
      name: 'Organic Mango Spotlight',
      code: 'AD-MANGO',
      description: 'Image ad for organic mangoes',
      status: PROMO_STATUSES.ACTIVE,
      startAt: daysFromNow(-7),
      endAt: daysFromNow(14),
      budget: 8000,
      spent: 2100,
      cta: 'Buy Now',
      destinationUrl: '/product/mango',
      revenue: 9400,
      used: 0,
      createdAt: daysFromNow(-7),
    },
    {
      id: 'pos-5001',
      kind: 'poster',
      typeId: 'poster_clickable',
      name: 'Festival Clickable Poster',
      code: 'POSTER-FEST',
      description: 'Clickable festival poster with QR',
      status: PROMO_STATUSES.SCHEDULED,
      startAt: daysFromNow(3),
      endAt: daysFromNow(20),
      cta: 'Grab Offer',
      destinationUrl: '/offers/festival',
      qrEnabled: true,
      revenue: 0,
      used: 0,
      createdAt: daysFromNow(-1),
    },
    {
      id: 'spn-6001',
      kind: 'sponsored',
      typeId: 'sponsor_product',
      name: 'Basmati Rice Sponsored',
      code: 'SPN-RICE',
      description: 'Sponsored product on homepage & search',
      status: PROMO_STATUSES.ACTIVE,
      productName: 'Basmati Rice 5kg',
      budget: 15000,
      dailyBudget: 500,
      spent: 3200,
      startAt: daysFromNow(-4),
      endAt: daysFromNow(26),
      placements: ['homepage', 'search'],
      revenue: 18700,
      used: 0,
      createdAt: daysFromNow(-4),
    },
  ];

  // normalize running → active
  return base.map((p) => ({
    ...p,
    status: p.status === 'running' ? PROMO_STATUSES.ACTIVE : p.status,
    notes: p.notes || '',
  }));
}

function ensurePromos() {
  let list = load(STORAGE_KEY, null);
  if (!Array.isArray(list) || !list.length) {
    list = seedPromos();
    save(STORAGE_KEY, list);
  }
  return list;
}

export async function getCouponSummary() {
  await delay(180);
  const list = ensurePromos();
  const activeCoupons = list.filter((p) => p.kind === 'coupon' && p.status === 'active').length;
  const usedToday = list.filter((p) => p.kind === 'coupon').reduce((s, p) => s + Math.min(12, Math.round((p.used || 0) / 8)), 0);
  const savings = list.reduce((s, p) => s + (p.used || 0) * (p.discountType === 'percentage' ? 80 : Number(p.discountValue) || 40), 0);
  const conversion = 8.5;
  const sponsored = list.filter((p) => p.kind === 'sponsored' && p.status === 'active').length;
  const campaigns = list.filter((p) => p.kind === 'campaign' && ['active', 'scheduled'].includes(p.status)).length;
  const banners = list.filter((p) => p.kind === 'banner' && p.status === 'active').length;
  const revenue = list.reduce((s, p) => s + (Number(p.revenue) || 0), 0);

  return {
    success: true,
    data: [
      { key: 'active', label: 'Active Coupons', displayValue: activeCoupons, changePct: 12.4, trend: 'up', color: 'emerald', icon: 'ticket', tooltip: 'Live discount coupons' },
      { key: 'used', label: 'Coupons Used Today', displayValue: usedToday || 12, changePct: 6.2, trend: 'up', color: 'sky', icon: 'trend', tooltip: 'Redemptions today' },
      { key: 'savings', label: 'Total Savings', displayValue: formatINR(savings || 4200), changePct: 9.1, trend: 'up', color: 'amber', icon: 'rupee', tooltip: 'Customer savings from promos' },
      { key: 'conversion', label: 'Conversion Rate', displayValue: `${conversion}%`, changePct: 1.8, trend: 'up', color: 'violet', icon: 'chart', tooltip: 'Promo → order conversion' },
      { key: 'sponsored', label: 'Sponsored Products', displayValue: sponsored, changePct: 4.0, trend: 'up', color: 'orange', icon: 'star', tooltip: 'Active sponsored listings' },
      { key: 'campaigns', label: 'Active Campaigns', displayValue: campaigns, changePct: 8.0, trend: 'up', color: 'blue', icon: 'megaphone', tooltip: 'Running & scheduled campaigns' },
      { key: 'banners', label: 'Live Banners', displayValue: banners, changePct: 2.5, trend: 'up', color: 'rose', icon: 'image', tooltip: 'Live promotional banners' },
      { key: 'revenue', label: 'Campaign Revenue', displayValue: formatINR(revenue), changePct: 18.6, trend: 'up', color: 'green', icon: 'wallet', tooltip: 'Attributed promo revenue' },
    ],
  };
}

export async function getPromos(filters = {}) {
  await delay(220);
  let list = ensurePromos();

  if (filters.search) {
    const q = String(filters.search).toLowerCase();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.code?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.productName?.toLowerCase().includes(q)
    );
  }
  if (filters.status && filters.status !== 'all') list = list.filter((p) => p.status === filters.status);
  if (filters.kind && filters.kind !== 'all') list = list.filter((p) => p.kind === filters.kind);
  if (filters.typeId && filters.typeId !== 'all') list = list.filter((p) => p.typeId === filters.typeId);
  if (filters.category) {
    list = list.filter((p) => !p.categories || p.categories.includes(filters.category));
  }

  const sortBy = filters.sortBy || 'createdAt';
  const sortDir = filters.sortDir === 'asc' ? 1 : -1;
  list = [...list].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'number') return (av - bv) * sortDir;
    return String(av).localeCompare(String(bv)) * sortDir;
  });

  const page = Math.max(1, Number(filters.page) || 1);
  const pageSize = Math.max(5, Number(filters.pageSize) || 10);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;

  const counts = {
    all: ensurePromos().length,
    coupon: ensurePromos().filter((p) => p.kind === 'coupon').length,
    campaign: ensurePromos().filter((p) => p.kind === 'campaign').length,
    ad: ensurePromos().filter((p) => p.kind === 'ad').length,
    banner: ensurePromos().filter((p) => p.kind === 'banner').length,
    poster: ensurePromos().filter((p) => p.kind === 'poster').length,
    sponsored: ensurePromos().filter((p) => p.kind === 'sponsored').length,
    active: ensurePromos().filter((p) => p.status === 'active').length,
  };

  return { success: true, data: list.slice(start, start + pageSize), meta: { total, totalPages, page, pageSize, counts } };
}

export async function getCouponAnalytics(range = 'weekly') {
  await delay(250);
  const len = range === 'daily' ? 14 : range === 'monthly' ? 6 : range === 'yearly' ? 5 : 8;
  const labels =
    range === 'daily'
      ? Array.from({ length: len }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (len - 1 - i));
          return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        })
      : range === 'monthly'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(0, len)
        : range === 'yearly'
          ? ['2022', '2023', '2024', '2025', '2026'].slice(0, len)
          : Array.from({ length: len }, (_, i) => `W${i + 1}`);

  const series = labels.map((label, i) => ({
    label,
    redemptions: 20 + i * 6,
    revenue: 8000 + i * 2200,
    discount: 1200 + i * 180,
    orders: 15 + i * 4,
    ctr: 2.4 + (i % 4) * 0.3,
  }));

  return {
    success: true,
    data: {
      series,
      metrics: {
        redemptionRate: 37.2,
        revenue: 128400,
        avgDiscount: 86,
        orders: 486,
        newCustomers: 124,
        returning: 210,
        conversion: 8.5,
        roi: 3.4,
        ctr: 3.9,
      },
    },
  };
}

export function emptyCouponDraft(typeId = 'percentage') {
  const type = getPromoType(typeId);
  return {
    step: 1,
    kind: type.group === 'coupon' ? 'coupon' : type.group,
    typeId,
    name: '',
    code: '',
    description: '',
    notes: '',
    discountType: typeId === 'flat' || typeId === 'cashback' ? 'flat' : 'percentage',
    discountValue: typeId === 'percentage' ? 10 : 100,
    maxDiscount: 200,
    minOrder: 299,
    maxUses: 100,
    perCustomer: 1,
    applicability: 'store',
    categories: [],
    products: '',
    brands: '',
    startAt: new Date().toISOString().slice(0, 10),
    endAt: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    timeSlot: '09:00',
    timezone: 'Asia/Kolkata',
    autoActivate: true,
    autoExpire: true,
    oneTime: false,
    stackable: false,
    codAllowed: true,
    onlineOnly: false,
    excludeCategories: '',
    excludeProducts: '',
    cta: 'Shop Now',
    destinationUrl: '',
    budget: 5000,
    dailyBudget: 500,
    priority: 1,
    productName: '',
    placements: ['homepage'],
    headline: '',
    offerText: '',
    qrEnabled: false,
    mediaName: '',
    updatedAt: Date.now(),
  };
}

export function loadCouponDraft() {
  return { ...emptyCouponDraft(), ...load(DRAFT_KEY, {}) };
}

export function saveCouponDraft(draft) {
  save(DRAFT_KEY, { ...draft, updatedAt: Date.now() });
}

export function clearCouponDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export async function savePromo(payload = {}, { asDraft = false } = {}) {
  await delay(400);
  const type = getPromoType(payload.typeId || 'percentage');
  const kind = payload.kind || type.group || 'coupon';
  const list = ensurePromos();
  const id = payload.id || `${kind.slice(0, 3)}-${Date.now()}`;
  const item = {
    id,
    kind,
    typeId: type.id,
    name: payload.name || `${type.label} ${id.slice(-4)}`,
    code: (payload.code || `${type.id.toUpperCase().slice(0, 4)}${Math.floor(Math.random() * 900 + 100)}`).toUpperCase(),
    description: payload.description || '',
    notes: payload.notes || '',
    discountType: payload.discountType || 'percentage',
    discountValue: Number(payload.discountValue) || 0,
    maxDiscount: Number(payload.maxDiscount) || 0,
    minOrder: Number(payload.minOrder) || 0,
    maxUses: Number(payload.maxUses) || 0,
    used: payload.used || 0,
    perCustomer: Number(payload.perCustomer) || 1,
    status: asDraft ? PROMO_STATUSES.DRAFT : payload.status || (payload.autoActivate === false ? PROMO_STATUSES.SCHEDULED : PROMO_STATUSES.ACTIVE),
    startAt: payload.startAt || new Date().toISOString(),
    endAt: payload.endAt || daysFromNow(30),
    timeSlot: payload.timeSlot || '09:00',
    timezone: payload.timezone || 'Asia/Kolkata',
    autoActivate: payload.autoActivate !== false,
    autoExpire: payload.autoExpire !== false,
    applicability: payload.applicability || 'store',
    categories: payload.categories || [],
    products: payload.products || '',
    brands: payload.brands || '',
    stackable: !!payload.stackable,
    codAllowed: payload.codAllowed !== false,
    onlineOnly: !!payload.onlineOnly,
    excludeCategories: payload.excludeCategories || '',
    excludeProducts: payload.excludeProducts || '',
    cta: payload.cta || 'Shop Now',
    destinationUrl: payload.destinationUrl || '',
    budget: Number(payload.budget) || 0,
    dailyBudget: Number(payload.dailyBudget) || 0,
    spent: payload.spent || 0,
    priority: Number(payload.priority) || 1,
    productName: payload.productName || '',
    placements: payload.placements || [],
    headline: payload.headline || '',
    offerText: payload.offerText || '',
    qrEnabled: !!payload.qrEnabled,
    mediaName: payload.mediaName || '',
    revenue: payload.revenue || 0,
    createdAt: payload.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const idx = list.findIndex((p) => p.id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...item };
  else list.unshift(item);
  save(STORAGE_KEY, list);
  if (!asDraft) clearCouponDraft();
  return { success: true, data: item };
}

export async function updatePromoStatus(id, status) {
  await delay(180);
  const list = ensurePromos().map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p));
  save(STORAGE_KEY, list);
  return { success: true };
}

export async function duplicatePromo(id) {
  await delay(220);
  const list = ensurePromos();
  const src = list.find((p) => p.id === id);
  if (!src) return { success: false, error: 'Not found' };
  const copy = {
    ...src,
    id: `${src.kind.slice(0, 3)}-${Date.now()}`,
    name: `${src.name} (Copy)`,
    code: `${src.code}-COPY`,
    status: PROMO_STATUSES.DRAFT,
    used: 0,
    spent: 0,
    revenue: 0,
    createdAt: new Date().toISOString(),
  };
  list.unshift(copy);
  save(STORAGE_KEY, list);
  return { success: true, data: copy };
}

export async function deletePromo(id) {
  await delay(180);
  save(STORAGE_KEY, ensurePromos().filter((p) => p.id !== id));
  return { success: true };
}

export async function bulkPromoAction(ids, action) {
  await delay(300);
  const set = new Set(ids);
  let list = ensurePromos();
  if (action === 'delete') list = list.filter((p) => !set.has(p.id));
  else if (['activate', 'pause', 'stop', 'archive'].includes(action)) {
    const map = { activate: 'active', pause: 'paused', stop: 'completed', archive: 'archived' };
    list = list.map((p) => (set.has(p.id) ? { ...p, status: map[action] } : p));
  }
  save(STORAGE_KEY, list);
  return { success: true };
}

export async function getAiMarketingSuggestion(kind = 'coupon_name', context = {}) {
  await delay(350);
  const suggestions = {
    coupon_name: [`${context.category || 'Store'} Super Saver`, 'Weekend Wow Deal', 'Fresh Cart Bonus'],
    marketing_text: [
      'Save big on your next order — limited time only!',
      'Unlock exclusive discounts curated for your shoppers.',
      'Festival vibes + unbeatable prices. Shop now.',
    ],
    banner_headline: ['Mega Grocery Fest is Live', 'Flash Deals Ending Soon', 'New Arrivals. New Offers.'],
    offer_description: [
      'Get extra savings on bestsellers across categories.',
      'Free shipping above ₹499 with select payment modes.',
      'Buy more, save more — stackable weekend rewards.',
    ],
    discount: ['12%', '15%', '20%'],
    budget: ['₹5,000', '₹10,000', '₹25,000'],
    audience: ['New customers in metro cities', 'VIP repeat buyers', 'Grocery category browsers'],
    poster: ['Festive Offer — Scan & Save', 'Grand Opening Special', 'Mega Sale This Weekend'],
  };
  return { success: true, data: suggestions[kind] || suggestions.marketing_text };
}

export function _loadCouponsForExport() {
  return ensurePromos();
}

export { COUPON_TYPES, AD_TYPES, BANNER_TYPES, POSTER_TYPES, SPONSORED_TYPES, CAMPAIGN_TYPES };
