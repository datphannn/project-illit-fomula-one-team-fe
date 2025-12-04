'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/lib/services/authService';
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
  FaMedal,
  FaCrown,
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
  mockAwardsSimple,
} from '@/lib/api/mockData';
import { News } from '@/lib/types/news';
import { Race } from '@/lib/types/race';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { Award } from '@/lib/types/award';
import { FaPlay, FaTrophy } from 'react-icons/fa6';

interface DropdownItem {
  key: string;
  label?: string;
  href?: string;
  active?: boolean;
  races?: Race[];
  teams?: Team[];
  drivers?: Driver[];
  news?: News[];
  awards?: Award[];
}

interface NavItem {
  key: string;
  label: string;
  href: string;
  type?: string;
  dropdown?: DropdownItem[];
  icon?: any;
}

interface TopNavItem {
  key: string;
  label: string;
  href: string;
  icon: any;
}

// Top navigation items
const TOP_NAV_ITEMS: TopNavItem[] = [
  { key: 'authentic', label: 'Authentic', href: '/authentic', icon: null },
  { key: 'store', label: 'Store', href: '/store', icon: FaStore },
  { key: 'tickets', label: 'Tickets', href: '/tickets', icon: FaTicketAlt },
  {
    key: 'hospitality',
    label: 'Hospitality',
    href: '/hospitality',
    icon: FaUserTie,
  },
  {
    key: 'experiences',
    label: 'Experiences',
    href: '/experiences',
    icon: null,
  },
];

// Enhanced navigation items with rich dropdown content
const MAIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'schedule',
    label: 'Schedule',
    href: '/schedule',
    type: 'races',
    icon: FaCalendar,
    dropdown: [
      {
        key: '2025-season',
        label: '2025 Season',
        href: '/schedule/2025',
        races: mockRacesSimple,
      },
      { key: 'calendar', label: 'Calendar', href: '/schedule/calendar' },
      {
        key: 'race-weekend',
        label: 'Race Weekend',
        href: '/schedule/race-weekend',
      },
    ],
  },
  {
    key: 'results',
    label: 'Results',
    href: '/results',
    type: 'tabs',
    icon: FaTrophy,
    dropdown: [
      {
        key: '2025-season',
        label: '2025 Season',
        href: '/results/2025',
        active: true,
      },
      {
        key: 'driver-standings',
        label: 'Driver Standings',
        href: '/results/driver-standings',
      },
      {
        key: 'team-standings',
        label: 'Team Standings',
        href: '/results/team-standings',
      },
      { key: 'archive', label: 'Archive 1950-2024', href: '/results/archive' },
      { key: 'f1-awards', label: 'F1 Awards', href: '/awards' },
    ],
  },
  {
    key: 'news',
    label: 'News',
    href: '/news',
    type: 'news',
    icon: FaNewspaper,
    dropdown: [
      {
        key: 'latest-news',
        label: 'Latest News',
        news: mockNewsSimple,
      },
    ],
  },
  {
    key: 'drivers',
    label: 'Drivers',
    href: '/drivers',
    type: 'drivers',
    icon: FaUser,
    dropdown: [
      {
        key: 'all-drivers',
        label: 'All Drivers',
        drivers: mockDriversSimple,
      },
    ],
  },
  {
    key: 'teams',
    label: 'Teams',
    href: '/teams',
    type: 'teams',
    icon: FaUsers,
    dropdown: [
      { key: 'all-teams', label: 'All Teams', href: '/teams/all' },
      {
        key: 'teams_grid',
        label: 'Teams Grid',
        teams: mockTeamsSimple,
      },
    ],
  },
  {
    key: 'awards',
    label: 'Awards',
    href: '/awards',
    type: 'awards',
    icon: FaTrophy,
    dropdown: [
      {
        key: 'latest-awards',
        label: 'Latest Awards',
        awards: mockAwardsSimple,
      },
    ],
  },
  {
    key: 'gaming',
    label: 'Gaming',
    href: '/gaming',
    type: 'simple',
    icon: FaGamepad,
    dropdown: [
      { key: 'fantasy', label: 'Fantasy & Gaming', href: '/gaming/fantasy' },
      { key: 'manager', label: 'F1 Manager', href: '/gaming/manager' },
      { key: 'mobile', label: 'F1 Mobile Racing', href: '/gaming/mobile' },
      { key: 'esports', label: 'Esports', href: '/gaming/esports' },
    ],
  },
];

// Locale options (kept for UI, but not used in routing)
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
  const [locale, setLocale] = useState('en');

  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isNavItemActive = (href: string) => {
    return pathname?.includes(href);
  };

  const handleChangeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
    setIsLocaleDropdownOpen(false);
    // In a real app, you might store this in localStorage or context
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

  // --- RENDER FUNCTIONS ---

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dropdown[0]?.races?.slice(0, 5).map((race: Race) => (
          <Link
            key={race.name}
            href={`/schedule/${race.round}`}
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
          href="/schedule"
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {drivers.slice(0, 5).map(driver => {
            // Get last name only for URL
            const nameParts = driver.name.split(' ');
            const lastName = nameParts[nameParts.length - 1].toLowerCase();

            return (
              <Link
                key={driver.name}
                href={`/drivers/${lastName}`}
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
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <Link
            href="/drivers"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
          >
            All Drivers
          </Link>
          <Link
            href="/drivers/hall-of-fame"
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
          {teamsGrid.teams.slice(0, 5).map((team: Team) => {
            const nameParts = team.name.toLowerCase().split(' ');
            const teamSlug = nameParts[nameParts.length - 1];

            return (
              <Link
                key={team.name}
                href={`/teams/${teamSlug}`}
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
            );
          })}
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-800">
          <Link
            href="/teams"
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {news.slice(0, 5).map((item: News) => (
            <Link
              key={item.title}
              href={`/news/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}
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
            href="/news"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors"
          >
            View All News
          </Link>
        </div>
      </div>
    );
  };

  const renderAwardsContent = (dropdown: DropdownItem[]) => {
    const awards = dropdown[0]?.awards;
    if (!awards) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {awards.slice(0, 5).map((award: Award) => (
            <Link
              key={award.id}
              href={`/awards/${award.id}`}
              className="group bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-4 relative">
                <div className="flex items-center gap-2 mb-2">
                  <FaTrophy className="text-2xl text-yellow-200" />
                  <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                    {award.year}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">
                  {award.category}
                </h4>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaMedal className="text-yellow-500" />
                  <span className="text-xs text-gray-400 uppercase">
                    Winner
                  </span>
                </div>
                <h5 className="font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">
                  {award.winner}
                </h5>
                {award.team && (
                  <p className="text-xs text-gray-400">{award.team}</p>
                )}
                {award.stats && (
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-700">
                    {award.stats.wins !== undefined && (
                      <div className="text-center">
                        <p className="text-sm font-bold text-red-400">
                          {award.stats.wins}
                        </p>
                        <p className="text-xs text-gray-500">Wins</p>
                      </div>
                    )}
                    {award.stats.podiums !== undefined && (
                      <div className="text-center">
                        <p className="text-sm font-bold text-orange-400">
                          {award.stats.podiums}
                        </p>
                        <p className="text-xs text-gray-500">Podiums</p>
                      </div>
                    )}
                    {award.stats.points !== undefined && (
                      <div className="text-center">
                        <p className="text-sm font-bold text-blue-400">
                          {award.stats.points}
                        </p>
                        <p className="text-xs text-gray-500">Points</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <Link
            href="/awards"
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-2 rounded text-sm font-bold transition-colors flex items-center gap-2"
          >
            <FaCrown />
            View All Awards
          </Link>
          <Link
            href="/awards/hall-of-fame"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
          >
            Hall of Fame
          </Link>
        </div>
      </div>
    );
  };

  const renderTabsContent = (item: NavItem) => {
    if (!item.dropdown) return null;

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {item.dropdown.slice(0, 5).map((tab: DropdownItem) => (
            <Link
              key={tab.key}
              href={tab.href || '/'}
              className={`p-4 rounded-lg text-center transition-all duration-300 border-2 ${
                tab.active
                  ? 'bg-red-600 text-white border-red-600 shadow-lg'
                  : 'bg-gray-800 text-gray-200 border-gray-700 hover:border-red-500 hover:bg-gray-750'
              }`}
            >
              <div className="font-bold text-sm">{tab.label}</div>
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
      case 'awards':
        content = renderAwardsContent(dropdown);
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
        className="fixed left-0 right-0 top-[6.5rem] bg-gray-900/95 backdrop-blur-md border-t border-red-600 shadow-2xl z-30"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        ref={dropdownRef}
      >
        <div className="container mx-auto px-8 py-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              {item.icon && <item.icon className="text-red-500" />}
              {item.label}
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
      {/* 1. TOP BAR */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white text-xs border-b border-gray-800 transition-all duration-300 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            {/* Left side */}
            <div className="flex items-center space-x-6">
              <Link
                href="/fia-race-series"
                className="text-gray-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 pr-4 border-r border-gray-700"
              >
                <span className="text-red-600 font-bold">FIA</span> Race Series
                <FaChevronDown className="text-xs opacity-70" />
              </Link>

              {TOP_NAV_ITEMS.map(({ key, label, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-medium uppercase"
                >
                  {Icon && <Icon className="text-xs" />}
                  {label}
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
                Subscribe
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
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="hidden md:block text-gray-300 hover:text-white transition-colors text-xs uppercase font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="hidden md:block text-gray-300 hover:text-white transition-colors text-xs uppercase font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 sticky top-10 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <div className="relative w-32 h-12">
                <Image
                  src={logoLight}
                  alt="Formula 1"
                  fill
                  className="object-contain dark:hidden"
                  priority
                  sizes="128px"
                />
                <Image
                  src={logoDark}
                  alt="Formula 1"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                  sizes="128px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {MAIN_NAV_ITEMS.map(
                ({ key, label, href, dropdown, icon: Icon }) => {
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
                        href={href}
                        className={`flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm uppercase tracking-wide transition-colors py-6 border-b-2 ${
                          isActive || isDropdownActive
                            ? 'text-red-600 dark:text-red-400 border-red-600'
                            : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-red-600'
                        }`}
                      >
                        {Icon && <Icon className="text-xs" />}
                        {label}
                        {dropdown && (
                          <FaChevronDown
                            className={`text-xs transition-transform ${isDropdownActive ? 'rotate-180' : ''}`}
                          />
                        )}
                      </Link>

                      {/* Dropdown Content */}
                      {dropdown &&
                        isDropdownActive &&
                        renderDropdownContent({
                          key,
                          label,
                          href,
                          dropdown,
                          type: MAIN_NAV_ITEMS.find(item => item.key === key)
                            ?.type,
                          icon: Icon,
                        })}
                    </div>
                  );
                }
              )}

              <Link
                href="/members"
                className={`flex items-center gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 font-bold text-sm uppercase tracking-wide transition-colors py-6 border-b-2 ${
                  isNavItemActive('/members')
                    ? 'text-yellow-600 dark:text-yellow-400 border-yellow-600'
                    : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-yellow-600'
                }`}
              >
                <FaUser className="text-xs" />
                F1 Members
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile locale and theme toggle */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocaleDropdownOpen(!isLocaleDropdownOpen)
                    }
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-300 dark:border-gray-600 text-xs"
                  >
                    <FaGlobe className="text-xs" />
                    <span>{currentLocaleOption?.flag}</span>
                  </button>
                </div>
                <ThemeToggle />
              </div>

              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-26 bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* User section */}
            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Welcome, {user.id}</span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-bold transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            <nav className="space-y-2">
              {MAIN_NAV_ITEMS.map(
                ({ key, label, href, dropdown, icon: Icon }) => {
                  const isActive = isNavItemActive(href);
                  const isOpen = mobileDropdownOpen === key;

                  return (
                    <div
                      key={key}
                      className="border-b border-gray-200 dark:border-gray-700 pb-3"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex-1 py-3 text-base font-bold uppercase flex items-center gap-3 ${
                            isActive
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {Icon && <Icon className="text-sm" />}
                          {label}
                        </Link>
                        {dropdown && (
                          <button
                            onClick={() =>
                              setMobileDropdownOpen(isOpen ? null : key)
                            }
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                          >
                            <FaChevronDown
                              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      {dropdown && isOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {dropdown.slice(0, 5).map((item: DropdownItem) => (
                            <Link
                              key={item.key}
                              href={item.href || href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
              )}

              <Link
                href="/members"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-base font-bold uppercase border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 ${
                  isNavItemActive('/members')
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                <FaUser className="text-sm" />
                F1 Members
              </Link>
            </nav>

            {/* Top nav items in mobile */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-3">
                {TOP_NAV_ITEMS.map(({ key, label, href, icon: Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
                  >
                    {Icon && <Icon className="text-xs" />}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
