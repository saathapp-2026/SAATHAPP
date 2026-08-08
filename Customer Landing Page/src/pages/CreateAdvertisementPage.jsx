import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { emptyAdDraft, saveAdDraft, loadAdDraft, estimateReach } from '../services/advertisementsService';

// We will build these modular components next
import WizardHeader from '../components/ad-manager/wizard/WizardHeader';
import WizardProgressBar from '../components/ad-manager/wizard/WizardProgressBar';
import AdSelectionSection from '../components/ad-manager/wizard/AdSelectionSection';
import CampaignDetailsSection from '../components/ad-manager/wizard/CampaignDetailsSection';
import UploadSection from '../components/ad-manager/wizard/UploadSection';
import PlacementDurationSection from '../components/ad-manager/wizard/PlacementDurationSection';
import SummarySidebar from '../components/ad-manager/wizard/SummarySidebar';

export default function CreateAdvertisementPage({ user }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState(() => {
    // const existing = loadAdDraft();
    // if (existing && Object.keys(existing).length > 2) return existing;

    const today = new Date();
    const next15 = new Date();
    next15.setDate(today.getDate() + 15);

    return {
      ...emptyAdDraft('homepage_banner'),
      typeId: 'homepage_banner',
      name: 'Diwali Mega Sale 2026',
      objective: 'Brand Awareness',
      startDate: today.toISOString().split('T')[0],
      endDate: next15.toISOString().split('T')[0],
      locationType: 'city',
      targetCities: ['Patna', 'Nalanda', 'Biharsharif'],
      locations: ['Patna'],
      audienceGender: 'All',
      audienceAge: 'All',
      audienceLanguage: 'All Languages',
      customerTypes: ['new', 'returning'],
      placements: ['homepage_banner', 'search_top', 'category'],
      duration: 15,
      adLink: 'https://saathapp.in/store/my-shop',
      description: 'Get up to 50% off on all electronics this festive season!'
    };
  });

  // Calculate dynamic fields
  const reach = estimateReach(draft.dailyBudget || 100);

  // Sync draft changes to local storage to prevent data loss
  useEffect(() => {
    saveAdDraft(draft);
  }, [draft]);

  const updateDraft = (updates) => {
    setDraft(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // Validation for Step 1 -> Step 2
    if (currentStep === 1) {
      if (!draft.name?.trim()) {
        toast.error('Campaign Name is required');
        return;
      }
      if (!draft.startDate || !draft.endDate) {
        toast.error('Start and End dates are required');
        return;
      }
      if (!draft.typeId) {
        toast.error('Please select an advertisement type');
        return;
      }
      if (!draft.locations || draft.locations.length === 0) {
        toast.error('Please select at least one target location');
        return;
      }
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    saveAdDraft(draft);
    toast.success('Draft saved successfully');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Toaster position="top-right" />
      <WizardHeader user={user} onBack={() => navigate('/advertise')} />
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <WizardProgressBar currentStep={currentStep} />
        
        {currentStep === 1 && (
          <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column - Form */}
            <div className="flex-1 w-full space-y-8 pb-20">
              <AdSelectionSection draft={draft} updateDraft={updateDraft} />
              <CampaignDetailsSection draft={draft} updateDraft={updateDraft} />
              <UploadSection draft={draft} updateDraft={updateDraft} />
              <PlacementDurationSection draft={draft} updateDraft={updateDraft} />
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button 
                  onClick={() => navigate('/advertise')}
                  className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={handleSaveDraft}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors bg-white shadow-sm"
                  >
                    Save Draft
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#15803D] hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2"
                  >
                    Save and Continue &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-[400px] shrink-0 sticky top-24 space-y-6">
              <SummarySidebar draft={draft} reach={reach} />
            </div>

          </div>
        )}

        {currentStep === 2 && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Dummy Plan Cards */}
              {[
                { name: 'Basic', price: '₹999', desc: 'Good for getting started' },
                { name: 'Standard', price: '₹2,999', desc: 'Most popular choice', recommended: true },
                { name: 'Premium', price: '₹4,999', desc: 'Maximum visibility' }
              ].map((plan) => (
                <div key={plan.name} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${plan.recommended ? 'border-[#15803D] bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  {plan.recommended && <span className="bg-[#15803D] text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">Recommended</span>}
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-3xl font-black text-slate-900 my-4">{plan.price}</p>
                  <p className="text-sm text-slate-500">{plan.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-6">
              <button onClick={() => setCurrentStep(1)} className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Back</button>
              <button onClick={() => setCurrentStep(3)} className="px-8 py-3 bg-[#15803D] text-white font-bold rounded-lg hover:bg-emerald-700">Continue to Preview</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ad Preview</h2>
            <div className="bg-slate-100 h-64 rounded-xl border border-slate-200 flex items-center justify-center mb-8">
              <p className="text-slate-500 font-medium">This is a mockup of how your ad will appear to customers.</p>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-6">
              <button onClick={() => setCurrentStep(2)} className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Back</button>
              <button onClick={() => setCurrentStep(4)} className="px-8 py-3 bg-[#15803D] text-white font-bold rounded-lg hover:bg-emerald-700">Proceed to Payment</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 max-w-md">
              <p className="text-sm text-slate-500 mb-2">Total Amount to Pay</p>
              <p className="text-4xl font-black text-[#15803D] mb-6">₹2,999</p>
              <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg flex justify-center items-center gap-2">
                Pay Securely
              </button>
              <p className="text-xs text-center text-slate-400 mt-4">100% Secure Payment via Razorpay</p>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-6">
              <button onClick={() => setCurrentStep(3)} className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Back</button>
              <button onClick={() => setCurrentStep(5)} className="px-8 py-3 bg-[#15803D] text-white font-bold rounded-lg hover:bg-emerald-700">Simulate Success</button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="mt-8 bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Advertisement submitted successfully!</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Your advertisement request has been received. Our team will review it shortly.</p>
            <button onClick={() => navigate('/advertise')} className="px-8 py-3 bg-[#15803D] text-white font-bold rounded-lg hover:bg-emerald-700">
              Back to Advertise With Us
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
