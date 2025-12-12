// app/[lang]/(routes)/awards/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaTrophy,
  FaUser,
  FaUsers,
  FaStar,
  FaBolt,
  FaRocket,
  FaArrowLeft,
  FaCalendar,
  FaMedal,
  FaCrown,
  FaChartLine,
  FaFlag,
  FaHistory,
  FaSpinner,
  FaAward,
  FaChevronRight,
} from 'react-icons/fa';
import { mockAwards, mockAwardCategories } from '@/lib/api/mockData';
import { Award } from '@/lib/types/award';

export default function AwardDetailPage({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const [award, setAward] = useState<Award | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedAwards, setRelatedAwards] = useState<Award[]>([]);

  useEffect(() => {
    // Simulate API call with slight delay for better UX
    const timer = setTimeout(() => {
      const foundAward = mockAwards.find(a => a.id === params.id);
      setAward(foundAward || null);

      // Get related awards
      if (foundAward) {
        const related = mockAwards
          .filter(a => a.id !== foundAward.id && a.year === foundAward.year)
          .slice(0, 3);
        setRelatedAwards(related);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id]);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative">
            <FaTrophy className="text-7xl text-yellow-500 mx-auto mb-6 opacity-80" />
            <FaSpinner className="text-3xl text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Loading Award Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Preparing something special for you...
          </p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!award) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="relative mb-6">
            <FaTrophy className="text-8xl text-gray-400 dark:text-gray-600 mx-auto opacity-50" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
              ❌
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Award Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            The award you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            ID: {params.id}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/awards`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft />
              Back to Awards
            </Link>
            <Link
              href={`/`}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = getCategoryIcon(award.category);

  // Find category info
  const categoryInfo = mockAwardCategories.find(cat =>
    award.category.toLowerCase().includes(cat.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[6.5rem] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/awards`}
              className="inline-flex items-center gap-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-lg" />
              <span className="text-lg">Back to Awards</span>
            </Link>

            {/* Quick Year Navigation */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">
                {award.year} Season
              </span>
              <Link
                href={`/awards?year=${award.year}`}
                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                View All {award.year} Awards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20 md:py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl opacity-5 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Year Badge */}
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/30">
                  <FaCalendar className="text-yellow-300 text-xl" />
                  <span className="font-bold text-xl">{award.year} Season</span>
                </div>

                {/* Category */}
                <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                  <Icon className="text-4xl text-yellow-300" />
                  <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                    {award.category}
                  </h1>
                </div>

                {/* Winner Badge */}
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full mb-6 shadow-2xl transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4">
                    <FaMedal className="text-2xl" />
                    <span className="text-2xl font-bold uppercase tracking-wide">
                      Winner
                    </span>
                    <FaCrown className="text-2xl" />
                  </div>
                </div>

                {/* Winner Name */}
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  {award.winner}
                </h2>

                {award.team && (
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <FaUsers className="text-2xl text-gray-200" />
                    <p className="text-2xl md:text-3xl text-gray-100 font-semibold">
                      {award.team}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Trophy */}
              <div className="flex-shrink-0">
                <div className="relative animate-bounce">
                  <FaTrophy className="text-8xl md:text-9xl text-yellow-300 drop-shadow-2xl" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                  <Icon className="text-3xl text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Achievement Details
                  </h3>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {award.description}
                </p>

                {/* Category Description */}
                {categoryInfo?.description && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                      <strong>About this category:</strong>{' '}
                      {categoryInfo.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Card */}
              {award.stats && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                    <FaChartLine className="text-3xl text-yellow-500" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Season Statistics
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {award.stats.wins !== undefined && (
                      <div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-6 rounded-xl text-center border-2 border-red-200 dark:border-red-700 overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 opacity-10">
                          <FaFlag className="text-6xl text-red-600" />
                        </div>
                        <div className="relative z-10">
                          <FaFlag className="text-3xl text-red-600 mx-auto mb-3" />
                          <div className="text-5xl font-bold text-red-600 mb-2">
                            {award.stats.wins}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-sm">
                            Race Wins
                          </div>
                        </div>
                      </div>
                    )}
                    {award.stats.podiums !== undefined && (
                      <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl text-center border-2 border-orange-200 dark:border-orange-700 overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 opacity-10">
                          <FaMedal className="text-6xl text-orange-600" />
                        </div>
                        <div className="relative z-10">
                          <FaMedal className="text-3xl text-orange-600 mx-auto mb-3" />
                          <div className="text-5xl font-bold text-orange-600 mb-2">
                            {award.stats.podiums}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-sm">
                            Podium Finishes
                          </div>
                        </div>
                      </div>
                    )}
                    {award.stats.points !== undefined && (
                      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl text-center border-2 border-blue-200 dark:border-blue-700 overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 opacity-10">
                          <FaTrophy className="text-6xl text-blue-600" />
                        </div>
                        <div className="relative z-10">
                          <FaTrophy className="text-3xl text-blue-600 mx-auto mb-3" />
                          <div className="text-5xl font-bold text-blue-600 mb-2">
                            {award.stats.points}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-sm">
                            Championship Points
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaAward className="text-yellow-300" />
                  Award Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span className="text-gray-200 text-sm">Season</span>
                    <span className="font-bold text-lg bg-white/20 px-3 py-1 rounded-full">
                      {award.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span className="text-gray-200 text-sm">Category</span>
                    <div className="flex items-center gap-2">
                      <Icon className="text-yellow-300 text-xl" />
                      <span className="font-bold">{award.category}</span>
                    </div>
                  </div>
                  {award.team && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-200 text-sm">Team</span>
                      <span className="font-bold bg-white/20 px-3 py-1 rounded-full">
                        {award.team}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaHistory className="text-red-600" />
                  Explore More
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`/awards?year=${award.year}`}
                    className="block bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800 transition-all group hover:border-red-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm block">
                          All {award.year} Awards
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Complete season awards
                        </span>
                      </div>
                      <FaChevronRight className="text-red-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  <Link
                    href={`/awards`}
                    className="block bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all group hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm block">
                          All Awards
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Browse all categories
                        </span>
                      </div>
                      <FaChevronRight className="text-gray-600 dark:text-gray-400 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-gray-900 shadow-xl">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <FaTrophy className="text-gray-900" />
                  Celebrate This Win!
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  Share this achievement with other F1 fans
                </p>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-colors text-sm">
                  Share Award
                </button>
              </div>
            </div>
          </div>

          {/* Related Awards */}
          {relatedAwards.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <FaTrophy className="text-yellow-500" />
                  Other {award.year} Awards
                </h3>
                <Link
                  href={`/awards?year=${award.year}`}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold flex items-center gap-2 transition-colors group"
                >
                  View All
                  <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedAwards.map(relatedAward => {
                  const RelatedIcon = getCategoryIcon(relatedAward.category);
                  return (
                    <Link
                      key={relatedAward.id}
                      href={`/awards/${relatedAward.id}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all overflow-hidden hover:shadow-xl hover:-translate-y-1 duration-300"
                    >
                      <div className="bg-gradient-to-br from-red-600 to-red-800 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FaTrophy className="text-yellow-300 text-lg" />
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wider bg-black/20 px-2 py-1 rounded">
                              {relatedAward.year}
                            </span>
                          </div>
                          <RelatedIcon className="text-yellow-200 text-xl" />
                        </div>
                        <h4 className="text-white font-bold text-base leading-tight">
                          {relatedAward.category}
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors text-lg mb-1">
                          {relatedAward.winner}
                        </p>
                        {relatedAward.team && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {relatedAward.team}
                          </p>
                        )}
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-red-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details
                            <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
