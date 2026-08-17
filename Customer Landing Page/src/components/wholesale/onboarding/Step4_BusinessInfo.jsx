import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Users, Calendar, ArrowRight, ArrowLeft, Briefcase, Tag, MapPin, DollarSign } from 'lucide-react';
import { useWholesale, calculateOnboardingFee } from '../../../context/WholesaleContext';

export const BUSINESS_TYPES = [
  'Manufacturer',
  'Wholesaler',
  'Distributor',
  'Importer',
  'Exporter',
  'Supplier',
  'Factory',
  'Brand Owner',
  'Stockist',
];

export const CITY_TIERS = [
  { id: 'Village', label: 'Village Wholesaler', desc: 'Rural / Gram Panchayat tier' },
  { id: 'Tier 3 Town', label: 'Tier 3 Town Wholesaler', desc: 'Sub-district / Town tier' },
  { id: 'Tier 2 City', label: 'Tier 2 City Wholesaler', desc: 'State hub / Major city' },
  { id: 'Tier 1 Metro', label: 'Tier 1 Metro Wholesaler', desc: 'Metropolitan hub' },
];

export const BUSINESS_CATEGORIES = [
  'Grocery',
  'FMCG',
  'Hardware',
  'Electrical',
  'Construction Materials',
  'Furniture',
  'Agriculture',
  'Fashion',
  'Mobile & Electronics',
  'Pharmacy',
  'Restaurant Supplies',
  'Industrial Equipment',
  'Others',
];

export const EMPLOYEE_RANGES = ['1-10', '11-50', '51-200', '200+'];

export default function Step4_BusinessInfo({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const capVal = formData.businessCapital ?? 2500000;
  const currentFeeData = calculateOnboardingFee(
    formData.cityType || 'Tier 2 City',
    formData.businessCategory || 'FMCG',
    capVal
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName.trim()) {
      addToast('Please enter your business name', 'error');
      return;
    }
    if (Number(capVal) < 1000000) {
      addToast('Wholesale / Supplier / Dealer onboarding requires a minimum business capital of ₹10,00,000.', 'error');
      return;
    }
    addToast('Business details & capital eligibility verified!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 3 — Business Profile & Location Tier
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Company & Location Classification
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Select your business category and location tier to view applicable One-Time Wholesaler Onboarding Fee ranges.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Registered Business / Enterprise Name *
              </label>
              <div className="relative flex items-center">
                <Building2 size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => updateFormData({ businessName: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter registered business name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Business Type *
              </label>
              <div className="relative flex items-center">
                <Briefcase size={18} className="absolute left-3.5 text-slate-400" />
                <select
                  value={formData.businessType}
                  onChange={(e) => updateFormData({ businessType: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Primary Business Category *
              </label>
              <div className="relative flex items-center">
                <Tag size={18} className="absolute left-3.5 text-slate-400" />
                <select
                  value={formData.businessCategory}
                  onChange={(e) => updateFormData({ businessCategory: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location Tier Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Business Location Classification (Determines Mandatory Onboarding Fee) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CITY_TIERS.map((tier) => {
                const isSelected = formData.cityType === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => updateFormData({ cityType: tier.id })}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    <MapPin size={18} className={isSelected ? 'text-emerald-500' : 'text-slate-400'} />
                    <h3 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">{tier.label}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">{tier.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estimated Fee Preview Callout */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Estimated Wholesaler Onboarding Fee Range
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Based on <strong className="text-white">{formData.cityType || 'Tier 2 City'}</strong> & <strong className="text-white">{formData.businessCategory || 'FMCG'}</strong> category:
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-emerald-400">{currentFeeData.range}</span>
              <span className="block text-[10px] text-slate-400 font-semibold">{currentFeeData.comm} Comm</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Business Capital / Investment (INR) *
              </label>
              <div className="relative flex items-center">
                <DollarSign size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="50000"
                  required
                  value={formData.businessCapital ?? 2500000}
                  onChange={(e) => updateFormData({ businessCapital: Number(e.target.value) })}
                  className={`w-full rounded-2xl border bg-page dark:bg-slate-950 pl-11 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    Number(formData.businessCapital ?? 2500000) < 1000000
                      ? 'border-rose-500 text-rose-600 focus:ring-rose-500/20'
                      : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                  }`}
                  placeholder="Enter business capital (e.g. 2500000)"
                />
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-slate-500">
                Min required: <strong className="text-slate-900 dark:text-white">₹10,00,000 (10 Lakhs)</strong>.
                {Number(formData.businessCapital ?? 2500000) < 1000000 && (
                  <span className="block text-rose-500 font-extrabold mt-0.5">⚠️ Below minimum ₹10L eligibility threshold!</span>
                )}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Brand Name (Optional)
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => updateFormData({ brandName: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter brand name (if any)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Years in Business *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.yearsInBusiness}
                onChange={(e) => updateFormData({ yearsInBusiness: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter years in business"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Employees Count
              </label>
              <select
                value={formData.numberOfEmployees}
                onChange={(e) => updateFormData({ numberOfEmployees: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {EMPLOYEE_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r} Employees
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Company Description & Overview *
            </label>
            <textarea
              rows={3}
              required
              value={formData.companyDescription}
              onChange={(e) => updateFormData({ companyDescription: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 p-4 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Describe your wholesale operations, product catalogue scale, and distribution reach..."
            />
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
