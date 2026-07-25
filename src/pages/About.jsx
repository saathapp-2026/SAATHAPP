import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, CheckCircle2, ChevronRight, Clock3, FileText, Mail, MapPin, Phone, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const policySections = [
  {
    title: '1. Purpose',
    body: 'This Service Warranty Policy explains the warranty, revisit, complaint resolution, and support process for services booked through the SaathApp Platform.',
    bullets: [
      'The policy outlines how warranty support is handled for eligible services.',
      'It provides the framework for customer service, revisit requests, and issue resolution.',
      'It is intended to create transparency between the customer, SaathApp, and the service professional.'
    ]
  },
  {
    title: '2. Scope',
    body: 'This Policy applies only to eligible services where a warranty is specifically mentioned at the time of booking. It does not create a universal warranty for all services.',
    bullets: [
      'Warranty benefits apply only when the booking clearly states that a warranty or service guarantee is included.',
      'The policy does not apply to services that are excluded by the booking terms or service description.',
      'The Company may update the scope of warranty coverage for specific service categories where required.'
    ]
  },
  {
    title: '3. Warranty Period',
    body: 'The warranty period for eligible services will be communicated at the time of booking and may vary depending on the service category.',
    bullets: [
      'The warranty period begins from the date of service completion.',
      'Warranty timelines are subject to the terms listed in the booking confirmation.',
      'Any extension or additional warranty benefit must be explicitly stated in writing.'
    ]
  },
  {
    title: '4. What Is Covered',
    body: 'Warranty support may cover defects, issues, or failures arising from service workmanship or installation defects where such issues are directly attributable to the service provided.',
    bullets: [
      'Coverage may include defects that appear due to faulty workmanship or incorrect installation.',
      'Issues that fall within the stated warranty terms may be eligible for a revisit or corrective action.',
      'Coverage must be validated by the Company before warranty support is processed.'
    ]
  },
  {
    title: '5. What Is Not Covered',
    body: 'Certain issues are not covered by warranty and may be treated as chargeable service requests or excluded matters.',
    bullets: [
      'Normal wear and tear or natural depreciation.',
      'Damage caused by misuse, negligence, accidental impact, or unauthorized alterations.',
      'Problems caused by third-party repairs or unapproved third-party components.'
    ]
  },
  {
    title: '6. Spare Parts',
    body: 'Any spare parts required to complete warranty work will be handled according to the service terms and availability.',
    bullets: [
      'Spare parts may be supplied by the service professional or the Company, depending on the booking terms.',
      'The customer may be responsible for the cost of parts if the issue is not covered under warranty.',
      'Replacement parts must be compatible with the original service requirement.'
    ]
  },
  {
    title: '7. Revisit Policy',
    body: 'A revisit may be arranged where a service issue is validated and falls within the scope of the warranty.',
    bullets: [
      'Revisit requests must be raised within the warranty period and in accordance with the booking terms.',
      'The Company may schedule a revisit based on technician availability and service category.',
      'Repeated revisit requests for the same issue may result in further assessment.'
    ]
  },
  {
    title: '8. Warranty Claim Process',
    body: 'Customers may raise a warranty claim through the SaathApp Platform by submitting the issue with supporting details.',
    bullets: [
      'The customer must provide the booking reference, service details, and issue description.',
      'The Company may request photographs, videos, or additional information to evaluate the claim.',
      'Claims will be reviewed on a case-by-case basis and communicated to the customer promptly.'
    ]
  },
  {
    title: '9. Inspection',
    body: 'The Company or service professional may inspect the issue before deciding whether the matter qualifies for warranty support.',
    bullets: [
      'Inspection may be done remotely or in person depending on the nature of the issue.',
      'The customer is expected to provide reasonable access to the affected area or item.',
      'Failure to cooperate may delay or invalidate the warranty claim.'
    ]
  },
  {
    title: '10. Resolution Options',
    body: 'Where a warranty claim is approved, the Company may offer one or more appropriate resolution options.',
    bullets: [
      'A free revisit or corrective service visit.',
      'Replacement or repair of the affected component where applicable.',
      'A refund, credit, or alternative resolution where the Company determines it is appropriate.'
    ]
  },
  {
    title: '11. Customer Responsibilities',
    body: 'Customers are expected to cooperate with the Company and service professional during the warranty process.',
    bullets: [
      'Customers must provide accurate information about the issue and the service performed.',
      'They must ensure that the affected item or area is accessible for support.',
      'They must avoid tampering with the service outcome or making unauthorized repairs.'
    ]
  },
  {
    title: '12. Service Professional Responsibilities',
    body: 'Service professionals are expected to perform work professionally and in accordance with the service standards applicable to the booking.',
    bullets: [
      'They must conduct the service responsibly and with reasonable care.',
      'They must follow the agreed scope of work and documented service instructions.',
      'They must communicate any issues that may affect warranty support clearly and promptly.'
    ]
  },
  {
    title: '13. Situations Where Warranty May Be Declined',
    body: 'The Company may decline warranty support in certain situations where the issue falls outside the policy or cannot be validated.',
    bullets: [
      'If the issue is caused by misuse, unauthorized modification, or external damage.',
      'If the service has been completed beyond the stated warranty window.',
      'If the customer fails to provide required information or access to inspect the issue.'
    ]
  },
  {
    title: '14. Cancellation of Warranty Visit',
    body: 'If a scheduled warranty visit is cancelled or postponed by the customer without reasonable notice, the Company may reschedule or decline the visit.',
    bullets: [
      'Repeated cancellations may affect future warranty support eligibility.',
      'The Company may charge a rescheduling fee where applicable under the booking terms.',
      'The Company may issue an alternative resolution if the visit cannot be completed.'
    ]
  },
  {
    title: '15. Limitation of Liability',
    body: 'To the extent permitted by law, the Company shall not be liable for indirect, incidental, or consequential damages arising from warranty-related service issues.',
    bullets: [
      'The Company’s liability for warranty-related matters shall be limited to the remedies expressly provided in this Policy.',
      'The Company does not guarantee uninterrupted service or the complete absence of future issues.',
      'Any limitation of liability is subject to applicable law.'
    ]
  },
  {
    title: '16. Changes to This Policy',
    body: 'The Company may revise or update this Policy from time to time in response to operational, legal, or business requirements.',
    bullets: [
      'Changes will be published through the Platform or other reasonable communication channels.',
      'Continued use of the Platform after the change constitutes acceptance of the updated policy.',
      'Customers are encouraged to review the latest version before raising a warranty claim.'
    ]
  },
  {
    title: '17. Governing Law',
    body: 'This Policy shall be governed by the laws of India.',
    bullets: [
      'Any dispute arising under this Policy shall be resolved in accordance with applicable Indian law.',
      'The Company may seek appropriate legal remedies where necessary.',
      'The policy is intended to operate in a manner consistent with applicable consumer protection and service laws.'
    ]
  },
  {
    title: '18. Contact Us',
    body: 'For service warranty support, customer assistance, or policy-related questions, please contact the Company using the details below.',
    bullets: [
      'Customer Support: support@saathapp.in',
      'Partner Support: company@saathapp.in',
      'Phone / WhatsApp: +91 9128842027',
      'Registered Office: Bhatahar, Tharthari, Nalanda, Bihar – 801307, India'
    ]
  },
  {
    title: '19. Customer Acknowledgement',
    body: 'By booking a service through SaathApp, you acknowledge that you have read, understood, and agreed to this Service Warranty Policy.',
    bullets: [
      'You agree to comply with the policy and any additional service terms communicated by SaathApp.',
      'You understand that warranty support is subject to eligibility, verification, and the applicable booking conditions.',
      'You accept that the Company may resolve warranty issues in a manner consistent with this policy and applicable law.'
    ]
  }
];

export default function About({ onBack, onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Service Warranty Policy | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the SaathApp Service Warranty Policy covering warranty coverage, revisit support, inspection, claims, and customer responsibilities.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Read the SaathApp Service Warranty Policy covering warranty coverage, revisit support, inspection, claims, and customer responsibilities.';
      document.head.appendChild(meta);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
        onLogout={onLogout}
        darkMode={false}
        toggleDarkMode={() => {}}
        onVoiceSearchClick={() => {}}
        onImageSearchClick={() => {}}
      />

      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={() => (onBack ? onBack() : navigate('/', { replace: true }))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
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
                  <ShieldCheck size={16} />
                  SaathApp Policy
                </div>
                <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Service Warranty Policy</h1>
                <p className="mt-4 text-lg text-emerald-50/95">Effective Date: 25 July 2026</p>
                <p className="text-lg text-emerald-50/95">Last Updated: 25 July 2026</p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50/90">
                  Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Service Warranty Policy explains the warranty, revisit, complaint resolution, and support process for services booked through the SaathApp Platform.
                </p>
                <p className="mt-3 max-w-2xl text-base leading-8 text-emerald-50/90">
                  This Policy applies only to eligible services where a warranty is specifically mentioned at the time of booking. It does not create a universal warranty for all services. By booking a service through SaathApp, you agree to this Policy.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Company</p>
                    <p className="text-lg font-black">SAATHAPPNOVA PRIVATE LIMITED</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {policySections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] sm:p-8"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  {index % 2 === 0 ? <ShieldCheck size={18} /> : <Wrench size={18} />}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-slate-700">{section.body}</p>
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                        <ChevronRight size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          ))}

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
                <p className="text-sm font-black">Partner Support</p>
                <p className="mt-2 text-sm text-slate-300">company@saathapp.in</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><Phone size={16} className="text-emerald-300" /> +91 9128842027</span>
              <span className="inline-flex items-center gap-2"><Mail size={16} className="text-emerald-300" /> support@saathapp.in</span>
              <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-emerald-300" /> Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
            </div>
          </motion.section>
        </div>
      </main>

      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl justify-center">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={() => (onBack ? onBack() : navigate('/', { replace: true }))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
