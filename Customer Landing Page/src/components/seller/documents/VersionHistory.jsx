import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { formatDate } from '../../../config/seller/documentConstants';

export default function VersionHistory({ versions = [], onDownload, onRestore, canRestore = false }) {
  if (!versions.length) {
    return <p className="text-sm text-slate-500">No versions yet.</p>;
  }

  const sorted = [...versions].sort((a, b) => b.version - a.version);

  return (
    <div className="space-y-3">
      {sorted.map((v, idx) => (
        <div
          key={v.version}
          className="rounded-xl border border-slate-200 p-3 flex items-start justify-between gap-3"
        >
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Version {v.version}
              {idx === 0 ? (
                <span className="ml-2 text-[10px] uppercase tracking-wide text-emerald-600">Current</span>
              ) : null}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{formatDate(v.uploadedAt)}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{v.fileName}</p>
            {v.note ? <p className="text-xs text-slate-400 mt-1">{v.note}</p> : null}
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onDownload?.(v)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-page"
            >
              <Download size={12} /> Download
            </button>
            {canRestore && idx !== 0 ? (
              <button
                type="button"
                onClick={() => onRestore?.(v)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <RotateCcw size={12} /> Restore
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
