import React, { useState } from 'react';
import {
  Phone, AlertTriangle, ShieldCheck, HelpCircle, MessageSquare, LifeBuoy, FileText, Plus, BookOpen,
  ChevronDown, Search, CheckCircle2, Send, Clock, User, Award, Video, Shield, Truck, AlertCircle
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';
import DeliveryEquipmentStoreSection from '../welcome/DeliveryEquipmentStoreSection';

export default function RiderSupportTab({ initialSubTab = 'help' }) {
  const { addToast } = useDelivery();
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab); // 'help' | 'faqs' | 'create' | 'tickets' | 'contact' | 'training'

  // Sub-tabs configuration for Section 3.9
  const subTabs = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'faqs', label: 'FAQs', icon: FileText },
    { id: 'create', label: 'Create Ticket', icon: Plus },
    { id: 'tickets', label: 'My Tickets', icon: Clock, count: '1 Active' },
    { id: 'contact', label: 'Contact Support', icon: Phone },
    { id: 'training', label: 'Rider Resources / Training', icon: BookOpen, highlight: true },
  ];

  // Delivery-specific issue categories specified in PDF Section 3.9
  const ISSUE_CATEGORIES = [
    'Pickup issue',
    'Customer unavailable',
    'Wrong address',
    'Vehicle problem',
    'Payment/COD issue',
    'App/technical issue',
    'Order issue',
  ];

  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    category: 'Pickup issue',
    orderId: 'DEL-98420',
    subject: '',
    description: '',
  });

  // Submitted Tickets List
  const [myTickets, setMyTickets] = useState([
    {
      id: 'TCK-89102',
      category: 'Payment/COD issue',
      subject: 'COD Amount discrepancy on DEL-98102',
      orderId: 'DEL-98102',
      status: 'In Progress',
      createdDate: '04 Aug 2026',
      response: 'Support team investigating COD deposit receipt from SBI Kankarbagh.',
    },
    {
      id: 'TCK-87421',
      category: 'Vehicle problem',
      subject: 'Fuel allowance claim query',
      orderId: 'N/A',
      status: 'Resolved',
      createdDate: '28 Jul 2026',
      response: 'Fuel subsidy credited to wallet on 29 Jul 2026.',
    },
  ]);

  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: 'What should I do if the store manager refuses to hand over the parcel?',
      a: 'Select "Pickup issue" in Create Ticket or report directly via the Active Delivery bottom action bar ("Report Issue"). Our Hub Coordinator will call the store immediately.',
    },
    {
      q: 'Customer is not answering phone call at drop location.',
      a: 'Attempt to call customer at least 3 times with a 2-minute gap. If unanswered, trigger "Customer unavailable" in Create Ticket. You will be compensated for return trip base fare.',
    },
    {
      q: 'How does COD collection work?',
      a: 'Collect exact cash from customer as displayed on screen. Deposit cash at the nearest SaathApp Express Hub or via UPI deposit link before ending your shift.',
    },
    {
      q: 'When do weekly bonuses get credited to bank?',
      a: 'Weekly bonuses are credited every Monday by 10:00 AM directly into your linked bank account.',
    },
  ];

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject || !ticketForm.description) {
      addToast?.('Please fill out all required ticket fields', 'warning');
      return;
    }

    const newTicket = {
      id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
      category: ticketForm.category,
      subject: ticketForm.subject,
      orderId: ticketForm.orderId || 'N/A',
      status: 'Open',
      createdDate: 'Just now',
      response: 'Ticket received. Support Executive will respond within 15 minutes.',
    };

    setMyTickets([newTicket, ...myTickets]);
    setTicketForm({ category: 'Pickup issue', orderId: '', subject: '', description: '' });
    setActiveSubTab('tickets');
    addToast?.(`Ticket ${newTicket.id} created successfully! Our support desk will reach out.`, 'success');
  };

  const handleSosTrigger = () => {
    addToast?.('Emergency SOS alert sent! SAATHAPP Rider Safety Desk notified.', 'error');
  };

  return (
    <div className="space-y-6 sa-fade">
      {/* Module Header & Sub-Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-500">
              <HelpCircle size={14} /> Rider Help &amp; Support Hub
            </div>
            <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Support
            </h1>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            24/7 On-Shift Rider Support, Ticketing &amp; Training Resources
          </span>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSubTab(tab.id);
                  addToast?.(`Switched to ${tab.label}`, 'info');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER SUB-TAB VIEWS */}

      {/* 1. Help Center */}
      {activeSubTab === 'help' && (
        <div className="space-y-6">
          {/* Emergency SOS Banner */}
          <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-red-400 bg-red-500/20 px-3 py-1 rounded-full">
                Emergency Hotline
              </span>
              <h3 className="text-2xl font-black text-white">Need On-Road Emergency Assistance?</h3>
              <p className="text-xs text-slate-300 font-medium max-w-lg">
                Press the SOS button in case of accident, vehicle breakdown, or safety concerns on shift.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSosTrigger}
              className="rounded-2xl bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-xs font-black shadow-2xl transition hover:scale-105 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle size={18} />
              Trigger Immediate SOS Alert
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Rider Toll-Free Helpline</h4>
              <p className="text-xs text-slate-500 font-bold font-mono">1800-SAATH-RIDER (1800-72284-74337)</p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">WhatsApp Rider Support Desk</h4>
              <p className="text-xs text-slate-500 font-bold font-mono">+91 91288 42027 (24/7 Live Chat)</p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <LifeBuoy size={24} />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Insurance Claim Desk</h4>
              <p className="text-xs text-slate-500 font-bold">On-shift accidental coverage claim desk</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. FAQs */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={20} className="text-amber-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/40">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left text-xs font-black text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Create Ticket (With delivery issue categories) */}
      {activeSubTab === 'create' && (
        <form onSubmit={handleCreateTicketSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 max-w-2xl">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Plus size={20} className="text-amber-500" /> Raise New Delivery Support Ticket
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Report on-shift issues directly to SaathApp Dispatch &amp; Operations.
          </p>

          <div className="space-y-3 text-xs font-bold">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">Issue Category (PDF Required)</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {ISSUE_CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">Related Order ID (Optional)</label>
              <input
                type="text"
                value={ticketForm.orderId}
                onChange={(e) => setTicketForm({ ...ticketForm, orderId: e.target.value })}
                placeholder="e.g. DEL-98420"
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                placeholder="Brief summary of the issue..."
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
              <textarea
                required
                rows={4}
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                placeholder="Describe what happened, store name, customer issue, or error code..."
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Send size={16} /> Submit Support Ticket
            </button>
          </div>
        </form>
      )}

      {/* 4. My Tickets */}
      {activeSubTab === 'tickets' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock size={20} className="text-amber-500" /> My Submitted Support Tickets
          </h2>

          <div className="space-y-3">
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-black text-amber-500">{ticket.id}</span>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${ticket.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                    {ticket.status}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">{ticket.subject}</h3>
                <div className="text-xs text-slate-500 flex flex-wrap gap-4 font-semibold">
                  <span>Category: <strong>{ticket.category}</strong></span>
                  <span>Order: <strong>{ticket.orderId}</strong></span>
                  <span>Date: <strong>{ticket.createdDate}</strong></span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <strong>Desk Update: </strong> {ticket.response}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Contact Support */}
      {activeSubTab === 'contact' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 max-w-xl">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Phone size={20} className="text-amber-500" /> Direct Contact Channels
          </h2>

          <div className="space-y-4 text-xs font-bold">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-amber-500 font-black uppercase text-[10px]">Patna Hub Command Desk</span>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">+91 98350 11223</h3>
              <p className="text-slate-500 text-[11px]">Direct radio desk for shift dispatchers in Patna Central.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-emerald-500 font-black uppercase text-[10px]">WhatsApp Emergency Dispatch</span>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">+91 91288 42027</h3>
              <p className="text-slate-500 text-[11px]">Send live location and photos during road incidents.</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Rider Resources / Training (Moved from standalone module to Support sub-section as per PDF Section 3.9) */}
      {activeSubTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-3">
            <span className="text-xs font-black uppercase text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">
              Support → Rider Resources / Training
            </span>
            <h2 className="text-2xl font-black">Rider Safety, Delivery Guidelines &amp; Academy</h2>
            <p className="text-xs text-slate-300 font-medium max-w-xl">
              Access delivery guidelines, safety training videos, equipment store, and rider certification tests.
            </p>
          </div>

          {/* Sub-section Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
              <BookOpen size={22} className="text-amber-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm">Delivery Guidelines</h3>
              <p className="text-slate-500 text-[11px]">Best practices for fragile item handling, cold chain &amp; customer politeness.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
              <ShieldCheck size={22} className="text-emerald-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm">Safety Training</h3>
              <p className="text-slate-500 text-[11px]">Two-wheeler road safety, helmet rules, rain protocol &amp; defensive driving.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
              <Video size={22} className="text-blue-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm">Video Courses</h3>
              <p className="text-slate-500 text-[11px]">5-minute video tutorials on using rider app features &amp; COD collection.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
              <Award size={22} className="text-purple-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm">Certificates</h3>
              <p className="text-slate-500 text-[11px]">Gold Fleet Captain certification badge &amp; performance rewards.</p>
            </div>
          </div>

          {/* Embedded Optional Equipment Store Section */}
          <DeliveryEquipmentStoreSection onStartRegistration={() => {}} />
        </div>
      )}
    </div>
  );
}
