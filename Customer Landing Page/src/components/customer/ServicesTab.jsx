import React, { useState } from 'react';
import { Search, Wrench, ArrowRight } from 'lucide-react';

export default function ServicesTab({ bookings, setBookings, walletBalance, setWalletBalance, transactions, setTransactions, orders, setOrders, setActiveTab }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Booking Form State
  const [showBookingFormModal, setShowBookingFormModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00 AM - 11:00 AM');
  const [bookingDesc, setBookingDesc] = useState('');

  const servicesList = [
    { id: 'srv-1', category: 'Electrician', name: 'Fan Installation & Repair', price: 299, rating: 4.8, description: 'Fixing or installing ceiling, exhaust or wall fans.' },
    { id: 'srv-2', category: 'Electrician', name: 'House Wiring Checkup', price: 999, rating: 4.9, description: 'Complete electrical safety checkup of your house wiring.' },
    { id: 'srv-3', category: 'Plumber', name: 'Water Tap Leaking Fix', price: 199, rating: 4.7, description: 'Quick fix for leaking water taps and mixers.' },
    { id: 'srv-4', category: 'Plumber', name: 'Drainage Pipe Unclogging', price: 399, rating: 4.6, description: 'Unclogging kitchen, bathroom or toilet drains.' },
    { id: 'srv-5', category: 'Carpenter', name: 'Door & Lock Installation', price: 499, rating: 4.8, description: 'Fitting new locks, latch mechanisms or doors.' },
    { id: 'srv-6', category: 'Carpenter', name: 'Furniture Assembly', price: 799, rating: 4.5, description: 'Assembly of tables, beds, wardrobes, and drawers.' }
  ];

  const handleConfirmBooking = () => {
    if (!bookingDate) {
      alert('Please select a preferred date.');
      return;
    }

    const newBooking = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService.name,
      date: new Date(bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: bookingTime,
      status: 'Scheduled',
      provider: 'Assigned Partner',
      price: selectedService.price
    };

    const currentBookings = JSON.parse(localStorage.getItem('saath_bookings') || '[]');
    const updated = [newBooking, ...currentBookings];
    localStorage.setItem('saath_bookings', JSON.stringify(updated));
    setBookings(updated);

    // Save a notification
    const currentNotifs = JSON.parse(localStorage.getItem('saath_notifications') || '[]');
    const newNotif = {
      id: Date.now(),
      title: 'Booking Confirmed!',
      message: `Your booking for ${selectedService.name} is scheduled on ${newBooking.date}.`,
      time: 'Just now',
      read: false
    };
    localStorage.setItem('saath_notifications', JSON.stringify([newNotif, ...currentNotifs]));

    setShowBookingFormModal(false);
    alert(`Booking confirmed! You can track it under Bookings.`);
    setActiveTab('bookings');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Book Services</h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Choose from our verified local expert technicians.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search electrician, plumber..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none dark:bg-slate-950 font-semibold"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Electrician', 'Plumber', 'Carpenter'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-all ${
              filter === cat
                ? 'bg-[#6C3BFF] text-white border-[#6C3BFF]'
                : 'bg-slate-50 dark:bg-slate-955/20 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-350'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesList
          .filter(s => filter === 'All' || s.category === filter)
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
          .map((srv) => (
            <div key={srv.id} className="p-5 bg-slate-50/50 dark:bg-slate-955/10 rounded-2xl border border-slate-205 dark:border-slate-800/80 flex flex-col justify-between gap-4 text-left">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-355">{srv.category}</span>
                  <span className="flex items-center gap-0.5 text-xs font-black text-amber-500">★ {srv.rating}</span>
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight">{srv.name}</h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed line-clamp-2">{srv.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Starting from</span>
                  <span className="text-base font-black text-slate-850 dark:text-white mt-1 inline-block">₹{srv.price}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(srv);
                    setBookingDate(new Date(Date.now() + 86400000).toISOString().split('T')[0]); // Tomorrow
                    setBookingDesc('');
                    setShowBookingFormModal(true);
                  }}
                  className="px-4.5 py-2 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Booking Form Modal Overlay */}
      {showBookingFormModal && selectedService && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium space-y-4 text-left">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">Book Service Details</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">{selectedService.name} • ₹{selectedService.price}</p>
            </div>

            <div className="space-y-3.5 text-xs font-semibold">
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-slate-400 text-[10px]">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none dark:bg-slate-950 font-bold text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-slate-400 text-[10px]">Preferred Time Slot</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none dark:bg-slate-950 font-bold text-slate-800 dark:text-white"
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-slate-400 text-[10px]">Problem Description</label>
                <textarea
                  value={bookingDesc}
                  onChange={(e) => setBookingDesc(e.target.value)}
                  placeholder="Explain your requirements (e.g. fan is making noise)"
                  rows="3"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none dark:bg-slate-955 text-slate-800 dark:text-white font-medium"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2 text-xs">
              <button
                type="button"
                onClick={() => setShowBookingFormModal(false)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
