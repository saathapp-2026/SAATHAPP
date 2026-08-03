import React from 'react';
import { FileBadge2, CheckCircle2, Upload, FileText, ShieldCheck } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function DocumentsTab() {
  const { formData, addToast } = useWholesale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Compliance & Document Repository</h2>
          <p className="text-xs text-slate-500">Government KYC registrations, GST tax certificates, and warehouse proof files.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(formData.documents).map(([key, doc]) => (
          <div
            key={key}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileBadge2 size={18} className="text-emerald-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  doc.status === 'Verified'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : doc.status === 'Uploaded'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {doc.status}
              </span>
            </div>

            {doc.fileName ? (
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate bg-slate-50 dark:bg-slate-950 p-2 rounded-xl">
                {doc.fileName}
              </p>
            ) : (
              <p className="text-xs text-slate-400 font-medium italic">No document file uploaded yet.</p>
            )}

            <button
              type="button"
              onClick={() => addToast(`Re-upload requested for ${key}`, 'info')}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Upload / Update File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
