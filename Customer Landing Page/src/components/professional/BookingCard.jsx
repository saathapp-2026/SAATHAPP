import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Calendar, Clock, ChevronDown, ChevronUp, CheckCircle, Navigation, Play } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingCard({
  booking,
  onAccept,
  onReject,
  onReschedule,
  onNavigate,
  onStart,
  onComplete,
  onReportIssue
}) {
  const [expanded, setExpanded] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-150/10 text-amber-600 dark:text-amber-500 border-amber-500/20';
      case 'confirmed':
        return 'bg-emerald-150/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20';
      case 'scheduled':
        return 'bg-blue-150/10 text-blue-600 dark:text-blue-500 border-blue-500/20';
      case 'arrived':
        return 'bg-indigo-150/10 text-indigo-600 dark:text-indigo-500 border-indigo-500/20';
      case 'in_progress':
        return 'bg-primary/10 text-primary border-primary/20 animate-pulse';
      case 'completed':
        return 'bg-teal-150/10 text-teal-600 dark:text-teal-500 border-teal-500/20';
      case 'cancelled':
        return 'bg-rose-150/10 text-rose-600 dark:text-rose-500 border-rose-500/20';
      default:
        return 'bg-page text-slate-600';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const handleStartWithOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === booking.otp) {
      setOtpError(false);
      onStart(booking.id);
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  return (
    <motion.div
      layout
      className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card shadow-soft hover:shadow-premium text-left overflow-hidden transition-all"
    >
      {/* Top Main Banner Area */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Customer & Service Info */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[9px] font-black border px-2.5 py-0.5 rounded-full ${getStatusStyle(booking.status)}`}>
              {formatStatus(booking.status)}
            </span>
            <span className="text-[10px] font-extrabold text-slate-450 dark:text-slate-500">
              ID: {booking.id}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-page dark:bg-slate-950 flex items-center justify-center text-slate-500">
              <User size={16} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{booking.customerName}</h4>
              <p className="text-xs text-primary font-bold">{booking.serviceName}</p>
            </div>
          </div>
        </div>

        {/* Amount & Time highlights */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
          <div className="flex items-center text-slate-800 dark:text-white">
            <span className="text-[10px] text-slate-400 mr-2">Est. ₹{booking.estimatedPrice || booking.amount}</span>
            <span className="text-sm font-black">Final ₹{booking.amount}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Settlement Rate</span>
        </div>

      </div>

      {/* Basic details bar */}
      <div className="px-5 py-3.5 bg-page dark:bg-slate-950 border-y border-slate-150 dark:border-slate-850 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Calendar size={13} className="text-slate-400" />
          <span className="text-[11px] font-extrabold">{booking.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Clock size={13} className="text-slate-400" />
          <span className="text-[11px] font-extrabold">{booking.time}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate">
          <MapPin size={13} className="text-slate-400 flex-shrink-0" />
          <span className="text-[11px] font-bold truncate">{booking.address}</span>
        </div>
      </div>

      {/* Action Drawer Toggle */}
      <div className="px-5 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
        >
          <span>{expanded ? 'Hide Panel' : 'Expand Details'}</span>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {/* Quick Context Action Button */}
        <div className="flex items-center gap-2">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => onReject(booking.id)}
                className="px-3 py-1.5 rounded-btn border border-rose-200 hover:bg-rose-50 text-rose-500 text-[10px] font-extrabold uppercase cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => onAccept(booking.id)}
                className="px-4 py-1.5 rounded-btn bg-primary hover:bg-primary-dark text-white text-[10px] font-extrabold uppercase cursor-pointer shadow-sm"
              >
                Accept Job
              </button>
            </>
          )}

          {(booking.status === 'confirmed' || booking.status === 'scheduled') && (
            <>
              <button
                onClick={() => onReschedule(booking.id)}
                className="px-3 py-1.5 rounded-btn border border-amber-200 hover:bg-amber-50 text-amber-500 text-[10px] font-extrabold uppercase cursor-pointer mr-2"
              >
                Reschedule
              </button>
              <button
                onClick={() => onNavigate(booking.id)}
                className="px-4 py-1.5 rounded-btn bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-extrabold uppercase cursor-pointer shadow-sm flex items-center gap-1"
              >
                <Navigation size={10} />
                <span>Travel GPS</span>
              </button>
            </>
          )}

          {booking.status === 'arrived' && (
            <button
              onClick={() => onStart(booking.id)}
              className="px-4 py-1.5 rounded-btn bg-primary hover:bg-primary-dark text-white text-[10px] font-extrabold uppercase cursor-pointer shadow-sm flex items-center gap-1"
            >
              <Play size={10} />
              <span>Start Service</span>
            </button>
          )}

          {booking.status === 'in_progress' && (
            <>
              <button
                onClick={() => onReportIssue(booking.id)}
                className="px-3 py-1.5 rounded-btn border border-rose-200 hover:bg-rose-50 text-rose-500 text-[10px] font-extrabold uppercase cursor-pointer mr-2"
              >
                Report Issue
              </button>
              <button
                onClick={() => onComplete(booking.id)}
                className="px-4 py-1.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold uppercase cursor-pointer shadow-sm flex items-center gap-1"
              >
                <CheckCircle size={10} />
                <span>Complete Job</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded details container */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-150 dark:border-slate-850"
          >
            <div className="p-5 bg-surface space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Service Scope</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-205">{booking.scopeDescription}</p>
                  
                  {/* Notes & Attachments */}
                  <div className="pt-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Notes & Attachments</span>
                    <p className="text-xs text-slate-500 mt-1">{booking.notes || 'No additional notes provided by customer.'}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-2 py-1 text-[9px] border border-slate-200 rounded-md bg-page text-slate-500">View Photo 1</button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Contact Customer</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-slate-205">{booking.customerPhone}</span>
                    <a
                      href={`tel:${booking.customerPhone}`}
                      className="hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-2.5 py-1 rounded-full bg-page hover:bg-primary hover:text-white text-slate-500 font-extrabold text-[10px] transition-colors"
                    >
                      Call User
                    </a>
                    <button
                      onClick={() => toast.success('Chat interface opened.') }
                      className="px-2.5 py-1 rounded-full bg-page hover:bg-primary hover:text-white text-slate-500 font-extrabold text-[10px] transition-colors cursor-pointer"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* OTP starting interface for Arrived */}
              {booking.status === 'arrived' && (
                <div className="p-4 bg-page dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                      <Play size={10} className="text-primary" />
                      <span>Start Job Verification</span>
                    </span>
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black">
                      Code: {booking.otp}
                    </span>
                  </div>
                  
                  <form onSubmit={handleStartWithOtp} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="Enter 4-digit customer OTP"
                      className="flex-1 px-3 py-2 text-xs border border-slate-250 dark:border-slate-800 rounded-xl bg-surface text-slate-800 dark:text-slate-200 outline-none focus:border-primary/50"
                    />
                    <button
                      type="submit"
                      className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase cursor-pointer"
                    >
                      Verify & Start
                    </button>
                  </form>
                  {otpError && (
                    <p className="text-[10px] text-danger font-extrabold">Invalid verification code. Please check again.</p>
                  )}
                </div>
              )}

              {/* Status details flow description */}
              <div className="pt-3 border-t border-slate-100  grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Payment State</span>
                  <span className="font-bold text-slate-750 dark:text-slate-300">
                    {booking.paymentStatus === 'secured' ? '🔒 Secured Escrow' : booking.paymentStatus === 'released' ? '✔ Released to Wallet' : 'Pending Verification'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Service Radii</span>
                  <span className="font-bold text-slate-750 dark:text-slate-300">{booking.distance} km away</span>
                </div>
                {booking.rating && (
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Given Rating</span>
                    <span className="font-black text-amber-500">★ {booking.rating} / 5</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
