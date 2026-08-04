import React, { useState } from 'react';
import { Bell, Phone, Truck, Printer, BarChart3, ChevronUp, ChevronDown } from 'lucide-react';

const ACTIONS = [
  { id: 'new_orders', label: 'New Orders', icon: Bell },
  { id: 'support', label: 'Customer Support', icon: Phone },
  { id: 'delivery', label: 'Delivery Requests', icon: Truck },
  { id: 'print', label: 'Print', icon: Printer },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function FloatingQuickActionBar({ badgeCount = 0, onAction }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div
        className={`${expanded ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row gap-2`}
      >
        {ACTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onAction?.(id)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            title={label}
          >
            <span className="relative">
              <Icon size={14} />
              {id === 'new_orders' && badgeCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 min-w-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                  {badgeCount}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="sm:hidden h-12 w-12 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Collapse quick actions' : 'Expand quick actions'}
      >
        {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
    </div>
  );
}
