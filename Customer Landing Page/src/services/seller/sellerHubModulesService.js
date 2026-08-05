import { delay } from './_sellerServiceUtils';

const STORAGE_PREFIX = 'saathapp_seller_hub_';

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return fallback;
}

function save(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function seedInventory() {
  return [
    { id: 'inv-1', sku: 'MNG-001', name: 'Organic Mangoes', category: 'Grocery', storeStock: 45, warehouse: 200, reorderLevel: 20, status: 'in_stock', city: 'Pune', updatedAt: daysFromNow(-1) },
    { id: 'inv-2', sku: 'RCE-002', name: 'Basmati Rice 5kg', category: 'Grocery', storeStock: 28, warehouse: 150, reorderLevel: 30, status: 'in_stock', city: 'Pune', updatedAt: daysFromNow(-2) },
    { id: 'inv-3', sku: 'MLK-003', name: 'Fresh Milk 1L', category: 'Dairy', storeStock: 0, warehouse: 50, reorderLevel: 25, status: 'low_stock', city: 'Mumbai', updatedAt: daysFromNow(0) },
    { id: 'inv-4', sku: 'FLR-004', name: 'Whole Wheat Flour', category: 'Grocery', storeStock: 120, warehouse: 80, reorderLevel: 40, status: 'in_stock', city: 'Pune', updatedAt: daysFromNow(-3) },
    { id: 'inv-5', sku: 'TEA-005', name: 'Premium Tea 250g', category: 'Beverages', storeStock: 15, warehouse: 0, reorderLevel: 10, status: 'low_stock', city: 'Nashik', updatedAt: daysFromNow(-1) },
    { id: 'inv-6', sku: 'OIL-006', name: 'Mustard Oil 1L', category: 'Grocery', storeStock: 8, warehouse: 12, reorderLevel: 15, status: 'reorder', city: 'Pune', updatedAt: daysFromNow(0) },
  ];
}

function seedMarketing() {
  return [
    { id: 'mkt-1', name: 'Summer Sale', type: 'campaign', channel: 'app', status: 'active', reach: 5200, conversion: 4.2, budget: 15000, spent: 8200, startAt: daysFromNow(-10), endAt: daysFromNow(20), city: 'All' },
    { id: 'mkt-2', name: 'New Customer Offer', type: 'coupon', channel: 'push', status: 'active', reach: 2100, conversion: 6.1, budget: 5000, spent: 2100, startAt: daysFromNow(-5), endAt: daysFromNow(25), city: 'Pune' },
    { id: 'mkt-3', name: 'Festival Special', type: 'campaign', channel: 'banner', status: 'scheduled', reach: 0, conversion: 0, budget: 25000, spent: 0, startAt: daysFromNow(5), endAt: daysFromNow(20), city: 'All' },
    { id: 'mkt-4', name: 'Weekend Flash', type: 'offer', channel: 'sms', status: 'paused', reach: 1800, conversion: 3.1, budget: 8000, spent: 4500, startAt: daysFromNow(-15), endAt: daysFromNow(2), city: 'Mumbai' },
    { id: 'mkt-5', name: 'Referral Boost', type: 'referral', channel: 'whatsapp', status: 'draft', reach: 0, conversion: 0, budget: 3000, spent: 0, startAt: daysFromNow(1), endAt: daysFromNow(30), city: 'All' },
  ];
}

function seedWallet() {
  return [
    { id: 'wal-1', name: 'Settlement #SET-892', type: 'credit', amount: 8420, status: 'completed', method: 'settlement', date: daysFromNow(0), ref: 'SET-892' },
    { id: 'wal-2', name: 'Withdrawal #WDR-156', type: 'debit', amount: 15000, status: 'completed', method: 'bank', date: daysFromNow(-1), ref: 'WDR-156' },
    { id: 'wal-3', name: 'Order #SA-1040', type: 'credit', amount: 3420, status: 'completed', method: 'order', date: daysFromNow(-1), ref: 'SA-1040' },
    { id: 'wal-4', name: 'Platform Commission', type: 'debit', amount: 274, status: 'completed', method: 'commission', date: daysFromNow(-1), ref: 'COM-441' },
    { id: 'wal-5', name: 'Settlement #SET-891', type: 'credit', amount: 12100, status: 'completed', method: 'settlement', date: daysFromNow(-3), ref: 'SET-891' },
    { id: 'wal-6', name: 'Withdrawal #WDR-157', type: 'debit', amount: 5000, status: 'pending', method: 'bank', date: daysFromNow(0), ref: 'WDR-157' },
  ];
}

function seedPayments() {
  return [
    { id: 'pay-1', name: 'PAY-78234', orderId: '#SA-1042', method: 'UPI', amount: 1250, status: 'pending', city: 'Pune', date: daysFromNow(0), customer: 'Rahul Sharma' },
    { id: 'pay-2', name: 'PAY-78233', orderId: '#SA-1041', method: 'Card', amount: 890, status: 'success', city: 'Mumbai', date: daysFromNow(0), customer: 'Priya Patel' },
    { id: 'pay-3', name: 'PAY-78232', orderId: '#SA-1040', method: 'COD', amount: 3420, status: 'settled', city: 'Pune', date: daysFromNow(-1), customer: 'Amit Kumar' },
    { id: 'pay-4', name: 'PAY-78231', orderId: '#SA-1039', method: 'UPI', amount: 650, status: 'settled', city: 'Nashik', date: daysFromNow(-1), customer: 'Sneha Reddy' },
    { id: 'pay-5', name: 'PAY-78230', orderId: '#SA-1038', method: 'Wallet', amount: 2100, status: 'refunded', city: 'Pune', date: daysFromNow(-2), customer: 'Vikram Singh' },
    { id: 'pay-6', name: 'PAY-78229', orderId: '#SA-1037', method: 'UPI', amount: 980, status: 'failed', city: 'Mumbai', date: daysFromNow(-2), customer: 'Neha Joshi' },
  ];
}

function seedSupport() {
  return [
    { id: 'tkt-1', name: 'TKT-1042', subject: 'Payment settlement delay', priority: 'high', status: 'open', category: 'payments', updatedAt: daysFromNow(0), createdAt: daysFromNow(-1), description: 'Settlement pending for 3 days' },
    { id: 'tkt-2', name: 'TKT-1038', subject: 'Product listing issue', priority: 'medium', status: 'resolved', category: 'catalog', updatedAt: daysFromNow(-3), createdAt: daysFromNow(-5), description: 'Images not uploading' },
    { id: 'tkt-3', name: 'TKT-1035', subject: 'GST invoice format', priority: 'low', status: 'closed', category: 'invoices', updatedAt: daysFromNow(-7), createdAt: daysFromNow(-10), description: 'Need HSN code on invoice' },
    { id: 'tkt-4', name: 'TKT-1045', subject: 'Delivery partner not assigned', priority: 'high', status: 'in_progress', category: 'orders', updatedAt: daysFromNow(0), createdAt: daysFromNow(0), description: 'Order stuck at ready for pickup' },
  ];
}

function seedAnalyticsEvents() {
  return [
    { id: 'an-1', name: 'Revenue spike', metric: 'revenue', value: 8900, status: 'positive', category: 'sales', date: daysFromNow(0), city: 'Pune' },
    { id: 'an-2', name: 'Conversion dip', metric: 'conversion', value: 3.2, status: 'warning', category: 'funnel', date: daysFromNow(-1), city: 'Mumbai' },
    { id: 'an-3', name: 'New customers', metric: 'customers', value: 45, status: 'positive', category: 'growth', date: daysFromNow(-1), city: 'All' },
    { id: 'an-4', name: 'Return rate', metric: 'returns', value: 2.1, status: 'neutral', category: 'ops', date: daysFromNow(-2), city: 'All' },
    { id: 'an-5', name: 'Ad ROI', metric: 'ads', value: 3.8, status: 'positive', category: 'marketing', date: daysFromNow(-2), city: 'Pune' },
  ];
}

const SEEDERS = {
  inventory: seedInventory,
  marketing: seedMarketing,
  wallet: seedWallet,
  payments: seedPayments,
  support: seedSupport,
  analytics: seedAnalyticsEvents,
};

function ensure(moduleKey) {
  let list = load(moduleKey, null);
  if (!list) {
    list = (SEEDERS[moduleKey] || (() => []))();
    save(moduleKey, list);
  }
  return list;
}

function persist(moduleKey, list) {
  save(moduleKey, list);
}

function applyQuery(list, query = {}) {
  let out = [...list];
  const q = (query.search || '').trim().toLowerCase();
  if (q) {
    out = out.filter((row) =>
      Object.values(row)
        .filter((v) => typeof v === 'string' || typeof v === 'number')
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  if (query.status && query.status !== 'all') out = out.filter((r) => r.status === query.status);
  if (query.category && query.category !== 'all') out = out.filter((r) => r.category === query.category || r.type === query.category);
  if (query.city && query.city !== 'all') out = out.filter((r) => !r.city || r.city === query.city || r.city === 'All');
  if (query.method && query.method !== 'all') out = out.filter((r) => r.method === query.method);
  if (query.type && query.type !== 'all') out = out.filter((r) => r.type === query.type);
  if (query.priority && query.priority !== 'all') out = out.filter((r) => r.priority === query.priority);
  if (query.dateFrom) {
    const from = new Date(query.dateFrom).getTime();
    out = out.filter((r) => new Date(r.date || r.updatedAt || r.createdAt || 0).getTime() >= from);
  }
  if (query.dateTo) {
    const to = new Date(query.dateTo).getTime() + 86400000;
    out = out.filter((r) => new Date(r.date || r.updatedAt || r.createdAt || 0).getTime() <= to);
  }

  const sortBy = query.sortBy || 'updatedAt';
  const sortDir = query.sortDir === 'asc' ? 1 : -1;
  out.sort((a, b) => {
    const av = a[sortBy] ?? a.date ?? a.name ?? '';
    const bv = b[sortBy] ?? b.date ?? b.name ?? '';
    if (av < bv) return -1 * sortDir;
    if (av > bv) return 1 * sortDir;
    return 0;
  });
  return out;
}

export function _loadHubModuleForExport(moduleKey) {
  return ensure(moduleKey);
}

export async function getHubSummary(moduleKey) {
  await delay(120);
  const list = ensure(moduleKey);
  if (moduleKey === 'inventory') {
    return {
      data: [
        { key: 'total', label: 'Total SKUs', value: list.length, displayValue: String(list.length), color: 'sky', changePct: 4, trend: 'up', tooltip: 'All tracked SKUs' },
        { key: 'low', label: 'Low Stock', value: list.filter((r) => r.status === 'low_stock').length, displayValue: String(list.filter((r) => r.status === 'low_stock').length), color: 'amber', changePct: 2, trend: 'up', tooltip: 'Below comfort level' },
        { key: 'reorder', label: 'Reorder Alerts', value: list.filter((r) => r.status === 'reorder' || r.storeStock <= r.reorderLevel).length, displayValue: String(list.filter((r) => r.status === 'reorder' || r.storeStock <= r.reorderLevel).length), color: 'rose', changePct: 1, trend: 'down', tooltip: 'Needs replenishment' },
        { key: 'warehouse', label: 'Warehouse Units', value: list.reduce((s, r) => s + (r.warehouse || 0), 0), displayValue: String(list.reduce((s, r) => s + (r.warehouse || 0), 0)), color: 'emerald', changePct: 6, trend: 'up', tooltip: 'Total warehouse stock' },
      ],
    };
  }
  if (moduleKey === 'marketing') {
    return {
      data: [
        { key: 'active', label: 'Active Campaigns', value: list.filter((r) => r.status === 'active').length, displayValue: String(list.filter((r) => r.status === 'active').length), color: 'emerald', changePct: 8, trend: 'up', tooltip: 'Running now' },
        { key: 'reach', label: 'Total Reach', value: list.reduce((s, r) => s + (r.reach || 0), 0), displayValue: `${(list.reduce((s, r) => s + (r.reach || 0), 0) / 1000).toFixed(1)}K`, color: 'sky', changePct: 12, trend: 'up', tooltip: 'Audience reached' },
        { key: 'conversion', label: 'Avg Conversion', value: 4.2, displayValue: '4.2%', color: 'violet', changePct: 0.4, trend: 'up', tooltip: 'Campaign conversion' },
        { key: 'spend', label: 'Spend MTD', value: list.reduce((s, r) => s + (r.spent || 0), 0), displayValue: `₹${list.reduce((s, r) => s + (r.spent || 0), 0).toLocaleString('en-IN')}`, color: 'amber', changePct: 5, trend: 'up', tooltip: 'Marketing spend' },
      ],
    };
  }
  if (moduleKey === 'wallet') {
    const credits = list.filter((r) => r.type === 'credit').reduce((s, r) => s + r.amount, 0);
    const debits = list.filter((r) => r.type === 'debit').reduce((s, r) => s + r.amount, 0);
    const pending = list.filter((r) => r.status === 'pending').reduce((s, r) => s + r.amount, 0);
    return {
      data: [
        { key: 'balance', label: 'Available Balance', value: credits - debits + pending, displayValue: `₹${(credits - debits).toLocaleString('en-IN')}`, color: 'emerald', changePct: 9, trend: 'up', tooltip: 'Withdrawable balance' },
        { key: 'pending', label: 'Pending Settlement', value: pending, displayValue: `₹${pending.toLocaleString('en-IN')}`, color: 'amber', changePct: 3, trend: 'up', tooltip: 'Awaiting settlement' },
        { key: 'credits', label: 'Credits MTD', value: credits, displayValue: `₹${credits.toLocaleString('en-IN')}`, color: 'sky', changePct: 11, trend: 'up', tooltip: 'Incoming credits' },
        { key: 'withdrawals', label: 'Withdrawals', value: debits, displayValue: `₹${debits.toLocaleString('en-IN')}`, color: 'violet', changePct: 2, trend: 'down', tooltip: 'Total withdrawals' },
      ],
    };
  }
  if (moduleKey === 'payments') {
    return {
      data: [
        { key: 'received', label: 'Total Received', value: list.filter((r) => ['success', 'settled'].includes(r.status)).reduce((s, r) => s + r.amount, 0), displayValue: `₹${list.filter((r) => ['success', 'settled'].includes(r.status)).reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, color: 'emerald', changePct: 7, trend: 'up', tooltip: 'Successful payments' },
        { key: 'pending', label: 'Pending', value: list.filter((r) => r.status === 'pending').length, displayValue: String(list.filter((r) => r.status === 'pending').length), color: 'amber', changePct: 1, trend: 'down', tooltip: 'Awaiting confirmation' },
        { key: 'refunds', label: 'Refunds', value: list.filter((r) => r.status === 'refunded').reduce((s, r) => s + r.amount, 0), displayValue: `₹${list.filter((r) => r.status === 'refunded').reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, color: 'rose', changePct: 2, trend: 'up', tooltip: 'Refunded amount' },
        { key: 'failed', label: 'Failed', value: list.filter((r) => r.status === 'failed').length, displayValue: String(list.filter((r) => r.status === 'failed').length), color: 'violet', changePct: 1, trend: 'down', tooltip: 'Failed payments' },
      ],
    };
  }
  if (moduleKey === 'support') {
    return {
      data: [
        { key: 'open', label: 'Open Tickets', value: list.filter((r) => r.status === 'open' || r.status === 'in_progress').length, displayValue: String(list.filter((r) => r.status === 'open' || r.status === 'in_progress').length), color: 'amber', changePct: 2, trend: 'up', tooltip: 'Needs attention' },
        { key: 'resolved', label: 'Resolved', value: list.filter((r) => r.status === 'resolved').length, displayValue: String(list.filter((r) => r.status === 'resolved').length), color: 'emerald', changePct: 5, trend: 'up', tooltip: 'Resolved tickets' },
        { key: 'high', label: 'High Priority', value: list.filter((r) => r.priority === 'high').length, displayValue: String(list.filter((r) => r.priority === 'high').length), color: 'rose', changePct: 1, trend: 'down', tooltip: 'Urgent tickets' },
        { key: 'total', label: 'Total Tickets', value: list.length, displayValue: String(list.length), color: 'sky', changePct: 3, trend: 'up', tooltip: 'All tickets' },
      ],
    };
  }
  // analytics
  return {
    data: [
      { key: 'revenue', label: 'Revenue (MTD)', value: 120000, displayValue: '₹1.2L', color: 'emerald', changePct: 14, trend: 'up', tooltip: 'Month to date revenue' },
      { key: 'orders', label: 'Orders (MTD)', value: 186, displayValue: '186', color: 'sky', changePct: 9, trend: 'up', tooltip: 'Orders this month' },
      { key: 'conversion', label: 'Conversion Rate', value: 3.8, displayValue: '3.8%', color: 'violet', changePct: 0.3, trend: 'up', tooltip: 'Visit to order' },
      { key: 'rating', label: 'Avg. Rating', value: 4.6, displayValue: '4.6★', color: 'amber', changePct: 0.1, trend: 'up', tooltip: 'Customer rating' },
    ],
  };
}

export async function getHubRecords(moduleKey, query = {}) {
  await delay(180);
  const filtered = applyQuery(ensure(moduleKey), query);
  const page = Math.max(1, Number(query.page) || 1);
  const pageSize = Math.max(1, Number(query.pageSize) || 10);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return { data: filtered.slice(start, start + pageSize), meta: { total, totalPages, page, pageSize } };
}

export async function createHubRecord(moduleKey, payload) {
  await delay(220);
  const list = ensure(moduleKey);
  const now = new Date().toISOString();
  const row = {
    id: `${moduleKey.slice(0, 3)}-${Date.now()}`,
    status: payload.status || 'draft',
    updatedAt: now,
    createdAt: now,
    date: now,
    ...payload,
  };
  list.unshift(row);
  persist(moduleKey, list);
  return { data: row };
}

export async function updateHubRecord(moduleKey, id, patch) {
  await delay(180);
  const list = ensure(moduleKey);
  const idx = list.findIndex((r) => r.id === id);
  if (idx < 0) throw new Error('Record not found');
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  persist(moduleKey, list);
  return { data: list[idx] };
}

export async function deleteHubRecord(moduleKey, id) {
  await delay(140);
  const list = ensure(moduleKey);
  persist(
    moduleKey,
    list.filter((r) => r.id !== id)
  );
  return { ok: true };
}

export async function bulkHubAction(moduleKey, ids, action) {
  await delay(220);
  let list = ensure(moduleKey);
  if (action === 'delete') {
    const set = new Set(ids);
    list = list.filter((r) => !set.has(r.id));
  } else if (action === 'activate') {
    list = list.map((r) => (ids.includes(r.id) ? { ...r, status: 'active', updatedAt: new Date().toISOString() } : r));
  } else if (action === 'pause') {
    list = list.map((r) => (ids.includes(r.id) ? { ...r, status: 'paused', updatedAt: new Date().toISOString() } : r));
  } else if (action === 'close') {
    list = list.map((r) => (ids.includes(r.id) ? { ...r, status: 'closed', updatedAt: new Date().toISOString() } : r));
  }
  persist(moduleKey, list);
  return { ok: true, count: ids.length };
}

export async function getAnalyticsChart() {
  await delay(100);
  return {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [4200, 5100, 4800, 6200, 7500, 8900, 6800],
      orders: [12, 15, 14, 18, 22, 28, 20],
    },
  };
}

const SETTINGS_KEY = 'settings';

export function getStoreSettings() {
  return (
    load(SETTINGS_KEY, null) || {
      storeName: 'Fresh Grocery Mart',
      businessEmail: 'store@example.com',
      phone: '+91 98765 43210',
      description: 'Your neighborhood grocery store with fresh produce.',
      operatingHours: '9:00 AM - 9:00 PM',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      gstin: '27ABCDE1234F1Z5',
      deliveryRadius: '5',
      codEnabled: true,
      notificationsEmail: true,
      notificationsWhatsapp: true,
      notificationsPush: true,
      autoAcceptOrders: false,
      lowStockAlert: true,
    }
  );
}

export async function saveStoreSettings(patch, { draft = false } = {}) {
  await delay(200);
  const next = { ...getStoreSettings(), ...patch, updatedAt: new Date().toISOString(), draft };
  save(SETTINGS_KEY, next);
  return { data: next };
}
