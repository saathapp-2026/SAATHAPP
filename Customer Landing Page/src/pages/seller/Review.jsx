import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';

const SECTIONS = [
  { key: 'basicInfo', label: 'Basic Info', path: '/seller/basic-information' },
  { key: 'businessInfo', label: 'Business', path: '/seller/business-information' },
  { key: 'address', label: 'Address', path: '/seller/address' },
  { key: 'delivery', label: 'Delivery', path: '/seller/delivery' },
  { key: 'documents', label: 'Documents', path: '/seller/documents' },
  { key: 'bank', label: 'Bank', path: '/seller/bank' },
  { key: 'tax', label: 'Tax', path: '/seller/tax' },
  { key: 'onboardingFee', label: 'Onboarding Fee', path: '/seller/onboarding-fee' },
];

function isSectionComplete(key, data) {
  const section = data[key];
  if (!section) return false;
  switch (key) {
    case 'basicInfo':
      return section.fullName && section.email && section.mobile;
    case 'businessInfo':
      return section.storeName && section.businessName && section.description?.length >= 20;
    case 'address':
      return section.state && section.city && section.pincode && section.address;
    case 'delivery':
      return section.mode && section.radius;
    case 'documents':
      return section.aadhaar && section.pan && section.cancelledCheque && section.shopPhoto;
    case 'bank':
      return section.accountHolder && section.bankName && section.accountNumber && section.ifsc;
    case 'tax':
      return true;
    case 'onboardingFee':
      return section.paymentStatus === 'paid';
    default:
      return false;
  }
}

export default function Review() {
  const navigate = useNavigate();
  const { data, submitOnboarding, saving } = useOnboarding();

  const allComplete = SECTIONS.every((s) => isSectionComplete(s.key, data));

  const handleSubmit = async () => {
    if (!allComplete) return;
    await submitOnboarding();
    navigate('/seller/submitted');
  };

  return (
    <OnboardingLayout title="Final Review" subtitle="Review your application before submission">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map((section) => {
            const complete = isSectionComplete(section.key, data);
            return (
              <div
                key={section.key}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  complete ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className={complete ? 'text-emerald-400' : 'text-amber-400'} />
                  <span className="text-sm font-medium">{section.label}</span>
                </div>
                <Link to={section.path} className="text-xs text-emerald-400 hover:text-emerald-300">
                  Edit
                </Link>
              </div>
            );
          })}
        </div>

        {data.onboardingFee?.paymentStatus === 'paid' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 border border-white/10 p-4"
          >
            <h3 className="font-semibold mb-2">Payment Confirmed</h3>
            <p className="text-sm text-slate-400">
              Onboarding fee of ₹{data.onboardingFee.calculatedFee?.toLocaleString('en-IN')} paid.
              Valid until{' '}
              {data.onboardingFee.validityEnd
                ? new Date(data.onboardingFee.validityEnd).toLocaleDateString('en-IN')
                : '2 years from payment'}
              .
            </p>
          </motion.div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allComplete || saving}
          className="duration-200 active:scale-[0.98] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {saving ? 'Submitting...' : 'Submit Application'}
          <ArrowRight size={18} />
        </button>

        {!allComplete && (
          <p className="text-center text-sm text-amber-400">
            Please complete all sections including onboarding fee payment before submitting.
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
}
