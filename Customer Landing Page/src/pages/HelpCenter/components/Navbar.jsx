import { useState } from "react";
import { Headphones, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Help Center", to: "/help-support" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/customer-support" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-[9999] h-[80px] w-full bg-surface/90 backdrop-blur-[20px] border-b border-[#E2E8F0] shadow-sm transition-all duration-300">
      <div className="saas-container h-full flex items-center justify-between">
        
        {/* Logo Aligned Left */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <img
            src={logo}
            alt="SAATH"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Centered */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="
                relative
                text-[16px]
                font-medium
                text-[#0F172A]
                transition-colors
                duration-200
                hover:text-[#16A34A]
                py-2
                group
              "
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#16A34A] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Support Button Aligned Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/customer-support"
            className="
              hidden sm:inline-flex
              items-center justify-center gap-2
              h-[52px]
              px-6
              rounded-[14px]
              bg-[#16A34A]
              text-white
              text-[16px]
              font-[600]
              shadow-[0_4px_14px_rgba(22,163,74,.25)]
              hover:bg-[#15803D]
              hover:shadow-[0_6px_20px_rgba(22,163,74,.35)]
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all
              duration-300
            "
          >
            <Headphones size={18} />
            <span>Support</span>
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="
              flex lg:hidden
              items-center justify-center
              h-[44px] w-[44px]
              rounded-[10px]
              bg-page
              text-[#0F172A]
              hover:bg-slate-200
              transition-colors
            "
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-b border-[#E2E8F0] bg-surface/95 backdrop-blur-[20px] px-6 py-6 shadow-xl"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex items-center justify-between
                    rounded-[10px]
                    px-4 py-3
                    text-[16px] font-medium
                    text-[#0F172A]
                    hover:bg-[#16A34A]/5 hover:text-[#16A34A]
                    transition-all
                  "
                >
                  <span>{item.label}</span>
                  <span className="text-[#16A34A] font-bold">→</span>
                </Link>
              ))}
              <Link
            to="/customer-support"
                className="
                  mt-2 flex items-center justify-center gap-2
                  h-[52px] w-full
                  rounded-[14px]
                  bg-[#16A34A]
                  text-white text-[16px] font-[600]
                  shadow-sm hover:bg-[#15803D]
                  transition-all
                "
              >
                <Headphones size={20} />
                <span>Contact Customer Support</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
