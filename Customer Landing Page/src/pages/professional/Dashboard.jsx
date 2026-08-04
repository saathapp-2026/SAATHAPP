import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, AlertCircle, Phone, CheckCircle, Award, Star, Wallet } from 'lucide-react';

// Import modular components
import Sidebar from '../../components/professional/Sidebar';
import Topbar from '../../components/professional/Topbar';
import StatCard from '../../components/professional/StatCard';
import BookingCard from '../../components/professional/BookingCard';
import Schedule from '../../components/professional/Schedule';
import Chart from '../../components/professional/Chart';
import RatingCard from '../../components/professional/RatingCard';
import WalletCard from '../../components/professional/WalletCard';
import QuickActions from '../../components/professional/QuickActions';
import NotificationPanel from '../../components/professional/NotificationPanel';
import ProfileCard from '../../components/professional/ProfileCard';
import CalendarWidget from '../../components/professional/CalendarWidget';
import CustomerTable from '../../components/professional/CustomerTable';
import DocumentsCard from '../../components/professional/DocumentsCard';
import AvailabilityCard from '../../components/professional/AvailabilityCard';
import { getStoredProfessionalOnboarding } from '../../services/professionalOnboardingService';
import { getStoredProfessionalMembership, saveProfessionalMembership } from '../../config/professional/membershipPlans';
import { getWelcomeKitEligibilityStatus } from '../../config/professional/welcomeKitConfig';
import { getStoredPartnerSession } from '../../services/authService';
import { getProfessionalPricingConfig } from '../../config/professionalOnboardingConfig';
import { ProfessionalProfileSection, MembershipSection, WelcomeKitSection, OnboardingInfoSection, VerificationSection, FeeSummarySection, CommissionSection, EquipmentSection, BusinessServicesSection, TermsCardSection } from '../../components/professional/ControlSections';

const EMPTY_STATS = {
  totalEarnings: 0,
  monthlyEarnings: 0,
  averageRating: 0,
  repeatCustomers: 0,
};

const SUPPORT_FAQS = [
  { q: 'How long does verification take?', a: 'Typically 2–5 business days after documents and payment are complete.' },
  { q: 'When do I receive the Welcome Kit?', a: 'After Growth or Enterprise membership is active and verification plus activation are complete.' },
  { q: 'How is renewal calculated?', a: 'Renewal is 50% of the then-applicable onboarding fee, due at the end of the 2-year validity period.' },
];

export default function ProfessionalDashboardPage({
  darkMode,
  toggleDarkMode,
  onLogout,
  _onBack
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [bookings, setBookings] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const onboarding = getStoredProfessionalOnboarding();
  const session = getStoredPartnerSession();
  const [membership, setMembership] = useState(
    () => getStoredProfessionalMembership() || onboarding?.membership || { planId: 'free', planName: 'Free', price: 0, status: 'free' }
  );
  const kitStatus = getWelcomeKitEligibilityStatus(membership?.planId || 'free', onboarding?.status);
  const pricingConfig = getProfessionalPricingConfig();
  const professionLabel = pricingConfig.categoryLabels?.[onboarding?.accountInfo?.category] || onboarding?.accountInfo?.category;
  const validityEnd = onboarding?.onboardingFee?.validityEnd;
  const renewalDate = validityEnd ? new Date(validityEnd).toLocaleDateString('en-IN') : '—';
  const validUntil = renewalDate;
  const serviceRadiusLabel = onboarding?.serviceLocation?.serviceRadius
    ? `${onboarding.serviceLocation.serviceRadius} km`
    : 'Not set';
  const serviceCity = [onboarding?.serviceLocation?.city, onboarding?.serviceLocation?.state].filter(Boolean).join(', ') || 'Not set';
  const partnerName = onboarding?.accountInfo?.name || session?.user?.name || 'Professional';

  useEffect(() => {
    const seeded = [];
    if (validityEnd) {
      seeded.push({
        id: 'notif-membership',
        title: 'Onboarding Validity',
        description: `Your onboarding access is valid until ${renewalDate}. Renewal is ${pricingConfig.renewalPercentage}% of the applicable fee.`,
        time: 'Pinned',
        type: 'system_info',
        read: false,
      });
    }
    if (!kitStatus.eligible) {
      seeded.push({
        id: 'notif-kit',
        title: 'Welcome Kit',
        description: 'Upgrade to Growth or Enterprise and complete verification to receive the Complimentary Welcome Kit.',
        time: 'Pinned',
        type: 'system_info',
        read: false,
      });
    }
    if (onboarding?.status && onboarding.status !== 'approved' && onboarding.status !== 'activated') {
      seeded.push({
        id: 'notif-verify',
        title: 'Verification Update',
        description: `Current status: ${onboarding.status}. Timeline: 3–30 business days.`,
        time: 'Pinned',
        type: 'system_info',
        read: false,
      });
    }
    if (seeded.length) setNotifications((prev) => (prev.length ? prev : seeded));
  }, []);

  // Support tickets — start empty (user-raised only)
  const [supportTickets, setSupportTickets] = useState([]);

  const [ticketSubject, setTicketSubject] = useState('');

  // Page title sync
  useEffect(() => {
    document.title = 'Partner Dashboard | SaathApp';
  }, []);

  // Booking handlers
  const handleAcceptJob = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'upcoming', paymentStatus: 'secured' } : b));
    
    // Add alert log
    const newNotif = {
      id: Date.now(),
      title: 'Booking Accepted',
      description: `You accepted booking ID ${bookingId}. Customer notified.`,
      time: 'Just now',
      type: 'system_info',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    alert(`Job accepted! Navigate to client when scheduled.`);
  };

  const handleNavigateGPS = (bookingId) => {
    alert(`GPS navigation initialized for booking ${bookingId}.`);
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'in_progress' } : b));
  };

  const handleStartService = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'in_progress' } : b));
  };

  const handleCompleteService = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed', paymentStatus: 'released' } : b));
    
    // Add notification
    const newNotif = {
      id: Date.now(),
      title: 'Job Completed & Settled',
      description: `Earnings for booking ${bookingId} have been released to your wallet.`,
      time: 'Just now',
      type: 'payment_received',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    alert(`Service completed. Escrow released to your available balance.`);
  };

  const handleCancelService = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    alert(`Booking declined/cancelled successfully.`);
  };

  // Notification handlers
  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  // Support ticket handler
  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      status: 'open',
      response: 'Ticket received. Support agent will connect shortly.'
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setTicketSubject('');
    alert('Support ticket raised successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      
      {/* Outer Dashboard frame */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onLogout={onLogout}
          partnerName={partnerName}
          partnerCategory={professionLabel}
          partnerPhoto={onboarding?.documents?.photo}
        />

        {/* RIGHT CONTENT WORKSPACE */}
        <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
          
          {/* HEADER NAVBAR */}
          <Topbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            notifications={notifications}
            onLogout={onLogout}
          />

          {/* MAIN DYNAMIC BODY VIEWPORT */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                
                {/* 1. CENTRAL DASHBOARD VIEW PANEL */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Onboarding / Membership status strip — extend existing dashboard only */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-3 sm:p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Verification</p>
                        <p className="text-sm font-bold mt-1 capitalize">{onboarding?.status || 'pending'}</p>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-3 sm:p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Membership</p>
                        <p className="text-sm font-bold mt-1">{membership?.planName || 'Free'}</p>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-3 sm:p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Welcome Kit</p>
                        <p className={`text-sm font-bold mt-1 ${kitStatus.eligible ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {kitStatus.eligible ? 'Eligible' : 'Not Eligible'}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-3 sm:p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Valid Until</p>
                        <p className="text-sm font-bold mt-1">{validUntil}</p>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-3 sm:p-4 col-span-2 md:col-span-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Renewal Date</p>
                        <p className="text-sm font-bold mt-1">{renewalDate}</p>
                      </div>
                    </div>

                    {/* STATS COUNTER GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <StatCard title="Today's Jobs" value={bookings.filter(b => !['completed', 'cancelled'].includes(b.status)).length} icon={Briefcase} progress={0} progressColor="bg-primary" colorClass="text-primary bg-primary/10" />
                      <StatCard title="Completed Jobs" value={bookings.filter(b => b.status === 'completed').length} icon={CheckCircle} progress={0} progressColor="bg-emerald-500" colorClass="text-emerald-500 bg-emerald-500/10" />
                      <StatCard title="Pending Jobs" value={bookings.filter(b => b.status === 'pending').length} icon={AlertCircle} progress={0} progressColor="bg-amber-500" colorClass="text-amber-500 bg-amber-500/10" />
                      <StatCard title="Cancelled Jobs" value={bookings.filter(b => b.status === 'cancelled').length} icon={AlertCircle} progress={0} progressColor="bg-rose-500" colorClass="text-rose-500 bg-rose-500/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <StatCard title="Total Earnings" value={`₹${EMPTY_STATS.totalEarnings.toLocaleString('en-IN')}`} icon={Wallet} progress={0} progressColor="bg-blue-500" colorClass="text-blue-500 bg-blue-500/10" />
                      <StatCard title="Monthly Earnings" value={`₹${EMPTY_STATS.monthlyEarnings.toLocaleString('en-IN')}`} icon={Wallet} progress={0} progressColor="bg-indigo-500" colorClass="text-indigo-500 bg-indigo-500/10" />
                      <StatCard title="Avg Rating" value={`${EMPTY_STATS.averageRating} ★`} icon={Star} progress={0} progressColor="bg-amber-500" colorClass="text-amber-500 bg-amber-500/10" />
                      <StatCard title="Repeat Customers" value={EMPTY_STATS.repeatCustomers} icon={Award} progress={0} progressColor="bg-emerald-500" colorClass="text-emerald-500 bg-emerald-500/10" />
                    </div>

                    {/* CHARTS CONTAINER */}
                    <Chart />

                    {/* QUICK ACTIONS ROW */}
                    <QuickActions
                      isOnline={isOnline}
                      setIsOnline={setIsOnline}
                      setActiveTab={setActiveTab}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                      <ProfessionalProfileSection
                        onboarding={onboarding}
                        session={session}
                        professionLabel={professionLabel}
                      />
                      <div className="space-y-6">
                        <WelcomeKitSection
                          membership={membership}
                          applicationStatus={onboarding?.status}
                          setActiveTab={setActiveTab}
                        />
                        <TermsCardSection />
                      </div>
                    </div>

                    {/* SCHEDULE & BOOKINGS DOUBLE COLUMNS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Today's Schedule timeline */}
                      <div>
                        <Schedule />
                      </div>

                      {/* Right: Active Bookings cards */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Upcoming Assignments</h3>
                          <button
                            onClick={() => setActiveTab('bookings')}
                            className="text-xs text-primary font-bold hover:underline cursor-pointer"
                          >
                            View All Bookings
                          </button>
                        </div>

                        {bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length === 0 ? (
                          <p className="text-sm text-slate-400 py-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">No upcoming assignments yet.</p>
                        ) : (
                          bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').map((booking) => (
                            <BookingCard
                              key={booking.id}
                              booking={booking}
                              onAccept={handleAcceptJob}
                              onNavigate={handleNavigateGPS}
                              onStart={handleStartService}
                              onComplete={handleCompleteService}
                              onCancel={handleCancelService}
                            />
                          ))
                        )}
                      </div>

                    </div>

                    {/* RECENT COMPLETED BOOKINGS TABLE */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft text-left">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Recent Bookings Log</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-semibold text-slate-650 dark:text-slate-450">
                          <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                              <th className="pb-3">Customer</th>
                              <th className="pb-3">Service</th>
                              <th className="pb-3 text-center">Amount</th>
                              <th className="pb-3">Date</th>
                              <th className="pb-3 text-center">Status</th>
                              <th className="pb-3 text-right">Rating</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                            {bookings.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="py-8 text-center text-slate-400">No bookings yet.</td>
                              </tr>
                            ) : (
                              bookings.map((b, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{b.customerName}</td>
                                  <td className="py-3 text-primary">{b.serviceName}</td>
                                  <td className="py-3 text-center font-bold">₹{b.amount}</td>
                                  <td className="py-3 text-slate-400">{b.date}</td>
                                  <td className="py-3 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                      b.status === 'completed'
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                                        : b.status === 'cancelled'
                                          ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                                          : 'bg-blue-50 text-blue-600 border border-blue-200/50'
                                    }`}>
                                      {b.status}
                                    </span>
                                  </td>
                                  <td className="py-3 text-right text-amber-500 font-bold">
                                    {b.rating ? `★ ${b.rating}.0` : '—'}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. BOOKINGS TAB VIEW */}
                {activeTab === 'bookings' && (
                  <div className="space-y-4 text-left">
                    <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Bookings Register</h2>
                        <p className="text-[11px] text-slate-400">View and manage your job orders</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {bookings.length === 0 ? (
                        <p className="text-sm text-slate-400 py-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">No bookings yet. New jobs will appear here.</p>
                      ) : (
                        bookings.map((booking) => (
                          <BookingCard
                            key={booking.id}
                            booking={booking}
                            onAccept={handleAcceptJob}
                            onNavigate={handleNavigateGPS}
                            onStart={handleStartService}
                            onComplete={handleCompleteService}
                            onCancel={handleCancelService}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. CALENDAR TAB VIEW */}
                {activeTab === 'calendar' && (
                  <CalendarWidget />
                )}

                {/* 4. CUSTOMERS TAB VIEW */}
                {activeTab === 'customers' && (
                  <CustomerTable />
                )}

                {/* 5. WALLET & PAYOUTS TAB VIEW */}
                {activeTab === 'wallet' && (
                  <WalletCard />
                )}

                {/* 6. REVIEWS TAB VIEW */}
                {activeTab === 'reviews' && (
                  <RatingCard />
                )}

                {/* 7. NOTIFICATIONS TAB VIEW */}
                {activeTab === 'notifications' && (
                  <NotificationPanel
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onClearAll={handleClearAllNotifs}
                  />
                )}

                {/* 8. SERVICE RADIUS MAP VIEW */}
                {activeTab === 'service_area' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/40">
                      <div>
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Service Radius Radius Map</h3>
                        <p className="text-[10px] text-slate-450 mt-0.5">Define your geographical service coverage coordinates</p>
                      </div>
                      <button
                        onClick={() => alert('Update service radius from your onboarding profile when editing is available.')}
                        className="px-3.5 py-1.5 bg-primary text-white text-xs font-black uppercase rounded-xl cursor-pointer"
                      >
                        Adjust Radius
                      </button>
                    </div>

                    {/* Service area from onboarding */}
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

                {/* 9. AVAILABILITY VIEW */}
                {activeTab === 'availability' && (
                  <AvailabilityCard />
                )}

                {/* 10. DOCUMENTS UPLOADS */}
                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    <OnboardingInfoSection onboarding={onboarding} professionLabel={professionLabel} />
                    <DocumentsCard />
                  </div>
                )}

                {/* 11. PROFILE VIEW */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <ProfessionalProfileSection
                      onboarding={onboarding}
                      session={session}
                      professionLabel={professionLabel}
                    />
                    <ProfileCard />
                  </div>
                )}

                {activeTab === 'membership' && (
                  <MembershipSection
                    membership={membership}
                    renewalDate={renewalDate}
                    setActiveTab={setActiveTab}
                    onMembershipChange={(next) => {
                      setMembership(next);
                      saveProfessionalMembership(next);
                    }}
                  />
                )}

                {activeTab === 'welcome_kit' && (
                  <WelcomeKitSection
                    membership={membership}
                    applicationStatus={onboarding?.status}
                    setActiveTab={setActiveTab}
                  />
                )}

                {activeTab === 'verification' && (
                  <VerificationSection onboarding={onboarding} />
                )}

                {activeTab === 'onboarding_info' && (
                  <OnboardingInfoSection onboarding={onboarding} professionLabel={professionLabel} />
                )}

                {activeTab === 'fee_summary' && (
                  <div className="space-y-6">
                    <FeeSummarySection onboarding={onboarding} />
                    <CommissionSection onboarding={onboarding} />
                  </div>
                )}

                {activeTab === 'equipment' && (
                  <EquipmentSection />
                )}

                {activeTab === 'business_services' && (
                  <BusinessServicesSection />
                )}

                {activeTab === 'terms' && (
                  <TermsCardSection />
                )}

                {/* 12. HELP & SUPPORT PANEL */}
                {activeTab === 'support' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    
                    {/* Left Col: Raise Ticket */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft text-left flex flex-col justify-between">
                      <div className="space-y-4 w-full">
                        <div>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Partner Support Helpdesk</h3>
                          <p className="text-[10px] text-slate-450 mt-0.5">Submit support queries directly to our operations panel</p>
                        </div>

                        <form onSubmit={handleRaiseTicket} className="space-y-3.5">
                          <div className="space-y-1">
                            <label className="field-label">Subject details</label>
                            <input
                              type="text"
                              required
                              value={ticketSubject}
                              onChange={(e) => setTicketSubject(e.target.value)}
                              placeholder="e.g. Booking payout inquiry"
                              className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn-primary w-full cursor-pointer text-xs"
                          >
                            Submit Support Ticket
                          </button>
                        </form>
                      </div>

                      {/* Ticket History */}
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

                    {/* Right Col: FAQs & Hotline */}
                    <div className="space-y-6">
                      
                      {/* Hotline contact */}
                      <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-soft flex flex-col justify-between h-40">
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
                          className="w-full py-1.5 bg-white text-slate-900 text-center font-extrabold text-[10px] uppercase rounded-btn block hover:bg-slate-100 shadow-sm"
                        >
                          Call Helpline Now
                        </a>
                      </div>

                      {/* FAQs Card */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft text-left">
                        <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Partner FAQs</h4>
                        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                          {SUPPORT_FAQS.map((faq, i) => (
                            <div key={i}>
                              <span className="font-black text-slate-800 dark:text-slate-300 block">{faq.q}</span>
                              <p className="mt-1 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 13. SETTINGS & PREFERENCES */}
                {activeTab === 'settings' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left space-y-6 max-w-2xl">
                    <div className="pb-4 border-b border-slate-100 dark:border-slate-800/40">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">System Preferences</h3>
                      <p className="text-[10px] text-slate-450 mt-0.5">Customize notification modes, system language, and security rules</p>
                    </div>

                    <div className="space-y-5">
                      
                      {/* Theme Toggle */}
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

                      {/* Notification settings */}
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

                      {/* Account deletion warning */}
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

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>

    </div>
  );
}
