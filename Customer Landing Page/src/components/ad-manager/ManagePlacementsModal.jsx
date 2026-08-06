import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../seller/SellerOverlay';
import { SELLER_Z } from '../../config/seller/sellerZIndex';
import { PLACEMENTS } from '../../config/seller/adConstants';

export default function ManagePlacementsModal({ open, onClose, enabled = [], onSave }) {
  const [selected, setSelected] = useState(() => new Set(enabled.length ? enabled : PLACEMENTS.slice(0, 5).map((p) => p.id)));

  React.useEffect(() => {
    if (open) setSelected(new Set(enabled.length ? enabled : PLACEMENTS.slice(0, 5).map((p) => p.id)));
  }, [open, enabled]);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="placements-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="placements-title" className="text-lg font-bold">Manage Placements</h2>
            <p className="text-xs text-slate-500 mt-0.5">Enable inventory slots for your ads</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close"><X size={16} /></button>
        </div>
        <ul className="space-y-2 mb-4">
          {PLACEMENTS.map((p) => {
            const on = selected.has(p.id);
            return (
              <li key={p.id}>
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      const next = new Set(selected);
                      if (on) next.delete(p.id);
                      else next.add(p.id);
                      setSelected(next);
                    }}
                  />
                  {p.label}
                </label>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold">Cancel</button>
          <button
            type="button"
            onClick={() => {
              onSave?.([...selected]);
              toast.success('Placements updated');
              onClose?.();
            }}
            className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold"
          >
            Save Placements
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
