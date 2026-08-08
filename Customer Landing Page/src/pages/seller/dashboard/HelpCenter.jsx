import React from 'react';
import { Search, Book, HelpCircle, FileText, ExternalLink, ArrowRight } from 'lucide-react';

export default function HelpCenter() {
  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      desc: 'Learn the basics of setting up your store and adding products.',
      articles: 12
    },
    {
      title: 'Orders & Fulfillment',
      icon: ArrowRight,
      desc: 'Everything about managing orders, packing, and shipping.',
      articles: 24
    },
    {
      title: 'Payments & Fees',
      icon: FileText,
      desc: 'Understand settlements, platform fees, and invoices.',
      articles: 18
    }
  ];

  const faqs = [
    { q: 'How long does bank verification take?', a: 'Bank verification typically takes 24-48 business hours after you submit the correct IFSC and account details.' },
    { q: 'When do I get my settlement?', a: 'Settlements are processed every Tuesday and Friday for all successfully delivered orders in the previous cycle.' },
    { q: 'How do I handle customer returns?', a: 'When a customer requests a return, you will receive a notification. You must approve the pickup within 24 hours.' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-emerald-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">How can we help you today?</h2>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for guides, FAQs, or policies..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">{cat.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{cat.desc}</p>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{cat.articles} Articles</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="text-emerald-500" size={24} />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-4">Important Policies</h3>
            <ul className="space-y-3">
              {[
                'Seller Terms of Service',
                'Prohibited Items Policy',
                'Returns & Refunds Policy',
                'Shipping Guidelines'
              ].map((policy, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
                    <ExternalLink size={14} /> {policy}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-2">Still need help?</h3>
            <p className="text-sm text-slate-500 mb-4">Can't find the answer you're looking for? Create a support ticket.</p>
            <button className="w-full py-2.5 px-4 text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
              Open Support Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
