import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';

export default function InvoicePreviewModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handleDownload = () => {
    if (invoice.downloadUrl) {
      const a = document.createElement('a');
      a.href = invoice.downloadUrl;
      a.download = `${invoice.invoiceId}.html`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-violet-500" />
            <h3 className="font-bold">Invoice Preview</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Invoice ID</p>
              <p className="font-mono font-medium">{invoice.invoiceId}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Amount</p>
              <p className="font-bold text-emerald-600">₹{invoice.payment?.amount?.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Plan</p>
              <p className="font-medium">{invoice.payment?.planName}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Date</p>
              <p className="font-medium">
                {invoice.payment?.paidAt
                  ? new Date(invoice.payment.paidAt).toLocaleDateString('en-IN')
                  : '—'}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-xs text-slate-500">
            Demo invoice generated locally. Full PDF invoices will be available when backend is connected.
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            <Download size={18} />
            Download Invoice
          </button>
        </div>
      </motion.div>
    </div>
  );
}
