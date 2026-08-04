import React, { useState } from 'react';
import { Check, X, Truck, Printer, MoreHorizontal, Download, Package, PackageCheck, Ban, RotateCcw } from 'lucide-react';

const PRIMARY = [
  { id: 'accept', label: 'Bulk Accept', icon: Check, className: 'bg-emerald-500 text-white hover:bg-emerald-600' },
  { id: 'reject', label: 'Bulk Reject', icon: X, className: 'bg-red-500 text-white hover:bg-red-600' },
  { id: 'assign', label: 'Assign Delivery', icon: Truck, className: 'bg-sky-500 text-white hover:bg-sky-600' },
  { id: 'print_invoice', label: 'Print Invoice', icon: Printer, className: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300' },
];

const MORE = [
  { id: 'print_labels', label: 'Print Labels', icon: Printer },
  { id: 'export', label: 'Export Excel', icon: Download },
  { id: 'packed', label: 'Mark Packed', icon: Package },
  { id: 'ready', label: 'Mark Ready', icon: PackageCheck },
  { id: 'cancel', label: 'Cancel', icon: Ban },
  { id: 'refund', label: 'Refund', icon: RotateCcw },
];

export default function BulkActionsBar({ count, onAction, loading }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[min(920px,calc(100%-1.5rem))]">
      <div
        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
        role="region"
        aria-label="Bulk actions"
      >
        <p className="text-sm font-bold tabular-nums shrink-0 text-slate-700 dark:text-slate-200">
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2 mr-2">
            {count}
          </span>
          Selected
        </p>
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {PRIMARY.map(({ id, label, icon: Icon, className }) => (
            <button
              key={id}
              type="button"
              disabled={loading || count === 0}
              onClick={() => onAction(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 ${className}`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
          <div className="relative">
            <button
              type="button"
              disabled={loading || count === 0}
              onClick={() => setMoreOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <MoreHorizontal size={13} />
              More Actions
            </button>
            {moreOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-1 z-50">
                {MORE.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMoreOpen(false);
                      onAction(id);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
