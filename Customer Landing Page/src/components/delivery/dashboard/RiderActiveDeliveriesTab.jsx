import React, { useState, useEffect } from 'react';
import {
  Truck, Navigation, Phone, MapPin, CheckCircle2, ShieldCheck, Clock, AlertCircle,
  RefreshCw, AlertTriangle, MessageSquare, Camera, QrCode, FileCheck, Share2, MoreHorizontal,
  X, Check, DollarSign, Calendar, Sliders, Eye, FileText, ArrowRight, ShieldAlert, Award,
  MicOff, Volume2, PhoneCall, Send, UploadCloud, ChevronDown, ChevronUp, Zap, Sparkles,
  Battery, Wifi, Sun, UserCheck, Play, Pause, Square, Lock, ThumbsUp, Star, RotateCcw,
  Download, HelpCircle, Layers, CheckSquare, Filter, ChevronRight
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderActiveDeliveriesTab() {
  const { formData = {}, dashboardData, addToast } = useDelivery();

  // Active Order State matching updated specification
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
    floorFlat: 'Flat 402, Royal Residence',
    landmark: 'Near Boring Road Chauraha, Opposite SBI Bank',
    deliveryNotes: 'Ring doorbell twice. Leave parcel with building security guard if gate is locked.',
    dropAddress: 'Boring Road, Patna',
    deliveryPayout: 120,
    itemsList: [
      { name: 'Organic Milk 2L', qty: 2, weight: '2.0 kg', fragile: false, tempSensitive: true },
      { name: 'Fresh Shimla Apples 1kg', qty: 1, weight: '1.0 kg', fragile: false, tempSensitive: false },
      { name: 'Paracetamol 500mg (Strip of 10)', qty: 1, weight: '0.05 kg', fragile: false, tempSensitive: false },
      { name: 'Whole Wheat Flour 5kg', qty: 1, weight: '5.0 kg', fragile: false, tempSensitive: false },
      { name: 'Glass Milk Bottle 500ml', qty: 1, weight: '0.5 kg', fragile: true, tempSensitive: true },
    ]
  });

  // Shift & Status Indicators State
  const [shiftStatus, setShiftStatus] = useState('ONLINE'); // ONLINE / OFFLINE
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('Strong');
  const [batteryLevel, setBatteryLevel] = useState(86);
  const [networkStatus, setNetworkStatus] = useState('4G');
  const [weatherInfo, setWeatherInfo] = useState('Patna, Bihar 28°C • Clear');
  const [activeOrdersCount, setActiveOrdersCount] = useState(1);
  const [unreadNotifications, setUnreadNotifications] = useState([
    { id: 1, text: '⚡ New Assignment DEL-98420 assigned', time: '09:15 AM' },
    { id: 2, text: '🏪 Store SaathApp Express Hub ready for pickup', time: '09:20 AM' },
    { id: 3, text: '💬 Customer Anil Kumar sent delivery note', time: '09:25 AM' },
    { id: 4, text: '🚦 Traffic Alert: Slow traffic near Boring Road', time: '09:27 AM' },
    { id: 5, text: '☀️ Weather Alert: Clear sky 28°C', time: '09:28 AM' }
  ]);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  // Timers State
  const [pickupTimer, setPickupTimer] = useState('08:20');
  const [deliveryTimer, setDeliveryTimer] = useState('18:30');
  const [overallEta, setOverallEta] = useState('27 min');

  // Workflow Progression State (6 steps matching screenshot)
  const [currentStep, setCurrentStep] = useState(4); // 1: Assigned, 2: Reached Store, 3: Picked Up, 4: On The Way, 5: Reached Customer, 6: Delivered
  const workflowSteps = [
    { step: 1, title: 'Assigned', done: true },
    { step: 2, title: 'Reached Store', done: true },
    { step: 3, title: 'Picked Up', done: currentStep >= 3 },
    { step: 4, title: 'On The Way', done: currentStep >= 4 },
    { step: 5, title: 'Reached Customer', done: currentStep >= 5 },
    { step: 6, title: 'Delivered', done: currentStep >= 6 }
  ];

  // OTP State
  const [otpValue, setOtpValue] = useState(['4', '8', '2', '0']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimerSeconds, setOtpTimerSeconds] = useState(165); // 02:45

  // Interactive Modals & Extra States
  const [activeModal, setActiveModal] = useState(null); // 'sos', 'call', 'chat', 'issue', 'complete', 'qr', 'signature', 'photo', 'shareLocation', 'nav', 'rejectOrder', 'futureFeatures', 'rateCustomer', 'moreCustomer'
  const [selectedIssue, setSelectedIssue] = useState('');
  const [issueNote, setIssueNote] = useState('');
  const [callDetails, setCallDetails] = useState({ name: '', number: '', role: '' });
  const [chatDetails, setChatDetails] = useState({ name: '', role: '', messages: [] });
  const [chatInput, setChatInput] = useState('');
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [expandOrderDetails, setExpandOrderDetails] = useState(false);
  const [showAlternateRoute, setShowAlternateRoute] = useState(false);

  // Customer Rating after delivery
  const [customerRating, setCustomerRating] = useState(5);
  const [customerFeedback, setCustomerFeedback] = useState('');

  // Future features toggle state
  const [smartAutoAccept, setSmartAutoAccept] = useState(false);
  const [voiceNavEnabled, setVoiceNavEnabled] = useState(true);
  const [aiRouteOptimization, setAiRouteOptimization] = useState(true);

  // OTP Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const triggerCall = (name, number, role) => {
    setCallDetails({ name, number, role });
    setActiveModal('call');
    addToast?.(`Initiating call to ${name} (${number})...`, 'info');
  };

  const triggerChat = (name, role) => {
    setChatDetails({
      name,
      role,
      messages: [
        { sender: name, text: `Hi Vikram! Order ${activeOrder.id} is packed and ready for dispatch.`, time: '09:28 AM' },
        { sender: 'You', text: `Got it! On my way to the dropoff location. ETA 12 minutes.`, time: '09:30 AM' },
      ],
    });
    setActiveModal('chat');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'You', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatDetails((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }));
    setChatInput('');
    addToast?.('Message sent successfully', 'success');
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    const entered = otpValue.join('');
    if (entered !== '4820') {
      addToast?.('❌ Invalid Customer OTP! Please enter correct 4-digit OTP (4820)', 'error');
      return;
    }
    setIsOtpVerified(true);
    setCurrentStep(5);
    addToast?.('🎉 OTP Verified successfully! Proceed to finish delivery.', 'success');
  };

  const handleCompleteDelivery = () => {
    if (!isOtpVerified) {
      addToast?.('⚠️ Please verify Customer 4-digit OTP (4820) before completing delivery', 'warning');
      return;
    }
    setCurrentStep(6);
    setActiveModal('complete');
  };

  const handleFinishDeliveryFlow = () => {
    setActiveModal('rateCustomer');
  };

  return (
    <div className="space-y-5 pb-28 sa-fade relative">

      {/* TOP RIDER STATUS BAR (Exact match to top row in user image) */}
      <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap">

          {/* Left Status Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs">
            {/* Shift Badge */}
            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">
                ONLINE (ON SHIFT)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Since 09:15 AM • 04h 25m</span>
            </div>

            {/* Weather */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
              <Sun size={15} className="text-amber-500" />
              <span>{weatherInfo}</span>
            </div>

            {/* GPS */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
              <MapPin size={15} className="text-emerald-500" />
              <span>GPS <strong>{gpsStatus}</strong></span>
            </div>

            {/* Network */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
              <Wifi size={15} className="text-blue-500" />
              <span>Network <strong>{networkStatus}</strong></span>
            </div>

            {/* Battery */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
              <Battery size={15} className="text-emerald-500" />
              <span>Battery <strong>{batteryLevel}%</strong></span>
            </div>
          </div>

          {/* Right Profile & Header Action Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-page text-slate-700 dark:text-slate-300 cursor-pointer"
              title="Notifications"
            >
              <AlertCircle size={18} />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => triggerCall('SaathApp Rider Support', '+91 1800 200 9842', 'Rider Support')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-page text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <HeadphonesIcon size={14} /> Support
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs ring-2 ring-amber-500/30 shrink-0">
                <span>{(formData.fullName || 'Rider').charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight">{formData.fullName || 'Rider'}</span>
                <span className="text-[9px] text-slate-400 font-mono font-bold block">Rider Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Notifications Drawer */}
        {showNotificationsDrawer && (
          <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 sa-rise">
            <div className="flex justify-between items-center border-b border-amber-200 dark:border-amber-900/40 pb-1.5">
              <span className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <AlertCircle size={14} /> Real-Time Notifications ({unreadNotifications.length})
              </span>
              <button type="button" onClick={() => setShowNotificationsDrawer(false)} className="text-slate-400 font-bold hover:text-slate-600 text-xs">✕ Close</button>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {unreadNotifications.map((n) => (
                <div key={n.id} className="flex items-center justify-between p-2 rounded-xl bg-surface text-xs border border-amber-100 dark:border-slate-800">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{n.text}</span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* HEADER TITLE & DISPATCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black shrink-0 border border-amber-500/30">
            <Truck size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Active Delivery Orders</h2>
            <p className="text-xs text-slate-500">Live Dispatch &amp; Navigation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToast?.('Wallet Balance: ₹2,450', 'info')}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-amber-500/20 transition"
          >
            💳 Wallet ₹2,450
          </button>

          <button
            type="button"
            onClick={() => addToast?.('🔄 Dispatch route & orders refreshed', 'info')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-page text-slate-700 dark:text-slate-300 cursor-pointer"
            title="Refresh Orders"
          >
            <RefreshCw size={16} />
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('sos')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow flex items-center gap-1.5 cursor-pointer transition animate-pulse"
          >
            <AlertTriangle size={15} /> SOS
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('futureFeatures')}
            className="p-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1 cursor-pointer hover:bg-amber-500/20"
            title="AI Features"
          >
            <Sparkles size={16} />
          </button>
        </div>
      </div>

      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN (2 COLS) */}
          <div className="lg:col-span-2 space-y-6">

            {/* LIVE ASSIGNED ORDER CARD */}
            <div className="rounded-3xl border border-amber-500/40 bg-surface p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black shrink-0 border border-amber-500/30">
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 uppercase px-2 py-0.5 rounded border border-amber-500/20">
                        ASSIGNED &amp; EN-ROUTE
                      </span>
                      <span className="text-base font-mono font-black text-slate-900 dark:text-white">
                        {activeOrder.id}
                      </span>
                      <span className="bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        {activeOrder.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Payout</span>
                  <span className="text-2xl font-black text-amber-500 font-mono">₹{activeOrder.deliveryPayout}</span>
                </div>
              </div>

              {/* STATS ROW (Matching exact order specs grid in user image) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs bg-page dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Order Value</span>
                  <strong className="text-slate-900 dark:text-white font-mono font-black">₹{activeOrder.orderValue}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Mode</span>
                  <strong className="text-rose-500 font-black">{activeOrder.paymentMode}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">COD Amount</span>
                  <strong className="text-slate-900 dark:text-white font-mono font-black">₹{activeOrder.codAmount}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Items</span>
                  <strong className="text-slate-900 dark:text-white font-black">{activeOrder.itemsCount} Items</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Distance</span>
                  <strong className="text-slate-900 dark:text-white font-mono font-black">{activeOrder.distanceKm}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">ETA</span>
                  <strong className="text-emerald-500 font-mono font-black">{activeOrder.eta}</strong>
                </div>
              </div>

              {/* STEPPER ICONS (Matching user screenshot icons without numbered titles) */}
              <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-extrabold pt-1">
                {workflowSteps.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      setCurrentStep(s.step);
                      addToast?.(`Advanced to step: ${s.title}`, 'info');
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black transition ${s.done ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-500/30' : 'bg-slate-200 text-slate-400'
                      }`}>
                      {s.done ? '✓' : s.step}
                    </div>
                    <span className={`text-[10px] leading-tight font-bold ${s.done ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* PICKUP LOCATION CARD (With Badge 1, full PDF details intact) */}
            <div className="rounded-3xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/10 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow">
                    1
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    PICKUP LOCATION
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Reached 09:28 AM
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-black text-slate-900 dark:text-white text-base">{activeOrder.storeName}</h4>
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Pickup OTP / QR: {activeOrder.storeOtp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{activeOrder.storeAddress}</p>

                  <div className="flex items-center gap-3 text-xs pt-1 flex-wrap">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      👤 Manager: <strong className="text-slate-900 dark:text-white">{activeOrder.storeManager}</strong>
                    </span>
                    <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">
                      📞 {activeOrder.storeMobile}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-surface p-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 font-semibold">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-black uppercase block">📦 Pickup Instructions</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.pickupInstructions}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase block">🅿️ Parking Instructions</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.parkingInstructions}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => addToast?.('Opening Store Navigation...', 'info')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <Navigation size={13} className="text-amber-500" /> Navigate
                </button>
                <button
                  type="button"
                  onClick={() => triggerCall(`Store (${activeOrder.storeManager})`, activeOrder.storeMobile, 'Store Manager')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <Phone size={13} className="text-amber-500" /> Call Store
                </button>
                <button
                  type="button"
                  onClick={() => triggerChat(`${activeOrder.storeManager} (Store)`, 'Store')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <MessageSquare size={13} className="text-blue-500" /> Chat Store
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIssue('Store Issue');
                    setActiveModal('issue');
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 font-bold text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-100 cursor-pointer"
                >
                  <AlertTriangle size={13} /> Report Issue
                </button>
              </div>
            </div>

            {/* CUSTOMER ADDRESS CARD (With Badge 2, full PDF details intact) */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/10 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow">
                    2
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    CUSTOMER ADDRESS ({activeOrder.distanceKm})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 block">
                    On The Way
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-0.5">ETA {activeOrder.eta}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h4 className="font-black text-slate-900 dark:text-white text-base">{activeOrder.customerName}</h4>
                  <span className="text-[11px] font-mono font-black text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Collect COD Cash: ₹{activeOrder.codAmount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {activeOrder.floorFlat}, {activeOrder.dropAddress}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                  📍 Landmark: {activeOrder.landmark}
                </p>

                <div className="flex items-center gap-4 text-xs pt-1 flex-wrap font-mono font-bold">
                  <span className="text-emerald-700 dark:text-emerald-400">
                    📞 Mobile: <strong className="text-slate-900 dark:text-white">{activeOrder.customerMobile}</strong>
                  </span>
                  <span className="text-slate-500">
                    ☎️ Alt: <strong className="text-slate-700 dark:text-slate-300">{activeOrder.customerAltMobile}</strong>
                  </span>
                </div>
              </div>

              <div className="text-xs bg-surface p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 font-semibold space-y-0.5">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-black uppercase block">📝 Customer Delivery Notes</span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px]">{activeOrder.deliveryNotes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerMobile, 'Customer')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <Phone size={13} className="text-emerald-500" /> Call Customer
                </button>
                <button
                  type="button"
                  onClick={() => triggerChat(activeOrder.customerName, 'Customer')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <MessageSquare size={13} className="text-blue-500" /> Chat Customer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('shareLocation')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 hover:bg-page cursor-pointer shadow-sm"
                >
                  <Share2 size={13} className="text-purple-500" /> Share Location
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('moreCustomer')}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-page cursor-pointer"
                >
                  ••• More
                </button>
              </div>
            </div>

            {/* OTP VERIFICATION & DELIVERY ACTIONS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OTP Box */}
              <form onSubmit={handleVerifyOtp} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    CUSTOMER OTP VERIFICATION
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                    <Clock size={11} /> {formatTimer(otpTimerSeconds)} Remaining
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Ask customer for 4-digit OTP upon arrival</p>

                <div className="flex items-center gap-2 pt-1 flex-wrap sm:flex-nowrap">
                  <div className="flex gap-1.5">
                    {otpValue.map((d, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={d}
                        onChange={(e) => {
                          const n = [...otpValue];
                          n[i] = e.target.value;
                          setOtpValue(n);
                        }}
                        className="w-9 h-9 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 text-center font-mono text-base font-black text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpTimerSeconds(165);
                      addToast?.('Resent fresh OTP code to customer', 'info');
                    }}
                    className="px-3 py-2 rounded-xl bg-page text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="submit"
                    className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow shrink-0 cursor-pointer"
                  >
                    Verify OTP
                  </button>
                </div>
                {isOtpVerified && (
                  <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 block pt-1">
                    ✓ OTP Verified (Code 4820 Confirmed)
                  </span>
                )}
              </form>

              {/* Delivery Actions Box */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white block">
                  DELIVERY ACTIONS
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-[9px] font-bold text-center">
                  <button
                    type="button"
                    onClick={() => setActiveModal('photo')}
                    className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/20 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <Camera size={16} className="text-emerald-500" />
                    <span className="truncate max-w-full">{photoCaptured ? 'Photo Attached' : 'Upload Photo'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal('qr')}
                    className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-800 dark:text-slate-200 hover:bg-blue-500/20 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <QrCode size={16} className="text-blue-500" />
                    <span className="truncate max-w-full">Scan QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal('signature')}
                    className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-slate-800 dark:text-slate-200 hover:bg-purple-500/20 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <FileCheck size={16} className="text-purple-500" />
                    <span className="truncate max-w-full">{signatureSaved ? 'Saved' : 'Signature'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIssue('Delivery Issue');
                      setActiveModal('issue');
                    }}
                    className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <AlertTriangle size={16} />
                    <span className="truncate max-w-full">Report Issue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIssue('Unable to Deliver');
                      setActiveModal('issue');
                    }}
                    className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <X size={16} />
                    <span className="truncate max-w-full">Unable to Deliver</span>
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDABLE ORDER DETAILS SECTION */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-4 shadow-sm space-y-3">
              <button
                type="button"
                onClick={() => setExpandOrderDetails(!expandOrderDetails)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Order Items &amp; Special Handling Details ({activeOrder.itemsList.length} Items, {activeOrder.packageWeight})
                  </span>
                </div>
                {expandOrderDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {expandOrderDetails && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 sa-rise">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {activeOrder.itemsList.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between">
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white">{item.name}</p>
                          <div className="flex items-center gap-2 text-[10px] pt-0.5">
                            <span className="text-slate-400">Qty: {item.qty}</span>
                            <span className="text-slate-400">• Weight: {item.weight}</span>
                            {item.fragile && <span className="bg-rose-500/10 text-rose-500 font-black px-1.5 rounded">FRAGILE</span>}
                            {item.tempSensitive && <span className="bg-blue-500/10 text-blue-500 font-black px-1.5 rounded">TEMP SENSITIVE</span>}
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN (1 COL) */}
          <div className="space-y-6">

            {/* LIVE ROUTE MAP CARD */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-black text-amber-500 text-xs uppercase tracking-wider">
                  <Clock size={15} /> LIVE ROUTE
                </div>
                <button
                  type="button"
                  onClick={() => addToast?.('Opening Google Maps Route...', 'info')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Google Maps &gt;
                </button>
              </div>

              {/* Map Canvas Box */}
              <div className="w-full h-72 rounded-2xl bg-page dark:bg-slate-950 relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex">
                {/* SVG Route Visualization */}
                <div className="relative flex-1 bg-[#e5e3df] dark:bg-[#1f293d] overflow-hidden p-3 flex flex-col justify-between">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500 dark:stroke-blue-400" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 50 30 L 110 30 L 130 90 L 100 150 L 140 210" strokeDasharray={showAlternateRoute ? "3,3" : "6,6"} className="animate-pulse" />
                  </svg>

                  {/* Landmarks */}
                  <div className="absolute top-4 left-6 flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-[10px] shadow">📍</div>
                    <span className="text-[9px] font-black text-slate-800 dark:text-slate-200 bg-white/90 px-1.5 py-0.5 rounded shadow">
                      Gandhi Maidan
                    </span>
                  </div>

                  <div className="absolute top-20 left-20 z-10">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg animate-bounce">
                      <Truck size={14} />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-28 flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-[10px] shadow">📍</div>
                    <span className="text-[9px] font-black text-slate-800 dark:text-slate-200 bg-white/90 px-1.5 py-0.5 rounded shadow">
                      Kankarbagh
                    </span>
                  </div>

                  <div className="absolute bottom-14 left-3 text-[9px] font-mono text-slate-500">Patna Junction</div>
                  <div className="absolute bottom-3 left-4 text-[9px] font-mono text-slate-500">Rajendra Nagar</div>
                </div>

                {/* Map Floating Info Panel */}
                <div className="w-32 bg-white/95 border-l border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-center space-y-3 shrink-0">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Distance</span>
                    <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">3.2 KM</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">ETA</span>
                    <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">12 min</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Expected Time</span>
                    <strong className="text-xs font-black text-slate-900 dark:text-white font-mono">10:15 AM</strong>
                  </div>
                </div>
              </div>

              {/* Buttons below map */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => addToast?.('Opening Google Maps Live Route...', 'info')}
                  className="py-2 px-3 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-900 dark:text-white text-center hover:bg-page transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                >
                  📍 Open in Maps
                </button>
                <button
                  type="button"
                  onClick={() => addToast?.('Starting turn-by-turn navigation...', 'success')}
                  className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 font-black text-xs text-slate-950 text-center shadow-md transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  🧭 Navigate
                </button>
              </div>
            </div>

            {/* TODAY'S EARNINGS BREAKUP */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-2">
              <span className="text-xs font-black uppercase text-slate-900 dark:text-white block">
                TODAY'S EARNINGS BREAKUP
              </span>
              <div className="space-y-1 text-xs font-semibold">
                <div className="flex justify-between"><span className="text-slate-500">Base Fare</span><strong className="font-mono text-slate-900 dark:text-white">₹0</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Incentive</span><strong className="font-mono text-emerald-500">₹0</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Peak Bonus</span><strong className="font-mono text-amber-500">₹0</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Fuel Allowance</span><strong className="font-mono text-blue-500">₹0</strong></div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-extrabold text-sm">
                  <span className="text-slate-900 dark:text-white">Total Earnings</span>
                  <strong className="font-mono text-amber-500">₹0</strong>
                </div>
              </div>
            </div>

            {/* CURRENT SHIFT CARD */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">CURRENT SHIFT</span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Start Time</span>
                  <strong className="font-mono font-bold text-slate-900 dark:text-white">09:15 AM</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">End Time</span>
                  <strong className="font-mono font-bold text-slate-900 dark:text-white">09:15 PM</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Working Hours</span>
                  <strong className="font-mono font-bold text-slate-900 dark:text-white">04h 25m</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsBreakActive(!isBreakActive);
                    addToast?.(`Break ${!isBreakActive ? 'Started' : 'Ended'}`, 'info');
                  }}
                  className="py-2 px-3 rounded-xl border border-slate-300 bg-white dark:bg-slate-950 font-bold text-xs text-slate-800 dark:text-slate-200 text-center hover:bg-page cursor-pointer flex items-center justify-center gap-1"
                >
                  <Pause size={13} className="text-amber-500" /> {isBreakActive ? 'End Break' : 'Start Break'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShiftStatus('OFFLINE');
                    addToast?.('Shift Ended', 'warning');
                  }}
                  className="py-2 px-3 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 font-bold text-xs text-rose-600 dark:text-rose-400 text-center hover:bg-rose-100 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Square size={13} /> End Shift
                </button>
              </div>
            </div>

            {/* TODAY'S INCENTIVE PROGRESS */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-3">
              <span className="text-xs font-black uppercase text-slate-900 dark:text-white block">
                TODAY'S INCENTIVE PROGRESS
              </span>
              <p className="text-xs text-slate-500 font-medium">
                <strong>₹350</strong> more to unlock <strong>₹500</strong> bonus
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-page h-2.5 rounded-full overflow-hidden relative">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-500 float-right">70%</span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 clear-both">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Target</span>
                  <strong className="font-mono font-bold text-slate-900 dark:text-white">₹500</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Earned</span>
                  <strong className="font-mono font-bold text-emerald-500">₹350</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Remaining</span>
                  <strong className="font-mono font-bold text-amber-500">₹150</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : null}

      {/* STICKY BOTTOM ACTION BAR (Positioned inside page area only, starting after sidebar) */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2.5 sm:p-3 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">

          {/* Button 1: Navigate */}
          <button
            type="button"
            onClick={() => addToast?.('Opening Google Maps navigation...', 'info')}
            className="py-2.5 px-3 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <Navigation size={18} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-extrabold text-xs block leading-tight truncate">Navigate</span>
              <span className="text-[10px] font-medium opacity-90 block leading-tight truncate">Open in Maps</span>
            </div>
          </button>

          {/* Button 2: Call Customer */}
          <button
            type="button"
            onClick={() => triggerCall(activeOrder.customerName, activeOrder.customerMobile, 'Customer')}
            className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <Phone size={18} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-extrabold text-xs block leading-tight truncate">Call Customer</span>
              <span className="text-[10px] font-medium opacity-90 block leading-tight truncate">Customer Support</span>
            </div>
          </button>

          {/* Button 3: Chat Customer */}
          <button
            type="button"
            onClick={() => triggerChat(activeOrder.customerName, 'Customer')}
            className="py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <MessageSquare size={18} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-extrabold text-xs block leading-tight truncate">Chat Customer</span>
              <span className="text-[10px] font-medium opacity-90 block leading-tight truncate">In-app Chat</span>
            </div>
          </button>

          {/* Button 4: Call Store */}
          <button
            type="button"
            onClick={() => triggerCall(activeOrder.storeName, activeOrder.storeMobile, 'Store Manager')}
            className="py-2.5 px-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <PhoneCall size={18} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-black text-xs block leading-tight truncate">Call Store</span>
              <span className="text-[10px] font-bold opacity-90 block leading-tight truncate">Store Contact</span>
            </div>
          </button>

          {/* Button 5: Report Issue */}
          <button
            type="button"
            onClick={() => setActiveModal('issue')}
            className="py-2.5 px-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <AlertTriangle size={18} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-extrabold text-xs block leading-tight truncate">Report Issue</span>
              <span className="text-[10px] font-medium opacity-90 block leading-tight truncate">Raise an Issue</span>
            </div>
          </button>

          {/* Button 6: Complete Delivery */}
          <button
            type="button"
            onClick={handleCompleteDelivery}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none py-2.5 px-3 rounded-2xl bg-[#00986C] hover:bg-emerald-700 text-white shadow-lg ring-2 ring-emerald-500/20 flex items-center gap-2 transition cursor-pointer"
          >
            <CheckCircle2 size={20} className="shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-extrabold text-xs block leading-tight truncate">Complete Delivery</span>
              <span className="text-[10px] font-medium opacity-90 block leading-tight truncate">Complete &amp; Claim ₹120</span>
            </div>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ALL INTERACTIVE MODAL POPUPS */}
      {/* ========================================================================= */}

      {/* MORE CUSTOMER ACTIONS MENU MODAL */}
      {activeModal === 'moreCustomer' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-3 sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">More Customer Actions</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1">✕</button>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                addToast?.('⏱️ ETA alert (12 min) sent to customer via SMS', 'success');
              }}
              className="w-full p-2.5 rounded-xl bg-page dark:bg-slate-950 hover:bg-page text-left font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Clock size={14} className="text-amber-500" /> Share Live ETA SMS
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                triggerCall('SaathApp Rider Support', '+91 1800 200 9842', 'Rider Support');
              }}
              className="w-full p-2.5 rounded-xl bg-page dark:bg-slate-950 hover:bg-page text-left font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <ShieldAlert size={14} className="text-rose-500" /> Request Support Assistance
            </button>
          </div>
        </div>
      )}

      {/* EMERGENCY SOS MODAL */}
      {activeModal === 'sos' && (
        <div className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-rose-900/60 pb-3">
              <h3 className="text-base font-black text-rose-400 flex items-center gap-2">
                ⚠️ EMERGENCY SOS ACTIVATED
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1">✕</button>
            </div>
            <p className="text-slate-300">
              Your live GPS coordinates (Patna, Bihar) and active route data have been transmitted to SaathApp Emergency Dispatch &amp; local authorities.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-center font-black">
                🚓 Call Police (112)
              </button>
              <button type="button" onClick={() => setActiveModal(null)} className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-center font-black">
                🚑 Call Ambulance (108)
              </button>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">
                Cancel Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALL MODAL POPUP */}
      {activeModal === 'call' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-white text-center sa-rise">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <PhoneCall size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black">{callDetails.name}</h3>
              <p className="text-xs text-slate-400">{callDetails.role} • {callDetails.number}</p>
            </div>
            <p className="text-xs text-emerald-400 font-bold animate-pulse">Dialing via SaathApp Secure Masked Bridge...</p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('Call connected successfully', 'success');
                }}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE IN-APP CHAT MODAL */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-4 sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">{chatDetails.name}</h3>
                <p className="text-[10px] text-slate-400">{chatDetails.role} • Active Chat</p>
              </div>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1">✕</button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-page dark:bg-slate-950 rounded-2xl text-xs">
              {chatDetails.messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[80%] ${m.sender === 'You' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200 text-slate-900 dark:text-white'}`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">{m.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1">
                <Send size={14} /> Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ISSUE REPORTING MODAL */}
      {activeModal === 'issue' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-rose-500 flex items-center gap-2">
                <AlertTriangle size={18} /> REPORT DELIVERY ISSUE
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1">✕</button>
            </div>

            <p className="text-xs text-slate-500">Select reason for delivery issue to notify support:</p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {[
                'Customer Not Available',
                'Wrong Address',
                'Store Closed',
                'Item Missing',
                'Vehicle Breakdown',
                'Accident',
                'Payment Issue',
                'App Issue',
                'Other'
              ].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setSelectedIssue(reason)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${selectedIssue === reason
                    ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold'
                    : 'bg-page dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Additional notes for support team..."
              value={issueNote}
              onChange={(e) => setIssueNote(e.target.value)}
              className="w-full h-20 p-2.5 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-200 font-bold text-xs">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  if (!selectedIssue) {
                    addToast?.('Please select an issue reason', 'warning');
                    return;
                  }
                  setActiveModal(null);
                  addToast?.(`⚠️ Delivery issue "${selectedIssue}" reported to Support!`, 'warning');
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs"
              >
                Submit Issue Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR SCANNER MODAL */}
      {activeModal === 'qr' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center text-white sa-rise">
            <h3 className="text-base font-black text-amber-400">Scan Delivery QR Code</h3>
            <div className="w-48 h-48 mx-auto border-2 border-amber-500 border-dashed rounded-2xl flex items-center justify-center bg-slate-950 relative overflow-hidden">
              <QrCode size={96} className="text-amber-500/40 animate-pulse" />
              <div className="absolute inset-x-0 h-1 bg-amber-500 animate-pulse" style={{ top: '50%' }}></div>
            </div>
            <p className="text-xs text-slate-400">Align QR code within frame for auto verification</p>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                handleVerifyOtp();
                addToast?.('QR Code scanned and verified!', 'success');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs"
            >
              Verify QR Code
            </button>
          </div>
        </div>
      )}

      {/* DIGITAL SIGNATURE MODAL */}
      {activeModal === 'signature' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 sa-rise">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Customer Digital Signature</h3>
            <div className="h-36 rounded-2xl border-2 border-dashed border-slate-300 bg-page dark:bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">
              [ Customer Signature Canvas Area ]
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Clear</button>
              <button
                type="button"
                onClick={() => {
                  setSignatureSaved(true);
                  setActiveModal(null);
                  addToast?.('Customer Signature saved successfully!', 'success');
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs"
              >
                Save Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO PROOF MODAL */}
      {activeModal === 'photo' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center text-white sa-rise">
            <h3 className="text-base font-black text-emerald-400">Upload Delivery Photo Proof</h3>
            <div className="w-full h-40 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-2 text-slate-400">
              <Camera size={36} className="text-emerald-500" />
              <span className="text-xs">Take photo of delivered parcel at doorway</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setPhotoCaptured(true);
                setActiveModal(null);
                addToast?.('Delivery proof photo attached!', 'success');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs"
            >
              Capture &amp; Attach Photo
            </button>
          </div>
        </div>
      )}

      {/* SHARE LIVE LOCATION LINK MODAL */}
      {activeModal === 'shareLocation' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 sa-rise">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Share2 size={18} className="text-purple-500" /> Share Live Tracking Link
            </h3>
            <p className="text-xs text-slate-500">Share live GPS route link directly with customer or store manager:</p>
            <div className="p-3 bg-page dark:bg-slate-950 rounded-xl font-mono text-xs text-amber-600 dark:text-amber-400 break-all">
              https://saathapp.in/track/DEL-98420-LIVE
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('https://saathapp.in/track/DEL-98420-LIVE');
                  setActiveModal(null);
                  addToast?.('Live tracking link copied &amp; sent via SMS!', 'success');
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs"
              >
                Copy &amp; Send Link SMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AFTER SUCCESSFUL DELIVERY POPUP MODAL */}
      {activeModal === 'complete' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center sa-rise">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10">
              <CheckCircle2 size={48} />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                ✅ Delivery Completed!
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">DEL-98420 Delivered</h3>
              <p className="text-xs text-slate-500 mt-0.5">Order delivered safely to Anil Kumar at Boring Road</p>
            </div>

            {/* Payout Breakdown */}
            <div className="bg-page dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 font-semibold">
              <div className="flex justify-between"><span className="text-slate-500">Delivery Payout Earnings</span><strong className="font-mono text-slate-900 dark:text-white">₹120</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Customer Tip</span><strong className="font-mono text-emerald-500">₹20</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">On-Time Performance Bonus</span><strong className="font-mono text-amber-500">₹30</strong></div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-base font-black">
                <span className="text-slate-900 dark:text-white">Total Earned</span>
                <strong className="font-mono text-emerald-500 text-xl">₹170</strong>
              </div>
            </div>

            {/* Completion Action Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              <button
                type="button"
                onClick={handleFinishDeliveryFlow}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-center shadow cursor-pointer"
              >
                ⭐ Rate Customer
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('Navigating to Next Assigned Order...', 'info');
                }}
                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-center shadow cursor-pointer"
              >
                📦 View Next Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RATE CUSTOMER MODAL */}
      {activeModal === 'rateCustomer' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center sa-rise">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Rate Customer Interaction</h3>
            <p className="text-xs text-slate-500">How was your experience with customer Anil Kumar?</p>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCustomerRating(star)}
                  className={`text-2xl cursor-pointer ${star <= customerRating ? 'text-amber-400 scale-110' : 'text-slate-300 dark:text-slate-700'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              placeholder="Add feedback notes (optional)..."
              value={customerFeedback}
              onChange={(e) => setCustomerFeedback(e.target.value)}
              className="w-full h-20 p-2.5 rounded-xl border border-slate-300 bg-page dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none"
            />

            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                addToast?.('🎉 Rating submitted! Wallet updated +₹170', 'success');
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md"
            >
              Submit Rating &amp; Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* FUTURE AI FEATURES DRAWER */}
      {activeModal === 'futureFeatures' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 sa-rise">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
                <Sparkles size={18} /> Future AI Features &amp; Settings
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-900 dark:text-white">🎙️ Voice Navigation</span>
                  <input type="checkbox" checked={voiceNavEnabled} onChange={(e) => setVoiceNavEnabled(e.target.checked)} />
                </div>
                <p className="text-[10px] text-slate-500">Hindi/English voice turn guidance</p>
              </div>

              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-900 dark:text-white">🤖 AI Route Optimization</span>
                  <input type="checkbox" checked={aiRouteOptimization} onChange={(e) => setAiRouteOptimization(e.target.checked)} />
                </div>
                <p className="text-[10px] text-slate-500">Live traffic bypass &amp; shortest route</p>
              </div>

              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-900 dark:text-white">⚡ Smart Auto-Accept</span>
                  <input type="checkbox" checked={smartAutoAccept} onChange={(e) => setSmartAutoAccept(e.target.checked)} />
                </div>
                <p className="text-[10px] text-slate-500">Auto accept orders matching high payout</p>
              </div>

              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-extrabold text-slate-900 dark:text-white block">⛽ Fuel Tracking</span>
                <p className="text-[10px] text-slate-500">Estimated Fuel Level: 75% • ₹50/day allowance</p>
              </div>

              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-extrabold text-slate-900 dark:text-white block">🔋 Battery Warning</span>
                <p className="text-[10px] text-slate-500">Battery 86% • Auto power save active</p>
              </div>

              <div className="p-3 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-extrabold text-slate-900 dark:text-white block">🖼️ Proof-of-Delivery Gallery</span>
                <p className="text-[10px] text-slate-500">View past photos &amp; signatures</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  addToast?.('AI Settings saved successfully', 'success');
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function HeadphonesIcon({ size = 16, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
