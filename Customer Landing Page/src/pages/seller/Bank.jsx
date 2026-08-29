import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500';

export default function Bank() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const bank = data.bank;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('bank', {
      accountHolder: form.get('accountHolder'),
      bankName: form.get('bankName'),
      accountNumber: form.get('accountNumber'),
      ifsc: form.get('ifsc'),
      upi: form.get('upi'),
      settlementPreference: form.get('settlementPreference'),
    });
    navigate('/seller/tax');
  };

  return (
    <OnboardingLayout title="Bank Details" subtitle="For settlement of your earnings">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Account Holder Name *</label>
            <input name="accountHolder" defaultValue={bank.accountHolder} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Bank Name *</label>
            <input name="bankName" defaultValue={bank.bankName} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Account Number *</label>
            <input name="accountNumber" defaultValue={bank.accountNumber} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">IFSC Code *</label>
            <input name="ifsc" defaultValue={bank.ifsc} pattern="[A-Z]{4}0[A-Z0-9]{6}" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">UPI ID</label>
            <input name="upi" defaultValue={bank.upi} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Settlement Preference</label>
            <select name="settlementPreference" defaultValue={bank.settlementPreference} className={inputClass}>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Tax Info
        </button>
      </form>
    </OnboardingLayout>
  );
}
