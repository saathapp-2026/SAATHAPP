import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ArrowLeft, EyeOff, UserCheck, Lock, Shield, CheckCircle2,
  ChevronDown, ChevronUp, Mail, AlertTriangle, Key, Smartphone
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const privacyPillars = [
  {
    icon: <EyeOff size={24} className="text-emerald-500" />,
    title: 'Zero Unauthorized Data Sharing',
    desc: 'Your personal info, location data, and phone numbers are never sold or rented to third-party telemarketers.',
  },
  {
    icon: <Lock size={24} className="text-emerald-500" />,
    title: 'End-to-End Account Protection',
    desc: 'Multi-factor authentication (OTP & session hashing) guarantees authorized account logins only.',
  },
  {
    icon: <UserCheck size={24} className="text-emerald-500" />,
    title: 'Granular Privacy Controls',
    desc: 'Manage your saved addresses, location permissions, and notification preferences at any time in Profile Settings.',
  },
  {
    icon: <Shield size={24} className="text-emerald-500" />,
    title: 'Compliance with DPDP Act',
    desc: 'Our data handling adheres to Digital Personal Data Protection (DPDP) laws and Indian privacy standards.',
  },
];

const safetyTips = [
  {
    title: 'Protect Your Account Credentials',
    desc: 'Keep your account secure by never sharing passwords, login OTPs, or session tokens with anyone.',
  },
  {
    title: 'Use Strong Passwords',
    desc: 'Create unique passwords combining uppercase letters, numbers, and symbols. Change them periodically.',
  },
  {
    title: 'Verify Email Communications',
    desc: 'Always check that official emails originate strictly from @saathapp.in before sharing any details.',
  },
  {
    title: 'Report Suspicious Account Activity',
    desc: 'Immediately report unknown logins, fake profiles, or suspicious activity to support@saathapp.in.',
  },
];

const privacyFaqs = [
  {
    q: 'How does SaathApp protect my personal location and phone number?',
    a: 'Your precise location is used only to show nearby inventory and calculate delivery times. Delivery agents only see necessary delivery address details.',
  },
  {
    q: 'Can I delete my account or saved address history?',
    a: 'Yes. You can manage or clear saved addresses directly in your profile address tab, or request account deletion by emailing privacy@saathapp.in.',
  },
  {
    q: 'Does SaathApp send promotional spam or robocalls?',
    a: 'No! We respect your inbox. You can customize or unsubscribe from marketing notifications at any time.',
  },
  {
    q: 'What should I do if I suspect my account was compromised?',
    a: 'Log out immediately from all devices, reset your password using the Forgot Password feature, and notify our Trust & Safety desk.',
  },
];

export default function PrivacyProtectedPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header
        cartCount={0}
        onCartClick={() => {}}
        location="Green Park, New Delhi"
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

      <main className="pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>

          {/* Hero Banner */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[36px] bg-[#16213E] p-8 text-white shadow-2xl lg:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-400">
                  <ShieldCheck size={18} />
                  Privacy & Data Safeguard
                </div>
                <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Privacy Protected <br />
                  <span className="text-emerald-400">& User Security</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  We believe your personal data belongs to you. SaathApp enforces strict privacy policies, data encryption, and account isolation across all services.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1A1A2E] px-4 py-3 text-sm font-medium text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400" /> DPDP Act Compliant
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1A1A2E] px-4 py-3 text-sm font-medium text-slate-200">
                    <EyeOff size={18} className="text-emerald-400" /> No Data Selling
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <div className="relative w-full max-w-sm rounded-3xl bg-[#1A1A2E] p-6 text-center shadow-xl border border-slate-700/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                    <Shield size={40} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">Encrypted Vault</h3>
                  <p className="mt-2 text-xs text-slate-300">
                    All session tokens & passwords are hashed securely using SHA-256 algorithms.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950">
                    <Lock size={16} /> Data Vault Active
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Pillars */}
          <section className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Four Pillars of Privacy Protection
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Our commitments to keeping your identity and transactions confidential.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {privacyPillars.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Account Safety Practices
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Simple habits to protect your account from unauthorized access.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {safetyTips.map((tip, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                    🔒
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{tip.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Privacy FAQs
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Frequently asked questions about data usage, permissions, and security.
              </p>
            </div>

            <div className="mt-8 space-y-4 max-w-4xl mx-auto">
              {privacyFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100 transition"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={20} className="text-emerald-600 shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Support Banner */}
          <div className="mt-12 text-center pb-6">
            <p className="text-sm font-medium text-slate-600">
              Have privacy questions or data deletion requests?
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <a
                href="mailto:privacy@saathapp.in"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Mail size={14} /> Contact Privacy Desk
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
