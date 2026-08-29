import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useDelivery, calculateDeliveryOnboardingFee } from '../../../context/DeliveryContext';

export const LOCATION_TIERS = [
  { id: 'Village / Rural', label: 'Village / Rural', desc: 'Gram Panchayat & Rural Tier (₹500)' },
  { id: 'Tier 3 City', label: 'Tier 3 City', desc: 'Town & Sub-district Hub (₹1,000)' },
  { id: 'Tier 2 City', label: 'Tier 2 City', desc: 'State Capital & Major City (₹1,500)' },
  { id: 'Tier 1 City', label: 'Tier 1 City', desc: 'Large Commercial City (₹2,000)' },
  { id: 'Metro City', label: 'Metro City', desc: 'Metropolitan Metro Hub (₹2,500)' },
];

export const VEHICLE_OPTIONS = [
  'Walking Delivery',
  'Bicycle Delivery',
  'Electric Bicycle',
  'Motorcycle / Scooter',
  'Electric Scooter',
  'Three-Wheeler',
  'Small Commercial Vehicle',
];

export default function Step4_RiderLocationVehicle({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();

  const feeCalc = calculateDeliveryOnboardingFee(
    formData.locationTier || 'Tier 2 City',
    formData.vehicleType || 'Motorcycle / Scooter'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.city || !formData.city.trim()) {
      addToast('Please enter your city', 'error');
      return;
    }
    const cleanPin = (formData.pincode || '').replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      addToast('Please enter a valid 6-digit PIN code', 'error');
      return;
    }
    addToast('Location Tier & Vehicle details saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 3 — Location Tier & Vehicle Selection
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Service Location Tier & Vehicle Type
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Select your service area tier and vehicle type to calculate your One-Time Onboarding Fee.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Location Tier Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Service Location Classification *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {LOCATION_TIERS.map((tier) => {
                const isSelected = formData.locationTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => updateFormData({ locationTier: tier.id })}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/30'
                        : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 hover:border-slate-300'
                      }`}
                  >
                    <MapPin size={18} className={isSelected ? 'text-amber-500' : 'text-slate-400'} />
                    <h3 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">{tier.label}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">{tier.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fee Callout Box */}
          <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Calculated Onboarding Fee
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                For <strong className="text-white">{formData.locationTier}</strong> using <strong className="text-white">{formData.vehicleType}</strong>:
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-amber-400">₹{feeCalc.fee}</span>
              <span className="block text-[10px] text-slate-400 font-semibold">Fixed Fee • No Monthly Fee</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Vehicle Type *
              </label>
              <div className="relative flex items-center">
                <Truck size={18} className="absolute left-3.5 text-slate-400" />
                <select
                  value={formData.vehicleType}
                  onChange={(e) => updateFormData({ vehicleType: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Vehicle Registration (RC Number)
              </label>
              <input
                type="text"
                value={formData.vehicleNumber}
                onChange={(e) => updateFormData({ vehicleNumber: e.target.value.toUpperCase() })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="e.g. BR-01-AB-9842"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Patna"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Bihar"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={formData.pincode}
                onChange={(e) => updateFormData({ pincode: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="800001"
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
