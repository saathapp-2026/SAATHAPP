import React from 'react';
import { Sparkles, Tag, Award, Megaphone, Calendar, Share2, Plus } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function MarketingTab() {
  const { addToast } = useWholesale();

  const marketingTools = [
    { title: 'Featured Listing Banner', desc: 'Get top placement on SaathApp Wholesale Homepage.', action: 'Create Banner', icon: Sparkles },
    { title: 'Bulk Offer Discounts', desc: 'Create volume discounts e.g. Buy 100 get 10% Extra Off.', action: 'Add Offer', icon: Tag },
    { title: 'Festival Bulk Campaign', desc: 'Participate in Diwali / New Year B2B Supplier Sale.', action: 'Join Sale', icon: Calendar },
    { title: 'Wholesale Discount Coupons', desc: 'Generate custom promo codes for repeat buyers.', action: 'Create Coupon', icon: Award },
    { title: 'Sponsored Search Ads', desc: 'Promote your SKUs when buyers search for categories.', action: 'Launch Ad', icon: Megaphone },
    { title: 'B2B Partner Referral', desc: 'Earn ₹5,000 credit for referring new verified suppliers.', action: 'Get Link', icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Marketing & Growth Tools</h2>
          <p className="text-xs text-slate-500">Boost your wholesale sales, launch bulk promotions, and run targeted B2B campaigns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {marketingTools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div>
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{tool.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tool.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => addToast(`Launched ${tool.title}!`, 'success')}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 py-2.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition"
              >
                {tool.action}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
