// components/AwardSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/utils/locale';
import {
  FaTrophy,
  FaUser,
  FaUsers,
  FaStar,
  FaBolt,
  FaRocket,
  FaChevronRight,
  FaMedal,
  FaAward,
} from 'react-icons/fa';
import { mockAwards, mockAwardCategories } from '@/lib/api/mockData';
import { Award } from '@/lib/types/award';

export default function AwardSection() {
  const { locale } = useLocale() || { locale: 'en' };
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredAwards, setFilteredAwards] = useState<Award[]>([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Debug data
    console.log('AwardSection - Mock Awards:', mockAwards);
    console.log('AwardSection - Selected Category:', selectedCategory);

    let filtered = [];

    if (selectedCategory === 'all') {
      filtered = mockAwards
        .filter(award => award.year === currentYear)
        .slice(0, 6);
    } else {
      // Find category by ID and match with award category
      const category = mockAwardCategories.find(
        cat => cat.id === selectedCategory
      );
      if (category) {
        filtered = mockAwards
          .filter(
            award =>
              award.year === currentYear &&
              award.category.toLowerCase().includes(category.name.toLowerCase())
          )
          .slice(0, 6);
      } else {
        filtered = mockAwards
          .filter(award => award.year === currentYear)
          .slice(0, 6);
      }
    }

    console.log('AwardSection - Filtered Awards:', filtered);
    setFilteredAwards(filtered);
  }, [selectedCategory, currentYear]);

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

  // Fallback if no data
  if (mockAwards.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <FaTrophy className="text-6xl text-gray-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Awards Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay tuned for the {currentYear} season awards
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <FaTrophy className="text-4xl text-yellow-500 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                F1 Awards {currentYear}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              Celebrating excellence and outstanding achievements in the current
              season
            </p>
          </div>

          <Link
            href={`/${locale}/awards`}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
          >
            View All Awards
            <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105 border-2 border-red-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <FaAward className="text-yellow-500" />
            All Awards
          </button>
          {mockAwardCategories.slice(0, 5).map(cat => {
            const Icon = getCategoryIcon(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105 border-2 border-red-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Icon
                  className={`text-sm ${selectedCategory === cat.id ? 'text-yellow-300' : 'text-red-500'}`}
                />
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="sm:hidden text-lg">{cat.icon}</span>
              </button>
            );
          })}
        </div>

        {/* Awards Grid */}
        {filteredAwards.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <FaTrophy className="text-6xl text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              No Awards Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <FaAward />
              Show All Awards
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((award: Award) => {
              const Icon = getCategoryIcon(award.category);
              return (
                <Link
                  key={award.id}
                  href={`/${locale}/awards/${award.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2"
                >
                  {/* Award Header with Gradient */}
                  <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-6 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full opacity-10 -ml-12 -mb-12"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FaTrophy className="text-2xl text-yellow-300 drop-shadow-lg" />
                          <span className="text-xs font-bold text-white/90 uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                            {award.year}
                          </span>
                        </div>
                        <Icon className="text-3xl text-yellow-300 opacity-60 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-200 transition-colors">
                        {award.category}
                      </h3>
                    </div>
                  </div>

                  {/* Award Content */}
                  <div className="p-6">
                    {/* Winner Info */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMedal className="text-yellow-500 text-lg" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Winner
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1">
                        {award.winner}
                      </h4>
                      {award.team && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-2 mt-1">
                          <FaUsers className="text-xs" />
                          {award.team}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {award.description}
                    </p>

                    {/* Stats Grid */}
                    {award.stats && (
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {award.stats.wins !== undefined && (
                          <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-lg py-2 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                            <p className="text-xl font-bold text-red-600">
                              {award.stats.wins}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                              Wins
                            </p>
                          </div>
                        )}
                        {award.stats.podiums !== undefined && (
                          <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-lg py-2 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                            <p className="text-xl font-bold text-orange-600">
                              {award.stats.podiums}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                              Podiums
                            </p>
                          </div>
                        )}
                        {award.stats.points !== undefined && (
                          <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg py-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                            <p className="text-xl font-bold text-blue-600">
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

                  {/* View Details Footer */}
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-center font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-red-200 dark:border-red-800 group-hover:border-red-600">
                      View Details
                      <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300 dark:hover:border-red-700">
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaTrophy className="text-5xl text-yellow-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div className="text-left">
                <p className="text-gray-900 dark:text-white font-bold text-xl">
                  Explore Complete Award History
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Discover winners from previous seasons and legendary
                  achievements
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}/awards`}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-3 shadow-md hover:shadow-xl hover:scale-105 transform duration-200 whitespace-nowrap"
            >
              <FaTrophy className="text-lg" />
              Browse All Awards
              <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
