import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Edit3, Send, ShieldCheck, ArrowLeft, Building2, User, MapPin, Landmark, CreditCard, AlertTriangle } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import { formatInr, getValidityLabel } from '../../../utils/wholesaleOnboardingPricing';

export default function Step12_ReviewSubmit({ onNext, onPrev, onSelectStep }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const handleSubmitApplication = () => {
    if (!formData.onboardingPaymentCompleted) {
      addToast('Please complete onboarding fee payment before submitting for review', 'error');
      onSelectStep(12);
      return;
    }

    updateFormData({
      applicationStatus: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
    });
    addToast('Wholesale application submitted successfully! Verifying documents...', 'success');
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
          Phase 12 — Application Review & Submission
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Review Wholesale Application Details
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Verify all information before final submission. Click "Edit" next to any section to make updates.
        </p>

        <div className="mt-8 space-y-6">
          {!formData.onboardingPaymentCompleted ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3">
              <AlertTriangle size={22} className="text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-extrabold text-red-700 dark:text-red-300">Payment Required</p>
                <p className="mt-1 text-xs text-red-600/90 dark:text-red-200/90 font-medium">
                  Your application cannot be submitted or reviewed until the one-time onboarding fee is paid.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectStep(12)}
                  className="mt-3 text-xs font-bold text-red-700 dark:text-red-300 underline"
                >
                  Go to Payment Step →
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-3">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>Onboarding Fee — Paid</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectStep(12)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View Receipt
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Amount:</span>
                  <span className="font-bold text-emerald-600">{formatInr(formData.onboardingFeeAmount)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment ID:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.onboardingPaymentId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">City Type:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.cityType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Validity:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{getValidityLabel(formData.onboardingValidityExpiry)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Owner Details */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                <User size={18} className="text-emerald-500" />
                <span>1. Business Owner & Key Contact</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectStep(3)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <Edit3 size={13} /> Edit
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Full Name:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Designation:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.designation}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mobile:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">+91 {formData.ownerMobile}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.ownerEmail}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Business Info */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                <Building2 size={18} className="text-emerald-500" />
                <span>2. Company & Business Profile</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectStep(4)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <Edit3 size={13} /> Edit
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Business Name:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.businessName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Type:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.businessType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Category:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.businessCategory}</span>
              </div>
              <div>
                <span className="text-slate-500 block">City Type:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.cityType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Experience:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formData.yearsInBusiness} Years</span>
              </div>
            </div>
          </div>

          {/* Section 3: Address & Warehouses */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                <MapPin size={18} className="text-emerald-500" />
                <span>3. Location & Warehouses ({formData.numberOfWarehouses} Hubs)</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectStep(5)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <Edit3 size={13} /> Edit
              </button>
            </div>
            <div className="text-xs space-y-2">
              <p>
                <strong className="text-slate-500">Registered Address:</strong>{' '}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{formData.registeredAddress}</span>
              </p>
              <p>
                <strong className="text-slate-500">Primary Warehouse:</strong>{' '}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{formData.warehouseAddress}</span>
              </p>
            </div>
          </div>

          {/* Section 4: Bank & Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                  <Landmark size={18} className="text-emerald-500" />
                  <span>Bank & Settlement</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectStep(9)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="text-slate-500">Bank:</span> <strong>{formData.bankName}</strong></p>
                <p><span className="text-slate-500">IFSC:</span> <strong>{formData.ifscCode}</strong></p>
                <p><span className="text-slate-500">Settlement:</span> <strong>{formData.settlementPreference}</strong></p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                  <CreditCard size={18} className="text-emerald-500" />
                  <span>Wholesale Plan</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectStep(11)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="text-slate-500">Selected Plan:</span> <strong className="text-emerald-600 dark:text-emerald-400">{formData.selectedPlan} Plan</strong></p>
                <p><span className="text-slate-500">Digital Agreement:</span> <strong className="text-emerald-500">Signed ({formData.signatureName})</strong></p>
              </div>
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
              type="button"
              onClick={handleSubmitApplication}
              disabled={!formData.onboardingPaymentCompleted}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-base font-extrabold text-white shadow-xl transition hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send size={18} />
              Submit Wholesale Application
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
