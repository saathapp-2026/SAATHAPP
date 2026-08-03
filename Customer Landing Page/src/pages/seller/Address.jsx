import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { LOCATION_TIERS } from '../../config/sellerOnboardingConfig';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500';

export default function Address() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const addr = data.address;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('address', {
      state: form.get('state'),
      district: form.get('district'),
      city: form.get('city'),
      pincode: form.get('pincode'),
      address: form.get('address'),
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
              <option key={t.id} value={t.id}>{t.label}</option>
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

        <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Delivery
        </button>
      </form>
    </OnboardingLayout>
  );
}
