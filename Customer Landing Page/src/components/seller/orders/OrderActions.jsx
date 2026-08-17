import React from 'react';
import {
  Check,
  X,
  Ban,
  ChefHat,
  Package,
  PackageCheck,
  Truck,
  Printer,
  Tag,
  Barcode,
  QrCode,
  FileText,
  ClipboardList,
  Phone,
  MessageCircle,
  MessageSquare,
  MapPin,
  Eye,
  RotateCcw,
  RefreshCw,
  Navigation,
  MoreHorizontal,
} from 'lucide-react';
import { ORDER_STATUS, canTransition } from '../../../config/seller/orderConstants';

const ACTION_DEFS = [
  { id: 'accept', label: 'Accept', icon: Check, needs: (o) => canTransition(o.status, ORDER_STATUS.ACCEPTED) },
  { id: 'reject', label: 'Reject', icon: X, needs: (o) => canTransition(o.status, ORDER_STATUS.REJECTED) },
  { id: 'cancel', label: 'Cancel', icon: Ban, needs: (o) => canTransition(o.status, ORDER_STATUS.CANCELLED) },
  { id: 'preparing', label: 'Preparing', icon: ChefHat, needs: (o) => canTransition(o.status, ORDER_STATUS.PREPARING) },
  { id: 'packed', label: 'Mark Packed', icon: Package, needs: (o) => canTransition(o.status, ORDER_STATUS.PACKED) },
  { id: 'ready', label: 'Ready for Pickup', icon: PackageCheck, needs: (o) => canTransition(o.status, ORDER_STATUS.READY) },
  { id: 'assign', label: 'Assign Delivery', icon: Truck, needs: (o) => canTransition(o.status, ORDER_STATUS.PICKUP_ASSIGNED) },
  { id: 'handover', label: 'Handover Package', icon: PackageCheck, needs: (o) => ['pickup_assigned', 'agent_accepted', 'agent_reached_store', 'handover'].includes(o.status) },
  { id: 'print_invoice', label: 'Print Invoice', icon: Printer, needs: () => true },
  { id: 'print_label', label: 'Print Shipping Label', icon: Tag, needs: () => true },
  { id: 'print_barcode', label: 'Print Barcode', icon: Barcode, needs: () => true },
  { id: 'print_qr', label: 'Print QR', icon: QrCode, needs: () => true },
  { id: 'gst_invoice', label: 'Download GST Invoice', icon: FileText, needs: () => true },
  { id: 'packing_slip', label: 'Packing Slip', icon: ClipboardList, needs: () => true },
  { id: 'call', label: 'Call Customer', icon: Phone, needs: () => true },
  { id: 'chat', label: 'Chat Customer', icon: MessageCircle, needs: () => true },
  { id: 'whatsapp', label: 'WhatsApp Customer', icon: MessageSquare, needs: () => true },
  { id: 'directions', label: 'Directions', icon: MapPin, needs: () => true },
  { id: 'details', label: 'View Details', icon: Eye, needs: () => true },
  { id: 'refund', label: 'Refund', icon: RotateCcw, needs: (o) => [ORDER_STATUS.DELIVERED, ORDER_STATUS.RETURNED].includes(o.status) },
  { id: 'replace', label: 'Replace', icon: RefreshCw, needs: (o) => [ORDER_STATUS.DELIVERED, ORDER_STATUS.RETURNED].includes(o.status) },
  { id: 'track', label: 'Track Delivery', icon: Navigation, needs: (o) => !!o.agent || ['out_for_delivery', 'picked_up', 'pickup_assigned'].includes(o.status) },
  { id: 'timeline', label: 'View Timeline', icon: Eye, needs: () => true },
];

export function getAvailableActions(order, { compact = false } = {}) {
  const actions = ACTION_DEFS.filter((a) => a.needs(order));
  if (!compact) return actions;
  const priority = ['accept', 'reject', 'preparing', 'packed', 'ready', 'assign', 'handover', 'details'];
  return actions.filter((a) => priority.includes(a.id)).slice(0, 4);
}

export default function OrderActions({
  order,
  onAction,
  loadingAction,
  compact = false,
  showAll = false,
}) {
  const [open, setOpen] = React.useState(false);
  const primary = getAvailableActions(order, { compact: true });
  const all = getAvailableActions(order);
  const rest = all.filter((a) => !primary.find((p) => p.id === a.id));

  const renderBtn = (action, variant = 'ghost') => {
    const Icon = action.icon;
    const loading = loadingAction === `${order.id}:${action.id}`;
    return (
      <button
        key={action.id}
        type="button"
        disabled={!!loadingAction}
        onClick={() => onAction?.(action.id, order)}
        title={action.label}
        aria-label={action.label}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 ${
          variant === 'primary'
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : variant === 'danger'
              ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400'
              : 'border border-slate-200 hover:bg-page text-slate-700 dark:text-slate-300'
        }`}
      >
        <Icon size={12} aria-hidden="true" />
        {loading ? '…' : compact ? null : action.label}
        {compact ? <span className="sr-only">{action.label}</span> : null}
      </button>
    );
  };

  return (
    <div className="relative flex flex-wrap items-center gap-1">
      {primary.map((a) =>
        renderBtn(a, a.id === 'accept' ? 'primary' : a.id === 'reject' || a.id === 'cancel' ? 'danger' : 'ghost')
      )}
      {(showAll ? all : rest).length > 0 && !showAll && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-1 rounded-lg border border-slate-200 hover:bg-page"
            aria-label="More actions"
            aria-expanded={open}
          >
            <MoreHorizontal size={14} />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-1 z-20 w-52 rounded-xl border border-slate-200 bg-surface shadow-lg p-1 max-h-64 overflow-y-auto">
              {rest.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  disabled={!!loadingAction}
                  onClick={() => {
                    setOpen(false);
                    onAction?.(a.id, order);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left hover:bg-page"
                >
                  <a.icon size={12} />
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      {showAll && all.map((a) => renderBtn(a, a.id === 'accept' ? 'primary' : a.id === 'reject' || a.id === 'cancel' ? 'danger' : 'ghost'))}
    </div>
  );
}
