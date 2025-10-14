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
  const nextRace = mockRacesDetailed[0];
  const featuredVideo = mockVideosDetailed[0];
  const topDriver = mockDriversDetailed[0];
  const topTeam = mockTeamsDetailed[0];

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const navigateToSchedule = () => navigateTo('/schedule');
  const navigateToFeedback = () => navigateTo('/feedback');
  const navigateToStandings = () => navigateTo('/drivers');
  const navigateToTeams = () => navigateTo('/teams');
  const navigateToDrivers = () => navigateTo('/drivers');
  const navigateToNews = () => navigateTo('/news');
  const navigateToVideos = () => navigateTo('/videos');
  const navigateToStories = () => navigateTo('/stories');
  const navigateToTechnology = () => navigateTo('/technology');
  const navigateToDriverDetail = (id: string) => navigateTo(`/drivers/${id}`);
  const navigateToVideoDetail = (id: string) => navigateTo(`/videos/${id}`);
  const navigateToTeamDetail = (id: string) => navigateTo(`/teams/${id}`);
  const navigateToRaceDetail = (id: string) => navigateTo(`/schedule/${id}`);

  // Component Drivers đơn giản
  const SimpleDriversGrid = ({
    drivers,
  }: {
    drivers: typeof mockDriversDetailed;
  }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {drivers.slice(0, 8).map(driver => (
          <div
            key={driver.id}
            className="bg-gray-750 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-colors cursor-pointer group text-center"
            onClick={() => navigateToDriverDetail(driver.id)}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-base mx-auto mb-3">
              #{driver.number}
            </div>
            <h3 className="font-semibold text-sm text-white group-hover:text-red-400 transition-colors line-clamp-1 mb-1">
              {driver.name.split(' ')[0]}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1 mb-2">
              {driver.teamId}
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
        ))}
      </div>
    );
  };

  // Component Teams đơn giản
  const SimpleTeamsGrid = ({ teams }: { teams: typeof mockTeamsDetailed }) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {teams.slice(0, 4).map(team => (
          <div
            key={team.id}
            className="bg-gray-750 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer group"
            onClick={() => navigateToTeamDetail(team.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/20"
                style={{ backgroundColor: team.color }}
              >
                {team.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1 text-sm">
                  {team.name}
                </h3>
                <p className="text-xs text-gray-400 mb-1">
                  {team.base}, {team.base}
                </p>
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
  const SimpleRacesGrid = ({ races }: { races: typeof mockRacesDetailed }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.slice(0, 3).map(race => (
          <Card
            key={race.id}
            className="bg-gray-750 p-4 border border-gray-700 hover:border-green-500 transition-colors cursor-pointer group"
            onClick={() => navigateToRaceDetail(race.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl mb-1">{race.flag}</div>
                <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                  {race.name}
                </h3>
                <p className="text-xs text-gray-400">{race.circuit}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  race.status === 'upcoming'
                    ? 'bg-green-600 text-white'
                    : race.status === 'live'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-600 text-white'
                }`}
              >
                {race.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{race.date}</span>
              <span className="text-gray-400">{race.laps} Laps</span>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              "url('/assets/images/GettyImages-2222748122-1920x1080-Cropped.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm font-bold mb-6 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {nextRace?.status === 'live'
                  ? 'LIVE COVERAGE'
                  : 'UPCOMING RACE'}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {nextRace
                  ? `All the build-up to the ${nextRace.name}`
                  : 'Welcome to F1 2025 Season'}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                {nextRace
                  ? `Follow all the action from ${nextRace.circuit} and get ready for the season opener`
                  : 'Follow all the action from the 2025 Formula 1 season'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-600/30 font-semibold"
                  onClick={navigateToSchedule}
                >
                  🎬{' '}
                  {nextRace?.status === 'live'
                    ? 'Watch Live Now'
                    : 'View Schedule'}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-300"
                  onClick={navigateToSchedule}
                >
                  📅 Full Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockRacesDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Races</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockTeamsDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockDriversDetailed.length}
              </div>
              <div className="text-sm text-gray-400">Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-400">Champion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Stories</h2>
              <p className="text-gray-400">
                Exclusive content and behind-the-scenes features
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={navigateToStories}
            >
              View All Stories
            </Button>
          </div>
          <StoriesSection stories={mockStoriesDetailed.slice(0, 4)} />
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Spotlight</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Spotlight */}
            <div className="lg:col-span-2">
              <Card
                className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-8 h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group"
                onClick={navigateToSchedule}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <div className="text-sm opacity-90">NEXT RACE</div>
                        <div className="text-2xl font-bold">
                          {nextRace?.name || 'Bahrain Grand Prix'}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold mb-4">
                      GRAND PRIX WEEKEND
                    </h3>
                    <p className="text-xl mb-6 opacity-90">
                      {nextRace
                        ? `Season opener at ${nextRace.circuit}`
                        : 'Season opener at Bahrain International Circuit'}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        {nextRace?.date || 'March 1-3, 2025'}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        {nextRace?.laps || 57} Laps
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      variant="ghost"
                      className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg transition-all group-hover:translate-x-2"
                    >
                      Race Details →
                    </Button>
                    <div className="text-6xl font-bold opacity-20 group-hover:opacity-30 transition-opacity">
                      F1
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Side Content */}
            <div className="space-y-6">
              <Card
                className="bg-gray-750 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700 cursor-pointer group"
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
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold w-6">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium">
                          {driver.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                        {driver.seasonStats?.seasonPoints || 0} PTS
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-red-400 hover:text-red-300 justify-center"
                  onClick={navigateToDrivers}
                >
                  View All Drivers →
                </Button>
              </Card>

              <Card
                className="bg-gray-750 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700 cursor-pointer group"
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
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold w-6">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium">{team.name}</span>
                      </div>
                      <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                        {team.points} PTS
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-blue-400 hover:text-blue-300 justify-center"
                  onClick={navigateToTeams}
                >
                  View All Teams →
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest News</h2>
              <p className="text-gray-400">
                Breaking news and official announcements
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={navigateToNews}
            >
              View All News
            </Button>
          </div>
          <NewsSection news={mockNewsDetailed.slice(0, 6)} />
        </div>
      </section>

      {/* Upcoming Races Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Races</h2>
              <p className="text-gray-400">Next events on the 2025 calendar</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={navigateToSchedule}
            >
              Full Schedule
            </Button>
          </div>
          <SimpleRacesGrid races={mockRacesDetailed} />
        </div>
      </section>

      {/* Drivers & Teams Combined Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Drivers */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">2025 Drivers</h2>
                  <p className="text-gray-400">
                    Meet the championship contenders
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={navigateToDrivers}
                >
                  View All
                </Button>
              </div>
              <SimpleDriversGrid drivers={mockDriversDetailed} />
            </div>

            {/* Teams */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">2025 Teams</h2>
                  <p className="text-gray-400">
                    Constructor championship standings
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={navigateToTeams}
                >
                  View All
                </Button>
              </div>
              <SimpleTeamsGrid teams={mockTeamsDetailed} />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Videos</h2>
              <p className="text-gray-400">
                Highlights, interviews and analysis
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={navigateToVideos}
            >
              View All Videos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockVideosDetailed.slice(0, 4).map(video => (
              <Card
                key={video.id}
                className="bg-gray-750 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer border border-gray-700"
                onClick={() => navigateToVideoDetail(video.id)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 text-xs rounded text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2 text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
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

      {/* Fantasy & F1 Unlocked Combined Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fantasy Section */}
            <div>
              <FantasySection />
            </div>

            {/* F1 Unlocked */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">F1 Unlocked</h2>
                <p className="text-gray-300">
                  Exclusive content and premium features
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🎤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-300 transition-colors">
                      Exclusive Interviews
                    </h4>
                    <p className="text-sm text-gray-400">
                      Behind the scenes access
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-300 transition-colors">
                      Live Data
                    </h4>
                    <p className="text-sm text-gray-400">Real-time telemetry</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-300 transition-colors">
                      Premium Content
                    </h4>
                    <p className="text-sm text-gray-400">Unlock all features</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 font-semibold">
                🔓 Subscribe to Unlock
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Championship Standings Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Championship Standings
              </h2>
              <p className="text-gray-400">
                Current driver championship positions
              </p>
            </div>

            <Card className="bg-gray-800 border border-gray-700">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">
                          Pos
                        </th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">
                          Driver
                        </th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">
                          Team
                        </th>
                        <th className="text-right py-4 px-4 text-gray-400 font-semibold">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDrivers
                        .slice() // Tạo bản copy để không ảnh hưởng đến array gốc
                        .sort((a, b) => {
                          const pointsA = a.seasonStats?.seasonPoints || 0;
                          const pointsB = b.seasonStats?.seasonPoints || 0;
                          return pointsB - pointsA; // Sắp xếp giảm dần theo points
                        })
                        .slice(0, 5) // Lấy top 5
                        .map((driver, index) => {
                          const driverTeam = mockTeamsDetailed.find(team =>
                            team.drivers.includes(driver.id)
                          );

                          return (
                            <tr
                              key={driver.id}
                              className="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                              onClick={() => navigateToDriverDetail(driver.id)}
                            >
                              <td className="py-4 px-4 font-bold text-lg">
                                {index + 1}
                              </td>
                              <td className="py-4 px-4 font-medium">
                                {driver.name}
                              </td>
                              <td className="py-4 px-4 text-gray-300">
                                {driverTeam?.name || 'Unknown Team'}
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-lg">
                                {driver.seasonStats?.seasonPoints || 0}
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
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={navigateToStandings}
                  >
                    View Full Standings
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Help Shape the F1 Website
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-white/90">
            Your feedback is important to us. Share your thoughts and help
            improve your F1 experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:translate-y-[-3px] hover:shadow-lg transform transition-all duration-300 ease-in-out"
              onClick={navigateToFeedback}
            >
              📋 Take Our Survey
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg transition-all duration-300"
              onClick={navigateToFeedback}
            >
              💬 Give Feedback
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
