import React from 'react';
import { Check, X, Truck, Printer, Download, Package, PackageCheck, Ban, RotateCcw } from 'lucide-react';

const BULK = [
  { id: 'accept', label: 'Accept', icon: Check },
  { id: 'reject', label: 'Reject', icon: X },
  { id: 'assign', label: 'Assign Delivery', icon: Truck },
  { id: 'print_invoice', label: 'Print Invoice', icon: Printer },
  { id: 'print_labels', label: 'Print Labels', icon: Printer },
  { id: 'export', label: 'Export Excel', icon: Download },
  { id: 'packed', label: 'Mark Packed', icon: Package },
  { id: 'ready', label: 'Mark Ready', icon: PackageCheck },
  { id: 'cancel', label: 'Cancel', icon: Ban },
  { id: 'refund', label: 'Refund', icon: RotateCcw },
];

export default function BulkActionsBar({ count, onAction, loading }) {
  if (count <= 0) return null;

  return (
    <div
      className="sticky top-0 z-20 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-3 flex flex-col sm:flex-row sm:items-center gap-3"
      role="region"
      aria-label="Bulk actions"
    >
      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 shrink-0">
        {count} selected
      </p>
      <div className="flex flex-wrap gap-1.5">
        {BULK.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            disabled={loading}
            onClick={() => onAction(id)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
