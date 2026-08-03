import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getProfessionalPricingConfig } from '../../config/professionalOnboardingConfig';

export default function ProfessionalPaymentSuccess() {
  const config = getProfessionalPricingConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
      >
        <CheckCircle2 size={48} className="text-indigo-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 text-sm mb-6">
          Your one-time onboarding fee has been received. Valid for {config.validityYears} years from today.
          Complete the final review to submit your application.
        </p>

        <div className="space-y-3">
          <Link
            to="/professional/review"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
          >
            Continue to Final Review
            <ArrowRight size={18} />
          </Link>
          <Link to="/professional/onboarding-fee" className="block text-sm text-slate-400 hover:text-white">
            View payment details
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
