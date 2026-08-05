export const INVOICE_STATUS = {
  DRAFT: 'draft',
  GENERATED: 'generated',
  SENT: 'sent',
  VIEWED: 'viewed',
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  PARTIAL: 'partial',
  REFUNDED: 'refunded',
};

export const PAYMENT_MODES = [
  { id: 'cash', label: 'Cash' },
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Card' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'cod', label: 'COD' },
];

export const INVOICE_STATUS_LABELS = {
  draft: 'Draft',
  generated: 'Generated',
  sent: 'Sent',
  viewed: 'Viewed',
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export const INVOICE_STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  generated: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  sent: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  viewed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  overdue: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  completed: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

export const QUICK_INVOICE_TABS = [
  { id: 'all', label: 'All' },
  { id: 'paid', label: 'Paid', status: 'paid' },
  { id: 'pending', label: 'Pending', status: 'pending' },
  { id: 'overdue', label: 'Overdue', status: 'overdue' },
  { id: 'cancelled', label: 'Cancelled', status: 'cancelled' },
  { id: 'draft', label: 'Draft', status: 'draft' },
];

export const WIZARD_STEPS = [
  { id: 1, label: 'Customer' },
  { id: 2, label: 'Order' },
  { id: 3, label: 'Invoice Info' },
  { id: 4, label: 'Products' },
  { id: 5, label: 'GST & Tax' },
  { id: 6, label: 'Payment' },
  { id: 7, label: 'Preview' },
  { id: 8, label: 'Generate' },
];

export const STATES_GST = [
  { code: '27', name: 'Maharashtra' },
  { code: '07', name: 'Delhi' },
  { code: '29', name: 'Karnataka' },
  { code: '36', name: 'Telangana' },
  { code: '24', name: 'Gujarat' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '19', name: 'West Bengal' },
];

export const SELLER_GSTIN = '27AABCU9603R1ZM';
export const SELLER_STATE_CODE = '27';
export const SELLER_BRANCHES = [
  { id: 'br-main', name: 'Main Store — Mumbai', gstin: SELLER_GSTIN, warehouse: 'WH-MUM-01' },
  { id: 'br-del', name: 'Delhi Branch', gstin: '07AABCU9603R1ZN', warehouse: 'WH-DEL-01' },
];

export function formatINR(n) {
  return `₹${(Number(n) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatInvoiceDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function validateGSTIN(gstin) {
  if (!gstin) return true; // B2C allowed
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(String(gstin).toUpperCase());
}

export function calcLine(item) {
  const qty = Number(item.qty) || 0;
  const price = Number(item.sellingPrice) || 0;
  const discount = Number(item.discount) || 0;
  const gstPct = Number(item.gstPct) || 0;
  const taxable = Math.max(0, qty * price - discount);
  const tax = Math.round(taxable * (gstPct / 100) * 100) / 100;
  const amount = Math.round((taxable + tax) * 100) / 100;
  return { taxable, tax, amount };
}

export function calcInvoiceTotals(items = [], placeOfSupplyCode = SELLER_STATE_CODE, cessPct = 0) {
  let subtotal = 0;
  let taxTotal = 0;
  items.forEach((it) => {
    const { taxable, tax } = calcLine(it);
    subtotal += taxable;
    taxTotal += tax;
  });
  subtotal = Math.round(subtotal * 100) / 100;
  taxTotal = Math.round(taxTotal * 100) / 100;
  const cess = Math.round(subtotal * (cessPct / 100) * 100) / 100;
  const beforeRound = subtotal + taxTotal + cess;
  const grand = Math.round(beforeRound);
  const roundOff = Math.round((grand - beforeRound) * 100) / 100;
  const intra = String(placeOfSupplyCode) === String(SELLER_STATE_CODE);
  return {
    subtotal,
    taxTotal,
    cess,
    roundOff,
    grandTotal: grand,
    cgst: intra ? Math.round((taxTotal / 2) * 100) / 100 : 0,
    sgst: intra ? Math.round((taxTotal / 2) * 100) / 100 : 0,
    igst: intra ? 0 : taxTotal,
    intra,
  };
}
