import React from 'react';
import { Receipt, Download, Eye, FileText } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function InvoicesTab() {
  const { addToast } = useWholesale();

  const invoices = [
    { inv: 'INV-2026-8841', orderId: 'ORD-9842', buyer: 'Ramesh Supermarket', amount: 125000, gstAmount: 22500, date: '2026-08-03' },
    { inv: 'INV-2026-8840', orderId: 'ORD-9841', buyer: 'Shree Traders', amount: 95000, gstAmount: 17100, date: '2026-08-03' },
    { inv: 'INV-2026-8839', orderId: 'ORD-9840', buyer: 'GreenMart Store', amount: 78500, gstAmount: 14130, date: '2026-08-02' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">B2B Tax Invoices & E-Way Bills</h2>
          <p className="text-xs text-slate-500">View tax invoices with GSTIN breakup, HSN codes, and download signed PDF copies.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Buyer Enterprise</th>
                <th className="p-3">Taxable Value</th>
                <th className="p-3">GST Tax (18%)</th>
                <th className="p-3">Total Invoice Value</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {invoices.map((inv) => (
                <tr key={inv.inv} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{inv.inv}</td>
                  <td className="p-3 font-mono text-slate-500">{inv.orderId}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">{inv.buyer}</td>
                  <td className="p-3">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-500">₹{inv.gstAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-black text-slate-900 dark:text-white">
                    ₹{(inv.amount + inv.gstAmount).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => addToast(`Downloading ${inv.inv}.pdf...`, 'success')}
                      className="p-1.5 text-slate-400 hover:text-emerald-500 transition"
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
