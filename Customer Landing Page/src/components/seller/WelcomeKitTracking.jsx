import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, Hash, RefreshCw } from 'lucide-react';
import { isWelcomeKitEligible, advanceWelcomeKitStatus } from '../../services/sellerMembershipService';

const STATUS_STEPS = ['preparing', 'packed', 'shipped', 'delivered'];
const STATUS_LABELS = {
  preparing: 'Preparing',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export default function WelcomeKitTracking({ membership, onUpdate }) {
  const [advancing, setAdvancing] = useState(false);

  if (!membership?.welcomeKit || !isWelcomeKitEligible(membership.planId)) {
    return null;
  }

  const kit = membership.welcomeKit;
  const currentIndex = STATUS_STEPS.indexOf(kit.status);
  const isDelivered = kit.status === 'delivered';

  const handleAdvance = async () => {
    setAdvancing(true);
    try {
      const result = await advanceWelcomeKitStatus();
      if (result.success && onUpdate) {
        onUpdate(result.membership);
      }
    } finally {
      setAdvancing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-amber-500" />
          <h3 className="font-bold text-lg">Welcome Kit Status</h3>
        </div>
        {!isDelivered && (
          <button
            type="button"
            onClick={handleAdvance}
            disabled={advancing}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-medium hover:bg-amber-500/20 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={12} className={advancing ? 'animate-spin' : ''} />
            {advancing ? 'Updating...' : 'Simulate Next Step'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        {STATUS_STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i <= currentIndex
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {i < currentIndex ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] font-medium text-center ${i <= currentIndex ? 'text-amber-600' : 'text-slate-400'}`}>
                {STATUS_LABELS[step]}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-1 mb-4 rounded-full transition-colors ${i < currentIndex ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <Hash size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-slate-500">Tracking Number</p>
            <p className="font-mono font-medium">
              {kit.trackingNumber || 'Assigned when shipped'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-slate-500">Shipping Address</p>
            <p className="font-medium">{kit.shippingAddress || '—'}</p>
          </div>
        </div>
      </div>

      {kit.status === 'preparing' && (
        <p className="text-sm text-slate-500 mt-4 flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <Truck size={16} className="text-amber-500" />
          Your complimentary Welcome Business Kit is being prepared. Use &quot;Simulate Next Step&quot; to preview tracking updates.
        </p>
      )}

      {isDelivered && (
        <p className="text-sm text-emerald-600 mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          ✓ Welcome kit delivered! Enjoy your premium branding materials.
        </p>
      )}
    </motion.div>
  );
}
