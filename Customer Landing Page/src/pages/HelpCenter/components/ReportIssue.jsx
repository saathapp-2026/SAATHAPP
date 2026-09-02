import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Package,
  CreditCard,
  User,
  ShieldAlert,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";

const issues = [
  {
    icon: Package,
    title: "Order Issues",
    desc: "Order not delivered, missing item or damaged package.",
    colorClass: "bg-[#F97316]/[0.08] text-[#F97316] border border-[#F97316]/[0.15]",
  },
  {
    icon: CreditCard,
    title: "Payment Problems",
    desc: "Money deducted, payment failed or refund pending.",
    colorClass: "bg-[#EF4444]/[0.08] text-[#EF4444] border border-[#EF4444]/[0.15]",
  },
  {
    icon: User,
    title: "Account Issues",
    desc: "Unable to login, OTP verification or profile settings.",
    colorClass: "bg-[#8B5CF6]/[0.08] text-[#8B5CF6] border border-[#8B5CF6]/[0.15]",
  },
  {
    icon: ShieldAlert,
    title: "Security Report",
    desc: "Report suspicious activity or account safety concerns.",
    colorClass: "bg-[#DC2626]/[0.08] text-[#DC2626] border border-[#DC2626]/[0.15]",
  },
];

function ReportIssue() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ticketData, setTicketData] = useState({ name: "", email: "", orderId: "", details: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSubmitted(true);
      setGeneratedTicketId(`SAATH-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  return (
    <section id="report" className="py-[80px] bg-surface border-t border-[#EEF2F7]">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            PRIORITY TICKETING
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            Facing a Problem?
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Submit a support ticket for express investigation and priority handling.
          </p>
        </div>

        {/* 4-Column Grid on Desktop (gap-[32px]) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {issues.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedCategory(item.title)}
                className="
                  group cursor-pointer
                  bg-surface
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
                <div>
                  {/* Soft Pastel Circle Icon Badge (40x40px, 18px icon, strokeWidth 1.8) */}
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0 mb-[18px] transition-transform duration-250 ease-out group-hover:scale-[1.03] ${item.colorClass}`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  {/* Card Title (20px, Bold 700, mb-[14px] = 14px gap to description) */}
                  <h3 className="text-[20px] font-[700] text-[#0F172A] mb-[14px] leading-[1.25]">
                    {item.title}
                  </h3>

                  {/* Description (16px, Regular 400, leading-[1.7], mb-[22px] = 22px gap to CTA) */}
                  <p className="text-[16px] font-[400] text-[#64748B] leading-[1.7] mb-[22px]">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-[600] text-[#16A34A] group-hover:gap-2.5 transition-all">
                  <span>Report Issue</span>
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Support Ticket CTA Banner (White card with 6px green accent border) */}
        <div className="mt-16 sm:mt-20 rounded-[20px] bg-surface border border-[#EEF2F7] border-l-[6px] border-l-[#16A34A] p-8 sm:p-[32px] shadow-[0_4px_18px_rgba(15,23,42,.05)] hover:shadow-[0_14px_36px_rgba(15,23,42,.1)] transition-all flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-[40px] h-[40px] rounded-full bg-[#ECFDF3] text-[#16A34A] border border-[#A7F3D0]/60 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
                Need Urgent Resolution?
              </h3>
              <p className="mt-1 text-[17px] text-[#64748B] max-w-xl font-normal leading-[1.8]">
                Our dedicated support executive team is standing by to resolve order and payment issues.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory("General Urgent Query")}
            className="h-[54px] px-8 rounded-[14px] bg-[#16A34A] text-white text-[16px] font-[600] shadow-[0_4px_14px_rgba(22,163,74,.25)] hover:bg-[#15803D] hover:shadow-[0_6px_20px_rgba(22,163,74,.35)] hover:-translate-y-0.5 transition-all flex-shrink-0"
          >
            Raise Support Ticket
          </button>
        </div>

      </div>

      {/* Ticket Submission Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="
                relative w-full max-w-xl
                max-h-[90vh] overflow-y-auto
                rounded-[20px] border border-[#E2E8F0]
                bg-surface p-8 shadow-2xl
              "
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setTicketSubmitted(false);
                }}
                className="absolute right-6 top-6 rounded-full p-2 text-[#94A3B8] hover:bg-page hover:text-[#0F172A] transition-colors"
              >
                <X size={20} />
              </button>

              {!ticketSubmitted ? (
                <>
                  <div className="flex items-center gap-3 text-[#16A34A] font-semibold text-[15px] mb-2">
                    <Send size={20} />
                    <span>Submit Priority Support Ticket</span>
                  </div>

                  <h3 className="text-[24px] font-bold text-[#0F172A] mb-1">
                    {selectedCategory}
                  </h3>

                  <p className="text-[15px] text-[#64748B] mb-6">
                    Fill in your details below and our team will get back to you within 2 hours.
                  </p>

                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-medium text-[#0F172A] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ticketData.name}
                        onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full h-[48px] rounded-[12px] border border-[#E2E8F0] px-4 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-medium text-[#0F172A] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={ticketData.email}
                        onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full h-[48px] rounded-[12px] border border-[#E2E8F0] px-4 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-medium text-[#0F172A] mb-1.5">
                        Order / Transaction ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={ticketData.orderId}
                        onChange={(e) => setTicketData({ ...ticketData, orderId: e.target.value })}
                        placeholder="e.g. STH-98742"
                        className="w-full h-[48px] rounded-[12px] border border-[#E2E8F0] px-4 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-medium text-[#0F172A] mb-1.5">
                        Describe Your Issue *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={ticketData.details}
                        onChange={(e) => setTicketData({ ...ticketData, details: e.target.value })}
                        placeholder="Please provide details about what happened..."
                        className="w-full rounded-[12px] border border-[#E2E8F0] p-4 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="duration-200 active:scale-[0.98] disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none 
                        w-full h-[52px]
                        rounded-[14px]
                        bg-[#16A34A]
                        text-white text-[16px] font-[600]
                        shadow-md hover:bg-[#15803D]
                        transition-all
                        flex items-center justify-center gap-2
                        disabled:opacity-60
                      "
                    >
                      {isSubmitting ? (
                        <span>Submitting Ticket...</span>
                      ) : (
                        <>
                          <span>Submit Ticket Now</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#ECFDF3] text-[#16A34A] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="text-[26px] font-bold text-[#0F172A] mb-2">
                    Ticket Received!
                  </h3>

                  <p className="text-[16px] text-[#64748B] mb-4">
                    Your support ticket <strong className="text-[#16A34A]">{generatedTicketId}</strong> has been created successfully.
                  </p>

                  <div className="p-4 rounded-[12px] bg-[#ECFDF3]/40 border border-[#ECFDF3] text-left text-[14px] text-[#0F172A] mb-6">
                    <p><strong>Category:</strong> {selectedCategory}</p>
                    <p><strong>Name:</strong> {ticketData.name}</p>
                    <p><strong>Email:</strong> {ticketData.email}</p>
                    {ticketData.orderId && <p><strong>Order ID:</strong> {ticketData.orderId}</p>}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setTicketSubmitted(false);
                    }}
                    className="h-[52px] px-8 rounded-[14px] bg-[#16A34A] font-[600] text-white shadow-sm hover:bg-[#15803D] transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ReportIssue;
