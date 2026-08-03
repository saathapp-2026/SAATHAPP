import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, Truck, RefreshCw, XCircle, ArrowUpDown } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

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
  const { addToast } = useWholesale();
  const [activeStatusTab, setActiveStatusTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(MOCK_FULL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    addToast(`Order ${orderId} updated to ${newStatus}`, 'success');
  };

  const handleDownloadInvoice = (orderId) => {
    addToast(`Downloading Tax Invoice for ${orderId}...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Order Management</h2>
          <p className="text-xs text-slate-500">Track B2B wholesale purchase orders, update fulfillment status, and generate GST invoices.</p>
        </div>
        <button
          type="button"
          onClick={() => addToast('Exporting order report to CSV...', 'success')}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {ORDER_STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveStatusTab(tab)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
              activeStatusTab === tab
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Buyer Name, or Category..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Table */}
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
                <th className="p-4">Payment</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{ord.id}</td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-white">{ord.buyer}</td>
                  <td className="p-4">{ord.category} ({ord.itemsCount} SKUs)</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">₹{ord.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="New Orders">New Orders</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Packed">Packed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returns">Returns</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{ord.payment}</span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 text-slate-400 hover:text-emerald-500 transition"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(ord.id)}
                      className="p-1.5 text-slate-400 hover:text-emerald-500 transition"
                      title="Download GST Invoice"
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Order Breakdown: {selectedOrder.id}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <p><strong className="text-slate-500">Buyer Name:</strong> {selectedOrder.buyer}</p>
              <p><strong className="text-slate-500">Warehouse Origin:</strong> {selectedOrder.warehouse}</p>
              <p><strong className="text-slate-500">Total Amount:</strong> ₹{selectedOrder.amount.toLocaleString('en-IN')}</p>
              <p><strong className="text-slate-500">Payment Status:</strong> {selectedOrder.payment}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-emerald-600 text-white px-5 py-2 text-xs font-bold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
