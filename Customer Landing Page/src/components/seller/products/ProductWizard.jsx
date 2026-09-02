import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../orders/ConfirmDialog';
import { X } from 'lucide-react';
import StepProgress from './StepProgress';
import ProductBasicInfo from './ProductBasicInfo';
import ProductMediaUpload from './ProductMediaUpload';
import ProductDescription from './ProductDescription';
import ProductPricing from './ProductPricing';
import ProductInventory from './ProductInventory';
import ProductVariants from './ProductVariants';
import ProductDelivery from './ProductDelivery';
import ProductPreview from './ProductPreview';
import ProductSummarySidebar from './ProductSummarySidebar';
import {
  emptyProductDraft,
  WIZARD_STEPS,
} from '../../../config/seller/productConstants';
import {
  validateProductStep,
  saveProductDraftLocal,
  loadProductDraft,
  saveProduct,
  autoGenerateSku,
  suggestCategory,
  aiDescriptionTools,
} from '../../../services/seller/sellerProductsService';

/**
 * In-flow wizard — lives inside DashboardLayout main content.
 * Never uses fixed full-viewport overlay (avoids sidebar collision).
 */
export default function ProductWizard({ initialDraft, onClose, onSaved }) {
  const [draft, setDraft] = useState(() => initialDraft || loadProductDraft() || emptyProductDraft());
  const [step, setStep] = useState(() => {
    const completed = (initialDraft || loadProductDraft())?.completedSteps || [];
    if (!completed.length) return 1;
    return Math.min(8, Math.max(...completed) + 1);
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [aiLoading, setAiLoading] = useState(null);
  const [suggesting, setSuggesting] = useState(false);
  const draftRef = useRef(draft);
  const scrollRef = useRef(null);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setErrors({});
  }, [step]);

  const updateDraft = useCallback((patch) => {
    setDraft((prev) => {
      let next;
      if (typeof patch === 'function') {
        next = { ...patch(prev), updatedAt: Date.now() };
      } else {
        next = { ...prev, ...patch, updatedAt: Date.now() };
        // Nested media: allow function updater OR plain object
        if (patch && typeof patch.media === 'function') {
          next.media = patch.media(prev.media);
        }
      }
      draftRef.current = next;
      return next;
    });
    setDirty(true);
  }, []);

  const [mediaUploading, setMediaUploading] = useState(false);

  const handleMediaChange = useCallback((nextMedia) => {
    const media = { ...(nextMedia || {}) };
    delete media.mainImageReady;
    updateDraft({ media });
    const url = media?.mainImage?.url;
    if (
      url &&
      typeof url === 'string' &&
      (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http'))
    ) {
      setErrors((prev) => {
        if (!prev.mainImage) return prev;
        const next = { ...prev };
        delete next.mainImage;
        return next;
      });
    }
  }, [updateDraft]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!dirty) return;
      saveProductDraftLocal(draftRef.current);
      toast('Draft auto-saved', { icon: '💾', duration: 1500 });
      setDirty(false);
    }, 30000);
    return () => clearInterval(id);
  }, [dirty]);

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    if (step === 4 && draft.basic.taxSlab != null && draft.pricing.gstPct !== draft.basic.taxSlab) {
      updateDraft({ pricing: { ...draft.pricing, gstPct: draft.basic.taxSlab } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleClose = () => {
    if (dirty) {
      setConfirmCancel(true);
      return;
    }
    onClose?.();
  };

  const saveDraftNow = async () => {
    setSaving(true);
    try {
      saveProductDraftLocal(draft);
      const res = await saveProduct({ ...draft, status: 'draft' }, { publish: false });
      if (res.success) {
        setDraft(res.data);
        setDirty(false);
        toast.success('Draft saved');
        onSaved?.(res.data);
      }
    } finally {
      setSaving(false);
    }
  };

  const goNext = async () => {
    if (mediaUploading) {
      toast.error('Please wait for image upload to finish');
      return;
    }
    // Prefer live React state for media (ref can lag one tick behind uploads)
    const current = {
      ...draftRef.current,
      ...draft,
      media: draft.media || draftRef.current.media,
    };
    draftRef.current = current;
    const stepErrors = validateProductStep(current, step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      toast.error(
        step === 2
          ? 'Upload a main product image before continuing'
          : 'Please fix validation errors'
      );
      return;
    }
    const completed = Array.from(new Set([...(current.completedSteps || []), step]));
    const nextDraft = { ...current, completedSteps: completed };
    updateDraft({ completedSteps: completed });
    try {
      saveProductDraftLocal(nextDraft);
    } catch {
      // storage may be unavailable
    }
    if (step < 8) setStep(step + 1);
  };

  const goPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const publish = async () => {
    for (let s = 1; s <= 7; s += 1) {
      const e = validateProductStep(draft, s);
      if (Object.keys(e).length) {
        setStep(s);
        setErrors(e);
        toast.error(`Complete step ${s} before publishing`);
        return;
      }
    }
    setSaving(true);
    try {
      const res = await saveProduct(
        { ...draft, completedSteps: [1, 2, 3, 4, 5, 6, 7, 8] },
        { publish: true, submitReview: !!draft.approval?.required }
      );
      if (res.success) {
        toast.success(res.data.status === 'pending_review' ? 'Submitted for review' : 'Product published');
        setDirty(false);
        onSaved?.(res.data);
        onClose?.();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSku = async () => {
    const res = await autoGenerateSku(draft.basic.name);
    if (res.success) {
      updateDraft({ basic: { ...draft.basic, sku: res.data, skuManual: false } });
      toast.success('SKU generated') }
  };

  const handleSuggestCategory = async () => {
    setSuggesting(true);
    try {
      const res = await suggestCategory(draft.basic.name);
      if (res.success) {
        updateDraft({
          basic: {
            ...draft.basic,
            category: res.data.category,
            subCategory: res.data.subCategory,
            tags: res.data.tags,
          },
        });
        toast.success('Category suggested') }
    } finally {
      setSuggesting(false);
    }
  };

  const handleAi = async (action) => {
    setAiLoading(action);
    try {
      const res = await aiDescriptionTools(action, draft.description.long || draft.description.short, draft.basic.name);
      if (!res.success) return;
      if (action === 'generate') {
        updateDraft({ description: { ...draft.description, short: res.data.short, long: res.data.long } });
      } else if (action === 'seo') {
        updateDraft({ description: { ...draft.description, long: res.data.text, seoKeywords: res.data.keywords } });
      } else if (action === 'keywords') {
        updateDraft({ description: { ...draft.description, seoKeywords: (res.data.keywords || []).join(', ') } });
        toast.success('Keywords suggested') } else {
        updateDraft({ description: { ...draft.description, long: res.data.text } });
      }
      toast.success(`AI ${action} done`) } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col min-h-[calc(100vh-7.5rem)] overflow-x-hidden">
      {/* Header + stepper */}
      <div className="shrink-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 sm:p-6 mb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">Add Wholesale Product SKU</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage your wholesale product inventory and details.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-lg hover:bg-page shrink-0"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>
        <StepProgress
          currentStep={step}
          completedSteps={draft.completedSteps || []}
          onStepClick={(id) => setStep(id)}
        />
      </div>

      {/* Body */}
      <div ref={scrollRef} className="flex-1 min-w-0 overflow-x-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4 min-w-0">
          <div className="min-w-0 w-full space-y-4 overflow-x-hidden">
            {step === 1 && (
              <ProductBasicInfo
                value={draft.basic}
                errors={errors}
                onChange={(basic) => updateDraft({ basic })}
                onGenerateSku={handleGenerateSku}
                onSuggestCategory={handleSuggestCategory}
                suggesting={suggesting}
              />
            )}
            {step === 2 && (
              <ProductMediaUpload
                value={draft.media}
                errors={errors}
                onUploadingChange={setMediaUploading}
                onChange={handleMediaChange}
              />
            )}
            {step === 3 && (
              <ProductDescription
                value={draft.description}
                errors={errors}
                onChange={(description) => updateDraft({ description })}
                onAiAction={handleAi}
                aiLoading={aiLoading}
              />
            )}
            {step === 4 && (
              <ProductPricing
                value={draft.pricing}
                errors={errors}
                onChange={(pricing) => updateDraft({ pricing })}
              />
            )}
            {step === 5 && (
              <ProductInventory
                value={draft.inventory}
                errors={errors}
                sku={draft.basic.sku}
                onChange={(inventory) => updateDraft({ inventory })}
              />
            )}
            {step === 6 && (
              <ProductVariants
                value={draft.variants}
                errors={errors}
                baseSku={draft.basic.sku}
                onChange={(variants) => updateDraft({ variants })}
              />
            )}
            {step === 7 && (
              <ProductDelivery
                value={draft.delivery}
                errors={errors}
                onChange={(delivery) => updateDraft({ delivery })}
              />
            )}
            {step === 8 && (
              <ProductPreview
                draft={draft}
                onGoToImages={() => setStep(2)}
              />
            )}
          </div>

          <div className="hidden xl:block min-w-0">
            <ProductSummarySidebar draft={draft} errors={errors} />
          </div>
        </div>
      </div>

      {/* Sticky footer — stays inside content column, not under sidebar */}
      <div className="sticky bottom-0 z-20 mt-4 -mx-0">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface/95 backdrop-blur shadow-lg px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 hover:bg-page"
          >
            Cancel
          </button>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={saveDraftNow}
              className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 hover:bg-page disabled:opacity-50"
            >
              Save Draft
            </button>
            {step > 1 && (
              <button
                type="button"
                onClick={goPrev}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200"
              >
                Previous
              </button>
            )}
            {step < 8 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={mediaUploading}
                className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                {mediaUploading ? 'Uploading…' : 'Save & Continue'}
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={publish}
                className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                Publish Product
              </button>
            )}
          </div>
        </div>
        <p className="sr-only">{WIZARD_STEPS.find((s) => s.id === step)?.label}</p>
      </div>
      <ConfirmDialog
        open={confirmCancel}
        title="Discard changes?"
        message="Your unsaved changes will be lost."
        danger={true}
        confirmLabel="Discard Changes"
        cancelLabel="Keep Editing"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          onClose();
        }}
      />
    </div>
  );
}
