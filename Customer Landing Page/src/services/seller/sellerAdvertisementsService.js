import { delay } from './_sellerServiceUtils';
import {
  AD_TYPES,
  AD_STATUSES,
  formatINR,
  formatCompact,
  getAdType,
  calcCtr,
  calcRoas,
} from '../../config/seller/adConstants';

const STORAGE_KEY = 'saathapp_seller_ads_v1';
const DRAFT_KEY = 'saathapp_seller_ad_wizard_draft';
const CREATIVES_KEY = 'saathapp_seller_ad_creatives_v1';

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

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Alphonso Mangoes 1kg', sku: 'MNG-001', price: 299, discount: 20, stock: 120, rating: 4.6, category: 'Grocery', image: null },
  { id: 'p2', name: 'Basmati Rice 5kg', sku: 'RIC-005', price: 649, discount: 10, stock: 80, rating: 4.5, category: 'Grocery', image: null },
  { id: 'p3', name: 'Cold Pressed Oil 1L', sku: 'OIL-001', price: 420, discount: 15, stock: 45, rating: 4.3, category: 'FMCG', image: null },
  { id: 'p4', name: 'Premium Tea 500g', sku: 'TEA-500', price: 280, discount: 5, stock: 200, rating: 4.4, category: 'Grocery', image: null },
  { id: 'p5', name: 'Wireless Earbuds', sku: 'ELC-EB1', price: 1499, discount: 25, stock: 30, rating: 4.2, category: 'Electronics', image: null },
];

function seedAds() {
  return [
    {
      id: 'ad-1001',
      name: 'Store Banner — Homepage',
      typeId: 'banner',
      placement: 'homepage_banner',
      status: AD_STATUSES.RUNNING,
      objective: 'awareness',
      dailyBudget: 2000,
      totalBudget: 40000,
      spent: 852,
      impressions: 12400,
      clicks: 486,
      conversions: 38,
      orders: 32,
      revenue: 24560,
      headline: 'Fresh Grocery Mart',
      description: 'Featured store placement on homepage',
      cta: 'Shop Now',
      destinationUrl: '/store',
      startAt: daysFromNow(-7),
      endAt: daysFromNow(23),
      priority: 1,
      score: 86,
      products: ['p1', 'p2'],
      audience: { cities: ['Mumbai', 'Pune'], customerTypes: ['new', 'repeat'] },
      createdAt: daysFromNow(-8),
      history: [
        { at: daysFromNow(-8), status: 'draft', note: 'Created' },
        { at: daysFromNow(-8), status: 'submitted', note: 'Submitted for review' },
        { at: daysFromNow(-7), status: 'approved', note: 'Approved by admin' },
        { at: daysFromNow(-7), status: 'running', note: 'Went live' },
      ],
    },
    {
      id: 'ad-1002',
      name: 'Organic Mango Spotlight',
      typeId: 'offer',
      placement: 'offer_zone',
      status: AD_STATUSES.RUNNING,
      objective: 'sales',
      dailyBudget: 1500,
      totalBudget: 21000,
      spent: 1240,
      impressions: 8200,
      clicks: 312,
      conversions: 54,
      orders: 48,
      revenue: 18640,
      headline: 'Fresh Mangoes',
      description: '20% OFF Alphonso mangoes',
      offerText: '20% OFF',
      coupon: 'MANGO20',
      cta: 'Buy Now',
      destinationUrl: '/product/mango',
      startAt: daysFromNow(-5),
      endAt: daysFromNow(10),
      priority: 2,
      score: 91,
      products: ['p1'],
      createdAt: daysFromNow(-6),
      history: [
        { at: daysFromNow(-6), status: 'draft', note: 'Created' },
        { at: daysFromNow(-5), status: 'running', note: 'Live' },
      ],
    },
    {
      id: 'ad-1003',
      name: 'Basmati Sponsored Search',
      typeId: 'sponsored',
      placement: 'search',
      status: AD_STATUSES.RUNNING,
      objective: 'sales',
      dailyBudget: 800,
      totalBudget: 16000,
      spent: 640,
      impressions: 5400,
      clicks: 198,
      conversions: 22,
      orders: 18,
      revenue: 11200,
      headline: 'Basmati Rice 5kg',
      description: 'Sponsored in search results',
      cta: 'View Product',
      destinationUrl: '/product/rice',
      startAt: daysFromNow(-4),
      endAt: daysFromNow(26),
      priority: 3,
      score: 78,
      products: ['p2'],
      createdAt: daysFromNow(-4),
      history: [{ at: daysFromNow(-4), status: 'running', note: 'Live' }],
    },
    {
      id: 'ad-1004',
      name: 'Category Grocery Banner',
      typeId: 'banner',
      placement: 'category',
      status: AD_STATUSES.PAUSED,
      objective: 'views',
      dailyBudget: 1000,
      totalBudget: 20000,
      spent: 2100,
      impressions: 9100,
      clicks: 240,
      conversions: 12,
      orders: 9,
      revenue: 5400,
      headline: 'Grocery Festival',
      description: 'Grocery section featured banner',
      cta: 'Explore',
      destinationUrl: '/category/grocery',
      startAt: daysFromNow(-12),
      endAt: daysFromNow(5),
      priority: 4,
      score: 62,
      products: [],
      createdAt: daysFromNow(-12),
      history: [
        { at: daysFromNow(-12), status: 'running', note: 'Live' },
        { at: daysFromNow(-1), status: 'paused', note: 'Paused by seller' },
      ],
    },
    {
      id: 'ad-1005',
      name: 'Festival Click Poster',
      typeId: 'poster',
      placement: 'festival',
      status: AD_STATUSES.SUBMITTED,
      objective: 'awareness',
      dailyBudget: 1200,
      totalBudget: 24000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      orders: 0,
      revenue: 0,
      headline: 'Mega Festival Sale',
      description: 'Clickable festival poster with QR',
      cta: 'Grab Offers',
      destinationUrl: '/offers/festival',
      qrEnabled: true,
      startAt: daysFromNow(2),
      endAt: daysFromNow(20),
      priority: 2,
      score: 0,
      products: ['p1', 'p3'],
      createdAt: daysFromNow(-1),
      history: [
        { at: daysFromNow(-1), status: 'draft', note: 'Created' },
        { at: daysFromNow(-1), status: 'submitted', note: 'Awaiting admin review' },
      ],
    },
    {
      id: 'ad-1006',
      name: 'Featured Tea on Homepage',
      typeId: 'featured',
      placement: 'recommended',
      status: AD_STATUSES.DRAFT,
      objective: 'views',
      dailyBudget: 500,
      totalBudget: 7000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      orders: 0,
      revenue: 0,
      headline: 'Premium Tea',
      description: 'Featured product draft',
      cta: 'Shop Tea',
      destinationUrl: '/product/tea',
      startAt: daysFromNow(1),
      endAt: daysFromNow(15),
      priority: 5,
      score: 0,
      products: ['p4'],
      createdAt: daysFromNow(0),
      history: [{ at: daysFromNow(0), status: 'draft', note: 'Draft saved' }],
    },
  ].map((ad) => ({
    ...ad,
    ctr: calcCtr(ad.impressions, ad.clicks),
    roas: calcRoas(ad.revenue, ad.spent),
    remainingBudget: Math.max(0, (ad.totalBudget || 0) - (ad.spent || 0)),
  }));
}

function ensureAds() {
  let list = load(STORAGE_KEY, null);
  if (!Array.isArray(list) || !list.length) {
    list = seedAds();
    save(STORAGE_KEY, list);
  }
  return list.map((ad) => ({
    ...ad,
    ctr: calcCtr(ad.impressions, ad.clicks),
    roas: calcRoas(ad.revenue, ad.spent),
    remainingBudget: Math.max(0, (ad.totalBudget || 0) - (ad.spent || 0)),
  }));
}

export async function getAdSummary() {
  await delay(180);
  const ads = ensureAds();
  const totalAds = ads.length;
  const active = ads.filter((a) => a.status === 'running').length;
  const paused = ads.filter((a) => a.status === 'paused').length;
  const pending = ads.filter((a) => ['submitted', 'review'].includes(a.status)).length;
  const scheduled = ads.filter((a) => a.status === 'approved' || (a.status === 'running' && new Date(a.startAt) > new Date())).length;
  const rejected = ads.filter((a) => a.status === 'rejected').length;
  const completed = ads.filter((a) => a.status === 'completed').length;
  const impressions = ads.reduce((s, a) => s + (a.impressions || 0), 0);
  const clicks = ads.reduce((s, a) => s + (a.clicks || 0), 0);
  const conversions = ads.reduce((s, a) => s + (a.conversions || 0), 0);
  const revenue = ads.reduce((s, a) => s + (a.revenue || 0), 0);
  const spent = ads.reduce((s, a) => s + (a.spent || 0), 0);
  const remaining = ads.reduce((s, a) => s + (a.remainingBudget || 0), 0);
  const ctr = calcCtr(impressions, clicks);
  const roas = Number(((revenue || 0) / Math.max(1, spent || 1)).toFixed(2));
  const todaySpend = ads.reduce((s, a) => {
    const start = new Date(a.startAt);
    const end = new Date(a.endAt);
    const now = new Date();
    if (a.status === 'running' && now >= start && now <= end) {
      return s + Math.round((a.dailyBudget || 0) * 0.5);
    }
    return s;
  }, 0);

  return {
    success: true,
    data: [
      { key: 'total_ads', label: 'Total Advertisements', displayValue: totalAds, changePct: 5.4, trend: 'up', color: 'emerald', icon: 'megaphone', tooltip: 'Total campaigns' },
      { key: 'running', label: 'Running', displayValue: active, changePct: 8.3, trend: 'up', color: 'green', icon: 'megaphone', tooltip: 'Live campaigns' },
      { key: 'pending', label: 'Pending Approval', displayValue: pending, changePct: -1.2, trend: 'down', color: 'sky', icon: 'clock', tooltip: 'Awaiting review' },
      { key: 'scheduled', label: 'Scheduled', displayValue: scheduled, changePct: 6.4, trend: 'up', color: 'violet', icon: 'clock', tooltip: 'Ready to start' },
      { key: 'paused', label: 'Paused', displayValue: paused, changePct: 1.7, trend: 'down', color: 'amber', icon: 'pause', tooltip: 'Paused campaigns' },
      { key: 'rejected', label: 'Rejected', displayValue: rejected, changePct: 0.4, trend: 'down', color: 'red', icon: 'x', tooltip: 'Campaigns rejected' },
      { key: 'completed', label: 'Completed', displayValue: completed, changePct: 10.2, trend: 'up', color: 'indigo', icon: 'check', tooltip: 'Finished campaigns' },
      { key: 'impressions', label: 'Impressions', displayValue: formatCompact(impressions || 12400), changePct: 18.6, trend: 'up', color: 'violet', icon: 'eye', tooltip: 'Total ad impressions' },
      { key: 'clicks', label: 'Clicks', displayValue: clicks || 486, changePct: 12.3, trend: 'up', color: 'blue', icon: 'cursor', tooltip: 'Total clicks' },
      { key: 'ctr', label: 'CTR', displayValue: `${ctr || 3.9}%`, changePct: 8.5, trend: 'up', color: 'orange', icon: 'target', tooltip: 'Click-through rate' },
      { key: 'conversions', label: 'Conversions', displayValue: conversions || 38, changePct: 14.2, trend: 'up', color: 'teal', icon: 'cart', tooltip: 'Attributed conversions' },
      { key: 'revenue', label: 'Revenue Generated', displayValue: formatINR(revenue || 24560), changePct: 22.4, trend: 'up', color: 'green', icon: 'rupee', tooltip: 'Total ad revenue' },
      { key: 'roas', label: 'ROAS', displayValue: `${roas || 0}x`, changePct: 9.1, trend: 'up', color: 'sky', icon: 'target', tooltip: 'Return on ad spend' },
      { key: 'spent', label: 'Total Spend', displayValue: formatINR(spent || 8450), changePct: 11.0, trend: 'up', color: 'rose', icon: 'wallet', tooltip: 'Total budget spent' },
      { key: 'today_spend', label: "Today's Spend", displayValue: formatINR(todaySpend || 0), changePct: 2.8, trend: 'up', color: 'emerald', icon: 'wallet', tooltip: 'Spend so far today' },
      { key: 'remaining', label: 'Remaining Budget', displayValue: formatINR(remaining || 52000), changePct: 4.0, trend: 'up', color: 'indigo', icon: 'piggy', tooltip: 'Unspent budget' },
    ],
    totals: {
      spent: spent || 8450,
      impressions: impressions || 12400,
      clicks: clicks || 486,
      conversions: conversions || 38,
      revenue: revenue || 24560,
      roas,
      todaySpend,
      remaining,
    },
  };
}

export async function getAds(filters = {}) {
  await delay(220);
  let list = ensureAds();

  if (filters.search) {
    const q = String(filters.search).toLowerCase();
    list = list.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.id?.toLowerCase().includes(q) ||
        a.headline?.toLowerCase().includes(q)
    );
  }
  if (filters.status && filters.status !== 'all') {
    if (filters.status === 'active') list = list.filter((a) => a.status === 'running');
    else list = list.filter((a) => a.status === filters.status);
  }
  if (filters.typeId && filters.typeId !== 'all') list = list.filter((a) => a.typeId === filters.typeId);
  if (filters.placement && filters.placement !== 'all') list = list.filter((a) => a.placement === filters.placement);
  if (filters.objective && filters.objective !== 'all') list = list.filter((a) => a.objective === filters.objective);
  if (filters.budgetMin != null && filters.budgetMin !== '') {
    list = list.filter((a) => (a.dailyBudget || 0) >= Number(filters.budgetMin));
  }
  if (filters.budgetMax != null && filters.budgetMax !== '') {
    list = list.filter((a) => (a.dailyBudget || 0) <= Number(filters.budgetMax));
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
  const pageSize = Math.max(5, Number(filters.pageSize) || 5);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;

  return {
    success: true,
    data: list.slice(start, start + pageSize),
    meta: { total, totalPages, page, pageSize },
  };
}

export async function getTopPerformingAds(limit = 3) {
  await delay(120);
  const list = [...ensureAds()]
    .filter((a) => a.impressions > 0)
    .sort((a, b) => (b.ctr || 0) - (a.ctr || 0))
    .slice(0, limit);
  return { success: true, data: list };
}

export async function getAdAnalytics(range = 'weekly') {
  await delay(250);
  const len = range === 'daily' ? 14 : range === 'monthly' ? 6 : 8;
  const labels =
    range === 'daily'
      ? Array.from({ length: len }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (len - 1 - i));
          return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        })
      : range === 'monthly'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(0, len)
        : Array.from({ length: len }, (_, i) => `W${i + 1}`);

  const reachBase = labels.map((label, i) => 1200 + i * 95);
  return {
    success: true,
    data: {
      series: labels.map((label, i) => ({
        label,
        impressions: 1200 + i * 210,
        clicks: 40 + i * 12,
        conversions: 4 + (i % 6),
        revenue: 2400 + i * 720,
        spend: 420 + i * 90,
        ctr: Number(((40 + i * 12) / Math.max(1, 1200 + i * 210) * 100).toFixed(1)),
        roas: Number(((2400 + i * 720) / Math.max(1, 420 + i * 90)).toFixed(2)),
        cpc: Number(((420 + i * 90) / Math.max(1, 40 + i * 12)).toFixed(2)),
        cpm: Number(((420 + i * 90) / Math.max(1, (1200 + i * 210) / 1000)).toFixed(2)),
        reach: reachBase[i],
      })),
      bestProducts: [
        { name: 'Alphonso Mangoes', value: 18640 },
        { name: 'Basmati Rice 5kg', value: 11200 },
        { name: 'Cold Pressed Oil', value: 5400 },
      ],
      bestCities: [
        { name: 'Mumbai', value: 42 },
        { name: 'Pune', value: 28 },
        { name: 'Delhi', value: 18 },
      ],
      bestDevices: [
        { name: 'Mobile', value: 64 },
        { name: 'Desktop', value: 28 },
        { name: 'Tablet', value: 8 },
      ],
      topLocations: [
        { name: 'Mumbai', value: 42 },
        { name: 'Pune', value: 28 },
        { name: 'Delhi', value: 18 },
      ],
      topProducts: [
        { name: 'Alphonso Mangoes', value: 18640 },
        { name: 'Basmati Rice 5kg', value: 11200 },
        { name: 'Cold Pressed Oil', value: 5400 },
      ],
      summary: {
        impressions: 1200 * labels.length,
        reach: reachBase.reduce((s, n) => s + n, 0),
        uniqueUsers: 9200,
        clicks: 40 * labels.length,
        conversions: 4 * labels.length,
        revenue: 2400 * labels.length,
        roas: 5.2,
        cpc: 6.5,
        cpm: 80,
        cpa: 120,
        bounceRate: 32,
        timeOnPage: 78,
      },
    },
  };
}

export async function getAdReviewDetails(adId) {
  await delay(180);
  const ad = ensureAds().find((item) => item.id === adId);
  return { success: true, data: ad || null };
}

export async function getAdReviewChecklist(adId) {
  await delay(150);
  const ad = ensureAds().find((item) => item.id === adId);
  const list = [
    { label: 'Creative quality', status: ad ? 'pass' : 'warning' },
    { label: 'Copy compliance', status: ad ? 'pass' : 'warning' },
    { label: 'Landing page review', status: ad ? 'pass' : 'warning' },
    { label: 'Audience match', status: ad ? 'pass' : 'warning' },
    { label: 'Budget & spend', status: ad ? 'pending' : 'warning' },
    { label: 'Policy checks', status: ad ? 'pending' : 'warning' },
  ];
  return { success: true, data: { checklist: list } };
}

export async function getAdReviewTimeline(adId) {
  await delay(150);
  const ad = ensureAds().find((item) => item.id === adId);
  if (!ad) return { success: false, data: [] };
  const now = new Date();
  return {
    success: true,
    data: [
      { label: 'Review submitted', status: 'complete', at: ad.history?.[ad.history.length - 1]?.at || new Date().toISOString() },
      { label: 'Policy verification', status: 'pending' },
      { label: 'Budget authorization', status: 'pending' },
      { label: 'Final approval', status: 'pending' },
      { label: 'Campaign scheduling', status: ad.status === AD_STATUSES.APPROVED ? 'pending' : 'upcoming' },
      { label: 'Live launch', status: 'upcoming' },
    ],
  };
}

export async function getCampaignScheduler() {
  await delay(200);
  const ads = ensureAds();
  const schedule = ads
    .filter((ad) => ['submitted', 'approved', 'running', 'paused'].includes(ad.status))
    .map((ad) => ({
      id: ad.id,
      name: ad.name,
      timeline: ad.status === AD_STATUSES.RUNNING ? 'Running' : ad.status === AD_STATUSES.PAUSED ? 'Paused' : 'Upcoming',
      startAt: ad.startAt,
      endAt: ad.endAt,
      dailyBudget: ad.dailyBudget,
      remainingBudget: ad.remainingBudget,
      timezone: ad.timezone || 'Asia/Kolkata',
    }));
  return { success: true, data: schedule };
}

export async function getAdReports() {
  await delay(180);
  const ads = ensureAds();
  return {
    success: true,
    data: [
      {
        id: 'report-2026-01',
        name: 'Campaign performance summary',
        description: 'Weekly performance summary for all live and paused campaigns.',
        format: 'PDF',
        value: ads.reduce((sum, ad) => sum + (ad.revenue || 0), 0),
      },
      {
        id: 'report-2026-02',
        name: 'Budget allocation review',
        description: 'Breakdown of budget vs spend across campaigns.',
        format: 'XLSX',
        value: ads.reduce((sum, ad) => sum + (ad.totalBudget || 0), 0),
      },
      {
        id: 'report-2026-03',
        name: 'Approval & review audit',
        description: 'Detail of pending, approved, and rejected campaigns.',
        format: 'CSV',
        value: ads.filter((ad) => ad.status === 'submitted').length,
      },
    ],
  };
}

export async function getAdProducts(search = '') {
  await delay(100);
  const q = String(search).toLowerCase();
  const list = !q
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
  return { success: true, data: list };
}

export function emptyAdDraft(typeId = 'banner') {
  return {
    step: 1,
    typeId,
    name: '',
    objective: 'sales',
    campaignType: typeId,
    priority: 3,
    description: '',
    productMode: 'single',
    products: [],
    category: '',
    headline: '',
    subHeadline: '',
    shortDescription: '',
    description: '',
    campaignId: '',
    offerText: '',
    coupon: '',
    cta: 'Shop Now',
    destinationUrl: '',
    landingPage: 'product_page',
    businessSegments: ['b2c'],
    coverageLevel: 'district',
    coverageAreas: [],
    country: 'India',
    state: '',
    district: '',
    city: '',
    village: '',
    pincode: '',
    radius: 10,
    ageMin: 18,
    ageMax: 55,
    gender: 'all',
    languages: ['English', 'Hindi'],
    occupations: [],
    incomeBracket: '',
    interests: ['Grocery'],
    customerTypes: ['new', 'repeat'],
    placements: ['homepage_hero'],
    placement: 'homepage_hero',
    dailyBudget: 1000,
    weeklyBudget: 7000,
    monthlyBudget: 30000,
    totalBudget: 20000,
    gstPercent: 18,
    platformFeePercent: 10,
    couponDiscount: 0,
    taxPercent: 18,
    finalAmount: 0,
    bidStrategy: 'auto',
    paymentMethod: 'wallet',
    invoiceType: 'gst_invoice',
    startAt: new Date().toISOString().slice(0, 10),
    startTime: '09:00',
    endAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    endTime: '21:00',
    durationDays: 15,
    recurring: 'none',
    timezone: 'Asia/Kolkata',
    abVariant: false,
    updatedAt: Date.now(),
  };
}

export function loadAdDraft() {
  return { ...emptyAdDraft(), ...load(DRAFT_KEY, {}) };
}

export function saveAdDraft(draft) {
  save(DRAFT_KEY, { ...draft, updatedAt: Date.now() });
}

export function clearAdDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export async function saveAd(payload = {}, { asDraft = false, submit = false } = {}) {
  await delay(400);
  const type = getAdType(payload.typeId || 'banner');
  const list = ensureAds();
  const id = payload.id || `ad-${Date.now()}`;
  let status = payload.status || AD_STATUSES.DRAFT;
  if (asDraft) status = AD_STATUSES.DRAFT;
  else if (submit) status = AD_STATUSES.SUBMITTED;

  const item = {
    id,
    name: payload.name || `${type.label} Campaign`,
    campaignId: payload.campaignId || `CMP-${Date.now().toString().slice(-6)}`,
    typeId: type.id,
    campaignType: payload.campaignType || type.id,
    placement: payload.placement || payload.placements?.[0] || 'homepage_hero',
    placements: payload.placements || [payload.placement || 'homepage_hero'],
    landingPage: payload.landingPage || 'product_page',
    status,
    objective: payload.objective || 'promote_product',
    dailyBudget: Number(payload.dailyBudget) || 0,
    weeklyBudget: Number(payload.weeklyBudget) || 0,
    monthlyBudget: Number(payload.monthlyBudget) || 0,
    totalBudget: Number(payload.totalBudget) || 0,
    gstPercent: Number(payload.gstPercent) || 18,
    platformFeePercent: Number(payload.platformFeePercent) || 10,
    couponDiscount: Number(payload.couponDiscount) || 0,
    taxPercent: Number(payload.taxPercent) || 18,
    finalAmount: Number(payload.finalAmount) || 0,
    spent: payload.spent || 0,
    impressions: payload.impressions || 0,
    clicks: payload.clicks || 0,
    conversions: payload.conversions || 0,
    orders: payload.orders || 0,
    revenue: payload.revenue || 0,
    headline: payload.headline || '',
    subHeadline: payload.subHeadline || '',
    description: payload.description || payload.shortDescription || '',
    offerText: payload.offerText || '',
    coupon: payload.coupon || '',
    cta: payload.cta || 'Shop Now',
    destinationUrl: payload.destinationUrl || '',
    audience: {
      country: payload.country || 'India',
      state: payload.state || '',
      district: payload.district || '',
      city: payload.city || '',
      village: payload.village || '',
      pincode: payload.pincode || '',
      radius: Number(payload.radius) || 10,
      ageMin: Number(payload.ageMin) || 18,
      ageMax: Number(payload.ageMax) || 55,
      gender: payload.gender || 'all',
      languages: payload.languages || ['English', 'Hindi'],
      occupations: payload.occupations || [],
      incomeBracket: payload.incomeBracket || '',
      interests: payload.interests || [],
      customerTypes: payload.customerTypes || [],
      businessSegments: payload.businessSegments || ['b2c'],
    },
    coverage: {
      level: payload.coverageLevel || 'district',
      areas: payload.coverageAreas || [],
    },
    startAt: payload.startAt || new Date().toISOString(),
    endAt: payload.endAt || daysFromNow(14),
    startTime: payload.startTime || '09:00',
    endTime: payload.endTime || '21:00',
    durationDays: Number(payload.durationDays) || 15,
    recurring: payload.recurring || 'none',
    timezone: payload.timezone || 'Asia/Kolkata',
    invoiceType: payload.invoiceType || 'gst_invoice',
    qrEnabled: !!payload.qrEnabled,
    bidStrategy: payload.bidStrategy || 'auto',
    paymentMethod: payload.paymentMethod || 'wallet',
    mobile: payload.mobileBanner || '',
    poster: payload.posterFile || '',
    video: payload.videoFile || '',
    thumbnail: payload.thumbnail || '',
    createdAt: payload.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [
      ...(payload.history || []),
      {
        at: new Date().toISOString(),
        status,
        note: asDraft ? 'Draft saved' : submit ? 'Submitted for review' : 'Updated',
      },
    ],
  };

  item.ctr = calcCtr(item.impressions, item.clicks);
  item.roas = calcRoas(item.revenue, item.spent);
  item.remainingBudget = Math.max(0, item.totalBudget - item.spent);

  const idx = list.findIndex((a) => a.id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...item };
  else list.unshift(item);
  save(STORAGE_KEY, list);
  if (!asDraft) clearAdDraft();
  return { success: true, data: item };
}

export async function updateAdStatus(id, status, note = '') {
  await delay(180);
  const list = ensureAds().map((a) => {
    if (a.id !== id) return a;
    return {
      ...a,
      status,
      updatedAt: new Date().toISOString(),
      history: [...(a.history || []), { at: new Date().toISOString(), status, note: note || `Status → ${status}` }],
    };
  });
  save(STORAGE_KEY, list);
  return { success: true };
}

export async function duplicateAd(id) {
  await delay(220);
  const list = ensureAds();
  const src = list.find((a) => a.id === id);
  if (!src) return { success: false, error: 'Not found' };
  const copy = {
    ...src,
    id: `ad-${Date.now()}`,
    name: `${src.name} (Copy)`,
    status: AD_STATUSES.DRAFT,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    orders: 0,
    revenue: 0,
    ctr: 0,
    roas: 0,
    score: 0,
    createdAt: new Date().toISOString(),
    history: [{ at: new Date().toISOString(), status: 'draft', note: 'Duplicated' }],
  };
  list.unshift(copy);
  save(STORAGE_KEY, list);
  return { success: true, data: copy };
}

export async function deleteAd(id) {
  await delay(160);
  save(STORAGE_KEY, ensureAds().filter((a) => a.id !== id));
  return { success: true };
}

export async function bulkAdAction(ids, action) {
  await delay(280);
  const set = new Set(ids);
  let list = ensureAds();
  if (action === 'delete') list = list.filter((a) => !set.has(a.id));
  else if (action === 'pause') list = list.map((a) => (set.has(a.id) ? { ...a, status: AD_STATUSES.PAUSED } : a));
  else if (action === 'resume') list = list.map((a) => (set.has(a.id) ? { ...a, status: AD_STATUSES.RUNNING } : a));
  save(STORAGE_KEY, list);
  return { success: true };
}

export async function getAiAdSuggestion(kind = 'headline') {
  await delay(320);
  const map = {
    headline: ['Fresh Mangoes This Week', 'Store-Wide Grocery Fest', 'Launch Special — Limited Time'],
    copy: ['Save more on everyday essentials. Shop now.', 'Premium quality at festival prices.', 'Free delivery on selected deals today.'],
    cta: ['Shop Now', 'Buy Now', 'Grab Offer', 'Explore Deals'],
    budget: ['₹1,000 / day', '₹2,000 / day', '₹5,000 / day'],
    audience: ['New customers in metro cities', 'VIP grocery buyers', 'Repeat shoppers 25–45'],
    keywords: ['fresh mangoes', 'grocery deals', 'festival sale'],
    placements: ['Homepage Banner', 'Search Results', 'Offer Zone'],
  };
  return { success: true, data: map[kind] || map.headline };
}

export async function getCreatives() {
  await delay(100);
  return {
    success: true,
    data: load(CREATIVES_KEY, [
      { id: 'cr-1', name: 'Homepage Hero Banner', kind: 'banner', usedIn: 2 },
      { id: 'cr-2', name: 'Mango Offer Poster', kind: 'poster', usedIn: 1 },
      { id: 'cr-3', name: 'Festival Video Spot', kind: 'video', usedIn: 0 },
      { id: 'cr-4', name: 'Store Awareness Headline', kind: 'headline', usedIn: 3 },
    ]),
  };
}

export function estimateReach(dailyBudget = 1000) {
  const budget = Number(dailyBudget) || 1000;
  return {
    reach: Math.round(budget * 18),
    clicks: Math.round(budget * 0.35),
    cpc: Number((budget / Math.max(1, budget * 0.35)).toFixed(2)),
    conversions: Math.round(budget * 0.04),
  };
}

export function _loadAdsForExport() {
  return ensureAds();
}

export { SAMPLE_PRODUCTS, AD_TYPES };
