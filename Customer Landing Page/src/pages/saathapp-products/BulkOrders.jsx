import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ChevronRight, Home, Upload, CheckCircle2 } from 'lucide-react';
import { mockSaathAppProducts } from '../../data/saathAppProducts';

export default function BulkOrders({
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
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    document.title = "Corporate & Bulk Orders | SaathApp Official";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <Header cartCount={cartCount} onCartClick={onCartClick} location={location} onLocationClick={onLocationClick} onSearch={onSearch} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-black mb-4">Quote Request Received</h1>
          <p className="text-slate-500 mb-8 max-w-md">Thank you for your interest in SaathApp corporate products. Our B2B team will review your request and get back to you with a custom quote within 24 hours.</p>
          <button onClick={() => navigate('/products/saathapp')} className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-bold shadow-glow-primary hover:scale-105 transition-transform">
            Return to Store
          </button>
        </main>
        <Footer />
      </div>
    );
  }

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
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products/saathapp')} className="hover:text-primary">SaathApp Products</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300">Bulk & Corporate Orders</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Corporate & Bulk Orders</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Need customized merchandise for your team, events, or corporate gifting? 
            Fill out the form below and get a specialized quote with volume discounts.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                <input required type="text" placeholder="John Doe" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Name *</label>
                <input required type="text" placeholder="Acme Corp" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                <input required type="email" placeholder="john@company.com" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                <input required type="tel" placeholder="+91 98765 43210" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Select Product *</label>
                <select required className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                  <option value="">Select a product...</option>
                  {mockSaathAppProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                  <option value="other">Other / Mixed Bundle</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Quantity Needed *</label>
                <select required className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                  <option value="">Select quantity range...</option>
                  <option value="50-100">50 - 100</option>
                  <option value="101-500">101 - 500</option>
                  <option value="501-1000">501 - 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Customization Requirements</label>
              <textarea 
                rows="4" 
                placeholder="E.g., We need 500 T-Shirts with our company logo on the front and event name on the back. Mixed sizes (S-XXL)."
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Logo / Artwork (Optional)</label>
              <div className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                <Upload size={24} className="mb-2" />
                <span className="text-sm font-semibold">Click to upload file</span>
                <span className="text-xs mt-1 opacity-70">PNG, JPG, PDF (Max 5MB)</span>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full md:w-auto px-10 h-14 bg-gradient-primary hover:bg-gradient-primary/90 text-white rounded-xl font-black text-lg shadow-glow-primary transition-all transform active:scale-[0.98]">
                Request a Quote
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
