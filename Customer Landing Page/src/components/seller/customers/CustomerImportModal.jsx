import React, { useState } from 'react';
import { X, Upload, Download, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import { getImportTemplateCsv, importCustomers } from '../../../services/seller/sellerCustomersService';
import SellerOverlay from '../SellerOverlay';

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        cols.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    cols.push(cur);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = String(cols[i] || '').trim();
    });
    return row;
  });
}

export default function CustomerImportModal({ open, onClose, onImported }) {
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    const text = await file.text();
    const parsed = parseCsv(text);
    if (!parsed.length) {
      toast.error('Could not parse file. Use CSV template.');
      setRows([]);
      return;
    }
    setRows(parsed);
    toast.success(`${parsed.length} rows ready to import`);
  };

  const handleImport = async () => {
    if (!rows.length) return toast.error('Select a valid CSV/Excel file first');
    setLoading(true);
    try {
      const res = await importCustomers(rows);
      setResult(res.data);
      if (res.data.imported) {
        toast.success(`Imported ${res.data.imported} customers`);
        onImported?.(res.data);
      } else toast('No new customers imported', { icon: 'ℹ️' });
    } catch {
      toast.error('Import failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([getImportTemplateCsv()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saathapp-customers-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="import-customers-title">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="import-customers-title" className="font-bold text-lg">Import Customers</h2>
            <p className="text-xs text-slate-500 mt-0.5">Upload Excel or CSV. Duplicates are skipped.</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <button type="button" onClick={downloadTemplate} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline">
          <Download size={14} />
          Download Sample Template
        </button>

        <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-8 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
          <Upload size={22} className="text-slate-400" />
          <span className="text-sm font-medium">Drop CSV / Excel or click to browse</span>
          <span className="text-xs text-slate-400">{fileName || 'No file selected'}</span>
          <input type="file" accept=".csv,.xlsx,.xls,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>

        {rows.length > 0 && (
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileSpreadsheet size={13} />
            {rows.length} rows validated locally
          </p>
        )}

        {result && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-xs space-y-1">
            <p>Imported: <b>{result.imported}</b></p>
            <p>Duplicates: <b>{result.duplicates}</b></p>
            <p>Errors: <b>{result.errors?.length || 0}</b></p>
            {result.errors?.slice(0, 3).map((e) => (
              <p key={e.row} className="text-red-500">Row {e.row}: {e.message}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700">
            Cancel
          </button>
          <button
            type="button"
            disabled={loading || !rows.length}
            onClick={handleImport}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? 'Importing…' : 'Import Customers'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
