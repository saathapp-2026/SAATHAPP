import React from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, Package, Truck } from 'lucide-react';
import { LOCATION_TIERS, BUSINESS_CATEGORIES } from '../../config/sellerOnboardingConfig';

export default function BusinessSummaryCard({ data }) {
  const tier = LOCATION_TIERS.find((t) => t.id === data.address?.locationTier);
  const category = BUSINESS_CATEGORIES.find((c) => c.id === data.businessInfo?.category);

  const items = [
    { icon: Store, label: 'Store Name', value: data.businessInfo?.storeName || '—' },
    { icon: Package, label: 'Category', value: category?.label || '—' },
    { icon: MapPin, label: 'Location', value: `${data.address?.city || '—'}, ${tier?.label || '—'}` },
    { icon: Truck, label: 'Delivery Radius', value: `${data.delivery?.radius || '0-5'} km` },
    { icon: Package, label: 'Products', value: data.businessInfo?.productCount || '—' },
    { icon: Store, label: 'Store Size', value: data.businessInfo?.storeSize || '—' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl bg-surface/5 backdrop-blur border border-white/10 p-6"
    >
      <h3 className="font-semibold text-lg mb-4">Business Summary</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm font-medium capitalize">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
