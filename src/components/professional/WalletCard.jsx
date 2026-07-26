import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Download, AlertCircle, ArrowUpRight, Check } from 'lucide-react';

export default function WalletCard() {
  const [balance, setBalance] = useState(8420);
  const [pendingBalance, setPendingBalance] = useState(2100);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [transactions, setTransactions] = useState([
    { id: 'TXN-7489', date: 'Jul 25, 2026', desc: 'AC Installation Settlement', amount: 1560, status: 'credited' },
    { id: 'TXN-7412', date: 'Jul 24, 2026', desc: 'Electrical Wiring Repair', amount: 2200, status: 'credited' },
    { id: 'TXN-7390', date: 'Jul 22, 2526', desc: 'Weekly Settlement Payout', amount: 12500, status: 'debited' },
    { id: 'TXN-7250', date: 'Jul 20, 2026', desc: 'Kitchen Light Overhaul', status: 'credited', amount: 450 }
  ]);

  const [withdrawals, setWithdrawals] = useState([
    { id: 'WTH-0489', date: 'Jul 22, 2026', amount: 12500, bank: 'HDFC Bank - XXXX5678', status: 'completed' },
    { id: 'WTH-0341', date: 'Jul 15, 2026', amount: 8400, bank: 'HDFC Bank - XXXX5678', status: 'completed' }
  ]);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }
    if (amountVal > balance) {
      setErrorMsg('Insufficient balance. Enter an amount lower than available balance.');
      return;
    }

    // Success simulation
    setBalance(prev => prev - amountVal);
    
    // Add to transactions & withdrawals list
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      desc: 'Wallet Withdrawal Payout',
      amount: amountVal,
      status: 'debited'
    };

    const newWth = {
      id: `WTH-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      amount: amountVal,
      bank: 'HDFC Bank - XXXX5678',
      status: 'completed'
    };

    setTransactions(prev => [newTxn, ...prev]);
    setWithdrawals(prev => [newWth, ...prev]);

    setWithdrawAmount('');
    setErrorMsg('');
    setShowWithdrawModal(false);
    alert(`Withdrawal of ₹${amountVal} completed successfully! Settlements clear in 24 hours.`);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Balances Display Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Available Balance Card */}
        <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-premium relative overflow-hidden flex flex-col justify-between h-44">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/80">Available Balance</span>
            <Wallet size={20} className="text-white/70" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black">₹{balance.toLocaleString()}</h2>
            <p className="text-[10px] text-white/75 font-medium flex items-center gap-1">
              <ShieldCheck size={12} className="text-secondary" />
              <span>Settled & ready to transfer</span>
            </p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full py-2 bg-white text-slate-900 font-extrabold text-[11px] uppercase tracking-wider rounded-btn hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
          >
            Instant Withdrawal
          </button>
        </div>

        {/* Pending Balance Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Escrow Pending</span>
            <AlertCircle size={20} className="text-slate-350" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{pendingBalance.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">4 In-progress job holds</p>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-2.5">
            Will clear immediately upon customer job completion verification.
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Lifetime Settled</span>
            <ArrowUpRight size={20} className="text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹1,95,000</h3>
            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">178 Completed orders</p>
          </div>
          <button 
            onClick={() => alert('Detailed CSV statement downloaded in background.')}
            className="w-full py-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 font-extrabold text-[11px] uppercase tracking-wider rounded-btn transition-colors cursor-pointer"
          >
            Get Tax Summary
          </button>
        </div>

      </div>

      {/* Ledger Lists grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Transaction History */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{txn.id}</td>
                    <td className="py-3 text-slate-400">{txn.date}</td>
                    <td className="py-3 max-w-[150px] truncate">{txn.desc}</td>
                    <td className={`py-3 text-right font-black ${
                      txn.status === 'credited' ? 'text-primary' : 'text-rose-500'
                    }`}>
                      {txn.status === 'credited' ? '+' : '-'}₹{txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Withdrawal Transfers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Transfer Date</th>
                  <th className="pb-3">Payout Bank</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {withdrawals.map((wth, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{wth.id}</td>
                    <td className="py-3 text-slate-400">{wth.date}</td>
                    <td className="py-3 truncate">{wth.bank}</td>
                    <td className="py-3 text-right font-black text-slate-800 dark:text-slate-200">
                      ₹{wth.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* WITHDRAWAL DIALOG POPUP */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card shadow-premium p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-4 mb-4">
                <h4 className="text-base sm:text-lg font-black text-slate-855 dark:text-white">Instant Wallet Transfer</h4>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setErrorMsg('');
                    setWithdrawAmount('');
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Available limit</span>
                    <span className="text-sm font-black text-slate-800 dark:text-white">₹{balance.toLocaleString()}</span>
                  </div>
                  <div className="text-right text-[10px] font-bold text-slate-400">
                    Bank: HDFC Bank (XXXX5678)
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="field-label">Transfer Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount to withdraw"
                    className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-danger font-extrabold flex items-center gap-1 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-200/50">
                    <span>⚠</span>
                    <span>{errorMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowUpRight size={14} />
                  <span>Withdraw Now</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
