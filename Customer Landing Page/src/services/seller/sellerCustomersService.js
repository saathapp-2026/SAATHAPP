import { delay } from './_sellerServiceUtils';
import {
  CUSTOMER_STATUS,
  CUSTOMER_TYPE,
  CITIES,
  STATES,
  formatINR,
  inferLifecycleStage,
} from '../../config/seller/customerConstants';

const STORAGE_KEY = 'saathapp_seller_customers_v2';
const RECENT_SEARCH_KEY = 'saathapp_customer_recent_searches';

const SEED_NAMES = [
  ['Rahul', 'Sharma'],
  ['Priya', 'Patel'],
  ['Amit', 'Kumar'],
  ['Sneha', 'Reddy'],
  ['Vikram', 'Singh'],
  ['Ananya', 'Iyer'],
  ['Rohit', 'Mehta'],
  ['Kavya', 'Nair'],
  ['Arjun', 'Gupta'],
  ['Neha', 'Joshi'],
  ['Sanjay', 'Verma'],
  ['Meera', 'Desai'],
  ['Karan', 'Malhotra'],
  ['Pooja', 'Shah'],
  ['Deepak', 'Rao'],
  ['Isha', 'Kapoor'],
  ['Nikhil', 'Chopra'],
  ['Riya', 'Bansal'],
  ['Aditya', 'Pillai'],
  ['Shruti', 'Jain'],
  ['Manish', 'Agarwal'],
  ['Tanvi', 'Saxena'],
  ['Harsh', 'Bhatt'],
  ['Divya', 'Menon'],
  ['Yash', 'Thakur'],
  ['Anjali', 'Pandey'],
  ['Varun', 'Choudhary'],
  ['Sonal', 'Kulkarni'],
  ['Gaurav', 'Sinha'],
  ['Nisha', 'Bose'],
  ['Rajesh', 'Yadav'],
  ['Pallavi', 'Ghosh'],
  ['Suresh', 'Naidu'],
  ['Lakshmi', 'Raman'],
  ['Mohit', 'Tiwari'],
  ['Ayesha', 'Khan'],
  ['Farhan', 'Ali'],
  ['Kirti', 'Mishra'],
  ['Abhishek', 'Dubey'],
  ['Swati', 'Trivedi'],
];

function daysAgo(n, hours = 10, mins = 30) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hours, mins, 0, 0);
  return d.toISOString();
}

function buildSeed() {
  return Array.from({ length: 3 }, (_, i) => ({
    id: `placeholder-cust-${i}`,
    name: '\u00A0',
    phone: '\u00A0',
    email: '\u00A0',
    city: '\u00A0',
    state: '\u00A0',
    type: 'new',
    status: 'active',
    totalSpent: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    registeredAt: new Date().toISOString()
  }));
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    // ignore
  }
  const seed = buildSeed();
  saveStore(seed);
  return seed;
}

function saveStore(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore quota
  }
}

let customers = loadStore();

function pct(curr, prev) {
  if (!prev) return curr ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function matchSearch(c, q) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [c.name, c.phone, c.email, c.id, c.city, c.state]
    .filter(Boolean)
    .some((v) => String(v).toLowerCase().includes(s));
}

function inDateRange(iso, range, custom) {
  if (!iso || !range || range === 'all') return true;
  const d = new Date(iso);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (range === 'today') return d >= startToday;
  if (range === 'yesterday') {
    const y = new Date(startToday);
    y.setDate(y.getDate() - 1);
    return d >= y && d < startToday;
  }
  if (range === 'last7') {
    const from = new Date(startToday);
    from.setDate(from.getDate() - 7);
    return d >= from;
  }
  if (range === 'last30') {
    const from = new Date(startToday);
    from.setDate(from.getDate() - 30);
    return d >= from;
  }
  if (range === 'this_month') {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  if (range === 'last_month') {
    const m = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const y = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    return d.getMonth() === m && d.getFullYear() === y;
  }
  if (range === 'custom' && custom?.from && custom?.to) {
    return d >= new Date(custom.from) && d <= new Date(`${custom.to}T23:59:59`);
  }
  return true;
}

function applyFilters(list, filters = {}) {
  return list.filter((c) => {
    if (c.status === CUSTOMER_STATUS.DELETED && filters.status !== 'deleted' && filters.quickTab !== 'deleted') {
      // hide deleted by default unless explicitly filtered
      if (!filters.includeDeleted) return false;
    }
    if (filters.search && !matchSearch(c, filters.search)) return false;
    if (filters.status && filters.status !== 'all' && c.status !== filters.status) return false;
    if (filters.type && filters.type !== 'all' && c.type !== filters.type) return false;
    if (filters.city && filters.city !== 'all' && c.city !== filters.city) return false;
    if (filters.state && filters.state !== 'all' && c.state !== filters.state) return false;
    if (filters.quickTab && filters.quickTab !== 'all') {
      const tab = filters.quickTab;
      if (tab === 'new' && c.type !== 'new') return false;
      if (tab === 'repeat' && c.type !== 'repeat') return false;
      if (tab === 'vip' && c.type !== 'vip') return false;
      if (tab === 'active' && c.status !== 'active') return false;
      if (tab === 'inactive' && c.status !== 'inactive') return false;
      if (tab === 'blocked' && c.status !== 'blocked') return false;
    }
    const dateField = filters.dateField === 'lastOrder' ? c.lastOrderAt : c.registeredAt;
    if (!inDateRange(dateField, filters.dateRange, filters.customRange)) return false;
    if (filters.minOrders != null && filters.minOrders !== '' && c.totalOrders < Number(filters.minOrders)) return false;
    if (filters.maxOrders != null && filters.maxOrders !== '' && c.totalOrders > Number(filters.maxOrders)) return false;
    if (filters.minSpent != null && filters.minSpent !== '' && c.totalSpent < Number(filters.minSpent)) return false;
    if (filters.maxSpent != null && filters.maxSpent !== '' && c.totalSpent > Number(filters.maxSpent)) return false;
    if (filters.minAov != null && filters.minAov !== '' && c.averageOrderValue < Number(filters.minAov)) return false;
    return true;
  });
}

function sortList(list, sortBy = 'lastOrderAt', sortDir = 'desc') {
  const dir = sortDir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

export async function getCustomerSummary() {
  await delay(220);
  customers = loadStore();
  const live = customers.filter((c) => c.status !== CUSTOMER_STATUS.DELETED);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const total = live.length;
  const repeat = live.filter((c) => c.type === CUSTOMER_TYPE.REPEAT).length;
  const vip = live.filter((c) => c.type === CUSTOMER_TYPE.VIP).length;
  const neu = live.filter((c) => new Date(c.registeredAt) >= monthStart).length;
  const blocked = live.filter((c) => c.status === CUSTOMER_STATUS.BLOCKED).length;
  const inactive = live.filter((c) => c.status === CUSTOMER_STATUS.INACTIVE).length;
  const revenue = live.reduce((s, c) => s + c.totalSpent, 0);
  const orders = live.reduce((s, c) => s + c.totalOrders, 0);
  const aov = orders ? Math.round(revenue / orders) : 0;
  const growth = pct(neu, Math.max(1, Math.round(neu * 0.86)));

  const cards = [
    { key: 'total', label: 'Total Customers', count: total, displayValue: total, changePct: 18.2, trend: 'up', color: 'violet', icon: 'users', tooltip: 'All customers in your database', filter: { quickTab: 'all' } },
    { key: 'repeat', label: 'Repeat Buyers', count: repeat, displayValue: repeat, changePct: 22.5, trend: 'up', color: 'blue', icon: 'repeat', tooltip: 'Customers with 2+ orders', filter: { quickTab: 'repeat' } },
    { key: 'new', label: 'New This Month', count: neu, displayValue: neu, changePct: 15.8, trend: 'up', color: 'green', icon: 'userPlus', tooltip: 'Registered this month', filter: { quickTab: 'new' } },
    { key: 'vip', label: 'VIP Customers', count: vip, displayValue: vip, changePct: 12.4, trend: 'up', color: 'amber', icon: 'star', tooltip: 'High-value VIP customers', filter: { quickTab: 'vip' } },
    { key: 'aov', label: 'Avg. Order Value', count: aov, displayValue: formatINR(aov), changePct: 8.7, trend: 'up', color: 'orange', icon: 'wallet', tooltip: 'Average spend per order', filter: {} },
    { key: 'revenue', label: 'Total Revenue', count: revenue, displayValue: formatINR(revenue), changePct: 20.4, trend: 'up', color: 'red', icon: 'rupee', tooltip: 'Lifetime customer revenue', filter: {} },
    { key: 'growth', label: 'Customer Growth', count: growth, displayValue: `${growth}%`, changePct: growth, trend: growth >= 0 ? 'up' : 'down', color: 'emerald', icon: 'growth', tooltip: 'Growth vs previous period', filter: {} },
    { key: 'blocked', label: 'Blocked', count: blocked, displayValue: blocked, changePct: 2.1, trend: 'down', color: 'slate', icon: 'ban', tooltip: 'Blocked customers', filter: { quickTab: 'blocked' } },
    { key: 'inactive', label: 'Inactive', count: inactive, displayValue: inactive, changePct: 4.5, trend: 'down', color: 'sky', icon: 'moon', tooltip: 'Inactive customers', filter: { quickTab: 'inactive' } },
  ];

  return { success: true, data: cards };
}

export async function getCustomers(filters = {}) {
  await delay(280);
  customers = loadStore();
  const filtered = sortList(applyFilters(customers, filters), filters.sortBy || 'lastOrderAt', filters.sortDir || 'desc');
  const page = Math.max(1, Number(filters.page) || 1);
  const pageSize = Math.max(5, Number(filters.pageSize) || 10);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  const live = customers.filter((c) => c.status !== CUSTOMER_STATUS.DELETED);
  const counts = {
    all: live.length,
    new: live.filter((c) => c.type === 'new').length,
    repeat: live.filter((c) => c.type === 'repeat').length,
    vip: live.filter((c) => c.type === 'vip').length,
    active: live.filter((c) => c.status === 'active').length,
    inactive: live.filter((c) => c.status === 'inactive').length,
    blocked: live.filter((c) => c.status === 'blocked').length,
  };

  return { success: true, data, meta: { total, totalPages, page, pageSize, counts } };
}

export async function getCustomerById(id) {
  await delay(180);
  customers = loadStore();
  const found = customers.find((c) => c.id === id);
  if (!found) return { success: false, error: 'Customer not found' };
  return { success: true, data: found };
}

export async function createCustomer(payload) {
  await delay(350);
  customers = loadStore();
  const nextNum = customers.reduce((m, c) => Math.max(m, Number(String(c.id).replace(/\D/g, '')) || 0), 1000) + 1;
  const customer = {
    id: `CUST-${nextNum}`,
    name: payload.name || `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
    firstName: payload.firstName || payload.name?.split(' ')[0] || '',
    lastName: payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
    phone: payload.phone || '',
    email: payload.email || '',
    city: payload.city || 'Mumbai',
    state: payload.state || 'Maharashtra',
    pincode: payload.pincode || '400001',
    address: payload.address || '',
    lat: 19.07,
    lng: 72.87,
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    registeredAt: new Date().toISOString(),
    lastOrderAt: null,
    type: CUSTOMER_TYPE.NEW,
    status: CUSTOMER_STATUS.ACTIVE,
    verified: false,
    loyaltyPoints: 0,
    referralCode: `REF-NEW${nextNum}`,
    referredBy: null,
    notes: payload.notes || '',
    wishlist: [],
    cart: [],
    documents: [],
    orders: [],
    payments: [],
    returns: [],
    tickets: [],
    timeline: [{ id: 'registered', at: new Date().toISOString(), label: 'Customer Registered' }],
    avatarColor: 'emerald',
    lifecycleStage: 'registered',
  };
  customers = [customer, ...customers];
  saveStore(customers);
  return { success: true, data: customer };
}

export async function updateCustomer(id, patch) {
  await delay(250);
  customers = loadStore();
  const idx = customers.findIndex((c) => c.id === id);
  if (idx < 0) return { success: false, error: 'Not found' };
  const next = { ...customers[idx], ...patch };
  next.lifecycleStage = inferLifecycleStage(next);
  customers[idx] = next;
  saveStore(customers);
  return { success: true, data: next };
}

export async function bulkUpdateCustomers(ids, action, extra = {}) {
  await delay(400);
  customers = loadStore();
  const set = new Set(ids);
  customers = customers.map((c) => {
    if (!set.has(c.id)) return c;
    let next = { ...c };
    if (action === 'vip') next = { ...next, type: CUSTOMER_TYPE.VIP };
    if (action === 'block') next = { ...next, status: CUSTOMER_STATUS.BLOCKED };
    if (action === 'unblock') next = { ...next, status: CUSTOMER_STATUS.ACTIVE };
    if (action === 'delete') next = { ...next, status: CUSTOMER_STATUS.DELETED };
    if (action === 'notes') next = { ...next, notes: extra.notes ?? next.notes };
    next.lifecycleStage = inferLifecycleStage(next);
    if (action === 'vip') {
      next.timeline = [...(next.timeline || []), { id: 'vip', at: new Date().toISOString(), label: 'Marked VIP (bulk)' }];
    }
    if (action === 'block') {
      next.timeline = [...(next.timeline || []), { id: 'blocked', at: new Date().toISOString(), label: 'Blocked (bulk)' }];
    }
    return next;
  });
  saveStore(customers);
  return { success: true, data: { updated: ids.length } };
}

export async function getCustomerAnalytics() {
  await delay(300);
  customers = loadStore();
  const live = customers.filter((c) => c.status !== CUSTOMER_STATUS.DELETED);
  const byType = [
    { name: 'Repeat', value: live.filter((c) => c.type === 'repeat').length, color: '#8b5cf6' },
    { name: 'New', value: live.filter((c) => c.type === 'new').length, color: '#0ea5e9' },
    { name: 'VIP', value: live.filter((c) => c.type === 'vip').length, color: '#f59e0b' },
    { name: 'Inactive', value: live.filter((c) => c.status === 'inactive').length, color: '#94a3b8' },
  ];
  const daily = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      newCustomers: 0,
      revenue: 0,
    };
  });
  const monthly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((label, i) => ({
    label,
    newCustomers: 0,
    revenue: 0,
  }));
  const topSpenders = [...live]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)
    .map((c) => ({ id: c.id, name: c.name, spent: c.totalSpent, orders: c.totalOrders, type: c.type }));
  const geo = CITIES.slice(0, 6).map((city, i) => ({
    city,
    count: live.filter((c) => c.city === city).length,
  }));
  const total = live.length || 1;
  const repeatRate = Math.round((live.filter((c) => c.type === 'repeat' || c.type === 'vip').length / total) * 1000) / 10;
  const revenue = live.reduce((s, c) => s + c.totalSpent, 0);
  const orders = live.reduce((s, c) => s + c.totalOrders, 0);
  const active = live.filter((c) => c.status === 'active').length;
  const churn = Math.round(((live.length - active) / total) * 1000) / 10;
  const clv = Math.round(revenue / total);

  return {
    success: true,
    data: {
      byType,
      daily,
      monthly,
      weekly: daily.filter((_, i) => i % 2 === 0),
      yearly: monthly,
      topSpenders,
      geo,
      metrics: {
        growth: 0,
        repeatRate,
        revenuePerCustomer: Math.round(revenue / total),
        ordersPerCustomer: Math.round((orders / total) * 10) / 10,
        aov: orders ? Math.round(revenue / orders) : 0,
        clv,
        retention: Math.round(100 - churn),
        churn,
      },
    },
  };
}

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY) || '[]');
  } catch {
    return [];
  }
}

export function pushRecentSearch(q) {
  const term = String(q || '').trim();
  if (!term) return getRecentSearches();
  const prev = getRecentSearches().filter((x) => x.toLowerCase() !== term.toLowerCase());
  const next = [term, ...prev].slice(0, 8);
  try {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export async function importCustomers(rows) {
  await delay(500);
  customers = loadStore();
  const errors = [];
  const imported = [];
  const duplicates = [];
  rows.forEach((row, i) => {
    const name = row.name || row.Name || '';
    const phone = String(row.phone || row.Phone || row.mobile || '').trim();
    const email = String(row.email || row.Email || '').trim();
    if (!name || !phone) {
      errors.push({ row: i + 1, message: 'Name and phone are required' });
      return;
    }
    const dup = customers.find((c) => c.phone.replace(/\s/g, '') === phone.replace(/\s/g, '') || (email && c.email === email));
    if (dup) {
      duplicates.push({ row: i + 1, id: dup.id, message: `Duplicate of ${dup.id}` });
      return;
    }
    const nextNum = customers.reduce((m, c) => Math.max(m, Number(String(c.id).replace(/\D/g, '')) || 0), 1000) + 1 + imported.length;
    const customer = {
      id: `CUST-${nextNum}`,
      name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      phone,
      email,
      city: row.city || row.City || 'Mumbai',
      state: row.state || row.State || 'Maharashtra',
      pincode: row.pincode || '400001',
      address: row.address || '',
      lat: 19.07,
      lng: 72.87,
      totalOrders: Number(row.orders || 0),
      totalSpent: Number(row.spent || 0),
      averageOrderValue: 0,
      registeredAt: new Date().toISOString(),
      lastOrderAt: null,
      type: CUSTOMER_TYPE.NEW,
      status: CUSTOMER_STATUS.ACTIVE,
      verified: true,
      loyaltyPoints: 0,
      referralCode: `REF-IMP${nextNum}`,
      referredBy: null,
      notes: '',
      wishlist: [],
      cart: [],
      documents: [],
      orders: [],
      payments: [],
      returns: [],
      tickets: [],
      timeline: [{ id: 'registered', at: new Date().toISOString(), label: 'Imported' }],
      avatarColor: 'sky',
      lifecycleStage: 'registered',
    };
    imported.push(customer);
  });
  customers = [...imported, ...customers];
  saveStore(customers);
  return {
    success: true,
    data: {
      imported: imported.length,
      duplicates: duplicates.length,
      errors,
      duplicateRows: duplicates,
      customers: imported,
    },
  };
}

export function getImportTemplateCsv() {
  return 'name,phone,email,city,state,pincode,address\nRahul Sharma,+91 98765 43210,rahul.sharma@email.com,Mumbai,Maharashtra,400001,"12, MG Road"\n';
}

export async function sendCustomerNotification({ ids, channel, template, message }) {
  await delay(400);
  return {
    success: true,
    data: {
      sent: ids.length,
      channel,
      template,
      message: message || `Template: ${template}`,
    },
  };
}

export { applyFilters, loadStore as _loadCustomersForExport };
