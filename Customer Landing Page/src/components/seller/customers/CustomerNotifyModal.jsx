import React, { useState } from 'react';
import { X, Bell, MessageCircle, Mail, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import { NOTIFICATION_TEMPLATES } from '../../../config/seller/customerConstants';
import { sendCustomerNotification } from '../../../services/seller/sellerCustomersService';
import SellerOverlay from '../SellerOverlay';

const CHANNELS = [
  { id: 'push', label: 'Push', icon: Bell },
  { id: 'sms', label: 'SMS', icon: Smartphone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
];

export default function CustomerNotifyModal({ open, onClose, customerIds = [] }) {
  const [channel, setChannel] = useState('whatsapp');
  const [template, setTemplate] = useState('promo');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!customerIds.length) return toast.error('No customers selected');
    setLoading(true);
    try {
      const res = await sendCustomerNotification({
        ids: customerIds,
        channel,
        template,
        message: template === 'custom' ? message : undefined,
      });
      if (res.success) {
        toast.success(`Sent to ${res.data.sent} customer(s) via ${channel}`);
        onClose?.();
      }
    } catch {
      toast.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="notify-customers-title">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="notify-customers-title" className="font-bold text-lg">Send Notification</h2>
            <p className="text-xs text-slate-500 mt-0.5">{customerIds.length} recipient(s)</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Channel</p>
          <div className="grid grid-cols-4 gap-2">
            {CHANNELS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setChannel(id)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-[11px] font-semibold ${
                  channel === id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-xs text-slate-500">
          Template
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
          >
            {NOTIFICATION_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>

        {template === 'custom' && (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Write your custom message…"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
          />
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700">
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSend}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
