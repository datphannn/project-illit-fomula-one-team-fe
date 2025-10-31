// app/[lang]/(routes)/awards/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaTrophy,
  FaUser,
  FaUsers,
  FaStar,
  FaBolt,
  FaRocket,
  FaFilter,
  FaChevronDown,
  FaMedal,
  FaAward,
  FaCrown,
  FaHistory,
  FaCalendar,
  FaChevronRight,
} from 'react-icons/fa';
import { mockAwards, mockAwardCategories } from '@/lib/api/mockData';
import { Award, AwardFilter } from '@/lib/types/award';

export default function AwardsPage() {
  const [locale, setLocale] = useState('en');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedCategory, setSelectedCategory] = useState<AwardFilter>('all');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  useEffect(() => {
    // Get locale from pathname
    const pathLocale = window.location.pathname.split('/')[1];
    if (pathLocale === 'en' || pathLocale === 'vi') {
      setLocale(pathLocale);
    }
  }, []);

  // Debug data
  useEffect(() => {
    console.log('Mock Awards:', mockAwards);
    console.log('Selected Year:', selectedYear);
    console.log('Selected Category:', selectedCategory);
    console.log('Filtered Awards:', filteredAwards);
  }, [selectedYear, selectedCategory]);

  // Get unique years
  const years = Array.from(new Set(mockAwards.map(award => award.year))).sort(
    (a, b) => b - a
  );

  // Filter awards - FIXED VERSION
  const filteredAwards = mockAwards.filter(award => {
    const yearMatch = award.year === selectedYear;

    if (selectedCategory === 'all') {
      return yearMatch;
    }

    // Find category by ID and compare with award category
    const category = mockAwardCategories.find(
      cat => cat.id === selectedCategory
    );
    if (!category) return yearMatch;

    // Compare category names
    const categoryMatch = award.category
      .toLowerCase()
      .includes(category.name.toLowerCase());
    return yearMatch && categoryMatch;
  });

  // Fallback if no mock data
  if (mockAwards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaTrophy className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Data Not Available
          </h2>
          <p className="text-gray-500">
            Awards data is currently being updated.
          </p>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('driver') && !lowerCategory.includes('rookie'))
      return FaUser;
    if (lowerCategory.includes('team')) return FaUsers;
    if (lowerCategory.includes('rookie')) return FaStar;
    if (lowerCategory.includes('overtake')) return FaRocket;
    if (lowerCategory.includes('action')) return FaBolt;
    return FaTrophy;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.year-dropdown')) {
        setIsYearDropdownOpen(false);
      }
    };

    if (isYearDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isYearDropdownOpen]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Animation */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <FaTrophy className="text-6xl text-yellow-300 drop-shadow-2xl animate-bounce" />
              <FaCrown className="text-5xl text-yellow-400 drop-shadow-2xl animate-bounce delay-100" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              F1 Awards
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Celebrating excellence in Formula 1 - honoring the best drivers,
              teams, and unforgettable moments of the season
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section - Sticky */}
      <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 sticky top-[6.5rem] z-30 shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Year Filter */}
            <div className="flex items-center gap-4 year-dropdown">
              <FaHistory className="text-red-600 text-xl" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Season:
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                >
                  <FaCalendar />
                  <span className="text-lg">{selectedYear}</span>
                  <FaChevronDown
                    className={`text-sm transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isYearDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl py-2 min-w-[140px] z-40">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsYearDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                          selectedYear === year
                            ? 'text-red-600 bg-red-50 dark:bg-red-900/20 font-bold border-l-4 border-red-600'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <FaTrophy
                          className={
                            selectedYear === year
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <FaFilter className="inline mr-2" />
                All Awards
              </button>
              {mockAwardCategories.map(cat => {
                const Icon = getCategoryIcon(cat.name);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as AwardFilter)}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 shadow-md hover:shadow-lg ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span className="hidden md:inline">{cat.name}</span>
                    <span className="md:hidden text-lg">{cat.icon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredAwards.length === 0 ? (
          <div className="text-center py-20">
            <FaTrophy className="text-7xl text-gray-300 dark:text-gray-700 mx-auto mb-6 opacity-50" />
            <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              No Awards Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Try selecting a different year or category
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedYear(2024);
                  setSelectedCategory('all');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => console.log('Mock Data:', mockAwards)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Debug Data
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedYear} Season Awards
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredAwards.length} award
                  {filteredAwards.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAwards.map(award => {
                const Icon = getCategoryIcon(award.category);
                return (
                  <Link
                    key={award.id}
                    href={`/${locale}/awards/${award.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2"
                  >
                    {/* Award Header */}
                    <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full opacity-10 -ml-12 -mb-12"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FaTrophy className="text-3xl text-yellow-300 drop-shadow-lg" />
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                              {award.year}
                            </span>
                          </div>
                          <Icon className="text-4xl text-yellow-300 opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {award.category}
                        </h3>
                      </div>
                    </div>

                    {/* Award Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaMedal className="text-yellow-500 text-xl" />
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Winner
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1">
                          {award.winner}
                        </h4>
                        {award.team && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-2">
                            <FaUsers className="text-xs" />
                            {award.team}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {award.description}
                      </p>

                      {/* Stats */}
                      {award.stats && (
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                          {award.stats.wins !== undefined && (
                            <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-lg py-2">
                              <p className="text-2xl font-bold text-red-600">
                                {award.stats.wins}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Wins
                              </p>
                            </div>
                          )}
                          {award.stats.podiums !== undefined && (
                            <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-lg py-2">
                              <p className="text-2xl font-bold text-orange-600">
                                {award.stats.podiums}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Podiums
                              </p>
                            </div>
                          )}
                          {award.stats.points !== undefined && (
                            <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg py-2">
                              <p className="text-2xl font-bold text-blue-600">
                                {award.stats.points}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Points
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="px-6 pb-6">
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-center font-bold text-sm group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                        View Details
                        <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Categories Info Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-16 border-t-2 border-gray-300 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Award Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Recognizing excellence across multiple categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mockAwardCategories.map(category => {
              const Icon = getCategoryIcon(category.name);
              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 transition-all hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
                  onClick={() =>
                    setSelectedCategory(category.id as AwardFilter)
                  }
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <Icon className="text-3xl text-red-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hall of Fame Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaCrown className="text-5xl text-yellow-500 animate-pulse" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Hall of Fame
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Legendary champions and record-breaking achievements throughout F1
              history
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/awards/hall-of-fame`}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FaCrown />
                Explore Hall of Fame
              </Link>
              <Link
                href={`/${locale}/awards/records`}
                className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2"
              >
                <FaHistory />
                View Records
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
