import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, MapPin, Star, ShoppingBag, Clock, Heart,
  CreditCard, Sparkles, CheckCircle2, ChevronDown, ChevronRight, HelpCircle,
  TrendingUp, Users, Laptop, UserCheck
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

export default function CustomerPortal({
  cartCount,
  cartItems,
  cartTotal,
  onCartClick,
  darkMode,
  toggleDarkMode,
  user,
  onLogout
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);

  useEffect(() => {
    document.title = 'Become a Customer | SaathApp';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(prev => prev.map((item, idx) => idx === index ? !item : item));
  };

  const features = [
    { title: 'Shop Products', desc: 'Order fresh groceries, hardware, and farm-fresh agriculture items directly from trusted local stores.', icon: ShoppingBag, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Book Services', desc: 'Instantly schedule electricians, plumbers, carpenters, and painters to resolve home repairs.', icon: Sparkles, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Real-time Tracking', desc: 'Monitor your delivery agent or service worker live on the map from dispatch to completion.', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Secure Payments', desc: 'Pay safely using UPI, credit cards, or your unified Saath Wallet with instant receipt logs.', icon: CreditCard, color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Verified Professionals', desc: 'Every service technician is identity-checked and KYC-verified with rating records.', icon: ShieldCheck, color: 'text-teal-500 bg-teal-500/10' },
    { title: 'Local Store Delivery', desc: 'Empower your neighborhood vendors. Hyperlocal delivery reaches your doorstep in minutes.', icon: MapPin, color: 'text-rose-500 bg-rose-500/10' }
  ];

  const steps = [
    { step: '01', title: 'Browse Products & Services', desc: 'Search for what you need—whether it is weekly groceries, construction materials, or an emergency AC fix.' },
    { step: '02', title: 'Place Secure Order', desc: 'Add items or schedule technician slots, apply coupon codes, and pay with your preferred secure method.' },
    { step: '03', title: 'Track Live Progress', desc: 'Watch your order get packed or monitor your technician traveling to your exact location in real-time.' },
    { step: '04', title: 'Receive & Rate', desc: 'Enjoy your delivery or completed service work, and leave a review to rate your partner experience.' }
  ];

  const faqs = [
    { q: 'How does SaathApp ensure service quality?', a: 'All professionals undergo rigorous physical KYC checks, background validation, and rating reviews before onboarding. You can view their rating profile before accepting bookings.' },
    { q: 'Is there a delivery charge for local orders?', a: 'Standard local deliveries from neighborhood stores are completely free above a nominal basket size. Live fees are shown transparently at checkout.' },
    { q: 'Can I reschedule a service booking?', a: 'Yes! You can reschedule or cancel scheduled technician bookings directly from your customer dashboard up to 2 hours before the start time.' },
    { q: 'What is Saath Wallet?', a: 'Saath Wallet is a secure prepaid wallet allowing one-click payments, instant refund settlements, and coupon redemption benefits.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      
      {/* Reusable Header */}
      <Header
        cartCount={cartCount}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onCartClick={onCartClick}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-grow pt-24">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-[#6C3BFF]/10 via-transparent to-transparent">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#6C3BFF]/20 to-yellow-400/20 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6C3BFF]/10 border border-[#6C3BFF]/20 text-xs font-black uppercase tracking-wider text-[#6C3BFF]">
                <Sparkles size={12} />
                <span>Hyperlocal Convenience Super App</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-850 dark:text-white leading-tight">
                Everything You Need, <br />
                <span className="bg-gradient-to-r from-[#6C3BFF] to-[#FF5A7A] bg-clip-text text-transparent">Delivered In Minutes</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
                Join India's trusted hyperlocal super network. Access local stores, request expert technicians, and track orders in real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => navigate('/login', { state: { from: '/customer/dashboard' } })}
                className="py-3 px-8 rounded-btn bg-[#6C3BFF] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#6C3BFF]/95 transition-all shadow-md flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('why-choose-saathapp');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-8 rounded-btn border border-slate-250 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-350 font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/80 transition-all"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE SAATHAPP */}
        <section id="why-choose-saathapp" className="py-16 border-t border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Why Choose SaathApp</h2>
              <p className="text-xs text-slate-400 font-semibold">Empowering neighborhood convenience and local commerce.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Absolute Convenience', desc: 'No need to call multiple shops or coordinate with workers. Manage groceries and home repair services in one dashboard.', icon: Laptop },
                { title: 'Safety & Trust', desc: 'Secure payments, digital invoices, and verified professionals checkups. Your safety and peace of mind is our prime priority.', icon: ShieldCheck },
                { title: 'Support Local Sellers', desc: 'Every order supports neighborhood stores and independent certified service professionals, building regional community growth.', icon: Users }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card text-left space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#6C3BFF]/10 text-[#6C3BFF] rounded-xl flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-sm font-black text-slate-850 dark:text-white uppercase tracking-wider">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16 bg-slate-100/50 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-855 dark:text-white uppercase tracking-wider">Everything You Need</h2>
              <p className="text-xs text-slate-400 font-semibold">Explore the features built into your hyperlocal super application.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card flex gap-4 text-left shadow-sm">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${feat.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">{feat.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-855 dark:text-white uppercase tracking-wider">How It Works</h2>
              <p className="text-xs text-slate-400 font-semibold">Simplifying hyperlocal booking in four easy steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((st, idx) => (
                <div key={idx} className="relative p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-card text-left space-y-3 shadow-sm">
                  <span className="text-3xl font-black text-[#6C3BFF]/20 font-mono block leading-none">{st.step}</span>
                  <h3 className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">{st.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-medium leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-16 bg-slate-100/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Customer Reviews</h2>
              <p className="text-xs text-slate-400 font-semibold">Hear what our neighborhood community has to say.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Aditya Raj', text: 'I booked an electrician on SaathApp to replace my fans. The process was extremely fast and the technician did a neat, professional job.', role: 'Nalanda, Bihar' },
                { name: 'Simran Singh', text: 'Having a single dashboard to buy groceries and order plumber services is a game changer! Live tracking helps check exact delivery timelines.', role: 'Tech Park Noida' },
                { name: 'Ravi Verma', text: 'Love the wallet integration. Checking out and downloading invoices is fast, and the customer support was helpful with refund requests.', role: 'Patna' }
              ].map((rev, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-card text-left space-y-4 shadow-sm">
                  <div className="flex gap-0.5 text-yellow-400 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-350 font-medium leading-relaxed italic">"{rev.text}"</p>
                  <div>
                    <h4 className="text-xs font-black text-slate-855 dark:text-white">{rev.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{rev.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-400 font-semibold">Got questions? We have answers.</p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4.5 text-left font-black text-xs uppercase tracking-wider text-slate-800 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`transform transition-transform duration-200 ${faqOpen[idx] ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {faqOpen[idx] && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4.5 pt-0 text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-800/60 text-left">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-[#6C3BFF] via-[#6C3BFF]/90 to-[#FF5A7A] p-8 sm:p-12 text-center text-white space-y-6 shadow-premium">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider leading-tight">Ready to join SaathApp?</h2>
              <p className="text-xs sm:text-base text-white/90 font-medium max-w-md mx-auto leading-relaxed">
                Create a customer account now to check products, schedule plumbers, and save addresses.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
                <button
                  onClick={() => navigate('/login', { state: { from: '/customer/dashboard' } })}
                  className="py-3 px-8 rounded-btn bg-white text-[#6C3BFF] font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-50 transition-all shadow-md cursor-pointer"
                >
                  Sign Up / Login
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Reusable Footer */}
      <Footer />

    </div>
  );
}
