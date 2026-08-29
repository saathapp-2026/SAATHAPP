import React, { useState } from 'react';
import {
  Building2, User, Phone, Mail, MapPin, ShieldCheck, Award, Star, CheckCircle2,
  Lock, LogOut, Camera, FileText, Wallet, Warehouse, CreditCard, Bell,
  ChevronRight, ArrowRight, ShieldAlert, Heart, Calendar, Sparkles, Download,
  QrCode, Printer, BadgeCheck, FileCheck2, Globe, Clock, Truck, Shield
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import DocumentsTab from './DocumentsTab';
import SettingsTab from './SettingsTab';
import BrandingHardwareStoreTab from './BrandingHardwareStoreTab';

export const PROFILE_SUB_TABS = [
  'Wholesale Profile',
  'Business Information',
  'Business Settings',
  'Onboarding',
  'Documents',
  'GST / Tax Details',
  'Bank Details',
  'Account Settings',
  'Business Resources',
];

export default function WholesaleProfileTab({ onSelectTab, onLogout, initialSubTab = 'Wholesale Profile' }) {
  const { formData, dashboardData, addToast } = useWholesale();
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isAvatarUploadModalOpen, setIsAvatarUploadModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(formData.profilePhotoUrl || '');
  const [selectedPresetAvatar, setSelectedPresetAvatar] = useState(formData.profilePhotoUrl || '');

  const [profile, setProfile] = useState({
    businessName: formData.businessName || '',
    legalName: formData.businessName || '',
    gstin: formData.gstin || '',
    pan: formData.pan || '',
    entityType: formData.businessType || 'Enterprise',
    registeredAddress: formData.warehouseAddress || '',
    ownerName: formData.fullName || '',
    ownerPhone: formData.phone || '',
    altPhone: '',
    email: formData.email || '',
    website: '',
    bankName: formData.bankName || '',
    accountNo: formData.accountNo || '',
    ifscCode: formData.ifscCode || '',
    branch: '',
    settlementCycle: 'T+1 Daily Auto Settlement',
    warehouseCapacity: '—',
    moq: '—',
    rating: 0,
    totalOrders: '0 Shipments',
    activeDistricts: '—',
    joinDate: '—'
  });

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    addToast?.('Logged out successfully! Redirecting to SaathApp...', 'info');
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-28 sa-fade">

      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Profile &amp; Business Settings</h2>
          <p className="text-xs text-slate-500">Manage wholesale enterprise profile, legal documents, GST/bank details, onboarding, and business settings.</p>
        </div>
      </div>

      {/* Sub-Tabs Bar (PDF 4.8 Spec) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {PROFILE_SUB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={(e) => {
              setActiveSubTab(tab);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${
              activeSubTab === tab
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Sub-Tab Views */}
      {activeSubTab === 'Documents' ? (
        <DocumentsTab />
      ) : activeSubTab === 'Business Settings' || activeSubTab === 'Account Settings' ? (
        <SettingsTab />
      ) : activeSubTab === 'Business Resources' ? (
        <BrandingHardwareStoreTab />
      ) : activeSubTab === 'Business Information' ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white">Registered Enterprise Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Company Legal Name</label>
              <input type="text" readOnly value={profile.companyName} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 font-bold text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Trade / Brand Name</label>
              <input type="text" readOnly value={profile.tradeName} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 font-bold text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">GSTIN Identifier</label>
              <input type="text" readOnly value={profile.gstin} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 font-mono font-bold text-emerald-500" />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Trade License Number</label>
              <input type="text" readOnly value={profile.tradeLicense} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 font-mono font-bold text-slate-900 dark:text-white" />
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Onboarding' ? (
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white">B2B Partner Verification &amp; Onboarding Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'GSTIN Registration Verification', status: 'Verified 🟢', detail: 'Verified via Govt GST Portal' },
              { title: 'PAN Card Legal Identity', status: 'Verified 🟢', detail: 'Matches Enterprise Legal Entity' },
              { title: 'Bank Account Penny Drop Audit', status: 'Verified 🟢', detail: 'Registered Bank Account Verified' },
              { title: 'Depot Physical Verification', status: 'Verified 🟢', detail: 'Warehouse Location Audited' },
            ].map((step, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{step.title}</h4>
                  <span className="text-xs font-bold text-emerald-500">{step.status}</span>
                </div>
                <p className="text-xs text-slate-500">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      ) : activeSubTab === 'GST / Tax Details' ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white">GSTIN Compliance &amp; Tax Tier Setup</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-black">Active GSTIN</span>
                <strong className="text-sm font-mono font-black text-slate-900 dark:text-white block">{profile.gstin}</strong>
              </div>
              <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full">E-Invoice API Enabled</span>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Bank Details' ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white">Linked Bank Account for Daily Payouts</h3>
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-extrabold">HDFC BANK LIMITED</span>
              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Penny Drop Verified</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>Account Number: <strong className="text-white font-black">{profile.accountNo}</strong></div>
              <div>IFSC Code: <strong className="text-white font-black">{profile.ifsc}</strong></div>
            </div>
          </div>
        </div>
      ) : (
        <>
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar Container with Edit Camera Button */}
          <div
            onClick={() => setIsAvatarUploadModalOpen(true)}
            className="relative group shrink-0 cursor-pointer"
            title="Click to Upload / Change Wholesale Business Photo"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-300 p-1 shadow-xl group-hover:scale-105 transition">
              <img
                src={currentAvatar}
                alt="Business Owner"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAvatarUploadModalOpen(true);
              }}
              className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-emerald-500 text-slate-950 shadow-lg hover:bg-emerald-400 cursor-pointer active:scale-95 transition"
              title="Change Profile Photo"
            >
              <Camera size={16} />
            </button>
          </div>

          {/* Business Info Details */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-3 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} /> VERIFIED WHOLESALE ENTERPRISE
              </span>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                PLATINUM SUPPLIER 🏆
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">{profile.businessName}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 font-mono">
              <span>GSTIN: <strong className="text-emerald-400 font-bold">{profile.gstin}</strong></span>
              <span>Owner: <strong className="text-slate-200">{profile.ownerName}</strong></span>
              <span>Joined: <strong className="text-amber-400 font-sans">{profile.joinDate}</strong></span>
            </div>

            <p className="text-xs text-slate-400 font-medium pt-1">
              Central Warehouse: <strong className="text-white font-sans">{profile.registeredAddress}</strong>
            </p>
          </div>

          {/* Top Right Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setIsCertificateModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer active:scale-95 transition select-none shadow-md"
            >
              <BadgeCheck size={16} className="text-emerald-400" /> B2B Verification Certificate
            </button>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-black text-xs flex items-center justify-center gap-1.5 border border-rose-500/40 cursor-pointer active:scale-95 transition select-none shadow-md"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Wholesale Business Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Buyer Rating</span>
            <strong className="text-lg font-black text-amber-400 font-mono flex items-center gap-1">
              {profile.rating} <Star size={14} className="fill-amber-400 text-amber-400" />
            </strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Bulk Deliveries</span>
            <strong className="text-lg font-black text-white font-mono">{profile.totalOrders}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Coverage</span>
            <strong className="text-lg font-black text-emerald-400 font-mono">12 Districts</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Storage Capacity</span>
            <strong className="text-lg font-black text-emerald-400 font-mono">25k Sq Ft</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Wallet Balance</span>
            <strong className="text-lg font-black text-amber-400 font-mono">₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Settlement SLA</span>
            <strong className="text-lg font-black text-emerald-400">T+1 Daily</strong>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. PROFILE DETAILS SECTIONS GRID                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Section A: Business Legal Details */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 size={18} className="text-emerald-500" /> Business Information &amp; Legal Tax
            </h3>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Edit Details
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Enterprise Legal Name</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profile.legalName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">GSTIN Registration</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{profile.gstin} (Verified ✓)</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Company PAN Number</span>
              <strong className="text-slate-900 dark:text-white font-mono font-bold">{profile.pan}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Business Entity Type</span>
              <strong className="text-slate-900 dark:text-white font-bold">{profile.entityType}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Primary Authorized Representative</span>
              <strong className="text-slate-900 dark:text-white font-bold">{profile.ownerName} ({profile.ownerPhone})</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Official Business Email</span>
              <strong className="text-slate-900 dark:text-white font-mono">{profile.email}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-page space-y-1">
              <span className="text-slate-500 block">Registered Business Address</span>
              <strong className="text-slate-900 dark:text-white font-medium text-xs block">{profile.registeredAddress}</strong>
            </div>
          </div>
        </div>

        {/* Section B: Warehouse & Logistics Specifications */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Warehouse size={18} className="text-amber-500" /> Warehouse &amp; Logistics Network
            </h3>
            <button
              type="button"
              onClick={() => onSelectTab?.('inventory')}
              className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Manage Warehouses
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Central Storage Capacity</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profile.warehouseCapacity}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Minimum Order Quantity (MOQ)</span>
              <strong className="text-amber-500 font-bold">{profile.moq}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Active Service Districts</span>
              <strong className="text-emerald-500 font-bold">{profile.activeDistricts}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Order Dispatch SLA</span>
              <strong className="text-slate-900 dark:text-white font-bold">Same Day / 24 Hours Max</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Wholesale Quality Compliance</span>
              <strong className="text-emerald-500 font-mono">FSSAI &amp; ISO Certified ✓</strong>
            </div>
          </div>
        </div>

        {/* Section C: Bank Account & Payout Settlement */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard size={18} className="text-purple-500" /> Bank Settlement Account
            </h3>
            <button
              type="button"
              onClick={() => onSelectTab?.('finance')}
              className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Payout Settings
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Account Holder Name</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profile.legalName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Bank Name</span>
              <strong className="text-slate-900 dark:text-white font-bold">{profile.bankName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Account Number</span>
              <strong className="text-amber-500 font-mono font-black">{profile.accountNo}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">IFSC Code &amp; Branch</span>
              <strong className="text-slate-900 dark:text-white font-mono">{profile.ifscCode} ({profile.branch})</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Auto-Settlement Cycle</span>
              <strong className="text-emerald-500 font-black">{profile.settlementCycle} ✓</strong>
            </div>
          </div>
        </div>

        {/* Section D: Security & Account Controls */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={18} className="text-rose-500" /> Security &amp; Portal Logout
            </h3>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">2FA Encrypted 🔒</span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between items-center p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Enterprise Password / PIN</span>
              <button type="button" onClick={() => addToast?.('Password reset link sent to registered email', 'info')} className="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline cursor-pointer">
                Change Password
              </button>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Staff Sub-Accounts</span>
              <span className="text-slate-900 dark:text-white font-bold">3 Active Sub-Users</span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
              <div>
                <strong className="text-rose-600 dark:text-rose-400 block font-black">Sign Out of Wholesale Portal</strong>
                <span className="text-[11px] text-slate-500">End active session and return to login screen</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow cursor-pointer active:scale-95 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
      </>
      )}

      {/* LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center font-black text-2xl">
              <LogOut size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Confirm Logout?</h3>
            <p className="text-slate-500">Are you sure you want to log out of your SaathApp Wholesale Enterprise session?</p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-page text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black cursor-pointer shadow active:scale-95 transition"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Edit Business Details</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-slate-400 font-bold p-1 cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Business Trade Name</label>
                <input
                  type="text"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Representative Name</label>
                <input
                  type="text"
                  value={profile.ownerName}
                  onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Registered Address</label>
                <textarea
                  rows={2}
                  value={profile.registeredAddress}
                  onChange={(e) => setProfile({ ...profile, registeredAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 font-medium text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-page font-bold">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  addToast?.('✅ Business Information updated successfully!', 'success');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERIFICATION CERTIFICATE MODAL */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-white relative">
            <button
              type="button"
              onClick={() => setIsCertificateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 border border-emerald-500/40 p-5 space-y-4 shadow-xl text-center relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
                <span className="font-black text-emerald-400 text-xs tracking-wider uppercase">SAATHAPP B2B NETWORK</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">VERIFIED</span>
              </div>

              <div className="space-y-1">
                <BadgeCheck size={40} className="mx-auto text-emerald-400 animate-pulse" />
                <h3 className="text-base font-black text-white">{profile.businessName}</h3>
                <p className="text-[10px] text-slate-400 font-mono">GSTIN: {profile.gstin}</p>
                <p className="text-[11px] text-emerald-300 font-semibold pt-1">Authorized Wholesale Supplier Badge</p>
              </div>

              <div className="w-12 h-12 bg-white p-1 rounded-xl mx-auto shadow-md">
                <QrCode size={40} className="text-slate-950" />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsCertificateModalOpen(false);
                  addToast?.('📥 Wholesale B2B Verification Certificate Downloaded!', 'success');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Download size={14} /> Download Certificate PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD WHOLESALE REPRESENTATIVE PHOTO MODAL */}
      {isAvatarUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-xs sa-rise relative">
            <button
              type="button"
              onClick={() => setIsAvatarUploadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-lg">
                <Camera size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Upload Business Photo</h3>
                <p className="text-[11px] text-slate-500">Official photo / logo used for Wholesale B2B Verification</p>
              </div>
            </div>

            {/* Photo Guidelines Badge */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium space-y-1">
              <strong className="font-extrabold block text-emerald-800 dark:text-emerald-400">Upload Requirements:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                <li>High-resolution business logo or owner headshot</li>
                <li>Clear lighting without obstructions</li>
                <li>Supported formats: JPG, PNG, WEBP (Max 5MB)</li>
              </ul>
            </div>

            {/* Selected Avatar Preview */}
            <div className="text-center space-y-3">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 p-1 shadow-xl relative">
                <img
                  src={selectedPresetAvatar}
                  alt="Selected Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md border-2 border-white dark:border-slate-900">
                  ✓
                </span>
              </div>

              {/* Upload Device File Trigger */}
              <div>
                <input
                  type="file"
                  id="wholesalePhotoFileInput"
                  accept="image/*"
                  className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const newUrl = URL.createObjectURL(file);
                      setSelectedPresetAvatar(newUrl);
                      addToast?.(`📷 Business Photo selected: ${file.name}`, 'info');
                    }
                  }}
                />
                <label
                  htmlFor="wholesalePhotoFileInput"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-page hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs cursor-pointer transition active:scale-95 border border-slate-200"
                >
                  <Camera size={14} className="text-emerald-500" /> Choose Photo / Logo from Device
                </label>
              </div>

              {/* Select Preset Avatars */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Or Select Preset Business Avatar:</span>
                <div className="flex justify-center items-center gap-3">
                  {[].map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPresetAvatar(url)}
                      className={`w-12 h-12 rounded-xl p-0.5 transition cursor-pointer active:scale-95 ${
                        selectedPresetAvatar === url
                          ? 'ring-4 ring-emerald-500 scale-110'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAvatarUploadModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-page text-slate-700 dark:text-slate-300 font-bold cursor-pointer active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentAvatar(selectedPresetAvatar);
                  setIsAvatarUploadModalOpen(false);
                  addToast?.('✅ Wholesale Business Photo updated successfully!', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg cursor-pointer active:scale-95 transition"
              >
                Save &amp; Update Photo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
