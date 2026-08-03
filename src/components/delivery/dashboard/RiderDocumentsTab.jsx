import React from 'react';
import { FileText, CheckCircle2, ShieldCheck, Upload, AlertCircle } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderDocumentsTab() {
  const { formData } = useDelivery();

  const documents = [
    { title: 'Aadhaar Card (Front & Back)', status: 'Verified', date: '03 Aug 2026', ref: 'AADHAAR-8942-XXXX' },
    { title: 'Driving Licence (DL)', status: 'Verified', date: '03 Aug 2026', ref: 'DL-BR01-2024-98420' },
    { title: 'Vehicle Registration Certificate (RC)', status: 'Verified', date: '03 Aug 2026', ref: 'RC-BR01AB9842' },
    { title: 'Vehicle Insurance Certificate', status: 'Verified', date: '03 Aug 2026', ref: 'INS-89402941' },
    { title: 'Rider Live Selfie', status: 'Verified', date: '03 Aug 2026', ref: 'IMG-SELFIE-9842' },
    { title: 'Bank Passbook / Cheque', status: 'Verified', date: '03 Aug 2026', ref: 'BANK-PASSBOOK-9842' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <FileText size={14} /> Rider Document Vault
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Licence & Verified Documents</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-black uppercase">
                <CheckCircle2 size={12} /> {doc.status}
              </span>
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{doc.title}</h3>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">Ref: {doc.ref}</p>
            </div>
            <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              Verified on {doc.date} • Valid for 2 Years
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
