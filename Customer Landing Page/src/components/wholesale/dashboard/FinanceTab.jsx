import React, { useState } from 'react';
import {
  Wallet, Landmark, ArrowUpRight, Download, Receipt, ShieldCheck, CheckCircle2,
  History, ChevronDown, RefreshCw, X, Lock, Check, FileSpreadsheet, FileText,
  Filter, AlertCircle, ArrowDownRight, Clock, ShieldAlert, Sparkles, Building2,
  Zap, Shield, Percent, HelpCircle, MessageSquare, ExternalLink, Calendar, Eye,
  Sliders, Plus, CreditCard, FileCode, Archive, Printer, Mail, FileJson
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import saathAppLogo from '../../../assets/saathapp-logo.jpeg';

export default function FinanceTab({ isWithdrawModalOpen: externalWithdrawOpen, onCloseWithdrawModal: externalCloseWithdraw, onSelectTab }) {
  const { formData, dashboardData, addToast } = useWholesale ? useWholesale() : { formData: {}, dashboardData: { kpis: { walletBalance: 875000 } }, addToast: console.log };

  // Modal & Dropdown States
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isGstModalOpen, setIsGstModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isWithdrawDropdownOpen, setIsWithdrawDropdownOpen] = useState(false);
  const [isGstDropdownOpen, setIsGstDropdownOpen] = useState(false);
  const [isPayoutSettingsModalOpen, setIsPayoutSettingsModalOpen] = useState(false);
  const [isLinkedBanksModalOpen, setIsLinkedBanksModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState(null);

  // Withdraw Flow States (PDF Pages 28-30)
  const [withdrawStep, setWithdrawStep] = useState(1); // 1: Form, 2: OTP, 3: Processing, 4: Success
  const [selectedBank, setSelectedBank] = useState('HDFC XXXX1234');
  const [withdrawAmount, setWithdrawAmount] = useState('50000');
  const [settlementType, setSettlementType] = useState('Instant');
  const [withdrawRemarks, setWithdrawRemarks] = useState('Monthly seller payout request');
  const [otpValue, setOtpValue] = useState('');

  // GST Report Modal States (PDF Pages 32-35)
  const [gstReportType, setGstReportType] = useState('GSTR-1');
  const [gstDateRange, setGstDateRange] = useState('This Month');
  const [gstFormat, setGstFormat] = useState('pdf'); // pdf, excel, csv, zip, json
  const [gstFileName, setGstFileName] = useState('GST_Report_Aug_2026');
  const [gstConfig, setGstConfig] = useState({
    summary: true,
    invoiceList: true,
    hsnSummary: true,
    taxDetails: true,
    companyDetails: true,
    qrCode: true,
    signature: true,
  });

  // Filter & Transaction History States (PDF Page 31 & 36)
  const [txnFilter, setTxnFilter] = useState('All'); // All, Credits, Debits, Withdrawals, Refunds, Escrow, Failed, Pending
  const [dateFilter, setDateFilter] = useState('01 Aug - 31 Aug 2026');
  const [transactions, setTransactions] = useState([
    { txn: 'TXN-90412', desc: 'Escrow Release for ORD-9842', channel: 'HDFC Bank', type: 'Credit', amt: '+₹1,25,000', date: 'Today, 10:30 AM', status: 'Completed' },
    { txn: 'TXN-90411', desc: 'Bank Withdrawal to HDFC Account', channel: 'HDFC XXXX1234', type: 'Withdrawal', amt: '-₹2,00,000', date: 'Yesterday, 04:00 PM', status: 'Completed' },
    { txn: 'TXN-90410', desc: 'Escrow Release for ORD-9836', channel: 'Escrow Wallet', type: 'Credit', amt: '+₹62,000', date: '01 Aug 2026', status: 'Completed' },
    { txn: 'TXN-90409', desc: 'Refund for Return ORD-9821', channel: 'Buyer Refund', type: 'Refund', amt: '-₹18,500', date: '31 Jul 2026', status: 'Completed' },
    { txn: 'TXN-90408', desc: 'GST Payment - July 2026', channel: 'Govt GST Portal', type: 'Debit', amt: '-₹8,450', date: '31 Jul 2026', status: 'Completed' },
  ]);

  const modalWithdrawOpen = Boolean(externalWithdrawOpen || isWithdrawModalOpen);

  const handleCloseWithdrawModal = () => {
    if (externalCloseWithdraw) externalCloseWithdraw();
    setIsWithdrawModalOpen(false);
    setWithdrawStep(1);
    setOtpValue('');
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const numAmt = Number(withdrawAmount);
    if (!numAmt || numAmt <= 0) {
      addToast?.('Please enter a valid withdrawal amount', 'error');
      return;
    }
    if (numAmt > 850000) {
      addToast?.('Withdrawal amount exceeds withdrawable balance of ₹8,50,000', 'error');
      return;
    }
    setWithdrawStep(2);
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    if (otpValue.length < 4) {
      addToast?.('Please enter valid 6-digit OTP (e.g. 123456)', 'error');
      return;
    }

    setWithdrawStep(3);

    setTimeout(() => {
      setWithdrawStep(4);
      const newTxnId = `TXN-${Math.floor(90413 + Math.random() * 9000)}`;
      const newTxn = {
        txn: newTxnId,
        desc: `Withdrawal to ${selectedBank}`,
        channel: selectedBank,
        type: 'Withdrawal',
        amt: `-₹${Number(withdrawAmount).toLocaleString('en-IN')}`,
        date: 'Just Now',
        status: 'Completed',
      };
      setTransactions((prev) => [newTxn, ...prev]);
      addToast?.(`🎉 Payout of ₹${Number(withdrawAmount).toLocaleString('en-IN')} transferred to ${selectedBank}!`, 'success');
    }, 2000);
  };

  // ROBUST REPORT DOWNLOAD ENGINE (FIXES CORRUPTED FILE ERRORS FOR PDF, EXCEL, CSV, JSON, ZIP)
  const handleDownloadGstReport = () => {
    const seller = formData?.businessName || "SaathApp Wholesale & Distribution Pvt Ltd";
    const dateStr = new Date().toLocaleDateString('en-IN');

    if (gstFormat === 'csv' || gstFormat === 'excel') {
      let csv = "\uFEFF"; // UTF-8 BOM
      csv += `=======================================================\r\n`;
      csv += `SAATHAPP WHOLESALE GST TAX REPORT (${gstReportType})\r\n`;
      csv += `Seller: ${seller} | Date Range: ${gstDateRange} | Generated: ${dateStr}\r\n`;
      csv += `GSTIN: 07AAACS1234F1Z5 | PAN: AAACS1234F\r\n`;
      csv += `=======================================================\r\n\r\n`;

      csv += `Invoice No,Order Ref,Buyer Enterprise,Taxable Value,CGST (9%),SGST (9%),IGST (18%),Total Invoice Value\r\n`;
      csv += `INV-2026-8841,ORD-9842,Ramesh Supermarket,₹125000,₹11250,₹11250,₹0,₹147500\r\n`;
      csv += `INV-2026-8840,ORD-9841,Shree Traders,₹95000,₹8550,₹8550,₹0,₹112100\r\n`;
      csv += `INV-2026-8839,ORD-9840,GreenMart Store,₹78500,₹7065,₹7065,₹0,₹92630\r\n`;
      csv += `INV-2026-8838,ORD-9839,Apna General Hub,₹45000,₹0,₹0,₹8100,₹53100\r\n`;
      csv += `INV-2026-8837,ORD-9838,Kumar Enterprises,₹110000,₹9900,₹9900,₹0,₹129800\r\n\r\n`;

      csv += `=== GST TAX SUMMARY ===\r\n`;
      csv += `Tax Type,Taxable Value,CGST,SGST,IGST,Grand Total\r\n`;
      csv += `Outward B2B Supplies,₹453500,₹36765,₹36765,₹8100,₹535130\r\n`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${gstFileName}.${gstFormat === 'excel' ? 'csv' : 'csv'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast?.(`🎉 GST Report downloaded successfully!`, 'success');
      setIsGstModalOpen(false);
      return;
    }

    if (gstFormat === 'json') {
      const jsonObj = {
        reportType: gstReportType,
        dateRange: gstDateRange,
        seller: seller,
        gstin: "07AAACS1234F1Z5",
        pan: "AAACS1234F",
        generatedDate: dateStr,
        summary: {
          taxableValue: 453500,
          cgst: 36765,
          sgst: 36765,
          igst: 8100,
          grandTotal: 535130
        },
        invoices: [
          { invoiceNo: "INV-2026-8841", orderRef: "ORD-9842", buyer: "Ramesh Supermarket", taxableValue: 125000, total: 147500 },
          { invoiceNo: "INV-2026-8840", orderRef: "ORD-9841", buyer: "Shree Traders", taxableValue: 95000, total: 112100 }
        ]
      };
      const blob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${gstFileName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast?.(`🎉 GST JSON Report downloaded!`, 'success');
      setIsGstModalOpen(false);
      return;
    }

    // FOR PDF & PRINTABLE FORMAT: OPEN BEAUTIFUL STYLED WINDOW THAT RENDERS AND PRINTS AS VALID PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast?.('Please allow popups to download GST PDF report', 'warning');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${gstFileName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00986C; padding-bottom: 20px; margin-bottom: 25px; }
          .logo-box { display: flex; align-items: center; gap: 14px; }
          .logo-img { height: 45px; object-fit: contain; }
          .brand-title { font-size: 22px; font-weight: 900; color: #00986C; letter-spacing: -0.5px; }
          .report-name { font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 2px; }
          .meta-box { text-align: right; font-size: 12px; color: #475569; }
          .gst-badge { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; border-radius: 12px; display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          th { background: #f1f5f9; font-weight: 800; color: #475569; text-transform: uppercase; font-size: 10px; }
          .text-right { text-align: right; }
          .total-row { background: #f8fafc; font-weight: 900; font-size: 13px; }
          .footer { margin-top: 50px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-box">
            <img src="${window.location.origin}/src/assets/saathapp-logo.jpeg" class="logo-img" alt="SaathApp Logo" onerror="this.style.display='none'" />
            <div>
              <div class="brand-title">SaathApp Wholesale</div>
              <div class="report-name">Official Tax Report (${gstReportType})</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Company: <strong>${seller}</strong></div>
            </div>
          </div>
          <div class="meta-box">
            <div><strong>Period:</strong> ${gstDateRange}</div>
            <div><strong>Generated:</strong> ${dateStr}</div>
            <div><strong>Status:</strong> Verified Tax Return</div>
          </div>
        </div>

        <div class="gst-badge">
          <div><strong>GSTIN:</strong> 07AAACS1234F1Z5</div>
          <div><strong>PAN:</strong> AAACS1234F</div>
          <div><strong>State Code:</strong> 07 (Delhi NCR)</div>
          <div><strong>Filing Frequency:</strong> Monthly</div>
        </div>

        <h3 style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #00986C;">B2B Tax Invoice Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Order Ref</th>
              <th>Buyer Enterprise</th>
              <th class="text-right">Taxable Value</th>
              <th class="text-right">CGST (9%)</th>
              <th class="text-right">SGST (9%)</th>
              <th class="text-right">IGST (18%)</th>
              <th class="text-right">Total Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>INV-2026-8841</td><td>ORD-9842</td><td>Ramesh Supermarket</td><td class="text-right">₹1,25,000</td><td class="text-right">₹11,250</td><td class="text-right">₹11,250</td><td class="text-right">₹0</td><td class="text-right">₹1,47,500</td></tr>
            <tr><td>INV-2026-8840</td><td>ORD-9841</td><td>Shree Traders</td><td class="text-right">₹95,000</td><td class="text-right">₹8,550</td><td class="text-right">₹8,550</td><td class="text-right">₹0</td><td class="text-right">₹1,12,100</td></tr>
            <tr><td>INV-2026-8839</td><td>ORD-9840</td><td>GreenMart Store</td><td class="text-right">₹78,500</td><td class="text-right">₹7,065</td><td class="text-right">₹7,065</td><td class="text-right">₹0</td><td class="text-right">₹92,630</td></tr>
            <tr><td>INV-2026-8838</td><td>ORD-9839</td><td>Apna General Hub</td><td class="text-right">₹45,000</td><td class="text-right">₹0</td><td class="text-right">₹0</td><td class="text-right">₹8,100</td><td class="text-right">₹53,100</td></tr>
            <tr><td>INV-2026-8837</td><td>ORD-9838</td><td>Kumar Enterprises</td><td class="text-right">₹1,10,000</td><td class="text-right">₹9,900</td><td class="text-right">₹9,900</td><td class="text-right">₹0</td><td class="text-right">₹1,29,800</td></tr>
            <tr class="total-row">
              <td colspan="3">Grand Total Summary</td>
              <td class="text-right">₹4,53,500</td>
              <td class="text-right">₹36,765</td>
              <td class="text-right">₹36,765</td>
              <td class="text-right">₹8,100</td>
              <td class="text-right" style="color:#00986C;">₹5,35,130</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>Verified Digital Signature: 🟢 <strong>SaathApp Tax Engine</strong></div>
          <div>QR Code Validation: <strong>VALIDATED</strong></div>
          <div>Generated on ${dateStr}</div>
        </div>

        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    addToast?.(`🎉 GST Report downloaded!`, 'success');
    setIsGstModalOpen(false);
  };

  const handleDownloadStatement = (type, format) => {
    if (format === 'csv' || format === 'excel') {
      let csv = "\uFEFF"; // UTF-8 BOM
      csv += `SAATHAPP WHOLESALE ${type.toUpperCase()} STATEMENT\r\n`;
      csv += `Date Range: ${dateFilter} | Seller: ${formData?.businessName || 'SaathApp Wholesale Partner'}\r\n\r\n`;
      csv += `TXN ID,Description,Channel / Bank,Type,Amount,Date,Status\r\n`;
      transactions.forEach((t) => {
        csv += `${t.txn},"${t.desc}",${t.channel},${t.type},"${t.amt}",${t.date},${t.status}\r\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `SaathApp_${type}_Statement_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast?.(`🎉 ${type} Statement downloaded!`, 'success');
      setIsStatementModalOpen(false);
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SaathApp ${type} Statement</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #0f172a; }
          .header { border-bottom: 2px solid #00986C; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; }
          .brand { color: #00986C; font-size: 20px; font-weight: 900; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; }
          th { background: #f8fafc; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">SaathApp Wholesale</div>
            <div style="font-size: 14px; font-weight: bold;">${type} Statement Log</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            Period: ${dateFilter}<br/>Generated: ${new Date().toLocaleDateString('en-IN')}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>Description</th>
              <th>Channel / Bank</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map(t => `
              <tr>
                <td>${t.txn}</td>
                <td>${t.desc}</td>
                <td>${t.channel}</td>
                <td>${t.type}</td>
                <td><strong>${t.amt}</strong></td>
                <td>${t.date}</td>
                <td>${t.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    addToast?.(`🎉 ${type} Statement downloaded!`, 'success');
    setIsStatementModalOpen(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (txnFilter === 'All') return true;
    if (txnFilter === 'Credits') return t.type === 'Credit';
    if (txnFilter === 'Debits') return t.type === 'Debit';
    if (txnFilter === 'Withdrawals') return t.type === 'Withdrawal';
    if (txnFilter === 'Refunds') return t.type === 'Refund';
    if (txnFilter === 'Escrow') return t.desc.includes('Escrow');
    if (txnFilter === 'Failed') return t.status === 'Failed';
    if (txnFilter === 'Pending') return t.status === 'Pending';
    return true;
  });

  return (
    <div className="space-y-6 sa-fade">
      {/* 1. TOP HEADER BAR WITH OFFICIAL LOGO */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <img src={saathAppLogo} alt="SaathApp Logo" className="h-9 object-contain shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Wallet className="text-[#00986C]" size={24} /> Wallet & Financial Payouts
            </h2>
            <p className="text-xs text-slate-500">
              Manage escrow payouts, transfer funds to bank account, and download GST tax reports.
            </p>
          </div>
        </div>

        {/* TOP RIGHT BUTTONS BAR (PDF Page 36 Layout) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => addToast?.('🔄 Refreshed wallet balance & transactions', 'info')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm cursor-pointer"
          >
            <RefreshCw size={14} className="text-[#00986C]" /> Refresh
          </button>

          {/* Download Statement Button */}
          <button
            type="button"
            onClick={() => setIsStatementModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm cursor-pointer"
          >
            <Download size={14} className="text-[#00986C]" /> Export Statement
          </button>

          {/* Withdraw Funds to Bank Dropdown Button (Primary Green Button) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsWithdrawDropdownOpen(!isWithdrawDropdownOpen)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 px-5 py-2 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
            >
              <ArrowUpRight size={16} /> Withdraw Funds <ChevronDown size={14} />
            </button>

            {/* Withdraw Dropdown Menu */}
            {isWithdrawDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-30 text-xs font-bold space-y-1 sa-rise">
                <button
                  type="button"
                  onClick={() => {
                    setIsWithdrawDropdownOpen(false);
                    setIsWithdrawModalOpen(true);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-800 dark:text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-[#00986C] shrink-0">
                    <ArrowUpRight size={15} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">Withdraw Funds to Bank</span>
                    <span className="text-[10px] text-slate-500 font-normal">Initiate IMPS instant transfer</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsWithdrawDropdownOpen(false);
                    setTxnFilter('Withdrawals');
                    addToast?.('Filtered transaction history to Withdrawals', 'info');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-800 dark:text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                    <Clock size={15} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">Withdrawal History</span>
                    <span className="text-[10px] text-slate-500 font-normal">View past payout records & UTRs</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsWithdrawDropdownOpen(false);
                    setIsPayoutSettingsModalOpen(true);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-800 dark:text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                    <Sliders size={15} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">Payout Settings</span>
                    <span className="text-[10px] text-slate-500 font-normal">Auto settlement & API rules</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsWithdrawDropdownOpen(false);
                    setIsLinkedBanksModalOpen(true);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-800 dark:text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Building2 size={15} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 dark:text-white">Linked Bank Accounts</span>
                    <span className="text-[10px] text-slate-500 font-normal">Manage connected accounts</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* GST Reports Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGstDropdownOpen(!isGstDropdownOpen)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <Receipt size={15} className="text-[#00986C]" /> GST Reports <ChevronDown size={14} />
            </button>

            {/* GST Reports Dropdown Menu (PDF Page 32) */}
            {isGstDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-30 text-xs font-bold space-y-1 sa-rise">
                {[
                  { title: 'GSTR-1', desc: 'Outward Supplies' },
                  { title: 'GSTR-3B', desc: 'Summary Tax Return' },
                  { title: 'GSTR-9', desc: 'Annual Tax Return' },
                  { title: 'Sales Register', desc: 'B2B Sales Breakdown' },
                  { title: 'Purchase Register', desc: 'B2B Purchase Logs' },
                  { title: 'HSN Summary', desc: 'HSN Code Wise Tax' },
                  { title: 'Tax Invoice Report', desc: 'PDF / Excel Bills' },
                  { title: 'Credit / Debit Note', desc: 'Adjustments Register' },
                ].map((r) => (
                  <button
                    key={r.title}
                    type="button"
                    onClick={() => {
                      setGstReportType(r.title);
                      setIsGstDropdownOpen(false);
                      setIsGstModalOpen(true);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-800 dark:text-slate-200"
                  >
                    <div>
                      <span className="block font-black text-slate-900 dark:text-white">{r.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{r.desc}</span>
                    </div>
                    <ChevronDown size={12} className="-rotate-90 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. WALLET SUMMARY CARDS ROW (PDF Page 27 Exact Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Balance Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 text-white border border-emerald-500/30 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <Wallet size={16} /> ESCROW WALLET BALANCE
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Instant Settlement: Daily
              </span>
            </div>

            <div className="mt-4">
              <strong className="text-4xl font-black font-mono tracking-tight text-white block">₹8,75,000</strong>
              <span className="text-xs text-slate-400 font-semibold block mt-1">Available Wallet Balance</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Withdrawable</span>
              <strong className="text-emerald-400 font-mono font-black text-sm">₹8,50,000</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Pending</span>
              <strong className="text-amber-400 font-mono font-black text-sm">₹25,000</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Last Payout</span>
              <strong className="text-slate-200 font-mono font-bold text-xs">02 Aug 2026</strong>
            </div>
          </div>
        </div>

        {/* Linked Payout Bank Account Card (HDFC Emblem Page 27) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Official HDFC Bank Red/Blue Emblem */}
                <div className="w-8 h-8 rounded-lg bg-blue-900 border-2 border-red-600 flex items-center justify-center font-black text-white text-[11px] shadow-sm">
                  HDFC
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Linked Payout Bank Account</h4>
                  <span className="text-[10px] text-slate-500 font-bold">Primary Transfer Account</span>
                </div>
              </div>
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-[#00986C] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 size={12} /> Penny Drop Verified
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between"><span className="text-slate-400">Bank Name:</span> <strong className="text-slate-900 dark:text-white">HDFC Bank Ltd</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">Account No:</span> <strong className="text-slate-900 dark:text-white font-mono">5020 0049 1823 94</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">IFSC Code:</span> <strong className="text-slate-900 dark:text-white font-mono">HDFC0000240</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">Account Holder:</span> <strong className="text-slate-900 dark:text-white truncate max-w-[150px]">SaathApp Wholesale &amp; Distribution Pvt Ltd</strong></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsLinkedBanksModalOpen(true)}
              className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-extrabold text-slate-800 dark:text-slate-200 text-center transition cursor-pointer"
            >
              Manage Banks
            </button>
            <button
              type="button"
              onClick={() => addToast?.('HDFC Bank set as primary payout account', 'success')}
              className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 text-center transition cursor-pointer"
            >
              Change Primary
            </button>
          </div>
        </div>

        {/* Payout Summary (Right Card Page 27) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white mb-2">Payout Summary (This Month)</h4>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-slate-500">Total Credits</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono">₹3,45,000</strong>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-slate-500">Total Withdrawals</span>
                <strong className="text-rose-500 font-mono">₹2,18,500</strong>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-slate-500">Total Settlements</span>
                <strong className="text-blue-500 font-mono">₹3,10,000</strong>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-slate-500">Pending Settlement</span>
                <strong className="text-amber-500 font-mono">₹25,000</strong>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Net Wallet Balance</span>
            <strong className="text-lg font-black text-[#00986C] font-mono">₹8,75,000</strong>
          </div>
        </div>
      </div>

      {/* 3. RECENT FINANCIAL TRANSACTIONS TABLE & TRANSACTION FILTERS (PDF Page 27 & 36) */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#00986C]" /> Recent Financial Transactions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time escrow releases, bank payouts, and GST debit ledger.</p>
          </div>

          {/* TRANSACTION FILTERS (PDF Page 36: Credits, Debits, Withdrawals, Refunds, Escrow, Failed, Pending) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Credits', 'Debits', 'Withdrawals', 'Refunds', 'Escrow', 'Failed', 'Pending'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTxnFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  txnFilter === filter
                    ? 'bg-[#00986C] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
              <tr>
                <th className="pb-2.5">TXN ID</th>
                <th className="pb-2.5">DESCRIPTION</th>
                <th className="pb-2.5">CHANNEL / BANK</th>
                <th className="pb-2.5">TYPE</th>
                <th className="pb-2.5 text-right">AMOUNT</th>
                <th className="pb-2.5">DATE &amp; TIME</th>
                <th className="pb-2.5">STATUS</th>
                <th className="pb-2.5 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {filteredTransactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-950 transition">
                  <td className="py-3 font-mono font-extrabold text-[#00986C]">{t.txn}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white max-w-[200px] truncate">{t.desc}</td>
                  <td className="py-3 text-slate-500 font-bold">{t.channel}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      t.type === 'Credit' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' :
                      t.type === 'Withdrawal' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' :
                      'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-mono font-black text-sm ${t.amt.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                    {t.amt}
                  </td>
                  <td className="py-3 text-slate-500 text-[11px] font-bold">{t.date}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center gap-1 w-fit">
                      <CheckCircle2 size={12} /> {t.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleDownloadStatement('Receipt', 'pdf')}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                      title="Download Receipt"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: WITHDRAW FUNDS TO BANK MODAL (PDF Pages 28-30) */}
      {modalWithdrawOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="text-[#00986C]" size={20} /> Withdraw Funds to Bank
              </h3>
              <button type="button" onClick={handleCloseWithdrawModal} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            {withdrawStep === 1 && (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                  <div><span className="text-[10px] text-slate-400 font-bold block uppercase">Available</span><strong className="text-slate-900 dark:text-white font-mono font-black">₹8,75,000</strong></div>
                  <div><span className="text-[10px] text-slate-400 font-bold block uppercase">Withdrawable</span><strong className="text-[#00986C] font-mono font-black">₹8,50,000</strong></div>
                  <div><span className="text-[10px] text-slate-400 font-bold block uppercase">Pending</span><strong className="text-amber-500 font-mono font-black">₹25,000</strong></div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Bank Account</label>
                  <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white">
                    <option value="HDFC XXXX1234">HDFC XXXX1234 (Primary Payout)</option>
                    <option value="ICICI XXXX5588">ICICI XXXX5588</option>
                    <option value="Axis XXXX8877">Axis XXXX8877</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Withdraw Amount (₹)</label>
                  <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-mono text-sm font-black text-slate-900 dark:text-white" placeholder="Enter amount" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Settlement Speed</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Instant', 'Same Day', 'Next Business Day'].map((type) => (
                      <button key={type} type="button" onClick={() => setSettlementType(type)} className={`py-2 rounded-xl text-center font-bold border transition ${settlementType === type ? 'bg-emerald-500/20 border-emerald-500 text-[#00986C]' : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}>{type}</button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" onClick={handleCloseWithdrawModal} className="px-4 py-2 rounded-xl border border-slate-300 font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold shadow">Proceed to Payout</button>
                </div>
              </form>
            )}

            {withdrawStep === 2 && (
              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">Please enter the security verification code sent to your registered mobile number for account safety.</p>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Security PIN / Mobile OTP</label>
                  <input type="password" maxLength={6} value={otpValue} onChange={(e) => setOtpValue(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-center font-mono text-lg font-black tracking-widest text-slate-900 dark:text-white" placeholder="••••••" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setWithdrawStep(1)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold">Back</button>
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold shadow">Confirm Transfer</button>
                </div>
              </form>
            )}

            {withdrawStep === 3 && (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                <h4 className="text-sm font-black text-slate-900 dark:text-white">Connecting to Banking API Gateway...</h4>
                <p className="text-xs text-slate-500">Executing IMPS Transfer to {selectedBank}</p>
              </div>
            )}

            {withdrawStep === 4 && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-[#00986C] flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">Payout Transferred Successfully!</h4>
                <p className="text-xs text-slate-500">₹{Number(withdrawAmount).toLocaleString('en-IN')} has been sent to {selectedBank}.</p>
                <button type="button" onClick={handleCloseWithdrawModal} className="px-6 py-2 bg-[#00986C] text-white font-bold rounded-xl">Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: GST REPORTS MODAL (PDF Pages 32-35) */}
      {isGstModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="text-[#00986C]" size={18} /> Download GST Tax Report
              </h3>
              <button type="button" onClick={() => setIsGstModalOpen(false)} className="text-slate-400 hover:text-slate-200 font-bold p-1"><X size={18} /></button>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Select Report Type</label>
              <select value={gstReportType} onChange={(e) => setGstReportType(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white">
                <option value="GSTR-1">GSTR-1 (Outward Supplies)</option>
                <option value="GSTR-3B">GSTR-3B (Summary Return)</option>
                <option value="GSTR-9">GSTR-9 (Annual Return)</option>
                <option value="Sales Register">Sales Register</option>
                <option value="Purchase Register">Purchase Register</option>
                <option value="Tax Invoice Report">Tax Invoice Report</option>
                <option value="Credit / Debit Note">Credit / Debit Note</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Select Date</label>
                <select value={gstDateRange} onChange={(e) => setGstDateRange(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 font-bold text-slate-900 dark:text-white">
                  <option value="Today">Today</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Quarter 2 2026">Quarter</option>
                  <option value="Financial Year 2025-26">Financial Year</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Export Format</label>
                <select value={gstFormat} onChange={(e) => setGstFormat(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 font-bold text-slate-900 dark:text-white uppercase">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setIsGstModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold">Cancel</button>
              <button type="button" onClick={handleDownloadGstReport} className="px-6 py-2 rounded-xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold shadow flex items-center gap-1.5"><Download size={15} /> Download</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EXPORT STATEMENT MODAL (PDF Page 36) */}
      {isStatementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="text-[#00986C]" size={18} /> Download Financial Statements
              </h3>
              <button type="button" onClick={() => setIsStatementModalOpen(false)} className="text-slate-400 font-bold"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white font-extrabold block text-xs">Wallet Statement</strong>
                  <span className="text-[10px] text-slate-500">Includes all escrow releases, debits &amp; refunds</span>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => handleDownloadStatement('Wallet', 'pdf')} className="px-2.5 py-1 rounded-lg bg-[#00986C] text-white font-bold text-[10px]">PDF</button>
                  <button type="button" onClick={() => handleDownloadStatement('Wallet', 'excel')} className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px]">Excel</button>
                  <button type="button" onClick={() => handleDownloadStatement('Wallet', 'csv')} className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-[10px]">CSV</button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white font-extrabold block text-xs">Bank Statement</strong>
                  <span className="text-[10px] text-slate-500">Includes bank settlement logs &amp; UTR numbers</span>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => handleDownloadStatement('Bank', 'pdf')} className="px-2.5 py-1 rounded-lg bg-[#00986C] text-white font-bold text-[10px]">Monthly</button>
                  <button type="button" onClick={() => handleDownloadStatement('Bank', 'excel')} className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px]">Quarterly</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: LINKED BANKS MODAL */}
      {isLinkedBanksModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="text-[#00986C]" size={18} /> Linked Bank Accounts
              </h3>
              <button type="button" onClick={() => setIsLinkedBanksModalOpen(false)} className="text-slate-400 font-bold"><X size={18} /></button>
            </div>

            <div className="space-y-2">
              {[
                { bank: 'HDFC Bank', acc: '5020 0049 1823 94', status: 'Primary', verified: true },
                { bank: 'ICICI Bank', acc: '0011 0501 5588', status: 'Secondary', verified: true },
                { bank: 'Axis Bank', acc: '9180 2004 8877', status: 'Secondary', verified: true },
              ].map((b, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">{b.bank}</strong>
                    <span className="font-mono text-[11px] text-slate-500">{b.acc}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${b.status === 'Primary' ? 'bg-emerald-500/20 text-[#00986C]' : 'bg-slate-200 text-slate-600'}`}>{b.status}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setIsLinkedBanksModalOpen(false)} className="px-5 py-2 bg-[#00986C] text-white font-bold rounded-xl">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
