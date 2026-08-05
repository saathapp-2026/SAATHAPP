import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { addCreditDebitNote } from '../../../services/seller/sellerInvoicesService';

export default function CreditDebitNoteModal({ open, onClose, invoice, onSaved }) {
  const [type, setType] = useState('credit');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="cdn-title">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="cdn-title" className="font-bold text-lg">Credit / Debit Note</h2>
            <p className="text-xs text-slate-500 mt-0.5">{invoice?.number}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          {['credit', 'debit'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold border capitalize ${
                type === t ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {t} note
            </button>
          ))}
        </div>
        <label className="block text-xs text-slate-500">
          Amount (₹)
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
        </label>
        <label className="block text-xs text-slate-500">
          Reason (returns / refund / price adjustment)
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700">Cancel</button>
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              if (!invoice || !amount) return toast.error('Amount required');
              setLoading(true);
              try {
                const res = await addCreditDebitNote(invoice.id, { type, amount, reason });
                if (res.success) {
                  toast.success(`${type} note added`);
                  onSaved?.(res.data);
                  onClose?.();
                }
              } finally {
                setLoading(false);
              }
            }}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Save Note'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
