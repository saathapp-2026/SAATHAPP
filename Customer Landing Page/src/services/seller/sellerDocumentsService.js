import { delay } from './_sellerServiceUtils';
import {
  DOC_STATUSES,
  getDocType,
  getCategory,
  getExpiryState,
  maskAadhaar,
  maskAccount,
} from '../../config/seller/documentConstants';

const STORAGE_KEY = 'saathapp_seller_documents_v1';
const DRAFT_KEY = 'saathapp_seller_doc_wizard_draft';
const AUDIT_KEY = 'saathapp_seller_documents_audit_v1';
const CUSTOM_TYPES_KEY = 'saathapp_seller_doc_custom_types_v1';

function daysFromNow(n, h = 10) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return fallback;
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function pushAudit(entry) {
  const list = load(AUDIT_KEY, []);
  list.unshift({
    id: `aud-${Date.now()}`,
    at: new Date().toISOString(),
    user: 'Saurabh Kumar',
    ...entry,
  });
  save(AUDIT_KEY, list.slice(0, 200));
}

function seedDocuments() {
  return [
    {
      id: 'doc-1001',
      name: 'Aadhaar Card',
      categoryId: 'kyc',
      typeId: 'aadhaar',
      documentNumber: 'XXXX-XXXX-4521',
      aadhaarNumber: '4521',
      status: DOC_STATUSES.VERIFIED,
      version: 2,
      uploadedAt: '2026-01-15T10:00:00.000Z',
      updatedAt: '2026-01-16T12:00:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2018-04-12',
      expiryDate: null,
      issuingAuthority: 'UIDAI',
      fileName: 'aadhaar.pdf',
      fileType: 'application/pdf',
      fileSize: 420000,
      previewUrl: null,
      remarks: 'Verified successfully.',
      timeline: [
        { status: 'uploaded', at: '2026-01-15T10:00:00.000Z', note: 'Uploaded by seller' },
        { status: 'pending', at: '2026-01-15T10:01:00.000Z', note: 'Queued for review' },
        { status: 'under_review', at: '2026-01-15T14:00:00.000Z', note: 'Admin review started' },
        { status: 'verified', at: '2026-01-16T12:00:00.000Z', note: 'Approved by compliance' },
      ],
      versions: [
        {
          version: 1,
          uploadedAt: '2026-01-10T09:00:00.000Z',
          fileName: 'aadhaar-v1.pdf',
          note: 'Initial upload',
        },
        {
          version: 2,
          uploadedAt: '2026-01-15T10:00:00.000Z',
          fileName: 'aadhaar.pdf',
          note: 'Replaced with clearer scan',
        },
      ],
    },
    {
      id: 'doc-1002',
      name: 'PAN Card',
      categoryId: 'kyc',
      typeId: 'pan',
      documentNumber: 'ABCDE1234F',
      panNumber: 'ABCDE1234F',
      status: DOC_STATUSES.VERIFIED,
      version: 1,
      uploadedAt: '2026-01-15T11:00:00.000Z',
      updatedAt: '2026-01-15T16:00:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2015-08-20',
      expiryDate: null,
      issuingAuthority: 'Income Tax Department',
      fileName: 'pan.jpg',
      fileType: 'image/jpeg',
      fileSize: 180000,
      previewUrl: null,
      remarks: 'PAN matched with GST.',
      timeline: [
        { status: 'uploaded', at: '2026-01-15T11:00:00.000Z', note: 'Uploaded by seller' },
        { status: 'pending', at: '2026-01-15T11:01:00.000Z', note: 'Queued for review' },
        { status: 'verified', at: '2026-01-15T16:00:00.000Z', note: 'Verified' },
      ],
      versions: [
        { version: 1, uploadedAt: '2026-01-15T11:00:00.000Z', fileName: 'pan.jpg', note: 'Initial upload' },
      ],
    },
    {
      id: 'doc-1003',
      name: 'GST Certificate',
      categoryId: 'tax',
      typeId: 'gst',
      documentNumber: '27ABCDE1234F1Z5',
      gstNumber: '27ABCDE1234F1Z5',
      status: DOC_STATUSES.VERIFIED,
      version: 1,
      uploadedAt: '2026-01-16T09:00:00.000Z',
      updatedAt: '2026-01-16T18:00:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2022-03-01',
      expiryDate: null,
      issuingAuthority: 'GSTN',
      fileName: 'gst-certificate.pdf',
      fileType: 'application/pdf',
      fileSize: 510000,
      previewUrl: null,
      remarks: 'GSTIN active.',
      timeline: [
        { status: 'uploaded', at: '2026-01-16T09:00:00.000Z', note: 'Uploaded by seller' },
        { status: 'pending', at: '2026-01-16T09:01:00.000Z', note: 'Queued for review' },
        { status: 'verified', at: '2026-01-16T18:00:00.000Z', note: 'Verified' },
      ],
      versions: [
        {
          version: 1,
          uploadedAt: '2026-01-16T09:00:00.000Z',
          fileName: 'gst-certificate.pdf',
          note: 'Initial upload',
        },
      ],
    },
    {
      id: 'doc-1004',
      name: 'Shop License',
      categoryId: 'kyc',
      typeId: 'shop_license',
      documentNumber: 'SL-MH-88421',
      status: DOC_STATUSES.PENDING,
      version: 1,
      uploadedAt: '2026-01-16T10:30:00.000Z',
      updatedAt: '2026-01-16T10:30:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2024-06-01',
      expiryDate: daysFromNow(20),
      issuingAuthority: 'Municipal Corporation',
      fileName: 'shop-license.pdf',
      fileType: 'application/pdf',
      fileSize: 320000,
      previewUrl: null,
      remarks: '',
      timeline: [
        { status: 'uploaded', at: '2026-01-16T10:30:00.000Z', note: 'Uploaded by seller' },
        { status: 'pending', at: '2026-01-16T10:31:00.000Z', note: 'Awaiting admin review' },
      ],
      versions: [
        {
          version: 1,
          uploadedAt: '2026-01-16T10:30:00.000Z',
          fileName: 'shop-license.pdf',
          note: 'Initial upload',
        },
      ],
    },
    {
      id: 'doc-1005',
      name: 'Cancelled Cheque',
      categoryId: 'banking',
      typeId: 'cancelled_cheque',
      documentNumber: 'HDFC-****4521',
      bankAccount: '4521487210',
      status: DOC_STATUSES.VERIFIED,
      version: 1,
      uploadedAt: '2026-01-15T12:00:00.000Z',
      updatedAt: '2026-01-15T17:00:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2026-01-10',
      expiryDate: null,
      issuingAuthority: 'HDFC Bank',
      fileName: 'cancelled-cheque.jpg',
      fileType: 'image/jpeg',
      fileSize: 240000,
      previewUrl: null,
      remarks: 'Bank details matched.',
      timeline: [
        { status: 'uploaded', at: '2026-01-15T12:00:00.000Z', note: 'Uploaded by seller' },
        { status: 'verified', at: '2026-01-15T17:00:00.000Z', note: 'Verified' },
      ],
      versions: [
        {
          version: 1,
          uploadedAt: '2026-01-15T12:00:00.000Z',
          fileName: 'cancelled-cheque.jpg',
          note: 'Initial upload',
        },
      ],
    },
    {
      id: 'doc-1006',
      name: 'FSSAI License',
      categoryId: 'kyc',
      typeId: 'fssai',
      documentNumber: '10012022000123',
      status: DOC_STATUSES.REJECTED,
      version: 1,
      uploadedAt: '2026-02-01T09:00:00.000Z',
      updatedAt: '2026-02-02T11:00:00.000Z',
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2022-01-01',
      expiryDate: daysFromNow(-15),
      issuingAuthority: 'FSSAI',
      fileName: 'fssai.pdf',
      fileType: 'application/pdf',
      fileSize: 390000,
      previewUrl: null,
      remarks: 'License expired. Please upload renewed certificate.',
      timeline: [
        { status: 'uploaded', at: '2026-02-01T09:00:00.000Z', note: 'Uploaded by seller' },
        { status: 'pending', at: '2026-02-01T09:01:00.000Z', note: 'Queued for review' },
        { status: 'rejected', at: '2026-02-02T11:00:00.000Z', note: 'Expired document' },
      ],
      versions: [
        { version: 1, uploadedAt: '2026-02-01T09:00:00.000Z', fileName: 'fssai.pdf', note: 'Initial upload' },
      ],
    },
    {
      id: 'doc-1007',
      name: 'Trade License',
      categoryId: 'kyc',
      typeId: 'trade_license',
      documentNumber: 'TL-2025-991',
      status: DOC_STATUSES.DRAFT,
      version: 1,
      uploadedAt: daysFromNow(-2),
      updatedAt: daysFromNow(-2),
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2025-01-01',
      expiryDate: daysFromNow(45),
      issuingAuthority: 'Local Authority',
      fileName: null,
      fileType: null,
      fileSize: 0,
      previewUrl: null,
      remarks: '',
      timeline: [{ status: 'draft', at: daysFromNow(-2), note: 'Draft saved' }],
      versions: [],
    },
    {
      id: 'doc-1008',
      name: 'Warehouse License',
      categoryId: 'warehouse',
      typeId: 'warehouse_license',
      documentNumber: 'WH-PUN-4421',
      status: DOC_STATUSES.UNDER_REVIEW,
      version: 1,
      uploadedAt: daysFromNow(-5),
      updatedAt: daysFromNow(-1),
      uploadedBy: 'Saurabh Kumar',
      issueDate: '2023-09-01',
      expiryDate: daysFromNow(12),
      issuingAuthority: 'Warehouse Authority',
      fileName: 'warehouse-license.pdf',
      fileType: 'application/pdf',
      fileSize: 280000,
      previewUrl: null,
      remarks: 'Under verification.',
      timeline: [
        { status: 'uploaded', at: daysFromNow(-5), note: 'Uploaded by seller' },
        { status: 'pending', at: daysFromNow(-5), note: 'Queued' },
        { status: 'under_review', at: daysFromNow(-1), note: 'Admin reviewing' },
      ],
      versions: [
        {
          version: 1,
          uploadedAt: daysFromNow(-5),
          fileName: 'warehouse-license.pdf',
          note: 'Initial upload',
        },
      ],
    },
  ];
}

function ensureStore() {
  let list = load(STORAGE_KEY, null);
  if (!list) {
    list = seedDocuments();
    save(STORAGE_KEY, list);
  }
  return list;
}

function persist(list) {
  save(STORAGE_KEY, list);
}

function enrich(doc) {
  const type = getDocType(doc.typeId);
  const category = getCategory(doc.categoryId || type.categoryId);
  const expiryState = getExpiryState(doc.expiryDate);
  return {
    ...doc,
    typeLabel: type.label,
    categoryLabel: category.label,
    categoryId: doc.categoryId || type.categoryId,
    expiryState,
    aadhaarMasked: doc.aadhaarNumber ? maskAadhaar(doc.aadhaarNumber) : null,
    bankAccountMasked: doc.bankAccount ? maskAccount(doc.bankAccount) : null,
  };
}

function applyDocFilters(list, filters = {}) {
  let out = [...list];
  const q = (filters.search || '').trim().toLowerCase();
  if (q) {
    out = out.filter((d) => {
      const hay = [
        d.name,
        d.documentNumber,
        d.gstNumber,
        d.panNumber,
        d.aadhaarNumber,
        d.categoryLabel,
        d.typeLabel,
        d.typeId,
        d.categoryId,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }
  if (filters.status && filters.status !== 'all') {
    if (filters.status === 'expiring') {
      out = out.filter((d) => d.expiryState === 'expiring_soon' || d.expiryState === 'renewal');
    } else if (filters.status === 'renewal') {
      out = out.filter((d) => d.expiryState === 'renewal' || d.expiryState === 'expired');
    } else {
      out = out.filter((d) => d.status === filters.status);
    }
  }
  if (filters.categoryId && filters.categoryId !== 'all') {
    out = out.filter((d) => d.categoryId === filters.categoryId);
  }
  if (filters.typeId && filters.typeId !== 'all') {
    out = out.filter((d) => d.typeId === filters.typeId);
  }
  if (filters.expiry && filters.expiry !== 'all') {
    out = out.filter((d) => d.expiryState === filters.expiry);
  }
  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom).getTime();
    out = out.filter((d) => new Date(d.uploadedAt).getTime() >= from);
  }
  if (filters.dateTo) {
    const to = new Date(filters.dateTo).getTime() + 86400000;
    out = out.filter((d) => new Date(d.uploadedAt).getTime() <= to);
  }
  if (filters.cardKey) {
    const key = filters.cardKey;
    if (key === 'total') {
      // no-op
    } else if (key === 'verified') out = out.filter((d) => d.status === DOC_STATUSES.VERIFIED);
    else if (key === 'pending')
      out = out.filter((d) =>
        [DOC_STATUSES.PENDING, DOC_STATUSES.UPLOADED, DOC_STATUSES.UNDER_REVIEW].includes(d.status)
      );
    else if (key === 'rejected') out = out.filter((d) => d.status === DOC_STATUSES.REJECTED);
    else if (key === 'expiring')
      out = out.filter((d) => d.expiryState === 'expiring_soon' || d.expiryState === 'renewal');
    else if (key === 'renewal')
      out = out.filter((d) => d.expiryState === 'renewal' || d.expiryState === 'expired');
    else if (key === 'uploaded_month') {
      const now = new Date();
      out = out.filter((d) => {
        const u = new Date(d.uploadedAt);
        return u.getMonth() === now.getMonth() && u.getFullYear() === now.getFullYear();
      });
    }
  }
  return out;
}

function sortDocs(list, sortBy = 'uploadedAt', sortDir = 'desc') {
  const dir = sortDir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = a[sortBy] ?? '';
    const bv = b[sortBy] ?? '';
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
}

export function _loadDocumentsForExport() {
  return ensureStore().map(enrich);
}

export async function getDocumentSummary() {
  await delay(180);
  const list = ensureStore().map(enrich);
  const now = new Date();
  const thisMonth = list.filter((d) => {
    const u = new Date(d.uploadedAt);
    return u.getMonth() === now.getMonth() && u.getFullYear() === now.getFullYear();
  }).length;
  const verified = list.filter((d) => d.status === DOC_STATUSES.VERIFIED).length;
  const pending = list.filter((d) =>
    [DOC_STATUSES.PENDING, DOC_STATUSES.UPLOADED, DOC_STATUSES.UNDER_REVIEW].includes(d.status)
  ).length;
  const rejected = list.filter((d) => d.status === DOC_STATUSES.REJECTED).length;
  const expiring = list.filter(
    (d) => d.expiryState === 'expiring_soon' || d.expiryState === 'renewal'
  ).length;
  const renewal = list.filter(
    (d) => d.expiryState === 'renewal' || d.expiryState === 'expired'
  ).length;
  const requiredKeys = ['aadhaar', 'pan', 'gst', 'cancelled_cheque', 'shop_license'];
  const requiredOk = requiredKeys.filter((id) =>
    list.some((d) => d.typeId === id && d.status === DOC_STATUSES.VERIFIED)
  ).length;
  const compliance = Math.round((requiredOk / requiredKeys.length) * 100);

  const cards = [
    {
      key: 'total',
      label: 'Total Documents',
      icon: 'file',
      color: 'sky',
      value: list.length,
      displayValue: String(list.length),
      changePct: 12,
      trend: 'up',
      tooltip: 'All business documents on file',
    },
    {
      key: 'verified',
      label: 'Verified Documents',
      icon: 'check',
      color: 'emerald',
      value: verified,
      displayValue: String(verified),
      changePct: 8,
      trend: 'up',
      tooltip: 'Documents approved by compliance',
    },
    {
      key: 'pending',
      label: 'Pending Verification',
      icon: 'clock',
      color: 'amber',
      value: pending,
      displayValue: String(pending),
      changePct: 5,
      trend: 'down',
      tooltip: 'Awaiting or under review',
    },
    {
      key: 'rejected',
      label: 'Rejected Documents',
      icon: 'x',
      color: 'rose',
      value: rejected,
      displayValue: String(rejected),
      changePct: 2,
      trend: 'down',
      tooltip: 'Need correction and re-upload',
    },
    {
      key: 'expiring',
      label: 'Expiring Soon',
      icon: 'timer',
      color: 'orange',
      value: expiring,
      displayValue: String(expiring),
      changePct: 3,
      trend: 'up',
      tooltip: 'Expire within 30 days',
    },
    {
      key: 'renewal',
      label: 'Renewal Required',
      icon: 'refresh',
      color: 'violet',
      value: renewal,
      displayValue: String(renewal),
      changePct: 1,
      trend: 'up',
      tooltip: 'Expired or within 7 days',
    },
    {
      key: 'uploaded_month',
      label: 'Uploaded This Month',
      icon: 'upload',
      color: 'blue',
      value: thisMonth,
      displayValue: String(thisMonth),
      changePct: 15,
      trend: 'up',
      tooltip: 'New uploads in current month',
    },
    {
      key: 'compliance',
      label: 'Compliance Score',
      icon: 'shield',
      color: 'green',
      value: compliance,
      displayValue: `${compliance}%`,
      changePct: 4,
      trend: 'up',
      tooltip: 'KYC & core document completion',
    },
  ];

  return { data: cards, totals: { compliance, verified, pending, rejected, total: list.length } };
}

export async function getDocuments(query = {}) {
  await delay(220);
  let list = ensureStore().map(enrich);
  list = applyDocFilters(list, query);
  list = sortDocs(list, query.sortBy || 'uploadedAt', query.sortDir || 'desc');
  const page = Math.max(1, Number(query.page) || 1);
  const pageSize = Math.max(1, Number(query.pageSize) || 10);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    data: list.slice(start, start + pageSize),
    meta: { total, totalPages, page, pageSize },
  };
}

export async function getDocumentById(id) {
  await delay(120);
  const doc = ensureStore().map(enrich).find((d) => d.id === id);
  if (!doc) throw new Error('Document not found');
  return { data: doc };
}

export async function getComplianceCenter() {
  await delay(160);
  const list = ensureStore().map(enrich);
  const sections = ['kyc', 'tax', 'banking', 'business', 'brand', 'warehouse'].map((id) => {
    const cat = getCategory(id);
    const types = cat.types || [];
    const items = types.map((t) => {
      const docs = list.filter((d) => d.typeId === t.id);
      const best = docs.sort((a, b) => {
        const rank = { verified: 4, under_review: 3, pending: 2, uploaded: 2, rejected: 1, draft: 0, expired: 0 };
        return (rank[b.status] || 0) - (rank[a.status] || 0);
      })[0];
      let state = 'missing';
      if (best) {
        if (best.status === DOC_STATUSES.VERIFIED) state = best.expiryState === 'expired' ? 'expired' : 'completed';
        else if (best.status === DOC_STATUSES.REJECTED) state = 'rejected';
        else if (best.expiryState === 'expired') state = 'expired';
        else state = 'pending';
      }
      return { typeId: t.id, label: t.label, state, doc: best || null };
    });
    const completed = items.filter((i) => i.state === 'completed').length;
    return {
      id,
      label: cat.label,
      completed,
      total: items.length,
      missing: items.filter((i) => i.state === 'missing').length,
      pending: items.filter((i) => i.state === 'pending').length,
      expired: items.filter((i) => i.state === 'expired').length,
      items,
    };
  });
  const allItems = sections.flatMap((s) => s.items);
  const done = allItems.filter((i) => i.state === 'completed').length;
  const pct = allItems.length ? Math.round((done / allItems.length) * 100) : 0;
  return { data: { sections, progress: pct, completed: done, total: allItems.length } };
}

export function getWizardDraft() {
  return load(DRAFT_KEY, null);
}

export function saveWizardDraft(draft) {
  save(DRAFT_KEY, { ...draft, updatedAt: new Date().toISOString() });
  return { ok: true };
}

export function clearWizardDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export async function submitDocument(payload, { asDraft = false } = {}) {
  await delay(280);
  const list = ensureStore();
  const now = new Date().toISOString();
  const type = getDocType(payload.typeId);
  const isReplace = Boolean(payload.replaceId);
  let doc;

  if (isReplace) {
    const idx = list.findIndex((d) => d.id === payload.replaceId);
    if (idx < 0) throw new Error('Document not found');
    const prev = list[idx];
    const nextVersion = (prev.version || 1) + 1;
    doc = {
      ...prev,
      ...payload,
      id: prev.id,
      name: payload.name || type.label,
      categoryId: payload.categoryId || type.categoryId,
      typeId: payload.typeId || prev.typeId,
      status: asDraft ? DOC_STATUSES.DRAFT : DOC_STATUSES.PENDING,
      version: nextVersion,
      updatedAt: now,
      uploadedAt: asDraft ? prev.uploadedAt : now,
      uploadedBy: 'Saurabh Kumar',
      timeline: [
        ...(prev.timeline || []),
        {
          status: asDraft ? 'draft' : 'pending',
          at: now,
          note: asDraft ? 'Draft saved after replace' : 'Replaced — pending review',
        },
      ],
      versions: [
        ...(prev.versions || []),
        {
          version: nextVersion,
          uploadedAt: now,
          fileName: payload.fileName || prev.fileName,
          note: 'Replaced version',
        },
      ],
      remarks: '',
    };
    list[idx] = doc;
    pushAudit({ action: 'replace', documentId: doc.id, detail: `Version ${nextVersion}` });
  } else {
    const id = `doc-${Date.now()}`;
    doc = {
      id,
      name: payload.name || type.label,
      categoryId: payload.categoryId || type.categoryId,
      typeId: payload.typeId,
      documentNumber: payload.documentNumber || '',
      gstNumber: payload.gstNumber || '',
      panNumber: payload.panNumber || '',
      aadhaarNumber: payload.aadhaarNumber || '',
      bankAccount: payload.bankAccount || '',
      description: payload.description || '',
      issueDate: payload.issueDate || null,
      expiryDate: payload.expiryDate || null,
      issuingAuthority: payload.issuingAuthority || '',
      status: asDraft ? DOC_STATUSES.DRAFT : DOC_STATUSES.PENDING,
      version: 1,
      uploadedAt: now,
      updatedAt: now,
      uploadedBy: 'Saurabh Kumar',
      fileName: payload.fileName || null,
      fileType: payload.fileType || null,
      fileSize: payload.fileSize || 0,
      previewUrl: payload.previewUrl || null,
      remarks: '',
      timeline: [
        {
          status: asDraft ? 'draft' : 'uploaded',
          at: now,
          note: asDraft ? 'Saved as draft' : 'Uploaded by seller',
        },
        ...(asDraft
          ? []
          : [{ status: 'pending', at: now, note: 'Queued for admin review' }]),
      ],
      versions: payload.fileName
        ? [{ version: 1, uploadedAt: now, fileName: payload.fileName, note: 'Initial upload' }]
        : [],
    };
    list.unshift(doc);
    pushAudit({ action: asDraft ? 'draft' : 'upload', documentId: doc.id, detail: doc.name });
  }

  persist(list);
  if (!asDraft) clearWizardDraft();
  else saveWizardDraft(payload);
  return { data: enrich(doc) };
}

export async function updateDocument(id, patch) {
  await delay(180);
  const list = ensureStore();
  const idx = list.findIndex((d) => d.id === id);
  if (idx < 0) throw new Error('Document not found');
  const now = new Date().toISOString();
  list[idx] = {
    ...list[idx],
    ...patch,
    updatedAt: now,
    timeline: [
      ...(list[idx].timeline || []),
      { status: list[idx].status, at: now, note: patch.remarks ? 'Updated with remarks' : 'Document edited' },
    ],
  };
  persist(list);
  pushAudit({ action: 'edit', documentId: id, detail: patch.name || list[idx].name });
  return { data: enrich(list[idx]) };
}

export async function deleteDocument(id) {
  await delay(140);
  const list = ensureStore();
  const doc = list.find((d) => d.id === id);
  if (!doc) throw new Error('Document not found');
  if (doc.status !== DOC_STATUSES.DRAFT && doc.status !== DOC_STATUSES.REJECTED) {
    throw new Error('Only draft or rejected documents can be deleted');
  }
  persist(list.filter((d) => d.id !== id));
  pushAudit({ action: 'delete', documentId: id, detail: doc.name });
  return { ok: true };
}

export async function duplicateDocument(id) {
  await delay(160);
  const list = ensureStore();
  const src = list.find((d) => d.id === id);
  if (!src) throw new Error('Document not found');
  const now = new Date().toISOString();
  const copy = {
    ...JSON.parse(JSON.stringify(src)),
    id: `doc-${Date.now()}`,
    name: `${src.name} (Copy)`,
    status: DOC_STATUSES.DRAFT,
    version: 1,
    uploadedAt: now,
    updatedAt: now,
    remarks: '',
    timeline: [{ status: 'draft', at: now, note: 'Duplicated from ' + src.id }],
    versions: [],
  };
  list.unshift(copy);
  persist(list);
  pushAudit({ action: 'duplicate', documentId: copy.id, detail: `From ${id}` });
  return { data: enrich(copy) };
}

export async function verifyDocumentStatuses() {
  await delay(400);
  const list = ensureStore();
  let changed = 0;
  const now = new Date().toISOString();
  list.forEach((d) => {
    const exp = getExpiryState(d.expiryDate);
    if (exp === 'expired' && d.status === DOC_STATUSES.VERIFIED) {
      d.status = DOC_STATUSES.EXPIRED;
      d.updatedAt = now;
      d.timeline = [...(d.timeline || []), { status: 'expired', at: now, note: 'Auto-marked expired' }];
      changed += 1;
    }
  });
  persist(list);
  pushAudit({ action: 'verify_status', documentId: 'bulk', detail: `${changed} updated` });
  return { data: { changed } };
}

export async function runMockOcr(fileMeta = {}) {
  await delay(500);
  const name = (fileMeta.fileName || '').toLowerCase();
  return {
    data: {
      panNumber: name.includes('pan') ? 'ABCDE1234F' : '',
      gstNumber: name.includes('gst') ? '27ABCDE1234F1Z5' : '',
      aadhaarNumber: name.includes('aadhaar') ? 'XXXX-XXXX-4521' : '',
      businessName: 'SAATHAPP Demo Store',
      expiryDate: daysFromNow(180).slice(0, 10),
      confidence: 0.86,
      mock: true,
    },
  };
}

export async function runMockAiValidation() {
  await delay(350);
  return {
    data: {
      blur: { ok: true, score: 0.12 },
      crop: { ok: true, score: 0.05 },
      duplicate: { ok: true, matchedId: null },
      fake: { ok: true, risk: 'low' },
      expiry: { ok: true, detected: null },
      mock: true,
    },
  };
}

export async function bulkUploadDocuments(files = []) {
  await delay(600);
  const list = ensureStore();
  const now = new Date().toISOString();
  const success = [];
  const errors = [];
  files.forEach((f, i) => {
    try {
      if (!f?.name) throw new Error('Invalid file');
      const id = `doc-${Date.now()}-${i}`;
      const doc = {
        id,
        name: f.name.replace(/\.[^.]+$/, ''),
        categoryId: 'others',
        typeId: 'custom',
        documentNumber: '',
        status: DOC_STATUSES.PENDING,
        version: 1,
        uploadedAt: now,
        updatedAt: now,
        uploadedBy: 'Saurabh Kumar',
        fileName: f.name,
        fileType: f.type || 'application/pdf',
        fileSize: f.size || 0,
        previewUrl: null,
        remarks: '',
        timeline: [
          { status: 'uploaded', at: now, note: 'Bulk upload' },
          { status: 'pending', at: now, note: 'Queued for review' },
        ],
        versions: [{ version: 1, uploadedAt: now, fileName: f.name, note: 'Bulk upload' }],
      };
      list.unshift(doc);
      success.push({ id, name: f.name });
    } catch (e) {
      errors.push({ name: f?.name || `file-${i}`, error: e.message || 'Failed' });
    }
  });
  persist(list);
  pushAudit({ action: 'bulk_upload', documentId: 'bulk', detail: `${success.length} ok, ${errors.length} failed` });
  return { data: { success, errors } };
}

export async function getAuditLog(limit = 50) {
  await delay(100);
  return { data: load(AUDIT_KEY, []).slice(0, limit) };
}

export async function getVersionHistory(id) {
  await delay(100);
  const doc = ensureStore().find((d) => d.id === id);
  if (!doc) throw new Error('Document not found');
  return { data: doc.versions || [] };
}

export async function restoreVersion(id, version) {
  await delay(200);
  const list = ensureStore();
  const idx = list.findIndex((d) => d.id === id);
  if (idx < 0) throw new Error('Document not found');
  const now = new Date().toISOString();
  const v = (list[idx].versions || []).find((x) => x.version === version);
  if (!v) throw new Error('Version not found');
  list[idx] = {
    ...list[idx],
    version,
    fileName: v.fileName,
    updatedAt: now,
    status: DOC_STATUSES.PENDING,
    timeline: [
      ...(list[idx].timeline || []),
      { status: 'pending', at: now, note: `Restored version ${version} (admin)` },
    ],
  };
  persist(list);
  pushAudit({ action: 'restore', documentId: id, detail: `Version ${version}` });
  return { data: enrich(list[idx]) };
}

export function getCustomDocumentTypes() {
  return load(CUSTOM_TYPES_KEY, []);
}

export function saveCustomDocumentType(type) {
  const list = getCustomDocumentTypes();
  list.push({ id: `custom-${Date.now()}`, ...type });
  save(CUSTOM_TYPES_KEY, list);
  return { data: list };
}

export function downloadDocumentBlob(doc) {
  const content = `SAATHAPP Document Export\nID: ${doc.id}\nName: ${doc.name}\nType: ${doc.typeLabel}\nStatus: ${doc.status}\nNumber: ${doc.documentNumber || '—'}\nUploaded: ${doc.uploadedAt}\n`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = doc.fileName || `${doc.name}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  pushAudit({ action: 'download', documentId: doc.id, detail: doc.name });
}
