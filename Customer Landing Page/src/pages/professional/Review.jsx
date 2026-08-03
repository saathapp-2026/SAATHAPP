import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProfessionalOnboarding } from '../../context/ProfessionalOnboardingContext';
import { getWelcomeKitConfig, getWelcomeKitEligibilityStatus } from '../../config/professional/welcomeKitConfig';
import { getProfessionalPricingConfig, VERIFICATION_DOCUMENTS } from '../../config/professionalOnboardingConfig';

const SECTIONS = [
  { key: 'accountInfo', label: 'Personal & Business Details', path: '/professional/register' },
  { key: 'serviceLocation', label: 'Location & Category Area', path: '/professional/register' },
  { key: 'documents', label: 'Documents', path: '/professional/register' },
  { key: 'onboardingFee', label: 'Onboarding Fee & Payment', path: '/professional/onboarding-fee' },
];

function isSectionComplete(key, data) {
  const section = data[key];
  if (!section) return false;
  switch (key) {
    case 'accountInfo':
      return section.name && section.email && section.phone && section.category && section.entityType;
    case 'serviceLocation':
      return section.city && section.state && section.pincode && section.locationTier;
    case 'documents':
      return section.aadhaar && section.pan && section.photo && section.selfie;
    case 'onboardingFee':
      return section.paymentStatus === 'paid' && section.termsAccepted;
    default:
      return false;
  }
}

export default function ProfessionalReview() {
  const navigate = useNavigate();
  const { data, submitOnboarding, saving } = useProfessionalOnboarding();
  const welcomeKit = getWelcomeKitConfig();
  const pricingConfig = getProfessionalPricingConfig();
  const kitStatus = getWelcomeKitEligibilityStatus(data.membership?.planId, data.status);
  const fee = data.onboardingFee;
  const breakdown = fee?.breakdown;
  const hasPartner = Boolean(data.meta?.partnerId);
  const paymentPaid = data.onboardingFee?.paymentStatus === 'paid';

  const allComplete = SECTIONS.every((s) => isSectionComplete(s.key, data));

  const handleSubmit = async () => {
    if (!allComplete || data.status === 'submitted') return;
    await submitOnboarding();
    navigate('/professional/submitted');
  };

  // Never return null / navigate during render — that caused a blank page
  if (!hasPartner) {
    return (
      <div className="min-h-screen bg-slate-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full rounded-xl bg-white/5 border border-white/10 p-8 text-center space-y-4">
          <h1 className="text-xl font-bold">No onboarding data found.</h1>
          <p className="text-sm text-slate-400">Complete registration before reviewing your application.</p>
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

  if (!paymentPaid) {
    return (
      <div className="min-h-screen bg-slate-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full rounded-xl bg-white/5 border border-white/10 p-8 text-center space-y-4">
          <h1 className="text-xl font-bold">Onboarding fee not paid.</h1>
          <p className="text-sm text-slate-400">Pay the one-time Service Professional onboarding fee before final review.</p>
          <button
            type="button"
            onClick={() => navigate('/professional/onboarding-fee')}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer border-0"
          >
            <ArrowLeft size={14} /> Back to Onboarding Fee
          </button>
        </div>
      </div>
    );
  }

  const uploadedDocs = VERIFICATION_DOCUMENTS.filter((d) => data.documents?.[d.key]);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button type="button" onClick={() => navigate('/professional/onboarding-fee')} className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer">
          <ArrowLeft size={12} /> Back to Fee
        </button>

        <div>
          <h1 className="text-2xl font-black">Final Review & Confirmation</h1>
          <p className="text-sm text-slate-400 mt-1">Review every detail before submission</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map((section) => {
            const complete = isSectionComplete(section.key, data);
            return (
              <div key={section.key} className={`flex items-center justify-between p-4 rounded-xl border ${complete ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className={complete ? 'text-indigo-400' : 'text-amber-400'} />
                  <span className="text-sm font-medium">{section.label}</span>
                </div>
                <Link to={section.path} className="text-xs text-indigo-400 hover:text-indigo-300">Edit</Link>
              </div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
          <h3 className="font-semibold">Personal Details</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-400">
            <p><span className="text-slate-500">Name:</span> {data.accountInfo?.name}</p>
            <p><span className="text-slate-500">Phone:</span> {data.accountInfo?.phone}</p>
            <p><span className="text-slate-500">Email:</span> {data.accountInfo?.email}</p>
            <p><span className="text-slate-500">Experience:</span> {data.accountInfo?.experience}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
          <h3 className="font-semibold">Business Details</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-400">
            <p><span className="text-slate-500">Category:</span> {breakdown?.categoryLabel || data.accountInfo?.category}</p>
            <p><span className="text-slate-500">Entity:</span> {data.accountInfo?.entityType}</p>
            <p><span className="text-slate-500">Staff:</span> {data.accountInfo?.staffCount}</p>
            <p><span className="text-slate-500">Equipment:</span> {data.accountInfo?.equipmentLevel}</p>
            <p><span className="text-slate-500">Business Scale:</span> {data.accountInfo?.businessScale}</p>
            <p><span className="text-slate-500">Pricing Group:</span> {breakdown?.groupLabel || '—'}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
          <h3 className="font-semibold">Location</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-400">
            <p><span className="text-slate-500">City:</span> {data.serviceLocation?.city}, {data.serviceLocation?.state}</p>
            <p><span className="text-slate-500">Pincode:</span> {data.serviceLocation?.pincode}</p>
            <p><span className="text-slate-500">Tier:</span> {breakdown?.locationTierLabel || data.serviceLocation?.locationTier}</p>
            <p><span className="text-slate-500">Radius:</span> {data.serviceLocation?.serviceRadius} km</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <h3 className="font-semibold">Fee · Commission · Renewal · Validity</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-400">
            <p><span className="text-slate-500">Fee Paid:</span> ₹{fee?.calculatedFee?.toLocaleString('en-IN')}</p>
            <p><span className="text-slate-500">Commission:</span> {breakdown?.commissionDisplay || pricingConfig.commissionRangeDisplay}</p>
            <p><span className="text-slate-500">Renewal (50%):</span> ₹{(fee?.renewalAmount || breakdown?.renewalAmount)?.toLocaleString('en-IN')}</p>
            <p><span className="text-slate-500">Validity:</span> {pricingConfig.validityYears} years (until {fee?.validityEnd ? new Date(fee.validityEnd).toLocaleDateString('en-IN') : '—'})</p>
            <p><span className="text-slate-500">Payment Status:</span> <span className="text-emerald-400">{fee?.paymentStatus}</span></p>
            <p><span className="text-slate-500">Payment ID:</span> {fee?.paymentId || '—'}</p>
            <p><span className="text-slate-500">Terms Accepted:</span> {fee?.termsAccepted ? 'Yes' : 'No'}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <h3 className="font-semibold">Membership & Welcome Kit Eligibility</h3>
          <p className="text-sm text-slate-400">
            Plan: <strong className="text-white">{data.membership?.planName || 'Free'}</strong>
            {data.membership?.price != null ? ` (₹${data.membership.price}/mo)` : ''} — Optional
          </p>
          <p className={`text-xs ${kitStatus.eligible ? 'text-emerald-400' : 'text-amber-400'}`}>
            Welcome Kit: {kitStatus.eligible
              ? `Eligible — ${welcomeKit.title}`
              : !kitStatus.planOk
                ? 'Requires Growth ₹2,499 or Enterprise ₹4,999 membership'
                : 'Requires verification complete AND activation complete'}
          </p>
          <p className="text-xs text-slate-500">
            Verification Status: <strong className="text-white">{data.status || 'draft'}</strong>
            {' · '}
            <Link to="/professional/terms" className="text-indigo-400 hover:text-indigo-300">View Terms</Link>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <h3 className="font-semibold">Documents Uploaded</h3>
          <ul className="grid sm:grid-cols-2 gap-1">
            {uploadedDocs.map((doc) => (
              <li key={doc.key} className="text-xs text-slate-400">• {doc.label}: {data.documents[doc.key]}</li>
            ))}
          </ul>
        </motion.div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allComplete || saving || data.status === 'submitted'}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer border-0"
        >
          {saving ? 'Submitting...' : data.status === 'submitted' ? 'Already Submitted' : 'Submit Application'}
          <ArrowRight size={18} />
        </button>

        {!allComplete && (
          <p className="text-center text-sm text-amber-400">
            Please complete all sections including onboarding fee payment and terms acceptance before submitting.
          </p>
        )}
      </div>
    </div>
  );
}
