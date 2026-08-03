import React, { useState } from 'react';
import { Gift, ShoppingBag, CheckCircle2, QrCode, Printer, Smartphone, Shirt, ShieldCheck, Plus } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function BrandingHardwareStoreTab() {
  const { formData, addToast } = useWholesale();
  const isEligibleForFreeKit = formData.selectedPlan === 'Growth' || formData.selectedPlan === 'Enterprise';

  const [cart, setCart] = useState([]);

  const handleClaimFreeKit = () => {
    addToast('FREE Welcome Business Kit claimed! Shipping to registered warehouse address.', 'success');
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    addToast(`Added ${item.name} to equipment order cart!`, 'success');
  };

  const paidBrandingItems = [
    { name: 'Branded Wholesaler T-Shirts (Pack of 2)', price: 999, category: 'Branding Materials', icon: Shirt },
    { name: 'Official Shop Banner & Flex Hoarding (10x4 ft)', price: 1499, category: 'Branding Materials', icon: ShoppingBag },
    { name: 'Visiting Cards & Letterhead Bundle (500 Pcs)', price: 699, category: 'Branding Materials', icon: QrCode },
    { name: 'Android POS Machine & Billing Terminal', price: 12499, category: 'Hardware', icon: Smartphone },
    { name: 'Wireless 2D Barcode Scanner', price: 2999, category: 'Hardware', icon: QrCode },
    { name: 'Thermal Receipt Bluetooth Printer', price: 4499, category: 'Hardware', icon: Printer },
    { name: 'Custom Packaging Boxes & Product Labels (1000 Pcs)', price: 2499, category: 'Packaging', icon: ShoppingBag },
    { name: 'Coffee Mugs & Water Bottle Merchandise Set', price: 599, category: 'Merchandise', icon: Gift },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Business Branding & Hardware Store</h2>
          <p className="text-xs text-slate-500">Order offline branding materials, QR code stands, POS terminals, and barcode printers.</p>
        </div>
      </div>

      {/* Complimentary Welcome Kit Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A8F3D] via-emerald-800 to-slate-900 p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-200">
            <Gift size={14} /> Complimentary Welcome Business Kit
          </div>
          <h3 className="text-xl font-black">
            {isEligibleForFreeKit ? 'Claim Your FREE Business Kit!' : 'Upgrade to Growth Plan for FREE Business Kit'}
          </h3>
          <p className="text-xs text-emerald-100 max-w-xl">
            Includes QR Code Stand, Shop Sticker, Wholesaler Certificate, ID Card, Logo Badge, and Digital Profile Setup (Free for Growth ₹2,499 & Enterprise ₹4,999 members).
          </p>
        </div>

        {isEligibleForFreeKit ? (
          <button
            type="button"
            onClick={handleClaimFreeKit}
            className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100 px-6 py-3 text-xs font-black shadow-lg transition shrink-0"
          >
            Claim FREE Kit Now
          </button>
        ) : (
          <span className="text-xs font-bold text-amber-200 bg-black/30 px-4 py-2 rounded-xl border border-white/10">
            Available on Growth & Enterprise Plans
          </span>
        )}
      </div>

      {/* Paid Branding & Hardware Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paidBrandingItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div>
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400">{item.category}</span>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">{item.name}</h4>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-2">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition"
              >
                <Plus size={14} /> Add to Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
