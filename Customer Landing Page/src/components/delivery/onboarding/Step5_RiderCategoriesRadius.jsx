import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, Navigation, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const ALL_DELIVERY_CATEGORIES = [
  'Grocery Delivery',
  'Food & Restaurant Delivery',
  'Medicine & Healthcare Delivery',
  'Milk & Dairy Delivery',
  'Bakery & Snacks Delivery',
  'Fruits & Vegetables Delivery',
  'Flower & Gift Delivery',
  'Express Parcel Delivery',
  'Document & Legal Papers',
  'E-commerce Orders',
  'B2B Retail Store Supplies',
  'Warehouse Transfers',
];

export const WORKING_MODES = [
  { id: 'Full-Time', label: 'Full-Time Rider', desc: '8-10 hours / day for maximum earnings' },
  { id: 'Part-Time', label: 'Part-Time Rider', desc: '4-5 hours / day with flexible slots' },
  { id: 'Weekend Rider', label: 'Weekend Rider', desc: 'Saturday & Sunday peak hours' },
];

export default function Step5_RiderCategoriesRadius({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();

  const toggleCategory = (cat) => {
    const prevList = formData.deliveryCategories || [];
    if (prevList.includes(cat)) {
      updateFormData({ deliveryCategories: prevList.filter((c) => c !== cat) });
    } else {
      updateFormData({ deliveryCategories: [...prevList, cat] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((formData.deliveryCategories || []).length === 0) {
      addToast('Please select at least one delivery category', 'error');
      return;
    }
    addToast('Delivery categories & work mode saved!', 'success');
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
          Phase 4 — Delivery Categories & Radius
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Delivery Categories & Service Radius
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Choose the types of orders you wish to fulfill and your preferred delivery distance.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Categories Multi-Select Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Delivery Categories You Wish to Fulfill *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_DELIVERY_CATEGORIES.map((cat) => {
                const isSelected = (formData.deliveryCategories || []).includes(cat);
                return (
                  <div
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`cursor-pointer rounded-2xl border p-3.5 transition flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-extrabold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs">{cat}</span>
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Working Mode Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Preferred Working Mode *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {WORKING_MODES.map((mode) => {
                const isSelected = formData.preferredWorkingMode === mode.id;
                return (
                  <div
                    key={mode.id}
                    onClick={() => updateFormData({ preferredWorkingMode: mode.id })}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    <Clock size={18} className={isSelected ? 'text-amber-500' : 'text-slate-400'} />
                    <h3 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">{mode.label}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">{mode.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Radius */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Maximum Service Radius (Distance) *
            </label>
            <div className="relative flex items-center">
              <Navigation size={18} className="absolute left-3.5 text-slate-400" />
              <select
                value={formData.serviceRadiusKm}
                onChange={(e) => updateFormData({ serviceRadiusKm: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="3 km">Within 3 km (Local Neighborhood)</option>
                <option value="5 km">Within 5 km (Standard Delivery Zone)</option>
                <option value="10 km">Within 10 km (Expanded City Hub)</option>
                <option value="15 km">Within 15 km (Inter-city Express)</option>
                <option value="20+ km">20+ km (Long Distance Parcel Cargo)</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
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
