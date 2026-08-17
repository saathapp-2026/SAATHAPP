import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { services, serviceCategories } from '../../data/services';
import { ChevronRight, Home, Star, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceListing({
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
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(routerLocation.search);
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category.includes(selectedCategory));

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
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300">Services</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-surface border border-theme-border rounded-xl shadow-sm p-5 sticky top-24">
              <h2 className="text-sm font-black uppercase tracking-wider mb-4 pb-4 border-b border-theme-border">Service Categories</h2>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${selectedCategory === 'all' ? 'bg-primary/10 text-primary' : 'text-theme-secondary hover:bg-page'}`}
                >
                  All Services
                </button>
                {serviceCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${selectedCategory === cat.id ? 'bg-primary/10 text-primary' : 'text-theme-secondary hover:bg-page'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Listing */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black uppercase tracking-wider">
                {selectedCategory === 'all' ? 'All Services' : serviceCategories.find(c => c.id === selectedCategory)?.name || 'Services'}
              </h1>
              <span className="text-sm font-bold text-slate-500">{filteredServices.length} Services available</span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-surface border border-theme-border rounded-2xl h-80"></div>
                ))}
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={service.id} 
                    className="bg-surface border border-theme-border rounded-2xl shadow-sm overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col group cursor-pointer"
                    onClick={() => navigate(`/services/${service.id}`)}
                  >
                    <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                       {service.image ? (
                          <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       ) : (
                          <div className="text-4xl">🛠️</div>
                       )}
                       <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm">
                         {serviceCategories.find(c => c.id === service.category)?.name}
                       </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-black text-lg leading-tight line-clamp-2 text-slate-900 dark:text-white">{service.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star size={14} className="fill-current" /> {service.rating}
                        </span>
                        <span>•</span>
                        <span>{service.reviewCount} reviews</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4">
                        <Clock size={14} />
                        <span>{service.duration}</span>
                        <span className="mx-1">•</span>
                        <MapPin size={14} />
                        <span className="truncate">{service.location}</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-theme-border flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Starts From</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white">₹{service.startingPrice}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/services/${service.id}`); }}
                          className="bg-primary text-white px-4 py-2 rounded-btn font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface border border-theme-border rounded-2xl">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-black mb-2">No Services Found</h3>
                <p className="text-slate-500 font-medium">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
