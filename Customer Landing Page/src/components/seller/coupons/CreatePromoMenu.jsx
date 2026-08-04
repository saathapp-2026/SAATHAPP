import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  ChevronDown,
  Ticket,
  Megaphone,
  Image,
  Star,
  Target,
  FileImage,
} from 'lucide-react';
import { CREATE_MENU } from '../../../config/seller/couponConstants';

const GROUP_ICONS = {
  coupon: Ticket,
  ad: Megaphone,
  banner: Image,
  poster: FileImage,
  sponsored: Star,
  campaign: Target,
};

export default function CreatePromoMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(CREATE_MENU[0].id);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const group = CREATE_MENU.find((g) => g.id === activeGroup) || CREATE_MENU[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Plus size={16} />
        Create
        <ChevronDown size={14} className="opacity-80" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-[min(92vw,560px)] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
            <div className="border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 p-2 bg-slate-50/80 dark:bg-slate-950/40">
              {CREATE_MENU.map((g) => {
                const Icon = GROUP_ICONS[g.id] || Ticket;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onMouseEnter={() => setActiveGroup(g.id)}
                    onClick={() => setActiveGroup(g.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold ${
                      activeGroup === g.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={14} />
                    {g.label}
                  </button>
                );
              })}
            </div>
            <div className="p-3 max-h-72 overflow-y-auto">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2 px-1">
                {group.label}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      onSelect?.(item);
                    }}
                    className="rounded-xl px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
