import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Download,
  Printer,
  Copy,
  Share2,
  Pause,
  Play,
  TrendingUp,
  TrendingDown,
  X,
  Filter,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs';
import { ExportReportButton } from '../export';
import ConfirmDialog from '../orders/ConfirmDialog';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  getHubSummary,
  getHubRecords,
  createHubRecord,
  updateHubRecord,
  deleteHubRecord,
  bulkHubAction,
  getAnalyticsChart,
  getStoreSettings,
  saveStoreSettings,
} from '../../../services/seller/sellerHubModulesService';
import { addNotification } from '../../../services/sellerNotificationService';

const STATUS_STYLE = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  in_stock: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  settled: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  positive: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  scheduled: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  low_stock: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  in_progress: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  paused: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  refunded: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  failed: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  reorder: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  credit: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  debit: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function labelize(s) {
  return String(s || '—').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const MODULE_META = {
  inventory: {
    title: 'Inventory',
    subtitle: 'Track stock levels and warehouse inventory',
    createLabel: 'Adjust Stock',
    columns: ['sku', 'name', 'category', 'storeStock', 'warehouse', 'reorderLevel', 'status', 'city'],
    filters: ['status', 'category', 'city'],
    statusOptions: ['all', 'in_stock', 'low_stock', 'reorder'],
    formFields: [
      { key: 'sku', label: 'SKU', required: true },
      { key: 'name', label: 'Product', required: true },
      { key: 'category', label: 'Category', required: true },
      { key: 'storeStock', label: 'Store Stock', type: 'number', required: true },
      { key: 'warehouse', label: 'Warehouse', type: 'number' },
      { key: 'reorderLevel', label: 'Reorder Level', type: 'number' },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status', type: 'select', options: ['in_stock', 'low_stock', 'reorder'] },
    ],
    links: [
      { to: '/seller/dashboard/products', label: 'Products' },
      { to: '/seller/dashboard/orders', label: 'Orders' },
    ],
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Promotions, campaigns, and customer engagement',
    createLabel: 'Create Campaign',
    columns: ['name', 'type', 'channel', 'status', 'reach', 'conversion', 'budget', 'spent'],
    filters: ['status', 'type', 'city'],
    statusOptions: ['all', 'active', 'scheduled', 'paused', 'draft'],
    formFields: [
      { key: 'name', label: 'Campaign Name', required: true },
      { key: 'type', label: 'Type', type: 'select', options: ['campaign', 'coupon', 'offer', 'referral'], required: true },
      { key: 'channel', label: 'Channel', type: 'select', options: ['app', 'push', 'banner', 'sms', 'whatsapp'] },
      { key: 'budget', label: 'Budget (₹)', type: 'number', required: true },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'scheduled', 'active', 'paused'] },
      { key: 'startAt', label: 'Start Date', type: 'date' },
      { key: 'endAt', label: 'End Date', type: 'date' },
    ],
    links: [
      { to: '/seller/dashboard/coupons', label: 'Coupons' },
      { to: '/seller/dashboard/advertisements', label: 'Advertisements' },
    ],
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Business insights and performance metrics',
    createLabel: 'Add Insight Note',
    columns: ['name', 'metric', 'value', 'category', 'status', 'city', 'date'],
    filters: ['status', 'category', 'city'],
    statusOptions: ['all', 'positive', 'warning', 'neutral'],
    formFields: [
      { key: 'name', label: 'Insight Title', required: true },
      { key: 'metric', label: 'Metric', required: true },
      { key: 'value', label: 'Value', type: 'number', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['sales', 'funnel', 'growth', 'ops', 'marketing'] },
      { key: 'status', label: 'Status', type: 'select', options: ['positive', 'warning', 'neutral'] },
      { key: 'city', label: 'City' },
    ],
    links: [
      { to: '/seller/dashboard/reports', label: 'Reports' },
      { to: '/seller/dashboard/orders', label: 'Orders' },
    ],
    showChart: true,
  },
  wallet: {
    title: 'Wallet',
    subtitle: 'Balance, settlements, and transactions',
    createLabel: 'Withdraw Funds',
    columns: ['name', 'type', 'amount', 'method', 'status', 'ref', 'date'],
    filters: ['status', 'type'],
    statusOptions: ['all', 'completed', 'pending'],
    formFields: [
      { key: 'name', label: 'Label', required: true },
      { key: 'amount', label: 'Amount (₹)', type: 'number', required: true },
      { key: 'method', label: 'Method', type: 'select', options: ['bank', 'upi'] },
      { key: 'ref', label: 'Reference' },
    ],
    createDefaults: { type: 'debit', status: 'pending', method: 'bank' },
    links: [{ to: '/seller/dashboard/payments', label: 'Payments' }],
  },
  payments: {
    title: 'Payments',
    subtitle: 'Payment history and settlement details',
    createLabel: 'Record Payment',
    columns: ['name', 'orderId', 'customer', 'method', 'amount', 'status', 'city', 'date'],
    filters: ['status', 'method', 'city'],
    statusOptions: ['all', 'pending', 'success', 'settled', 'refunded', 'failed'],
    formFields: [
      { key: 'name', label: 'Payment ID', required: true },
      { key: 'orderId', label: 'Order', required: true },
      { key: 'customer', label: 'Customer', required: true },
      { key: 'method', label: 'Method', type: 'select', options: ['UPI', 'Card', 'COD', 'Wallet'], required: true },
      { key: 'amount', label: 'Amount (₹)', type: 'number', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'success', 'settled', 'refunded', 'failed'] },
      { key: 'city', label: 'City' },
    ],
    links: [
      { to: '/seller/dashboard/wallet', label: 'Wallet' },
      { to: '/seller/dashboard/invoices', label: 'Invoices' },
    ],
  },
  support: {
    title: 'Support',
    subtitle: 'Get help from SAATHAPP seller support',
    createLabel: 'New Ticket',
    columns: ['name', 'subject', 'priority', 'category', 'status', 'updatedAt'],
    filters: ['status', 'priority', 'category'],
    statusOptions: ['all', 'open', 'in_progress', 'resolved', 'closed'],
    formFields: [
      { key: 'subject', label: 'Subject', required: true },
      { key: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high'], required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['orders', 'payments', 'catalog', 'invoices', 'other'], required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
    ],
    createDefaults: { status: 'open', name: '' },
    links: [{ to: '/seller/dashboard/documents', label: 'Documents' }],
  },
};

function SummaryCards({ cards, loading, onClick, activeKey }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[100px] rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse bg-white dark:bg-slate-900" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list">
      {cards.map((card, i) => {
        const up = card.trend !== 'down';
        const TrendIcon = up ? TrendingUp : TrendingDown;
        return (
          <motion.button
            key={card.key}
            type="button"
            role="listitem"
            title={card.tooltip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onClick?.(card)}
            className={`text-left rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              activeKey === card.key ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <p className="text-xs text-slate-500 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-50">{card.displayValue}</p>
            <p className={`mt-1 inline-flex items-center gap-1 text-[11px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
              <TrendIcon size={11} /> {up ? '+' : '-'}
              {Math.abs(card.changePct)}%
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}

function RecordFormModal({ open, title, fields, initial, onClose, onSubmit, busy }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      const base = {};
      fields.forEach((f) => {
        base[f.key] = initial?.[f.key] ?? '';
      });
      setForm({ ...base, ...initial });
      setErrors({});
    }
  }, [open, fields, initial]);

  const patch = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (asDraft) => {
    const e = {};
    fields.forEach((f) => {
      if (f.required && !String(form[f.key] ?? '').trim()) e[f.key] = 'Required';
    });
    setErrors(e);
    if (Object.keys(e).length) return;
    onSubmit({ ...form, ...(asDraft ? { status: form.status || 'draft' } : {}) }, asDraft);
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="hub-form-title" zIndex={SELLER_Z.modal} contentClassName="w-full max-w-lg">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 id="hub-form-title" className="text-lg font-bold">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {fields.map((f) => (
            <label key={f.key} className="block text-xs font-medium text-slate-600 dark:text-slate-300">
              {f.label}
              {f.required ? ' *' : ''}
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={form[f.key] || ''}
                  onChange={(e) => patch(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              ) : f.type === 'select' ? (
                <select
                  value={form[f.key] || ''}
                  onChange={(e) => patch(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  {(f.options || []).map((o) => (
                    <option key={o} value={o}>
                      {labelize(o)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || 'text'}
                  value={form[f.key] ?? ''}
                  onChange={(e) => patch(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              )}
              {errors[f.key] ? <span className="text-red-500 text-[11px]">{errors[f.key]}</span> : null}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm">
            Cancel
          </button>
          <button type="button" disabled={busy} onClick={() => submit(true)} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm">
            Save Draft
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => submit(false)}
            className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {busy ? 'Saving…' : 'Submit'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}

function ViewDrawer({ open, row, columns, onClose, onEdit }) {
  if (!open || !row) return null;
  return (
    <SellerOverlay open={open} onClose={onClose} label="Record details" zIndex={SELLER_Z.drawer} className="flex justify-end" contentClassName="h-full">
      <aside className="h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        <div className="flex items-start justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">{row.name || row.subject || row.id}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{row.id}</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {columns.map((col) => (
            <div key={col} className="rounded-xl bg-slate-50 dark:bg-slate-950 px-3 py-2">
              <p className="text-[11px] text-slate-400">{labelize(col)}</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 break-all">
                {col.includes('At') || col === 'date' || col === 'startAt' || col === 'endAt'
                  ? formatDate(row[col])
                  : col === 'status' || col === 'type' || col === 'priority'
                    ? labelize(row[col])
                    : String(row[col] ?? '—')}
              </p>
            </div>
          ))}
          {row.description ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-sm text-slate-600 dark:text-slate-300">
              {row.description}
            </div>
          ) : null}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button type="button" onClick={() => onEdit(row)} className="flex-1 rounded-xl bg-emerald-600 text-white py-2 text-sm font-semibold">
            Edit
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm">
            Close
          </button>
        </div>
      </aside>
    </SellerOverlay>
  );
}

function SettingsPanel({ onSaved }) {
  const [form, setForm] = useState(() => getStoreSettings());
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState('profile');

  const patch = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (draft) => {
    if (!form.storeName?.trim() || !form.businessEmail?.trim()) {
      toast.error('Store name and email are required');
      return;
    }
    setBusy(true);
    try {
      await saveStoreSettings(form, { draft });
      toast.success(draft ? 'Draft saved' : 'Settings saved');
      addNotification({ title: draft ? 'Settings draft saved' : 'Store settings updated', body: form.storeName });
      onSaved?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 px-3">
        {[
          { id: 'profile', label: 'Profile' },
          { id: 'delivery', label: 'Delivery' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'ops', label: 'Operations' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-2.5 text-sm font-medium border-b-2 -mb-px ${
              tab === t.id ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-3">
        {tab === 'profile' && (
          <>
            {[
              ['storeName', 'Store Name', 'text'],
              ['businessEmail', 'Business Email', 'email'],
              ['phone', 'Phone', 'tel'],
              ['gstin', 'GSTIN', 'text'],
              ['city', 'City', 'text'],
              ['state', 'State', 'text'],
              ['pincode', 'Pincode', 'text'],
              ['operatingHours', 'Operating Hours', 'text'],
            ].map(([k, label, type]) => (
              <label key={k} className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {label}
                <input
                  type={type}
                  value={form[k] || ''}
                  onChange={(e) => patch(k, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              </label>
            ))}
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:col-span-2">
              Description
              <textarea
                rows={3}
                value={form.description || ''}
                onChange={(e) => patch('description', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
              />
            </label>
          </>
        )}
        {tab === 'delivery' && (
          <>
            <label className="text-xs font-medium">
              Delivery Radius (km)
              <input
                type="number"
                value={form.deliveryRadius || ''}
                onChange={(e) => patch('deliveryRadius', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm mt-6">
              <input type="checkbox" checked={!!form.codEnabled} onChange={(e) => patch('codEnabled', e.target.checked)} />
              COD Enabled
            </label>
          </>
        )}
        {tab === 'notifications' && (
          <>
            {[
              ['notificationsEmail', 'Email notifications'],
              ['notificationsWhatsapp', 'WhatsApp notifications'],
              ['notificationsPush', 'Push notifications'],
            ].map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" checked={!!form[k]} onChange={(e) => patch(k, e.target.checked)} />
                {label}
              </label>
            ))}
          </>
        )}
        {tab === 'ops' && (
          <>
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input type="checkbox" checked={!!form.autoAcceptOrders} onChange={(e) => patch('autoAcceptOrders', e.target.checked)} />
              Auto-accept orders
            </label>
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input type="checkbox" checked={!!form.lowStockAlert} onChange={(e) => patch('lowStockAlert', e.target.checked)} />
              Low stock alerts
            </label>
          </>
        )}
      </div>
      <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800">
        <button type="button" disabled={busy} onClick={() => save(true)} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm">
          Save Draft
        </button>
        <button type="button" disabled={busy} onClick={() => save(false)} className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold">
          {busy ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

export default function HubInteractivePage({ moduleKey }) {
  const meta = MODULE_META[moduleKey];
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [rows, setRows] = useState([]);
  const [metaInfo, setMetaInfo] = useState({ total: 0, totalPages: 1, page: 1 });
  const [listLoading, setListLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: 'all', category: 'all', city: 'all', type: 'all', method: 'all', priority: 'all', dateFrom: '', dateTo: '' });
  const [sortBy, setSortBy] = useState(moduleKey === 'wallet' || moduleKey === 'payments' ? 'date' : 'updatedAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState(() => new Set());
  const [formOpen, setFormOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [busy, setBusy] = useState(false);
  const [chart, setChart] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const query = useMemo(
    () => ({ ...filters, search, sortBy, sortDir, page, pageSize }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getHubSummary(moduleKey);
      setSummary(res.data || []);
    } finally {
      setSummaryLoading(false);
    }
  }, [moduleKey]);

  const loadList = useCallback(async () => {
    if (moduleKey === 'settings') return;
    setListLoading(true);
    try {
      const res = await getHubRecords(moduleKey, query);
      setRows(res.data || []);
      setMetaInfo(res.meta || { total: 0, totalPages: 1, page: 1 });
    } finally {
      setListLoading(false);
    }
  }, [moduleKey, query]);

  useEffect(() => {
    loadSummary();
    if (meta?.showChart) getAnalyticsChart().then((r) => setChart(r.data));
  }, [loadSummary, meta?.showChart]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  if (!meta && moduleKey !== 'settings') {
    return <div className="p-6">Unknown module</div>;
  }

  const refresh = () => {
    loadSummary();
    loadList();
  };

  const openCreate = () => {
    setEditRow(null);
    setFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setBusy(true);
    try {
      if (moduleKey === 'support' && !payload.name) {
        payload.name = `TKT-${Date.now().toString().slice(-4)}`;
      }
      if (editRow) {
        await updateHubRecord(moduleKey, editRow.id, payload);
        toast.success('Updated');
      } else {
        await createHubRecord(moduleKey, { ...(meta.createDefaults || {}), ...payload });
        toast.success(moduleKey === 'wallet' ? 'Withdrawal requested' : 'Created');
        addNotification({ title: `${meta.title} updated`, body: payload.name || payload.subject || 'New record' });
      }
      setFormOpen(false);
      setEditRow(null);
      refresh();
    } catch (e) {
      toast.error(e.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  const runAction = (action, row) => {
    setMenuId(null);
    if (action === 'view') setViewRow(row);
    else if (action === 'edit') {
      setEditRow(row);
      setFormOpen(true);
    } else if (action === 'delete') {
      setConfirmState({
        title: 'Delete record?',
        message: `Delete ${row.name || row.subject || row.id}?`,
        danger: true,
        confirmLabel: 'Delete',
        onConfirm: async () => {
          await deleteHubRecord(moduleKey, row.id);
          setConfirmState(null);
          toast.success('Deleted');
          refresh();
        },
      });
    } else if (action === 'duplicate') {
      createHubRecord(moduleKey, { ...row, id: undefined, name: `${row.name || row.subject} (Copy)`, status: 'draft' }).then(() => {
        toast.success('Duplicated');
        refresh();
      });
    } else if (action === 'share') {
      navigator.clipboard?.writeText(`${window.location.href}?id=${row.id}`);
      toast.success('Link copied');
    } else if (action === 'print') {
      window.print();
      toast.success('Print opened');
    } else if (action === 'download') {
      const blob = new Blob([JSON.stringify(row, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${row.id || 'record'}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Downloaded');
    } else if (action === 'pause') {
      updateHubRecord(moduleKey, row.id, { status: 'paused' }).then(() => {
        toast.success('Paused');
        refresh();
      });
    } else if (action === 'resume') {
      updateHubRecord(moduleKey, row.id, { status: 'active' }).then(() => {
        toast.success('Resumed');
        refresh();
      });
    }
  };

  const chartData =
    chart?.labels?.map((label, i) => ({
      label,
      revenue: chart.revenue[i],
      orders: chart.orders[i],
    })) || [];

  if (moduleKey === 'settings') {
    return (
      <div className="space-y-6">
        <Toaster position="top-right" />
        <DashboardBreadcrumbs />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Store Settings</h1>
            <p className="text-slate-500 text-sm mt-0.5">Configure your store profile and preferences</p>
          </div>
          <ExportReportButton moduleKey="settings" />
        </div>
        <SettingsPanel onSaved={() => toast.success('Ready')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <DashboardBreadcrumbs />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{meta.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{meta.subtitle}</p>
          {meta.links?.length ? (
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              {meta.links.map((l) => (
                <Link key={l.to} to={l.to} className="text-emerald-600 hover:underline">
                  {l.label} →
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3.5 py-2 text-sm font-semibold hover:bg-emerald-700"
          >
            <Plus size={16} /> {meta.createLabel}
          </button>
          <ExportReportButton moduleKey={moduleKey} />
        </div>
      </div>

      <SummaryCards
        cards={summary}
        loading={summaryLoading}
        activeKey={activeCard}
        onClick={(card) => {
          const next = activeCard === card.key ? null : card.key;
          setActiveCard(next);
          if (!next) {
            setFilters((f) => ({ ...f, status: 'all' }));
            return;
          }
          if (['pending', 'open', 'active', 'low', 'reorder', 'failed', 'resolved'].includes(card.key)) {
            const map = { low: 'low_stock', open: 'open', pending: 'pending', active: 'active', reorder: 'reorder', failed: 'failed', resolved: 'resolved' };
            setFilters((f) => ({ ...f, status: map[card.key] || 'all' }));
            setPage(1);
          }
        }}
      />

      {meta.showChart && chartData.length ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h3 className="font-semibold mb-3">Weekly Revenue & Orders</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="orders" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${meta.title.toLowerCase()}…`}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent pl-10 pr-3 py-2.5 text-sm"
              aria-label="Search"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setFilters({ status: 'all', category: 'all', city: 'all', type: 'all', method: 'all', priority: 'all', dateFrom: '', dateTo: '' });
              setSearch('');
              setActiveCard(null);
              setPage(1);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm"
          >
            <Filter size={14} /> Reset
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
          {meta.filters.includes('status') ? (
            <select
              value={filters.status}
              onChange={(e) => {
                setFilters((f) => ({ ...f, status: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              {meta.statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All statuses' : labelize(s)}
                </option>
              ))}
            </select>
          ) : null}
          {meta.filters.includes('category') ? (
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters((f) => ({ ...f, category: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All categories</option>
              {['Grocery', 'Dairy', 'Beverages', 'sales', 'funnel', 'growth', 'ops', 'marketing', 'orders', 'payments', 'catalog', 'invoices'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : null}
          {meta.filters.includes('type') ? (
            <select
              value={filters.type}
              onChange={(e) => {
                setFilters((f) => ({ ...f, type: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All types</option>
              {['campaign', 'coupon', 'offer', 'referral', 'credit', 'debit'].map((t) => (
                <option key={t} value={t}>
                  {labelize(t)}
                </option>
              ))}
            </select>
          ) : null}
          {meta.filters.includes('city') ? (
            <select
              value={filters.city}
              onChange={(e) => {
                setFilters((f) => ({ ...f, city: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All cities</option>
              {['Pune', 'Mumbai', 'Nashik', 'All'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : null}
          {meta.filters.includes('method') ? (
            <select
              value={filters.method}
              onChange={(e) => {
                setFilters((f) => ({ ...f, method: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All methods</option>
              {['UPI', 'Card', 'COD', 'Wallet'].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          ) : null}
          {meta.filters.includes('priority') ? (
            <select
              value={filters.priority}
              onChange={(e) => {
                setFilters((f) => ({ ...f, priority: e.target.value }));
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All priorities</option>
              {['low', 'medium', 'high'].map((p) => (
                <option key={p} value={p}>
                  {labelize(p)}
                </option>
              ))}
            </select>
          ) : null}
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => {
              setFilters((f) => ({ ...f, dateFrom: e.target.value }));
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            aria-label="From date"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => {
              setFilters((f) => ({ ...f, dateTo: e.target.value }));
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            aria-label="To date"
          />
        </div>
      </div>

      {selected.size > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 text-sm">
          <span className="font-semibold">{selected.size} selected</span>
          <button
            type="button"
            onClick={async () => {
              await bulkHubAction(moduleKey, [...selected], moduleKey === 'marketing' ? 'activate' : 'close');
              setSelected(new Set());
              toast.success('Bulk action applied');
              refresh();
            }}
            className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold"
          >
            Bulk Update
          </button>
          <button
            type="button"
            onClick={() =>
              setConfirmState({
                title: 'Delete selected?',
                message: `Delete ${selected.size} record(s)?`,
                danger: true,
                confirmLabel: 'Delete',
                onConfirm: async () => {
                  await bulkHubAction(moduleKey, [...selected], 'delete');
                  setConfirmState(null);
                  setSelected(new Set());
                  toast.success('Deleted');
                  refresh();
                },
              })
            }
            className="rounded-lg border border-red-200 text-red-600 px-3 py-1.5 text-xs font-semibold"
          >
            Delete
          </button>
          <button type="button" onClick={() => setSelected(new Set())} className="text-xs text-slate-500 ml-auto">
            Clear
          </button>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {listLoading ? (
          <div className="p-6 space-y-3" aria-busy="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : !rows.length ? (
          <div className="p-12 text-center text-slate-500">
            <p className="font-semibold text-slate-800 dark:text-slate-100">No records found</p>
            <p className="text-sm mt-1">Try adjusting filters or create a new record.</p>
            <button type="button" onClick={openCreate} className="mt-4 rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold">
              {meta.createLabel}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[560px]">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300">
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={rows.every((r) => selected.has(r.id))}
                      onChange={(e) => {
                        setSelected((prev) => {
                          const next = new Set(prev);
                          rows.forEach((r) => (e.target.checked ? next.add(r.id) : next.delete(r.id)));
                          return next;
                        });
                      }}
                      aria-label="Select all"
                    />
                  </th>
                  {meta.columns.map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-semibold">
                      <button
                        type="button"
                        onClick={() => {
                          if (sortBy === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                          else {
                            setSortBy(col);
                            setSortDir('desc');
                          }
                        }}
                        className="hover:text-emerald-600"
                      >
                        {labelize(col)}
                        {sortBy === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() =>
                          setSelected((prev) => {
                            const next = new Set(prev);
                            if (next.has(row.id)) next.delete(row.id);
                            else next.add(row.id);
                            return next;
                          })
                        }
                        aria-label={`Select ${row.id}`}
                      />
                    </td>
                    {meta.columns.map((col) => (
                      <td key={col} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                        {col === 'status' || col === 'type' || col === 'priority' ? (
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[row[col]] || STATUS_STYLE.draft}`}>
                            {labelize(row[col])}
                          </span>
                        ) : col.includes('At') || col === 'date' || col === 'startAt' || col === 'endAt' ? (
                          formatDate(row[col])
                        ) : col === 'amount' || col === 'budget' || col === 'spent' ? (
                          `₹${Number(row[col] || 0).toLocaleString('en-IN')}`
                        ) : (
                          String(row[col] ?? '—')
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="relative flex justify-end gap-1">
                        <button type="button" onClick={() => runAction('view', row)} className="rounded-lg px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                          <Eye size={14} className="inline mr-1" />
                          View
                        </button>
                        <button type="button" onClick={() => setMenuId(menuId === row.id ? null : row.id)} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="More actions">
                          <MoreHorizontal size={16} />
                        </button>
                        {menuId === row.id ? (
                          <>
                            <button type="button" className="fixed inset-0 z-20" aria-label="Close menu" onClick={() => setMenuId(null)} />
                            <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1">
                              {[
                                { id: 'edit', label: 'Edit', icon: Pencil },
                                { id: 'download', label: 'Download', icon: Download },
                                { id: 'print', label: 'Print', icon: Printer },
                                { id: 'duplicate', label: 'Duplicate', icon: Copy },
                                { id: 'share', label: 'Share', icon: Share2 },
                                ...(row.status === 'active' ? [{ id: 'pause', label: 'Pause', icon: Pause }] : []),
                                ...(row.status === 'paused' || row.status === 'draft' ? [{ id: 'resume', label: 'Resume', icon: Play }] : []),
                                { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
                              ].map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => runAction(item.id, row)}
                                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${
                                      item.danger ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'
                                    }`}
                                  >
                                    <Icon size={14} />
                                    {item.label}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Showing {metaInfo.total ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, metaInfo.total)} of {metaInfo.total}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">
            Prev
          </button>
          <span>
            {page} / {metaInfo.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= metaInfo.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <RecordFormModal
        open={formOpen}
        title={editRow ? `Edit ${meta.title}` : meta.createLabel}
        fields={meta.formFields}
        initial={editRow || meta.createDefaults || {}}
        onClose={() => {
          setFormOpen(false);
          setEditRow(null);
        }}
        onSubmit={handleSubmit}
        busy={busy}
      />

      <ViewDrawer
        open={!!viewRow}
        row={viewRow}
        columns={meta.columns}
        onClose={() => setViewRow(null)}
        onEdit={(row) => {
          setViewRow(null);
          setEditRow(row);
          setFormOpen(true);
        }}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        confirmLabel={confirmState?.confirmLabel}
        danger={!!confirmState?.danger}
        onConfirm={confirmState?.onConfirm}
        onCancel={() => setConfirmState(null)}
      />
    </div>
  );
}
