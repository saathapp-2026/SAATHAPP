import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, MapPin, Calendar, Clock, Phone, Navigation, Play, CheckCircle2, ChevronDown, ChevronUp, Check, AlertCircle, Upload, FileText, Camera, RefreshCw
} from 'lucide-react';

export default function JobsCard({
  job,
  mode = 'assigned', // 'assigned', 'today', 'live', 'history'
  onAccept,
  onReject,
  onNavigate,
  onStart,
  onComplete,
  onSelectLiveJob,
  onViewDetails
}) {
  const [expanded, setExpanded] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  
  // Live job step state trackers
  const [liveStep, setLiveStep] = useState(1); // 1: Navigation/Travel, 2: OTP Verification, 3: Work in Progress (Photos), 4: Complete
  const [uploadedPhotos, setUploadedPhotos] = useState({
    before: null,
    during: null,
    after: null
  });
  const [photoUploading, setPhotoUploading] = useState({
    before: false,
    during: false,
    after: false
  });
  const [workerNotes, setWorkerNotes] = useState('');

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': return 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-500 border-rose-200/50';
      case 'medium': return 'bg-amber-50 text-amber-600 dark:bg-amber-955/20 dark:text-amber-500 border-amber-200/50';
      default: return 'bg-blue-50 text-blue-600 dark:bg-blue-955/20 dark:text-blue-500 border-blue-200/50';
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === job.otp) {
      setOtpError(false);
      setLiveStep(3); // Go to photo uploads phase
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  const handleSimulatePhotoUpload = (slot) => {
    setPhotoUploading(prev => ({ ...prev, [slot]: true }));
    setTimeout(() => {
      setUploadedPhotos(prev => ({ 
        ...prev, 
        [slot]: slot === 'before' 
          ? 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=100&h=100&q=80' 
          : slot === 'during'
            ? 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=100&h=100&q=80'
            : 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&h=100&q=80'
      }));
      setPhotoUploading(prev => ({ ...prev, [slot]: false }));
    }, 1500);
  };

  return (
    <motion.div
      layout
      className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card shadow-soft hover:shadow-premium text-left overflow-hidden transition-all"
    >
      
      {/* 1. ASSIGNED JOBS MODE */}
      {mode === 'assigned' && (
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-[9px] font-black border px-2.5 py-0.5 rounded-full ${getPriorityStyle(job.priority)} uppercase`}>
              {job.priority} Priority
            </span>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500">Assigned by: {job.assignedBy}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 border border-slate-100 dark:border-slate-800">
              <User size={16} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{job.customerName}</h4>
              <p className="text-xs text-primary font-bold">{job.serviceName}</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-slate-400 flex-shrink-0" />
              <span className="truncate">{job.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                <span>{job.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} className="text-slate-400" />
                <span>{job.time}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase leading-none">
              Incentive Share: <span className="text-slate-750 dark:text-slate-200 font-black">₹{job.incentive}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewDetails?.(job)}
                className="px-3.5 py-1.5 rounded-btn border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-extrabold uppercase cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => onReject(job.id)}
                className="px-3.5 py-1.5 rounded-btn border border-rose-200 hover:bg-rose-50 text-rose-500 text-[10px] font-extrabold uppercase cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => onAccept(job.id)}
                className="px-4 py-1.5 rounded-btn bg-primary hover:bg-primary-dark text-white text-[10px] font-extrabold uppercase cursor-pointer shadow-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TODAY'S JOBS TIMELINE LIST MODE */}
      {mode === 'today' && (
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black uppercase">
                {job.time}
              </span>
              <span className={`text-[9px] font-black border px-2.5 py-0.5 rounded-full uppercase ${getPriorityStyle(job.priority)}`}>
                {job.priority} Priority
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500">
                <User size={14} />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">{job.customerName}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">{job.serviceName}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 max-w-[250px] sm:max-w-xs truncate">
              <MapPin size={11} className="flex-shrink-0" />
              <span className="truncate">{job.address}</span>
            </div>
          </div>

          {/* Quick timeline interactions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase sm:text-right">
              Incentive: <span className="text-slate-800 dark:text-white font-black">₹{job.incentive}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${job.customerPhone}`}
                className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-xl text-slate-500"
              >
                <Phone size={14} />
              </a>
              <button
                type="button"
                onClick={() => alert(`Navigating to ${job.address}`)}
                className="p-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/50 hover:bg-blue-100 rounded-xl text-blue-600"
              >
                <Navigation size={14} />
              </button>
              <button
                onClick={() => onSelectLiveJob(job)}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <Play size={12} className="fill-white" />
                <span>Start Job</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE ACTIVE WORKFLOW TRACKER MODE */}
      {mode === 'live' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-primary block leading-none">Job Active execution</span>
              <h3 className="text-base sm:text-lg font-black text-slate-855 dark:text-white mt-1.5">{job.serviceName}</h3>
            </div>
            
            <a
              href={`tel:${job.customerPhone}`}
              className="w-full sm:w-auto px-4 py-2 rounded-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-655 dark:text-slate-300 font-extrabold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Phone size={14} className="text-slate-400" />
              <span>Call customer</span>
            </a>
          </div>

          {/* Execution steps timeline indicators */}
          <div className="grid grid-cols-4 gap-2 relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100 dark:bg-slate-800 pointer-events-none z-0" />
            
            {[
              { step: 1, label: 'GPS Travel' },
              { step: 2, label: 'Verify OTP' },
              { step: 3, label: 'Upload Photos' },
              { step: 4, label: 'Completion' }
            ].map((st) => (
              <div key={st.step} className="flex flex-col items-center text-center relative z-10 space-y-1.5">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-colors ${
                  liveStep >= st.step 
                    ? 'bg-primary border-primary text-white shadow' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  {st.step}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider ${
                  liveStep >= st.step ? 'text-primary' : 'text-slate-400'
                }`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>

          {/* DYNAMIC STEPS WORKSPACE PANEL */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/40 rounded-card border border-slate-200/60 dark:border-slate-800/80 text-left">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Travel & Location Navigation */}
              {liveStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Step 1: Travel to Customer</h4>
                    <p className="text-xs text-slate-500 mt-1">Navigate to the customer location. Use the map coordinate routing below.</p>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-655 space-y-1.5">
                    <p className="font-black text-slate-800 dark:text-slate-200">Customer Address</p>
                    <p className="text-slate-500 dark:text-slate-400">{job.address}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => alert('GPS Travel map routed.')}
                      className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Navigation size={13} />
                      <span>Start GPS Map</span>
                    </button>
                    <button
                      onClick={() => setLiveStep(2)}
                      className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 size={13} />
                      <span>Mark: Reached Location</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: OTP Entry Verification */}
              {liveStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Step 2: Enter Start OTP</h4>
                    <p className="text-xs text-slate-500 mt-1">Request the 4-digit verification code from the customer to launch the job task.</p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 4-digit code"
                      className="flex-1 px-3.5 py-2.5 border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:border-primary/50 font-bold"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase cursor-pointer"
                    >
                      Verify & Start Work
                    </button>
                  </form>
                  {otpError && (
                    <p className="text-[10px] text-danger font-extrabold">Invalid OTP. Verification failed.</p>
                  )}
                  
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-955/20 text-amber-600 border border-amber-200/50 rounded-xl text-[10px] font-bold flex items-center gap-1">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    <span>Demo check: Customer code is <strong>{job.otp}</strong></span>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Photos Upload & Progress Notes */}
              {liveStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Step 3: Upload Work Photos</h4>
                    <p className="text-xs text-slate-500 mt-1">Upload pictures before, during, and after completing the service wiring task.</p>
                  </div>

                  {/* Photo upload grids */}
                  <div className="grid grid-cols-3 gap-4">
                    {['before', 'during', 'after'].map((slot) => {
                      const img = uploadedPhotos[slot];
                      const isUploading = photoUploading[slot];
                      
                      return (
                        <div key={slot} className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-slate-400 block">{slot} Work</span>
                          <button
                            type="button"
                            onClick={() => handleSimulatePhotoUpload(slot)}
                            className="w-full h-24 border border-dashed border-slate-350 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                          >
                            {img ? (
                              <img src={img} alt={slot} className="w-full h-full object-cover" />
                            ) : isUploading ? (
                              <RefreshCw className="animate-spin text-primary" size={16} />
                            ) : (
                              <>
                                <Camera className="text-slate-400 group-hover:text-primary transition-colors" size={16} />
                                <span className="text-[8px] font-bold text-slate-400 mt-1">Upload</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="field-label">Worker Comments / Notes</label>
                    <textarea
                      rows={2}
                      value={workerNotes}
                      onChange={(e) => setWorkerNotes(e.target.value)}
                      placeholder="e.g. Cleaned power sockets and replaced burnt phase wire."
                      className="w-full p-3 text-xs border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:border-primary/50"
                    />
                  </div>

                  <button
                    onClick={() => {
                      // Require at least one photo (e.g. before/after)
                      if (!uploadedPhotos.before || !uploadedPhotos.after) {
                        alert('Please upload both Before and After work photos.');
                        return;
                      }
                      setLiveStep(4);
                    }}
                    className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 size={13} />
                    <span>Proceed to Closeout</span>
                  </button>
                </motion.div>
              )}

              {/* Step 4: Closeout and Completion */}
              {liveStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-center py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-250/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-855 dark:text-white uppercase tracking-wider">Job Verified & Ready to Close</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">All required photos and coordinates have been approved. Submit to release payouts.</p>
                  </div>

                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      onClick={() => setLiveStep(3)}
                      className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-extrabold uppercase cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => onComplete(job.id, workerNotes)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase cursor-pointer shadow-sm"
                    >
                      Submit & Complete Job
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 4. COMPLETED HISTORY TABLE MODE */}
      {mode === 'history' && (
        <div className="p-5">
          {/* History Item structure */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-655 dark:text-slate-400">
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">{job.customerName}</h4>
              <p className="text-[11px] text-slate-400 leading-none">{job.date}</p>
            </div>
            <div className="text-right">
              <span className="font-black text-slate-800 dark:text-white block">₹{job.incentive}</span>
              <span className="text-[9px] text-emerald-600 font-extrabold uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Settled</span>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}
