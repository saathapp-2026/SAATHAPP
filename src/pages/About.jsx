import React from 'react';
import { Info } from 'lucide-react';
import SectionPage from './SectionPage';

export default function About({ onBack }) {
  return (
    <SectionPage title="About SaathApp" subtitle="A hyperlocal marketplace for products and services." icon={Info} onBack={onBack}>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        SaathApp connects nearby users with trusted shops, service providers, and local delivery support in one simple app experience.
      </div>
    </SectionPage>
  );
}
