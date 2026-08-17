import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Upload, LayoutGrid } from 'lucide-react';
import {
  CustomerSummaryCards,
  CustomerFilters,
  CustomerTable,
  CustomerProfileDrawer,
  CustomerAnalytics,
  CustomerBulkBar,
  CustomerImportModal,
  CustomerNotifyModal,
  AddCustomerModal,
} from '../../../components/seller/customers';
import { ExportReportButton, ExportReportModal } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getCustomerSummary,
  getCustomers,
  updateCustomer,
  bulkUpdateCustomers,
} from '../../../services/seller/sellerCustomersService';
import { generateModuleReport } from '../../../services/seller/reportGeneratorService';
import { addNotification } from '../../../services/sellerNotificationService';
import { SELLER_DASHBOARD_ROUTES } from '../../../config/seller/sellerRoutes';

const DEFAULT_FILTERS = {
  dateRange: 'all',
  customRange: { from: '', to: '' },
  status: undefined,
  type: undefined,
  city: undefined,
  state: undefined,
  quickTab: 'all',
  dateField: 'registered',
  minOrders: '',
  minSpent: '',
  maxSpent: '',
  minAov: '',
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('lastOrderAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, counts: {} });
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyIds, setNotifyIds] = useState([]);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const overlayOpen = !!(
    addOpen ||
    importOpen ||
    notifyOpen ||
    exportModalOpen ||
    drawerOpen ||
    confirmState
  );

  const queryFilters = useMemo(
    () => ({
      ...filters,
      search,
      sortBy,
      sortDir,
      page,
      pageSize,
      includeDeleted: filters.status === 'deleted' || filters.quickTab === 'deleted',
    }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getCustomerSummary();
      setSummary(res.data || []);
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadCustomers = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await getCustomers(queryFilters);
      setCustomers(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1, counts: {} });
    } catch {
      setError('Failed to load customers');
    } finally {
      setListLoading(false);
    }
  }, [queryFilters]);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadSummary(), loadCustomers()]);
  }, [loadSummary, loadCustomers]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setAddOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const runWithLoading = async (key, fn, successMsg) => {
    setLoadingAction(key);
    try {
      const res = await fn();
      if (res?.success) {
        if (successMsg) toast.success(successMsg);
        await refreshAll();
      } else toast.error(res?.error || 'Action failed');
      return res;
    } catch {
      toast.error('Action failed');
      return null;
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCardClick = (card) => {
    setActiveCard(card.key);
    setPage(1);
    if (card.filter?.quickTab) {
      setFilters((f) => ({ ...f, quickTab: card.filter.quickTab, type: undefined, status: undefined }));
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (customers.every((c) => prev.has(c.id))) return new Set();
      return new Set(customers.map((c) => c.id));
    });
  };

  const openProfile = (customer) => {
    setSelected(customer);
    setDrawerOpen(true);
  };

  const handleAction = async (actionId, customer) => {
    const key = `${customer.id}:${actionId}`;
    if (actionId === 'profile') {
      openProfile(customer);
      return;
    }
    if (actionId === 'orders') {
      navigate(`${SELLER_DASHBOARD_ROUTES.orders}?customer=${encodeURIComponent(customer.id)}`);
      toast(`Opening orders for ${customer.name}`, { icon: '📦' });
      return;
    }
    if (actionId === 'chat') {
      toast('Chat opened (placeholder API)', { icon: '💬' });
      return;
    }
    if (actionId === 'call') {
      window.open(`tel:${String(customer.phone).replace(/\s/g, '')}`);
      return;
    }
    if (actionId === 'email') {
      window.open(`mailto:${customer.email}`);
      return;
    }
    if (actionId === 'address') {
      openProfile(customer);
      toast(`Address: ${customer.address}, ${customer.city}`);
      return;
    }
    if (actionId === 'report') {
      await generateModuleReport({
        moduleKey: 'customers',
        format: 'pdf',
        selectedIds: [customer.id],
        options: { includeDetails: true, includeAnalytics: true, includeCharts: true },
      });
      toast.success('Customer report downloaded');
      return;
    }
    if (actionId === 'vip') {
      setConfirmState({
        title: 'Mark as VIP',
        message: `Upgrade ${customer.name} to VIP?`,
        onConfirm: async () => {
          setConfirmState(null);
          await runWithLoading(key, () => updateCustomer(customer.id, { type: 'vip' }), 'Marked as VIP');
        },
      });
      return;
    }
    if (actionId === 'block') {
      const blocking = customer.status !== 'blocked';
      setConfirmState({
        title: blocking ? 'Block Customer' : 'Unblock Customer',
        message: `${blocking ? 'Block' : 'Unblock'} ${customer.name}?`,
        danger: blocking,
        onConfirm: async () => {
          setConfirmState(null);
          await runWithLoading(
            key,
            () => updateCustomer(customer.id, { status: blocking ? 'blocked' : 'active' }),
            blocking ? 'Customer blocked' : 'Customer unblocked'
          );
          if (blocking) {
            try {
              addNotification?.({ title: 'Customer blocked', body: customer.name });
            } catch {
              // ignore
            }
          }
        },
      });
    }
  };

  const handleBulk = (actionId) => {
    const ids = [...selectedIds];
    if (!ids.length) return;

    if (actionId === 'notify' || actionId === 'whatsapp' || actionId === 'email') {
      setNotifyIds(ids);
      setNotifyOpen(true);
      return;
    }
    if (actionId === 'export') {
      generateModuleReport({
        moduleKey: 'customers',
        format: 'csv',
        selectedIds: ids,
        options: { includeDetails: true, includeAnalytics: true },
      }).then(() => toast.success('Selected customers exported'));
      return;
    }

    const danger = ['block', 'delete'].includes(actionId);
    setConfirmState({
      title: 'Bulk action',
      message: `Apply "${actionId}" to ${ids.length} customer(s)?`,
      danger,
      onConfirm: async () => {
        setConfirmState(null);
        setLoadingAction('bulk');
        try {
          const res = await bulkUpdateCustomers(ids, actionId);
          if (res.success) {
            toast.success(`Updated ${ids.length} customer(s)`);
            setSelectedIds(new Set());
            await refreshAll();
          }
        } catch {
          toast.error('Bulk action failed');
        } finally {
          setLoadingAction(null);
        }
      },
    });
  };

  return (
    <div className="space-y-4 pb-8">
      <Toaster position="top-right" toastOptions={{ duration: 2800 }} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-slate-500 text-sm mt-0.5">View and manage your customer database.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowAllCards((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface hover:bg-page"
            title="Toggle all summary cards"
          >
            <LayoutGrid size={15} />
            {showAllCards ? 'Primary Cards' : 'All Metrics'}
          </button>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-surface hover:bg-page"
          >
            <Upload size={15} />
            Import
          </button>
          <ExportReportButton
            moduleKey="customers"
            filters={queryFilters}
            selectedIds={selectedIds.size ? [...selectedIds] : null}
          />
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            <Plus size={15} />
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-4 items-start">
        <div className="space-y-4 min-w-0">
          <CustomerSummaryCards
            cards={summary}
            loading={summaryLoading}
            onCardClick={handleCardClick}
            activeKey={activeCard}
            primaryOnly={!showAllCards}
          />

          <CustomerFilters
            filters={filters}
            search={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
              setActiveCard(null);
            }}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setSearch('');
              setActiveCard(null);
              setPage(1);
            }}
            counts={meta.counts}
          />

          {error ? (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6 text-center" role="alert">
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button type="button" onClick={loadCustomers} className="text-sm font-medium text-red-600 hover:underline">
                Try again
              </button>
            </div>
          ) : (
            <CustomerTable
              customers={customers}
              loading={listLoading}
              search={search}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={toggleSelectAll}
              sortBy={sortBy}
              sortDir={sortDir}
              onSort={handleSort}
              page={page}
              pageSize={pageSize}
              totalPages={meta.totalPages}
              total={meta.total}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setPageSize(n);
                setPage(1);
              }}
              onAction={handleAction}
              loadingAction={loadingAction}
              onRowClick={openProfile}
            />
          )}

          <CustomerBulkBar
            count={selectedIds.size}
            onAction={handleBulk}
            loading={loadingAction === 'bulk'}
            hidden={overlayOpen}
          />
        </div>

        <aside className="xl:sticky xl:top-4 space-y-4">
          <CustomerAnalytics
            compact
            onAdd={() => setAddOpen(true)}
            onImport={() => setImportOpen(true)}
            onExport={() => setExportModalOpen(true)}
            onNotify={() => {
              const ids = selectedIds.size ? [...selectedIds] : customers.slice(0, 1).map((c) => c.id);
              setNotifyIds(ids);
              setNotifyOpen(true);
            }}
          />
        </aside>
      </div>

      <CustomerProfileDrawer
        open={drawerOpen}
        customer={selected}
        onClose={() => setDrawerOpen(false)}
        onAction={handleAction}
        loadingAction={loadingAction}
        onSaveNotes={async (notes) => {
          if (!selected) return;
          const res = await updateCustomer(selected.id, { notes });
          if (res.success) {
            toast.success('Notes saved');
            setSelected(res.data);
            await refreshAll();
          }
        }}
      />

      <AddCustomerModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={() => refreshAll()}
      />
      <CustomerImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImported={() => refreshAll()}
      />
      <CustomerNotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} customerIds={notifyIds} />
      <ExportReportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        moduleKey="customers"
        filters={queryFilters}
        selectedIds={selectedIds.size ? [...selectedIds] : null}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        danger={confirmState?.danger}
        loading={!!loadingAction}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />
    </div>
  );
}
