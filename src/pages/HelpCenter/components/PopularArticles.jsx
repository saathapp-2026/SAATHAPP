import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  X,
  CheckCircle2,
  FileText,
} from "lucide-react";

const articles = [
  {
    title: "How to Track Your Order",
    desc: "Learn how to track your order in real time from dispatch to doorstep delivery.",
    read: "2 min read",
    fullContent: [
      "Open the SAATH App and navigate to the 'My Orders' tab in your profile menu.",
      "Select the active order you wish to track.",
      "Click on 'Track Package' to see real-time updates from our delivery partner including live GPS location.",
      "You will also receive SMS and WhatsApp notifications with direct tracking links."
    ],
  },
  {
    title: "How Refunds Work",
    desc: "Understand refund timelines, eligibility criteria and direct bank reversal process.",
    read: "3 min read",
    fullContent: [
      "Refunds are initiated immediately after returned items pass quality inspection.",
      "UPI Payments: Credited back to your bank account within 24 to 48 hours.",
      "Credit/Debit Cards: Processed in 3-5 business days depending on your bank.",
      "SAATH Wallet Cash: Instant reversal within 15 minutes."
    ],
  },
  {
    title: "Cancel an Order",
    desc: "Cancel your order before shipment and understand cancellation policies.",
    read: "2 min read",
    fullContent: [
      "Orders can be cancelled free of charge before they are packed at our fulfillment warehouse.",
      "Go to My Orders -> Select Order -> Click 'Cancel Order'.",
      "Choose a cancellation reason from the list.",
      "If paid online, your refund will be processed automatically."
    ],
  },
  {
    title: "Payment Failed?",
    desc: "Troubleshoot payment failures and complete your order successfully.",
    read: "4 min read",
    fullContent: [
      "Check if your UPI app or bank server is undergoing maintenance.",
      "If money was deducted, your bank will automatically reverse it within 24-48 business hours.",
      "Try an alternative payment method like Credit Card, NetBanking, or Cash on Delivery.",
      "Reach out to our 24/7 support if money isn't credited back within 3 business days."
    ],
  },
  {
    title: "Update Delivery Address",
    desc: "Change your shipping address before your package is dispatched.",
    read: "3 min read",
    fullContent: [
      "Address changes are allowed within 1 hour of placing an order.",
      "Open Order Details -> Edit Address -> Enter new pincode and full address.",
      "If package is already dispatched, contact delivery partner via live chat.",
      "Ensure phone number is up to date so courier person can contact you."
    ],
  },
  {
    title: "Contact Customer Support",
    desc: "Reach our customer care team through live chat, email or phone call.",
    read: "1 min read",
    fullContent: [
      "Live Chat: Available 24/7 inside the SAATH mobile app.",
      "Phone Helpline: +91 91288 42027 (Operational 8 AM - 11 PM IST).",
      "Email: support@saathapp.in (Average reply time: under 2 hours).",
      "WhatsApp Support: Direct instant messaging with active support agents."
    ],
  },
];

function PopularArticles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="articles" className="py-[100px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            POPULAR GUIDES
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            Most Read Help Articles
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Quick step-by-step guides for the most common user queries.
          </p>
        </div>

        {/* Responsive 3x2 Grid (3 columns on desktop, 2 on tablet, 1 on mobile, gap-[32px]) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedArticle(article)}
              className="
                group cursor-pointer
                bg-white
                border border-[#EEF2F7]
                rounded-[20px]
                p-[28px]
                shadow-[0_4px_18px_rgba(15,23,42,.05)]
                transition-all duration-250 ease-out
                hover:-translate-y-1
                hover:shadow-[0_14px_36px_rgba(15,23,42,.1)]
                hover:border-[#16A34A]
                flex flex-col justify-between
                h-full
              "
            >
              {/* Flex-1 Upper Content Container */}
              <div className="flex-1 flex flex-col">
                {/* Header Badge Row (Icon & Read Time Badge, mb-[18px] = 18px gap to title) */}
                <div className="flex items-center justify-between mb-[18px]">
                  {/* Soft Green Circle Icon Badge (40x40px, 18px icon) */}
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ECFDF3] text-[#16A34A] border border-[#A7F3D0]/60 flex items-center justify-center flex-shrink-0 transition-transform duration-250 ease-out group-hover:scale-[1.03]">
                    <Clock3 size={18} strokeWidth={1.8} />
                  </div>

                  {/* Read Time Badge (Top-right corner, soft gray pill, 13px font) */}
                  <span className="rounded-full bg-[#F1F5F9] border border-[#E2E8F0] px-3.5 py-1 text-[13px] font-[500] text-[#64748B]">
                    {article.read}
                  </span>
                </div>

                {/* Card Title (20px, Bold 700, mb-[14px] = 14px gap to description) */}
                <h3 className="text-[20px] font-[700] text-[#0F172A] mb-[14px] group-hover:text-[#16A34A] transition-colors">
                  {article.title}
                </h3>

                {/* Description (16px, Regular 400, leading-[1.7], mb-[22px] = 22px gap to button) */}
                <p className="text-[16px] font-[400] text-[#64748B] leading-[1.7] mb-[22px] flex-1">
                  {article.desc}
                </p>
              </div>

              {/* Read Link Pushed to Card Bottom */}
              <div className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-[600] text-[#16A34A] group-hover:gap-2.5 transition-all">
                <span>Read Full Article</span>
                <ArrowRight size={15} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="
                relative w-full max-w-2xl
                max-h-[85vh] overflow-y-auto
                rounded-[20px] border border-[#E2E8F0]
                bg-white p-8 shadow-2xl
              "
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute right-6 top-6 rounded-full p-2 text-[#94A3B8] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-[#16A34A] font-medium text-[14px] mb-2">
                <FileText size={18} />
                <span>SAATH Help Guide</span>
                <span>•</span>
                <span className="text-[#64748B]">{selectedArticle.read}</span>
              </div>

              <h2 className="text-[28px] font-bold text-[#0F172A] mb-3 leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-[17px] font-normal text-[#64748B] border-b border-[#E2E8F0] pb-4 mb-6 leading-[1.7]">
                {selectedArticle.desc}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#94A3B8]">Step by Step Instructions</h4>
                {selectedArticle.fullContent.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-[12px] bg-[#ECFDF3]/40 border border-[#ECFDF3]">
                    <CheckCircle2 size={18} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] font-normal text-[#0F172A] leading-[1.6]">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="h-[52px] px-6 rounded-[14px] bg-[#16A34A] font-[600] text-white shadow-sm hover:bg-[#15803D] transition-all"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PopularArticles;
