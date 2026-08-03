import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500';

export default function Delivery() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const delivery = data.delivery;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('delivery', {
      mode: form.get('mode'),
      radius: form.get('radius'),
      hours: form.get('hours'),
      emergencyContact: form.get('emergencyContact'),
      instantDelivery: form.get('instantDelivery') === 'on',
    });
    navigate('/seller/documents');
  };

  return (
    <OnboardingLayout title="Delivery Settings" subtitle="Configure how customers receive orders">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Delivery Mode *</label>
          <select name="mode" defaultValue={delivery.mode} className={inputClass}>
            <option value="both">Pickup & Delivery</option>
            <option value="pickup">Pickup Only</option>
            <option value="delivery">Delivery Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Delivery Radius *</label>
          <select name="radius" defaultValue={delivery.radius} className={inputClass}>
            <option value="0-5">0–5 km</option>
            <option value="5-10">5–10 km</option>
            <option value="10-20">10–20 km</option>
            <option value="20-50">20–50 km</option>
            <option value="50+">50+ km</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Operating Hours</label>
          <input name="hours" defaultValue={delivery.hours} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Emergency Contact</label>
          <input name="emergencyContact" type="tel" defaultValue={delivery.emergencyContact} className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" name="instantDelivery" defaultChecked={delivery.instantDelivery} className="rounded border-white/20" />
          Enable instant delivery (if available in your area)
        </label>

        <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Documents
        </button>
      </form>
    </OnboardingLayout>
  );
}
