import React from 'react';
import { Wallet as WalletIcon, CreditCard, Sparkles } from 'lucide-react';
import SectionPage from './SectionPage';

export default function Wallet({ onBack }) {
  return (
    <SectionPage title="Wallet" subtitle="Wallet balance, cashback, rewards, and recent transactions." icon={WalletIcon} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-sm font-semibold text-emerald-700">Available Balance</div>
          <div className="mt-2 text-3xl font-black text-emerald-900">₹ 2,450</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CreditCard size={16} className="text-cyan-600" /> Linked Payment Methods</div>
          <div className="mt-2 text-sm text-slate-600">UPI, Debit Card, and Wallet enabled</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Sparkles size={16} className="text-amber-500" /> Recent Activity</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Cashback of ₹120 received from your last order</li>
          <li>• ₹300 added via referral reward</li>
          <li>• ₹80 coupon discount applied successfully</li>
        </ul>
      </div>
    </SectionPage>
  );
}
