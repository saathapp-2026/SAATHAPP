import React from 'react';
import { Check, ShieldCheck, Phone, Mail, Clock, HeadphonesIcon, Copy, Sparkles } from 'lucide-react';
import { formatINR } from '../../../config/seller/adConstants';
import { calculateAdvertisingPrice, ADVERTISER_CATEGORIES } from '../../../services/advertisingPricingEngine';

const BENEFITS = [
  'Unlimited Clicks & Impressions',
  'Location & Category Tier Rates',
  'No Hidden Charges or Fees',
  'Duration Multiplier Discounts',
  'Targeted Local Reach',
  'Real-Time Analytics & Performance'
];

function getDurationLabel(days) {
  const d = Number(days) || 5;
  if (d === 5) return '5 Days';
  if (d === 7) return '1 Week';
  if (d === 14) return '2 Weeks';
  if (d === 30) return '1 Month';
  if (d === 90) return '3 Months';
  if (d === 180) return '6 Months';
  if (d === 365) return '1 Year';
  return `${d} Days`;
}

export default function SummarySidebar({ draft, reach, updateDraft }) {
  // Official pricing engine calculation
  const calcResult = calculateAdvertisingPrice({
    adType: draft.typeId || 'banner',
    category: draft.category || draft.businessCategory || 'medium_shop',
    locationTier: draft.locationTier || draft.cityType,
    targetCities: draft.targetCities || [],
    locations: draft.locations || [],
    radius: draft.radius || '10km',
    durationDays: draft.duration === 'custom' ? 1 : (draft.duration || 5),
    customAdminQuote: draft.customAdminQuote,
  });

  const categoryObj = ADVERTISER_CATEGORIES.find(c => c.id === (draft.category || draft.businessCategory)) || { label: 'Medium Shop' };
  const price = calcResult.isContract ? (Number(draft.customAdminQuote) || 0) : calcResult.finalPrice;
  const sellerDiscount = Number(calcResult.customerDiscountAmount || draft.customerDiscountAmount || 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      
      {/* Selected Plan Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-[#15803D]">Dynamic Pricing Summary</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">Live Calculation</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Advertiser Category</span>
            <span className="text-sm font-bold text-slate-900 text-right">
              {categoryObj.label}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Location Tier</span>
            <span className="text-sm font-semibold text-slate-900 text-right">
              <span className="bg-page text-slate-700 px-2 py-0.5 rounded text-xs font-bold">{calcResult.normTier}</span>
            </span>
          </div>
          {draft.locationType === 'radius' && (
            <div className="flex justify-between items-start">
              <span className="text-sm text-slate-500">Target Radius</span>
              <span className="text-sm font-semibold text-slate-900 text-right">{draft.radius || '10km'}</span>
            </div>
          )}
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Advertisement Type</span>
            <span className="text-sm font-semibold text-slate-900 text-right">
              {draft.typeId ? draft.typeId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Placement</span>
            <span className="text-sm font-semibold text-slate-900 text-right">
              {draft.placements?.length > 0 ? `${draft.placements.length} selected` : 'Homepage'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Targeted Cities</span>
            <span className="text-sm font-semibold text-slate-900 text-right max-w-[200px] truncate">
              {draft.targetCities?.length > 0 ? draft.targetCities.join(', ') : 'All India'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Duration & Multiplier</span>
            <span className="text-sm font-semibold text-slate-900 text-right">
              {getDurationLabel(draft.duration || 5)} ({calcResult.durationMultiplier}x)
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">Start Date</span>
            <span className="text-sm font-semibold text-slate-900 text-right">{formatDate(draft.startDate)}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-slate-500">End Date</span>
            <span className="text-sm font-semibold text-slate-900 text-right">{formatDate(draft.endDate)}</span>
          </div>
          
          <div className="py-2 border-y border-slate-100 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-slate-500 flex items-center gap-1.5"><span className="text-lg">📢</span> Est. Reach</span>
              <span className="text-sm font-bold text-slate-900 text-right">{reach?.reach || '1.5L - 3L Views'}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-slate-500 flex items-center gap-1.5"><span className="text-lg">👁</span> Est. Impressions</span>
              <span className="text-sm font-bold text-slate-900 text-right">{reach?.clicks || '50K - 1L'}</span>
            </div>
          </div>

              <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                <span>Base Price ({calcResult.normTier})</span>
                <span className="font-semibold text-slate-700">{formatINR(calcResult.basePrice)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Multiplier</span>
                <span className="font-semibold text-slate-700">{calcResult.durationMultiplier}x</span>
              </div>
              {calcResult.promotionFee != null && (
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>SAATHAPP Promotion Fee</span>
                  <span className="font-semibold text-emerald-700">{formatINR(calcResult.promotionFee)}</span>
                </div>
              )}
              {sellerDiscount > 0 && (
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Customer Discount (Seller Funded)</span>
                  <span className="font-semibold text-blue-700">{formatINR(sellerDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">Calculated SAATHAPP Fee</span>
                <span className="text-3xl font-black text-[#15803D] tracking-tight">{formatINR(price)}</span>
              </div>
        </div>
      </div>

      {/* Why Dynamic Rate Cards? */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="font-bold text-[#15803D]">Why Dynamic Rate Cards?</h3>
        <div className="grid grid-cols-1 gap-3">
          {BENEFITS.map(b => (
            <div key={b} className="flex items-center gap-2">
              <Check size={16} className="text-[#15803D]" strokeWidth={3} />
              <span className="text-sm font-medium text-slate-700">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Payment Options</h3>
          <span className="flex items-center gap-1 text-xs font-bold text-[#15803D]">
            <ShieldCheck size={14} /> 100% Secure
          </span>
        </div>
        
        <div className="flex border-b border-slate-200">
          <button className="flex-1 py-3 text-sm font-bold text-[#15803D] border-b-2 border-[#15803D] bg-emerald-50/30">UPI</button>
          <button className="flex-1 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700">Card</button>
          <button className="flex-1 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700">Net Banking</button>
          <button className="flex-1 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700">Wallet</button>
        </div>

        <div className="p-5 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-700 mb-4">Pay using any UPI App</p>
          <div className="flex items-center gap-4 mb-6">
            {/* Mock payment icons */}
            <div className="font-black text-lg text-slate-800"><span className="text-blue-500">G</span>Pay</div>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">पे</div>
            <div className="font-black text-blue-400">Paytm</div>
            <div className="font-black text-orange-500 italic">BHIM</div>
          </div>
          
          <p className="text-xs text-slate-400 mb-3 font-medium">or Scan QR Code</p>
          
          <div className="w-40 h-40 bg-page rounded-xl mb-4 border border-slate-200 flex items-center justify-center relative overflow-hidden">
             {/* Fake QR code pattern */}
             <div className="w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMzMzIiAvPgo8cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] opacity-80" />
             <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
               <div className="w-6 h-6 bg-[#15803D] rounded flex items-center justify-center">
                 <span className="text-white text-xs font-bold">S</span>
               </div>
             </div>
          </div>
          
          <div className="w-full py-2 bg-page rounded-lg border border-slate-200 flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-600">UPI ID: saathapp@upi</span>
            <Copy size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>

          <div className="w-full text-left space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Other UPI Options</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <div className="w-3 h-3 rounded-full border-2 border-[#15803D] flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#15803D]" /></div>
              saathapp@upi
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 opacity-60">
              <div className="w-3 h-3 rounded-full border-2 border-slate-300" />
              contact@saathapp.in
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 opacity-60">
              <div className="w-3 h-3 rounded-full border-2 border-slate-300" />
              9123456780@upi
            </div>
          </div>
        </div>

        <div className="bg-amber-50 px-5 py-3 border-t border-amber-100 flex items-start gap-2">
          <span className="text-amber-500 font-bold text-xs shrink-0 mt-0.5">!</span>
          <p className="text-[11px] text-amber-800 font-medium">Payment will be captured after ad preview confirmation.</p>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-1">Need Help?</h3>
        <p className="text-xs text-slate-500 mb-4">Our support team is here to help you.</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={14} className="text-[#15803D]" />
            <span className="text-sm font-bold text-slate-700">+91 9123456780</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-[#15803D]" />
            <span className="text-sm font-bold text-slate-700">advertise@saathapp.in</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={14} className="text-[#15803D]" />
            <span className="text-xs font-semibold text-slate-600">Mon - Sat (10:00 AM - 7:00 PM)</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-[#15803D]">
            <HeadphonesIcon size={24} />
          </div>
        </div>
      </div>

      {/* Footer Feature Strip */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 justify-center">
        {/* Not fully implemented to save space, but fits the design aesthetic */}
      </div>

    </div>
  );
}
