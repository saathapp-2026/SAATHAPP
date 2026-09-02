import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { AdWizard } from '../components/ad-manager';

import AdHeroSection from '../components/ad-manager/landing/AdHeroSection';
import AdPlansSection from '../components/ad-manager/landing/AdPlansSection';
import AdFactorsSection from '../components/ad-manager/landing/AdFactorsSection';
import AdLocationsSection from '../components/ad-manager/landing/AdLocationsSection';
import AdWhyChooseSection from '../components/ad-manager/landing/AdWhyChooseSection';
import AdFinalCtaSection from '../components/ad-manager/landing/AdFinalCtaSection';
import { useNavigate } from 'react-router-dom';

export default function AdvertisementsPage({
  onBack,
  isAuthenticated = false,
  user = null,
  darkMode = false,
  toggleDarkMode = () => {},
  cartCount = 0
}) {
  const navigate = useNavigate();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardTypeId, setWizardTypeId] = useState('banner');

  useEffect(() => {
    document.title = 'Advertise With Us | SAATHAPP';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Advertise your business on SAATHAPP and reach thousands of local customers through premium advertising plans.';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Advertise your business on SAATHAPP and reach thousands of local customers through premium advertising plans.';
      document.head.appendChild(meta);
    }
  }, []);

  const openCreate = (typeId = 'banner') => {
    setWizardTypeId(typeId);
    setWizardOpen(true);
  };

  return (
    <div className={`min-h-screen bg-page dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <Header
        onBack={onBack}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        cartCount={cartCount}
      />
      
      <main className="flex-1 w-full bg-white dark:bg-slate-950">
        <Toaster position="top-right" />
        
        <AdHeroSection onCreateAds={() => openCreate('banner')} />
        <AdPlansSection />
        
        <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
              <AdFactorsSection />
              <div className="hidden lg:block w-px bg-slate-200" />
              <AdLocationsSection />
            </div>
          </div>
        </section>
        
        <AdWhyChooseSection />
        <AdFinalCtaSection onStart={() => openCreate('banner')} />

        <AdWizard
          open={wizardOpen}
          onClose={() => setWizardOpen(false)}
          initialTypeId={wizardTypeId}
          editItem={null}
          onSaved={(data) => {
            if (data?.status === 'submitted') {
              toast.success(`Campaign '${data.name}' submitted successfully!`) } else if (data?.status === 'running') {
              toast.success(`Campaign '${data.name}' started successfully!`) }
          }}
        />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
