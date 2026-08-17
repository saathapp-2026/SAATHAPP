import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, AlertCircle, ArrowUpRight, Building, Edit3, Calendar } from 'lucide-react';
import { FeeSummarySection } from './ControlSections';

export default function WalletCard({ onboarding }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [balance, setBalance] = useState(0);
  const [pendingBalance, _setPendingBalance] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [transactions, setTransactions] = useState([]);

  const [withdrawals, setWithdrawals] = useState([]);

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

    setBalance(prev => prev - amountVal);
    
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

  const getStats = () => {
    switch(activeTab) {
      case 'today': return { label: "Today's Earnings", amount: 0, jobs: 0, pending: 0 };
      case 'this_week': return { label: "This Week's Earnings", amount: 0, jobs: 0, pending: 0 };
      case 'this_month': return { label: "This Month's Earnings", amount: 0, jobs: 0, pending: 0 };
      case 'overview':
      case 'total':
      default: return { label: "Total Lifetime Settled", amount: 0, jobs: 0, pending: 0 };
    }
  };

  const currentStats = getStats();

  return (
    <div className="space-y-6 text-left">
      
      {/* Earnings Header & Tabs */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Earnings Register</h2>
        <p className="text-[11px] text-slate-400">View wallet, payouts, and breakdown</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'today', label: "Today's Earnings" },
            { id: 'this_week', label: 'Weekly Earnings' },
            { id: 'this_month', label: 'Monthly Earnings' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'fees', label: 'Fees & Charges' },
            { id: 'payout_history', label: 'Settlements' },
            { id: 'statements', label: 'Statements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'fees' && (
        <div className="mt-4">
          <FeeSummarySection onboarding={onboarding} />
        </div>
      )}

      {activeTab === 'statements' && (
        <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft flex items-center justify-center h-48 mt-4">
          <p className="text-sm font-bold text-slate-500">No statements available for this period.</p>
        </div>
      )}

      {activeTab === 'payout_history' ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Payout History</h3>
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
                  {withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">
                        No payout history.
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((wth, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{wth.id}</td>
                      <td className="py-3 text-slate-400">{wth.date}</td>
                      <td className="py-3 truncate">{wth.bank}</td>
                      <td className="py-3 text-right font-black text-slate-800 dark:text-slate-200">
                        ₹{wth.amount.toLocaleString()}
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Breakout Dynamic Card */}
            <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft transition-all flex flex-col justify-between h-44">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{currentStats.label}</span>
                <ArrowUpRight size={20} className="text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{currentStats.amount.toLocaleString()}</h3>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{currentStats.jobs} Completed jobs</p>
              </div>
              <button 
                onClick={() => alert('Detailed CSV statement downloaded in background.')}
                className="w-full py-2 bg-page dark:bg-slate-950 hover:bg-page text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 font-extrabold text-[11px] uppercase tracking-wider rounded-btn transition-colors cursor-pointer"
              >
                Get Tax Summary
              </button>
            </div>

            {/* Pending Balance Card */}
            <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-44">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Escrow Pending</span>
                <AlertCircle size={20} className="text-slate-350" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{currentStats.pending.toLocaleString()}</h3>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">In-progress job holds</p>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-100  pt-2.5">
                Will clear immediately upon customer job completion verification.
              </div>
            </div>

            {/* Available Balance Card */}
            <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-premium relative overflow-hidden flex flex-col justify-between h-44">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/80">Available Balance</span>
                <Wallet size={20} className="text-white/70" />
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-black">₹{balance.toLocaleString()}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={12} className="text-secondary" />
                  <span className="text-[10px] font-bold text-white">Next Auto-Payout: 27 Jul, ₹{balance.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-2 bg-white text-slate-900 font-extrabold text-[11px] uppercase tracking-wider rounded-btn hover:bg-page transition-colors cursor-pointer shadow-sm"
              >
                Instant Withdrawal
              </button>
            </div>
            
          </div>

          {/* Ledger Lists grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Transaction History */}
            <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Settlement Status (Recent Jobs)</h3>
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
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-slate-400">
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((txn, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{txn.id}</td>
                        <td className="py-3 text-slate-400">{txn.date}</td>
                        <td className="py-3 max-w-[150px] truncate">
                          {txn.desc}
                          {txn.status === 'pending' && <span className="block text-[9px] text-amber-500 font-bold uppercase mt-0.5">Pending Escrow</span>}
                        </td>
                        <td className={`py-3 text-right font-black ${
                          txn.status === 'credited' ? 'text-primary' : txn.status === 'pending' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {txn.status === 'credited' ? '+' : txn.status === 'pending' ? '~' : '-'}₹{txn.amount}
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Withdrawal History (Preview) */}
            <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Recent Withdrawals</h3>
                <button onClick={() => setActiveTab('payout_history')} className="text-[10px] font-black uppercase text-primary hover:underline cursor-pointer">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">Transfer Date</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                    {withdrawals.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-8 text-center text-slate-400">
                          No recent withdrawals.
                        </td>
                      </tr>
                    ) : (
                      withdrawals.slice(0,3).map((wth, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{wth.id}</td>
                        <td className="py-3 text-slate-400">{wth.date}</td>
                        <td className="py-3 text-right font-black text-slate-800 dark:text-slate-200">
                          ₹{wth.amount.toLocaleString()}
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </>
      )}

      {/* WITHDRAWAL DIALOG POPUP */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="w-full max-w-md bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card shadow-premium p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100  pb-4 mb-4">
                <h4 className="text-base sm:text-lg font-black text-slate-855 dark:text-white">Instant Wallet Transfer</h4>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setErrorMsg('');
                    setWithdrawAmount('');
                  }}
                  className="w-8 h-8 rounded-full bg-page text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="p-3.5 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
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
                    className="input-field dark:border-slate-800 dark:text-white"
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
