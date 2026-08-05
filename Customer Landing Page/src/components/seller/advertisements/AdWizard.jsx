import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  WIZARD_STEPS,
  OBJECTIVES,
  CAMPAIGN_TYPES,
  PLACEMENTS,
  LANDING_PAGES,
  AUDIENCE_BUSINESS,
  COVERAGE_LEVELS,
  BUDGET_PLANS_DAILY,
  BUDGET_PLANS_MONTHLY,
  PAYMENT_METHODS,
  SCHEDULE_DURATIONS,
  CATEGORIES,
  getAdType,
  formatINR,
} from '../../../config/seller/adConstants';
import {
  emptyAdDraft,
  loadAdDraft,
  saveAdDraft,
  clearAdDraft,
  saveAd,
  getAdProducts,
  getAiAdSuggestion,
  estimateReach,
} from '../../../services/seller/sellerAdvertisementsService';

const CTA_OPTIONS = ['Shop Now', 'Buy Now', 'Visit Store', 'Order Now', 'Book Service', 'Learn More', 'Contact Seller', 'Call Now'];
const DEVICE_PREVIEWS = ['desktop', 'tablet', 'mobile'];
const PREVIEW_PAGES = ['homepage', 'search', 'store', 'category'];

export default function AdWizard({ open, onClose, onSaved, initialTypeId, editItem }) {
  const [draft, setDraft] = useState(() => emptyAdDraft(initialTypeId || 'banner'));
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [previewPage, setPreviewPage] = useState('homepage');
  const autosaveRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (editItem) {
      setDraft({
        ...emptyAdDraft(editItem.typeId),
        ...editItem,
        shortDescription: editItem.description || '',
        placements: editItem.placement ? [editItem.placement] : ['homepage_banner'],
        step: 1,
      });
    } else {
      const base = loadAdDraft();
      if (initialTypeId) {
        base.typeId = initialTypeId;
        base.campaignType = initialTypeId;
      }
      setDraft(base);
    }
    setDirty(false);
  }, [open, initialTypeId, editItem]);

  useEffect(() => {
    if (!open) return undefined;
    getAdProducts(productSearch).then((res) => setProducts(res.data || []));
  }, [open, productSearch]);

  // autosave every 30s
  useEffect(() => {
    if (!open || editItem) return undefined;
    autosaveRef.current = setInterval(() => {
      saveAdDraft(draft);
    }, 30000);
    return () => clearInterval(autosaveRef.current);
  }, [open, draft, editItem]);

  useEffect(() => {
    if (!open || !dirty || editItem) return;
    saveAdDraft(draft);
  }, [draft, dirty, open, editItem]);

  const type = useMemo(() => getAdType(draft.campaignType || draft.typeId), [draft.campaignType, draft.typeId]);
  const estimate = useMemo(() => estimateReach(draft.dailyBudget), [draft.dailyBudget]);
  const billingSummary = useMemo(() => {
    const totalBudget = Number(draft.totalBudget) || 0;
    const platformFee = Math.round(totalBudget * (Number(draft.platformFeePercent) || 0) / 100);
    const discount = Number(draft.couponDiscount) || 0;
    const taxable = Math.max(0, totalBudget + platformFee - discount);
    const tax = Math.round(taxable * (Number(draft.gstPercent) || 0) / 100);
    return {
      totalBudget,
      platformFee,
      discount,
      tax,
      finalAmount: taxable + tax,
    };
  }, [draft.totalBudget, draft.platformFeePercent, draft.couponDiscount, draft.gstPercent]);

  const patch = (partial) => {
    setDraft((d) => ({ ...d, ...partial }));
    setDirty(true);
  };

  const canNext = () => {
    if (draft.step === 1) return !!draft.name?.trim() && !!draft.objective;
    if (draft.step === 2) return !!draft.campaignType;
    if (draft.step === 3) {
      if (draft.campaignType === 'video') return !!draft.videoFile;
      if (
        ['image', 'brand_banner', 'product_card', 'store_card', 'carousel', 'popup', 'splash_screen', 'notification_banner'].includes(
          draft.campaignType
        )
      ) {
        return !!draft.desktopBanner || !!draft.mobileBanner || !!draft.posterFile || !!draft.thumbnail || !!draft.videoFile;
      }
      return true;
    }
    if (draft.step === 4) return !!draft.headline?.trim() && !!draft.cta;
    if (draft.step === 5) {
      if (draft.productMode === 'store') return true;
      if (draft.productMode === 'category') return !!draft.category;
      return (draft.products || []).length > 0;
    }
    if (draft.step === 6) {
      if (!draft.landingPage) return false;
      if (['custom_url', 'external_website'].includes(draft.landingPage)) return !!draft.destinationUrl?.trim();
      if (draft.landingPage === 'whatsapp') return !!draft.whatsappNumber?.trim();
      if (draft.landingPage === 'phone_call') return !!draft.phoneNumber?.trim();
      return true;
    }
    if (draft.step === 7) {
      return !!draft.state || !!draft.city || !!draft.pincode || (draft.interests || []).length > 0 || (draft.customerTypes || []).length > 0;
    }
    if (draft.step === 8) return (draft.placements || []).length > 0;
    if (draft.step === 9) return !!draft.coverageLevel;
    if (draft.step === 10) return !!draft.startAt && !!draft.endAt;
    if (draft.step === 11) return Number(draft.dailyBudget) > 0 && Number(draft.totalBudget) > 0;
    if (draft.step === 13) return !!draft.paymentMethod && !!draft.invoiceType;
    return true;
  };

  const requestClose = () => {
    if (dirty && !window.confirm('You have unsaved changes. Leave without submitting?')) return;
    onClose?.();
  };

  const suggest = async (kind, apply) => {
    try {
      const res = await getAiAdSuggestion(kind);
      const first = res.data?.[0];
      if (first) patch(apply(first));
      toast.success('AI suggestion applied');
    } catch {
      toast.error('AI suggestion failed');
    }
  };

  const publish = async ({ asDraft = false, submit = false } = {}) => {
    if (!asDraft && !canNext()) {
      toast.error('Complete required fields');
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...draft,
        placement: draft.placements?.[0] || draft.placement,
        description: draft.shortDescription || draft.description,
        finalAmount: billingSummary.finalAmount,
      };
      const res = await saveAd(payload, { asDraft, submit });
      if (res.success) {
        toast.success(asDraft ? 'Draft saved' : submit ? 'Submitted for review' : 'Advertisement saved');
        if (!asDraft) {
          clearAdDraft();
          setDirty(false);
        }
        onSaved?.(res.data);
        if (!asDraft) onClose?.();
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setBusy(false);
    }
  };

  const toggleProduct = (id) => {
    const set = new Set(draft.products || []);
    if (set.has(id)) set.delete(id);
    else {
      if (draft.productMode === 'single') {
        patch({ products: [id] });
        return;
      }
      set.add(id);
    }
    patch({ products: [...set] });
  };

  return (
    <SellerOverlay open={open} onClose={requestClose} labelledBy="ad-wizard-title" zIndex={SELLER_Z.modal} className="flex items-end sm:items-center justify-center p-0 sm:p-4" contentClassName="w-full max-w-4xl">
      <div className="max-h-[94vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-5 py-4">
          <div>
            <h2 id="ad-wizard-title" className="text-lg font-bold">{editItem ? 'Edit Advertisement' : 'Create Advertisement'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{type.label} · Step {draft.step}/14 · Draft auto-saves</p>
          </div>
          <button type="button" onClick={requestClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="px-5 pt-4">
          <ol className="flex gap-1 mb-5 overflow-x-auto" aria-label="Wizard progress">
            {WIZARD_STEPS.map((s) => (
              <li key={s.id} className="min-w-[64px] flex-1">
                <div className={`h-1.5 rounded-full ${draft.step >= s.id ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <p className={`mt-1 text-[9px] font-medium truncate ${draft.step === s.id ? 'text-emerald-600' : 'text-slate-400'}`}>{s.label}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {draft.step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium sm:col-span-2">Campaign Name *
                <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="Store Banner — Homepage" />
              </label>
              <label className="block text-xs font-medium">Objective *
                <select value={draft.objective} onChange={(e) => patch({ objective: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  {OBJECTIVES.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
              </label>
              <label className="block text-xs font-medium">Priority
                <input type="number" min={1} max={10} value={draft.priority} onChange={(e) => patch({ priority: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium sm:col-span-2">Campaign Description
                <textarea value={draft.description} onChange={(e) => patch({ description: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
            </div>
          )}

          {draft.step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Choose a campaign format that matches your promotion and creative assets.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CAMPAIGN_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => patch({ campaignType: t.id })}
                    className={`rounded-2xl border p-4 text-left transition ${draft.campaignType === t.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <p className="text-sm font-semibold">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {draft.step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Upload the creative assets that will run for this campaign.</p>
              {['image', 'brand_banner', 'product_card', 'store_card', 'carousel', 'popup', 'splash_screen', 'notification_banner'].includes(draft.campaignType) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block text-xs font-medium">Desktop Creative
                    <input type="file" accept="image/*" onChange={(e) => patch({ desktopBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                    {draft.desktopBanner ? <p className="mt-1 text-[11px] text-slate-500">{draft.desktopBanner}</p> : null}
                  </label>
                  <label className="block text-xs font-medium">Mobile Creative
                    <input type="file" accept="image/*" onChange={(e) => patch({ mobileBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                    {draft.mobileBanner ? <p className="mt-1 text-[11px] text-slate-500">{draft.mobileBanner}</p> : null}
                  </label>
                  <label className="block text-xs font-medium">Tablet Creative
                    <input type="file" accept="image/*" onChange={(e) => patch({ tabletBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                </div>
              )}
              {draft.campaignType === 'video' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block text-xs font-medium">Video File
                    <input type="file" accept="video/mp4" onChange={(e) => patch({ videoFile: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                    {draft.videoFile ? <p className="mt-1 text-[11px] text-slate-500">{draft.videoFile}</p> : null}
                  </label>
                  <label className="block text-xs font-medium">Video Thumbnail
                    <input type="file" accept="image/*" onChange={(e) => patch({ thumbnail: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                    {draft.thumbnail ? <p className="mt-1 text-[11px] text-slate-500">{draft.thumbnail}</p> : null}
                  </label>
                </div>
              )}
              {draft.campaignType === 'poster' && (
                <label className="block text-xs font-medium">Poster File
                  <input type="file" accept="image/*" onChange={(e) => patch({ posterFile: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  {draft.posterFile ? <p className="mt-1 text-[11px] text-slate-500">{draft.posterFile}</p> : null}
                </label>
              )}
              {draft.campaignType === 'gif' && (
                <label className="block text-xs font-medium">GIF File
                  <input type="file" accept="image/gif" onChange={(e) => patch({ desktopBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  {draft.desktopBanner ? <p className="mt-1 text-[11px] text-slate-500">{draft.desktopBanner}</p> : null}
                </label>
              )}
            </div>
          )}

          {draft.step === 5 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {[
                  ['single', 'Single Product'],
                  ['multiple', 'Multiple Products'],
                  ['category', 'Entire Category'],
                  ['store', 'Entire Store'],
                ].map(([id, label]) => (
                  <button key={id} type="button" onClick={() => patch({ productMode: id, products: id === 'store' ? [] : draft.products })} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${draft.productMode === id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}>{label}</button>
                ))}
              </div>
              {draft.productMode === 'category' ? (
                <select value={draft.category} onChange={(e) => patch({ category: e.target.value })} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : draft.productMode !== 'store' ? (
                <>
                  <label className="relative block">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search products…" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent pl-9 pr-3 py-2 text-sm" />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {products.map((p) => {
                      const on = (draft.products || []).includes(p.id);
                      return (
                        <button key={p.id} type="button" onClick={() => toggleProduct(p.id)} className={`text-left rounded-xl border p-3 ${on ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700'}`}>
                          <p className="text-sm font-semibold">{p.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{p.sku} · Stock {p.stock} · ★ {p.rating}</p>
                          <p className="text-xs font-semibold mt-1">{formatINR(p.price)} <span className="text-emerald-600">-{p.discount}%</span></p>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4">Entire store will be promoted.</p>
              )}
            </div>
          )}

          {draft.step === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium sm:col-span-2">Headline
                <div className="mt-1 flex gap-2">
                  <input value={draft.headline} onChange={(e) => patch({ headline: e.target.value })} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="Fresh Mangoes" />
                  <button type="button" onClick={() => suggest('headline', (v) => ({ headline: v }))} className="rounded-xl border px-3 text-xs font-semibold inline-flex items-center gap-1"><Sparkles size={13} /> AI</button>
                </div>
              </label>
              <label className="block text-xs font-medium sm:col-span-2">Short Description
                <div className="mt-1 flex gap-2">
                  <textarea value={draft.shortDescription} onChange={(e) => patch({ shortDescription: e.target.value })} rows={2} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
                  <button type="button" onClick={() => suggest('copy', (v) => ({ shortDescription: v }))} className="self-start rounded-xl border px-3 py-2 text-xs font-semibold"><Sparkles size={13} /></button>
                </div>
              </label>
              {(type.id === 'offer' || type.id === 'text') && (
                <>
                  <label className="block text-xs font-medium">Offer Text
                    <input value={draft.offerText} onChange={(e) => patch({ offerText: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="20% OFF" />
                  </label>
                  <label className="block text-xs font-medium">Coupon
                    <input value={draft.coupon} onChange={(e) => patch({ coupon: e.target.value.toUpperCase() })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-mono" />
                  </label>
                </>
              )}
              <label className="block text-xs font-medium">CTA Button
                <div className="mt-1 flex gap-2">
                  <input value={draft.cta} onChange={(e) => patch({ cta: e.target.value })} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
                  <button type="button" onClick={() => suggest('cta', (v) => ({ cta: v }))} className="rounded-xl border px-3 text-xs font-semibold"><Sparkles size={13} /></button>
                </div>
              </label>
              <label className="block text-xs font-medium">Destination URL
                <input value={draft.destinationUrl} onChange={(e) => patch({ destinationUrl: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="/product/..." />
              </label>
              {(type.id === 'banner' || type.id === 'festival') && (
                <>
                  <label className="block text-xs font-medium">Desktop Banner
                    <input type="file" accept="image/*" onChange={(e) => patch({ desktopBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                    {draft.desktopBanner ? <p className="text-[11px] text-slate-500 mt-1">{draft.desktopBanner}</p> : null}
                  </label>
                  <label className="block text-xs font-medium">Mobile Banner
                    <input type="file" accept="image/*" onChange={(e) => patch({ mobileBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                  <label className="block text-xs font-medium sm:col-span-2">Tablet Banner
                    <input type="file" accept="image/*" onChange={(e) => patch({ tabletBanner: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                </>
              )}
              {type.id === 'poster' && (
                <>
                  <label className="block text-xs font-medium sm:col-span-2">Upload Poster
                    <input type="file" accept="image/*" onChange={(e) => patch({ posterFile: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-medium sm:col-span-2">
                    <input type="checkbox" checked={!!draft.qrEnabled} onChange={(e) => patch({ qrEnabled: e.target.checked })} /> Include QR Code
                  </label>
                </>
              )}
              {type.id === 'video' && (
                <>
                  <label className="block text-xs font-medium">Upload MP4
                    <input type="file" accept="video/mp4" onChange={(e) => patch({ videoFile: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                  <label className="block text-xs font-medium">Thumbnail
                    <input type="file" accept="image/*" onChange={(e) => patch({ thumbnail: e.target.files?.[0]?.name || '' })} className="mt-1 w-full text-sm" />
                  </label>
                </>
              )}
            </div>
          )}

          {draft.step === 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium sm:col-span-2">Landing Page *
                <select value={draft.landingPage} onChange={(e) => patch({ landingPage: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  {LANDING_PAGES.map((page) => (
                    <option key={page.id} value={page.id}>{page.label}</option>
                  ))}
                </select>
              </label>
              {['custom_url', 'external_website'].includes(draft.landingPage) && (
                <label className="block text-xs font-medium sm:col-span-2">Landing URL
                  <input value={draft.destinationUrl} onChange={(e) => patch({ destinationUrl: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="https://example.com" />
                </label>
              )}
              {draft.landingPage === 'whatsapp' && (
                <label className="block text-xs font-medium sm:col-span-2">WhatsApp Number
                  <input value={draft.whatsappNumber || ''} onChange={(e) => patch({ whatsappNumber: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="+91 90000 00000" />
                </label>
              )}
              {draft.landingPage === 'phone_call' && (
                <label className="block text-xs font-medium sm:col-span-2">Phone Number
                  <input value={draft.phoneNumber || ''} onChange={(e) => patch({ phoneNumber: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="+91 90000 00000" />
                </label>
              )}
            </div>
          )}

          {draft.step === 7 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">Country
                <input value={draft.country} onChange={(e) => patch({ country: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">State
                <input value={draft.state} onChange={(e) => patch({ state: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">City
                <input value={draft.city} onChange={(e) => patch({ city: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Pincode / Radius
                <div className="mt-1 flex gap-2">
                  <input value={draft.pincode} onChange={(e) => patch({ pincode: e.target.value })} placeholder="Pincode" className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
                  <input type="number" value={draft.radius} onChange={(e) => patch({ radius: e.target.value })} className="w-20 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-2 text-sm" title="km" />
                </div>
              </label>
              <label className="block text-xs font-medium">Age Min
                <input type="number" value={draft.ageMin} onChange={(e) => patch({ ageMin: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Age Max
                <input type="number" value={draft.ageMax} onChange={(e) => patch({ ageMax: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Gender
                <select value={draft.gender} onChange={(e) => patch({ gender: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium mb-1.5">Customer Type</p>
                <div className="flex flex-wrap gap-2">
                  {['new', 'repeat', 'vip', 'membership'].map((c) => {
                    const on = (draft.customerTypes || []).includes(c);
                    return (
                      <button key={c} type="button" onClick={() => {
                        const set = new Set(draft.customerTypes || []);
                        if (on) set.delete(c); else set.add(c);
                        patch({ customerTypes: [...set] });
                      }} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}>{c}</button>
                    );
                  })}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium">Interests</p>
                  <button type="button" onClick={() => suggest('audience', (v) => ({ city: v.includes('metro') ? 'Mumbai' : draft.city }))} className="text-[11px] font-semibold text-emerald-600 inline-flex items-center gap-1"><Sparkles size={11} /> Suggest audience</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const on = (draft.interests || []).includes(c);
                    return (
                      <button key={c} type="button" onClick={() => {
                        const set = new Set(draft.interests || []);
                        if (on) set.delete(c); else set.add(c);
                        patch({ interests: [...set] });
                      }} className={`rounded-full px-3 py-1 text-xs font-semibold border ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}>{c}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {draft.step === 8 && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button type="button" onClick={() => suggest('placements', () => ({ placements: ['homepage_banner', 'search'] }))} className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1"><Sparkles size={12} /> Suggest placements</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                {PLACEMENTS.map((p) => {
                  const on = (draft.placements || []).includes(p.id);
                  return (
                    <button key={p.id} type="button" onClick={() => {
                      const set = new Set(draft.placements || []);
                      if (on) set.delete(p.id); else set.add(p.id);
                      patch({ placements: [...set], placement: [...set][0] || '' });
                    }} className={`rounded-xl border px-3 py-2.5 text-left text-sm ${on ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700'}`}>{p.label}</button>
                  );
                })}
              </div>
            </div>
          )}

          {draft.step === 9 && (
            <div className="space-y-4">
              <label className="block text-xs font-medium">Coverage Level
                <select value={draft.coverageLevel} onChange={(e) => patch({ coverageLevel: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  {COVERAGE_LEVELS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </label>
              <label className="block text-xs font-medium">Coverage Areas
                <input value={(draft.coverageAreas || []).join(', ')} onChange={(e) => patch({ coverageAreas: e.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" placeholder="Mumbai, Pune, Thane" />
                <p className="text-[11px] text-slate-500 mt-1">Add specific regions to refine your coverage.</p>
              </label>
              {draft.coverageLevel === 'india' && <p className="text-sm text-slate-500">Nationwide coverage selected. No location details required.</p>}
            </div>
          )}

          {draft.step === 11 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">Daily Budget
                <div className="mt-1 flex gap-2">
                  <input type="number" value={draft.dailyBudget} onChange={(e) => patch({ dailyBudget: e.target.value })} className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
                  <button type="button" onClick={() => suggest('budget', (v) => ({ dailyBudget: parseInt(String(v).replace(/[^\d]/g, ''), 10) || 1000 }))} className="rounded-xl border px-3 text-xs font-semibold"><Sparkles size={13} /></button>
                </div>
              </label>
              <label className="block text-xs font-medium">Total Budget
                <input type="number" value={draft.totalBudget} onChange={(e) => patch({ totalBudget: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Weekly Budget
                <input type="number" value={draft.weeklyBudget} onChange={(e) => patch({ weeklyBudget: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Monthly Budget
                <input type="number" value={draft.monthlyBudget} onChange={(e) => patch({ monthlyBudget: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Bid Strategy
                <select value={draft.bidStrategy} onChange={(e) => patch({ bidStrategy: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="auto">Auto</option>
                  <option value="manual">Manual</option>
                </select>
              </label>
              <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ['Est. Reach', estimate.reach],
                  ['Est. Clicks', estimate.clicks],
                  ['Est. CPC', formatINR(estimate.cpc)],
                  ['Est. Conv.', estimate.conversions],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                    <p className="text-[10px] text-slate-500">{k}</p>
                    <p className="text-sm font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {draft.step === 13 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">Payment Method *
                <select value={draft.paymentMethod} onChange={(e) => patch({ paymentMethod: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  {PAYMENT_METHODS.map((method) => <option key={method.id} value={method.id}>{method.label}</option>)}
                </select>
              </label>
              <label className="block text-xs font-medium">Invoice Type *
                <select value={draft.invoiceType} onChange={(e) => patch({ invoiceType: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="gst_invoice">GST Invoice</option>
                  <option value="proforma_invoice">Proforma Invoice</option>
                  <option value="corporate_invoice">Corporate Invoice</option>
                </select>
              </label>
              <label className="block text-xs font-medium">Discount (₹)
                <input type="number" value={draft.couponDiscount} onChange={(e) => patch({ couponDiscount: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Platform Fee (%)
                <input type="number" min={0} value={draft.platformFeePercent} onChange={(e) => patch({ platformFeePercent: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Tax (%)
                <input type="number" min={0} value={draft.gstPercent} onChange={(e) => patch({ gstPercent: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    <p className="text-[11px] uppercase text-slate-400">Total Budget</p>
                    <p className="font-semibold">{formatINR(billingSummary.totalBudget)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-slate-400">Platform Fee</p>
                    <p className="font-semibold">{formatINR(billingSummary.platformFee)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-slate-400">Discount</p>
                    <p className="font-semibold">-{formatINR(billingSummary.discount)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-slate-400">Tax</p>
                    <p className="font-semibold">{formatINR(billingSummary.tax)}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] uppercase text-slate-400">Final Amount</p>
                  <p className="text-lg font-bold">{formatINR(billingSummary.finalAmount)}</p>
                </div>
              </div>
            </div>
          )}

          {draft.step === 10 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">Start Date
                <input type="date" value={String(draft.startAt).slice(0, 10)} onChange={(e) => patch({ startAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Start Time
                <input type="time" value={draft.startTime} onChange={(e) => patch({ startTime: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">End Date
                <input type="date" value={String(draft.endAt).slice(0, 10)} onChange={(e) => patch({ endAt: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">End Time
                <input type="time" value={draft.endTime} onChange={(e) => patch({ endTime: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
              </label>
              <label className="block text-xs font-medium">Recurring
                <select value={draft.recurring} onChange={(e) => patch({ recurring: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
              <label className="block text-xs font-medium">Timezone
                <select value={draft.timezone} onChange={(e) => patch({ timezone: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                </select>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium sm:col-span-2">
                <input type="checkbox" checked={!!draft.abVariant} onChange={(e) => patch({ abVariant: e.target.checked })} />
                Enable A/B testing variant (architecture ready)
              </label>
            </div>
          )}

          {draft.step === 12 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {['desktop', 'tablet', 'mobile'].map((d) => (
                  <button key={d} type="button" onClick={() => setPreviewDevice(d)} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${previewDevice === d ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}>{d}</button>
                ))}
                {['homepage', 'category', 'product', 'search'].map((p) => (
                  <button key={p} type="button" onClick={() => setPreviewPage(p)} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${previewPage === p ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 dark:border-slate-700'}`}>{p}</button>
                ))}
              </div>
              <div className={`mx-auto rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 p-5 ${previewDevice === 'mobile' ? 'max-w-[280px]' : previewDevice === 'tablet' ? 'max-w-md' : 'max-w-full'}`}>
                <p className="text-[10px] font-semibold uppercase text-emerald-600 mb-1">Preview · {previewPage}</p>
                <p className="text-lg font-bold">{draft.headline || draft.name || 'Untitled Ad'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{draft.shortDescription || draft.description || '—'}</p>
                {draft.offerText ? <p className="text-emerald-700 font-bold mt-2">{draft.offerText}</p> : null}
                <span className="inline-flex mt-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5">{draft.cta || 'Shop Now'}</span>
                <p className="text-[11px] text-slate-500 mt-3">Budget {formatINR(draft.dailyBudget)}/day · {draft.startAt} → {draft.endAt}</p>
                <p className="text-[11px] text-slate-400 mt-1">Workflow: Submit → Admin Review → Approved → Live</p>
              </div>
            </div>
          )}

          {draft.step === 14 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Objective', OBJECTIVES.find((o) => o.id === draft.objective)?.label || draft.objective],
                  ['Campaign Type', CAMPAIGN_TYPES.find((t) => t.id === draft.campaignType)?.label || draft.campaignType],
                  ['Landing', LANDING_PAGES.find((p) => p.id === draft.landingPage)?.label || draft.landingPage],
                  ['Placement', draft.placement || (draft.placements || [])[0] || '—'],
                  ['Schedule', `${draft.startAt} ${draft.startTime} → ${draft.endAt} ${draft.endTime}`],
                  ['Budget', formatINR(draft.totalBudget)],
                  ['Payment', PAYMENT_METHODS.find((m) => m.id === draft.paymentMethod)?.label || draft.paymentMethod],
                  ['Invoice', draft.invoiceType?.replace(/_/g, ' ')],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
                    <p className="text-[10px] uppercase text-slate-400">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-700 dark:text-slate-100">Review before submission</p>
                <p className="mt-2">Ensure the campaign objective, audience, placement, budget, and payment details are correct before sending the campaign for approval.</p>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-5 py-4">
          <button type="button" disabled={draft.step <= 1 || busy} onClick={() => patch({ step: draft.step - 1 })} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold disabled:opacity-40">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex gap-2">
            <button type="button" disabled={busy} onClick={() => publish({ asDraft: true })} className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold">Save Draft</button>
            {draft.step < 14 ? (
              <button type="button" disabled={!canNext() || busy} onClick={() => { if (!canNext()) { toast.error('Complete required fields'); return; } patch({ step: draft.step + 1 }); }} className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold disabled:opacity-40">
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button type="button" disabled={busy} onClick={() => publish({ submit: true })} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold">
                {busy ? 'Submitting…' : 'Submit for Review'}
              </button>
            )}
          </div>
        </div>
      </div>
    </SellerOverlay>
  );
}
