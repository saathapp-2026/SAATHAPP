import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n, t } = useTranslation();
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const changeLanguage = (newLang) => {
    localStorage.setItem('language', newLang);
    i18n.changeLanguage(newLang);
    setLanguageState(newLang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguageState(savedLanguage);
    }
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
