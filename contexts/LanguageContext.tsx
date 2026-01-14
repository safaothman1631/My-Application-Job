'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'ku';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: Direction;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ku'); // Default to Kurdish
  const [translations, setTranslations] = useState<any>({});

  // Load translations when language changes
  useEffect(() => {
    fetch(`/locales/${language}.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(err => console.error('Failed to load translations:', err));
  }, [language]);

  // Save language preference to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'ar', 'ku'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';
  };

  const direction: Direction = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
