import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle2, Box } from 'lucide-react';

export default function SaathPackOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('saathapp_saathpack_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">SaathPack Orders</h1>
        <p className="text-slate-500 text-sm mt-1">Track your bulk packaging procurement orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">No SaathPack orders yet</h3>
          <p className="text-slate-500">Your packaging supply orders will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.orderId} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Order ID: <span className="font-bold text-slate-800">{order.orderId}</span></div>
                  <div className="text-sm text-slate-500">Placed on: {new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Total Amount</div>
                  <div className="text-xl font-bold text-slate-900">₹{order.total.toLocaleString()}</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3">Items</h4>
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-white border border-slate-200 object-cover" />
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500">Pack of {item.packSize}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-700 text-sm">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-4">Tracking Status</h4>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 relative">
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
                  
                  {/* Status Steps */}
                  {['Order Confirmed', 'Procurement', 'Quality Check', 'Dispatched', 'Delivered'].map((step, index) => {
                    // For mock, just checking if status matches or is past
                    let isActive = order.status === step || (order.status === 'Order Confirmed' && index === 0);
                    let isCompleted = isActive || (order.status === 'Delivered');

                    return (
                      <div key={step} className={`flex flex-col items-center gap-2 bg-white px-2 ${isActive || isCompleted ? 'text-primary' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive || isCompleted ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {index === 0 || index === 4 ? <CheckCircle2 className="w-4 h-4" /> : 
                           index === 1 ? <Box className="w-4 h-4" /> :
                           index === 2 ? <Package className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                        </div>
                        <span className={isActive ? 'font-bold' : ''}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
