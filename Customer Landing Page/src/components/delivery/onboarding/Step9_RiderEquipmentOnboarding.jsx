import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, ShieldCheck, ShoppingBag, Truck, Gift, Check, ArrowRight, ArrowLeft, Info, Plus } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const RIDER_EQUIPMENT_ITEMS = [
  { id: 'tshirt', name: 'Branded Delivery T-Shirt (Pack of 2)', price: 499, category: 'Uniform', icon: Shirt },
  { id: 'vest', name: 'Reflective High-Vis Safety Vest', price: 399, category: 'Safety Gear', icon: ShieldCheck },
  { id: 'helmet', name: 'ISI Certified Safety Riding Helmet', price: 999, category: 'Safety Gear', icon: ShieldCheck },
  { id: 'thermal_bag', name: 'Thermal Insulated Food Delivery Bag', price: 1699, category: 'Bags', icon: ShoppingBag },
  { id: 'waterproof_bag', name: 'Waterproof Medium Delivery Backpack', price: 1199, category: 'Bags', icon: ShoppingBag },
  { id: 'phone_mount', name: 'Handlebar Mobile Phone Mount & Charger', price: 799, category: 'Accessories', icon: Truck },
];

export default function Step9_RiderEquipmentOnboarding({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();
  const [selectedItems, setSelectedItems] = useState(formData.orderedEquipment || ['Branded Delivery T-Shirt', 'Reflective High-Vis Safety Vest']);

  const toggleItem = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((i) => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
      addToast(`Added ${itemName} to optional equipment order`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ orderedEquipment: selectedItems });
    addToast('Optional equipment selection saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 9 — Optional Equipment & Gear
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Rider Uniforms, Safety Gear & Bags
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Equipment is <strong className="text-amber-600 dark:text-amber-400">100% Optional</strong>. Select items now or skip to proceed to Terms.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200 font-semibold">
          <Info size={18} className="shrink-0 text-amber-500" />
          <span>
            These items are supplied on-demand and delivered to your registered address after account verification. Equipment rental is also available.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Equipment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RIDER_EQUIPMENT_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedItems.includes(item.name);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.name)}
                  className={`cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400">{item.category}</span>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">{item.name}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-500">
                      {isSelected ? 'Selected' : '+ Add'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 mt-6">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
            >
              Continue to Terms & Agreement
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
