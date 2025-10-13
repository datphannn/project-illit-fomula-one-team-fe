'use client';

import { useState, useMemo } from 'react';
import { Driver } from '@/lib/types/driver';
import { useRouter } from 'next/navigation';
import { mockDriversDetailed, mockTeamsDetailed } from '@/lib/api/mockData';

export default function DriversPage() {
  const router = useRouter();
  const [activeTeam, setActiveTeam] = useState('all');

  const handleDriverClick = (id: string) => {
    router.push(`/drivers/${id}`);
  };

  // Helper functions để lấy team info
  const getTeamColor = (teamId: string): string => {
    const team = mockTeamsDetailed.find(t => t.id === teamId);
    return team?.color || '#e10600';
  };

  const getTeamName = (teamId: string): string => {
    const team = mockTeamsDetailed.find(t => t.id === teamId);
    return team?.name || 'Unknown Team';
  };

  // Nhóm drivers theo team và sắp xếp theo điểm
  const driversByTeam = useMemo(() => {
    const teamsMap = new Map<string, Driver[]>();

    mockDriversDetailed.forEach(driver => {
      if (!teamsMap.has(driver.teamId)) {
        teamsMap.set(driver.teamId, []);
      }
      teamsMap.get(driver.teamId)!.push(driver);
    });

    // Sắp xếp drivers trong mỗi team theo points (cao nhất trước)
    teamsMap.forEach((drivers, teamId) => {
      drivers.sort(
        (a: Driver, b: Driver) =>
          (b.seasonStats?.seasonPoints || 0) -
          (a.seasonStats?.seasonPoints || 0)
      );
    });

    // Tạo teams với tổng điểm và sắp xếp
    const teamsWithPoints = Array.from(teamsMap.entries()).map(
      ([teamId, drivers]) => {
        const totalPoints = drivers.reduce(
          (sum: number, driver: Driver) =>
            sum + (driver.seasonStats?.seasonPoints || 0),
          0
        );
        return {
          teamId,
          teamName: getTeamName(teamId),
          teamColor: getTeamColor(teamId),
          drivers: drivers.slice(0, 2), // Chỉ lấy 2 drivers đầu tiên mỗi team
          totalPoints,
        };
      }
    );

    // Sắp xếp teams theo tổng điểm (cao nhất trước)
    return teamsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);
  }, []);

  // Lọc teams theo activeTeam
  const filteredTeams =
    activeTeam === 'all'
      ? driversByTeam
      : driversByTeam.filter(team => team.teamId === activeTeam);

  // Lấy danh sách teams để filter
  const teamOptions = [
    { id: 'all', label: 'All Teams' },
    ...mockTeamsDetailed.map(team => ({
      id: team.id,
      label: team.name,
    })),
  ];

  // Tính toán stats
  const activeDrivers = mockDriversDetailed.filter(
    d => d.currentStatus === 'active'
  ).length;

  const totalChampionships = mockDriversDetailed.reduce(
    (sum: number, d: Driver) => sum + (d.careerStats?.worldChampionships || 0),
    0
  );

  // Tính tổng điểm của tất cả drivers để xác định vị trí
  const allDriversSorted = useMemo(() => {
    return [...mockDriversDetailed]
      .filter(driver => driver.currentStatus === 'active')
      .sort(
        (a, b) =>
          (b.seasonStats?.seasonPoints || 0) -
          (a.seasonStats?.seasonPoints || 0)
      );
  }, []);

  const getDriverPosition = (driverId: string) => {
    const index = allDriversSorted.findIndex(driver => driver.id === driverId);
    return index >= 0 ? index + 1 : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f15] to-[#1a1a2e]">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              2025 F1 DRIVERS
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Complete lineup of Formula 1 drivers for the 2025 season. Teams
              are ranked by championship points.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {activeDrivers}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Drivers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {teamOptions.length - 1}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Teams
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {totalChampionships}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                World Titles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {allDriversSorted.reduce(
                  (sum, driver) =>
                    sum + (driver.seasonStats?.seasonPoints || 0),
                  0
                )}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Total Points
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Team Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-gray-400 text-sm font-semibold uppercase whitespace-nowrap">
              Filter teams:
            </span>
            <div className="flex gap-2 flex-wrap">
              {teamOptions.map(team => (
                <button
                  key={team.id}
                  onClick={() => setActiveTeam(team.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                    activeTeam === team.id
                      ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25'
                      : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-red-400 hover:text-white'
                  }`}
                >
                  {team.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-400">
            Showing{' '}
            <span className="text-white font-semibold">
              {filteredTeams.length}
            </span>{' '}
            team{filteredTeams.length !== 1 ? 's' : ''}
            {activeTeam !== 'all' && (
              <span>
                {' '}
                -{' '}
                <span className="text-red-500 font-semibold">
                  {getTeamName(activeTeam)}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div className="space-y-8">
            {filteredTeams.map((team, index) => (
              <div key={team.teamId} className="space-y-4">
                {/* Team Header với vị trí */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-400 w-8 text-center">
                        #{index + 1}
                      </div>
                      <div
                        className="w-3 h-12 rounded-full"
                        style={{ backgroundColor: team.teamColor }}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {team.teamName}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {team.totalPoints} points
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">Constructors</div>
                    <div className="text-white font-bold text-lg">
                      P{index + 1}
                    </div>
                  </div>
                </div>

                {/* Drivers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {team.drivers.map((driver: Driver) => {
                    const driverPosition = getDriverPosition(driver.id);
                    const seasonStats = driver.seasonStats;

                    return (
                      <div
                        key={driver.id}
                        onClick={() => handleDriverClick(driver.id)}
                        className="group cursor-pointer"
                      >
                        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl border border-gray-700/50 hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm overflow-hidden active:scale-95">
                          {/* Driver Header với vị trí */}
                          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold text-gray-400">
                                P{driverPosition || 'N/A'}
                              </div>
                              <div
                                className="w-2 h-8 rounded-full"
                                style={{ backgroundColor: team.teamColor }}
                              />
                            </div>
                            {seasonStats?.seasonPoints !== undefined && (
                              <div className="text-right">
                                <div className="text-gray-400 text-sm">
                                  Points
                                </div>
                                <div className="text-white font-bold text-lg">
                                  {seasonStats.seasonPoints}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Driver Content */}
                          <div className="p-4">
                            <div className="flex items-center gap-4">
                              {/* Driver Photo */}
                              <div className="flex-shrink-0">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
                                  <img
                                    src={driver.image}
                                    alt={driver.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Driver Info */}
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  {driver.number && (
                                    <span
                                      className="text-lg font-black"
                                      style={{ color: team.teamColor }}
                                    >
                                      #{driver.number}
                                    </span>
                                  )}
                                  <span className="text-white font-bold text-lg group-hover:text-red-500 transition-colors">
                                    {driver.name
                                      .split(' ')
                                      .pop()
                                      ?.toUpperCase()}
                                  </span>
                                </div>

                                <div className="text-gray-400 text-sm mb-2">
                                  {driver.name
                                    .split(' ')
                                    .slice(0, -1)
                                    .join(' ')}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  {driver.country && (
                                    <span>{driver.country}</span>
                                  )}
                                  {driver.nationalityFlag && (
                                    <span>{driver.nationalityFlag}</span>
                                  )}
                                  {seasonStats?.grandPrixWins !== undefined &&
                                    seasonStats.grandPrixWins > 0 && (
                                      <span className="text-yellow-500 font-semibold">
                                        {seasonStats.grandPrixWins} win
                                        {seasonStats.grandPrixWins > 1
                                          ? 's'
                                          : ''}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏎️</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">
                No Teams Found
              </h3>
              <p className="text-gray-400 mb-6">
                No teams found for the selected filter.
              </p>
              <button
                onClick={() => setActiveTeam('all')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                View All Teams
              </button>
            </div>
          </div>
        )}

        {/* Championship Info */}
        <div className="mt-16 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">
            2025 Formula 1 World Championship
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The 2025 FIA Formula One World Championship features 10 teams and 20
            drivers competing across the season. Teams compete in the
            Constructors' Championship while drivers battle for the Drivers'
            Championship.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Drivers' Championship</div>
              <div className="text-white font-semibold">
                {allDriversSorted[0]?.name || 'TBD'}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Constructors' Championship</div>
              <div className="text-white font-semibold">
                {driversByTeam[0]?.teamName || 'TBD'}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Total Points</div>
              <div className="text-white font-semibold">
                {allDriversSorted.reduce(
                  (sum, driver) =>
                    sum + (driver.seasonStats?.seasonPoints || 0),
                  0
                )}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Season</div>
              <div className="text-white font-semibold">2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
