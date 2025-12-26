'use client';

import React from 'react';
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
  FaFlag,
} from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';

import logoLight from '@/assets/images/dark.png';
import logoDark from '@/assets/images/dark.png';

// Import mock data từ Detailed thay vì Simple
import {
  mockRacesDetailed,
  mockTeamsDetailed,
  mockDriversDetailed,
  mockNewsDetailed,
  mockAwards,
} from '@/lib/api/mockData';
import { News } from '@/lib/types/news';
import { Race } from '@/lib/types/race';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { Award } from '@/lib/types/award';
import { FaClock, FaPlay, FaTrophy } from 'react-icons/fa6';

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
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
  icon: any;
}

// Top navigation items - chỉ có store là external link thực tế
const TOP_NAV_ITEMS: TopNavItem[] = [
  {
    key: 'authentic',
    label: 'Authentic',
    comingSoon: true,
    icon: null,
  },
  {
    key: 'store',
    label: 'Store',
    href: 'https://f1store.formula1.com/en',
    external: true,
    icon: FaStore,
  },
  {
    key: 'tickets',
    label: 'Tickets',
    comingSoon: true,
    icon: FaTicketAlt,
  },
  {
    key: 'hospitality',
    label: 'Hospitality',
    comingSoon: true,
    icon: FaUserTie,
  },
  {
    key: 'experiences',
    label: 'Experiences',
    comingSoon: true,
    icon: null,
  },
];

// Enhanced navigation items with rich dropdown content từ Detailed data
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
        href: '/schedule',
        races: mockRacesDetailed.slice(0, 5), // Chỉ lấy 5 race
      },
      {
        key: 'calendar',
        label: 'Calendar',
        href: '/schedule',
        active: true,
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
        key: 'driver-standings',
        label: 'Driver Standings',
        href: '/drivers',
        active: true,
      },
      {
        key: 'team-standings',
        label: 'Team Standings',
        href: '/teams',
      },
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
        news: mockNewsDetailed.slice(0, 5), // Chỉ lấy 5 news
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
        drivers: mockDriversDetailed.slice(0, 5), // Chỉ lấy 5 drivers
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
      {
        key: 'all-teams',
        label: 'All Teams',
        href: '/teams',
      },
      {
        key: 'teams_grid',
        label: 'Teams Grid',
        teams: mockTeamsDetailed.slice(0, 5), // Chỉ lấy 5 teams
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
        awards: mockAwards.slice(0, 5), // Chỉ lấy 5 awards
      },
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
  const [locale, setLocale] = useState('en');
  const [showComingSoon, setShowComingSoon] = useState<string | null>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const comingSoonTimerRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isNavItemActive = (href: string) => {
    return pathname?.includes(href);
  };

  const handleChangeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
    setIsLocaleDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileDropdownOpen(null);
  };

  const currentLocaleOption = LOCALE_OPTIONS.find(
    option => option.value === locale
  );

  // Coming soon notification
  const handleComingSoon = (key: string) => {
    setShowComingSoon(key);
    if (comingSoonTimerRef.current) {
      clearTimeout(comingSoonTimerRef.current);
    }
    comingSoonTimerRef.current = setTimeout(() => {
      setShowComingSoon(null);
    }, 2000);
  };

  // Hover handlers
  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setActiveDropdown(null);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Handler để toggle dropdown bằng click
  const handleNavItemClick = (key: string) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
      setIsHoveringDropdown(false);
    } else {
      setActiveDropdown(key);
    }
  };

  // --- RENDER FUNCTIONS với Detailed Data và hình ảnh ---

  const renderRacesContent = (dropdown: DropdownItem[]) => {
    const races = dropdown[0]?.races?.slice(0, 5) || [];
    if (!races || races.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Upcoming Races
            </h3>
            <p className="text-sm text-gray-400">2025 Season Calendar</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {races.length}
              </div>
              <div className="text-xs text-gray-400">Races</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {races.map((race: Race) => {
            const isLive = race.status === 'live';

            return (
              <Link
                key={race.id}
                href={`/schedule/${race.id}`}
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative flex flex-col rounded-xl border border-gray-700/50 hover:border-red-500/80 transition-all duration-300 overflow-hidden"
              >
                {/* Race image/flag - ĐƠN GIẢN */}
                <div className="h-28 relative overflow-hidden">
                  {race.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={race.image}
                        alt={race.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <div class="text-4xl">${race.flag || '🏁'}</div>
                          </div>
                        `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-4xl">{race.flag || '🏁'}</div>
                    </div>
                  )}

                  {/* Live indicator - ĐƠN GIẢN */}
                  {isLive && (
                    <div className="absolute top-2 left-2 z-10">
                      <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    </div>
                  )}

                  {/* Round badge - ĐƠN GIẢN */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                      R{race.round}
                    </span>
                  </div>
                </div>

                {/* Chỉ hiển thị tên, ngày và trạng thái */}
                <div className="p-3 bg-gray-900/50 flex-1">
                  <h4 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 text-xs mb-1 line-clamp-2">
                    {race.name}
                  </h4>

                  <div className="flex items-center gap-1 mb-2">
                    <FaCalendar className="text-[10px] text-gray-400" />
                    <span className="text-[10px] text-gray-300">
                      {race.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-[10px] text-gray-400 truncate mr-2">
                      {race.circuit}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        race.status === 'live'
                          ? 'bg-red-600 text-white'
                          : race.status === 'upcoming'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                      }`}
                    >
                      {race.status === 'live'
                        ? 'LIVE'
                        : race.status === 'upcoming'
                          ? 'UPCOMING'
                          : 'PAST'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">Full Race Calendar</h4>
              <p className="text-sm text-gray-400">
                View complete schedule and results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/schedule"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 font-bold text-xs flex items-center gap-2 overflow-hidden"
              >
                <span>View All Races</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDriversContent = (dropdown: DropdownItem[]) => {
    const drivers = dropdown[0]?.drivers?.slice(0, 5) || [];
    if (drivers.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Top Drivers</h3>
            <p className="text-sm text-gray-400">2025 Season Championship</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {drivers.length}
              </div>
              <div className="text-xs text-gray-400">Drivers</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {drivers.map((driver: Driver) => {
            const points = driver.seasonStats?.seasonPoints || 0;
            const position = driver.seasonStats?.seasonPosition || 0;

            return (
              <Link
                key={driver.id}
                href={`/drivers/${driver.id}`}
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative flex flex-col items-center"
              >
                {/* Driver image - DÙNG img TAG */}
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-red-500 transition-all duration-500">
                  {driver.image ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={driver.image}
                        alt={driver.name}
                        className="object-cover object-top transform group-hover:scale-110 transition-transform duration-700 w-full h-full"
                        style={{ objectPosition: 'center top' }}
                      />
                      {/* Gradient overlay để đảm bảo nhìn rõ khuôn mặt */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900/20"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-400">
                      <div className="text-white font-bold text-2xl">
                        #{driver.number}
                      </div>
                    </div>
                  )}

                  {/* Position badge - LÀM TO HƠN */}
                  {position > 0 && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          position === 1
                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-700'
                            : position === 2
                              ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                              : position === 3
                                ? 'bg-gradient-to-r from-amber-700 to-amber-800'
                                : 'bg-gradient-to-r from-gray-700 to-gray-800'
                        } text-white font-bold shadow-lg border-2 border-gray-900`}
                      >
                        {position}
                      </div>
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/0 via-red-600/0 to-red-600/0 group-hover:via-red-600/10 group-hover:to-red-600/20 transition-all duration-500 rounded-full"></div>
                </div>

                {/* Driver name and team */}
                <div className="text-center">
                  <h4 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 text-sm mb-1 line-clamp-1">
                    {driver.name.split(' ')[0]}
                  </h4>
                  <p className="text-xs text-gray-300 font-medium line-clamp-1">
                    {driver.name.split(' ').slice(1).join(' ')}
                  </p>

                  {/* Team info */}
                  {driver.teamId && (
                    <div className="mt-2">
                      <span className="text-[10px] text-gray-400 bg-gray-800/70 px-3 py-1 rounded-full">
                        {mockTeamsDetailed.find(t => t.id === driver.teamId)
                          ?.name || 'Team'}
                      </span>
                    </div>
                  )}

                  {/* Points (nếu có) */}
                  {points > 0 && (
                    <div className="mt-1">
                      <span className="text-xs font-bold text-red-400">
                        {points} PTS
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">
                Full Driver Standings
              </h4>
              <p className="text-sm text-gray-400">
                View complete championship standings and statistics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/drivers"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 font-bold text-xs flex items-center gap-2 overflow-hidden"
              >
                <span>View All Drivers</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamsContent = (dropdown: DropdownItem[]) => {
    const teams =
      dropdown.find(d => d.key === 'teams_grid')?.teams?.slice(0, 4) || [];
    if (teams.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Top Teams</h3>
            <p className="text-sm text-gray-400">
              2025 Constructor Championship
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {teams.length}
              </div>
              <div className="text-xs text-gray-400">Teams</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {teams.map((team: Team) => {
            return (
              <div key={team.id} className="text-center">
                {/* Team logo - DÙNG img TAG */}
                <Link
                  href={`/teams/${team.id}`}
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsHoveringDropdown(false);
                  }}
                  className="group relative block mb-4"
                >
                  <div
                    className="relative w-32 h-32 mx-auto rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${team.color}10, ${team.color}30)`,
                      border: `2px solid ${team.color}50`,
                    }}
                  >
                    {team.logo ? (
                      <div className="relative w-24 h-24">
                        <img
                          src={team.logo}
                          alt={`${team.name} logo`}
                          className="object-contain p-2 w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-white">
                        {team.name
                          .split(' ')
                          .map(w => w[0])
                          .join('')}
                      </div>
                    )}

                    {/* Hover effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                      style={{
                        background: `radial-gradient(circle at center, ${team.color}20 0%, transparent 70%)`,
                      }}
                    ></div>
                  </div>
                </Link>

                {/* Team name - ĐƠN GIẢN */}
                <div>
                  <Link
                    href={`/teams/${team.id}`}
                    onClick={() => {
                      setActiveDropdown(null);
                      setIsHoveringDropdown(false);
                    }}
                    className="group block"
                  >
                    <h4 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 text-sm mb-1">
                      {team.name}
                    </h4>
                    <p className="text-xs text-gray-400">{team.points} pts</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">
                Constructor Standings
              </h4>
              <p className="text-sm text-gray-400">
                View complete team standings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/teams"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 font-bold text-xs flex items-center gap-2 overflow-hidden"
              >
                <span>View All Teams</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsContent = (dropdown: DropdownItem[]) => {
    const news = dropdown[0]?.news?.slice(0, 5) || [];
    if (news.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Latest News</h3>
            <p className="text-sm text-gray-400">Breaking news and updates</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {news.length}
              </div>
              <div className="text-xs text-gray-400">Stories</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {news.map((item: News) => {
            return (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative flex flex-col rounded-xl border border-gray-700/50 hover:border-red-500/80 transition-all duration-300 overflow-hidden"
              >
                {/* News image - ĐƠN GIẢN */}
                <div className="h-32 relative overflow-hidden">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-gray-900/30">
                            <div class="text-3xl opacity-30">📰</div>
                          </div>
                        `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/10 via-gray-900/20 to-blue-900/10">
                      <div className="text-3xl opacity-30">📰</div>
                    </div>
                  )}

                  {/* Simple category badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-xs font-bold bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded">
                      {item.category || 'NEWS'}
                    </span>
                  </div>
                </div>

                {/* Chỉ hiển thị tiêu đề và ngày */}
                <div className="p-3 bg-gray-900/50 flex-1">
                  <h4 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 text-xs mb-1 line-clamp-2 leading-relaxed">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400">
                      {item.date || 'Recent'}
                    </span>
                    <span className="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">Full News Coverage</h4>
              <p className="text-sm text-gray-400">
                Read all the latest Formula 1 news
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/news"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 font-bold text-xs flex items-center gap-2 overflow-hidden"
              >
                <span>View All News</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAwardsContent = (dropdown: DropdownItem[]) => {
    const awards = dropdown[0]?.awards?.slice(0, 5) || [];
    if (awards.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Latest Awards</h3>
            <p className="text-sm text-gray-400">F1 Awards and Recognition</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {awards.length}
              </div>
              <div className="text-xs text-gray-400">Awards</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {awards.map((award: Award) => {
            return (
              <Link
                key={award.id}
                href={`/awards/${award.id}`}
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative flex flex-col items-center rounded-xl border border-gray-700/50 hover:border-yellow-500/80 transition-all duration-300 overflow-hidden bg-gray-900/50 p-4"
              >
                {/* Icon award thay vì ảnh */}
                <div className="relative mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 flex items-center justify-center border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-500">
                    <FaTrophy className="text-2xl text-yellow-400" />
                  </div>

                  {/* Year badge trên icon */}
                  <div className="absolute -top-1 -right-1 z-10">
                    <span className="text-[10px] font-bold bg-yellow-600 text-white px-2 py-0.5 rounded-full">
                      {award.year}
                    </span>
                  </div>
                </div>

                {/* Chỉ hiển thị category và winner */}
                <div className="text-center flex-1">
                  <h4 className="font-bold text-white text-sm line-clamp-2 mb-1">
                    {award.category}
                  </h4>

                  <h5 className="font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 text-xs line-clamp-1 mb-2">
                    {award.winner}
                  </h5>

                  {award.team && (
                    <p className="text-[10px] text-gray-400 mb-3">
                      {award.team}
                    </p>
                  )}

                  <div className="mt-3">
                    <span className="text-[10px] text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">F1 Awards Archive</h4>
              <p className="text-sm text-gray-400">
                View all awards and historical recognition
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/awards"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsHoveringDropdown(false);
                }}
                className="group relative bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-700 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 font-bold text-xs flex items-center gap-2 overflow-hidden"
              >
                <FaCrown className="text-xs" />
                <span>View All Awards</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabsContent = (item: NavItem) => {
    if (!item.dropdown) return null;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Results & Standings
            </h3>
            <p className="text-sm text-gray-400">
              2025 Championship Statistics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {mockDriversDetailed.length}
              </div>
              <div className="text-xs text-gray-400">Drivers</div>
            </div>
            <div className="h-8 w-px bg-gray-700/50"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {mockTeamsDetailed.length}
              </div>
              <div className="text-xs text-gray-400">Teams</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {item.dropdown.slice(0, 4).map((tab: DropdownItem) => (
            <Link
              key={tab.key}
              href={tab.href || '/'}
              onClick={() => {
                setActiveDropdown(null);
                setIsHoveringDropdown(false);
              }}
              className={`group relative p-4 rounded-xl text-center transition-all duration-500 hover:scale-[1.02] overflow-hidden border-2 ${
                tab.active
                  ? 'bg-gradient-to-r from-red-600/90 to-red-700/90 text-white border-red-600'
                  : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-gray-200 border-gray-700/50 hover:border-red-500'
              }`}
            >
              <div className="relative z-10">
                <div className="text-sm font-bold mb-2">{tab.label}</div>
                <div className="text-xs text-gray-300/70 mb-3">
                  View Details
                </div>
                <div
                  className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
                    tab.active
                      ? 'bg-white/20'
                      : 'bg-gray-700/50 group-hover:bg-red-600/20'
                  }`}
                >
                  {tab.active ? (
                    <FaTrophy className="text-lg text-yellow-300" />
                  ) : (
                    <FaChevronDown className="text-md text-gray-300 group-hover:text-red-300" />
                  )}
                </div>
              </div>
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
        content = renderTabsContent(item);
        break;
      default:
        return null;
    }

    return (
      <div
        className="nav-item-container fixed left-0 right-0 top-[6.5rem] bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 backdrop-blur-md border-t border-red-600 shadow-2xl z-30"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        ref={dropdownRef}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {item.icon && <item.icon className="text-red-500 text-lg" />}
              {item.label}
            </h3>
          </div>
          {content}
        </div>
      </div>
    );
  };

  // Cleanup effects và click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickInsideDropdown = dropdownRef.current?.contains(target);
      const isClickOnNavItem = target.closest('.nav-item-container');

      if (!isClickInsideDropdown && !isClickOnNavItem) {
        setActiveDropdown(null);
        setIsHoveringDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đóng dropdown khi route thay đổi
  useEffect(() => {
    setActiveDropdown(null);
    setIsHoveringDropdown(false);
  }, [pathname]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (comingSoonTimerRef.current) clearTimeout(comingSoonTimerRef.current);
      setActiveDropdown(null);
      setIsHoveringDropdown(false);
    };
  }, []);

  return (
    <>
      {/* 1. TOP BAR */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white text-xs border-b border-gray-800 transition-all duration-300 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            {/* Left side */}
            <div className="flex items-center space-x-6">
              <div className="text-gray-300 text-xs font-bold flex items-center gap-2 pr-4 border-r border-gray-700">
                <span className="text-red-600 font-bold">F1</span> 2025 SEASON
              </div>

              {TOP_NAV_ITEMS.map(
                ({ key, label, href, external, comingSoon, icon: Icon }) => {
                  if (comingSoon) {
                    return (
                      <button
                        key={key}
                        onClick={() => handleComingSoon(key)}
                        className="hidden md:flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-xs font-medium uppercase relative"
                      >
                        {Icon && <Icon className="text-xs" />}
                        {label}
                        <span className="text-[8px] text-yellow-500 absolute -top-1 -right-2">
                          ●
                        </span>
                      </button>
                    );
                  }

                  return external ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-medium uppercase"
                    >
                      {Icon && <Icon className="text-xs" />}
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={key}
                      href={href || '#'}
                      className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-medium uppercase"
                    >
                      {Icon && <Icon className="text-xs" />}
                      {label}
                    </Link>
                  );
                }
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/${locale}/f1tv`}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-1.5 rounded text-white font-bold text-xs transition-all duration-300 uppercase shadow-lg hover:shadow-red-900/30"
              >
                <FaPlay className="text-xs" />
                <span>F1 TV</span>
              </Link>

              <Link
                href="/subscribe"
                className="bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/50 hover:border-red-500 px-4 py-1.5 rounded text-red-300 hover:text-white font-bold text-xs transition-all duration-300 uppercase"
              >
                Subscribe
              </Link>

              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded border border-gray-700 text-xs hover:border-gray-600"
                >
                  <FaGlobe className="text-xs" />
                  <span>{currentLocaleOption?.flag}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${isLocaleDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isLocaleDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl py-2 min-w-[140px] z-50 backdrop-blur-sm">
                    {LOCALE_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChangeLocale(option.value as 'en' | 'vi')
                        }
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-3 transition-colors ${
                          locale === option.value
                            ? 'text-red-400 bg-gray-800'
                            : 'text-gray-300'
                        }`}
                      >
                        <span className="text-base">{option.flag}</span>
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

      {/* Coming Soon Notification */}
      {showComingSoon && (
        <div className="fixed top-20 right-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center gap-2">
            <FaClock className="text-sm" />
            <span className="text-sm font-medium">
              {TOP_NAV_ITEMS.find(item => item.key === showComingSoon)?.label} -
              Coming Soon!
            </span>
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 sticky top-10 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity duration-300 flex-shrink-0"
            >
              <div className="relative w-36 h-14">
                <Image
                  src={logoLight}
                  alt="Formula 1"
                  fill
                  className="object-contain dark:hidden"
                  priority
                  sizes="144px"
                />
                <Image
                  src={logoDark}
                  alt="Formula 1"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                  sizes="144px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {MAIN_NAV_ITEMS.map(
                ({ key, label, href, dropdown, icon: Icon }) => {
                  const isActive = isNavItemActive(href);
                  const isDropdownActive = activeDropdown === key;

                  return (
                    <div
                      key={key}
                      className="relative h-full flex items-center nav-item-container"
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center">
                        <Link
                          href={href}
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsHoveringDropdown(false);
                          }}
                          className={`flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 font-bold text-xs uppercase tracking-wide transition-all duration-300 py-6 border-b-2 ${
                            isActive || isDropdownActive
                              ? 'text-red-600 dark:text-red-400 border-red-600'
                              : 'text-gray-900 dark:text-gray-100 border-transparent hover:border-red-600'
                          }`}
                        >
                          {Icon && <Icon className="text-xs mr-1" />}
                          <span className="whitespace-nowrap">{label}</span>
                          {dropdown && (
                            <button
                              onClick={e => {
                                e.preventDefault();
                                handleNavItemClick(key);
                              }}
                              className="ml-1 focus:outline-none"
                            >
                              <FaChevronDown
                                className={`text-xs transition-transform duration-300 ${isDropdownActive ? 'rotate-180' : ''}`}
                              />
                            </button>
                          )}
                        </Link>
                      </div>

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
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100 p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-xs hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    <FaGlobe className="text-xs" />
                    <span>{currentLocaleOption?.flag}</span>
                  </button>
                </div>
                <ThemeToggle />
              </div>

              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
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
        <div className="lg:hidden fixed inset-0 top-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50 overflow-y-auto">
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
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-center py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-red-900/30"
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
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                          className={`flex-1 py-3 text-sm font-bold uppercase flex items-center gap-2 transition-colors ${
                            isActive
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400'
                          }`}
                        >
                          {Icon && <Icon className="text-xs" />}
                          <span className="whitespace-nowrap">{label}</span>
                        </Link>
                        {dropdown && (
                          <button
                            onClick={() =>
                              setMobileDropdownOpen(isOpen ? null : key)
                            }
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <FaChevronDown
                              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                              className="block py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
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
            </nav>

            {/* Top nav items in mobile */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase">
                Other Services
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TOP_NAV_ITEMS.map(
                  ({ key, label, href, external, comingSoon, icon: Icon }) => {
                    if (comingSoon) {
                      return (
                        <button
                          key={key}
                          onClick={() => handleComingSoon(key)}
                          className="flex items-center gap-2 justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-300 relative"
                        >
                          {Icon && <Icon className="text-xs" />}
                          <span className="whitespace-nowrap">{label}</span>
                          <span className="text-[6px] text-yellow-500 absolute top-1 right-1">
                            ●
                          </span>
                        </button>
                      );
                    }

                    return external ? (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg text-xs font-medium text-gray-900 dark:text-white transition-all duration-300"
                      >
                        {Icon && <Icon className="text-xs" />}
                        <span className="whitespace-nowrap">{label}</span>
                      </a>
                    ) : (
                      <Link
                        key={key}
                        href={href || '#'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg text-xs font-medium text-gray-900 dark:text-white transition-all duration-300"
                      >
                        {Icon && <Icon className="text-xs" />}
                        <span className="whitespace-nowrap">{label}</span>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
