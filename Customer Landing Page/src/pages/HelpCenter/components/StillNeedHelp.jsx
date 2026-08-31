import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ArrowRight,
  ArrowUp,
  PhoneCall,
  Mail,
  MessageCircle,
} from "lucide-react";

function StillNeedHelp() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-[80px] pb-[100px] bg-[#F8FAFC] border-t border-[#EEF2F7] relative">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            24/7 ASSISTANCE
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            Still Need Help?
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Couldn't find the answer you were looking for? Our support team is here for you 24/7.
          </p>
        </div>

        {/* 2-Column Desktop Layout (White Cards with Soft Accents) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
          
          {/* Left Card ("Need Personal Assistance?") */}
          <div className="rounded-[20px] bg-surface border border-[#EEF2F7] p-[28px] shadow-[0_4px_18px_rgba(15,23,42,.05)] hover:shadow-[0_14px_36px_rgba(15,23,42,.1)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-[40px] h-[40px] rounded-full bg-[#ECFDF3] text-[#16A34A] border border-[#A7F3D0]/60 flex items-center justify-center flex-shrink-0 mb-[18px]">
                <HelpCircle size={18} strokeWidth={1.8} />
              </div>

              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] mb-3 leading-snug">
                Need Personal Assistance?
              </h3>

              <p className="text-[17px] text-[#64748B] font-normal leading-[1.8] mb-8 max-w-lg">
                Connect directly with our experienced support representatives and get instant solutions tailored to your issue.
              </p>
            </div>

            <div>
              <button
                onClick={scrollToContact}
                className="duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none h-[54px] px-8 rounded-[14px] bg-[#16A34A] text-white text-[16px] font-[600] shadow-[0_4px_14px_rgba(22,163,74,.25)] hover:bg-[#15803D] hover:shadow-[0_6px_20px_rgba(22,163,74,.35)] hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Start Live Assistance</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column (Individual Contact Cards) */}
          <div className="space-y-5">
            {[
              {
                icon: <PhoneCall size={18} strokeWidth={1.8} />,
                title: "Direct Phone Call",
                subtitle: "Helpline: +91 91288 42027",
                colorClass: "bg-[#8B5CF6]/[0.08] text-[#8B5CF6] border border-[#8B5CF6]/[0.15]",
                action: () => window.location.href = "tel:+919128842027",
              },
              {
                icon: <Mail size={18} strokeWidth={1.8} />,
                title: "Email Support",
                subtitle: "support@saathapp.in",
                colorClass: "bg-[#3B82F6]/[0.08] text-[#3B82F6] border border-[#3B82F6]/[0.15]",
                action: () => window.location.href = "mailto:support@saathapp.in",
              },
              {
                icon: <MessageCircle size={18} strokeWidth={1.8} />,
                title: "WhatsApp Support",
                subtitle: "Fastest response time",
                colorClass: "bg-[#0D9488]/[0.08] text-[#0D9488] border border-[#0D9488]/[0.15]",
                action: () => window.open("https://wa.me/919128842027", "_blank"),
              },
            ].map((item) => (
              <div
                key={item.title}
                onClick={item.action}
                className="hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] 
                  group
                  rounded-[16px]
                  bg-surface
                  border border-[#E2E8F0]
                  p-6
                  shadow-[0_6px_20px_rgba(15,23,42,.04)]
                  hover:shadow-[0_14px_30px_rgba(15,23,42,.1)]
                  hover:border-[#16A34A]
                  transition-all duration-300
                  flex items-center justify-between
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-4">
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-250 ease-out group-hover:scale-[1.03] ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[17px] font-[600] text-[#0F172A] group-hover:text-[#16A34A] transition-colors">{item.title}</h4>
                    <p className="text-[14px] font-normal text-[#64748B]">{item.subtitle}</p>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-page flex items-center justify-center text-slate-400 group-hover:bg-[#ECFDF5] group-hover:text-[#16A34A] transition-colors">
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Floating Action Button (FAB) Back-to-Top (Fixed Bottom-Right Corner) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to Top"
            tabIndex={0}
            className="
              fixed bottom-6 right-6 z-[99999]
              w-[42px] h-[42px]
              rounded-full
              bg-[#16A34A]
              text-white
              shadow-[0_4px_14px_rgba(22,163,74,.4)]
              hover:bg-[#15803D]
              hover:shadow-[0_6px_20px_rgba(22,163,74,.5)]
              hover:-translate-y-0.5
              focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30
              active:translate-y-0
              transition-all duration-200
              flex items-center justify-center
              group relative
            "
          >
            <ArrowUp size={18} />
            <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[6px] bg-[#0F172A] text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

export default StillNeedHelp;
