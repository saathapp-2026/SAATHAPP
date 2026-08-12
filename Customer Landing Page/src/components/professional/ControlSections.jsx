import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown, Package, ShieldCheck, Wrench, FileText, IndianRupee, CheckCircle2, AlertCircle, ClipboardList, MapPin, User, Clock, Settings, Phone, LifeBuoy
} from 'lucide-react';
import ProfileCard from './ProfileCard';
import AvailabilityCard from './AvailabilityCard';
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
  const [membershipTab, setMembershipTab] = React.useState('current');

  const run = async (fn) => {
    const next = await fn();
    onMembershipChange?.(next);
  };

  const billingHistory = [
    { id: 'INV-2026-07', date: 'Jul 01, 2026', plan: 'Growth', amount: 999, status: 'paid' },
    { id: 'INV-2026-06', date: 'Jun 01, 2026', plan: 'Growth', amount: 999, status: 'paid' },
    { id: 'INV-2026-05', date: 'May 01, 2026', plan: 'Starter', amount: 499, status: 'paid' }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Membership Portal</h2>
        <p className="text-[11px] text-slate-400">Manage your subscription, benefits, and billing</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'current', label: 'Current Plan' },
            { id: 'upgrade', label: 'Upgrade' },
            { id: 'benefits', label: 'Benefits' },
            { id: 'billing', label: 'Billing History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMembershipTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
                membershipTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {membershipTab === 'current' && (
        <div className={`${cardClass} space-y-6`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <Crown size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Current Membership</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Plan</p>
              <p className="font-bold text-lg text-primary mt-1">{current.planName || currentPlan.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Monthly Rate</p>
              <p className="font-bold text-lg text-slate-800 dark:text-slate-200 mt-1">₹{Number(current.price ?? currentPlan.price).toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</p>
              <p className="font-bold text-lg text-emerald-600 mt-1 uppercase text-sm mt-2">{current.status || 'Active'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Next Renewal</p>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-2">{renewalDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/50">
            {current.planId !== 'growth' && (
              <button type="button" onClick={() => setMembershipTab('upgrade')} className="px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase cursor-pointer">Upgrade Plan</button>
            )}
            <button type="button" onClick={() => run(() => downgradeProfessionalMembership('starter'))} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Downgrade</button>
            <button type="button" onClick={() => run(() => renewProfessionalMembership(current.planId))} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Renew Manually</button>
            <button type="button" onClick={() => run(() => cancelProfessionalMembership())} className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 text-[10px] font-black uppercase cursor-pointer hover:bg-rose-50">Cancel Subscription</button>
          </div>
        </div>
      )}

      {membershipTab === 'upgrade' && (
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">Upgrade Path</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const isCurrent = current.planId === plan.id;
              return (
                <div key={plan.id} className={`p-4 rounded-xl border relative flex flex-col justify-between ${isCurrent ? 'border-emerald-500 bg-emerald-50/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft hover:shadow-premium transition-shadow'}`}>
                  {isCurrent && <span className="absolute -top-2.5 right-3 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Current</span>}
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-white">{plan.name}</p>
                    <p className="text-xs text-primary font-bold mt-1">₹{plan.price.toLocaleString('en-IN')}/mo</p>
                    <ul className="mt-4 space-y-2">
                      {(plan.highlights || []).map((h) => (
                        <li key={h} className="text-[10px] text-slate-500 flex items-start gap-1.5 leading-snug">
                          <span className="text-emerald-500 mt-0.5">✔</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {!isCurrent && (
                    <button type="button" onClick={() => run(() => subscribeProfessionalMembership(plan.id))} className="mt-5 w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300 transition-colors text-[10px] font-black uppercase cursor-pointer">
                      Select {plan.name}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {membershipTab === 'benefits' && (
        <div className={`${cardClass} space-y-4`}>
          <h3 className="text-sm font-black uppercase tracking-wider">Your Benefits & Unlocked Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current unlocked */}
            <div className="p-4 border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-3">Unlocked with {current.planName}</p>
              <ul className="space-y-2">
                {(currentPlan.highlights || []).map((h) => (
                  <li key={h} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> {h}
                  </li>
                ))}
              </ul>
            </div>
            {/* Missing benefits */}
            {current.planId !== 'growth' && (
              <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Missing Out On</p>
                <ul className="space-y-2">
                  <li className="text-xs text-slate-400 flex items-center gap-2"><span className="text-slate-300">✖</span> Dedicated Account Manager</li>
                  <li className="text-xs text-slate-400 flex items-center gap-2"><span className="text-slate-300">✖</span> 0% Escrow Fees</li>
                  <li className="text-xs text-slate-400 flex items-center gap-2"><span className="text-slate-300">✖</span> Priority Search Ranking</li>
                </ul>
                <button onClick={() => setMembershipTab('upgrade')} className="mt-4 text-[10px] font-black uppercase text-primary hover:underline cursor-pointer">Upgrade to unlock →</button>
              </div>
            )}
          </div>
        </div>
      )}

      {membershipTab === 'billing' && (
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black uppercase tracking-wider">Billing History</h3>
            <button className="text-[10px] font-black uppercase text-primary hover:underline cursor-pointer">Download All Invoices</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3">Invoice ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Plan Billed</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {billingHistory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{inv.id}</td>
                    <td className="py-3 text-slate-400">{inv.date}</td>
                    <td className="py-3 font-bold text-primary">{inv.plan}</td>
                    <td className="py-3 text-right">₹{inv.amount}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-200/50">
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export function ProfileSettingsSection({ 
  onboarding, session, professionLabel, serviceCity, serviceRadiusLabel, darkMode, toggleDarkMode 
}) {
  const [activeSubTab, setActiveSubTab] = React.useState('personal');

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Profile & Settings</h2>
        <p className="text-[11px] text-slate-400">Manage personal details, service area, availability, and app preferences</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'personal', label: 'Personal Details', icon: User },
            { id: 'service_area', label: 'Service Area', icon: MapPin },
            { id: 'availability', label: 'Availability Hours', icon: Clock },
            { id: 'preferences', label: 'Preferences', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {activeSubTab === 'personal' && (
        <div className="space-y-6">
          <div className={`${cardClass} space-y-4`}>
            <div className="flex items-center gap-2">
              <User size={18} className="text-primary" />
              <h3 className="text-sm font-black uppercase tracking-wider">Basic Information</h3>
            </div>
            <InfoGrid
              rows={[
                { label: 'Partner Name', value: session?.user?.name || onboarding?.personalInfo?.fullName },
                { label: 'Registered Email', value: session?.user?.email || onboarding?.personalInfo?.email },
                { label: 'Registered Phone', value: session?.user?.phone || onboarding?.personalInfo?.phone },
                { label: 'Category / Profession', value: professionLabel },
                { label: 'Date of Birth', value: onboarding?.personalInfo?.dob ? new Date(onboarding.personalInfo.dob).toLocaleDateString('en-IN') : null },
                { label: 'Gender', value: onboarding?.personalInfo?.gender },
              ]}
            />
            {onboarding?.emergencyContact && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className={labelClass}>Emergency Contact</p>
                <p className={valueClass}>
                  {onboarding.emergencyContact.name} ({onboarding.emergencyContact.relation}) — {onboarding.emergencyContact.phone}
                </p>
              </div>
            )}
          </div>
          <ProfileCard />
        </div>
      )}

      {activeSubTab === 'service_area' && (
        <div className={`${cardClass} space-y-6`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/40">
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Service Radius Map</h3>
              <p className="text-[10px] text-slate-450 mt-0.5">Define your geographical service coverage coordinates</p>
            </div>
            <button
              onClick={() => alert('Update service radius from your onboarding profile when editing is available.')}
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-black uppercase rounded-xl cursor-pointer"
            >
              Adjust Radius
            </button>
          </div>

          <div className="h-96 w-full rounded-card border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner flex flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin className="text-primary" size={32} />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Service Location</p>
            <p className="text-xs text-slate-500">{serviceCity}</p>
            <p className="text-xs font-semibold text-primary">Radius: {serviceRadiusLabel}</p>
            <p className="text-[10px] text-slate-400 max-w-sm">Live map integration will use your registered service location. Coverage is based on the radius selected during onboarding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold pt-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-450 block">Current City</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{serviceCity}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-450 block">Registered Radius</span>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{serviceRadiusLabel}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-450 block">Location Tier</span>
              <p className="font-bold text-primary mt-1 capitalize">{onboarding?.serviceLocation?.locationTier || 'Not set'}</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'availability' && (
        <AvailabilityCard />
      )}

      {activeSubTab === 'preferences' && (
        <div className={`${cardClass} space-y-6 max-w-2xl`}>
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800/40">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">System Preferences</h3>
            <p className="text-[10px] text-slate-450 mt-0.5">Customize notification modes, system language, and security rules</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
              <div className="space-y-0.5">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Dark Visual Mode</span>
                <p className="text-[10px] text-slate-450">Toggles background dark theme across dashboard layouts.</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                  darkMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
              <div className="space-y-0.5">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">SMS Notifications</span>
                <p className="text-[10px] text-slate-450">Receive booking updates via standard mobile SMS alerts.</p>
              </div>
              <button
                onClick={() => alert('Preferences toggled.')}
                className="w-10 h-6 rounded-full p-1 cursor-pointer bg-primary flex items-center"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-md translate-x-4" />
              </button>
            </div>

            <div className="p-4 border border-rose-200/50 bg-rose-50/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
              <div className="space-y-1">
                <span className="text-xs font-black text-rose-650 uppercase tracking-wider block">Delete Account Directory</span>
                <p className="text-[10px] text-slate-450 max-w-sm leading-normal">Warning: Deleting your partner profile is permanent and wipes wallet history, profile ratings, and verified credentials.</p>
              </div>
              <button
                onClick={() => alert('Account deletion cannot be triggered in simulator mode.')}
                className="px-4 py-2 rounded-btn bg-danger hover:bg-danger-dark text-white text-[10px] font-extrabold uppercase cursor-pointer transition-all shrink-0"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
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

export function DocumentsSection({ onboarding, membership, setActiveTab }) {
  const [docTab, setDocTab] = React.useState('identity');
  
  // Welcome Kit Logic
  const applicationStatus = onboarding?.status;
  const kit = getWelcomeKitConfig();
  const status = getWelcomeKitEligibilityStatus(membership?.planId || 'free', applicationStatus);
  const planOk = kit.eligiblePlans.includes(membership?.planId);
  let kitLabel = 'Not Eligible';
  if (status.eligible) kitLabel = applicationStatus === 'activated' ? 'Delivered' : 'Eligible';
  else if (planOk) kitLabel = 'Pending Shipment';

  // Documents Logic
  const docs = onboarding?.documents || {};
  const completed = VERIFICATION_DOCUMENTS.filter((d) => docs[d.key]);
  const pending = VERIFICATION_DOCUMENTS.filter((d) => !docs[d.key]);
  
  const handleUpload = (docName) => alert(`Mock Upload Dialog for ${docName}`);

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Verification & Documents</h2>
        <p className="text-[11px] text-slate-400">Manage identity, licenses, terms, and welcome kits</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'identity', label: 'Identity Verification' },
            { id: 'licenses', label: 'Professional Licenses' },
            { id: 'welcome_kit', label: 'Welcome Kit Status' },
            { id: 'terms', label: 'Agreements & Terms' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
                docTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {docTab === 'identity' && (
        <div className={`${cardClass} space-y-6`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <ShieldCheck size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Identity Verification</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={labelClass}>Uploaded Documents</p>
              <ul className="mt-2 space-y-3">
                {completed.map((d) => (
                  <li key={d.key} className="p-3 border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-emerald-800 dark:text-emerald-200 flex items-center gap-1"><CheckCircle2 size={12} /> {d.label}</p>
                      <p className="text-[10px] text-emerald-600 mt-0.5">Status: Approved</p>
                    </div>
                  </li>
                ))}
                {completed.length === 0 && <li className="text-xs text-slate-400">No identity documents approved yet.</li>}
              </ul>
            </div>
            <div>
              <p className={labelClass}>Pending Documents</p>
              <ul className="mt-2 space-y-3">
                {pending.map((d) => (
                  <li key={d.key} className="p-3 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-amber-800 dark:text-amber-200 flex items-center gap-1"><AlertCircle size={12} /> {d.label}</p>
                      <p className="text-[10px] text-amber-600 mt-0.5">Status: Missing</p>
                    </div>
                    <button onClick={() => handleUpload(d.label)} className="text-[9px] bg-white dark:bg-slate-900 border border-amber-200 text-amber-700 px-2 py-1 rounded-md font-bold uppercase cursor-pointer hover:bg-amber-100">Upload</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {docTab === 'licenses' && (
        <div className={`${cardClass} space-y-4`}>
           <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <ClipboardList size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Professional Licenses & Certifications</h3>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
            <div>
              <p className="text-xs font-black text-slate-800 dark:text-slate-200">Trade License (Plumbing)</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Valid until Dec 2028</p>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">Verified</span>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
            <div>
              <p className="text-xs font-black text-slate-800 dark:text-slate-200">Police Clearance Certificate</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Expires in 60 days</p>
            </div>
            <button onClick={() => handleUpload('Police Clearance')} className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md font-bold uppercase cursor-pointer hover:bg-slate-300">Renew/Upload</button>
          </div>
        </div>
      )}

      {docTab === 'welcome_kit' && (
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <Package size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">{kit.title} Status</h3>
          </div>
          <p className={`text-sm font-bold ${status.eligible ? 'text-emerald-600' : 'text-amber-600'}`}>Current Status: {kitLabel}</p>
          <p className="text-xs text-slate-500">{kit.description}</p>
          {planOk ? (
            <ul className="grid sm:grid-cols-2 gap-2 mt-2">
              {kit.items.map((item) => (
                <li key={item.id} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 size={14} className="text-primary" /> {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-800 dark:text-amber-200">
              Upgrade to Growth or Enterprise to receive your Professional Welcome Kit (T-Shirts, ID Card, Toolkit).
              <button type="button" onClick={() => setActiveTab?.('membership')} className="mt-2 block w-full py-2 rounded-lg bg-amber-200 text-amber-900 font-black uppercase cursor-pointer hover:bg-amber-300 text-[10px]">
                Upgrade Membership Now
              </button>
            </div>
          )}
        </div>
      )}

      {docTab === 'terms' && (
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <ScrollText size={18} className="text-primary" />
            <h3 className="text-sm font-black uppercase tracking-wider">Agreements & Terms</h3>
          </div>
          <p className="text-xs text-slate-500">Review your digitally signed Professional Agreement and Platform T&Cs.</p>
          
          <div className="space-y-3">
            <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between bg-white dark:bg-slate-900">
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200">Master Service Agreement</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Signed on: Jul 15, 2026</p>
              </div>
              <Link to="/professional/terms" className="text-[9px] bg-primary/10 text-primary px-3 py-1.5 rounded-md font-bold uppercase cursor-pointer hover:bg-primary/20">View PDF</Link>
            </div>
            
            <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between bg-white dark:bg-slate-900">
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200">Payment & Escrow Terms</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Signed on: Jul 15, 2026</p>
              </div>
              <Link to="/professional/terms" className="text-[9px] bg-primary/10 text-primary px-3 py-1.5 rounded-md font-bold uppercase cursor-pointer hover:bg-primary/20">View PDF</Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export function HelpSupportModule({
  onboarding, professionLabel,
  ticketSubject, setTicketSubject, handleRaiseTicket, supportTickets, SUPPORT_FAQS
}) {
  const [supportTab, setSupportTab] = React.useState('onboarding');

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Help & Support</h2>
        <p className="text-[11px] text-slate-400">Track onboarding status, raise support tickets, and view FAQs</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'onboarding', label: 'Onboarding Status', icon: ClipboardList },
            { id: 'tickets', label: 'Raise a Ticket', icon: FileText },
            { id: 'hotline', label: 'Contact Helpline', icon: Phone },
            { id: 'faq', label: 'Partner FAQs', icon: LifeBuoy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSupportTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-colors cursor-pointer ${
                  supportTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {supportTab === 'onboarding' && (
        <div className="max-w-4xl">
          <OnboardingInfoSection onboarding={onboarding} professionLabel={professionLabel} />
        </div>
      )}

      {supportTab === 'tickets' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft text-left flex flex-col justify-between max-w-3xl">
          <div className="space-y-4 w-full">
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Partner Support Helpdesk</h3>
              <p className="text-[10px] text-slate-450 mt-0.5">Submit support queries directly to our operations panel</p>
            </div>

            <form onSubmit={handleRaiseTicket} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Subject details</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Booking payout inquiry"
                  className="w-full mt-1 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-btn bg-primary text-white text-[10px] font-black uppercase cursor-pointer transition-all hover:bg-primary-dark"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/40 w-full text-left">
            <h4 className="text-xs font-black text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-4">Raised Tickets History</h4>
            <div className="space-y-3">
              {supportTickets.map(tck => (
                <div key={tck.id} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{tck.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      tck.status === 'open' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' : 'bg-slate-100 text-slate-550 border border-slate-200/60'
                    }`}>
                      {tck.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">{tck.subject}</p>
                  <div className="mt-2 text-[10px] text-primary flex items-start gap-1 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-850/80 pt-1.5">
                    <span>↳</span>
                    <span>{tck.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {supportTab === 'hotline' && (
        <div className="max-w-sm bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-soft flex flex-col justify-between h-40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-white/80">Support Hotline</span>
            <Phone size={18} className="text-white/60" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black leading-none">1800 123 456</h4>
            <p className="text-[10px] text-white/70 font-semibold">Toll-free active 24/7 for partners</p>
          </div>
          <a
            href="tel:1800123456"
            className="w-full py-1.5 bg-white text-slate-900 text-center font-extrabold text-[10px] uppercase rounded-btn block hover:bg-slate-100 shadow-sm transition-colors"
          >
            Call Helpline Now
          </a>
        </div>
      )}

      {supportTab === 'faq' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft text-left max-w-4xl">
          <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Partner FAQs</h4>
          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            {SUPPORT_FAQS.map((faq, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="font-black text-slate-800 dark:text-slate-200 block">{faq.q}</span>
                <p className="mt-1 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
