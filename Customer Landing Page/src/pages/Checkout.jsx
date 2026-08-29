import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Truck, CreditCard, CheckCircle2, Plus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useLocationContext } from '../context/LocationContext';

export default function Checkout({ onBack, onConfirmOrder }) {
  const { cartItems, totals } = useCart();
  const { savedAddresses, handleSaveAddress } = useLocationContext();
  const [step, setStep] = useState(1);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentError, setPaymentError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(savedAddresses[0].label);
    }
  }, [savedAddresses, selectedAddress]);

  const handleAddNewAddress = () => {
    if (newAddress.trim()) {
      const addressObj = {
        id: `checkout-${Date.now()}`,
        label: newAddress.trim(),
        fullAddress: newAddress.trim(),
        pincode: '000000'
      };
      handleSaveAddress(addressObj);
      setSelectedAddress(newAddress.trim());
      setNewAddress('');
      setIsAddingAddress(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 sm:px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button onClick={onBack} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-6 py-2 bg-primary text-white rounded-xl font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  const hasProducts = cartItems.some(item => item.type !== 'service');
  const hasServices = cartItems.some(item => item.type === 'service');

  const handleNext = () => {
    if (step === 1 && !selectedAddress) {
      toast.error('Please select or add a delivery address to proceed.');
      return;
    }
    setStep(s => {
      if (s === 1 && !hasProducts) return 3; // Skip Delivery if no products
      return Math.min(s + 1, 4);
    });
  };
  
  const handlePrev = () => {
    setStep(s => {
      if (s === 3 && !hasProducts) return 1; // Skip Delivery if no products
      return Math.max(s - 1, 1);
    });
  };

  const handleConfirm = async () => {
    const isDevMockEnabled = import.meta.env.VITE_ENABLE_DEV_MOCK_LOGIN === 'true';
    if (paymentMethod !== 'cod' && !import.meta.env.VITE_PAYMENT_GATEWAY_KEY && !isDevMockEnabled) {
      setPaymentError("Payment Configuration Error: VITE_PAYMENT_GATEWAY_KEY is missing. Real payment gateways cannot be initialized. Please configure your payment provider in .env.local or select Cash on Delivery.");
      return;
    }
    setPaymentError('');
    setIsProcessing(true);
    try {
      await onConfirmOrder({
        address: selectedAddress,
        deliveryMethod,
        paymentMethod,
        orderBreakdown: totals
      });
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button onClick={step === 1 ? onBack : handlePrev} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mr-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black">Checkout</h1>
        </div>

        {/* Steps indicator */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-300 -z-10 -translate-y-1/2" style={{ width: `${(step - 1) * 33.33}%` }}></div>
          
          {[
            { num: 1, label: 'Address', icon: MapPin },
            ...(hasProducts ? [{ num: 2, label: 'Delivery', icon: Truck }] : []),
            { num: 3, label: 'Payment', icon: CreditCard },
            { num: 4, label: 'Confirm', icon: CheckCircle2 }
          ].map((s) => (
            <div key={s.num} className={`flex flex-col items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 bg-white dark:bg-slate-900 ${step >= s.num ? 'border-primary text-primary' : 'border-slate-300 dark:border-slate-700'}`}>
                <s.icon size={18} />
              </div>
              <span className="text-xs font-bold uppercase hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Select Delivery Address</h2>
              {savedAddresses.length > 0 ? savedAddresses.map(addr => (
                <label key={addr.id} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddress === addr.label ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
                  <input type="radio" name="address" checked={selectedAddress === addr.label} onChange={() => setSelectedAddress(addr.label)} className="mt-1" />
                  <div>
                    <p className="font-semibold">{addr.label}</p>
                  </div>
                </label>
              )) : (
                <p className="text-sm text-slate-500 mb-4">No saved addresses found. Please add a new one below.</p>
              )}

              {!isAddingAddress ? (
                <button onClick={() => setIsAddingAddress(true)} className="flex items-center gap-2 text-primary font-bold mt-4 hover:bg-primary/5 px-4 py-3 rounded-xl transition-colors border border-dashed border-primary/40 w-full justify-center">
                  <Plus size={18} /> Add New Address
                </button>
              ) : (
                <div className="mt-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
                  <h3 className="font-bold mb-3 text-sm">Enter New Address</h3>
                  <textarea 
                    autoFocus
                    value={newAddress}
                    onChange={(e) => {
                      setNewAddress(e.target.value);
                      if (paymentError === 'address') setPaymentError('');
                    }}
                    placeholder="e.g. Apartment, Building, Street, City"
                    className={`input-field min-h-[100px] ${paymentError === 'address' ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {paymentError === 'address' && <p className="text-red-500 text-xs font-bold mt-1">Full address is required.</p>}
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-3">
                    <button onClick={() => { setIsAddingAddress(false); setPaymentError('') }} className="btn-secondary w-auto">Cancel</button>
                    <button onClick={() => {
                      if (!newAddress.trim()) {
                        setPaymentError('address');
                      } else {
                        handleAddNewAddress();
                      }
                    }} className="btn-primary w-auto">Save Address</button>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button disabled={!selectedAddress} onClick={handleNext} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-auto sm:px-8">Continue to Delivery</button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Select Delivery Method</h2>
              {[
                { id: 'standard', title: 'Standard Delivery', desc: '1-2 Days', price: '₹50' },
                { id: 'express', title: 'Express Delivery', desc: 'Under 30 mins', price: '₹90' }
              ].map(method => (
                <label key={method.id} className={`flex items-start justify-between p-4 border rounded-xl cursor-pointer transition-colors ${deliveryMethod === method.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" name="delivery" checked={deliveryMethod === method.id} onChange={() => setDeliveryMethod(method.id)} className="mt-1" />
                    <div>
                      <p className="font-semibold">{method.title}</p>
                      <p className="text-sm text-slate-500">{method.desc}</p>
                    </div>
                  </div>
                  <span className="font-bold">{method.price}</span>
                </label>
              ))}
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
                <button onClick={handlePrev} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-secondary w-auto">Back</button>
                <button onClick={handleNext} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-auto sm:px-8">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
              {[
                { id: 'upi', title: 'UPI / Google Pay / PhonePe' },
                { id: 'card', title: 'Credit / Debit Card' },
                { id: 'cod', title: 'Cash on Delivery' }
              ].map(method => (
                <label key={method.id} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="mt-1" />
                  <div>
                    <p className="font-semibold">{method.title}</p>
                  </div>
                </label>
              ))}
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
                <button onClick={handlePrev} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-secondary w-auto">Back</button>
                <button onClick={handleNext} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-auto sm:px-8">Review Order</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase">Delivery Address</h3>
                  <p className="font-medium">{selectedAddress}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase">Payment Method</h3>
                  <p className="font-medium">{paymentMethod.toUpperCase()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">Items</h3>
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{item.name} × {item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span>₹{totals.effectiveSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery</span>
                  <span>₹{totals.deliveryFee.toFixed(2)}</span>
                </div>
                {totals.couponDiscountValue > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-₹{totals.couponDiscountValue.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Grand Total</span>
                  <span>₹{totals.finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {paymentError && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold">
                  {paymentError}
                </div>
              )}
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
                <button onClick={handlePrev} disabled={isProcessing} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-secondary w-auto">Back</button>
                <button onClick={handleConfirm} disabled={isProcessing} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 hover:scale-[1.02] disabled:opacity-75 disabled:hover:scale-100 flex justify-center items-center">
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
