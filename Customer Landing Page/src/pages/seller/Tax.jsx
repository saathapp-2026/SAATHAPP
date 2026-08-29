import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 [&>option]:bg-slate-900 [&>option]:text-white';

export default function Tax() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const tax = data.tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('tax', {
      gstApplicable: form.get('gstApplicable') === 'on',
      gstNumber: form.get('gstNumber'),
      invoicePreference: form.get('invoicePreference'),
      hsnSupport: form.get('hsnSupport') === 'on',
      billingAddress: form.get('billingAddress'),
    });
    navigate('/seller/onboarding-fee');
  };

  return (
    <OnboardingLayout title="Tax Information" subtitle="GST and billing preferences">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" name="gstApplicable" defaultChecked={tax.gstApplicable} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none rounded border-white/20" />
          GST is applicable to my business
        </label>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">GST Number</label>
          <input name="gstNumber" defaultValue={tax.gstNumber} className={inputClass} placeholder="22AAAAA0000A1Z5" />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Invoice Preference</label>
          <select name="invoicePreference" defaultValue={tax.invoicePreference} className={inputClass}>
            <option value="digital" className="bg-slate-900 text-white">Digital Invoice</option>
            <option value="physical" className="bg-slate-900 text-white">Physical Invoice</option>
            <option value="both" className="bg-slate-900 text-white">Both</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" name="hsnSupport" defaultChecked={tax.hsnSupport} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none rounded border-white/20" />
          I need HSN code support for products
        </label>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Billing Address</label>
          <textarea name="billingAddress" defaultValue={tax.billingAddress} rows={2} className={inputClass} />
        </div>

        <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Onboarding Fee
        </button>
      </form>
    </OnboardingLayout>
  );
}
