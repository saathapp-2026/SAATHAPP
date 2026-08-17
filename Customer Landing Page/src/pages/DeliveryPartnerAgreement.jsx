import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  Bike,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  Clock3,
  Compass,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  Gavel,
  Key,
  ListFilter,
  Lock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Truck,
  Umbrella,
  UserX,
  XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'purpose',
    title: '1. Purpose',
    intro: 'This Agreement establishes the terms under which the Company may engage a Rider to perform delivery services through the SaathApp Platform.',
    bullets: [
      'The Company provides a technology-enabled platform for connecting customers, merchants, and delivery partners.',
      'The Rider agrees to provide delivery services in accordance with the Company’s operational standards and applicable law.',
      'The Company may update operational procedures from time to time in a reasonable manner.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    intro: 'Only individuals meeting the eligibility requirements may register as Riders.',
    bullets: [
      'You must be at least 18 years of age and legally entitled to work in the applicable jurisdiction.',
      'You must possess valid identity, address, and financial documents as requested by the Company.',
      'You must have the ability to use the Platform and to carry out delivery obligations safely and responsibly.',
    ],
  },
  {
    id: 'required-documents',
    title: '3. Required Documents',
    intro: 'The Company may request documents required for onboarding, compliance, and verification.',
    bullets: [
      'Government-issued identity proof.',
      'Proof of address.',
      'Vehicle registration and insurance documents where applicable.',
      'Bank account details for payment processing.',
    ],
  },
  {
    id: 'verification',
    title: '4. Verification',
    intro: 'The Company may verify your submitted information and may require additional information at any time.',
    bullets: [
      'The Company may conduct background, identity, and document verification.',
      'You agree to provide accurate and complete information.',
      'Any false or incomplete information may lead to rejection or termination.',
    ],
  },
  {
    id: 'nature-of-engagement',
    title: '5. Nature of Engagement',
    intro: 'Your engagement is independent and does not create an employment relationship with the Company.',
    bullets: [
      'You are an independent contractor unless otherwise required by law.',
      'You remain responsible for your own taxes, insurance, and compliance.',
      'The Company does not guarantee minimum earnings, assignments, or availability.',
    ],
  },
  {
    id: 'delivery-responsibilities',
    title: '6. Delivery Responsibilities',
    intro: 'You are responsible for performing deliveries safely, accurately, and professionally.',
    bullets: [
      'You must collect, inspect, and deliver items as assigned.',
      'You must ensure the item reaches the correct recipient without loss or damage.',
      'You must follow all delivery instructions provided by the Platform or the customer.',
    ],
  },
  {
    id: 'code-of-conduct',
    title: '7. Code of Conduct',
    intro: 'You agree to act professionally and respectfully while using the Platform.',
    bullets: [
      'You must treat customers, merchants, and Company personnel respectfully.',
      'You must not engage in abusive, discriminatory, or unlawful conduct.',
      'You must not misuse the Platform, customer data, or Company materials.',
    ],
  },
  {
    id: 'delivery-timelines',
    title: '8. Delivery Timelines',
    intro: 'You agree to complete deliveries within the applicable expected delivery window.',
    bullets: [
      'You must make reasonable efforts to meet the stated delivery window.',
      'Delays caused by traffic, weather, or other force majeure events may be communicated promptly.',
      'Repeated failures to meet timelines may lead to corrective action.',
    ],
  },
  {
    id: 'vehicle-requirements',
    title: '9. Vehicle Requirements',
    intro: 'If using a vehicle, you must ensure it is safe, registered, and suitable for the delivery activity.',
    bullets: [
      'Your vehicle must comply with applicable registration and licensing requirements.',
      'You must maintain the vehicle in safe working condition.',
      'The Company may require additional documentation for certain vehicle categories.',
    ],
  },
  {
    id: 'safety',
    title: '10. Safety',
    intro: 'Safety is a priority for both the Rider and the public.',
    bullets: [
      'You must wear a seatbelt and follow traffic rules.',
      'You must never carry prohibited items or engage in unsafe behavior.',
      'You must report accidents, injuries, and security incidents immediately.',
    ],
  },
  {
    id: 'working-hours',
    title: '11. Working Hours',
    intro: 'You may accept or decline assignments at your discretion, subject to Platform rules and availability.',
    bullets: [
      'You are free to choose your availability where permitted.',
      'You must keep your profile and availability current.',
      'The Company may impose temporary restrictions for compliance, safety, or operational reasons.',
    ],
  },
  {
    id: 'earnings',
    title: '12. Earnings',
    intro: 'Your earnings shall be determined in accordance with the Company’s applicable payout policy.',
    bullets: [
      'Earnings may depend on completed deliveries, incentives, and applicable deductions.',
      'The Company may revise payout principles in line with business requirements.',
      'You are responsible for understanding the current payout structure before accepting assignments.',
    ],
  },
  {
    id: 'payments',
    title: '13. Payments',
    intro: 'Payments will be processed through the Company’s designated payment methods and timelines.',
    bullets: [
      'The Company may process payments subject to verification and compliance checks.',
      'You must ensure your payment details are accurate and up to date.',
      'The Company may withhold or adjust payments where required by law or operational policy.',
    ],
  },
  {
    id: 'customer-privacy',
    title: '14. Customer Privacy',
    intro: 'You must protect all customer and Platform information entrusted to you.',
    bullets: [
      'You must use customer data only for the delivery purpose and as permitted by law.',
      'You must not share customer information with unauthorized third parties.',
      'Any misuse of personal data may constitute a serious breach.',
    ],
  },
  {
    id: 'prohibited-activities',
    title: '15. Prohibited Activities',
    intro: 'Certain activities are strictly prohibited while operating on the Platform.',
    bullets: [
      'You must not use the Platform for unlawful or fraudulent purposes.',
      'You must not impersonate customers, merchants, or Company personnel.',
      'You must not tamper with orders, payments, or delivery records.',
    ],
  },
  {
    id: 'uniform-and-identification',
    title: '16. Uniform and Identification',
    intro: 'The Company may prescribe identification and uniform requirements for Riders.',
    bullets: [
      'You may be required to display identification while providing services.',
      'You may be required to wear a Company-approved uniform or badge where applicable.',
      'Failure to comply may affect your ability to continue on the Platform.',
    ],
  },
  {
    id: 'suspension-and-termination',
    title: '17. Suspension and Termination',
    intro: 'The Company may suspend or terminate your access to the Platform for breaches or operational reasons.',
    bullets: [
      'The Company may suspend your account pending investigation.',
      'You may be terminated for non-compliance, misconduct, or repeated operational failures.',
      'You may also terminate your access by following the Platform’s withdrawal process.',
    ],
  },
  {
    id: 'liability',
    title: '18. Liability',
    intro: 'You are responsible for your conduct, actions, and omissions while providing services.',
    bullets: [
      'You agree to indemnify the Company for losses arising from your breach of this Agreement.',
      'The Company shall not be liable for indirect or consequential damages arising from your use of the Platform.',
      'Your liability is subject to applicable law and the limits stated by the Company.',
    ],
  },
  {
    id: 'insurance',
    title: '19. Insurance',
    intro: 'You are responsible for arranging any insurance required for your vehicle and activities.',
    bullets: [
      'The Company may require proof of insurance where applicable.',
      'You are responsible for maintaining coverage as required by law.',
      'The Company may provide guidance, but does not guarantee insurance coverage.',
    ],
  },
  {
    id: 'confidentiality',
    title: '20. Confidentiality',
    intro: 'You must maintain the confidentiality of information received through the Platform.',
    bullets: [
      'You must not disclose confidential information without authorization.',
      'You must protect Company, merchant, and customer information from misuse.',
      'You must return or delete such information upon request or termination.',
    ],
  },
  {
    id: 'changes-to-this-agreement',
    title: '21. Changes to this Agreement',
    intro: 'The Company may revise this Agreement from time to time.',
    bullets: [
      'Changes may be posted on the Platform or communicated by other reasonable means.',
      'Your continued use of the Platform after changes are published constitutes acceptance.',
      'You should review the latest version periodically.',
    ],
  },
  {
    id: 'governing-law',
    title: '22. Governing Law',
    intro: 'This Agreement shall be governed by the laws of India.',
    bullets: [
      'Any dispute shall be resolved in accordance with applicable Indian law.',
      'The courts in the relevant jurisdiction may have authority to hear disputes.',
      'The Company may seek injunctive or other relief where appropriate.',
    ],
  },
  {
    id: 'contact-information',
    title: '23. Contact Information',
    intro: 'Please contact the Company using the details below for support or questions.',
    bullets: [
      'Customer Support: support@saathapp.in',
      'Partner Support: company@saathapp.in',
      'Phone / WhatsApp: +91 9128842027',
      'Registered Office: Bhatahar, Tharthari, Nalanda, Bihar – 801307, India',
    ],
  },
];

const sectionIconMap = {
  purpose: Compass,
  eligibility: CheckCircle,
  'required-documents': FileCheck,
  verification: ShieldCheck,
  'nature-of-engagement': Briefcase,
  'delivery-responsibilities': Truck,
  'code-of-conduct': BookOpen,
  'delivery-timelines': Clock,
  'vehicle-requirements': Bike,
  safety: ShieldAlert,
  'working-hours': Calendar,
  earnings: DollarSign,
  payments: CreditCard,
  'customer-privacy': Lock,
  'prohibited-activities': XCircle,
  'uniform-and-identification': BadgeCheck,
  'suspension-and-termination': UserX,
  liability: Scale,
  insurance: Umbrella,
  confidentiality: Key,
  'changes-to-this-agreement': RefreshCw,
  'governing-law': Gavel,
  'contact-information': Mail,
};

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-3">
      {items.map((bullet, index) => (
        <li key={index} className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.7] text-slate-700 font-normal">
          <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-700" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DeliveryPartnerAgreement({ isAuthenticated = false, user = null, darkMode = false, toggleDarkMode = () => { } }) {
  const [activeSection, setActiveSection] = useState('purpose');
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    document.title = 'Delivery Partner Agreement | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the SaathApp Delivery Partner Agreement covering onboarding, responsibilities, safety, payments, and policies for riders.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Read the SaathApp Delivery Partner Agreement covering onboarding, responsibilities, safety, payments, and policies for riders.';
      document.head.appendChild(meta);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - viewportHeight;
      const nextProgress = fullHeight > 0 ? (scrollTop / fullHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
      setShowScrollTop(scrollTop > 500);

      const current = sectionRefs.current.find((node) => {
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom > 160;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -96;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tocItems = useMemo(() => sections.map((section) => ({ id: section.id, title: section.title })), []);

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800">
      <Header
        cartCount={0}
        onCartClick={() => { }}
        location="Bhatahar, Nalanda"
        onLocationClick={() => { }}
        onSearch={() => { }}
        onLogin={() => { }}
        onSignup={() => { }}
        onProfile={() => { }}
        user={user}
        isAuthenticated={isAuthenticated}
        onCartPage={() => { }}
        onOrdersPage={() => { }}
        onWishlistPage={() => { }}
        onSettingsPage={() => { }}
        onLogout={() => { }}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => { }}
        onImageSearchClick={() => { }}
      />

      <div className="sticky top-0 z-40 h-1 w-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-100/90 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-7 md:p-10 text-white shadow-xl"
        >
          {/* Decorative Background Accents */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex justify-between items-center">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4.5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/30"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <Sparkles size={14} />
                Legal & Partner Framework
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Delivery Partner (Rider) Agreement
                </h1>
                <p className="mt-3.5 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                  Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us"). This Delivery Partner (Rider) Agreement ("Agreement") sets forth the terms and conditions governing the relationship between SAATHAPPNOVA PRIVATE LIMITED and individuals who register as Delivery Partners ("Rider", "Delivery Partner", "you", or "your") on the SaathApp Platform. By registering or accepting deliveries through the Platform, you acknowledge that you have read, understood, and agreed to this Agreement.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs md:text-sm font-medium text-slate-200 backdrop-blur-md">
                    <BadgeCheck size={16} className="text-emerald-400" />
                    Effective Date: 25 July 2026
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs md:text-sm font-medium text-slate-200 backdrop-blur-md">
                    <ScrollText size={16} className="text-emerald-400" />
                    Last Updated: 25 July 2026
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <FileText size={22} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Company</p>
                    <h2 className="text-lg font-extrabold text-white">SAATHAPPNOVA PRIVATE LIMITED</h2>
                  </div>
                </div>
                <div className="mt-6 space-y-3.5 text-sm text-slate-200 font-normal">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={18} className="shrink-0 text-emerald-400" />
                    <span>support@saathapp.in</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={18} className="shrink-0 text-emerald-400" />
                    <span>+91 9128842027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mobile Horizontal Quick-Jump Bar */}
        <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs mb-6 overflow-x-auto scrollbar-none flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase shrink-0 flex items-center gap-1">
            <ListFilter size={13} className="text-emerald-700" />
            Nav:
          </span>
          {tocItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`shrink-0 text-xs px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer relative z-10 ${isActive
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-page text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {item.title.split('.')[0]}. {item.title.split('. ')[1] || item.title}
              </a>
            );
          })}
        </div>

        {/* 2-Column Grid Layout for Desktop Sidebar & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sticky Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] max-h-[calc(100vh-7rem)] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100/90 mb-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ListFilter size={15} className="text-emerald-700" />
                  <span>Table of Contents</span>
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/50 shadow-2xs">
                  23 Sections
                </span>
              </div>
              <nav className="overflow-y-auto space-y-1.5 pr-1.5 pb-6 custom-scrollbar flex-1 text-xs">
                {tocItems.map((item) => {
                  const IconComponent = sectionIconMap[item.id] || FileText;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-medium transition-all duration-200 cursor-pointer relative z-10 select-none text-xs sm:text-[13px] ${isActive
                        ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/60 text-emerald-900 font-bold border-l-4 border-emerald-700 shadow-2xs shadow-emerald-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                        }`}
                    >
                      <IconComponent
                        size={16}
                        className={isActive ? 'text-emerald-700 shrink-0' : 'text-slate-400 shrink-0'}
                      />
                      <span className="truncate">{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* 23 Detailed Policy Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = sectionIconMap[section.id] || (index % 2 === 0 ? ShieldCheck : Truck);
                const isActive = activeSection === section.id;
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    ref={(node) => {
                      sectionRefs.current[index] = node;
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    className={`scroll-mt-24 rounded-3xl border ${isActive
                      ? 'border-emerald-400/80 shadow-[0_8px_30px_-6px_rgba(46,125,50,0.12)] border-l-4 border-l-emerald-600'
                      : 'border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                      } bg-white p-7 md:p-9 transition-all duration-300 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] hover:border-emerald-200/80`}
                  >
                    <div className="flex items-start gap-4.5">
                      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                        <IconComponent size={21} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pb-3.5 border-b border-slate-100/90 mb-3">
                          {section.title}
                        </h3>
                        <p className="mt-3.5 text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">{section.intro}</p>
                        <BulletList items={section.bullets} />
                      </div>
                    </div>
                  </motion.section>
                );
              })}

              {/* Delivery Partner Declaration Card */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-7 md:p-9 text-white shadow-2xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400" />
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Clock3 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">Delivery Partner Declaration</h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal">I acknowledge and agree to comply with all terms of this Agreement.</p>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm sm:text-[15px] leading-[1.8] text-slate-200 font-normal backdrop-blur-xs">
                  By signing up as a Delivery Partner and using the SaathApp Platform, I confirm that I have read, understood, and accepted the obligations, responsibilities, and restrictions described in this Agreement. I understand that the Company may suspend, limit, or terminate my access for violations of this Agreement or for operational reasons.
                </div>
              </motion.section>

              {/* Company Contact Information Card */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-3xl border border-emerald-200/90 bg-emerald-50/60 p-7 md:p-9 shadow-xs"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contact</p>
                <h3 className="mt-1.5 text-2xl font-extrabold text-slate-900 tracking-tight">Company Contact Information</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</p>
                    <p className="mt-1.5 text-sm font-bold text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Office</p>
                    <p className="mt-1.5 flex items-start gap-2 text-sm text-slate-800 font-medium">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-700" />
                      <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Support</p>
                    <p className="mt-1.5">
                      <a href="mailto:support@saathapp.in" className="inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
                        <Mail size={16} />
                        <span>support@saathapp.in</span>
                      </a>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Partner Support</p>
                    <p className="mt-1.5">
                      <a href="mailto:company@saathapp.in" className="inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
                        <Mail size={16} />
                        <span>company@saathapp.in</span>
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone / WhatsApp</p>
                  <p className="mt-1.5 flex items-center gap-2 font-semibold text-slate-800">
                    <Phone size={18} className="shrink-0 text-emerald-700" />
                    <span>+91 9128842027</span>
                  </p>
                </div>
              </motion.section>
            </div>

            {/* Bottom Actions Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 pb-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-page hover:border-slate-300"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4.5 py-3 text-sm font-semibold text-emerald-800 shadow-2xs transition hover:bg-emerald-100/90"
              >
                <ArrowUp size={16} />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800">
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
