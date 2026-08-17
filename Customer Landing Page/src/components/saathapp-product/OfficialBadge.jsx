import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function OfficialBadge({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-green-200 dark:border-green-500/20 ${className}`}>
      <ShieldCheck size={14} />
      SAATHAPP OFFICIAL
    </div>
  );
}
