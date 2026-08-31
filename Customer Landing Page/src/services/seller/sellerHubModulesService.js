import { delay } from './_sellerServiceUtils';

const STORAGE_PREFIX = 'saathapp_seller_hub_v2_';

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
  return Array.from({ length: 3 }, (_, i) => ({
    id: crypto.randomUUID(),
    name: '\u00A0',
    sku: '\u00A0',
    category: '\u00A0',
    storeStock: 0,
    warehouse: 0,
    reorderLevel: 0,
    status: 'in_stock',
    updatedAt: new Date().toISOString()
  }));
}

function seedMarketing() {
  return Array.from({ length: 2 }, (_, i) => ({
    id: crypto.randomUUID(),
    name: '\u00A0',
    type: '\u00A0',
    status: 'active',
    reach: 0,
    spent: 0,
    conversion: 0,
    updatedAt: new Date().toISOString()
  }));
}

function seedWallet() {
  return Array.from({ length: 4 }, (_, i) => ({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    type: 'credit',
    amount: 0,
    status: 'settled',
    method: '\u00A0',
    ref: '\u00A0'
  }));
}

function seedPayments() {
  return Array.from({ length: 3 }, (_, i) => ({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    amount: 0,
    status: 'success',
    method: '\u00A0',
    orderId: '\u00A0'
  }));
}

function seedSupport() {
  return Array.from({ length: 2 }, (_, i) => ({
    id: crypto.randomUUID(),
    subject: '\u00A0',
    status: 'open',
    priority: 'low',
    category: '\u00A0',
    updatedAt: new Date().toISOString()
  }));
}

function seedAnalyticsEvents() {
  return [];
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
        { key: 'total', label: 'Total SKUs', value: list.length, displayValue: String(list.length), color: 'sky', changePct: 0, trend: 'up', tooltip: 'All tracked SKUs' },
        { key: 'low', label: 'Low Stock', value: list.filter((r) => r.status === 'low_stock').length, displayValue: String(list.filter((r) => r.status === 'low_stock').length), color: 'amber', changePct: 0, trend: 'up', tooltip: 'Below comfort level' },
        { key: 'reorder', label: 'Reorder Alerts', value: list.filter((r) => r.status === 'reorder' || r.storeStock <= r.reorderLevel).length, displayValue: String(list.filter((r) => r.status === 'reorder' || r.storeStock <= r.reorderLevel).length), color: 'rose', changePct: 0, trend: 'down', tooltip: 'Needs replenishment' },
        { key: 'warehouse', label: 'Warehouse Units', value: list.reduce((s, r) => s + (r.warehouse || 0), 0), displayValue: String(list.reduce((s, r) => s + (r.warehouse || 0), 0)), color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Total warehouse stock' },
      ],
    };
  }
  if (moduleKey === 'marketing') {
    return {
      data: [
        { key: 'active', label: 'Active Campaigns', value: list.filter((r) => r.status === 'active').length, displayValue: String(list.filter((r) => r.status === 'active').length), color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Running now' },
        { key: 'reach', label: 'Total Reach', value: list.reduce((s, r) => s + (r.reach || 0), 0), displayValue: '0', color: 'sky', changePct: 0, trend: 'up', tooltip: 'Audience reached' },
        { key: 'conversion', label: 'Avg Conversion', value: 0, displayValue: '0%', color: 'violet', changePct: 0, trend: 'up', tooltip: 'Campaign conversion' },
        { key: 'spend', label: 'Spend MTD', value: list.reduce((s, r) => s + (r.spent || 0), 0), displayValue: `₹0`, color: 'amber', changePct: 0, trend: 'up', tooltip: 'Marketing spend' },
      ],
    };
  }
  if (moduleKey === 'wallet') {
    const credits = list.filter((r) => r.type === 'credit').reduce((s, r) => s + r.amount, 0);
    const debits = list.filter((r) => r.type === 'debit').reduce((s, r) => s + r.amount, 0);
    const pending = list.filter((r) => r.status === 'pending').reduce((s, r) => s + r.amount, 0);
    return {
      data: [
        { key: 'balance', label: 'Available Balance', value: credits - debits + pending, displayValue: `₹${(credits - debits).toLocaleString('en-IN')}`, color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Withdrawable balance' },
        { key: 'pending', label: 'Pending Settlement', value: pending, displayValue: `₹${pending.toLocaleString('en-IN')}`, color: 'amber', changePct: 0, trend: 'up', tooltip: 'Awaiting settlement' },
        { key: 'credits', label: 'Credits MTD', value: credits, displayValue: `₹${credits.toLocaleString('en-IN')}`, color: 'sky', changePct: 0, trend: 'up', tooltip: 'Incoming credits' },
        { key: 'withdrawals', label: 'Withdrawals', value: debits, displayValue: `₹${debits.toLocaleString('en-IN')}`, color: 'violet', changePct: 0, trend: 'down', tooltip: 'Total withdrawals' },
      ],
    };
  }
  if (moduleKey === 'payments') {
    return {
      data: [
        { key: 'received', label: 'Total Received', value: list.filter((r) => ['success', 'settled'].includes(r.status)).reduce((s, r) => s + r.amount, 0), displayValue: `₹${list.filter((r) => ['success', 'settled'].includes(r.status)).reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Successful payments' },
        { key: 'pending', label: 'Pending', value: list.filter((r) => r.status === 'pending').length, displayValue: String(list.filter((r) => r.status === 'pending').length), color: 'amber', changePct: 0, trend: 'down', tooltip: 'Awaiting confirmation' },
        { key: 'refunds', label: 'Refunds', value: list.filter((r) => r.status === 'refunded').reduce((s, r) => s + r.amount, 0), displayValue: `₹${list.filter((r) => r.status === 'refunded').reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, color: 'rose', changePct: 0, trend: 'up', tooltip: 'Refunded amount' },
        { key: 'failed', label: 'Failed', value: list.filter((r) => r.status === 'failed').length, displayValue: String(list.filter((r) => r.status === 'failed').length), color: 'violet', changePct: 0, trend: 'down', tooltip: 'Failed payments' },
      ],
    };
  }
  if (moduleKey === 'support') {
    return {
      data: [
        { key: 'open', label: 'Open Tickets', value: list.filter((r) => r.status === 'open' || r.status === 'in_progress').length, displayValue: String(list.filter((r) => r.status === 'open' || r.status === 'in_progress').length), color: 'amber', changePct: 0, trend: 'up', tooltip: 'Needs attention' },
        { key: 'resolved', label: 'Resolved', value: list.filter((r) => r.status === 'resolved').length, displayValue: String(list.filter((r) => r.status === 'resolved').length), color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Resolved tickets' },
        { key: 'high', label: 'High Priority', value: list.filter((r) => r.priority === 'high').length, displayValue: String(list.filter((r) => r.priority === 'high').length), color: 'rose', changePct: 0, trend: 'down', tooltip: 'Urgent tickets' },
        { key: 'total', label: 'Total Tickets', value: list.length, displayValue: String(list.length), color: 'sky', changePct: 0, trend: 'up', tooltip: 'All tickets' },
      ],
    };
  }
  // analytics
  return {
    data: [
      { key: 'revenue', label: 'Revenue (MTD)', value: 0, displayValue: '₹0', color: 'emerald', changePct: 0, trend: 'up', tooltip: 'Month to date revenue' },
      { key: 'orders', label: 'Orders (MTD)', value: 0, displayValue: '0', color: 'sky', changePct: 0, trend: 'up', tooltip: 'Orders this month' },
      { key: 'conversion', label: 'Conversion Rate', value: 0, displayValue: '0%', color: 'violet', changePct: 0, trend: 'up', tooltip: 'Visit to order' },
      { key: 'rating', label: 'Avg. Rating', value: 0, displayValue: '0★', color: 'amber', changePct: 0, trend: 'up', tooltip: 'Customer rating' },
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
      revenue: [0, 0, 0, 0, 0, 0, 0],
      orders: [0, 0, 0, 0, 0, 0, 0],
    },
  };
}

const SETTINGS_KEY = 'settings';

export function getStoreSettings() {
  return (
    load(SETTINGS_KEY, null) || {
      storeName: '',
      businessEmail: '',
      phone: '',
      description: '',
      operatingHours: '',
      city: '',
      state: '',
      pincode: '',
      gstin: '',
      deliveryRadius: '',
      codEnabled: false,
      notificationsEmail: false,
      notificationsWhatsapp: false,
      notificationsPush: false,
      autoAcceptOrders: false,
      lowStockAlert: false,
    }
  );
}

export async function saveStoreSettings(patch, { draft = false } = {}) {
  await delay(200);
  const next = { ...getStoreSettings(), ...patch, updatedAt: new Date().toISOString(), draft };
  save(SETTINGS_KEY, next);
  return { data: next };
}
