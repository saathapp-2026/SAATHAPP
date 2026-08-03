import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { wholesaleFaqs } from '../../../data/wholesaleWelcomeData';
import SectionHeading from './SectionHeading';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Clear answers about wholesale partner onboarding, verification, payments, and platform operations."
        />

        <div className="mx-auto max-w-3xl space-y-4">
          {wholesaleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`overflow-hidden rounded-[18px] border bg-white dark:bg-slate-900 transition-shadow duration-300 ${
                  isOpen
                    ? 'border-[#0A8F3D]/40 shadow-premium'
                    : 'border-slate-200/70 dark:border-slate-800/60 shadow-soft hover:border-[#0A8F3D]/20'
                }`}
              >
                {isOpen && (
                  <div aria-hidden="true" className="h-1 bg-gradient-to-r from-[#0A8F3D] to-emerald-400" />
                )}

                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isOpen ? 'bg-[#0A8F3D] text-white' : 'bg-[#0A8F3D]/10 text-[#0A8F3D]'
                        }`}
                      >
                        <HelpCircle size={18} aria-hidden="true" />
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#0A8F3D]/10 text-[#0A8F3D]' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <ChevronDown size={16} aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pl-[4.75rem]">
                        <div className="flex items-start gap-3 rounded-2xl border border-[#0A8F3D]/10 bg-[#0A8F3D]/5 p-4">
                          <MessageSquare size={18} className="mt-0.5 shrink-0 text-[#0A8F3D]" aria-hidden="true" />
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
