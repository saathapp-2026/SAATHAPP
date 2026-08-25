import React from 'react';
import { CheckCircle2, ChevronRight, Package, MapPin, CreditCard } from 'lucide-react';

export default function OrderConfirmation({ order, onBack, onViewOrders }) {
  if (!order) return null;
  const { breakdown } = order;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
          <div className="inline-block bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold tracking-wide">
            Order ID: {order.orderId}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <MapPin size={18} className="text-primary" /> Delivery Address
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {order.customer}<br />
              {order.deliveryAddress}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase">Est. Delivery</span>
              <p className="font-semibold text-emerald-600">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <CreditCard size={18} className="text-primary" /> Payment Method
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {order.payment.method}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase">Payment Status</span>
              <p className="font-semibold text-emerald-600">{order.payment.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Package size={18} className="text-primary" /> Order Items ({order.items.length})
          </h3>
          <div className="space-y-4 mb-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0 text-2xl">
                  {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" /> : '🛍️'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <div className="flex gap-2 items-center mt-0.5">
                    <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 uppercase">
                      {item.groceryTier ? `Grocery ${item.groceryTier}` : item.electronicsType || item.spiritualType || item.category}
                    </span>
                  </div>
                </div>
                <div className="font-bold text-sm">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>₹{breakdown?.subtotalBase?.toFixed(2)}</span>
            </div>
            {breakdown?.promoDiscountTotal > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Promotions</span>
                <span>-₹{breakdown.promoDiscountTotal.toFixed(2)}</span>
              </div>
            )}
            {breakdown?.memberDiscountTotal > 0 && (
              <div className="flex justify-between text-indigo-600">
                <span>Plus Discount</span>
                <span>-₹{breakdown.memberDiscountTotal.toFixed(2)}</span>
              </div>
            )}
            {breakdown?.couponDiscountValue > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon ({breakdown.appliedCoupon})</span>
                <span>-₹{breakdown.couponDiscountValue.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Delivery</span>
              {breakdown?.deliveryDiscount > 0 ? (
                <span className="text-emerald-600 font-bold">Free</span>
              ) : (
                <span>₹50.00</span>
              )}
            </div>
            <div className="flex justify-between text-lg font-black pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Final Total</span>
              <span>₹{breakdown?.finalTotal?.toFixed(2)}</span>
            </div>
            {breakdown?.cashbackEarned > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg mt-2">
                <span>Cashback Earned</span>
                <span>+₹{breakdown.cashbackEarned.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onViewOrders}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-colors text-center"
          >
            Track Order
          </button>
          <button 
            onClick={onBack}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 py-3 rounded-xl font-bold transition-colors text-center"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
