import React, { useEffect, useState } from 'react';
import { X, Library } from 'lucide-react';
import SellerOverlay from '../seller/SellerOverlay';
import { SELLER_Z } from '../../config/seller/sellerZIndex';
import { getCreatives } from '../../services/advertisementsService';

export default function CreativeLibraryModal({ open, onClose }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    getCreatives()
      .then((res) => setList(res.data || []))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="creative-lib-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="creative-lib-title" className="text-lg font-bold inline-flex items-center gap-2">
              <Library size={18} className="text-emerald-600" /> Creative Library
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Reusable banners, posters, videos & headlines</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close"><X size={16} /></button>
        </div>
        {loading ? <p className="text-sm text-slate-500 text-center py-8">Loading…</p> : (
          <ul className="space-y-2">
            {list.map((c) => (
              <li key={c.id} className="rounded-xl border border-slate-200 px-3 py-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-[11px] text-slate-500 capitalize">{c.kind} · used in {c.usedIn} ads</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SellerOverlay>
  );
}
