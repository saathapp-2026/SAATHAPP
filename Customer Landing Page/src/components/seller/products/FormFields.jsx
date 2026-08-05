import React from 'react';

export function Field({ label, required, error, hint, children, className = '' }) {
  return (
    <label className={`block min-w-0 w-full ${className}`}>
      <span className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 truncate">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] text-red-500" role="alert">{error}</span>}
    </label>
  );
}

export function TextInput({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full min-w-0 max-w-full box-border px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 ${className}`}
    />
  );
}

export function TextSelect({ className = '', children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full min-w-0 max-w-full box-border px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
    >
      {children}
    </select>
  );
}

export function TextTextarea({ className = '', ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full min-w-0 max-w-full box-border px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y ${className}`}
    />
  );
}

export function SectionCard({ number, title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-4 overflow-hidden w-full min-w-0">
      <h3 className="font-bold text-sm flex items-center gap-2">
        <span className="h-6 w-6 rounded-md bg-emerald-500 text-white text-xs inline-flex items-center justify-center shrink-0">
          {number}
        </span>
        <span className="truncate">{title}</span>
      </h3>
      <div className="w-full min-w-0">{children}</div>
    </section>
  );
}
