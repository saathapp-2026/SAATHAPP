import React from 'react';
import { LifeBuoy, MessageCircle, PhoneCall, Mail } from 'lucide-react';
import SectionPage from './SectionPage';

export default function HelpSupport({ onBack }) {
  return (
    <SectionPage title="Help & Support" subtitle="Get help with orders, services, and account issues." icon={LifeBuoy} onBack={onBack}>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-page p-4">
          <div className="flex items-center gap-2 font-semibold text-slate-800"><MessageCircle size={16} className="text-cyan-600" /> Live Chat</div>
          <div className="mt-1 text-sm text-slate-600">Connect with support instantly</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-page p-4">
          <div className="flex items-center gap-2 font-semibold text-slate-800"><PhoneCall size={16} className="text-emerald-600" /> Call Customer Care</div>
          <div className="mt-1 text-sm text-slate-600">+91 9128842027</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-page p-4">
          <div className="flex items-center gap-2 font-semibold text-slate-800"><Mail size={16} className="text-amber-600" /> Email Support</div>
          <div className="mt-1 text-sm text-slate-600">support@saathapp.in</div>
        </div>
      </div>
    </SectionPage>
  );
}
