import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Store, AlertTriangle, CheckCircle2, Mail, ChevronDown, ChevronUp, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const verificationSteps = [
  {
    step: '01',
    title: 'Business & KYC Verification',
    desc: 'Every seller must submit valid government registration (GST/PAN/Aadhaar) and verified business address proof.',
  },
  {
    step: '02',
    title: 'Physical Store & Inventory Audit',
    desc: 'Local store inspections are conducted to verify authentic stock, genuine pricing, and operational hygiene.',
  },
  {
    step: '03',
    title: 'Quality & Authenticity Guarantee',
    desc: 'Sellers pledge to sell 100% original products. Counterfeits result in immediate blacklisting and legal action.',
  },
  {
    step: '04',
    title: 'Verified Seller Badge & Ratings',
    desc: 'Only fully verified sellers receive the green "Verified Seller" badge on SaathApp marketplace.',
  },
];

const scamsList = [
  {
    title: 'Fake Seller Onboarding Scams',
    desc: 'Never share OTPs, passwords or banking details with individuals claiming to onboard sellers for a fee. Official onboarding has zero upfront registration fee.',
  },
  {
    title: 'Recruitment & Job Fraud',
    desc: 'SaathApp never charges candidates for interviews, seller agent jobs, or store associate training. Report any fee demands immediately.',
  },
  {
    title: 'Fake Franchise & Distributorship Offers',
    desc: 'We never ask for advance security deposits into personal bank accounts for SaathApp franchise or seller hub permissions.',
  },
  {
    title: 'Unauthorized Social Media Groups',
    desc: 'Only rely on official SaathApp platforms. Ignore unauthorized WhatsApp, Telegram, or Facebook seller groups.',
  },
];

const sellerFaqs = [
  {
    q: 'How do I identify a Verified Seller on SaathApp?',
    a: 'Look for the green Shield badge with a checkmark next to the store name on product pages and store listings.',
  },
  {
    q: 'Does SaathApp charge sellers or candidates money for onboarding?',
    a: 'No. Onboarding on SaathApp is transparent, and we never ask for cash deposits or fee transfers into personal accounts.',
  },
  {
    q: 'What should I do if a seller delivers an inauthentic or defective product?',
    a: 'You are protected by SaathApp Buyer Guarantee. Report the order via your Orders tab or contact Support within 48 hours for immediate replacement or refund.',
  },
  {
    q: 'How can I report a fraudulent or unverified seller?',
    a: 'Click "Report Fraud" or email support@saathapp.in with store details and evidence. Our Trust & Safety team inspects within 24 hours.',
  },
];

export default function VerifiedSellersPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-page font-sans text-slate-800">
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

      {/* Main Container */}
      <main className="pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Back Navigation */}
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-page"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>

          {/* Hero Banner */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[36px] bg-[#111B33] p-8 text-white shadow-2xl lg:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-400">
                  <ShieldCheck size={18} />
                  Trust & Safety Standard
                </div>
                <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Verified Sellers <br />
                  <span className="text-emerald-400">& Safe Local Merchants</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Every merchant, hardware supplier, and technician on SaathApp undergoes strict KYC verification, physical store auditing, and background authentication before serving your neighborhood.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1A2743] px-4 py-3 text-sm font-medium text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400" /> 100% Genuine Products
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1A2743] px-4 py-3 text-sm font-medium text-slate-200">
                    <Award size={18} className="text-emerald-400" /> Physical Store Verified
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <div className="relative w-full max-w-sm rounded-3xl bg-[#1A2743] p-6 text-center shadow-xl border border-slate-700/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                    <Store size={40} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">Verified Merchant Badge</h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Always look for the green badge to guarantee authentic products & official bill receipt.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950">
                    <ShieldCheck size={16} /> Verified SaathApp Partner
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Verification Process Steps */}
          <section className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                How We Verify Local Sellers
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Our 4-step verification framework ensures maximum customer trust and product quality.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {verificationSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl font-black text-emerald-500">{item.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Anti-Fraud & Scam Warning Section */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <AlertTriangle size={26} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Protect Yourself Against Seller Scams
                </h2>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Stay informed and prevent fraudulent seller onboarding or impersonation attempts.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {scamsList.map((scam, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-page p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 font-bold">
                    ⚠️
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{scam.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{scam.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Channels Banner */}
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
              <h3 className="text-sm font-bold text-emerald-900">🛡️ Official SaathApp Seller Communications</h3>
              <p className="mt-1 text-xs text-emerald-800">
                Always verify seller emails end with <strong className="text-emerald-950">@saathapp.in</strong> and domain is strictly <strong className="text-emerald-950">https://saathapp.in</strong> or <strong className="text-emerald-950">https://www.saathappnova.co.in</strong>.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Verified Seller FAQs
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Common questions about seller verification, buyer protection, and reporting fraud.
              </p>
            </div>

            <div className="mt-8 space-y-4 max-w-4xl mx-auto">
              {sellerFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-page transition"
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

          {/* Bottom Help Banner */}
          <div className="mt-12 text-center pb-6">
            <p className="text-sm font-medium text-slate-600">
              Need assistance verifying a local merchant?
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <a
                href="mailto:support@saathapp.in"
                className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Mail size={14} /> Contact Trust Support
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
