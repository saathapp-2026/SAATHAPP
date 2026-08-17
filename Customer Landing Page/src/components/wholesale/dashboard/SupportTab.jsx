import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, Send, ShieldCheck, FileQuestion } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const SUPPORT_SUB_TABS = [
  'Help Center',
  'FAQs',
  'Create Ticket',
  'My Tickets',
  'Contact Support',
];

export default function SupportTab() {
  const { addToast } = useWholesale();
  const [activeSubTab, setActiveSubTab] = useState('Help Center');
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !query.trim()) {
      addToast?.('Please enter ticket subject and message', 'error');
      return;
    }
    addToast?.('Support ticket #T-9842 created! Priority manager assigned.', 'success');
    setSubject('');
    setQuery('');
  };

  return (
    <div className="space-y-6 sa-fade">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Support</h2>
          <p className="text-xs text-slate-500">Dedicated B2B account managers, instant ticket resolution, FAQs, and helpline contacts.</p>
        </div>
      </div>

      {/* Sub-Tabs Bar (PDF 4.9 Spec) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {SUPPORT_SUB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={(e) => {
              setActiveSubTab(tab);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${
              activeSubTab === tab
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Sub-Tab Views */}
      {activeSubTab === 'FAQs' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Wholesale Merchant Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              { q: 'How does the Escrow Payment system work on SaathApp Wholesale?', a: 'Funds are securely deposited in SaathApp Escrow when a buyer places a bulk order and are released to your bank account immediately upon verified delivery.' },
              { q: 'What is the T+1 Settlement SLA?', a: 'Payout requests initiated before 5 PM are processed via IMPS/NEFT directly into your linked HDFC bank account on the next business morning.' },
              { q: 'How do I issue custom RFQ Quotations to buyers?', a: 'Navigate to Buyers & Enquiries → Enquiries tab and click "Issue Quotation" to send a customized price and lead-time proposal.' },
              { q: 'What tax documents are required for GST compliance?', a: 'A valid GSTIN certificate and PAN are mandatory for all wholesale seller accounts to generate GST e-Invoices.' },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <FileQuestion size={16} className="text-emerald-500" /> {faq.q}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ) : activeSubTab === 'My Tickets' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Your Priority Partner Support Tickets</h3>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-page dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Assigned Manager</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {[].map((t) => (
                  <tr key={t.id}>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{t.id}</td>
                    <td className="p-4 font-black">{t.sub}</td>
                    <td className="p-4 text-slate-500">{t.mgr}</td>
                    <td className="p-4 text-slate-400">{t.date}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {[].length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400 font-medium">
                No active support tickets. Submit a ticket using the "Create Ticket" tab.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Support Cards */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-slate-400">Dedicated B2B Support Line</h3>
                  <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">+91 1800-SAATHAPP</p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Mon - Sat (9 AM - 8 PM)</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm">
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
          <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm">
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
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 p-3 font-semibold text-slate-900 dark:text-white"
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
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 p-3 font-semibold text-slate-900 dark:text-white"
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
      )}
    </div>
  );
}
