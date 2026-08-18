import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Zap, Sparkles, CreditCard, Smartphone, Building, Wallet, ArrowRight, Crown } from 'lucide-react';
import { useMembership } from '../../context/MembershipContext';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionModal({ isOpen, onClose, selectedPlanId = 'premium', initialBillingCycle = 'monthly' }) {
  const { PLAN_DETAILS, subscribeToPlan } = useMembership();
  const navigate = useNavigate();

  const [planId, setPlanId] = useState(selectedPlanId);
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle);
  const [step, setStep] = useState('review'); // review | payment | processing | success
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    if (selectedPlanId) setPlanId(selectedPlanId);
    if (initialBillingCycle) setBillingCycle(initialBillingCycle);
    setStep('review');
  }, [selectedPlanId, initialBillingCycle, isOpen]);

  if (!isOpen) return null;

  const currentPlan = PLAN_DETAILS[planId] || PLAN_DETAILS.premium;
  const isYearly = billingCycle === 'yearly';
  const priceToPay = isYearly ? currentPlan.yearlyPrice * 12 : currentPlan.monthlyPrice;
  const monthlyEquivalent = isYearly ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;

  const handleStartPayment = (e) => {
    e.preventDefault();
    setStep('processing');

    // Simulate payment response delay
    setTimeout(() => {
      subscribeToPlan(planId, billingCycle);
      setStep('success');
    }, 2000);
  };

  const handleFinishAndNavigate = () => {
    onClose();
    navigate('/account/membership');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'processing' ? undefined : onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-surface border border-theme-border dark:bg-slate-900 dark:border-slate-800 rounded-[28px] shadow-2xl overflow-hidden z-10 text-theme dark:text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme-border dark:border-slate-800 bg-page/40 dark:bg-slate-950/60">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-lg">✦</span>
              <span className="font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                SaathApp Plus Checkout
              </span>
            </div>
            {step !== 'processing' && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-page dark:hover:bg-slate-800 transition-colors text-theme-secondary dark:text-slate-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* STEP 1: REVIEW PLAN & BILLING */}
            {step === 'review' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border border-amber-500/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-black text-theme dark:text-slate-100">{currentPlan.name}</h3>
                      {currentPlan.tag && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">
                          {currentPlan.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-theme-secondary dark:text-slate-400 mt-1">{currentPlan.deliveriesCount}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-amber-500">₹{priceToPay}</div>
                    <div className="text-[11px] text-theme-secondary dark:text-slate-400 font-medium">
                      {isYearly ? `₹${monthlyEquivalent}/month (Billed annually)` : '/month'}
                    </div>
                  </div>
                </div>

                {/* Billing Cycle Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-theme-secondary dark:text-slate-400 mb-2">
                    Select Billing Cycle
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        billingCycle === 'monthly'
                          ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                          : 'border-theme-border dark:border-slate-800 bg-page dark:bg-slate-950 text-theme dark:text-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="font-extrabold text-sm">Monthly Billing</div>
                      <div className="text-xs text-theme-secondary dark:text-slate-400 mt-0.5">₹{currentPlan.monthlyPrice} / month</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillingCycle('yearly')}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all ${
                        billingCycle === 'yearly'
                          ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                          : 'border-theme-border dark:border-slate-800 bg-page dark:bg-slate-950 text-theme dark:text-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        SAVE 20%
                      </span>
                      <div className="font-extrabold text-sm">Yearly Billing</div>
                      <div className="text-xs text-theme-secondary dark:text-slate-400 mt-0.5">₹{currentPlan.yearlyPrice} / month</div>
                    </button>
                  </div>
                </div>

                {/* Plan Highlights */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-theme-secondary dark:text-slate-400 mb-3">
                    Included Member Benefits
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentPlan.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-theme-secondary dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-theme-secondary dark:text-slate-400">
                    <span>Plan Subtotal ({billingCycle})</span>
                    <span>₹{priceToPay}</span>
                  </div>
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Plus Instant Discount</span>
                    <span>-₹0</span>
                  </div>
                  <div className="border-t border-theme-border dark:border-slate-800 pt-2 flex justify-between font-black text-sm text-theme dark:text-slate-100">
                    <span>Total Amount Payable</span>
                    <span className="text-amber-500 text-base">₹{priceToPay}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 'payment' && (
              <form onSubmit={handleStartPayment} className="space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-theme-secondary dark:text-slate-400 mb-3">
                    Choose Payment Option
                  </div>

                  <div className="space-y-2.5">
                    {/* UPI */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-theme-border dark:border-slate-800 bg-page dark:bg-slate-950 text-theme dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="accent-amber-500"
                        />
                        <Smartphone className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">UPI (Google Pay, PhonePe, Paytm)</div>
                          <div className="text-[10px] text-theme-secondary dark:text-slate-400">Instant activation with 0% extra fee</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-500">Fastest</span>
                    </label>

                    {paymentMethod === 'upi' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pl-8 pt-1">
                        <input
                          type="text"
                          placeholder="Enter your UPI ID (e.g. mobile@upi)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-theme-border dark:border-slate-800 bg-surface dark:bg-slate-950 text-theme dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </motion.div>
                    )}

                    {/* Cards */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-theme-border dark:border-slate-800 bg-page dark:bg-slate-950 text-theme dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-amber-500"
                        />
                        <CreditCard className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">Credit / Debit Card</div>
                          <div className="text-[10px] text-theme-secondary dark:text-slate-400">Visa, Mastercard, RuPay, Amex</div>
                        </div>
                      </div>
                    </label>

                    {paymentMethod === 'card' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pl-8 pt-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Card Number (4532 XXXX XXXX XXXX)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-theme-border bg-surface text-theme focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="text-xs p-3 rounded-xl border border-theme-border bg-surface text-theme"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={4}
                            className="text-xs p-3 rounded-xl border border-theme-border bg-surface text-theme"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Net Banking */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-theme-border bg-page'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="netbanking"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                          className="accent-amber-500"
                        />
                        <Building className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">Net Banking</div>
                          <div className="text-[10px] text-theme-secondary">HDFC, SBI, ICICI, Axis & 50+ banks</div>
                        </div>
                      </div>
                    </label>

                    {/* Wallet */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-theme-border bg-page'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="wallet"
                          checked={paymentMethod === 'wallet'}
                          onChange={() => setPaymentMethod('wallet')}
                          className="accent-amber-500"
                        />
                        <Wallet className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">Wallets & Pay Later</div>
                          <div className="text-[10px] text-theme-secondary">Amazon Pay, Mobikwik, LazyPay</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <ShieldCheck size={16} className="shrink-0" />
                  <span>100% Secure 256-Bit SSL Encrypted Payment Processing</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    className="w-1/3 py-3.5 rounded-2xl border border-theme-border font-bold text-xs hover:bg-page transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pay ₹{priceToPay} & Activate</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PROCESSING */}
            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                  <Crown className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-theme">Processing Your Payment</h3>
                  <p className="text-xs text-theme-secondary mt-1">Please do not close or refresh this page...</p>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 'success' && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 flex flex-col items-center text-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-glow-emerald">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Payment Successful
                  </span>
                  <h2 className="text-2xl font-black text-theme mt-2">Welcome to SaathApp Plus!</h2>
                  <p className="text-xs text-theme-secondary mt-1">
                    Your <span className="font-extrabold text-amber-500">{currentPlan.name}</span> subscription is now active.
                  </p>
                </div>

                <div className="w-full p-4 rounded-2xl bg-page border border-theme-border text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Subscription Status:</span>
                    <span className="font-black text-emerald-500">Active ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Free Deliveries:</span>
                    <span className="font-bold text-theme">{currentPlan.deliveriesRemaining}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Coupons Added:</span>
                    <span className="font-bold text-amber-500">{currentPlan.couponsCount} Exclusive Coupons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">Cashback Credit:</span>
                    <span className="font-bold text-emerald-500">₹{currentPlan.cashbackBonus}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishAndNavigate}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Go to Membership Dashboard</span>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
