import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Upload, RefreshCw, ChevronDown, Shield } from 'lucide-react';
import {
  DocumentSummaryCards,
  DocumentFilters,
  DocumentTable,
  DocumentViewerDrawer,
  UploadDocumentWizard,
  BulkUploadModal,
  ComplianceProgress,
} from '../../../components/seller/documents';
import { ExportReportButton } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getDocumentSummary,
  getDocuments,
  getComplianceCenter,
  deleteDocument,
  duplicateDocument,
  verifyDocumentStatuses,
  downloadDocumentBlob,
  restoreVersion,
} from '../../../services/seller/sellerDocumentsService';
import { addNotification } from '../../../services/sellerNotificationService';
import { DOC_STATUSES } from '../../../config/seller/documentConstants';

const DEFAULT_FILTERS = {
  status: 'all',
  categoryId: 'all',
  typeId: 'all',
  expiry: 'all',
  dateFrom: '',
  dateTo: '',
  cardKey: null,
};

export default function DocumentsPage() {
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('uploadedAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, page: 1 });
  const [listLoading, setListLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const [compliance, setCompliance] = useState(null);
  const [complianceLoading, setComplianceLoading] = useState(true);
  const [showCompliance, setShowCompliance] = useState(true);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [replaceItem, setReplaceItem] = useState(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [showVersions, setShowVersions] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const query = useMemo(
    () => ({ ...filters, search, sortBy, sortDir, page, pageSize }),
    [filters, search, sortBy, sortDir, page, pageSize]
  );

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getDocumentSummary();
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
      const res = await getDocuments(query);
      setRows(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1, page: 1 });
    } catch {
      toast.error('Failed to load documents');
    } finally {
      setListLoading(false);
    }
  }, [query]);

  const loadCompliance = useCallback(async () => {
    setComplianceLoading(true);
    try {
      const res = await getComplianceCenter();
      setCompliance(res.data);
    } catch {
      toast.error('Failed to load compliance');
    } finally {
      setComplianceLoading(false);
    }
  }, []);

  const refreshAll = useCallback(() => {
    loadSummary();
    loadList();
    loadCompliance();
  }, [loadSummary, loadList, loadCompliance]);

  useEffect(() => {
    loadSummary();
    loadCompliance();
  }, [loadSummary, loadCompliance]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const onCardClick = (card) => {
    if (card.key === 'compliance') {
      setShowCompliance(true);
      setActiveCard(card.key);
      return;
    }
    const next = activeCard === card.key ? null : card.key;
    setActiveCard(next);
    setFilters((f) => ({ ...f, cardKey: next }));
    setPage(1);
  };

  const onSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const toggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      rows.forEach((r) => {
        if (checked) next.add(r.id);
        else next.delete(r.id);
      });
      return next;
    });
  };

  const openUpload = () => {
    setEditItem(null);
    setReplaceItem(null);
    setWizardOpen(true);
  };

  const handleAction = (action, row) => {
    switch (action) {
      case 'view':
        setShowVersions(false);
        setViewItem(row);
        break;
      case 'download':
        downloadDocumentBlob(row);
        toast.success('Download started');
        addNotification({ title: 'Document downloaded', body: row.name });
        break;
      case 'edit':
        setReplaceItem(null);
        setEditItem(row);
        setWizardOpen(true);
        break;
      case 'replace':
        if (row.status === DOC_STATUSES.VERIFIED) {
          setConfirmState({
            title: 'Replace verified document?',
            message: `${row.name} is verified. Replacing will send it back for review.`,
            confirmLabel: 'Replace',
            onConfirm: () => {
              setConfirmState(null);
              setEditItem(null);
              setReplaceItem(row);
              setWizardOpen(true);
            },
          });
        } else {
          setEditItem(null);
          setReplaceItem(row);
          setWizardOpen(true);
        }
        break;
      case 'duplicate':
        duplicateDocument(row.id)
          .then(() => {
            toast.success('Document duplicated as draft');
            refreshAll();
          })
          .catch((e) => toast.error(e.message || 'Duplicate failed'));
        break;
      case 'share':
        navigator.clipboard?.writeText(`${window.location.origin}/seller/dashboard/documents?id=${row.id}`);
        toast.success('Share link copied');
        break;
      case 'print':
        window.print();
        toast.success('Print dialog opened');
        break;
      case 'versions':
        setShowVersions(true);
        setViewItem(row);
        break;
      case 'delete':
        setConfirmState({
          title: 'Delete draft?',
          message: `Delete ${row.name}? This cannot be undone.`,
          confirmLabel: 'Delete',
          danger: true,
          onConfirm: async () => {
            try {
              await deleteDocument(row.id);
              toast.success('Deleted');
              setConfirmState(null);
              refreshAll();
            } catch (e) {
              toast.error(e.message || 'Delete failed');
            }
          },
        });
        break;
      default:
        break;
    }
  };

  const onVerifyStatus = async () => {
    setVerifying(true);
    try {
      const res = await verifyDocumentStatuses();
      toast.success(`Status refreshed · ${res.data.changed} updated`);
      addNotification({
        title: 'Verification status refreshed',
        body: `${res.data.changed} document(s) updated for expiry`,
      });
      refreshAll();
    } catch {
      toast.error('Verify failed');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <nav className="text-xs text-slate-500 mb-1" aria-label="Breadcrumb">
            Dashboard <span className="mx-1">›</span> Documents
          </nav>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Documents</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Business documents, compliance files, and verification center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openUpload}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3.5 py-2 text-sm font-semibold hover:bg-emerald-700"
          >
            <Plus size={16} /> Upload Document
          </button>
          <button
            type="button"
            onClick={() => setBulkOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Upload size={16} /> Import Documents
          </button>
          <ExportReportButton moduleKey="documents" label="Export Report" />
          <button
            type="button"
            disabled={verifying}
            onClick={onVerifyStatus}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
          >
            <RefreshCw size={16} className={verifying ? 'animate-spin' : ''} /> Verify Status
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <DocumentSummaryCards
          cards={summary}
          loading={summaryLoading}
          onCardClick={onCardClick}
          activeKey={activeCard}
          primaryOnly={!showAllCards}
        />
        <button
          type="button"
          onClick={() => setShowAllCards((v) => !v)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
        >
          <ChevronDown size={14} className={showAllCards ? 'rotate-180' : ''} />
          {showAllCards ? 'Show fewer cards' : 'Show all summary cards'}
        </button>
      </div>

      {showCompliance ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 inline-flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-600" /> Compliance overview
            </p>
            <button
              type="button"
              onClick={() => setShowCompliance(false)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Hide
            </button>
          </div>
          <ComplianceProgress
            data={compliance}
            loading={complianceLoading}
            onOpenDoc={(doc) => {
              setShowVersions(false);
              setViewItem(doc);
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowCompliance(true)}
          className="text-sm font-semibold text-emerald-700 dark:text-emerald-400"
        >
          Show Compliance Center
        </button>
      )}

      <DocumentFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        onReset={() => {
          setFilters(DEFAULT_FILTERS);
          setSearch('');
          setActiveCard(null);
          setPage(1);
        }}
      />

      <DocumentTable
        rows={rows}
        loading={listLoading}
        selectedIds={selectedIds}
        onToggle={toggle}
        onToggleAll={toggleAll}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={onSort}
        page={page}
        pageSize={pageSize}
        meta={meta}
        onPage={setPage}
        onPageSize={(n) => {
          setPageSize(n);
          setPage(1);
        }}
        onAction={handleAction}
      />

      <UploadDocumentWizard
        open={wizardOpen}
        editItem={editItem}
        replaceItem={replaceItem}
        onClose={() => {
          setWizardOpen(false);
          setEditItem(null);
          setReplaceItem(null);
        }}
        onSubmitted={({ draft }) => {
          toast.success(draft ? 'Draft saved' : 'Document submitted for verification');
          addNotification({
            title: draft ? 'Document draft saved' : 'Upload successful',
            body: draft
              ? 'Your document draft was saved.'
              : 'Document is pending admin review.',
          });
          refreshAll();
        }}
      />

      <BulkUploadModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onDone={(data) => {
          toast.success(`Imported ${data.success?.length || 0} file(s)`);
          addNotification({
            title: 'Bulk upload complete',
            body: `${data.success?.length || 0} documents queued for review`,
          });
          refreshAll();
        }}
      />

      <DocumentViewerDrawer
        open={!!viewItem}
        document={viewItem}
        showVersions={showVersions}
        onClose={() => {
          setViewItem(null);
          setShowVersions(false);
        }}
        onDownload={(doc) => {
          downloadDocumentBlob(doc);
          toast.success('Download started');
        }}
        onPrint={() => {
          window.print();
        }}
        onRestoreVersion={async (doc, version) => {
          try {
            await restoreVersion(doc.id, version.version);
            toast.success(`Restored version ${version.version}`);
            addNotification({
              title: 'Version restored',
              body: `${doc.name} restored to v${version.version}`,
            });
            setViewItem(null);
            refreshAll();
          } catch (e) {
            toast.error(e.message || 'Restore failed');
          }
        }}
      />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        confirmLabel={confirmState?.confirmLabel}
        danger={confirmState?.danger}
        onConfirm={confirmState?.onConfirm}
        onCancel={() => setConfirmState(null)}
      />
    </div>
  );
}
