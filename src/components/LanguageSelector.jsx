import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe2 } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-2 rounded-btn border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-primary/10"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe2 size={16} className="shrink-0 text-primary dark:text-primary-light" />
        <span className="hidden sm:inline">{selectedLanguage.label}</span>
        <span className="sm:hidden">{selectedLanguage.code.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-card border border-slate-200/80 bg-white/95 p-2 shadow-premium backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
            role="listbox"
          >
            <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
              Select language
            </div>
            <ul className="space-y-1">
              {languages.map((language) => {
                const isActive = selectedLanguage.code === language.code;
                return (
                  <li key={language.code}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={() => handleSelectLanguage(language)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                      role="option"
                      aria-selected={isActive}
                    >
                      <span className="font-medium">{language.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{language.nativeName}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
