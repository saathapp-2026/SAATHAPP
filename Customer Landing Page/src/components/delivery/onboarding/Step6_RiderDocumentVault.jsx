import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Camera } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const RIDER_DOCUMENTS = [
  { id: 'aadhaar', label: 'Aadhaar Card (Front & Back)', required: true },
  { id: 'pan', label: 'PAN Card', required: false },
  { id: 'drivingLicence', label: 'Driving Licence (DL)', required: true },
  { id: 'rcBook', label: 'Vehicle Registration Certificate (RC)', required: true },
  { id: 'vehicleInsurance', label: 'Vehicle Insurance Certificate', required: true },
  { id: 'pucCertificate', label: 'Pollution Under Control (PUC)', required: false },
  { id: 'riderSelfie', label: 'Live Rider Selfie / Passport Photo', required: true },
  { id: 'bankPassbook', label: 'Bank Passbook or Cancelled Cheque', required: true },
];

export default function Step6_RiderDocumentVault({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();

  const handleFileUpload = (docId, e) => {
    const file = e.target.files[0];
    if (file) {
      const nextDocs = { ...formData.documents };
      nextDocs[docId] = {
        status: 'Uploaded',
        fileName: file.name,
        date: new Date().toISOString().split('T')[0],
      };
      updateFormData({ documents: nextDocs });
      addToast(`Uploaded: ${file.name}`, 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Rider documents vault saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 5 — Rider Document Vault
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Upload Driver & Vehicle Documents
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Upload clear, unedited, valid government IDs and vehicle registration documents for verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RIDER_DOCUMENTS.map((doc) => {
              const docState = formData.documents?.[doc.id] || { status: 'Pending' };
              const isUploaded = docState.status === 'Uploaded' || docState.status === 'Verified';

              return (
                <div
                  key={doc.id}
                  className={`rounded-2xl border p-4 transition flex items-center justify-between gap-3 ${
                    isUploaded
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${
                        isUploaded ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isUploaded ? <CheckCircle2 size={20} /> : <FileText size={18} />}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{doc.label}</h4>
                        {doc.required && <span className="text-[10px] text-red-500 font-black">*</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {isUploaded ? docState.fileName : 'PDF, JPG, PNG up to 10 MB'}
                      </p>
                    </div>
                  </div>

                  <label
                    className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition cursor-pointer inline-flex items-center gap-1.5 shadow-sm ${
                      isUploaded
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 hover:scale-105'
                    }`}
                  >
                    <Upload size={13} />
                    <span>{isUploaded ? 'Re-upload' : 'Upload'}</span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
            >
              Save Vault & Next
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
