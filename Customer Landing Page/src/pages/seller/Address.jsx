import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { LOCATION_TIERS } from '../../config/sellerOnboardingConfig';
import { toast } from 'react-hot-toast';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 [&>option]:bg-slate-900 [&>option]:text-white';

export default function Address() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const addr = data.address;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const state = (form.get('state') || '').trim();
    const city = (form.get('city') || '').trim();
    const address = (form.get('address') || '').trim();
    const pincode = (form.get('pincode') || '').replace(/\D/g, '');

    if (!state || !city || !address) {
      toast.error('Please fill in all required address fields.');
      return;
    }
    if (pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit PIN code.');
      return;
    }

    updateSection('address', {
      state,
      district: form.get('district'),
      city,
      pincode,
      address,
      landmark: form.get('landmark'),
      locationTier: form.get('locationTier'),
    });
    navigate('/seller/delivery');
  };

  return (
    <OnboardingLayout title="Store Address" subtitle="Where is your business located?">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Location Tier *</label>
          <select name="locationTier" defaultValue={addr.locationTier} className={inputClass} required>
            {LOCATION_TIERS.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.label}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">Affects your onboarding fee calculation</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">State *</label>
            <input name="state" defaultValue={addr.state} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">District *</label>
            <input name="district" defaultValue={addr.district} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">City *</label>
            <input name="city" defaultValue={addr.city} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Pincode *</label>
            <input name="pincode" defaultValue={addr.pincode} pattern="[0-9]{6}" className={inputClass} required />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Full Address *</label>
          <textarea name="address" defaultValue={addr.address} rows={2} className={inputClass} required />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Landmark</label>
          <input name="landmark" defaultValue={addr.landmark} className={inputClass} />
        </div>

        <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Delivery
        </button>
      </form>
    </OnboardingLayout>
  );
}
