import React from 'react';
import { Download, Ban, CheckCircle2, Trash2, FileArchive } from 'lucide-react';

export default function InvoiceBulkBar({ count, onAction, loading, hidden = false }) {
  if (count <= 0 || hidden) return null;
  const actions = [
    { id: 'export', label: 'Export Selected', icon: Download },
    { id: 'zip', label: 'Bulk PDF ZIP', icon: FileArchive },
    { id: 'mark_paid', label: 'Mark Paid', icon: CheckCircle2 },
    { id: 'cancel', label: 'Cancel', icon: Ban },
    { id: 'delete_drafts', label: 'Delete Drafts', icon: Trash2 },
  ];
  return (
    <div className="sticky bottom-3 z-[30] mt-3 isolate">
      <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm font-bold tabular-nums shrink-0">
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 px-2 mr-2">
            {count}
          </span>
          Selected
        </p>
        <div className="flex flex-wrap gap-2">
          {actions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              disabled={loading}
              onClick={() => onAction(id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-page disabled:opacity-40"
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
