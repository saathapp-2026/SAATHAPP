import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Phone, ArrowLeft, ShieldAlert } from 'lucide-react';
import { getStoredPartners, authenticatePartner, savePartnerSession } from '../../services/authService';

export default function WorkerLoginPage({ darkMode, onBack }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // 'pending'

  useEffect(() => {
    document.title = 'Worker Login | SaathApp';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const partners = getStoredPartners();
      const res = await authenticatePartner(partners, { identifier, password, role: 'worker' });
      
      if (res.success) {
        const partner = res.partner;
        if (partner.status === 'pending') {
          setVerificationStatus('pending');
        } else {
          savePartnerSession(partner);
          navigate('/worker/dashboard');
        }
      } else {
        setError(res.reason === 'wrong_password' ? 'Incorrect password. Please try again.' : 'Worker account not found. Please register first.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="absolute top-8 left-8">
        <button
          onClick={onBack || (() => navigate('/become-worker'))}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer border-0 bg-transparent font-semibold"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black tracking-tight mb-2">SaathApp Worker</h2>
        <p className="text-sm text-slate-400 font-medium">Worker Service Portal Login</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-card shadow-premium space-y-6">
          
          {verificationStatus === 'pending' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 py-4"
            >
              <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 mb-2">
                <ShieldAlert size={48} />
              </div>
              <h3 className="text-xl font-black">Verification Pending</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Your worker application profile has been submitted and is currently being verified. This typically takes 24-48 hours. Thank you for your patience!
              </p>
              <button
                onClick={() => setVerificationStatus(null)}
                className="w-full rounded-btn bg-slate-800 hover:bg-slate-700 text-white py-3 text-sm font-bold border-0 cursor-pointer"
              >
                Back to Login
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="worker@saathapp.com or 9876543202"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (e.g. password)"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="rounded bg-slate-950 border-slate-800" defaultChecked />
                  <label htmlFor="remember" className="text-slate-400 font-bold">Remember me</label>
                </div>
                <Link to="#" className="font-bold text-indigo-400 hover:text-indigo-300">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-btn bg-blue-650 hover:bg-blue-605 text-white py-3 text-sm font-extrabold shadow-lg transition-all border-0 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>

              <div className="text-center text-xs text-slate-500 font-bold border-t border-slate-800 pt-6">
                Demo Credentials: <span className="text-slate-400">9876543202 / password</span>
              </div>

              <div className="text-center text-xs text-slate-400 font-bold">
                Don't have a worker account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/worker/register')}
                  className="text-indigo-400 hover:text-indigo-300 font-extrabold bg-transparent border-0 cursor-pointer"
                >
                  Register Here
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
