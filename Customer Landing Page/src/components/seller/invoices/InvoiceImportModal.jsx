import React, { useState } from 'react';
import { X, Upload, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { getImportTemplateCsv, importInvoicesCsv } from '../../../services/seller/sellerInvoicesService';

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(',');
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cols[i] || '').trim();
    });
    return row;
  });
}

export default function InvoiceImportModal({ open, onClose, onImported }) {
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="import-inv-title">
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="import-inv-title" className="font-bold text-lg">Import Invoices</h2>
            <p className="text-xs text-slate-500 mt-0.5">Upload CSV / Excel export</p>
          </div>
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([getImportTemplateCsv()], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'saathapp-invoices-template.csv';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
        >
          <Download size={14} /> Download Sample Template
        </button>
        <label className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 p-8 cursor-pointer hover:bg-page">
          <Upload size={22} className="text-slate-400" />
          <span className="text-sm font-medium">Drop CSV or click to browse</span>
          <span className="text-xs text-slate-400">{fileName || 'No file selected'}</span>
          <input
            type="file"
            accept=".csv,text/csv"
            className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setFileName(file.name);
              const text = await file.text();
              const parsed = parseCsv(text);
              setRows(parsed);
              toast.success(`${parsed.length} rows ready`) }}
          />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl text-sm border border-slate-200">Cancel</button>
          <button
            type="button"
            disabled={loading || !rows.length}
            onClick={async () => {
              setLoading(true);
              try {
                const res = await importInvoicesCsv(rows);
                toast.success(`Imported ${res.data.imported}`);
                onImported?.(res.data);
                onClose?.();
              } finally {
                setLoading(false);
              }
            }}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white disabled:opacity-50"
          >
            {loading ? 'Importing…' : 'Import'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
