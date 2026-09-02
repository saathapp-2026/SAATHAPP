import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, Store, LogIn, WifiOff, ShieldX, AlertTriangle, ServerCrash,
} from 'lucide-react';

const ERROR_CONFIG = {
  403: {
    code: '403',
    title: 'Access Denied',
    message: 'You do not have permission to access this page.',
    icon: ShieldX,
    color: 'text-amber-400',
  },
  404: {
    code: '404',
    title: 'Page Not Found',
    message: "The page you're looking for doesn't exist or has been moved.",
    icon: AlertTriangle,
    color: 'text-emerald-400',
  },
  500: {
    code: '500',
    title: 'Server Error',
    message: 'We ran into a server issue. Please refresh or try again in a few moments.',
    icon: ServerCrash,
    color: 'text-red-400',
  },
  offline: {
    code: 'Offline',
    title: 'No Internet Connection',
    message: 'Please check your connection and try again.',
    icon: WifiOff,
    color: 'text-slate-400',
  },
  'session-expired': {
    code: 'Session Expired',
    title: 'Your Session Has Expired',
    message: 'Please sign in again to continue to your Seller Hub.',
    icon: LogIn,
    color: 'text-amber-400',
  },
};

export default function SellerErrorPage({ type = '404' }) {
  const config = ERROR_CONFIG[type] || ERROR_CONFIG[404];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
        role="alert"
        aria-live="polite"
      >
        <Icon size={48} className={`${config.color} mx-auto mb-4`} aria-hidden="true" />
        <p className="text-5xl font-black text-white/80 mb-2">{config.code}</p>
        <h1 className="text-2xl font-bold text-white mb-2">{config.title}</h1>
        <p className="text-slate-400 text-sm mb-8">{config.message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {type === 'session-expired' ? (
            <Link
              to="/seller/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              <LogIn size={18} />
              Sign In Again
            </Link>
          ) : (
            <>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-colors"
              >
                <Home size={18} />
                Back to Home
              </Link>
              <Link
                to="/seller/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
              >
                <Store size={18} />
                Seller Dashboard
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
