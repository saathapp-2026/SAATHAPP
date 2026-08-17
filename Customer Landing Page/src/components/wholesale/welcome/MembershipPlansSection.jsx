import React from 'react';
import { Check, Sparkles, Gift } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const MEMBERSHIP_PLANS_DATA = [
  {
    id: 'Free',
    name: 'Free',
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
      'Customer Support',
      'Mobile App Access',
    ],
  },
  {
    id: 'Starter',
    name: 'Starter',
    price: '₹799',
    period: '/ month',
    desc: 'Suitable for small wholesalers and suppliers.',
    popular: false,
    welcomeKit: false,
    features: [
      'Up to 5,000 Products',
      'GST Billing & Tax Invoice Generator',
      'Invoice & Quotation Generator',
      'Purchase Orders & Stock Management',
      'Customer & Supplier Database',
      '2 GB Business Document Storage',
      'Barcode Support & QR Billing',
      'WhatsApp & Email Support',
    ],
  },
  {
    id: 'Growth',
    name: 'Growth',
    price: '₹2,499',
    period: '/ month',
    desc: 'Designed for growing wholesalers & distributors.',
    popular: true,
    welcomeKit: 'FREE Welcome Business Kit Included',
    features: [
      'Unlimited Products & Orders',
      'Advanced GST Billing & Bulk Invoices',
      'Advanced Inventory & Warehouse Management',
      'Branch Management (Up to 3 Branches)',
      'Multi-User Login (10 Staff Users)',
      'Staff Permission Control & Sales Analytics',
      'Distributor & Vendor Management',
      'Excel Import/Export & Daily Data Backup',
      'Basic API Access & Priority Customer Support',
    ],
  },
  {
    id: 'Enterprise',
    name: 'Enterprise',
    price: '₹4,999',
    period: '/ month',
    desc: 'For large wholesalers, manufacturers & multi-location businesses.',
    popular: false,
    welcomeKit: 'FREE Premium Branding Kit Included',
    features: [
      'Unlimited Users, Warehouses & Branches',
      'Multi Location Inventory & Company Management',
      'Custom GST Reports & AI Business Analytics',
      'Sales Forecasting & Auto Reordering',
      'Distributor Network & Franchise Management',
      'Priority Marketplace Listing',
      'API, ERP, POS, & Thermal Printer Integration',
      '24×7 Priority Support & Dedicated Account Manager',
    ],
  },
];

export default function MembershipPlansSection({ onStartRegistration }) {
  const wholesaleCtx = useWholesale();

  const handleStartWithPlan = (planId) => {
    if (wholesaleCtx && wholesaleCtx.updateFormData) {
      wholesaleCtx.updateFormData({
        selectedPlan: planId,
        isMembershipOptionalSelected: planId !== 'Free',
        welcomeKitEligible: planId === 'Growth' || planId === 'Enterprise',
      });
    }
    if (onStartRegistration) {
      onStartRegistration();
    }
  };

  return (
    <section id="membership-plans" aria-labelledby="membership-heading" className="py-20 sm:py-24 bg-page dark:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Sparkles size={16} /> Optional Business Tools
          </div>
          <h2 id="membership-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Optional Monthly Membership Plans
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Monthly membership is <strong className="text-[#0A8F3D]">completely optional</strong>. You can complete registration using only the One-Time Fee and operate on the platform using standard features.
          </p>
        </div>

        {/* Plan Cards Grid with Hover Highlight Effects */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS_DATA.map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl border p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,143,61,0.2)] hover:border-[#0A8F3D] hover:ring-2 hover:ring-[#0A8F3D]/40 ${
                plan.popular
                  ? 'border-[#0A8F3D] bg-surface shadow-2xl ring-2 ring-[#0A8F3D]'
                  : 'border-slate-200/70 dark:border-slate-800/60 bg-surface shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0A8F3D] text-white px-3.5 py-1 text-[10px] font-black uppercase tracking-wider shadow">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-[#0A8F3D] transition-colors">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#0A8F3D] dark:text-emerald-400">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">{plan.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-snug">{plan.desc}</p>

                {plan.welcomeKit && (
                  <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 group-hover:bg-amber-500/20 transition-colors">
                    <Gift size={14} className="shrink-0 text-amber-500" /> {plan.welcomeKit}
                  </div>
                )}

                <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-[#0A8F3D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleStartWithPlan(plan.id)}
                  className={`w-full rounded-2xl py-3 text-xs font-extrabold transition-all duration-200 shadow group-hover:scale-[1.02] ${
                    plan.popular
                      ? 'bg-[#0A8F3D] hover:bg-[#087a34] text-white shadow-[#0A8F3D]/20'
                      : 'bg-slate-900 text-white hover:bg-[#0A8F3D]'
                  }`}
                >
                  Start Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
