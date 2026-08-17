import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldCheck, AlertCircle, UploadCloud, Check, Loader2 } from 'lucide-react';

export default function DocumentsCard() {
  const [documents, setDocuments] = useState([
    { id: 'aadhaar', name: 'Aadhaar Card', desc: 'Front & back scanned copies', status: 'verified', file: 'aadhaar_scanned_front_back.pdf' },
    { id: 'pan', name: 'PAN Card', desc: 'Permanent Account Number card', status: 'verified', file: 'pan_card_rahul.jpg' },
    { id: 'photo', name: 'Profile Photo', desc: 'Clear passport-size image', status: 'verified', file: 'profile_photo_avatar.png' },
    { id: 'license', name: 'Driving License', desc: 'Active commercial/non-commercial', status: 'pending', file: 'dl_scanned_rahul.jpg' },
    { id: 'experience', name: 'Experience Proof', desc: 'Past work certifications (Optional)', status: 'missing', file: null }
  ]);

  const [uploadingId, setUploadingId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-500 border border-emerald-200/50 text-[9px] font-black uppercase">
            <Check size={10} />
            <span>Verified</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-955/20 dark:text-amber-500 border border-amber-200/50 text-[9px] font-black uppercase">
            <Loader2 size={10} className="animate-spin" />
            <span>Under Review</span>
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-500 dark:bg-rose-955/20 dark:text-rose-500 border border-rose-200/50 text-[9px] font-black uppercase">
            <AlertCircle size={10} />
            <span>Missing File</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleUploadSimulate = (docId) => {
    setUploadingId(docId);
    
    // Simulate upload delay
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: 'pending',
            file: `${docId}_revised_upload_${Date.now().toString().slice(-4)}.jpg`
          };
        }
        return doc;
      }));
      setUploadingId(null);
      alert('Document uploaded successfully. Verification pending.');
    }, 2000);
  };

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft hover:shadow-premium transition-all text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100  pb-4">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Verification Documents</h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Government IDs and trade licenses required for verification</p>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase">
          <ShieldCheck size={12} />
          <span>Status: Verified Partner</span>
        </div>
      </div>

      {/* Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => {
          const isUploading = uploadingId === doc.id;
          
          return (
            <div
              key={doc.id}
              className="p-4 border border-slate-205 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 flex flex-col justify-between h-40 transition-all relative overflow-hidden"
            >
              {/* backdrop upload status mask */}
              <AnimatePresence>
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-2"
                  >
                    <Loader2 size={24} className="text-primary animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Uploading File...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top row: Title and status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface shadow-sm flex items-center justify-center flex-shrink-0 text-slate-500">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-205">{doc.name}</h4>
                    <p className="text-[10px] text-slate-450 leading-tight mt-0.5">{doc.desc}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              {/* Bottom: File Name and Action */}
              <div className="border-t border-slate-100 dark:border-slate-850/80 pt-3 flex items-center justify-between gap-2 mt-4">
                <span className="text-[10px] text-slate-450 truncate font-mono max-w-[140px]">
                  {doc.file ? doc.file : 'No file uploaded'}
                </span>
                
                <button
                  onClick={() => handleUploadSimulate(doc.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface text-[10px] font-black uppercase text-slate-500 hover:text-primary transition-all cursor-pointer shadow-sm"
                >
                  <UploadCloud size={12} />
                  <span>{doc.file ? 'Upload Again' : 'Upload'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
