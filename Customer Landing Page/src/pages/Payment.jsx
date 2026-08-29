import React from 'react';
import { CreditCard, PlusCircle } from 'lucide-react';
import SectionPage from './SectionPage';
import toast from 'react-hot-toast';

export default function Payment({ onBack }) {
  return (
    <SectionPage title="Payment Methods" subtitle="Manage UPI, cards, and wallet payments." icon={CreditCard} onBack={onBack}>
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-page p-6 text-center text-sm text-slate-500 font-medium">
          No saved payment methods yet. Add a payment method for faster checkout.
        </div>
        <button onClick={() => toast.success('Add payment method sheet') } className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-page transition-colors w-full justify-center cursor-pointer">
          <PlusCircle size={16} /> Add New Payment Method
        </button>
      </div>
    </SectionPage>
  );
}
