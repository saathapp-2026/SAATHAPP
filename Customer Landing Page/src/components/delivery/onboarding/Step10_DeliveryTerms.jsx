import React from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, User, Truck, Landmark, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useDelivery, calculateDeliveryOnboardingFee } from '../../../context/DeliveryContext';

export const DELIVERY_LEGAL_TERMS = [
  { id: 1, title: '1. Non-Refundable Onboarding Fee', body: 'The Delivery Partner Onboarding Fee is strictly non-refundable once the application has been submitted for verification, review, or processing, irrespective of approval, rejection, cancellation, withdrawal, inactivity, or non-use of the platform.' },
  { id: 2, title: '2. No Guarantee of Approval', body: 'Payment of the onboarding fee does not guarantee approval, activation, or onboarding as a Delivery Partner. Every application is subject to identity, background, DL, RC, bank account, and compliance verification.' },
  { id: 3, title: '3. Verification Process (3 to 30 Business Days)', body: 'Verification requires checking Aadhaar, PAN, Driving Licence, Vehicle RC, Insurance, PUC Certificate, Bank Account, Address Proof, Selfie, and Police Background Verification. Verification typically takes 3 to 30 business days.' },
  { id: 4, title: '4. Upload Correct Documents Only', body: 'Applicants must upload only genuine and valid documents. Submitting fake, forged, edited, expired, or misleading documents will result in immediate rejection or permanent suspension.' },
  { id: 5, title: '5. Additional Verification & Inspections', body: 'SAATHAPP may request live video verification, physical address verification, vehicle inspection, identity re-verification, or criminal background verification.' },
  { id: 6, title: '6. Fraud & False Information Policy', body: 'Providing false information, fake identities, or manipulated vehicle details will result in immediate rejection, permanent blacklisting, forfeiture of all fees paid, and law enforcement reporting.' },
  { id: 7, title: '7. Re-Application Policy', body: 'If an application is rejected due to incorrect documents, identity mismatch, or policy violations, the onboarding fee remains non-refundable. A fresh application and new onboarding fee must be paid before re-evaluation.' },
  { id: 8, title: '8. Delivery Partner Responsibilities', body: 'Delivery Partners agree to deliver orders safely, handle products with care, maintain professional behavior, wear assigned ID cards, follow traffic rules, and respect customer privacy.' },
  { id: 9, title: '9. Safety & Vehicle Responsibility', body: 'Delivery Partners are solely responsible for vehicle maintenance, fuel costs, vehicle insurance, driving licence validity, traffic fines, and wearing personal protective safety gear.' },
  { id: 10, title: '10. Equipment & Merchandise', body: 'Delivery bags, uniforms, helmets, jackets, safety gear, and branding materials are optional and supplied upon request. Customized items are non-refundable once printed.' },
  { id: 11, title: '11. Equipment Rental Terms', body: 'Rented equipment requires a security deposit and rental charges, and must be returned in good working condition allowing for normal wear and tear.' },
  { id: 12, title: '12. Earnings & Platform Payouts', body: 'Delivery earnings are calculated according to completed orders and the applicable payout policy. Deductions may include platform service charges or taxes required by law.' },
  { id: 13, title: '13. Onboarding Terms', body: 'The Delivery Partner Onboarding Fee is a single one-time fixed charge based on service location category upon registration.' },
  { id: 14, title: '14. Account Suspension & Termination', body: 'Accounts may be suspended or terminated for fraud, customer complaints, repeated delivery failures, misconduct, theft, or unsafe driving.' },
  { id: 15, title: '15. Right to Modify Guidelines', body: 'SAATHAPP reserves the right to modify onboarding fees, operational policies, verification rules, equipment pricing, and platform guidelines at any time.' },
  { id: 16, title: '16. Acceptance of Terms & Agreement', body: 'By submitting this application and paying the onboarding fee, applicant confirms all information provided is accurate and agrees to comply with the SAATHAPP Delivery Partner Agreement.' },
];

export default function Step10_DeliveryTerms({ onNext, onPrev, onSelectStep }) {
  const { formData, updateFormData, addToast } = useDelivery();
  const feeCalc = calculateDeliveryOnboardingFee(formData.locationTier || 'Tier 2 City', formData.deliveryTypeMode || 'Multi-Service Delivery');

  const handleSubmitApplication = () => {
    if (!formData.acceptedTerms) {
      addToast('Please accept the Delivery Partner Terms & Conditions', 'error');
      return;
    }
    updateFormData({
      applicationStatus: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
    });
    addToast('Delivery Partner Application Submitted! Queued for verification.', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 10 — Legal Terms & Final Review
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Review Application & Delivery Partner Agreement
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Read the 16-point Delivery Partner Agreement and verify your application details before final submission.
        </p>

        <div className="mt-8 space-y-6">
          {/* Summary Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User size={15} className="text-amber-500" /> Rider Profile
                </span>
                <button type="button" onClick={() => onSelectStep(3)} className="text-amber-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Name:</span> <strong>{formData.fullName}</strong> ({formData.gender})</p>
              <p><span className="text-slate-500">Mobile:</span> <strong>+91 {formData.mobileNumber}</strong></p>
              <p><span className="text-slate-500">City:</span> <strong>{formData.city}, {formData.state}</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Truck size={15} className="text-amber-500" /> Vehicle & Tier
                </span>
                <button type="button" onClick={() => onSelectStep(4)} className="text-amber-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Location Tier:</span> <strong>{formData.locationTier}</strong></p>
              <p><span className="text-slate-500">Vehicle:</span> <strong>{formData.vehicleType}</strong></p>
              <p><span className="text-slate-500">Reg No:</span> <strong>{formData.vehicleNumber}</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Landmark size={15} className="text-amber-500" /> Onboarding Fee
                </span>
                <button type="button" onClick={() => onSelectStep(8)} className="text-amber-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Paid Fee:</span> <strong className="text-amber-600 dark:text-amber-400">₹{feeCalc.fee.toLocaleString('en-IN')}</strong></p>
              <p><span className="text-slate-500">Status:</span> <strong className="text-emerald-500">Paid & Verified (2 Yrs)</strong></p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-amber-500" /> Working Mode
                </span>
                <button type="button" onClick={() => onSelectStep(5)} className="text-amber-600 font-bold hover:underline">
                  Edit
                </button>
              </div>
              <p><span className="text-slate-500">Mode:</span> <strong>{formData.preferredWorkingMode}</strong></p>
              <p><span className="text-slate-500">Radius:</span> <strong>{formData.serviceRadiusKm}</strong></p>
            </div>
          </div>

          {/* 16-Point Accordion / Scroll Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5 space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
              <FileText size={18} className="text-amber-500" />
              <span>16-Point Terms & Conditions for Delivery Partners</span>
            </div>

            <div className="h-56 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-4 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed scrollbar-thin">
              {DELIVERY_LEGAL_TERMS.map((term) => (
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
                  onChange={(e) => updateFormData({ acceptedTerms: e.target.checked })}
                  className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500"
                />
                I accept all 16 Terms & Conditions of SAATHAPP Delivery Network.
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Signature:</span>
                <input
                  type="text"
                  value={formData.digitalSignature || formData.fullName}
                  onChange={(e) => updateFormData({ digitalSignature: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-surface px-3 py-1.5 text-xs font-bold font-mono text-amber-600 dark:text-amber-400"
                  placeholder="Vikram Singh"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="button"
              onClick={handleSubmitApplication}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-base font-extrabold text-slate-950 shadow-xl transition hover:scale-[1.03]"
            >
              <Send size={18} />
              Submit Delivery Partner Application
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
