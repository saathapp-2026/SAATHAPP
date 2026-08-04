import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Plus,
  ChevronDown,
  BarChart3,
  MapPin,
  LayoutGrid,
  Sparkles,
  Library,
} from 'lucide-react';
import {
  AdSummaryCards,
  AdTypeSelector,
  AdFilters,
  AdTable,
  AdsRightPanel,
  AdWizard,
  AdAnalytics,
  AdAiAssistant,
  ViewAdModal,
  ManagePlacementsModal,
  CreativeLibraryModal,
} from '../../../components/seller/advertisements';
import { ExportReportButton } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getAdSummary,
  getAds,
  getTopPerformingAds,
  getAdAnalytics,
  updateAdStatus,
  duplicateAd,
  deleteAd,
  bulkAdAction,
} from '../../../services/seller/sellerAdvertisementsService';
import { addNotification } from '../../../services/sellerNotificationService';
import { AD_TYPES } from '../../../config/seller/adConstants';

const DEFAULT_FILTERS = {
  status: 'all',
  typeId: 'all',
  placement: 'all',
  objective: 'all',
  budgetMin: '',
  budgetMax: '',
};

export default function AdvertisementsPage() {
  const [summary, setSummary] = useState([]);
  const [totals, setTotals] = useState({});
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [ads, setAds] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, page: 1 });
  const [listLoading, setListLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [loadingId, setLoadingId] = useState(null);
  const [topAds, setTopAds] = useState([]);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState('weekly');

  const [createOpen, setCreateOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardTypeId, setWizardTypeId] = useState('banner');
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [placementsOpen, setPlacementsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [enabledPlacements, setEnabledPlacements] = useState([]);

  const query = useMemo(
    () => ({ ...filters, search, sortBy, sortDir, page, pageSize }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getAdSummary();
      setSummary(res.data || []);
      setTotals(res.totals || {});
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadList = useCallback(async () => {
    setListLoading(true);
    try {
      const [listRes, topRes] = await Promise.all([getAds(query), getTopPerformingAds(3)]);
      setAds(listRes.data || []);
      setMeta(listRes.meta || { total: 0, totalPages: 1, page: 1 });
      setTopAds(topRes.data || []);
    } catch {
      toast.error('Failed to load ads');
    } finally {
      setListLoading(false);
    }
  }, [query]);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await getAdAnalytics(analyticsRange);
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

  const openCreate = (typeId) => {
    setEditItem(null);
    setWizardTypeId(typeId || 'banner');
    setCreateOpen(false);
    setWizardOpen(true);
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
      if (ads.every((a) => prev.has(a.id))) return new Set();
      return new Set(ads.map((a) => a.id));
    });
  };

  const handleAction = async (action, ad) => {
    setLoadingId(ad.id);
    try {
      if (action === 'view') setViewItem(ad);
      else if (action === 'edit') {
        setEditItem(ad);
        setWizardTypeId(ad.typeId);
        setWizardOpen(true);
      } else if (action === 'pause') {
        await updateAdStatus(ad.id, 'paused', 'Paused by seller');
        toast.success('Ad paused');
        notify('Campaign Paused', ad.name);
        refresh();
      } else if (action === 'resume') {
        await updateAdStatus(ad.id, 'running', 'Resumed by seller');
        toast.success('Ad resumed');
        notify('Campaign Started', ad.name);
        refresh();
      } else if (action === 'analytics') {
        setShowAnalytics(true);
        toast.success('Analytics opened');
      } else if (action === 'download') {
        const blob = new Blob([JSON.stringify(ad, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${ad.id}-report.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Report downloaded');
      } else if (action === 'duplicate') {
        const res = await duplicateAd(ad.id);
        if (res.success) {
          toast.success('Ad duplicated as draft');
          refresh();
        }
      } else if (action === 'share') {
        const link = `${window.location.origin}/seller/dashboard/advertisements?id=${ad.id}`;
        try {
          await navigator.clipboard.writeText(link);
          toast.success('Share link copied');
        } catch {
          toast.success('Share ready');
        }
      } else if (action === 'delete') {
        setConfirmState({
          title: 'Delete advertisement?',
          message: `Delete “${ad.name}”? This cannot be undone.`,
          danger: true,
          confirmLabel: 'Delete',
          onConfirm: async () => {
            await deleteAd(ad.id);
            toast.success('Deleted');
            setConfirmState(null);
            setSelectedIds((s) => {
              const n = new Set(s);
              n.delete(ad.id);
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

  const handleQuickAction = (id) => {
    if (id === 'create') openCreate('banner');
    else if (id === 'clone') {
      if (ads[0]) handleAction('duplicate', ads[0]);
      else toast.error('No ads to clone');
    } else if (id === 'pause') {
      if (!selectedIds.size) toast.error('Select ads first');
      else bulkAdAction([...selectedIds], 'pause').then(() => { toast.success('Paused selected'); refresh(); });
    } else if (id === 'budget') openCreate('sponsored');
    else if (id === 'reports') setShowAnalytics(true);
  };

  return (
    <div className="space-y-5 pb-24 lg:pb-8">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Advertisements</h1>
          <p className="text-sm text-slate-500 mt-1">Promote your store, products and offers to grow faster</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCreateOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm"
              aria-haspopup="menu"
              aria-expanded={createOpen}
            >
              <Plus size={16} />
              Create Ad
              <ChevronDown size={14} className="opacity-80" />
            </button>
            {createOpen ? (
              <>
                <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setCreateOpen(false)} />
                <div role="menu" className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 max-h-80 overflow-y-auto">
                  {AD_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="menuitem"
                      onClick={() => openCreate(t.id)}
                      className="flex w-full px-3 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setShowAnalytics(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <BarChart3 size={16} />
            Ad Reports
          </button>
          <button
            type="button"
            onClick={() => setPlacementsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <MapPin size={16} />
            Manage Placements
          </button>
          <ExportReportButton moduleKey="advertisements" />
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-2.5 text-sm font-semibold"
          >
            <Sparkles size={16} />
            AI Assist
          </button>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold shadow-sm"
            title="Creative Library"
          >
            <Library size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowAllCards((v) => !v)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-semibold">
          <LayoutGrid size={13} />
          {showAllCards ? 'Primary KPIs' : 'All KPIs'}
        </button>
        {selectedIds.size > 0 ? (
          <>
            <button type="button" onClick={() => bulkAdAction([...selectedIds], 'pause').then(() => { toast.success('Paused'); refresh(); })} className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold">Pause ({selectedIds.size})</button>
            <button type="button" onClick={() => bulkAdAction([...selectedIds], 'resume').then(() => { toast.success('Resumed'); refresh(); })} className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold">Resume</button>
            <button
              type="button"
              onClick={() => setConfirmState({
                title: 'Delete selected ads?',
                message: `Delete ${selectedIds.size} ad(s)?`,
                danger: true,
                confirmLabel: 'Delete',
                onConfirm: async () => {
                  await bulkAdAction([...selectedIds], 'delete');
                  toast.success('Deleted');
                  setSelectedIds(new Set());
                  setConfirmState(null);
                  refresh();
                },
              })}
              className="rounded-lg border border-red-200 text-red-600 px-2.5 py-1.5 text-xs font-semibold"
            >
              Delete
            </button>
          </>
        ) : null}
      </div>

      <AdSummaryCards
        cards={summary}
        loading={summaryLoading}
        primaryOnly={!showAllCards}
        activeKey={activeCard}
        onCardClick={(card) => {
          setActiveCard((k) => (k === card.key ? null : card.key));
          if (card.key === 'active') {
            setFilters((f) => ({ ...f, status: 'active' }));
            setPage(1);
          } else if (card.key === 'paused') {
            setFilters((f) => ({ ...f, status: 'paused' }));
            setPage(1);
          } else if (card.key === 'pending') {
            setFilters((f) => ({ ...f, status: 'submitted' }));
            setPage(1);
          }
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5">
        <div className="space-y-5 min-w-0">
          <AdTypeSelector
            onSelect={(t) => openCreate(t.id)}
            onViewGuide={() => toast.success('Ad guide: pick a type → wizard → submit for review → go live')}
          />

          {showAnalytics ? (
            <AdAnalytics
              data={analytics}
              loading={analyticsLoading}
              range={analyticsRange}
              onRangeChange={setAnalyticsRange}
            />
          ) : null}

          <AdFilters
            search={search}
            onSearch={(v) => { setSearch(v); setPage(1); }}
            filters={filters}
            onChange={(next) => { setFilters(next); setPage(1); }}
            onReset={() => { setFilters(DEFAULT_FILTERS); setSearch(''); setPage(1); }}
          />

          <AdTable
            ads={ads}
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
            onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
            onAction={handleAction}
            loadingId={loadingId}
          />
        </div>

        <AdsRightPanel
          totals={totals}
          topAds={topAds}
          onQuickAction={handleQuickAction}
          onViewAllPerformance={() => setShowAnalytics(true)}
        />
      </div>

      <AdWizard
        open={wizardOpen}
        onClose={() => { setWizardOpen(false); setEditItem(null); }}
        initialTypeId={wizardTypeId}
        editItem={editItem}
        onSaved={(data) => {
          if (data?.status === 'submitted') notify('Campaign Submitted', data.name);
          else if (data?.status === 'running') notify('Campaign Started', data.name);
          refresh();
        }}
      />

      <ViewAdModal
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        ad={viewItem}
        onEdit={(ad) => {
          setViewItem(null);
          handleAction('edit', ad);
        }}
      />

      <ManagePlacementsModal
        open={placementsOpen}
        onClose={() => setPlacementsOpen(false)}
        enabled={enabledPlacements}
        onSave={setEnabledPlacements}
      />

      <AdAiAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
      <CreativeLibraryModal open={libraryOpen} onClose={() => setLibraryOpen(false)} />

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
