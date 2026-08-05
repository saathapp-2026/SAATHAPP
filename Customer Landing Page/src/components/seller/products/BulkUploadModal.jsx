import React, { useRef, useState } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { getCsvTemplate, importProductsCsv } from '../../../services/seller/sellerProductsService';

export default function BulkUploadModal({ open, onClose, onImported }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  if (!open) return null;

  const downloadTemplate = () => {
    const blob = new Blob([getCsvTemplate()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saathapp-product-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setReport(null);
    try {
      const text = await file.text();
      const res = await importProductsCsv(text);
      setReport(res.report || { ok: 0, failed: 1, errors: [res.error] });
      if (res.success) onImported?.(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-lg">Excel / CSV Bulk Import</h2>
            <p className="text-sm text-slate-500">Upload products from a spreadsheet</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={downloadTemplate}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
        >
          <Download size={14} /> Download sample template
        </button>

        <div
          className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-8 text-center cursor-pointer hover:border-emerald-500"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
        >
          <Upload size={24} className="mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-medium">Drop CSV/Excel export here or click to browse</p>
          <p className="text-xs text-slate-400 mt-1">CSV recommended</p>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </div>

        {loading && <p className="text-sm text-slate-500">Validating & importing…</p>}
        {report && (
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 text-sm space-y-1">
            <p className="font-semibold">Import report</p>
            <p className="text-emerald-600">Imported: {report.ok}</p>
            <p className="text-red-500">Failed: {report.failed}</p>
            {(report.errors || []).slice(0, 5).map((e) => (
              <p key={e} className="text-xs text-slate-500">• {e}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
