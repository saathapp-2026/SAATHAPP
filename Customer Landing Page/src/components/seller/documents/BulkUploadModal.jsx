import React, { useRef, useState } from 'react';
import { X, Upload, FileArchive } from 'lucide-react';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { bulkUploadDocuments } from '../../../services/seller/sellerDocumentsService';

export default function BulkUploadModal({ open, onClose, onDone }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const reset = () => {
    setFiles([]);
    setProgress(0);
    setBusy(false);
    setResult(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const addFiles = (list) => {
    const arr = Array.from(list || []);
    setFiles((prev) => [...prev, ...arr]);
    setResult(null);
  };

  const startUpload = async () => {
    if (!files.length) return;
    setBusy(true);
    setProgress(15);
    const timer = setInterval(() => {
      setProgress((p) => Math.min(90, p + 12));
    }, 200);
    try {
      const res = await bulkUploadDocuments(
        files.map((f) => ({ name: f.name, type: f.type, size: f.size }))
      );
      setResult(res.data);
      setProgress(100);
      onDone?.(res.data);
    } finally {
      clearInterval(timer);
      setBusy(false);
    }
  };

  return (
    <SellerOverlay
      open={open}
      onClose={handleClose}
      labelledBy="bulk-upload-title"
      zIndex={SELLER_Z.modal}
      contentClassName="w-full max-w-lg"
    >
      <div className="rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 id="bulk-upload-title" className="text-lg font-bold">
              Import Documents
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Bulk PDF, images, or ZIP</p>
          </div>
          <button type="button" onClick={handleClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-lg hover:bg-page" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`rounded-2xl border-2 border-dashed p-6 text-center ${
              dragOver ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-300'
            }`}
          >
            <FileArchive className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium">Drop multiple files or a ZIP</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold"
            >
              <Upload size={14} /> Browse
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp,.zip,image/*,application/pdf,application/zip"
              className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length ? (
            <ul className="max-h-36 overflow-y-auto text-sm space-y-1">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                  <span className="truncate">{f.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                </li>
              ))}
            </ul>
          ) : null}

          {busy || progress > 0 ? (
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Upload progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-page overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : null}

          {result ? (
            <div className="text-sm space-y-2">
              <p className="text-emerald-600 font-medium">Success: {result.success?.length || 0}</p>
              {result.errors?.length ? (
                <div>
                  <p className="text-red-600 font-medium">Errors: {result.errors.length}</p>
                  <ul className="text-xs text-red-500 mt-1">
                    {result.errors.map((e) => (
                      <li key={e.name}>
                        {e.name}: {e.error}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl border border-slate-200 px-4 py-2 text-sm">
              Close
            </button>
            <button
              type="button"
              disabled={!files.length || busy}
              onClick={startUpload}
              className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {busy ? 'Uploading…' : 'Start Upload'}
            </button>
          </div>
        </div>
      </div>
    </SellerOverlay>
  );
}
