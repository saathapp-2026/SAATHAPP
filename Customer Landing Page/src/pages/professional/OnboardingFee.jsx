import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Package, Wrench, Crown } from 'lucide-react';
import PricingCard from '../../components/seller/PricingCard';
import FeeBreakdownCard from '../../components/seller/FeeBreakdownCard';
import PaymentSummary from '../../components/seller/PaymentSummary';
import { useProfessionalOnboarding } from '../../context/ProfessionalOnboardingContext';
import { createOnboardingPayment, getCommissionRateApi } from '../../services/professionalApi';
import { getProfessionalPricingConfig } from '../../config/professionalOnboardingConfig';
import { getWelcomeKitConfig, getWelcomeKitEligibilityStatus } from '../../config/professional/welcomeKitConfig';
import { getEquipmentConfig } from '../../config/professional/equipmentConfig';
import { getProfessionalMembershipPlans } from '../../config/professional/membershipPlans';

function formatRange(min, max) {
  return `₹${Number(min).toLocaleString('en-IN')} – ₹${Number(max).toLocaleString('en-IN')}`;
}

function GroupFeeTable({ title, groups }) {
  const rows = Object.values(groups || {});
  if (!rows.length) return null;
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 overflow-x-auto">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-slate-500 border-b border-white/10">
            <th className="py-2 pr-3 font-medium">Group</th>
            <th className="py-2 pr-3 font-medium">Fee</th>
            <th className="py-2 pr-3 font-medium">Commission</th>
            <th className="py-2 font-medium">Renewal / Validity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((g) => (
            <tr key={g.label} className="border-b border-white/5 text-slate-300">
              <td className="py-2 pr-3">{g.label}</td>
              <td className="py-2 pr-3">{formatRange(g.min, g.max)}</td>
              <td className="py-2 pr-3">{g.commissionMin}–{g.commissionMax}%</td>
              <td className="py-2">50% · 2 years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VillageFeeTable({ villageFees, categoryLabels }) {
  const ids = Object.keys(villageFees || {});
  if (!ids.length) return null;
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 overflow-x-auto max-h-80 overflow-y-auto">
      <h3 className="font-semibold text-sm mb-3">Village Pricing Table</h3>
      <table className="w-full text-left text-xs">
        <thead className="sticky top-0 bg-slate-900">
          <tr className="text-slate-500 border-b border-white/10">
            <th className="py-2 pr-3 font-medium">Profession</th>
            <th className="py-2 pr-3 font-medium">Fee</th>
            <th className="py-2 pr-3 font-medium">Commission</th>
            <th className="py-2 font-medium">Renewal / Validity</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id) => {
            const row = villageFees[id];
            return (
              <tr key={id} className="border-b border-white/5 text-slate-300">
                <td className="py-2 pr-3">{categoryLabels?.[id] || id}</td>
                <td className="py-2 pr-3">{formatRange(row.min, row.max)}</td>
                <td className="py-2 pr-3">{row.commissionMin}–{row.commissionMax}%</td>
                <td className="py-2">50% · 2 years</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ProfessionalOnboardingFee() {
  const navigate = useNavigate();
  const { data, updateSection, selectMembership, calculateFee, processPayment, feeLoading, feeError } = useProfessionalOnboarding();
  const [commission, setCommission] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const [membershipLoading, setMembershipLoading] = useState(false);

  const hasOnboardingData = Boolean(data?.meta?.partnerId || data?.accountInfo?.name || data?.accountInfo?.phone);
  const termsAccepted = Boolean(data.onboardingFee?.termsAccepted);
  const feeData = data.onboardingFee?.breakdown;
  const fee = data.onboardingFee?.calculatedFee;

  let pricingConfig = {};
  let welcomeKit = { title: 'Welcome Kit', badge: '', description: '', items: [], rules: [] };
  let equipment = { uniforms: [], safety: [], tools: [], vehicle: [], rental: [], digitalServices: [], importantTerms: [] };
  let plans = [];
  try {
    pricingConfig = getProfessionalPricingConfig() || {};
    welcomeKit = getWelcomeKitConfig() || welcomeKit;
    equipment = getEquipmentConfig() || equipment;
    plans = getProfessionalMembershipPlans() || [];
  } catch {
    // Config load failure — page still renders with empty sections
  }
  const kitStatus = getWelcomeKitEligibilityStatus(data.membership?.planId, data.status);

  useEffect(() => {
    if (!hasOnboardingData) return;
    calculateFee().catch(() => {});
    getCommissionRateApi(data.accountInfo?.category, data).then(setCommission).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasOnboardingData]);

  if (!hasOnboardingData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full rounded-xl bg-white/5 border border-white/10 p-8 text-center space-y-4">
          <AlertCircle className="mx-auto text-amber-400" size={32} />
          <h1 className="text-xl font-bold">No onboarding data found.</h1>
          <p className="text-sm text-slate-400">Complete registration first to calculate your Service Professional onboarding fee.</p>
          <button
            type="button"
            onClick={() => navigate('/professional/register')}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer border-0"
          >
            <ArrowLeft size={14} /> Back to Registration
          </button>
        </div>
      </div>
    );
  }

  const handleMembershipSelect = async (planId) => {
    setMembershipLoading(true);
    try {
      await selectMembership(planId);
    } finally {
      setMembershipLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!termsAccepted) {
      setError('Please accept Terms & Conditions on the Terms page before payment.');
      return;
    }
    if (data.onboardingFee?.paymentStatus === 'paid') {
      navigate('/professional/payment-success', { replace: true });
      return;
    }
    setPaying(true);
    setError(null);
    try {
      const payment = await createOnboardingPayment({
        fee,
        onboardingData: data,
        partnerId: data.meta?.partnerId,
      });
      const verified = await processPayment(payment);
      updateSection('onboardingFee', {
        paymentStatus: 'paid',
        paymentId: verified.paymentId,
        paidAt: verified.paidAt,
        validityStart: verified.validityStart,
        validityEnd: verified.validityEnd,
      });
      navigate('/professional/payment-success');
    } catch {
      setError('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <button type="button" onClick={() => navigate('/professional/register')} className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer">
          <ArrowLeft size={12} /> Back to Registration
        </button>

        <div>
          <h1 className="text-2xl font-black">Service Professional Onboarding Fee</h1>
          <p className="text-sm text-slate-400 mt-1">Mandatory one-time fee · {pricingConfig.feeRangeDisplay} · Valid {pricingConfig.validityYears} years · Renewal {pricingConfig.renewalPercentage}%</p>
        </div>

        {/* General Rules */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl bg-slate-800/50 border border-white/10 p-4 space-y-2 text-sm text-slate-300">
          <h3 className="font-semibold text-indigo-400">General Rules</h3>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• One-Time Onboarding Fee (Mandatory)</li>
            <li>• Validity: {pricingConfig.validityYears || 2} years from payment</li>
            <li>• Renewal: {pricingConfig.renewalPercentage || 50}% of applicable onboarding fee</li>
            <li>• Commission: {pricingConfig.commissionRangeDisplay || '5–12%'} on completed bookings</li>
            <li>• Fee range: {pricingConfig.feeRangeDisplay || '₹500 – ₹2,00,000'}</li>
          </ul>
          <p className="text-xs text-slate-500 pt-1">Fee factors: Location, Category, Radius, Experience, Individual/Agency, Staff, Equipment, Verification, Business Scale</p>
        </motion.div>

        {!termsAccepted && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>Terms not accepted yet. Accept Terms before payment.</span>
            <button type="button" onClick={() => navigate('/professional/terms')} className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-100 text-xs font-bold cursor-pointer">
              View Terms
            </button>
          </div>
        )}

        {data.onboardingFee?.paymentStatus === 'paid' && (
          <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4">
            <h3 className="font-semibold text-indigo-400 mb-1">Payment Already Completed</h3>
            <p className="text-sm text-slate-400">Fee of ₹{data.onboardingFee.calculatedFee?.toLocaleString('en-IN')} paid. Duplicate payments are not allowed.</p>
          </div>
        )}

        {(feeError || error) && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <AlertCircle size={18} />
            {feeError || error}
          </div>
        )}

        {/* Location Pricing Tables from professionalPricing.json */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Location Pricing</h2>
          <VillageFeeTable villageFees={pricingConfig.villageFees} categoryLabels={pricingConfig.categoryLabels} />
          <GroupFeeTable title="Tier 3 Town Table" groups={pricingConfig.tier3Fees} />
          <GroupFeeTable title="Tier 2 City Table" groups={pricingConfig.tier2Fees} />
          <GroupFeeTable title="Tier 1 Metro Table" groups={pricingConfig.metroFees} />
        </div>

        {/* Calculated fee summary + payment */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PricingCard feeData={feeData} loading={feeLoading} title="Your Calculated Onboarding Fee" />
            {!feeLoading && !feeData && (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-200">
                Unable to calculate fee. Check your registration details and try Recalculate Fee.
              </div>
            )}
            <FeeBreakdownCard breakdown={feeData} loading={feeLoading} />
          </div>
          <div className="space-y-6">
            <PaymentSummary
              fee={fee}
              commission={commission}
              loading={feeLoading || paying}
              onPay={handlePayment}
              disabled={!termsAccepted || paying || data.onboardingFee?.paymentStatus === 'paid'}
            />
            {feeData?.renewalAmount != null && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-slate-400">
                <p>Renewal after {pricingConfig.validityYears} years: <strong className="text-white">₹{feeData.renewalAmount.toLocaleString('en-IN')}</strong> (50%)</p>
                <p className="mt-1">Commission range: <strong className="text-indigo-300">{feeData.commissionDisplay || commission?.display}</strong></p>
              </div>
            )}
          </div>
        </div>

        {/* Membership from professionalMembership.json */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Crown size={18} className="text-indigo-400" />
            <h3 className="font-semibold">Optional Monthly Membership</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">Separate from onboarding fee. Welcome Kit only with Growth ₹2,499 or Enterprise ₹4,999.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {plans.map((plan) => {
              const active = data.membership?.planId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  disabled={membershipLoading}
                  onClick={() => handleMembershipSelect(plan.id)}
                  className={`text-left p-3 rounded-xl border cursor-pointer transition-colors ${active ? 'bg-indigo-500/20 border-indigo-400' : 'bg-white/5 border-white/10 hover:border-indigo-500/40'}`}
                >
                  <p className="text-sm font-bold">{plan.name}</p>
                  <p className="text-indigo-300 text-sm mt-1">₹{plan.price.toLocaleString('en-IN')}/mo</p>
                  <p className="text-[10px] text-slate-500 mt-1">{plan.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Welcome Kit */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-indigo-400" />
            <h3 className="font-semibold">{welcomeKit.title}</h3>
          </div>
          <p className="text-xs text-slate-400 mb-2">{welcomeKit.badge}</p>
          <p className="text-xs text-slate-500 mb-3">{welcomeKit.description}</p>
          <p className={`text-xs font-bold mb-2 ${kitStatus.eligible ? 'text-emerald-400' : 'text-amber-400'}`}>
            {kitStatus.eligible
              ? 'Eligible — Growth/Enterprise + verified + activated'
              : 'Requires Growth ₹2,499 or Enterprise ₹4,999 AND verification complete AND activation complete'}
          </p>
          <ul className="grid sm:grid-cols-2 gap-1">
            {welcomeKit.items.map((item) => (
              <li key={item.id} className="text-xs text-slate-300">• {item.name}</li>
            ))}
          </ul>
        </div>

        {/* Equipment from equipmentConfig.js */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wrench size={18} className="text-indigo-400" />
            <h3 className="font-semibold">Professional Equipment & Digital Services</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <p className="font-bold text-slate-300 mb-2">Professional Uniforms</p>
              {equipment.uniforms.map((i) => <p key={i.id}>• {i.name}: ₹{i.price.toLocaleString('en-IN')}</p>)}
              <p className="font-bold text-slate-300 mb-2 mt-3">Safety Equipment</p>
              {equipment.safety.map((i) => <p key={i.id}>• {i.name}: ₹{i.price.toLocaleString('en-IN')}</p>)}
              <p className="font-bold text-slate-300 mb-2 mt-3">Professional Tools</p>
              {equipment.tools.map((i) => <p key={i.id}>• {i.name}: ₹{i.price.toLocaleString('en-IN')}</p>)}
            </div>
            <div>
              <p className="font-bold text-slate-300 mb-2">Vehicle Support</p>
              {equipment.vehicle.map((i) => <p key={i.id}>• {i.name}: ₹{i.price.toLocaleString('en-IN')}</p>)}
              <p className="font-bold text-slate-300 mb-2 mt-3">Heavy Equipment Rental</p>
              {equipment.rental.map((i) => <p key={i.id}>• {i.name}: ₹{i.monthlyRent}/mo (deposit ₹{i.deposit.toLocaleString('en-IN')})</p>)}
              <p className="font-bold text-slate-300 mb-2 mt-3">Business & Digital Services</p>
              {equipment.digitalServices.map((i) => <p key={i.id}>• {i.name}: ₹{i.price.toLocaleString('en-IN')}</p>)}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={() => calculateFee()} disabled={feeLoading} className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 disabled:opacity-50 cursor-pointer">
            {feeLoading ? 'Recalculating...' : 'Recalculate Fee'}
          </button>
          {data.onboardingFee?.paymentStatus === 'paid' && (
            <button type="button" onClick={() => navigate('/professional/review')} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer">
              Continue to Final Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
