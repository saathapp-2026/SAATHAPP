import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Gift, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { REFERRAL_TYPES, submitReferral } from '../services/referralService';

export default function ReferralModal({ isOpen, onClose, user = null }) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactInput, setContactInput] = useState('');
  const [contactType, setContactType] = useState('phone'); // 'phone' | 'email'
  const [referralType, setReferralType] = useState('Customer');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSuccess(false);
    setFullName('');
    setContactInput('');
    setEmailInput('');
    setReferralType('Customer');
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!contactInput.trim()) {
      newErrors.contactInput = contactType === 'phone' ? 'Mobile Number is required.' : 'Email is required.';
    } else if (contactType === 'phone') {
      const cleanPhone = contactInput.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.contactInput = 'Please enter a valid 10-digit mobile number.';
      }
    } else if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInput.trim())) {
        newErrors.contactInput = 'Please enter a valid email address.';
      }
    }

    if (emailInput.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.trim())) {
        newErrors.emailInput = 'Please enter a valid email address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formattedPhone = contactType === 'phone' ? `${countryCode} ${contactInput.trim()}` : '';
    const formattedEmail = contactType === 'email' ? contactInput.trim() : emailInput.trim();

    submitReferral(
      {
        referredName: fullName,
        referredPhone: formattedPhone || '+91 9999999999',
        referredEmail: formattedEmail,
        referralType: referralType,
      },
      user
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  return (
    <div
      className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:scale-[0.99] fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="referral-modal-title"
    >
      <div className="relative w-full max-w-lg bg-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden transition-all transform scale-100">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-md shrink-0">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="referral-modal-title" className="text-xl font-extrabold tracking-tight">
                Refer Someone to SaathApp
              </h2>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                Help someone discover and grow with SaathApp.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-fade-up">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-theme">
                  Referral Successfully Submitted!
                </h3>
                <p className="text-xs text-theme-secondary max-w-xs mx-auto">
                  Thank you for helping strengthen our local community. We will reach out to{' '}
                  <span className="font-semibold text-theme">{fullName}</span> soon.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-4 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-btn text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-theme mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary w-4 h-4" />
                  <input
                    type="text"
                    required
                    placeholder="Enter candidate's full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    className={`w-full h-11 pl-10 pr-4 bg-surface border text-xs sm:text-sm text-theme rounded-btn focus:outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500' : 'border-theme-border'
                      }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Number / Email (Tab Selector & Input) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-theme">
                    Mobile Number / Email <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center bg-surface border border-theme-border rounded-lg p-0.5 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setContactType('phone');
                        setContactInput('');
                        setErrors({ ...errors, contactInput: null });
                      }}
                      className={`px-2 py-0.5 rounded-md transition-colors ${contactType === 'phone'
                          ? 'bg-primary text-white'
                          : 'text-theme-secondary hover:text-theme'
                        }`}
                    >
                      Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setContactType('email');
                        setContactInput('');
                        setErrors({ ...errors, contactInput: null });
                      }}
                      className={`px-2 py-0.5 rounded-md transition-colors ${contactType === 'email'
                          ? 'bg-primary text-white'
                          : 'text-theme-secondary hover:text-theme'
                        }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {contactType === 'phone' ? (
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-11 pl-3 pr-7 bg-surface border border-theme-border text-xs font-semibold text-theme rounded-btn focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-secondary pointer-events-none" />
                    </div>

                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary w-4 h-4" />
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={contactInput}
                        onChange={(e) => {
                          setContactInput(e.target.value);
                          if (errors.contactInput) setErrors({ ...errors, contactInput: null });
                        }}
                        className={`w-full h-11 pl-10 pr-4 bg-surface border text-xs sm:text-sm text-theme rounded-btn focus:outline-none focus:ring-2 focus:ring-primary ${errors.contactInput ? 'border-red-500' : 'border-theme-border'
                          }`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary w-4 h-4" />
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={contactInput}
                      onChange={(e) => {
                        setContactInput(e.target.value);
                        if (errors.contactInput) setErrors({ ...errors, contactInput: null });
                      }}
                      className={`w-full h-11 pl-10 pr-4 bg-surface border text-xs sm:text-sm text-theme rounded-btn focus:outline-none focus:ring-2 focus:ring-primary ${errors.contactInput ? 'border-red-500' : 'border-theme-border'
                        }`}
                    />
                  </div>
                )}
                {errors.contactInput && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.contactInput}</p>
                )}
              </div>

              {/* What would you like to refer? */}
              <div>
                <label className="block text-xs font-bold text-theme mb-1.5">
                  What would you like to refer? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={referralType}
                    onChange={(e) => setReferralType(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-8 bg-surface border border-theme-border text-xs sm:text-sm text-theme font-medium rounded-btn focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    {REFERRAL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-secondary pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full h-11 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm rounded-btn transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Referral →'}</span>
                  {!isSubmitting && <Send size={14} />}
                </button>
              </div>

              {/* Non-monetary MVP Copy Footer */}
              <p className="text-[11px] text-theme-secondary text-center font-medium pt-1">
                Help someone discover local products, on-demand services & ecosystem growth on SaathApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
