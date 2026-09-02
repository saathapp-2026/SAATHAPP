import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Target,
  Megaphone,
  Image,
  Star,
  BarChart3,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import {
  CouponSummaryCards,
  CreatePromoMenu,
  CouponFilters,
  CouponTable,
  CouponAnalytics,
  CouponWizard,
  PromoAssetWizard,
  MarketingAssistant,
  ViewPromoModal,
} from '../../../components/seller/coupons';
import { ExportReportButton } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getCouponSummary,
  getPromos,
  getCouponAnalytics,
  updatePromoStatus,
  duplicatePromo,
  deletePromo,
  bulkPromoAction,
} from '../../../services/seller/sellerCouponsService';
import { addNotification } from '../../../services/sellerNotificationService';
import { getPromoType } from '../../../config/seller/couponConstants';

const DEFAULT_FILTERS = {
  status: 'all',
  kind: 'all',
  typeId: 'all',
  category: undefined,
};

export default function CouponsPage() {
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, page: 1, counts: {} });
  const [listLoading, setListLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [loadingId, setLoadingId] = useState(null);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState('weekly');

  const [couponWizardOpen, setCouponWizardOpen] = useState(false);
  const [couponTypeId, setCouponTypeId] = useState('percentage');
  const [assetOpen, setAssetOpen] = useState(false);
  const [assetTypeId, setAssetTypeId] = useState('ad_image');
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [confirmState, setConfirmState] = useState(null);

  const query = useMemo(
    () => ({ ...filters, search, sortBy, sortDir, page, pageSize }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getCouponSummary();
      setSummary(res.data || []);
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadList = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await getPromos(query);
      setItems(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1, page: 1, counts: {} });
    } catch {
      toast.error('Failed to load promotions');
    } finally {
      setListLoading(false);
    }
  }, [query]);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await getCouponAnalytics(analyticsRange);
      setAnalytics(res.data);
    } catch {
      toast.error('Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  }, [analyticsRange]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (showAnalytics) loadAnalytics();
  }, [showAnalytics, loadAnalytics]);

  const notify = (title, body) => {
    try {
      addNotification({ title, body });
    } catch {
      // ignore
    }
  };

  const refresh = async () => {
    await Promise.all([loadSummary(), loadList()]);
  };

  const openCreate = (typeItem) => {
    setEditItem(null);
    const group = typeItem.group || getPromoType(typeItem.id).group;
    if (group === 'coupon') {
      setCouponTypeId(typeItem.id);
      setCouponWizardOpen(true);
    } else {
      setAssetTypeId(typeItem.id);
      setAssetOpen(true);
    }
  };

  const handleSort = (id) => {
    if (sortBy === id) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(id);
      setSortDir('desc');
    }
    setPage(1);
  };

  const toggleId = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (items.every((i) => prev.has(i.id))) return new Set();
      return new Set(items.map((i) => i.id));
    });
  };

  const handleAction = async (action, item) => {
    setLoadingId(item.id);
    try {
      if (action === 'view') setViewItem(item);
      else if (action === 'edit') {
        setEditItem(item);
        if (item.kind === 'coupon') {
          setCouponTypeId(item.typeId);
          setCouponWizardOpen(true);
        } else {
          setAssetTypeId(item.typeId);
          setAssetOpen(true);
        }
      } else if (action === 'duplicate') {
        const res = await duplicatePromo(item.id);
        if (res.success) {
          toast.success('Duplicated as draft');
          notify('Promotion Duplicated', item.name);
          refresh();
        }
      } else if (action === 'activate') {
        await updatePromoStatus(item.id, 'active');
        toast.success('Activated');
        notify('Campaign Started', item.name);
        refresh();
      } else if (action === 'pause') {
        await updatePromoStatus(item.id, 'paused');
        toast.success('Paused');
        refresh();
      } else if (action === 'stop') {
        await updatePromoStatus(item.id, 'completed');
        toast.success('Stopped');
        refresh();
      } else if (action === 'analytics') {
        setShowAnalytics(true);
        toast.success('Analytics opened') } else if (action === 'share') {
        const link = `${window.location.origin}/seller/dashboard/coupons?id=${item.id}`;
        try {
          await navigator.clipboard.writeText(link);
          toast.success('Share link copied') } catch {
          toast.success('Share ready') }
      } else if (action === 'export') {
        const content = JSON.stringify(item, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.code || item.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Exported') } else if (action === 'delete') {
        setConfirmState({
          title: 'Delete promotion?',
          message: `Delete “${item.name}”? This cannot be undone.`,
          danger: true,
          confirmLabel: 'Delete',
          onConfirm: async () => {
            await deletePromo(item.id);
            toast.success('Deleted');
            setConfirmState(null);
            setSelectedIds((s) => {
              const n = new Set(s);
              n.delete(item.id);
              return n;
            });
            refresh();
          },
        });
      }
    } catch {
      toast.error('Action failed');
    } finally {
      setLoadingId(null);
    }
  };

  const handleBulk = async (action) => {
    if (!selectedIds.size) {
      toast.error('Select items first');
      return;
    }
    if (action === 'delete') {
      setConfirmState({
        title: 'Delete selected?',
        message: `Delete ${selectedIds.size} item(s)?`,
        danger: true,
        confirmLabel: 'Delete',
        onConfirm: async () => {
          await bulkPromoAction([...selectedIds], 'delete');
          toast.success('Deleted');
          setSelectedIds(new Set());
          setConfirmState(null);
          refresh();
        },
      });
      return;
    }
    await bulkPromoAction([...selectedIds], action);
    toast.success('Bulk action done');
    refresh();
  };

  return (
    <div className="space-y-5 pb-24 lg:pb-8">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Coupons & Promotions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create coupons, campaigns, ads, banners, posters & sponsored products.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CreatePromoMenu onSelect={openCreate} />
          <button
            type="button"
            onClick={() => openCreate({ id: 'campaign_festival', group: 'campaign' })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <Target size={16} />
            Create Campaign
          </button>
          <button
            type="button"
            onClick={() => openCreate({ id: 'ad_image', group: 'ad' })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <Megaphone size={16} />
            Create Advertisement
          </button>
          <button
            type="button"
            onClick={() => openCreate({ id: 'banner_home', group: 'banner' })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <Image size={16} />
            Create Banner
          </button>
          <button
            type="button"
            onClick={() => openCreate({ id: 'sponsor_product', group: 'sponsored' })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <Star size={16} />
            Sponsored Product
          </button>
          <ExportReportButton moduleKey="coupons" />
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-2.5 text-sm font-semibold"
          >
            <Sparkles size={16} />
            AI Assist
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowAllCards((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold"
        >
          <LayoutGrid size={13} />
          {showAllCards ? 'Primary KPIs' : 'All KPIs'}
        </button>
        <button
          type="button"
          onClick={() => setShowAnalytics((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold"
        >
          <BarChart3 size={13} />
          {showAnalytics ? 'Hide Analytics' : 'Analytics'}
        </button>
        {selectedIds.size > 0 ? (
          <>
            <button type="button" onClick={() => handleBulk('activate')} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold">
              Activate ({selectedIds.size})
            </button>
            <button type="button" onClick={() => handleBulk('pause')} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold">
              Pause
            </button>
            <button type="button" onClick={() => handleBulk('delete')} className="rounded-lg border border-red-200 text-red-600 px-2.5 py-1.5 text-xs font-semibold">
              Delete
            </button>
          </>
        ) : null}
      </div>

      <CouponSummaryCards
        cards={summary}
        loading={summaryLoading}
        primaryOnly={!showAllCards}
        activeKey={activeCard}
        onCardClick={(card) => {
          setActiveCard((k) => (k === card.key ? null : card.key));
          if (card.key === 'active') {
            setFilters((f) => ({ ...f, status: 'active', kind: 'coupon' }));
            setPage(1);
          }
        }}
      />

      {showAnalytics ? (
        <CouponAnalytics
          data={analytics}
          loading={analyticsLoading}
          range={analyticsRange}
          onRangeChange={setAnalyticsRange}
        />
      ) : null}

      <CouponFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filters={filters}
        onChange={(next) => {
          setFilters(next);
          setPage(1);
        }}
        counts={meta.counts}
      />

      <CouponTable
        items={items}
        loading={listLoading}
        selectedIds={selectedIds}
        onToggle={toggleId}
        onToggleAll={toggleAll}
        onSort={handleSort}
        sortBy={sortBy}
        sortDir={sortDir}
        page={meta.page || page}
        pageSize={pageSize}
        totalPages={meta.totalPages || 1}
        total={meta.total || 0}
        onPageChange={setPage}
        onPageSizeChange={(n) => {
          setPageSize(n);
          setPage(1);
        }}
        onAction={handleAction}
        loadingId={loadingId}
      />

      <CouponWizard
        open={couponWizardOpen}
        onClose={() => {
          setCouponWizardOpen(false);
          setEditItem(null);
        }}
        initialTypeId={couponTypeId}
        editItem={editItem?.kind === 'coupon' ? editItem : null}
        onSaved={() => {
          notify('Campaign Started', 'Coupon published');
          refresh();
        }}
      />

      <PromoAssetWizard
        open={assetOpen}
        onClose={() => {
          setAssetOpen(false);
          setEditItem(null);
        }}
        typeId={assetTypeId}
        editItem={editItem && editItem.kind !== 'coupon' ? editItem : null}
        onSaved={(data) => {
          notify('Banner Approved', data?.name || 'Promotion published');
          refresh();
        }}
      />

      <ViewPromoModal
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        item={viewItem}
        onEdit={(item) => {
          setViewItem(null);
          handleAction('edit', item);
        }}
      />

      <MarketingAssistant
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onUse={() => {
          /* suggestions applied inside assistant via toast; user can paste into wizards */
        }}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        confirmLabel={confirmState?.confirmLabel}
        danger={!!confirmState?.danger}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />
    </div>
  );
}
