import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Phone, Mail, Lock, UploadCloud, ArrowLeft, CheckCircle2, Info, Eye, EyeOff } from 'lucide-react';
import { getStoredPartners, registerPartner, updatePartnerStatus, savePartnerSession } from '../../services/authService';

export default function WorkerRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: KYC, 3: Verification Audit
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    category: 'Helper',
    experience: '1-3 Years',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState({
    aadhaar: null,
    photo: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredPartnerId, setRegisteredPartnerId] = useState(null);

  useEffect(() => {
    document.title = 'Worker Registration | SaathApp';
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, docType) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [docType]: e.target.files[0].name }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.aadhaar || !files.photo) {
      setError('Please upload all required KYC documents.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const partners = getStoredPartners();
      const result = await registerPartner(partners, {
        ...formData,
        role: 'worker',
      });

      if (result.success) {
        setRegisteredPartnerId(result.partner.id);
        setStep(3);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantApprove = () => {
    if (!registeredPartnerId) return;
    const partners = getStoredPartners();
    const updated = updatePartnerStatus(partners, registeredPartnerId, 'approved');
    const partner = updated.find((p) => p.id === registeredPartnerId);
    if (partner) {
      savePartnerSession(partner);
      window.dispatchEvent(new Event('storage'));
      navigate('/worker/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white relative px-4 py-8 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.15),_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(139,92,246,0.1),_transparent_40%)] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-950/40 backdrop-blur-xl rounded-card border border-white/10 p-8 shadow-premium text-left relative z-10">
        
        {step < 3 && (
          <button
            onClick={() => step === 2 ? setStep(1) : navigate('/')}
            className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-white mb-6 border-0 bg-transparent cursor-pointer"
          >
            <ArrowLeft size={12} /> {step === 2 ? 'Back to Step 1' : 'Back'}
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-4">Worker Registration</h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {step === 1 && 'Step 1: Account Information'}
            {step === 2 && 'Step 2: Upload KYC Verification'}
            {step === 3 && 'Step 3: Verification Process'}
          </p>
          {step < 3 && (
            <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
              <div className={`h-full bg-blue-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
            </div>
          )}
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-medium flex items-center gap-2">
            <Info size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: INFO FORM */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Amit Singh"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-4 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="9876543202"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-4 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="worker@saathapp.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-4 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-10 pr-10 text-xs font-medium text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white border-0 bg-transparent cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Skills / Role</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-white/10 rounded-btn py-3 px-3 text-xs font-medium text-white focus:border-blue-500 outline-none transition-all"
                >
                  <option value="Helper">Helper</option>
                  <option value="Electrician Apprentice">Electrician Apprentice</option>
                  <option value="Plumbing Assistant">Plumbing Assistant</option>
                  <option value="Construction Worker">Construction Worker</option>
                  <option value="Delivery Partner">Delivery Partner</option>
                  <option value="Painter Assistant">Painter Assistant</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-white/10 rounded-btn py-3 px-3 text-xs font-medium text-white focus:border-blue-500 outline-none transition-all"
                >
                  <option value="Under 1 Year">Under 1 Year</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3+ Years">3+ Years</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer border-0 mt-4 shadow-md"
            >
              Continue to Step 2 →
            </motion.button>
          </form>
        )}

        {/* STEP 2: KYC DOCUMENT UPLOAD */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Aadhaar */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">Aadhaar Card Front / Back Scan</label>
              <div className="border border-dashed border-white/15 rounded-card p-4 hover:border-blue-500/80 bg-white/5 transition-colors relative flex flex-col items-center justify-center text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'aadhaar')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud size={24} className="text-slate-400 mb-1.5" />
                <span className="text-[11px] font-black text-slate-300 block">
                  {files.aadhaar ? files.aadhaar : 'Upload Aadhaar Scan'}
                </span>
                <span className="text-[9px] text-slate-500 font-medium">JPEG, PNG up to 5MB</span>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">Profile Passport Photo</label>
              <div className="border border-dashed border-white/15 rounded-card p-4 hover:border-blue-500/80 bg-white/5 transition-colors relative flex flex-col items-center justify-center text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'photo')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud size={24} className="text-slate-400 mb-1.5" />
                <span className="text-[11px] font-black text-slate-300 block">
                  {files.photo ? files.photo : 'Upload Passport Photo'}
                </span>
                <span className="text-[9px] text-slate-500 font-medium">JPEG, PNG up to 2MB</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer border-0 mt-4 shadow-md"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </motion.button>
          </form>
        )}

        {/* STEP 3: SIMULATED AUDIT PANEL */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
              <Info size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-200">KYC Verification in Progress</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Thank you! Your profile details and documentation have been queued. Our admin panel audits and approves worker files within 24 hours.
              </p>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-card p-4 text-left space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 block tracking-widest">Application Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="text-xs font-black">Verification Auditing</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-normal">
                An SMS notification containing credentials will be dispatched to +91 {formData.phone} upon approval.
              </span>
            </div>

            <div className="space-y-3 pt-4">
              <div className="w-full py-3 bg-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider rounded-btn border border-slate-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} /> Application Pending Review
              </div>

              <button
                onClick={() => navigate('/worker/login')}
                className="w-full py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-slate-300 font-black text-xs uppercase tracking-wider rounded-btn transition-colors cursor-pointer"
              >
                Go to Worker Login
              </button>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/worker/login')}
              className="text-blue-400 hover:text-blue-300 font-black border-0 bg-transparent cursor-pointer"
            >
              Login Here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
