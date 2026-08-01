import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import logo from "../assets/logo.png";

function Footer() {
  const scrollToSection = (href) => {
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800">
      <div className="saas-container py-[100px]">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div>
            <img
              src={logo}
              alt="SAATH"
              className="h-10 sm:h-12 w-auto object-contain mb-5"
            />

            <p className="text-[15px] font-normal text-slate-400 leading-[1.65] mb-6">
              SAATH is dedicated to providing swift, transparent, and hassle-free customer support for every order and payment.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, url: "https://facebook.com" },
                { icon: FaInstagram, url: "https://instagram.com" },
                { icon: FaLinkedinIn, url: "https://linkedin.com" },
                { icon: FaXTwitter, url: "https://x.com" }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      w-9 h-9 rounded-full bg-slate-800
                      flex items-center justify-center
                      text-slate-300
                      hover:bg-[#16A34A] hover:text-white
                      transition-colors duration-200
                    "
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-[18px] font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-[15px] font-normal">
              {[
                { label: "Help Center", href: "#hero" },
                { label: "Categories", href: "#categories" },
                { label: "Popular Articles", href: "#articles" },
                { label: "Report an Issue", href: "#report" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className="text-slate-400 hover:text-[#16A34A] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-[18px] font-semibold text-white mb-5">
              Support & FAQs
            </h3>

            <ul className="space-y-3 text-[15px] font-normal">
              {[
                { label: "Track Your Order", href: "#faq" },
                { label: "Refund Policy", href: "#faq" },
                { label: "Order Cancellation", href: "#faq" },
                { label: "Contact Support", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className="text-slate-400 hover:text-[#16A34A] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[18px] font-semibold text-white mb-5">
              Contact Info
            </h3>

            <div className="space-y-3 text-[15px] font-normal">
              <a href="tel:+919128842027" className="flex items-center gap-3 text-slate-400 hover:text-[#16A34A] transition-colors">
                <Phone size={16} className="text-[#16A34A]" />
                <span>+91 91288 42027</span>
              </a>
              <a href="mailto:support@saathapp.in" className="flex items-center gap-3 text-slate-400 hover:text-[#00A651] transition-colors">
                <Mail size={16} className="text-[#00A651]" />
                <span>support@saathapp.in</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={16} className="text-[#00A651]" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[14px] font-normal text-slate-400">
            © 2026 SAATH. All Rights Reserved. Built with precision for exceptional user care.
          </p>

          <button
            onClick={() => scrollToSection("#top")}
            className="
              flex items-center gap-2
              h-[40px] px-5
              rounded-[10px]
              bg-[#00A651] text-white
              text-[14px] font-medium
              hover:bg-[#008f44] transition-all
            "
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
