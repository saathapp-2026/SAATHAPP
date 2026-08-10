import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_40%),linear-gradient(135deg,_#2563eb_0%,_#4f46e5_45%,_#7c3aed_100%)] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.96 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-6 py-12 text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-2xl backdrop-blur-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-indigo-700">
            S
          </div>
        </div>

        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="text-4xl sm:text-5xl font-black tracking-tight"
        >
          SaathApp
        </motion.h1>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="mt-3 text-lg sm:text-xl text-white/85"
        >
          Connecting local services, groceries, and trust nearby.
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-white/80"
        >
          <Sparkles size={16} />
          <span>Delivering trust nearby</span>
          <ArrowRight size={16} />
        </motion.div>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.15 }}
              className="h-2.5 w-2.5 rounded-full bg-white/90"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
