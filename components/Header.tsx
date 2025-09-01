'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useLocale } from '@/lib/utils/locale';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaGlobe,
  FaChevronDown,
  FaUser,
  FaStar,
} from 'react-icons/fa';

// Navigation items data
const NAVIGATION_ITEMS = [
  { key: 'home', href: '' },
  { key: 'news', href: '/news' },
  { key: 'schedule', href: '/schedule' },
  { key: 'results', href: '/results' },
  { key: 'tickets', href: '/tickets' },
  { key: 'store', href: '/store' },
  { key: 'feedback', href: '/feedback' },
];

const LOCALE_OPTIONS = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsLocaleDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const currentLocaleOption = LOCALE_OPTIONS.find(
    option => option.value === locale
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <Image
                  src="/images/F1.jpg"
                  alt="F1 Logo"
                  width={120}
                  height={40}
                  className="block dark:hidden object-contain"
                  priority
                />
                <Image
                  src="/images/F1.jpg"
                  alt="F1 Logo"
                  width={120}
                  height={40}
                  className="hidden dark:block object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="group relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition-all duration-300 ease-out"
                >
                  <span className="relative">
                    {t(key)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Desktop Tools */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 group"
                >
                  <FaGlobe className="text-sm" />
                  <span className="text-sm font-medium">
                    {currentLocaleOption?.flag}
                  </span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${isLocaleDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isLocaleDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[140px] animate-in slide-in-from-top-2 duration-200">
                    {LOCALE_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChangeLocale(option.value as 'en' | 'vi')
                        }
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors ${
                          locale === option.value
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ThemeToggle />
              </div>

              {/* Auth Buttons */}
              <Link
                href={`/${locale}/signin`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 group"
              >
                <FaUser className="text-sm" />
                <span className="font-medium">{t('signin')}</span>
              </Link>

              <Link
                href={`/${locale}/subscribe`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <FaStar className="text-sm" />
                <span>{t('subscribe')}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {NAVIGATION_ITEMS.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={`/${locale}${href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-200"
                  >
                    {t(key)}
                  </Link>
                ))}
              </nav>

              {/* Mobile Tools */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* Mobile Language Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={locale}
                    onChange={e =>
                      handleChangeLocale(e.target.value as 'en' | 'vi')
                    }
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-red-500 transition-all"
                  >
                    {LOCALE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.flag} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/${locale}/signin`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all duration-200"
                  >
                    <FaUser />
                    <span>{t('signin')}</span>
                  </Link>

                  <Link
                    href={`/${locale}/subscribe`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg transition-all duration-200"
                  >
                    <FaStar />
                    <span>{t('subscribe')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}
