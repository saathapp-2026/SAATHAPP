import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { getStoredPartners, authenticatePartner, savePartnerSession } from '../../services/authService';

export default function WorkerLoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Worker Login | SaathApp';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const partners = getStoredPartners();
      const result = await authenticatePartner(partners, { identifier, password, role: 'worker' });
      
      if (result.success) {
        if (result.partner.status !== 'approved') {
          setError('Your registration is pending KYC approval. Verification takes 24 hours.');
          setLoading(false);
          return;
        }
        savePartnerSession(result.partner);
        // Dispatch custom storage event to notify App.jsx of session changes
        window.dispatchEvent(new Event('storage'));
        navigate('/worker/dashboard');
      } else {
        if (result.reason === 'not_found') {
          setError('No worker account found with this email/phone.');
        } else {
          setError('Incorrect password. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white relative px-4 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.15),_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(139,92,246,0.1),_transparent_40%)] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-950/40 backdrop-blur-xl rounded-card border border-white/10 p-8 shadow-premium text-left relative z-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-white mb-6 border-0 bg-transparent cursor-pointer"
        >
          <ArrowLeft size={12} /> Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-4">Worker Login</h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Access your SaathApp Worker Portal</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-medium flex items-start gap-2"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400">Phone or Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Mail size={16} />
              </span>
              <input
                type="text"
                placeholder="worker@saathapp.com or 9876543202"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-4 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Password</label>
              <button
                type="button"
                className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300 border-0 bg-transparent cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-10 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer border-0 mt-4 shadow-md flex justify-center items-center"
          >
            {loading ? 'Logging In...' : 'Log In →'}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
          New Worker?{' '}
          <button
            onClick={() => navigate('/worker/register')}
            className="text-blue-400 hover:text-blue-300 font-black border-0 bg-transparent cursor-pointer"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
}
