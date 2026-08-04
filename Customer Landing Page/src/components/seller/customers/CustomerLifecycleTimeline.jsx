import React from 'react';
import { LIFECYCLE_STAGES } from '../../../config/seller/customerConstants';
import { inferLifecycleStage } from '../../../config/seller/customerConstants';

export default function CustomerLifecycleTimeline({ customer }) {
  const current = customer?.lifecycleStage || inferLifecycleStage(customer || {});
  const currentIdx = LIFECYCLE_STAGES.findIndex((s) => s.id === current);
  const events = customer?.timeline || [];

  return (
    <div className="space-y-4" aria-label="Customer lifecycle">
      <div className="space-y-2">
        {LIFECYCLE_STAGES.map((stage, i) => {
          const reached = i <= currentIdx || events.some((e) => e.id === stage.id);
          const active = stage.id === current;
          return (
            <div key={stage.id} className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full shrink-0 ${
                  active ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : reached ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
              <div className="flex-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                <p className={`text-sm font-medium ${active ? 'text-emerald-600' : reached ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                  {stage.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Event log</h4>
        <ul className="space-y-2">
          {events.map((e, i) => (
            <li key={`${e.id}-${i}`} className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">{e.label}</span>
              <span className="text-slate-400"> · {e.at ? new Date(e.at).toLocaleString('en-IN') : ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
