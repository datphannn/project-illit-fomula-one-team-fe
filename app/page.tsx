'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from '@/lib/utils/locale';
import { useRouter } from 'next/navigation';
import StoriesSection from '@/components/StoriesSection';
import NewsSection from '@/components/NewsSection';
import ScheduleSection from '@/components/ScheduleSection';
import DriversSection from '@/components/DriversSection';
import TeamsSection from '@/components/TeamsSection';
import FantasySection from '@/components/FantasySection';
import VideoPlayer from '@/components/ui/VideoPlayer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  mockRacesDetailed,
  mockNewsDetailed,
  mockTeamsDetailed,
  mockDriversDetailed,
  mockStoriesDetailed,
  mockVideosDetailed,
} from '@/lib/api/mockData';

export default function HomePage() {
  const t = useTranslations('main');
  const { locale } = useLocale();
  const router = useRouter();

  const mockDrivers = mockDriversDetailed;

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const navigateToSchedule = () => navigateTo('/schedule');
  const navigateToFeedback = () => navigateTo('/feedback');
  const navigateToStandings = () => navigateTo('/results');
  const navigateToTeams = () => navigateTo('/teams');
  const navigateToDrivers = () => navigateTo('/drivers');
  const navigateToNews = () => navigateTo('/news');
  const navigateToVideos = () => navigateTo('/videos');

  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('/assets/images/GettyImages-2222748122-1920x1080-Cropped.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold inline-block mb-6 rounded-full">
                🎯 LIVE COVERAGE
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
                All the build-up to the Bahrain GP
              </h1>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/30"
                onClick={navigateToSchedule}
              >
                🎬 Watch Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">📖 LATEST STORIES</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              onClick={() => navigateTo('/stories')}
            >
              View All →
            </Button>
          </div>
          <StoriesSection stories={mockStoriesDetailed} />
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">⭐ SPOTLIGHT</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              View All →
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Spotlight */}
            <div className="lg:col-span-2 group">
              <Card className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="text-5xl font-bold mb-4 text-white">
                      GRAND PRIX
                    </h3>
                    <p className="text-xl mb-6 opacity-90 text-white">
                      BAHRAIN 2025
                    </p>
                    <Button
                      variant="ghost"
                      className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-full transform hover:scale-105 transition-all"
                      onClick={navigateToSchedule}
                    >
                      Learn More →
                    </Button>
                  </div>
                  <div className="text-9xl font-bold opacity-20 group-hover:opacity-30 transition-opacity text-white">
                    F1
                  </div>
                </div>
              </Card>
            </div>

            {/* Side Content */}
            <div className="space-y-6">
              <Card className="bg-gray-800 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-red-500/50 border-2 border-transparent">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/images/driver-feature.jpg"
                    alt="Driver Feature"
                    className="w-full h-40 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <h4 className="font-bold text-lg mb-3 flex items-center text-white">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Driver Spotlight
                </h4>
                <p className="text-gray-300 text-sm">
                  Latest updates from the grid
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-red-400 hover:text-red-300 p-0"
                  onClick={navigateToDrivers}
                >
                  View Drivers →
                </Button>
              </Card>

              <Card className="bg-gray-800 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500/50 border-2 border-transparent">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/images/tech-feature.jpg"
                    alt="Tech Feature"
                    className="w-full h-40 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <h4 className="font-bold text-lg mb-3 flex items-center text-white">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Tech Analysis
                </h4>
                <p className="text-gray-300 text-sm">
                  Inside the latest innovations
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-blue-400 hover:text-blue-300 p-0"
                  onClick={() => navigateTo('/technology')}
                >
                  Learn More →
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">📰 LATEST NEWS</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={navigateToNews}
            >
              View All →
            </Button>
          </div>
          <NewsSection news={mockNewsDetailed.slice(0, 6)} />
        </div>
      </section>

      {/* Fantasy Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FantasySection />
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🎥 LATEST VIDEOS</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
              onClick={navigateToVideos}
            >
              View All →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockVideosDetailed.slice(0, 4).map(video => (
              <Card
                key={video.id}
                className="bg-gray-800 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
                onClick={() => navigateTo(`/videos/${video.id}`)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 px-3 py-1 text-xs rounded-full text-white">
                    ⏱️ {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold mb-3 text-sm line-clamp-2 group-hover:text-red-400 transition-colors text-white">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-xs flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {video.date}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🏎️ DRIVERS</h2>
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
              onClick={navigateToDrivers}
            >
              View All →
            </Button>
          </div>
          <DriversSection drivers={mockDrivers.slice(0, 8)} />
        </div>
      </section>

      {/* F1 Unlocked Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-white">
              🔓 F1 UNLOCKED
            </h2>
            <p className="text-xl mb-12 text-white/90">
              Get closer to the action with exclusive content, behind-the-scenes
              access, and more
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="bg-white/10 backdrop-blur-md p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">🎤</span>
                </div>
                <h3 className="font-bold text-lg mb-4 text-white">
                  EXCLUSIVE INTERVIEWS
                </h3>
                <p className="text-sm opacity-90 text-white">
                  Behind the scenes with drivers and teams
                </p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="font-bold text-lg mb-4 text-white">LIVE DATA</h3>
                <p className="text-sm opacity-90 text-white">
                  Real-time telemetry and statistics
                </p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">⭐</span>
                </div>
                <h3 className="font-bold text-lg mb-4 text-white">
                  PREMIUM CONTENT
                </h3>
                <p className="text-sm opacity-90 text-white">
                  Unlock premium features and content
                </p>
              </Card>
            </div>
            <Button
              variant="ghost"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 rounded-full transform hover:scale-105 transition-all duration-300 text-lg font-bold"
            >
              🚀 Subscribe Now
            </Button>
          </div>
        </div>
      </section>

      {/* 2025 Season Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🏁 2025 SEASON</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">RACE CALENDAR</h3>
              <p className="mb-6 opacity-90">24 races across the globe</p>
              <Button
                variant="ghost"
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-full w-full"
                onClick={navigateToSchedule}
              >
                View Schedule →
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">STANDINGS</h3>
              <p className="mb-6 opacity-90">Current championship positions</p>
              <Button
                variant="ghost"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full w-full"
                onClick={navigateToStandings}
              >
                View Results →
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">TEAMS</h3>
              <p className="mb-6 opacity-90">Meet the 2025 grid</p>
              <Button
                variant="ghost"
                className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full w-full"
                onClick={navigateToTeams}
              >
                View Teams →
              </Button>
            </Card>
          </div>

          {/* Championship Table Preview */}
          <Card className="bg-gray-800/50 backdrop-blur-md p-8 transform transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              CHAMPIONSHIP STANDINGS
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-4 text-gray-400">POS</th>
                    <th className="text-left py-4 text-gray-400">DRIVER</th>
                    <th className="text-left py-4 text-gray-400">TEAM</th>
                    <th className="text-right py-4 text-gray-400">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDrivers.slice(0, 5).map((driver, index) => {
                    const driverTeam = mockTeamsDetailed.find(team =>
                      team.drivers.includes(driver.id)
                    );

                    return (
                      <tr
                        key={driver.id}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={() => navigateTo(`/drivers/${driver.id}`)}
                      >
                        <td className="py-4 font-bold text-lg text-white">
                          {index + 1}
                        </td>
                        <td className="py-4 font-medium text-white">
                          {driver.name}
                        </td>
                        <td className="py-4 text-gray-300">
                          {driverTeam?.name || 'Unknown Team'}
                        </td>
                        <td className="py-4 text-right font-bold text-lg text-white">
                          {Math.floor(Math.random() * 100) + 50}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
                onClick={navigateToStandings}
              >
                View Full Standings →
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Help Shape F1 Website Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-white">
            💬 HELP SHAPE THE F1 WEBSITE
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-white/90">
            Your feedback helps us improve. Take our survey and let us know what
            you think.
          </p>
          <Button
            variant="ghost"
            className="bg-white text-red-600 hover:bg-gray-100 px-12 py-4 rounded-full transform hover:scale-105 transition-all duration-300 text-lg font-bold"
            onClick={navigateToFeedback}
          >
            📋 Take Survey
          </Button>
        </div>
      </section>
    </main>
  );
}
