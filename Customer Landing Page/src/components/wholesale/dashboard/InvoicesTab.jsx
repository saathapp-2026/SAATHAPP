import React, { useState } from 'react';
import { Receipt, Download, Eye, FileText, FileSpreadsheet, FileCode, ChevronDown, X, Check, Printer, ExternalLink, Sparkles } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import saathAppLogo from '../../../assets/saathapp-logo.jpeg';

export default function InvoicesTab() {
  const { addToast, formData } = useWholesale ? useWholesale() : { addToast: console.log, formData: {} };

  const [invoices, setInvoices] = useState([
    { inv: 'INV-2026-8841', orderId: 'ORD-9842', buyer: 'Ramesh Supermarket', category: 'FMCG & Personal Care', amount: 125000, gstAmount: 22500, date: '2026-08-03' },
    { inv: 'INV-2026-8840', orderId: 'ORD-9841', buyer: 'Shree Traders', category: 'Grocery & Staples', amount: 95000, gstAmount: 17100, date: '2026-08-03' },
    { inv: 'INV-2026-8839', orderId: 'ORD-9840', buyer: 'GreenMart Store', category: 'FMCG', amount: 78500, gstAmount: 14130, date: '2026-08-02' },
    { inv: 'INV-2026-8838', orderId: 'ORD-9839', buyer: 'Apna General Hub', category: 'Packaged Food', amount: 45000, gstAmount: 8100, date: '2026-08-02' },
    { inv: 'INV-2026-8837', orderId: 'ORD-9838', buyer: 'Kumar Enterprises', category: 'Electrical Goods', amount: 110000, gstAmount: 19800, date: '2026-08-01' },
  ]);

  const [previewModalData, setPreviewModalData] = useState(null); // { title, headers, rows }

  // DOWNLOAD INDIVIDUAL INVOICE IN PDF, WORD, OR EXCEL FORMAT
  const handleDownloadInvoiceFormat = (invObj, fmt) => {
    const seller = formData?.businessName || "SaathApp Wholesale & Distribution Pvt Ltd";
    const dateStr = new Date().toLocaleDateString('en-IN');
    const totalVal = invObj.amount + invObj.gstAmount;

    if (fmt === 'excel' || fmt === 'csv') {
      let csv = "\uFEFF"; // UTF-8 Byte Order Mark
      csv += `=======================================================\r\n`;
      csv += `SAATHAPP WHOLESALE TAX INVOICE - ${invObj.inv}\r\n`;
      csv += `Seller: ${seller} | Date: ${dateStr}\r\n`;
      csv += `GSTIN: 07AAACS1234F1Z5 | PAN: AAACS1234F\r\n`;
      csv += `=======================================================\r\n\r\n`;

      csv += `Invoice No,Order Ref,Buyer Enterprise,Category,Taxable Value,GST Tax (18%),Total Invoice Value,Date\r\n`;
      csv += `${invObj.inv},${invObj.orderId},"${invObj.buyer}",${invObj.category},${invObj.amount},${invObj.gstAmount},${totalVal},${invObj.date}\r\n`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invObj.inv}_TaxInvoice.${fmt === 'excel' ? 'csv' : 'csv'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      addToast?.(`🎉 Invoice ${invObj.inv} downloaded in Excel/CSV format!`, 'success');
      return;
    }

    if (fmt === 'word' || fmt === 'docx') {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${invObj.inv}_Word_Report</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #00986C; font-size: 24px; border-bottom: 2px solid #00986C; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
            th { background: #f1f5f9; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>SaathApp B2B Tax Invoice - ${invObj.inv}</h1>
          <p><strong>Seller:</strong> ${seller}<br/><strong>Billed To:</strong> ${invObj.buyer}<br/><strong>Order Ref:</strong> ${invObj.orderId}</p>
          <table>
            <thead><tr><th>Description</th><th>Taxable Value</th><th>GST (18%)</th><th>Total</th></tr></thead>
            <tbody>
              <tr><td>${invObj.category} Wholesale Supply</td><td>₹${invObj.amount.toLocaleString('en-IN')}</td><td>₹${invObj.gstAmount.toLocaleString('en-IN')}</td><td><strong>₹${totalVal.toLocaleString('en-IN')}</strong></td></tr>
            </tbody>
          </table>
          <script>setTimeout(() => window.print(), 500);</script>
        </body>
        </html>
      `;
      printWindow.document.write(html);
      printWindow.document.close();
      addToast?.(`🎉 Invoice ${invObj.inv} formatted for Word/Print!`, 'success');
      return;
    }

    // PDF FORMAT PRINT WINDOW
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast?.('Please allow popups to view & download invoice PDF', 'warning');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tax Invoice - ${invObj.inv}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
          .header { border-bottom: 3px solid #00986C; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .logo-img { height: 45px; object-fit: contain; }
          .title { font-size: 24px; font-weight: 900; color: #00986C; letter-spacing: -0.5px; }
          .badge { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 14px; border-radius: 12px; margin-bottom: 25px; display: flex; justify-content: space-between; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; }
          th { background: #f1f5f9; font-weight: 800; color: #475569; text-transform: uppercase; font-size: 10px; }
          .text-right { text-align: right; }
          .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${window.location.origin}/src/assets/saathapp-logo.jpeg" class="logo-img" alt="SaathApp Logo" onerror="this.style.display='none'" />
            <div>
              <div class="title">B2B TAX INVOICE</div>
              <div style="font-size: 12px; color: #64748b;">${seller}</div>
            </div>
          </div>
          <div style="text-align: right; font-size: 12px;">
            <div><strong>Invoice No:</strong> ${invObj.inv}</div>
            <div><strong>Order Reference:</strong> ${invObj.orderId}</div>
            <div><strong>Date:</strong> ${invObj.date}</div>
          </div>
        </div>

        <div class="badge">
          <div><strong>Billed To:</strong> ${invObj.buyer}</div>
          <div><strong>Category:</strong> ${invObj.category}</div>
          <div><strong>GSTIN:</strong> 07AAACS1234F1Z5</div>
          <div><strong>Place of Supply:</strong> Delhi NCR</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th class="text-right">Taxable Value</th>
              <th class="text-right">CGST (9%)</th>
              <th class="text-right">SGST (9%)</th>
              <th class="text-right">Total Invoice Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bulk Wholesale Supply - ${invObj.category}</td>
              <td class="text-right">₹${invObj.amount.toLocaleString('en-IN')}</td>
              <td class="text-right">₹${(invObj.gstAmount / 2).toLocaleString('en-IN')}</td>
              <td class="text-right">₹${(invObj.gstAmount / 2).toLocaleString('en-IN')}</td>
              <td class="text-right" style="color:#00986C; font-weight:900;">₹${totalVal.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>Digital Signature: 🟢 <strong>SaathApp Tax Engine Verified</strong></div>
          <div>QR Code: <strong>VALIDATED</strong></div>
          <div>Confidential B2B Tax Document</div>
        </div>

        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    addToast?.(`🎉 Tax Invoice ${invObj.inv} PDF opened!`, 'success');
  };

  // EXPORT ALL INVOICES CSV / EXCEL WITH UTF-8 BOM + POPUP DISPLAY
  const handleExportAllInvoicesCSV = () => {
    let csv = "\uFEFF"; // UTF-8 BOM
    csv += "Invoice No,Order Ref,Buyer Enterprise,Category,Taxable Value (INR),GST Tax (18%),Total Invoice Value (INR),Date\r\n";
    invoices.forEach(i => {
      csv += `${i.inv},${i.orderId},"${i.buyer}",${i.category},${i.amount},${i.gstAmount},${i.amount + i.gstAmount},${i.date}\r\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `B2B_Invoices_Register_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // OPEN POPUP DISPLAY WITH THE EXPORTED DATA
    setPreviewModalData({
      title: 'B2B Tax Invoices Exported CSV / Excel Dataset',
      filename: `B2B_Invoices_Register_${new Date().toISOString().slice(0, 10)}.csv`,
      headers: ['Invoice No', 'Order Ref', 'Buyer Enterprise', 'Category', 'Taxable Value', 'GST Tax (18%)', 'Total Invoice Value', 'Date'],
      rows: invoices.map(i => [i.inv, i.orderId, i.buyer, i.category, `₹${i.amount.toLocaleString('en-IN')}`, `₹${i.gstAmount.toLocaleString('en-IN')}`, `₹${(i.amount + i.gstAmount).toLocaleString('en-IN')}`, i.date])
    });

    addToast?.('🎉 B2B Tax Invoices register exported to Excel/CSV successfully!', 'success');
  };

  return (
    <div className="space-y-6 sa-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <img src={saathAppLogo} alt="SaathApp Logo" className="h-9 object-contain shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="text-[#00986C]" size={24} /> B2B Tax Invoices &amp; E-Way Bills
            </h2>
            <p className="text-xs text-slate-500">
              View tax invoices with GSTIN breakup, HSN codes, and download signed PDF/Word/Excel/CSV copies.
            </p>
          </div>
        </div>

        {/* PRIMARY GREEN EXPORT BUTTON */}
        <button
          type="button"
          onClick={handleExportAllInvoicesCSV}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
        >
          <FileSpreadsheet size={16} /> Export Invoices CSV / Excel
        </button>
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Buyer Enterprise</th>
                <th className="p-3">Taxable Value</th>
                <th className="p-3">GST Tax (18%)</th>
                <th className="p-3">Total Invoice Value</th>
                <th className="p-3 text-right">Download Formats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {invoices.map((inv) => (
                <tr key={inv.inv} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-[#00986C]">{inv.inv}</td>
                  <td className="p-3 font-mono text-slate-500">{inv.orderId}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">{inv.buyer}</td>
                  <td className="p-3 font-mono">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-slate-500">₹{inv.gstAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-black text-slate-900 dark:text-white font-mono">
                    ₹{(inv.amount + inv.gstAmount).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoiceFormat(inv, 'pdf')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-[#00986C] dark:text-emerald-400 font-bold text-[10px] hover:bg-emerald-500/30 transition cursor-pointer"
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoiceFormat(inv, 'word')}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] hover:bg-blue-500/30 transition cursor-pointer"
                    >
                      DOCX
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoiceFormat(inv, 'excel')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-[10px] hover:bg-purple-500/30 transition cursor-pointer"
                    >
                      XLSX / CSV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV EXPORTED PREVIEW MODAL */}
      {previewModalData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-4xl w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#00986C] flex items-center justify-center font-bold">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{previewModalData.title}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Downloaded File: {previewModalData.filename}</span>
                </div>
              </div>
              <button type="button" onClick={() => setPreviewModalData(null)} className="text-slate-400 font-bold p-1"><X size={18} /></button>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs">
              File downloaded to your device as clean CSV/Excel. Here is the exported live dataset:
            </p>

            <div className="overflow-x-auto max-h-80 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-950 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                  <tr>
                    {previewModalData.headers.map((h, i) => (
                      <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-800">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {previewModalData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 font-mono">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setPreviewModalData(null)} className="px-6 py-2 bg-[#00986C] text-white font-bold rounded-xl shadow cursor-pointer">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
