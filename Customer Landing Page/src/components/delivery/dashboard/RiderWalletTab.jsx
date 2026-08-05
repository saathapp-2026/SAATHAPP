import React, { useState, useMemo } from 'react';
import {
  Wallet, Landmark, ArrowRight, CheckCircle2, ShieldCheck, CreditCard, Clock, RefreshCw,
  Download, Share2, Printer, FileSpreadsheet, FileCode, FileText, ChevronDown, Sparkles,
  ArrowUpRight, ArrowDownRight, DollarSign, Calendar, TrendingUp, BarChart3, HelpCircle,
  Plus, Edit3, X, Lock, AlertCircle, Shield, Check, Info, User, Zap, PieChart, Layers, Search,
  MoreVertical, RotateCcw, Bell
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderWalletTab() {
  const { formData, dashboardData, addToast, setActiveTab } = useDelivery();

  // --- Date Filter & Control States ---
  const [dateRange, setDateRange] = useState('01 Aug - 31 Aug 2026');
  const [isStatementDropdownOpen, setIsStatementDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isBankMenuOpen, setIsBankMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trendPeriod, setTrendPeriod] = useState('This Month');
  const [trendType, setTrendType] = useState('Income Trend'); // 'Income Trend' | 'Withdraw Trend' | 'Bonus Trend' | 'Tips Trend' | 'Payout Trend'

  // --- Modals State ---
  const [activeModal, setActiveModal] = useState(null); // 'withdraw' | 'addBank' | 'schedulePayout' | 'txnDetails' | 'raiseTicket' | 'callSupport' | 'chatSupport' | 'faqs' | 'paymentPolicies'
  const [selectedTxn, setSelectedTxn] = useState(null);

  // --- Support Modals State ---
  const [ticketForm, setTicketForm] = useState({ category: 'Bank Payout Delay', txnId: 'TXN-90838', description: '' });
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello Vikram! 🖐️ I am your 24×7 SaathApp Financial Assistant. How can I help you with your bank payout or wallet balance today?' }
  ]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // --- Withdraw Form State ---
  const [withdrawAmount, setWithdrawAmount] = useState('2450');
  const [withdrawOtp, setWithdrawOtp] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // --- Add/Edit Bank Form State ---
  const [bankDetails, setBankDetails] = useState({
    bankName: formData?.bankName || 'State Bank of India',
    accountHolderName: formData?.fullName || formData?.accountHolderName || 'Vikram Singh',
    accountNumber: formData?.accountNumber || '38920194820',
    ifscCode: formData?.ifscCode || 'SBIN0001234',
    accountType: 'Savings',
    upiId: 'vikramsingh@okabi',
    kycStatus: 'Verified ✓'
  });

  // --- Wallet Settings State ---
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(true);
  const [payoutFrequency, setPayoutFrequency] = useState('Daily Settlement');
  const [emailStatements, setEmailStatements] = useState(true);

  // --- Transactions Filter State ---
  const [txnFilter, setTxnFilter] = useState('All');
  const [txnSearchQuery, setTxnSearchQuery] = useState('');

  // --- Mock Transactions Data (Page 38 PDF) ---
  const initialTransactions = [
    {
      id: 'TXN-90841',
      date: '31 Aug 2026',
      time: '10:31 AM',
      description: 'Grocery Delivery - DEL-98419',
      category: 'Earnings',
      type: 'Credit',
      credit: 85.00,
      debit: 0,
      balance: 2450.00,
      status: 'Success',
      utr: 'UTR-981240981'
    },
    {
      id: 'TXN-90840',
      date: '31 Aug 2026',
      time: '10:04 AM',
      description: 'Medicine Delivery - DEL-98418',
      category: 'Earnings',
      type: 'Credit',
      credit: 110.00,
      debit: 0,
      balance: 2365.00,
      status: 'Success',
      utr: 'UTR-981240980'
    },
    {
      id: 'TXN-90839',
      date: '31 Aug 2026',
      time: '09:19 AM',
      description: 'Customer Tip - DEL-98417',
      category: 'Tips',
      type: 'Credit',
      credit: 20.00,
      debit: 0,
      balance: 2255.00,
      status: 'Success',
      utr: 'UTR-981240979'
    },
    {
      id: 'TXN-90838',
      date: '30 Aug 2026',
      time: '09:03 PM',
      description: 'Withdraw to Bank (SBI ****4820)',
      category: 'Withdrawals',
      type: 'Debit',
      credit: 0,
      debit: 1500.00,
      balance: 2235.00,
      status: 'Success',
      utr: 'UTR-981240978'
    },
    {
      id: 'TXN-90837',
      date: '30 Aug 2026',
      time: '08:45 PM',
      description: 'Peak Hour Bonus - 5 Orders Target Completed',
      category: 'Bonuses',
      type: 'Credit',
      credit: 50.00,
      debit: 0,
      balance: 3735.00,
      status: 'Success',
      utr: 'UTR-981240977'
    },
    {
      id: 'TXN-90836',
      date: '29 Aug 2026',
      time: '06:15 PM',
      description: 'Weekly Incentive Target Bonus (20 Orders)',
      category: 'Incentives',
      type: 'Credit',
      credit: 500.00,
      debit: 0,
      balance: 3685.00,
      status: 'Success',
      utr: 'UTR-981240976'
    },
    {
      id: 'TXN-90835',
      date: '28 Aug 2026',
      time: '02:10 PM',
      description: 'Refund for Bank Transfer Failure (TXN-90822)',
      category: 'Refunds',
      type: 'Credit',
      credit: 2500.00,
      debit: 0,
      balance: 3185.00,
      status: 'Success',
      utr: 'UTR-981240975'
    }
  ];

  const [transactions, setTransactions] = useState(initialTransactions);

  // --- Filtered Transactions ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (txnFilter !== 'All' && t.category !== txnFilter) return false;
      if (
        txnSearchQuery.trim() &&
        !t.id.toLowerCase().includes(txnSearchQuery.toLowerCase()) &&
        !t.description.toLowerCase().includes(txnSearchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [transactions, txnFilter, txnSearchQuery]);

  // --- Payout History Data (Page 42 PDF) ---
  const payoutHistory = [
    { id: 'PAY-88210', amount: 35200, date: '01 Aug 2026', bank: 'State Bank of India (****4820)', status: 'Success', utr: 'UTR-991204891' },
    { id: 'PAY-88209', amount: 8900, date: '25 Jul 2026', bank: 'State Bank of India (****4820)', status: 'Success', utr: 'UTR-991204890' },
    { id: 'PAY-88208', amount: 7450, date: '18 Jul 2026', bank: 'State Bank of India (****4820)', status: 'Success', utr: 'UTR-991204889' }
  ];

  // --- Refresh Handler ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    addToast?.('Refreshing wallet balance & payout records...', 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      addToast?.('Wallet & Payouts data updated!', 'success');
    }, 700);
  };

  // --- File Download Generator (PDF / Excel / CSV / Word) ---
  const generateAndDownloadStatement = (format = 'pdf') => {
    setIsStatementDropdownOpen(false);
    setIsExportDropdownOpen(false);
    addToast?.(`Generating Wallet Statement (${format.toUpperCase()})...`, 'info');

    let blobContent = '';
    let mimeType = 'text/html';
    let fileExtension = format.toLowerCase();

    if (format === 'csv') {
      mimeType = 'text/csv;charset=utf-8;';
      fileExtension = 'csv';
      blobContent = 'Transaction ID,Date,Time,Description,Category,Type,Credit,Debit,Balance,Status,UTR Number\n';
      filteredTransactions.forEach((t) => {
        blobContent += `"${t.id}","${t.date}","${t.time}","${t.description}","${t.category}","${t.type}",${t.credit},${t.debit},${t.balance},"${t.status}","${t.utr}"\n`;
      });
    } else if (format === 'excel') {
      mimeType = 'application/vnd.ms-excel';
      fileExtension = 'xls';
      blobContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Wallet_Statement</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
<body><table><thead><tr><th>TXN ID</th><th>Date</th><th>Description</th><th>Category</th><th>Credit (₹)</th><th>Debit (₹)</th><th>Balance (₹)</th><th>Status</th></tr></thead><tbody>`;
      filteredTransactions.forEach((t) => {
        blobContent += `<tr><td>${t.id}</td><td>${t.date} ${t.time}</td><td>${t.description}</td><td>${t.category}</td><td>₹${t.credit}</td><td>₹${t.debit}</td><td>₹${t.balance}</td><td>${t.status}</td></tr>`;
      });
      blobContent += `</tbody></table></body></html>`;
    } else if (format === 'word') {
      mimeType = 'application/msword';
      fileExtension = 'doc';
      blobContent = `<html xmlns:w="urn:schemas-microsoft-com:office:word">
<head><title>Wallet Statement</title></head>
<body><h2>SaathApp Logistics India - Wallet Statement</h2><p>Rider: Vikram Singh (RIDER1024)</p><table><thead><tr><th>TXN ID</th><th>Date</th><th>Description</th><th>Credit</th><th>Debit</th><th>Balance</th></tr></thead><tbody>`;
      filteredTransactions.forEach((t) => {
        blobContent += `<tr><td>${t.id}</td><td>${t.date}</td><td>${t.description}</td><td>₹${t.credit}</td><td>₹${t.debit}</td><td>₹${t.balance}</td></tr>`;
      });
      blobContent += `</tbody></table></body></html>`;
    } else {
      // PDF / HTML Statement File
      mimeType = 'text/html';
      fileExtension = 'html';
      blobContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>SaathApp Wallet & Payout Statement</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #0f172a; background: #ffffff; }
    .header { border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; items-center; }
    .logo { font-size: 22px; font-weight: 900; color: #f59e0b; text-transform: uppercase; }
    .title { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 5px; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 13px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .meta-item strong { display: block; color: #64748b; font-size: 10px; text-transform: uppercase; }
    .meta-item span { font-weight: 800; font-size: 14px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { background: #0f172a; color: #ffffff; font-size: 11px; text-transform: uppercase; padding: 10px; text-align: left; }
    td { border-bottom: 1px solid #e2e8f0; padding: 10px; font-size: 12px; color: #334155; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .credit { color: #16a34a; font-weight: 800; font-family: monospace; }
    .debit { color: #dc2626; font-weight: 800; font-family: monospace; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">SAATHAPP LOGISTICS INDIA</div>
      <div class="title">Official Wallet &amp; Bank Payout Statement</div>
    </div>
    <div style="text-align: right; font-size: 11px; color: #64748b;">
      <div>Generated: ${new Date().toLocaleString()}</div>
      <div>Agent: Vikram Singh (RIDER1024)</div>
    </div>
  </div>

  <div class="meta-box">
    <div class="meta-item"><strong>Available Wallet Balance</strong><span>₹2,450.00</span></div>
    <div class="meta-item"><strong>Monthly Earnings</strong><span>₹38,450.00</span></div>
    <div class="meta-item"><strong>Bank Account</strong><span>SBI (****4820)</span></div>
    <div class="meta-item"><strong>KYC Status</strong><span>VERIFIED ✓</span></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Transaction ID</th>
        <th>Date & Time</th>
        <th>Description</th>
        <th>Category</th>
        <th>Credit (₹)</th>
        <th>Debit (₹)</th>
        <th>Running Balance</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${filteredTransactions.map((t) => `
        <tr>
          <td><strong>${t.id}</strong></td>
          <td>${t.date} ${t.time}</td>
          <td>${t.description}</td>
          <td>${t.category}</td>
          <td class="credit">${t.credit > 0 ? '+₹' + t.credit : '-'}</td>
          <td class="debit">${t.debit > 0 ? '-₹' + t.debit : '-'}</td>
          <td><strong>₹${t.balance}</strong></td>
          <td><span style="color:#16a34a; font-weight:800;">${t.status}</span></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    256-Bit SSL Encrypted System Statement • SaathApp Logistics India Pvt Ltd
  </div>
</body>
</html>`;
    }

    try {
      const blob = new Blob([blobContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SaathApp_Wallet_Statement_${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);

      addToast?.(`Wallet Statement (${format.toUpperCase()}) downloaded successfully!`, 'success');
    } catch (err) {
      addToast?.(`Downloaded Wallet Statement (${format.toUpperCase()})!`, 'success');
    }
  };

  // --- Instant Withdraw Submit Handler ---
  const handleConfirmWithdraw = (e) => {
    e.preventDefault();
    const numAmt = parseFloat(withdrawAmount);
    if (!numAmt || numAmt < 100) {
      addToast?.('Minimum withdrawal amount is ₹100', 'warning');
      return;
    }
    if (numAmt > 2450) {
      addToast?.('Withdrawal amount cannot exceed available balance of ₹2,450', 'warning');
      return;
    }

    setIsWithdrawing(true);
    addToast?.(`Verifying OTP & initiating instant penny drop of ₹${numAmt} to SBI Account ****4820...`, 'info');

    setTimeout(() => {
      setIsWithdrawing(false);
      setActiveModal(null);
      // Add new debit transaction record
      const newTxn = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: `Withdrawal to Bank (${bankDetails.bankName})`,
        category: 'Withdrawals',
        type: 'Debit',
        credit: 0,
        debit: numAmt,
        balance: 2450 - numAmt,
        status: 'Success',
        utr: `UTR-${Math.floor(100000000 + Math.random() * 900000000)}`
      };
      setTransactions([newTxn, ...transactions]);
      addToast?.(`🎉 ₹${numAmt} successfully transferred to ${bankDetails.bankName} (${bankDetails.accountNumber.slice(-4)})!`, 'success');
    }, 1200);
  };

  // --- Save Bank Details Handler ---
  const handleSaveBank = (e) => {
    e.preventDefault();
    setActiveModal(null);
    addToast?.('Bank account details updated and penny drop verified!', 'success');
  };

  return (
    <div className="space-y-8 sa-fade pb-16">

      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Recommended Layout: Date Filter, Refresh, Download, Export) */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Wallet size={16} /> Rider Financial Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Earnings &amp; Bank Payouts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
            Track your earnings, wallet balance &amp; manage instant bank payouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Date Range Dropdown Pill */}
          <div className="relative w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-3 py-2 text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center justify-between gap-1.5 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all duration-150 touch-manipulation">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
              <select
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value);
                  addToast?.(`Payouts date range set to ${e.target.value}`, 'info');
                }}
                className="bg-transparent appearance-none font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-4"
              >
                <option value="01 Aug - 31 Aug 2026">01 Aug – 31 Aug 2026</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Custom Date">Custom Date</option>
              </select>
            </div>
            <ChevronDown size={14} className="text-slate-400 pointer-events-none shrink-0" />
          </div>

          {/* 2. Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className={`w-[calc(50%-4px)] sm:w-auto px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none ${isRefreshing ? 'text-amber-500' : ''}`}
            title="Refresh Payout Data"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-amber-500' : ''} />
            <span>Refresh</span>
          </button>

          {/* 3. Transaction History Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('recent-transactions-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              addToast?.('Navigated to Recent Transactions', 'info');
            }}
            className="w-[calc(50%-4px)] sm:w-auto px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
          >
            <FileText size={14} className="text-slate-500 dark:text-slate-400" />
            <span>TXN History</span>
          </button>

          {/* 4. Payout History Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('payout-history-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              addToast?.('Navigated to Bank Payout History', 'info');
            }}
            className="w-[calc(50%-4px)] sm:w-auto px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
          >
            <Landmark size={14} className="text-slate-500 dark:text-slate-400" />
            <span>Payout History</span>
          </button>

          {/* 5. Export Dropdown Button */}
          <div className="relative w-[calc(50%-4px)] sm:w-auto">
            <button
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <Share2 size={14} className="text-amber-500" /> Export <ChevronDown size={12} />
            </button>
            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 sa-rise">
                <button type="button" onClick={() => generateAndDownloadStatement('pdf')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileText size={14} className="text-rose-500" /> Export PDF Report
                </button>
                <button type="button" onClick={() => generateAndDownloadStatement('excel')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel (.xls)
                </button>
                <button type="button" onClick={() => generateAndDownloadStatement('csv')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileCode size={14} className="text-amber-500" /> Export CSV (.csv)
                </button>
                <button type="button" onClick={() => generateAndDownloadStatement('word')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileText size={14} className="text-blue-500" /> Export Word (.doc)
                </button>
                <button type="button" onClick={() => window.print()} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <Printer size={14} className="text-sky-500" /> Print Summary
                </button>
              </div>
            )}
          </div>

          {/* 6. Download Statement Dropdown Button */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsStatementDropdownOpen(!isStatementDropdownOpen)}
              className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <Download size={14} /> Download Statement <ChevronDown size={12} />
            </button>
            {isStatementDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 sa-rise">
                <button type="button" onClick={() => generateAndDownloadStatement('pdf')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileText size={14} className="text-rose-500" /> Download PDF Statement
                </button>
                <button type="button" onClick={() => generateAndDownloadStatement('excel')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileSpreadsheet size={14} className="text-emerald-500" /> Download Excel (.xls)
                </button>
                <button type="button" onClick={() => generateAndDownloadStatement('csv')} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileCode size={14} className="text-amber-500" /> Download CSV (.csv)
                </button>
                <button type="button" onClick={() => window.print()} className="w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <Printer size={14} className="text-sky-500" /> Print Statement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. WALLET CARDS SECTION (Recommended Layout: Available, Pending, Today's, Monthly, Bonus, Tips) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {/* 1. Available Balance */}
        <button
          type="button"
          onClick={() => setActiveModal('withdraw')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
              <Wallet size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">Available Balance</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹2,450</strong>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="text-amber-500">✦</span> Withdrawable
          </span>
        </button>

        {/* 2. Pending Bonus */}
        <button
          type="button"
          onClick={() => setTxnFilter('Bonuses')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">Pending Bonus</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹650</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block">
            2 Bonuses Pending
          </span>
        </button>

        {/* 3. Today's Earnings */}
        <button
          type="button"
          onClick={() => setTxnFilter('Earnings')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">Today's Earnings</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹1,450</strong>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block">
            +12% from yesterday
          </span>
        </button>

        {/* 4. This Month Earnings */}
        <button
          type="button"
          onClick={() => setTxnFilter('Earnings')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Layers size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">This Month Earnings</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹38,450</strong>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block">
            +32% from last month
          </span>
        </button>

        {/* 5. Bonus */}
        <button
          type="button"
          onClick={() => setTxnFilter('Bonuses')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
              <BarChart3 size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">This Week Earnings</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹8,900</strong>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block">
            +18% from last week
          </span>
        </button>

        {/* 6. Tips */}
        <button
          type="button"
          onClick={() => setTxnFilter('Tips')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-xs">
              <DollarSign size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">Tips Received</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹1,250</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 block">
            This Month
          </span>
        </button>

        {/* 7. Referral Earnings */}
        <button
          type="button"
          onClick={() => addToast?.('Referral link copied to clipboard!', 'success')}
          className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-left space-y-2 flex flex-col justify-between select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 shadow-xs">
              <User size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold block leading-tight">Referral Earnings</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5 block tracking-tight">₹1,020</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 block">
            Total Earned
          </span>
        </button>
      </div>


      {/* ========================================================================= */}
      {/* 3. WITHDRAW SECTION (Recommended Layout: Withdraw, Bank, UPI, Schedule)  */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Row 1: Wallet Balance (Withdraw) + Destination Bank Account */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Wallet Balance Card (Withdraw Action) */}
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-slate-950 shadow-xl space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-slate-950/10 px-3 py-1 rounded-full">
                  Wallet Balance
                </span>
                <span className="text-[10px] font-extrabold text-slate-900 bg-white/30 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={11} /> Auto Payout Active
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xs font-bold text-slate-900 block">Available Withdrawable Balance</span>
                <h2 className="text-4xl font-black text-slate-950 font-mono mt-1">₹2,450</h2>
                <p className="text-[11px] font-bold text-slate-900 mt-1 leading-snug">
                  Payout Frequency: <strong>Daily Payout</strong> (Automatic Next Morning Transfer)
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-950/20">
              <button
                type="button"
                onClick={() => setActiveModal('withdraw')}
                className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
              >
                <Zap size={16} /> Instant Withdraw ₹2,450 Now
              </button>

              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setActiveModal('schedulePayout')}
                  className="py-2 rounded-xl bg-white/20 hover:bg-white/30 text-slate-950 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-center select-none"
                >
                  Schedule Payout
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('addBank')}
                  className="py-2 rounded-xl bg-white/20 hover:bg-white/30 text-slate-950 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-center select-none"
                >
                  Add Bank
                </button>
                <button
                  type="button"
                  onClick={() => generateAndDownloadStatement('pdf')}
                  className="py-2 rounded-xl bg-white/20 hover:bg-white/30 text-slate-950 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation text-center select-none"
                >
                  Statement
                </button>
              </div>
            </div>
          </div>

          {/* Destination Bank Account Card */}
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Header: Title + Green Verified Badge + Option Menu Dots */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Destination Bank Account
                  </h3>
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={13} className="fill-emerald-600 text-white dark:text-slate-900" /> Verified
                  </span>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsBankMenuOpen(!isBankMenuOpen)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation"
                    title="Bank Options"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {isBankMenuOpen && (
                    <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 sa-rise">
                      <button type="button" onClick={() => { setActiveModal('addBank'); setIsBankMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                        <Edit3 size={13} className="text-sky-500" /> Edit Bank Details
                      </button>
                      <button type="button" onClick={() => { addToast?.('Re-verifying bank account via penny drop...', 'info'); setIsBankMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                        <CheckCircle2 size={13} className="text-emerald-500" /> Verify Account
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 1: SBI Bank Logo + Account Holder + Bank Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0066B3] flex items-center justify-center text-white shadow-md shrink-0">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" fill="#0066B3" stroke="white" strokeWidth="1" />
                      <circle cx="12" cy="12" r="3.5" fill="white" />
                      <rect x="11" y="12" width="2" height="6" fill="white" />
                    </svg>
                  </div>
                  <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">SBI</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Account Holder</span>
                  <strong className="text-sm font-black text-slate-900 dark:text-white block mt-0.5">{bankDetails.accountHolderName}</strong>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Bank Name</span>
                  <strong className="text-sm font-black text-slate-900 dark:text-white block mt-0.5">{bankDetails.bankName}</strong>
                </div>
              </div>

              {/* Row 2: Account Number + IFSC Code + Account Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Account Number</span>
                  <strong className="text-sm font-mono font-black text-slate-900 dark:text-white block mt-0.5">{bankDetails.accountNumber}</strong>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">IFSC Code</span>
                  <strong className="text-sm font-mono font-black text-slate-900 dark:text-white block mt-0.5">{bankDetails.ifscCode}</strong>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Account Type</span>
                  <strong className="text-sm font-black text-slate-900 dark:text-white block mt-0.5">{bankDetails.accountType || 'Savings'}</strong>
                </div>
              </div>

              {/* Row 3: UPI ID + KYC Status + Penny Drop */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">UPI ID</span>
                  <strong className="text-xs font-mono font-black text-slate-900 dark:text-white block mt-0.5">vikramsingh@oksbi</strong>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">KYC Status</span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={13} className="fill-emerald-500 text-white dark:text-slate-900" /> Verified
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Penny Drop</span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={13} className="fill-emerald-500 text-white dark:text-slate-900" /> Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveModal('addBank')}
                className="w-full sm:w-1/3 py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 font-extrabold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
              >
                <RotateCcw size={14} className="text-blue-600 dark:text-blue-400" /> Change Bank
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('addBank')}
                className="w-full sm:w-2/3 py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
              >
                <Plus size={14} className="text-slate-700 dark:text-slate-300" /> Add New Bank
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Withdraw Quick Actions (Bank, UPI, Schedule Payout) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xl p-5 space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">
            Withdraw Quick Actions
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Add Bank */}
            <button
              type="button"
              onClick={() => setActiveModal('addBank')}
              className="py-3 px-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <Landmark size={16} className="text-blue-600 dark:text-blue-400" />
              <span>Add Bank</span>
            </button>

            {/* Add UPI */}
            <button
              type="button"
              onClick={() => setActiveModal('addBank')}
              className="py-3 px-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-900 dark:text-purple-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CreditCard size={16} className="text-purple-600 dark:text-purple-400" />
              <span>Add UPI</span>
            </button>

            {/* Schedule Auto Payout */}
            <button
              type="button"
              onClick={() => setActiveModal('schedulePayout')}
              className="relative py-3 px-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <span className="absolute -top-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                ON
              </span>
              <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Auto Payout</span>
            </button>

            {/* Help Center */}
            <button
              type="button"
              onClick={() => {
                addToast?.('Connecting to 24/7 Rider Help & Support Portal...', 'info');
                if (setActiveTab) setActiveTab('support');
                setTimeout(() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/help-support';
                  }
                }, 300);
              }}
              className="py-3 px-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <HelpCircle size={16} className="text-amber-600 dark:text-amber-400" />
              <span>Help Center</span>
            </button>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 4. CHARTS SECTION (Recommended Layout: Income, Bonus, Tips, Payout)       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 1. Earnings Breakdown Donut Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Earnings Breakdown (This Month)
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => generateAndDownloadStatement('pdf')}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 active:scale-95 transition-all duration-150 cursor-pointer touch-manipulation"
                title="Download Breakdown PDF"
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 active:scale-95 transition-all duration-150 cursor-pointer touch-manipulation"
                title="Print Breakdown"
              >
                Print
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-1">
            {/* SVG Donut Chart with Center Text */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Base Fare (42%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" strokeWidth="18" strokeDasharray="118.7 164" strokeDashoffset="0" />
                {/* Distance Fare (23%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="18" strokeDasharray="65.0 217.7" strokeDashoffset="-118.7" />
                {/* Tips (16%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F97316" strokeWidth="18" strokeDasharray="45.2 237.5" strokeDashoffset="-183.7" />
                {/* Peak Bonus (10%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#A855F7" strokeWidth="18" strokeDasharray="28.3 254.4" strokeDashoffset="-228.9" />
                {/* Incentives (6%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#06B6D4" strokeWidth="18" strokeDasharray="17.0 265.7" strokeDashoffset="-257.2" />
                {/* Others (3%) */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#94A3B8" strokeWidth="18" strokeDasharray="8.5 274.2" strokeDashoffset="-274.2" />
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">₹38,450</span>
                <span className="text-[11px] font-extrabold text-slate-400">Total</span>
              </div>
            </div>

            {/* Right Legend List */}
            <div className="w-full space-y-2.5 text-xs font-semibold">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Base Fare
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹16,250 <span className="text-slate-400 font-normal">(42%)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Distance Fare
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹8,950 <span className="text-slate-400 font-normal">(23%)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Tips
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹6,250 <span className="text-slate-400 font-normal">(16%)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" /> Peak Bonus
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹3,850 <span className="text-slate-400 font-normal">(10%)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" /> Incentives
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹2,150 <span className="text-slate-400 font-normal">(6%)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" /> Others
                </span>
                <span className="font-mono font-black text-slate-900 dark:text-white">
                  ₹1,000 <span className="text-slate-400 font-normal">(3%)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Earnings Trend Smooth Area Line Chart Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2 flex-wrap gap-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Earnings Trend
            </h3>

            <div className="flex items-center gap-2">
              {/* Trend Filter Pills */}
              <div className="flex items-center gap-1 text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['Income', 'Bonus', 'Tips', 'Payout'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrendType(`${t} Trend`)}
                    className={`px-2 py-0.5 rounded-lg cursor-pointer transition-all duration-150 touch-manipulation ${
                      trendType.startsWith(t)
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative">
                <select
                  value={trendPeriod}
                  onChange={(e) => setTrendPeriod(e.target.value)}
                  className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold px-3 py-1 pr-6 rounded-xl cursor-pointer focus:outline-none"
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="Today">Today</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Subheader Line */}
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> {trendType} (₹)
            </span>
            <span className="font-mono font-black text-slate-900 dark:text-white">
              Total: ₹38,450
            </span>
          </div>

          {/* Smooth SVG Area Line Chart */}
          <div className="relative w-full h-48 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
              <defs>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Background Lines */}
              <line x1="45" y1="20" x2="485" y2="20" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="55" x2="485" y2="55" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="90" x2="485" y2="90" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="125" x2="485" y2="125" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="150" x2="485" y2="150" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />

              {/* Y-Axis Labels */}
              <text x="35" y="24" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">4K</text>
              <text x="35" y="59" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">3K</text>
              <text x="35" y="94" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">2K</text>
              <text x="35" y="129" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">1K</text>
              <text x="35" y="154" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">0</text>

              {/* X-Axis Dates */}
              <text x="60" y="168" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">01 Aug</text>
              <text x="165" y="168" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">08 Aug</text>
              <text x="270" y="168" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">15 Aug</text>
              <text x="375" y="168" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">22 Aug</text>
              <text x="470" y="168" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">31 Aug</text>

              {/* Area Gradient Fill */}
              <path
                d="M 60,145 C 90,90 120,120 165,55 C 200,90 230,105 270,75 C 310,45 340,95 375,100 C 410,80 440,55 470,30 L 470,150 L 60,150 Z"
                fill="url(#emeraldGradient)"
              />

              {/* Smooth Curved Line Path */}
              <path
                d="M 60,145 C 90,90 120,120 165,55 C 200,90 230,105 270,75 C 310,45 340,95 375,100 C 410,80 440,55 470,30"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Interactive Data Dots */}
              {[
                { x: 60, y: 145, val: '₹200' },
                { x: 105, y: 95, val: '₹1,850' },
                { x: 135, y: 118, val: '₹1,100' },
                { x: 165, y: 55, val: '₹2,900' },
                { x: 200, y: 88, val: '₹1,950' },
                { x: 235, y: 98, val: '₹1,700' },
                { x: 270, y: 75, val: '₹2,450' },
                { x: 305, y: 50, val: '₹3,050' },
                { x: 340, y: 80, val: '₹2,350' },
                { x: 375, y: 100, val: '₹1,600' },
                { x: 410, y: 88, val: '₹2,000' },
                { x: 440, y: 62, val: '₹2,850' },
                { x: 470, y: 30, val: '₹3,500' }
              ].map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  className="fill-[#10B981] stroke-white dark:stroke-slate-900 stroke-2 cursor-pointer hover:r-6 transition-all duration-150 touch-manipulation"
                  onClick={() => addToast?.(`Earnings on point: ${pt.val}`, 'info')}
                />
              ))}
            </svg>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 5. TABLES SECTION (Recommended Layout: Transaction History, Payout History, Tax Reports) */}
      {/* ========================================================================= */}
      <div className="space-y-6">

        {/* 1. Transaction History Table */}
        <div id="recent-transactions-section" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden space-y-4 p-5 scroll-mt-24">
          
          {/* Table Header & Top Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={16} className="text-amber-500" /> Recent Transaction History
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-bold pb-1 sm:pb-0">
                {['All', 'Earnings', 'Tips', 'Bonuses', 'Incentives', 'Withdrawals'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setTxnFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl cursor-pointer active:scale-95 transition-all duration-150 shrink-0 touch-manipulation ${
                      txnFilter === cat
                        ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={txnSearchQuery}
                  onChange={(e) => setTxnSearchQuery(e.target.value)}
                  placeholder="Search TXN ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">TXN ID</th>
                  <th className="p-3.5">Date &amp; Time</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Credit (₹)</th>
                  <th className="p-3.5">Debit (₹)</th>
                  <th className="p-3.5">Balance (₹)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-6">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white">{txn.id}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">
                      {txn.date}
                      <span className="block text-[10px] text-slate-400">{txn.time}</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{txn.description}</td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] font-extrabold">
                        {txn.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-black text-emerald-500">
                      {txn.credit > 0 ? `+₹${txn.credit.toFixed(2)}` : '-'}
                    </td>
                    <td className="p-3.5 font-mono font-black text-rose-500">
                      {txn.debit > 0 ? `-₹${txn.debit.toFixed(2)}` : '-'}
                    </td>
                    <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white">
                      ₹{txn.balance.toFixed(2)}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[10px] font-black border border-emerald-500/20">
                        <CheckCircle2 size={11} /> {txn.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => { setSelectedTxn(txn); setActiveModal('txnDetails'); }}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-[11px] cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => addToast?.(`Downloading TXN Receipt for ${txn.id}...`, 'success')}
                          className="px-2 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-[11px] cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation"
                        >
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Bank Payout History & Payout Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Payout Summary Card (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                  Payout Summary
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('payout-history-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    addToast?.('Navigated to Bank Payout History', 'info');
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Total Payouts</span>
                  <strong className="text-lg font-black font-mono text-slate-900 dark:text-white block mt-0.5">₹35,200</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Successful</span>
                  <strong className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">₹34,700</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Pending</span>
                  <strong className="text-lg font-black font-mono text-orange-500 block mt-0.5">₹500</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Failed</span>
                  <strong className="text-lg font-black font-mono text-rose-500 block mt-0.5">₹0</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Next Payout:</span>
                <strong className="font-bold text-slate-900 dark:text-white">01 Sep 2026</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Estimated Amount:</span>
                <strong className="font-mono font-black text-amber-500">₹2,450</strong>
              </div>
            </div>
          </div>

          {/* Payout History Table (2 Cols) */}
          <div id="payout-history-section" className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-5 space-y-3 scroll-mt-24">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark size={16} className="text-amber-500" /> Bank Payout History
              </h3>
              <span className="text-xs font-bold text-slate-400">Automatic Next Morning Settlements</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Payout ID</th>
                    <th className="p-3">Amount (₹)</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Destination Bank</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                  {payoutHistory.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono font-black text-slate-900 dark:text-white">{p.id}</td>
                      <td className="p-3 font-mono font-black text-amber-500 text-sm">₹{p.amount.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-500">{p.date}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{p.bank}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[10px] font-black border border-emerald-500/20">
                          <CheckCircle2 size={11} /> {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => addToast?.(`Downloading Payout UTR Receipt for ${p.id}...`, 'success')}
                          className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-[11px] cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Tax Reports / Tax Documents Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Landmark size={16} className="text-amber-500" /> Tax Reports &amp; Statements
            </h3>
            <button
              type="button"
              onClick={() => addToast?.('Navigated to all tax certificates', 'info')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-semibold">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                <FileText size={16} className="text-slate-400 shrink-0" /> Annual Tax Summary (FY 2025-26)
              </span>
              <button
                type="button"
                onClick={() => generateAndDownloadStatement('excel')}
                className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation shrink-0 ml-2"
              >
                Download
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                <FileText size={16} className="text-slate-400 shrink-0" /> TDS Certificate (Form 16A)
              </span>
              <button
                type="button"
                onClick={() => generateAndDownloadStatement('pdf')}
                className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation shrink-0 ml-2"
              >
                Download
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                <FileText size={16} className="text-slate-400 shrink-0" /> GST Summary Report
              </span>
              <button
                type="button"
                onClick={() => generateAndDownloadStatement('csv')}
                className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation shrink-0 ml-2"
              >
                Download
              </button>
            </div>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 6. AI SUMMARY SECTION (Recommended Layout: Insights, Recommendations, Targets) */}
      {/* ========================================================================= */}
      <div className="space-y-6">

        {/* 1. Insights & Recommendations: AI Financial Summary Smart Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl text-white space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide text-white">AI Financial Summary &amp; Earnings Insights</h3>
                <span className="text-[10px] text-indigo-300 font-semibold">Real-time smart insights for Vikram Singh</span>
              </div>
            </div>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full flex items-center gap-1 w-fit">
              <CheckCircle2 size={12} /> Expected Weekly Payout: ₹12,300
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Today's Earnings</span>
              <strong className="text-lg font-black font-mono text-white mt-0.5 block">₹1,450</strong>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Weekly Earnings</span>
              <strong className="text-lg font-black font-mono text-white mt-0.5 block">₹8,900</strong>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Monthly Earnings</span>
              <strong className="text-lg font-black font-mono text-white mt-0.5 block">₹38,450</strong>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Expected Payout</span>
              <strong className="text-lg font-black font-mono text-amber-400 mt-0.5 block">₹12,300</strong>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-bold gap-3">
            <span className="text-indigo-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400 shrink-0" />
              <span>AI Recommendation: <strong>Complete 4 more deliveries</strong> this week to unlock your <strong>₹500 weekly target bonus</strong>!</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab?.('activeDeliveries')}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center shrink-0 text-[11px] cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              Start Deliveries Now
            </button>
          </div>
        </div>

        {/* 2. Targets Section: Weekly Target Incentives & Customer Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incentives Card (Targets) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-purple-500" /> Weekly Target Incentives
              </h3>
              <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">
                Target: 20 Orders
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Completed</span>
                <strong className="text-base text-emerald-600 dark:text-emerald-400 font-mono">16</strong>
              </div>
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Remaining</span>
                <strong className="text-base text-amber-500 font-mono">4</strong>
              </div>
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Bonus Unlock</span>
                <strong className="text-base text-purple-600 dark:text-purple-400 font-mono">₹500</strong>
              </div>
            </div>
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[10px] font-extrabold text-slate-500 mb-1">
                <span>Progress (80%)</span>
                <span>4 orders to go!</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[80%]" />
              </div>
            </div>
          </div>

          {/* Customer Tips Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign size={16} className="text-cyan-500" /> Customer Tips Summary
              </h3>
              <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full">
                100% Retained by Rider
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Today's Tips</span>
                <strong className="text-base text-slate-900 dark:text-white font-mono">₹120</strong>
              </div>
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Monthly Tips</span>
                <strong className="text-base text-cyan-600 dark:text-cyan-400 font-mono">₹2,350</strong>
              </div>
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 block">Highest Single Tip</span>
                <strong className="text-base text-emerald-600 dark:text-emerald-400 font-mono">₹300</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Security & Protection Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <ShieldCheck size={16} /> Wallet Security &amp; Protection
            </h3>
            <span className="text-[10px] font-bold text-emerald-400">256-Bit SSL Protected</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] font-extrabold">
            <button
              type="button"
              onClick={() => addToast?.('🔒 OTP Verification Active (256-Bit SSL)', 'success')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">OTP Verification</span>
            </button>

            <button
              type="button"
              onClick={() => addToast?.('🔒 Transaction PIN Protected', 'success')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">Transaction PIN</span>
            </button>

            <button
              type="button"
              onClick={() => addToast?.('🔒 Biometric Fingerprint/FaceID Active', 'success')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">Biometric Access</span>
            </button>

            <button
              type="button"
              onClick={() => addToast?.('🔒 Daily Withdrawal Limit: ₹50,000/day', 'info')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">Limit ₹50,000/day</span>
            </button>

            <button
              type="button"
              onClick={() => addToast?.('🔒 AI Fraud Detection Shield Active', 'success')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">Fraud Detection</span>
            </button>

            <button
              type="button"
              onClick={() => addToast?.('🔒 Registered Device Verified (RIDER1024)', 'success')}
              className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none"
            >
              <CheckCircle2 size={13} className="shrink-0" /> <span className="truncate">Device Verified</span>
            </button>
          </div>
        </div>

        {/* 4. Need Help with Bank Payouts? Footer Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-500" /> Need Help with Bank Payouts?
            </h3>
            <span className="text-[10px] font-extrabold text-slate-400">24×7 Rider Support Line</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => {
                setActiveModal('raiseTicket');
                addToast?.('Opening Ticket Portal...', 'info');
              }}
              className="flex-1 min-w-[130px] sm:min-w-[140px] p-2.5 sm:p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none whitespace-nowrap"
            >
              <FileText size={15} className="text-amber-500 shrink-0" /> Raise Ticket
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModal('callSupport');
                addToast?.('Opening Rider Hotline Desk...', 'info');
              }}
              className="flex-1 min-w-[130px] sm:min-w-[140px] p-2.5 sm:p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none whitespace-nowrap"
            >
              <HelpCircle size={15} className="text-emerald-500 shrink-0" /> Call Support
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModal('chatSupport');
                addToast?.('Opening 24/7 Live Chat Assistant...', 'info');
              }}
              className="flex-1 min-w-[130px] sm:min-w-[140px] p-2.5 sm:p-3 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none whitespace-nowrap"
            >
              <Zap size={15} className="text-sky-500 shrink-0" /> Chat Support
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModal('faqs');
                addToast?.('Opening Payout FAQs...', 'info');
              }}
              className="flex-1 min-w-[130px] sm:min-w-[140px] p-2.5 sm:p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none whitespace-nowrap"
            >
              <Info size={15} className="text-purple-500 shrink-0" /> FAQs
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModal('paymentPolicies');
                addToast?.('Opening Payment & Settlement Policies...', 'info');
              }}
              className="flex-1 min-w-[130px] sm:min-w-[140px] p-2.5 sm:p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation select-none whitespace-nowrap"
            >
              <ShieldCheck size={15} className="text-rose-500 shrink-0" /> Payment Policies
            </button>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* POPUPS & MODALS                                                           */}
      {/* ========================================================================= */}

      {/* WITHDRAW POPUP MODAL (Page 40 PDF Specifications) */}
      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Zap size={18} className="text-amber-500" /> Instant Bank Withdrawal
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <form onSubmit={handleConfirmWithdraw} className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center">
                <span className="font-bold text-slate-600 dark:text-slate-300">Available Wallet Balance:</span>
                <strong className="text-base font-black text-amber-500 font-mono">₹2,450.00</strong>
              </div>

              {/* Preset Amount Pills */}
              <div className="grid grid-cols-4 gap-2">
                {['500', '1000', '2000', '2450'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setWithdrawAmount(amt)}
                    className={`py-2 rounded-xl font-mono font-bold text-xs cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation ${
                      withdrawAmount === amt
                        ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {amt === '2450' ? 'Max' : `₹${amt}`}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Enter Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="100"
                  max="50000"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-mono font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1 font-mono text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                <div className="flex justify-between"><span>Min Withdrawal:</span><span>₹100</span></div>
                <div className="flex justify-between"><span>Max Withdrawal:</span><span>₹50,000</span></div>
                <div className="flex justify-between"><span>Processing Fee:</span><span className="text-emerald-500">₹0 (FREE)</span></div>
                <div className="flex justify-between"><span>GST Component:</span><span>₹0</span></div>
                <div className="flex justify-between font-black text-slate-900 dark:text-white pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Net Received Amount:</span>
                  <strong className="text-amber-500 text-sm">₹{withdrawAmount || '0'}</strong>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Enter 4-Digit Security OTP (Default: 4820)</label>
                <input
                  type="password"
                  maxLength={4}
                  value={withdrawOtp}
                  onChange={(e) => setWithdrawOtp(e.target.value)}
                  placeholder="4820"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-center text-sm font-mono font-black tracking-widest text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isWithdrawing}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow active:scale-95 transition-all duration-150 touch-manipulation disabled:opacity-50"
                >
                  {isWithdrawing ? 'Transferring...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT BANK POPUP MODAL (Page 41 PDF) */}
      {activeModal === 'addBank' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark size={18} className="text-amber-500" /> Destination Bank Account Details
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveBank} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">UPI ID</label>
                <input
                  type="text"
                  value={bankDetails.upiId}
                  onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow active:scale-95 transition-all duration-150 touch-manipulation">
                  Save &amp; Verify Penny Drop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE PAYOUT POPUP MODAL */}
      {activeModal === 'schedulePayout' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={18} className="text-amber-500" /> Schedule Auto Payout Frequency
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">Auto Payout Mode</span>
                <button
                  type="button"
                  onClick={() => setAutoPayoutEnabled(!autoPayoutEnabled)}
                  className={`px-3 py-1 rounded-full font-black text-[10px] cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation ${
                    autoPayoutEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {autoPayoutEnabled ? 'ENABLED ✓' : 'DISABLED'}
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Frequency</label>
                <select
                  value={payoutFrequency}
                  onChange={(e) => setPayoutFrequency(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="Daily Settlement">Daily Settlement (Next Morning 06:00 AM)</option>
                  <option value="Weekly Settlement">Weekly Settlement (Every Monday)</option>
                  <option value="Monthly Settlement">Monthly Settlement (1st of Every Month)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.(`Auto Payout schedule saved: ${payoutFrequency}`, 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow active:scale-95 transition-all duration-150 touch-manipulation"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TXN DETAILS MODAL */}
      {selectedTxn && activeModal === 'txnDetails' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-500" /> Transaction Details: {selectedTxn.id}
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <div className="space-y-2 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              <div className="flex justify-between"><span>Description:</span><strong className="text-slate-900 dark:text-white">{selectedTxn.description}</strong></div>
              <div className="flex justify-between"><span>Date &amp; Time:</span><span>{selectedTxn.date} {selectedTxn.time}</span></div>
              <div className="flex justify-between"><span>Category:</span><span>{selectedTxn.category}</span></div>
              <div className="flex justify-between"><span>Type:</span><span>{selectedTxn.type}</span></div>
              <div className="flex justify-between"><span>UTR Reference:</span><span>{selectedTxn.utr}</span></div>
              <div className="flex justify-between font-black text-sm text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Amount:</span>
                <span className={selectedTxn.credit > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                  {selectedTxn.credit > 0 ? `+₹${selectedTxn.credit}` : `-₹${selectedTxn.debit}`}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => addToast?.(`Downloading TXN receipt for ${selectedTxn.id}...`, 'success')} className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Download Receipt PDF
              </button>
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. RAISE TICKET MODAL */}
      {activeModal === 'raiseTicket' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-500" /> Raise Support Ticket
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setActiveModal(null);
              addToast?.('🎟️ Support Ticket #TCK-98124 raised! Response expected within 2 hours.', 'success');
            }} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Issue Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Bank Payout Delay">Bank Payout Delay / Not Credited</option>
                  <option value="Failed Withdrawal Refund">Failed Withdrawal Refund Issue</option>
                  <option value="Incorrect Bonus / Tips">Incorrect Bonus or Tips Calculation</option>
                  <option value="Bank Account Change">Bank Account / IFSC Change Request</option>
                  <option value="TDS & Tax Certificate Inquiry">TDS &amp; Tax Certificate Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Transaction ID (Optional)</label>
                <input
                  type="text"
                  value={ticketForm.txnId}
                  onChange={(e) => setTicketForm({ ...ticketForm, txnId: e.target.value })}
                  placeholder="e.g. TXN-90838"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Describe your payout issue or question in detail..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow active:scale-95 transition-all duration-150 touch-manipulation">
                  Submit Support Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CALL SUPPORT MODAL */}
      {activeModal === 'callSupport' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle size={18} className="text-emerald-500" /> 24×7 Rider Support Helpline
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Toll-Free Helpline</span>
                  <strong className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">1800-200-SAATH (7228)</strong>
                </div>
                <a
                  href="tel:18002007228"
                  onClick={() => addToast?.('Dialing Toll-Free Hotline 1800-200-7228...', 'info')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black cursor-pointer active:scale-95 transition"
                >
                  Call Now
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Request Immediate Callback</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rider Payout Specialist Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    addToast?.('📞 Callback request received! Support executive calling in ~3 minutes.', 'success');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer active:scale-95 transition"
                >
                  Request Call
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-[11px] flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>For emergency accidents or safety issues, use the <strong>SOS Emergency Button</strong> in the top header.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHAT SUPPORT MODAL */}
      {activeModal === 'chatSupport' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise flex flex-col h-[520px]">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-black">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">24×7 Live Financial Assistant</h3>
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Online • Average response 10s
                  </span>
                </div>
              </div>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 rounded-br-none font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0 text-[10px] font-bold">
              {[
                'Where is my withdrawal?',
                'How to change bank?',
                'Bonus calculation help',
                'Download tax invoice'
              ].map((txt) => (
                <button
                  key={txt}
                  type="button"
                  onClick={() => {
                    const newMsgs = [...chatMessages, { sender: 'user', text: txt }];
                    setChatMessages(newMsgs);
                    setTimeout(() => {
                      setChatMessages([...newMsgs, {
                        sender: 'bot',
                        text: `Regarding "${txt}": All payouts under ₹50,000 are processed via instant IMPS penny drop within 15 minutes to your registered SBI Account (****4820). You can also click Download Statement for PDF receipt.`
                      }]);
                    }, 600);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 shrink-0 cursor-pointer active:scale-95 transition"
                >
                  {txt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              const userTxt = chatInput;
              setChatInput('');
              const updated = [...chatMessages, { sender: 'user', text: userTxt }];
              setChatMessages(updated);
              setTimeout(() => {
                setChatMessages([...updated, {
                  sender: 'bot',
                  text: `Thank you for your message: "${userTxt}". Our AI financial desk has verified your rider account (RIDER1024). Your wallet balance of ₹2,450 is safe & withdrawable.`
                }]);
              }, 700);
            }} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer active:scale-95 transition">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. FAQS MODAL */}
      {activeModal === 'faqs' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise max-h-[550px] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Info size={18} className="text-purple-500" /> Payout &amp; Wallet FAQs
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {[
                {
                  id: 1,
                  q: 'When is my delivery money credited to my wallet?',
                  a: 'Base fares and tips are credited instantly to your wallet upon customer delivery confirmation. Peak bonuses and weekly target incentives are credited every Sunday midnight.'
                },
                {
                  id: 2,
                  q: 'How fast is instant bank withdrawal?',
                  a: 'Instant withdrawal transfers funds to your SBI account via IMPS within 15 seconds to 15 minutes. 100% free with ₹0 processing charge.'
                },
                {
                  id: 3,
                  q: 'What happens if a bank transfer fails?',
                  a: 'If the destination bank server is down, the system automatically cancels the transfer and refunds 100% of the amount back to your available wallet balance.'
                },
                {
                  id: 4,
                  q: 'How do I update or change my destination bank account?',
                  a: 'Click "Change Bank" under the Destination Bank Account card or Quick Actions, enter your new account number & IFSC code, and complete the instant ₹1 penny drop verification.'
                },
                {
                  id: 5,
                  q: 'Do customer tips have any platform deduction?',
                  a: 'No! 100% of customer tips are retained by the rider with zero platform commission or deductions.'
                }
              ].map((faq) => (
                <div key={faq.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/40">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-3 text-left font-black text-slate-900 dark:text-white flex justify-between items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`shrink-0 transition-transform ${expandedFaq === faq.id ? 'rotate-180 text-amber-500' : 'text-slate-400'}`} />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-3 pt-0 text-slate-600 dark:text-slate-300 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 shrink-0">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Close FAQs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. PAYMENT POLICIES MODAL */}
      {activeModal === 'paymentPolicies' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise max-h-[550px] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-rose-500" /> Payment &amp; Settlement Policies
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all duration-150"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-slate-700 dark:text-slate-300 font-medium text-[11px] leading-relaxed">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white text-xs">1. RBI &amp; IMPS Instant Settlement Rules</h4>
                <p>All payouts are settled directly into verified bank accounts using Reserve Bank of India (RBI) approved IMPS rails with 256-Bit SSL encryption.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white text-xs">2. Daily Auto-Payout Cutoff</h4>
                <p>Daily auto-settlements are triggered automatically every morning at 06:00 AM for all balances exceeding ₹100.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white text-xs">3. TDS &amp; Tax Deductions</h4>
                <p>Tax Deducted at Source (TDS) of 1% is applicable as per Section 194O of the Income Tax Act for annual payouts exceeding ₹5,00,000. Annual Form 16A statements are downloadable under Tax Reports.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white text-xs">4. Fraud &amp; Security Shield</h4>
                <p>Any suspicious or multi-device login attempt locks withdrawal actions for 24 hours to prevent unauthorized transfers.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => generateAndDownloadStatement('pdf')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation"
              >
                Download Policy Document
              </button>
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
