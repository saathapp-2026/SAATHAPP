import React, { useEffect, useState } from 'react';
import { X, Download, Printer, ZoomIn, ZoomOut, RotateCw, FileText } from 'lucide-react';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import VerificationTimeline from './VerificationTimeline';
import VersionHistory from './VersionHistory';
import ExpiryIndicator from './ExpiryIndicator';
import { formatDate, statusLabel, STATUS_STYLES } from '../../../config/seller/documentConstants';

export default function DocumentViewerDrawer({
  open,
  document: doc,
  onClose,
  onDownload,
  onPrint,
  onRestoreVersion,
  showVersions = false,
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [tab, setTab] = useState('preview');

  useEffect(() => {
    if (open) {
      setZoom(1);
      setRotation(0);
      setTab(showVersions ? 'versions' : 'preview');
    }
  }, [open, showVersions, doc?.id]);

  if (!open || !doc) return null;

  const isImage = (doc.fileType || '').startsWith('image/');
  const isPdf = doc.fileType === 'application/pdf' || (doc.fileName || '').endsWith('.pdf');

  return (
    <SellerOverlay
      open={open && !!doc}
      onClose={onClose}
      label="Document viewer"
      zIndex={SELLER_Z.drawer}
      className="flex justify-end"
      contentClassName="h-full"
    >
      <aside className="h-full w-full max-w-xl bg-surface border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 truncate">{doc.name}</h2>
            <p className="text-sm text-slate-500">
              {doc.categoryLabel} · {doc.typeLabel}
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                STATUS_STYLES[doc.status] || STATUS_STYLES.draft
              }`}
            >
              {statusLabel(doc.status)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-page"
            aria-label="Close viewer"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 px-4">
          {[
            { id: 'preview', label: 'Preview' },
            { id: 'meta', label: 'Details' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'versions', label: 'Versions' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-2.5 text-sm font-medium border-b-2 -mb-px ${
                tab === t.id
                  ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === 'preview' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <IconBtn onClick={() => setZoom((z) => Math.min(2, z + 0.1))} icon={ZoomIn} label="Zoom in" />
                <IconBtn onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} icon={ZoomOut} label="Zoom out" />
                <IconBtn onClick={() => setRotation((r) => r + 90)} icon={RotateCw} label="Rotate" />
                <IconBtn onClick={() => onDownload?.(doc)} icon={Download} label="Download" />
                <IconBtn onClick={() => onPrint?.(doc)} icon={Printer} label="Print" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-page dark:bg-slate-950 min-h-[280px] flex items-center justify-center overflow-auto p-4">
                {doc.previewUrl && isImage ? (
                  <img
                    src={doc.previewUrl}
                    alt={doc.name}
                    style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                    className="max-w-full transition-transform origin-center"
                  />
                ) : isPdf || isImage ? (
                  <div
                    className="text-center text-slate-500 space-y-2"
                    style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                  >
                    <FileText className="mx-auto h-16 w-16 text-slate-300" />
                    <p className="font-medium text-slate-700 dark:text-slate-200">{doc.fileName || doc.name}</p>
                    <p className="text-xs">Preview placeholder · {doc.fileType || 'file'}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No file uploaded for this document.</p>
                )}
              </div>
            </div>
          ) : null}

          {tab === 'meta' ? (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Document Number', doc.documentNumber || '—'],
                ['Issue Date', formatDate(doc.issueDate)],
                ['Issuing Authority', doc.issuingAuthority || '—'],
                ['GST Number', doc.gstNumber || '—'],
                ['PAN Number', doc.panNumber || '—'],
                ['Aadhaar', doc.aadhaarMasked || '—'],
                ['Bank Account', doc.bankAccountMasked || '—'],
                ['Uploaded By', doc.uploadedBy],
                ['Uploaded', formatDate(doc.uploadedAt)],
                ['Last Updated', formatDate(doc.updatedAt)],
                ['Version', `v${doc.version}`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-page dark:bg-slate-950 px-3 py-2">
                  <dt className="text-xs text-slate-400">{k}</dt>
                  <dd className="font-medium text-slate-800 dark:text-slate-100 mt-0.5 break-all">{v}</dd>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-xl bg-page dark:bg-slate-950 px-3 py-2">
                <dt className="text-xs text-slate-400 mb-1">Expiry</dt>
                <dd>
                  <ExpiryIndicator state={doc.expiryState} dateLabel={formatDate(doc.expiryDate)} />
                </dd>
              </div>
              {doc.remarks ? (
                <div className="sm:col-span-2 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
                  <dt className="text-xs text-amber-700 dark:text-amber-300">Admin remarks</dt>
                  <dd className="text-sm text-amber-900 dark:text-amber-100 mt-1">{doc.remarks}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {tab === 'timeline' ? <VerificationTimeline timeline={doc.timeline || []} /> : null}

          {tab === 'versions' ? (
            <VersionHistory
              versions={doc.versions || []}
              onDownload={(v) => onDownload?.({ ...doc, fileName: v.fileName })}
              onRestore={(v) => onRestoreVersion?.(doc, v)}
              canRestore
            />
          ) : null}
        </div>
      </aside>
    </SellerOverlay>
  );
}

function IconBtn({ onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-page"
    >
      <Icon size={14} /> {label}
    </button>
  );
}
