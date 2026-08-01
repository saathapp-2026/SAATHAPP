import React from 'react';
import { FileText } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Terms({ onBack }) {
  return (
    <SectionPage title="Terms & Conditions" subtitle="Read the terms for buying, selling, and service bookings." icon={FileText} onBack={onBack}>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        By using SaathApp, you agree to follow local laws, respect seller policies, and ensure accurate service requests.
      </div>
    </SectionPage>
  );
}
