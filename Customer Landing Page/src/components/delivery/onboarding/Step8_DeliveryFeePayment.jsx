import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, CheckCircle2, Clock, Info, AlertTriangle, ArrowRight, ArrowLeft, Lock, Landmark, QrCode, X, Sparkles } from 'lucide-react';
import { useDelivery, calculateDeliveryOnboardingFee } from '../../../context/DeliveryContext';

export default function Step8_DeliveryFeePayment({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();
  const feeCalc = calculateDeliveryOnboardingFee(
    formData.locationTier || 'Tier 2 City',
    formData.deliveryTypeMode || 'Multi-Service Delivery'
  );

  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8942');
  const [upiVpa, setUpiVpa] = useState('rider@upi');

  const isPaid = formData.onboardingPaymentCompleted;

  const handleOpenGateway = () => {
    if (isPaid) {
      addToast('Onboarding fee payment is already completed & verified!', 'info');
      onNext();
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    addToast('Connecting to Payment Gateway & Verifying...', 'info');

    setTimeout(() => {
      setIsProcessing(false);
      setIsModalOpen(false);
      const payId = `PAY-RIDER-${Math.floor(100000 + Math.random() * 900000)}`;
      updateFormData({
        onboardingFeeAmount: feeCalc.fee,
        onboardingPaymentCompleted: true,
        onboardingPaymentMethod: selectedMethod,
        onboardingPaymentId: payId,
        onboardingPaymentDate: new Date().toISOString().split('T')[0],
        onboardingValidityExpiry: '2 Years (Valid till August 2028)',
      });
      addToast('One-Time Onboarding Fee Paid & Verified!', 'success');
      setTimeout(() => {
        onNext();
      }, 500);
    }, 1200);
  };

  const handleProceedNext = () => {
    if (!formData.onboardingPaymentCompleted) {
      addToast('Please complete the One-Time Onboarding Fee payment first!', 'error');
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 8 — Mandatory Delivery Partner Onboarding Fee
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              One-Time Delivery Partner Onboarding Fee
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Mandatory registration fee for all riders joining SAATHAPP Delivery Network.
            </p>
          </div>
          <div className="text-right shrink-0 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculated Fee</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              ₹{feeCalc.fee.toLocaleString('en-IN')}
            </span>
            <span className="block text-[10px] font-bold text-slate-400">Fixed Fee • No Monthly Fee</span>
          </div>
        </div>

        {/* Verification Success Banner if Paid */}
        {isPaid && (
          <div className="mt-6 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between text-xs text-slate-900 dark:text-white font-extrabold">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black">
              <CheckCircle2 size={18} />
              <span>Onboarding Fee Paid & Verified (Ref: {formData.onboardingPaymentId})</span>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fee Breakdown */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                What this One-Time Onboarding Fee includes:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                {[
                  'Delivery Partner Account Creation',
                  'Rider KYC & Identity Check',
                  'Driving Licence & RC Audit',
                  'Bank Account Penny Drop Test',
                  'Address & Location Verification',
                  'Driver Profile & Rating Setup',
                  'Safety Training Materials Access',
                  'Rider Mobile App Activation',
                  'Account Activation',
                  'No Compulsory Monthly Subscriptions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Notice */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs space-y-2 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-black">
                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
                <span>Important Delivery Terms</span>
              </div>
              <p>
                • <strong>Onboarding Fee:</strong> One-time fixed fee based on location category.
              </p>
              <p>
                • <strong>Non-Refundable:</strong> Onboarding fee is strictly non-refundable once submitted for verification.
              </p>
              <p>
                • <strong>No Guarantee of Approval:</strong> Payment covers background & document checks. Approval is subject to meeting safety and compliance policies.
              </p>
            </div>
          </div>

          {/* Payment Box (Always Visible) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">
                Select Payment Method
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'UPI', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'NetBanking', label: 'NetBanking (SBI/HDFC/ICICI)', icon: Landmark },
                  { id: 'Card', label: 'Debit / Credit Card', icon: CreditCard },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-bold transition ${
                      selectedMethod === method.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <method.icon size={16} />
                      <span>{method.label}</span>
                    </div>
                    {selectedMethod === method.id && <CheckCircle2 size={14} className="text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Total Payable:</span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                  ₹{feeCalc.fee.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleOpenGateway}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black transition shadow-lg ${
                  isPaid
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 hover:scale-[1.02]'
                }`}
              >
                {isPaid ? (
                  <>
                    <CheckCircle2 size={16} />
                    Payment Done — Click to Proceed Next
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Pay ₹{feeCalc.fee.toLocaleString('en-IN')} Onboarding Fee
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="pt-8 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 mt-6">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            type="button"
            onClick={handleProceedNext}
            className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-extrabold text-white transition ${
              isPaid
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg hover:scale-105'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            Next: Optional Equipment
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  SAATHAPP Secure Payment Gateway
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Completing One-Time Onboarding Fee Payment of <strong className="text-amber-600 dark:text-amber-400">₹{feeCalc.fee.toLocaleString('en-IN')}</strong>
                </p>
              </div>

              <form onSubmit={handleConfirmPayment} className="mt-6 space-y-4 text-xs">
                {selectedMethod === 'UPI' && (
                  <div className="text-center space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <QrCode size={90} className="mx-auto text-slate-900 dark:text-white" />
                    <p className="font-extrabold text-slate-700 dark:text-slate-300">Scan QR Code or Enter UPI ID</p>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      className="w-full text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 font-mono text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {selectedMethod === 'Card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Expiry</label>
                        <input
                          type="text"
                          defaultValue="08/28"
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="•••"
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'NetBanking' && (
                  <div className="space-y-2">
                    <label className="block font-bold text-slate-700 dark:text-slate-300">Select NetBanking Bank</label>
                    <select className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 font-semibold text-xs text-slate-900 dark:text-white">
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 py-3.5 text-xs font-black text-slate-950 shadow-xl transition hover:scale-[1.02] disabled:opacity-50"
                >
                  <Lock size={14} />
                  {isProcessing ? 'Authorizing Payment...' : `Authorize & Pay ₹${feeCalc.fee.toLocaleString('en-IN')}`}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
