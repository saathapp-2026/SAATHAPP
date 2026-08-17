import React from 'react';
import { ShoppingBag, Package, Truck, ShieldCheck, Zap, ArrowRight, HeartPulse, Coffee, Apple, Flower2, FileText, Building, Warehouse } from 'lucide-react';

export const HYPERLOCAL_CATEGORIES = [
  { name: 'Grocery Delivery', desc: 'Deliver daily essential groceries & staples', icon: ShoppingBag },
  { name: 'Food & Restaurant', desc: 'Hot meals & fast food deliveries', icon: Coffee },
  { name: 'Medicine & Healthcare', desc: 'Pharmacy & medical supply orders', icon: HeartPulse },
  { name: 'Milk & Dairy', desc: 'Morning fresh milk & dairy distribution', icon: Zap },
  { name: 'Bakery & Snacks', desc: 'Cakes, breads & fresh confectionery', icon: Coffee },
  { name: 'Fruits & Vegetables', desc: 'Farm fresh produce & organic items', icon: Apple },
  { name: 'Flower Delivery', desc: 'Floral bouquets & occasion gifts', icon: Flower2 },
];

export const PARCEL_CATEGORIES = [
  { name: 'Parcel & Package', desc: 'Express parcel delivery for local items', icon: Package },
  { name: 'Document Delivery', desc: 'Confidential paper & legal docs', icon: FileText },
  { name: 'Courier Services', desc: 'City-wide courier fulfillment', icon: Truck },
  { name: 'E-commerce Delivery', desc: 'Last-mile online shopping dispatch', icon: ShoppingBag },
  { name: 'Business B2B Logistics', desc: 'Bulk supply to local retail stores', icon: Building },
  { name: 'Warehouse Transfer', desc: 'Hub-to-hub inventory movement', icon: Warehouse },
];

export const VEHICLE_TYPES = [
  { name: 'Walking Delivery', badge: 'No Vehicle Needed' },
  { name: 'Bicycle Delivery', badge: 'Eco-Friendly' },
  { name: 'Electric Bicycle', badge: 'Fast & Green' },
  { name: 'Motorcycle / Scooter', badge: 'High Order Volume' },
  { name: 'Electric Scooter', badge: 'Low Fuel Cost' },
  { name: 'Three-Wheeler', badge: 'Bulk Logistics' },
  { name: 'Small Commercial Vehicle', badge: 'Cargo & Heavy Loads' },
];

export default function DeliveryCategoriesSection({ onStartRegistration }) {
  return (
    <section id="categories-covered" aria-labelledby="categories-heading" className="py-20 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Package size={16} /> Wide Delivery Spectrum
          </div>
          <h2 id="categories-heading" className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Delivery Categories & Vehicle Options Covered
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
            Deliver everything from instant groceries and hot food to express parcels and B2B store inventory.
          </p>
        </div>

        {/* Hyperlocal Grid */}
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" /> Hyperlocal Deliveries
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HYPERLOCAL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{cat.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parcel & Logistics Grid */}
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" /> Parcel & Express Logistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARCEL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{cat.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vehicle Types Banner */}
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950 p-8 text-white">
          <h3 className="text-xl font-black text-amber-400">Supported Vehicle Types for Riders</h3>
          <p className="text-xs text-slate-300 mt-1 font-medium max-w-2xl">
            Choose your preferred vehicle mode. Walk, ride a bicycle, EV, motorcycle, or commercial vehicle.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {VEHICLE_TYPES.map((v, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 flex items-center gap-2.5"
              >
                <Truck size={16} className="text-amber-400" />
                <span className="text-xs font-bold text-white">{v.name}</span>
                <span className="text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                  {v.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={onStartRegistration}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 text-xs font-black shadow-lg transition hover:scale-105"
            >
              Apply as Rider Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
