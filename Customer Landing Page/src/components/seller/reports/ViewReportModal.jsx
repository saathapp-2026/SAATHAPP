import React from 'react';
import { X, Download, Printer, Share2 } from 'lucide-react';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { formatBytes, formatINR, formatReportTime, FORMAT_STYLES } from '../../../config/seller/reportConstants';

export default function ViewReportModal({ open, onClose, report, onDownload, onPrint, onShare }) {
  if (!report) return null;
  const summary = report.preview?.summary || {};

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="view-report-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-2xl rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 px-5 py-4">
          <div>
            <h2 id="view-report-title" className="text-lg font-bold">{report.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {report.dateFrom} → {report.dateTo} · {formatReportTime(report.generatedOn)}
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-2 py-0.5 font-semibold uppercase ${FORMAT_STYLES[report.format]}`}>
              {report.format}
            </span>
            <span className="rounded-full bg-page px-2 py-0.5">
              {formatBytes(report.size)}
            </span>
            <span className="rounded-full bg-page px-2 py-0.5">
              {report.pages} pages · {report.rows} rows
            </span>
            <span className="rounded-full bg-page px-2 py-0.5">
              By {report.generatedBy}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              ['Revenue', formatINR(summary.revenue)],
              ['Orders', summary.orders],
              ['GST', formatINR(summary.gst)],
              ['Margin', `${summary.margin}%`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-200 p-3">
                <p className="text-[10px] text-slate-500">{k}</p>
                <p className="text-sm font-bold mt-0.5">{v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-page dark:bg-slate-950 text-left text-[11px] uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Metric</th>
                  <th className="px-3 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {(report.preview?.rows || []).map((r) => (
                  <tr key={r.label} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-2">{r.label}</td>
                    <td className="px-3 py-2 tabular-nums font-medium">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onDownload?.(report)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs font-semibold"
            >
              <Download size={13} /> Download
            </button>
            <button
              type="button"
              onClick={() => onPrint?.(report)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold"
            >
              <Printer size={13} /> Print
            </button>
            <button
              type="button"
              onClick={() => onShare?.(report)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold"
            >
              <Share2 size={13} /> Share
            </button>
          </div>
        </div>
      </div>
    </SellerOverlay>
  );
}
