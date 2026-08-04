import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Lock, CreditCard, Shield, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Mail, RefreshCw, Key } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const paymentFeatures = [
  {
    icon: <Lock size={24} className="text-emerald-500" />,
    title: '256-Bit SSL Encryption',
    desc: 'All online payment data, UPI credentials, and card info are encrypted using bank-grade 256-bit SSL protocols.',
  },
  {
    icon: <Shield size={24} className="text-emerald-500" />,
    title: 'PCI-DSS Compliant Gateway',
    desc: 'Transactions are processed via RBI-licensed PCI-DSS certified payment gateways (Razorpay/UPI/Cards).',
  },
  {
    icon: <RefreshCw size={24} className="text-emerald-500" />,
    title: 'Instant Refund Processing',
    desc: 'Cancelled orders or failed transactions are automatically refunded back to source accounts within SLA timelines.',
  },
  {
    icon: <Key size={24} className="text-emerald-500" />,
    title: 'No Sensitive Data Stored',
    desc: 'SaathApp never stores CVVs, UPI PINs, or net banking passwords on our servers.',
  },
];

const safetyGuidelines = [
  {
    title: 'Verify UPI & Payment Links',
    text: 'Only pay through official checkout links inside the SaathApp application or website (https://saathapp.in). Never transfer funds to personal UPI IDs.',
  },
  {
    title: 'Beware of Fake Refund Calls',
    text: 'SaathApp representatives will NEVER call asking for your UPI PIN, OTP, or CVV to process a refund or credit bonus.',
  },
  {
    title: 'Check Official Handles',
    text: 'Official payment notifications and invoices originate strictly from @saathapp.in email addresses or in-app notifications.',
  },
  {
    title: 'Report Payment Anomalies',
    text: 'If money was deducted for a failed transaction, your bank automatically reconciles it. You can also log a support ticket instantly.',
  },
];

const paymentFaqs = [
  {
    q: 'What payment options are supported on SaathApp?',
    a: 'We accept UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking across major banks, and Cash on Delivery (COD).',
  },
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes, Cash on Delivery is available for most hyperlocal products and technician services across supported pincodes.',
  },
  {
    q: 'How long does a refund take for a cancelled transaction?',
    a: 'UPI and Wallet refunds take 15 minutes to 2 hours. Card and Net Banking refunds take 2-4 business days depending on your issuing bank.',
  },
  {
    q: 'What should I do if money is deducted but my order is not confirmed?',
    a: 'Don’t panic! Unconfirmed orders automatically trigger an immediate reversal. You can check the transaction status under the Orders tab.',
  },
];

export default function SecureOnlinePaymentsPage() {
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
            className="relative overflow-hidden rounded-[36px] bg-[#0A192F] p-8 text-white shadow-2xl lg:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-400">
                  <Lock size={18} />
                  Bank-Grade Payment Security
                </div>
                <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Secure Online <br />
                  <span className="text-emerald-400">Payments & Transactions</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Shop with total confidence. SaathApp utilizes multi-layered SSL encryption, 3D Secure authentication, and RBI-regulated payment gateways for all orders.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-[#172A45] px-4 py-3 text-sm font-medium text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400" /> 100% Payment Protection
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-[#172A45] px-4 py-3 text-sm font-medium text-slate-200">
                    <CreditCard size={18} className="text-emerald-400" /> Razorpay & UPI Verified
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <div className="relative w-full max-w-sm rounded-3xl bg-[#172A45] p-6 text-center shadow-xl border border-slate-700/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                    <CreditCard size={40} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">Safe Checkout Guarantee</h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Zero-cost cancellation refunds and encrypted gateway processing.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950">
                    <ShieldCheck size={16} /> 256-Bit SSL Secured
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <section className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Our Security Infrastructure
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                How we keep your payments safe and private at every step.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paymentFeatures.map((feat, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                    {feat.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{feat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <AlertCircle size={26} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Safe Payment Checklist
                </h2>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Crucial safety habits to protect your bank account and UPI details.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {safetyGuidelines.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Payment Security FAQs
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Answers to common questions regarding transactions, refunds, and card safety.
              </p>
            </div>

            <div className="mt-8 space-y-4 max-w-4xl mx-auto">
              {paymentFaqs.map((faq, idx) => (
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
              Disputed transaction or payment issues?
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <a
                href="mailto:support@saathapp.in"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Mail size={14} /> Email Payment Helpdesk
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
