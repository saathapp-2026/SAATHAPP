import React from 'react';
import { LayoutTemplate, Search, ListTree, Package, Store, BadgeCheck, PartyPopper, Zap, Check } from 'lucide-react';

const AD_TYPES = [
  { id: 'homepage_banner', icon: LayoutTemplate, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Homepage Banner', desc: 'Show banner on homepage' },
  { id: 'search_top', icon: Search, color: 'text-purple-500', bg: 'bg-purple-50', title: 'Search Result Top', desc: 'Show at top of search results' },
  { id: 'category_banner', icon: ListTree, color: 'text-orange-500', bg: 'bg-orange-50', title: 'Category Banner', desc: 'Show in category pages' },
  { id: 'product_promo', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Product Promotion', desc: 'Promote specific products' },
  { id: 'store_promo', icon: Store, color: 'text-pink-500', bg: 'bg-pink-50', title: 'Store Promotion', desc: 'Promote your store' },
  { id: 'featured_store', icon: BadgeCheck, color: 'text-indigo-500', bg: 'bg-indigo-50', title: 'Featured Store', desc: 'Get featured store badge' },
  { id: 'festival_promo', icon: PartyPopper, color: 'text-rose-500', bg: 'bg-rose-50', title: 'Festival Campaign', desc: 'Special festival promotion' },
  { id: 'flash_sale', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', title: 'Flash Sale Promotion', desc: 'Limited time promotion' },
];

export default function AdSelectionSection({ draft, updateDraft }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">1. Choose Advertisement Type</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AD_TYPES.map((type) => {
          const isSelected = draft.typeId === type.id;
          return (
            <button
              key={type.id}
              onClick={() => updateDraft({ typeId: type.id })}
              className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 bg-white ${
                isSelected 
                  ? 'border-[#15803D] shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Custom Radio Button */}
              <div className="absolute top-4 left-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-[#15803D] bg-[#15803D]' : 'border-slate-300'
                }`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${type.bg}`}>
                <type.icon size={28} className={type.color} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{type.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{type.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
