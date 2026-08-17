import React from 'react';
import { Gift, Star, Sparkles } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Rewards({ onBack }) {
  return (
    <SectionPage title="Rewards" subtitle="Unlock exclusive offers and referral benefits." icon={Gift} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700"><Star size={16} /> Reward Points</div>
          <div className="mt-2 text-3xl font-black text-amber-900">1,280 pts</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-page p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Sparkles size={16} className="text-cyan-600" /> Next Reward</div>
          <div className="mt-2 text-sm text-slate-600">Earn 220 more points to unlock free delivery</div>
        </div>
      </div>
    </SectionPage>
  );
}
