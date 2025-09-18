'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useLocale } from '@/lib/utils/locale';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaGlobe,
  FaChevronDown,
  FaTicketAlt,
  FaStore,
  FaUserTie,
} from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';

import logoLight from '@/assets/images/logo-light.jpg';
import logoDark from '@/assets/images/logo-dark.jpg';

// Import mock data
import {
  mockRacesSimple,
  mockTeamsSimple,
  mockDriversSimple,
  mockNewsSimple,
} from '@/lib/api/mockData';
import { NewsItem } from '@/lib/types/news';
import { Race } from '@/lib/types/race';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { FaPlay } from 'react-icons/fa6';

interface DropdownItem {
  key: string;
  href?: string;
  active?: boolean;
  races?: Race[];
  teams?: Team[];
  drivers?: Driver[];
  news?: NewsItem[];
}

interface NavItem {
  key: string;
  href: string;
  type?: string;
  dropdown?: DropdownItem[];
}

interface TopNavItem {
  key: string;
  href: string;
  icon: any;
}

// Top navigation items
const TOP_NAV_ITEMS: TopNavItem[] = [
  { key: 'authentic', href: 'authentic', icon: null },
  { key: 'store', href: 'store', icon: FaStore },
  { key: 'tickets', href: 'tickets', icon: FaTicketAlt },
  { key: 'hospitality', href: 'hospitality', icon: FaUserTie },
  { key: 'experiences', href: 'experiences', icon: null },
];

// Enhanced navigation items với rich dropdown content
const MAIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'schedule',
    href: 'schedule',
    type: 'races',
    dropdown: [
      {
        key: '2025 Season',
        href: 'schedule/2025',
        races: mockRacesSimple,
      },
      { key: 'Calendar', href: 'schedule/calendar' },
      { key: 'Race Weekend', href: 'schedule/race-weekend' },
    ],
  },
  {
    key: 'results',
    href: 'results',
    type: 'tabs',
    dropdown: [
      { key: '2025 Season', href: 'results/2025', active: true },
      { key: 'Driver Standings', href: 'results/driver-standings' },
      { key: 'Team Standings', href: 'results/team-standings' },
      { key: 'Archive 1950-2024', href: 'results/archive' },
      { key: 'F1 Awards', href: 'results/awards' },
    ],
  },
  {
    key: 'news',
    href: 'news',
    type: 'news',
    dropdown: [
      {
        key: 'Latest News',
        news: mockNewsSimple,
      },
    ],
  },
  {
    key: 'drivers',
    href: 'drivers',
    type: 'drivers',
    dropdown: [
      {
        key: 'All Drivers',
        drivers: mockDriversSimple,
      },
    ],
  },
  {
    key: 'teams',
    href: 'teams',
    type: 'teams',
    dropdown: [
      { key: 'All Teams', href: 'teams/all' },
      {
        key: 'teams_grid',
        teams: mockTeamsSimple,
      },
    ],
  },
  {
    key: 'gaming',
    href: 'gaming',
    type: 'simple',
    dropdown: [
      { key: 'Fantasy & Gaming', href: 'gaming/fantasy' },
      { key: 'F1 Manager', href: 'gaming/manager' },
      { key: 'F1 Mobile Racing', href: 'gaming/mobile' },
      { key: 'Esports', href: 'gaming/esports' },
    ],
  },
];

// Locale options
const LOCALE_OPTIONS = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { locale, setLocale } = useLocale();
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  // Ref để theo dõi wrapper hover
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hàm kiểm tra xem một nav item có active không
  const isNavItemActive = (href: string) => {
    return pathname.includes(`/${locale}/${href}`);
  };

  const handleChangeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsLocaleDropdownOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const currentLocaleOption = LOCALE_OPTIONS.find(
    option => option.value === locale
  );

  // Render different dropdown types
  const renderDropdownContent = (item: NavItem) => {
    const { type, dropdown } = item;

    if (!dropdown) return null;

    switch (type) {
      case 'races':
        const firstRaceItem = dropdown[0];
        if (!firstRaceItem?.races) {
          return (
            <div className="w-[800px] p-6 bg-gray-900 text-white shadow-lg rounded-lg">
              <p className="text-gray-400">No races available</p>
            </div>
          );
        }

        return (
          <div className="w-[800px] p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              {firstRaceItem.races.map((race: Race, index: number) => (
                <div
                  key={race.name}
                  className="flex items-center p-4 hover:bg-gray-800 hover:shadow-md rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="text-2xl">{race.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400 font-mono">
                          ROUND {race.round}
                        </span>
                        <h3 className="font-bold text-lg">{race.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{race.date}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        race.status === 'upcoming'
                          ? 'bg-yellow-900 text-yellow-200'
                          : 'bg-green-900 text-green-200'
                      }`}
                    >
                      {race.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <Link
                  href={`/${locale}/schedule`}
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
                >
                  Full Schedule
                </Link>
                <Link
                  href={`/${locale}/schedule/2026`}
                  className="border border-gray-700 text-gray-300 px-4 py-2 rounded font-semibold hover:bg-gray-800 hover:shadow-md transition-all duration-200"
                >
                  2026 Season
                </Link>
              </div>
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="w-[400px] p-0 bg-gray-900 text-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-800">
              <div className="flex space-x-6">
                {dropdown.map((tab: DropdownItem, index: number) => (
                  <Link
                    key={tab.key}
                    href={`/${locale}/${tab.href}`}
                    className={`text-sm font-semibold pb-2 border-b-2 transition-all duration-200 ${
                      tab.active
                        ? 'border-red-600 text-white'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-red-600 hover:shadow-inner'
                    }`}
                  >
                    {tab.key}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );

      case 'teams':
        const teamsGrid = dropdown.find(
          (item: DropdownItem) => item.key === 'teams_grid'
        );
        if (!teamsGrid?.teams) {
          return (
            <div className="w-[600px] p-6 bg-gray-900 text-white shadow-lg rounded-lg">
              <p className="text-gray-400">No teams available</p>
            </div>
          );
        }

        return (
          <div className="w-[600px] p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {teamsGrid.teams.map((team: Team) => (
                <div
                  key={team.name}
                  className={`${team.color} p-4 rounded-lg hover:opacity-90 hover:shadow-lg transition-all duration-200 relative overflow-hidden`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-white">{team.logo}</div>
                    <span className="text-white font-bold text-sm">
                      {team.name}
                    </span>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10 text-6xl text-white">
                    {team.logo}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-800">
              <Link
                href={`/${locale}/teams`}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
              >
                All Teams
              </Link>
            </div>
          </div>
        );

      case 'drivers':
        const firstDriverItem = dropdown[0];
        if (!firstDriverItem?.drivers) {
          return (
            <div className="w-[600px] p-6 bg-gray-900 text-white shadow-lg rounded-lg">
              <p className="text-gray-400">No drivers available</p>
            </div>
          );
        }

        return (
          <div className="w-[600px] p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              {firstDriverItem.drivers.map((driver: Driver) => (
                <Link
                  key={driver.name}
                  href={`/${locale}/drivers/${driver.name.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center p-4 hover:bg-gray-800 hover:shadow-md rounded-lg transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>{' '}
                  {/* Placeholder cho ảnh */}
                  <div>
                    <h3 className="font-bold text-lg">{driver.name}</h3>
                    <p className="text-sm text-gray-400">
                      {driver.country} - #{driver.number}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <Link
                href={`/${locale}/drivers`}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
              >
                All Drivers
              </Link>
            </div>
          </div>
        );

      case 'news':
        const firstNewsItem = dropdown[0];
        if (!firstNewsItem?.news) {
          return (
            <div className="w-[600px] p-6 bg-gray-900 text-white shadow-lg rounded-lg">
              <p className="text-gray-400">No news available</p>
            </div>
          );
        }

        return (
          <div className="w-[600px] p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="space-y-4">
              {firstNewsItem.news.map((item: NewsItem) => (
                <Link
                  key={item.title}
                  href={`/${locale}/${item.href}`}
                  className="flex items-center p-4 hover:bg-gray-800 hover:shadow-md rounded-lg transition-all duration-200"
                >
                  <div className="w-16 h-12 bg-gray-700 rounded mr-4"></div>{' '}
                  {/* Placeholder cho ảnh */}
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <Link
                href={`/${locale}/news`}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
              >
                All News
              </Link>
            </div>
          </div>
        );

      case 'simple':
      default:
        return (
          <div className="w-56 py-2 bg-gray-900 text-white shadow-lg rounded-lg">
            {dropdown.map((item: DropdownItem) => (
              <Link
                key={item.key}
                href={`/${locale}/${item.href}`}
                className="block px-4 py-3 text-sm hover:bg-gray-800 hover:shadow-inner transition-all duration-200"
              >
                {item.key}
              </Link>
            ))}
          </div>
        );
    }
  };

  // Hiệu ứng delay khi ẩn dropdown
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.relatedTarget as Node)
      ) {
        const timer = setTimeout(() => {
          setActiveDropdown(null);
        }, 200); // Delay 200ms trước khi ẩn
        return () => clearTimeout(timer);
      }
    };

    if (activeDropdown && dropdownRef.current) {
      dropdownRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [activeDropdown]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-8">
            {/* Left side */}
            <div className="hidden md:flex items-center space-x-6">
              {TOP_NAV_ITEMS.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={`/${locale}/${href}`}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-200 font-medium tracking-wide uppercase"
                >
                  {Icon && <Icon className="text-xs" />}
                  <span>{t(key)}</span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* F1 TV */}
              <Link
                href={`/${locale}/f1tv`}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white font-bold text-xs transition-all duration-200"
              >
                <FaPlay className="text-xs" />
                <span>F1 TV</span>
              </Link>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-200"
                >
                  <FaGlobe className="text-xs" />
                  <span>{currentLocaleOption?.flag}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${isLocaleDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isLocaleDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[120px] z-50">
                    {LOCALE_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChangeLocale(option.value as 'en' | 'vi')
                        }
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 ${
                          locale === option.value
                            ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                            : 'text-gray-900 dark:text-gray-300'
                        } transition-all duration-200`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="hover:bg-gray-800 p-1 rounded transition-all duration-200">
                <ThemeToggle />
              </div>

              {/* Sign In / Logout */}
              {user ? (
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-all duration-200 font-medium uppercase tracking-wide"
                >
                  {t('logout')}
                </button>
              ) : (
                <Link
                  href={`/${locale}/signin`}
                  className="text-gray-300 hover:text-white transition-all duration-200 font-medium uppercase tracking-wide"
                >
                  {t('signin')}
                </Link>
              )}

              {/* Subscribe */}
              <Link
                href={`/${locale}/subscribe`}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-bold text-xs transition-all duration-200 uppercase tracking-wide"
              >
                {t('subscribe')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <div className="relative w-20 h-8">
                <Image
                  src={logoLight}
                  alt="Formula 1"
                  fill
                  className="object-contain dark:hidden"
                  priority
                />
                <Image
                  src={logoDark}
                  alt="Formula 1"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation with Enhanced Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-8">
              {MAIN_NAV_ITEMS.map(({ key, href, dropdown, type }) => {
                const isActive = isNavItemActive(href);

                return (
                  <div
                    key={key}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(key)}
                    // onMouseLeave={() => setActiveDropdown(null)} // Removed to handle in wrapper
                  >
                    <Link
                      href={`/${locale}/${href}`}
                      className={`flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 font-semibold text-sm uppercase tracking-wider transition-all duration-200 py-4 border-b-2 ${
                        isActive
                          ? 'text-red-600 dark:text-red-400 border-red-600'
                          : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-red-600'
                      }`}
                    >
                      {t(key)}
                      {dropdown && (
                        <FaChevronDown
                          className={`text-xs ml-1 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {/* Enhanced Dropdown Menu with Wrapper */}
                    {dropdown && activeDropdown === key && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                      >
                        <div
                          className={`bg-gray-900 text-white rounded-lg shadow-xl border border-gray-800 z-50 ${
                            type === 'races'
                              ? 'w-[800px]'
                              : type === 'teams' ||
                                  type === 'drivers' ||
                                  type === 'news'
                                ? 'w-[600px]'
                                : 'w-56'
                          }`}
                        >
                          {renderDropdownContent({ key, href, dropdown, type })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* F1 Members' Area */}
              <Link
                href={`/${locale}/members`}
                className={`text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 font-semibold text-sm uppercase tracking-wider transition-all duration-200 py-4 ${
                  isNavItemActive('members')
                    ? 'text-red-600 dark:text-red-400'
                    : ''
                }`}
              >
                F1 Members' Area
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-200"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-gray-900 text-white z-50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <nav className="space-y-4">
              {MAIN_NAV_ITEMS.map(({ key, href, dropdown }) => {
                const isActive = isNavItemActive(href);

                return (
                  <div key={key}>
                    <Link
                      href={`/${locale}/${href}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 text-lg font-semibold hover:text-red-600 transition-all duration-200 uppercase tracking-wide border-b border-gray-800 ${
                        isActive ? 'text-red-600' : 'text-gray-300'
                      }`}
                    >
                      {t(key)}
                    </Link>

                    {/* Mobile Dropdown Items */}
                    {dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {dropdown.map((item: DropdownItem) => (
                          <Link
                            key={item.key}
                            href={`/${locale}/${item.href}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-sm text-gray-400 hover:text-red-600 transition-all duration-200"
                          >
                            {item.key}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* F1 Members' Area Mobile */}
              <Link
                href={`/${locale}/members`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-lg font-semibold hover:text-red-600 transition-all duration-200 uppercase tracking-wide border-b border-gray-800 ${
                  isNavItemActive('members') ? 'text-red-600' : 'text-gray-300'
                }`}
              >
                F1 Members' Area
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
