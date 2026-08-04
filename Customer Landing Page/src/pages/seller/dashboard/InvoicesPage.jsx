import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Upload, LayoutGrid, BarChart3, PackageCheck, StickyNote } from 'lucide-react';
import {
  InvoiceSummaryCards,
  InvoiceFilters,
  InvoiceTable,
  InvoiceWizard,
  InvoiceAnalytics,
  CreditDebitNoteModal,
  InvoiceImportModal,
  InvoiceBulkBar,
} from '../../../components/seller/invoices';
import { ExportReportButton, ExportReportModal } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getInvoiceSummary,
  getInvoices,
  updateInvoiceStatus,
  deleteInvoice,
  bulkInvoiceAction,
  createDraftsFromDeliveredOrders,
  downloadInvoicePdf,
  printInvoiceDoc,
  buildInvoiceHtml,
} from '../../../services/seller/sellerInvoicesService';
import { generateModuleReport } from '../../../services/seller/reportGeneratorService';
import { addNotification } from '../../../services/sellerNotificationService';
import { INVOICE_STATUS } from '../../../config/seller/invoiceConstants';

const DEFAULT_FILTERS = {
  dateFrom: '',
  dateTo: '',
  status: undefined,
  paymentStatus: undefined,
  gstType: undefined,
  quickTab: 'all',
};

export default function InvoicesPage() {
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('invoiceDate');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [invoices, setInvoices] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, counts: {} });
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [loadingAction, setLoadingAction] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [noteInvoice, setNoteInvoice] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);

  const overlayOpen = !!(wizardOpen || importOpen || exportModalOpen || confirmState || noteInvoice || viewInvoice);

  const queryFilters = useMemo(
    () => ({ ...filters, search, sortBy, sortDir, page, pageSize }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getInvoiceSummary();
      setSummary(res.data || []);
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadInvoices = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await getInvoices(queryFilters);
      setInvoices(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1, counts: {} });
    } catch {
      setError('Failed to load invoices');
    } finally {
      setListLoading(false);
    }
  }, [queryFilters]);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadSummary(), loadInvoices()]);
  }, [loadSummary, loadInvoices]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

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

  const openCreate = () => {
    setEditInvoice(null);
    setWizardOpen(true);
  };

  const handleAction = async (actionId, invoice) => {
    const key = `${invoice.id}:${actionId}`;
    if (actionId === 'view') {
      setViewInvoice(invoice);
      return;
    }
    if (actionId === 'download') {
      downloadInvoicePdf(invoice);
      toast.success('GST invoice downloaded');
      try {
        addNotification({ title: 'Invoice Downloaded', body: invoice.number });
      } catch {
        // ignore
      }
      return;
    }
    if (actionId === 'print') {
      printInvoiceDoc(invoice);
      toast.success('Print opened');
      return;
    }
    if (actionId === 'email') {
      window.open(`mailto:${invoice.customer?.email || ''}?subject=${encodeURIComponent(invoice.number)}`);
      await updateInvoiceStatus(invoice.id, INVOICE_STATUS.SENT);
      toast.success('Email compose opened · marked Sent');
      await refreshAll();
      return;
    }
    if (actionId === 'whatsapp') {
      const phone = String(invoice.customer?.phone || '').replace(/\D/g, '');
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Your invoice ${invoice.number}`)}`, '_blank');
      toast.success('WhatsApp opened');
      return;
    }
    if (actionId === 'excel') {
      const csv = `number,customer,amount,gst,status\n${invoice.number},${invoice.customer?.name},${invoice.totals?.grandTotal},${invoice.totals?.taxTotal},${invoice.status}\n`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoice.number}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Excel/CSV ready');
      return;
    }
    if (actionId === 'edit') {
      if (invoice.status === INVOICE_STATUS.CANCELLED) return toast.error('Cannot edit cancelled invoice');
      setEditInvoice(invoice);
      setWizardOpen(true);
      return;
    }
    if (actionId === 'cancel') {
      setConfirmState({
        title: 'Cancel Invoice',
        message: `Cancel ${invoice.number}?`,
        danger: true,
        onConfirm: async () => {
          setConfirmState(null);
          await runWithLoading(key, () => updateInvoiceStatus(invoice.id, INVOICE_STATUS.CANCELLED), 'Invoice cancelled');
          try {
            addNotification({ title: 'Invoice Cancelled', body: invoice.number });
          } catch {
            // ignore
          }
        },
      });
      return;
    }
    if (actionId === 'delete') {
      setConfirmState({
        title: 'Delete Draft',
        message: `Delete draft ${invoice.number}?`,
        danger: true,
        onConfirm: async () => {
          setConfirmState(null);
          await runWithLoading(key, () => deleteInvoice(invoice.id), 'Draft deleted');
        },
      });
    }
  };

  const handleBulk = (actionId) => {
    const ids = [...selectedIds];
    if (!ids.length) return;
    if (actionId === 'export') {
      generateModuleReport({
        moduleKey: 'invoices',
        format: 'csv',
        selectedIds: ids,
        options: { includeDetails: true, includeAnalytics: true },
      }).then(() => toast.success('Exported selected'));
      return;
    }
    if (actionId === 'zip') {
      const selected = invoices.filter((i) => selectedIds.has(i.id));
      const html = selected.map((inv) => buildInvoiceHtml(inv)).join('\n<hr/>\n');
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoices-bulk-${Date.now()}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Bulk PDF pack downloaded (HTML ZIP placeholder)');
      return;
    }
    setConfirmState({
      title: 'Bulk action',
      message: `Apply "${actionId}" to ${ids.length} invoice(s)?`,
      danger: ['cancel', 'delete_drafts'].includes(actionId),
      onConfirm: async () => {
        setConfirmState(null);
        setLoadingAction('bulk');
        try {
          await bulkInvoiceAction(ids, actionId);
          toast.success('Bulk action complete');
          setSelectedIds(new Set());
          await refreshAll();
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
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your GST invoices and billing documents.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowAllCards((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <LayoutGrid size={15} />
            {showAllCards ? 'Primary Cards' : 'All Metrics'}
          </button>
          <button
            type="button"
            onClick={() => setShowAnalytics((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <BarChart3 size={15} />
            {showAnalytics ? 'Hide Analytics' : 'Analytics'}
          </button>
          <button
            type="button"
            onClick={async () => {
              const res = await createDraftsFromDeliveredOrders();
              toast.success(`Created ${res.data.length} draft invoice(s) from delivered orders`);
              await refreshAll();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            title="Auto-create drafts from delivered orders"
          >
            <PackageCheck size={15} />
            Auto Drafts
          </button>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <Upload size={15} />
            Import
          </button>
          <ExportReportButton moduleKey="invoices" filters={queryFilters} selectedIds={selectedIds.size ? [...selectedIds] : null} />
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            <Plus size={15} />
            Create Invoice
          </button>
        </div>
      </div>

      <InvoiceSummaryCards
        cards={summary}
        loading={summaryLoading}
        activeKey={activeCard}
        primaryOnly={!showAllCards}
        onCardClick={(card) => {
          setActiveCard(card.key);
          setPage(1);
          if (card.filter?.quickTab) {
            setFilters((f) => ({ ...f, quickTab: card.filter.quickTab, status: undefined }));
          }
        }}
      />

      {showAnalytics && <InvoiceAnalytics open={showAnalytics} />}

      <InvoiceFilters
        filters={filters}
        search={search}
        counts={meta.counts}
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
      />

      {error ? (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6 text-center" role="alert">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button type="button" onClick={loadInvoices} className="text-sm font-medium text-red-600 hover:underline">
            Try again
          </button>
        </div>
      ) : (
        <InvoiceTable
          invoices={invoices}
          loading={listLoading}
          selectedIds={selectedIds}
          onToggleSelect={(id) => {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            });
          }}
          onToggleSelectAll={() => {
            setSelectedIds((prev) => {
              if (invoices.every((i) => prev.has(i.id))) return new Set();
              return new Set(invoices.map((i) => i.id));
            });
          }}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={(key) => {
            if (sortBy === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
            else {
              setSortBy(key);
              setSortDir('desc');
            }
          }}
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
          onRowClick={(inv) => setViewInvoice(inv)}
        />
      )}

      <InvoiceBulkBar count={selectedIds.size} onAction={handleBulk} loading={loadingAction === 'bulk'} hidden={overlayOpen} />

      <InvoiceWizard
        open={wizardOpen}
        editInvoice={editInvoice}
        onClose={() => {
          setWizardOpen(false);
          setEditInvoice(null);
        }}
        onSaved={() => refreshAll()}
      />

      <InvoiceImportModal open={importOpen} onClose={() => setImportOpen(false)} onImported={() => refreshAll()} />
      <ExportReportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        moduleKey="invoices"
        filters={queryFilters}
        selectedIds={selectedIds.size ? [...selectedIds] : null}
      />
      <CreditDebitNoteModal
        open={!!noteInvoice}
        invoice={noteInvoice}
        onClose={() => setNoteInvoice(null)}
        onSaved={() => refreshAll()}
      />

      {/* View drawer / revision history */}
      {viewInvoice && (
        <ConfirmDialog
          open={!!viewInvoice}
          title={viewInvoice.number}
          message={`${viewInvoice.customer?.name} · ${viewInvoice.status}`}
          confirmLabel="Download PDF"
          cancelLabel="Close"
          onCancel={() => setViewInvoice(null)}
          onConfirm={() => {
            downloadInvoicePdf(viewInvoice);
            toast.success('Downloaded');
            setViewInvoice(null);
          }}
        >
          <div className="text-xs space-y-2 max-h-48 overflow-y-auto">
            <p className="font-semibold flex items-center gap-1"><StickyNote size={12} /> Revision history</p>
            {(viewInvoice.revisionHistory || []).map((r, i) => (
              <p key={`${r.action}-${i}`} className="text-slate-500">
                {r.action} · {r.at ? new Date(r.at).toLocaleString('en-IN') : ''} · {r.by}
              </p>
            ))}
            <button
              type="button"
              className="text-emerald-600 font-semibold"
              onClick={() => {
                setNoteInvoice(viewInvoice);
                setViewInvoice(null);
              }}
            >
              Add Credit / Debit Note
            </button>
          </div>
        </ConfirmDialog>
      )}

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
