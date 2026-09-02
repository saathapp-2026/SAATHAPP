import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const STYLES = {
  success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
  error: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
};

export default function ActionBanner({ banner, onDismiss }) {
  if (!banner) return null;
  const Icon = ICONS[banner.type] || Info;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className={`flex items-start gap-3 p-4 rounded-xl border ${STYLES[banner.type] || STYLES.info}`}
      >
        <Icon size={20} className="shrink-0 mt-0.5" />
        <div className="flex-1">
          {banner.title && <p className="font-semibold text-sm">{banner.title}</p>}
          <p className="text-sm opacity-90">{banner.message}</p>
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none opacity-60 hover:opacity-100">
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
