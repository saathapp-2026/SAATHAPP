import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { getPromoType, CATEGORIES } from '../../../config/seller/couponConstants';
import { emptyCouponDraft, savePromo, getAiMarketingSuggestion } from '../../../services/seller/sellerCouponsService';

const TITLES = {
  ad: 'Create Advertisement',
  banner: 'Create Banner',
  poster: 'Create Poster',
  sponsored: 'Sponsored Product',
  campaign: 'Create Campaign',
};

export default function PromoAssetWizard({ open, onClose, onSaved, typeId, editItem }) {
  const type = getPromoType(typeId || editItem?.typeId || 'ad_image');
  const kind = editItem?.kind || type.group || 'ad';
  const [form, setForm] = useState(() => emptyCouponDraft(type.id));
  const [busy, setBusy] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editItem) setForm({ ...emptyCouponDraft(editItem.typeId), ...editItem });
    else setForm({ ...emptyCouponDraft(typeId || type.id), kind, typeId: typeId || type.id });
  }, [open, typeId, editItem, kind, type.id]);

  const patch = (partial) => setForm((f) => ({ ...f, ...partial }));

  const suggest = async (aiKind, apply) => {
    setAiBusy(true);
    try {
      const res = await getAiMarketingSuggestion(aiKind);
      const first = res.data?.[0];
      if (first) patch(apply(first));
      toast.success('AI suggestion applied') } catch {
      toast.error('AI failed');
    } finally {
      setAiBusy(false);
    }
  };

  const submit = async (asDraft = false) => {
    if (!form.name?.trim()) {
      toast.error('Name is required');
      return;
    }
    setBusy(true);
    try {
      const res = await savePromo({ ...form, kind, typeId: form.typeId || type.id }, { asDraft });
      if (res.success) {
        toast.success(asDraft ? 'Draft saved' : `${TITLES[kind] || 'Promo'} published`);
        onSaved?.(res.data);
        onClose?.();
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="promo-asset-title" zIndex={SELLER_Z.modal} className="flex items-end sm:items-center justify-center p-0 sm:p-4" contentClassName="w-full max-w-2xl">
      <div className="max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="promo-asset-title" className="text-lg font-bold">{editItem ? 'Edit' : TITLES[kind] || 'Create Promo'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{type.label}</p>
          </div>
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block text-xs font-medium sm:col-span-2">
            Name / Title *
            <div className="mt-1 flex gap-2">
              <input value={form.name} onChange={(e) => patch({ name: e.target.value })} className="flex-1 rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
              <button type="button" disabled={aiBusy} onClick={() => suggest(kind === 'banner' ? 'banner_headline' : kind === 'poster' ? 'poster' : 'marketing_text', (v) => ({ name: v }))} className="rounded-xl border border-slate-200 px-3 text-xs font-semibold inline-flex items-center gap-1">
                <Sparkles size={13} /> AI
              </button>
            </div>
          </label>

          <label className="block text-xs font-medium">
            Code
            <input value={form.code} onChange={(e) => patch({ code: e.target.value.toUpperCase() })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm font-mono" />
          </label>

          {(kind === 'ad' || kind === 'banner' || kind === 'poster' || kind === 'campaign') && (
            <label className="block text-xs font-medium">
              CTA Button
              <input value={form.cta} onChange={(e) => patch({ cta: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
            </label>
          )}

          <label className="block text-xs font-medium sm:col-span-2">
            Description / Subtitle
            <textarea value={form.description} onChange={(e) => patch({ description: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>

          {(kind === 'ad' || kind === 'banner' || kind === 'poster') && (
            <>
              <label className="block text-xs font-medium sm:col-span-2">
                Destination URL
                <input value={form.destinationUrl} onChange={(e) => patch({ destinationUrl: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" placeholder="https:// or /shop/..." />
              </label>
              <label className="block text-xs font-medium sm:col-span-2">
                Upload Media
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => patch({ mediaName: e.target.files?.[0]?.name || '' })}
                  className="mt-1 w-full text-sm"
                />
                {form.mediaName ? <p className="text-[11px] text-slate-500 mt-1">{form.mediaName}</p> : null}
              </label>
            </>
          )}

          {kind === 'poster' && (
            <>
              <label className="block text-xs font-medium">
                Headline
                <input value={form.headline} onChange={(e) => patch({ headline: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Offer Text
                <input value={form.offerText} onChange={(e) => patch({ offerText: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium sm:col-span-2">
                <input type="checkbox" checked={!!form.qrEnabled} onChange={(e) => patch({ qrEnabled: e.target.checked })} />
                Include QR Code (clickable on app & website)
              </label>
            </>
          )}

          {kind === 'sponsored' && (
            <>
              <label className="block text-xs font-medium sm:col-span-2">
                Select Product
                <input value={form.productName} onChange={(e) => patch({ productName: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" placeholder="Basmati Rice 5kg" />
              </label>
              <label className="block text-xs font-medium">
                Daily Budget
                <input type="number" value={form.dailyBudget} onChange={(e) => patch({ dailyBudget: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">
                Total Budget
                <input type="number" value={form.budget} onChange={(e) => patch({ budget: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium mb-1.5">Placements</p>
                <div className="flex flex-wrap gap-2">
                  {['homepage', 'search', 'category', 'product'].map((p) => {
                    const on = (form.placements || []).includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          const set = new Set(form.placements || []);
                          if (on) set.delete(p);
                          else set.add(p);
                          patch({ placements: [...set] });
                        }}
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {(kind === 'campaign' || kind === 'ad' || kind === 'sponsored') && (
            <label className="block text-xs font-medium">
              Budget
              <div className="mt-1 flex gap-2">
                <input type="number" value={form.budget} onChange={(e) => patch({ budget: e.target.value })} className="flex-1 rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
                <button type="button" disabled={aiBusy} onClick={() => suggest('budget', (v) => ({ budget: parseInt(String(v).replace(/[^\d]/g, ''), 10) || 10000 }))} className="rounded-xl border px-2 text-xs font-semibold">
                  <Sparkles size={13} />
                </button>
              </div>
            </label>
          )}

          <label className="block text-xs font-medium">
            Priority
            <input type="number" min={1} max={10} value={form.priority} onChange={(e) => patch({ priority: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>

          <label className="block text-xs font-medium">
            Start Date
            <input type="date" value={String(form.startAt).slice(0, 10)} onChange={(e) => patch({ startAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>
          <label className="block text-xs font-medium">
            End Date
            <input type="date" value={String(form.endAt).slice(0, 10)} onChange={(e) => patch({ endAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>

          <div className="sm:col-span-2">
            <p className="text-xs font-medium mb-1.5">Target Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = (form.categories || []).includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      const set = new Set(form.categories || []);
                      if (on) set.delete(c);
                      else set.add(c);
                      patch({ categories: [...set] });
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200'}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview strip */}
        <div className="rounded-xl border border-slate-200 p-4 bg-page">
          <p className="text-[10px] font-semibold uppercase text-slate-400 mb-1">Preview</p>
          <p className="font-bold">{form.name || 'Untitled'}</p>
          <p className="text-sm text-slate-500 mt-0.5">{form.description || form.offerText || '—'}</p>
          {form.cta ? (
            <span className="inline-flex mt-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5">{form.cta}</span>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
            Cancel
          </button>
          <button type="button" disabled={busy} onClick={() => submit(true)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
            Save Draft
          </button>
          <button type="button" disabled={busy} onClick={() => submit(false)} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold">
            {busy ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </div>
    </SellerOverlay>
  );
}
