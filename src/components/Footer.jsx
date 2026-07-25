import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle 
} from 'lucide-react';
import SaathAppLogo from '../assets/saathapp-logo.jpeg';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment: Newsletter & Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800 items-center">
          
          {/* Logo Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="h-12 w-48">
              <img 
                src={SaathAppLogo} 
                alt="SaathApp Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-medium leading-relaxed">
              India's premier Hyperlocal Super App combining local groceries, construction hardware, seeds and agricultural supplies, and on-demand professional technicians into a single unified marketplace.
            </p>
          </div>

          {/* Newsletter Input Form */}
          <div className="lg:col-span-7 space-y-3.5 lg:text-right w-full">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Subscribe to our local deals newsletter
            </h4>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row lg:justify-end gap-2.5">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4.5 rounded-btn bg-slate-800 border border-slate-750 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm w-full max-w-md"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-btn bg-primary hover:bg-primary-dark text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Segment: Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b border-slate-800">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Company</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link
                  to="/about"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Business</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Become Seller</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become Service Professional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become Delivery Partner</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertise with Us</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Support</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service Warranty</a></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Legal</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Policy</a></li>
              <li><Link to="/delivery-partner-agreement" className="hover:text-white transition-colors">Delivery Partner Agreement</Link></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Trust</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Verified Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Secure Online Payments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Protected</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>

          {/* Col 6 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4.5">Contact Us</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>Bhatahar, Tharthari<br />Nalanda, Bihar – 801307<br />India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+91 9128842027</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <span>support@saathapp.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Segment: Trust seals, Socials, Copyright */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 text-xs">
          
          {/* Left copyright */}
          <div>
            <p className="font-semibold text-slate-500">
              © {new Date().getFullYear()} SAATHAPPNOVA PRIVATE LIMITED. All Rights Reserved.
            </p>
          </div>

          {/* Right Socials & Certs */}
          <div className="flex flex-col items-start md:items-end gap-3.5">
            {/* Social icons (Inline SVGs) */}
            <div className="flex gap-3">
              {/* Instagram */}
              <a href="https://instagram.com/saathapp.tech" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400 hover:text-white" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="https://x.com/saathappT" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400 hover:text-white" title="X (Twitter)">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/saathapp-tech" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400 hover:text-white" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@saathappofficial" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400 hover:text-white" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Certs list */}
            <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800 py-1.5 px-3 rounded-btn text-[10px] font-bold text-slate-500">
              <ShieldCheck size={14} className="text-green-600" />
              <span>Startup India Recognised & ISO 9001 Audited</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
