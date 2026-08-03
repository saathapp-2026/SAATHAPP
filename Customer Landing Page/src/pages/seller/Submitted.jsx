import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { isApproved, isVerificationPending } from '../../utils/sellerRouteUtils';
import { getStoredSellerAuth } from '../../services/sellerAuthService';

export default function Submitted() {
  const navigate = useNavigate();
  const { data, approveApplication } = useOnboarding();
  const auth = getStoredSellerAuth();
  const [checking, setChecking] = useState(false);
  const approved = isApproved(data, auth?.seller);

  const applicationStatus = data?.status;
  const sellerStatus = auth?.seller?.status;

  useEffect(() => {
    const session = getStoredSellerAuth();
    const isSellerApproved = isApproved(data, session?.seller);
    if (isSellerApproved) {
      navigate('/seller/dashboard', { replace: true });
    } else if (!isVerificationPending(data, session?.seller)) {
      navigate('/seller/review', { replace: true });
    }
  }, [applicationStatus, sellerStatus, data, navigate]);

  const handleCheckStatus = async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 1500));
    approveApplication();
    setChecking(false);
  };

  if (approved || !isVerificationPending(data, auth?.seller)) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} className="text-emerald-400" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-2">Application Submitted!</h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Your seller application has been submitted successfully. Our verification team will review
          your documents within 2–3 business days.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-amber-400 mb-8">
          <Clock size={16} />
          Verification in progress
        </div>

        <button
          type="button"
          onClick={handleCheckStatus}
          disabled={checking}
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-colors mb-3 disabled:opacity-50"
        >
          <RefreshCw size={18} className={checking ? 'animate-spin' : ''} />
          {checking ? 'Checking Status...' : 'Check Verification Status'}
        </button>

        <p className="text-xs text-slate-500">
          Demo: click above to simulate approval. In production, this happens automatically after verification.
        </p>
      </motion.div>
    </div>
  );
}
