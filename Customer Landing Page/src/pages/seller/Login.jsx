import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginSeller, getStoredOnboarding, normalizeEmail } from '../../services/sellerAuthService';
import { getPostLoginRedirect } from '../../utils/sellerRouteUtils';

export default function SellerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
    
    if (!password) errs.password = 'Password is required.';
    
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    try {
      const result = await loginSeller({
        email: normalizeEmail(email),
        password,
      });
      if (result.success) {
        const onboarding = getStoredOnboarding(result.seller?.id);
        const dest = getPostLoginRedirect(onboarding, result.seller);
        navigate(dest, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('[SellerAuth] Login error', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Seller Login</h1>
        <p className="text-slate-400 text-sm mb-6">Access your Seller Hub dashboard</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-colors ${fieldErrors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'}`}
                placeholder="seller@example.com"
              />
            </div>
            {fieldErrors.email && <p className="text-red-400 text-[11px] mt-1.5 ml-1 font-medium">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }));
                }}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-colors ${fieldErrors.password ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <p className="text-red-400 text-[11px] mt-1.5 ml-1 font-medium">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition-all"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          New seller?{' '}
          <Link to="/seller/register" className="text-emerald-400 hover:text-emerald-300">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
