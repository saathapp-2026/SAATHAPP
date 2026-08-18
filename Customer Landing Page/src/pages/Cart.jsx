import React from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart({ cartItems = [], cartTotal = 0, onUpdateQuantity, onCheckout, onBack }) {
  return (
    <div className="min-h-screen bg-page px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-6 hover:text-primary">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mb-6 border-b border-slate-200 pb-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-900">Your Cart</h1>
          <div className="text-sm font-semibold text-slate-500">{cartItems.length} items</div>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-page px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShoppingCart size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">Add products and services to start your order.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const maxStock = item.availabilityMode === 'LIMITED' ? item.availableQuantity : item.stock;
                const outOfStock = maxStock !== undefined && maxStock <= 0;
                
                return (
                  <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-2xl items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-100" />
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">{item.name}</h3>
                      <div className="text-sm font-bold text-primary mb-2">₹{item.price}</div>
                      
                      {maxStock !== undefined && (
                        <div className="text-xs text-slate-500 mb-2">
                          Available: {maxStock}
                        </div>
                      )}

                      {(() => {
                        const CUSTOMER_LOCATION = { lat: 28.6315, lng: 77.2167 };
                        const calculateDistance = (lat1, lon1, lat2, lon2) => {
                          const R = 6371;
                          const dLat = (lat2 - lat1) * Math.PI / 180;
                          const dLon = (lon2 - lon1) * Math.PI / 180;
                          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                                    Math.sin(dLon/2) * Math.sin(dLon/2);
                          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                          return R * c;
                        };
                        const getETA = (dist) => {
                          if (dist <= 3) return '30–45 min';
                          if (dist <= 7) return '45–60 min';
                          return '1–2 days';
                        };

                        let bestSeller = null;
                        if (item?.sellers && item.sellers.length > 0) {
                          const availableSellers = item.sellers
                            .filter(s => s.stock >= item.quantity)
                            .map(s => {
                              const dist = calculateDistance(CUSTOMER_LOCATION.lat, CUSTOMER_LOCATION.lng, s.location.lat, s.location.lng);
                              return { ...s, distance: dist, eta: getETA(dist) };
                            })
                            .sort((a, b) => a.distance - b.distance);
                          
                          if (availableSellers.length > 0) {
                            bestSeller = availableSellers[0];
                          }
                        }

                        if (bestSeller) {
                          return (
                            <div className="text-xs bg-green-50 p-2 rounded-lg border border-green-100">
                              <span className="font-bold text-green-700 block">🚚 Delivery from {bestSeller.name} ({bestSeller.distance.toFixed(1)} km)</span>
                              <span className="text-green-600 font-semibold">Arrives in {bestSeller.eta}</span>
                            </div>
                          );
                        } else if (item?.sellers) {
                          return (
                            <div className="text-xs bg-amber-50 p-2 rounded-lg border border-amber-100">
                              <span className="font-bold text-amber-700 block">🚚 Delivery in 1–2 days</span>
                              <span className="text-amber-600">No nearby seller has requested quantity</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden h-10">
                        <button 
                          onClick={() => onUpdateQuantity(item, -1)}
                          className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="w-10 h-full flex items-center justify-center font-bold text-sm bg-white">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => onUpdateQuantity(item, 1)}
                          disabled={maxStock !== undefined && item.quantity >= maxStock}
                          className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
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
            <div className="w-full lg:w-80 border border-slate-200 rounded-2xl p-6 h-fit bg-slate-50">
              <h3 className="text-lg font-black text-slate-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 border-b border-slate-200 pb-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-black text-slate-900 mb-6">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              
              <button 
                onClick={onCheckout}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
