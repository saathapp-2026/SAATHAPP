import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const introParagraphs = [
  'Welcome to SaathApp, a digital hyperlocal marketplace owned and operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us").',
  'These Terms of Service ("Terms") govern your access to and use of the SaathApp website, mobile application, and all related products and services (collectively, the "Platform").',
  'By accessing or using the Platform, you agree to comply with these Terms. If you do not agree with any part of these Terms, please do not use the Platform.',
];

const sections = [
  {
    id: 'definitions',
    title: '1. Definitions',
    bullets: [
      'Platform means the SaathApp website, mobile application, and related services.',
      'User means any person accessing or using the Platform.',
      'Customer means a user purchasing products or booking services.',
      'Seller means a registered business or individual selling products.',
      'Service Professional means an individual or business providing services through the Platform.',
      'Delivery Partner means a registered delivery person fulfilling deliveries.',
      'Company means SAATHAPPNOVA PRIVATE LIMITED.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    intro: 'To use the Platform, you must:',
    bullets: [
      'Be at least 18 years of age, or use the Platform under the supervision of a parent or legal guardian where permitted.',
      'Provide accurate and complete registration information.',
      'Comply with all applicable laws and these Terms.',
    ],
    outro: 'The Company reserves the right to suspend or terminate accounts that do not meet these requirements.',
  },
  {
    id: 'user-account',
    title: '3. User Account',
    intro: 'To access certain features, you may be required to create an account.',
    subheading: 'You agree to:',
    bullets: [
      'Provide accurate information.',
      'Keep your login credentials secure.',
      'Update your account information when necessary.',
      'Be responsible for all activities under your account.',
    ],
    outro: 'The Company is not responsible for losses resulting from unauthorized access due to your failure to protect your account credentials.',
  },
  {
    id: 'platform-services',
    title: '4. Platform Services',
    intro: 'SaathApp provides a digital platform that enables users to:',
    bullets: [
      'Purchase products from local sellers.',
      'Book professional services.',
      'Discover nearby businesses.',
      'Connect with delivery partners.',
      'Access other marketplace features introduced by the Company.',
    ],
    outro: 'The Company facilitates these transactions but may not be the direct seller or service provider unless expressly stated.',
  },
  {
    id: 'orders',
    title: '5. Orders',
    intro: 'Customers may place orders subject to product availability.',
    subheading: 'The Company reserves the right to:',
    bullets: [
      'Accept or reject any order.',
      'Cancel orders affected by pricing errors, fraud, technical issues, or inventory limitations.',
      'Verify customer information before processing orders.',
    ],
    outro: 'An order confirmation does not guarantee final acceptance until processed.',
  },
  {
    id: 'pricing',
    title: '6. Pricing',
    paragraphs: [
      'Prices displayed on the Platform are generally determined by sellers and may change without prior notice.',
      'Applicable taxes, delivery charges, convenience fees, or other charges, where applicable, will be shown before checkout.',
    ],
  },
  {
    id: 'payments',
    title: '7. Payments',
    paragraphs: [
      'Customers may pay using supported payment methods available on the Platform.',
      'The Company does not store complete debit card, credit card, or UPI PIN information.',
      'Payments are processed through authorized third-party payment service providers.',
    ],
  },
  {
    id: 'delivery',
    title: '8. Delivery',
    intro: 'Estimated delivery times are provided for convenience only.',
    subheading: 'Actual delivery may vary due to:',
    bullets: [
      'Weather conditions',
      'Traffic',
      'Seller preparation time',
      'Customer availability',
      'Operational issues',
      'Events beyond reasonable control',
    ],
    outro: 'Delivery timelines are estimates and are not guaranteed.',
  },
  {
    id: 'service-bookings',
    title: '9. Service Bookings',
    paragraphs: [
      'Professional services are provided by independent service professionals.',
      'Customers are responsible for providing accurate service details and ensuring access to the service location.',
      'Service quality may vary depending on the provider.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: '10. User Responsibilities',
    subheading: 'Users agree to:',
    bullets: [
      'Use the Platform lawfully.',
      'Provide truthful information.',
      'Respect sellers, service professionals, delivery partners, and other users.',
      'Pay for confirmed orders.',
      'Follow applicable laws.',
    ],
    subheading2: 'Users must not:',
    bullets2: [
      'Create fake accounts.',
      'Misuse promotional offers.',
      'Attempt unauthorized access.',
      'Upload harmful software or malicious code.',
      'Engage in fraudulent or illegal activities.',
      "Interfere with the Platform's operation.",
    ],
  },
  {
    id: 'seller-responsibilities',
    title: '11. Seller Responsibilities',
    subheading: 'Registered sellers agree to:',
    bullets: [
      'Provide accurate product information.',
      'Maintain lawful business operations.',
      'Deliver quality products.',
      'Honor confirmed orders.',
      'Comply with applicable tax and regulatory requirements.',
      'Follow Seller Policies published by the Company.',
    ],
  },
  {
    id: 'service-professional-responsibilities',
    title: '12. Service Professional Responsibilities',
    subheading: 'Service professionals agree to:',
    bullets: [
      'Provide services professionally.',
      'Maintain required qualifications where applicable.',
      'Complete accepted bookings responsibly.',
      'Follow safety standards.',
      'Comply with Company policies.',
    ],
  },
  {
    id: 'delivery-partner-responsibilities',
    title: '13. Delivery Partner Responsibilities',
    subheading: 'Delivery partners agree to:',
    bullets: [
      'Deliver orders safely and responsibly.',
      'Follow traffic and applicable laws.',
      'Maintain professional conduct.',
      'Protect customer privacy.',
      'Comply with the Delivery Partner Agreement.',
    ],
  },
  {
    id: 'cancellations',
    title: '14. Cancellations',
    paragraphs: [
      'Orders or service bookings may be cancelled in accordance with the applicable Cancellation and Refund Policy.',
      'Cancellation charges may apply in certain situations.',
    ],
  },
  {
    id: 'refunds',
    title: '15. Refunds',
    intro: 'Refunds, where applicable, will be processed according to the Refund & Cancellation Policy.',
    subheading: 'Refund eligibility depends on factors including:',
    bullets: [
      'Product category',
      'Order status',
      'Seller approval (where applicable)',
      'Platform policies',
    ],
  },
  {
    id: 'promotions',
    title: '16. Promotions and Offers',
    subheading: 'Discounts, coupons, referral rewards, cashback, and promotional offers:',
    bullets: [
      'May have separate terms.',
      'May be modified or withdrawn without prior notice.',
      'Cannot be exchanged for cash unless explicitly stated.',
    ],
    outro: 'Fraudulent use of promotions may result in account suspension.',
  },
  {
    id: 'intellectual-property',
    title: '17. Intellectual Property',
    intro: 'All content available on the Platform, including but not limited to:',
    bullets: [
      'Logos',
      'Trademarks',
      'Brand names',
      'Software',
      'Designs',
      'Images',
      'Icons',
      'Text',
      'Graphics',
    ],
    outro: 'is owned by or licensed to SAATHAPPNOVA PRIVATE LIMITED and is protected under applicable intellectual property laws. Users may not copy, modify, distribute, or reproduce any content without prior written permission.',
  },
  {
    id: 'third-party',
    title: '18. Third-Party Services',
    intro: 'The Platform may include integrations with third-party services such as:',
    bullets: [
      'Payment gateways',
      'Maps',
      'SMS services',
      'Email providers',
      'Analytics tools',
    ],
    outro: 'The Company is not responsible for the independent policies or practices of third-party providers.',
  },
  {
    id: 'suspension',
    title: '19. Suspension and Termination',
    intro: 'The Company may suspend or terminate any account without prior notice if a user:',
    bullets: [
      'Violates these Terms.',
      'Engages in fraud.',
      'Misuses the Platform.',
      'Provides false information.',
      'Violates applicable laws.',
      'Threatens the security or integrity of the Platform.',
    ],
    outro: 'Termination does not affect obligations that arose before termination.',
  },
  {
    id: 'disclaimer',
    title: '20. Disclaimer',
    intro: 'The Platform is provided on an "as available" and "as is" basis.',
    subheading: 'While we strive to maintain accurate information and reliable services, we do not guarantee:',
    bullets: [
      'Continuous availability.',
      'Error-free operation.',
      'Uninterrupted access.',
      'Absolute accuracy of all content.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: '21. Limitation of Liability',
    intro: 'To the maximum extent permitted by law, SAATHAPPNOVA PRIVATE LIMITED shall not be liable for:',
    bullets: [
      'Indirect or consequential damages.',
      'Loss of profits or business opportunities.',
      'Data loss.',
      'Delays caused by third parties.',
      'Events beyond reasonable control.',
      "Seller or service provider actions outside the Company's control.",
    ],
    outro: 'Nothing in these Terms excludes liability where such exclusion is prohibited by applicable law.',
  },
  {
    id: 'indemnity',
    title: '22. Indemnity',
    intro: 'You agree to indemnify and hold harmless SAATHAPPNOVA PRIVATE LIMITED, its directors, officers, employees, and affiliates from claims, damages, losses, liabilities, and expenses arising out of:',
    bullets: [
      'Your misuse of the Platform.',
      'Violation of these Terms.',
      'Violation of applicable laws.',
      'Infringement of third-party rights.',
    ],
  },
  {
    id: 'force-majeure',
    title: '23. Force Majeure',
    paragraphs: [
      'The Company shall not be responsible for delays or failures caused by events beyond its reasonable control, including natural disasters, pandemics, government actions, strikes, internet failures, cyberattacks, or power outages.',
    ],
  },
  {
    id: 'changes',
    title: '24. Changes to These Terms',
    paragraphs: [
      'The Company may revise these Terms from time to time.',
      'Updated Terms will be published on the Platform with the revised "Last Updated" date.',
      'Continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: '25. Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms shall be governed by and interpreted in accordance with the laws of India.',
      'Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
  {
    id: 'severability',
    title: '26. Severability',
    paragraphs: [
      'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.',
    ],
  },
  {
    id: 'entire-agreement',
    title: '27. Entire Agreement',
    paragraphs: [
      'These Terms, together with the Privacy Policy and other policies published on the Platform, constitute the entire agreement between you and SAATHAPPNOVA PRIVATE LIMITED regarding the use of the Platform.',
    ],
  },
  {
    id: 'contact',
    title: '28. Contact Information',
    isContact: true,
  },
];

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-2">
      {items.map((bullet, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
          <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TermsOfServicePage() {
  useEffect(() => {
    document.title = 'Terms of Service | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Read the SaathApp Terms of Service governing use of the hyperlocal marketplace platform, orders, payments, and user responsibilities.';
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

      <div className="mx-auto flex max-w-4xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 text-center shadow-xl sm:p-8 lg:p-10"
        >
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            Legal
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Terms of Service</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
              <BadgeCheck size={16} className="text-primary" />
              Effective Date: 25 July 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
              <ScrollText size={16} className="text-primary" />
              Last Updated: 25 July 2026
            </span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            {introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.section>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {index % 2 === 0 ? <FileText size={18} /> : <ShieldCheck size={18} />}
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-black text-slate-900">{section.title}</h2>

                  {section.isContact ? (
                    <div className="mt-4 space-y-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</p>
                      <div>
                        <p className="font-semibold text-slate-900">Registered Office:</p>
                        <p className="mt-1 flex items-start gap-2">
                          <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                          <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Customer Support:</p>
                        <p className="mt-1 flex items-center gap-2">
                          <Mail size={16} className="shrink-0 text-primary" />
                          <a href="mailto:support@saathapp.in" className="text-primary hover:underline">
                            support@saathapp.in
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Business Inquiry:</p>
                        <p className="mt-1 flex items-center gap-2">
                          <Mail size={16} className="shrink-0 text-primary" />
                          <a href="mailto:company@saathapp.in" className="text-primary hover:underline">
                            company@saathapp.in
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Phone / WhatsApp:</p>
                        <p className="mt-1 flex items-center gap-2">
                          <Phone size={16} className="shrink-0 text-primary" />
                          <span>+91 9128842027</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {section.intro && <p className="mt-3 text-sm leading-7 text-slate-600">{section.intro}</p>}
                      {section.subheading && (
                        <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading}</p>
                      )}
                      <BulletList items={section.bullets} />
                      {section.subheading2 && (
                        <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading2}</p>
                      )}
                      <BulletList items={section.bullets2} />
                      {section.paragraphs?.map((paragraph, pIndex) => (
                        <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                      {section.outro && <p className="mt-4 text-sm leading-7 text-slate-600">{section.outro}</p>}
                    </>
                  )}
                </div>
              </div>
            </motion.section>
          ))}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8"
          >
            <h2 className="text-xl font-black">Acceptance of Terms</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              By creating an account, accessing, or using the SaathApp Platform, you confirm that you have read,
              understood, and agreed to these Terms of Service. If you do not agree with these Terms, you should
              discontinue use of the Platform immediately.
            </p>
          </motion.section>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pb-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
