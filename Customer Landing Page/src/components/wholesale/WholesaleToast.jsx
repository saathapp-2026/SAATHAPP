import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useWholesale } from '../../context/WholesaleContext';

export default function WholesaleToast() {
  const { toasts, removeToast } = useWholesale();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 dark:bg-emerald-900/90'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/30 text-rose-100 dark:bg-rose-900/90'
                : 'bg-slate-900/90 border-slate-700/50 text-slate-100'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle size={20} className="text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-semibold leading-snug">{toast.message}</div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
