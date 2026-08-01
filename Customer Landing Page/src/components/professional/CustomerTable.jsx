import React, { useState } from 'react';
import { Search, Star, MessageSquare, ShieldCheck, Award } from 'lucide-react';

export default function CustomerTable() {
  const [search, setSearch] = useState('');
  
  const customers = [
    { name: 'Rajesh Sen', phone: '9876543201', location: 'Green Park, New Delhi', jobs: 5, rating: 5.0, repeat: true },
    { name: 'Sunita Roy', phone: '9876543202', location: 'Malviya Nagar, New Delhi', jobs: 3, rating: 4.8, repeat: true },
    { name: 'Preeti Sharma', phone: '9876543203', location: 'Hauz Khas, New Delhi', jobs: 2, rating: 4.5, repeat: false },
    { name: 'Vijay Khanna', phone: '9876543204', location: 'Green Park Ext, New Delhi', jobs: 4, rating: 4.9, repeat: true },
    { name: 'Amit Verma', phone: '9876543205', location: 'Saket, New Delhi', jobs: 1, rating: 5.0, repeat: false }
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/40">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Client Database</h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Database of clients you have serviced</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Grid for Mobile / Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
              <th className="pb-3">Customer</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Home Location</th>
              <th className="pb-3 text-center">Jobs Finished</th>
              <th className="pb-3 text-center">Avg Rating</th>
              <th className="pb-3 text-right">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
            {filteredCustomers.map((cust, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-600 dark:text-slate-300">
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
                      <span>Repeat Client</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Standard</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden space-y-4">
        {filteredCustomers.map((cust, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-500">
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
        ))}
      </div>

    </div>
  );
}
