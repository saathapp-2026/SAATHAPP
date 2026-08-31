import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Download, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
export default function WalletCard() {
  const [balance, setBalance] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ledger, setLedger] = useState([]);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);
    if (Number.isNaN(amountVal) || amountVal <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }
    if (amountVal > balance) {
      setErrorMsg('Insufficient wallet balance.');
      return;
    }
    setBalance((prev) => prev - amountVal);
    setLedger((prev) => [
      {
        id: `WD-${Date.now()}`,
        date: 'Today',
        desc: 'Wallet Withdrawal',
        amount: amountVal,
        type: 'withdrawal',
        status: 'debited',
      },
      ...prev,
    ]);
    setWithdrawAmount('');
    setErrorMsg('');
    setShowWithdrawModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-primary via-brand-600 to-accent text-white rounded-card p-6 shadow-premium relative overflow-hidden min-h-[180px] flex flex-col justify-between">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-surface/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[10px] font-black uppercase text-white/80">Wallet Balance</span>
            <Wallet size={20} className="text-white/70" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black">₹{balance.toLocaleString()}</h2>
            <p className="text-[11px] text-white/75 flex items-center gap-1 mt-1">
              <ShieldCheck size={12} /> Available for withdrawal
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowWithdrawModal(true)}
            className="relative z-10 w-full py-2.5 bg-surface text-primary font-extrabold text-xs uppercase rounded-xl hover:bg-page transition-colors"
          >
            Withdraw
          </button>
        </div>

        <div className="bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Salary Status</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase border border-emerald-200/50">
              Not Set
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹0</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Monthly base salary</p>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft flex flex-col justify-between min-h-[180px]">
          <span className="text-[10px] font-black uppercase text-slate-400">Pending Salary</span>
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹0</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Bonus: ₹0</p>
          </div>
        </div>
      </div>

      <div className="bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Withdraw History</h3>
          <button
            type="button"
            onClick={() => toast.success('Statement downloaded.') }
            className="flex items-center gap-1.5 text-xs font-black text-primary uppercase"
          >
            <Download size={13} /> Download
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="transition-colors hover:bg-emerald-50/30 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400">
                <th className="pb-3">ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {ledger.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400">
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                ledger.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-emerald-50/30 hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-700 dark:text-slate-300">{row.id}</td>
                    <td className="py-3 text-slate-500">{row.date}</td>
                    <td className="py-3">{row.desc}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                        row.type === 'withdrawal' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {row.type}
                      </span>
                    </td>
                    <td className={`py-3 text-right font-black ${
                      row.status === 'credited' ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {row.status === 'credited' ? '+' : '-'}₹{row.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-surface border border-slate-200 dark:border-slate-800 rounded-card shadow-premium p-6"
            >
              <h4 className="text-lg font-black text-slate-800 dark:text-white mb-4">Withdraw Funds</h4>
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <p className="text-sm text-slate-500">Available: ₹{balance.toLocaleString()}</p>
                <input
                  type="number"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-page dark:bg-slate-950 outline-none focus:border-primary/50"
                />
                {errorMsg && <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowWithdrawModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1">
                    <ArrowUpRight size={14} /> Withdraw
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
