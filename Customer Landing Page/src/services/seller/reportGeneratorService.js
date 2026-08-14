import { delay } from './_sellerServiceUtils';
import { EXPORT_FORMATS, formatINR } from '../../config/seller/customerConstants';
import { _loadCustomersForExport, applyFilters } from './sellerCustomersService';
import { _loadInvoicesForExport } from './sellerInvoicesService';
import { _loadReportsForExport } from './sellerReportsService';
import { _loadCouponsForExport } from './sellerCouponsService';
import { _loadAdsForExport } from '../advertisementsService';
import { _loadDocumentsForExport } from './sellerDocumentsService';
import { _loadHubModuleForExport } from './sellerHubModulesService';

const MODULE_META = {
  customers: {
    title: 'Customers Report',
    description: 'Customer relationship and revenue overview',
  },
  dashboard: { title: 'Dashboard Report', description: 'Seller hub overview' },
  orders: { title: 'Orders Report', description: 'Order fulfillment overview' },
  products: { title: 'Products Report', description: 'Catalog performance' },
  inventory: { title: 'Inventory Report', description: 'Stock and warehouse levels' },
  marketing: { title: 'Marketing Report', description: 'Campaign performance' },
  analytics: { title: 'Analytics Report', description: 'Business analytics' },
  wallet: { title: 'Wallet Report', description: 'Wallet transactions' },
  payments: { title: 'Payments Report', description: 'Payment settlements' },
  invoices: { title: 'Invoices Report', description: 'Invoice register' },
  reports: { title: 'Reports Export', description: 'Saved reports pack' },
  coupons: { title: 'Coupons Report', description: 'Coupon usage' },
  advertisements: { title: 'Advertisements Report', description: 'Ad performance' },
  documents: { title: 'Documents Report', description: 'Business documents and compliance' },
  onboarding: { title: 'Onboarding Report', description: 'Onboarding status' },
  membership: { title: 'Membership Report', description: 'Membership overview' },
  'welcome-kit': { title: 'Welcome Kit Report', description: 'Welcome kit status' },
  branding: { title: 'Branding Store Report', description: 'Brand assets' },
  settings: { title: 'Store Settings Report', description: 'Store configuration snapshot' },
};

function buildExecutiveSummary(customers) {
  const live = customers.filter((c) => c.status !== 'deleted');
  const revenue = live.reduce((s, c) => s + (c.totalSpent || 0), 0);
  const orders = live.reduce((s, c) => s + (c.totalOrders || 0), 0);
  return {
    totalCustomers: live.length,
    newCustomers: live.filter((c) => c.type === 'new').length,
    repeatBuyers: live.filter((c) => c.type === 'repeat').length,
    vipCustomers: live.filter((c) => c.type === 'vip').length,
    averageOrderValue: orders ? Math.round(revenue / orders) : 0,
    totalRevenue: revenue,
    customerGrowth: 18.2,
    activeCustomers: live.filter((c) => c.status === 'active').length,
    blockedCustomers: live.filter((c) => c.status === 'blocked').length,
  };
}

function toCsv(rows, headers) {
  const escape = (v) => {
    const s = String(v ?? '');
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(',')];
  rows.forEach((r) => lines.push(headers.map((h) => escape(r[h])).join(',')));
  return lines.join('\n');
}

function buildHtmlReport({ moduleKey, summary, customers, options, chartsText }) {
  const meta = MODULE_META[moduleKey] || { title: `${moduleKey} Report`, description: '' };
  const generatedAt = new Date().toLocaleString('en-IN');
  const detailRows = (customers || [])
    .map(
      (c) => `<tr>
      <td>${c.id}</td><td>${c.name}</td><td>${c.phone || ''}</td><td>${c.email || ''}</td>
      <td>${c.city || ''}</td><td>${c.state || ''}</td>
      <td>${c.registeredAt ? new Date(c.registeredAt).toLocaleDateString('en-IN') : ''}</td>
      <td>${c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleDateString('en-IN') : '—'}</td>
      <td>${c.totalOrders ?? 0}</td><td>${formatINR(c.totalSpent)}</td>
      <td>${formatINR(c.averageOrderValue)}</td><td>${c.type}</td><td>${c.status}</td>
    </tr>`
    )
    .join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${meta.title}</title>
  <style>
    body{font-family:system-ui,sans-serif;color:#0f172a;padding:24px;line-height:1.45}
    h1{font-size:22px;margin:0 0 4px} h2{font-size:16px;margin:24px 0 8px}
    .muted{color:#64748b;font-size:12px} .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .card{border:1px solid #e2e8f0;border-radius:12px;padding:12px} .card b{font-size:18px;display:block}
    table{width:100%;border-collapse:collapse;font-size:11px} th,td{border:1px solid #e2e8f0;padding:6px;text-align:left}
    th{background:#f8fafc} .charts{white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;font-size:12px}
  </style></head><body>
  <h1>SAATHAPP — ${meta.title}</h1>
  <p class="muted">${meta.description} · Generated ${generatedAt}</p>
  ${
    options.includeAnalytics !== false
      ? `<h2>Executive Summary</h2>
    <div class="grid">
      <div class="card"><span class="muted">Total Customers</span><b>${summary.totalCustomers}</b></div>
      <div class="card"><span class="muted">New Customers</span><b>${summary.newCustomers}</b></div>
      <div class="card"><span class="muted">Repeat Buyers</span><b>${summary.repeatBuyers}</b></div>
      <div class="card"><span class="muted">VIP Customers</span><b>${summary.vipCustomers}</b></div>
      <div class="card"><span class="muted">Avg. Order Value</span><b>${formatINR(summary.averageOrderValue)}</b></div>
      <div class="card"><span class="muted">Total Revenue</span><b>${formatINR(summary.totalRevenue)}</b></div>
      <div class="card"><span class="muted">Customer Growth</span><b>${summary.customerGrowth}%</b></div>
      <div class="card"><span class="muted">Active</span><b>${summary.activeCustomers}</b></div>
      <div class="card"><span class="muted">Blocked</span><b>${summary.blockedCustomers}</b></div>
    </div>`
      : ''
  }
  ${
    options.includeCharts
      ? `<h2>Analytics Charts</h2><div class="charts">${chartsText}</div>`
      : ''
  }
  ${
    options.includeDetails !== false
      ? `<h2>Customer Details</h2>
    <table><thead><tr>
      <th>ID</th><th>Name</th><th>Mobile</th><th>Email</th><th>City</th><th>State</th>
      <th>Registered</th><th>Last Order</th><th>Orders</th><th>Spent</th><th>AOV</th><th>Type</th><th>Status</th>
    </tr></thead><tbody>${detailRows || '<tr><td colspan="13">No customers in selection</td></tr>'}</tbody></table>`
      : ''
  }
  ${
    options.includeOrders
      ? `<h2>Order History Snapshot</h2><p class="muted">Included for selected customers (placeholder dataset).</p>`
      : ''
  }
  ${
    options.includeTransactions
      ? `<h2>Transaction History</h2><p class="muted">Payment history included (placeholder dataset).</p>`
      : ''
  }
  </body></html>`;
  }

function downloadBlob(content, filename, mime) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function generateModuleReport({
  moduleKey = 'customers',
  format = 'csv',
  filters = {},
  options = {},
  selectedIds = null,
}) {
  await delay(450);
  const fmt = EXPORT_FORMATS.find((f) => f.id === format) || EXPORT_FORMATS[2];
  let customers = [];

  if (moduleKey === 'customers') {
    const all = _loadCustomersForExport();
    let list = applyFilters(all, filters);
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((c) => set.has(c.id));
    }
    customers = list;
  } else if (moduleKey === 'invoices') {
    let list = _loadInvoicesForExport();
    if (filters.status && filters.status !== 'all') list = list.filter((i) => i.status === filters.status);
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((i) => set.has(i.id));
    }
    customers = list.map((inv) => ({
      id: inv.number,
      name: inv.customer?.name || '',
      phone: inv.customer?.phone || '',
      email: inv.customer?.gstin || '',
      city: inv.gstType || '',
      state: inv.status,
      registeredAt: inv.invoiceDate,
      lastOrderAt: inv.dueDate,
      totalOrders: inv.items?.length || 0,
      totalSpent: inv.totals?.grandTotal || 0,
      averageOrderValue: inv.totals?.taxTotal || 0,
      type: inv.paymentStatus,
      status: inv.status,
    }));
  } else if (moduleKey === 'reports') {
    let list = _loadReportsForExport();
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((r) => set.has(r.id));
    }
    customers = list.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.format,
      email: r.generatedBy || '',
      city: r.dateFrom,
      state: r.dateTo,
      registeredAt: r.generatedOn,
      lastOrderAt: r.generatedOn,
      totalOrders: r.rows || 0,
      totalSpent: r.preview?.summary?.revenue || 0,
      averageOrderValue: r.size || 0,
      type: r.format,
      status: r.status,
    }));
  } else if (moduleKey === 'coupons') {
    let list = _loadCouponsForExport();
    if (filters.status && filters.status !== 'all') list = list.filter((p) => p.status === filters.status);
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((p) => set.has(p.id));
    }
    customers = list.map((p) => ({
      id: p.code || p.id,
      name: p.name,
      phone: p.kind,
      email: p.typeId,
      city: p.status,
      state: String(p.discountValue ?? ''),
      registeredAt: p.startAt,
      lastOrderAt: p.endAt,
      totalOrders: p.used || 0,
      totalSpent: p.revenue || 0,
      averageOrderValue: p.budget || 0,
      type: p.discountType || p.kind,
      status: p.status,
    }));
  } else if (moduleKey === 'advertisements') {
    let list = _loadAdsForExport();
    if (filters.status && filters.status !== 'all') {
      list = list.filter((a) => (filters.status === 'active' ? a.status === 'running' : a.status === filters.status));
    }
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((a) => set.has(a.id));
    }
    customers = list.map((a) => ({
      id: a.id,
      name: a.name,
      phone: a.typeId,
      email: a.placement,
      city: a.status,
      state: String(a.dailyBudget ?? ''),
      registeredAt: a.startAt,
      lastOrderAt: a.endAt,
      totalOrders: a.clicks || 0,
      totalSpent: a.revenue || 0,
      averageOrderValue: a.spent || 0,
      type: a.typeId,
      status: a.status,
    }));
  } else if (moduleKey === 'documents') {
    let list = _loadDocumentsForExport();
    if (filters.status && filters.status !== 'all') list = list.filter((d) => d.status === filters.status);
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((d) => set.has(d.id));
    }
    customers = list.map((d) => ({
      id: d.id,
      name: d.name,
      phone: d.documentNumber || '',
      email: d.typeLabel || d.typeId,
      city: d.categoryLabel || d.categoryId,
      state: d.expiryState || '',
      registeredAt: d.uploadedAt,
      lastOrderAt: d.updatedAt,
      totalOrders: d.version || 1,
      totalSpent: 0,
      averageOrderValue: 0,
      type: d.typeId,
      status: d.status,
    }));
  } else if (['inventory', 'marketing', 'analytics', 'wallet', 'payments', 'support'].includes(moduleKey)) {
    let list = _loadHubModuleForExport(moduleKey);
    if (filters.status && filters.status !== 'all') list = list.filter((r) => r.status === filters.status);
    if (selectedIds?.length) {
      const set = new Set(selectedIds);
      list = list.filter((r) => set.has(r.id));
    }
    customers = list.map((r) => ({
      id: r.id,
      name: r.name || r.subject || r.sku || r.id,
      phone: String(r.sku || r.ref || r.orderId || r.priority || ''),
      email: String(r.category || r.type || r.method || r.metric || ''),
      city: r.city || '—',
      state: String(r.status || ''),
      registeredAt: r.createdAt || r.date || r.updatedAt,
      lastOrderAt: r.updatedAt || r.date,
      totalOrders: Number(r.storeStock ?? r.reach ?? r.value ?? 0),
      totalSpent: Number(r.amount ?? r.spent ?? r.budget ?? r.warehouse ?? 0),
      averageOrderValue: Number(r.conversion ?? r.reorderLevel ?? 0),
      type: r.type || r.category || moduleKey,
      status: r.status || 'active',
    }));
  } else {
    // Module-agnostic placeholder rows for shared export across dashboard
    customers = [];
  }

  const summary = buildExecutiveSummary(customers);
  const chartsText = [
    '• Monthly Customer Growth: Rising trend (+18.2%)',
    '• Repeat Customer Rate: ~37%',
    '• Revenue by Customer: Top 20% drive majority revenue',
    '• Orders per Customer: ~3.1 avg',
    '• Top Spending Customers: included in analytics panel',
    '• Customer Location Distribution: metro-led',
    '• Customer Acquisition Trend: steady MoM growth',
    '• Active vs Inactive: majority active',
  ].join('\n');

  const stamp = new Date().toISOString().slice(0, 10);
  const base = `saathapp-${moduleKey}-report-${stamp}`;

  if (format === 'print') {
    const html = buildHtmlReport({
      moduleKey,
      summary,
      customers,
      options: {
        includeAnalytics: options.includeAnalytics !== false,
        includeDetails: options.includeDetails !== false,
        includeCharts: !!options.includeCharts,
        includeOrders: !!options.includeOrders,
        includeTransactions: !!options.includeTransactions,
      },
      chartsText,
    });
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 300);
    }
    return { success: true, data: { format, printed: true } };
  }

  if (format === 'csv' || format === 'excel') {
    const headers = [
      'id',
      'name',
      'phone',
      'email',
      'city',
      'state',
      'registeredAt',
      'lastOrderAt',
      'totalOrders',
      'totalSpent',
      'averageOrderValue',
      'type',
      'status',
    ];
    const rows = customers.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      city: c.city,
      state: c.state,
      registeredAt: c.registeredAt,
      lastOrderAt: c.lastOrderAt || '',
      totalOrders: c.totalOrders,
      totalSpent: c.totalSpent,
      averageOrderValue: c.averageOrderValue,
      type: c.type,
      status: c.status,
    }));
    const csv = toCsv(rows, headers);
    const summaryBlock = [
      '# Executive Summary',
      `Total Customers,${summary.totalCustomers}`,
      `New Customers,${summary.newCustomers}`,
      `Repeat Buyers,${summary.repeatBuyers}`,
      `VIP Customers,${summary.vipCustomers}`,
      `Average Order Value,${summary.averageOrderValue}`,
      `Total Revenue,${summary.totalRevenue}`,
      `Customer Growth %,${summary.customerGrowth}`,
      `Active Customers,${summary.activeCustomers}`,
      `Blocked Customers,${summary.blockedCustomers}`,
      '',
      '# Customer Details',
      csv,
    ].join('\n');
    const filename = `${base}.${format === 'excel' ? 'xlsx.csv' : 'csv'}`;
    downloadBlob(summaryBlock, filename, 'text/csv;charset=utf-8');
    return { success: true, data: { format, filename } };
  }

  if (format === 'json') {
    const filename = `${base}.json`;
    downloadBlob(
      JSON.stringify({ moduleKey, summary, rows: customers, generatedAt: new Date().toISOString() }, null, 2),
      filename,
      'application/json;charset=utf-8'
    );
    return { success: true, data: { format, filename } };
  }

  // pdf / word / ppt — download HTML snapshot as transferable report file
  const html = buildHtmlReport({
    moduleKey,
    summary,
    customers,
    options: {
      includeAnalytics: options.includeAnalytics !== false,
      includeDetails: options.includeDetails !== false,
      includeCharts: !!options.includeCharts,
      includeOrders: !!options.includeOrders,
      includeTransactions: !!options.includeTransactions,
    },
    chartsText,
  });
  const filename = `${base}.${fmt.ext === 'pdf' ? 'html' : fmt.ext === 'docx' ? 'doc.html' : fmt.ext === 'pptx' ? 'ppt.html' : 'html'}`;
  downloadBlob(html, filename, 'text/html;charset=utf-8');
  return { success: true, data: { format, filename, mime: fmt.mime } };
}

export async function previewModuleReport(args) {
  await delay(250);
  const all = args.moduleKey === 'customers' ? _loadCustomersForExport() : [];
  let list = args.moduleKey === 'customers' ? applyFilters(all, args.filters || {}) : [];
  if (args.selectedIds?.length) {
    const set = new Set(args.selectedIds);
    list = list.filter((c) => set.has(c.id));
  }
  return {
    success: true,
    data: {
      summary: buildExecutiveSummary(list),
      sample: list.slice(0, 5),
      totalRows: list.length,
      module: MODULE_META[args.moduleKey] || { title: args.moduleKey },
    },
  };
}

export { MODULE_META };
