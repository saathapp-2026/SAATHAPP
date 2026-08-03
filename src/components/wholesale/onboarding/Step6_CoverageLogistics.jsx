import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Globe2, ShieldCheck, ArrowRight, ArrowLeft, PackageCheck } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const COVERAGE_AREAS = ['Local', 'District', 'State', 'Multi-State', 'PAN India', 'International'];

export const LOGISTICS_TYPES = [
  { id: 'Own Logistics', title: 'Own Fleet & Delivery', desc: 'You handle dispatches using your own trucks/vans.' },
  { id: 'Third-Party Logistics', title: '3PL Partner Logistics', desc: 'SaathApp logistics network handles pickup & door delivery.' },
  { id: 'Hybrid Model', title: 'Hybrid Delivery', desc: 'Combination of own local fleet and 3PL for long distance.' },
];

export default function Step6_CoverageLogistics({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Service coverage & logistics saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 5 — Service Coverage & Delivery
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Delivery Reach & Logistics Setup
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Define where you supply products and how bulk orders will be fulfilled.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Coverage Area Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Supply Coverage Region *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COVERAGE_AREAS.map((area) => {
                const isSelected = formData.serviceCoverageArea === area;
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => updateFormData({ serviceCoverageArea: area })}
                    className={`flex items-center gap-2 rounded-2xl border p-3.5 text-xs font-bold transition text-left ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <Globe2 size={16} className={isSelected ? 'text-emerald-500' : 'text-slate-400'} />
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logistics Type Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Fulfillment & Logistics Model *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LOGISTICS_TYPES.map((type) => {
                const isSelected = formData.logisticsType === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => updateFormData({ logisticsType: type.id })}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    <Truck size={20} className={isSelected ? 'text-emerald-500' : 'text-slate-400'} />
                    <h3 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">{type.title}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">{type.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Daily Order Delivery Capacity *
              </label>
              <div className="relative flex items-center">
                <PackageCheck size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.dailyDeliveryCapacity}
                  onChange={(e) => updateFormData({ dailyDeliveryCapacity: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="500+ Bulk Orders / Day"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Fleet & Vehicle Details (Optional)
              </label>
              <input
                type="text"
                value={formData.fleetDetails}
                onChange={(e) => updateFormData({ fleetDetails: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="12 Trucks, 5 Vans..."
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
