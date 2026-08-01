import React from 'react';
import { ShieldCheck } from 'lucide-react';
import SectionPage from './SectionPage';

export default function PrivacyPolicy({ onBack }) {
  return (
    <SectionPage title="Privacy Policy" subtitle="How SaathApp protects and uses your information." icon={ShieldCheck} onBack={onBack}>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Your data is used to provide a secure local marketplace experience, support deliveries, and personalize recommendations.
      </div>
    </SectionPage>
  );
}
