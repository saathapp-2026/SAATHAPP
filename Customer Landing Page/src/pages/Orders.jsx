import React, { useState, useEffect } from 'react';
import { ArrowLeft, Box, Package, Truck, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { orderApi } from '../services/orderApi';
import axios from 'axios';

export default function Orders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await orderApi.getOrders(1, { cancelToken: source.token });
        setOrders(data.data || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Unable to load orders. Please try again.');
          // Fallback to local storage for dev demonstration if API is missing
          const saved = window.localStorage.getItem('saathapp_customer_orders');
          if (saved) setOrders(JSON.parse(saved));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
    return () => source.cancel('Component unmounted');
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle2 size={20} className="text-blue-500" />;
      case 'PROCESSING': return <Package size={20} className="text-amber-500" />;
      case 'OUT_FOR_DELIVERY': return <Truck size={20} className="text-indigo-500" />;
      case 'DELIVERED': return <CheckCircle2 size={20} className="text-emerald-500" />;
      case 'CANCELLED': return <XCircle size={20} className="text-rose-500" />;
      default: return <Box size={20} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'PROCESSING': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'OUT_FOR_DELIVERY': return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'DELIVERED': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'CANCELLED': return 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-page text-theme px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-theme-border bg-surface p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">My Orders</h1>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-6">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error && orders.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20 px-6 py-16 text-center">
            <div className="text-rose-500 mb-4"><XCircle size={32} /></div>
            <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400">{error}</h2>
            <button onClick={() => window.location.reload()} className="mt-4 flex items-center gap-2 text-sm font-bold bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow border hover:bg-slate-50 transition-colors">
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-6 py-16 text-center">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
              <Box size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">No orders yet</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Your recent purchases and bookings will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{order.orderId}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">•</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Total: ₹{order.breakdown?.finalTotal?.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold tracking-wide uppercase ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.replace(/_/g, ' ')}
                  </div>
                </div>

                {/* Items */}
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0 text-2xl">
                          {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" /> : '🛍️'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</h4>
                          <div className="flex flex-wrap gap-2 items-center mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Qty: {item.quantity}</span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-wide font-bold">
                              {item.groceryTier ? `Grocery ${item.groceryTier}` : item.electronicsType || item.spiritualType || item.category}
                            </span>
                            <span className="text-[10px] text-slate-400">Seller: {item.seller}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tracker */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Delivery to:</span> {order.deliveryAddress}
                  </div>
                  <button className="bg-primary hover:bg-primary/90 active:scale-[0.98] text-white px-6 py-2.5 rounded-xl font-bold transition-all text-sm shadow-md shadow-primary/20">
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
