'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StoriesSection from '@/components/StoriesSection';
import NewsSection from '@/components/NewsSection';
import FantasySection from '@/components/FantasySection';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AIChatbox from '@/components/ui/AIChatbox';
import {
  mockRacesDetailed,
  mockNewsDetailed,
  mockTeamsDetailed,
  mockDriversDetailed,
  mockStoriesDetailed,
  mockVideosDetailed,
} from '@/lib/api/mockData';

export default function HomePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  const mockDrivers = mockDriversDetailed;
  const nextRace = mockRacesDetailed[0];

  // Navigation handlers
  const navigateToSchedule = () => router.push('/schedule');
  const navigateToFeedback = () => router.push('/feedback');
  const navigateToStandings = () => router.push('/drivers');
  const navigateToTeams = () => router.push('/teams');
  const navigateToDrivers = () => router.push('/drivers');
  const navigateToNews = () => router.push('/news');
  const navigateToVideos = () => router.push('/videos');
  const navigateToStories = () => router.push('/stories');
  const navigateToDriverDetail = (id: string) => router.push(`/drivers/${id}`);
  const navigateToVideoDetail = (id: string) => router.push(`/videos/${id}`);
  const navigateToTeamDetail = (id: string) => router.push(`/teams/${id}`);
  const navigateToRaceDetail = (id: string) => router.push(`/schedule/${id}`);

  // Component Drivers đơn giản
  const SimpleDriversGrid = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockDrivers.slice(0, 8).map((driver, index) => {
          const driverTeam = mockTeamsDetailed.find(team =>
            team.drivers.includes(driver.id)
          );

          return (
            <div
              key={driver.id}
              className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-red-500/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10 cursor-pointer group text-center ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => navigateToDriverDetail(driver.id)}
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 transition-all duration-500">
                  #{driver.number}
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
              </div>
              <h3 className="font-semibold text-base text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-1 mb-1">
                {driver.name.split(' ')[0]}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-1 mb-3 group-hover:text-gray-300 transition-colors duration-300">
                {driverTeam?.name || 'Unknown Team'}
              </p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xs bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-1.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                  P{driver.seasonStats?.seasonPosition || '-'}
                </span>
                <span className="text-xs bg-gradient-to-r from-red-600 to-red-700 px-3 py-1.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                  {driver.seasonStats?.seasonPoints || 0} PTS
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Component Teams đơn giản
  const SimpleTeamsGrid = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {mockTeamsDetailed.slice(0, 4).map((team, index) => (
          <div
            key={team.id}
            className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 hover:border-blue-500/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => navigateToTeamDetail(team.id)}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base border-2 border-white/20 transform group-hover:scale-110 transition-all duration-500 shadow-lg"
                  style={{ backgroundColor: team.color || '#3B82F6' }}
                >
                  {team.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')}
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 text-base mb-1">
                  {team.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  {team.base}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-1.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                    P{team.position}
                  </span>
                  <span className="text-xs bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                    {team.points} PTS
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Component Races đơn giản
  const SimpleRacesGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRacesDetailed.slice(0, 3).map((race, index) => (
          <div
            key={race.id}
            className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10 cursor-pointer group ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onClick={() => navigateToRaceDetail(race.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-500">
                  {race.flag}
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1 text-lg">
                    {race.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                    {race.circuit}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full transform transition-all duration-300 group-hover:scale-110 ${
                  race.status === 'upcoming'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    : race.status === 'live'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                }`}
              >
                {race.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-6 pt-4 border-t border-gray-700/50">
              <span className="text-gray-300 flex items-center gap-2">
                <span className="text-lg">📅</span>
                {race.date}
              </span>
              <span className="text-gray-400 flex items-center gap-2">
                <span className="text-lg">🏁</span>
                {race.laps} Laps
              </span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/0 via-green-600/10 to-green-600/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
          </div>
        ))}
      </div>
    );
  };

  // Nếu chưa phải client, hiển thị loading
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen overflow-hidden">
      {/* Hero Banner Section với parallax effect */}
      <section className="relative h-[70vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-10000 ease-out hover:scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&h=900&fit=crop')",
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"></div>
        </div>

        {/* Animated particles background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 text-sm font-bold mb-8 rounded-full shadow-lg shadow-red-900/30 transform hover:scale-105 transition-all duration-300 animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                {nextRace?.status === 'live'
                  ? 'LIVE COVERAGE NOW'
                  : 'UPCOMING RACE'}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient">
                {nextRace ? `${nextRace.name.toUpperCase()}` : 'F1 2025 SEASON'}
              </h1>
              <p className="text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                {nextRace
                  ? `Follow all the action from ${nextRace.circuit} and get ready for the season opener`
                  : 'Experience the thrill of speed, strategy, and glory'}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={navigateToSchedule}
                  className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-10 py-5 rounded-xl transform hover:scale-105 transition-all duration-500 shadow-2xl shadow-red-900/40 hover:shadow-red-900/60 font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10 text-2xl">▶️</span>
                  <span className="relative z-10">
                    {nextRace?.status === 'live'
                      ? 'WATCH LIVE NOW'
                      : 'VIEW FULL SCHEDULE'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <button
                  onClick={navigateToSchedule}
                  className="group relative border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 px-10 py-5 rounded-xl transition-all duration-500 hover:scale-105 text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10 text-2xl">📅</span>
                  <span className="relative z-10">FULL CALENDAR</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar với animation */}
      <section className="bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md border-y border-gray-800/50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: mockRacesDetailed.length,
                label: 'Races',
                color: 'from-red-600 to-red-700',
              },
              {
                value: mockTeamsDetailed.length,
                label: 'Teams',
                color: 'from-blue-600 to-blue-700',
              },
              {
                value: mockDriversDetailed.length,
                label: 'Drivers',
                color: 'from-green-600 to-green-700',
              },
              {
                value: 1,
                label: 'Champion',
                color: 'from-yellow-600 to-yellow-700',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  mounted
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-gradient`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                Latest Stories
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                Exclusive content and behind-the-scenes features from the world
                of Formula 1
              </p>
            </div>
            <button
              onClick={navigateToStories}
              className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center gap-3 overflow-hidden"
            >
              <span>View All Stories</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
          <StoriesSection stories={mockStoriesDetailed.slice(0, 4)} />
        </div>
      </section>

      {/* Spotlight Section với improved design */}
      <section className="py-20 bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-gray-950">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
            Spotlight
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Spotlight */}
            <div className="lg:col-span-2">
              <div
                className="group relative bg-gradient-to-br from-red-600/90 via-red-700/90 to-red-800/90 text-white p-10 rounded-3xl h-full transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-900/50 cursor-pointer overflow-hidden"
                onClick={navigateToSchedule}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white/20 rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white/20 rounded-full translate-x-24 translate-y-24"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
                          <span className="text-4xl">🏆</span>
                        </div>
                        <div className="absolute -inset-3 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
                      </div>
                      <div>
                        <div className="text-sm opacity-90 uppercase tracking-wider font-semibold">
                          NEXT RACE
                        </div>
                        <div className="text-3xl md:text-4xl font-black">
                          {nextRace?.name || 'Bahrain Grand Prix'}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-6">
                      GRAND PRIX WEEKEND
                    </h3>
                    <p className="text-xl mb-8 opacity-90 leading-relaxed">
                      {nextRace
                        ? `Season opener at ${nextRace.circuit} - Get ready for the ultimate racing experience`
                        : 'Season opener at Bahrain International Circuit'}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                        {nextRace?.date || 'March 1-3, 2025'}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                        {nextRace?.laps || 57} Laps
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full transform group-hover:scale-105 transition-all duration-300">
                        {nextRace?.time || '15:00 Local Time'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/20">
                    <button className="group/btn bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-500 font-bold text-lg transform hover:scale-105 shadow-lg">
                      <span className="flex items-center gap-3">
                        Race Details
                        <span className="transform group-hover/btn:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </span>
                    </button>
                    <div className="text-6xl md:text-7xl font-black opacity-20 group-hover:opacity-30 transition-opacity duration-700 transform group-hover:scale-110">
                      F1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Content với improved design */}
            <div className="space-y-6">
              <div
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-7 rounded-2xl transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-900/20 border border-gray-700/50 cursor-pointer overflow-hidden"
                onClick={navigateToDrivers}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
                        <span className="text-2xl">🏎️</span>
                      </div>
                      <div className="absolute -inset-3 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Driver Standings</h4>
                      <p className="text-gray-400 text-sm">
                        Current championship battle
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockDrivers.slice(0, 3).map((driver, index) => (
                      <div
                        key={driver.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-black w-6 text-red-500">
                            #{index + 1}
                          </span>
                          <div>
                            <span className="text-sm font-semibold">
                              {driver.name.split(' ')[0]}
                            </span>
                            <span className="text-xs text-gray-500 block">
                              {mockTeamsDetailed.find(t =>
                                t.drivers.includes(driver.id)
                              )?.name || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1.5 rounded-full font-semibold">
                          {driver.seasonStats?.seasonPoints || 0} PTS
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={navigateToDrivers}
                    className="w-full mt-6 text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-semibold py-3 flex items-center justify-center gap-2 group/link"
                  >
                    <span>View All Drivers</span>
                    <span className="transform group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>

              <div
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-7 rounded-2xl transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/20 border border-gray-700/50 cursor-pointer overflow-hidden"
                onClick={navigateToTeams}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Team Standings</h4>
                      <p className="text-gray-400 text-sm">
                        Constructor championship
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockTeamsDetailed.slice(0, 3).map((team, index) => (
                      <div
                        key={team.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-black w-6 text-blue-500">
                            #{index + 1}
                          </span>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: team.color || '#3B82F6',
                              }}
                            ></div>
                            <span className="text-sm font-semibold">
                              {team.name}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1.5 rounded-full font-semibold">
                          {team.points} PTS
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={navigateToTeams}
                    className="w-full mt-6 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-semibold py-3 flex items-center justify-center gap-2 group/link"
                  >
                    <span>View All Teams</span>
                    <span className="transform group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section với improved design */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-gradient">
                Latest News
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                Breaking news and official announcements from the world of
                Formula 1
              </p>
            </div>
            <button
              onClick={navigateToNews}
              className="group relative border-2 border-red-600/50 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm text-white hover:text-white hover:from-red-700/30 hover:to-red-800/30 transition-all duration-500 px-10 py-4 rounded-xl font-bold shadow-xl hover:shadow-red-900/50 hover:scale-105 text-lg flex items-center gap-3 overflow-hidden"
            >
              <span>View All News</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          {/* News Grid với improved animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNewsDetailed.slice(0, 6).map((news, index) => (
              <div
                key={news.id}
                className={`group relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-gray-900/90 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/70 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-900/20 cursor-pointer ${
                  mounted
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-px bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>

                <div className="relative z-10">
                  {/* Image với overlay gradient */}
                  <div className="relative h-56 overflow-hidden">
                    {news.image ? (
                      <>
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-900/30 via-gray-900/50 to-gray-900 flex items-center justify-center">
                        <div className="text-gray-600 text-7xl transform group-hover:scale-110 transition-transform duration-1000">
                          🏎️
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    {/* Badges */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transform group-hover:scale-105 transition-all duration-300">
                        {news.category || 'BREAKING'}
                      </span>
                      <span className="text-gray-400 text-xs font-medium">
                        {news.source || 'F1 Official'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors duration-500 line-clamp-2 leading-relaxed">
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-7 line-clamp-2 leading-relaxed">
                      {news.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📅</span>
                        <span className="font-medium">{news.date}</span>
                      </div>
                      <button className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-2 group/btn">
                        <span>Read more</span>
                        <span className="transform group-hover/btn:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </button>
                    </div>

                    {/* Author & Views */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/50 pt-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <span className="font-medium">{news.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👁️</span>
                        <span className="font-medium">{news.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Races Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-gray-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                Upcoming Races
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                Next events on the 2025 Formula 1 calendar
              </p>
            </div>
            <button
              onClick={navigateToSchedule}
              className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center gap-3 overflow-hidden"
            >
              <span>Full Schedule</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
          <SimpleRacesGrid />
        </div>
      </section>

      {/* Drivers & Teams Combined Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Drivers */}
            <div>
              <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                    2025 Drivers
                  </h2>
                  <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                    Meet the championship contenders of the 2025 season
                  </p>
                </div>
                <button
                  onClick={navigateToDrivers}
                  className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center gap-3 overflow-hidden"
                >
                  <span>View All</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
              <SimpleDriversGrid />
            </div>

            {/* Teams */}
            <div>
              <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                    2025 Teams
                  </h2>
                  <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                    Constructor championship standings and team details
                  </p>
                </div>
                <button
                  onClick={navigateToTeams}
                  className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center gap-3 overflow-hidden"
                >
                  <span>View All</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
              <SimpleTeamsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos Section với improved design */}
      <section className="py-20 bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-gray-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                Featured Videos
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                Highlights, interviews and analysis from the track
              </p>
            </div>
            <button
              onClick={navigateToVideos}
              className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center gap-3 overflow-hidden"
            >
              <span>View All Videos</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockVideosDetailed.slice(0, 4).map((video, index) => (
              <div
                key={video.id}
                className={`group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.05] hover:shadow-2xl hover:shadow-red-900/20 cursor-pointer border border-gray-700/50 ${
                  mounted
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => navigateToVideoDetail(video.id)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={
                      video.thumbnail ||
                      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=500'
                    }
                    alt={video.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl shadow-red-900/50">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-1.5 text-xs rounded-full text-white font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-4 text-white group-hover:text-red-400 transition-colors duration-500 line-clamp-2 leading-relaxed">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-sm flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {video.date}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/50 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🎥</span>
                      <span className="font-medium">
                        {video.category || 'Highlight'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">👁️</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-px bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fantasy & F1 Unlocked Combined Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800/90 to-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Fantasy Section */}
            <div>
              <FantasySection />
            </div>

            {/* F1 Unlocked với improved design */}
            <div className="group relative bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 rounded-3xl p-10 border border-purple-500/30 backdrop-blur-lg overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/30">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10 text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔓</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    F1 Unlocked
                  </h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                  Exclusive content and premium features for ultimate fans
                </p>
              </div>

              <div className="space-y-5 mb-10">
                {[
                  {
                    icon: '🎤',
                    title: 'Exclusive Interviews',
                    desc: 'Behind the scenes access',
                  },
                  {
                    icon: '📊',
                    title: 'Live Data',
                    desc: 'Real-time telemetry and analytics',
                  },
                  {
                    icon: '⭐',
                    title: 'Premium Content',
                    desc: 'Unlock all features',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group/feature flex items-center gap-5 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] border border-white/10 hover:border-purple-500/50"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0 transform group-hover/feature:scale-110 transition-all duration-500">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover/feature:text-purple-300 transition-colors duration-500">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400 group-hover/feature:text-gray-300 transition-colors duration-500">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="group/btn w-full relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white py-5 rounded-xl transition-all duration-500 hover:scale-105 font-bold text-lg flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-purple-900/40">
                <span className="relative z-10">🔓</span>
                <span className="relative z-10">Subscribe to Unlock</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Championship Standings Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                Championship Standings
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
                Current driver championship positions and points
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transform transition-all duration-700 hover:shadow-2xl hover:shadow-red-900/10">
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left py-5 px-7 text-gray-400 font-bold text-sm uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="text-left py-5 px-7 text-gray-400 font-bold text-sm uppercase tracking-wider">
                          Driver
                        </th>
                        <th className="text-left py-5 px-7 text-gray-400 font-bold text-sm uppercase tracking-wider">
                          Team
                        </th>
                        <th className="text-right py-5 px-7 text-gray-400 font-bold text-sm uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDrivers
                        .slice()
                        .sort((a, b) => {
                          const pointsA = a.seasonStats?.seasonPoints || 0;
                          const pointsB = b.seasonStats?.seasonPoints || 0;
                          return pointsB - pointsA;
                        })
                        .slice(0, 5)
                        .map((driver, index) => {
                          const driverTeam = mockTeamsDetailed.find(team =>
                            team.drivers.includes(driver.id)
                          );

                          return (
                            <tr
                              key={driver.id}
                              className="border-b border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group/row"
                              onClick={() => navigateToDriverDetail(driver.id)}
                            >
                              <td className="py-5 px-7 font-black text-2xl">
                                <div className="flex items-center gap-3">
                                  <span className="text-red-500">
                                    #{index + 1}
                                  </span>
                                  {index === 0 && (
                                    <span className="text-yellow-500 text-lg">
                                      👑
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-5 px-7 font-bold text-lg group-hover/row:text-red-400 transition-colors duration-300">
                                {driver.name}
                              </td>
                              <td className="py-5 px-7 text-gray-300">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor:
                                        driverTeam?.color || '#3B82F6',
                                    }}
                                  ></div>
                                  {driverTeam?.name || 'Unknown Team'}
                                </div>
                              </td>
                              <td className="py-5 px-7 text-right">
                                <span className="inline-block bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 px-5 py-2.5 rounded-full font-black text-lg">
                                  {driver.seasonStats?.seasonPoints || 0}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-10 text-center">
                  <button
                    onClick={navigateToStandings}
                    className="group relative border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-800/50 px-10 py-4 rounded-xl transition-all duration-500 hover:scale-105 font-medium text-lg flex items-center justify-center gap-3 mx-auto overflow-hidden"
                  >
                    <span>View Full Standings</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section với improved design */}
      <section className="relative py-24 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
            Help Shape the F1 Website
          </h2>
          <p className="text-2xl mb-14 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Your feedback is important to us. Share your thoughts and help
            improve your F1 experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={navigateToFeedback}
              className="group relative bg-white text-red-600 hover:bg-gray-100 font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-xl flex items-center justify-center gap-4 overflow-hidden"
            >
              <span className="relative z-10 text-2xl">📋</span>
              <span className="relative z-10">Take Our Survey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              onClick={navigateToFeedback}
              className="group relative border-2 border-white text-white hover:bg-white hover:text-red-600 px-12 py-6 rounded-2xl transition-all duration-500 hover:scale-105 text-xl flex items-center justify-center gap-4 overflow-hidden backdrop-blur-sm"
            >
              <span className="relative z-10 text-2xl">💬</span>
              <span className="relative z-10">Give Feedback</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Thêm vào CSS global hoặc trong component */}
      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>

      <AIChatbox />
    </main>
  );
}
