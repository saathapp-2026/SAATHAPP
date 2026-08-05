/**
 * Centralized seller order status, filters, colors, and workflow transitions.
 * Valid transitions only — skipping stages is not allowed.
 */

export const ORDER_STATUS = {
  NEW: 'new',
  ACCEPTED: 'accepted',
  PREPARING: 'preparing',
  PACKED: 'packed',
  READY: 'ready',
  PICKUP_ASSIGNED: 'pickup_assigned',
  AGENT_ACCEPTED: 'agent_accepted',
  AGENT_REACHED_STORE: 'agent_reached_store',
  HANDOVER: 'handover',
  PICKED_UP: 'picked_up',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  REACHED_CUSTOMER: 'reached_customer',
  OTP_VERIFICATION: 'otp_verification',
  DELIVERED: 'delivered',
  PAYMENT_SETTLEMENT: 'payment_settlement',
  INVOICE_GENERATED: 'invoice_generated',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
};

export const STATUS_LABELS = {
  [ORDER_STATUS.NEW]: 'New',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.PACKED]: 'Packed',
  [ORDER_STATUS.READY]: 'Ready',
  [ORDER_STATUS.PICKUP_ASSIGNED]: 'Pickup Assigned',
  [ORDER_STATUS.AGENT_ACCEPTED]: 'Agent Accepted',
  [ORDER_STATUS.AGENT_REACHED_STORE]: 'Agent Reached Store',
  [ORDER_STATUS.HANDOVER]: 'Handover',
  [ORDER_STATUS.PICKED_UP]: 'Picked Up',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.REACHED_CUSTOMER]: 'Reached Customer',
  [ORDER_STATUS.OTP_VERIFICATION]: 'OTP Verification',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.PAYMENT_SETTLEMENT]: 'Payment Settlement',
  [ORDER_STATUS.INVOICE_GENERATED]: 'Invoice Generated',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.REJECTED]: 'Rejected',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.REFUNDED]: 'Refunded',
};

/** Step 20 — Professional status colors */
export const STATUS_COLORS = {
  [ORDER_STATUS.NEW]: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    label: '🟣',
  },
  [ORDER_STATUS.ACCEPTED]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
    label: '🔵',
  },
  [ORDER_STATUS.PREPARING]: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
    dot: 'bg-indigo-500',
    label: '🔵',
  },
  [ORDER_STATUS.PACKED]: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    label: '🟣',
  },
  [ORDER_STATUS.READY]: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    dot: 'bg-orange-500',
    label: '🟠',
  },
  [ORDER_STATUS.PICKUP_ASSIGNED]: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-300',
    dot: 'bg-cyan-500',
    label: '🚚',
  },
  [ORDER_STATUS.AGENT_ACCEPTED]: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-300',
    dot: 'bg-cyan-500',
    label: '🚚',
  },
  [ORDER_STATUS.AGENT_REACHED_STORE]: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    dot: 'bg-teal-500',
    label: '🚚',
  },
  [ORDER_STATUS.HANDOVER]: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    dot: 'bg-teal-500',
    label: '🟢',
  },
  [ORDER_STATUS.PICKED_UP]: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    label: '🟢',
  },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: {
    bg: 'bg-sky-100 dark:bg-sky-900/30',
    text: 'text-sky-700 dark:text-sky-300',
    dot: 'bg-sky-500',
    label: '🚚',
  },
  [ORDER_STATUS.REACHED_CUSTOMER]: {
    bg: 'bg-sky-100 dark:bg-sky-900/30',
    text: 'text-sky-700 dark:text-sky-300',
    dot: 'bg-sky-500',
    label: '🚚',
  },
  [ORDER_STATUS.OTP_VERIFICATION]: {
    bg: 'bg-sky-100 dark:bg-sky-900/30',
    text: 'text-sky-700 dark:text-sky-300',
    dot: 'bg-sky-500',
    label: '✅',
  },
  [ORDER_STATUS.DELIVERED]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    dot: 'bg-green-500',
    label: '✅',
  },
  [ORDER_STATUS.PAYMENT_SETTLEMENT]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    dot: 'bg-green-500',
    label: '💳',
  },
  [ORDER_STATUS.INVOICE_GENERATED]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    dot: 'bg-green-500',
    label: '📄',
  },
  [ORDER_STATUS.CANCELLED]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
    label: '🔴',
  },
  [ORDER_STATUS.REJECTED]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
    label: '❌',
  },
  [ORDER_STATUS.RETURNED]: {
    bg: 'bg-slate-200 dark:bg-slate-700',
    text: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-500',
    label: '⚫',
  },
  [ORDER_STATUS.REFUNDED]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
    label: '🔵',
  },
};

/** Step 6 — Valid status transitions (no skipping) */
export const STATUS_TRANSITIONS = {
  [ORDER_STATUS.NEW]: [ORDER_STATUS.ACCEPTED, ORDER_STATUS.REJECTED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.ACCEPTED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.PACKED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PACKED]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.READY]: [ORDER_STATUS.PICKUP_ASSIGNED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PICKUP_ASSIGNED]: [ORDER_STATUS.AGENT_ACCEPTED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.AGENT_ACCEPTED]: [ORDER_STATUS.AGENT_REACHED_STORE],
  [ORDER_STATUS.AGENT_REACHED_STORE]: [ORDER_STATUS.HANDOVER],
  [ORDER_STATUS.HANDOVER]: [ORDER_STATUS.PICKED_UP],
  [ORDER_STATUS.PICKED_UP]: [ORDER_STATUS.OUT_FOR_DELIVERY],
  [ORDER_STATUS.OUT_FOR_DELIVERY]: [ORDER_STATUS.REACHED_CUSTOMER],
  [ORDER_STATUS.REACHED_CUSTOMER]: [ORDER_STATUS.OTP_VERIFICATION],
  [ORDER_STATUS.OTP_VERIFICATION]: [ORDER_STATUS.DELIVERED],
  [ORDER_STATUS.DELIVERED]: [ORDER_STATUS.PAYMENT_SETTLEMENT, ORDER_STATUS.RETURNED],
  [ORDER_STATUS.PAYMENT_SETTLEMENT]: [ORDER_STATUS.INVOICE_GENERATED],
  [ORDER_STATUS.INVOICE_GENERATED]: [],
  [ORDER_STATUS.CANCELLED]: [],
  [ORDER_STATUS.REJECTED]: [],
  [ORDER_STATUS.RETURNED]: [ORDER_STATUS.REFUNDED],
  [ORDER_STATUS.REFUNDED]: [],
};

export function canTransition(from, to) {
  return (STATUS_TRANSITIONS[from] || []).includes(to);
}

export const DATE_FILTERS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'last_7', label: 'Last 7 Days' },
  { id: 'last_30', label: 'Last 30 Days' },
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'custom', label: 'Custom Date Range' },
];

export const STATUS_FILTER_OPTIONS = [
  { id: ORDER_STATUS.NEW, label: 'New' },
  { id: ORDER_STATUS.ACCEPTED, label: 'Accepted' },
  { id: ORDER_STATUS.PREPARING, label: 'Preparing' },
  { id: ORDER_STATUS.PACKED, label: 'Packed' },
  { id: ORDER_STATUS.READY, label: 'Ready' },
  { id: ORDER_STATUS.PICKUP_ASSIGNED, label: 'Pickup Assigned' },
  { id: ORDER_STATUS.PICKED_UP, label: 'Picked Up' },
  { id: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
  { id: ORDER_STATUS.DELIVERED, label: 'Delivered' },
  { id: ORDER_STATUS.CANCELLED, label: 'Cancelled' },
  { id: ORDER_STATUS.RETURNED, label: 'Returned' },
  { id: ORDER_STATUS.REFUNDED, label: 'Refunded' },
];

export const PAYMENT_FILTERS = [
  { id: 'cod', label: 'COD' },
  { id: 'online', label: 'Online' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'upi', label: 'UPI' },
  { id: 'credit_card', label: 'Credit Card' },
  { id: 'debit_card', label: 'Debit Card' },
];

export const DELIVERY_FILTERS = [
  { id: 'self', label: 'Self Delivery' },
  { id: 'saath', label: 'Saath Delivery' },
  { id: 'courier', label: 'Courier Partner' },
];

export const OTHER_FILTERS = [
  { id: 'high_value', label: 'High Value Orders' },
  { id: 'express', label: 'Express Delivery' },
  { id: 'late', label: 'Late Orders' },
  { id: 'priority', label: 'Priority Orders' },
  { id: 'repeat', label: 'Repeat Customers' },
];

export const CANCEL_REASONS = [
  'Customer Requested',
  'Seller Requested',
  'Auto Cancelled',
  'Payment Failed',
  'Inventory Issue',
  'Store Closed',
  'Fraud Detection',
  'Duplicate Order',
  'Custom Reason',
];

export const REJECT_REASONS = [
  'Out of Stock',
  'Store Closed',
  'Price Changed',
  'Product Damaged',
  'Area Not Serviceable',
  'Delivery Unavailable',
  'Custom Reason',
];

export const RETURN_STATUS = {
  REQUESTED: 'return_requested',
  REVIEW: 'seller_review',
  APPROVED: 'approve',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PRODUCT_RETURNED: 'product_returned',
  INSPECTION: 'inspection',
  REFUND_APPROVED: 'refund_approved',
  REFUND_COMPLETED: 'refund_completed',
};

export const SUMMARY_CARD_KEYS = [
  'new',
  'accepted',
  'packed',
  'ready',
  'out_for_delivery',
  'delivered_today',
  'cancelled',
  'returned',
  'cod_pending',
  'payment_received',
  'late',
];

export const HIGH_VALUE_THRESHOLD = 2000;
export const ACCEPTANCE_SLA_MS = 15 * 60 * 1000;
export const PACKING_SLA_MS = 30 * 60 * 1000;
export const PICKUP_SLA_MS = 45 * 60 * 1000;
