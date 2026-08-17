import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function SectionPage({ title, subtitle, icon: Icon = Sparkles, onBack, children, accent = 'from-emerald-600 to-cyan-600' }) {
  return (
    <div className="min-h-screen bg-page px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back to profile
        </button>

        <div className={`mt-6 rounded-[24px] bg-gradient-to-r ${accent} p-6 text-white`}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Icon size={20} />
            </div>
            <div>
              <div className="text-xl font-black">{title}</div>
              <div className="text-sm text-white/80">{subtitle}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
