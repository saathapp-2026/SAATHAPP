import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import {
  calculateOnboardingFee,
  formatInr,
  getValidityExpiryDate,
  getValidityLabel,
  ONBOARDING_VALIDITY_YEARS,
} from '../../../utils/wholesaleOnboardingPricing';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major Indian banks' },
  { id: 'wallet', label: 'SaathApp Wallet', icon: Wallet, desc: 'Pay from wallet balance' },
];

export default function Step12_OnboardingPayment({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');

  const feeResult = useMemo(
    () =>
      calculateOnboardingFee({
        cityType: formData.cityType,
        businessType: formData.businessType,
        serviceCoverageArea: formData.serviceCoverageArea,
        businessCategory: formData.businessCategory,
        selectedPlan: formData.selectedPlan,
      }),
    [formData]
  );

  const handlePay = async (e) => {
    e.preventDefault();

    if (!formData.onboardingPaymentMethod) {
      addToast('Please select a payment method', 'error');
      return;
    }

    if (formData.onboardingPaymentMethod === 'upi' && !upiId.trim()) {
      addToast('Please enter your UPI ID', 'error');
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));

    const paymentDate = new Date().toISOString().split('T')[0];
    const validityExpiry = getValidityExpiryDate();

    updateFormData({
      onboardingFeeAmount: feeResult.amount,
      onboardingPaymentCompleted: true,
      onboardingPaymentDate: paymentDate,
      onboardingValidityExpiry: validityExpiry,
      onboardingPaymentId: `SAATH-WHL-${Date.now().toString(36).toUpperCase()}`,
      onboardingPaymentUpi: formData.onboardingPaymentMethod === 'upi' ? upiId : '',
      applicationStatus: 'Payment Received — Pending Review',
    });

    setIsProcessing(false);
    addToast('Onboarding fee paid successfully! You can now submit for review.', 'success');
    onNext();
  };

  if (formData.onboardingPaymentCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl py-16 px-4 text-center"
      >
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-10">
          <CheckCircle2 size={56} className="mx-auto text-emerald-500 mb-4" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Payment Successful</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {formatInr(formData.onboardingFeeAmount)} paid · Valid for {ONBOARDING_VALIDITY_YEARS} years
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            {getValidityLabel(formData.onboardingValidityExpiry)}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-extrabold text-white"
          >
            Continue to Review
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 11 — Onboarding Fee Payment
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Pay Wholesale Onboarding Fee
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Complete payment before application review. Your wholesale account will not be verified until this one-time fee is paid.
        </p>

        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
          <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>Important:</strong> No account creation or document review will begin until onboarding fee payment is successful.
            This is a one-time fee with {ONBOARDING_VALIDITY_YEARS}-year partner validity.
          </p>
        </div>

        <form onSubmit={handlePay} className="mt-8 space-y-8">
          {/* Fee Summary */}
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Amount Payable</p>
                <p className="mt-1 text-4xl font-black text-slate-900 dark:text-white">
                  {formatInr(feeResult.amount)}
                </p>
                <p className="mt-1 text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Calendar size={12} />
                  {ONBOARDING_VALIDITY_YEARS}-year validity from payment date
                </p>
              </div>
              <div className="text-xs space-y-1.5 sm:text-right">
                <p><span className="text-slate-500">City:</span> <strong>{formData.cityType}</strong></p>
                <p><span className="text-slate-500">Business:</span> <strong>{formData.businessType}</strong></p>
                <p><span className="text-slate-500">Coverage:</span> <strong>{formData.serviceCoverageArea}</strong></p>
                <p><span className="text-slate-500">Category:</span> <strong>{formData.businessCategory}</strong></p>
                <p><span className="text-slate-500">Plan:</span> <strong>{formData.selectedPlan}</strong></p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Select Payment Method *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = formData.onboardingPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => updateFormData({ onboardingPaymentMethod: method.id })}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white">{method.label}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{method.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {formData.onboardingPaymentMethod === 'upi' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                UPI ID *
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 flex items-center gap-3">
            <IndianRupee size={20} className="text-emerald-500 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Secure payment powered by SaathApp. GST invoice will be generated after successful payment.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay {formatInr(feeResult.amount)}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
