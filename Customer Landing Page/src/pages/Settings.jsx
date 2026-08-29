import React from 'react';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';

export default function Settings({ onBack }) {
  return (
    <div className="min-h-screen bg-page text-theme px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-theme-border bg-surface p-6 shadow-xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-theme-secondary hover:text-theme transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
            <SettingsIcon size={28} />
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400 max-w-md mx-auto">Preferences, notifications, and privacy controls will appear here.</p>
        </div>
      </div>
    </div>
  );
}
