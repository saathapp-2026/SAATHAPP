import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const introParagraphs = [
  'Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us").',
  'This Service Warranty Policy explains the warranty, revisit, complaint resolution, and support process for services booked through the SaathApp Platform.',
  'This Policy applies only to eligible services where a warranty is specifically mentioned at the time of booking. It does not create a universal warranty for all services.',
  'By booking a service through SaathApp, you agree to this Policy.',
];

const sections = [
  {
    id: 'purpose',
    title: '1. Purpose',
    paragraphs: [
      'The purpose of this Policy is to provide customers with a transparent process for reporting issues related to eligible completed services while ensuring fairness to customers, service professionals, and the Company.',
    ],
  },
  {
    id: 'scope',
    title: '2. Scope',
    intro: 'This Policy applies to eligible services booked through SaathApp, including but not limited to:',
    bullets: [
      'Electrician Services',
      'Plumbing Services',
      'Carpenter Services',
      'AC Repair & Maintenance',
      'RO Water Purifier Services',
      'Home Appliance Repair',
      'Computer & Laptop Repair',
      'CCTV Installation',
      'Painting Services',
      'Home Cleaning Services',
      'Pest Control Services',
      'Furniture Assembly',
      'Installation Services',
      'Other services specifically marked as warranty-eligible',
    ],
    outro: 'Warranty availability may differ depending on the service category.',
  },
  {
    id: 'warranty-period',
    title: '3. Warranty Period',
    intro: 'The applicable warranty period, if any, will be displayed on the service page before booking.',
    subheading: 'Examples may include:',
    bullets: ['7 Days', '15 Days', '30 Days', '90 Days'],
    paragraphs: [
      'The warranty period begins from the date the service is successfully completed.',
      'If no warranty is displayed for a service, no warranty shall apply unless otherwise required by law.',
    ],
  },
  {
    id: 'what-is-covered',
    title: '4. What Is Covered',
    intro: 'Where applicable, the warranty may cover issues directly related to the quality of the completed service, including:',
    bullets: [
      'Improper installation',
      'Poor workmanship',
      'Loose fittings',
      'Incomplete repair',
      'Service-related malfunction recurring within the warranty period',
      'Incorrect installation of approved replacement parts',
      'Installation defects',
    ],
    outro: 'Coverage is limited to issues arising from the original service performed through SaathApp.',
  },
  {
    id: 'what-is-not-covered',
    title: '5. What Is Not Covered',
    intro: 'The warranty does not cover:',
    bullets: [
      'Customer misuse',
      'Accidental damage',
      'Physical abuse',
      'Water damage (unless caused by the original service)',
      'Fire damage',
      'Natural disasters',
      'Power fluctuations',
      'Wear and tear',
      'Manufacturer defects unrelated to the service',
      'Pre-existing damage',
      'Third-party repairs or modifications after completion of the service',
      'Consumable items unless specifically stated',
      'Cosmetic damage that does not affect functionality',
    ],
  },
  {
    id: 'spare-parts',
    title: '6. Spare Parts',
    intro: 'If spare parts are supplied during the service:',
    bullets: [
      'Manufacturer warranty (if provided) shall apply to the spare parts.',
      'SaathApp does not manufacture spare parts and is not responsible for manufacturer warranties.',
      'Service warranty and product warranty are separate.',
    ],
  },
  {
    id: 'revisit-policy',
    title: '7. Revisit Policy',
    intro: 'If a valid warranty claim is approved, the customer may receive:',
    bullets: [
      'Free inspection',
      'Free revisit',
      'Rework of the original service',
      'Replacement of defective workmanship where appropriate',
    ],
    outro: 'The Company will determine the appropriate resolution based on the circumstances.',
  },
  {
    id: 'warranty-claim-process',
    title: '8. Warranty Claim Process',
    intro: 'To request warranty support:',
    orderedSteps: [
      'Open the completed booking in your SaathApp account.',
      'Select Request Warranty Support (where available).',
      'Describe the issue.',
      'Upload photographs or videos if requested.',
      'Submit the request within the applicable warranty period.',
    ],
    outro: 'Alternatively, customers may contact Customer Support.',
  },
  {
    id: 'inspection',
    title: '9. Inspection',
    intro: 'Before approving a warranty claim, the Company or the assigned service professional may inspect:',
    bullets: [
      'The reported issue',
      'Service quality',
      'Installation',
      'Supporting evidence provided by the customer',
    ],
    outro: 'Approval is subject to verification.',
  },
  {
    id: 'resolution-options',
    title: '10. Resolution Options',
    intro: 'After verification, one or more of the following may be provided where appropriate:',
    bullets: [
      'Free Revisit',
      'Free Repair',
      'Completion of Pending Work',
      'Service Correction',
      'Partial Refund',
      'Full Refund (in exceptional circumstances)',
      'Service Credit (where applicable)',
    ],
    outro: 'The chosen resolution will depend on the nature of the issue.',
  },
  {
    id: 'customer-responsibilities',
    title: '11. Customer Responsibilities',
    intro: 'Customers should:',
    bullets: [
      'Report issues promptly within the applicable warranty period.',
      'Provide accurate information.',
      'Allow reasonable access for inspection or rework.',
      'Use the serviced item according to normal operating conditions.',
    ],
    outro: 'Failure to comply may affect warranty eligibility.',
  },
  {
    id: 'service-professional-responsibilities',
    title: '12. Service Professional Responsibilities',
    intro: 'Service professionals are expected to:',
    bullets: [
      'Perform services with reasonable skill and care.',
      'Use appropriate tools and techniques.',
      'Complete approved revisit requests responsibly.',
      'Cooperate with warranty investigations.',
      'Follow Platform quality standards.',
    ],
  },
  {
    id: 'warranty-declined',
    title: '13. Situations Where Warranty May Be Declined',
    intro: 'Warranty claims may be declined if:',
    bullets: [
      'The warranty period has expired.',
      'The issue is unrelated to the original service.',
      'Another technician has modified or repaired the work after completion.',
      'The serviced item has been misused or intentionally damaged.',
      'False or misleading information has been provided.',
      'Access for inspection is refused without reasonable cause.',
    ],
  },
  {
    id: 'cancellation-of-warranty-visit',
    title: '14. Cancellation of Warranty Visit',
    intro: 'If a scheduled warranty revisit cannot be completed because:',
    bullets: [
      'The customer is unavailable,',
      'Access to the location is denied, or',
      'The customer requests cancellation,',
    ],
    outro: 'a new appointment may be required. Repeated missed appointments may affect warranty support.',
  },
  {
    id: 'limitation-of-liability',
    title: '15. Limitation of Liability',
    intro: 'To the maximum extent permitted by law, SAATHAPPNOVA PRIVATE LIMITED shall not be liable for:',
    bullets: [
      'Indirect or consequential losses.',
      'Loss of business or income.',
      'Manufacturer defects unrelated to the service.',
      'Damage caused by misuse after service completion.',
      'Events beyond reasonable control.',
    ],
    outro: 'Nothing in this Policy excludes liability where such exclusion is prohibited by applicable law.',
  },
  {
    id: 'changes',
    title: '16. Changes to This Policy',
    paragraphs: [
      'SAATHAPPNOVA PRIVATE LIMITED may revise this Service Warranty Policy from time to time.',
      'Updated versions will be published on the Platform with the revised "Last Updated" date.',
      'Continued use of the Platform after such updates constitutes acceptance of the revised Policy.',
    ],
  },
  {
    id: 'governing-law',
    title: '17. Governing Law',
    paragraphs: [
      'This Policy shall be governed by the laws of India.',
      'Any disputes arising under this Policy shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
  {
    id: 'contact-us',
    title: '18. Contact Us',
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

function OrderedList({ items }) {
  if (!items?.length) return null;
  return (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
      {items.map((step, index) => (
        <li key={index} className="leading-7">
          {step}
        </li>
      ))}
    </ol>
  );
}

function SectionBody({ section }) {
  if (section.isContact) {
    return (
      <div className="mt-4 space-y-4 text-sm text-slate-600">
        <p>For warranty-related questions or assistance, please contact:</p>
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
          <p className="font-semibold text-slate-900">Service Support:</p>
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
    );
  }

  return (
    <>
      {section.intro && <p className="mt-3 text-sm leading-7 text-slate-600">{section.intro}</p>}
      {section.subheading && <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading}</p>}
      <BulletList items={section.bullets} />
      <OrderedList items={section.orderedSteps} />
      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
      {section.outro && <p className="mt-4 text-sm leading-7 text-slate-600">{section.outro}</p>}
    </>
  );
}

export default function ServiceWarrantyPolicyPage() {
  useEffect(() => {
    document.title = 'Service Warranty Policy | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Read the SaathApp Service Warranty Policy covering eligible services, warranty periods, claim process, and customer support.';
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
    <div className="min-h-screen bg-page text-slate-800">
      <Header
        cartCount={0}
        onCartClick={() => { }}
        location="Bhatahar, Nalanda"
        onLocationClick={() => { }}
        onSearch={() => { }}
        onLogin={() => { }}
        onSignup={() => { }}
        onProfile={() => { }}
        user={null}
        isAuthenticated={false}
        onCartPage={() => { }}
        onOrdersPage={() => { }}
        onWishlistPage={() => { }}
        onSettingsPage={() => { }}
        onLogout={() => { }}
        darkMode={false}
        toggleDarkMode={() => { }}
        onVoiceSearchClick={() => { }}
        onImageSearchClick={() => { }}
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
              Back
            </Link>
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            Support
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Service Warranty Policy</h1>
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
                  {index % 2 === 0 ? <ShieldCheck size={18} /> : <Wrench size={18} />}
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
                  <SectionBody section={section} />
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
            <h2 className="text-xl font-black">Customer Acknowledgement</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              By booking or using services through the SaathApp Platform, you acknowledge that you have read,
              understood, and agreed to this Service Warranty Policy.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Warranty coverage is available only where expressly offered for a particular service and is subject to the
              terms, conditions, exclusions, and verification procedures described in this Policy.
            </p>
          </motion.section>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pb-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-page"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
