import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wallet,
  Zap,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const benefits = [
  { title: 'Easy Order Management', icon: Zap },
  { title: 'Real-time Navigation', icon: Navigation },
  { title: 'Secure OTP Verification', icon: ShieldCheck },
  { title: 'Instant Earnings', icon: Wallet },
  { title: 'Performance & Rating Tracking', icon: Star },
];

const journeySteps = [
  {
    step: 1,
    title: 'Go Online & Receive Orders',
    description: 'Go online to start receiving orders near your location.',
  },
  {
    step: 2,
    title: 'Accept & Navigate',
    description: 'Accept the order to proceed and navigate to the pickup location.',
  },
  {
    step: 3,
    title: 'Pickup',
    description: 'Reach pickup location and collect the order.',
  },
  {
    step: 4,
    title: 'Deliver & Verify',
    description: 'Navigate to the drop location and verify the OTP from the customer.',
  },
  {
    step: 5,
    title: 'Complete & Earn',
    description:
      'Order completed successfully, check your wallet balance, and view your daily earnings summary.',
  },
];

const proTips = [
  'Go Online during peak hours to get more orders.',
  'Always follow navigation for faster delivery.',
  'Collect OTP only from the customer.',
  'Maintain high ratings to get more incentives.',
];

export default function DeliveryAgentLandingPage() {
  useEffect(() => {
    document.title = 'Become Delivery Agent | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Join SaathApp as a delivery partner. Manage orders easily, navigate in real time, verify OTP securely, and earn instantly with flexible schedules.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header
        cartCount={0}
        onCartClick={() => {}}
        location="Bhatahar, Nalanda"
        onLocationClick={() => {}}
        onSearch={() => {}}
        onLogin={() => {}}
        onSignup={() => {}}
        onProfile={() => {}}
        user={null}
        isAuthenticated={false}
        onCartPage={() => {}}
        onOrdersPage={() => {}}
        onWishlistPage={() => {}}
        onSettingsPage={() => {}}
        onLogout={() => {}}
        darkMode={false}
        toggleDarkMode={() => {}}
        onVoiceSearchClick={() => {}}
        onImageSearchClick={() => {}}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {/* Hero card — matches existing Become Delivery Agent card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-card border border-slate-200/60 bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Delivery Partner Program</p>
                <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Become Delivery Agent</h1>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  Earn a steady income with flexible delivery schedules. Deliver local groceries and construction
                  products across your neighbourhood with SaathApp.
                </p>
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-btn bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-95"
              >
                Apply as Rider
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-[28px] border border-primary/10 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 text-center lg:max-w-sm lg:flex-1">
              <p className="text-sm font-semibold text-primary">Your Complete Delivery Journey</p>
              <p className="mt-2 text-2xl font-black text-slate-900">From Login to Earnings</p>
              <p className="mt-2 text-sm text-slate-600">12-step rider flow designed for safe, fast, and reliable deliveries.</p>
            </div>
          </div>
        </motion.section>

        {/* Key Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Key Benefits</h2>
            <p className="mt-2 text-sm text-slate-600">Everything you need to deliver confidently and earn more.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-card border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">{benefit.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Delivery Journey */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Your Complete Delivery Journey</h2>
            <p className="mt-2 text-sm text-slate-600">Follow these five steps from going online to earning in your wallet.</p>
          </div>
          <div className="relative space-y-6">
            {journeySteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative flex gap-4 sm:gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-dark text-sm font-black text-white shadow-sm">
                    {item.step}
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="mt-2 hidden h-full min-h-[48px] w-0.5 bg-primary/20 sm:block" />
                  )}
                </div>
                <div className="flex-1 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <h3 className="text-base font-black text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pro Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-slate-900">Pro Tips for Success</h2>
            <p className="mt-2 text-sm text-slate-600">Simple habits that help riders earn more and stay highly rated.</p>
            <ul className="mt-6 space-y-3">
              {proTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-[28px] border border-orange-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                <Truck size={28} />
              </div>
              <p className="text-lg font-black text-slate-900">Your Success, Our Priority!</p>
              <p className="mt-2 text-sm text-slate-600">
                More deliveries, happy customers, better ratings, and higher earnings — grow together with SaathApp.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Support & Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 rounded-[32px] border border-primary/20 bg-primary/5 p-6 sm:p-8"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <Clock3 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">Support & Contact</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                Don&apos;t need to take stress and work well and carefully. We are here 24/7 available for any help.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-900">Email</p>
              <a href="mailto:support@saathapp.in" className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline">
                <Mail size={16} />
                support@saathapp.in
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-900">Phone</p>
              <a href="tel:+919128842027" className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline">
                <Phone size={16} />
                +91 9128842027
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-black text-slate-900">Community</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                <MessageCircle size={16} className="text-primary" />
                Official WhatsApp Group
              </p>
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 overflow-hidden rounded-[32px] bg-gradient-to-r from-primary to-primary-dark p-6 text-center text-white shadow-xl sm:p-10"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
            <MapPin size={24} className="text-emerald-200" />
            <p className="text-lg font-black sm:text-xl">
              Deliver Safe • Earn More • Grow Together with SaathApp
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-btn bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 text-sm font-extrabold text-white shadow-lg transition hover:opacity-95"
            >
              Register Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/delivery-partner-agreement"
              className="text-sm text-emerald-100 underline-offset-4 hover:underline"
            >
              Read Delivery Partner Agreement
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
