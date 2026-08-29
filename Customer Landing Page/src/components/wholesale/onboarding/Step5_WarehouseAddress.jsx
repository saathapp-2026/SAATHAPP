import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Building, Warehouse, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const INDIAN_STATES = [
  'Delhi',
  'Haryana',
  'Uttar Pradesh',
  'Maharashtra',
  'Karnataka',
  'Gujarat',
  'West Bengal',
  'Tamil Nadu',
  'Telangana',
  'Punjab',
  'Rajasthan',
  'Bihar',
  'Madhya Pradesh',
];

export default function Step5_WarehouseAddress({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const handleDetectGps = () => {
    setIsGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsGpsLoading(false);
          updateFormData({
            gpsLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude, address: 'Detected Location' },
          });
          addToast('GPS location detected successfully!', 'success');
        },
        () => {
          setIsGpsLoading(false);
          addToast('Location access denied or unavailable.', 'error');
        }
      );
    } else {
      setIsGpsLoading(false);
      addToast('Geolocation not supported by browser.', 'error');
    }
  };

  const handleToggleSameAsRegistered = (e) => {
    const checked = e.target.checked;
    updateFormData({
      sameAsRegistered: checked,
      warehouseAddress: checked ? formData.registeredAddress : formData.warehouseAddress,
    });
  };

  const handleAddWarehouse = () => {
    const newWh = {
      name: `Warehouse #${formData.additionalWarehouses.length + 1}`,
      city: formData.city || '—',
      area: '—',
      manager: formData.fullName || '—',
    };
    updateFormData({
      additionalWarehouses: [...formData.additionalWarehouses, newWh],
      numberOfWarehouses: formData.numberOfWarehouses + 1,
    });
    addToast('Additional warehouse added!', 'success');
  };

  const handleRemoveWarehouse = (index) => {
    const updated = formData.additionalWarehouses.filter((_, i) => i !== index);
    updateFormData({
      additionalWarehouses: updated,
      numberOfWarehouses: Math.max(1, updated.length),
    });
    addToast('Warehouse removed.', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.registeredAddress || !formData.registeredAddress.trim()) {
      addToast('Please enter registered business address', 'error');
      return;
    }
    const cleanPin = (formData.pincode || '').replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      addToast('Please enter a valid 6-digit PIN code', 'error');
      return;
    }
    addToast('Address & Warehouse details saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 4 — Warehouse & Business Address
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Location & Logistics Hubs
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Specify your registered corporate office, primary fulfillment warehouse, and pickup locations.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDetectGps}
            disabled={isGpsLoading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition"
          >
            <Navigation size={14} className={isGpsLoading ? 'animate-spin' : ''} />
            {isGpsLoading ? 'Detecting GPS...' : 'Detect GPS Location'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                District *
              </label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => updateFormData({ district: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter district"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => updateFormData({ pincode: e.target.value.replace(/\D/g, '') })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter 6-digit pincode"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Registered Business Address *
            </label>
            <div className="relative flex items-center">
              <Building size={18} className="absolute left-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={formData.registeredAddress}
                onChange={(e) => updateFormData({ registeredAddress: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Full GST-registered address..."
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Primary Warehouse Address *
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sameAsRegistered}
                  onChange={handleToggleSameAsRegistered}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Same as Registered Address
              </label>
            </div>
            <div className="relative flex items-center">
              <Warehouse size={18} className="absolute left-3.5 text-slate-400" />
              <input
                type="text"
                required
                disabled={formData.sameAsRegistered}
                value={formData.warehouseAddress}
                onChange={(e) => updateFormData({ warehouseAddress: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                placeholder="Warehouse street, hub number..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Pickup Address
              </label>
              <input
                type="text"
                value={formData.pickupAddress}
                onChange={(e) => updateFormData({ pickupAddress: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Gate 4, Hub..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Loading Point
              </label>
              <input
                type="text"
                value={formData.loadingPoint}
                onChange={(e) => updateFormData({ loadingPoint: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Dock #3 & #4"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Landmark
              </label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => updateFormData({ landmark: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Near Metro Station"
              />
            </div>
          </div>

          {/* Multiple Warehouse Manager */}
          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Multiple Warehouse Locations ({formData.additionalWarehouses.length})
                </h3>
                <p className="text-xs text-slate-500">
                  SaathApp supports multi-warehouse inventory routing for fast order fulfillment.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddWarehouse}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition shadow"
              >
                <Plus size={14} /> Add Warehouse
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.additionalWarehouses.map((wh, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {wh.name}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{wh.city}</p>
                    <p className="text-[11px] text-slate-500">Area: {wh.area} | Manager: {wh.manager}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveWarehouse(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next Phase
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
