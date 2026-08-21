import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { services } from '../../data/services';
import { ChevronRight, Calendar, Clock, MapPin, ChevronLeft, CheckCircle2 } from 'lucide-react';

import { useCart } from '../../hooks/useCart';

export default function ServiceBookingFlow({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
  savedAddresses
}) {
  const routerLocation = useLocation();
  const pathParts = routerLocation.pathname.split('/');
  // URL is /products/services/book/:id
  const id = pathParts[pathParts.length - 1];
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const { handleAddToCart } = useCart();
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  
  useEffect(() => {
    const foundService = services.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
      document.title = `Book ${foundService.name} | SaathApp Services`;
      // Generate some dates
      const dates = [];
      const today = new Date();
      for(let i=0; i<7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
          val: d.toISOString().split('T')[0],
          display: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
      setAvailableDates(dates);
      setSelectedDate(dates[0].val);
    } else {
      navigate('/products/services');
    }
  }, [id, navigate]);

  const [availableDates, setAvailableDates] = useState([]);

  if (!service) return null;

  const handleNext = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2 && selectedAddress) {
      setStep(3);
    } else if (step === 3) {
      // Add to global cart instead of direct booking
      const serviceCartItem = {
        id: `service_${service.id}_${Date.now()}`,
        type: 'service',
        serviceId: service.id,
        name: service.name,
        image: service.image,
        category: 'services',
        price: service.startingPrice + 20, // Including convenience fee
        originalPrice: service.startingPrice + 20,
        discount: 0,
        quantity: 1,
        
        serviceDate: selectedDate,
        serviceTime: selectedTime,
        address: selectedAddress,
        instructions: instructions,
        
        provider: 'To be assigned',
        duration: 'Standard',
        availability: 'Available'
      };
      
      handleAddToCart(serviceCartItem, 1);
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-10">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => step === 1 ? navigate(`/products/services/service/${service.id}`) : setStep(step - 1)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white">Book Service</h1>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300`} style={{ width: step === 1 ? '15%' : step === 2 ? '50%' : '100%' }}></div>
          
          {[1, 2, 3].map((s) => (
             <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
               {s < step ? <CheckCircle2 size={16} /> : s}
             </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1 bg-surface border border-theme-border rounded-2xl shadow-sm p-6">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" /> Select Date
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {availableDates.map(d => (
                      <button 
                        key={d.val}
                        onClick={() => setSelectedDate(d.val)}
                        className={`min-w-[100px] p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedDate === d.val ? 'bg-primary/10 border-primary text-primary' : 'border-theme-border text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider mb-1">{d.display.split(',')[0]}</span>
                        <span className="text-lg font-black">{d.val.split('-')[2]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-primary" /> Select Time Slot
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {service.availableSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl border text-sm font-bold transition-all text-center ${selectedTime === time ? 'bg-primary/10 border-primary text-primary' : 'border-theme-border text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> Service Address
                </h3>
                
                {(!savedAddresses || savedAddresses.length === 0) ? (
                  <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 text-amber-800 dark:text-amber-500 text-sm font-medium">
                    You have no saved addresses. Please select a dummy address to proceed.
                    <button onClick={() => setSelectedAddress('123, Green Park, New Delhi - 110016')} className="block mt-3 px-4 py-2 bg-amber-500 text-white rounded-btn font-bold">Use Default Address</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedAddresses.map(addr => (
                      <div 
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.fullAddress)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedAddress === addr.fullAddress ? 'border-primary bg-primary/5 shadow-sm' : 'border-theme-border hover:border-slate-400 dark:hover:border-slate-600'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{addr.addressType}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">{addr.fullAddress}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Additional Instructions (Optional)</h4>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="E.g. Call before arriving, or ring the bell twice."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-24"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white border-b border-theme-border pb-3">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                       {service.image ? <img src={service.image} alt="" className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-2xl">🛠️</div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{service.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Date: <span className="text-slate-700 dark:text-slate-300">{selectedDate}</span></p>
                      <p className="text-xs text-slate-500 font-medium">Time: <span className="text-slate-700 dark:text-slate-300">{selectedTime}</span></p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Address</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedAddress}</p>
                    {instructions && (
                      <p className="text-xs text-slate-500 mt-2 bg-slate-200 dark:bg-slate-800 p-2 rounded">Note: {instructions}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Price Summary Sidebar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-surface border border-theme-border rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-theme-border pb-3">Payment Details</h3>
              
              <div className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex justify-between">
                  <span>{service.name} Fee</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹{service.startingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹20</span>
                </div>
                <div className="border-t border-theme-border my-2"></div>
                <div className="flex justify-between text-base">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                  <span className="font-black text-primary">₹{service.startingPrice + 20}</span>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={(step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && !selectedAddress)}
                className="w-full bg-gradient-primary text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-premium hover:shadow-glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 3 ? 'Confirm Booking' : 'Continue'}
              </button>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
