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

  useEffect(() => {
    setIsClient(true);
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
        {mockDrivers.slice(0, 8).map(driver => {
          const driverTeam = mockTeamsDetailed.find(team =>
            team.drivers.includes(driver.id)
          );

          return (
            <div
              key={driver.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors duration-300 cursor-pointer group text-center"
              onClick={() => navigateToDriverDetail(driver.id)}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-base mx-auto mb-3">
                #{driver.number}
              </div>
              <h3 className="font-semibold text-sm text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-1 mb-1">
                {driver.name.split(' ')[0]}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-1 mb-2">
                {driverTeam?.name || 'Unknown Team'}
              </p>
              <div className="flex justify-center items-center gap-1">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  P{driver.seasonStats?.seasonPosition || '-'}
                </span>
                <span className="text-xs bg-red-600 px-2 py-1 rounded">
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
        {mockTeamsDetailed.slice(0, 4).map(team => (
          <div
            key={team.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300 cursor-pointer group"
            onClick={() => navigateToTeamDetail(team.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/20"
                style={{ backgroundColor: team.color || '#3B82F6' }}
              >
                {team.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 text-sm">
                  {team.name}
                </h3>
                <p className="text-xs text-gray-400 mb-1">{team.base}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    P{team.position}
                  </span>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
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
        {mockRacesDetailed.slice(0, 3).map(race => (
          <div
            key={race.id}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer group"
            onClick={() => navigateToRaceDetail(race.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-2xl mb-2">{race.flag}</div>
                <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1 text-lg">
                  {race.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{race.circuit}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  race.status === 'upcoming'
                    ? 'bg-green-600 text-white'
                    : race.status === 'live'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-600 text-white'
                }`}
              >
                {race.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-gray-700">
              <span className="text-gray-300">{race.date}</span>
              <span className="text-gray-400">{race.laps} Laps</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Nếu chưa phải client, hiển thị loading
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=1920')",
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm font-bold mb-6 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {nextRace?.status === 'live'
                  ? 'LIVE COVERAGE'
                  : 'UPCOMING RACE'}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                {nextRace
                  ? `All the build-up to the ${nextRace.name}`
                  : 'Welcome to F1 2025 Season'}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                {nextRace
                  ? `Follow all the action from ${nextRace.circuit} and get ready for the season opener`
                  : 'Follow all the action from the 2025 Formula 1 season'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={navigateToSchedule}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/30 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <span>🎬</span>
                  {nextRace?.status === 'live'
                    ? 'Watch Live Now'
                    : 'View Schedule'}
                </button>
                <button
                  onClick={navigateToSchedule}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 text-lg flex items-center justify-center gap-2"
                >
                  <span>📅</span>
                  Full Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-gray-900 border-y border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {mockRacesDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Races</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {mockTeamsDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {mockDriversDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-400">Champion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Latest Stories
              </h2>
              <p className="text-gray-400 text-lg">
                Exclusive content and behind-the-scenes features
              </p>
            </div>
            <button
              onClick={navigateToStories}
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium"
            >
              View All Stories
            </button>
          </div>
          <StoriesSection stories={mockStoriesDetailed.slice(0, 4)} />
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Spotlight
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Spotlight */}
            <div className="lg:col-span-2">
              <div
                className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-8 rounded-2xl h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group"
                onClick={navigateToSchedule}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🏆</span>
                      </div>
                      <div>
                        <div className="text-sm opacity-90 uppercase tracking-wider">
                          NEXT RACE
                        </div>
                        <div className="text-2xl md:text-3xl font-bold">
                          {nextRace?.name || 'Bahrain Grand Prix'}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      GRAND PRIX WEEKEND
                    </h3>
                    <p className="text-xl mb-6 opacity-90">
                      {nextRace
                        ? `Season opener at ${nextRace.circuit}`
                        : 'Season opener at Bahrain International Circuit'}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-white/20 px-4 py-2 rounded-full">
                        {nextRace?.date || 'March 1-3, 2025'}
                      </span>
                      <span className="bg-white/20 px-4 py-2 rounded-full">
                        {nextRace?.laps || 57} Laps
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/20">
                    <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg transition-all duration-300 font-semibold group-hover:translate-x-2">
                      Race Details →
                    </button>
                    <div className="text-5xl md:text-6xl font-bold opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      F1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Content */}
            <div className="space-y-6">
              <div
                className="bg-gray-800 p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700 cursor-pointer group"
                onClick={navigateToDrivers}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏎️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Driver Standings</h4>
                    <p className="text-gray-400 text-sm">
                      Current championship
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {mockDrivers.slice(0, 3).map((driver, index) => (
                    <div
                      key={driver.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold w-6">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium">
                          {driver.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-sm bg-gray-700 px-3 py-1 rounded">
                        {driver.seasonStats?.seasonPoints || 0} PTS
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={navigateToDrivers}
                  className="w-full mt-4 text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium py-2"
                >
                  View All Drivers →
                </button>
              </div>

              <div
                className="bg-gray-800 p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700 cursor-pointer group"
                onClick={navigateToTeams}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Team Standings</h4>
                    <p className="text-gray-400 text-sm">
                      Constructor championship
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {mockTeamsDetailed.slice(0, 3).map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold w-6">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium">{team.name}</span>
                      </div>
                      <span className="text-sm bg-gray-700 px-3 py-1 rounded">
                        {team.points} PTS
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={navigateToTeams}
                  className="w-full mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium py-2"
                >
                  View All Teams →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Latest News
              </h2>
              <p className="text-gray-400 text-lg">
                Breaking news and official announcements
              </p>
            </div>
            <button
              onClick={navigateToNews}
              className="border-2 border-red-600 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-red-900/50 hover:scale-105"
            >
              View All News →
            </button>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNewsDetailed.slice(0, 6).map(news => (
              <div
                key={news.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 group"
              >
                {/* Image placeholder with gradient overlay */}
                <div className="relative h-48 bg-gradient-to-br from-red-900/30 to-gray-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-6xl"></div>
                </div>

                <div className="p-6">
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                      {news.category || 'NEWS'}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {news.source || 'F1 Official'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {news.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{news.date}</span>
                    </div>
                    <button className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1 group/btn">
                      Read more
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                        ›
                      </span>
                    </button>
                  </div>

                  {/* Author & Views */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-1">
                      <span>👤</span>
                      <span>{news.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👁️</span>
                      <span>{news.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Races Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Upcoming Races
              </h2>
              <p className="text-gray-400 text-lg">
                Next events on the 2025 calendar
              </p>
            </div>
            <button
              onClick={navigateToSchedule}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium"
            >
              Full Schedule
            </button>
          </div>
          <SimpleRacesGrid />
        </div>
      </section>

      {/* Drivers & Teams Combined Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Drivers */}
            <div>
              <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    2025 Drivers
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Meet the championship contenders
                  </p>
                </div>
                <button
                  onClick={navigateToDrivers}
                  className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium"
                >
                  View All
                </button>
              </div>
              <SimpleDriversGrid />
            </div>

            {/* Teams */}
            <div>
              <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    2025 Teams
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Constructor championship standings
                  </p>
                </div>
                <button
                  onClick={navigateToTeams}
                  className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium"
                >
                  View All
                </button>
              </div>
              <SimpleTeamsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Featured Videos
              </h2>
              <p className="text-gray-400 text-lg">
                Highlights, interviews and analysis
              </p>
            </div>
            <button
              onClick={navigateToVideos}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 px-6 py-3 rounded-lg font-medium"
            >
              View All Videos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockVideosDetailed.slice(0, 4).map(video => (
              <div
                key={video.id}
                className="bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer border border-gray-700"
                onClick={() => navigateToVideoDetail(video.id)}
              >
                <div className="relative h-48">
                  <img
                    src={
                      video.thumbnail ||
                      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=500'
                    }
                    alt={video.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 px-3 py-1 text-xs rounded text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold mb-3 text-base line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    {video.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fantasy & F1 Unlocked Combined Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fantasy Section */}
            <div>
              <FantasySection />
            </div>

            {/* F1 Unlocked */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  F1 Unlocked
                </h2>
                <p className="text-gray-300 text-lg">
                  Exclusive content and premium features
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
                      Exclusive Interviews
                    </h4>
                    <p className="text-sm text-gray-400">
                      Behind the scenes access
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
                      Live Data
                    </h4>
                    <p className="text-sm text-gray-400">Real-time telemetry</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
                      Premium Content
                    </h4>
                    <p className="text-sm text-gray-400">Unlock all features</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg transition-all duration-300 hover:scale-105 font-semibold text-lg flex items-center justify-center gap-2">
                <span>🔓</span>
                Subscribe to Unlock
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Championship Standings Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Championship Standings
              </h2>
              <p className="text-gray-400 text-lg">
                Current driver championship positions
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                          Pos
                        </th>
                        <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                          Driver
                        </th>
                        <th className="text-left py-4 px-6 text-gray-400 font-semibold text-sm">
                          Team
                        </th>
                        <th className="text-right py-4 px-6 text-gray-400 font-semibold text-sm">
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
                              className="border-b border-gray-700 hover:bg-gray-750 transition-colors duration-300 cursor-pointer"
                              onClick={() => navigateToDriverDetail(driver.id)}
                            >
                              <td className="py-4 px-6 font-bold text-lg">
                                {index + 1}
                              </td>
                              <td className="py-4 px-6 font-medium">
                                {driver.name}
                              </td>
                              <td className="py-4 px-6 text-gray-300">
                                {driverTeam?.name || 'Unknown Team'}
                              </td>
                              <td className="py-4 px-6 text-right font-bold text-lg">
                                {driver.seasonStats?.seasonPoints || 0}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={navigateToStandings}
                    className="border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 px-8 py-3 rounded-lg font-medium"
                  >
                    View Full Standings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-orange-600">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Help Shape the F1 Website
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-white/90">
            Your feedback is important to us. Share your thoughts and help
            improve your F1 experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={navigateToFeedback}
              className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-2"
            >
              <span>📋</span>
              Take Our Survey
            </button>

            <button
              onClick={navigateToFeedback}
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg transition-all duration-300 text-lg flex items-center justify-center gap-2"
            >
              <span>💬</span>
              Give Feedback
            </button>
          </div>
        </div>
      </section>
      {/* Thêm Chatbox AI vào cuối trang */}
      <AIChatbox />
    </main>
  );
}
