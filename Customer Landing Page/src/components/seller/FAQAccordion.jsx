import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'What is the Seller Onboarding Fee?',
    a: 'A mandatory one-time fee required to submit your seller application. It covers registration, KYC, verification, and dashboard activation for 2 years.',
  },
  {
    q: 'Does paying the fee guarantee approval?',
    a: 'No. Payment does not guarantee approval. Your account becomes active only after successful verification and approval by our team.',
  },
  {
    q: 'What happens after 2 years?',
    a: 'You can renew your seller onboarding by paying 50% of the applicable onboarding fee to continue selling on SAATHAPP.',
  },
  {
    q: 'Is Monthly Membership required?',
    a: 'No. Monthly Seller Membership is completely optional. You can start selling immediately after approval without purchasing a membership. Membership unlocks premium business tools.',
  },
  {
    q: 'How is commission charged?',
    a: 'Commission (0–8% depending on category) applies only on successful completed orders, separate from both the onboarding fee and membership.',
  },
  {
    q: 'Is the onboarding fee refundable?',
    a: 'The onboarding fee is non-refundable once payment is processed, regardless of approval outcome.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="rounded-2xl bg-surface/5 backdrop-blur border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} className="text-emerald-400" />
        <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="rounded-xl border border-white/10 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/5 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="text-sm font-medium pr-4">{item.q}</span>
              <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }}>
                <ChevronDown size={18} className="text-slate-400 shrink-0" />
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
