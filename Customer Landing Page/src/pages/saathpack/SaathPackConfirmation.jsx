import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Package, Box, Truck } from 'lucide-react';

export default function SaathPackConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/products/saathpack" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl w-full text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">SaathPack Order Confirmed</h1>
        <p className="text-slate-600 mb-6">Your bulk packaging order has been placed successfully.</p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block mx-auto mb-8">
          <span className="text-sm text-slate-500 block mb-1">Order ID:</span>
          <span className="text-xl font-bold text-slate-800">{order.orderId}</span>
        </div>

        {/* Workflow visualization */}
        <div className="border-t border-slate-100 pt-8 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Expected Workflow</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-600 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
              <span>Confirmed</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center"><Box className="w-4 h-4" /></div>
              <span>Procurement</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center"><Package className="w-4 h-4" /></div>
              <span>Quality Check</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center"><Truck className="w-4 h-4" /></div>
              <span>Dispatched</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-8 text-left">
          <div className="font-bold text-green-800 text-sm">Estimated delivery</div>
          <div className="text-lg text-green-700 font-bold">{order.estimatedDelivery}</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/seller/dashboard/orders')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Track in Seller Dashboard
          </button>
          <button 
            onClick={() => navigate('/products/saathpack/landing')}
            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
