import React from 'react';
import { formatDate, statusLabel, STATUS_STYLES } from '../../../config/seller/documentConstants';

export default function VerificationTimeline({ timeline = [] }) {
  if (!timeline.length) {
    return <p className="text-sm text-slate-500">No verification events yet.</p>;
  }

  return (
    <ol className="relative border-l border-slate-200 dark:border-slate-700 ml-2 space-y-4">
      {[...timeline].reverse().map((ev, i) => (
        <li key={`${ev.at}-${i}`} className="ml-4">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                STATUS_STYLES[ev.status] || STATUS_STYLES.draft
              }`}
            >
              {statusLabel(ev.status)}
            </span>
            <time className="text-xs text-slate-400">{formatDate(ev.at)}</time>
          </div>
          {ev.note ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{ev.note}</p> : null}
        </li>
      ))}
    </ol>
  );
}
