import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Briefcase, Star, Bell, Calendar, Wallet, Activity, User, CheckCircle, LayoutDashboard, ClipboardCheck, DollarSign, AlertCircle } from 'lucide-react';

// Import worker components
import Sidebar from '../../components/worker/Sidebar';
import Topbar from '../../components/worker/Topbar';
import StatsCard from '../../components/worker/StatsCard';
import JobsCard from '../../components/worker/JobsCard';
import AttendanceCard from '../../components/worker/AttendanceCard';
import PerformanceCard from '../../components/worker/PerformanceCard';
import WalletCard from '../../components/worker/WalletCard';
import ReviewCard from '../../components/worker/ReviewCard';
import NotificationPanel from '../../components/worker/NotificationPanel';
import ProfileCard from '../../components/worker/ProfileCard';
import CalendarWidget from '../../components/worker/CalendarWidget';
import { workerJobs as initialWorkerJobs, workerStats, workerEarnings, workerAttendance as initialAttendance, workerDocuments, workerNotifications as initialWorkerNotifications, workerSupportFaqs, workerTrainingVideos } from '../../data/mockData';
import toast from 'react-hot-toast';

export default function WorkerDashboardPage({
  darkMode,
  toggleDarkMode,
  onLogout,
  _onBack
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState({ jobs: true, salary: true, reviews: true });

  const [attendance, setAttendance] = useState({ present: 0, leaves: 0, lateMarks: 0, penalty: 0 });
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [activeLiveJob, setActiveLiveJob] = useState(null);

  const [notifications, setNotifications] = useState([]);

  // Support tickets state
  const [_supportTickets, setSupportTickets] = useState([]);

  const [ticketSubject, setTicketSubject] = useState('');

  useEffect(() => {
    document.title = 'Worker Portal | SaathApp';
  }, []);

  // Job handlers
  const handleAcceptJob = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'accepted' } : j));
    
    // Add system notification
    const newNotif = {
      id: Date.now(),
      title: 'Job Accepted',
      description: `You accepted job ${jobId}. Expected arrival timeline updated.`,
      time: 'Just now',
      type: 'system_info',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success(`Job accepted! Settle checkups inside today's timeline.`) };

  const handleRejectJob = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'cancelled' } : j));
    toast.success(`Job declined successfully.`) };

  const handleSelectLiveJob = (jobObj) => {
    setActiveLiveJob(jobObj);
    setActiveTab('today_jobs'); // Go to live jobs tab
  };

  const handleCompleteJob = (jobId, _notes) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'completed' } : j));
    setActiveLiveJob(null);

    // Credit incentive payout dynamically
    const matchedJob = jobs.find(j => j.id === jobId);
    
    // Add notify
    const newNotif = {
      id: Date.now(),
      title: 'Incentive Payout Credited',
      description: `₹${matchedJob.incentive} incentive added to wallet for job ${jobId}.`,
      time: 'Just now',
      type: 'salary_credited',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success(`Job completed! Incentive of ₹${matchedJob.incentive} credited to wallet.`) };

  // Shift Punch handlers
  const handleClockIn = () => {
    setAttendance(prev => ({ ...prev, isClockedIn: true }));
    toast.success('Clocked In successfully! Active shift timer started.') };

  const handleClockOut = () => {
    setAttendance(prev => ({ 
      ...prev, 
      isClockedIn: false,
      totalHours: prev.totalHours + 8 
    }));
    toast.success('Clocked Out successfully! Shift log saved.') };

  // Notification handlers
  const handleMarkRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('saath_worker_notifs', JSON.stringify(updated));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
    localStorage.setItem('saath_worker_notifs', JSON.stringify([]));
  };

  // Ticket handler
  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      status: 'open',
      response: 'Support request logged. Review timeline: 4 hours.'
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setTicketSubject('');
    toast.success('Support ticket raised.') };

  const filteredJobs = searchQuery.trim()
    ? jobs.filter((j) =>
        [j.customerName, j.serviceName, j.address, j.id].some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : jobs;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_rgba(46,125,50,0.09),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(21,101,192,0.07),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eef7f0_100%)] dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col overflow-x-hidden transition-colors duration-300">
      
      {/* Outer viewport frame */}
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
          unreadCount={notifications.filter((n) => !n.read).length}
        />

        {/* WORKSPACE FRAME */}
        <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen pb-16 lg:pb-0">
          
          {/* TOPBAR */}
          <Topbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            notifications={notifications}
            onLogout={onLogout}
            onNavigateTab={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* DYNAMIC TAB VIEWPORTS */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                
                {/* 1. CENTRAL WORKER DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-card bg-gradient-to-r from-primary/90 via-brand-600 to-accent p-6 sm:p-8 text-white shadow-premium overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Service Worker Portal</p>
                          <h2 className="text-xl sm:text-2xl font-black mt-1">Your shift overview for today</h2>
                          <p className="text-sm text-white/85 mt-2 max-w-xl">
                            {isOnline ? 'You are online and receiving job dispatches.' : 'Go online to receive new assignments.'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsOnline(!isOnline)}
                          className="shrink-0 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-black uppercase backdrop-blur-sm"
                        >
                          {isOnline ? 'Switch Offline' : 'Go Online'}
                        </button>
                      </div>
                    </motion.div>

                    {!attendance.isClockedIn && (
                      <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-955/20 text-amber-600 border border-amber-205/50 rounded-card text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} />
                          <span>Shift inactive. Click Clock In to start receiving job updates and log hours.</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('attendance')}
                          className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm cursor-pointer"
                        >
                          Clock In
                        </button>
                      </div>
                    )}

                    {/* STATS CARD GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <StatsCard title="Today's Jobs" value={0} icon={Briefcase} progress={0} progressColor="bg-primary" colorClass="text-primary bg-primary/10" />
                      <StatsCard title="Assigned Jobs" value={0} icon={ClipboardCheck} progress={0} progressColor="bg-blue-500" colorClass="text-blue-500 bg-blue-500/10" />
                      <StatsCard title="Completed Jobs" value={0} icon={CheckCircle} growth={0} growthType="none" progress={0} progressColor="bg-emerald-500" colorClass="text-emerald-500 bg-emerald-500/10" />
                      <StatsCard title="Pending Jobs" value={0} icon={Clock} progress={0} progressColor="bg-amber-500" colorClass="text-amber-500 bg-amber-500/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <StatsCard title="Cancelled Jobs" value={0} icon={AlertCircle} progress={0} progressColor="bg-rose-500" colorClass="text-rose-500 bg-rose-500/10" />
                      <StatsCard title="Today's Earnings" value={`₹0`} icon={DollarSign} growth={0} growthType="none" progress={0} progressColor="bg-emerald-500" colorClass="text-emerald-500 bg-emerald-500/10" />
                      <StatsCard title="Monthly Earnings" value={`₹0`} icon={Wallet} progress={0} progressColor="bg-indigo-500" colorClass="text-indigo-500 bg-indigo-500/10" />
                      <StatsCard title="Performance Score" value={`0%`} icon={Activity} progress={0} progressColor="bg-primary" colorClass="text-primary bg-primary/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <StatsCard title="Working Hours" value={`0h`} icon={Clock} progress={0} progressColor="bg-blue-500" colorClass="text-blue-500 bg-blue-500/10" />
                      <StatsCard title="Attendance" value={`0%`} icon={Calendar} progress={0} progressColor="bg-emerald-500" colorClass="text-emerald-500 bg-emerald-500/10" />
                      <StatsCard title="Monthly Salary" value={`₹0`} icon={Briefcase} progress={0} progressColor="bg-violet-500" colorClass="text-violet-500 bg-violet-500/10" />
                      <StatsCard title="Incentives" value={`₹0`} icon={Star} progress={0} progressColor="bg-secondary" colorClass="text-amber-600 bg-amber-500/10" />
                      <StatsCard title="Avg Rating" value={`0.0 ★`} icon={Star} progress={0} progressColor="bg-amber-500" colorClass="text-amber-500 bg-amber-500/10" />
                    </div>

                    {/* Prominent Active Job resume banner if active */}
                    {activeLiveJob && (
                      <div className="p-5 bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card shadow-premium text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] bg-slate-900/30 border border-white/10 px-2 py-0.5 rounded-full font-black uppercase text-secondary inline-block">
                            Active Task
                          </span>
                          <h4 className="text-sm sm:text-base font-black">Resume Job: {activeLiveJob.serviceName}</h4>
                          <p className="text-[11px] text-white/80 font-medium">{activeLiveJob.address}</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('today_jobs')}
                          className="px-5 py-2.5 bg-white text-slate-900 font-black text-xs uppercase tracking-wider rounded-btn shadow cursor-pointer transition-colors"
                        >
                          Resume Job Execution →
                        </button>
                      </div>
                    )}

                    {/* ASSIGNED JOBS DISPATCH LIST */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-left">
                        <div>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Assigned Job Alerts</h3>
                          <p className="text-[10px] text-slate-450 mt-0.5">Accept or reject pending supervisor dispatches</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.filter(j => j.status === 'assigned').map((job) => (
                          <JobsCard
                            key={job.id}
                            job={job}
                            mode="assigned"
                            onAccept={handleAcceptJob}
                            onReject={handleRejectJob}
                            onViewDetails={() => setSelectedJob(job)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* TODAY'S SCHEDULE LIST TIMELINE */}
                    <div className="space-y-4 text-left">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Today's Timeline</h3>
                      
                      <div className="space-y-4">
                        {filteredJobs.filter(j => j.status === 'accepted').map((job) => (
                          <JobsCard
                            key={job.id}
                            job={job}
                            mode="today"
                            onSelectLiveJob={handleSelectLiveJob}
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. TODAY'S JOBS TIMELINE OR ACTIVE TASK */}
                {activeTab === 'today_jobs' && (
                  <div className="space-y-4 text-left">
                    {!activeLiveJob ? (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Today's Jobs Timeline</h2>
                          <p className="text-[11px] text-slate-400">Select any accepted job to initiate live execution workflow</p>
                        </div>

                        <div className="space-y-4">
                          {filteredJobs.filter(j => j.status === 'accepted').map((job) => (
                            <JobsCard
                              key={job.id}
                              job={job}
                              mode="today"
                              onSelectLiveJob={handleSelectLiveJob}
                            />
                          ))}
                          {jobs.filter(j => j.status === 'accepted').length === 0 && (
                            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm font-semibold">
                              No active jobs scheduled for today. Check "Assigned Jobs" to accept requests.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Live Job Tracker</h2>
                            <p className="text-[11px] text-slate-455">Execute the current task systematically</p>
                          </div>
                          <button
                            onClick={() => setActiveLiveJob(null)}
                            className="px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase cursor-pointer"
                          >
                            Minimize Task
                          </button>
                        </div>

                        <JobsCard
                          job={activeLiveJob}
                          mode="live"
                          onComplete={handleCompleteJob}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ASSIGNED JOBS */}
                {activeTab === 'assigned_jobs' && (
                  <div className="space-y-4 text-left">
                    <div>
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Supervisor Job Dispatches</h2>
                      <p className="text-[11px] text-slate-400">Review dispatches assigned to your worker profile</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredJobs.filter(j => j.status === 'assigned').map((job) => (
                        <JobsCard
                          key={job.id}
                          job={job}
                          mode="assigned"
                          onAccept={handleAcceptJob}
                          onReject={handleRejectJob}
                          onViewDetails={() => setSelectedJob(job)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. COMPLETED JOBS */}
                {activeTab === 'completed_jobs' && (
                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft text-left overflow-x-auto">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Completed Jobs History</h3>
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead>
                        <tr className="transition-colors hover:bg-emerald-50/30 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400">
                          <th className="pb-3 pr-4">Customer</th>
                          <th className="pb-3 pr-4">Service</th>
                          <th className="pb-3 pr-4">Date</th>
                          <th className="pb-3 pr-4">Amount</th>
                          <th className="pb-3 pr-4">Rating</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredJobs.filter(j => j.status === 'completed').map((job) => (
                          <tr key={job.id} className="transition-colors hover:bg-emerald-50/30 hover:bg-slate-50/50">
                            <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{job.customerName}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{job.serviceName}</td>
                            <td className="py-3 text-slate-500">{job.date}</td>
                            <td className="py-3 font-black text-primary">₹{job.incentive}</td>
                            <td className="py-3 text-amber-500 font-bold">{job.rating ? `${job.rating} ★` : '—'}</td>
                            <td className="py-3 text-right">
                              <button type="button" onClick={() => setSelectedJob(job)} className="text-[10px] font-black uppercase text-primary hover:text-primary-dark">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. EARNINGS STATEMENT PANEL */}
                {activeTab === 'earnings' && (
                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left space-y-6">
                    <div className="pb-4 border-b border-slate-100 dark:border-slate-850/80 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Salary & Incentive Breakdown</h3>
                        <p className="text-[10px] text-slate-450 mt-0.5">Overview of settled salary logs, bonus payouts, and incentives</p>
                      </div>
                      <button
                        onClick={() => toast.success('Salary statement downloaded.')}
                        className="px-3.5 py-1.5 bg-primary text-white text-xs font-black uppercase rounded-xl cursor-pointer"
                      >
                        Download Statement
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Today</span>
                        <p className="text-lg font-black text-slate-800 dark:text-slate-200 mt-1">₹0</p>
                      </div>
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Weekly</span>
                        <p className="text-lg font-black text-slate-800 dark:text-slate-200 mt-1">₹0</p>
                      </div>
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Monthly</span>
                        <p className="text-lg font-black text-primary mt-1">₹0</p>
                      </div>
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Salary</span>
                        <p className="text-lg font-black text-slate-800 dark:text-slate-200 mt-1">₹0</p>
                      </div>
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Bonus</span>
                        <p className="text-lg font-black text-emerald-600 mt-1">₹0</p>
                      </div>
                      <div className="p-4 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                        <span className="text-[9px] font-black text-slate-450 uppercase block">Incentives</span>
                        <p className="text-lg font-black text-amber-600 mt-1">₹0</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. ATTENDANCE CARD VIEW */}
                {activeTab === 'attendance' && (
                  <AttendanceCard
                    attendance={attendance}
                    onClockIn={handleClockIn}
                    onClockOut={handleClockOut}
                  />
                )}

                {/* 7. CALENDAR GRID */}
                {activeTab === 'calendar' && (
                  <CalendarWidget />
                )}

                {/* 8. PERFORMANCE SCORE PANEL */}
                {activeTab === 'performance' && (
                  <PerformanceCard />
                )}

                {/* 9. REVIEWS FEEDBACK PANEL */}
                {activeTab === 'reviews' && (
                  <ReviewCard />
                )}

                {/* 10. WALLET PAYOUTS */}
                {activeTab === 'wallet' && (
                  <WalletCard />
                )}

                {/* 11. DOCUMENTS UPLOADS */}
                {activeTab === 'documents' && (
                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left space-y-6 max-w-2xl">
                    <div className="pb-4 border-b border-slate-100 ">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Worker Verifications</h3>
                      <p className="text-[10px] text-slate-450 mt-0.5">Government credentials uploaded for verification checking</p>
                    </div>

                    <div className="space-y-4">
                      {workerDocuments.map((doc, idx) => (
                        <div key={idx} className="p-3 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{doc.name}</span>
                            <p className="text-[10px] text-slate-450 font-mono mt-0.5">{doc.file}</p>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-250/50 text-[9px] font-black uppercase">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 12. NOTIFICATIONS PANELS */}
                {activeTab === 'notifications' && (
                  <NotificationPanel
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onClearAll={handleClearAllNotifs}
                  />
                )}

                {/* 13. HELP & CHAT SUPPORT */}
                {activeTab === 'support' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Raise Ticket</h3>
                        <form onSubmit={handleRaiseTicket} className="mt-4 space-y-3">
                          <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Subject" className="input-field w-full dark:border-slate-800 dark:text-white" />
                          <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-full cursor-pointer text-xs">Submit Support Ticket</button>
                        </form>
                      </div>
                      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">FAQs</h3>
                        <div className="space-y-3">
                          {workerSupportFaqs.map((faq, i) => (
                            <div key={i} className="p-3 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40">
                              <p className="text-xs font-black text-slate-800 dark:text-slate-200">{faq.q}</p>
                              <p className="text-[11px] text-slate-500 mt-1">{faq.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Training Videos</h3>
                        <div className="space-y-2">
                          {workerTrainingVideos.map((video, i) => (
                            <button key={i} type="button" onClick={() => toast.success(`Playing: ${video.title}`)} className="w-full flex items-center justify-between p-3 bg-page dark:bg-slate-950 rounded-xl border border-slate-200/40 hover:border-primary/30 cursor-pointer">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{video.title}</span>
                              <span className="text-[10px] text-slate-400">{video.duration}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 text-white rounded-card p-6 shadow-soft">
                        <span className="text-[10px] font-black uppercase text-white/80">Call Support</span>
                        <h4 className="text-lg font-black mt-2">1800 123 456</h4>
                        <a href="tel:1800123456" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-4 block w-full py-2 bg-white text-slate-900 text-center font-extrabold text-[10px] uppercase rounded-btn">Call Now</a>
                      </div>
                      <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-card p-6 shadow-soft">
                        <span className="text-[10px] font-black uppercase text-white/80">Manager Hotline</span>
                        <h4 className="text-lg font-black mt-2">Rahul Kumar</h4>
                        <a href="tel:+919876543299" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-4 block w-full py-2 bg-white text-slate-900 text-center font-extrabold text-[10px] uppercase rounded-btn">Call Supervisor</a>
                      </div>
                    </div>
                  </div>
                )}

                {/* 14. PROFILE INFORMATION */}
                {activeTab === 'profile' && (
                  <ProfileCard />
                )}

                {/* 15. SETTINGS PANEL */}
                {activeTab === 'settings' && (
                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft text-left space-y-4 max-w-2xl">
                    <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Settings</h3>
                      <p className="text-xs text-slate-500 mt-1">Manage appearance, notifications, privacy and security</p>
                    </div>

                    {[
                      { key: 'dark', label: 'Dark Mode', desc: 'Switch between light and dark themes', toggle: darkMode, onToggle: toggleDarkMode },
                      { key: 'jobs', label: 'Job Notifications', desc: 'Alerts for new and updated assignments', toggle: notificationPrefs.jobs, onToggle: () => setNotificationPrefs((p) => ({ ...p, jobs: !p.jobs })) },
                      { key: 'salary', label: 'Salary Notifications', desc: 'Credits, bonuses and payout updates', toggle: notificationPrefs.salary, onToggle: () => setNotificationPrefs((p) => ({ ...p, salary: !p.salary })) },
                      { key: 'reviews', label: 'Review Notifications', desc: 'New customer ratings and feedback', toggle: notificationPrefs.reviews, onToggle: () => setNotificationPrefs((p) => ({ ...p, reviews: !p.reviews })) },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-slate-200/60 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/30">
                        <div>
                          <span className="text-sm font-black text-slate-800 dark:text-white block">{item.label}</span>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={item.onToggle}
                          className={`transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-11 h-6 rounded-full p-0.5 transition-colors ${item.toggle ? 'bg-primary' : 'bg-slate-300'}`}
                        >
                          <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${item.toggle ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <button type="button" onClick={() => toast.success('Privacy settings saved.')} className="w-full py-2.5 text-left px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary/30">
                        Privacy Settings
                      </button>
                      <button type="button" onClick={() => toast.success('Security settings opened.')} className="w-full py-2.5 text-left px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary/30">
                        Security
                      </button>
                      <button type="button" onClick={onLogout} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 text-sm font-black uppercase">
                        Logout
                      </button>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Job Details Modal */}
            {selectedJob && (
              <div className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:scale-[0.99] fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedJob(null)}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-surface rounded-card border border-slate-200 dark:border-slate-800 p-6 shadow-premium text-left space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white">Job Details</h3>
                    <button type="button" onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold">Customer:</span> {selectedJob.customerName}</p>
                    <p><span className="font-bold">Service:</span> {selectedJob.serviceName}</p>
                    <p><span className="font-bold">Problem:</span> {selectedJob.scopeDescription}</p>
                    <p><span className="font-bold">Address:</span> {selectedJob.address}</p>
                    <p><span className="font-bold">Estimated Time:</span> {selectedJob.estimatedTime || '45 mins'}</p>
                    {selectedJob.materials?.length > 0 && (
                      <p><span className="font-bold">Materials:</span> {selectedJob.materials.join(', ')}</p>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a href={`tel:${selectedJob.customerPhone}`} className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex-1 py-2.5 bg-primary text-white text-center rounded-xl text-xs font-black uppercase">Call Customer</a>
                    <button type="button" onClick={() => toast.success('GPS navigation started.')} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-black uppercase">Navigate</button>
                  </div>
                </motion.div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-850 px-4 py-2 flex items-center justify-around shadow-premium">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'dashboard' ? 'text-primary font-black' : 'text-slate-450 hover:text-slate-600'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[9px] font-black uppercase">Dashboard</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('today_jobs')} 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'today_jobs' ? 'text-primary font-black' : 'text-slate-450 hover:text-slate-600'
          }`}
        >
          <Clock size={20} />
          <span className="text-[9px] font-black uppercase">Jobs</span>
        </button>

        <button 
          onClick={() => setActiveTab('wallet')} 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'wallet' ? 'text-primary font-black' : 'text-slate-450 hover:text-slate-600'
          }`}
        >
          <Wallet size={20} />
          <span className="text-[9px] font-black uppercase">Wallet</span>
        </button>

        <button 
          onClick={() => setActiveTab('notifications')} 
          className={`flex flex-col items-center gap-0.5 cursor-pointer relative ${
            activeTab === 'notifications' ? 'text-primary font-black' : 'text-slate-450 hover:text-slate-600'
          }`}
        >
          <Bell size={20} />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-danger border border-white dark:border-slate-900 rounded-full" />
          )}
          <span className="text-[9px] font-black uppercase">Alerts</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')} 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'profile' ? 'text-primary font-black' : 'text-slate-450 hover:text-slate-600'
          }`}
        >
          <User size={20} />
          <span className="text-[9px] font-black uppercase">Profile</span>
        </button>
      </div>

    </div>
  );
}
