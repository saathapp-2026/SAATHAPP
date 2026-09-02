import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import ConfirmDialog from '../orders/ConfirmDialog';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  REPORT_TYPES,
  REPORT_FORMATS,
  DATE_PRESETS,
  CATEGORIES,
  WIZARD_STEPS,
  formatINR,
} from '../../../config/seller/reportConstants';
import {
  loadWizardDraft,
  saveWizardDraft,
  clearWizardDraft,
  generateReport,
  emptyWizardDraft,
} from '../../../services/seller/sellerReportsService';

const STATUS_OPTS = ['all', 'Active', 'Completed', 'Pending', 'Cancelled'];
const PAYMENT_OPTS = ['all', 'UPI', 'Card', 'COD', 'Wallet', 'Net Banking'];
const GST_OPTS = ['all', 'CGST+SGST', 'IGST', 'Exempt'];

export default function ReportWizard({ open, onClose, onGenerated, initialTypeId }) {
  const [draft, setDraft] = useState(() => loadWizardDraft());
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    if (!open) return;
    const base = loadWizardDraft();
    if (initialTypeId) base.typeId = initialTypeId;
    setDraft(base);
    setDirty(false);
  }, [open, initialTypeId]);

  useEffect(() => {
    if (!open || !dirty) return;
    saveWizardDraft(draft);
  }, [draft, dirty, open]);

  const type = useMemo(() => REPORT_TYPES.find((t) => t.id === draft.typeId) || REPORT_TYPES[0], [draft.typeId]);

  const patch = (partial) => {
    setDraft((d) => ({ ...d, ...partial }));
    setDirty(true);
  };

  const canNext = () => {
    if (draft.step === 1) return !!draft.typeId;
    if (draft.step === 2) return !!draft.dateFrom && !!draft.dateTo;
    if (draft.step === 3) return true;
    if (draft.step === 4) return true;
    if (draft.step === 5) return !!draft.format;
    return false;
  };

  const requestClose = () => {
    if (dirty) {
      setConfirmCancel(true);
      return;
    }
    onClose?.();
  };

  const applyPreset = (presetId) => {
    const now = new Date();
    let from = new Date(now);
    let to = new Date(now);
    if (presetId === 'yesterday') {
      from.setDate(now.getDate() - 1);
      to.setDate(now.getDate() - 1);
    } else if (presetId === 'last7') from.setDate(now.getDate() - 6);
    else if (presetId === 'last30') from.setDate(now.getDate() - 29);
    else if (presetId === 'this_month') from = new Date(now.getFullYear(), now.getMonth(), 1);
    else if (presetId === 'last_month') {
      from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      to = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (presetId === 'fy') {
      const fyStartMonth = now.getMonth() >= 3 ? 3 : -9;
      from = new Date(now.getFullYear(), fyStartMonth, 1);
    }
    patch({
      datePreset: presetId,
      dateFrom: from.toISOString().slice(0, 10),
      dateTo: to.toISOString().slice(0, 10),
    });
  };

  const handleGenerate = async () => {
    if (!canNext()) {
      toast.error('Complete required selections first');
      return;
    }
    setBusy(true);
    try {
      const res = await generateReport(draft);
      if (res.success) {
        toast.success(`${type.label} generated`);
        clearWizardDraft();
        setDirty(false);
        setDraft(emptyWizardDraft());
        onGenerated?.(res.data);
        onClose?.();
      } else toast.error('Generation failed');
    } catch {
      toast.error('Generation failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SellerOverlay
      open={open}
      onClose={requestClose}
      labelledBy="report-wizard-title"
      zIndex={SELLER_Z.modal}
      className="flex items-end sm:items-center justify-center p-0 sm:p-4"
      contentClassName="w-full max-w-3xl"
    >
      <div className="max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-surface/95 backdrop-blur px-5 py-4">
          <div>
            <h2 id="report-wizard-title" className="text-lg font-bold">
              Generate Report
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Step {draft.step} of 5 · Draft auto-saved
            </p>
          </div>
          <button type="button" onClick={requestClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-lg hover:bg-page" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <ol className="flex gap-1.5 mb-5" aria-label="Wizard progress">
            {WIZARD_STEPS.map((s) => (
              <li key={s.id} className="flex-1">
                <div
                  className={`h-1.5 rounded-full ${draft.step >= s.id ? 'bg-emerald-500' : 'bg-slate-200'}`}
                />
                <p className={`mt-1.5 text-[10px] font-medium truncate ${draft.step === s.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {draft.step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {REPORT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => patch({ typeId: t.id })}
                  className={`text-left rounded-xl border p-3 transition-all ${
                    draft.typeId === t.id
                      ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <p className="text-sm font-semibold">{t.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{t.description}</p>
                </button>
              ))}
            </div>
          )}

          {draft.step === 2 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {DATE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${
                      draft.datePreset === p.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  From
                  <input
                    type="date"
                    value={draft.dateFrom}
                    onChange={(e) => patch({ dateFrom: e.target.value, datePreset: 'custom' })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  To
                  <input
                    type="date"
                    value={draft.dateTo}
                    onChange={(e) => patch({ dateTo: e.target.value, datePreset: 'custom' })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>
          )}

          {draft.step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs font-medium">
                Category
                <select
                  value={draft.category}
                  onChange={(e) => patch({ category: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-medium">
                Status
                <select
                  value={draft.status}
                  onChange={(e) => patch({ status: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  {STATUS_OPTS.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Status' : s}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-medium">
                City
                <input
                  value={draft.city}
                  onChange={(e) => patch({ city: e.target.value })}
                  placeholder="Any city"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs font-medium">
                State
                <input
                  value={draft.state}
                  onChange={(e) => patch({ state: e.target.value })}
                  placeholder="Any state"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs font-medium">
                Payment Mode
                <select
                  value={draft.paymentMode}
                  onChange={(e) => patch({ paymentMode: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  {PAYMENT_OPTS.map((p) => (
                    <option key={p} value={p}>{p === 'all' ? 'All Modes' : p}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-medium">
                GST Type
                <select
                  value={draft.gstType}
                  onChange={(e) => patch({ gstType: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
                >
                  {GST_OPTS.map((g) => (
                    <option key={g} value={g}>{g === 'all' ? 'All GST Types' : g}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {draft.step === 4 && (
            <div className="rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-start gap-2 text-amber-600 text-xs">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                Preview uses mock BI data — ready for live API wiring.
              </div>
              <p className="font-semibold">{type.label}</p>
              <p className="text-xs text-slate-500">
                {draft.dateFrom} → {draft.dateTo} · Category: {draft.category} · Status: {draft.status}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ['Revenue', formatINR(234560)],
                  ['Orders', '186'],
                  ['GST', formatINR(12400)],
                  ['Margin', '18.5%'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-page p-3">
                    <p className="text-[10px] text-slate-500">{k}</p>
                    <p className="text-sm font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {draft.step === 5 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Choose export format, then generate. File will appear in Recently Generated and Downloads.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REPORT_FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => patch({ format: f.id })}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                      draft.format === f.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700'
                        : 'border-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-surface/95 px-5 py-4">
          <button
            type="button"
            disabled={draft.step <= 1 || busy}
            onClick={() => patch({ step: draft.step - 1 })}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            <ChevronLeft size={16} /> Back
          </button>
          {draft.step < 5 ? (
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
          ) : (
            <button
              type="button"
              disabled={busy || !canNext()}
              onClick={handleGenerate}
              className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-sm font-semibold disabled:opacity-40"
            >
              {busy ? 'Generating…' : 'Generate & Export'}
            </button>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={confirmCancel}
        title="Discard changes?"
        message="Your unsaved draft selections will be lost."
        danger={true}
        confirmLabel="Discard Changes"
        cancelLabel="Keep Editing"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          onClose();
        }}
      />
    </SellerOverlay>
  );
}
