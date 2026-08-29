import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useProfessionalOnboarding } from '../../context/ProfessionalOnboardingContext';

const CLAUSES = [
  {
    title: '1. Non-Refundable Onboarding Fee',
    content:
      'The Service Professional Onboarding Fee is a one-time, mandatory, non-refundable payment. Once processed, the fee cannot be refunded under any circumstances, including rejection, suspension, or voluntary withdrawal of your application.',
  },
  {
    title: '2. No Guaranteed Approval',
    content:
      'Payment of the onboarding fee does not guarantee approval of your professional account. SAATHAPP reserves the right to approve or reject any application at its sole discretion after verification.',
  },
  {
    title: '3. Validity Period',
    content:
      'The onboarding fee grants platform access for 2 (two) years from the payment date, subject to successful verification, continued compliance, and platform eligibility.',
  },
  {
    title: '4. Renewal Policy',
    content:
      'After expiry of the validity period, professionals must pay 50% of the then-applicable onboarding fee to renew. Failure to renew may result in deactivation of the professional profile.',
  },
  {
    title: '5. Commission Policy',
    content:
      'Commission ranging from 5% to 12% (depending on location tier, category, and business profile) applies only on successfully completed service booking value. Commission is separate from the onboarding fee and optional membership.',
  },
  {
    title: '6. Accurate Documents & Information',
    content:
      'Professionals must provide accurate, valid, and up-to-date documents including Aadhaar, PAN, passport photo, selfie, and any additional documents requested. Expired, forged, or incorrect documents will result in immediate rejection.',
  },
  {
    title: '7. Verification Process',
    content:
      'Applications may undergo Identity Verification, Background Verification, Skill Verification, Experience Verification, Compliance Review, Internal Quality Standards checks, Platform Eligibility review, Police Verification, Character Verification, Criminal Background Verification, Address Verification, Home Visit, Office Verification, and/or Live Video Verification.',
  },
  {
    title: '8. False Information & Fraud',
    content:
      'Providing false, misleading, or fraudulent information during registration or verification is strictly prohibited and may result in permanent ban, forfeiture of fees, and legal action.',
  },
  {
    title: '9. Re-Application Policy',
    content:
      'If your application is rejected, you may re-apply after 30 days. A new onboarding fee will be required for each re-application attempt.',
  },
  {
    title: '10. Optional Membership & Welcome Kit',
    content:
      'Monthly Professional Membership is completely optional and separate from the onboarding fee. The Complimentary Professional Welcome Kit is provided only once to professionals subscribed to Growth (₹2,499/month) or Enterprise (₹4,999/month), and only after successful verification and activation. The kit is non-transferable, non-exchangeable, and has no cash redemption value. Replacement items are chargeable.',
  },
  {
    title: '11. Optional Equipment, Rental & Digital Services',
    content:
      'Uniforms, safety equipment, tools, vehicle branding, heavy equipment rental, and business/digital services are optional add-ons with separate pricing. Rentals are subject to availability, security deposit, maintenance responsibility, signed rental agreement, applicable taxes, logistics charges, and qualification requirements.',
  },
  {
    title: '12. Professional Responsibilities',
    content:
      'Professionals must maintain professional behaviour, arrive on time, carry valid identification, perform safe work, protect customer privacy, comply with applicable laws, and use required PPE on all jobs.',
  },
  {
    title: '13. Quality Standards & Conduct',
    content:
      'Poor ratings, no-shows, fraud, unsafe work, misconduct, harassment, or repeated cancellations may result in warnings, temporary suspension, permanent ban, and forfeiture of platform privileges without refund of onboarding fee.',
  },
  {
    title: '14. Equipment Safety',
    content:
      'Professionals must use certified tools, maintain own equipment to platform safety standards, wear PPE, and return rented equipment in good working condition. Damage or loss of rental equipment may result in deduction from security deposit and additional charges.',
  },
  {
    title: '15. Right to Modify',
    content:
      'SAATHAPP reserves the right to modify fee structures, commission rates, verification requirements, membership plans, kit contents, and these Terms with reasonable notice. Continued use of the platform constitutes acceptance of modified terms.',
  },
  {
    title: '16. Acceptance of Terms',
    content:
      'By checking the acceptance checkbox and proceeding with payment or submission, you acknowledge that you have read, understood, and agree to be bound by all 16 Terms & Conditions in this document, including verification requirements, professional responsibilities, quality standards, and equipment safety rules.',
  },
];

const SECTION_GROUPS = [
  { heading: 'Verification', clauses: [6, 7, 8, 9] },
  { heading: 'Responsibilities', clauses: [12] },
  { heading: 'Quality', clauses: [13] },
  { heading: 'Equipment Safety', clauses: [14] },
  { heading: 'Acceptance & General', clauses: [1, 2, 3, 4, 5, 10, 11, 15, 16] },
];

export default function ProfessionalTermsAndConditions() {
  const navigate = useNavigate();
  const { updateSection } = useProfessionalOnboarding();

  const handleAcceptContinue = () => {
    updateSection('onboardingFee', { termsAccepted: true });
    navigate('/professional/onboarding-fee');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10 pb-28">
        <button
          type="button"
          onClick={() => navigate('/professional/register')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 border-0 bg-transparent cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Shield size={28} className="text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold">Service Professional Onboarding Terms & Conditions</h1>
            <p className="text-sm text-slate-400 mt-1">16 official clauses · Verification · Responsibilities · Quality · Equipment Safety · Acceptance</p>
          </div>
        </div>

        <div className="space-y-8">
          {SECTION_GROUPS.map((group) => (
            <div key={group.heading} className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-indigo-300">{group.heading}</h2>
              {group.clauses.map((num) => {
                const clause = CLAUSES[num - 1];
                return (
                  <div key={clause.title} className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <h3 className="font-semibold text-indigo-200 mb-2">{clause.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{clause.content}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 border-t border-white/10 bg-slate-950/95 backdrop-blur px-4 py-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <Link
            to="/professional/register"
            className="flex-1 text-center py-3 rounded-xl border border-white/20 text-slate-300 font-semibold hover:border-white/40"
          >
            Back
          </Link>
          <button
            type="button"
            onClick={handleAcceptContinue}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer border-0"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
