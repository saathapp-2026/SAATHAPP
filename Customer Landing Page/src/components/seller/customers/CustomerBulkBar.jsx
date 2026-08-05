import React, { useState } from 'react';
import {
  Download,
  Bell,
  Star,
  Ban,
  Trash2,
  MoreHorizontal,
  MessageCircle,
  Mail,
  Unlock,
} from 'lucide-react';

const PRIMARY = [
  { id: 'export', label: 'Export Selected', icon: Download, className: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200' },
  { id: 'notify', label: 'Send Notification', icon: Bell, className: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300' },
  { id: 'vip', label: 'Mark as VIP', icon: Star, className: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300' },
];

const MORE = [
  { id: 'whatsapp', label: 'Send WhatsApp', icon: MessageCircle },
  { id: 'email', label: 'Send Email', icon: Mail },
  { id: 'block', label: 'Block Customer', icon: Ban },
  { id: 'unblock', label: 'Unblock Customer', icon: Unlock },
  { id: 'delete', label: 'Delete Customer', icon: Trash2 },
];

export default function CustomerBulkBar({ count, onAction, loading, hidden = false }) {
  const [moreOpen, setMoreOpen] = useState(false);
  if (count <= 0 || hidden) return null;

  return (
    <div className="sticky bottom-3 z-[30] mt-3 isolate" aria-hidden={hidden}>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm font-bold tabular-nums shrink-0">
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 mr-2">
            {count}
          </span>
          Selected
        </p>
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {PRIMARY.map(({ id, label, icon: Icon, className }) => (
            <button
              key={id}
              type="button"
              disabled={loading}
              onClick={() => onAction(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 ${className}`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
          <div className="relative">
            <button
              type="button"
              disabled={loading}
              onClick={() => setMoreOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700"
            >
              <MoreHorizontal size={13} />
              More Actions
            </button>
            {moreOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-1 z-[40]">
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
