// File: app/teams/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeamsSection from '@/components/TeamsSection';
import { mockTeamsDetailed } from '@/lib/api/mockData';
import { Trophy, Zap, Calendar } from 'lucide-react';

export default function TeamsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<
    'position' | 'points' | 'name' | 'championships'
  >('position');

  const handleTeamClick = (id: string) => {
    router.push(`/teams/${id}`);
  };

  // Helper functions để lấy dữ liệu từ stats
  const getRaceWins = (team: any): number => {
    return team.teamStats?.raceWins || team.seasonStats?.grandPrixWins || 0;
  };

  const getChampionships = (team: any): number => {
    return team.teamStats?.worldChampionships || 0;
  };

  // Sắp xếp teams
  const sortedTeams = [...mockTeamsDetailed].sort((a, b) => {
    if (sortBy === 'position') {
      return a.position - b.position;
    }
    if (sortBy === 'points') {
      return b.points - a.points;
    }
    if (sortBy === 'championships') {
      return getChampionships(b) - getChampionships(a);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Tính toán stats tổng
  const totalChampionships = mockTeamsDetailed.reduce(
    (sum, t) => sum + getChampionships(t),
    0
  );
  const totalWins = mockTeamsDetailed.reduce(
    (sum, t) => sum + getRaceWins(t),
    0
  );
  const totalPoints = mockTeamsDetailed.reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[450px] bg-gradient-to-br from-red-600 via-red-700 to-black overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
            }}
          />
        </div>

        {/* Team Logos Watermark */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="flex gap-8 animate-scroll whitespace-nowrap">
            {mockTeamsDetailed.map(team => (
              <img
                key={team.id}
                src={team.logo}
                alt={team.name}
                className="h-32 w-auto opacity-50"
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-red-100 text-sm font-semibold mb-4">
              {new Date().getFullYear()} CONSTRUCTOR STANDINGS
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">
            F1 TEAMS
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Meet the teams competing in the Formula 1 World Championship. From
            legendary names to ambitious newcomers.
          </p>

          {/* Stats Bar */}
          <div className="mt-8 flex gap-8">
            <div>
              <div className="text-4xl font-black text-white">
                {mockTeamsDetailed.length}
              </div>
              <div className="text-red-200 text-sm uppercase tracking-wide">
                Teams
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-white">
                {totalChampionships}
              </div>
              <div className="text-red-200 text-sm uppercase tracking-wide">
                Total Championships
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-white">{totalWins}</div>
              <div className="text-red-200 text-sm uppercase tracking-wide">
                Total Wins
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Championship Leader Highlight */}
        {sortedTeams[0] && (
          <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/30 to-gray-900 border-2 border-yellow-600/30">
            <div className="absolute top-0 right-0 text-yellow-600/10 text-[200px] font-black leading-none">
              #1
            </div>
            <div className="relative p-8 flex items-center gap-6">
              <Trophy className="w-16 h-16 text-yellow-500" />
              <div className="flex-1">
                <div className="text-yellow-500 text-sm font-bold uppercase mb-2">
                  Championship Leader
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {sortedTeams[0].name}
                </h2>
                <p className="text-gray-300">
                  Leading with{' '}
                  <span className="text-yellow-500 font-bold">
                    {sortedTeams[0].points} points
                  </span>
                  {sortedTeams[1] && (
                    <>
                      {' '}
                      — {sortedTeams[0].points - sortedTeams[1].points} points
                      ahead of {sortedTeams[1].name}
                    </>
                  )}
                </p>
              </div>
              <img
                src={sortedTeams[0].logo}
                alt={sortedTeams[0].name}
                className="h-24 w-auto opacity-80"
              />
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <span className="text-gray-400 text-sm font-semibold uppercase">
            Sort by:
          </span>
          <div className="flex gap-2 flex-wrap">
            {[
              {
                value: 'position',
                label: 'Championship Position',
                icon: Trophy,
              },
              { value: 'points', label: 'Points', icon: Zap },
              { value: 'championships', label: 'Championships', icon: Trophy },
              { value: 'name', label: 'Team Name', icon: null },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  sortBy === option.value
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {option.icon && <option.icon className="w-4 h-4" />}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Grid */}
        <TeamsSection teams={sortedTeams} onTeamClick={handleTeamClick} />

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold text-white">
                Constructor Championship
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The Constructors' Championship is awarded to the team that scores
              the most points throughout the season. Points are accumulated from
              both drivers' results in each Grand Prix.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold text-white">Team Evolution</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Formula 1 teams represent the pinnacle of motorsport engineering
              and strategy. Each team brings unique expertise, from aerodynamics
              to power unit development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
