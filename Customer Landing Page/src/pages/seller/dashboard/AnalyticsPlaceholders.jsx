import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingBag, Package, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const salesData = [
  { name: 'Mon', revenue: 4000, target: 2400 },
  { name: 'Tue', revenue: 3000, target: 1398 },
  { name: 'Wed', revenue: 2000, target: 9800 },
  { name: 'Thu', revenue: 2780, target: 3908 },
  { name: 'Fri', revenue: 1890, target: 4800 },
  { name: 'Sat', revenue: 2390, target: 3800 },
  { name: 'Sun', revenue: 3490, target: 4300 },
];

const orderData = [
  { name: 'Week 1', completed: 40, cancelled: 4, returned: 2 },
  { name: 'Week 2', completed: 30, cancelled: 1, returned: 1 },
  { name: 'Week 3', completed: 20, cancelled: 5, returned: 0 },
  { name: 'Week 4', completed: 27, cancelled: 3, returned: 1 },
];

const customerData = [
  { name: 'New Customers', value: 400, color: '#10b981' },
  { name: 'Returning', value: 300, color: '#0ea5e9' },
  { name: 'Inactive', value: 100, color: '#94a3b8' },
];

const productData = [
  { id: '1', name: 'Organic Mangoes', sales: 450, revenue: 45000, status: 'trending' },
  { id: '2', name: 'Basmati Rice 5kg', sales: 380, revenue: 76000, status: 'stable' },
  { id: '3', name: 'Premium Tea 250g', sales: 290, revenue: 14500, status: 'trending' },
  { id: '4', name: 'Mustard Oil 1L', sales: 120, revenue: 18000, status: 'down' },
  { id: '5', name: 'Fresh Milk 1L', sales: 85, revenue: 5100, status: 'down' },
];

function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</span>
        {change && (
          <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}

export function SalesAnalyticsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Gross Sales" value="₹19,550" change="12.5" isPositive={true} />
        <StatCard title="Average Order Value" value="₹450" change="3.2" isPositive={true} />
        <StatCard title="Sales Growth" value="+8.4%" change="2.1" isPositive={true} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-6">Revenue Trend (Last 7 Days)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `₹${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function OrdersAnalyticsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard title="Total Orders" value="117" change="5.4" isPositive={true} />
        <StatCard title="Completed" value="95" change="8.1" isPositive={true} />
        <StatCard title="Cancelled" value="13" change="2.4" isPositive={false} />
        <StatCard title="Returned" value="9" change="1.2" isPositive={false} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-6">Order Fulfillment Breakdown</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="completed" name="Completed" stackId="a" fill="#10b981" radius={[0,0,4,4]} />
              <Bar dataKey="returned" name="Returned" stackId="a" fill="#f59e0b" />
              <Bar dataKey="cancelled" name="Cancelled" stackId="a" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function ProductsAnalyticsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Active SKUs" value="48" change="2.0" isPositive={true} />
        <StatCard title="Units Sold" value="1,345" change="14.2" isPositive={true} />
        <StatCard title="Low Stock Items" value="6" change="1" isPositive={false} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Product Performance Matrix</h3>
          <p className="text-sm text-slate-500">Track your best and worst performing products.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4 text-right">Units Sold</th>
                <th className="px-6 py-4 text-right">Revenue</th>
                <th className="px-6 py-4 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {productData.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{item.sales}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">₹{item.revenue.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-center">
                    {item.status === 'trending' && <span className="inline-flex items-center text-emerald-600"><ArrowUpRight size={16} /></span>}
                    {item.status === 'stable' && <span className="inline-flex items-center text-slate-400">-</span>}
                    {item.status === 'down' && <span className="inline-flex items-center text-rose-600"><ArrowDownRight size={16} /></span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CustomersAnalyticsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Customers" value="800" change="12.4" isPositive={true} />
        <StatCard title="Repeat Rate" value="37.5%" change="4.1" isPositive={true} />
        <StatCard title="Customer CAC" value="₹120" change="10.5" isPositive={false} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 w-full max-w-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Customer Demographics</h3>
          <p className="text-sm text-slate-500 mb-6">Breakdown of your customer acquisition segments.</p>
          <div className="space-y-4">
            {customerData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm text-slate-500">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-64 flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={customerData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function FinancialAnalyticsPlaceholder() {
  const data = [
    { name: 'Gross Sales', amount: 125000, color: 'text-slate-900 dark:text-slate-100' },
    { name: 'Discounts', amount: -12000, color: 'text-amber-600' },
    { name: 'Platform Charges', amount: -8500, color: 'text-rose-600' },
    { name: 'Refunds', amount: -4500, color: 'text-rose-600' },
    { name: 'Net Earnings', amount: 100000, color: 'text-emerald-600 font-bold text-lg', borderTop: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard title="Net Earnings (MTD)" value="₹100,000" change="18.5" isPositive={true} />
        <StatCard title="Platform Fees Paid" value="₹8,500" change="5.2" isPositive={false} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm max-w-2xl mx-auto overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Financial Summary (Month to Date)</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center ${item.borderTop ? 'pt-4 border-t border-slate-200 dark:border-slate-800 mt-2' : ''}`}>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                <span className={`${item.color}`}>{item.amount < 0 ? '-' : ''}₹{Math.abs(item.amount).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
              Download Tax Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
