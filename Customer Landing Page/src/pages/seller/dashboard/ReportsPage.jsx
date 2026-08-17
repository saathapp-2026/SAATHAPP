import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  FilePlus2,
  CalendarPlus,
  Share2,
  MoreHorizontal,
  BarChart3,
  Archive,
  Bookmark,
  Layers,
  LayoutGrid,
} from 'lucide-react';
import {
  ReportSummaryCards,
  BusinessOverview,
  ReportCatalog,
  ReportTable,
  ReportWizard,
  ScheduleReportModal,
  ShareReportModal,
  ReportsRightPanel,
  ReportAnalytics,
  SavedTemplatesModal,
  ViewReportModal,
} from '../../../components/seller/reports';
import { ExportReportButton, ExportReportModal } from '../../../components/seller/export';
import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';
import {
  getReportSummary,
  getBusinessOverview,
  getReportCatalog,
  getGeneratedReports,
  getReportAnalytics,
  getSchedules,
  getRecentDownloads,
  deleteReport,
  bulkDownloadZip,
  downloadReportFile,
  printReport,
  generateReport,
  generateAllReports,
  updateScheduleStatus,
  deleteSchedule,
  emptyWizardDraft,
} from '../../../services/seller/sellerReportsService';
import { addNotification } from '../../../services/sellerNotificationService';

export default function ReportsPage() {
  const [summary, setSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);

  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(true);

  const [catalog, setCatalog] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  const [reports, setReports] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, page: 1 });
  const [listLoading, setListLoading] = useState(true);
  const [sortBy, setSortBy] = useState('generatedOn');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loadingId, setLoadingId] = useState(null);

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsRange, setAnalyticsRange] = useState('monthly');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardTypeId, setWizardTypeId] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [shareReport, setShareReport] = useState(null);
  const [viewReport, setViewReport] = useState(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [busyGlobal, setBusyGlobal] = useState(false);

  const overlayOpen = !!(
    wizardOpen || scheduleOpen || shareReport || viewReport || templatesOpen || exportModalOpen || confirmState
  );

  const query = useMemo(() => ({ sortBy, sortDir, page, pageSize }), [sortBy, sortDir, page, pageSize]);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getReportSummary();
      setSummary(res.data || []);
    } catch {
      toast.error('Failed to load summary');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadOverview = useCallback(async () => {
    setOverviewLoading(true);
    try {
      const res = await getBusinessOverview();
      setOverview(res.data);
    } catch {
      toast.error('Failed to load overview');
    } finally {
      setOverviewLoading(false);
    }
  }, []);

  const loadCatalog = useCallback(async () => {
    setCatalogLoading(true);
    try {
      const res = await getReportCatalog();
      setCatalog(res.data || []);
    } catch {
      toast.error('Failed to load catalog');
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  const loadReports = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await getGeneratedReports(query);
      setReports(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1, page: 1 });
    } catch {
      toast.error('Failed to load reports');
    } finally {
      setListLoading(false);
    }
  }, [query]);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await getReportAnalytics(analyticsRange);
      setAnalytics(res.data);
    } catch {
      toast.error('Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  }, [analyticsRange]);

  const loadSide = useCallback(async () => {
    try {
      const [sch, dl] = await Promise.all([getSchedules(), getRecentDownloads()]);
      setSchedules(sch.data || []);
      setDownloads(dl.data || []);
    } catch {
      // non-blocking
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadSummary(), loadOverview(), loadCatalog(), loadReports(), loadSide()]);
  }, [loadSummary, loadOverview, loadCatalog, loadReports, loadSide]);

  useEffect(() => {
    loadSummary();
    loadOverview();
    loadCatalog();
    loadSide();
  }, [loadSummary, loadOverview, loadCatalog, loadSide]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

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

  const openWizard = (typeId) => {
    setWizardTypeId(typeId || null);
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

  const handleAction = async (action, report) => {
    setLoadingId(report.id);
    try {
      if (action === 'view') setViewReport(report);
      else if (action === 'download') {
        downloadReportFile(report, report.format);
        toast.success('Download started');
        notify('Download Completed', `${report.name} downloaded`);
        loadSide();
      } else if (action === 'print') {
        printReport(report);
        toast.success('Print dialog opened');
      } else if (action === 'share' || action === 'email') {
        setShareReport(report);
      } else if (action === 'regenerate') {
        const res = await generateReport({
          typeId: report.typeId,
          format: report.format,
          dateFrom: report.dateFrom,
          dateTo: report.dateTo,
          ...report.filters,
        });
        if (res.success) {
          toast.success('Report regenerated');
          notify('Report Generated', `${report.name} regenerated`);
          refreshAll();
        }
      } else if (action === 'delete') {
        setConfirmState({
          title: 'Delete report?',
          message: `Delete "${report.name}"? This cannot be undone.`,
          danger: true,
          confirmLabel: 'Delete',
          onConfirm: async () => {
            await deleteReport(report.id);
            toast.success('Report deleted');
            setConfirmState(null);
            refreshAll();
          },
        });
      }
    } catch {
      toast.error('Action failed');
      notify('Report Failed', `Action failed for ${report.name}`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleBulkZip = async () => {
    const ids = reports.map((r) => r.id);
    if (!ids.length) {
      toast.error('No reports to download');
      return;
    }
    setBusyGlobal(true);
    try {
      await bulkDownloadZip(ids.slice(0, 8));
      toast.success('Bulk archive downloaded');
      notify('Download Completed', 'Reports bundled');
      loadSide();
    } catch {
      toast.error('Bulk download failed');
    } finally {
      setBusyGlobal(false);
      setMoreOpen(false);
    }
  };

  const handleGenerateAll = async () => {
    setBusyGlobal(true);
    try {
      const res = await generateAllReports();
      toast.success(`Generated ${res.data?.length || 0} reports`);
      notify('Report Generated', 'Major reports generated');
      refreshAll();
    } catch {
      toast.error('Generate all failed');
    } finally {
      setBusyGlobal(false);
      setMoreOpen(false);
    }
  };

  const handleScheduleAction = async (action, schedule) => {
    try {
      if (action === 'pause') {
        await updateScheduleStatus(schedule.id, 'paused');
        toast.success('Schedule paused');
      } else if (action === 'enable') {
        await updateScheduleStatus(schedule.id, 'active');
        toast.success('Schedule enabled');
      } else if (action === 'delete') {
        setConfirmState({
          title: 'Delete schedule?',
          message: `Remove "${schedule.name}"?`,
          danger: true,
          confirmLabel: 'Delete',
          onConfirm: async () => {
            await deleteSchedule(schedule.id);
            toast.success('Schedule deleted');
            setConfirmState(null);
            loadSide();
          },
        });
        return;
      }
      loadSide();
    } catch {
      toast.error('Schedule action failed');
    }
  };

  const handleQuickSideGenerate = (payload) => {
    setWizardTypeId(payload.typeId);
    setWizardOpen(true);
  };

  return (
    <div className="space-y-5 pb-24 lg:pb-8">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Generate and download detailed business reports.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openWizard()}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm"
          >
            <FilePlus2 size={16} />
            Generate Report
          </button>
          <ExportReportButton moduleKey="reports" />
          <button
            type="button"
            onClick={() => setScheduleOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <CalendarPlus size={16} />
            Schedule Report
          </button>
          <button
            type="button"
            onClick={() => {
              if (reports[0]) setShareReport(reports[0]);
              else toast.error('Generate a report first');
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            <Share2 size={16} />
            Share Report
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-surface p-2.5 shadow-sm"
              aria-label="More actions"
            >
              <MoreHorizontal size={16} />
            </button>
            {moreOpen ? (
              <>
                <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setMoreOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-surface shadow-xl py-1">
                  <button type="button" onClick={() => { setShowAnalytics((v) => !v); setMoreOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page">
                    <BarChart3 size={13} /> {showAnalytics ? 'Hide Analytics' : 'Analytics'}
                  </button>
                  <button type="button" onClick={() => { setShowAllCards((v) => !v); setMoreOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page">
                    <LayoutGrid size={13} /> {showAllCards ? 'Primary KPIs' : 'All KPIs'}
                  </button>
                  <button type="button" disabled={busyGlobal} onClick={handleGenerateAll} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page disabled:opacity-50">
                    <Layers size={13} /> Generate All
                  </button>
                  <button type="button" disabled={busyGlobal} onClick={handleBulkZip} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page disabled:opacity-50">
                    <Archive size={13} /> Bulk ZIP
                  </button>
                  <button type="button" onClick={() => { setTemplatesOpen(true); setMoreOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page">
                    <Bookmark size={13} /> Templates
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <ReportSummaryCards
        cards={summary}
        loading={summaryLoading}
        primaryOnly={!showAllCards}
        activeKey={activeCard}
        onCardClick={(card) => {
          setActiveCard((k) => (k === card.key ? null : card.key));
          if (card.key === 'generated') setPage(1);
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5">
        <div className="space-y-5 min-w-0">
          <BusinessOverview data={overview} loading={overviewLoading} />

          {showAnalytics ? (
            <ReportAnalytics
              data={analytics}
              loading={analyticsLoading}
              range={analyticsRange}
              onRangeChange={setAnalyticsRange}
            />
          ) : null}

          <ReportCatalog
            items={catalog}
            loading={catalogLoading}
            showAll={showAllCatalog}
            onToggleAll={() => setShowAllCatalog((v) => !v)}
            onGenerate={(item) => openWizard(item.id)}
          />

          <ReportTable
            reports={reports}
            loading={listLoading}
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
        </div>

        <ReportsRightPanel
          onGenerate={handleQuickSideGenerate}
          onQuickType={(id) => openWizard(id)}
          schedules={schedules}
          downloads={downloads}
          onScheduleAction={handleScheduleAction}
          onViewAllSchedules={() => setScheduleOpen(true)}
          onViewAllDownloads={() => toast.success(`${downloads.length} downloads in history`)}
        />
      </div>

      <ReportWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        initialTypeId={wizardTypeId}
        onGenerated={() => {
          notify('Report Generated', 'New report is ready');
          refreshAll();
        }}
      />

      <ScheduleReportModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onSaved={() => {
          notify('Report Scheduled', 'Schedule saved');
          loadSide();
        }}
      />

      <ShareReportModal open={!!shareReport} onClose={() => setShareReport(null)} report={shareReport} />

      <ViewReportModal
        open={!!viewReport}
        onClose={() => setViewReport(null)}
        report={viewReport}
        onDownload={(r) => {
          downloadReportFile(r, r.format);
          toast.success('Download started');
          loadSide();
        }}
        onPrint={(r) => printReport(r)}
        onShare={(r) => {
          setViewReport(null);
          setShareReport(r);
        }}
      />

      <SavedTemplatesModal
        open={templatesOpen}
        onClose={() => setTemplatesOpen(false)}
        draftSeed={emptyWizardDraft()}
        onApply={(tpl) => {
          setWizardTypeId(tpl.typeId);
          setWizardOpen(true);
        }}
      />

      <ExportReportModal open={exportModalOpen} onClose={() => setExportModalOpen(false)} moduleKey="reports" />

      <ConfirmDialog
        open={!!confirmState}
        title={confirmState?.title}
        message={confirmState?.message}
        confirmLabel={confirmState?.confirmLabel}
        danger={!!confirmState?.danger}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm}
      />

      <span className="sr-only" aria-hidden={!overlayOpen}>
        {overlayOpen ? 'Modal open' : 'Ready'}
      </span>
    </div>
  );
}
