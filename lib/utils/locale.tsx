'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'vi';
export const locales: Locale[] = ['en', 'vi'];
export const defaultLocale: Locale = 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Khi client mount → đồng bộ với localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && isValidLocale(savedLocale) && savedLocale !== locale) {
      setLocale(savedLocale);
    }
    // Đồng bộ thuộc tính lang cho <html>
    document.documentElement.lang = locale;
  }, [locale]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Helper
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getDefaultLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;

  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && isValidLocale(savedLocale)) return savedLocale;

  const browserLang = navigator.language.split('-')[0];
  if (isValidLocale(browserLang)) return browserLang;

  return defaultLocale;
};
