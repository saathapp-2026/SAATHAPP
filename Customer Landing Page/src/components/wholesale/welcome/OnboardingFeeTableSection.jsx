import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Tag, ArrowRight, CheckCircle2, Clock, Info, HelpCircle } from 'lucide-react';
import { ONBOARDING_FEE_MATRIX, calculateOnboardingFee } from '../../../context/WholesaleContext';

export default function OnboardingFeeTableSection({ onStartRegistration }) {
  const [selectedTier, setSelectedTier] = useState('Tier 2 City');
  const [selectedCat, setSelectedCat] = useState('Grocery');

  const feeResult = calculateOnboardingFee(selectedTier, selectedCat);

  return (
    <section id="fee-structure" aria-labelledby="fee-heading" className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-400">
            <ShieldCheck size={16} /> Transparent Fee Structure
          </div>
          <h2 id="fee-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Wholesaler Onboarding Fee & Pricing Structure
          </h2>
          <p className="text-base text-slate-300 font-medium leading-relaxed">
            Joining the SAATHAPP Wholesale Network consists of two distinct payment models. One-Time Onboarding Fee is mandatory for account activation, while Monthly Membership is 100% optional.
          </p>
        </div>

        {/* 2 Payment Models Breakdown Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                1. Mandatory Registration
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">One-Time Wholesaler Onboarding Fee</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Payable only once upon registration. Covers business verification, GST/PAN audit, warehouse inspection, digital store creation, and account activation.
            </p>
            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <p>• <strong>Fee Formula:</strong> Capital × Location Tier Percentage / 100</p>
              <p>• <strong>Minimum Capital:</strong> ₹10,00,000 required for eligibility</p>
              <p>• <strong>Commission:</strong> 0–8% or 3–8% based on business model</p>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-500/30 bg-slate-950/60 p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                2. Optional Service
              </span>
              <span className="text-xs font-extrabold text-emerald-400">Compulsory: NO</span>
            </div>
            <h3 className="text-2xl font-black text-white">Monthly Membership Plans (Optional)</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Not required during registration! Wholesalers can register using only the One-Time Fee and start selling. Activate or change membership plans anytime later.
            </p>
            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <p>• <strong>Free Plan:</strong> ₹0/month (Standard dashboard & orders)</p>
              <p>• <strong>Premium Plans:</strong> ₹799/mo to ₹4,999/mo (Unlocks GST billing, multi-user, POS, & branding kits)</p>
              <p>• <strong>Flexibility:</strong> Upgrade, downgrade, or cancel anytime</p>
            </div>
          </div>
        </div>

        {/* Interactive Fee Matrix Calculator */}
        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl font-black text-white">Official Wholesaler Onboarding Fee Matrix</h3>
              <p className="text-xs text-slate-400 mt-1">
                Onboarding Fee = Business Capital × Applicable Percentage / 100 (Minimum required capital = ₹10,00,000)
              </p>
            </div>
          </div>

          {/* Fee Rate Matrix Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Location Tier</th>
                  <th className="p-3.5">₹10–25L Capital</th>
                  <th className="p-3.5">₹25–50L Capital</th>
                  <th className="p-3.5">₹50L–₹1Cr Capital</th>
                  <th className="p-3.5">₹1–10Cr Capital</th>
                  <th className="p-3.5 text-right">Above ₹10Cr Capital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-semibold text-slate-300">
                {[
                  { tier: 'Village / Rural', r10: '0.50%', r25: '0.30%', r50: '0.20%', r1cr: '0.10%', r10cr: '0.05%' },
                  { tier: 'Tier 3 City', r10: '0.60%', r25: '0.40%', r50: '0.25%', r1cr: '0.12%', r10cr: '0.06%' },
                  { tier: 'Tier 2 City', r10: '0.75%', r25: '0.50%', r50: '0.30%', r1cr: '0.15%', r10cr: '0.08%' },
                  { tier: 'Tier 1 City', r10: '1.00%', r25: '0.60%', r50: '0.40%', r1cr: '0.20%', r10cr: '0.10%' },
                  { tier: 'Metro City', r10: '1.00%', r25: '0.75%', r50: '0.50%', r1cr: '0.25%', r10cr: '0.10%' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      {row.tier}
                    </td>
                    <td className="p-3.5 font-black text-emerald-400">{row.r10}</td>
                    <td className="p-3.5 text-emerald-300 font-bold">{row.r25}</td>
                    <td className="p-3.5 text-slate-200 font-bold">{row.r50}</td>
                    <td className="p-3.5 text-slate-300">{row.r1cr}</td>
                    <td className="p-3.5 text-right font-black text-amber-400">{row.r10cr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span>Applications with capital below ₹10,00,000 are not eligible for Wholesale / Supplier / Dealer partner onboarding.</span>
            </div>
            <button
              type="button"
              onClick={onStartRegistration}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3.5 text-xs font-black shadow-lg transition hover:scale-105"
            >
              Start Wholesaler Registration
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
