import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  DollarSign,
  Wallet,
  Users,
  PackageCheck,
  Star,
  Warehouse,
  ArrowUpRight,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function OverviewTab({ onSelectTab, onOpenAddProduct, onOpenWithdrawModal }) {
  const { formData, dashboardData, addToast } = useWholesale();

  const kpis = [
    { label: 'Total Orders', val: dashboardData.kpis.totalOrders, icon: ShoppingBag, change: '+18% vs last mo', color: 'emerald' },
    { label: 'Bulk Orders', val: '356', icon: PackageCheck, change: '+22% high vol', color: 'blue' },
    { label: 'Pending Orders', val: dashboardData.kpis.pendingOrders, icon: Clock, change: 'Requires dispatch', color: 'amber' },
    { label: 'Completed Orders', val: dashboardData.kpis.completedOrders, icon: CheckCircle2, change: '98.4% SLA match', color: 'teal' },
    { label: 'Monthly Revenue', val: `₹${dashboardData.kpis.monthlyRevenue.toLocaleString('en-IN')}`, icon: DollarSign, change: '+24% YoY growth', color: 'emerald' },
    { label: 'Wallet Balance', val: `₹${dashboardData.kpis.walletBalance.toLocaleString('en-IN')}`, icon: Wallet, change: 'Payout ready', color: 'indigo' },
    { label: 'Active Buyers', val: dashboardData.kpis.activeBuyers, icon: Users, change: '+15% repeat', color: 'sky' },
    { label: 'Products Listed', val: dashboardData.kpis.productsListed, icon: PackageCheck, change: 'Across 4 cats', color: 'slate' },
    { label: 'Store Rating', val: `${dashboardData.kpis.storeRating} / 5.0`, icon: Star, change: '350 Verified reviews', color: 'amber' },
    { label: 'Warehouse Count', val: `${dashboardData.kpis.warehouseCount} Active`, icon: Warehouse, change: 'Delhi, Mumbai, Kolkata', color: 'emerald' },
  ];

  return (
    <div className="space-y-6 sa-fade">
      {/* Top Banner Alert */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white border border-emerald-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-2">
            <TrendingUp size={14} /> Active Enterprise Partner
          </div>
          <h2 className="text-2xl font-black">Welcome back, {formData.fullName}!</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Managing <strong className="text-emerald-400">{formData.businessName}</strong>. You have <strong>128 pending bulk orders</strong> across {formData.numberOfWarehouses} warehouse hubs today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenWithdrawModal}
            className="rounded-2xl bg-[#00986C] hover:bg-emerald-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition cursor-pointer"
          >
            Withdraw Funds
          </button>
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-2.5 text-xs font-extrabold text-white backdrop-blur-sm transition cursor-pointer"
          >
            + Add New SKU
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => addToast?.(`View ${kpi.label} details`, 'info')}
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">{kpi.label}</span>
                <Icon size={16} className="text-[#00986C]" />
              </div>
              <p className="mt-2 text-lg sm:text-xl font-black text-slate-900 dark:text-white truncate font-mono">
                {kpi.val}
              </p>
              <span className="mt-1 block text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sales Chart & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Bulk Order Performance Chart Box (Fixed Blank Space) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Revenue &amp; Bulk Order Performance</h3>
              <p className="text-xs text-slate-500">Monthly breakdown of wholesale sales in ₹ INR</p>
            </div>
            <span className="text-xs font-extrabold text-[#00986C] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              May 2026 - Aug 2026
            </span>
          </div>

          {/* VISIBLE FILLED BAR CHART WITH Y-AXIS GRID LINES */}
          <div className="relative h-56 w-full pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-slate-400 pb-8">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-0.5"><span>₹15L</span></div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-0.5"><span>₹10L</span></div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-0.5"><span>₹5L</span></div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-0.5"><span>₹0</span></div>
            </div>

            <div className="h-44 flex items-end justify-between gap-6 px-6 z-10 relative">
              {[
                { month: 'May', height: '55%', rev: '₹8.2L' },
                { month: 'Jun', height: '70%', rev: '₹9.8L' },
                { month: 'Jul', height: '85%', rev: '₹11.4L' },
                { month: 'Aug', height: '96%', rev: '₹12.45L' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group cursor-pointer" onClick={() => addToast?.(`Revenue for ${bar.month}: ${bar.rev}`, 'info')}>
                  <span className="text-xs font-mono font-black text-[#00986C] group-hover:scale-110 transition">
                    {bar.rev}
                  </span>
                  <div
                    className="w-full max-w-[64px] rounded-t-2xl bg-gradient-to-t from-[#00986C] via-emerald-500 to-teal-400 shadow-md group-hover:brightness-110 transition-all duration-300"
                    style={{ height: bar.height }}
                  />
                  <span className="text-xs font-extrabold text-slate-600 dark:text-slate-400">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Categories */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">Top Category Revenue</h3>
          <div className="space-y-4">
            {dashboardData.topSellingCategories.map((cat, i) => (
              <div key={i} className="cursor-pointer" onClick={() => addToast?.(`Category ${cat.name}: ₹${cat.amount.toLocaleString('en-IN')}`, 'info')}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">{cat.name}</span>
                  <span className="text-[#00986C] font-mono">₹{cat.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#00986C] rounded-full"
                    style={{ width: cat.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Bulk Orders</h3>
            <button
              type="button"
              onClick={() => onSelectTab('orders')}
              className="text-xs font-extrabold text-[#00986C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              View All Orders <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Buyer Name</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {dashboardData.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer" onClick={() => onSelectTab('orders')}>
                    <td className="py-3 font-mono font-bold text-[#00986C]">{ord.id}</td>
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{ord.buyer}</td>
                    <td className="py-3 font-extrabold text-slate-900 dark:text-white font-mono">₹{ord.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500 font-mono text-[11px]">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Warehouse Stock Alerts Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" /> Warehouse Stock Alerts
              </h3>
              <button type="button" onClick={() => onSelectTab('inventory')} className="text-xs font-bold text-[#00986C] hover:underline cursor-pointer">
                Inventory Hub
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Cement 50kg PPC Bag', warehouse: 'Delhi NCR Hub', stock: '18 Units', alert: 'Low Stock', statusColor: 'bg-amber-50 text-amber-600 border-amber-200' },
                { title: 'Basmati Rice 25kg Bag', warehouse: 'Mumbai Express Depot', stock: '0 Units', alert: 'Out of Stock', statusColor: 'bg-rose-50 text-rose-600 border-rose-200' },
                { title: 'Havells Modular Switch 6A', warehouse: 'Kolkata East Depot', stock: '25 Units', alert: 'Reorder Soon', statusColor: 'bg-amber-50 text-amber-600 border-amber-200' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center cursor-pointer" onClick={() => onSelectTab('inventory')}>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-extrabold text-xs block truncate max-w-[150px]">{item.title}</strong>
                    <span className="text-[10px] text-slate-500 font-bold">{item.warehouse}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${item.statusColor}`}>
                      {item.alert}
                    </span>
                    <span className="block font-mono text-[10px] text-slate-400 font-bold mt-0.5">{item.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('inventory')}
            className="w-full py-2.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
          >
            Manage All Warehouse Stocks
          </button>
        </div>
      </div>
    </div>
  );
}
