import React from 'react';
import { UserCircle2, Mail, MapPin } from 'lucide-react';
import SectionPage from './SectionPage';

export default function EditProfile({ onBack, user }) {
  return (
    <SectionPage title="Edit Profile" subtitle="Update your personal details and delivery preferences." icon={UserCircle2} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
          <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" defaultValue={user?.name || ''} placeholder="Enter full name" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number</label>
          <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" defaultValue={user?.phone || ''} placeholder="Enter mobile number" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email ID</label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            <Mail size={16} className="text-emerald-600" />
            <input className="w-full bg-transparent outline-none" defaultValue={user?.email || ''} placeholder="Enter email address" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Address</label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            <MapPin size={16} className="text-emerald-600" />
            <input className="w-full bg-transparent outline-none" defaultValue={user?.address || ''} placeholder="Enter full address" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white">Save Changes</button>
        <button onClick={onBack} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button>
      </div>
    </SectionPage>
  );
}
