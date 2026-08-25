import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { services, serviceCategories } from '../../data/services';
import { ChevronRight, Home, Star, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ServiceDetails({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
}) {
  const routerLocation = useLocation();
  const pathParts = routerLocation.pathname.split('/');
  // URL is /products/services/service/:id
  const id = pathParts[pathParts.length - 1];
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const foundService = services.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
      document.title = `${foundService.name} | SaathApp Services`;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
              <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-4">Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate('/products/services')} className="bg-primary text-white px-6 py-3 rounded-btn font-bold">Browse Services</button>
        </main>
      </div>
    );
  }

  const categoryName = serviceCategories.find(c => c.id === service.category)?.name || 'Service';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 md:pb-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products/services')} className="hover:text-primary">Services</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate(`/products/services?category=${service.category}`)} className="hover:text-primary">{categoryName}</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300">{service.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2 lg:w-5/12">
            <div className="bg-surface border border-theme-border rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative">
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-contain p-1.5" />
                ) : null}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-800">
                  {categoryName}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">{service.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-500/20">
                <Star size={16} className="fill-current" />
                <span>{service.rating} ({service.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Clock size={16} />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <MapPin size={16} />
                <span>{service.location}</span>
              </div>
            </div>

            <div className="bg-surface border border-theme-border rounded-2xl p-6 mb-8 shadow-sm">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Starts From</span>
                <span className="text-4xl font-black text-slate-900 dark:text-white">₹{service.startingPrice}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6">Price may vary depending on the exact scope of work.</p>
              
              <button 
                onClick={() => navigate(`/products/services/book/${service.id}`)}
                className="w-full md:w-auto bg-gradient-primary text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-premium hover:shadow-glow-primary transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck size={20} />
                Book Now
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-3 text-slate-900 dark:text-white">About this Service</h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-slate-900 dark:text-white">What's Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 font-medium">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                 <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-slate-900 dark:text-white">Cancellation Policy</h3>
                 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4">
                   <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                     Free cancellation up to 4 hours before the scheduled time slot. A nominal cancellation fee may apply thereafter.
                   </p>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      {/* Mobile Sticky Book Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-850 p-4 shadow-premium">
         <button 
           onClick={() => navigate(`/products/services/book/${service.id}`)}
           className="w-full bg-gradient-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-premium"
         >
           Book Now - ₹{service.startingPrice}
         </button>
      </div>
      
      <Footer />
    </div>
  );
}
