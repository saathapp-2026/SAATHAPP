import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Crown, ArrowUpRight, RefreshCw, History, Download, XCircle, Calendar,
} from 'lucide-react';
import { getMembershipStatus } from '../../services/sellerMembershipService';

export default function MembershipStatusCard({ membership, onRenew, onCancel, onDownloadInvoice }) {
  const status = getMembershipStatus(membership);
  const isSubscribed = status.isActive && membership?.subscribed;

  const statusConfig = {
    active: { label: 'Active', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    not_subscribed: { label: 'Not Subscribed', color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/30' },
    expired: { label: 'Expired', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' },
  };

  const config = statusConfig[status.status] || statusConfig.not_subscribed;
  const lastPayment = membership?.paymentHistory?.[membership.paymentHistory.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown size={20} className="text-violet-500" />
          <h3 className="font-bold text-lg">Seller Membership</h3>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Current Plan</p>
          <p className="font-semibold">{status.planName}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Status</p>
          <p className="font-semibold">{isSubscribed ? 'Active' : 'Not Subscribed'}</p>
        </div>
        {isSubscribed && (
          <>
            <div>
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Calendar size={12} />
                Billing Cycle
              </p>
              <p className="font-semibold capitalize">{membership.billingCycle || 'Monthly'}</p>
            </div>
            {membership.validUntil && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Renews On</p>
                <p className="font-semibold text-sm">
                  {new Date(membership.validUntil).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {!isSubscribed && (
        <p className="text-sm text-slate-500 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          You are currently using the <strong>Standard Seller Experience</strong>. Upgrade anytime to unlock premium business tools, reports, automation, and support.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          to="/seller/dashboard/membership"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors"
        >
          <ArrowUpRight size={14} />
          {isSubscribed ? 'Manage Membership' : 'Upgrade Now'}
        </Link>
        {isSubscribed && onRenew && (
          <button type="button" onClick={onRenew} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <RefreshCw size={14} />
            Renew
          </button>
        )}
        {lastPayment?.invoiceId && onDownloadInvoice && (
          <button type="button" onClick={() => onDownloadInvoice(lastPayment.invoiceId)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            <Download size={14} />
            Download Invoice
          </button>
        )}
        <Link to="/seller/dashboard/membership" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
          <History size={14} />
          Payment History
        </Link>
        {isSubscribed && onCancel && (
          <button type="button" onClick={onCancel} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-red-500 border border-red-200 dark:border-red-900 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
            <XCircle size={14} />
            Cancel
          </button>
        )}
        {isSubscribed && membership?.planId !== 'free' && (
          <Link
            to="/seller/dashboard/membership"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Downgrade
          </Link>
        )}
      </div>
    </motion.div>
  );
}
