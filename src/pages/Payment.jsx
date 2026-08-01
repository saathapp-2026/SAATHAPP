import React from 'react';
import { CreditCard, PlusCircle } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Payment({ onBack }) {
  return (
    <SectionPage title="Payment Methods" subtitle="Manage UPI, cards, and wallet payments." icon={CreditCard} onBack={onBack}>
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="font-semibold text-slate-800">UPI • nikita@okhdfc</div>
          <div className="mt-1 text-sm text-slate-600">Primary payment method for orders</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="font-semibold text-slate-800">Debit Card • 4521</div>
          <div className="mt-1 text-sm text-slate-600">Saved for quick checkout</div>
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700">
          <PlusCircle size={16} /> Add New Payment Method
        </button>
      </div>
    </SectionPage>
  );
}
