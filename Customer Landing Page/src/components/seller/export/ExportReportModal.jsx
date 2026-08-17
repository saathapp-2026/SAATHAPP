import React, { useMemo, useState } from 'react';
import { X, FileText, Table2, FileSpreadsheet, FileType, Presentation, Printer, Braces, Eye, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { DATE_RANGE_OPTIONS, EXPORT_FORMATS } from '../../../config/seller/customerConstants';
import { generateModuleReport, previewModuleReport } from '../../../services/seller/reportGeneratorService';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';

const FORMAT_ICONS = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: Table2,
  word: FileType,
  ppt: Presentation,
  json: Braces,
  print: Printer,
};

const DEFAULT_OPTIONS = {
  includeAnalytics: true,
  includeDetails: true,
  includeCharts: true,
  includeTransactions: false,
  includeOrders: true,
};

export default function ExportReportModal({
  open,
  onClose,
  moduleKey = 'customers',
  initialFormat = 'pdf',
  filters = {},
  selectedIds = null,
}) {
  const [format, setFormat] = useState(initialFormat);
  const [dateRange, setDateRange] = useState(filters.dateRange || 'this_month');
  const [customRange, setCustomRange] = useState(filters.customRange || { from: '', to: '' });
  const [customerType, setCustomerType] = useState(filters.type || 'all');
  const [status, setStatus] = useState(filters.status || 'active');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const mergedFilters = useMemo(
    () => ({
      ...filters,
      dateRange,
      customRange,
      type: customerType === 'all' ? filters.type : customerType,
      status: status === 'all' ? undefined : status,
    }),
    [filters, dateRange, customRange, customerType, status]
  );

  if (!open) return null;

  const toggleOpt = (key) => setOptions((o) => ({ ...o, [key]: !o[key] }));

  const handlePreview = async () => {
    setLoading(true);
    try {
      const res = await previewModuleReport({
        moduleKey,
        filters: mergedFilters,
        selectedIds,
        options,
      });
      if (res.success) {
        setPreview(res.data);
        toast.success('Preview ready');
      }
    } catch {
      toast.error('Preview failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateModuleReport({
        moduleKey,
        format,
        filters: mergedFilters,
        selectedIds,
        options,
      });
      if (res.success) {
        toast.success(format === 'print' ? 'Print dialog opened' : 'Report generated');
        onClose?.();
      } else toast.error('Failed to generate report');
    } catch {
      toast.error('Export failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="export-report-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-[1] flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 backdrop-blur">
          <div>
            <h2 id="export-report-title" className="font-bold text-lg">Export Report</h2>
            <p className="text-xs text-slate-500 mt-0.5">Configure filters and generate a downloadable report</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Format</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXPORT_FORMATS.map((f) => {
                const Icon = FORMAT_ICONS[f.id] || FileText;
                const active = format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                      active
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                        : 'border-slate-200 hover:bg-page'
                    }`}
                  >
                    <Icon size={15} />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Date Filters</p>
            <div className="flex flex-wrap gap-2">
              {DATE_RANGE_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDateRange(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    dateRange === d.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30'
                      : 'border-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <label className="text-xs text-slate-500">
                  From
                  <input
                    type="date"
                    value={customRange.from}
                    onChange={(e) => setCustomRange((r) => ({ ...r, from: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-xs text-slate-500">
                  To
                  <input
                    type="date"
                    value={customRange.to}
                    onChange={(e) => setCustomRange((r) => ({ ...r, to: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  />
                </label>
              </div>
            )}
          </div>

          {moduleKey === 'customers' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-xs text-slate-500">
                Customer Type
                <select
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="repeat">Repeat</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <label className="text-xs text-slate-500">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="deleted">Deleted</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Options</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                ['includeAnalytics', 'Include Analytics'],
                ['includeDetails', 'Include Customer Details'],
                ['includeCharts', 'Include Charts'],
                ['includeTransactions', 'Include Transaction History'],
                ['includeOrders', 'Include Order History'],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm rounded-lg border border-slate-200 px-3 py-2">
                  <input type="checkbox" checked={!!options[key]} onChange={() => toggleOpt(key)} className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {preview && (
            <div className="rounded-xl border border-slate-200 bg-page  p-4 text-sm space-y-2">
              <p className="font-semibold">{preview.module?.title} · {preview.totalRows} rows</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <span>Total: <b>{preview.summary.totalCustomers}</b></span>
                <span>New: <b>{preview.summary.newCustomers}</b></span>
                <span>Repeat: <b>{preview.summary.repeatBuyers}</b></span>
                <span>VIP: <b>{preview.summary.vipCustomers}</b></span>
                <span>Revenue: <b>₹{preview.summary.totalRevenue?.toLocaleString('en-IN')}</b></span>
                <span>AOV: <b>₹{preview.summary.averageOrderValue?.toLocaleString('en-IN')}</b></span>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-white/95">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-slate-200 hover:bg-page">
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handlePreview}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-page disabled:opacity-50"
          >
            <Eye size={14} />
            Preview Report
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            <Download size={14} />
            {loading ? 'Generating…' : 'Generate Report'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
