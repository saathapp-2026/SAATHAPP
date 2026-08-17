import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Go to 'My Orders' inside the SAATH App and select your active order to view live location, courier partner details, and estimated delivery timeframe.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are credited to your original payment method within 5–7 business days after item inspection. Instant refunds are credited immediately to your SAATH Wallet.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes! You can cancel orders free of cost directly from the app before they are packed at our warehouse.",
  },
  {
    question: "My payment failed but money was deducted from my bank account.",
    answer:
      "Please don't worry. If money was debited for a failed order, your bank automatically initiates a reversal within 24 to 48 business hours.",
  },
  {
    question: "How do I contact SAATH customer support?",
    answer:
      "You can connect with us 24/7 via Live Chat, WhatsApp, Email (support@saathapp.in), or by calling our toll-free hotline (+91 91288 42027).",
  },
  {
    question: "How do I change my delivery address?",
    answer:
      "Address changes can be requested inside the Order Details page before dispatch. If already shipped, contact live chat to request a courier redirect.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="pt-[80px] pb-[100px] bg-white border-t border-[#EEF2F7]">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            INSTANT ANSWERS
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Clear, instant solutions to the questions customers ask the most.
          </p>
        </div>

        {/* FAQ Accordion Items (Radius: 18px, Height: 76px, Gap between items: 16px) */}
        <div className="max-w-[960px] mx-auto w-full space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`
                relative overflow-hidden
                rounded-[18px]
                border
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,.06)]
                transition-all duration-300
                ${
                  open === index
                    ? "border-[#16A34A] shadow-[0_18px_40px_rgba(15,23,42,.12)]"
                    : "border-[#E2E8F0] hover:border-[#16A34A]/40"
                }
              `}
            >
              {open === index && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#16A34A]" />
              )}

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full min-h-[76px] items-center justify-between px-[28px] py-[20px] text-left gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                      ${open === index ? "bg-[#16A34A] text-white" : "bg-[#ECFDF3] text-[#16A34A]"}
                    `}
                  >
                    <HelpCircle size={22} />
                  </div>

                  <span className="text-[18px] sm:text-[20px] font-[600] text-[#0F172A] leading-snug">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300
                    ${open === index ? "rotate-180 text-[#16A34A] bg-[#ECFDF3]" : "text-[#64748B] bg-page"}
                  `}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-[32px] pb-[24px] pt-0 sm:pl-[84px]">
                      <div className="p-5 rounded-[14px] bg-[#ECFDF3]/40 border border-[#ECFDF3] flex items-start gap-3.5">
                        <MessageSquare size={20} className="text-[#16A34A] flex-shrink-0 mt-1" />
                        <p className="max-w-[65ch] text-[17px] font-[400] text-[#64748B] leading-[1.8]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
