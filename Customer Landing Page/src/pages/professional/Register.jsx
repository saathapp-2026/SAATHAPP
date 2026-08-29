import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, User, Phone, Mail, Lock, UploadCloud, ArrowLeft,
  Info, Eye, EyeOff,
} from 'lucide-react';
import { getStoredPartners, registerPartner, savePartnerSession } from '../../services/authService';
import { useProfessionalOnboarding } from '../../context/ProfessionalOnboardingContext';
import { getStoredProfessionalOnboarding } from '../../services/professionalOnboardingService';
import {
  SERVICE_CATEGORIES,
  LOCATION_TIERS,
  VERIFICATION_DOCUMENTS,
  defaultProfessionalOnboardingData,
} from '../../config/professionalOnboardingConfig';
import { saveProfessionalOnboarding } from '../../services/professionalOnboardingService';
import TermsCheckbox from '../../components/seller/TermsCheckbox';

const PROFESSIONAL_NOTICE = (
  <>
    By registering, you agree to share government details and documents for verification checks listed in our Terms.
    Onboarding fee payment is mandatory before final submission. Payment does not guarantee approval.
    Monthly membership is optional.
  </>
);

const CATEGORY_LABELS = Object.fromEntries(SERVICE_CATEGORIES.map((c) => [c.id, c.label]));

export default function ProfessionalRegisterPage() {
  const navigate = useNavigate();
  const { data, updateSection, setPartnerId, approveApplication, saving } = useProfessionalOnboarding();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: data.accountInfo?.name || '',
    phone: data.accountInfo?.phone || '',
    email: data.accountInfo?.email || '',
    password: data.accountInfo?.password || '',
    category: data.accountInfo?.category || 'electrician',
    experience: data.accountInfo?.experience || '1-3 Years',
    entityType: data.accountInfo?.entityType || 'individual',
    staffCount: data.accountInfo?.staffCount || '1',
    equipmentLevel: data.accountInfo?.equipmentLevel || 'none',
    businessScale: data.accountInfo?.businessScale || 'solo',
  });
  const [locationData, setLocationData] = useState({
    state: data.serviceLocation?.state || '',
    city: data.serviceLocation?.city || '',
    pincode: data.serviceLocation?.pincode || '',
    locationTier: data.serviceLocation?.locationTier || 'village',
    serviceRadius: data.serviceLocation?.serviceRadius || '0-5',
    workingHours: data.serviceLocation?.workingHours || '9:00 AM - 6:00 PM',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState(() => {
    const initial = {};
    VERIFICATION_DOCUMENTS.forEach((doc) => {
      initial[doc.key] = data.documents?.[doc.key] || null;
    });
    return initial;
  });
  const [termsAccepted, setTermsAccepted] = useState(data.onboardingFee?.termsAccepted || false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Professional Registration | SaathApp';
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, docType) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [docType]: e.target.files[0].name }));
    }
  };

  const computeVerificationLevel = () => {
    const optionalUploaded = ['drivingLicense', 'tradeLicense', 'skillCertificate', 'experienceProof', 'workPhotos', 'businessRegistration', 'bankDetails']
      .filter((k) => files[k]).length;
    if (optionalUploaded >= 5) return 'premium';
    if (optionalUploaded >= 3) return 'enhanced';
    if (optionalUploaded >= 1) return 'standard';
    return 'basic';
  };

  const handleNextStep1 = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Check if we already created an account in this session
    if (data.meta?.partnerId) {
      setError('');
      updateSection('accountInfo', formData);
      setStep(2);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const partners = getStoredPartners();
      // Check if account exists
      const normalizedEmail = formData.email.trim().toLowerCase();
      const normalizedPhone = formData.phone.replace(/\D/g, '');
      const existing = partners.find((entry) => 
        (entry.email?.toLowerCase() === normalizedEmail || entry.phone?.replace(/\D/g, '') === normalizedPhone) && entry.role === 'professional'
      );

      if (existing) {
        setError('Account already exists. Please sign in to continue.');
        setLoading(false);
        return;
      }

      // Create account immediately
      const categoryLabel = CATEGORY_LABELS[formData.category] || formData.category;
      const result = await registerPartner(partners, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        category: categoryLabel,
        experience: formData.experience,
        role: 'professional',
      });

      if (result.success) {
        const partnerId = result.partner.id;
        setPartnerId(partnerId);
        updateSection('meta', { partnerId, lastVisitedStep: '/professional/register' });
        savePartnerSession(result.partner);
        window.dispatchEvent(new Event('storage'));
        updateSection('accountInfo', formData);
        setStep(2);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Failed to process registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    if (!locationData.city.trim() || !locationData.state.trim() || !locationData.pincode.trim()) {
      setError('Please fill in your service location.');
      return;
    }
    const cleanPin = locationData.pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setError('Please enter a valid 6-digit PIN code.');
      return;
    }
    setError('');
    updateSection('serviceLocation', locationData);
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Restore document validation for production
    /*
    const missingRequired = VERIFICATION_DOCUMENTS.filter((d) => d.required && !files[d.key]);
    if (missingRequired.length) {
      setError(`Please upload: ${missingRequired.map((d) => d.label).join(', ')}`);
      return;
    }
    */
    
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions.');
      return;
    }

    setLoading(true);
    setError('');
    const verificationLevel = computeVerificationLevel();
    updateSection('accountInfo', formData);
    updateSection('serviceLocation', locationData);
    updateSection('documents', { ...files, verificationLevel });
    updateSection('onboardingFee', { 
      termsAccepted,
      paymentStatus: 'pending',
      paymentId: null,
      paymentMode: null 
    });
    updateSection('meta', { lastVisitedStep: '/professional/onboarding-fee' });

    try {
      // Data is auto-saved to localstorage by Context useEffect.
      // We just need to navigate to the payment page.
      navigate('/professional/onboarding-fee');
    } catch {
      setError('Failed to proceed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ['Account & Business Profile', 'Service Location', 'KYC & Terms'];
  const progressWidth = step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full';
  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-btn py-3 px-4 text-xs font-medium text-white focus:border-indigo-500 outline-none';
  const selectClass = 'w-full bg-slate-900 border border-white/10 rounded-btn py-3 px-3 text-xs font-medium text-white focus:border-indigo-500 outline-none [&>option]:bg-slate-900 [&>option]:text-white';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white relative px-4 py-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.15),_transparent_40%)] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-950/40 backdrop-blur-xl rounded-card border border-white/10 p-8 shadow-premium text-left relative z-10">
        <button
          type="button"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate('/service-professional'))}
          className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-white mb-6 border-0 bg-transparent cursor-pointer"
        >
          <ArrowLeft size={12} /> {step > 1 ? `Back to Step ${step - 1}` : 'Back'}
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-4">Professional Registration</h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Step {step}: {stepLabels[step - 1]}</p>
          <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
            <div className={`h-full bg-indigo-500 transition-all duration-300 ${progressWidth}`} />
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Info size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
            {error.includes('Account already exists') && (
              <button type="button" onClick={() => navigate('/professional/login')} className="mt-1 w-full py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-lg border-0 cursor-pointer text-xs">
                Login / Continue with existing account
              </button>
            )}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-4">
            {[
              { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Rahul Kumar' },
              { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '9876543201' },
              { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'professional@saathapp.com' },
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">{field.label}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500"><Icon size={16} /></span>
                    <input type={field.type} name={field.name} required placeholder={field.placeholder} value={formData[field.name]} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-4 text-xs font-medium text-white focus:border-indigo-500 outline-none" />
                  </div>
                </div>
              );
            })}

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500"><Lock size={16} /></span>
                <input type={showPassword ? 'text' : 'password'} name="password" required placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-10 text-xs font-medium text-white focus:border-indigo-500 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Service Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className={selectClass}>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}{cat.group ? ` (${cat.group})` : ''}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Experience</label>
                <select name="experience" value={formData.experience} onChange={handleInputChange} className={selectClass}>
                  <option value="1-3 Years">1–3 Years</option>
                  <option value="3-5 Years">3–5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Entity Type</label>
                <select name="entityType" value={formData.entityType} onChange={handleInputChange} className={selectClass}>
                  <option value="individual">Individual</option>
                  <option value="agency">Agency</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Staff Count</label>
                <select name="staffCount" value={formData.staffCount} onChange={handleInputChange} className={selectClass}>
                  <option value="1">1</option>
                  <option value="2-5">2–5</option>
                  <option value="6-15">6–15</option>
                  <option value="16-50">16–50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Equipment</label>
                <select name="equipmentLevel" value={formData.equipmentLevel} onChange={handleInputChange} className={selectClass}>
                  <option value="none">None</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="advanced">Advanced Machinery</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Business Scale</label>
              <select name="businessScale" value={formData.businessScale} onChange={handleInputChange} className={selectClass}>
                <option value="solo">Solo</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-btn cursor-pointer border-0 mt-4 disabled:opacity-50">
              {loading ? 'Processing...' : 'Continue to Step 2 →'}
            </motion.button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">State</label>
              <input name="state" required value={locationData.state} onChange={handleLocationChange} placeholder="Delhi" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">City</label>
              <input name="city" required value={locationData.city} onChange={handleLocationChange} placeholder="New Delhi" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Pincode</label>
              <input name="pincode" required value={locationData.pincode} onChange={handleLocationChange} placeholder="110001" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Location Tier</label>
                <select name="locationTier" value={locationData.locationTier} onChange={handleLocationChange} className={selectClass}>
                  {LOCATION_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id}>{tier.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Service Radius</label>
                <select name="serviceRadius" value={locationData.serviceRadius} onChange={handleLocationChange} className={selectClass}>
                  <option value="0-5">0–5 km</option>
                  <option value="5-10">5–10 km</option>
                  <option value="10-20">10–20 km</option>
                  <option value="20+">20+ km</option>
                </select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-btn cursor-pointer border-0 mt-4">
              Continue to Step 3 →
            </motion.button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {VERIFICATION_DOCUMENTS.map((doc) => (
              <div key={doc.key} className="space-y-1.5 text-left">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  {doc.label}{doc.required ? '' : ' (Optional)'}
                </label>
                <div className={`border border-dashed ${files[doc.key] ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/15 hover:border-indigo-500/80 bg-white/5'} rounded-card p-3 transition-colors relative flex flex-col items-center justify-center text-center`}>
                  <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, doc.key)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={doc.required && !files[doc.key]} />
                  <UploadCloud size={20} className={files[doc.key] ? 'text-emerald-400 mb-1' : 'text-slate-400 mb-1'} />
                  <span className={`text-[11px] font-black ${files[doc.key] ? 'text-emerald-300' : 'text-slate-300'} block`}>
                    {files[doc.key] ? 'Uploaded' : 'Upload'}
                  </span>
                  {files[doc.key] && (
                    <span className="text-[10px] text-slate-400 mt-1 block truncate w-full max-w-[200px] px-2">{files[doc.key]}</span>
                  )}
                </div>
              </div>
            ))}

            <TermsCheckbox
              accepted={termsAccepted}
              onChange={setTermsAccepted}
              termsLink="/professional/terms"
              termsLabel="Service Professional Onboarding Terms & Conditions (all 16 clauses)"
              notice={PROFESSIONAL_NOTICE}
              accentClass="text-indigo-400"
              openInNewTab={false}
            />

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading || !termsAccepted} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-btn cursor-pointer border-0 mt-2 disabled:opacity-50">
              {loading ? 'Processing...' : 'Proceed with Payment'}
            </motion.button>
            <p className="text-[10px] text-center text-slate-500">
              View Terms opens{' '}
              <button type="button" onClick={() => navigate('/professional/terms')} className="text-indigo-400 underline bg-transparent border-0 cursor-pointer p-0 text-[10px]">
                /professional/terms
              </button>
              . Continue goes to Onboarding Fee.
            </p>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/professional/login')} className="text-indigo-400 hover:text-indigo-300 font-black border-0 bg-transparent cursor-pointer">
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}
