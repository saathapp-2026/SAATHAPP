import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Download, AlertCircle, ArrowUpRight, Check } from 'lucide-react';

export default function WalletCard() {
  const [balance, setBalance] = useState(1450); // Incentives / Tips
  const [salary, setSalary] = useState(18500); // Fixed base salary
  const [pendingSalary, setPendingSalary] = useState(0); // Pending settlement
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [ledger, setLedger] = useState([
    { id: 'PAY-8924', date: 'Jul 01, 2026', desc: 'Monthly Base Salary Credit', amount: 18500, type: 'salary', status: 'credited' },
    { id: 'PAY-8812', date: 'Jun 28, 2026', desc: 'Performance Incentive Bonus', amount: 1200, type: 'incentive', status: 'credited' },
    { id: 'PAY-8740', date: 'Jun 25, 2026', desc: 'Wallet Withdrawal Payout', amount: 2500, type: 'withdrawal', status: 'debited' },
    { id: 'PAY-8601', date: 'Jun 01, 2026', desc: 'Monthly Base Salary Credit', amount: 18500, type: 'salary', status: 'credited' }
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

    setBalance(prev => prev - amountVal);
    
    const newRow = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      desc: 'Wallet Incentive Withdrawal',
      amount: amountVal,
      type: 'withdrawal',
      status: 'debited'
    };

    setLedger(prev => [newRow, ...prev]);
    setWithdrawAmount('');
    setErrorMsg('');
    setShowWithdrawModal(false);
    alert(`Withdrawal of ₹${amountVal} completed successfully! Settlements clear in 24 hours.`);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Wallet Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Incentives balance */}
        <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-premium relative overflow-hidden flex flex-col justify-between h-44">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/80">Incentives & Tips</span>
            <Wallet size={20} className="text-white/70" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black">₹{balance.toLocaleString()}</h2>
            <p className="text-[10px] text-white/75 font-medium flex items-center gap-1">
              <ShieldCheck size={12} className="text-secondary" />
              <span>Available for instant withdrawal</span>
            </p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full py-2 bg-white text-slate-900 font-extrabold text-[11px] uppercase tracking-wider rounded-btn hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
          >
            Withdraw Incentives
          </button>
        </div>

        {/* Monthly Salary Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Monthly Base Salary</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/50 text-[9px] font-black uppercase">
              Paid (Jul 1)
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{salary.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">HDFC Bank - XXXX5678</p>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-2.5">
            Basic salary settled by Service Professional (Rahul Kumar) monthly.
          </div>
        </div>

        {/* Pending Salary Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Next Payout Estimate</span>
            <AlertCircle size={20} className="text-slate-350" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{pendingSalary.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Settle cycle: Aug 01, 2026</p>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-2.5">
            Accruing working hours and attendance credits are reviewed daily.
          </div>
        </div>

      </div>

      {/* Salary & Payout History Ledger */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-850/80 pb-3">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Payroll Ledger</h3>
          <button
            onClick={() => alert('Salary statements downloaded successfully.')}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-primary hover:text-primary-dark cursor-pointer"
          >
            <Download size={13} />
            <span>Download All Statements</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-slate-655 dark:text-slate-400">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Credit Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
              {ledger.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{row.id}</td>
                  <td className="py-3 text-slate-400">{row.date}</td>
                  <td className="py-3 truncate max-w-[200px]">{row.desc}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      row.type === 'salary' 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200/50' 
                        : row.type === 'incentive'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                          : 'bg-rose-50 text-rose-500 border border-rose-200/50'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-black ${
                    row.status === 'credited' ? 'text-primary' : 'text-rose-500'
                  }`}>
                    {row.status === 'credited' ? '+' : '-'}₹{row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <h4 className="text-base sm:text-lg font-black text-slate-855 dark:text-white">Incentive Withdrawal</h4>
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
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Available limit</span>
                    <span className="text-sm font-black text-slate-800 dark:text-white">₹{balance.toLocaleString()}</span>
                  </div>
                  <div className="text-right text-[10px] font-bold text-slate-400">
                    Bank: HDFC Bank (XXXX5678)
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="field-label">Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount to cash out"
                    className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-danger font-extrabold flex items-center gap-1 bg-rose-50 dark:bg-rose-955/20 p-2.5 rounded-lg border border-rose-200/50">
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
