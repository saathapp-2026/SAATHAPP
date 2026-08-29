import React from 'react';
import toast from 'react-hot-toast';

export default function PaymentsTab({ orders, _transactions, walletBalance, setShowAddMoneyModal }) {
  const handleDownloadBill = (orderId) => {
    toast.success(`Downloading PDF Invoice for ${orderId}...`) };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Payments & Invoices</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage your saved cards, UPI IDs, and download bills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Saved methods */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Wallet Info</h3>
            <button
              onClick={() => setShowAddMoneyModal(true)}
              className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer"
            >
              Add Money
            </button>
          </div>
          <div className="p-4 bg-page dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Wallet Balance</span>
            <span className="text-xl font-black text-slate-850 dark:text-white mt-1.5 inline-block">₹{walletBalance.toFixed(2)}</span>
          </div>

          <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider pt-2">Saved Cards</h3>
          <div className="p-4 bg-page dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-center text-xs text-slate-400 font-semibold">
            No saved cards.
          </div>

          <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider pt-2">Saved UPI IDs</h3>
          <div className="p-4 bg-page dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-center text-xs text-slate-400 font-semibold">
            No saved UPI IDs.
          </div>
        </div>

        {/* Right: Invoices download */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Download Invoices</h3>
          
          {orders.filter(o => o.status === 'Delivered').length === 0 ? (
            <p className="text-xs text-slate-400 font-semibold">No delivered orders to show invoices for.</p>
          ) : (
            <div className="space-y-2">
              {orders.filter(o => o.status === 'Delivered').map((ord) => (
                <div key={ord.id} className="p-3 bg-surface border border-slate-200/60 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs">
                  <div>
                    <p className="font-black text-slate-800 dark:text-slate-200">{ord.id}</p>
                    <p className="text-[9px] text-slate-400 font-semibold">{ord.date} • ₹{ord.total}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadBill(ord.id)}
                    className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black rounded-lg text-[10px] uppercase cursor-pointer"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
