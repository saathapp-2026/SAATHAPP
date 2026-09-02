import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Search,
  FileText,
  CheckCircle2,
  UserPlus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../orders/ConfirmDialog';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import {
  WIZARD_STEPS,
  STATES_GST,
  SELLER_BRANCHES,
  SELLER_GSTIN,
  PAYMENT_MODES,
  PAYMENT_STATUS,
  validateGSTIN,
  calcLine,
  calcInvoiceTotals,
  formatINR,
} from '../../../config/seller/invoiceConstants';
import {
  loadWizardDraft,
  saveWizardDraft,
  clearWizardDraft,
  emptyWizardDraft,
  getInvoiceCustomers,
  getInvoiceProducts,
  getDeliveredOrdersForInvoice,
  saveInvoice,
  downloadInvoicePdf,
  printInvoiceDoc,
  nextInvoiceNumber,
} from '../../../services/seller/sellerInvoicesService';

function Field({ label, children, className = '' }) {
  return (
    <label className={`block text-xs font-medium text-slate-500 ${className}`}>
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';

export default function InvoiceWizard({ open, onClose, onSaved, editInvoice = null }) {
  const [draft, setDraft] = useState(() => emptyWizardDraft());
  const [dirty, setDirty] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productQ, setProductQ] = useState('');
  const [custQ, setCustQ] = useState('');
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState(null);
  const draftRef = useRef(draft);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    (async () => {
      const [cRes, oRes, pRes] = await Promise.all([
        getInvoiceCustomers(),
        getDeliveredOrdersForInvoice(),
        getInvoiceProducts(),
      ]);
      if (cancelled) return;
      setCustomers(cRes.data || []);
      setOrders(oRes.data || []);
      setProducts(pRes.data || []);
      if (editInvoice) {
        setDraft({
          ...emptyWizardDraft(),
          id: editInvoice.id,
          step: 1,
          customer: editInvoice.customer,
          order: editInvoice.orderId ? { id: editInvoice.orderId } : null,
          mode: editInvoice.orderId ? 'existing_order' : 'manual',
          number: editInvoice.number,
          invoiceDate: editInvoice.invoiceDate?.slice(0, 10),
          dueDate: editInvoice.dueDate?.slice(0, 10) || '',
          paymentTerms: editInvoice.paymentTerms,
          reference: editInvoice.reference,
          poNumber: editInvoice.poNumber,
          placeOfSupply: editInvoice.placeOfSupply,
          branchId: editInvoice.branchId,
          items: editInvoice.items || [],
          paymentMode: editInvoice.paymentMode,
          paymentStatus: editInvoice.paymentStatus,
          transactionId: editInvoice.transactionId,
          paymentNotes: editInvoice.paymentNotes,
          notes: editInvoice.notes,
          revisionHistory: editInvoice.revisionHistory,
          createdAt: editInvoice.createdAt,
        });
        setDirty(false);
      } else {
        const saved = loadWizardDraft();
        setDraft({ ...saved, number: saved.number || nextInvoiceNumber() });
        setDirty(false);
      }
      setGenerated(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, editInvoice]);

  useEffect(() => {
    if (!open || !dirty) return undefined;
    const id = setInterval(() => {
      saveWizardDraft(draftRef.current);
      toast('Draft auto-saved', { icon: '💾', duration: 1400 });
      setDirty(false);
    }, 30000);
    return () => clearInterval(id);
  }, [open, dirty]);

  useEffect(() => {
    if (!open) return undefined;
    const onBeforeUnload = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [open, dirty]);

  const patch = (partial) => {
    setDraft((d) => ({ ...d, ...partial }));
    setDirty(true);
  };

  const totals = useMemo(
    () => calcInvoiceTotals(draft.items || [], draft.placeOfSupply, draft.cessPct || 0),
    [draft.items, draft.placeOfSupply, draft.cessPct]
  );

  const filteredCustomers = useMemo(() => {
    const q = custQ.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.gstin?.toLowerCase().includes(q)
    );
  }, [customers, custQ]);

  const validateStep = (step) => {
    if (step === 1) {
      if (!draft.customer) return 'Select or add a customer';
      if (draft.customer.gstin && !validateGSTIN(draft.customer.gstin)) return 'Invalid GSTIN';
    }
    if (step === 3) {
      if (!draft.invoiceDate) return 'Invoice date is required';
      if (!draft.number) return 'Invoice number is required';
    }
    if (step === 4) {
      if (!draft.items?.length) return 'Add at least one product';
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(draft.step);
    if (err) return toast.error(err);
    if (draft.step < 8) patch({ step: draft.step + 1 });
  };

  const goPrev = () => {
    if (draft.step > 1) patch({ step: draft.step - 1 });
  };

  const handleClose = () => {
    if (dirty) {
      setConfirmCancel(true);
      return;
    }
    onClose?.();
  };

  const addProduct = (p) => {
    const item = {
      id: `line-${Date.now()}`,
      productId: p.id,
      name: p.name,
      sku: p.sku,
      qty: 1,
      mrp: p.mrp,
      sellingPrice: p.sellingPrice,
      discount: 0,
      gstPct: p.gstPct,
      ...calcLine({ qty: 1, sellingPrice: p.sellingPrice, discount: 0, gstPct: p.gstPct }),
    };
    patch({ items: [...(draft.items || []), item] });
    toast.success('Item added') };

  const updateItem = (id, changes) => {
    const items = (draft.items || []).map((it) => {
      if (it.id !== id) return it;
      const next = { ...it, ...changes };
      return { ...next, ...calcLine(next) };
    });
    patch({ items });
  };

  const removeItem = (id) => patch({ items: (draft.items || []).filter((it) => it.id !== id) });

  const duplicateItem = (id) => {
    const src = draft.items.find((it) => it.id === id);
    if (!src) return;
    patch({ items: [...draft.items, { ...src, id: `line-${Date.now()}` }] });
  };

  const saveDraftNow = async () => {
    setSaving(true);
    try {
      saveWizardDraft(draft);
      const res = await saveInvoice({ ...draft, totals }, { publish: false });
      if (res.success) {
        toast.success('Saved as draft');
        setDirty(false);
        onSaved?.(res.data);
      }
    } finally {
      setSaving(false);
    }
  };

  const generate = async () => {
    const err = validateStep(1) || validateStep(3) || validateStep(4);
    if (err) return toast.error(err);
    setSaving(true);
    try {
      const res = await saveInvoice({ ...draft, totals }, { publish: true });
      if (res.success) {
        setGenerated(res.data);
        patch({ step: 8 });
        setDirty(false);
        clearWizardDraft();
        toast.success('Invoice generated');
        onSaved?.(res.data);
      }
    } finally {
      setSaving(false);
    }
  };

  const step = draft.step;

  return (
    <SellerOverlay
      open={open}
      onClose={handleClose}
      label="Create Invoice"
      zIndex={SELLER_Z.drawer}
      className="flex justify-end"
      contentClassName="h-full"
    >
      <aside className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded h-full w-full max-w-xl bg-surface border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        <div className="flex items-start justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">Create Invoice</h2>
            <p className="text-xs text-slate-500 mt-0.5">Generate new GST invoice for your customer · Step {step}/8</p>
          </div>
          <button type="button" onClick={handleClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="px-4 pt-3 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {WIZARD_STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id > step) {
                    const err = validateStep(step);
                    if (err) return toast.error(err);
                  }
                  patch({ step: s.id });
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap ${
                  s.id === step ? 'bg-emerald-500 text-white' : s.id < step ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40' : 'text-slate-400'
                }`}
              >
                {s.id}. {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {step === 1 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">1. Customer Information</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = window.prompt('Customer name');
                    if (!name) return;
                    const phone = window.prompt('Mobile number') || '';
                    const gstin = window.prompt('GSTIN (optional)') || '';
                    if (gstin && !validateGSTIN(gstin)) return toast.error('Invalid GSTIN');
                    patch({
                      customer: {
                        id: `CUST-NEW-${Date.now()}`,
                        name,
                        phone,
                        email: '',
                        gstin,
                        billingAddress: '',
                        shippingAddress: '',
                        stateCode: draft.placeOfSupply,
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"
                >
                  <UserPlus size={12} /> Add New
                </button>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={custQ}
                  onChange={(e) => setCustQ(e.target.value)}
                  placeholder="Select Customer"
                  className={`${inputCls} pl-9`}
                />
              </div>
              {!draft.customer ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                  <FileText size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">No customer selected.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-sm space-y-1">
                  <p className="font-semibold">{draft.customer.name}</p>
                  <p className="text-xs text-slate-500">{draft.customer.phone} · {draft.customer.email || '—'}</p>
                  <p className="text-xs text-slate-500">{draft.customer.gstin ? `GSTIN: ${draft.customer.gstin}` : 'B2C (no GSTIN)'}</p>
                  <p className="text-xs text-slate-500">{draft.customer.billingAddress}</p>
                </div>
              )}
              <div className="max-h-40 overflow-y-auto space-y-1">
                {filteredCustomers.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => patch({ customer: c, placeOfSupply: c.stateCode || draft.placeOfSupply })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${
                      draft.customer?.id === c.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                        : 'border-transparent hover:bg-page'
                    }`}
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs text-slate-400 ml-2">{c.phone}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-3">
              <h3 className="font-semibold text-sm">2. Select Order</h3>
              <div className="flex gap-2">
                {[
                  { id: 'existing_order', label: 'Existing Order' },
                  { id: 'manual', label: 'Manual Invoice' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => patch({ mode: m.id, order: m.id === 'manual' ? null : draft.order })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      draft.mode === m.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              {draft.mode === 'existing_order' && (
                <div className="space-y-2">
                  {orders.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        const customer = customers.find((c) => c.id === o.customerId) || draft.customer;
                        patch({
                          order: o,
                          customer: customer || draft.customer,
                          items: o.items,
                          placeOfSupply: customer?.stateCode || draft.placeOfSupply,
                        });
                        toast.success('Order items imported') }}
                      className={`w-full text-left rounded-xl border p-3 text-sm ${
                        draft.order?.id === o.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{o.id}</span>
                        <span className="tabular-nums">{formatINR(o.amount)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {o.customerName} · {o.status} · {new Date(o.date).toLocaleDateString('en-IN')}
                      </p>
                    </button>
                  ))}
                </div>
              )}
              {draft.mode === 'manual' && (
                <p className="text-sm text-slate-500 rounded-xl border border-dashed border-slate-200 p-4">
                  Manual invoice — add products in step 4.
                </p>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="space-y-3">
              <h3 className="font-semibold text-sm">3. Invoice Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Invoice Number">
                  <input value={draft.number} onChange={(e) => patch({ number: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Branch / GSTIN">
                  <select value={draft.branchId} onChange={(e) => patch({ branchId: e.target.value })} className={inputCls}>
                    {SELLER_BRANCHES.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Invoice Date">
                  <input type="date" value={draft.invoiceDate} onChange={(e) => patch({ invoiceDate: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Due Date">
                  <input type="date" value={draft.dueDate} onChange={(e) => patch({ dueDate: e.target.value })} className={inputCls} />
                </Field>
                <Field label="PO / Reference (Optional)" className="col-span-2">
                  <input
                    value={draft.poNumber || draft.reference}
                    onChange={(e) => patch({ poNumber: e.target.value, reference: e.target.value })}
                    placeholder="Enter PO or reference number"
                    className={inputCls}
                  />
                </Field>
                <Field label="Payment Terms">
                  <input value={draft.paymentTerms} onChange={(e) => patch({ paymentTerms: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Place of Supply">
                  <select value={draft.placeOfSupply} onChange={(e) => patch({ placeOfSupply: e.target.value })} className={inputCls}>
                    {STATES_GST.map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">4. Add Items</h3>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={productQ}
                  onChange={async (e) => {
                    setProductQ(e.target.value);
                    const res = await getInvoiceProducts(e.target.value);
                    setProducts(res.data || []);
                  }}
                  placeholder="Search products / SKU / barcode"
                  className={`${inputCls} pl-9`}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addProduct(p)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border border-slate-200 hover:bg-page"
                  >
                    <Plus size={11} /> {p.name}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {(draft.items || []).map((it) => (
                  <div key={it.id} className="rounded-xl border border-slate-200 p-3 space-y-2">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{it.name}</p>
                        <p className="text-[11px] text-slate-400">{it.sku}</p>
                      </div>
                      <div className="flex gap-1">
                        <button type="button" aria-label="Duplicate" onClick={() => duplicateItem(it.id)} className="p-1.5 rounded-lg hover:bg-page">
                          <Copy size={13} />
                        </button>
                        <button type="button" aria-label="Delete" onClick={() => removeItem(it.id)} className="p-1.5 rounded-lg hover:bg-page text-red-500">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Field label="Qty">
                        <input type="number" min="1" value={it.qty} onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })} className={inputCls} />
                      </Field>
                      <Field label="Price">
                        <input type="number" value={it.sellingPrice} onChange={(e) => updateItem(it.id, { sellingPrice: Number(e.target.value) })} className={inputCls} />
                      </Field>
                      <Field label="Disc">
                        <input type="number" value={it.discount} onChange={(e) => updateItem(it.id, { discount: Number(e.target.value) })} className={inputCls} />
                      </Field>
                      <Field label="GST %">
                        <input type="number" value={it.gstPct} onChange={(e) => updateItem(it.id, { gstPct: Number(e.target.value) })} className={inputCls} />
                      </Field>
                    </div>
                    <p className="text-xs text-right font-semibold tabular-nums">{formatINR(it.amount)}</p>
                  </div>
                ))}
                {!draft.items?.length && (
                  <button
                    type="button"
                    onClick={() => products[0] && addProduct(products[0])}
                    className="w-full py-3 rounded-xl border border-dashed border-slate-300 text-sm font-semibold text-emerald-600 inline-flex items-center justify-center gap-1"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                )}
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="space-y-3">
              <h3 className="font-semibold text-sm">5. GST & Tax</h3>
              <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Sub Total</span><span className="tabular-nums">{formatINR(totals.subtotal)}</span></div>
                {totals.intra ? (
                  <>
                    <div className="flex justify-between"><span className="text-slate-500">CGST</span><span className="tabular-nums">{formatINR(totals.cgst)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">SGST</span><span className="tabular-nums">{formatINR(totals.sgst)}</span></div>
                  </>
                ) : (
                  <div className="flex justify-between"><span className="text-slate-500">IGST</span><span className="tabular-nums">{formatINR(totals.igst)}</span></div>
                )}
                <Field label="CESS %">
                  <input type="number" value={draft.cessPct || 0} onChange={(e) => patch({ cessPct: Number(e.target.value) })} className={inputCls} />
                </Field>
                <div className="flex justify-between"><span className="text-slate-500">CESS</span><span className="tabular-nums">{formatINR(totals.cess)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Round Off</span><span className="tabular-nums">{formatINR(totals.roundOff)}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-bold text-emerald-600">
                  <span>Grand Total</span>
                  <span className="tabular-nums text-lg">{formatINR(totals.grandTotal)}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Seller GSTIN: {SELLER_GSTIN} · {totals.intra ? 'Intra-state (CGST+SGST)' : 'Inter-state (IGST)'}</p>
            </section>
          )}

          {step === 6 && (
            <section className="space-y-3">
              <h3 className="font-semibold text-sm">6. Payment Details</h3>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => patch({ paymentMode: m.id })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      draft.paymentMode === m.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Payment Status">
                  <select value={draft.paymentStatus} onChange={(e) => patch({ paymentStatus: e.target.value })} className={inputCls}>
                    {Object.values(PAYMENT_STATUS).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Transaction ID">
                  <input value={draft.transactionId} onChange={(e) => patch({ transactionId: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Payment Date">
                  <input type="date" value={draft.paymentDate || ''} onChange={(e) => patch({ paymentDate: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Settlement Date">
                  <input type="date" value={draft.settlementDate || ''} onChange={(e) => patch({ settlementDate: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Notes" className="col-span-2">
                  <textarea value={draft.paymentNotes} onChange={(e) => patch({ paymentNotes: e.target.value })} rows={2} className={inputCls} />
                </Field>
              </div>
              <p className="text-[11px] text-slate-400">Payment reconciliation ready for Razorpay / UPI / Bank settlement.</p>
            </section>
          )}

          {step === 7 && (
            <section className="space-y-3">
              <h3 className="font-semibold text-sm">7. Preview Invoice</h3>
              <div className="rounded-xl border border-slate-200 p-4 text-sm space-y-3 bg-page ">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold">SAATHAPP Tax Invoice</p>
                    <p className="text-[11px] text-slate-500">GSTIN: {SELLER_GSTIN}</p>
                    <p className="text-[11px] text-slate-500">{draft.number}</p>
                  </div>
                  <div className="h-14 w-14 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-[9px] text-slate-400 text-center">
                    QR / e-Inv
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{draft.customer?.name || '—'}</p>
                  <p className="text-[11px] text-slate-500">{draft.customer?.billingAddress}</p>
                  <p className="text-[11px] text-slate-500">{draft.customer?.gstin || 'B2C'}</p>
                </div>
                <ul className="space-y-1 text-xs">
                  {(draft.items || []).map((it) => (
                    <li key={it.id} className="flex justify-between gap-2">
                      <span>{it.name} × {it.qty}</span>
                      <span className="tabular-nums">{formatINR(it.amount)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-emerald-600 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="tabular-nums">{formatINR(totals.grandTotal)}</span>
                </div>
                <p className="text-[10px] text-slate-400">Authorized Signatory · Digital Signature · E-Way Bill & e-Invoice ready</p>
              </div>
            </section>
          )}

          {step === 8 && (
            <section className="space-y-4 text-center py-6">
              {generated ? (
                <>
                  <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
                  <h3 className="font-bold text-lg">Invoice Generated</h3>
                  <p className="text-sm text-slate-500">{generated.number} · {formatINR(generated.totals?.grandTotal)}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button type="button" onClick={() => downloadInvoicePdf(generated)} className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200">
                      Download PDF
                    </button>
                    <button type="button" onClick={() => printInvoiceDoc(generated)} className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200">
                      Print
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.open(`mailto:${generated.customer?.email || ''}?subject=${encodeURIComponent(generated.number)}`);
                        toast.success('Email compose opened') }}
                      className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200"
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const phone = String(generated.customer?.phone || '').replace(/\D/g, '');
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Invoice ${generated.number}`)}`, '_blank');
                      }}
                      className="px-3 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white"
                    >
                      WhatsApp
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-lg">Ready to Generate</h3>
                  <p className="text-sm text-slate-500">Save GST invoice, download PDF, notify customer.</p>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={generate}
                    className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
                  >
                    {saving ? 'Generating…' : 'Generate Invoice'}
                  </button>
                </>
              )}
            </section>
          )}

          {/* Live totals strip like mockup */}
          {step >= 4 && step <= 7 && (
            <div className="rounded-xl border border-slate-200 p-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-500"><span>Sub Total</span><span className="tabular-nums">{formatINR(totals.subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Total GST</span><span className="tabular-nums">{formatINR(totals.taxTotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Round Off</span><span className="tabular-nums">{formatINR(totals.roundOff)}</span></div>
              <div className="flex justify-between font-bold text-emerald-600 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Grand Total</span>
                <span className="tabular-nums text-base">{formatINR(totals.grandTotal)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-2 p-4 border-t border-slate-200 dark:border-slate-800 bg-surface/95">
          <button type="button" onClick={handleClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl text-sm border border-slate-200">
            Cancel
          </button>
          {step > 1 && step < 8 && (
            <button type="button" onClick={goPrev} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl text-sm border border-slate-200">
              Back
            </button>
          )}
          <button type="button" disabled={saving} onClick={saveDraftNow} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 disabled:opacity-50">
            Save as Draft
          </button>
          {step < 7 && (
            <button type="button" onClick={goNext} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none ml-auto px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600">
              Continue
            </button>
          )}
          {step === 7 && (
            <button type="button" onClick={() => { patch({ step: 8 }) }} className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600">
              Preview & Save
            </button>
          )}
          {step === 8 && generated && (
            <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none ml-auto px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white">
              Done
            </button>
          )}
        </div>
      </aside>
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
    </SellerOverlay>
  );
}
