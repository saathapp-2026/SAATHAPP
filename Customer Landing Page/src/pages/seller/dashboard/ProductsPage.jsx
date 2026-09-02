import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Plus,
  Search,
  Upload,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Archive,
  Download,
  Package,
  BarChart3,
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
import { ProductWizard, BulkUploadModal } from '../../../components/seller/products';
import { ExportReportButton } from '../../../components/seller/export';
import {
  getProducts,
  getProductSummaryStats,
  getProductAnalytics,
  duplicateProduct,
  bulkUpdateProducts,
  getProductById,
} from '../../../services/seller/sellerProductsService';
import {
  PRODUCT_STATUS,
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_COLORS,
  PRODUCT_CATEGORIES,
  emptyProductDraft,
} from '../../../config/seller/productConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

function StatusBadge({ status }) {
  const c = PRODUCT_STATUS_COLORS[status] || PRODUCT_STATUS_COLORS.draft;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {PRODUCT_STATUS_LABELS[status] || status}
    </span>
  );
}

export default function ProductsPage() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [products, setProducts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [stock, setStock] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [wizardOpen, setWizardOpen] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        getProducts({ search: debouncedSearch, statuses, stock, sortBy, page, pageSize: 8 }),
        getProductSummaryStats(),
      ]);
      setProducts(listRes.data || []);
      setMeta(listRes.meta || { total: 0, totalPages: 1 });
      setStats(statsRes.data);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statuses, stock, sortBy, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!showAnalytics) return undefined;
    let cancelled = false;
    getProductAnalytics().then((res) => {
      if (!cancelled) setAnalytics(res.data);
    });
    return () => { cancelled = true; };
  }, [showAnalytics]);

  const toggleStatus = (id) => {
    setPage(1);
    setStatuses((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const openCreate = () => {
    setEditDraft(emptyProductDraft());
    setWizardOpen(true);
  };

  const openEdit = async (id) => {
    const res = await getProductById(id);
    if (res.success) {
      setEditDraft(res.data);
      setWizardOpen(true);
    }
  };

  const handleBulk = async (action) => {
    const ids = [...selected];
    if (!ids.length) return toast.error('Select products first');
    
    if (action === 'duplicate') {
      for (const id of ids) await duplicateProduct(id);
      toast.success('Duplicated');
      setSelected(new Set());
      load();
      return;
    }

    setConfirmState({
      title: 'Bulk Action',
      message: `Apply "${action}" to ${ids.length} product(s)?`,
      danger: action === 'delete',
      onConfirm: async () => {
        setConfirmState(null);
        await bulkUpdateProducts(ids, action);
        toast.success('Bulk action completed');
        setSelected(new Set());
        load();
      }
    });
  };

  const exportCsv = () => {
    const headers = ['name', 'sku', 'status', 'mrp', 'selling', 'stock'];
    const rows = products.map((p) => [
      p.basic.name,
      p.basic.sku,
      p.status,
      p.pricing.mrp,
      p.pricing.sellingPrice,
      p.inventory.initialStock,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const allSelected = products.length > 0 && products.every((p) => selected.has(p.id));

  const statusPills = useMemo(
    () => [
      { id: '', label: 'All' },
      { id: PRODUCT_STATUS.PUBLISHED, label: 'Published' },
      { id: PRODUCT_STATUS.DRAFT, label: 'Draft' },
      { id: PRODUCT_STATUS.PENDING_REVIEW, label: 'Pending Review' },
      { id: PRODUCT_STATUS.SCHEDULED, label: 'Scheduled' },
      { id: PRODUCT_STATUS.HIDDEN, label: 'Hidden' },
    ],
    []
  );

  // Wizard replaces list view — stays inside dashboard content (never under sidebar)
  if (wizardOpen) {
    return (
      <>
        <Toaster position="top-right" />
        <ProductWizard
          initialDraft={editDraft}
          onClose={() => { setWizardOpen(false); setEditDraft(null) }}
          onSaved={() => { load() }}
        />
      </>
    );
  }

  return (
    <div className="space-y-4 pb-8 w-full max-w-[1400px] mx-auto overflow-x-hidden">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products & Catalogue</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your wholesale product inventory and details.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ExportReportButton moduleKey="products" />
          <button
            type="button"
            onClick={() => setShowAnalytics((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface"
          >
            <BarChart3 size={14} /> {showAnalytics ? 'Hide Analytics' : 'Analytics'}
          </button>
          <button
            type="button"
            onClick={() => setBulkOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface"
          >
            <Upload size={14} /> Excel Bulk Import
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            <Plus size={14} /> Add Product SKU
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          ['Total', stats?.total, 'text-slate-700'],
          ['Published', stats?.published, 'text-emerald-600'],
          ['Draft', stats?.draft, 'text-slate-500'],
          ['Pending', stats?.pending, 'text-amber-600'],
          ['Low Stock', stats?.lowStock, 'text-orange-600'],
          ['Views', stats?.views, 'text-sky-600'],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3.5">
            <p className="text-[11px] text-slate-500 mb-1">{label}</p>
            <p className={`text-xl font-bold tabular-nums ${color}`}>{loading && stats == null ? '—' : value ?? 0}</p>
          </div>
        ))}
      </div>

      {showAnalytics && analytics && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-4 space-y-4">
          <h2 className="font-bold">Product Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              ['Views', analytics.views],
              ['Clicks', analytics.clicks],
              ['CTR', `${analytics.ctr}%`],
              ['Orders', analytics.orders],
              ['Conversion', `${analytics.conversionRate}%`],
              ['Revenue', money(analytics.revenue)],
              ['Returns', analytics.returns],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-page p-2.5">
                <p className="text-[10px] text-slate-500">{k}</p>
                <p className="font-bold text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.daily}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="views" fill="#0ea5e9" name="Views" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <h3 className="font-semibold text-xs text-slate-500 mb-2">Top Products</h3>
              {analytics.top.map((p) => (
                <p key={p.id} className="truncate py-0.5">{p.basic.name} · {money(p.analytics.revenue)}</p>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-xs text-slate-500 mb-2">Low Stock</h3>
              {analytics.low.map((p) => (
                <p key={p.id} className="truncate py-0.5 text-amber-700">{p.basic.name} · {p.inventory.initialStock}</p>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-xs text-slate-500 mb-2">Worst Sellers</h3>
              {analytics.worst.map((p) => (
                <p key={p.id} className="truncate py-0.5">{p.basic.name} · {p.analytics.orders} orders</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3 space-y-3">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search name, SKU, barcode, brand, category…"
              aria-label="Search products"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-page dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={stock}
            onChange={(e) => { setStock(e.target.value); setPage(1) }}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-surface text-sm"
          >
            <option value="">All stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-surface text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="stock">Stock</option>
            <option value="price">Price</option>
            <option value="revenue">Revenue</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {statusPills.map((p) => {
            const active = p.id === '' ? statuses.length === 0 : statuses.includes(p.id);
            return (
              <button
                key={p.id || 'all'}
                type="button"
                onClick={() => {
                  setPage(1);
                  if (p.id === '') setStatuses([]);
                  else toggleStatus(p.id);
                }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  active ? 'bg-emerald-500 text-white' : 'border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-3 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">{selected.size} selected</span>
          <button type="button" onClick={() => handleBulk('publish')} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500 text-white">Publish</button>
          <button type="button" onClick={() => handleBulk('hide')} className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-surface inline-flex items-center gap-1"><EyeOff size={11} /> Hide</button>
          <button type="button" onClick={() => handleBulk('archive')} className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-surface inline-flex items-center gap-1"><Archive size={11} /> Archive</button>
          <button type="button" onClick={() => handleBulk('duplicate')} className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-surface inline-flex items-center gap-1"><Copy size={11} /> Duplicate</button>
          <button type="button" onClick={exportCsv} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-surface inline-flex items-center gap-1"><Download size={11} /> Export</button>
          <button type="button" onClick={() => handleBulk('delete')} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500 text-white inline-flex items-center gap-1"><Trash2 size={11} /> Delete</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-page" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={36} className="mx-auto text-slate-300 mb-2" />
            <h3 className="font-semibold">No products yet</h3>
            <p className="text-sm text-slate-500 mb-3">Create your first wholesale SKU to get started.</p>
            <button type="button" onClick={openCreate} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-lg text-sm font-bold bg-emerald-500 text-white">
              Add Product SKU
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead className="bg-page text-xs text-slate-500 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => {
                          if (allSelected) setSelected(new Set());
                          else setSelected(new Set(products.map((p) => p.id)));
                        }}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-3 py-3 text-left">Product</th>
                    <th className="px-3 py-3 text-left">SKU</th>
                    <th className="px-3 py-3 text-left">Category</th>
                    <th className="px-3 py-3 text-left">Price</th>
                    <th className="px-3 py-3 text-left">Stock</th>
                    <th className="px-3 py-3 text-left">Status</th>
                    <th className="px-3 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const cat = PRODUCT_CATEGORIES.find((c) => c.id === p.basic.category);
                    const low = Number(p.inventory.initialStock) <= Number(p.inventory.minStockAlert || 10);
                    return (
                      <tr key={p.id} className="transition-colors hover:bg-emerald-50/30 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50/80">
                        <td className="px-3 py-3">
                          <input
                            type="checkbox"
                            checked={selected.has(p.id)}
                            onChange={() => {
                              setSelected((prev) => {
                                const next = new Set(prev);
                                if (next.has(p.id)) next.delete(p.id);
                                else next.add(p.id);
                                return next;
                              });
                            }}
                            aria-label={`Select ${p.basic.name}`}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <button type="button" onClick={() => openEdit(p.id)} className="text-left">
                            <p className="font-semibold hover:text-emerald-600">{p.basic.name}</p>
                            <p className="text-[11px] text-slate-400">{p.basic.brand || '—'}</p>
                          </button>
                        </td>
                        <td className="px-3 py-3 font-mono text-xs">{p.basic.sku}</td>
                        <td className="px-3 py-3 text-xs">{cat?.label || p.basic.category}</td>
                        <td className="px-3 py-3">
                          <p className="font-bold">{money(p.pricing.offerPrice || p.pricing.sellingPrice)}</p>
                          <p className="text-[11px] text-slate-400 line-through">{money(p.pricing.mrp)}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span className={low ? 'text-amber-600 font-semibold' : ''}>{p.inventory.initialStock}</span>
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
                            <button type="button" title="Edit" onClick={() => openEdit(p.id)} className="h-7 w-7 rounded-lg border border-slate-200 inline-flex items-center justify-center">
                              <Eye size={12} />
                            </button>
                            <button
                              type="button"
                              title="Duplicate"
                              onClick={async () => {
                                await duplicateProduct(p.id);
                                toast.success('Duplicated');
                                load();
                              }}
                              className="h-7 w-7 rounded-lg border border-slate-200 inline-flex items-center justify-center"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-3 py-3 border-t border-slate-100 dark:border-slate-800 text-sm">
              <p className="text-slate-500">{meta.total} products</p>
              <div className="flex gap-2">
                <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded-lg border disabled:opacity-40">Prev</button>
                <span className="text-xs self-center">Page {page}/{meta.totalPages}</span>
                <button type="button" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded-lg border disabled:opacity-40">Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      <BulkUploadModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onImported={() => { setBulkOpen(false); load(); toast.success('Import finished') }}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        danger={confirmState?.danger}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />
    </div>
  );
}
