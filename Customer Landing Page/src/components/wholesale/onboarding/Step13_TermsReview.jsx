import React from 'react';
import { motion } from 'framer-motion';
import { Send, Edit3, User, Building2, MapPin, Landmark, CreditCard, ShieldCheck, FileText, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useWholesale, calculateOnboardingFee } from '../../../context/WholesaleContext';

export const WHOLESALER_LEGAL_TERMS = [
  { id: 1, title: '1. Non-Refundable Onboarding Fee', body: 'The Wholesaler, Vendor, or Supplier Onboarding Fee is strictly non-refundable once the application has been submitted for review, verification, or processing, regardless of approval, rejection, cancellation, withdrawal, or inactivity.' },
  { id: 2, title: '2. No Guarantee of Approval', body: 'Payment of the onboarding fee does not guarantee approval, activation, or listing on the SAATHAPP platform. Every application is reviewed according to business verification, legal compliance, product quality standards, risk assessment, and internal approval policies.' },
  { id: 3, title: '3. Verification Timeline (3–30 Business Days)', body: 'Verification typically takes 3 to 30 business days. In certain cases, additional time may be required for government verification, KYC, GSTIN portal cross-checking, warehouse physical inspection, and bank account penny drop tests.' },
  { id: 4, title: '4. Correct Documents Only', body: 'Applicants must upload clear, unedited, valid government IDs, GST certificates, PAN cards, warehouse photographs, and genuine product images. Blurred, edited, forged, fake, or expired documents will result in immediate rejection.' },
  { id: 5, title: '5. Additional Verification & Inspections', body: 'SAATHAPP reserves the right to request additional documents, live video calls, physical warehouse inspections, or third-party background checks prior to account approval.' },
  { id: 6, title: '6. Fraud, Misrepresentation & False Information', body: 'Submission of false, forged, manipulated, or misleading information will result in immediate rejection, permanent account suspension, permanent blacklisting, forfeiture of all fees paid, and law enforcement reporting.' },
  { id: 7, title: '7. Re-Application Policy', body: 'If an application is rejected due to false documents, identity mismatch, or policy non-compliance, the onboarding fee remains non-refundable. A fresh application and new onboarding fee payment will be required to re-apply.' },
  { id: 8, title: '8. Right to Reject or Suspend', body: 'SAATHAPP may reject, suspend, or terminate any wholesaler, vendor, or supplier account if business information is inaccurate, products violate laws, or quality standards are compromised.' },
  { id: 9, title: '9. Commission & Platform Charges', body: 'Approved wholesale partners agree to pay the category commission (0-8% or 3-8% as per approved schedule), logistics charges, and promotional fees.' },
  { id: 10, title: '10. Validity & Renewal Terms', body: 'Wholesaler account activation is valid for 2 years from approval date. The renewal fee after 2 years is 50% of the applicable onboarding fee.' },
  { id: 11, title: '11. Business Responsibility', body: 'The wholesaler is solely responsible for product quality, authenticity, packaging standards, inventory accuracy, pricing accuracy, and timely order fulfillment.' },
  { id: 12, title: '12. Branding & Welcome Kit', body: 'Complimentary welcome kits (for eligible Growth/Enterprise members) are issued after successful account activation. Replacement or additional materials are chargeable.' },
  { id: 13, title: '13. Right to Modify Guidelines', body: 'SAATHAPP reserves the right to amend onboarding fees, commission structures, and platform policies prospectively in accordance with applicable laws.' },
  { id: 14, title: '14. Acceptance of Terms', body: 'By submitting this application and paying the onboarding fee, applicant confirms all information is accurate and agrees to comply with all SAATHAPP Wholesaler Policies.' },
];

export default function Step13_TermsReview({ onNext, onPrev, onSelectStep }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const feeCalc = calculateOnboardingFee(
    formData.cityType || 'Tier 2 City',
    formData.businessCategory || 'FMCG',
    formData.businessCapital ?? 2500000
  );

  const handleSubmitApplication = () => {
    if (!formData.acceptedTerms) {
      addToast('Please accept the Legal Terms & Conditions', 'error');
      return;
    }
    updateFormData({
      applicationStatus: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
    });
    addToast('Wholesale Application Submitted! queued for verification.', 'success');
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
          Phase 12 — Legal Terms & Final Review
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Review Application & Wholesaler Terms
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Read the 14-point Wholesaler Agreement and verify your application details before final submission.
        </p>

        <div className="mt-8 space-y-6">
          {/* Section 1: Summary Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User size={15} className="text-emerald-500" /> Owner Details
                </span>
                <button type="button" onClick={() => onSelectStep(3)} className="text-emerald-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Name:</span> <strong>{formData.fullName}</strong> ({formData.designation})</p>
              <p><span className="text-slate-500">Mobile:</span> <strong>+91 {formData.ownerMobile}</strong></p>
              <p><span className="text-slate-500">Email:</span> <strong>{formData.ownerEmail}</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building2 size={15} className="text-emerald-500" /> Business Profile
                </span>
                <button type="button" onClick={() => onSelectStep(4)} className="text-emerald-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Company:</span> <strong>{formData.businessName}</strong></p>
              <p><span className="text-slate-500">Tier & Cat:</span> <strong>{formData.cityType} ({formData.businessCategory})</strong></p>
              <p><span className="text-slate-500">Type:</span> <strong>{formData.businessType}</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Landmark size={15} className="text-emerald-500" /> Onboarding Fee
                </span>
                <button type="button" onClick={() => onSelectStep(11)} className="text-emerald-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Paid Fee:</span> <strong className="text-emerald-600 dark:text-emerald-400">₹{feeCalc.fee.toLocaleString('en-IN')}</strong></p>
              <p><span className="text-slate-500">Status:</span> <strong className="text-emerald-500">Paid & Verified (2 Yrs)</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CreditCard size={15} className="text-emerald-500" /> Monthly Plan
                </span>
                <button type="button" onClick={() => onSelectStep(12)} className="text-emerald-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Plan:</span> <strong className="text-emerald-600 dark:text-emerald-400">{formData.selectedPlan} Plan</strong></p>
              <p><span className="text-slate-500">Membership:</span> <strong>{formData.selectedPlan === 'Free' ? 'Free (Optional)' : 'Active Membership'}</strong></p>
            </div>
          </div>

          {/* Section 2: 14-Point Legal Accordion / Scroll box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5 space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
              <FileText size={18} className="text-emerald-500" />
              <span>14-Point Terms & Conditions for Wholesalers, Vendors & Suppliers</span>
            </div>

            <div className="h-56 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-4 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed scrollbar-thin">
              {WHOLESALER_LEGAL_TERMS.map((term) => (
                <div key={term.id} className="pb-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{term.title}</h4>
                  <p className="mt-1">{term.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => updateFormData({ acceptedTerms: e.target.checked, digitalAgreementSigned: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                I accept all 14 Terms & Conditions of SAATHAPP Wholesale Network.
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Signature:</span>
                <input
                  type="text"
                  value={formData.signatureName || formData.fullName}
                  onChange={(e) => updateFormData({ signatureName: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-surface px-3 py-1.5 text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400"
                  placeholder="Enter full name"
                />
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
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-base font-extrabold text-white shadow-xl transition hover:scale-[1.03]"
            >
              <Send size={18} />
              Submit Final Wholesale Application
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
