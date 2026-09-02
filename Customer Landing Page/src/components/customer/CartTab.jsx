import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartTab({ cart, walletBalance, setWalletBalance, orders, setOrders, transactions, setTransactions, setActiveTab, handleUpdateQty, handleRemoveItem, clearCart, totals }) {
  const [paymentOption, setPaymentOption] = useState('wallet');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAATH50') {
      setDiscount(50);
      toast.success('Coupon SAATH50 applied! You got a ₹50 discount.');
    } else {
      toast.error('Invalid coupon code. Try using SAATH50.');
    }
  };

  const handleUpdate = (item, change) => {
     handleUpdateQty(item, change);
  };

  const handleRemove = (itemId) => {
     handleRemoveItem(itemId);
  };

  const handleCheckout = () => {
    const subtotal = totals?.subtotalBase || cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = Math.max(0, subtotal - discount);

    if (paymentOption === 'wallet' && walletBalance < total) {
      toast.error(`Insufficient wallet balance! Total is ₹${total}, but you have ₹${walletBalance}. Please add money.`);
      setActiveTab('wallet');
      return;
    }

    if (paymentOption === 'wallet') {
      setWalletBalance(prev => prev - total);
      const tx = { id: `TX-${Math.floor(Math.random()*10000)}`, desc: `Payment for ${cart.length} items`, amount: -total, date: new Date().toLocaleDateString() };
      setTransactions(prev => [tx, ...prev]);
    }

    const newOrder = { orderId: `ORD-${Math.floor(Math.random()*10000)}`, date: new Date().toLocaleDateString(), payment: { status: 'Success' }, amount: total };
    setOrders(prev => [newOrder, ...prev]);

    clearCart();
    toast.success('Order placed successfully!');
    setActiveTab('orders');
  };

  return (
    <div className="space-y-6 text-left">
      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl bg-surface">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Your cart is empty.</p>
          <button onClick={() => window.location.href = '/products'} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold">Continue Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-surface">
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-slate-855 dark:text-slate-200">{item.name}</h4>
                  <p className="text-primary font-black">₹{item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                      <button onClick={() => handleUpdate(item, -1)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded">-</button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => handleUpdate(item, 1)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded">+</button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-fit space-y-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Subtotal ({totals?.itemCount || 0} items)</span><span>₹{totals?.subtotalBase || 0}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-500 font-bold"><span>Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between font-black text-slate-855 dark:text-slate-200 text-base pt-3 border-t border-slate-200 dark:border-slate-700">
                <span>Total</span><span>₹{Math.max(0, (totals?.subtotalBase || 0) - discount)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
