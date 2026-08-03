import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, Send, ShieldCheck, FileQuestion } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function SupportTab() {
  const { addToast } = useWholesale();
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !query.trim()) {
      addToast('Please enter ticket subject and message', 'error');
      return;
    }
    addToast('Support ticket #T-9842 created! Priority manager assigned.', 'success');
    setSubject('');
    setQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">24/7 Wholesale Partner Support</h2>
          <p className="text-xs text-slate-500">Dedicated B2B account managers, instant ticket resolution, and helpline contacts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Support Cards */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase text-slate-400">Dedicated B2B Support Line</h3>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">+91 9128842027</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Mon - Sat (9 AM - 8 PM)</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase text-slate-400">Official Merchant Email</h3>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">wholesale@saathapp.in</p>
                <span className="text-[10px] text-slate-500 font-medium">Avg response time &lt; 2 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Form */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">Submit a Priority Partner Ticket</h3>
          <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Ticket Subject *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 font-semibold text-slate-900 dark:text-white"
                placeholder="e.g. Bulk order dispatch delay enquiry"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Detailed Message / Description *
              </label>
              <textarea
                rows={4}
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 font-semibold text-slate-900 dark:text-white"
                placeholder="Explain your query or issue in detail..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3 text-xs font-extrabold text-white shadow"
              >
                <Send size={15} /> Create Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
