import React from 'react';
import { X } from 'lucide-react';
import SellerOverlay from '../seller/SellerOverlay';
import { SELLER_Z } from '../../config/seller/sellerZIndex';
import {
  STATUS_STYLES,
  formatINR,
  formatCompact,
  getAdType,
  getPlacementLabel,
} from '../../config/seller/adConstants';

export default function ViewAdModal({ open, onClose, ad, onEdit }) {
  if (!ad) return null;
  const type = getAdType(ad.typeId);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="view-ad-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-5 py-4">
          <div>
            <h2 id="view-ad-title" className="text-lg font-bold">{ad.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{ad.id}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-page px-2.5 py-0.5 text-[10px] font-semibold">{type.short}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[ad.status]}`}>{ad.status === 'running' ? 'Active' : ad.status}</span>
            {ad.score ? <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-[10px] font-semibold">Score {ad.score}</span> : null}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{ad.description || ad.headline}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ['Placement', getPlacementLabel(ad.placement)],
              ['Budget', `${formatINR(ad.dailyBudget)}/day`],
              ['Spent', formatINR(ad.spent)],
              ['Impressions', formatCompact(ad.impressions)],
              ['Clicks', ad.clicks],
              ['CTR', `${ad.ctr}%`],
              ['Orders', ad.orders],
              ['Revenue', formatINR(ad.revenue)],
              ['ROAS', `${ad.roas}x`],
              ['Remaining', formatINR(ad.remainingBudget)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-page p-3">
                <p className="text-[10px] text-slate-500">{k}</p>
                <p className="font-bold text-sm">{v}</p>
              </div>
            ))}
          </div>
          {ad.history?.length ? (
            <div>
              <p className="text-xs font-semibold mb-2">Status Timeline</p>
              <ul className="space-y-1.5">
                {ad.history.map((h, i) => (
                  <li key={`${h.at}-${i}`} className="text-[11px] text-slate-500">
                    <span className="font-semibold capitalize text-slate-700 dark:text-slate-200">{h.status}</span> — {h.note} · {new Date(h.at).toLocaleString('en-IN')}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <button type="button" onClick={() => onEdit?.(ad)} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5">Edit</button>
        </div>
      </div>
    </SellerOverlay>
  );
}
