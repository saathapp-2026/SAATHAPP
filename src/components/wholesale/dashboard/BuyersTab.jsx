import React, { useState } from 'react';
import { Users, MessageSquare, Star, Search, Send, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function BuyersTab({ onSelectTab }) {
  const { dashboardData, addToast } = useWholesale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyerChat, setSelectedBuyerChat] = useState(null);
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
      addToast('Message sent to buyer!', 'success');
    }
  };

  const filteredBuyers = dashboardData.buyersList.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Buyers & Customer Relations</h2>
          <p className="text-xs text-slate-500">Manage verified B2B buyers, retail stores, bulk dealers, and respond to RFQs.</p>
        </div>
      </div>

      {/* Buyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {buyer.type}
                </span>
                <h3 className="mt-1.5 text-base font-extrabold text-slate-900 dark:text-white">{buyer.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin size={13} /> {buyer.city}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-amber-500 flex items-center justify-end gap-1">
                  <Star size={13} fill="currentColor" /> {buyer.rating}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">{buyer.ordersCount} Total Orders</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white">
                Spent: ₹{buyer.totalSpent.toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={() => setSelectedBuyerChat(buyer)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white transition shadow"
              >
                <MessageSquare size={14} /> Open B2B Chat
              </button>
            </div>
          </div>
        ))}
      </div>

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
