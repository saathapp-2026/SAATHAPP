import { delay } from './_sellerServiceUtils';
import {
  INVOICE_STATUS,
  PAYMENT_STATUS,
  SELLER_GSTIN,
  SELLER_STATE_CODE,
  calcInvoiceTotals,
  calcLine,
  formatINR,
} from '../../config/seller/invoiceConstants';
import { _loadCustomersForExport } from './sellerCustomersService';

const STORAGE_KEY = 'saathapp_seller_invoices_v2';
const DRAFT_KEY = 'saathapp_invoice_wizard_draft_v2';
const FY = 2026;

const SEED_CUSTOMERS = [];

const SAMPLE_PRODUCTS = [];

function daysAgo(n, h = 10, m = 30) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function makeItems(seed) {
  const count = 1 + (seed % 3);
  return Array.from({ length: count }, (_, i) => {
    const p = SAMPLE_PRODUCTS[(seed + i) % SAMPLE_PRODUCTS.length];
    const qty = 1 + ((seed + i) % 4);
    const discount = seed % 5 === 0 ? 20 : 0;
    const base = { ...p, qty, discount, productId: p.id };
    const line = calcLine(base);
    return { ...base, ...line, id: `line-${seed}-${i}` };
  });
}

function buildSeed() {
  return Array.from({ length: 3 }, (_, i) => ({
    id: crypto.randomUUID(),
    number: `INV-2026-00${i+1}`,
    orderId: '',
    customer: { name: '\u00A0', phone: '\u00A0' },
    items: [],
    placeOfSupply: SELLER_STATE_CODE,
    invoiceDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    status: INVOICE_STATUS.GENERATED,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentMode: 'upi',
    totals: { grandTotal: 0, taxTotal: 0 },
    gstType: 'B2C'
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
    // ignore
  }
}

let invoices = loadStore();

function nextInvoiceNumber() {
  const max = invoices.reduce((m, inv) => {
    const n = Number(String(inv.number).split('-').pop()) || 0;
    return Math.max(m, n);
  }, 0);
  return `INV-${FY}-${String(max + 1).padStart(3, '0')}`;
}

function matchSearch(inv, q) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [inv.number, inv.orderId, inv.customer?.name, inv.customer?.gstin, inv.customer?.phone, inv.customer?.email]
    .filter(Boolean)
    .some((v) => String(v).toLowerCase().includes(s));
}

function applyFilters(list, filters = {}) {
  return list.filter((inv) => {
    if (filters.search && !matchSearch(inv, filters.search)) return false;
    if (filters.status && filters.status !== 'all' && inv.status !== filters.status) return false;
    if (filters.quickTab && filters.quickTab !== 'all' && inv.status !== filters.quickTab) return false;
    if (filters.paymentStatus && filters.paymentStatus !== 'all' && inv.paymentStatus !== filters.paymentStatus) return false;
    if (filters.gstType && filters.gstType !== 'all' && inv.gstType !== filters.gstType) return false;
    if (filters.dateFrom) {
      if (new Date(inv.invoiceDate) < new Date(filters.dateFrom)) return false;
    }
    if (filters.dateTo) {
      if (new Date(inv.invoiceDate) > new Date(`${filters.dateTo}T23:59:59`)) return false;
    }
    return true;
  });
}

function sortList(list, sortBy = 'invoiceDate', sortDir = 'desc') {
  const dir = sortDir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = sortBy === 'customer' ? a.customer?.name : sortBy === 'amount' ? a.totals?.grandTotal : a[sortBy];
    const bv = sortBy === 'customer' ? b.customer?.name : sortBy === 'amount' ? b.totals?.grandTotal : b[sortBy];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

export async function getInvoiceSummary() {
  await delay(200);
  invoices = loadStore();
  const live = invoices.filter((i) => i.status !== INVOICE_STATUS.CANCELLED || true);
  const total = invoices.length;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonth = invoices.filter((i) => new Date(i.invoiceDate) >= monthStart).length;
  const paid = invoices.filter((i) => i.status === INVOICE_STATUS.PAID || i.status === INVOICE_STATUS.COMPLETED).length;
  const pending = invoices.filter((i) => i.status === INVOICE_STATUS.PENDING).length;
  const overdue = invoices.filter((i) => i.status === INVOICE_STATUS.OVERDUE).length;
  const cancelled = invoices.filter((i) => i.status === INVOICE_STATUS.CANCELLED).length;
  const draft = invoices.filter((i) => i.status === INVOICE_STATUS.DRAFT).length;
  const gstCollected = invoices
    .filter((i) => i.status === INVOICE_STATUS.PAID || i.status === INVOICE_STATUS.COMPLETED)
    .reduce((s, i) => s + (i.totals?.taxTotal || 0), 0);
  const revenue = invoices
    .filter((i) => i.status === INVOICE_STATUS.PAID || i.status === INVOICE_STATUS.COMPLETED)
    .reduce((s, i) => s + (i.totals?.grandTotal || 0), 0);

  const cards = [
    { key: 'total', label: 'Total Invoices', count: total, displayValue: total, changePct: 18.2, trend: 'up', color: 'violet', icon: 'file', tooltip: 'All invoices', filter: { quickTab: 'all' } },
    { key: 'month', label: 'This Month', count: thisMonth, displayValue: thisMonth, changePct: 15.8, trend: 'up', color: 'blue', icon: 'calendar', tooltip: 'Created this month', filter: {} },
    { key: 'gst', label: 'GST Collected', count: gstCollected, displayValue: formatINR(gstCollected), changePct: 20.4, trend: 'up', color: 'green', icon: 'receipt', tooltip: 'GST from paid invoices', filter: { quickTab: 'paid' } },
    { key: 'pending', label: 'Pending', count: pending, displayValue: pending, changePct: 5.6, trend: 'down', color: 'amber', icon: 'clock', tooltip: 'Awaiting payment', filter: { quickTab: 'pending' } },
    { key: 'paid', label: 'Paid Invoices', count: paid, displayValue: paid, changePct: 12.1, trend: 'up', color: 'emerald', icon: 'check', tooltip: 'Fully paid', filter: { quickTab: 'paid' } },
    { key: 'overdue', label: 'Overdue', count: overdue, displayValue: overdue, changePct: 3.2, trend: 'down', color: 'orange', icon: 'alert', tooltip: 'Past due date', filter: { quickTab: 'overdue' } },
    { key: 'cancelled', label: 'Cancelled', count: cancelled, displayValue: cancelled, changePct: 1.4, trend: 'down', color: 'red', icon: 'x', tooltip: 'Cancelled invoices', filter: { quickTab: 'cancelled' } },
    { key: 'draft', label: 'Draft', count: draft, displayValue: draft, changePct: 8.0, trend: 'up', color: 'slate', icon: 'draft', tooltip: 'Unpublished drafts', filter: { quickTab: 'draft' } },
    { key: 'revenue', label: 'Revenue', count: revenue, displayValue: formatINR(revenue), changePct: 22.5, trend: 'up', color: 'rose', icon: 'rupee', tooltip: 'Paid invoice revenue', filter: { quickTab: 'paid' } },
  ];
  void live;
  return { success: true, data: cards };
}

export async function getInvoices(filters = {}) {
  await delay(260);
  invoices = loadStore();
  const filtered = sortList(applyFilters(invoices, filters), filters.sortBy || 'invoiceDate', filters.sortDir || 'desc');
  const page = Math.max(1, Number(filters.page) || 1);
  const pageSize = Math.max(5, Number(filters.pageSize) || 10);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const counts = {
    all: invoices.length,
    paid: invoices.filter((i) => i.status === 'paid' || i.status === 'completed').length,
    pending: invoices.filter((i) => i.status === 'pending').length,
    overdue: invoices.filter((i) => i.status === 'overdue').length,
    cancelled: invoices.filter((i) => i.status === 'cancelled').length,
    draft: invoices.filter((i) => i.status === 'draft').length,
  };
  return {
    success: true,
    data: filtered.slice(start, start + pageSize),
    meta: { total, totalPages, page, pageSize, counts },
  };
}

export async function getInvoiceById(id) {
  await delay(150);
  invoices = loadStore();
  const found = invoices.find((i) => i.id === id || i.number === id);
  if (!found) return { success: false, error: 'Invoice not found' };
  return { success: true, data: found };
}

export async function getInvoiceCustomers() {
  await delay(120);
  try {
    const fromCrm = _loadCustomersForExport?.() || [];
    if (fromCrm.length) {
      return {
        success: true,
        data: fromCrm.slice(0, 40).map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.phone,
          email: c.email,
          gstin: c.documents?.length ? SELLER_GSTIN.replace('27', '27') : '',
          billingAddress: c.address || `${c.city}, ${c.state}`,
          shippingAddress: c.address || `${c.city}, ${c.state}`,
          stateCode: c.state === 'Delhi' ? '07' : c.state === 'Gujarat' ? '24' : SELLER_STATE_CODE,
          city: c.city,
        })),
      };
    }
  } catch {
    // fallback
  }
  return { success: true, data: SEED_CUSTOMERS };
}

export async function getInvoiceProducts(search = '') {
  await delay(100);
  const q = String(search || '').toLowerCase();
  const list = SAMPLE_PRODUCTS.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
  );
  return { success: true, data: list };
}

export async function getDeliveredOrdersForInvoice() {
  await delay(150);
  return { success: true, data: [] };
}

export function emptyWizardDraft() {
  return {
    step: 1,
    mode: 'manual', // existing_order | manual
    customer: null,
    order: null,
    number: nextInvoiceNumber(),
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    paymentTerms: 'Net 14',
    reference: '',
    poNumber: '',
    placeOfSupply: SELLER_STATE_CODE,
    branchId: 'br-main',
    items: [],
    cessPct: 0,
    paymentMode: 'upi',
    paymentStatus: PAYMENT_STATUS.PENDING,
    transactionId: '',
    paymentDate: '',
    settlementDate: '',
    paymentNotes: '',
    notes: '',
    updatedAt: Date.now(),
  };
}

export function loadWizardDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return { ...emptyWizardDraft(), ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return emptyWizardDraft();
}

export function saveWizardDraft(draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, updatedAt: Date.now() }));
  } catch {
    // ignore
  }
}

export function clearWizardDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export async function saveInvoice(payload, { publish = false } = {}) {
  await delay(400);
  invoices = loadStore();
  const items = (payload.items || []).map((it, idx) => {
    const line = calcLine(it);
    return { ...it, ...line, id: it.id || `line-${Date.now()}-${idx}` };
  });
  const totals = calcInvoiceTotals(items, payload.placeOfSupply || SELLER_STATE_CODE, payload.cessPct || 0);
  const existingIdx = invoices.findIndex((i) => i.id === payload.id);
  const status = publish
    ? payload.paymentStatus === PAYMENT_STATUS.PAID
      ? INVOICE_STATUS.PAID
      : INVOICE_STATUS.GENERATED
    : INVOICE_STATUS.DRAFT;
  const number = payload.number || nextInvoiceNumber();
  const record = {
    id: payload.id || `inv-${Date.now()}`,
    number,
    orderId: payload.order?.id || payload.orderId || null,
    customer: payload.customer,
    items,
    placeOfSupply: payload.placeOfSupply || SELLER_STATE_CODE,
    invoiceDate: payload.invoiceDate ? new Date(payload.invoiceDate).toISOString() : new Date().toISOString(),
    dueDate: payload.dueDate ? new Date(payload.dueDate).toISOString() : null,
    paymentTerms: payload.paymentTerms || 'Net 14',
    reference: payload.reference || '',
    poNumber: payload.poNumber || '',
    status,
    paymentStatus: payload.paymentStatus || PAYMENT_STATUS.PENDING,
    paymentMode: payload.paymentMode || 'upi',
    transactionId: payload.transactionId || '',
    paymentDate: payload.paymentDate || null,
    settlementDate: payload.settlementDate || null,
    paymentNotes: payload.paymentNotes || '',
    totals,
    gstType: payload.customer?.gstin ? 'B2B' : 'B2C',
    branchId: payload.branchId || 'br-main',
    revisionHistory: [
      ...(payload.revisionHistory || []),
      { at: new Date().toISOString(), action: publish ? 'generated' : 'draft_saved', by: 'seller' },
    ],
    notes: payload.notes || '',
    creditNotes: payload.creditNotes || [],
    debitNotes: payload.debitNotes || [],
    eWayBillReady: true,
    eInvoiceReady: true,
    createdAt: payload.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) invoices[existingIdx] = { ...invoices[existingIdx], ...record };
  else invoices = [record, ...invoices];
  saveStore(invoices);
  if (publish) clearWizardDraft();
  return { success: true, data: record };
}

export async function updateInvoiceStatus(id, status, extra = {}) {
  await delay(250);
  invoices = loadStore();
  const idx = invoices.findIndex((i) => i.id === id);
  if (idx < 0) return { success: false, error: 'Not found' };
  const next = {
    ...invoices[idx],
    status,
    ...extra,
    updatedAt: new Date().toISOString(),
    revisionHistory: [
      ...(invoices[idx].revisionHistory || []),
      { at: new Date().toISOString(), action: status, by: 'seller' },
    ],
  };
  if (status === INVOICE_STATUS.PAID) {
    next.paymentStatus = PAYMENT_STATUS.PAID;
    next.paymentDate = next.paymentDate || new Date().toISOString();
  }
  invoices[idx] = next;
  saveStore(invoices);
  return { success: true, data: next };
}

export async function deleteInvoice(id) {
  await delay(200);
  invoices = loadStore();
  const inv = invoices.find((i) => i.id === id);
  if (!inv) return { success: false, error: 'Not found' };
  if (inv.status !== INVOICE_STATUS.DRAFT) return { success: false, error: 'Only drafts can be deleted' };
  invoices = invoices.filter((i) => i.id !== id);
  saveStore(invoices);
  return { success: true };
}

export async function bulkInvoiceAction(ids, action) {
  await delay(400);
  invoices = loadStore();
  const set = new Set(ids);
  if (action === 'delete_drafts') {
    invoices = invoices.filter((i) => !(set.has(i.id) && i.status === INVOICE_STATUS.DRAFT));
  } else if (action === 'mark_paid') {
    invoices = invoices.map((i) =>
      set.has(i.id)
        ? {
            ...i,
            status: INVOICE_STATUS.PAID,
            paymentStatus: PAYMENT_STATUS.PAID,
            revisionHistory: [...(i.revisionHistory || []), { at: new Date().toISOString(), action: 'paid', by: 'seller' }],
          }
        : i
    );
  } else if (action === 'cancel') {
    invoices = invoices.map((i) =>
      set.has(i.id)
        ? {
            ...i,
            status: INVOICE_STATUS.CANCELLED,
            revisionHistory: [...(i.revisionHistory || []), { at: new Date().toISOString(), action: 'cancelled', by: 'seller' }],
          }
        : i
    );
  } else if (action === 'generate_from_orders') {
    // handled separately
  }
  saveStore(invoices);
  return { success: true, data: { updated: ids.length } };
}

export async function createDraftsFromDeliveredOrders(orderIds = []) {
  await delay(500);
  const { data: orders } = await getDeliveredOrdersForInvoice();
  const selected = orderIds.length ? orders.filter((o) => orderIds.includes(o.id)) : orders.slice(0, 3);
  const created = [];
  for (const order of selected) {
    const customer = SEED_CUSTOMERS.find((c) => c.id === order.customerId) || SEED_CUSTOMERS[0];
    const res = await saveInvoice(
      {
        customer,
        order,
        items: order.items,
        placeOfSupply: customer.stateCode,
        number: nextInvoiceNumber(),
        invoiceDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      },
      { publish: false }
    );
    if (res.success) created.push(res.data);
  }
  return { success: true, data: created };
}

export async function addCreditDebitNote(invoiceId, { type = 'credit', amount, reason }) {
  await delay(300);
  invoices = loadStore();
  const idx = invoices.findIndex((i) => i.id === invoiceId);
  if (idx < 0) return { success: false, error: 'Not found' };
  const note = {
    id: `${type.toUpperCase()}-${Date.now()}`,
    amount: Number(amount) || 0,
    reason: reason || '',
    at: new Date().toISOString(),
  };
  const inv = { ...invoices[idx] };
  if (type === 'credit') inv.creditNotes = [...(inv.creditNotes || []), note];
  else inv.debitNotes = [...(inv.debitNotes || []), note];
  inv.revisionHistory = [...(inv.revisionHistory || []), { at: note.at, action: `${type}_note`, by: 'seller' }];
  invoices[idx] = inv;
  saveStore(invoices);
  return { success: true, data: inv };
}

export async function getInvoiceAnalytics() {
  await delay(280);
  invoices = loadStore();
  const paid = invoices.filter((i) => i.status === 'paid' || i.status === 'completed');
  const revenue = paid.reduce((s, i) => s + (i.totals?.grandTotal || 0), 0);
  const gst = paid.reduce((s, i) => s + (i.totals?.taxTotal || 0), 0);
  const pendingAmt = invoices
    .filter((i) => i.status === 'pending' || i.status === 'overdue')
    .reduce((s, i) => s + (i.totals?.grandTotal || 0), 0);
  const daily = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      revenue: 0,
      gst: 0,
      count: 0,
    };
  });
  return {
    success: true,
    data: {
      metrics: {
        revenue,
        gstCollected: gst,
        paidCount: paid.length,
        pendingPayments: invoices.filter((i) => i.paymentStatus === 'pending').length,
        aiv: paid.length ? Math.round(revenue / paid.length) : 0,
        overdueAmount: invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + (i.totals?.grandTotal || 0), 0),
        collectionRate: invoices.length ? Math.round((paid.length / invoices.length) * 1000) / 10 : 0,
        pendingAmount: pendingAmt,
      },
      daily,
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((label, i) => ({
        label,
        revenue: 0,
        gst: 0,
      })),
    },
  };
}

export function buildInvoiceHtml(invoice) {
  const t = invoice.totals || calcInvoiceTotals(invoice.items || [], invoice.placeOfSupply);
  const rows = (invoice.items || [])
    .map(
      (it, i) => `<tr>
      <td>${i + 1}</td><td>${it.name}<br/><small>${it.sku || ''}</small></td>
      <td>${it.qty}</td><td>${formatINR(it.sellingPrice)}</td><td>${formatINR(it.discount || 0)}</td>
      <td>${it.gstPct || 0}%</td><td>${formatINR(it.taxable ?? calcLine(it).taxable)}</td>
      <td>${formatINR(it.amount ?? calcLine(it).amount)}</td>
    </tr>`
    )
    .join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${invoice.number}</title>
  <style>
    body{font-family:system-ui,sans-serif;padding:24px;color:#0f172a}
    h1{font-size:20px;margin:0} .muted{color:#64748b;font-size:12px}
    table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px}
    th,td{border:1px solid #e2e8f0;padding:8px;text-align:left}
    th{background:#f8fafc} .tot{margin-top:16px;text-align:right}
    .badge{display:inline-block;padding:2px 8px;border-radius:999px;background:#d1fae5;color:#047857;font-size:11px}
    .qr{width:72px;height:72px;border:1px dashed #94a3b8;display:flex;align-items:center;justify-content:center;font-size:10px;color:#64748b}
  </style></head><body>
  <div style="display:flex;justify-content:space-between;gap:16px">
    <div>
      <h1>SAATHAPP Tax Invoice</h1>
      <p class="muted">GSTIN: ${SELLER_GSTIN} · Super Store</p>
      <p class="muted">Invoice: <b>${invoice.number}</b> · ${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</p>
    </div>
    <div class="qr">QR / e-Invoice</div>
  </div>
  <p><span class="badge">${String(invoice.status || '').toUpperCase()}</span></p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;font-size:13px">
    <div><b>Bill To</b><br/>${invoice.customer?.name || ''}<br/>${invoice.customer?.billingAddress || ''}<br/>${invoice.customer?.gstin ? `GSTIN: ${invoice.customer.gstin}` : 'B2C'}</div>
    <div><b>Ship To</b><br/>${invoice.customer?.shippingAddress || invoice.customer?.billingAddress || ''}</div>
  </div>
  <table><thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Disc</th><th>GST%</th><th>Taxable</th><th>Amount</th></tr></thead>
  <tbody>${rows || '<tr><td colspan="8">No items</td></tr>'}</tbody></table>
  <div class="tot">
    <div>Subtotal: ${formatINR(t.subtotal)}</div>
    ${t.intra ? `<div>CGST: ${formatINR(t.cgst)} · SGST: ${formatINR(t.sgst)}</div>` : `<div>IGST: ${formatINR(t.igst)}</div>`}
    <div>Round Off: ${formatINR(t.roundOff)}</div>
    <div style="font-size:18px;font-weight:700;color:#059669">Grand Total: ${formatINR(t.grandTotal)}</div>
  </div>
  <p class="muted" style="margin-top:24px">Authorized Signatory · Digital Signature Ready · E-Way Bill / e-Invoice integration ready</p>
  <p class="muted">Terms: Goods once sold will be subject to seller return policy. Payment due as per terms.</p>
  </body></html>`;
}

export function downloadInvoicePdf(invoice) {
  const html = buildInvoiceHtml(invoice);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${invoice.number || 'invoice'}.html`;
  a.click();
  URL.revokeObjectURL(url);
  return { success: true };
}

export function printInvoiceDoc(invoice) {
  const html = buildInvoiceHtml(invoice);
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }
  return { success: true };
}

export function getImportTemplateCsv() {
  return 'number,customer,phone,gstin,amount,gst,status,date\nINV-2026-100,Rahul Sharma,+91 98765 43210,27AABCU9603R1ZM,1250,225,paid,2026-05-16\n';
}

export async function importInvoicesCsv(rows) {
  await delay(400);
  invoices = loadStore();
  let imported = 0;
  rows.forEach((row, i) => {
    if (!row.customer && !row.number) return;
    const items = [
      {
        id: `imp-${i}`,
        name: 'Imported Line Item',
        sku: 'IMP-001',
        qty: 1,
        mrp: Number(row.amount) || 0,
        sellingPrice: Number(row.amount) || 0,
        discount: 0,
        gstPct: 18,
        ...calcLine({ qty: 1, sellingPrice: Number(row.amount) || 0, discount: 0, gstPct: 18 }),
      },
    ];
    const totals = calcInvoiceTotals(items, SELLER_STATE_CODE);
    invoices.unshift({
      id: `inv-imp-${Date.now()}-${i}`,
      number: row.number || nextInvoiceNumber(),
      orderId: null,
      customer: {
        id: `CUST-IMP-${i}`,
        name: row.customer || 'Imported Customer',
        phone: row.phone || '',
        email: '',
        gstin: row.gstin || '',
        billingAddress: '',
        shippingAddress: '',
        stateCode: SELLER_STATE_CODE,
      },
      items,
      placeOfSupply: SELLER_STATE_CODE,
      invoiceDate: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
      dueDate: null,
      paymentTerms: 'Net 14',
      reference: '',
      poNumber: '',
      status: row.status || INVOICE_STATUS.DRAFT,
      paymentStatus: row.status === 'paid' ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.PENDING,
      paymentMode: 'upi',
      transactionId: '',
      paymentDate: null,
      settlementDate: null,
      paymentNotes: '',
      totals: { ...totals, taxTotal: Number(row.gst) || totals.taxTotal, grandTotal: Number(row.amount) || totals.grandTotal },
      gstType: row.gstin ? 'B2B' : 'B2C',
      branchId: 'br-main',
      revisionHistory: [{ at: new Date().toISOString(), action: 'imported', by: 'seller' }],
      notes: '',
      creditNotes: [],
      debitNotes: [],
      eWayBillReady: true,
      eInvoiceReady: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    imported += 1;
  });
  saveStore(invoices);
  return { success: true, data: { imported } };
}

export { loadStore as _loadInvoicesForExport, nextInvoiceNumber };
