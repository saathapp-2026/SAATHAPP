import React from 'react';
import { Check } from 'lucide-react';
import { ORDER_STATUS, STATUS_LABELS } from '../../../config/seller/orderConstants';

const STEPPER_STEPS = [
  { status: ORDER_STATUS.NEW, label: 'Order Placed' },
  { status: ORDER_STATUS.ACCEPTED, label: 'Accepted' },
  { status: ORDER_STATUS.PACKED, label: 'Packed' },
  { status: ORDER_STATUS.READY, label: 'Ready for Pickup' },
  { status: ORDER_STATUS.PICKED_UP, label: 'Picked Up' },
  { status: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
  { status: ORDER_STATUS.DELIVERED, label: 'Delivered' },
];

const FLOW_ORDER = [
  ORDER_STATUS.NEW,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.PACKED,
  ORDER_STATUS.READY,
  ORDER_STATUS.PICKUP_ASSIGNED,
  ORDER_STATUS.AGENT_ACCEPTED,
  ORDER_STATUS.AGENT_REACHED_STORE,
  ORDER_STATUS.HANDOVER,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.REACHED_CUSTOMER,
  ORDER_STATUS.OTP_VERIFICATION,
  ORDER_STATUS.DELIVERED,
];

function stepReached(currentStatus, stepStatus, timeline = []) {
  if (timeline.some((t) => t.status === stepStatus)) return true;
  const curIdx = FLOW_ORDER.indexOf(currentStatus);
  const stepIdx = FLOW_ORDER.indexOf(stepStatus);
  if (curIdx < 0 || stepIdx < 0) return false;
  // Map preparing->accepted, pickup_assigned etc to ready/picked for stepper
  const normalized = {
    [ORDER_STATUS.PREPARING]: ORDER_STATUS.ACCEPTED,
    [ORDER_STATUS.PICKUP_ASSIGNED]: ORDER_STATUS.READY,
    [ORDER_STATUS.AGENT_ACCEPTED]: ORDER_STATUS.READY,
    [ORDER_STATUS.AGENT_REACHED_STORE]: ORDER_STATUS.READY,
    [ORDER_STATUS.HANDOVER]: ORDER_STATUS.PICKED_UP,
    [ORDER_STATUS.REACHED_CUSTOMER]: ORDER_STATUS.OUT_FOR_DELIVERY,
    [ORDER_STATUS.OTP_VERIFICATION]: ORDER_STATUS.OUT_FOR_DELIVERY,
  };
  const normCur = FLOW_ORDER.indexOf(normalized[currentStatus] || currentStatus);
  return normCur >= stepIdx;
}

export default function OrderTimeline({ timeline = [], currentStatus, variant = 'full' }) {
  if (variant === 'stepper') {
    return (
      <ol className="space-y-0" aria-label="Order progress">
        {STEPPER_STEPS.map((step, i) => {
          const done = stepReached(currentStatus, step.status, timeline);
          const event = timeline.find((t) => t.status === step.status)
            || (step.status === ORDER_STATUS.NEW ? timeline[0] : null);
          const isLast = i === STEPPER_STEPS.length - 1;
          return (
            <li key={step.status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {done ? <Check size={12} strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                {!isLast && (
                  <span className={`w-0.5 flex-1 min-h-[20px] ${done ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
                )}
              </div>
              <div className={`pb-4 ${done ? '' : 'opacity-50'}`}>
                <p className={`text-sm font-semibold ${done ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
                  {step.label}
                </p>
                {event && (
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {new Date(event.at).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {event.actor ? ` · ${event.actor}` : ''}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  if (!timeline.length) {
    return <p className="text-sm text-slate-500">No timeline events yet.</p>;
  }

  const sorted = [...timeline].sort((a, b) => a.at - b.at);

  return (
    <ol className="relative space-y-0 border-l-2 border-slate-200 dark:border-slate-700 ml-3" aria-label="Order timeline">
      {sorted.map((event, i) => {
        const dt = new Date(event.at);
        return (
          <li key={event.id || `${event.status}-${i}`} className="relative pl-6 pb-5 last:pb-0">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
            <p className="font-semibold text-sm">{event.label || STATUS_LABELS[event.status] || event.status}</p>
            <p className="text-[11px] text-slate-400">
              {dt.toLocaleDateString('en-IN')} · {dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · {event.actor}
            </p>
            {event.remarks && <p className="text-xs mt-1 text-slate-600 dark:text-slate-300">{event.remarks}</p>}
          </li>
        );
      })}
    </ol>
  );
}
