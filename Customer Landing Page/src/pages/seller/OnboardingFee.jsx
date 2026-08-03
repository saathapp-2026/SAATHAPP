import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import PricingCard from '../../components/seller/PricingCard';
import FeeBreakdownCard from '../../components/seller/FeeBreakdownCard';
import BusinessSummaryCard from '../../components/seller/BusinessSummaryCard';
import FAQAccordion from '../../components/seller/FAQAccordion';
import TermsCheckbox from '../../components/seller/TermsCheckbox';
import PaymentSummary from '../../components/seller/PaymentSummary';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { createOnboardingPayment, getCommissionRateApi } from '../../services/sellerApi';
import { getMembershipConfig } from '../../services/sellerMembershipService';
import { getStoredSellerAuth } from '../../services/sellerAuthService';

export default function OnboardingFee() {
  const navigate = useNavigate();
  const { data, updateSection, calculateFee, processPayment, feeLoading, feeError } = useOnboarding();
  const [termsAccepted, setTermsAccepted] = useState(data.onboardingFee?.termsAccepted || false);
  const [commission, setCommission] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  const feeData = data.onboardingFee?.breakdown;
  const fee = data.onboardingFee?.calculatedFee;
  const feeRange = getMembershipConfig().onboardingFeeRange;

  useEffect(() => {
    calculateFee().catch(() => {});
    getCommissionRateApi(data.businessInfo?.category).then(setCommission);
    // Intentionally run once on mount — fee recalculation available via button
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateSection('onboardingFee', { termsAccepted });
  }, [termsAccepted, updateSection]);

  const handlePayment = async () => {
    if (!termsAccepted) return;
    if (data.onboardingFee?.paymentStatus === 'paid') {
      navigate('/seller/payment-success', { replace: true });
      return;
    }
    setPaying(true);
    setError(null);

    try {
      const auth = getStoredSellerAuth();
      const payment = await createOnboardingPayment({
        fee,
        onboardingData: data,
        sellerId: auth?.seller?.id,
      });

      const verified = await processPayment(payment);
      updateSection('onboardingFee', {
        paymentStatus: 'paid',
        paymentId: verified.paymentId,
        paidAt: verified.paidAt,
        validityStart: verified.validityStart,
        validityEnd: verified.validityEnd,
      });

      navigate('/seller/payment-success');
    } catch {
      setError('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  const handleSkipToReview = () => {
    if (data.onboardingFee?.paymentStatus === 'paid') {
      navigate('/seller/review');
    }
  };

  return (
    <OnboardingLayout title="Seller Onboarding Fee" subtitle="Dynamic fee based on your business profile">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-slate-800/50 border border-white/10 p-4 space-y-3"
        >
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">One-Time Seller Onboarding Fee (Mandatory)</strong> — required to
            submit and process your application. Valid for <strong className="text-white">2 years</strong>, renewable
            at 50%. Covers registration, KYC, business &amp; store verification, dashboard activation, and compliance.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            This fee is <strong className="text-white">separate</strong> from the optional Monthly Seller Membership.
            You can start selling after approval without purchasing a membership.
          </p>
          <p className="text-xs text-slate-500">
            Onboarding fee range: <strong className="text-emerald-400">{feeRange.display}</strong> — dynamically calculated based on location, category, scale, and verification requirements.
          </p>
        </motion.div>

        {data.onboardingFee?.paymentStatus === 'paid' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4"
          >
            <h3 className="font-semibold text-emerald-400 mb-1">Payment Already Completed</h3>
            <p className="text-sm text-slate-400">
              Your onboarding fee of ₹{data.onboardingFee.calculatedFee?.toLocaleString('en-IN')} was paid on{' '}
              {data.onboardingFee.paidAt
                ? new Date(data.onboardingFee.paidAt).toLocaleDateString('en-IN')
                : '—'}
              . Duplicate payments are not allowed.
            </p>
          </motion.div>
        )}
        {(feeError || error) && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <AlertCircle size={18} />
            {feeError || error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PricingCard feeData={feeData} loading={feeLoading} />
            <BusinessSummaryCard data={data} />
          </div>

          <div className="space-y-6">
            <FeeBreakdownCard breakdown={feeData} loading={feeLoading} />
            <PaymentSummary
              fee={fee}
              commission={commission}
              loading={feeLoading || paying}
              onPay={handlePayment}
              disabled={!termsAccepted || paying || data.onboardingFee?.paymentStatus === 'paid'}
            />
          </div>
        </div>

        <TermsCheckbox accepted={termsAccepted} onChange={setTermsAccepted} />

        <FAQAccordion />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => calculateFee()}
            disabled={feeLoading}
            className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 disabled:opacity-50 transition-colors"
          >
            {feeLoading ? 'Recalculating...' : 'Recalculate Fee'}
          </button>

          {data.onboardingFee?.paymentStatus === 'paid' && (
            <button
              type="button"
              onClick={handleSkipToReview}
              className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Continue to Final Review
            </button>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
}
