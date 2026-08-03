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
  const { formData, dashboardData } = useWholesale();

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
    <div className="space-y-6">
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
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition"
          >
            Withdraw Funds
          </button>
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-2.5 text-xs font-extrabold text-white backdrop-blur-sm transition"
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
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">{kpi.label}</span>
                <Icon size={16} className="text-emerald-500" />
              </div>
              <p className="mt-2 text-lg sm:text-xl font-black text-slate-900 dark:text-white truncate">
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
        {/* Sales Chart Simulation */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Revenue & Bulk Order Performance</h3>
              <p className="text-xs text-slate-500">Monthly breakdown of wholesale sales in ₹ INR</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              May 2026 - Aug 2026
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'May', height: '55%', rev: '₹8.2L' },
              { month: 'Jun', height: '70%', rev: '₹9.8L' },
              { month: 'Jul', height: '85%', rev: '₹11.4L' },
              { month: 'Aug', height: '100%', rev: '₹12.45L' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition">
                  {bar.rev}
                </span>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-500 group-hover:brightness-110 shadow"
                  style={{ height: bar.height }}
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Categories */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">Top Category Revenue</h3>
          <div className="space-y-4">
            {dashboardData.topSellingCategories.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">{cat.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹{cat.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
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
              className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
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
                  <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{ord.id}</td>
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{ord.buyer}</td>
                    <td className="py-3 font-extrabold text-slate-900 dark:text-white">₹{ord.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : ord.status === 'Processing'
                            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            : ord.status === 'Confirmed'
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Stock Alerts */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Warehouse Stock Alerts</h3>
            <button
              type="button"
              onClick={() => onSelectTab('inventory')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Inventory Hub
            </button>
          </div>

          <div className="space-y-3">
            {dashboardData.inventorySummary.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.warehouse}</p>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    item.status === 'In Stock'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : item.status === 'Low Stock'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {item.stock} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
