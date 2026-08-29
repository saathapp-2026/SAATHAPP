import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share } from 'lucide-react';
import { usePWA } from '../context/PWAContext';
import useScrollLock from '../hooks/useScrollLock';

export default function PWAInstallModal() {
  const { showIOSPrompt, closeIOSPrompt } = usePWA();
  
  useScrollLock(showIOSPrompt);

  return (
    <AnimatePresence>
      {showIOSPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-surface rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-slate-100 dark:border-slate-800"
          >
            {/* Close Button */}
            <button
              onClick={closeIOSPrompt}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute top-4 right-4 p-2 bg-page hover:bg-slate-200 rounded-full transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} className="text-slate-500" />
            </button>

            <div className="p-6 text-center space-y-5">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                <img src="/pwa-192x192.png" alt="Saathapp Icon" className="w-full h-full object-cover" />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Install Saathapp</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Add to your home screen for a faster, app-like experience.
                </p>
              </div>

              {/* Instructions Box */}
              <div className="bg-page rounded-2xl p-4 text-left border border-slate-100">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-xs font-bold text-slate-900 dark:text-white">1</span>
                  Tap the <Share size={16} className="text-blue-500 mx-1" /> Share button
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-xs font-bold text-slate-900 dark:text-white">2</span>
                  Select <span className="font-bold bg-white px-2 py-0.5 rounded shadow-sm">Add to Home Screen</span>
                </p>
              </div>

              <button
                onClick={closeIOSPrompt}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3.5 bg-page hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
