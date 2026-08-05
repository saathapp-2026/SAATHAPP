export const REPORT_TYPES = [
  { id: 'sales', label: 'Monthly Sales Report', short: 'Sales', description: 'Sales performance and trends overview', icon: 'sales', color: 'emerald' },
  { id: 'pnl', label: 'Profit & Loss Report', short: 'P&L', description: 'Revenue, costs, and net profit summary', icon: 'pnl', color: 'violet' },
  { id: 'inventory', label: 'Inventory Report', short: 'Inventory', description: 'Stock levels, SKUs, and reorder alerts', icon: 'inventory', color: 'sky' },
  { id: 'tax', label: 'Tax Summary', short: 'Tax', description: 'Tax collected and liability breakdown', icon: 'tax', color: 'amber' },
  { id: 'revenue', label: 'Revenue Report', short: 'Revenue', description: 'Revenue by channel and period', icon: 'revenue', color: 'rose' },
  { id: 'customer', label: 'Customer Report', short: 'Customer', description: 'Acquisition, retention, and spend', icon: 'customer', color: 'blue' },
  { id: 'product', label: 'Product Performance', short: 'Product', description: 'Best and slow-moving products', icon: 'product', color: 'indigo' },
  { id: 'gst', label: 'GST Report', short: 'GST', description: 'CGST, SGST, IGST collection summary', icon: 'gst', color: 'teal' },
  { id: 'orders', label: 'Orders Report', short: 'Orders', description: 'Order volume, status, and fulfillment', icon: 'orders', color: 'orange' },
  { id: 'payment', label: 'Payment Report', short: 'Payment', description: 'Payment modes and collection status', icon: 'payment', color: 'green' },
  { id: 'settlement', label: 'Settlement Report', short: 'Settlement', description: 'Settlements, payouts, and fees', icon: 'settlement', color: 'cyan' },
  { id: 'returns', label: 'Return & Refund Report', short: 'Returns', description: 'Returns, refunds, and RTO analysis', icon: 'returns', color: 'red' },
  { id: 'coupon', label: 'Coupon Report', short: 'Coupons', description: 'Coupon usage and discount impact', icon: 'coupon', color: 'pink' },
  { id: 'ads', label: 'Advertisement Report', short: 'Ads', description: 'Ad spend, clicks, and ROI', icon: 'ads', color: 'fuchsia' },
  { id: 'delivery', label: 'Delivery Report', short: 'Delivery', description: 'Delivery SLA and agent performance', icon: 'delivery', color: 'lime' },
  { id: 'membership', label: 'Membership Report', short: 'Membership', description: 'Plan usage and renewals', icon: 'membership', color: 'purple' },
  { id: 'marketing', label: 'Marketing Report', short: 'Marketing', description: 'Campaign reach and conversions', icon: 'marketing', color: 'yellow' },
  { id: 'wallet', label: 'Wallet Report', short: 'Wallet', description: 'Wallet credits, debits, balance', icon: 'wallet', color: 'slate' },
  { id: 'commission', label: 'Commission Report', short: 'Commission', description: 'Platform commission breakdown', icon: 'commission', color: 'stone' },
  { id: 'performance', label: 'Seller Performance', short: 'Performance', description: 'Overall seller KPIs and score', icon: 'performance', color: 'emerald' },
];

export const REPORT_FORMATS = [
  { id: 'pdf', label: 'PDF', mime: 'application/pdf', ext: 'pdf' },
  { id: 'excel', label: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ext: 'xlsx' },
  { id: 'csv', label: 'CSV', mime: 'text/csv', ext: 'csv' },
  { id: 'word', label: 'Word', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' },
  { id: 'ppt', label: 'PPT', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ext: 'pptx' },
  { id: 'json', label: 'JSON', mime: 'application/json', ext: 'json' },
];

export const FORMAT_STYLES = {
  pdf: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  excel: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  csv: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  word: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  ppt: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  json: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export const REPORT_STATUS = {
  READY: 'ready',
  GENERATING: 'generating',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
};

export const REPORT_STATUS_STYLES = {
  ready: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  generating: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  scheduled: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

export const DATE_PRESETS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'last7', label: 'Last 7 Days' },
  { id: 'last30', label: 'Last 30 Days' },
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'fy', label: 'Financial Year' },
  { id: 'custom', label: 'Custom Date Range' },
];

export const SCHEDULE_TYPES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'fy_end', label: 'Financial Year End' },
];

export const DELIVERY_METHODS = [
  { id: 'email', label: 'Email' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'download', label: 'Download Center' },
];

export const CATEGORIES = ['Grocery', 'Electronics', 'Fashion', 'Hardware', 'FMCG'];

export const WIZARD_STEPS = [
  { id: 1, label: 'Report Type' },
  { id: 2, label: 'Date Range' },
  { id: 3, label: 'Filters' },
  { id: 4, label: 'Preview' },
  { id: 5, label: 'Generate' },
];

export function formatINR(n) {
  return `₹${(Number(n) || 0).toLocaleString('en-IN')}`;
}

export function formatBytes(bytes) {
  const n = Number(bytes) || 0;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatReportTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((startToday - startThat) / 86400000);
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  if (diff === 0) return `Today, ${time}`;
  if (diff === 1) return `Yesterday, ${time}`;
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function getReportType(id) {
  return REPORT_TYPES.find((t) => t.id === id) || REPORT_TYPES[0];
}
