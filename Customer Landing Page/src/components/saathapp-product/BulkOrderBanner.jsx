import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function BulkOrderBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-800/40 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center shrink-0">
          <Package size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">Bulk & Corporate Orders</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Get special pricing for bulk orders, events, employee kits and corporate gifting.
          </p>
        </div>
      </div>
      <button 
        onClick={() => navigate('/saathapp-products/bulk-orders')}
        className="shrink-0 px-6 py-2.5 rounded-xl border border-green-600 text-green-700 dark:text-green-400 font-bold hover:bg-green-600 hover:text-white transition-colors"
      >
        Request a Quote
      </button>
    </div>
  );
}
