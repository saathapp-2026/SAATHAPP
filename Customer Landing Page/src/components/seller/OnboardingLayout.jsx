import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProgressStepper from './ProgressStepper';

export default function OnboardingLayout({ title, subtitle, children, showStepper = true }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-10">
        <Link
          to="/seller"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Seller Hub
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-400 mt-1 text-sm md:text-base">{subtitle}</p>}
        </div>

        {showStepper && (
          <div className="mb-8 p-4 rounded-2xl bg-surface/5 backdrop-blur-xl border border-white/10">
            <ProgressStepper />
          </div>
        )}

        <div className="rounded-2xl bg-surface/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
