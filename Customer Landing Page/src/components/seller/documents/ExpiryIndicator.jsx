import React from 'react';
import { EXPIRY_BADGES } from '../../../config/seller/documentConstants';

export default function ExpiryIndicator({ state = 'none', dateLabel }) {
  const badge = EXPIRY_BADGES[state] || EXPIRY_BADGES.none;
  return (
    <div className="inline-flex flex-col gap-1">
      {dateLabel ? <span className="text-sm text-slate-700 dark:text-slate-200">{dateLabel}</span> : null}
      <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badge.className}`}>
        {badge.label}
      </span>
    </div>
  );
}
