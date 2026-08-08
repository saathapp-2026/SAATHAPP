import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRightLeft, Download, FileText, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { _loadHubModuleForExport } from '../../../services/seller/sellerHubModulesService';

function Badge({ status }) {
  const styles = {
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    failed: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  };
  const Icons = {
    completed: CheckCircle2,
    pending: Clock,
  };
  const Icon = Icons[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${styles[status] || styles.pending}`}>
      <Icon size={12} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function SettlementsPlaceholder() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const all = _loadHubModuleForExport('wallet') || [];
    setData(all.filter(r => r.method === 'settlement'));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Settlement History</h2>
          <p className="text-sm text-slate-500">View bank payouts automatically transferred to your account.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Reference ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.ref}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-slate-500">{row.name}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                    ₹{row.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={row.status} />
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No settlements found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function WithdrawalsPlaceholder() {
  const [data, setData] = useState([]);
  const [reqAmount, setReqAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const all = _loadHubModuleForExport('wallet') || [];
    setData(all.filter(r => r.method === 'bank' && r.type === 'debit'));
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!reqAmount || isNaN(reqAmount) || Number(reqAmount) <= 0) return toast.error('Invalid amount');
    setLoading(true);
    setTimeout(() => {
      setData(prev => [{
        id: `wd-${Date.now()}`,
        ref: `WDR-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString(),
        amount: Number(reqAmount),
        status: 'pending'
      }, ...prev]);
      toast.success('Withdrawal request submitted');
      setReqAmount('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Request Manual Payout</h3>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (₹)</label>
              <input type="number" required value={reqAmount} onChange={e => setReqAmount(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="e.g. 5000" />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50">
              {loading ? 'Processing...' : 'Withdraw Funds'}
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Landmark size={14} className="text-slate-400" /> HDFC Bank ending in 5678
            </p>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Payout History</h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-2">Ref</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-2 font-medium text-slate-900 dark:text-slate-100">{row.ref}</td>
                    <td className="px-4 py-2 text-slate-500">{new Date(row.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 font-medium">₹{row.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2"><Badge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatementPlaceholder() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const all = _loadHubModuleForExport('wallet') || [];
    setData(all);
  }, []);

  const filtered = data.filter(r => 
    r.ref.toLowerCase().includes(search.toLowerCase()) || 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Account Statement</h2>
          <p className="text-sm text-slate-500">Complete ledger of all credits and debits.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search reference..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-emerald-500" />
          </div>
          <button className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter size={16} className="text-slate-500" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3 text-right">Debit (Dr)</th>
                <th className="px-4 py-3 text-right">Credit (Cr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 text-slate-500">{new Date(row.date).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{row.name}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-mono">{row.ref}</td>
                  <td className="px-4 py-3 text-right font-medium text-rose-600 dark:text-rose-400">
                    {row.type === 'debit' ? `₹${row.amount.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-600 dark:text-emerald-400">
                    {row.type === 'credit' ? `₹${row.amount.toLocaleString('en-IN')}` : '-'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
