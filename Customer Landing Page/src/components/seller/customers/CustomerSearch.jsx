import React, { useEffect, useRef, useState } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { getRecentSearches, pushRecentSearch } from '../../../services/seller/sellerCustomersService';

export default function CustomerSearch({ value, onChange, onCommit, placeholder = 'Search by name, email, phone or ID…' }) {
  const [local, setLocal] = useState(value || '');
  const [recent, setRecent] = useState([]);
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const wrap = useRef(null);

  useEffect(() => setLocal(value || ''), [value]);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const emit = (v, commit = false) => {
    setLocal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange?.(v);
      if (commit && v.trim()) {
        setRecent(pushRecentSearch(v));
        onCommit?.(v);
      }
    }, 280);
  };

  return (
    <div className="relative flex-1 min-w-[200px]" ref={wrap}>
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        type="search"
        value={local}
        onChange={(e) => emit(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            clearTimeout(timer.current);
            onChange?.(local);
            if (local.trim()) setRecent(pushRecentSearch(local));
            setOpen(false);
          }
        }}
        placeholder={placeholder}
        aria-label="Smart customer search"
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {local && (
        <button
          type="button"
          aria-label="Clear search"
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-page"
          onClick={() => {
            setLocal('');
            onChange?.('');
          }}
        >
          <X size={14} />
        </button>
      )}
      {open && recent.length > 0 && !local && (
        <div className="absolute z-[40] mt-1.5 w-full rounded-xl border border-slate-200 bg-surface shadow-xl p-1">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Recent searches</p>
          {recent.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setLocal(r);
                onChange?.(r);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-page"
            >
              <Clock size={13} className="text-slate-400" />
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
