import React, { useState } from 'react';
import { Warehouse, AlertTriangle, ArrowLeftRight, Package, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function InventoryTab() {
  const { formData, addToast } = useWholesale();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferItem, setTransferItem] = useState('Fortune Sunflower Oil 15L');
  const [fromWh, setFromWh] = useState('Delhi NCR Hub');
  const [toWh, setToWh] = useState('Mumbai Express Depot');
  const [qty, setQty] = useState('50');

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    addToast(`Transferred ${qty} units of "${transferItem}" from ${fromWh} to ${toWh}`, 'success');
    setIsTransferModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Inventory & Warehouse Hubs</h2>
          <p className="text-xs text-slate-500">Monitor multi-location fulfillment stock levels, low stock alerts, batch expiry, and inter-warehouse transfers.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsTransferModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition"
        >
          <ArrowLeftRight size={16} /> Inter-Warehouse Transfer
        </button>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formData.additionalWarehouses.map((wh, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Warehouse size={18} className="text-emerald-500" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{wh.name}</h3>
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                Active Hub
              </span>
            </div>
            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <p><strong className="text-slate-500">Location:</strong> {wh.city}</p>
              <p><strong className="text-slate-500">Facility Area:</strong> {wh.area}</p>
              <p><strong className="text-slate-500">Hub Manager:</strong> {wh.manager}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Batch & Stock Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Batch & Expiry Management</h3>
          <span className="text-xs font-bold text-slate-500">ISO Batch Tracking Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Batch ID</th>
                <th className="p-3">Item Description</th>
                <th className="p-3">Warehouse Hub</th>
                <th className="p-3">Stock Units</th>
                <th className="p-3">Mfg Date</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Batch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {[
                { batch: 'BATCH-2026-08A', item: 'Fortune Sunflower Oil 15L', wh: 'Delhi NCR Hub', stock: 450, mfg: '2026-01-10', exp: '2027-01-10', status: 'Compliant' },
                { batch: 'BATCH-2026-07F', item: 'Tata Salt 1kg Pack', wh: 'Delhi NCR Hub', stock: 18, mfg: '2026-02-01', exp: '2028-02-01', status: 'Low Stock' },
                { batch: 'BATCH-2026-05K', item: 'Cement 50kg PPC Bag', wh: 'Kolkata East', stock: 1250, mfg: '2026-05-15', exp: '2026-11-15', status: 'Compliant' },
                { batch: 'BATCH-2026-03M', item: 'Basmati Rice 25kg', wh: 'Mumbai Express', stock: 820, mfg: '2026-03-20', exp: '2027-03-20', status: 'Compliant' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.batch}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">{row.item}</td>
                  <td className="p-3">{row.wh}</td>
                  <td className="p-3 font-black text-slate-900 dark:text-white">{row.stock} Units</td>
                  <td className="p-3 text-slate-500">{row.mfg}</td>
                  <td className="p-3 text-slate-500">{row.exp}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                        row.status === 'Compliant'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
              Inter-Warehouse Inventory Transfer
            </h3>
            <form onSubmit={handleTransferSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Select Product Item
                </label>
                <select
                  value={transferItem}
                  onChange={(e) => setTransferItem(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
                >
                  <option value="Fortune Sunflower Oil 15L">Fortune Sunflower Oil 15L</option>
                  <option value="Tata Salt 1kg Pack">Tata Salt 1kg Pack</option>
                  <option value="Cement 50kg PPC Bag">Cement 50kg PPC Bag</option>
                  <option value="Basmati Rice 25kg">Basmati Rice 25kg</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    From Warehouse
                  </label>
                  <select
                    value={fromWh}
                    onChange={(e) => setFromWh(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="Delhi NCR Hub">Delhi NCR Hub</option>
                    <option value="Mumbai Express Depot">Mumbai Express Depot</option>
                    <option value="Kolkata East Logistics">Kolkata East Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    To Warehouse
                  </label>
                  <select
                    value={toWh}
                    onChange={(e) => setToWh(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="Mumbai Express Depot">Mumbai Express Depot</option>
                    <option value="Delhi NCR Hub">Delhi NCR Hub</option>
                    <option value="Kolkata East Logistics">Kolkata East Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Quantity to Transfer (Units)
                </label>
                <input
                  type="number"
                  required
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 text-white px-6 py-2 text-xs font-extrabold shadow"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
