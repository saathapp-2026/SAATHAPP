import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, ArrowRight, CheckCircle2, Clock, Info, Truck } from 'lucide-react';
import { DELIVERY_FEE_MATRIX, calculateDeliveryOnboardingFee } from '../../../context/DeliveryContext';

export default function DeliveryFeeTableSection({ onStartRegistration }) {
  const [selectedTier, setSelectedTier] = useState('Tier 2 City');
  const [selectedCat, setSelectedCat] = useState('Motorcycle Delivery');

  const feeResult = calculateDeliveryOnboardingFee(selectedTier, selectedCat);

  return (
    <section id="delivery-fee-structure" aria-labelledby="delivery-fee-heading" className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
            <Truck size={16} /> Transparent Rider Onboarding Fee
          </div>
          <h2 id="delivery-fee-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Delivery Partner Onboarding Fee Structure
          </h2>
          <p className="text-base text-slate-300 font-medium leading-relaxed">
            One-time onboarding fee for individuals joining the SAATHAPP Delivery Network. Payable only once and valid for 2 years from successful activation.
          </p>
        </div>

        {/* 2 Key Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-950/30 p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">
                One-Time Onboarding Fee
              </span>
              <span className="text-xs font-extrabold text-slate-300">Valid for 2 Years</span>
            </div>
            <h3 className="text-2xl font-black text-white">Rider Account & Profile Setup</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Covers identity verification, background check, DL/RC audit, rider app activation, training materials, and 2-year valid account setup.
            </p>
            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <p>• <strong>Fee Range:</strong> ₹550 – ₹2,000 (Based on location tier & delivery category)</p>
              <p>• <strong>Renewal:</strong> 50% of applicable onboarding fee after 2 years</p>
              <p>• <strong>Earnings:</strong> Calculated based on completed order deliveries & payouts</p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-slate-950/60 p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                Zero Monthly Compulsion
              </span>
              <span className="text-xs font-extrabold text-emerald-400">Monthly Subscriptions: NO</span>
            </div>
            <h3 className="text-2xl font-black text-white">Keep 100% of Delivery Payouts</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              No mandatory monthly subscriptions! Delivery Partners operate freely after account activation. Optional safety gear and uniforms can be ordered on-demand.
            </p>
            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <p>• <strong>Flexible Work:</strong> Full-Time, Part-Time, or Weekend Rider</p>
              <p>• <strong>Payouts:</strong> Daily & Weekly wallet settlement directly to bank/UPI</p>
              <p>• <strong>Safety Gear:</strong> Optional uniforms, helmets, and delivery bags available on request</p>
            </div>
          </div>
        </div>

        {/* Interactive Delivery Fee Matrix Calculator */}
        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl font-black text-white">Delivery Partner Fee Matrix by Location Tier</h3>
              <p className="text-xs text-slate-400 mt-1">Select location classification to view exact onboarding fee breakdown.</p>
            </div>

            {/* Location Tier Tabs */}
            <div className="flex flex-wrap gap-2">
              {['Village', 'Tier 3 Town', 'Tier 2 City', 'Tier 1 Metro'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                    selectedTier === tier
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Fee Table for Selected Tier */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Delivery Category</th>
                  <th className="p-3.5">One-Time Onboarding Fee</th>
                  <th className="p-3.5">Renewal Fee (After 2 Yrs)</th>
                  <th className="p-3.5 text-right">Validity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-semibold text-slate-300">
                {Object.entries(DELIVERY_FEE_MATRIX[selectedTier] || {}).map(([cat, data], idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      {cat}
                    </td>
                    <td className="p-3.5 font-black text-amber-400">{data.range}</td>
                    <td className="p-3.5 text-slate-400">50% of Fee</td>
                    <td className="p-3.5 text-right text-slate-400">2 Years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span>Ready to start delivering & earning with SaathApp?</span>
            </div>
            <button
              type="button"
              onClick={onStartRegistration}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 text-xs font-black shadow-lg transition hover:scale-105"
            >
              Apply as Rider Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
