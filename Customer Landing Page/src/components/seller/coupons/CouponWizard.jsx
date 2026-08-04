import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  COUPON_WIZARD_STEPS,
  APPLICABILITY,
  CATEGORIES,
  getPromoType,
  discountLabel,
} from '../../../config/seller/couponConstants';
import {
  emptyCouponDraft,
  loadCouponDraft,
  saveCouponDraft,
  clearCouponDraft,
  savePromo,
  getAiMarketingSuggestion,
} from '../../../services/seller/sellerCouponsService';

export default function CouponWizard({ open, onClose, onSaved, initialTypeId, editItem }) {
  const [draft, setDraft] = useState(() => emptyCouponDraft(initialTypeId || 'percentage'));
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editItem) {
      setDraft({ ...emptyCouponDraft(editItem.typeId), ...editItem, step: 1 });
    } else {
      const base = loadCouponDraft();
      if (initialTypeId) {
        base.typeId = initialTypeId;
        base.kind = 'coupon';
        const t = getPromoType(initialTypeId);
        if (t.group === 'coupon') base.discountType = initialTypeId === 'flat' || initialTypeId === 'cashback' ? 'flat' : 'percentage';
      }
      setDraft(base);
    }
    setDirty(false);
  }, [open, initialTypeId, editItem]);

  useEffect(() => {
    if (!open || !dirty || editItem) return;
    saveCouponDraft(draft);
  }, [draft, dirty, open, editItem]);

  const patch = (partial) => {
    setDraft((d) => ({ ...d, ...partial }));
    setDirty(true);
  };

  const canNext = () => {
    if (draft.step === 1) return !!draft.name?.trim() && !!draft.code?.trim();
    if (draft.step === 2) return Number(draft.discountValue) >= 0 || ['bogo', 'free_shipping'].includes(draft.typeId);
    if (draft.step === 4) return !!draft.startAt && !!draft.endAt;
    return true;
  };

  const requestClose = () => {
    if (dirty && !window.confirm('Leave without publishing? Draft will be kept.')) return;
    onClose?.();
  };

  const suggest = async (kind, fieldMap) => {
    setAiBusy(true);
    try {
      const res = await getAiMarketingSuggestion(kind, { category: draft.categories?.[0] });
      const first = res.data?.[0];
      if (first && fieldMap) patch(fieldMap(first));
      toast.success('AI suggestion applied');
    } catch {
      toast.error('AI suggestion failed');
    } finally {
      setAiBusy(false);
    }
  };

  const publish = async (asDraft = false) => {
    if (!canNext() && !asDraft) {
      toast.error('Complete required fields');
      return;
    }
    setBusy(true);
    try {
      const res = await savePromo({ ...draft, kind: 'coupon' }, { asDraft });
      if (res.success) {
        toast.success(asDraft ? 'Draft saved' : 'Coupon published');
        clearCouponDraft();
        setDirty(false);
        onSaved?.(res.data);
        onClose?.();
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setBusy(false);
    }
  };

  const type = getPromoType(draft.typeId);

  return (
    <SellerOverlay open={open} onClose={requestClose} labelledBy="coupon-wizard-title" zIndex={SELLER_Z.modal} className="flex items-end sm:items-center justify-center p-0 sm:p-4" contentClassName="w-full max-w-3xl">
      <div className="max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-5 py-4">
          <div>
            <h2 id="coupon-wizard-title" className="text-lg font-bold">
              {editItem ? 'Edit Coupon' : 'Create Coupon'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {type.label} · Step {draft.step} of 6
            </p>
          </div>
          <button type="button" onClick={requestClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <ol className="flex gap-1 mb-5" aria-label="Wizard progress">
            {COUPON_WIZARD_STEPS.map((s) => (
              <li key={s.id} className="flex-1">
                <div className={`h-1.5 rounded-full ${draft.step >= s.id ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <p className={`mt-1 text-[9px] font-medium truncate ${draft.step === s.id ? 'text-emerald-600' : 'text-slate-400'}`}>{s.label}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {draft.step === 1 && (
            <>
              <label className="block text-xs font-medium">
                Coupon Name *
                <div className="mt-1 flex gap-2">
                  <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="Summer Sale 20%" />
                  <button type="button" disabled={aiBusy} onClick={() => suggest('coupon_name', (v) => ({ name: v }))} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-3 text-xs font-semibold" title="AI suggest">
                    <Sparkles size={13} /> AI
                  </button>
                </div>
              </label>
              <label className="block text-xs font-medium">
                Coupon Code *
                <input value={draft.code} onChange={(e) => patch({ code: e.target.value.toUpperCase() })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-mono" placeholder="SUMMER20" />
              </label>
              <label className="block text-xs font-medium">
                Description
                <div className="mt-1 flex gap-2">
                  <textarea value={draft.description} onChange={(e) => patch({ description: e.target.value })} rows={2} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
                  <button type="button" disabled={aiBusy} onClick={() => suggest('offer_description', (v) => ({ description: v }))} className="self-start inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold">
                    <Sparkles size={13} />
                  </button>
                </div>
              </label>
              <label className="block text-xs font-medium">
                Internal Notes
                <textarea value={draft.notes} onChange={(e) => patch({ notes: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
            </>
          )}

          {draft.step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">
                Discount Type
                <select value={draft.discountType} onChange={(e) => patch({ discountType: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Discount</option>
                </select>
              </label>
              <label className="block text-xs font-medium">
                Discount Value
                <input type="number" value={draft.discountValue} onChange={(e) => patch({ discountValue: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Maximum Discount
                <input type="number" value={draft.maxDiscount} onChange={(e) => patch({ maxDiscount: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Minimum Order
                <input type="number" value={draft.minOrder} onChange={(e) => patch({ minOrder: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Maximum Uses
                <input type="number" value={draft.maxUses} onChange={(e) => patch({ maxUses: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Per Customer Limit
                <input type="number" value={draft.perCustomer} onChange={(e) => patch({ perCustomer: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <button type="button" disabled={aiBusy} onClick={() => suggest('discount', (v) => ({ discountValue: parseInt(v, 10) || 15, discountType: 'percentage' }))} className="sm:col-span-2 inline-flex items-center justify-center gap-1 rounded-xl border border-dashed border-emerald-300 text-emerald-700 dark:text-emerald-300 px-3 py-2 text-xs font-semibold">
                <Sparkles size={13} /> Suggest discount %
              </button>
            </div>
          )}

          {draft.step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {APPLICABILITY.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => patch({ applicability: a.id })}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm ${
                      draft.applicability === a.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              {(draft.applicability === 'categories' || draft.applicability === 'store') && (
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const on = (draft.categories || []).includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          const set = new Set(draft.categories || []);
                          if (on) set.delete(c);
                          else set.add(c);
                          patch({ categories: [...set] });
                        }}
                        className={`rounded-full px-3 py-1 text-xs font-semibold border ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {draft.step === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">
                Start Date
                <input type="date" value={String(draft.startAt).slice(0, 10)} onChange={(e) => patch({ startAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                End Date
                <input type="date" value={String(draft.endAt).slice(0, 10)} onChange={(e) => patch({ endAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Time Slot
                <input type="time" value={draft.timeSlot} onChange={(e) => patch({ timeSlot: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Timezone
                <select value={draft.timezone} onChange={(e) => patch({ timezone: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                </select>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium">
                <input type="checkbox" checked={!!draft.autoActivate} onChange={(e) => patch({ autoActivate: e.target.checked })} />
                Auto Activate
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium">
                <input type="checkbox" checked={!!draft.autoExpire} onChange={(e) => patch({ autoExpire: e.target.checked })} />
                Auto Expire
              </label>
            </div>
          )}

          {draft.step === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['oneTime', 'One Time Use'],
                ['stackable', 'Stackable'],
                ['codAllowed', 'COD Allowed'],
                ['onlineOnly', 'Online Payment Only'],
              ].map(([key, label]) => (
                <label key={key} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-xs font-medium">
                  <input type="checkbox" checked={!!draft[key]} onChange={(e) => patch({ [key]: e.target.checked })} />
                  {label}
                </label>
              ))}
              <label className="block text-xs font-medium sm:col-span-2">
                Exclude Categories
                <input value={draft.excludeCategories} onChange={(e) => patch({ excludeCategories: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="Fashion, Electronics" />
              </label>
              <label className="block text-xs font-medium sm:col-span-2">
                Exclude Products
                <input value={draft.excludeProducts} onChange={(e) => patch({ excludeProducts: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="SKU list" />
              </label>
            </div>
          )}

          {draft.step === 6 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                {['desktop', 'tablet', 'mobile'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPreviewDevice(d)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${
                      previewDevice === d ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div
                className={`mx-auto rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-900 p-5 ${
                  previewDevice === 'mobile' ? 'max-w-[280px]' : previewDevice === 'tablet' ? 'max-w-md' : 'max-w-full'
                }`}
              >
                <p className="text-[10px] font-semibold uppercase text-emerald-600 mb-1">Coupon Preview</p>
                <p className="text-lg font-bold">{draft.name || 'Untitled Coupon'}</p>
                <p className="font-mono text-sm text-emerald-700 dark:text-emerald-300 mt-1">{draft.code || 'CODE'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{draft.description || 'No description'}</p>
                <p className="text-sm font-semibold mt-3">{discountLabel(draft)} · Min order ₹{draft.minOrder || 0}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Valid {String(draft.startAt).slice(0, 10)} → {String(draft.endAt).slice(0, 10)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-5 py-4">
          <button type="button" disabled={draft.step <= 1 || busy} onClick={() => patch({ step: draft.step - 1 })} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold disabled:opacity-40">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex gap-2">
            {draft.step === 6 ? (
              <>
                <button type="button" disabled={busy} onClick={() => publish(true)} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold">
                  Save Draft
                </button>
                <button type="button" disabled={busy} onClick={() => publish(false)} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold">
                  {busy ? 'Publishing…' : 'Publish'}
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={!canNext() || busy}
                onClick={() => {
                  if (!canNext()) {
                    toast.error('Complete required fields');
                    return;
                  }
                  patch({ step: draft.step + 1 });
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </SellerOverlay>
  );
}
