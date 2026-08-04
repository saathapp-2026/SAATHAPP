import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '../../../config/seller/orderConstants';

export default function OrderTimeline({ timeline = [] }) {
  if (!timeline.length) {
    return <p className="text-sm text-slate-500">No timeline events yet.</p>;
  }

  const sorted = [...timeline].sort((a, b) => a.at - b.at);

  return (
    <ol className="relative space-y-0 border-l-2 border-slate-200 dark:border-slate-700 ml-3" aria-label="Order timeline">
      {sorted.map((event, i) => {
        const colors = STATUS_COLORS[event.status] || STATUS_COLORS.returned;
        const dt = new Date(event.at);
        return (
          <li key={event.id || `${event.status}-${i}`} className="relative pl-6 pb-6 last:pb-0">
            <span
              className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 ${colors.dot}`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <p className="font-semibold text-sm">{event.label || STATUS_LABELS[event.status] || event.status}</p>
              <span className="text-[10px] text-slate-400">
                {dt.toLocaleDateString('en-IN')} · {dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs text-slate-500">by {event.actor}</p>
            {event.remarks && <p className="text-xs mt-1 text-slate-600 dark:text-slate-300">{event.remarks}</p>}
          </li>
        );
      })}
    </ol>
  );
}
