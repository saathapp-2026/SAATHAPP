import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck, MapPin, Phone, Mail, Globe, Gift } from 'lucide-react';
import SaathAppLogo from '../assets/saathapp-logo.png';
import UpiLogo from '../assets/upi.png';
import RuPayLogo from '../assets/rupay.png';
import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import NetBankingLogo from '../assets/netbanking.png';
import CodLogo from '../assets/cod.png';
import ReferralModal from './ReferralModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-footer text-theme-secondary pt-4 pb-8 border-t border-theme-border text-left">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Main Segment: Logo Block (Left) + Links Grid Columns (Right) in Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-4 pb-10 border-b border-theme-border">

          {/* Logo Brand info (Left side) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-4">
              <div className="h-12 w-48">
                <img
                  src={SaathAppLogo}
                  alt="SaathApp Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <p
                className="text-xs sm:text-sm text-theme-secondary max-w-sm font-medium leading-relaxed [text-wrap:balance]"
                style={{ textWrap: 'balance' }}
              >
                India's premier Hyperlocal Super App combining local groceries, construction hardware, seeds and agricultural supplies, and on-demand professional technicians into a single unified marketplace.
              </p>
            </div>

            {/* Social Icons & Certs (Pushed down to align bottom edge with Subscribe box) */}
            <div className="space-y-3 mt-auto pt-4">
              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/saathapp.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-full bg-surface hover:bg-primary hover:text-theme flex items-center justify-center transition-colors text-theme-secondary hover:text-theme"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/saathappT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-full bg-surface hover:bg-primary hover:text-theme flex items-center justify-center transition-colors text-theme-secondary hover:text-theme"
                  title="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/saathapp-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-full bg-surface hover:bg-primary hover:text-theme flex items-center justify-center transition-colors text-theme-secondary hover:text-theme"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@saathappofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-full bg-surface hover:bg-primary hover:text-theme flex items-center justify-center transition-colors text-theme-secondary hover:text-theme"
                  title="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Refer Someone Now Button (Navigates to /refer) */}
              <div className="pt-1 pb-1">
                <Link
                  to="/refer"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <Gift size={15} className="group-hover:rotate-12 transition-transform shrink-0" />
                  <span>Refer Someone Now →</span>
                </Link>
              </div>

              {/* Certs list */}
              <div className="flex items-center gap-2 bg-surface/40 border border-theme-border py-1.5 px-3 rounded-btn text-[10px] font-bold text-theme-secondary w-fit">
                <ShieldCheck size={14} className="text-green-600 shrink-0" />
                <span>Startup India Recognised & ISO 9001 Audited</span>
              </div>
            </div>
          </div>

          {/* Footer columns (Right side) */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch">

            {/* Col 1 */}
            <div>
              <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Company</h4>
              <ul className="space-y-3 text-xs font-semibold">
                <li>
                  <Link
                    to="/about"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-story"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.saathappnova.co.in/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hover:text-theme transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Business</h4>
              <ul className="space-y-3 text-xs font-semibold">
                <li><Link to="/seller" className="hover:text-theme transition-colors">Become Seller</Link></li>
                <li>
                  <Link
                    to="/franchise"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Become a Franchise Partner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wholesale"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Become a Wholesale
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service-professional"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Become Service Professional
                  </Link>
                </li>
                <li>
                  <Link
                    to="/become-delivery-partner"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Become Delivery Partner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/advertise"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-theme transition-colors"
                  >
                    Advertise With Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle Group: Support, Legal, Trust + Newsletter directly below */}
            <div className="col-span-2 md:col-span-3 lg:col-span-3 flex flex-col justify-between h-full space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                {/* Col 3: Support */}
                <div>
                  <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Support</h4>
                  <ul className="space-y-3 text-xs font-semibold">
                    <li>
                      <Link
                        to="/help-support"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Help & Support
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.saathappnova.co.in/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hover:text-theme transition-colors"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <Link
                        to="/service-warranty"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Service Warranty
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/refer"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"
                      >
                        <span>Referral Program</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/faq"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 4: Legal */}
                <div>
                  <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Legal</h4>
                  <ul className="space-y-3 text-xs font-semibold">
                    <li>
                      <Link
                        to="/privacy-policy"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms-of-service"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/seller-policy"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Seller Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/delivery-partner-agreement"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Delivery Partner Agreement
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/refund-cancellation-policy"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Refund & Cancellation Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 5: Trust */}
                <div>
                  <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Trust</h4>
                  <ul className="space-y-3 text-xs font-semibold">
                    <li>
                      <Link
                        to="/verified-sellers"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Verified Sellers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/secure-online-payments"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Secure Online Payments
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy-protected"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Privacy Protected
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customer-support"
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="hover:text-theme transition-colors"
                      >
                        Customer Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter Box (Bottom edge aligned with Contact Us column) */}
              <div className="space-y-3.5 mt-auto pt-4">
                <h4 className="text-sm font-extrabold text-theme uppercase tracking-wider">
                  Subscribe to our local deals newsletter
                </h4>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-4.5 rounded-btn bg-surface border border-theme-border text-theme placeholder-theme-secondary focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm w-full"
                  />
                  <button
                    type="submit"
                    className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none h-11 px-6 rounded-btn bg-primary hover:bg-primary-dark text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                    <Send size={12} />
                  </button>
                </form>
              </div>
            </div>

            {/* Col 6 */}
            <div>
              <h4 className="text-xs font-black text-theme uppercase tracking-wider mb-4.5">Contact Us</h4>
              <ul className="space-y-4 text-xs font-semibold text-theme-secondary text-left">
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-primary shrink-0 mt-1" />
                  <div>
                    <span className="block text-theme font-bold mb-0.5">Company Regd. Office:</span>
                    <span className="leading-relaxed">
                      Bhatahar, Tharthari,<br />
                      Nalanda, Bihar – 801307<br />
                      India
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-theme font-bold mb-0.5">Help & Support:</span>
                    <a href="mailto:support@saathapp.in" className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hover:text-theme transition-colors break-all">support@saathapp.in</a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-theme font-bold mb-0.5">Company:</span>
                    <a href="mailto:company@saathapp.in" className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hover:text-theme transition-colors break-all">company@saathapp.in</a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-theme font-bold mb-0.5">Contact:</span>
                    <span>+91 9128842027</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-theme font-bold mb-0.5">Official Website:</span>
                    <a
                      href="https://www.saathappnova.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hover:text-theme transition-colors break-all"
                    >
                      www.saathappnova.co.in
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>


        {/* Copyright & Payment Methods Combined Strip */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-semibold text-theme-secondary text-left">
            © 2026 SAATHAPPNOVA PRIVATE LIMITED. All Rights Reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="text-[10px] sm:text-xs font-extrabold text-theme-secondary uppercase tracking-wider">
              Supported Payment Methods
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-bold text-theme-secondary justify-center items-center">
              <img src={UpiLogo} alt="UPI" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
              <img src={RuPayLogo} alt="RuPay" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
              <img src={VisaLogo} alt="Visa" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
              <img src={MastercardLogo} alt="Mastercard" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
              <img src={NetBankingLogo} alt="Net Banking" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
              <img src={CodLogo} alt="Cash on Delivery" className="h-6 w-10 object-contain rounded bg-white border border-theme-border/30" />
            </div>
          </div>
        </div>

      </div>

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />
    </footer>
  );
}
