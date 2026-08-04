import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '../../../config/seller/orderConstants';

export default function OrderStatusBadge({ status, compact = false }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.returned;
  const label = STATUS_LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${colors.bg} ${colors.text} ${
        compact ? 'text-[10px] uppercase tracking-wide' : 'text-xs'
      }`}
      title={label}
    >
      {!compact && <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />}
      {compact ? label.toUpperCase() : label}
    </span>
  );
}
