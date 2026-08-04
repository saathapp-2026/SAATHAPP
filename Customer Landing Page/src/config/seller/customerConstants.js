export const CUSTOMER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
};

export const CUSTOMER_TYPE = {
  NEW: 'new',
  REPEAT: 'repeat',
  VIP: 'vip',
  INACTIVE: 'inactive',
};

export const CUSTOMER_STATUS_LABELS = {
  active: 'Active',
  inactive: 'Inactive',
  blocked: 'Blocked',
  deleted: 'Deleted',
};

export const CUSTOMER_TYPE_LABELS = {
  new: 'New Customer',
  repeat: 'Repeat Buyer',
  vip: 'VIP',
  inactive: 'Inactive',
};

export const CUSTOMER_TYPE_STYLES = {
  new: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  repeat: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  vip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
};

export const CUSTOMER_STATUS_STYLES = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  blocked: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  deleted: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

export const LIFECYCLE_STAGES = [
  { id: 'registered', label: 'Registered' },
  { id: 'verified', label: 'Verified' },
  { id: 'first_purchase', label: 'First Purchase' },
  { id: 'repeat', label: 'Repeat Buyer' },
  { id: 'vip', label: 'VIP Customer' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'deleted', label: 'Deleted' },
];

export const DATE_RANGE_OPTIONS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'last7', label: 'Last 7 Days' },
  { id: 'last30', label: 'Last 30 Days' },
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'custom', label: 'Custom Date Range' },
];

export const QUICK_FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New', type: 'new' },
  { id: 'repeat', label: 'Repeat', type: 'repeat' },
  { id: 'vip', label: 'VIP', type: 'vip' },
  { id: 'active', label: 'Active', status: 'active' },
  { id: 'inactive', label: 'Inactive', status: 'inactive' },
  { id: 'blocked', label: 'Blocked', status: 'blocked' },
];

export const NOTIFICATION_TEMPLATES = [
  { id: 'promo', label: 'Promotional', channel: 'all' },
  { id: 'offers', label: 'Offers', channel: 'all' },
  { id: 'membership', label: 'Membership', channel: 'all' },
  { id: 'order_updates', label: 'Order Updates', channel: 'all' },
  { id: 'festival', label: 'Festival Greetings', channel: 'all' },
  { id: 'custom', label: 'Custom Message', channel: 'all' },
];

export const EXPORT_FORMATS = [
  { id: 'pdf', label: 'PDF Report', ext: 'pdf', mime: 'application/pdf' },
  { id: 'excel', label: 'Excel (.xlsx)', ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  { id: 'csv', label: 'CSV', ext: 'csv', mime: 'text/csv' },
  { id: 'word', label: 'Word (.docx)', ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { id: 'ppt', label: 'PowerPoint (.pptx)', ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
  { id: 'json', label: 'JSON', ext: 'json', mime: 'application/json' },
  { id: 'print', label: 'Print Report', ext: 'print', mime: 'text/html' },
];

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Kolkata',
];

export const STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Telangana',
  'Gujarat',
  'Tamil Nadu',
  'Rajasthan',
  'Uttar Pradesh',
  'West Bengal',
];

export function formatINR(n) {
  const num = Number(n) || 0;
  return `₹${num.toLocaleString('en-IN')}`;
}

export function formatRelativeDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startToday - startThat) / 86400000);
  const time = d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
  if (diffDays === 0) return `Today, ${time}`;
  if (diffDays === 1) return `Yesterday, ${time}`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function highlightMatch(text, query) {
  if (!query || !text) return [{ text: String(text || ''), match: false }];
  const q = query.trim();
  if (!q) return [{ text: String(text), match: false }];
  const source = String(text);
  const lower = source.toLowerCase();
  const qi = lower.indexOf(q.toLowerCase());
  if (qi < 0) return [{ text: source, match: false }];
  return [
    { text: source.slice(0, qi), match: false },
    { text: source.slice(qi, qi + q.length), match: true },
    { text: source.slice(qi + q.length), match: false },
  ].filter((p) => p.text);
}

export function inferLifecycleStage(customer) {
  if (customer.status === 'deleted') return 'deleted';
  if (customer.status === 'blocked') return 'blocked';
  if (customer.status === 'inactive' || customer.type === 'inactive') return 'inactive';
  if (customer.type === 'vip') return 'vip';
  if (customer.type === 'repeat' || customer.totalOrders >= 2) return 'repeat';
  if (customer.totalOrders >= 1) return 'first_purchase';
  if (customer.verified) return 'verified';
  return 'registered';
}
