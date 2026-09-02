import React, { useEffect, useState } from 'react';
import { X, Copy, Trash2, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { REPORT_TYPES } from '../../../config/seller/reportConstants';
import {
  getTemplates,
  saveTemplate,
  deleteTemplate,
} from '../../../services/seller/sellerReportsService';

export default function SavedTemplatesModal({ open, onClose, onApply, draftSeed }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await getTemplates();
      setList(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  const create = async () => {
    if (!name.trim()) {
      toast.error('Template name required');
      return;
    }
    await saveTemplate({
      name: name.trim(),
      ...draftSeed,
    });
    setName('');
    toast.success('Template saved');
    refresh();
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="templates-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="templates-title" className="text-lg font-bold flex items-center gap-2">
              <Bookmark size={18} className="text-emerald-600" /> Saved Templates
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Reuse filter combinations</p>
          </div>
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template name"
            className="flex-1 rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={create}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs font-semibold"
          >
            Save Current
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500 py-6 text-center">Loading…</p>
        ) : !list.length ? (
          <p className="text-sm text-slate-500 py-6 text-center">No saved templates yet</p>
        ) : (
          <ul className="space-y-2">
            {list.map((t) => {
              const type = REPORT_TYPES.find((r) => r.id === t.typeId);
              return (
                <li
                  key={t.id}
                  className="rounded-xl border border-slate-200 p-3 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{t.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {type?.label || t.typeId} · {t.dateFrom} → {t.dateTo}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      title="Apply"
                      onClick={() => {
                        onApply?.(t);
                        onClose?.();
                        toast.success('Template applied') }}
                      className="p-1.5 rounded-lg hover:bg-page"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={async () => {
                        await deleteTemplate(t.id);
                        toast.success('Template deleted');
                        refresh();
                      }}
                      className="p-1.5 rounded-lg hover:bg-page text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SellerOverlay>
  );
}
