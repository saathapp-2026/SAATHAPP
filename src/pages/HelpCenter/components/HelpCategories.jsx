import { motion } from "framer-motion";
import {
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  ShieldCheck,
  Smartphone,
  Settings,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Orders",
    desc: "Track, cancel and manage active orders",
    icon: Package,
    colorClass: "bg-[#ECFDF3] text-[#16A34A] border border-[#A7F3D0]/60",
  },
  {
    title: "Payments",
    desc: "UPI, Cards, NetBanking and Wallet issues",
    icon: CreditCard,
    colorClass: "bg-[#EFF6FF] text-[#3B82F6] border border-[#BFDBFE]/60",
  },
  {
    title: "Delivery",
    desc: "Shipping partners & live delivery updates",
    icon: Truck,
    colorClass: "bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]/60",
  },
  {
    title: "Refunds",
    desc: "Refund status, timelines & bank reversal",
    icon: RotateCcw,
    colorClass: "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]/60",
  },
  {
    title: "Account",
    desc: "Login, password reset & profile settings",
    icon: User,
    colorClass: "bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]/60",
  },
  {
    title: "Security",
    desc: "Privacy, OTP safety & account protection",
    icon: ShieldCheck,
    colorClass: "bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4]/60",
  },
  {
    title: "App Support",
    desc: "Installation, updates & app performance",
    icon: Smartphone,
    colorClass: "bg-[#F5F3FF] text-[#6366F1] border border-[#C7D2FE]/60",
  },
  {
    title: "General Help",
    desc: "Other inquiries, feedback & general info",
    icon: Settings,
    colorClass: "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]",
  },
];

function HelpCategories() {
  const scrollToFaq = () => {
    const el = document.querySelector("#faq");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-[80px] bg-white border-t border-[#EEF2F7]">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            EXPLORE TOPICS
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            Browse by Category
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Find detailed solutions quickly by exploring our primary support categories.
          </p>
        </div>

        {/* 4-Column Grid on Desktop (gap 32px) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                onClick={scrollToFaq}
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
                <div>
                  {/* Soft Pastel Circle Icon Badge (40x40px, 18px icon, strokeWidth 1.8) */}
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0 mb-[18px] transition-transform duration-250 ease-out group-hover:scale-[1.03] ${item.colorClass}`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  {/* Category Card Title (20px, Bold 700, mb-3.5 = 14px gap to description) */}
                  <h3 className="text-[20px] font-[700] text-[#0F172A] mb-[14px] group-hover:text-[#16A34A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description (16px, Regular 400, leading 1.7, mb-[22px] = 22px gap to CTA) */}
                  <p className="text-[16px] font-[400] text-[#64748B] leading-[1.7] mb-[22px]">
                    {item.desc}
                  </p>
                </div>

                {/* Explore Topics Link */}
                <div className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-[600] text-[#16A34A] group-hover:gap-2.5 transition-all">
                  <span>Explore Topics</span>
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HelpCategories;
