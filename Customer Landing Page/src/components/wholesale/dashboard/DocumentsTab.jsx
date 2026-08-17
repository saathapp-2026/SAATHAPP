import React, { useState } from 'react';
import { FileBadge2, CheckCircle2, Upload, FileText, ShieldCheck, Check } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function DocumentsTab() {
  const { formData, addToast } = useWholesale ? useWholesale() : { formData: {}, addToast: console.log };

  // Initial Documents Repository State matching screenshot Page 40 of PDF
  const [docList, setDocList] = useState({
    aadhaar: { title: 'AADHAAR', fileName: '', status: 'Pending' },
    pan: { title: 'PAN', fileName: '', status: 'Pending' },
    gst: { title: 'GST', fileName: '', status: 'Pending' },
    tradeLicense: { title: 'TRADE LICENSE', fileName: '', status: 'Pending' },
    msme: { title: 'MSME', fileName: '', status: 'Optional' },
    iec: { title: 'IEC', fileName: '', status: 'Optional' },
    fssai: { title: 'FSSAI', fileName: '', status: 'Optional' },
    drugLicense: { title: 'DRUG LICENSE', fileName: '', status: 'Not Applicable' },
    factoryLicense: { title: 'FACTORY LICENSE', fileName: '', status: 'Optional' },
    companyRegistration: { title: 'COMPANY REGISTRATION', fileName: '', status: 'Pending' },
    warehousePhotos: { title: 'WAREHOUSE PHOTOS', fileName: '', status: 'Optional' },
    factoryPhotos: { title: 'FACTORY PHOTOS', fileName: '', status: 'Optional' },
    businessLogo: { title: 'BUSINESS LOGO', fileName: '', status: 'Optional' },
    ownerSelfie: { title: 'OWNER SELFIE', fileName: '', status: 'Pending' },
  });

  const handleFileUpload = (docKey, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocList((prev) => ({
        ...prev,
        [docKey]: {
          ...prev[docKey],
          fileName: file.name,
          status: 'Uploaded',
        },
      }));
      addToast?.(`Uploaded file "${file.name}" for ${prev[docKey].title}!`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={26} /> Compliance & Document Repository
          </h2>
          <p className="text-xs text-slate-500">
            Government KYC registrations, GST tax certificates, trade licenses, and warehouse proof files.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(docList).map(([key, doc]) => (
          <div
            key={key}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileBadge2 size={18} className="text-emerald-500 shrink-0" />
                  <h3 className="text-xs font-extrabold tracking-wider text-slate-900 dark:text-white">
                    {doc.title}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    doc.status === 'Verified'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : doc.status === 'Uploaded'
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {doc.fileName ? (
                <p className="text-xs text-slate-700 dark:text-slate-300 font-mono font-semibold truncate bg-page dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                  <FileText size={14} className="text-emerald-500 shrink-0" />
                  <span className="truncate">{doc.fileName}</span>
                </p>
              ) : (
                <p className="text-xs text-slate-400 font-medium italic bg-page dark:bg-slate-950/50 p-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  No document file uploaded yet.
                </p>
              )}
            </div>

            {/* REAL WORKABLE FILE UPLOAD BUTTON */}
            <label className="cursor-pointer w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-page transition">
              <Upload size={14} className="text-emerald-500" /> Upload / Update File
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileUpload(key, e)}
                className="hidden"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
