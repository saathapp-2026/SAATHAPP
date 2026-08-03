import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const CLAUSES = [
  {
    title: '1. Non-Refundable Fee',
    content:
      'The Seller Onboarding Fee is a one-time, non-refundable payment. Once processed, the fee cannot be refunded under any circumstances, including rejection of your application.',
  },
  {
    title: '2. No Guaranteed Approval',
    content:
      'Payment of the onboarding fee does not guarantee approval of your seller account. SAATHAPP reserves the right to approve or reject any application at its sole discretion.',
  },
  {
    title: '3. Verification Process',
    content:
      'All seller applications undergo a verification process including identity verification, business verification, address verification, phone verification, document verification, and may include physical verification of the business premises.',
  },
  {
    title: '4. Correct Documents',
    content:
      'Sellers must provide accurate, valid, and up-to-date documents. Submission of expired, forged, or incorrect documents will result in immediate rejection.',
  },
  {
    title: '5. Additional Verification',
    content:
      'SAATHAPP may request additional documents or information at any point during or after the onboarding process. Failure to comply may result in suspension or termination.',
  },
  {
    title: '6. False Information',
    content:
      'Providing false, misleading, or fraudulent information during registration or verification is strictly prohibited and may result in permanent ban from the platform and legal action.',
  },
  {
    title: '7. Re-Application Policy',
    content:
      'If your application is rejected, you may re-apply after 30 days. A new onboarding fee will be required for each re-application attempt.',
  },
  {
    title: '8. Business Eligibility',
    content:
      'Only legitimate businesses operating within India with valid licenses (where applicable) are eligible. SAATHAPP reserves the right to define eligible business categories.',
  },
  {
    title: '9. Commission Policy',
    content:
      'Commission (0–8% depending on category) applies only on successful completed orders. Commission is separate from the onboarding fee and is deducted from order settlements.',
  },
  {
    title: '10. Validity & Renewal',
    content:
      'The onboarding fee grants access for 2 years from the payment date. After expiry, sellers must pay 50% of the original onboarding fee to renew their seller account.',
  },
  {
    title: '11. Right to Modify',
    content:
      'SAATHAPP reserves the right to modify fee structures, commission rates, terms, and policies with reasonable notice. Continued use of the platform constitutes acceptance of modified terms.',
  },
  {
    title: '12. Acceptance of Terms',
    content:
      'By checking the acceptance checkbox and proceeding with payment, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.',
  },
  {
    title: '13. Monthly Membership (Optional)',
    content:
      'Monthly Seller Membership is completely optional and separate from the One-Time Seller Onboarding Fee. Sellers may purchase, upgrade, downgrade, renew, or cancel membership according to plan terms. Membership is not required to create, operate, or sell on a SAATHAPP seller account.',
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/seller/onboarding-fee"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft size={16} />
          Back to Onboarding Fee
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Shield size={28} className="text-emerald-400" />
          <div>
            <h1 className="text-3xl font-bold">Seller Onboarding Terms & Conditions</h1>
            <p className="text-slate-400 text-sm mt-1">Last updated: August 2026</p>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 mb-8">
          <p className="text-sm text-amber-200">
            <strong>Important:</strong> Payment of the One-Time Seller Onboarding Fee does not guarantee seller approval.
            Every seller application is subject to SAATHAPP&apos;s verification, compliance, and quality review process.
            Seller accounts become active only after successful verification and approval.
            Monthly Membership is optional and is not required to create or operate a seller account.
          </p>
        </div>

        <div className="space-y-6">
          {CLAUSES.map((clause) => (
            <div
              key={clause.title}
              className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
            >
              <h2 className="font-semibold text-emerald-400 mb-2">{clause.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{clause.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
