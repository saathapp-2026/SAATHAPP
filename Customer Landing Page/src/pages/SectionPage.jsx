import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function SectionPage({ title, subtitle, icon: Icon = Sparkles, onBack, children, accent = 'from-emerald-600 to-cyan-600' }) {
  return (
    <div className="min-h-screen bg-page text-theme px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-theme-border bg-surface p-5 shadow-xl sm:p-8">
        <button onClick={onBack} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex items-center gap-2 text-sm font-semibold text-theme-secondary hover:text-theme transition-colors">
          <ArrowLeft size={16} /> Back to profile
        </button>

        <div className={`mt-6 rounded-[24px] bg-gradient-to-r ${accent} p-6 text-white shadow-md`}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Icon size={24} />
            </div>
            <div>
              <div className="text-3xl font-black">{title}</div>
              <div className="text-sm text-white/80 font-medium">{subtitle}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
