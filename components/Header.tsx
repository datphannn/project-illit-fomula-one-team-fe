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
  FaCalendar,
  FaNewspaper,
  FaUser,
  FaUsers,
  FaGamepad,
} from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';

import logoLight from '@/assets/images/dark.png';
import logoDark from '@/assets/images/dark.png';

// Import mock data
import {
  mockRacesSimple,
  mockTeamsSimple,
  mockDriversSimple,
  mockNewsSimple,
} from '@/lib/api/mockData';
import { News } from '@/lib/types/news';
import { Race } from '@/lib/types/race';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { FaPlay, FaTrophy } from 'react-icons/fa6';

interface DropdownItem {
  key: string;
  href?: string;
  active?: boolean;
  races?: Race[];
  teams?: Team[];
  drivers?: Driver[];
  news?: News[];
}

interface NavItem {
  key: string;
  href: string;
  type?: string;
  dropdown?: DropdownItem[];
  icon?: any;
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

// Enhanced navigation items with rich dropdown content
const MAIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'schedule',
    href: 'schedule',
    type: 'races',
    icon: FaCalendar,
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
    icon: FaTrophy,
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
    icon: FaNewspaper,
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
    icon: FaUser,
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
    icon: FaUsers,
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
    icon: FaGamepad,
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const { locale, setLocale } = useLocale();
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Dùng giá trị nhỏ để kích hoạt hiệu ứng nhanh
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavItemActive = (href: string) => {
    return pathname?.includes(`/${locale}/${href}`);
  };

  const handleChangeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
    const segments = pathname?.split('/') ?? [];
    if (segments.length > 1) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newLocale}`);
    }
    setIsLocaleDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileDropdownOpen(null);
  };

  const currentLocaleOption = LOCALE_OPTIONS.find(
    option => option.value === locale
  );

  // Hover handlers
  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // --- RENDER FUNCTIONS (GRID/FULL-WIDTH) ---

  const renderRacesContent = (dropdown: DropdownItem[]) => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8 text-white border-b border-gray-700 pb-4">
        <span className="font-bold text-base border-b-2 border-red-600 pb-2">
          Previous
        </span>
        <span className="font-bold text-base text-gray-400 hover:text-white transition-colors cursor-pointer">
          Next
        </span>
        <span className="font-bold text-base text-gray-400 hover:text-white transition-colors cursor-pointer">
          Upcoming
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dropdown[0]?.races?.slice(0, 4).map((race: Race) => (
          <Link
            key={race.name}
            href={`/${locale}/schedule/${race.round}`}
            className="group bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-red-500/10"
          >
            <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 relative">
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded">
                  ROUND {race.round}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                {race.name}
              </h4>
              <p className="text-sm text-gray-400">{race.date}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
        <Link
          href={`/${locale}/schedule/full`}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
        >
          Full Schedule
        </Link>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors">
          2026
        </button>
      </div>
    </div>
  );

  const renderDriversContent = (dropdown: DropdownItem[]) => {
    const drivers = dropdown[0]?.drivers;
    if (!drivers) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {drivers.map(driver => (
            <Link
              key={driver.name}
              href={`/${locale}/drivers/${driver.name.toLowerCase().replace(/ /g, '-')}`}
              className="group flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                #{driver.number}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-red-400 transition-colors text-sm">
                  {driver.name}
                </h4>
                <p className="text-xs text-gray-400">{driver.teamId}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <Link
            href={`/${locale}/drivers/all`}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
          >
            All Drivers
          </Link>
          <Link
            href={`/${locale}/drivers/hall-of-fame`}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
          >
            Hall of Fame
          </Link>
        </div>
      </div>
    );
  };

  const renderTeamsContent = (dropdown: DropdownItem[]) => {
    const teamsGrid = dropdown.find(d => d.key === 'teams_grid');
    if (!teamsGrid?.teams) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {teamsGrid.teams.map((team: Team) => (
            <Link
              key={team.name}
              href={`/${locale}/teams/${team.name.toLowerCase().replace(/ /g, '-')}`}
              className="group text-center p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg border-2 border-white/20"
                style={{ backgroundColor: team.color }}
              >
                {team.name
                  .split(' ')
                  .map(w => w[0])
                  .join('')}
              </div>
              <h4 className="font-bold text-white group-hover:text-red-400 transition-colors text-sm mb-1">
                {team.name}
              </h4>
              <p className="text-xs text-gray-400">
                P{team.position} • {team.points} PTS
              </p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-800">
          <Link
            href={`/${locale}/teams/all`}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors"
          >
            View All Teams
          </Link>
        </div>
      </div>
    );
  };

  const renderNewsContent = (dropdown: DropdownItem[]) => {
    const news = dropdown[0]?.news;
    if (!news) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.slice(0, 4).map((item: News) => (
            <Link
              key={item.title}
              href={`/${locale}/news/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}
              className="group bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 p-4"
            >
              <h4 className="font-bold text-white group-hover:text-red-400 transition-colors text-sm mb-3 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{item.date}</span>
                <span className="bg-red-600/20 text-red-300 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-800">
          <Link
            href={`/${locale}/news`}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors"
          >
            View All News
          </Link>
        </div>
      </div>
    );
  };

  const renderTabsContent = (item: NavItem) => {
    if (!item.dropdown) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {item.dropdown.map((tab: DropdownItem) => (
            <Link
              key={tab.key}
              href={`/${locale}/${tab.href}`}
              className={`p-4 rounded-lg text-center transition-all duration-300 border-2 ${
                tab.active
                  ? 'bg-red-600 text-white border-red-600 shadow-lg'
                  : 'bg-gray-800 text-gray-200 border-gray-700 hover:border-red-500 hover:bg-gray-750'
              }`}
            >
              <div className="font-bold text-sm">{tab.key}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderDropdownContent = (item: NavItem) => {
    const { type, dropdown } = item;
    if (!dropdown) return null;

    let content;

    switch (type) {
      case 'races':
        content = renderRacesContent(dropdown);
        break;
      case 'drivers':
        content = renderDriversContent(dropdown);
        break;
      case 'teams':
        content = renderTeamsContent(dropdown);
        break;
      case 'news':
        content = renderNewsContent(dropdown);
        break;
      case 'tabs':
      case 'simple':
        content = renderTabsContent(item);
        break;
      default:
        return null;
    }

    return (
      <div
        // SỬ DỤNG FIXED: Buộc khối nội dung phải kéo dài toàn màn hình (Viewport)
        // Header height: 40px (Top Bar) + 64px (Main Header) = 104px (6.5rem)
        // Đặt top: 6.5rem để nó nằm ngay dưới Main Header.
        className="fixed left-0 right-0 top-[6.5rem] bg-gray-900/95 backdrop-blur-md border-t border-red-600 shadow-2xl z-30"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        ref={dropdownRef}
      >
        <div className="container mx-auto px-8 py-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              {item.icon && <item.icon className="text-red-500" />}
              {t(item.key)}
            </h3>
          </div>
          {content}
        </div>
      </div>
    );
  };

  // Cleanup effects
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* 1. TOP BAR - ĐƯỢC CỐ ĐỊNH Ở TOP: 0 */}
      <div
        className={`bg-gradient-to-r from-black to-gray-900 text-white text-xs border-b border-gray-800 transition-all duration-300 sticky top-0 z-50 shadow-lg`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            {/* Left side */}
            <div className="flex items-center space-x-6">
              <Link
                href={`/${locale}/fia-race-series`}
                className="text-gray-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 pr-4 border-r border-gray-700"
              >
                <span className="text-red-600 font-bold">FIA</span> Race Series
                <FaChevronDown className="text-xs opacity-70" />
              </Link>

              {TOP_NAV_ITEMS.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={`/${locale}/${href}`}
                  className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-medium uppercase"
                >
                  {Icon && <Icon className="text-xs" />}
                  {t(key)}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/${locale}/f1tv`}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-white font-bold text-xs transition-colors uppercase"
              >
                <FaPlay className="text-xs" />
                <span>F1 TV</span>
              </Link>

              <Link
                href={`/${locale}/subscribe`}
                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-white font-bold text-xs transition-colors uppercase"
              >
                {t('subscribe')}
              </Link>

              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded border border-gray-700 text-xs"
                >
                  <FaGlobe className="text-xs" />
                  <span>{currentLocaleOption?.flag}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${isLocaleDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isLocaleDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg py-2 min-w-[140px] z-50">
                    {LOCALE_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChangeLocale(option.value as 'en' | 'vi')
                        }
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center gap-3 ${
                          locale === option.value
                            ? 'text-red-400 bg-gray-700'
                            : 'text-gray-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {user ? (
                <button
                  onClick={logout}
                  className="hidden md:block text-gray-300 hover:text-white transition-colors text-xs uppercase font-medium"
                >
                  {t('logout')}
                </button>
              ) : (
                <Link
                  href={`/${locale}/signin`}
                  className="hidden md:block text-gray-300 hover:text-white transition-colors text-xs uppercase font-medium"
                >
                  {t('signin')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - ĐƯỢC CỐ ĐỊNH Ở TOP: 40PX (NGAY DƯỚI TOP BAR) */}
      <header
        className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 sticky top-10 z-40 shadow-md`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="relative w-28 h-10">
                <Image
                  src={logoLight}
                  alt="Formula 1"
                  width={70}
                  height={30}
                  className="object-contain dark:hidden"
                  priority
                />
                <Image
                  src={logoDark}
                  alt="Formula 1"
                  width={70}
                  height={30}
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {MAIN_NAV_ITEMS.map(({ key, href, dropdown, icon: Icon }) => {
                const isActive = isNavItemActive(href);
                const isDropdownActive = activeDropdown === key;

                return (
                  <div
                    key={key}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${locale}/${href}`}
                      className={`flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm uppercase tracking-wide transition-colors py-4 border-b-2 ${
                        isActive || isDropdownActive
                          ? 'text-red-600 dark:text-red-400 border-red-600'
                          : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-red-600'
                      }`}
                    >
                      {Icon && <Icon className="text-xs" />}
                      {t(key)}
                      {dropdown && (
                        <FaChevronDown
                          className={`text-xs transition-transform ${isDropdownActive ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {/* Khối Nội dung Lớn (Horizontal Section) */}
                    {dropdown &&
                      isDropdownActive &&
                      renderDropdownContent({
                        key,
                        href,
                        dropdown,
                        type: MAIN_NAV_ITEMS.find(item => item.key === key)
                          ?.type,
                        icon: Icon,
                      })}
                  </div>
                );
              })}

              <Link
                href={`/${locale}/members`}
                className={`flex items-center gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 font-bold text-sm uppercase tracking-wide transition-colors py-4 border-b-2 ${
                  isNavItemActive('members')
                    ? 'text-yellow-600 dark:text-yellow-400 border-yellow-600'
                    : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-yellow-600'
                }`}
              >
                <FaUser className="text-xs" />
                F1 Members' Area
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-26 bg-gray-900 text-white z-50 overflow-y-auto">
          <div className="p-6 space-y-4">
            <nav className="space-y-2">
              {MAIN_NAV_ITEMS.map(({ key, href, dropdown, icon: Icon }) => {
                const isActive = isNavItemActive(href);
                const isOpen = mobileDropdownOpen === key;

                return (
                  <div key={key} className="border-b border-gray-800 pb-3">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/${locale}/${href}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex-1 py-3 text-base font-bold uppercase flex items-center gap-3 ${
                          isActive ? 'text-red-600' : 'text-gray-300'
                        }`}
                      >
                        {Icon && <Icon className="text-sm" />}
                        {t(key)}
                      </Link>
                      {dropdown && (
                        <button
                          onClick={() =>
                            setMobileDropdownOpen(isOpen ? null : key)
                          }
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <FaChevronDown
                            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {dropdown && isOpen && (
                      <div className="ml-4 mt-2 space-y-2">
                        {dropdown.map((item: DropdownItem) => (
                          <Link
                            key={item.key}
                            href={`/${locale}/${item.href ?? ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                          >
                            {item.key}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href={`/${locale}/members`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-base font-bold uppercase border-b border-gray-800 flex items-center gap-3 ${
                  isNavItemActive('members')
                    ? 'text-yellow-600'
                    : 'text-gray-300'
                }`}
              >
                <FaUser className="text-sm" />
                F1 Members' Area
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
