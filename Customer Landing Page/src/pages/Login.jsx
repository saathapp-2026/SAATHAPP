import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Smartphone, ShieldCheck, ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { requestRealOtp, verifyRealOtp, authenticateWithGoogle, AuthConfigurationError } from '../services/authService';

export default function Login({ onLogin, onSignup, onBack, error, defaultMode = 'login' }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(defaultMode);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [localError, setLocalError] = useState(error || '');
  const [configError, setConfigError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length !== 10) {
      setLocalError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLocalError('');
    setIsLoading(true);
    
    try {
      await requestRealOtp(phone);
      setStep(2);
      setCountdown(30);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err) {
      if (err.name === 'AuthConfigurationError' || err instanceof AuthConfigurationError) {
        setConfigError(true);
        setLocalError(err.message);
      } else {
        // Special logic: If backend returns not found and we are on login mode
        if (err.message && err.message.toLowerCase().includes('not found') && mode === 'login') {
          setLocalError('No account found with this mobile number.');
        } else {
          setLocalError('Failed to send OTP. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
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

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;
    
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    if (pasteData.length < 6) {
      inputRefs.current[pasteData.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setLocalError('Please enter the complete 6-digit OTP.');
      return;
    }
    setLocalError('');
    setIsLoading(true);
    
    try {
      const response = await verifyRealOtp(phone, otpString);
      // Depending on mode, we could fire onSignup if this is a new account
      if (mode === 'signup' && onSignup) {
        onSignup({ user: response.user, token: response.token });
      } else {
        onLogin({ user: response.user, token: response.token });
      }
    } catch (err) {
      if (err.name === 'AuthConfigurationError' || err instanceof AuthConfigurationError) {
        setConfigError(true);
        setLocalError(err.message);
      } else {
        setLocalError('Incorrect OTP or verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setLocalError('');
    setIsLoading(true);
    try {
      await requestRealOtp(phone);
      setCountdown(30);
    } catch (err) {
      if (err.name === 'AuthConfigurationError' || err instanceof AuthConfigurationError) {
        setConfigError(true);
        setLocalError(err.message);
      } else {
        setLocalError('Failed to resend OTP.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');
    setIsLoading(true);
    try {
      const response = await authenticateWithGoogle(credentialResponse.credential);
      if (mode === 'signup' && onSignup) {
        onSignup({ user: response.user, token: response.token });
      } else {
        onLogin({ user: response.user, token: response.token });
      }
    } catch (err) {
      if (err.name === 'AuthConfigurationError' || err instanceof AuthConfigurationError) {
        setConfigError(true);
        setLocalError(err.message);
      } else {
        setLocalError('Google Sign-In failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasGoogleClientId = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
        
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {step === 1 ? 'Sending OTP...' : 'Verifying...'}
              </p>
            </div>
          </div>
        )}

        <div className="p-8">
          {configError ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">Backend Configuration Required</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-6">
                Genuine authentication is enforced. To test the login journey, please configure VITE_AUTH_API_URL and VITE_GOOGLE_CLIENT_ID in your environment variables, and connect a real authentication backend (e.g. Firebase or custom REST API).
              </p>
              <button 
                onClick={() => { setConfigError(false); setLocalError('') }}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Go Back
              </button>
            </div>
          ) : step === 1 ? (
            <>
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm">
                  <Smartphone size={28} strokeWidth={2.5} />
                </div>
                
                {/* Tabs */}
                <div className="w-full flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-8">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                      mode === 'login' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                      mode === 'signup' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {mode === 'login' ? (
                    <>Welcome back <span className="text-2xl">👋</span></>
                  ) : (
                    'Create your account'
                  )}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                  {mode === 'login' ? 'Login to continue shopping' : 'Sign up to start shopping with SaathApp'}
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                <div>
                  <div className="flex items-center rounded-xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary dark:focus-within:border-primary bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm">
                    <span className="px-4 py-4 text-slate-600 dark:text-slate-300 font-bold border-r-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">+91</span>
                    <input
                      type="tel"
                      autoFocus
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent outline-none px-4 py-4 font-bold text-slate-900 dark:text-white tracking-[0.1em] placeholder:text-slate-300 dark:placeholder:text-slate-600 text-lg"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  {localError && (
                    <div className="mt-2 text-left">
                      <p className="text-xs font-bold text-rose-500 ml-1 flex items-center gap-1">
                        <AlertTriangle size={12}/> {localError}
                      </p>
                      {localError.includes('No account found') && mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('signup')}
                          className="mt-2 text-xs font-bold text-primary hover:underline ml-1"
                        >
                          Create Account →
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={phone.length < 10}
                  className="duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full bg-primary hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md shadow-primary/20"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </form>

              <div className="flex items-center gap-4 my-6 opacity-60">
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">OR</span>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
              </div>

              <div className="flex flex-col gap-3 items-center">
                {hasGoogleClientId ? (
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setLocalError('Google Sign-In failed.')}
                    theme="filled_blue"
                    shape="rectangular"
                    width="100%"
                    text={mode === 'login' ? 'continue_with' : 'signup_with'}
                  />
                ) : (
                  <button 
                    onClick={() => {
                      setConfigError(true);
                      setLocalError('VITE_GOOGLE_CLIENT_ID is missing. Please configure it to enable Google Sign-In.');
                    }}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-700 dark:text-slate-200 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
                  </button>
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">
                  By continuing, you agree to our <Link to="/terms-of-service" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => { setStep(1); setOtp(['','','','','','']) }} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-6">
                <ArrowLeft size={18} />
              </button>

              <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">Verify your mobile number</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  We sent a 6-digit OTP to <span className="text-slate-900 dark:text-slate-200 font-bold">+91 {phone}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div 
                  className="flex justify-between gap-1 sm:gap-2"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary dark:focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                      />
                  ))}
                </div>
                
                {localError && <p className="text-xs font-bold text-rose-500 text-center flex items-center justify-center gap-1"><AlertTriangle size={12}/> {localError}</p>}

                <button 
                  type="submit" 
                  disabled={otp.join('').length < 6}
                  className="duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full bg-primary hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide shadow-md shadow-primary/20"
                >
                  Verify & Continue
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Didn't receive the OTP?
                </p>
                <div className="flex gap-4 items-center">
                  <button 
                    onClick={handleResendOtp}
                    disabled={countdown > 0}
                    className="text-sm font-bold text-primary disabled:text-slate-400 transition-colors"
                  >
                    Resend OTP {countdown > 0 ? `(${countdown}s)` : ''}
                  </button>
                  <div className="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
                  <button 
                    onClick={() => { setStep(1); setOtp(['','','','','','']) }}
                    className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                  >
                    Change mobile number
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" /> Secure encrypted connection
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {step === 1 && (
        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary hover:underline transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
