import React from 'react';
import { BellRing, CheckCircle2 } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Notifications({ onBack }) {
  return (
    <SectionPage title="Notifications" subtitle="Control offers, updates, and account alerts." icon={BellRing} onBack={onBack}>
      <div className="space-y-3">
        {[
          ['Order update', 'Your recent order has been packed and is on its way.'],
          ['Special offer', 'Enjoy 20% off on weekend local services.'],
          ['New service', 'Fresh agriculture services are now available nearby.'],
        ].map(([title, body]) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-page p-4">
            <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
            <div>
              <div className="font-semibold text-slate-800">{title}</div>
              <div className="text-sm text-slate-600">{body}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
