import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown, Package, ShieldCheck, Wrench, FileText, IndianRupee, CheckCircle2, AlertCircle,
} from 'lucide-react';
import {
  getProfessionalMembershipPlans,
  getPlanById,
  subscribeProfessionalMembership,
  cancelProfessionalMembership,
  renewProfessionalMembership,
  downgradeProfessionalMembership,
} from '../../config/professional/membershipPlans';
import { getWelcomeKitConfig, getWelcomeKitEligibilityStatus } from '../../config/professional/welcomeKitConfig';
import { getEquipmentConfig } from '../../config/professional/equipmentConfig';
import {
  VERIFICATION_DOCUMENTS,
  VERIFICATION_CHECKS,
  getProfessionalPricingConfig,
} from '../../config/professionalOnboardingConfig';

const cardClass = 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft text-left';
const labelClass = 'text-[10px] font-black uppercase tracking-wider text-slate-400';
const valueClass = 'text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5';

function InfoGrid({ rows }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {rows.map((row) => (
        <div key={row.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <p className={labelClass}>{row.label}</p>
          <p className={valueClass}>{row.value ?? '—'}</p>
        </div>
      ))}
    </div>
  );
}

export function ProfessionalProfileSection({ onboarding, session, professionLabel }) {
  const info = onboarding?.accountInfo || {};
  const loc = onboarding?.serviceLocation || {};
  const photo = onboarding?.documents?.photo;
  return (
    <div className={`${cardClass} space-y-4`}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold">
          {photo ? <span className="px-1 text-center leading-tight">{String(photo).slice(0, 18)}</span> : 'No Photo'}
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">Professional Profile</h3>
          <p className="text-xs text-slate-500 mt-0.5">{info.name || session?.user?.name || '—'}</p>
        </div>
      </div>
      <InfoGrid
        rows={[
          { label: 'Professional ID', value: onboarding?.meta?.partnerId || session?.user?.id },
          { label: 'Verification Status', value: onboarding?.status || 'pending' },
          { label: 'Account Status', value: session?.user?.status || onboarding?.status || 'pending' },
          { label: 'Service Category', value: professionLabel || info.category },
          { label: 'Profession', value: professionLabel || info.category },
          { label: 'Experience', value: info.experience },
          { label: 'Individual / Agency', value: info.entityType },
          { label: 'Business Name', value: info.name },
          { label: 'Staff Count', value: info.staffCount },
          { label: 'Service Radius', value: loc.serviceRadius ? `${loc.serviceRadius} km` : null },
          { label: 'Service Location', value: [loc.city, loc.state, loc.pincode].filter(Boolean).join(', ') },
          { label: 'Business Scale', value: info.businessScale },
          { label: 'Joined Date', value: session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString('en-IN') : null },
        ]}
      />
    </div>
  );
}

export function MembershipSection({ membership, renewalDate, onMembershipChange, setActiveTab }) {
  const plans = getProfessionalMembershipPlans();
  const current = membership || { planId: 'free', planName: 'Free', price: 0, status: 'free' };
  const currentPlan = getPlanById(current.planId);

  const run = async (fn) => {
    const next = await fn();
    onMembershipChange?.(next);
  };

  return (
    <div className="space-y-4">
      <div className={`${cardClass} space-y-4`}>
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-primary" />
          <h3 className="text-sm font-black uppercase tracking-wider">Membership</h3>
        </div>
        <InfoGrid
          rows={[
            { label: 'Current Plan', value: current.planName || currentPlan.name },
            { label: 'Monthly Price', value: `₹${Number(current.price ?? currentPlan.price).toLocaleString('en-IN')}` },
            { label: 'Status', value: current.status || 'free' },
            { label: 'Renewal Date', value: renewalDate },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => run(() => subscribeProfessionalMembership('growth'))} className="px-3 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase cursor-pointer">Upgrade</button>
          <button type="button" onClick={() => run(() => downgradeProfessionalMembership('starter'))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase cursor-pointer">Downgrade</button>
          <button type="button" onClick={() => run(() => renewProfessionalMembership(current.planId))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase cursor-pointer">Renew Membership</button>
          <button type="button" onClick={() => run(() => cancelProfessionalMembership())} className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 text-[10px] font-black uppercase cursor-pointer">Cancel Membership</button>
          <button type="button" onClick={() => setActiveTab?.('welcome_kit')} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase cursor-pointer">Welcome Kit</button>
        </div>
      </div>

      <div className={`${cardClass} space-y-3`}>
        <h3 className="text-sm font-black uppercase tracking-wider">Membership Benefits</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {plans.map((plan) => (
            <div key={plan.id} className={`p-3 rounded-xl border ${current.planId === plan.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800'}`}>
              <p className="text-xs font-black">{plan.name}</p>
              <p className="text-[11px] text-primary font-bold mt-1">₹{plan.price.toLocaleString('en-IN')}/mo</p>
              <ul className="mt-2 space-y-1">
                {(plan.highlights || []).map((h) => (
                  <li key={h} className="text-[10px] text-slate-500">• {h}</li>
                ))}
              </ul>
              {current.planId !== plan.id && (
                <button type="button" onClick={() => run(() => subscribeProfessionalMembership(plan.id))} className="mt-3 w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase cursor-pointer">
                  Select
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WelcomeKitSection({ membership, applicationStatus, setActiveTab }) {
  const kit = getWelcomeKitConfig();
  const status = getWelcomeKitEligibilityStatus(membership?.planId || 'free', applicationStatus);
  const planOk = kit.eligiblePlans.includes(membership?.planId);
  let label = 'Not Eligible';
  if (status.eligible) label = applicationStatus === 'activated' ? 'Delivered' : 'Eligible';
  else if (planOk) label = 'Pending';

  return (
    <div className={`${cardClass} space-y-4`}>
      <div className="flex items-center gap-2">
        <Package size={18} className="text-primary" />
        <h3 className="text-sm font-black uppercase tracking-wider">{kit.title}</h3>
      </div>
      <p className={`text-sm font-bold ${status.eligible ? 'text-emerald-600' : 'text-amber-600'}`}>Status: {label}</p>
      <p className="text-xs text-slate-500">{kit.description}</p>
      {planOk ? (
        <ul className="grid sm:grid-cols-2 gap-1">
          {kit.items.map((item) => (
            <li key={item.id} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-primary" /> {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-800 dark:text-amber-200">
          Upgrade to Growth or Enterprise to receive Complimentary Welcome Kit.
          <button type="button" onClick={() => setActiveTab?.('membership')} className="ml-2 underline font-bold cursor-pointer bg-transparent border-0 text-amber-800 dark:text-amber-200">
            Upgrade Membership
          </button>
        </div>
      )}
    </div>
  );
}

export function OnboardingInfoSection({ onboarding, professionLabel }) {
  const info = onboarding?.accountInfo || {};
  const loc = onboarding?.serviceLocation || {};
  const docs = onboarding?.documents || {};
  const uploaded = VERIFICATION_DOCUMENTS.filter((d) => docs[d.key]);
  return (
    <div className={`${cardClass} space-y-4`}>
      <h3 className="text-sm font-black uppercase tracking-wider">Onboarding Information</h3>
      <InfoGrid
        rows={[
          { label: 'Personal Name', value: info.name },
          { label: 'Phone', value: info.phone },
          { label: 'Email', value: info.email },
          { label: 'Category / Profession', value: professionLabel || info.category },
          { label: 'Experience', value: info.experience },
          { label: 'Entity', value: info.entityType },
          { label: 'Staff', value: info.staffCount },
          { label: 'Equipment Level', value: info.equipmentLevel },
          { label: 'Business Scale', value: info.businessScale },
          { label: 'Location', value: [loc.city, loc.state].filter(Boolean).join(', ') },
          { label: 'Pincode', value: loc.pincode },
          { label: 'Tier', value: loc.locationTier },
          { label: 'Radius', value: loc.serviceRadius },
          { label: 'Verification Level', value: docs.verificationLevel },
        ]}
      />
      <div>
        <p className={labelClass}>Documents Submitted</p>
        <ul className="mt-2 grid sm:grid-cols-2 gap-1">
          {uploaded.length === 0 && <li className="text-xs text-slate-400">No documents on file</li>}
          {uploaded.map((d) => (
            <li key={d.key} className="text-xs text-slate-600 dark:text-slate-300">• {d.label}: {docs[d.key]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function VerificationSection({ onboarding }) {
  const docs = onboarding?.documents || {};
  const status = onboarding?.status || 'draft';
  const completed = VERIFICATION_DOCUMENTS.filter((d) => docs[d.key]);
  const pending = VERIFICATION_DOCUMENTS.filter((d) => !docs[d.key]);
  return (
    <div className={`${cardClass} space-y-4`}>
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-primary" />
        <h3 className="text-sm font-black uppercase tracking-wider">Verification</h3>
      </div>
      <InfoGrid
        rows={[
          { label: 'Overall Status', value: status },
          { label: 'Timeline', value: '3–30 business days' },
          { label: 'Completed Documents', value: String(completed.length) },
          { label: 'Pending Documents', value: String(pending.length) },
        ]}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className={labelClass}>Completed Checks / Docs</p>
          <ul className="mt-2 space-y-1">
            {completed.map((d) => (
              <li key={d.key} className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 size={12} /> {d.label}</li>
            ))}
            {completed.length === 0 && <li className="text-xs text-slate-400">None yet</li>}
          </ul>
        </div>
        <div>
          <p className={labelClass}>Pending Documents</p>
          <ul className="mt-2 space-y-1">
            {pending.map((d) => (
              <li key={d.key} className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle size={12} /> {d.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className={labelClass}>Verification Checklist</p>
        <ul className="mt-2 grid sm:grid-cols-2 gap-1">
          {VERIFICATION_CHECKS.map((c) => (
            <li key={c} className="text-[10px] text-slate-500">• {c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FeeSummarySection({ onboarding }) {
  const fee = onboarding?.onboardingFee || {};
  const breakdown = fee.breakdown || {};
  const pricing = getProfessionalPricingConfig();
  return (
    <div className={`${cardClass} space-y-4`}>
      <div className="flex items-center gap-2">
        <IndianRupee size={18} className="text-primary" />
        <h3 className="text-sm font-black uppercase tracking-wider">Fee Summary</h3>
      </div>
      <InfoGrid
        rows={[
          { label: 'One-Time Onboarding Fee', value: fee.calculatedFee != null ? `₹${Number(fee.calculatedFee).toLocaleString('en-IN')}` : null },
          { label: 'Renewal Fee', value: fee.renewalAmount != null ? `₹${Number(fee.renewalAmount).toLocaleString('en-IN')}` : (breakdown.renewalAmount != null ? `₹${Number(breakdown.renewalAmount).toLocaleString('en-IN')}` : null) },
          { label: 'Validity', value: fee.validityEnd ? `${pricing.validityYears} years (until ${new Date(fee.validityEnd).toLocaleDateString('en-IN')})` : `${pricing.validityYears} years` },
          { label: 'Payment Status', value: fee.paymentStatus },
          { label: 'Payment Date', value: fee.paidAt ? new Date(fee.paidAt).toLocaleDateString('en-IN') : null },
          { label: 'Commission %', value: breakdown.commissionDisplay || pricing.commissionRangeDisplay },
          { label: 'Location Tier', value: breakdown.locationTierLabel || onboarding?.serviceLocation?.locationTier },
          { label: 'Pricing Tier / Group', value: breakdown.groupLabel },
        ]}
      />
    </div>
  );
}

export function CommissionSection({ onboarding }) {
  const breakdown = onboarding?.onboardingFee?.breakdown || {};
  const pricing = getProfessionalPricingConfig();
  const info = onboarding?.accountInfo || {};
  return (
    <div className={`${cardClass} space-y-4`}>
      <h3 className="text-sm font-black uppercase tracking-wider">Commission Information</h3>
      <InfoGrid
        rows={[
          { label: 'Current Commission', value: breakdown.commissionDisplay || pricing.commissionRangeDisplay },
          { label: 'Commission Range', value: pricing.commissionRangeDisplay },
          { label: 'Location Tier', value: breakdown.locationTierLabel || onboarding?.serviceLocation?.locationTier },
          { label: 'Profession', value: breakdown.categoryLabel || info.category },
          { label: 'Renewal Fee', value: breakdown.renewalAmount != null ? `₹${Number(breakdown.renewalAmount).toLocaleString('en-IN')}` : null },
          { label: 'Validity', value: `${pricing.validityYears} years · Renewal ${pricing.renewalPercentage}%` },
        ]}
      />
    </div>
  );
}

export function EquipmentSection() {
  const equipment = getEquipmentConfig();
  const Section = ({ title, items, rent }) => (
    <div>
      <p className="text-xs font-black uppercase text-slate-500 mb-2">{title}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-2 text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {i.name}
              {rent
                ? ` — ₹${i.monthlyRent}/mo (deposit ₹${Number(i.deposit).toLocaleString('en-IN')})`
                : ` — ₹${Number(i.price).toLocaleString('en-IN')}`}
            </span>
            <span className="flex gap-1 shrink-0">
              <button type="button" className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-[9px] font-black uppercase cursor-pointer" onClick={() => alert(`View: ${i.name}`)}>View</button>
              <button type="button" className="px-2 py-1 rounded-md bg-primary text-white text-[9px] font-black uppercase cursor-pointer" onClick={() => alert(`${rent ? 'Rent' : 'Purchase'} requested: ${i.name}`)}>{rent ? 'Rent' : 'Purchase'}</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`${cardClass} space-y-5`}>
      <div className="flex items-center gap-2">
        <Wrench size={18} className="text-primary" />
        <h3 className="text-sm font-black uppercase tracking-wider">Equipment & Branding</h3>
      </div>
      <Section title="Professional Uniforms" items={equipment.uniforms} />
      <Section title="Safety Equipment" items={equipment.safety} />
      <Section title="Professional Tools" items={equipment.tools} />
      <Section title="Vehicle Branding" items={equipment.vehicle} />
      <Section title="Rental Equipment" items={equipment.rental} rent />
    </div>
  );
}

export function BusinessServicesSection() {
  const equipment = getEquipmentConfig();
  return (
    <div className={`${cardClass} space-y-4`}>
      <h3 className="text-sm font-black uppercase tracking-wider">Business & Digital Services</h3>
      <ul className="space-y-2">
        {equipment.digitalServices.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-2 text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-semibold">{i.name} — ₹{Number(i.price).toLocaleString('en-IN')}</span>
            <button type="button" className="px-2 py-1 rounded-md bg-primary text-white text-[9px] font-black uppercase cursor-pointer" onClick={() => alert(`Service request: ${i.name}`)}>Purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TermsCardSection() {
  return (
    <div className={`${cardClass} space-y-3`}>
      <div className="flex items-center gap-2">
        <FileText size={18} className="text-primary" />
        <h3 className="text-sm font-black uppercase tracking-wider">Service Professional Terms & Conditions</h3>
      </div>
      <p className="text-xs text-slate-500">View all 16 official onboarding clauses, verification rules, responsibilities, and equipment safety terms.</p>
      <Link to="/professional/terms" className="inline-flex px-4 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase">
        View Terms
      </Link>
    </div>
  );
}
