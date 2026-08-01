import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Clock, Wallet, Award, BookOpen,
  Briefcase, CheckCircle2, ChevronDown, HelpCircle, HardHat, FileText, Gift, Star
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

export default function WorkerPortal({
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
  const [faqOpen, setFaqOpen] = useState([false, false, false, false]);

  useEffect(() => {
    document.title = 'Become a Service Worker | SaathApp';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(prev => prev.map((item, idx) => idx === index ? !item : item));
  };

  const benefits = [
    { title: 'Flexible Working Hours', desc: 'Choose your own shifts and duty timings. Set availability directly in the partner app.', icon: Clock },
    { title: 'Weekly Payments', desc: 'No delayed payouts. Get your earnings transferred directly to your bank account every week.', icon: Wallet },
    { title: 'More Local Jobs', desc: 'Receive job leads assigned directly near your location, reducing travel distance and fuel costs.', icon: Briefcase },
    { title: 'Verified Badge & Insurance', desc: 'Earn a certified verified badge on your profile. Benefit from safety insurance coverage on jobs.', icon: ShieldCheck },
    { title: 'Free Technical Training', desc: 'Attend free skill-up workshops and earn verified credentials to qualify for high-paying orders.', icon: BookOpen }
  ];

  const categories = [
    { name: 'Electrician', icon: '⚡' },
    { name: 'Plumber', icon: '🚰' },
    { name: 'Painter', icon: '🎨' },
    { name: 'Carpenter', icon: '🪚' },
    { name: 'Cleaner', icon: '🧹' },
    { name: 'AC Technician', icon: '⚙️' },
    { name: 'Appliance Repair', icon: '🔌' },
    { name: 'Agriculture Worker', icon: '🌾' },
    { name: 'Construction Worker', icon: '🧱' }
  ];

  const steps = [
    { step: 'Step 1', title: 'Apply & Register', desc: 'Fill the partner registration form and submit details.' },
    { step: 'Step 2', title: 'KYC Verification', desc: 'Upload identity documents (Aadhaar, PAN) for background checks.' },
    { step: 'Step 3', title: 'Onboarding & Training', desc: 'Attend the quick app walkthrough and safety guidelines briefing.' },
    { step: 'Step 4', title: 'Start Working & Earning', desc: 'Clock in on duty, accept jobs, navigate to customers, and complete work.' }
  ];

  const docs = [
    { title: 'Aadhaar Card', desc: 'Required for identity verification check.' },
    { title: 'PAN Card', desc: 'Required for banking and tax compliance.' },
    { title: 'Bank Account Passbook / UPI', desc: 'For weekly salary payouts.' },
    { title: 'Profile Photo', desc: 'Clear passport-size photo for customer display.' },
    { title: 'Experience Certificate', desc: 'Optional but helps secure higher rating tiers.' }
  ];

  const faqs = [
    { q: 'What are the criteria to join as a worker?', a: 'Any individual above 18 years with basic technical skill in local home repair services (electrician, plumbing, painting, etc.) and valid identity proof can register.' },
    { q: 'How are job orders assigned?', a: 'SaathApp assign engines match you with orders scheduled in your registered local PIN code area based on availability.' },
    { q: 'Is there a registration fee?', a: 'Onboarding as a SaathApp worker partner is completely free. We do not charge any registration fees.' },
    { q: 'How do ratings affect my earnings?', a: 'Keeping a high customer rating (above 4.5★) qualifies you for bonus incentives, Saathi Gold priority listings, and higher weekly payouts.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-955 flex flex-col transition-colors duration-300">
      
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
        <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-black uppercase tracking-wider text-blue-600">
                <HardHat size={12} />
                <span>Join India's Hyperlocal Workforce</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-850 dark:text-white leading-tight">
                Get Steady Local Jobs, <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent">Secure Your Income</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
                Partner with certified professionals, complete assigned repair tasks, track earnings, and secure weekly bank payouts on a flexible schedule.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => navigate('/worker/register')}
                className="py-3 px-8 rounded-btn bg-blue-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
              >
                <span>Apply Now</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/worker/login')}
                className="py-3 px-8 rounded-btn border border-slate-250 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-350 font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/80 transition-all"
              >
                Partner Login
              </button>
            </motion.div>
          </div>
        </section>

        {/* WHY JOIN SAATHAPP */}
        <section className="py-16 border-t border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Partner Benefits</h2>
              <p className="text-xs text-slate-400 font-semibold">Everything you need to grow your livelihood and secure stable income.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.slice(0, 3).map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card text-left space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
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

        {/* JOB CATEGORIES */}
        <section className="py-16 bg-slate-100/50 dark:bg-slate-900/10 border-y border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-855 dark:text-white uppercase tracking-wider">Job Categories</h2>
              <p className="text-xs text-slate-400 font-semibold">We have steady assignments across multiple trade channels.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
              {categories.map((cat, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider leading-tight">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REGISTRATION PROCESS TIMELINE */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-855 dark:text-white uppercase tracking-wider">How to Join</h2>
              <p className="text-xs text-slate-400 font-semibold">Get verified and start accepting jobs in four simple steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((st, idx) => (
                <div key={idx} className="relative p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-card text-left space-y-3 shadow-sm">
                  <span className="text-xs font-black text-blue-600 block uppercase tracking-wider">{st.step}</span>
                  <h3 className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">{st.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-medium leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REQUIRED DOCUMENTS */}
        <section className="py-16 bg-slate-100/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Required Documents</h2>
              <p className="text-xs text-slate-400 font-semibold">Keep these documents ready for a fast verification approval checkup.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {docs.map((doc, idx) => (
                <div key={idx} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-card text-left space-y-2.5 shadow-sm">
                  <div className="w-9 h-9 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <h3 className="text-xs font-black text-slate-855 dark:text-white uppercase tracking-wider">{doc.title}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 font-semibold leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EARNINGS HIGHLIGHTS */}
        <section className="py-16 border-b border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wider">Earnings & Payouts</h2>
              <p className="text-xs text-slate-400 font-semibold">Earn steady revenue from daily tasks, ratings, and bonuses.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Stable Base Salary', value: '₹18,000+', desc: 'Assured monthly base earnings for active duty shifts.' },
                { title: 'Weekly Incentives', value: '₹350/Job', desc: 'Additional incentive bonuses for high-priority completed bookings.' },
                { title: 'Rating Bonuses', value: '₹1,500/Mo', desc: 'Extra monthly payout reward for maintaining reviews above 4.8★.' },
                { title: 'Festival Rewards', value: 'Double Pay', desc: 'Exclusive rewards and double incentive rates during local holidays.' }
              ].map((earn, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card text-center space-y-2 shadow-sm">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{earn.title}</h4>
                  <p className="text-2xl font-black text-blue-600">{earn.value}</p>
                  <p className="text-[10px] text-slate-450 font-semibold mt-1 leading-normal">{earn.desc}</p>
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
                    className="w-full flex items-center justify-between p-4.5 text-left font-black text-xs uppercase tracking-wider text-slate-800 dark:text-white cursor-pointer hover:bg-slate-55 dark:hover:bg-slate-850"
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
        <section className="py-16 bg-slate-50 dark:bg-slate-955">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-850 p-8 sm:p-12 text-center text-white space-y-6 shadow-premium">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider leading-tight">Ready to start earning?</h2>
              <p className="text-xs sm:text-base text-white/90 font-medium max-w-md mx-auto leading-relaxed">
                Submit your partner registration details now, complete the quick KYC verification process, and accept your first jobs.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
                <button
                  onClick={() => navigate('/worker/register')}
                  className="py-3 px-8 rounded-btn bg-white text-blue-600 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-50 transition-all shadow-md cursor-pointer"
                >
                  Apply Now
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
