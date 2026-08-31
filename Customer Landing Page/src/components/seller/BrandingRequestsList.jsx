import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

const STATUS_STYLES = {
  submitted: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  quoted: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
};

export default function BrandingRequestsList({ requests, variant = 'light' }) {
  if (!requests?.length) return null;
  const isLight = variant === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 ${
        isLight ? 'bg-surface border-slate-200 dark:border-slate-800' : 'bg-surface/5 border-white/10'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList size={18} className="text-violet-500" />
        <h3 className="font-bold">Your Branding Requests</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 font-medium">
          {requests.length}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className={`p-4 rounded-xl border ${isLight ? 'border-slate-100 dark:border-slate-800 bg-page' : 'border-white/10 bg-surface/5'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-sm">{req.brandingRequired}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Qty: {req.quantity} {req.budget ? `· Budget: ₹${req.budget}` : ''}
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(req.submittedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border capitalize ${STATUS_STYLES[req.status] || STATUS_STYLES.submitted}`}>
                {req.status}
              </span>
            </div>
            {req.notes && (
              <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
                {req.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
        <CheckCircle2 size={12} />
        Requests are saved to your seller account and reviewed by our branding team.
      </p>
    </motion.div>
  );
}
