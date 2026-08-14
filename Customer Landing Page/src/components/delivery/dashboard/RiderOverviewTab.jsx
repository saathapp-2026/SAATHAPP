import React, { useState } from 'react';
import {
  Wallet, Truck, CheckCircle2, Star, Navigation, MapPin, Phone, ShieldCheck,
  ArrowRight, Clock, Award, Zap, AlertTriangle, AlertCircle, RefreshCw, X,
  FileText, ShieldAlert, PhoneCall, MessageSquare, Camera, QrCode, FileCheck,
  TrendingUp, BarChart3, ChevronRight, HelpCircle, Layers, CheckSquare, Sparkles,
  Download, Eye, User, Lock, Send, DollarSign, Calendar, Mic, MicOff, Volume2, Plus,
  UploadCloud, Share2, MoreHorizontal, Shield, Activity, Wrench, Siren, Cross, Check,
  Folder, Compass, Power
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderOverviewTab({ onSelectTab, onOpenWithdrawModal }) {
  const { formData, dashboardData, addToast } = useDelivery();

  // Active Order State matching PDF Pages 3-5
  const [activeOrder, setActiveOrder] = useState({
    id: 'DEL-98420',
    type: 'Grocery & Medicine Delivery',
    priority: 'HIGH PRIORITY',
    pickupBeforeTime: '09:30 AM',
    deliveryDeadline: '10:15 AM',
    orderValue: 680,
    codAmount: 120,
    paymentMode: 'COD',
    packageWeight: '3.2 kg',
    itemsCount: 6,
    distanceKm: '3.2 KM',
    eta: '12 min',
    storeName: 'SaathApp Express Hub',
    storeAddress: 'Shop #12, Central Plaza, Patna - 800001',
    storeManager: 'Rajesh Sharma',
    storeMobile: '+91 98350 11223',
    storeOtp: '8942',
    pickupInstructions: 'Collect order parcel from Counter #3 behind main billing desk.',
    parkingInstructions: 'Park two-wheeler in Basement Level 1, Gate #2 (Free Delivery Parking).',
    customerName: 'Anil Kumar',
    customerMobile: '+91 98234 56789',
    customerAltMobile: '+91 98123 45678',
    customerAvatar: '',
    floorFlat: 'Floor 4, Flat 402, Royal Residence',
    landmark: 'Near Boring Road Chauraha, Opposite SBI Bank',
    deliveryNotes: 'Ring doorbell twice. Leave parcel with building security guard if gate is locked.',
    dropAddress: 'Royal Residence, Boring Road, Patna - 800001',
    deliveryPayout: 120,
    itemsList: [
      { name: 'Fresh Organic Milk (1L)', qty: '2 Pkts', weight: '1.0 kg' },
      { name: 'Multigrain Whole Wheat Bread', qty: '1 Pkt', weight: '0.4 kg' },
      { name: 'Paracetamol 650mg Tablets', qty: '1 Strip', weight: '0.1 kg' },
      { name: 'Basmati Rice Premium (1kg)', qty: '1 Pkt', weight: '1.0 kg' },
      { name: 'Fresh Farm Eggs (6 Pcs)', qty: '1 Tray', weight: '0.5 kg', fragile: true },
      { name: 'Cold Press Fruit Juice', qty: '1 Bottle', weight: '0.2 kg', tempSensitive: true }
    ]
  });

  // Workflow Step State (Page 5 PDF)
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(4);
  const [otpValue, setOtpValue] = useState(['4', '8', '2', '0']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Active Shift State (Page 2 PDF)
  const [shiftStatus, setShiftStatus] = useState('ACTIVE');

  // Active Interactive Popups/Modals
  const [activeModal, setActiveModal] = useState(null); // 'withdraw' | 'call' | 'chat' | 'issue' | 'emergency' | 'vehicle' | 'proof' | 'nav' | 'complete' | 'orderDetails' | 'cancelOrder' | 'photo' | 'qr' | 'signature' | 'shareLocation'
  const [callDetails, setCallDetails] = useState({ name: '', number: '', role: '' });
  const [chatDetails, setChatDetails] = useState({ name: '', role: '', messages: [] });
  const [chatInput, setChatInput] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);

  // Trigger Phone Call Modal
  const triggerCall = (name, number, role) => {
    setCallDetails({ name, number, role });
    setActiveModal('call');
    addToast?.(`Initiating call to ${name} (${number})...`, 'info');
  };

  // Trigger In-App Chat Modal
  const triggerChat = (name, role) => {
    setChatDetails({
      name,
      role,
      messages: [
        { sender: name, text: `Hello Vikram, reaching drop location soon?`, time: '09:30 AM' },
        { sender: 'You', text: `Yes, on the way! ETA 12 minutes.`, time: '09:31 AM' },
      ],
    });
    setActiveModal('chat');
  };

  // Handle Send Chat Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'You', text: chatInput, time: 'Just now' };
    setChatDetails((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }));
    setChatInput('');
    addToast?.('Message sent successfully', 'success');
  };

  // OTP Verification Handler (Page 5 PDF)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpValue.join('');
    if (enteredOtp !== '4820') {
      addToast?.('❌ Invalid OTP! Ask customer for correct 4-digit OTP', 'error');
      return;
    }
    setIsOtpVerified(true);
    setCurrentWorkflowStep(6);
    addToast?.('🎉 OTP Verified successfully! Proceeding to delivery completion.', 'success');
  };

  // Complete Delivery Handler
  const handleCompleteDelivery = () => {
    if (!isOtpVerified) {
      addToast?.('Please verify 4-digit OTP before completing delivery', 'warning');
      return;
    }
    setActiveModal('complete');
  };

  return (
    <div className="space-y-6 pb-32 sa-fade">

      {/* ========================================================================= */}
      {/* 1. TOP ACTIVE SHIFT BANNER & CONTROLS (Page 1 & 2 PDF)                    */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-slate-900 text-white p-5 sm:p-7 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0 border border-amber-500/30">
              <Truck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  • ONLINE (ON SHIFT)
                </span>
                <span className="text-slate-400 text-xs font-mono">Shift: 09:15 AM – 09:15 PM</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Welcome back, {formData.fullName || 'Vikram Singh'}!
              </h2>
              <p className="text-xs text-slate-300">
                Registered vehicle: <strong className="text-amber-400 font-mono">Motorcycle / Scooter (BR-01-AB-9842)</strong> • Active Zone: <strong className="text-emerald-400">Patna Central</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setShiftStatus(shiftStatus === 'ON_BREAK' ? 'ACTIVE' : 'ON_BREAK');
                addToast?.(shiftStatus === 'ON_BREAK' ? 'Shift Resumed!' : 'Break Started (15m timer)', 'info');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer active:scale-95 touch-manipulation select-none ${
                shiftStatus === 'ON_BREAK'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {shiftStatus === 'ON_BREAK' ? 'Resume Shift' : 'Pause / Start Break'}
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('endShift')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 text-xs font-extrabold transition cursor-pointer active:scale-95 touch-manipulation select-none"
            >
              End Shift
            </button>

            <button
              type="button"
              onClick={onOpenWithdrawModal || (() => onSelectTab?.('wallet'))}
              className="px-5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition hover:scale-105 cursor-pointer active:scale-95 touch-manipulation flex items-center gap-1.5 select-none"
            >
              <Wallet size={15} /> Withdraw Wallet ₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Row (Page 2 PDF) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-3 border-t border-slate-800 text-[11px]">
          <div onClick={() => addToast?.('Shift Start Time: 09:15 AM', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Shift Start</span><strong className="text-white font-mono">09:15 AM</strong></div>
          <div onClick={() => addToast?.('Shift End Time: 09:15 PM', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Shift End</span><strong className="text-white font-mono">09:15 PM</strong></div>
          <div onClick={() => addToast?.('Total Working Hours: 04h 25m', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Working Hours</span><strong className="text-emerald-400 font-mono">04h 25m</strong></div>
          <div onClick={() => addToast?.('Break Time Used: 15m (15m remaining)', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Break Time</span><strong className="text-amber-400 font-mono">15m</strong></div>
          <div onClick={() => addToast?.('Active Zone: Patna South (High Demand)', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Active Zone</span><strong className="text-white">Patna South</strong></div>
          <div onClick={() => addToast?.('Assigned Hub: SaathApp Express Hub #12', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Assigned Hub</span><strong className="text-white truncate block max-w-[100px]">Express Hub #12</strong></div>
          <div onClick={() => addToast?.('Fuel Status: 75% Good (Allowance ₹50/day)', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Fuel Status</span><strong className="text-emerald-400">75% Good</strong></div>
          <div onClick={() => addToast?.('Vehicle Inspection: Passed & Certified', 'info')} className="cursor-pointer active:scale-95 transition hover:bg-slate-800/50 p-1 rounded-xl"><span className="text-slate-500 block">Vehicle Health</span><strong className="text-emerald-400">Inspected</strong></div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. KPI METRICS CARDS GRID (14 CARDS - Page 3 PDF)                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Pending Deliveries', val: '1 Order', color: 'text-amber-500', icon: Clock },
          { label: 'Completed Today', val: '14 Orders', color: 'text-emerald-500', icon: CheckCircle2 },
          { label: 'Cancelled Orders', val: '0', color: 'text-slate-400', icon: X },
          { label: 'Earnings Today', val: '₹1,450', color: 'text-amber-500', icon: Wallet },
          { label: 'Weekly Earnings', val: '₹8,900', color: 'text-emerald-500', icon: Wallet },
          { label: 'Monthly Earnings', val: '₹38,450', color: 'text-purple-500', icon: Wallet },
          { label: 'Distance Travelled', val: '128 KM', color: 'text-blue-500', icon: Navigation },
          { label: 'Avg Delivery Time', val: '18 min', color: 'text-teal-500', icon: Clock },
          { label: 'Customer Rating', val: '4.9 ★', color: 'text-amber-400', icon: Star },
          { label: 'Bonus Earned', val: '₹350', color: 'text-emerald-500', icon: Award },
          { label: 'Incentive Progress', val: '70%', color: 'text-emerald-500', icon: Zap },
          { label: 'Fuel Allowance', val: '₹50', color: 'text-amber-500', icon: DollarSign },
          { label: 'Cash Collection', val: '₹120', color: 'text-slate-700 dark:text-slate-300', icon: Wallet },
          { label: 'COD Pending', val: '₹120', color: 'text-rose-500', icon: AlertCircle },
        ].map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => addToast?.(`View ${kpi.label} details: ${kpi.val}`, 'info')}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm hover:shadow-md hover:border-amber-500/40 transition cursor-pointer active:scale-95 touch-manipulation select-none"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase truncate">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <strong className={`text-base font-black font-mono block ${kpi.color}`}>{kpi.val}</strong>
          </div>
        ))}
      </div>


      {/* ========================================================================= */}
      {/* 2.5 QUICK ACTIONS BAR (Dominant Real-Time Control Center)                  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Quick Actions
          </h3>
          <span className="text-[10px] font-bold text-slate-400">Rider Real-Time Controls</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-extrabold">
          {/* 1. Go Online / Offline */}
          <button
            type="button"
            onClick={() => {
              setShiftStatus(shiftStatus === 'OFFLINE' ? 'ACTIVE' : 'OFFLINE');
              addToast?.(shiftStatus === 'OFFLINE' ? 'Status set to ONLINE' : 'Status set to OFFLINE', 'info');
            }}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition text-center ${
              shiftStatus === 'ACTIVE'
                ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Power size={18} />
            <span className="text-[10px] leading-tight font-black">{shiftStatus === 'ACTIVE' ? 'Go Offline' : 'Go Online'}</span>
          </button>

          {/* 2. Start / Pause Break */}
          <button
            type="button"
            onClick={() => {
              setShiftStatus(shiftStatus === 'ON_BREAK' ? 'ACTIVE' : 'ON_BREAK');
              addToast?.(shiftStatus === 'ON_BREAK' ? 'Break Ended! Shift Resumed' : 'Break Started! 15m timer', 'info');
            }}
            className="p-3 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition text-center"
          >
            <Clock size={18} />
            <span className="text-[10px] leading-tight font-black">{shiftStatus === 'ON_BREAK' ? 'Resume Shift' : 'Start Break'}</span>
          </button>

          {/* 3. End Shift */}
          <button
            type="button"
            onClick={() => setActiveModal('endShift')}
            className="p-3 rounded-2xl bg-rose-500/15 text-rose-500 border border-rose-500/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition text-center"
          >
            <X size={18} />
            <span className="text-[10px] leading-tight font-black">End Shift</span>
          </button>

          {/* 4. View Active Delivery */}
          <button
            type="button"
            onClick={() => onSelectTab?.('orders')}
            className="p-3 rounded-2xl bg-blue-500/15 text-blue-500 border border-blue-500/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition text-center"
          >
            <Truck size={18} />
            <span className="text-[10px] leading-tight font-black">Active Delivery</span>
          </button>

          {/* 5. Navigate */}
          <button
            type="button"
            onClick={() => {
              setActiveModal('nav');
              addToast?.('🧭 Initiating Turn-by-Turn GPS Navigation...', 'info');
            }}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition text-center col-span-2 sm:col-span-1"
          >
            <Navigation size={18} />
            <span className="text-[10px] leading-tight font-black">Navigate</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LIVE DELIVERY CARD & NAVIGATION SPLIT ROW (Pages 3-6 PDF)              */}
      {/* ========================================================================= */}
      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (2 Cols): Live Assigned Delivery Card */}
          <div className="lg:col-span-2 rounded-3xl border border-amber-500/40 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xl space-y-5">

            {/* Compact Workflow Progress Bar Strip */}
            <div className="bg-slate-950 text-white p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-inner">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-500/20 text-amber-400 font-mono font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Step {currentWorkflowStep} of 5
                </span>
                <span className="font-extrabold text-slate-200">
                  Workflow: {currentWorkflowStep === 1 ? 'Dashboard' : currentWorkflowStep === 2 ? 'Active Delivery' : currentWorkflowStep === 3 ? 'Pickup Location' : currentWorkflowStep === 4 ? 'En-Route Delivery' : 'Delivered & Complete'}
                </span>
              </div>

              <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
                {[
                  { step: 1, label: 'Dashboard' },
                  { step: 2, label: 'Active' },
                  { step: 3, label: 'Pickup' },
                  { step: 4, label: 'Delivery' },
                  { step: 5, label: 'Complete' },
                ].map((s) => {
                  const isActive = currentWorkflowStep === s.step;
                  const isDone = currentWorkflowStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={(e) => {
                        setCurrentWorkflowStep(s.step);
                        e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                        addToast?.(`Workflow step set to Step ${s.step}: ${s.label}`, 'info');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                          : isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-[9px]">{isDone ? '✓' : s.step}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => onSelectTab?.('orders')}
                  className="text-amber-400 text-[10px] font-extrabold hover:underline ml-1.5 whitespace-nowrap cursor-pointer"
                >
                  Open Full Workflow &gt;
                </button>
              </div>
            </div>

            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black shrink-0">
                  <Truck size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-slate-900 dark:text-white">{activeOrder.id}</span>
                    <button
                      type="button"
                      onClick={() => setActiveModal('orderDetails')}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full cursor-pointer active:scale-95 transition"
                    >
                      View Items List (6)
                    </button>
                    <span className="bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      {activeOrder.priority}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mt-0.5">
                    ASSIGNED &amp; EN-ROUTE
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">DELIVERY PAYOUT</span>
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">₹{activeOrder.deliveryPayout}</span>
              </div>
            </div>

            {/* LIVE ORDER SPECIFICATIONS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div onClick={() => addToast?.('Order Priority: HIGH PRIORITY (Urgent Medicine & Grocery)', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Order Priority</span><strong className="text-rose-500 font-black">{activeOrder.priority}</strong></div>
              <div onClick={() => addToast?.('Order Type: Grocery & Medicine Express', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Order Type</span><strong className="text-emerald-500 font-black">{activeOrder.type}</strong></div>
              <div onClick={() => addToast?.('Pickup Before: 09:30 AM', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Before</span><strong className="text-amber-500 font-mono font-black">{activeOrder.pickupBeforeTime}</strong></div>
              <div onClick={() => addToast?.('Delivery Deadline: 10:15 AM', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Deadline</span><strong className="text-rose-500 font-mono font-black">{activeOrder.deliveryDeadline}</strong></div>
              <div onClick={() => addToast?.('Total Order Value: ₹680', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Total Order Value</span><strong className="text-slate-900 dark:text-white font-mono font-black">₹{activeOrder.orderValue}</strong></div>
              <div onClick={() => addToast?.('Collect COD Cash: ₹120', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">COD Amount</span><strong className="text-slate-900 dark:text-white font-mono font-black">₹{activeOrder.codAmount}</strong></div>
              <div onClick={() => addToast?.('Payment Mode: Cash On Delivery', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Mode</span><strong className="text-rose-500 font-black">{activeOrder.paymentMode}</strong></div>
              <div onClick={() => addToast?.('Package Weight: 3.2 kg', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Package Weight</span><strong className="text-slate-900 dark:text-white font-mono font-black">{activeOrder.packageWeight}</strong></div>
              <div onClick={() => setActiveModal('orderDetails')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Number of Items</span><strong className="text-slate-900 dark:text-white font-black">{activeOrder.itemsCount} Items</strong></div>
              <div onClick={() => addToast?.('ETA: 12 min (3.2 KM)', 'info')} className="cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-900"><span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Delivery</span><strong className="text-emerald-500 font-mono font-black">{activeOrder.eta} ({activeOrder.distanceKm})</strong></div>
            </div>

            {/* 1. PICKUP LOCATION CARD */}
            <div className="rounded-3xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/10 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow">1</div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    1. PICKUP LOCATION &amp; STORE DETAILS
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Reached Store 09:28 AM
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-md ring-2 ring-amber-500/30">
                  🏪
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-black text-slate-900 dark:text-white text-base">{activeOrder.storeName}</h4>
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      Pickup OTP / QR: {activeOrder.storeOtp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{activeOrder.storeAddress}</p>
                  
                  <div className="flex items-center gap-3 text-xs pt-1 flex-wrap">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      👤 Contact: <strong className="text-slate-900 dark:text-white">{activeOrder.storeManager}</strong>
                    </span>
                    <button type="button" onClick={() => triggerCall(`SaathApp Store (${activeOrder.storeManager})`, activeOrder.storeMobile, 'Store Manager')} className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline cursor-pointer active:scale-95 transition">
                      📞 {activeOrder.storeMobile}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white dark:bg-slate-900 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 font-semibold">
                <div onClick={() => addToast?.('Pickup instruction noted', 'info')} className="space-y-0.5 cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase block">📦 Pickup Instructions</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.pickupInstructions}</p>
                </div>
                <div onClick={() => addToast?.('Parking instruction noted', 'info')} className="space-y-0.5 cursor-pointer active:scale-95 transition p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase block">🅿️ Parking Instructions</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.parkingInstructions}</p>
                </div>
              </div>

              {/* Store Action Buttons (Page 9 & 10 PDF) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('navStore');
                    addToast?.('🧭 Navigating to SaathApp Express Hub Store...', 'info');
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-slate-100 cursor-pointer active:scale-95 transition touch-manipulation shadow-sm select-none"
                >
                  <Navigation size={13} className="text-amber-500" /> Navigate to Store
                </button>

                <button type="button" onClick={() => triggerCall(`SaathApp Store (${activeOrder.storeManager})`, activeOrder.storeMobile, 'Store Manager')} className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer active:scale-95 transition touch-manipulation shadow select-none">
                  <Phone size={13} /> Call Store
                </button>
                <button type="button" onClick={() => triggerChat(`${activeOrder.storeManager} (Store Manager)`, 'Store Manager')} className="px-3.5 py-1.5 rounded-xl border border-amber-500/40 font-black text-xs text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-950 hover:bg-amber-500/10 cursor-pointer active:scale-95 transition touch-manipulation select-none">
                  <MessageSquare size={13} className="text-blue-500" /> Chat Store
                </button>
                <button type="button" onClick={() => setActiveModal('issue')} className="px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 font-bold text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-100 cursor-pointer active:scale-95 transition touch-manipulation select-none">
                  <AlertTriangle size={13} /> Report Store Issue
                </button>
              </div>
            </div>

            {/* 2. CUSTOMER DROPOFF CARD (Page 4 PDF) */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/10 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow">2</div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    2. CUSTOMER DROPOFF DETAILS ({activeOrder.distanceKm})
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  On The Way (ETA 12 min)
                </span>
              </div>

              {/* Customer Info Row */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md ring-2 ring-emerald-500/30 overflow-hidden">
                  <img src={activeOrder.customerAvatar} alt="Customer" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-black text-slate-900 dark:text-white text-base">{activeOrder.customerName}</h4>
                    <span className="text-[11px] font-mono font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                      Collect COD Cash: ₹{activeOrder.codAmount} ({activeOrder.paymentMode})
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    🏢 <strong>{activeOrder.floorFlat}</strong> • {activeOrder.dropAddress}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    📍 <strong>Landmark:</strong> {activeOrder.landmark}
                  </p>

                  <div className="flex items-center gap-4 text-xs pt-1 flex-wrap font-mono font-bold">
                    <button type="button" onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerMobile, 'Customer')} className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer active:scale-95 transition">
                      📞 Mobile: <strong className="text-slate-900 dark:text-white">{activeOrder.customerMobile}</strong>
                    </button>
                    <button type="button" onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerAltMobile, 'Customer Alt')} className="text-slate-500 hover:underline cursor-pointer active:scale-95 transition">
                      ☎️ Alt Mobile: <strong className="text-slate-700 dark:text-slate-300">{activeOrder.customerAltMobile}</strong>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Notes Box */}
              <div onClick={() => addToast?.('Customer delivery notes noted', 'info')} className="text-xs bg-white dark:bg-slate-900 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 font-semibold space-y-0.5 cursor-pointer active:scale-95 transition">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase block">📝 Customer Delivery Instructions</span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.deliveryNotes}</p>
              </div>

              {/* Customer Action Buttons (Page 9 PDF) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button type="button" onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerMobile, 'Customer')} className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1 cursor-pointer active:scale-95 transition touch-manipulation shadow select-none">
                  <Phone size={13} /> Call Customer
                </button>
                <button type="button" onClick={() => triggerChat(activeOrder.customerName, 'Customer')} className="px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-black text-xs text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 hover:bg-emerald-500/10 cursor-pointer active:scale-95 transition touch-manipulation select-none">
                  <MessageSquare size={13} className="text-blue-500" /> Chat Customer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('shareEta')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-slate-100 cursor-pointer active:scale-95 transition touch-manipulation shadow-sm select-none"
                >
                  <Clock size={13} className="text-amber-500" /> Share ETA
                </button>
                <button type="button" onClick={() => setActiveModal('shareLocation')} className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-slate-100 cursor-pointer active:scale-95 transition touch-manipulation shadow-sm select-none">
                  <Share2 size={13} className="text-purple-500" /> Share Live Location
                </button>
              </div>
            </div>

            {/* QUICK ACCESS BAR (Shown on Page 1 Screenshot) */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">
                QUICK ACCESS DASHBOARD SHORTCUTS
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center text-xs font-extrabold pt-1">
                <button type="button" onClick={() => onSelectTab?.('wallet')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
                    📊
                  </div>
                  <span className="text-[11px] font-black">Earnings Report</span>
                </button>

                <button type="button" onClick={() => onSelectTab?.('history')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:bg-rose-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-lg">
                    📅
                  </div>
                  <span className="text-[11px] font-black">Completed Today</span>
                </button>

                <button type="button" onClick={() => onSelectTab?.('ratings')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg">
                    📈
                  </div>
                  <span className="text-[11px] font-black">My Performance</span>
                </button>

                <button type="button" onClick={() => onSelectTab?.('documents')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
                    📄
                  </div>
                  <span className="text-[11px] font-black">Vehicle Docs</span>
                </button>

                <button type="button" onClick={() => onSelectTab?.('training')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:bg-purple-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-lg">
                    🎓
                  </div>
                  <span className="text-[11px] font-black">Training Center</span>
                </button>

                <button type="button" onClick={() => addToast?.('Referral Link copied! Share with friends to earn ₹1,500 bonus.', 'success')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-yellow-500/50 hover:bg-yellow-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-50 dark:bg-yellow-950/60 border border-yellow-200 dark:border-yellow-800/40 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-black text-lg">
                    🎁
                  </div>
                  <span className="text-[11px] font-black">Refer &amp; Earn</span>
                </button>

                <button type="button" onClick={() => onSelectTab?.('support')} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:bg-sky-50/20 text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg">
                    ❓
                  </div>
                  <span className="text-[11px] font-black">Help Center</span>
                </button>
              </div>
            </div>

            {/* 3. DELIVERY STATUS WORKFLOW PROGRESS TRACKER (Page 5 PDF) */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">Live Delivery Workflow Tracker</h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[10px] font-extrabold text-center pt-2">
                {[
                  { step: 1, label: 'Assigned', done: true },
                  { step: 2, label: 'Reached Store', done: true },
                  { step: 3, label: 'Picked Up', done: currentWorkflowStep >= 3 },
                  { step: 4, label: 'On The Way', done: currentWorkflowStep >= 4 },
                  { step: 5, label: 'Reached Customer', done: currentWorkflowStep >= 5 },
                  { step: 6, label: 'Delivered', done: currentWorkflowStep >= 6 },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition" onClick={() => setCurrentWorkflowStep(s.step)}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black ${s.done ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                      {s.done ? '✓' : s.step}
                    </div>
                    <span className={s.done ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-400'}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. CUSTOMER OTP & PROOF VERIFICATION MODULE (Page 5 & 10 PDF) */}
            <form onSubmit={handleVerifyOtp} className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2.5">
                <div>
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">CUSTOMER DELIVERY OTP</span>
                  <p className="text-xs text-slate-300">Ask customer for 4-digit OTP upon arrival at dropoff address.</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  ⏳ 02:45 Remaining
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {otpValue.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otpValue];
                        newOtp[idx] = e.target.value;
                        setOtpValue(newOtp);
                      }}
                      className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-center font-mono text-lg font-black text-amber-400 focus:outline-none focus:border-amber-500"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button type="button" onClick={() => addToast?.('Resent OTP to customer mobile', 'info')} className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer active:scale-95 transition select-none">
                    Resend OTP
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer active:scale-95 transition select-none">
                    Verify OTP
                  </button>
                </div>
              </div>

              {/* Delivery Proof Action Buttons (Page 10 PDF) */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setActiveModal('photo')} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-700 cursor-pointer active:scale-95 transition select-none">
                  <Camera size={13} /> {photoCaptured ? 'Photo Attached ✓' : 'Upload Photo'}
                </button>
                <button type="button" onClick={() => setActiveModal('qr')} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-700 cursor-pointer active:scale-95 transition select-none">
                  <QrCode size={13} /> Scan QR
                </button>
                <button type="button" onClick={() => setActiveModal('signature')} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-700 cursor-pointer active:scale-95 transition select-none">
                  <FileCheck size={13} /> {signatureSaved ? 'Signature Saved ✓' : 'Capture Signature'}
                </button>
                <button type="button" onClick={() => { setVoiceRecorded(!voiceRecorded); addToast?.(voiceRecorded ? 'Voice note deleted' : '🎤 Recorded delivery audio note!', 'info'); }} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-700 cursor-pointer active:scale-95 transition select-none">
                  <Mic size={13} className="text-amber-400" /> {voiceRecorded ? 'Voice Note Saved ✓' : 'Voice Note'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (1 Col): Wallet Balance, Today's Earnings, Current Shift, Today's Incentive Progress */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl space-y-4 h-fit">
            <div className="space-y-4">
              
              {/* 1. WALLET BALANCE CARD (Shown on Page 1 Screenshot) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 space-y-3 shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/10 px-2.5 py-0.5 rounded-full">
                    WALLET BALANCE
                  </span>
                  <span className="text-xs font-black font-mono">₹2,450</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenWithdrawModal || (() => onSelectTab?.('wallet'))}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-amber-400 font-black text-xs shadow hover:bg-slate-900 cursor-pointer active:scale-95 transition select-none"
                >
                  ⚡ Withdraw Wallet ₹2,450
                </button>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-center">
                  <button type="button" onClick={() => onSelectTab?.('wallet')} className="py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-slate-950 cursor-pointer active:scale-95 transition">
                    Wallet History
                  </button>
                  <button type="button" onClick={() => onSelectTab?.('wallet')} className="py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-slate-950 cursor-pointer active:scale-95 transition">
                    Statement
                  </button>
                </div>
              </div>

              {/* 2. TODAY'S EARNINGS BREAKUP CARD (Page 1 Screenshot & Page 7 PDF) */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-1.5">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">TODAY'S EARNINGS BREAKUP</h4>
                  <button type="button" onClick={() => onSelectTab?.('wallet')} className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    View All
                  </button>
                </div>
                <div className="space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between"><span className="text-slate-500">Base Fare</span><strong className="font-mono text-slate-900 dark:text-white">₹950</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Incentive</span><strong className="font-mono text-emerald-500">₹300</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Peak Bonus</span><strong className="font-mono text-amber-500">₹150</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Fuel Allowance</span><strong className="font-mono text-blue-500">₹50</strong></div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-800 font-extrabold text-sm"><span className="text-slate-900 dark:text-white">Total Earnings</span><strong className="font-mono text-amber-500">₹1,450</strong></div>
                </div>
              </div>

              {/* 3. CURRENT SHIFT CARD (Page 1 Screenshot & Page 2 PDF) */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-1.5">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">CURRENT SHIFT</h4>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-bold text-center">
                  <div><span className="text-[9px] text-slate-400 block">Start Time</span><strong className="font-mono text-slate-900 dark:text-white">09:15 AM</strong></div>
                  <div><span className="text-[9px] text-slate-400 block">End Time</span><strong className="font-mono text-slate-900 dark:text-white">09:15 PM</strong></div>
                  <div><span className="text-[9px] text-slate-400 block">Working Hours</span><strong className="font-mono text-emerald-500">04h 25m</strong></div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold">
                  <button type="button" onClick={() => addToast?.('Pause Break toggled', 'info')} className="py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-center cursor-pointer active:scale-95 transition select-none">
                    ❚❚ Start Break
                  </button>
                  <button type="button" onClick={() => setActiveModal('endShift')} className="py-1.5 rounded-xl bg-rose-500/10 text-rose-500 text-center cursor-pointer active:scale-95 transition select-none">
                    ⏹ End Shift
                  </button>
                </div>
              </div>

              {/* 4. TODAY'S INCENTIVE PROGRESS CARD (Page 1 Screenshot & Page 7-8 PDF) */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">TODAY'S INCENTIVE PROGRESS</h4>
                  <span className="text-[10px] font-mono font-bold text-amber-500">70%</span>
                </div>
                <p className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400">
                  ₹350 more to unlock ₹500 bonus
                </p>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full w-[70%]" />
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center pt-1">
                  <div><span className="text-slate-400 block">Target</span><strong className="font-mono text-slate-900 dark:text-white">₹500</strong></div>
                  <div><span className="text-slate-400 block">Earned</span><strong className="font-mono text-emerald-500">₹350</strong></div>
                  <div><span className="text-slate-400 block">Remaining</span><strong className="font-mono text-rose-500">₹150</strong></div>
                </div>
              </div>

              {/* LIVE ROUTE MAP CARD (Page 6 PDF Specification) */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation size={15} /> Live Route Map
                  </span>
                  <button
                    type="button"
                    onClick={() => addToast?.('Opening Google Maps Live Route...', 'info')}
                    className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition select-none"
                  >
                    Google Maps &gt;
                  </button>
                </div>

                {/* Interactive SVG Map Container */}
                <div className="w-full h-56 rounded-2xl bg-[#e5e3df] dark:bg-[#1f293d] relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col justify-between p-3 select-none">
                  {/* Dashed Route Path Animation */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500 dark:stroke-blue-400" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 40 40 L 90 40 L 110 90 L 90 140 L 140 180" strokeDasharray="6,6" className="animate-pulse" />
                  </svg>

                  {/* Pickup Point Marker */}
                  <div className="absolute top-4 left-6 flex items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-lg border-2 border-white">📍</div>
                    <div className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-2 py-0.5 rounded-md text-[10px] font-black shadow border border-slate-200 dark:border-slate-800">Gandhi Maidan</div>
                  </div>

                  {/* Animated Rider Bike Marker */}
                  <div className="absolute top-20 left-20 z-10 flex items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xl ring-4 ring-amber-500/30 animate-bounce">
                      <Truck size={16} />
                    </div>
                  </div>

                  {/* Customer Dropoff Marker */}
                  <div className="absolute bottom-5 left-24 flex items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shadow-lg border-2 border-white">🎯</div>
                    <div className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-2 py-0.5 rounded-md text-[10px] font-black shadow border border-slate-200 dark:border-slate-800">Kankarbagh</div>
                  </div>

                  {/* City Landmarks Labels */}
                  <div className="absolute top-12 right-12 text-[9px] font-mono font-bold text-slate-600 dark:text-slate-400">Patna Junction</div>
                  <div className="absolute bottom-12 right-8 text-[9px] font-mono font-bold text-slate-600 dark:text-slate-400">Rajendra Nagar</div>

                  {/* Floating Route Info Overlay Pill */}
                  <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl border border-slate-700 text-[10px] font-mono font-bold space-y-0.5 shadow-md">
                    <div>Dist: <span className="text-amber-400 font-black">3.2 KM</span></div>
                    <div>ETA: <span className="text-emerald-400 font-black">12 min</span></div>
                    <div>Time: <span className="text-slate-300 font-black">10:15 AM</span></div>
                  </div>

                  {/* Recenter & Zoom Controls */}
                  <div className="absolute bottom-3 right-3 flex flex-col items-center gap-1 z-20">
                    <button
                      type="button"
                      onClick={() => addToast?.('🎯 Map recentered on Rider position (Patna, Bihar)', 'info')}
                      className="w-7 h-7 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-black shadow border border-slate-200 dark:border-slate-800 hover:bg-slate-100 cursor-pointer active:scale-95 transition"
                      title="Recenter GPS"
                    >
                      🎯
                    </button>
                    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 overflow-hidden text-xs font-black text-slate-800 dark:text-slate-200">
                      <button type="button" onClick={() => addToast?.('Map zoomed in', 'info')} className="w-7 h-6 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-200 dark:border-slate-800 cursor-pointer active:scale-95 transition">+</button>
                      <button type="button" onClick={() => addToast?.('Map zoomed out', 'info')} className="w-7 h-6 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition">-</button>
                    </div>
                  </div>
                </div>

                {/* Map Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => addToast?.('Opening Google Maps Live Route...', 'info')}
                    className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-extrabold text-xs text-slate-800 dark:text-slate-200 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation shadow-sm select-none"
                  >
                    📍 Open in Maps
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal('nav');
                      addToast?.('Opening Saath In-App Turn-by-Turn Navigation...', 'info');
                    }}
                    className="py-2 px-3 rounded-xl bg-[#00986C] hover:bg-emerald-700 font-black text-xs text-white text-center shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation select-none"
                  >
                    🧭 Navigate
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3 sa-fade">
          <CheckCircle2 size={40} className="mx-auto text-emerald-500 animate-bounce" />
          <h3 className="text-xl font-black text-slate-900 dark:text-white">All Assigned Orders Completed!</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">
            You are online and active. Stay in high-demand zones to receive your next order dispatch instantly.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveOrder({
                id: 'DEL-98421',
                type: 'Express Medicine & Grocery',
                priority: 'HIGH PRIORITY',
                pickupBeforeTime: '10:00 AM',
                deliveryDeadline: '10:45 AM',
                orderValue: 850,
                codAmount: 250,
                paymentMode: 'COD',
                packageWeight: '2.5 kg',
                itemsCount: 4,
                distanceKm: '2.8 KM',
                eta: '10 min',
                storeName: 'SaathApp Express Hub #12',
                storeAddress: 'Shop #12, Central Plaza, Patna - 800001',
                storeManager: 'Rajesh Sharma',
                storeMobile: '+91 98350 11223',
                storeOtp: '8942',
                pickupInstructions: 'Collect order parcel from Counter #3 behind main billing desk.',
                parkingInstructions: 'Park two-wheeler in Basement Level 1, Gate #2 (Free Delivery Parking).',
                customerName: 'Anil Kumar',
                customerMobile: '+91 98234 56789',
                customerAltMobile: '+91 98123 45678',
                customerAvatar: '',
                floorFlat: 'Floor 4, Flat 402, Royal Residence',
                landmark: 'Near Boring Road Chauraha, Opposite SBI Bank',
                deliveryNotes: 'Ring doorbell twice. Leave parcel with building security guard if gate is locked.',
                dropAddress: 'Royal Residence, Boring Road, Patna - 800001',
                deliveryPayout: 140,
                itemsList: [
                  { name: 'Fresh Organic Milk (1L)', qty: '2 Pkts', weight: '1.0 kg' },
                  { name: 'Multigrain Whole Wheat Bread', qty: '1 Pkt', weight: '0.4 kg' },
                  { name: 'Paracetamol 650mg Tablets', qty: '1 Strip', weight: '0.1 kg' },
                  { name: 'Basmati Rice Premium (1kg)', qty: '1 Pkt', weight: '1.0 kg' }
                ]
              });
              setIsOtpVerified(false);
              setOtpValue(['4', '8', '2', '0']);
              setCurrentWorkflowStep(4);
              addToast?.('⚡ New Dispatch Order DEL-98421 Accepted!', 'success');
            }}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer active:scale-95 transition touch-manipulation select-none"
          >
            ⚡ Accept New Express Dispatch Order
          </button>
        </div>
      )}


      {/* ========================================================================= */}
      {/* 4. VEHICLE MANAGEMENT & EMERGENCY DESK GRID (Pages 8-9 PDF)              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Section 11: Vehicle Management Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench size={16} className="text-amber-500" /> Vehicle Management &amp; RC Documents
            </h3>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Verified ✓
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
            <div onClick={() => setActiveModal('uploadDocs')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">Vehicle RC</span>
              <strong className="text-emerald-500">Valid ✓</strong>
            </div>
            <div onClick={() => setActiveModal('renewInsurance')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">Insurance</span>
              <strong className="text-emerald-500">Valid ✓</strong>
            </div>
            <div onClick={() => setActiveModal('uploadDocs')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">PUC Certificate</span>
              <strong className="text-emerald-500">Valid ✓</strong>
            </div>
            <div onClick={() => setActiveModal('uploadDocs')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">Driving License</span>
              <strong className="text-emerald-500">Verified ✓</strong>
            </div>
            <div onClick={() => setActiveModal('uploadDocs')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">Fitness Certificate</span>
              <strong className="text-emerald-500">Valid ✓</strong>
            </div>
            <div onClick={() => setActiveModal('renewInsurance')} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 cursor-pointer active:scale-95 transition hover:bg-amber-500/10 hover:border hover:border-amber-500/30">
              <span className="text-[10px] text-slate-400 block">Next Renewal</span>
              <strong className="text-amber-500 font-mono">15 Nov 2026</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveModal('uploadDocs')}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs cursor-pointer active:scale-95 transition text-center select-none shadow-sm"
            >
              Upload Documents
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('renewInsurance')}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition text-center select-none shadow-md ring-2 ring-amber-500/30"
            >
              Renew Insurance
            </button>
          </div>
        </div>

        {/* Section 12: Emergency & Accident Support Card */}
        <div className="bg-slate-900 p-5 rounded-3xl border border-rose-900/60 shadow-xl space-y-3 text-white">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-sm font-black text-rose-400 flex items-center gap-2">
              <Siren size={16} className="text-rose-500 animate-pulse" /> Emergency &amp; Accident Support
            </h3>
            <span className="text-[10px] font-black text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
              24×7 Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                triggerCall('Emergency Police Patrol', '112', 'Police Dispatch');
                addToast?.('🚓 Emergency Police Patrol 112 Alerted!', 'error');
              }}
              className="p-2.5 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/40 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow"
            >
              🚓 Police (112)
            </button>

            <button
              type="button"
              onClick={() => {
                triggerCall('Emergency Medical Ambulance', '108', 'Ambulance Medical Dispatch');
                addToast?.('🚑 Emergency Ambulance 108 Alerted!', 'error');
              }}
              className="p-2.5 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/40 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow"
            >
              🚑 Ambulance (108)
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('breakdown')}
              className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow"
            >
              🛠️ Breakdown
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('flatTyre')}
              className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition select-none shadow"
            >
              🚲 Flat Tyre
            </button>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 22. BOTTOM STICKY ACTION BAR (Page 13 PDF - Very Important)               */}
      {/* ========================================================================= */}
      {activeOrder && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 p-3 sm:p-4 shadow-2xl sa-rise">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-mono font-black text-amber-400">{activeOrder.id}</span>
              <span className="text-[11px] font-bold text-slate-300">• Dropoff: {activeOrder.customerName} ({activeOrder.distanceKm})</span>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap justify-between">
              <button
                type="button"
                onClick={() => addToast?.('Opening Google Maps Navigation...', 'info')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition touch-manipulation select-none shadow-md"
              >
                <Navigation size={15} /> Navigate
              </button>

              <button
                type="button"
                onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerMobile, 'Customer')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition touch-manipulation select-none shadow-md"
              >
                <Phone size={15} /> Call Customer
              </button>

              <button
                type="button"
                onClick={() => triggerChat(activeOrder.customerName, 'Customer')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition touch-manipulation select-none shadow-md"
              >
                <MessageSquare size={15} /> Chat Customer
              </button>

              <button
                type="button"
                onClick={() => triggerCall(`Store (${activeOrder.storeManager})`, activeOrder.storeMobile, 'Store')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-[#FF8C00] hover:bg-amber-600 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition touch-manipulation select-none shadow-md"
              >
                <Phone size={15} /> Store Call
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('issue')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-[#E11D48] hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition touch-manipulation select-none shadow-md"
              >
                <AlertTriangle size={15} /> Report Issue
              </button>

              <button
                type="button"
                onClick={handleCompleteDelivery}
                className="w-full sm:w-auto flex-1 md:flex-initial px-6 py-2.5 rounded-2xl bg-[#059669] hover:bg-emerald-700 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition touch-manipulation select-none"
              >
                <CheckCircle2 size={16} /> Complete Delivery
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* POPUP MODALS SYSTEM                                                      */}
      {/* ========================================================================= */}

      {/* 1. DELIVERY COMPLETED MODAL */}
      {activeModal === 'complete' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center font-black text-2xl animate-bounce">
              ✓
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Delivery Completed!</h3>
            <p className="text-slate-500">Order DEL-98420 has been verified &amp; delivered successfully.</p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-base font-mono">
              + ₹120 Added to Wallet
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                setCurrentWorkflowStep(6);
                setActiveOrder(null);
                addToast?.('Wallet balance updated: ₹2,570', 'success');
              }}
              className="w-full py-3 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white font-black text-sm shadow-lg cursor-pointer active:scale-95 transition"
            >
              Continue Receiving Dispatches
            </button>
          </div>
        </div>
      )}

      {/* 2. ORDER DETAILS POPUP MODAL */}
      {activeModal === 'orderDetails' && activeOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-500" /> Order Details &amp; Manifest ({activeOrder.id})
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Itemized Parcel Manifest</span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {activeOrder.itemsList.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-900 dark:text-white block">{item.name}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{item.weight}</span>
                    </div>
                    <span className="font-mono font-black text-amber-500">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-black cursor-pointer active:scale-95 transition">
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP LIVE CHAT MODAL */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-3 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow">
                  💬
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{chatDetails.name}</h3>
                  <span className="text-[10px] text-emerald-500 font-bold">• Online ({chatDetails.role})</span>
                </div>
              </div>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            {/* Messages Scroll View */}
            <div className="space-y-2 max-h-60 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              {chatDetails.messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[80%] text-xs font-medium ${
                    m.sender === 'You'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                  }`}>
                    <span className="text-[9px] opacity-75 font-bold block mb-0.5">{m.sender}</span>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Quick Reply Shortcut Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-bold">
              {['🚀 On my way! ETA 10m', '📍 Reached drop location', '📞 Please answer call', '🚪 Ringing doorbell'].map((quickText) => (
                <button
                  key={quickText}
                  type="button"
                  onClick={() => {
                    const newMsg = { sender: 'You', text: quickText, time: 'Just now' };
                    setChatDetails((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }));
                    addToast?.(`Sent: "${quickText}"`, 'success');
                  }}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer active:scale-95 transition"
                >
                  {quickText}
                </button>
              ))}
            </div>

            {/* Send Message Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Type message to ${chatDetails.name}...`}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500 font-medium"
              />
              <button type="submit" className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs cursor-pointer active:scale-95 transition shadow">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VEHICLE BREAKDOWN MODAL */}
      {activeModal === 'breakdown' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-white text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-2xl font-black">
              🛠️
            </div>
            <h3 className="text-lg font-black">Vehicle Breakdown Assistance</h3>
            <p className="text-slate-300">Dispatch roadside mechanic &amp; tow service to your current location (Patna Central).</p>
            <div className="p-3 bg-slate-800 rounded-xl text-left space-y-1 font-mono text-[11px]">
              <div>GPS: <span className="text-emerald-400">Patna 800001 (Lat 25.5941)</span></div>
              <div>Estimated Arrival: <span className="text-amber-400 font-bold">15 minutes</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
              <button type="button" onClick={() => { setActiveModal(null); addToast?.('🛠️ Roadside Breakdown Assistance Dispatched!', 'success'); }} className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black">Confirm Dispatch</button>
            </div>
          </div>
        </div>
      )}

      {/* FLAT TYRE REPAIR MODAL */}
      {activeModal === 'flatTyre' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-white text-center">
            <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center text-2xl font-black">
              🚲
            </div>
            <h3 className="text-lg font-black">On-Demand Flat Tyre Service</h3>
            <p className="text-slate-300">Mobile puncture repair unit dispatched to Patna Central location.</p>
            <div className="p-3 bg-slate-800 rounded-xl text-left space-y-1 font-mono text-[11px]">
              <div>Service Charge: <span className="text-emerald-400 font-bold">FREE (Rider Perk)</span></div>
              <div>Mechanic ETA: <span className="text-amber-400 font-bold">10 minutes</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
              <button type="button" onClick={() => { setActiveModal(null); addToast?.('🚲 Mobile Tyre Mechanic Dispatched to your location!', 'success'); }} className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">Call Mechanic</button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD & VIEW VEHICLE DOCUMENTS MODAL */}
      {activeModal === 'uploadDocs' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-500" /> Vehicle RC &amp; Legal Documents
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Motorcycle Registration (RC)</strong>
                  <span className="text-[10px] text-slate-400 font-mono">BR-01-AB-9842 • Valid till Nov 2030</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Verified ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Driving License (DL)</strong>
                  <span className="text-[10px] text-slate-400 font-mono">DL-042026119 • Valid till Oct 2035</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Verified ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Vehicle Insurance Policy</strong>
                  <span className="text-[10px] text-slate-400 font-mono">ICICI Lombard • Expiry: 15 Nov 2026</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Active ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Pollution (PUC) Certificate</strong>
                  <span className="text-[10px] text-slate-400 font-mono">Valid till Dec 2026</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Valid ✓</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  onSelectTab?.('documents');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition"
              >
                Go to Documents Tab
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('📄 New document uploaded & submitted for verification!', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black cursor-pointer active:scale-95 transition shadow"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENEW VEHICLE INSURANCE MODAL */}
      {activeModal === 'renewInsurance' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Instant Two-Wheeler Insurance Renewal
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider block">CURRENT POLICY DETAILS</span>
              <div className="flex justify-between text-xs font-bold"><span className="text-slate-700 dark:text-slate-300">Policy Number:</span><span className="font-mono">POL-BR-98420-2025</span></div>
              <div className="flex justify-between text-xs font-bold"><span className="text-slate-700 dark:text-slate-300">Expiry Date:</span><span className="font-mono text-rose-500">15 Nov 2026</span></div>
              <div className="flex justify-between text-xs font-bold"><span className="text-slate-700 dark:text-slate-300">Renewal Amount:</span><span className="font-mono text-emerald-500 text-sm font-black">₹1,499 / Year</span></div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Coverage Perks Included:</span>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>✅</span><span>Personal Accident Cover ₹15 Lakhs</span></div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>✅</span><span>Third Party Property &amp; Legal Damage Cover</span></div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>✅</span><span>Cashless Repair Network &amp; Zero Depreciation</span></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('🎉 Policy renewed successfully! Policy PDF sent to email.', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black cursor-pointer active:scale-95 transition shadow-lg"
              >
                Pay ₹1,499 &amp; Renew
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATE TO STORE MODAL ('navStore') */}
      {activeModal === 'navStore' && activeOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Navigation size={18} className="text-amber-500" /> Navigate to Store ({activeOrder.storeName})
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-500/30 font-semibold space-y-1">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">STORE PICKUP ADDRESS</span>
              <p className="text-slate-900 dark:text-white font-bold">{activeOrder.storeAddress}</p>
              <div className="text-[11px] text-slate-500 pt-1 flex justify-between font-mono font-bold">
                <span>Distance: 1.1 KM</span>
                <span className="text-emerald-500">ETA: 4 minutes</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Route Steps to Store</span>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>1.</span><span>Drive North on Central Plaza Boulevard towards Gate #2</span></div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>2.</span><span>Turn Right into Basement Level 1 Delivery Parking</span></div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>3.</span><span>Collect parcel from Counter #3 behind main billing desk</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => addToast?.('Opening Google Maps App to Store...', 'info')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition"
              >
                Open Google Maps
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('🏪 Arrived at Store! Reached store at 09:28 AM', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black cursor-pointer active:scale-95 transition shadow-lg"
              >
                Arrived at Store ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE ETA MODAL ('shareEta') */}
      {activeModal === 'shareEta' && activeOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={18} className="text-amber-500" /> Share Live Delivery ETA Alert
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Recipient Customer</span>
              <p className="text-slate-900 dark:text-white font-bold">{activeOrder.customerName} ({activeOrder.customerMobile})</p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Select Estimated Arrival Time</span>
              <div className="grid grid-cols-3 gap-2 font-bold text-center">
                {['5 Mins', '10 Mins', '12 Mins (Auto)', '15 Mins', '20 Mins', '25 Mins'].map((etaOption, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      addToast?.(`⏱️ ETA alert (${etaOption}) sent to ${activeOrder.customerName} via SMS!`, 'success');
                    }}
                    className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black cursor-pointer active:scale-95 transition"
                  >
                    {etaOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PHONE DIALER MODAL */}
      {activeModal === 'call' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xs w-full shadow-2xl space-y-6 text-white text-center sa-rise">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">VOIP Encrypted Call</span>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer">✕</button>
            </div>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mx-auto flex items-center justify-center font-black text-xl text-slate-950 shadow-lg animate-pulse">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-black text-white">{callDetails.name}</h3>
              <p className="text-xs text-amber-400 font-mono font-bold">{callDetails.number}</p>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">{callDetails.role}</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-bold pt-2">
              <button type="button" onClick={() => addToast?.('Muted microphone', 'info')} className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">
                <MicOff size={18} />
              </button>
              <button type="button" onClick={() => addToast?.('Speakerphone toggled', 'info')} className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">
                <Volume2 size={18} />
              </button>
              <button type="button" onClick={() => { setActiveModal(null); addToast?.('Call ended', 'info'); }} className="p-3 rounded-full bg-rose-600 text-white hover:bg-rose-500 cursor-pointer shadow-lg">
                <PhoneCall size={18} className="rotate-[135deg]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ISSUE REPORTING POPUP MODAL (Page 20 PDF) */}
      {activeModal === 'issue' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-500" /> Report Delivery Issue
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {[
                'Customer Not Available',
                'Wrong Address',
                'Store Closed',
                'Item Missing',
                'Vehicle Breakdown',
                'Accident Issue',
                'Payment Issue',
                'App Issue'
              ].map((iss) => (
                <button
                  key={iss}
                  type="button"
                  onClick={() => setSelectedIssue(iss)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition active:scale-95 ${
                    selectedIssue === iss
                      ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-black'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {iss}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.(`Issue reported: ${selectedIssue || 'General Issue'}. Support team alerted.`, 'warning');
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black cursor-pointer shadow active:scale-95 transition"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. UPLOAD PHOTO MODAL */}
      {activeModal === 'photo' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Upload Delivery Photo Proof</h3>
            <div className="w-full h-40 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2">
              <Camera size={32} className="text-amber-500" />
              <span className="text-xs text-slate-500 font-medium">Click to take photo of parcel dropoff</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">Cancel</button>
              <button type="button" onClick={() => { setPhotoCaptured(true); setActiveModal(null); addToast?.('📸 Delivery Photo Attached!', 'success'); }} className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black">Attach Photo</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. SCAN QR MODAL */}
      {activeModal === 'qr' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Scan Customer QR Code</h3>
            <div className="w-48 h-48 mx-auto rounded-2xl bg-slate-950 border-2 border-amber-500 flex items-center justify-center text-white relative overflow-hidden">
              <QrCode size={96} className="text-amber-400" />
              <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500 animate-ping" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">Cancel</button>
              <button type="button" onClick={() => { setActiveModal(null); addToast?.('✅ Customer QR Code Verified!', 'success'); }} className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">Simulate Scan</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. TURN-BY-TURN NAVIGATION MODAL ('nav') */}
      {activeModal === 'nav' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Navigation size={18} className="text-emerald-500" /> Saath Live Turn-by-Turn Navigation
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"><X size={18} /></button>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/30 flex items-center justify-between font-mono font-bold text-xs">
              <span>Next Turn: In 200 meters</span>
              <strong className="text-emerald-600 dark:text-emerald-400 text-sm">↰ Turn Left</strong>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Route Steps (Patna Central Zone)</span>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>1.</span><span>Head south on Gandhi Maidan Main Road towards Exhibition Road</span></div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>2.</span><span>Turn left onto Boring Road Chauraha</span></div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-2"><span>3.</span><span>Arrive at Flat 402, Royal Residence (Destination on Right)</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => addToast?.('Opening external Google Maps App...', 'info')} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition">
                Open Google Maps
              </button>
              <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-xl bg-[#00986C] text-white font-black cursor-pointer active:scale-95 transition">
                Done Navigating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. END SHIFT MODAL ('endShift') */}
      {activeModal === 'endShift' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center font-black text-2xl">
              ⏹
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">End Shift Today?</h3>
            <p className="text-slate-500">You have worked <strong className="text-slate-900 dark:text-white">04h 25m</strong> and completed <strong className="text-emerald-500">14 orders</strong> (Earned ₹1,450).</p>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition">
                Keep On Shift
              </button>
              <button
                type="button"
                onClick={() => {
                  setShiftStatus('OFFLINE');
                  setActiveModal(null);
                  addToast?.('Shift ended successfully! Offline mode active.', 'info');
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-black cursor-pointer active:scale-95 transition shadow"
              >
                Confirm End Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. SHARE LIVE LOCATION MODAL ('shareLocation') */}
      {activeModal === 'shareLocation' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Share Live Location Tracking Link</h3>
            <p className="text-slate-500">Send encrypted live tracking link to customer {activeOrder?.customerName || ''}.</p>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-[11px] truncate text-blue-600 dark:text-blue-400 font-bold">
              https://saath.app/track/DEL-98420-LIVE
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">Close</button>
              <button type="button" onClick={() => { setActiveModal(null); addToast?.('📲 Live Location Link copied & sent via SMS!', 'success'); }} className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">Send SMS</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CAPTURE SIGNATURE MODAL */}
      {activeModal === 'signature' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Capture Customer Signature</h3>
            <div className="w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 flex items-center justify-center">
              <span className="text-xs text-slate-400 font-mono font-bold">Sign here on screen</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">Cancel</button>
              <button type="button" onClick={() => { setSignatureSaved(true); setActiveModal(null); addToast?.('✍️ Customer Signature Saved!', 'success'); }} className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">Save Signature</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
