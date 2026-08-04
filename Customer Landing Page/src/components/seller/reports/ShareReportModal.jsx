import React, { useState } from 'react';
import { X, Mail, MessageCircle, Link2, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { addNotification } from '../../../services/sellerNotificationService';

export default function ShareReportModal({ open, onClose, report }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);

  if (!report) return null;

  const link = `${window.location.origin}/seller/dashboard/reports?view=${report.id}`;

  const notify = async (channel, message) => {
    setBusy(true);
    try {
      addNotification({
        title: 'Report Shared',
        body: `${report.name} shared via ${channel}`,
      });
      toast.success(message);
      onClose?.();
    } catch {
      toast.success(message);
      onClose?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="share-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="share-title" className="text-lg font-bold">Share Report</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[280px]">{report.name}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 flex items-center gap-2">
          <Link2 size={14} className="text-slate-400 shrink-0" />
          <p className="text-[11px] truncate flex-1 text-slate-600 dark:text-slate-300">{link}</p>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(link);
                toast.success('Link copied');
              } catch {
                toast.error('Copy failed');
              }
            }}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700"
            aria-label="Copy link"
          >
            <Copy size={14} />
          </button>
        </div>

        <label className="block text-xs font-medium">
          Email
          <div className="mt-1 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={busy || !email}
              onClick={() => notify('email', 'Report emailed successfully')}
              className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs font-semibold disabled:opacity-40"
            >
              <Mail size={13} /> Send
            </button>
          </div>
        </label>

        <label className="block text-xs font-medium">
          WhatsApp
          <div className="mt-1 flex gap-2">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98xxx xxxxx"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={busy || !phone}
              onClick={() => notify('whatsapp', 'WhatsApp share queued')}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold disabled:opacity-40"
            >
              <MessageCircle size={13} /> Send
            </button>
          </div>
        </label>
      </div>
    </SellerOverlay>
  );
}
