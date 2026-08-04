import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, Truck, RefreshCw, XCircle, ArrowUpDown, FileSpreadsheet, X, Printer, Check } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import saathAppLogo from '../../../assets/saathapp-logo.jpeg';

export const ORDER_STATUS_TABS = [
  'All Orders',
  'New Orders',
  'Accepted',
  'Packed',
  'Dispatched',
  'Delivered',
  'Cancelled',
  'Returns',
  'Refunds',
];

export const MOCK_FULL_ORDERS = [
  { id: 'ORD-9842', buyer: 'Ramesh Supermarket', category: 'FMCG & Personal Care', itemsCount: 45, amount: 125000, status: 'Delivered', date: '2026-08-03', warehouse: 'Delhi NCR Hub', payment: 'Escrow Released' },
  { id: 'ORD-9841', buyer: 'Shree Traders', category: 'Grocery & Staples', itemsCount: 120, amount: 95000, status: 'Accepted', date: '2026-08-03', warehouse: 'Delhi NCR Hub', payment: 'Held in Escrow' },
  { id: 'ORD-9840', buyer: 'GreenMart Store', category: 'FMCG', itemsCount: 30, amount: 78500, status: 'Packed', date: '2026-08-02', warehouse: 'Mumbai Express', payment: 'Held in Escrow' },
  { id: 'ORD-9839', buyer: 'Apna General Hub', category: 'Packaged Food', itemsCount: 85, amount: 45000, status: 'Cancelled', date: '2026-08-02', warehouse: 'Kolkata East', payment: 'Refunded' },
  { id: 'ORD-9838', buyer: 'Kumar Enterprises', category: 'Electrical Goods', itemsCount: 210, amount: 110000, status: 'Returns', date: '2026-08-01', warehouse: 'Delhi NCR Hub', payment: 'Disputed' },
  { id: 'ORD-9837', buyer: 'Metro Retail Mart', category: 'Grocery & Staples', itemsCount: 340, amount: 245000, status: 'Dispatched', date: '2026-08-01', warehouse: 'Delhi NCR Hub', payment: 'Held in Escrow' },
  { id: 'ORD-9836', buyer: 'Super Saver Market', category: 'Beverages', itemsCount: 90, amount: 62000, status: 'New Orders', date: '2026-08-03', warehouse: 'Mumbai Express', payment: 'Pending Payment' },
];

export default function OrdersTab() {
  const { addToast, formData } = useWholesale ? useWholesale() : { addToast: console.log, formData: {} };
  const [activeStatusTab, setActiveStatusTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(MOCK_FULL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [previewModalData, setPreviewModalData] = useState(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus =
      activeStatusTab === 'All Orders' ||
      ord.status.toLowerCase() === activeStatusTab.toLowerCase();
    const matchesQuery =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast?.(`Order ${orderId} updated to ${newStatus}`, 'success');
  };

  // EXPORT ORDERS TO EXCEL / CSV WITH UTF-8 BOM + POPUP DISPLAY
  const handleExportCSV = () => {
    const filename = `Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    let csv = "\uFEFF"; // UTF-8 Byte Order Mark
    csv += "Order ID,Buyer Store,Category,Items Count,Total Amount (INR),Status,Warehouse,Payment Status,Date\r\n";
    filteredOrders.forEach(o => {
      csv += `${o.id},"${o.buyer}",${o.category},${o.itemsCount},${o.amount},${o.status},${o.warehouse},${o.payment},${o.date}\r\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // OPEN POPUP DISPLAY WITH THE EXPORTED DATA
    setPreviewModalData({
      title: 'Order Management Exported CSV / Excel Dataset',
      filename: filename,
      headers: ['Order ID', 'Buyer Store', 'Category', 'Items Count', 'Total Amount', 'Status', 'Warehouse', 'Payment Status', 'Date'],
      rows: filteredOrders.map(o => [o.id, o.buyer, o.category, `${o.itemsCount} SKUs`, `₹${o.amount.toLocaleString('en-IN')}`, o.status, o.warehouse, o.payment, o.date])
    });

    addToast?.('🎉 Orders report exported to Excel/CSV format successfully!', 'success');
  };

  // GENERATE TAX INVOICE PDF REPORT PRINT WINDOW
  const handleDownloadInvoicePdf = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast?.('Please allow popups to download invoice PDF', 'warning');
      return;
    }

    const sellerName = formData?.businessName || "SaathApp Wholesale & Distribution Pvt Ltd";
    const dateStr = new Date().toLocaleDateString('en-IN');
    const taxValue = Math.round(order.amount / 1.18);
    const gstVal = order.amount - taxValue;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tax Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
          .header { border-bottom: 3px solid #00986C; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .logo-img { height: 45px; object-fit: contain; }
          .title { font-size: 24px; font-weight: 900; color: #00986C; }
          .badge { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; border-radius: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background: #f1f5f9; font-weight: bold; }
          .text-right { text-align: right; }
          .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${window.location.origin}/src/assets/saathapp-logo.jpeg" class="logo-img" alt="SaathApp" onerror="this.style.display='none'" />
            <div>
              <div class="title">TAX INVOICE</div>
              <div style="font-size: 12px; color: #64748b;">${sellerName}</div>
            </div>
          </div>
          <div style="text-align: right; font-size: 12px;">
            <div><strong>Invoice No:</strong> INV-2026-${order.id}</div>
            <div><strong>Date:</strong> ${dateStr}</div>
            <div><strong>Order Reference:</strong> ${order.id}</div>
          </div>
        </div>

        <div class="badge">
          <div><strong>Billed To:</strong> ${order.buyer}</div>
          <div><strong>Category:</strong> ${order.category}</div>
          <div><strong>Dispatch Hub:</strong> ${order.warehouse}</div>
          <div><strong>Payment Status:</strong> ${order.payment}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Taxable Amount</th>
              <th class="text-right">GST (18%)</th>
              <th class="text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bulk Wholesale Supply - ${order.category} (${order.itemsCount} SKUs)</td>
              <td class="text-right">${order.itemsCount} Cases</td>
              <td class="text-right">₹${taxValue.toLocaleString('en-IN')}</td>
              <td class="text-right">₹${gstVal.toLocaleString('en-IN')}</td>
              <td class="text-right" style="color:#00986C; font-weight:900;">₹${order.amount.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>Digital Signature: 🟢 <strong>SaathApp Tax Engine Verified</strong></div>
          <div>Confidential &amp; Tax Compliant Invoice</div>
        </div>

        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    addToast?.(`🎉 Tax Invoice for ${order.id} downloaded!`, 'success');
  };

  return (
    <div className="space-y-6 sa-fade">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <img src={saathAppLogo} alt="SaathApp Logo" className="h-9 object-contain shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Order Management</h2>
            <p className="text-xs text-slate-500">Track B2B wholesale purchase orders, update fulfillment status, and generate GST invoices.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
        >
          <FileSpreadsheet size={16} /> Export CSV / Excel
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {ORDER_STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveStatusTab(tab)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition cursor-pointer ${
              activeStatusTab === tab
                ? 'bg-[#00986C] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Order ID, Buyer Store Name, or Category..."
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Buyer Store</th>
                <th className="p-4">Category / SKUs</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-[#00986C]">{o.id}</td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-white">{o.buyer}</td>
                  <td className="p-4">{o.category} ({o.itemsCount} SKUs)</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white font-mono">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                    >
                      <option value="New Orders">New Orders</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Packed">Packed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returns">Returns</option>
                      <option value="Refunds">Refunds</option>
                    </select>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#00986C] font-bold">{o.payment}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(o)}
                      className="p-1.5 text-slate-400 hover:text-[#00986C] transition cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoicePdf(o)}
                      className="p-1.5 text-slate-400 hover:text-[#00986C] transition cursor-pointer"
                      title="Download Invoice PDF"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Order Details - {selectedOrder.id}</h3>
              <button type="button" onClick={() => setSelectedOrder(null)} className="text-slate-400 font-bold p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-500">Buyer Store:</strong> {selectedOrder.buyer}</p>
              <p><strong className="text-slate-500">Category:</strong> {selectedOrder.category}</p>
              <p><strong className="text-slate-500">Item Count:</strong> {selectedOrder.itemsCount} SKUs</p>
              <p><strong className="text-slate-500">Order Amount:</strong> ₹{selectedOrder.amount.toLocaleString('en-IN')}</p>
              <p><strong className="text-slate-500">Fulfillment Status:</strong> {selectedOrder.status}</p>
              <p><strong className="text-slate-500">Warehouse:</strong> {selectedOrder.warehouse}</p>
              <p><strong className="text-slate-500">Payment Status:</strong> {selectedOrder.payment}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadInvoicePdf(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#00986C] text-white font-extrabold shadow flex items-center gap-1.5"
              >
                <Download size={14} /> Download Invoice PDF
              </button>
            </div>
          </div>
        </div>
      )}

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
