import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Award, Clock, Wallet, TrendingUp, UserCheck, BookOpen,
  ShieldCheck, MapPin, Star, PhoneCall, HelpCircle, Plus, Minus,
  ChevronDown, ChevronUp, Wrench, Sparkles, DollarSign, Calendar, Briefcase, ArrowRight,
  Lock, UploadCloud, FileText, Camera, Check, Search, Shield, Zap, Info, Play, Hammer,
  User, Clipboard, ThumbsUp, AlertCircle, HardHat
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiceWorkerPage({
  cartCount,
  location,
  darkMode,
  isAuthenticated,
  user,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  onProfile,
  toggleDarkMode,
}) {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);

  const sectionRefs = {
    hero: useRef(null),
    whyjoin: useRef(null),
    journey: useRef(null),
    services: useRef(null),
    faq: useRef(null)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Become a Service Worker | SaathApp';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSubTab(key);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      const topOffset = sectionRefs[sectionId].current.offsetTop - 120;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveSubTab(sectionId);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => prev.map((item, i) => (i === index ? !item : item)));
  };

  const benefits = [
    { title: 'Flexible Working Hours', desc: 'Choose shifts that match your schedule.', icon: Clock, color: 'from-blue-500 to-indigo-600' },
    { title: 'Weekly Payouts', desc: 'Get your earnings credited directly to your bank account every week.', icon: Wallet, color: 'from-emerald-500 to-green-600' },
    { title: 'More Local Jobs', desc: 'Receive continuous job assignments in your preferred local area.', icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
    { title: 'Verified Badge', desc: 'Build trust with a verified profile and background check.', icon: ShieldCheck, color: 'from-purple-500 to-violet-600' },
    { title: 'Skill Training', desc: 'Get access to expert workshops and certifications to scale your skills.', icon: BookOpen, color: 'from-rose-500 to-pink-600' },
    { title: 'Work Near Home', desc: 'Define your service radius and work near your location.', icon: MapPin, color: 'from-teal-500 to-cyan-600' },
    { title: 'Secure Payments', desc: 'Assured payments for every job with zero risk.', icon: Lock, color: 'from-indigo-500 to-blue-600' },
    { title: 'Digital Profile', desc: 'Showcase ratings, badges, and work history to attract better rates.', icon: UserCheck, color: 'from-violet-500 to-purple-600' }
  ];

  const categories = [
    { name: 'Helper', icon: User, desc: 'General assistance in home services.' },
    { name: 'Electrician Apprentice', icon: Zap, desc: 'Assist certified electricians.' },
    { name: 'Plumbing Assistant', icon: Wrench, desc: 'Assist in pipe layouts and leakage fixes.' },
    { name: 'Construction Worker', icon: Hammer, desc: 'Join local infrastructure and repair jobs.' },
    { name: 'Delivery Partner', icon: HardHat, desc: 'Deliver local groceries and parcel bookings.' },
    { name: 'Painter Assistant', icon: Sparkles, desc: 'Sanding, wall prep, and wall coating support.' },
    { name: 'AC Assistant', icon: Wrench, desc: 'Help with HVAC servicing and mount work.' },
    { name: 'Appliance Helper', icon: Briefcase, desc: 'Support white goods repair and transport.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={onProfile}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Back to Home Button & Sub-navigation */}
      <div className="sticky top-[64px] z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-slate-600 dark:text-slate-300 hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
          
          <div className="hidden sm:flex items-center gap-6 text-xs font-extrabold uppercase tracking-wider">
            {Object.keys(sectionRefs).map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`py-1 cursor-pointer border-b-2 bg-transparent border-transparent transition-all ${
                  activeSubTab === key ? 'text-primary border-primary' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {key === 'whyjoin' ? 'Why Join' : key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* SECTION 1: HERO */}
        <section ref={sectionRefs.hero} className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-850 py-16 sm:py-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider">
                👷 Worker Portal
              </span>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                Become a Verified Service Worker
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-white/85 leading-relaxed font-medium">
                Join India's trusted hyperlocal workforce. Get steady assignments, secure weekly earnings, and grow your career as a verified worker on SaathApp.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/worker/register')}
                  className="rounded-btn bg-white hover:bg-slate-100 text-indigo-700 font-black px-6 py-3 text-xs sm:text-sm shadow-lg border-0 cursor-pointer"
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('journey')}
                  className="rounded-btn border border-white/30 bg-white/10 hover:bg-white/20 text-white font-black px-6 py-3 text-xs sm:text-sm border-solid cursor-pointer"
                >
                  View Process
                </motion.button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <div className="absolute w-48 h-48 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-lg">
                  <HardHat size={80} className="text-white drop-shadow" />
                </div>
                <div className="absolute -top-4 left-6 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase shadow-md flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Profile
                </div>
                <div className="absolute -bottom-4 right-6 px-3 py-1.5 rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase shadow-md flex items-center gap-1">
                  <Wallet size={12} /> Weekly Payouts
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY JOIN */}
        <section ref={sectionRefs.whyjoin} className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Partner Benefits</span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">Why Join SaathApp?</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                Enjoy complete working independence, priority support, and secure payouts. We partner with the best so you can earn the best.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    className="p-6 bg-slate-50 dark:bg-slate-950 rounded-card border border-slate-200/50 dark:border-slate-800/50 shadow-soft hover:shadow-premium text-left flex flex-col justify-between min-h-[180px]"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon size={20} />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">{benefit.title}</h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: JOURNEY */}
        <section ref={sectionRefs.journey} className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">How It Works</span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">Your Path to Joining Us</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                Simple steps to register, upload documentation, and start working on local job assignments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-card shadow-soft border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center relative group">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center shadow-md">
                  1
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mt-2">
                  <User size={24} />
                </div>
                <h3 className="text-sm font-black mt-4 text-slate-800 dark:text-slate-100">Register & Login</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed max-w-xs">
                  Create your Worker account with basic details and select your service category.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-card shadow-soft border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center relative group">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center shadow-md">
                  2
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mt-2">
                  <UploadCloud size={24} />
                </div>
                <h3 className="text-sm font-black mt-4 text-slate-800 dark:text-slate-100">Upload KYC Documents</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed max-w-xs">
                  Provide Aadhaar proof and profile photo for secure ID verification.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-card shadow-soft border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center relative group">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center shadow-md">
                  3
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mt-2">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-sm font-black mt-4 text-slate-800 dark:text-slate-100">Get Approved & Start</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed max-w-xs">
                  We review your documents within 24 hours. Once approved, start receiving local job dispatches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SERVICES WE COVER */}
        <section ref={sectionRefs.services} className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Categories</span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">Services We Cover</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                Whether you are a helper, apprentice, or delivery partner, we have jobs for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-card border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-black mt-3 text-slate-800 dark:text-slate-100">{cat.name}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">{cat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQS */}
        <section ref={sectionRefs.faq} className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Support</span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                { q: 'How do I register as a worker?', a: 'Click the "Apply Now" or "Join Now" button, fill in your personal details, preferred location, and skills, and complete your profile.' },
                { q: 'What documents are required for KYC verification?', a: 'You need to upload an Aadhaar card image (front & back) and a clear profile photo for identity verification.' },
                { q: 'How long does the verification approval process take?', a: 'Once you submit your KYC, our operations team audits the details and approves profiles within 24 to 48 hours.' },
                { q: 'How are my earnings paid out?', a: 'All completed jobs are compiled weekly, and payouts are transferred directly to your bank account or UPI address on file.' },
                { q: 'Can I decline a job dispatch?', a: 'Yes! As a worker, you have complete control over your schedule. You can accept or decline job dispatches directly from your portal.' }
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4.5 text-left font-black text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between border-0 bg-transparent cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {faqOpen[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {faqOpen[index] && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
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

        {/* SECTION 6: CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-650 to-violet-800 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Ready to Start Your Service Worker Journey?
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-4 max-w-xl mx-auto font-medium">
              Join SaathApp today, verify your profile, and start earning weekly. Let's work together.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/worker/register')}
                className="rounded-btn bg-white text-indigo-750 px-6 py-3 text-xs sm:text-sm font-black border-0 cursor-pointer shadow-lg"
              >
                Apply Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/worker/login')}
                className="rounded-btn border border-white/30 bg-white/10 text-white px-6 py-3 text-xs sm:text-sm font-black border-solid cursor-pointer"
              >
                Worker Login
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
