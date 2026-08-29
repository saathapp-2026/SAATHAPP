import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon, Camera, Sparkles, Trash2, RotateCw } from 'lucide-react';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  DOC_CATEGORIES,
  WIZARD_STEPS,
  ALLOWED_MIME,
  MAX_FILE_MB,
  getDocType,
} from '../../../config/seller/documentConstants';
import {
  getWizardDraft,
  saveWizardDraft,
  clearWizardDraft,
  submitDocument,
  runMockOcr,
  runMockAiValidation,
} from '../../../services/seller/sellerDocumentsService';

const emptyDraft = (seed = {}) => ({
  step: 1,
  categoryId: seed.categoryId || 'kyc',
  typeId: seed.typeId || 'aadhaar',
  name: seed.name || '',
  description: seed.description || '',
  documentNumber: seed.documentNumber || '',
  issueDate: seed.issueDate || '',
  expiryDate: seed.expiryDate || '',
  issuingAuthority: seed.issuingAuthority || '',
  gstNumber: seed.gstNumber || '',
  panNumber: seed.panNumber || '',
  aadhaarNumber: seed.aadhaarNumber || '',
  bankAccount: seed.bankAccount || '',
  fileName: seed.fileName || '',
  fileType: seed.fileType || '',
  fileSize: seed.fileSize || 0,
  previewUrl: seed.previewUrl || null,
  replaceId: seed.replaceId || null,
  rotation: 0,
});

export default function UploadDocumentWizard({
  open,
  onClose,
  onSubmitted,
  editItem = null,
  replaceItem = null,
}) {
  const [draft, setDraft] = useState(() => emptyDraft());
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [ocrHint, setOcrHint] = useState(null);
  const [aiHint, setAiHint] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (replaceItem) {
      setDraft(
        emptyDraft({
          ...replaceItem,
          replaceId: replaceItem.id,
          name: replaceItem.name,
          step: 2,
        })
      );
      return;
    }
    if (editItem) {
      setDraft(emptyDraft({ ...editItem, step: 1 }));
      return;
    }
    const saved = getWizardDraft();
    setDraft(emptyDraft(saved || {}));
  }, [open, editItem, replaceItem]);

  const patch = useCallback((p) => {
    setDraft((d) => {
      const next = { ...d, ...p };
      saveWizardDraft(next);
      return next;
    });
  }, []);

  const types = useMemo(() => {
    const cat = DOC_CATEGORIES.find((c) => c.id === draft.categoryId);
    return cat?.types || [];
  }, [draft.categoryId]);

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!draft.categoryId) e.categoryId = 'Select category';
      if (!draft.typeId) e.typeId = 'Select document type';
      if (!draft.name?.trim()) e.name = 'Enter a document name';
    }
    if (step === 2) {
      if (!draft.fileName && !draft.replaceId) e.file = 'Upload a file';
      if (draft.fileSize > MAX_FILE_MB * 1024 * 1024) e.file = `Max ${MAX_FILE_MB}MB`;
    }
    if (step === 3) {
      if (!draft.documentNumber?.trim()) e.documentNumber = 'Document number required';
      if (draft.expiryDate && draft.issueDate && draft.expiryDate < draft.issueDate) {
        e.expiryDate = 'Expiry must be after issue date';
      }
      if (draft.typeId === 'pan' && draft.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(draft.panNumber)) {
        e.panNumber = 'Invalid PAN format';
      }
      if (draft.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i.test(draft.gstNumber)) {
        e.gstNumber = 'Invalid GSTIN format';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const acceptFile = async (file) => {
    if (!file) return;
    if (!ALLOWED_MIME.includes(file.type) && !/\.(pdf|jpe?g|png|webp|docx|xlsx)$/i.test(file.name)) {
      setErrors({ file: 'Unsupported file type' });
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors({ file: `Max ${MAX_FILE_MB}MB` });
      return;
    }
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    patch({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      previewUrl,
      rotation: 0,
    });
    setErrors({});
    const ocr = await runMockOcr({ fileName: file.name });
    setOcrHint(ocr.data);
    if (ocr.data.panNumber) patch({ panNumber: ocr.data.panNumber, documentNumber: ocr.data.panNumber });
    if (ocr.data.gstNumber) patch({ gstNumber: ocr.data.gstNumber, documentNumber: ocr.data.gstNumber });
    if (ocr.data.aadhaarNumber) patch({ aadhaarNumber: ocr.data.aadhaarNumber });
    if (ocr.data.expiryDate) patch({ expiryDate: ocr.data.expiryDate });
    const ai = await runMockAiValidation();
    setAiHint(ai.data);
  };

  const continueStep = () => {
    if (!validateStep(draft.step)) return;
    if (draft.step === 1 && !draft.name) {
      const t = getDocType(draft.typeId);
      patch({ name: t.label, step: 2 });
      return;
    }
    patch({ step: Math.min(5, draft.step + 1) });
  };

  const saveDraft = async () => {
    setBusy(true);
    try {
      await submitDocument(draft, { asDraft: true });
      onSubmitted?.({ draft: true });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    if (!validateStep(3) || !validateStep(2)) {
      patch({ step: !draft.fileName ? 2 : 3 });
      return;
    }
    setBusy(true);
    try {
      await submitDocument(draft, { asDraft: false });
      clearWizardDraft();
      onSubmitted?.({ draft: false });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const requestClose = () => {
    saveWizardDraft(draft);
    onClose();
  };

  return (
    <SellerOverlay
      open={open}
      onClose={requestClose}
      labelledBy="doc-wizard-title"
      zIndex={SELLER_Z.modal}
      className="flex items-end sm:items-center justify-center p-0 sm:p-4"
      contentClassName="w-full max-w-3xl"
    >
      <div className="max-h-[94vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 backdrop-blur px-5 py-4">
          <div>
            <h2 id="doc-wizard-title" className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {replaceItem ? 'Replace Document' : editItem ? 'Edit Document' : 'Upload Document'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Step {draft.step}/5 · Draft auto-saves
            </p>
          </div>
          <button type="button" onClick={requestClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-lg hover:bg-page" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <ol className="flex gap-1 mb-5" aria-label="Wizard progress">
            {WIZARD_STEPS.map((s) => (
              <li key={s.id} className="min-w-0 flex-1">
                <div className={`h-1.5 rounded-full ${draft.step >= s.id ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <p className={`mt-1 text-[10px] font-medium truncate ${draft.step === s.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {draft.step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-medium">
                Document Category *
                <select
                  value={draft.categoryId}
                  onChange={(e) => {
                    const cat = DOC_CATEGORIES.find((c) => c.id === e.target.value);
                    patch({ categoryId: e.target.value, typeId: cat?.types?.[0]?.id || 'custom' });
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  {DOC_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.categoryId ? <span className="text-red-500 text-[11px]">{errors.categoryId}</span> : null}
              </label>
              <label className="block text-xs font-medium">
                Document Type *
                <select
                  value={draft.typeId}
                  onChange={(e) => {
                    const t = getDocType(e.target.value);
                    patch({ typeId: e.target.value, name: draft.name || t.label });
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-medium sm:col-span-2">
                Custom Name *
                <input
                  value={draft.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  placeholder="e.g. Aadhaar Card — Primary"
                />
                {errors.name ? <span className="text-red-500 text-[11px]">{errors.name}</span> : null}
              </label>
              <label className="block text-xs font-medium sm:col-span-2">
                Description
                <textarea
                  value={draft.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  placeholder="Optional notes for compliance review"
                />
              </label>
            </div>
          )}

          {draft.step === 2 && (
            <div className="space-y-3">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  acceptFile(e.dataTransfer.files?.[0]);
                }}
                className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                  dragOver
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                    : 'border-slate-300 bg-page dark:bg-slate-950'
                }`}
              >
                <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Drag & drop file here</p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG, JPEG, WEBP · DOCX/XLSX optional · Max {MAX_FILE_MB}MB</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
                  >
                    Browse Files
                  </button>
                  <button
                    type="button"
                    disabled
                    title="Camera capture — coming soon"
                    className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
                  >
                    <Camera size={14} /> Camera
                  </button>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.xlsx,image/*,application/pdf"
                  className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
                  onChange={(e) => acceptFile(e.target.files?.[0])}
                />
              </div>
              {errors.file ? <p className="text-red-500 text-xs">{errors.file}</p> : null}
              {draft.fileName ? (
                <div className="rounded-xl border border-slate-200 p-3 flex items-start gap-3">
                  {draft.previewUrl ? (
                    <img
                      src={draft.previewUrl}
                      alt=""
                      className="h-20 w-20 object-cover rounded-lg"
                      style={{ transform: `rotate(${draft.rotation}deg)` }}
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-lg bg-page flex items-center justify-center">
                      <ImageIcon className="text-slate-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{draft.fileName}</p>
                    <p className="text-xs text-slate-500">{(draft.fileSize / 1024).toFixed(0)} KB</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" onClick={() => patch({ rotation: draft.rotation + 90 })} className="text-xs inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600">
                        <RotateCw size={12} /> Rotate
                      </button>
                      <button type="button" onClick={() => inputRef.current?.click()} className="text-xs text-slate-600 hover:text-emerald-600">
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => patch({ fileName: '', fileType: '', fileSize: 0, previewUrl: null })}
                        className="text-xs inline-flex items-center gap-1 text-red-600"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                      <span className="text-xs text-slate-400 inline-flex items-center gap-1" title="Coming soon">
                        <Sparkles size={12} /> AI enhance (soon)
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
              {ocrHint ? (
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  OCR ready: fields auto-suggested (mock · confidence {Math.round((ocrHint.confidence || 0) * 100)}%)
                </p>
              ) : null}
              {aiHint ? (
                <p className="text-xs text-slate-500">
                  AI checks: blur OK · crop OK · duplicate OK · fake risk {aiHint.fake?.risk} (mock)
                </p>
              ) : null}
            </div>
          )}

          {draft.step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['documentNumber', 'Document Number *', 'text'],
                ['issueDate', 'Issue Date', 'date'],
                ['expiryDate', 'Expiry Date', 'date'],
                ['issuingAuthority', 'Issuing Authority', 'text'],
                ['gstNumber', 'GST Number', 'text'],
                ['panNumber', 'PAN Number', 'text'],
                ['aadhaarNumber', 'Aadhaar Number', 'text'],
                ['bankAccount', 'Bank Account', 'text'],
              ].map(([key, label, type]) => (
                <label key={key} className="block text-xs font-medium">
                  {label}
                  <input
                    type={type}
                    value={draft[key] || ''}
                    onChange={(e) => patch({ [key]: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  />
                  {errors[key] ? <span className="text-red-500 text-[11px]">{errors[key]}</span> : null}
                </label>
              ))}
            </div>
          )}

          {draft.step === 4 && (
            <div className="space-y-3 text-sm">
              <div className="rounded-xl border border-slate-200 p-4 space-y-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{draft.name}</p>
                <p className="text-slate-500">
                  {getDocType(draft.typeId).categoryLabel} · {getDocType(draft.typeId).label}
                </p>
                <p>File: {draft.fileName || '—'}</p>
                <p>Number: {draft.documentNumber || '—'}</p>
                <p>Expiry: {draft.expiryDate || 'No expiry'}</p>
              </div>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Required fields complete', Boolean(draft.name && draft.documentNumber)],
                  ['Valid document file', Boolean(draft.fileName)],
                  ['Expiry checked', true],
                ].map(([label, ok]) => (
                  <li key={label} className={ok ? 'text-emerald-600' : 'text-amber-600'}>
                    {ok ? '✓' : '○'} {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {draft.step === 5 && (
            <div className="rounded-xl border border-slate-200 p-4 space-y-3 text-sm">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Submit for verification</p>
              <ol className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>1. Submit</li>
                <li>2. Verification Pending</li>
                <li>3. Admin Review</li>
                <li>4. Approved / Rejected</li>
              </ol>
              <p className="text-xs text-slate-500">You will be notified when status changes.</p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={requestClose}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={saveDraft}
                className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
              >
                Save Draft
              </button>
              {draft.step > 1 ? (
                <button
                  type="button"
                  onClick={() => patch({ step: draft.step - 1 })}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
                >
                  Back
                </button>
              ) : null}
              {draft.step < 5 ? (
                <button
                  type="button"
                  onClick={continueStep}
                  className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={submit}
                  className="transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60"
                >
                  {busy ? 'Submitting…' : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </SellerOverlay>
  );
}
