import { delay } from './_sellerServiceUtils';
import {
  REPORT_TYPES,
  REPORT_FORMATS,
  REPORT_STATUS,
  formatINR,
  getReportType,
} from '../../config/seller/reportConstants';

const STORAGE_KEY = 'saathapp_seller_reports_v1';
const SCHEDULES_KEY = 'saathapp_seller_report_schedules_v2';
const DOWNLOADS_KEY = 'saathapp_seller_report_downloads_v1';
const TEMPLATES_KEY = 'saathapp_seller_report_templates_v1';
const DRAFT_KEY = 'saathapp_seller_report_wizard_draft';

function daysAgo(n, h = 10, m = 30) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
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
    // ignore quota
  }
}

function seedReports() {
  const formats = ['pdf', 'excel', 'csv', 'ppt', 'word', 'json'];
  return REPORT_TYPES.slice(0, 12).map((t, i) => {
    const format = formats[i % formats.length];
    const generatedOn = daysAgo(i % 8, 9 + (i % 6), 15 + (i % 40));
    const from = new Date();
    from.setDate(1);
    const to = new Date();
    return {
      id: `rpt-${1001 + i}`,
      typeId: t.id,
      name: t.label,
      description: t.description,
      format,
      status: REPORT_STATUS.READY,
      dateFrom: from.toISOString().slice(0, 10),
      dateTo: to.toISOString().slice(0, 10),
      generatedOn,
      size: 1200000 + i * 180000 + (i % 3) * 90000,
      pages: 4 + (i % 8),
      rows: 80 + i * 12,
      generatedBy: 'Saurabh Kumar',
      filters: { category: 'all', status: 'all' },
      preview: {
        summary: {
          revenue: 234560 - i * 4200,
          orders: 186 - i * 3,
          gst: 12400 - i * 120,
          margin: 18.5 - (i % 5) * 0.3,
        },
        rows: Array.from({ length: 5 }, (_, r) => ({
          label: `Row ${r + 1}`,
          value: 1200 + r * 340 + i * 50,
        })),
      },
    };
  });
}

function ensureReports() {
  let list = load(STORAGE_KEY, null);
  if (!Array.isArray(list) || !list.length) {
    list = seedReports();
    save(STORAGE_KEY, list);
  }
  return list;
}

function ensureSchedules() {
  let list = load(SCHEDULES_KEY, null);
  if (!Array.isArray(list) || !list.length) {
    list = [
      { id: 'sch-1', name: 'Daily Sales Report', typeId: 'sales', scheduleType: 'daily', time: '09:00 AM', delivery: 'email', status: 'active', nextRun: daysAgo(-1, 9, 0), lastRun: daysAgo(0, 9, 0) },
      { id: 'sch-2', name: 'Weekly Inventory Report', typeId: 'inventory', scheduleType: 'weekly', time: '09:00 AM', delivery: 'dashboard', status: 'active', nextRun: daysAgo(-3, 8, 0), lastRun: daysAgo(4, 8, 0) },
      { id: 'sch-3', name: 'Monthly GST Report', typeId: 'gst', scheduleType: 'monthly', time: '10:00 AM', delivery: 'email', status: 'active', nextRun: daysAgo(-20, 10, 0), lastRun: daysAgo(10, 10, 0) },
    ];
    save(SCHEDULES_KEY, list);
  }
  return list;
}

function ensureDownloads() {
  let list = load(DOWNLOADS_KEY, null);
  if (!Array.isArray(list) || !list.length) {
    list = ensureReports().slice(0, 5).map((r, i) => ({
      id: `dl-${i + 1}`,
      reportId: r.id,
      name: `${r.name}.${r.format === 'excel' ? 'xlsx' : r.format}`,
      format: r.format,
      size: r.size,
      at: daysAgo(i, 11, 20),
      user: 'Saurabh Kumar',
    }));
    save(DOWNLOADS_KEY, list);
  }
  return list;
}

export async function getReportSummary() {
  await delay(200);
  const reports = ensureReports();
  const last = [...reports].sort((a, b) => new Date(b.generatedOn) - new Date(a.generatedOn))[0];
  const lastParts = last ? splitRelative(last.generatedOn) : { dayLabel: '—', timeLabel: '' };
  const cards = [
    { key: 'generated', label: 'Reports Generated', displayValue: Math.max(24, reports.length), changePct: 14.3, trend: 'up', color: 'violet', icon: 'chart', tooltip: 'Total reports generated this period' },
    { key: 'last', label: 'Last Report Generated', displayValue: lastParts.dayLabel, dayLabel: lastParts.dayLabel, timeLabel: lastParts.timeLabel, changePct: 0, trend: 'up', color: 'blue', icon: 'clock', tooltip: 'Most recent report generation', subLabel: lastParts.timeLabel },
    { key: 'revenue', label: 'Total Revenue', displayValue: formatINR(234560), changePct: 18.6, trend: 'up', color: 'green', icon: 'rupee', tooltip: 'Revenue covered in reports' },
    { key: 'margin', label: 'Profit Margin', displayValue: '18.5%', changePct: 2.4, trend: 'up', color: 'amber', icon: 'trend', tooltip: 'Average profit margin' },
    { key: 'orders', label: 'Orders Processed', displayValue: 1284, changePct: 11.2, trend: 'up', color: 'sky', icon: 'orders', tooltip: 'Orders in reporting window' },
    { key: 'gst', label: 'GST Collected', displayValue: formatINR(12400), changePct: 9.8, trend: 'up', color: 'teal', icon: 'gst', tooltip: 'GST from report period' },
    { key: 'customers', label: 'Customer Growth', displayValue: '+18.2%', changePct: 18.2, trend: 'up', color: 'indigo', icon: 'users', tooltip: 'Customer growth vs previous period' },
    { key: 'delivery', label: 'Delivery Performance', displayValue: '96.4%', changePct: 1.6, trend: 'up', color: 'emerald', icon: 'truck', tooltip: 'On-time delivery rate' },
  ];
  return { success: true, data: cards };
}

function splitRelative(iso) {
  const d = new Date(iso);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((startToday - startThat) / 86400000);
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  if (diff === 0) return { dayLabel: 'Today', timeLabel: time };
  if (diff === 1) return { dayLabel: 'Yesterday', timeLabel: time };
  return {
    dayLabel: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    timeLabel: time,
  };
}

export async function getBusinessOverview() {
  await delay(220);
  const spark = (base) => Array.from({ length: 12 }, (_, i) => base + Math.round(Math.sin(i / 2) * base * 0.15) + i * (base * 0.02));
  return {
    success: true,
    data: {
      rangeLabel: 'This Month',
      metrics: [
        { id: 'sales', label: 'Total Sales', value: formatINR(234560), changePct: 18.6, color: '#10b981', series: spark(18000) },
        { id: 'orders', label: 'Total Orders', value: '1,284', changePct: 12.4, color: '#0ea5e9', series: spark(90) },
        { id: 'aov', label: 'Avg. Order Value', value: formatINR(780), changePct: 6.8, color: '#f59e0b', series: spark(700) },
        { id: 'customers', label: 'New Customers', value: '342', changePct: 15.2, color: '#8b5cf6', series: spark(24) },
      ],
    },
  };
}

export async function getReportCatalog() {
  await delay(150);
  const reports = ensureReports();
  return {
    success: true,
    data: REPORT_TYPES.map((t) => {
      const last = reports.find((r) => r.typeId === t.id);
      return {
        ...t,
        status: 'ready',
        lastGenerated: last?.generatedOn || null,
      };
    }),
  };
}

export async function getGeneratedReports(filters = {}) {
  await delay(250);
  let list = ensureReports();
  if (filters.search) {
    const q = String(filters.search).toLowerCase();
    list = list.filter((r) => r.name.toLowerCase().includes(q) || r.typeId.includes(q));
  }
  if (filters.format && filters.format !== 'all') list = list.filter((r) => r.format === filters.format);
  if (filters.status && filters.status !== 'all') list = list.filter((r) => r.status === filters.status);
  if (filters.typeId && filters.typeId !== 'all') list = list.filter((r) => r.typeId === filters.typeId);

  const sortBy = filters.sortBy || 'generatedOn';
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
  return { success: true, data: list.slice(start, start + pageSize), meta: { total, totalPages, page, pageSize } };
}

export async function getReportAnalytics(range = 'monthly') {
  await delay(280);
  const len = range === 'daily' ? 14 : range === 'weekly' ? 8 : 6;
  const labels =
    range === 'daily'
      ? Array.from({ length: len }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (len - 1 - i));
          return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        })
      : range === 'weekly'
        ? Array.from({ length: len }, (_, i) => `W${i + 1}`)
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(0, len);

  const series = labels.map((label, i) => ({
    label,
    sales: 18000 + i * 3200,
    revenue: 22000 + i * 2800,
    orders: 80 + i * 12,
    gst: 1800 + i * 220,
    margin: 16 + (i % 5) * 0.6,
    returns: 4 + (i % 3),
  }));

  return {
    success: true,
    data: {
      series,
      topProducts: [
        { name: 'Basmati Rice 5kg', value: 42000 },
        { name: 'Cold Pressed Oil', value: 28600 },
        { name: 'Premium Tea', value: 19400 },
      ],
      insights: [
        { id: 'rev', title: 'Revenue Trends', text: 'Revenue up 18.6% MoM with strong weekend spikes.' },
        { id: 'cat', title: 'Fastest Growing Category', text: 'Grocery leading growth at +22% this month.' },
        { id: 'best', title: 'Best Selling Products', text: 'Basmati Rice and Cold Pressed Oil drive 38% of sales.' },
        { id: 'slow', title: 'Slow Moving Products', text: '3 SKUs below reorder velocity — review inventory.' },
        { id: 'cust', title: 'Customer Growth', text: 'New customers +15.8%; repeat rate holding at 37%.' },
        { id: 'margin', title: 'Profit Margin Insights', text: 'Margin improved +2.4 pts after discount optimization.' },
        { id: 'inv', title: 'Inventory Health', text: '94% SKUs in healthy stock band; 4 low-stock alerts.' },
        { id: 'pay', title: 'Payment Collection', text: 'Collection rate 96.2%; COD pending ₹8,420.' },
        { id: 'ret', title: 'Return Analysis', text: 'Return rate 2.1% — within marketplace benchmark.' },
      ],
    },
  };
}

export function emptyWizardDraft() {
  return {
    step: 1,
    typeId: 'sales',
    datePreset: 'this_month',
    dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10),
    dateTo: new Date().toISOString().slice(0, 10),
    category: 'all',
    status: 'all',
    city: '',
    state: '',
    paymentMode: 'all',
    gstType: 'all',
    format: 'pdf',
    updatedAt: Date.now(),
  };
}

export function loadWizardDraft() {
  return { ...emptyWizardDraft(), ...load(DRAFT_KEY, {}) };
}

export function saveWizardDraft(draft) {
  save(DRAFT_KEY, { ...draft, updatedAt: Date.now() });
}

export function clearWizardDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export async function generateReport(payload = {}) {
  await delay(500);
  const type = getReportType(payload.typeId || 'sales');
  const format = payload.format || 'pdf';
  const report = {
    id: `rpt-${Date.now()}`,
    typeId: type.id,
    name: type.label,
    description: type.description,
    format,
    status: REPORT_STATUS.READY,
    dateFrom: payload.dateFrom,
    dateTo: payload.dateTo,
    generatedOn: new Date().toISOString(),
    size: 1500000 + Math.round(Math.random() * 900000),
    pages: 6 + Math.round(Math.random() * 8),
    rows: 100 + Math.round(Math.random() * 200),
    generatedBy: 'Saurabh Kumar',
    filters: {
      category: payload.category || 'all',
      status: payload.status || 'all',
      city: payload.city || '',
      state: payload.state || '',
      paymentMode: payload.paymentMode || 'all',
      gstType: payload.gstType || 'all',
    },
    preview: {
      summary: {
        revenue: 234560,
        orders: 186,
        gst: 12400,
        margin: 18.5,
      },
      rows: Array.from({ length: 6 }, (_, r) => ({
        label: `${type.short} metric ${r + 1}`,
        value: 1500 + r * 420,
      })),
    },
  };

  const list = ensureReports();
  list.unshift(report);
  save(STORAGE_KEY, list);
  clearWizardDraft();

  pushDownload({
    reportId: report.id,
    name: `${report.name}.${format === 'excel' ? 'xlsx' : format}`,
    format,
    size: report.size,
  });

  return { success: true, data: report };
}

export async function generateAllReports() {
  await delay(800);
  const created = [];
  for (const t of REPORT_TYPES.slice(0, 8)) {
    const res = await generateReport({
      typeId: t.id,
      format: 'pdf',
      dateFrom: emptyWizardDraft().dateFrom,
      dateTo: emptyWizardDraft().dateTo,
    });
    if (res.success) created.push(res.data);
  }
  return { success: true, data: created };
}

export async function deleteReport(id) {
  await delay(200);
  const list = ensureReports().filter((r) => r.id !== id);
  save(STORAGE_KEY, list);
  return { success: true };
}

export async function bulkDeleteReports(ids) {
  await delay(300);
  const set = new Set(ids);
  save(STORAGE_KEY, ensureReports().filter((r) => !set.has(r.id)));
  return { success: true };
}

export function buildReportContent(report, format = 'csv') {
  const type = getReportType(report.typeId);
  const summary = report.preview?.summary || {};
  if (format === 'json') {
    return JSON.stringify({ report, type, generatedAt: new Date().toISOString() }, null, 2);
  }
  if (format === 'csv' || format === 'excel') {
    const lines = [
      `# ${report.name}`,
      `Type,${type.label}`,
      `Date Range,${report.dateFrom} to ${report.dateTo}`,
      `Revenue,${summary.revenue || 0}`,
      `Orders,${summary.orders || 0}`,
      `GST,${summary.gst || 0}`,
      `Margin,${summary.margin || 0}`,
      '',
      'Metric,Value',
      ...(report.preview?.rows || []).map((r) => `${r.label},${r.value}`),
    ];
    return lines.join('\n');
  }
  // html for pdf/word/ppt/print
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${report.name}</title>
  <style>body{font-family:system-ui,sans-serif;padding:24px;color:#0f172a}h1{font-size:20px}.muted{color:#64748b;font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px}th,td{border:1px solid #e2e8f0;padding:8px;text-align:left}th{background:#f8fafc}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card{border:1px solid #e2e8f0;border-radius:12px;padding:12px}</style></head><body>
  <h1>SAATHAPP — ${report.name}</h1>
  <p class="muted">${report.dateFrom} → ${report.dateTo} · Generated ${new Date(report.generatedOn).toLocaleString('en-IN')} · ${String(format).toUpperCase()}</p>
  <div class="grid">
    <div class="card"><div class="muted">Revenue</div><b>${formatINR(summary.revenue)}</b></div>
    <div class="card"><div class="muted">Orders</div><b>${summary.orders || 0}</b></div>
    <div class="card"><div class="muted">GST</div><b>${formatINR(summary.gst)}</b></div>
    <div class="card"><div class="muted">Margin</div><b>${summary.margin || 0}%</b></div>
  </div>
  <table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>
  ${(report.preview?.rows || []).map((r) => `<tr><td>${r.label}</td><td>${r.value}</td></tr>`).join('')}
  </tbody></table>
  <p class="muted" style="margin-top:24px">Seller Hub BI Report · Architecture ready for AI insights</p>
  </body></html>`;
}

export function downloadReportFile(report, format) {
  const fmt = format || report.format || 'pdf';
  const content = buildReportContent(report, fmt);
  const meta = REPORT_FORMATS.find((f) => f.id === fmt) || REPORT_FORMATS[0];
  const isText = ['csv', 'excel', 'json'].includes(fmt);
  const blob = new Blob([content], { type: isText ? `${meta.mime};charset=utf-8` : 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${report.name.replace(/\s+/g, '-')}.${fmt === 'excel' ? 'xlsx.csv' : fmt === 'pdf' || fmt === 'word' || fmt === 'ppt' ? `${fmt}.html` : meta.ext}`;
  a.click();
  URL.revokeObjectURL(url);
  pushDownload({
    reportId: report.id,
    name: a.download,
    format: fmt,
    size: report.size || content.length,
  });
  return { success: true };
}

export function printReport(report) {
  const html = buildReportContent(report, 'pdf');
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }
  return { success: true };
}

export function pushDownload(entry) {
  const list = ensureDownloads();
  list.unshift({
    id: `dl-${Date.now()}`,
    at: new Date().toISOString(),
    user: 'Saurabh Kumar',
    ...entry,
  });
  save(DOWNLOADS_KEY, list.slice(0, 50));
}

export async function getRecentDownloads() {
  await delay(120);
  return { success: true, data: ensureDownloads() };
}

export async function getSchedules() {
  await delay(120);
  return { success: true, data: ensureSchedules() };
}

export async function saveSchedule(payload) {
  await delay(250);
  const list = ensureSchedules();
  const item = {
    id: payload.id || `sch-${Date.now()}`,
    name: payload.name || `${getReportType(payload.typeId).label} Schedule`,
    typeId: payload.typeId || 'sales',
    scheduleType: payload.scheduleType || 'daily',
    time: payload.time || '09:00',
    delivery: payload.delivery || 'email',
    status: payload.status || 'active',
    nextRun: payload.nextRun || daysAgo(-1, 9, 0),
    lastRun: payload.lastRun || null,
  };
  const idx = list.findIndex((s) => s.id === item.id);
  if (idx >= 0) list[idx] = item;
  else list.unshift(item);
  save(SCHEDULES_KEY, list);
  return { success: true, data: item };
}

export async function updateScheduleStatus(id, status) {
  await delay(150);
  const list = ensureSchedules().map((s) => (s.id === id ? { ...s, status } : s));
  save(SCHEDULES_KEY, list);
  return { success: true };
}

export async function deleteSchedule(id) {
  await delay(150);
  save(SCHEDULES_KEY, ensureSchedules().filter((s) => s.id !== id));
  return { success: true };
}

export async function getTemplates() {
  await delay(100);
  return { success: true, data: load(TEMPLATES_KEY, []) };
}

export async function saveTemplate(tpl) {
  await delay(150);
  const list = load(TEMPLATES_KEY, []);
  const item = { id: tpl.id || `tpl-${Date.now()}`, createdAt: new Date().toISOString(), ...tpl };
  list.unshift(item);
  save(TEMPLATES_KEY, list.slice(0, 30));
  return { success: true, data: item };
}

export async function deleteTemplate(id) {
  await delay(120);
  save(TEMPLATES_KEY, load(TEMPLATES_KEY, []).filter((t) => t.id !== id));
  return { success: true };
}

export async function bulkDownloadZip(reportIds = []) {
  await delay(400);
  const set = new Set(reportIds);
  const reports = ensureReports().filter((r) => set.has(r.id));
  const bundle = reports.map((r) => `===== ${r.name} =====\n${buildReportContent(r, 'csv')}`).join('\n\n');
  const blob = new Blob([bundle], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `saathapp-reports-bundle-${Date.now()}.zip.txt`;
  a.click();
  URL.revokeObjectURL(url);
  return { success: true, data: { count: reports.length } };
}

export { ensureReports as _loadReportsForExport };
