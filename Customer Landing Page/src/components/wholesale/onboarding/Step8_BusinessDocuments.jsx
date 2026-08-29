import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, Upload, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const REQUIRED_DOCUMENTS = [
  { id: 'aadhaar', name: 'Aadhaar Card of Owner', req: true },
  { id: 'pan', name: 'Business / Owner PAN Card', req: true },
  { id: 'gst', name: 'GSTIN Certificate', req: true },
  { id: 'tradeLicense', name: 'Trade License', req: false },
  { id: 'companyRegistration', name: 'Company Registration / COI', req: false },
  { id: 'fssai', name: 'FSSAI License (Food / FMCG)', req: false },
  { id: 'msme', name: 'MSME / Udyam Certificate', req: false },
  { id: 'iec', name: 'IEC Code (Import / Export)', req: false },
  { id: 'warehousePhotos', name: 'Warehouse & Storage Photos', req: true },
  { id: 'factoryPhotos', name: 'Factory / Plant Photos', req: false },
  { id: 'businessLogo', name: 'Business Logo', req: false },
  { id: 'ownerSelfie', name: 'Owner Photo / Selfie with ID', req: true },
];

export default function Step8_BusinessDocuments({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const handleFileUpload = (docId, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedDocs = {
        ...formData.documents,
        [docId]: {
          status: 'Uploaded',
          fileName: file.name,
          date: new Date().toISOString().split('T')[0],
        },
      };
      updateFormData({ documents: updatedDocs });
      addToast(`Document uploaded: ${file.name}`, 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingDocs = REQUIRED_DOCUMENTS.filter((doc) => {
      if (!doc.req) return false;
      const d = formData.documents?.[doc.id];
      if (!d) return true;
      return !(d.status === 'Uploaded' || d.status === 'Verified' || Boolean(d.fileName));
    });
    if (missingDocs.length > 0) {
      addToast(`Please upload required documents: ${missingDocs.map((d) => d.name).join(', ')}`, 'error');
      return;
    }
    addToast('All business documents submitted!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 7 — Business Documents & Compliance
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Document Verification Vault
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Upload government-issued IDs, GST registration, trade licenses, and warehouse proofs for instant verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REQUIRED_DOCUMENTS.map((doc) => {
              const docState = formData.documents[doc.id] || { status: 'Pending', fileName: null };
              const isUploaded = docState.status === 'Uploaded' || docState.status === 'Verified';

              return (
                <div
                  key={doc.id}
                  className={`rounded-2xl border p-4 transition ${
                    isUploaded
                      ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileCheck2
                          size={18}
                          className={isUploaded ? 'text-emerald-500' : 'text-slate-400'}
                        />
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {doc.name}
                        </h4>
                      </div>
                      <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {doc.req ? '* Required' : 'Optional'}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                        docState.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : docState.status === 'Uploaded'
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {docState.status === 'Verified' && <CheckCircle2 size={11} />}
                      {docState.status || 'Pending'}
                    </span>
                  </div>

                  {docState.fileName ? (
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 bg-surface p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="truncate max-w-[180px]">{docState.fileName}</span>
                      <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                        Re-upload
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(doc.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <label className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface border border-slate-300 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-page transition cursor-pointer">
                        <Upload size={14} />
                        Choose File (PDF/JPG)
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(doc.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            <Shield size={20} className="shrink-0 text-emerald-500" />
            <span>
              All document uploads are encrypted using 256-bit AES encryption. SaathApp complies with ISO 27001 data privacy standards.
            </span>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next Phase
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
