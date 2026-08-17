import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function CartTab({ cart, setCart, walletBalance, setWalletBalance, orders, setOrders, transactions, setTransactions, setActiveTab }) {
  const [paymentOption, setPaymentOption] = useState('wallet');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAATH50') {
      setDiscount(50);
      alert('Coupon SAATH50 applied! You got a ₹50 discount.');
    } else {
      alert('Invalid coupon code. Try using SAATH50.');
    }
  };

  const handleUpdateQty = (itemId, change) => {
    const updated = cart.map(item => {
      if (item.id === itemId) {
        const newCount = item.count + change;
        return newCount > 0 ? { ...item, count: newCount } : null;
      }
      return item;
    }).filter(Boolean);
    localStorage.setItem('saath_cart', JSON.stringify(updated));
    setCart(updated);
  };

  const handleRemoveItem = (itemId) => {
    const updated = cart.filter(item => item.id !== itemId);
    localStorage.setItem('saath_cart', JSON.stringify(updated));
    setCart(updated);
  };

  const handleCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    const total = Math.max(0, subtotal - discount);

    if (paymentOption === 'wallet' && walletBalance < total) {
      alert(`Insufficient wallet balance! Total is ₹${total}, but you have ₹${walletBalance}. Please add money.`);
      return;
    }

    if (paymentOption === 'wallet') {
      const newBal = (walletBalance - total).toFixed(2);
      localStorage.setItem('saath_wallet_balance', newBal);
      setWalletBalance(parseFloat(newBal));

      // Record transaction
      const newTxn = {
        id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
        type: 'Debit',
        amount: total,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        desc: `Checkout Payment - ${cart.length} items`,
        method: 'Saath Wallet',
        status: 'Success'
      };
      const updatedTxns = [newTxn, ...transactions];
      localStorage.setItem('saath_transactions', JSON.stringify(updatedTxns));
      setTransactions(updatedTxns);
    }

    // Record order
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: total,
      items: cart.map(i => `${i.name} x${i.count}`),
      thumbnail: cart[0]?.image || '📦'
    };
    const updatedOrders = [newOrder, ...orders];
    localStorage.setItem('saath_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);

    // Empty cart
    localStorage.setItem('saath_cart', '[]');
    setCart([]);
    alert('Order placed successfully!');
    setActiveTab('orders');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">My Shopping Cart</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Securely manage materials and checkout instantly.</p>
      </div>

      {cart.length === 0 ? (
        <div className="p-8 text-center bg-page dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl space-y-2">
          <span className="text-3xl block">🛒</span>
          <p className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">Your cart is empty</p>
          <p className="text-xs text-slate-400 font-semibold">Explore agriculture resources and hardware products from home page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50/50 dark:bg-slate-955/10 rounded-2xl border border-slate-205 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl w-12 h-12 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm">
                    {item.image || '📦'}
                  </span>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 dark:text-white leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-[#6C3BFF] font-black mt-1">₹{item.price} each</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950">
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="px-2 py-1 hover:bg-slate-55 cursor-pointer font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-black text-slate-800 dark:text-white">{item.count}</span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="px-2 py-1 hover:bg-slate-55 cursor-pointer font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Checkout Card */}
          <div className="bg-page dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Summary & Checkout</h3>
            
            <div className="space-y-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800 dark:text-white">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-500 font-bold">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-500 font-bold">FREE</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-205 dark:border-slate-800 pt-2.5 text-sm font-black text-slate-850 dark:text-white">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-450">Apply Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Try: SAATH50"
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none dark:bg-slate-900 font-semibold"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-450">Payment Option</label>
              <select
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-205 dark:border-slate-800 rounded-xl text-xs focus:outline-none dark:bg-slate-900 font-bold"
              >
                <option value="wallet">Saath Wallet (Balance: ₹{walletBalance.toFixed(2)})</option>
                <option value="upi">UPI GooglePay / PhonePe</option>
                <option value="card">Saved Visa Card ending 4492</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md text-center inline-block"
            >
              Place Order
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
