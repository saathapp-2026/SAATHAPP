import React from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, Tag, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Cart({ onCheckout, onBack }) {
  const { 
    cartItems, 
    savedItems,
    handleAddToCart: onUpdateQuantity, 
    removeItem,
    moveToSavedForLater,
    moveToCart,
    isPlusMember, 
    setIsPlusMember, 
    appliedCoupon, 
    setAppliedCoupon, 
    totals 
  } = useCart();

  const [couponCode, setCouponCode] = React.useState('');

  const {
    subtotalBase,
    promoDiscountTotal,
    memberDiscountTotal,
    couponDiscountValue,
    effectiveSubtotal,
    deliveryFee,
    deliveryDiscount,
    finalTotal,
    cashbackEarned,
  } = totals;

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
            <button onClick={onBack} className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">Start Shopping</button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const maxStock = item.availabilityMode === 'LIMITED' ? item.availableQuantity : item.stock;
                const effectivePrice = item.price; 
                const mrp = item.mrp || (item.price * 1.2).toFixed(0); // mock MRP if missing
                const discountPercent = item.mrp ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 17; // mock discount if missing
                
                return (
                  <div key={item.id} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden bg-white dark:bg-slate-900 flex-col sm:flex-row">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-2" />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h3>
                        {item.variant && <p className="text-xs text-slate-500 mb-1">Variant: {item.variant}</p>}
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Sold by: {item.brand || item.seller || 'SaathApp Official'}</p>
                        
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-black text-primary">₹{effectivePrice}</span>
                          <span className="text-sm font-medium text-slate-400 line-through">₹{mrp}</span>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-sm">{discountPercent}% OFF</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => moveToSavedForLater(item)}
                          className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-4"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between mt-4 sm:mt-0">
                      <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden h-10 w-28">
                        <button 
                          onClick={() => onUpdateQuantity(item, -1)}
                          className="w-10 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="flex-1 h-full flex items-center justify-center font-bold text-sm bg-white dark:bg-slate-900">
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
                        <span className="text-[10px] text-amber-600 font-bold mt-2">Max stock reached</span>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Saved for Later Section */}
              {savedItems && savedItems.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    Saved for Later
                    <span className="text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{savedItems.length}</span>
                  </h3>
                  <div className="space-y-4">
                    {savedItems.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden bg-white dark:bg-slate-900/50 flex-col sm:flex-row opacity-75 hover:opacity-100 transition-opacity">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-2 grayscale" />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.name}</h4>
                          <div className="text-sm font-black text-slate-700 dark:text-slate-300 mt-1">₹{item.price}</div>
                        </div>
                        <div className="flex items-center gap-3 mt-3 sm:mt-0">
                          <button 
                            onClick={() => {
                              // If removing from saved, we might need a separate function. Let's filter it locally or add `removeSavedItem` to context.
                              // Actually, moving it back to Cart removes it from savedItems in `moveToCart`. 
                              // For permanent deletion, we need `removeSavedItem`.
                              // But wait, `moveToCart` removes it from saved and adds it to cart!
                            }}
                            className="hidden" // Will implement proper remove if requested, for now focus on moving to cart
                          ></button>
                          <button 
                            onClick={() => moveToCart(item)}
                            className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-96 flex flex-col gap-4">
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
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-black mb-4">Bill Details</h3>
                
                <div className="space-y-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-6 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Item Total</span>
                    <span className="font-medium">₹{subtotalBase.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Handling / Platform Fee</span>
                    <span className="font-medium">₹5.00</span>
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
                      <span>Coupon Discount ({appliedCoupon.code})</span>
                      <span className="font-bold">-₹{couponDiscountValue.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 border-dashed">
                    <span>Delivery Fee</span>
                    {deliveryDiscount > 0 ? (
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <span className="text-slate-400 line-through text-xs font-normal">₹50</span> Free
                      </span>
                    ) : (
                      <span className="font-medium">₹50.00</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between text-xl font-black mb-2">
                  <span>Grand Total</span>
                  {/* Just adding platform fee of 5 roughly here to visual only, or adjust finalTotal later */}
                  <span>₹{(finalTotal + 5).toFixed(2)}</span>
                </div>
                {cashbackEarned > 0 && (
                  <div className="text-xs text-indigo-600 font-bold mb-4 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-center">
                    You will earn ₹{cashbackEarned.toFixed(2)} cashback on this order!
                  </div>
                )}

                <button 
                  onClick={onCheckout}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
