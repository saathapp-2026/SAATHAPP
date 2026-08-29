import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Headphones, Mail, Phone, Globe, Building, ChevronDown, ChevronUp, CheckCircle2, Clock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const contactsList = [
  {
    icon: <Mail size={28} className="text-emerald-600" />,
    title: 'Customer Support Email',
    value: 'support@saathapp.in',
    link: 'mailto:support@saathapp.in',
    subText: 'Response time within 2 hours (24x7 support)',
  },
  {
    icon: <Building size={28} className="text-emerald-600" />,
    title: 'Business & Partner Enquiries',
    value: 'company@saathapp.in',
    link: 'mailto:company@saathapp.in',
    subText: 'For merchant onboarding & corporate relations',
  },
  {
    icon: <Phone size={28} className="text-emerald-600" />,
    title: 'Official Customer Helpline',
    value: '+91 9128842027',
    link: 'tel:+919128842027',
    subText: 'Toll-free helpline (8 AM – 10 PM IST)',
  },
  {
    icon: <Globe size={28} className="text-emerald-600" />,
    title: 'Official Support Portal',
    value: 'www.saathappnova.co.in/contact',
    link: 'https://www.saathappnova.co.in/contact',
    subText: 'Submit support tickets & track resolution status',
  },
];

const featuresList = [
  {
    icon: '⚠️',
    title: 'Report Fraud & Scams',
    text: 'Found a suspicious call, unauthorized seller, or phishing link?',
    action: 'Report Now',
    link: 'mailto:support@saathapp.in?subject=Report%20Fraud',
    color: 'bg-red-50',
  },
  {
    icon: '🔍',
    title: 'Verify Communication',
    text: 'Check if an email or message is genuinely from SaathApp.',
    action: 'Verify Channel',
    link: '#official-channels',
    color: 'bg-blue-50',
  },
  {
    icon: '📞',
    title: 'Live Support Chat',
    text: 'Get instant official help from our neighborhood support agents 24x7.',
    action: 'Contact Support',
    link: 'tel:+919128842027',
    color: 'bg-emerald-50',
  },
];

const supportFaqs = [
  {
    q: 'Does SaathApp charge money for customer support or job assistance?',
    a: 'No! SaathApp customer support is 100% free. We never ask candidates or users to pay for customer care or job interviews.',
  },
  {
    q: 'How can I verify if a message or email is official?',
    a: 'Official emails end strictly with @saathapp.in, and official websites are https://saathapp.in or https://www.saathappnova.co.in.',
  },
  {
    q: 'What should I do if I receive a fake or suspicious message?',
    a: 'Do not reply, click external links, or share personal OTPs. Forward the details to support@saathapp.in immediately.',
  },
  {
    q: 'Where can I lodge a complaint for order issues or returns?',
    a: 'Go to your Orders tab in the app to raise a dispute, or call +91 9128842027 for instant ticket resolution.',
  },
];

export default function CustomerSupportPage() {
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

      <main className="pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
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
            className="relative overflow-hidden rounded-[36px] bg-[#111827] p-8 text-white shadow-2xl lg:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-400">
                  <Headphones size={18} />
                  24x7 Official Support Desk
                </div>
                <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Customer Support <br />
                  <span className="text-emerald-400">& Trust Center</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  We are here to help you around the clock. Reach out through our official email, helpline, or support portal for fast resolution.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1F2937] px-4 py-3 text-sm font-medium text-slate-200">
                    <Clock size={18} className="text-emerald-400" /> 24x7 Rapid Resolution
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-[#1F2937] px-4 py-3 text-sm font-medium text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400" /> Verified Support Channels
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <div className="relative w-full max-w-sm rounded-3xl bg-[#1F2937] p-6 text-center shadow-xl border border-slate-700/50">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                    <Headphones size={40} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">Need Urgent Help?</h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Call our official helpline or email us directly for quick assistance.
                  </p>
                  <a
                    href="tel:+919128842027"
                    className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
                  >
                    <Phone size={16} /> Call +91 9128842027
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Action Cards */}
          <section className="mt-12">
            <div className="grid md:grid-cols-3 gap-8">
              {featuresList.map((card, i) => (
                <div
                  key={i}
                  className="rounded-[30px] bg-white p-8 border border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${card.color} text-3xl`}>
                      {card.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{card.text}</p>
                  </div>
                  <a
                    href={card.link}
                    className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-6 w-full text-center rounded-xl bg-page py-3 text-xs font-bold text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                  >
                    {card.action}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Channels Grid */}
          <section className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Official Contact Channels
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Connect with our dedicated support team via any of the channels below.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactsList.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{item.title}</h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded mt-2 block break-all text-sm font-bold text-emerald-600 hover:underline"
                  >
                    {item.value}
                  </a>
                  <p className="mt-2 text-[11px] text-slate-500">{item.subText}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Official Channels Verification */}
          <section id="official-channels" className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              🛡️ Official Communication Channels
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-page p-6">
                <h3 className="text-lg font-bold text-slate-900">Website & Apps</h3>
                <p className="mt-2 text-xs text-slate-600">Always check that the URL matches exactly:</p>
                <div className="mt-4 rounded-xl border border-emerald-500 bg-white px-4 py-3 font-bold text-emerald-700 text-sm">
                  https://saathapp.in
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-page p-6">
                <h3 className="text-lg font-bold text-slate-900">Official Emails</h3>
                <p className="mt-2 text-xs text-slate-600">Official support emails always end with:</p>
                <div className="mt-4 rounded-xl border border-blue-500 bg-white px-4 py-3 font-bold text-blue-600 text-sm">
                  @saathapp.in
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-blue-50 py-3 px-4 text-center text-xs font-semibold text-blue-700">
              Note: We will never contact you from personal email accounts (@gmail.com / @yahoo.com) or ask for sensitive passwords.
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-16 rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Quick answers to common support queries.
              </p>
            </div>

            <div className="mt-8 space-y-4 max-w-4xl mx-auto">
              {supportFaqs.map((faq, idx) => (
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

        </div>
      </main>

      <Footer />
    </div>
  );
}
