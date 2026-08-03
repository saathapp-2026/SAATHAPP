import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Info } from 'lucide-react';
import { useProfessionalOnboarding } from '../../context/ProfessionalOnboardingContext';
import { getStoredPartnerSession, savePartnerSession, getStoredPartners } from '../../services/authService';

export default function ProfessionalSubmitted() {
  const navigate = useNavigate();
  const { data, approveApplication } = useProfessionalOnboarding();
  const [checking, setChecking] = useState(false);
  const session = getStoredPartnerSession();

  if (data.status !== 'submitted' && data.status !== 'approved') {
    return (
      <div className="min-h-screen bg-slate-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full rounded-xl bg-white/5 border border-white/10 p-8 text-center space-y-4">
          <h1 className="text-xl font-bold">Application not submitted yet.</h1>
          <p className="text-sm text-slate-400">Complete final review and submit before viewing this page.</p>
          <button
            type="button"
            onClick={() => navigate('/professional/review')}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer border-0"
          >
            Go to Final Review
          </button>
        </div>
      </div>
    );
  }

  const goToDashboard = () => {
    const partners = getStoredPartners();
    const partner = partners.find((p) => p.id === data.meta?.partnerId);
    const existing = getStoredPartnerSession();
    if (partner) {
      savePartnerSession({ ...(existing?.user || {}), ...partner });
      window.dispatchEvent(new Event('storage'));
    } else if (existing?.user?.role === 'professional') {
      window.dispatchEvent(new Event('storage'));
    }
    navigate('/professional/dashboard');
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 1500));
    approveApplication();
    const partners = getStoredPartners();
    const partner = partners.find((p) => p.id === data.meta?.partnerId);
    if (partner) {
      savePartnerSession({ ...partner, status: 'approved' });
      window.dispatchEvent(new Event('storage'));
    }
    setChecking(false);
    navigate('/professional/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4 py-8">
      <div className="max-w-md w-full bg-slate-950/40 backdrop-blur-xl rounded-card border border-white/10 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
          <Clock size={36} />
        </div>

        <h2 className="text-xl font-black mt-6">Application Submitted</h2>
        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
          Your profile, documents, onboarding fee payment, and optional membership selection have been received.
          Verification may include identity, background, skill, experience, compliance, police, address, home/office visit, and live video checks (24–48 hours).
        </p>

        <div className="bg-slate-900 border border-white/5 rounded-card p-4 text-left space-y-2 mt-6">
          <span className="text-[10px] font-black uppercase text-amber-400 block tracking-widest">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-black">Verification Started</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Estimated verification timeline: <strong className="text-slate-300">3–30 business days</strong>.
          </p>
          <p className="text-[10px] text-slate-500">
            Tracking ID: <strong className="text-white font-mono">{data.meta?.partnerId || data.onboardingFee?.paymentId || '—'}</strong>
          </p>
          {session?.user?.phone && (
            <span className="text-[10px] text-slate-500 block">
              SMS notification will be sent to +91 {session.user.phone} upon approval.
            </span>
          )}
        </div>

        <div className="space-y-3 pt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goToDashboard}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer border-0 shadow-md flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={16} />
            Go to Dashboard
          </motion.button>

          <button
            type="button"
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-slate-300 font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer"
          >
            {checking ? 'Checking...' : 'Check Verification Status'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/professional/login')}
            className="w-full py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-slate-300 font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer"
          >
            Go to Partner Login
          </button>
        </div>

        <p className="text-[10px] text-slate-500 mt-4 flex items-start gap-1 justify-center">
          <Info size={12} className="shrink-0 mt-0.5" />
          <span>Welcome kit ships after approval. Equipment & digital services can be ordered from your dashboard.</span>
        </p>
      </div>
    </div>
  );
}
