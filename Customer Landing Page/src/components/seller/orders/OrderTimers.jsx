import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

function formatRemaining(ms) {
  if (ms <= 0) return 'Overdue';
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

function TimerChip({ label, deadline }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!deadline) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!deadline) return null;
  const remaining = deadline - now;
  const overdue = remaining <= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tabular-nums ${
        overdue
          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
          : remaining < 5 * 60 * 1000
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
      }`}
      title={`${label}: ${formatRemaining(remaining)}`}
    >
      {overdue ? <AlertTriangle size={10} /> : <Clock size={10} />}
      {label} {formatRemaining(remaining)}
    </span>
  );
}

export default function OrderTimers({ order }) {
  return (
    <div className="flex flex-wrap gap-1">
      <TimerChip label="Accept" deadline={order.acceptanceDeadline && order.status === 'new' ? order.acceptanceDeadline : null} />
      <TimerChip
        label="Pack"
        deadline={
          order.packingDeadline && ['accepted', 'preparing'].includes(order.status)
            ? order.packingDeadline
            : null
        }
      />
      <TimerChip
        label="Pickup"
        deadline={
          order.pickupDeadline && ['ready', 'pickup_assigned', 'agent_accepted', 'agent_reached_store'].includes(order.status)
            ? order.pickupDeadline
            : null
        }
      />
      <TimerChip
        label="ETA"
        deadline={
          order.deliveryEta && ['out_for_delivery', 'picked_up', 'reached_customer'].includes(order.status)
            ? order.deliveryEta
            : null
        }
      />
    </div>
  );
}
