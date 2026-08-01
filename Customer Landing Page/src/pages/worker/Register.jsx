import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Mail, ArrowLeft, UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getStoredPartners, registerPartner } from '../../services/authService';

export default function WorkerRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Helper');
  const [experience, setExperience] = useState('2 Years');
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  useEffect(() => {
    document.title = 'Worker Registration | SaathApp';
  }, []);

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !phone || !email || !password) {
        setError('Please fill in all basic fields.');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!aadhaarUploaded || !photoUploaded) {
        setError('Please upload all required KYC documents to proceed.');
        return;
      }
      setError('');
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const partners = getStoredPartners();
      const res = await registerPartner(partners, {
        name,
        phone,
        email,
        password,
        category,
        experience,
        role: 'worker'
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Registration failed. An account with this email/phone might already exist.');
        setStep(1);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="absolute top-8 left-8">
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate('/become-worker'))}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer border-0 bg-transparent font-semibold"
        >
          <ArrowLeft size={16} /> {step === 2 ? 'Back to Step 1' : 'Back'}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black tracking-tight mb-2">SaathApp Worker</h2>
        <p className="text-sm text-slate-400 font-medium">Worker Registration Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-card shadow-premium space-y-6">
          
          {!success && (
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-blue-500 h-full transition-all duration-355"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          )}

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-2">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-black">Registration Submitted!</h3>
              <p className="text-sm text-slate-350 leading-relaxed font-medium">
                Your worker application has been submitted successfully. We are now auditing your uploaded documents (Aadhaar, Profile Photo).
              </p>
              <div className="p-4.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-400 font-bold flex gap-3 items-start text-left">
                <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-sm mb-1">Verification Status: Pending</div>
                  Approval generally takes between 24 to 48 hours. Once verified, your status will change and you can log in to view your bookings dashboard.
                </div>
              </div>
              <button
                onClick={() => navigate('/worker/login')}
                className="w-full rounded-btn bg-blue-650 hover:bg-blue-600 text-white py-3.5 text-sm font-extrabold shadow-lg border-0 cursor-pointer transition-all"
              >
                Go to Login
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-200">Step 1: Personal & Skills Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543202"
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.worker@example.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create security password"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Primary Skill</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                      >
                        <option value="Helper">Helper / Assistant</option>
                        <option value="Electrician">Electrician Assistant</option>
                        <option value="Plumber">Plumber Assistant</option>
                        <option value="Cleaner">Home Cleaner</option>
                        <option value="Apprentice">General Apprentice</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Work Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-btn text-white text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                      >
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-200">Step 2: Upload KYC Verification Documents</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div>
                        <div className="text-sm font-black">Aadhaar Card (Front/Back)</div>
                        <div className="text-xs text-slate-500 font-bold">PDF or Image format</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAadhaarUploaded(true)}
                        className={`rounded-btn px-4 py-2 text-xs font-extrabold border-0 cursor-pointer transition-all ${aadhaarUploaded ? 'bg-green-600 text-white' : 'bg-blue-650 hover:bg-blue-600 text-white'}`}
                      >
                        {aadhaarUploaded ? 'Uploaded ✓' : 'Upload'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div>
                        <div className="text-sm font-black">Profile Photograph</div>
                        <div className="text-xs text-slate-500 font-bold">Clear passport photo</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPhotoUploaded(true)}
                        className={`rounded-btn px-4 py-2 text-xs font-extrabold border-0 cursor-pointer transition-all ${photoUploaded ? 'bg-green-600 text-white' : 'bg-blue-650 hover:bg-blue-600 text-white'}`}
                      >
                        {photoUploaded ? 'Uploaded ✓' : 'Upload'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleNextStep}
                disabled={loading}
                className="w-full rounded-btn bg-blue-650 hover:bg-blue-600 text-white py-3.5 text-sm font-extrabold shadow-lg border-0 cursor-pointer transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Submitting...' : step === 1 ? 'Next: Upload Documents' : 'Submit Application'}
              </button>

              <div className="text-center text-xs text-slate-450 font-bold">
                Already have a worker account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/worker/login')}
                  className="text-indigo-400 hover:text-indigo-300 font-extrabold bg-transparent border-0 cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
