import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Smartphone, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Login({ onLogin, onSignup, onBack, error }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [localError, setLocalError] = useState(error || '');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 10) {
      setLocalError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLocalError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, 800); // Simulate network request
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setLocalError('Please enter the complete 6-digit OTP.');
      return;
    }
    setLocalError('');
    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      onLogin({ identifier: phone, password: otpString, mode: 'phone' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Centered Auth Card matching Zepto/Blinkit minimalism */}
      <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 rounded-[24px] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {step === 1 ? (
            <>
              {/* Step 1: Phone Number */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#6C3BFF]/10 flex items-center justify-center text-[#6C3BFF]">
                  <Smartphone size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Welcome to SaathApp</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Login or Signup to continue</p>
                </div>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-[#6C3BFF] dark:focus-within:border-[#6C3BFF] bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors">
                    <span className="px-4 py-3.5 text-slate-500 dark:text-slate-400 font-bold border-r-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">+91</span>
                    <input
                      type="tel"
                      autoFocus
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent outline-none px-4 py-3.5 font-bold text-slate-900 dark:text-white tracking-wider placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      placeholder="9999999999"
                    />
                  </div>
                  {localError && <p className="text-xs font-bold text-rose-500 mt-2">{localError}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={phone.length < 10}
                  className="w-full bg-[#6C3BFF] hover:bg-[#582cd6] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-wider"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </form>

              <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-6 text-center">
                <p className="text-[10px] text-slate-400 font-semibold max-w-[250px]">
                  By continuing, you agree to our Terms of Service & Privacy Policy
                </p>
                <button onClick={onSignup} className="text-xs font-black text-[#6C3BFF] hover:underline uppercase tracking-wider mt-2">
                  Create new account
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: OTP Verification */}
              <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-6">
                <ArrowLeft size={16} />
              </button>

              <div className="mb-8">
                <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">Verify details</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
                  OTP sent to <span className="text-slate-900 dark:text-slate-200 font-bold">+91 {phone}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#6C3BFF] dark:focus:border-[#6C3BFF] focus:outline-none transition-colors"
                    />
                  ))}
                </div>
                
                {localError && <p className="text-xs font-bold text-rose-500 text-center">{localError}</p>}

                <button 
                  type="submit" 
                  disabled={otp.join('').length < 6}
                  className="w-full bg-[#6C3BFF] hover:bg-[#582cd6] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-wider"
                >
                  Verify & Login
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" /> Secure checkout encrypted
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
