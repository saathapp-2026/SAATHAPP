import React, { useState } from 'react';
import { Warehouse, AlertTriangle, ArrowLeftRight, Package, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import InterWarehouseTransferModal from './InterWarehouseTransferModal';

export default function InventoryTab() {
  const { formData, addToast } = useWholesale ? useWholesale() : { formData: {}, addToast: console.log };
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const warehousesList = formData?.additionalWarehouses || [
    { name: 'Delhi NCR Logistics Hub', city: 'Gurugram', area: '45,000 sq ft', manager: 'Rajesh Sharma' },
    { name: 'Mumbai Express Depot', city: 'Mumbai', area: '32,000 sq ft', manager: 'Vikram Mehta' },
    { name: 'Bengaluru Tech Park Hub', city: 'Bengaluru', area: '28,000 sq ft', manager: 'Anish Kumar' },
  ];

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
          className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
        >
          <ArrowLeftRight size={16} /> Inter-Warehouse Transfer
        </button>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {warehousesList.map((wh, idx) => (
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

      {/* Complete 15-Step 4-Section Inter-Warehouse Transfer Modal */}
      <InterWarehouseTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />
    </div>
  );
}
