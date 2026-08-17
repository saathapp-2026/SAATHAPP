import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Address({ onBack }) {
  return (
    <SectionPage title="Saved Addresses" subtitle="Manage your delivery and service locations." icon={MapPin} onBack={onBack}>
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-page p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-800">Home</div>
              <div className="mt-1 text-sm text-slate-600">Green Park, New Delhi, 110016</div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Default</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-page p-4">
          <div className="font-semibold text-slate-800">Office</div>
          <div className="mt-1 text-sm text-slate-600">Connaught Place, Central Delhi, 110001</div>
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700">
          <Plus size={16} /> Add New Address
        </button>
      </div>
    </SectionPage>
  );
}
