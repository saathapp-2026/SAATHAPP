import React from 'react';
import { Shirt, ShieldCheck, ShoppingBag, Truck, Gift, Info } from 'lucide-react';

export const EQUIPMENT_CATALOGUE = [
  { name: 'Branded Delivery T-Shirt', price: '₹499', category: 'Uniform & Apparel', icon: Shirt },
  { name: 'Reflective Safety Jacket / Vest', price: '₹399', category: 'Safety Equipment', icon: ShieldCheck },
  { name: 'ISI Certified Riding Helmet', price: '₹999', category: 'Safety Equipment', icon: ShieldCheck },
  { name: 'Thermal Insulated Food Delivery Bag', price: '₹1,699', category: 'Delivery Bags', icon: ShoppingBag },
  { name: 'Waterproof Medium Delivery Backpack', price: '₹1,199', category: 'Delivery Bags', icon: ShoppingBag },
  { name: 'Handlebar Mobile Holder & Power Bank', price: '₹799', category: 'Accessories', icon: Truck },
  { name: 'Heavy-Duty Bike Carrier Parcel Box', price: '₹2,499', category: 'Vehicle Hardware', icon: Truck },
  { name: 'Official ID Card & QR Code Badge Set', price: '₹299', category: 'Professional Branding', icon: ShieldCheck },
];

export default function DeliveryEquipmentStoreSection({ onStartRegistration }) {
  return (
    <section id="equipment-store" aria-labelledby="equipment-heading" className="py-20 sm:py-24 bg-page dark:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Gift size={16} /> Optional Gear & Merchandise
          </div>
          <h2 id="equipment-heading" className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Delivery Equipment, Uniforms & Safety Merchandise
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
            All equipment, bags, uniforms, and safety gear are <strong className="text-amber-600 dark:text-amber-400">100% Optional</strong> and available upon request. Equipment rental options are also available.
          </p>
        </div>

        {/* Notice Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-300 font-semibold max-w-4xl mx-auto">
          <Info size={20} className="shrink-0 text-amber-500" />
          <span>
            These items are not included in the mandatory onboarding fee. Delivery Partners can order branding materials, bags, helmets, and uniform sets at any time after registration or request equipment rental.
          </span>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EQUIPMENT_CATALOGUE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{item.category}</span>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">{item.name}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">{item.price}</span>
                  <span className="text-[10px] font-extrabold text-slate-500">Optional Order</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
