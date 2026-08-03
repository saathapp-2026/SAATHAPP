import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Gift, ArrowRight, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const OPTIONAL_MEMBERSHIP_PLANS = [
  {
    id: 'Free',
    name: 'Free Plan',
    price: '₹0',
    period: '/ month',
    desc: 'Perfect for trying SAATHAPP. Standard features included.',
    popular: false,
    welcomeKit: false,
    features: [
      'Up to 100 Products',
      'Basic Store Profile & Seller Badge',
      'Basic Inventory & Stock Management',
      'Basic Wholesale Dashboard',
      'Standard Order Management',
      'Standard Customer Support',
      'Mobile App Access',
    ],
  },
  {
    id: 'Starter',
    name: 'Starter Wholesaler',
    price: '₹799',
    period: '/ month',
    desc: 'Suitable for small wholesalers and regional suppliers.',
    popular: false,
    welcomeKit: false,
    features: [
      'Up to 5,000 Products',
      'GST Billing & Tax Invoice Generator',
      'Quotation & Purchase Order Generator',
      'Stock Management & Inventory Reports',
      'Customer & Supplier Database',
      '2 GB Business Document Storage',
      'Barcode Support & QR Billing',
      'WhatsApp & Email Support',
    ],
  },
  {
    id: 'Growth',
    name: 'Growth Plan',
    price: '₹2,499',
    period: '/ month',
    desc: 'Designed for growing wholesalers and distributors.',
    popular: true,
    welcomeKit: 'FREE Welcome Business Kit Included',
    features: [
      'Unlimited Products & Orders',
      'Advanced GST Billing & Bulk Invoicing',
      'Advanced Inventory & Warehouse Management',
      'Branch Management (Up to 3 Branches)',
      'Multi-User Access (10 Staff Logins)',
      'Advanced Sales Analytics & P&L Reports',
      'Vendor & Distributor Management',
      'Excel Bulk Import/Export & Daily Data Backup',
      'API Access & Priority Customer Support',
    ],
    kitItems: [
      'Premium QR Stand',
      'Shop QR Sticker',
      'Wholesaler Certificate',
      'Logo Badge & ID Card',
      'Shop Branding Kit',
    ],
  },
  {
    id: 'Enterprise',
    name: 'Enterprise Plan',
    price: '₹4,999',
    period: '/ month',
    desc: 'For large wholesalers, manufacturers, & multi-location businesses.',
    popular: false,
    welcomeKit: 'FREE Premium Branding Kit Included',
    features: [
      'Unlimited Users, Warehouses & Branches',
      'Multi Location Inventory & Company Management',
      'Custom GST Reports & AI Business Analytics',
      'Sales Forecasting & Auto Reordering',
      'Distributor & Franchise Network Management',
      'Priority Marketplace Listing',
      'ERP, POS, Barcode & Thermal Printer Integration',
      '24×7 Priority Support & Dedicated Account Manager',
    ],
    kitItems: [
      'Premium QR Stand & Shop Branding Kit',
      'Premium Seller Certificate & Logo Badge',
      'Featured Seller & Verified Business Badge',
    ],
  },
];

export default function Step12_OptionalMembership({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const handleSelectPlan = (planId) => {
    updateFormData({
      selectedPlan: planId,
      isMembershipOptionalSelected: planId !== 'Free',
      welcomeKitEligible: planId === 'Growth' || planId === 'Enterprise',
    });
    addToast(`Selected ${planId} Membership Plan!`, 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Membership preference saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
          Phase 11 — Optional Monthly Membership
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Optional Monthly Membership Plans
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Monthly membership is <strong className="text-emerald-600 dark:text-emerald-400">100% Optional</strong>. You can register using only the One-Time Onboarding Fee and activate a plan anytime later.
            </p>
          </div>
        </div>

        {/* Notice Box */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          <Info size={18} className="shrink-0 text-emerald-500" />
          <span>
            You are currently registering with the One-Time Onboarding Fee. Select a plan below, or choose <strong>Free (₹0/mo)</strong> to operate with standard features. You can upgrade, downgrade, or cancel anytime.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPTIONAL_MEMBERSHIP_PLANS.map((plan) => {
              const isSelected = formData.selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`relative cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/30 text-slate-900 dark:text-white shadow-xl ring-2 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 text-slate-950 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 font-medium leading-snug">{plan.desc}</p>

                    {plan.welcomeKit && (
                      <div className="mt-3 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Gift size={12} /> {plan.welcomeKit}
                      </div>
                    )}

                    <ul className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan.id);
                      }}
                      className={`w-full rounded-xl py-2 text-xs font-extrabold transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ Plan Selected' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
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
              Continue to Terms & Review
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
