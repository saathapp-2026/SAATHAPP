import React, { useState } from 'react';
import { Search, Star, Award, History, User } from 'lucide-react';

export default function CustomerTable() {
  const [search, setSearch] = useState('');
  const [customerTab, setCustomerTab] = useState('all');
  
  const customers = [];

  let filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  if (customerTab === 'repeat') {
    filteredCustomers = filteredCustomers.filter(c => c.repeat);
  }

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 ">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Client Database</h3>
          <p className="text-[11px] text-slate-450 mt-0.5">Database of clients you have serviced</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 dark:border-slate-800 rounded-xl bg-page dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Module 3 Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'All Customers' },
          { id: 'profiles', label: 'Customer Profiles' },
          { id: 'history', label: 'Booking History' },
          { id: 'repeat', label: 'Repeat Customers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCustomerTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
              customerTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area based on Tabs */}
      {customerTab === 'profiles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCustomers.map((cust, idx) => (
            <div key={idx} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                  {cust.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">{cust.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">+91 {cust.phone}</p>
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 space-y-1">
                <p><span className="text-slate-400">Address:</span> {cust.location}</p>
                <p><span className="text-slate-400">Total Bookings:</span> {cust.jobs}</p>
                <p><span className="text-slate-400">Completed Services:</span> {cust.completedServices}</p>
                <p><span className="text-slate-400">Total Spending:</span> ₹{cust.totalSpending}</p>
                <p><span className="text-slate-400">Last Booking:</span> {cust.lastBooking}</p>
                <p className="flex items-center gap-1"><span className="text-slate-400">Rating/Feedback:</span> <Star size={10} className="text-amber-500 fill-amber-500"/> {cust.rating}</p>
              </div>
            </div>
          ))}
        </div>
      ) : customerTab === 'history' ? (
        <div className="space-y-4">
          {filteredCustomers.map((cust, idx) => (
            <div key={idx} className="p-4 bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">{cust.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Last booked: {cust.lastBooking}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{cust.jobs} Past Jobs</p>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mt-0.5">Total: ₹{cust.totalSpending}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Grid for Mobile / Table for Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3 text-center">Bookings</th>
                  <th className="pb-3 text-center">Avg Rating</th>
                  <th className="pb-3 text-right">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-page flex items-center justify-center font-bold text-[10px] text-slate-600 dark:text-slate-300">
                          {cust.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-black text-slate-800 dark:text-slate-200">{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 font-mono">+91 {cust.phone}</td>
                    <td className="py-4 max-w-[200px] truncate">{cust.location}</td>
                    <td className="py-4 text-center font-bold text-slate-800 dark:text-slate-300">{cust.jobs}</td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="font-black text-slate-800 dark:text-slate-200">{cust.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {cust.repeat ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase">
                          <Award size={10} />
                          <span>Repeat</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Standard</span>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="md:hidden space-y-4">
            {filteredCustomers.length === 0 ? (
              <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 text-center text-slate-400 text-sm py-8">
                No customers found.
              </div>
            ) : (
              filteredCustomers.map((cust, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-page flex items-center justify-center font-black text-xs text-slate-500">
                      {cust.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{cust.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">+91 {cust.phone}</p>
                    </div>
                  </div>

                  {cust.repeat && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[8px] font-black uppercase">
                      Repeat
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-850/80 text-[10px] font-bold text-slate-500">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">Location</span>
                    <span className="truncate block mt-0.5">{cust.location}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">Total Jobs</span>
                    <span className="font-black text-slate-800 dark:text-slate-200 block mt-0.5">{cust.jobs}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">Avg Rating</span>
                    <span className="font-black text-slate-800 dark:text-slate-200 block mt-0.5">★ {cust.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </>
      )}

    </div>
  );
}
