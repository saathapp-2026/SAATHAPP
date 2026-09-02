import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, HeadphonesIcon } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: 'Official SaathApp Quality', subtitle: 'Every product is quality checked' },
    { icon: Truck, title: 'Fast & Reliable Delivery', subtitle: 'On-time delivery across India' },
    { icon: RotateCcw, title: 'Easy Returns', subtitle: '7 day easy return policy' },
    { icon: CreditCard, title: 'Secure Payments', subtitle: 'Multiple safe payment options' },
    { icon: HeadphonesIcon, title: 'Customer Support', subtitle: "We're here to help you 24x7" },
  ];

  return (
    <div className="w-full bg-surface border border-theme-border rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="text-primary dark:text-primary-light">
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">{badge.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{badge.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-around items-center gap-4 text-slate-600 dark:text-slate-400 text-sm font-semibold">
        <div className="flex items-center gap-2"><ShieldCheck size={18} /> 100% Original Products</div>
        <div className="flex items-center gap-2"><span className="text-lg">1L+</span> Happy Customers</div>
        <div className="flex items-center gap-2"><span className="text-lg">500+</span> Products</div>
        <div className="flex items-center gap-2"><span className="text-lg">4.8★</span> Average Rating</div>
        <div className="flex items-center gap-2"><span className="text-lg">Pan India</span> Delivery Network</div>
      </div>
    </div>
  );
}
