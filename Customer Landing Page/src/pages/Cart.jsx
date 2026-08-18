import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, Tag, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

export default function Cart({ cartItems = [], onUpdateQuantity, onCheckout, onBack }) {
  const [isPlusMember, setIsPlusMember] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const calculateDiscountValue = (base, discountStr) => {
    if (!discountStr) return 0;
    const isPercentage = discountStr.includes('%');
    const val = parseFloat(discountStr.replace(/[^0-9.]/g, ''));
    if (isNaN(val)) return 0;
    if (isPercentage) {
      return base * (val / 100);
    }
    return val;
  };

  const isEligibleForPlus = (item) => {
    return item.category === 'grocery' || item.brand === 'SaathApp Official' || item.productTier === 'PREMIUM';
  };

  let subtotalBase = 0;
  let promoDiscountTotal = 0;
  let memberDiscountTotal = 0;

  cartItems.forEach(item => {
    const basePrice = item.price;
    const qty = item.quantity;
    subtotalBase += basePrice * qty;

    // RULE 1: PRODUCT PROMOTION
    let itemPromoDiscount = 0;
    if (item.promotion?.active) {
      itemPromoDiscount = calculateDiscountValue(basePrice, item.promotion.discount);
    }
    promoDiscountTotal += itemPromoDiscount * qty;

    const effectiveItemPrice = basePrice - itemPromoDiscount;

    // RULE 2: PLUS BENEFIT
    if (isPlusMember && isEligibleForPlus(item)) {
      // 5% extra member discount on eligible items
      memberDiscountTotal += (effectiveItemPrice * 0.05) * qty;
    }
  });

  const effectiveSubtotal = subtotalBase - promoDiscountTotal - memberDiscountTotal;

  // RULE 3: COUPON
  const handleApplyCoupon = () => {
    if (couponCode === 'SAATH50') {
      setAppliedCoupon({ code: 'SAATH50', discount: 50 });
    } else if (couponCode === 'PLUS10' && isPlusMember) {
      setAppliedCoupon({ code: 'PLUS10', discount: effectiveSubtotal * 0.1 });
    } else {
      alert('Invalid or inapplicable coupon.');
      setAppliedCoupon(null);
    }
  };

  const couponDiscountValue = appliedCoupon ? appliedCoupon.discount : 0;
  
  const subtotalAfterCoupon = Math.max(0, effectiveSubtotal - couponDiscountValue);

  // RULE 4: DELIVERY BENEFIT
  let deliveryFee = 50;
  let deliveryDiscount = 0;
  if (isPlusMember && subtotalAfterCoupon > 499) {
    deliveryFee = 0;
    deliveryDiscount = 50;
  }

  const finalTotal = subtotalAfterCoupon + deliveryFee;

  // RULE 5: CASHBACK
  const cashbackEarned = isPlusMember ? finalTotal * 0.05 : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 mb-6 hover:text-primary">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Your Cart</h1>
            <div className="text-sm font-semibold text-slate-500">{cartItems.length} items</div>
          </div>
          
          <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-indigo-900 dark:text-indigo-100">Simulate SaathApp Plus</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-300">Toggle membership benefits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" className="sr-only peer" checked={isPlusMember} onChange={(e) => {
                setIsPlusMember(e.target.checked);
                if (!e.target.checked && appliedCoupon?.code === 'PLUS10') setAppliedCoupon(null);
              }} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShoppingCart size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-black">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Add products and services to start your order.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const maxStock = item.availabilityMode === 'LIMITED' ? item.availableQuantity : item.stock;
                const outOfStock = maxStock !== undefined && maxStock <= 0;
                
                const itemPromoDiscount = item.promotion?.active ? calculateDiscountValue(item.price, item.promotion.discount) : 0;
                const effectivePrice = item.price - itemPromoDiscount;
                const itemMemberDiscount = (isPlusMember && isEligibleForPlus(item)) ? (effectivePrice * 0.05) : 0;
                const finalItemPrice = effectivePrice - itemMemberDiscount;

                return (
                  <div key={item.id} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl items-center relative overflow-hidden bg-white dark:bg-slate-900">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-100 dark:bg-slate-800" />
                    
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-primary">₹{finalItemPrice.toFixed(0)}</span>
                        {(itemPromoDiscount > 0 || itemMemberDiscount > 0) && (
                          <span className="text-xs text-slate-400 line-through">₹{item.price}</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {itemPromoDiscount > 0 && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                            {item.promotion.type.replace(/_/g, " ")}
                          </span>
                        )}
                        {itemMemberDiscount > 0 && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold flex items-center gap-1 uppercase tracking-wide">
                            <ShieldCheck size={10} /> Member Price
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden h-10">
                        <button 
                          onClick={() => onUpdateQuantity(item, -1)}
                          className="w-10 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="w-10 h-full flex items-center justify-center font-bold text-sm bg-white dark:bg-slate-900">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => onUpdateQuantity(item, 1)}
                          disabled={maxStock !== undefined && item.quantity >= maxStock}
                          className="w-10 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {maxStock !== undefined && item.quantity >= maxStock && (
                        <span className="text-[10px] text-amber-600 font-bold">Max stock reached</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Checkout Summary */}
            <div className="w-full lg:w-96 flex flex-col gap-4">
              {/* Coupon Section */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                  <Tag size={16} /> Apply Coupon
                </h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code (e.g., SAATH50)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-primary uppercase"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-3 text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> {appliedCoupon.code} applied successfully!
                  </div>
                )}
                {isPlusMember && (
                  <div className="mt-3 text-xs text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded flex items-start gap-2 border border-indigo-100 dark:border-indigo-800/50">
                    <Info size={12} className="shrink-0 mt-0.5" />
                    <span>Try code <b>PLUS10</b> for an extra 10% off your entire cart!</span>
                  </div>
                )}
              </div>

              {/* Totals Section */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-black mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-6 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Subtotal</span>
                    <span className="font-medium">₹{subtotalBase.toFixed(2)}</span>
                  </div>
                  
                  {promoDiscountTotal > 0 && (
                    <div className="flex justify-between text-rose-600">
                      <span>Product Promotions</span>
                      <span className="font-bold">-₹{promoDiscountTotal.toFixed(2)}</span>
                    </div>
                  )}

                  {memberDiscountTotal > 0 && (
                    <div className="flex justify-between text-indigo-600">
                      <span>Plus Member Discount</span>
                      <span className="font-bold">-₹{memberDiscountTotal.toFixed(2)}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span className="font-bold">-₹{couponDiscountValue.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 border-dashed">
                    <span>Delivery Fee</span>
                    {deliveryDiscount > 0 ? (
                      <span className="font-bold text-green-600 flex items-center gap-1">
                        <span className="text-slate-400 line-through text-xs font-normal">₹50</span> Free
                      </span>
                    ) : (
                      <span className="font-medium">₹50.00</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between text-xl font-black mb-2">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>

                {cashbackEarned > 0 && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-3 mb-6 flex items-start gap-3">
                    <div className="text-2xl mt-0.5">💸</div>
                    <div>
                      <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide mb-0.5">Plus Cashback</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-300">You will earn <b>₹{cashbackEarned.toFixed(2)}</b> in SaathApp Wallet after checkout.</p>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    const orderBreakdown = {
                      subtotalBase,
                      promoDiscountTotal,
                      memberDiscountTotal,
                      couponDiscountValue,
                      appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
                      deliveryFee,
                      deliveryDiscount,
                      finalTotal,
                      cashbackEarned,
                      isPlusMember
                    };
                    onCheckout(orderBreakdown);
                  }}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
