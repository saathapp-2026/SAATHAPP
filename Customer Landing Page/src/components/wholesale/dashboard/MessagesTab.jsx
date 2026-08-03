import React, { useState } from 'react';
import { MessageSquare, Send, Search, CheckCheck, Paperclip } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function MessagesTab() {
  const { addToast } = useWholesale();
  const [activeThread, setActiveThread] = useState(0);
  const [inputMsg, setInputMsg] = useState('');

  const threads = [
    {
      buyer: 'Ramesh Supermarket',
      city: 'Delhi',
      unread: true,
      lastMsg: 'Can you dispatch 45 cases of FMCG by tomorrow 10 AM?',
      messages: [
        { sender: 'buyer', text: 'Hello, we placed ORD-9842 earlier.' },
        { sender: 'you', text: 'Received! Order is packed and ready at Delhi NCR Hub.' },
        { sender: 'buyer', text: 'Can you dispatch 45 cases of FMCG by tomorrow 10 AM?' },
      ],
    },
    {
      buyer: 'Shree Traders',
      city: 'Gurgaon',
      unread: false,
      lastMsg: 'Thank you for the volume discount on Tata Salt!',
      messages: [
        { sender: 'buyer', text: 'Regarding ORD-9841, we accepted the quote.' },
        { sender: 'you', text: 'Great, dispatching via 3PL logistics today.' },
        { sender: 'buyer', text: 'Thank you for the volume discount on Tata Salt!' },
      ],
    },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      threads[activeThread].messages.push({ sender: 'you', text: inputMsg });
      setInputMsg('');
      addToast('Message sent to buyer inbox', 'success');
    }
  };

  return (
    <div className="h-[600px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* Threads List */}
      <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Buyer Conversations</h3>
          <p className="text-xs text-slate-500">Real-time B2B trade messages</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {threads.map((t, idx) => (
            <div
              key={idx}
              onClick={() => setActiveThread(idx)}
              className={`p-4 cursor-pointer transition ${
                activeThread === idx
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-l-4 border-emerald-500'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{t.buyer}</h4>
                {t.unread && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{t.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {threads[activeThread].buyer}
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Verified B2B Buyer ({threads[activeThread].city})
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {threads[activeThread].messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-3 text-xs font-medium leading-relaxed ${
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

        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-200">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type your message or price quote..."
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
  );
}
