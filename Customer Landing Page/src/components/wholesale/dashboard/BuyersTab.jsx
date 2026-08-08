import React, { useState } from 'react';
import { Users, MessageSquare, Star, Search, Send, Building2, Phone, Mail, MapPin, FileText, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Download, Filter } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import MessagesTab from './MessagesTab';

export const BUYERS_SUB_TABS = [
  'All Buyers',
  'Buyer Profiles',
  'Enquiries',
  'Quotations',
  'Messages',
];

export default function BuyersTab({ onSelectTab }) {
  const { dashboardData, addToast } = useWholesale();
  const [activeSubTab, setActiveSubTab] = useState('All Buyers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyerChat, setSelectedBuyerChat] = useState(null);
  const [selectedBuyerProfile, setSelectedBuyerProfile] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'buyer', text: 'Hi Rakesh, we want to place a bulk order of 200 tins of Fortune Oil next week. What is the best price tier?' },
    { sender: 'you', text: 'Hello! For 200+ units we offer 18% off list price + free door delivery to your Gurgaon warehouse.' },
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setMessages((prev) => [...prev, { sender: 'you', text: chatMessage }]);
      setChatMessage('');
      addToast?.('Message sent to buyer!', 'success');
    }
  };

  const filteredBuyers = dashboardData.buyersList.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 sa-fade">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Buyers &amp; Enquiries</h2>
          <p className="text-xs text-slate-500">Manage verified B2B retail buyers, respond to trade RFQs, issue quotations, and negotiate orders.</p>
        </div>
      </div>

      {/* Sub-Tabs Bar (PDF 4.4 Spec) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {BUYERS_SUB_TABS.map((tab) => (
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
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Embedded Sub-Tab Views */}
      {activeSubTab === 'Messages' ? (
        <MessagesTab />
      ) : activeSubTab === 'Enquiries' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Active B2B Buyer RFQs &amp; Enquiries</h3>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">RFQ ID</th>
                  <th className="p-4">Buyer Store</th>
                  <th className="p-4">Requested Category</th>
                  <th className="p-4">Quantity Required</th>
                  <th className="p-4">Target Rate</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {[
                  { rfq: 'RFQ-8841', buyer: 'Ramesh Supermarket', category: 'Fortune Sunflower Oil 15L', qty: '100 Tins', target: '₹1,800/tin', date: 'Today' },
                  { rfq: 'RFQ-8840', buyer: 'Shree Traders', category: 'Tata Salt 1kg Case', qty: '50 Cases', target: '₹600/case', date: 'Yesterday' },
                  { rfq: 'RFQ-8839', buyer: 'Patna Wholesale Point', category: 'Cement 50kg PPC Bag', qty: '500 Bags', target: '₹330/bag', date: '02 Aug 2026' },
                ].map((q) => (
                  <tr key={q.rfq}>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{q.rfq}</td>
                    <td className="p-4 font-black">{q.buyer}</td>
                    <td className="p-4">{q.category}</td>
                    <td className="p-4 font-extrabold text-emerald-500">{q.qty}</td>
                    <td className="p-4 font-mono">{q.target}</td>
                    <td className="p-4 text-slate-400">{q.date}</td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => addToast?.(`Opening Quotation Builder for ${q.rfq}`, 'success')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow transition"
                      >
                        Issue Quotation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeSubTab === 'Quotations' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Issued Price Quotations &amp; Negotiations</h3>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Quote Ref</th>
                  <th className="p-4">Buyer Store</th>
                  <th className="p-4">Quoted Amount</th>
                  <th className="p-4">Valid Until</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {[
                  { ref: 'Q-9841', buyer: 'Ramesh Supermarket', amount: '₹1,85,000', valid: '10 Aug 2026', status: 'Accepted by Buyer' },
                  { ref: 'Q-9840', buyer: 'Metro Retail Mart', amount: '₹3,40,000', valid: '12 Aug 2026', status: 'Under Negotiation' },
                  { ref: 'Q-9839', buyer: 'Apna General Hub', amount: '₹62,000', valid: '08 Aug 2026', status: 'Pending Buyer Confirmation' },
                ].map((quote) => (
                  <tr key={quote.ref}>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{quote.ref}</td>
                    <td className="p-4 font-black">{quote.buyer}</td>
                    <td className="p-4 font-black text-slate-900 dark:text-white">{quote.amount}</td>
                    <td className="p-4 text-slate-500">{quote.valid}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        quote.status.includes('Accepted')
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : quote.status.includes('Negotiation')
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => addToast?.(`Created Wholesale Order from Quote ${quote.ref}!`, 'success')}
                        className="px-3 py-1.5 rounded-xl bg-[#00986C] hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow transition"
                      >
                        Convert to Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {/* Trackable Enquiry to Quotation Workflow Tracker (PDF 4.4 Spec) */}
          <div className="bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[11px]">
                🤝 Wholesale B2B Enquiry &amp; Negotiation Workflow
              </span>
              <span className="text-slate-400 text-[10px] font-mono font-bold">PDF Spec Standard</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto py-1 text-[10px] font-black text-center scrollbar-none">
              {[
                'Buyer',
                'Enquiry / RFQ',
                'Seller Response',
                'Quotation',
                'Negotiation',
                'Order Confirmation'
              ].map((stepName, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 whitespace-nowrap">
                    {idx + 1}. {stepName}
                  </div>
                  {idx < arr.length - 1 && <span className="text-slate-600 font-bold">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Buyer Business Name, City, or Category..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            />
          </div>

          {/* Buyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {buyer.type}
                    </span>
                    <h3 className="mt-1.5 text-base font-extrabold text-slate-900 dark:text-white">{buyer.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={13} className="text-emerald-500" /> {buyer.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-500 flex items-center justify-end gap-1">
                      <Star size={13} fill="currentColor" /> {buyer.rating}
                    </span>
                    <p className="text-[11px] text-slate-500 font-bold mt-1">{buyer.ordersCount} Total Orders</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                    Spent: ₹{buyer.totalSpent.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBuyerProfile(buyer)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBuyerChat(buyer)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white transition shadow cursor-pointer"
                    >
                      <MessageSquare size={14} /> Open B2B Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Buyer Full Profile Details Modal (PDF 4.4 Spec) */}
      {selectedBuyerProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedBuyerProfile.name}</h3>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Verified B2B Wholesale Buyer</span>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedBuyerProfile(null)} className="text-slate-400 font-bold p-1 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Contact Person</span>
                <strong className="text-slate-900 dark:text-white block font-extrabold">Rajesh Sharma (Procurement Mgr)</strong>
                <span className="text-[11px] text-emerald-500 font-mono block font-bold">📞 +91 98765 43210</span>
                <span className="text-[11px] text-slate-500 block">✉️ procurement@{selectedBuyerProfile.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">GST &amp; Verification</span>
                <strong className="text-slate-900 dark:text-white block font-mono font-extrabold">07AAACR9842F1Z9</strong>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">✓ Verified Active GSTIN</span>
                <span className="text-[11px] text-slate-500 block">Trade Credit: ₹5,00,000 Approved</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Registered Business Address</span>
              <p className="text-slate-800 dark:text-slate-200 font-medium">Plot 42, Wholesale Commercial Complex, Main Road, {selectedBuyerProfile.city}, India</p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase block">Order History &amp; Volume</span>
                <strong className="text-slate-900 dark:text-white font-extrabold text-sm">{selectedBuyerProfile.ordersCount} Total Delivered Bulk Orders</strong>
              </div>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">₹{selectedBuyerProfile.totalSpent.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedBuyerProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBuyerChat(selectedBuyerProfile);
                  setSelectedBuyerProfile(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow flex items-center gap-1.5"
              >
                <MessageSquare size={14} /> Initiate Quotation Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Chat Drawer/Modal */}
      {selectedBuyerChat && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col h-[500px]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Chat with {selectedBuyerChat.name}
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Verified Buyer • {selectedBuyerChat.city}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBuyerChat(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs font-medium leading-relaxed ${
                      m.sender === 'you'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type bulk quote or message..."
                className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 p-2.5 text-white transition shadow"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
