import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { registerSeller, saveOnboarding, normalizeEmail } from '../../services/sellerAuthService';
import { defaultOnboardingData } from '../../config/sellerOnboardingConfig';

export default function SellerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!emailRegex.test(form.email)) errs.email = 'Enter a valid email address.';
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required.';
    else if (!phoneRegex.test(form.mobile.replace(/\D/g, ''))) errs.mobile = 'Enter a valid 10-digit mobile number.';
    
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const numericVal = value.replace(/[^0-9+]/g, '');
      setForm((prev) => ({ ...prev, [name]: numericVal }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (fieldErrors[name]) setFieldErrors(prev => ({...prev, [name]: ''}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    try {
      const result = await registerSeller({
        ...form,
        email: normalizeEmail(form.email),
      });
      if (result.success) {
        const onboarding = {
          ...defaultOnboardingData,
          basicInfo: {
            ...defaultOnboardingData.basicInfo,
            fullName: form.fullName,
            email: normalizeEmail(form.email),
            mobile: form.mobile,
          },
          status: 'onboarding',
          meta: { lastVisitedStep: '/seller/basic-information' },
        };
        saveOnboarding(onboarding, result.seller.id);
        navigate('/seller/basic-information', { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('[SellerAuth] Register error', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Create Seller Account</h1>
        <p className="text-slate-400 text-sm mb-6">Start your onboarding journey</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'fullName', label: 'Full Name', icon: User, type: 'text' },
            { name: 'email', label: 'Email', icon: Mail, type: 'email' },
            { name: 'mobile', label: 'Mobile', icon: Phone, type: 'tel' },
          ].map(({ name, label, icon: Icon, type }) => (
            <div key={name}>
              <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
              <div className="relative">
                <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={`duration-200 focus:ring-2 focus:ring-emerald-500/20 w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-colors ${fieldErrors[name] ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'}`}
                />
              </div>
              {fieldErrors[name] && <p className="text-red-400 text-[11px] mt-1.5 ml-1 font-medium">{fieldErrors[name]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`duration-200 focus:ring-2 focus:ring-emerald-500/20 w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border text-white focus:outline-none transition-colors ${fieldErrors.password ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <p className="text-red-400 text-[11px] mt-1.5 ml-1 font-medium">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold disabled:opacity-50 transition-all"
          >
            {loading ? 'Creating account...' : 'Create Account & Continue'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already registered?{' '}
          <Link to="/seller/login" className="text-emerald-400 hover:text-emerald-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
