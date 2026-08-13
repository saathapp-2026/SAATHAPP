import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share } from 'lucide-react';
import { usePWA } from '../context/PWAContext';

export default function PWAInstallModal() {
  const { showIOSPrompt, closeIOSPrompt } = usePWA();

  return (
    <AnimatePresence>
      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 pb-8 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-slate-100 dark:border-slate-800"
          >
            {/* Close Button */}
            <button
              onClick={closeIOSPrompt}
              className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
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
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-left border border-slate-100 dark:border-slate-700/50">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-sm text-xs font-bold text-slate-900 dark:text-white">1</span>
                  Tap the <Share size={16} className="text-blue-500 mx-1" /> Share button
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-sm text-xs font-bold text-slate-900 dark:text-white">2</span>
                  Select <span className="font-bold bg-white dark:bg-slate-700 px-2 py-0.5 rounded shadow-sm">Add to Home Screen</span>
                </p>
              </div>

              <button
                onClick={closeIOSPrompt}
                className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
