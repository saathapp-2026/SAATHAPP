import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import logo from '../assets/saathapp-logo.png';

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(() => onFinish?.(), 250);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-white text-slate-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.96 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-6 py-12 text-center"
      >
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mx-auto flex w-auto items-center justify-center px-4"
        >
          <img src={logo} alt="SaathApp Logo" className="w-full max-w-[280px] h-auto object-contain" />
        </motion.div>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="mt-12 text-lg sm:text-xl text-slate-700"
        >
          Connecting local services, groceries, and<br className="hidden sm:block" /> trust nearby.
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm font-semibold text-green-700"
        >
          <Sparkles size={18} />
          <span>Delivering trust nearby</span>
          <ArrowRight size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
}
