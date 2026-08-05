import React from 'react';
import { X } from 'lucide-react';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  STATUS_STYLES,
  discountLabel,
  formatINR,
  getPromoType,
} from '../../../config/seller/couponConstants';

function fmt(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ViewPromoModal({ open, onClose, item, onEdit }) {
  if (!item) return null;
  const type = getPromoType(item.typeId);

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="view-promo-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-5 py-4">
          <div>
            <h2 id="view-promo-title" className="text-lg font-bold">{item.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{item.code}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold capitalize">{item.kind}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[item.status]}`}>{item.status}</span>
            <span className="rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-semibold">
              {type.label}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{item.description || 'No description'}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-[10px] text-slate-500">Discount</p>
              <p className="font-bold">{discountLabel(item)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-[10px] text-slate-500">Revenue</p>
              <p className="font-bold">{formatINR(item.revenue)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-[10px] text-slate-500">Usage</p>
              <p className="font-bold">{item.used || 0}{item.maxUses ? ` / ${item.maxUses}` : ' / ∞'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-[10px] text-slate-500">Budget</p>
              <p className="font-bold">{item.budget ? formatINR(item.budget) : '—'}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Validity: {fmt(item.startAt)} → {fmt(item.endAt)}
          </p>
          {item.cta ? <p className="text-xs">CTA: <span className="font-semibold">{item.cta}</span></p> : null}
          {item.destinationUrl ? <p className="text-xs break-all">URL: {item.destinationUrl}</p> : null}
          {item.productName ? <p className="text-xs">Product: <span className="font-semibold">{item.productName}</span></p> : null}
          <button
            type="button"
            onClick={() => onEdit?.(item)}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5"
          >
            Edit
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
