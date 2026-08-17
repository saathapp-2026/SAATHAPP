import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { CANCEL_REASONS, REJECT_REASONS } from '../../../config/seller/orderConstants';

export function ReasonDialog({
  open,
  mode = 'cancel',
  loading,
  onConfirm,
  onCancel,
}) {
  const reasons = mode === 'reject' ? REJECT_REASONS : CANCEL_REASONS;
  const [reason, setReason] = useState(reasons[0]);
  const [customReason, setCustomReason] = useState('');

  if (!open) return null;

  return (
    <ConfirmDialog
      open={open}
      title={mode === 'reject' ? 'Reject Order' : 'Cancel Order'}
      message={mode === 'reject' ? 'Select a rejection reason. This is saved permanently.' : 'Select a cancellation reason. History will be recorded.'}
      confirmLabel={mode === 'reject' ? 'Reject Order' : 'Cancel Order'}
      danger
      loading={loading}
      onCancel={onCancel}
      onConfirm={() => onConfirm({ reason, customReason: reason === 'Custom Reason' ? customReason : '' })}
    >
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Reason
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 bg-page dark:bg-slate-950 text-sm"
          >
            {reasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        {reason === 'Custom Reason' && (
          <label className="block text-sm font-medium">
            Custom details
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 bg-page dark:bg-slate-950 text-sm"
              placeholder="Describe the reason…"
            />
          </label>
        )}
      </div>
    </ConfirmDialog>
  );
}
