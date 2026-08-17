import React from 'react';
import { ShieldCheck, AlertTriangle, Clock3, FileX2 } from 'lucide-react';

const STATE_STYLE = {
  completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  missing: 'bg-page text-slate-600 dark:text-slate-300',
  expired: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

export default function ComplianceProgress({ data, loading, onOpenDoc }) {
  if (loading || !data) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 h-48 animate-pulse" />
    );
  }

  const { progress, sections, completed, total } = data;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={20} />
            Compliance Center
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {completed}/{total} required document types completed
          </p>
        </div>
        <div className="min-w-[180px]">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span className="font-semibold text-emerald-600">{progress}% Complete</span>
          </div>
          <div className="h-2.5 rounded-full bg-page overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{sec.label}</p>
              <span className="text-xs text-slate-500">
                {sec.completed}/{sec.total}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <ShieldCheck size={12} /> {sec.completed} done
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <FileX2 size={12} /> {sec.missing} missing
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600">
                <Clock3 size={12} /> {sec.pending} pending
              </span>
              <span className="inline-flex items-center gap-1 text-red-600">
                <AlertTriangle size={12} /> {sec.expired} expired
              </span>
            </div>
            <ul className="space-y-1.5 max-h-36 overflow-y-auto">
              {sec.items.slice(0, 6).map((item) => (
                <li key={item.typeId}>
                  <button
                    type="button"
                    disabled={!item.doc}
                    onClick={() => item.doc && onOpenDoc?.(item.doc)}
                    className={`w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs ${
                      STATE_STYLE[item.state] || STATE_STYLE.missing
                    } ${item.doc ? 'hover:opacity-90' : 'opacity-80 cursor-default'}`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="capitalize shrink-0 ml-2">{item.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
