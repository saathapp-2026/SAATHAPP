import React, { useState } from 'react';
import {
  User, Phone, Mail, MapPin, ShieldCheck, Award, Star, CheckCircle2,
  Lock, LogOut, Camera, FileText, Wallet, Truck, CreditCard, Bell,
  ChevronRight, ArrowRight, ShieldAlert, Heart, Calendar, Sparkles, Download,
  QrCode, Printer, X
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderProfileTab({ onSelectTab, onLogout }) {
  const { formData, dashboardData, addToast } = useDelivery();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [isAvatarUploadModalOpen, setIsAvatarUploadModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(formData.profilePhotoUrl || '');
  const [selectedPresetAvatar, setSelectedPresetAvatar] = useState(formData.profilePhotoUrl || '');

  const [profileData, setProfileData] = useState({
    fullName: formData.fullName || 'Rider',
    riderId: formData.riderId || 'SAATH-RIDER-0000',
    phone: formData.mobileNumber || '—',
    altPhone: '—',
    email: formData.email || '—',
    joinDate: formData.submissionDate || '—',
    address: formData.address || 'Not added yet',
    emergencyContactName: formData.emergencyContactName || 'Not added yet',
    emergencyContactPhone: formData.emergencyContact || '—',
    bloodGroup: formData.bloodGroup || '—',
    vehicleType: formData.vehicleType || 'Not specified',
    vehicleModel: formData.vehicleModel || '—',
    vehicleRegNo: formData.vehicleNumber || '—',
    fuelStatus: '—',
    bankName: formData.bankName || 'Not added yet',
    accountNo: formData.accountNumber ? `**** **** ${formData.accountNumber.slice(-4)}` : '—',
    ifscCode: formData.ifscCode || '—',
    upiId: formData.upiId || '—',
    customerRating: dashboardData?.kpis?.riderRating || 0,
    totalDeliveries: dashboardData?.kpis?.totalDeliveries || 0,
    onTimeRate: dashboardData?.kpis?.onTimeRate || '0%',
    acceptanceRate: dashboardData?.kpis?.acceptanceRate || '0%',
    tier: 'Rider Partner'
  });

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    addToast?.('Logged out successfully! Returning to home page...', 'info');
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-28 sa-fade">

      {/* ========================================================================= */}
      {/* 1. TOP RIDER PROFILE BANNER CARD                                         */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Background Decorative Gradient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar Container with Edit Camera Button */}
          <div
            onClick={() => setIsAvatarUploadModalOpen(true)}
            className="relative group shrink-0 cursor-pointer"
            title="Click to Upload / Change Rider Profile Picture"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-xl group-hover:scale-105 transition">
              <img
                src={currentAvatar}
                alt="Rider Profile"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAvatarUploadModalOpen(true);
              }}
              className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-amber-500 text-slate-950 shadow-lg hover:bg-amber-400 cursor-pointer active:scale-95 transition"
              title="Change Profile Photo"
            >
              <Camera size={16} />
            </button>
          </div>

          {/* Rider Info Details */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-3 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> VERIFIED RIDER AGENT
              </span>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                {profileData.tier}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">{profileData.fullName}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 font-mono">
              <span>ID: <strong className="text-amber-400 font-bold">{profileData.riderId}</strong></span>
              <span>Joined: <strong className="text-slate-200">{profileData.joinDate}</strong></span>
              <span>Active Zone: <strong className="text-emerald-400 font-sans">Patna Central</strong></span>
            </div>

            <p className="text-xs text-slate-400 font-medium pt-1">
              Motorcycle: <strong className="text-white font-mono">{profileData.vehicleRegNo}</strong> ({profileData.vehicleModel})
            </p>
          </div>

          {/* Top Right Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setIsIdCardModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer active:scale-95 transition select-none shadow-md"
            >
              <Download size={14} className="text-amber-400" /> Download ID Card
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

        {/* Lifetime Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Customer Rating</span>
            <strong className="text-lg font-black text-amber-400 font-mono flex items-center gap-1">
              {profileData.customerRating} <Star size={14} className="fill-amber-400 text-amber-400" />
            </strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Deliveries</span>
            <strong className="text-lg font-black text-white font-mono">{profileData.totalDeliveries} Orders</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">On-Time Arrival</span>
            <strong className="text-lg font-black text-emerald-400 font-mono">{profileData.onTimeRate}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Acceptance Rate</span>
            <strong className="text-lg font-black text-emerald-400 font-mono">{profileData.acceptanceRate}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Wallet Balance</span>
            <strong className="text-lg font-black text-amber-400 font-mono">₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Safety Record</span>
            <strong className="text-lg font-black text-emerald-400">100% Clean</strong>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. PROFILE DETAILS SECTIONS GRID                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Section A: Personal Information */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <User size={18} className="text-amber-500" /> Personal Information
            </h3>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Edit Details
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Full Registered Name</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profileData.fullName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Primary Mobile Number</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{profileData.phone} (Verified ✓)</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Alternate Mobile</span>
              <strong className="text-slate-900 dark:text-white font-mono font-bold">{profileData.altPhone}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Email Address</span>
              <strong className="text-slate-900 dark:text-white font-mono">{profileData.email}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Emergency SOS Contact</span>
              <strong className="text-rose-500 font-bold">{profileData.emergencyContactName} ({profileData.emergencyContactPhone})</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Blood Group</span>
              <strong className="text-rose-500 font-black font-mono">{profileData.bloodGroup}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-page space-y-1">
              <span className="text-slate-500 block">Residential Address</span>
              <strong className="text-slate-900 dark:text-white font-medium text-xs block">{profileData.address}</strong>
            </div>
          </div>
        </div>

        {/* Section B: Vehicle Details & Documents */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Truck size={18} className="text-emerald-500" /> Registered Vehicle &amp; Insurance
            </h3>
            <button
              type="button"
              onClick={() => onSelectTab?.('vehicle')}
              className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Manage Vehicle
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Vehicle Category</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profileData.vehicleType}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Model Name</span>
              <strong className="text-slate-900 dark:text-white font-bold">{profileData.vehicleModel}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Registration Number</span>
              <strong className="text-amber-500 font-mono font-black text-sm">{profileData.vehicleRegNo}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Fuel &amp; Allowance Status</span>
              <strong className="text-emerald-500 font-bold">{profileData.fuelStatus}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Vehicle RC Expiry</span>
              <strong className="text-emerald-500 font-mono">15 Nov 2030 (Verified ✓)</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Insurance Renewal Date</span>
              <strong className="text-amber-500 font-mono">15 Nov 2026</strong>
            </div>
          </div>
        </div>

        {/* Section C: Bank Account & Payout Details */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard size={18} className="text-purple-500" /> Bank Account &amp; Direct Payouts
            </h3>
            <button
              type="button"
              onClick={() => onSelectTab?.('wallet')}
              className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
            >
              Payout Settings
            </button>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Account Holder Name</span>
              <strong className="text-slate-900 dark:text-white font-extrabold">{profileData.fullName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Bank Name</span>
              <strong className="text-slate-900 dark:text-white font-bold">{profileData.bankName}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Bank Account Number</span>
              <strong className="text-amber-500 font-mono font-black">{profileData.accountNo}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Bank IFSC Code</span>
              <strong className="text-slate-900 dark:text-white font-mono">{profileData.ifscCode}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Linked UPI ID</span>
              <strong className="text-emerald-500 font-mono">{profileData.upiId}</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">KYC &amp; Penny Drop Verification</span>
              <strong className="text-emerald-500 font-black">Passed &amp; Active ✓</strong>
            </div>
          </div>
        </div>

        {/* Section D: Security & Preferences */}
        <div className="bg-surface p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={18} className="text-rose-500" /> Account Security &amp; App Controls
            </h3>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Protected 🔒</span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between items-center p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">App Security Lock PIN</span>
              <button type="button" onClick={() => addToast?.('Security PIN reset link sent via SMS', 'info')} className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline cursor-pointer">
                Change PIN
              </button>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">App Notifications</span>
              <span className="text-emerald-500 font-bold">Sound &amp; Push Active ✓</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-2xl bg-page">
              <span className="text-slate-500">Precise GPS Location</span>
              <span className="text-emerald-500 font-bold">Always On Shift ✓</span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
              <div>
                <strong className="text-rose-600 dark:text-rose-400 block font-black">Sign Out of Delivery App</strong>
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

      {/* LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center font-black text-2xl">
              <LogOut size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Confirm Logout?</h3>
            <p className="text-slate-500">Are you sure you want to log out of your SaathApp Rider Agent session?</p>

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
              <h3 className="text-base font-black text-slate-900 dark:text-white">Edit Personal Information</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-slate-400 font-bold p-1 cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Alternate Phone</label>
                <input
                  type="text"
                  value={profileData.altPhone}
                  onChange={(e) => setProfileData({ ...profileData, altPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Residential Address</label>
                <textarea
                  rows={2}
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
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
                  addToast?.('✅ Profile Information updated successfully!', 'success');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL SAATH RIDER DIGITAL ID CARD MODAL */}
      {isIdCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-white relative">
            <button
              type="button"
              onClick={() => setIsIdCardModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              ✕
            </button>

            {/* ID Card Front Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 border border-amber-500/40 p-5 space-y-4 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Company Brand Header */}
              <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                    🚚
                  </div>
                  <span className="font-black text-amber-400 text-xs tracking-wider">SAATHAPP LOGISTICS</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">VERIFIED RIDER</span>
              </div>

              {/* Photo & Basic Details */}
              <div className="flex items-center gap-4 text-left pt-1">
                <div className="w-20 h-20 rounded-2xl bg-amber-500 text-slate-900 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                  <span>{(profileData.fullName || 'R').charAt(0).toUpperCase()}</span>
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  <span className="text-[9px] text-amber-400 font-black uppercase tracking-widest block">SENIOR FLEET CAPTAIN</span>
                  <h3 className="text-base font-black text-white truncate">{profileData.fullName}</h3>
                  <div className="text-[11px] font-mono text-slate-300 font-bold">ID: <span className="text-amber-400">{profileData.riderId}</span></div>
                  <div className="text-[10px] text-slate-400 font-mono">Mobile: {profileData.phone}</div>
                </div>
              </div>

              {/* Vehicle & Hub Details */}
              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-left font-mono">
                <div><span className="text-slate-400 block">Vehicle Reg</span><strong className="text-white">{profileData.vehicleRegNo}</strong></div>
                <div><span className="text-slate-400 block">Assigned Hub</span><strong className="text-white">Patna Hub #12</strong></div>
                <div><span className="text-slate-400 block">Emergency SOS</span><strong className="text-rose-400">112 / 108</strong></div>
                <div><span className="text-slate-400 block">Valid Thru</span><strong className="text-emerald-400">15 NOV 2026</strong></div>
              </div>

              {/* QR Code Security Stamp */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-left text-[9px] text-slate-400">
                  <span>Official Agent Digital Badge</span><br />
                  <span className="text-amber-400 font-mono font-bold">Authorized Patna Zone</span>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded-xl shadow-md shrink-0">
                  <QrCode size={40} className="text-slate-950" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => addToast?.('🖨️ Sending ID Card to Printer...', 'info')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition"
              >
                <Printer size={14} /> Print Badge
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsIdCardModalOpen(false);
                  addToast?.('📥 Saath Official Rider ID Card PDF Downloaded!', 'success');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer active:scale-95 transition"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD RIDER PROFILE PHOTO MODAL */}
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
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-lg">
                <Camera size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Upload Profile Photo</h3>
                <p className="text-[11px] text-slate-500">Official photo used for Rider Verification &amp; Customer App</p>
              </div>
            </div>

            {/* Photo Guidelines Badge */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 font-medium space-y-1">
              <strong className="font-extrabold block text-amber-800 dark:text-amber-400">Photo Requirements:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Front-facing clear photo with good lighting</li>
                <li>No helmets, sunglasses, or face coverings</li>
                <li>Plain neutral background recommended</li>
              </ul>
            </div>

            {/* Selected Avatar Preview */}
            <div className="text-center space-y-3">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-xl relative">
                <img
                  src={selectedPresetAvatar}
                  alt="Selected Preview"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md border-2 border-white dark:border-slate-900">
                  ✓
                </span>
              </div>

              {/* Upload Device File Trigger */}
              <div>
                <input
                  type="file"
                  id="riderPhotoFileInput"
                  accept="image/*"
                  className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const newUrl = URL.createObjectURL(file);
                      setSelectedPresetAvatar(newUrl);
                      addToast?.(`📷 Photo selected: ${file.name}`, 'info');
                    }
                  }}
                />
                <label
                  htmlFor="riderPhotoFileInput"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-page hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs cursor-pointer transition active:scale-95 border border-slate-200"
                >
                  <Camera size={14} className="text-amber-500" /> Choose Photo from Device
                </label>
              </div>

              {/* Select Preset Rider Avatars */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Or Select Verified Rider Preset Avatar:</span>
                <div className="flex justify-center items-center gap-3">
                  {[].map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPresetAvatar(url)}
                      className={`w-12 h-12 rounded-full p-0.5 transition cursor-pointer active:scale-95 ${selectedPresetAvatar === url
                          ? 'ring-4 ring-amber-500 scale-110'
                          : 'opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover rounded-full" />
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
                  addToast?.('✅ Rider Profile Photo updated successfully!', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg cursor-pointer active:scale-95 transition"
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
