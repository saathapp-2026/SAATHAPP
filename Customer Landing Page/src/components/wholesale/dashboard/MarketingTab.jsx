import React, { useState } from 'react';
import { Sparkles, Tag, Award, Megaphone, Calendar, Share2, Plus, Layers, DollarSign, Check } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const MARKETING_SUB_TABS = [
  'Overview',
  'Offers',
  'Bulk Discounts',
  'Promotions',
  'Campaigns',
];

export default function MarketingTab() {
  const { addToast } = useWholesale();
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  const marketingTools = [
    { title: 'Bulk Tier Discounts', desc: 'Create volume discounts e.g. Buy 100+ units get 10% Extra Off.', action: 'Configure Tiers', icon: Tag },
    { title: 'Quantity-Based Pricing', desc: 'Set custom tier pricing per unit based on wholesale order volume.', action: 'Set Unit Tiers', icon: Layers },
    { title: 'Targeted Buyer Offers', desc: 'Generate exclusive pricing offers for top retail chain buyers.', action: 'Create Buyer Offer', icon: Award },
    { title: 'Featured Product Promotions', desc: 'Promote your bulk SKUs on SaathApp Wholesale Homepage.', action: 'Promote SKU', icon: Sparkles },
    { title: 'Festival B2B Sale Campaign', desc: 'Participate in Diwali / New Year B2B Supplier Trade Sale.', action: 'Join Campaign', icon: Calendar },
    { title: 'Sponsored Search Ads', desc: 'Promote your SKUs when buyers search for relevant categories.', action: 'Launch Search Ad', icon: Megaphone },
  ];

  return (
    <div className="space-y-6 sa-fade">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Marketing &amp; Offers</h2>
          <p className="text-xs text-slate-500">Configure wholesale volume pricing, quantity-based discounts, buyer offers, and trade promotions.</p>
        </div>
      </div>

      {/* Sub-Tabs Bar (PDF 4.5 Spec) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {MARKETING_SUB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={(e) => {
              setActiveSubTab(tab);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${
              activeSubTab === tab
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Sub-Tab Views */}
      {activeSubTab === 'Offers' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Active Wholesale Offers &amp; B2B Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[].map((o) => (
              <div key={o.code} className="p-5 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">{o.code}</span>
                  <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">{o.badge}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{o.desc}</p>
                <span className="text-[10px] text-slate-400 block pt-2 border-t border-slate-100 dark:border-slate-800">Valid until {o.valid}</span>
              </div>
            ))}
          </div>
          {[].length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400 font-medium bg-surface rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              No active offers or coupons created. Click "+ Create New Campaign" to launch a promotion.
            </div>
          )}
        </div>
      ) : activeSubTab === 'Promotions' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Featured Supplier Banners &amp; Search Placement</h3>
          <div className="p-6 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Top Category Banner Sponsorship</h4>
                <p className="text-slate-500">Promote your SKUs on top of Grocery &amp; Staples category pages.</p>
              </div>
              <button
                type="button"
                onClick={() => addToast?.('Applied for Banner Sponsorship!', 'success')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold cursor-pointer shadow"
              >
                Apply Sponsorship
              </button>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Campaigns' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">WhatsApp &amp; Email Broadcast Campaigns</h3>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-page dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Campaign Name</th>
                  <th className="p-4">Channel</th>
                  <th className="p-4">Recipients</th>
                  <th className="p-4">Open Rate</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {[].map((c) => (
                  <tr key={c.name}>
                    <td className="p-4 font-black">{c.name}</td>
                    <td className="p-4 text-emerald-500 font-bold">{c.ch}</td>
                    <td className="p-4">{c.rec}</td>
                    <td className="p-4 font-mono">{c.rate}</td>
                    <td className="p-4 text-right">
                      <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {/* Wholesale Quantity-Based Tiered Pricing Card (PDF 4.5 Spec Example) */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  📊 Live Wholesale Quantity Pricing Matrix Example
                </span>
                <h3 className="text-base font-extrabold text-white">Tiered Unit Pricing Rules</h3>
              </div>
              <button
                type="button"
                onClick={() => addToast?.('Opening Tier Pricing Rule Editor...', 'info')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow"
              >
                + Create New Pricing Rule
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">Standard Tier (MOQ 1)</span>
                <p className="text-sm font-black text-white">1–49 units</p>
                <span className="text-base font-black text-emerald-400 block pt-1">₹100 / unit</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-amber-400 font-sans uppercase font-extrabold">Volume Tier (5% Off)</span>
                <p className="text-sm font-black text-white">50–99 units</p>
                <span className="text-base font-black text-emerald-400 block pt-1">₹95 / unit</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-1">
                <span className="text-[10px] text-emerald-400 font-sans uppercase font-extrabold">Super Bulk Tier (10% Off)</span>
                <p className="text-sm font-black text-white">100+ units</p>
                <span className="text-base font-black text-emerald-300 block pt-1">₹90 / unit</span>
              </div>
            </div>
          </div>

          {/* Marketing Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {marketingTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
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
                    onClick={() => addToast?.(`Configured ${tool.title}!`, 'success')}
                    className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 py-2.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition cursor-pointer"
                  >
                    {tool.action}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
