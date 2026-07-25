import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, FileText, ShieldCheck, Truck, Clock3, BadgeCheck, Sparkles, ScrollText, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
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
      'Partner Support: Company@saathapp.in',
      'Phone / WhatsApp: +91 9128842027',
      'Registered Office: Bhatahar, Tharthari, Nalanda, Bihar – 801307, India',
    ],
  },
];

export default function DeliveryPartnerAgreement() {
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
        return rect.top <= 140 && rect.bottom > 140;
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

  const tocItems = useMemo(() => sections.map((section) => ({ id: section.id, title: section.title })), []);

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

      <div className="sticky top-0 z-40 h-1 w-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-primary transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 shadow-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
                <Sparkles size={16} />
                Legal & Partner Framework
              </div>
              <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                Delivery Partner (Rider) Agreement
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us"). This Delivery Partner (Rider) Agreement ("Agreement") sets forth the terms and conditions governing the relationship between SAATHAPPNOVA PRIVATE LIMITED and individuals who register as Delivery Partners ("Rider", "Delivery Partner", "you", or "your") on the SaathApp Platform. By registering or accepting deliveries through the Platform, you acknowledge that you have read, understood, and agreed to this Agreement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
                  <BadgeCheck size={16} className="text-primary" />
                  Effective Date: 25 July 2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
                  <ScrollText size={16} className="text-primary" />
                  Last Updated: 25 July 2026
                </span>
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Company</p>
                  <h2 className="text-lg font-black text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</h2>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-primary" />
                  <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 text-primary" />
                  <span>support@saathapp.in</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 text-primary" />
                  <span>+91 9128842027</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                <FileText size={16} className="text-primary" />
                Table of Contents
              </div>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={`block rounded-2xl px-3 py-2 text-sm transition ${activeSection === item.id ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                ref={(node) => {
                  sectionRefs.current[index] = node;
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {index % 2 === 0 ? <ShieldCheck size={18} /> : <Truck size={18} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-900">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{section.intro}</p>
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li key={`${section.id}-${bulletIndex}`} className="flex items-start gap-2 text-sm text-slate-700">
                          <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.section>
            ))}

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Clock3 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black">Delivery Partner Declaration</h3>
                  <p className="text-sm text-slate-300">I acknowledge and agree to comply with all terms of this Agreement.</p>
                </div>
              </div>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-5 text-sm leading-7 text-slate-200">
                By signing up as a Delivery Partner and using the SaathApp Platform, I confirm that I have read, understood, and accepted the obligations, responsibilities, and restrictions described in this Agreement. I understand that the Company may suspend, limit, or terminate my access for violations of this Agreement or for operational reasons.
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="rounded-[24px] border border-primary/20 bg-primary/5 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">Contact</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">Company Contact Information</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-900">Company</p>
                    <p className="mt-2 text-sm text-slate-600">SAATHAPPNOVA PRIVATE LIMITED</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-900">Registered Office</p>
                    <p className="mt-2 text-sm text-slate-600">Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-900">Customer Support</p>
                    <p className="mt-2 text-sm text-slate-600">support@saathapp.in</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-900">Partner Support</p>
                    <p className="mt-2 text-sm text-slate-600">Company@saathapp.in</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Phone / WhatsApp</p>
                  <p className="mt-2">+91 9128842027</p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {showScrollTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:opacity-90">
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
