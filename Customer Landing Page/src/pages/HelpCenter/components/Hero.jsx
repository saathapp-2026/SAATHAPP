import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  CreditCard,
  XCircle,
  Truck,
  User,
  ArrowRight,
} from "lucide-react";

const popularSearches = [
  { title: "Track Order", icon: <Package size={16} /> },
  { title: "Refund Status", icon: <CreditCard size={16} /> },
  { title: "Cancel Order", icon: <XCircle size={16} /> },
  { title: "Payment Failed", icon: <CreditCard size={16} /> },
  { title: "Login Problem", icon: <User size={16} /> },
  { title: "Delivery Delay", icon: <Truck size={16} /> },
];

const sampleHelpTopics = [
  { title: "How to track my live delivery location?", category: "Orders", href: "#faq" },
  { title: "When will my refund process back to bank?", category: "Payments", href: "#faq" },
  { title: "How to cancel an order before dispatch?", category: "Orders", href: "#faq" },
  { title: "Payment deducted but order failed error", category: "Payments", href: "#faq" },
  { title: "Change delivery address for active order", category: "Delivery", href: "#categories" },
  { title: "Reset account password or unlock account", category: "Account", href: "#report" },
];

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredTopics = searchQuery.trim()
    ? sampleHelpTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleQuickSearch = (title) => {
    setSearchQuery(title);
    const element = document.querySelector("#faq");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden py-[100px] bg-[radial-gradient(circle_at_top,#ECFDF5_0%,transparent_45%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]">
      <div className="saas-container flex flex-col items-center text-center">
        
        {/* Top Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#16A34A] text-[13px] font-[600] shadow-sm">
            ⚡ Under 2 Minute Response
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#16A34A] text-[13px] font-[600] shadow-sm">
            🛡️ 99.8% Resolution Rate
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#16A34A] text-[13px] font-[600] shadow-sm">
            🕒 24/7 Customer Support
          </span>
        </motion.div>

        {/* Centered Large Hero Title (72px, Weight 800, Line height 1.05, Letter spacing -0.04em) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[36px] sm:text-[52px] lg:text-[64px] xl:text-[72px] font-[800] text-[#0F172A] leading-[1.05] tracking-[-0.04em] text-center max-w-[1000px]"
        >
          How can we help <span className="text-[#16A34A]">you today?</span>
        </motion.h1>

        {/* Small Descriptive Text (Heading to subtitle: 24px, Subtitle to search: 40px, Max width: 65ch) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-[24px] mb-[40px] max-w-[65ch] text-center text-[17px] font-[400] text-[#64748B] leading-[1.8]"
        >
          Search for orders, refunds, payments, delivery updates, login issues, and more.
        </motion.p>

        {/* Search Bar Container (Height: 64px, Radius: 18px, Soft shadow) */}
        <div className="relative w-full max-w-[760px] mx-auto">
          <div
            className="
              group flex items-center
              h-[64px] w-full
              rounded-[18px]
              border border-[#E2E8F0]
              bg-surface
              px-5
              shadow-[0_8px_30px_rgba(15,23,42,.06)]
              transition-all duration-300
              focus-within:border-[#16A34A]
              focus-within:ring-4 focus-within:ring-[#16A34A]/10
              focus-within:shadow-md
            "
          >
            {/* Larger Search Icon (24px) */}
            <Search size={24} className="text-[#64748B] flex-shrink-0 transition-colors group-focus-within:text-[#16A34A]" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search orders, refunds, payments or anything..."
              className="
                ml-4 flex-1
                bg-transparent
                text-[16px] font-normal text-[#0F172A]
                placeholder:text-[#94A3B8]
                outline-none
              "
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 rounded-full p-1 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
              >
                <XCircle size={20} />
              </button>
            )}
          </div>

          {/* Interactive Search Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute left-0 right-0 top-full z-40 mt-3
                  overflow-hidden rounded-[18px] border border-[#E2E8F0]
                  bg-surface p-3 text-left shadow-xl
                "
              >
                <p className="px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                  Matching Articles ({filteredTopics.length})
                </p>
                {filteredTopics.length > 0 ? (
                  <div className="mt-1 divide-y divide-[#F1F5F9]">
                    {filteredTopics.map((topic, i) => (
                      <a
                        key={i}
                        href={topic.href}
                        onClick={() => setSearchQuery("")}
                        className="
                          flex items-center justify-between
                          px-4 py-3 rounded-[12px]
                          hover:bg-[#ECFDF5] transition-colors
                        "
                      >
                        <div>
                          <p className="text-[15px] font-medium text-[#0F172A]">{topic.title}</p>
                          <span className="text-[13px] font-medium text-[#16A34A]">{topic.category}</span>
                        </div>
                        <ArrowRight size={16} className="text-[#16A34A]" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-[15px] font-normal text-[#64748B]">
                    No articles found for "{searchQuery}". Try keywords like "order", "refund", or "payment".
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular Search Chips (Search & chips: 24px, Gap: 16px) */}
        <div className="mt-[24px]">
          <p className="text-center text-[14px] font-medium text-[#64748B] mb-3">
            Popular Searches
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {popularSearches.map((item) => (
              <button
                key={item.title}
                onClick={() => handleQuickSearch(item.title)}
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-[#E2E8F0]
                  bg-surface
                  px-5 py-2.5
                  text-[14px] font-[500] text-[#0F172A]
                  shadow-sm
                  transition-all duration-300
                  hover:border-[#16A34A]
                  hover:bg-[#ECFDF5]
                  hover:text-[#16A34A]
                  hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                <span className="text-[#16A34A] flex items-center justify-center">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
