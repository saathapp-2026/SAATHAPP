import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircle2, Calendar, Clock, MapPin, ArrowLeft, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceBookingConfirmation({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
}) {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const booking = routerLocation.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-black mb-4 text-slate-800 dark:text-slate-100">Booking Session Expired</h1>
          <button onClick={() => navigate('/products/services')} className="bg-primary text-white px-6 py-3 rounded-btn font-bold">Return to Services</button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-surface border border-theme-border rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 p-8 text-white text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-black uppercase tracking-wider mb-2">Booking Confirmed!</h1>
            <p className="font-medium text-emerald-50">Your service has been successfully scheduled.</p>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-theme-border gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Booking ID</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{booking.id}</p>
              </div>
              <div className="md:text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Paid</p>
                <p className="text-2xl font-black text-primary">₹{booking.total}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">{booking.serviceName}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm shrink-0">
                    <Calendar size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{booking.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm shrink-0">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Time Slot</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{booking.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service Address</p>
                    <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{booking.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                <span className="font-bold block mb-1">Professional Assigned: To be assigned</span>
                We will notify you once a service professional is assigned to your booking. You can track the status in your profile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <button 
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto bg-gradient-primary text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-premium hover:shadow-glow-primary transition-all text-center"
              >
                View My Bookings
              </button>
              <button 
                onClick={() => navigate('/products/services')}
                className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Services
              </button>
            </div>

          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
