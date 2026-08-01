import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Award, Clock, Wallet, ShieldCheck, MapPin, Star,
  HelpCircle, ChevronDown, ChevronUp, HardHat, Sparkles, DollarSign, Calendar,
  Briefcase, ArrowRight, UploadCloud, User, Clipboard, ThumbsUp, Info
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiceWorkerPage({
  cartCount,
  location,
  darkMode,
  toggleDarkMode,
  onLogout,
  isAuthenticated,
  user,
  onProfile
}) {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Become a Service Worker | SaathApp';
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(prev => prev.map((item, i) => (i === index ? !item : item)));
  };

  const steps = [
    { step: '1', title: 'Signup / Create Account', desc: 'Create your worker profile using your mobile number and basic details.' },
    { step: '2', title: 'Upload KYC Documents', desc: 'Provide your Aadhaar Card and a profile photo for quick verification.' },
    { step: '3', title: 'Verify & Start Work', desc: 'Our team reviews your application within 24-48 hours. Once verified, log in and accept jobs.' }
  ];

  const benefits = [
    { title: 'Flexible Working Hours', text: 'Work on your own terms. Choose shifts and job locations that fit your daily schedule.', icon: Clock },
    { title: 'Weekly Payouts', text: 'Receive your hard-earned wages directly into your bank account every week without delay.', icon: Wallet },
    { title: 'Steady Job Flow', text: 'Get assigned local service jobs directly from verified professional partners in your area.', icon: Briefcase },
    { title: 'Skills Development', text: 'Work alongside expert professionals to learn advanced techniques and grow your career.', icon: Award },
    { title: 'Safety Insurance', text: 'Get covered by SaathApp standard partner safety insurance for all active assignments.', icon: ShieldCheck },
    { title: 'Direct Navigation', text: 'Built-in GPS map navigation guides you directly to customer locations seamlessly.', icon: MapPin }
  ];

  const faqs = [
    { q: 'How do I register as a service worker?', a: 'Click the "Join Now" button to go to our registration form. Fill in your name, phone number, choose your skills, and upload your Aadhaar card.' },
    { q: 'What documents are required?', a: 'You only need a valid Aadhaar Card and a clear profile photo to get verified. An experience certificate is optional but helpful.' },
    { q: 'How long does verification take?', a: 'Typically, our operations team reviews and approves your KYC details within 24 to 48 hours.' },
    { q: 'How will I receive my salary/payouts?', a: 'Earnings (including base wage and job incentives) are processed weekly and transferred directly to your bank account or UPI.' },
    { q: 'How do I get jobs assigned?', a: 'Once verified and approved, you can log in to your Worker Dashboard. Jobs matching your location and skills will be dispatched to your app, which you can accept or decline.' }
  ];

  return (
    <div className="min-h-screen bg-background text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={() => {}}
        location={location}
        onLocationClick={() => {}}
        onSearch={() => {}}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={onProfile}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 py-16 sm:py-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_45%)] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate('/')}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider">
                  👷 Become a Service Worker
                </span>
                <h1 className="text-4xl sm:text-6xl font-black leading-tight drop-shadow-md">
                  Join SaathApp as a Skilled Worker
                </h1>
                <p className="max-w-xl text-base sm:text-lg text-white/90 leading-relaxed font-medium">
                  Partner with verified professionals, get steady local job assignments, and secure your weekly income with a flexible schedule.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/worker/register')}
                    className="rounded-btn bg-white hover:bg-slate-100 text-indigo-700 px-8 py-3.5 text-sm font-extrabold shadow-lg transition-all border-0 cursor-pointer"
                  >
                    Join Now →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/worker/login')}
                    className="rounded-btn border border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 text-sm font-extrabold transition-all cursor-pointer"
                  >
                    Partner Login
                  </motion.button>
                </div>
              </div>

              <div className="relative flex justify-center items-center h-80">
                <div className="relative w-64 h-64 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-premium">
                  <HardHat size={96} className="text-white drop-shadow-lg" />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="absolute -top-4 -left-4 p-3 rounded-2xl bg-yellow-400 text-slate-900 shadow-lg font-bold"
                  >
                    <Wallet size={24} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-green-500 text-white shadow-lg font-bold"
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Why Join SaathApp?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
              We offer the best perks and safety features for service professionals and helpers nationwide.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-card bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-750 shadow-soft text-left space-y-4"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-black">{b.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {b.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Journey */}
        <section className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-16">
              Three Steps to Start Earning
            </h2>

            <div className="relative border-l-2 border-dashed border-indigo-500/30 pl-8 ml-4 sm:ml-8 space-y-12 text-left">
              {steps.map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-14 top-1 w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center border-4 border-white dark:border-slate-900 shadow">
                    {s.step}
                  </div>
                  <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-750 shadow-soft space-y-2">
                    <h3 className="text-xl font-black">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-left">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-card bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-750 shadow-soft overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-4.5 flex justify-between items-center text-left font-bold text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors border-0"
                  >
                    <span>{faq.q}</span>
                    {faqOpen[i] ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {faqOpen[i] && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-750 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-card bg-gradient-to-r from-blue-700 to-indigo-700 p-8 sm:p-12 text-white shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl sm:text-4xl font-black mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sm text-white/80 max-w-xl mx-auto mb-8 font-medium">
                Submit your simple application profile today. Our team will verify and activate your worker portal in less than 48 hours.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/worker/register')}
                  className="rounded-btn bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3 text-xs sm:text-sm font-extrabold cursor-pointer shadow border-0"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => alert('Support ticket raised. Our helper dispatch team will reach you.')}
                  className="rounded-btn border border-white/30 bg-white/15 hover:bg-white/25 text-white px-8 py-3 text-xs sm:text-sm font-extrabold cursor-pointer"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
