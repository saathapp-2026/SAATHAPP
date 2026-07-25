import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cpu,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Wrench,
  MessageCircleQuestion,
  Wallet,
  LifeBuoy,
  Bike,
  RotateCcw,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const faqSections = [
  {
    title: 'General Questions',
    icon: CircleHelp,
    items: [
      {
        question: 'What is SaathApp?',
        answer: 'SaathApp is a hyperlocal super app that brings together groceries, construction hardware, seeds, agricultural supplies, and on-demand professional services in one place.',
      },
      {
        question: 'How do I start using SaathApp?',
        answer: 'Create an account, verify your mobile number, set your location, and choose the services or products you want to shop for.',
      },
    ],
  },
  {
    title: 'Orders',
    icon: ShoppingBag,
    items: [
      {
        question: 'How can I track my order?',
        answer: 'You can track your order from the Orders section in your profile once the seller or delivery partner has accepted it.',
      },
      {
        question: 'Can I modify or cancel an order after placing it?',
        answer: 'Order modifications and cancellations depend on the vendor’s acceptance and the current fulfilment stage. Please contact support as soon as possible.',
      },
    ],
  },
  {
    title: 'Payments',
    icon: Wallet,
    items: [
      {
        question: 'What payment methods are supported?',
        answer: 'SaathApp supports UPI, debit and credit cards, net banking, wallet payments, and cash on delivery where available.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes. Payments are processed through secure channels and SaathApp does not store your sensitive card information.',
      },
    ],
  },
  {
    title: 'Delivery',
    icon: Truck,
    items: [
      {
        question: 'How long does delivery take?',
        answer: 'Delivery times vary based on your location, item availability, and the type of service or delivery selected.',
      },
      {
        question: 'Can I change my delivery address after ordering?',
        answer: 'Yes, if the order has not yet been assigned or packed. Please contact support promptly to request a change.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    icon: RotateCcw,
    items: [
      {
        question: 'What is the return policy?',
        answer: 'Returns are subject to the product category, condition of the item, and seller policy. Some products may be non-returnable.',
      },
      {
        question: 'How are refunds processed?',
        answer: 'Refunds are processed to the original payment method once the return or cancellation request is approved.',
      },
    ],
  },
  {
    title: 'Services',
    icon: Wrench,
    items: [
      {
        question: 'How do I book a service professional?',
        answer: 'Select a service category, choose a professional or service package, and complete the booking from the service detail page.',
      },
      {
        question: 'What if the service is not completed as expected?',
        answer: 'You can raise a support request through the order or service details page and our team will assist you.',
      },
    ],
  },
  {
    title: 'Seller Questions',
    icon: Store,
    items: [
      {
        question: 'How can I become a seller on SaathApp?',
        answer: 'Use the Become Seller option in the app or website and complete the onboarding process with your business information.',
      },
      {
        question: 'How are seller payouts handled?',
        answer: 'Seller payouts are processed according to the agreed settlement cycle and the verification status of the seller account.',
      },
    ],
  },
  {
    title: 'Delivery Partner Questions',
    icon: Bike,
    items: [
      {
        question: 'How do I join as a delivery partner?',
        answer: 'Apply through the delivery partner registration form and complete the verification steps for the onboarding process.',
      },
      {
        question: 'How are delivery assignments managed?',
        answer: 'Assignments are routed based on availability, location, and delivery priority so that orders can be fulfilled efficiently.',
      },
    ],
  },
  {
    title: 'Account & Privacy',
    icon: ShieldCheck,
    items: [
      {
        question: 'How do I update my account details?',
        answer: 'You can update your profile, address, and contact details from the Profile section in the app.',
      },
      {
        question: 'How is my personal data protected?',
        answer: 'SaathApp follows privacy practices designed to protect account information and limit the sharing of personal data.',
      },
    ],
  },
  {
    title: 'Technical Support',
    icon: Cpu,
    items: [
      {
        question: 'The app is not loading properly. What should I do?',
        answer: 'Refresh the app, verify your internet connection, and try again. If the issue continues, contact customer support with the app version and device details.',
      },
      {
        question: 'I am unable to receive OTPs.',
        answer: 'Check your mobile network connection and make sure your phone can receive SMS or phone calls. You can also request a new OTP.',
      },
    ],
  },
  {
    title: 'Contact Us',
    icon: MessageCircleQuestion,
    items: [
      {
        question: 'How can I contact SaathApp support?',
        answer: 'You can reach our support team by email, phone, or WhatsApp using the details listed below.',
      },
      {
        question: 'What are the support hours?',
        answer: 'Support is available Monday to Saturday from 9:00 AM to 7:00 PM IST. Limited support is available on Sundays and public holidays.',
      },
    ],
  },
  {
    title: 'Still Need Help?',
    icon: LifeBuoy,
    items: [
      {
        question: 'What if I cannot find the answer I need?',
        answer: 'Our Customer Support team is ready to help with genuine queries, issues, and account support requests.',
      },
    ],
  },
];

export default function Faq({ onBack }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openSection, setOpenSection] = useState('General Questions');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.title = 'Frequently Asked Questions | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse the SaathApp FAQ for answers about orders, payments, delivery, returns, service bookings, seller support, delivery partners, account privacy, and technical help.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Browse the SaathApp FAQ for answers about orders, payments, delivery, returns, service bookings, seller support, delivery partners, account privacy, and technical help.';
      document.head.appendChild(meta);
    }
    const handleScroll = () => setShowScrollTop(window.scrollY > 320);
    window.addEventListener('scroll', handleScroll);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSections = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    if (!normalizedQuery) return faqSections;

    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const haystack = `${item.question} ${item.answer}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchTerm]);

  const handleToggleSection = (title) => {
    setOpenSection((current) => (current === title ? '' : title));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ scrollBehavior: 'smooth' }}>
      <Header
        cartCount={0}
        onCartClick={() => {}}
        location="Bhatahar, Nalanda"
        onLocationClick={() => {}}
        onSearch={() => {}}
        onLogin={() => {}}
        onSignup={() => {}}
        isAuthenticated={false}
        onProfile={() => {}}
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

      <div className="fixed left-4 top-24 z-40 hidden lg:block">
        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => (onBack ? onBack() : navigate('/', { replace: true }))}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>
      </div>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-8 text-white shadow-[0_20px_70px_rgba(16,185,129,0.18)] sm:p-10 lg:p-12"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em]">
                  <CircleHelp size={16} />
                  Help Center
                </div>
                <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Frequently Asked Questions (FAQ)</h1>
                <p className="mt-4 text-lg text-emerald-50/95">Last Updated: 25 July 2026</p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
                  Welcome to the SaathApp Help Center. Here you will find answers to the most common questions about shopping, selling, services, delivery, payments, refunds, and account management.
                </p>
                <p className="mt-3 max-w-2xl text-base leading-8 text-emerald-50/90">
                  If your question is not answered below, please contact our Customer Support.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Support</p>
                    <p className="text-lg font-black">Fast & Reliable</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <label className="mb-4 block text-sm font-semibold text-slate-600" htmlFor="faq-search">
              Search answers in real time
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
              <CircleHelp size={18} className="text-emerald-600" />
              <input
                id="faq-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by keyword, topic, or issue"
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </motion.section>

          <div className="space-y-4">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => {
                const Icon = section.icon;
                const isOpen = openSection === section.title;
                return (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.06)]"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleSection(section.title)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50 sm:px-8"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900">{section.title}</p>
                          <p className="text-sm text-slate-500">{section.items.length} answer{section.items.length === 1 ? '' : 's'}</p>
                        </div>
                      </div>
                      <ChevronDown size={18} className={`shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
                            <div className="space-y-3">
                              {section.items.map((item) => (
                                <div key={item.question} className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white">
                                  <div className="flex items-start gap-2">
                                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                                    <div>
                                      <p className="text-sm font-black text-slate-900">{item.question}</p>
                                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                );
              })
            ) : (
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-[0_15px_45px_rgba(15,23,42,0.06)]">
                <p className="text-lg font-semibold text-slate-900">No FAQ results found.</p>
                <p className="mt-2">Try a different keyword or browse the categories above.</p>
              </div>
            )}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 text-white shadow-[0_20px_65px_rgba(15,23,42,0.14)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Clock3 size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Contact</p>
                <h2 className="text-2xl font-black">Contact Us</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-black">Company</p>
                <p className="mt-2 text-sm text-slate-300">SAATHAPPNOVA PRIVATE LIMITED</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-black">Registered Office</p>
                <p className="mt-2 text-sm text-slate-300">Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-black">Customer Support</p>
                <p className="mt-2 text-sm text-slate-300">support@saathapp.in</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-black">Business Enquiries</p>
                <p className="mt-2 text-sm text-slate-300">company@saathapp.in</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><Phone size={16} className="text-emerald-300" /> +91 9128842027</span>
              <span className="inline-flex items-center gap-2"><Mail size={16} className="text-emerald-300" /> support@saathapp.in</span>
              <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-emerald-300" /> Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <LifeBuoy size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Still Need Help?</p>
                <h2 className="text-2xl font-black">Still Need Help?</h2>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-slate-600">
              <p className="text-base leading-8">
                If you could not find the answer you were looking for, our Customer Support team is here to help.
              </p>
              <p className="text-base leading-8">
                Visit the Contact Us page or reach out using the contact details above.
              </p>
              <p className="text-base leading-8">
                We aim to respond to all genuine support requests as quickly as possible.
              </p>
            </div>
          </motion.section>
        </div>
      </main>

      {showScrollTop && (
        <div className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl justify-center">
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300"
            >
              <ArrowUp size={16} />
              Scroll to Top
            </motion.button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
