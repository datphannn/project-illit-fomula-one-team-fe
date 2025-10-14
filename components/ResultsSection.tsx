'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/lib/utils/locale';
import {
  mockRacesByYear,
  mockRacesDetailed,
  mockDriversDetailed,
  mockTeamsDetailed,
  TEAM_COLORS,
  RACE_FLAGS,
} from '@/lib/api/mockData';

// 🏆 Hệ thống điểm F1 chuẩn
const F1_POINTS_SYSTEM: Record<number, number> = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
};

const ResultsSection: React.FC = () => {
  const t = useTranslations('results');
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'races' | 'drivers' | 'teams'>(
    'races'
  );
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRace, setSelectedRace] = useState<string>('');

  // 🎯 CHỌN DATA THEO NĂM
  const raceResults = useMemo(() => {
    if (selectedYear === 2025) {
      return mockRacesDetailed;
    } else {
      return mockRacesByYear[selectedYear] || [];
    }
  }, [selectedYear]);

  // 🎯 CHỌN DRIVERS & TEAMS THEO NĂM
  const { drivers, teams, useDetailedData } = useMemo(() => {
    if (selectedYear === 2025) {
      return {
        drivers: mockDriversDetailed,
        teams: mockTeamsDetailed,
        useDetailedData: true,
      };
    } else {
      // Tạo danh sách drivers và teams từ dữ liệu năm 2024
      const driverSet = new Set();
      const teamSet = new Set();

      mockRacesByYear[selectedYear]?.forEach(race => {
        if (race.winner) {
          driverSet.add(race.winner);
          teamSet.add(race.team);
        }
        if (race.results) {
          race.results.forEach(result => {
            driverSet.add(result.driver);
            teamSet.add(result.team);
          });
        }
      });

      return {
        drivers: Array.from(driverSet).map(name => ({
          id: String(name).toLowerCase().replace(' ', ''),
          name: String(name),
          teamId:
            String(name).includes('Verstappen') ||
            String(name).includes('Pérez')
              ? 'redbull'
              : String(name).includes('Leclerc') ||
                  String(name).includes('Sainz')
                ? 'ferrari'
                : String(name).includes('Hamilton') ||
                    String(name).includes('Russell')
                  ? 'mercedes'
                  : String(name).includes('Norris') ||
                      String(name).includes('Piastri')
                    ? 'mclaren'
                    : String(name).includes('Alonso') ||
                        String(name).includes('Stroll')
                      ? 'astonmartin'
                      : String(name).includes('Albon')
                        ? 'williams'
                        : String(name).includes('Tsunoda') ||
                            String(name).includes('Ricciardo')
                          ? 'rb'
                          : String(name).includes('Hülkenberg') ||
                              String(name).includes('Magnussen')
                            ? 'haas'
                            : String(name).includes('Gasly') ||
                                String(name).includes('Ocon')
                              ? 'alpine'
                              : 'unknown',
        })),
        teams: Array.from(teamSet).map(name => ({
          id: String(name)
            .toLowerCase()
            .replace(/[^a-z]/g, ''),
          name: String(name),
        })),
        useDetailedData: false,
      };
    }
  }, [selectedYear]);

  // Lấy danh sách các chặng đua đã hoàn thành
  const finishedRaces = useMemo(
    () => raceResults.filter(race => race.status === 'finished'),
    [raceResults]
  );

  // Chọn chặng đua đầu tiên làm mặc định
  React.useEffect(() => {
    if (finishedRaces.length > 0 && !selectedRace) {
      const firstRace = finishedRaces[0];
      setSelectedRace(
        'name' in firstRace ? firstRace.name : firstRace.grandPrix
      );
    }
  }, [finishedRaces, selectedRace]);

  /// 🏎️ DRIVER STANDINGS - Sử dụng trực tiếp từ mockDriversDetailed cho năm 2025
  const driverStandings = useMemo(() => {
    if (selectedYear === 2025) {
      // Năm 2025: dùng trực tiếp từ mockDriversDetailed
      return mockDriversDetailed
        .filter(driver => driver.currentStatus === 'active')
        .map(driver => {
          const seasonStats = driver.seasonStats;
          const team = mockTeamsDetailed.find(t => t.id === driver.teamId);

          return {
            position: seasonStats?.seasonPosition || 0,
            name: driver.name,
            team: team?.name || driver.teamId,
            points: seasonStats?.seasonPoints || 0,
            wins: seasonStats?.grandPrixWins || 0,
            fastestLaps: seasonStats?.dhlFastestLaps || 0,
            podiums: seasonStats?.grandPrixPodiums || 0,
            teamColor: team?.color,
          };
        })
        .sort((a, b) => b.points - a.points)
        .map((driver, index) => ({
          ...driver,
          position: index + 1,
        }));
    } else {
      // Các năm khác: tính toán từ kết quả các chặng đua (fallback)
      if (!drivers?.length) return [];

      const driverPointsMap = new Map();
      const driverWinsMap = new Map();
      const driverFastestLapsMap = new Map();

      // Tính điểm từ tất cả các chặng đua đã hoàn thành
      finishedRaces.forEach(race => {
        if ('results' in race && Array.isArray(race.results)) {
          // ✅ Data đầy đủ: Lấy điểm từ results
          race.results.forEach((result: any) => {
            const driverName = result.driverName || result.driver;
            if (!driverName) return;

            // Thêm điểm vị trí
            const positionPoints = F1_POINTS_SYSTEM[result.position] || 0;
            const currentPoints = driverPointsMap.get(driverName) || 0;
            driverPointsMap.set(driverName, currentPoints + positionPoints);

            // Đếm số chiến thắng
            if (result.position === 1) {
              driverWinsMap.set(
                driverName,
                (driverWinsMap.get(driverName) || 0) + 1
              );
            }

            // Thêm điểm fastest lap (nếu có và trong top 10)
            if (result.points > positionPoints && result.position <= 10) {
              driverFastestLapsMap.set(
                driverName,
                (driverFastestLapsMap.get(driverName) || 0) + 1
              );
            }
          });
        } else if (race.winner) {
          // ❌ Data thiếu: Chỉ có winner (FALLBACK)
          const currentPoints = driverPointsMap.get(race.winner) || 0;
          driverPointsMap.set(race.winner, currentPoints + 25);
          driverWinsMap.set(
            race.winner,
            (driverWinsMap.get(race.winner) || 0) + 1
          );
        }
      });

      const standings = Array.from(driverPointsMap, ([name, points]) => {
        const driver = drivers.find(d => d.name === name);
        const team =
          teams.find(t => t.id === driver?.teamId || t.name === driver?.teamId)
            ?.name || 'Unknown';
        const wins = driverWinsMap.get(name) || 0;
        const fastestLaps = driverFastestLapsMap.get(name) || 0;

        return {
          position: 0,
          name,
          team,
          points,
          wins,
          fastestLaps,
        };
      });

      return standings
        .sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return b.wins - a.wins;
        })
        .map((d, i) => ({ ...d, position: i + 1 }));
    }
  }, [finishedRaces, drivers, teams, selectedYear]);

  // 🏁 TEAM STANDINGS - Sử dụng trực tiếp từ mockTeamsDetailed cho năm 2025
  const teamStandings = useMemo(() => {
    if (selectedYear === 2025) {
      // Năm 2025: dùng trực tiếp từ mockTeamsDetailed
      return mockTeamsDetailed
        .map(team => ({
          id: team.id,
          name: team.name,
          points: team.points || 0,
          position: team.position || 0,
          wins: team.raceWins || 0,
          color: team.color,
        }))
        .sort((a, b) => b.points - a.points)
        .map((team, index) => ({
          ...team,
          position: index + 1,
        }));
    } else {
      // Các năm khác: tính toán từ driver standings (fallback)
      if (!teams?.length) return [];

      const teamPointsMap = new Map();
      const teamWinsMap = new Map();

      driverStandings.forEach(driver => {
        const currentPoints = teamPointsMap.get(driver.team) || 0;
        teamPointsMap.set(driver.team, currentPoints + driver.points);

        const currentWins = teamWinsMap.get(driver.team) || 0;
        teamWinsMap.set(driver.team, currentWins + driver.wins);
      });

      const standings = Array.from(teamPointsMap, ([name, points]) => {
        const team = teams.find(t => t.name === name);
        const mockTeam = mockTeamsDetailed.find(t => t.name === name);
        return {
          id: team?.id || name.toLowerCase(),
          name: name,
          points,
          position: 0,
          wins: teamWinsMap.get(name) || 0,
          color: mockTeam?.color || TEAM_COLORS[name] || '#666666',
        };
      });

      return standings
        .sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return b.wins - a.wins;
        })
        .map((t, i) => ({ ...t, position: i + 1 }));
    }
  }, [driverStandings, teams, selectedYear]);

  // 📊 RACE DETAILS - Chi tiết chặng đua được chọn
  const selectedRaceDetails = useMemo(() => {
    if (!selectedRace) return null;
    return raceResults.find(
      race => ('name' in race ? race.name : race.grandPrix) === selectedRace
    );
  }, [selectedRace, raceResults]);

  // Helper function để lấy kết quả đua
  const getRaceResults = useMemo(() => {
    if (!selectedRaceDetails) return [];

    // Dùng results từ mockRacesDetailed
    if (selectedRaceDetails.results && selectedRaceDetails.results.length > 0) {
      return selectedRaceDetails.results.map((result: any) => ({
        position: result.position,
        driver: result.driverName || result.driver,
        team: result.teamName || result.team,
        time: result.timeOrGap || result.time,
        points: result.points,
        status: result.status || 'Finished',
      }));
    }

    // Fallback: chỉ hiển thị winner
    if (selectedRaceDetails?.winner) {
      return [
        {
          position: 1,
          driver: selectedRaceDetails.winner,
          team: selectedRaceDetails.team || '',
          time: selectedRaceDetails.time || '',
          points: 25,
          status: 'Finished',
        },
      ];
    }

    return [];
  }, [selectedRaceDetails]);

  // 🎨 Helpers
  const getTeamColor = (teamNameOrObject?: string | any) => {
    if (!teamNameOrObject) return '#666666';

    // Nếu là team object từ mockTeamsDetailed
    if (typeof teamNameOrObject === 'object' && teamNameOrObject.color) {
      return teamNameOrObject.color;
    }

    // Nếu là team name
    const teamName =
      typeof teamNameOrObject === 'string' ? teamNameOrObject : '';
    const team = mockTeamsDetailed.find(t => t.name === teamName);
    return team?.color || TEAM_COLORS[teamName] || '#666666';
  };

  // Helper mới để lấy team từ driver
  const getDriverTeam = (driverName: string) => {
    const driver = mockDriversDetailed.find(d => d.name === driverName);
    if (!driver) return null;

    return mockTeamsDetailed.find(t => t.id === driver.teamId);
  };

  const getFlag = (gp: string) => RACE_FLAGS[gp] || '🏁';
  const getRaceName = (race: any) =>
    'name' in race ? race.name : race.grandPrix;

  // Helper để lấy distance từ race object
  const getRaceDistance = (race: any): string => {
    if ('distance' in race && race.distance) {
      return race.distance;
    }
    if ('race_distance' in race && race.race_distance) {
      return race.race_distance;
    }
    return 'N/A';
  };

  // Helper để lấy pole position time
  const getPoleTime = (race: any): string => {
    if (race.qualifying_time) return race.qualifying_time;
    if (race.pole_time) return race.pole_time;
    return 'N/A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm px-6 py-6 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Controls Row 1: Tabs & Year Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex space-x-6">
              {(['races', 'drivers', 'teams'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-2 font-semibold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-red-600'
                      : 'text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-gray-600'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer transition-all duration-200 hover:bg-gray-700"
            >
              <option value={2025}>2025</option>
              {Object.keys(mockRacesByYear)
                .map(Number)
                .filter(year => year !== 2025)
                .sort((a, b) => b - a)
                .map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>

          {/* Race Selector */}
          {activeTab === 'races' && finishedRaces.length > 0 && (
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-300 font-medium">
                Select Race:
              </label>
              <select
                value={selectedRace}
                onChange={e => setSelectedRace(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer transition-all duration-200 hover:bg-gray-700 flex-1 max-w-md"
              >
                {finishedRaces.map(race => (
                  <option key={getRaceName(race)} value={getRaceName(race)}>
                    {getRaceName(race)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab: Races */}
        {activeTab === 'races' && selectedRaceDetails && (
          <div className="space-y-8">
            {/* Race Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">
                    {getFlag(getRaceName(selectedRaceDetails))}
                  </span>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {getRaceName(selectedRaceDetails)}
                    </h1>
                    <p className="text-gray-300">
                      {new Date(selectedRaceDetails.date).toLocaleDateString(
                        locale,
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold cursor-default ${
                    selectedRaceDetails.status === 'finished'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 shadow-lg'
                  }`}
                >
                  {selectedRaceDetails.status.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Race Details */}
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                  <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
                    Race Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">
                        Winner
                      </p>
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-4 h-4 rounded-full shadow-md"
                          style={{
                            backgroundColor: getTeamColor(
                              getDriverTeam(selectedRaceDetails.winner || '')
                            ),
                          }}
                        />
                        <div>
                          <p className="font-bold text-lg text-white">
                            {selectedRaceDetails.winner || 'N/A'}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {selectedRaceDetails.team || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">
                        Pole Position
                      </p>
                      <div>
                        <p className="font-bold text-lg text-white">
                          {selectedRaceDetails.pole_sitter || 'N/A'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {getPoleTime(selectedRaceDetails)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">Laps</p>
                      <p className="font-bold text-lg text-white">
                        {selectedRaceDetails.laps || 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">
                        Distance
                      </p>
                      <p className="font-bold text-lg text-white">
                        {getRaceDistance(selectedRaceDetails)}
                      </p>
                    </div>
                    {selectedRaceDetails.fastest_lap_time && (
                      <div className="md:col-span-2 space-y-2">
                        <p className="text-gray-400 text-sm font-medium">
                          Fastest Lap
                        </p>
                        <p className="font-bold text-lg text-white">
                          {selectedRaceDetails.fastest_lap_time}
                        </p>
                      </div>
                    )}
                    {selectedRaceDetails.weather && (
                      <div className="md:col-span-2 space-y-2">
                        <p className="text-gray-400 text-sm font-medium">
                          Weather
                        </p>
                        <p className="font-bold text-lg text-white">
                          {selectedRaceDetails.weather}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* All Races Table */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                  <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
                    All Races - {selectedYear}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
                          <th className="text-left py-4 px-4 font-semibold">
                            GP
                          </th>
                          <th className="text-left py-4 px-4 font-semibold">
                            Date
                          </th>
                          <th className="text-left py-4 px-4 font-semibold">
                            Winner
                          </th>
                          <th className="text-left py-4 px-4 font-semibold">
                            Team
                          </th>
                          <th className="text-left py-4 px-4 font-semibold">
                            Laps
                          </th>
                          <th className="text-left py-4 px-4 font-semibold">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {finishedRaces.map(race => (
                          <tr
                            key={getRaceName(race)}
                            className="hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
                            onClick={() => setSelectedRace(getRaceName(race))}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">
                                  {getFlag(getRaceName(race))}
                                </span>
                                <span className="font-medium text-sm text-white">
                                  {getRaceName(race).split(' ')[0]}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">
                              {new Date(race.date).toLocaleDateString(locale, {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: getTeamColor(
                                      getDriverTeam(race.winner || '')
                                    ),
                                  }}
                                />
                                <span className="font-medium text-sm text-white">
                                  {race.winner?.split(' ')[1] ||
                                    race.winner ||
                                    'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">
                              {(race.team || '').split(' ')[0] || 'N/A'}
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">
                              {race.laps || 'N/A'}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-default ${
                                  race.status === 'finished'
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                }`}
                              >
                                {race.status === 'finished' ? 'FIN' : 'UP'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Race Standings */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
                  Race Results - {getRaceName(selectedRaceDetails)}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
                        <th className="text-left py-4 px-4 font-semibold">
                          Pos
                        </th>
                        <th className="text-left py-4 px-4 font-semibold">
                          Driver
                        </th>
                        <th className="text-left py-4 px-4 font-semibold">
                          Team
                        </th>
                        <th className="text-left py-4 px-4 font-semibold">
                          Time
                        </th>
                        <th className="text-left py-4 px-4 font-semibold">
                          Pts
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {getRaceResults.length > 0 ? (
                        getRaceResults.map((result: any) => (
                          <tr
                            key={`${result.driver}-${result.position}`}
                            className={`hover:bg-gray-800/50 transition-all duration-200 ${
                              result.status !== 'Finished' ? 'opacity-70' : ''
                            }`}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <span className="font-bold text-white">
                                  {result.position}
                                </span>
                                {result.position <= 3 &&
                                  result.status === 'Finished' && (
                                    <span className="text-xl">
                                      {result.position === 1
                                        ? '🥇'
                                        : result.position === 2
                                          ? '🥈'
                                          : '🥉'}
                                    </span>
                                  )}
                                {result.status !== 'Finished' && (
                                  <span className="text-red-400 text-xs font-semibold bg-red-500/20 px-2 py-1 rounded">
                                    DNF
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <span
                                  className="w-3 h-3 rounded-full shadow-md"
                                  style={{
                                    backgroundColor: getTeamColor(
                                      getDriverTeam(result.driver || '')
                                    ),
                                  }}
                                />
                                <span className="font-semibold text-white">
                                  {result.driver}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">
                              {result.team}
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm font-mono">
                              {result.time}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-bold text-lg text-white bg-gray-800 px-3 py-1.5 rounded-lg">
                                {result.points}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-8 text-center text-gray-400"
                          >
                            No race results available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Points System Info */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    Points System
                  </h4>
                  <div className="text-xs text-gray-400 space-y-2">
                    <p>
                      <span className="font-semibold text-white">P1: 25</span>,
                      P2: 18, P3: 15, P4: 12, P5: 10, P6: 8, P7: 6, P8: 4, P9:
                      2, P10: 1
                    </p>
                    <p className="text-yellow-400">
                      Fastest Lap: +1 point (only for top 10 finishers)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Drivers */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <EnhancedTable
              headers={['Pos', 'Driver', 'Team', 'Wins', 'FL', 'Points']}
              rows={driverStandings.map(d => [
                <div
                  key={`driver-pos-${d.name}`}
                  className="flex items-center space-x-3"
                >
                  <span className="font-bold text-lg text-white">
                    {d.position}
                  </span>
                  {d.position <= 3 && (
                    <span className="text-2xl">
                      {d.position === 1 ? '🥇' : d.position === 2 ? '🥈' : '🥉'}
                    </span>
                  )}
                </div>,
                <div
                  key={`driver-info-${d.name}`}
                  className="flex items-center space-x-3"
                >
                  <span
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{
                      backgroundColor: getTeamColor(getDriverTeam(d.name)),
                    }}
                  />
                  <span className="font-semibold text-white">{d.name}</span>
                </div>,
                <span key={`driver-team-${d.name}`} className="text-gray-300">
                  {d.team}
                </span>,
                <div key={`driver-wins-${d.name}`} className="text-center">
                  <span className="font-bold text-lg text-white bg-gray-800 px-3 py-1.5 rounded-lg">
                    {d.wins}
                  </span>
                </div>,
                <div key={`driver-fl-${d.name}`} className="text-center">
                  <span className="font-semibold text-yellow-400 bg-yellow-500/20 px-3 py-1.5 rounded-lg">
                    {d.fastestLaps}
                  </span>
                </div>,
                <div key={`driver-points-${d.name}`} className="text-center">
                  <span className="font-bold text-xl text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg shadow-lg">
                    {d.points}
                  </span>
                </div>,
              ])}
            />
          </div>
        )}

        {/* Tab: Teams */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <EnhancedTable
              headers={['Pos', 'Team', 'Wins', 'Points']}
              rows={teamStandings.map(t => [
                <div
                  key={`team-pos-${t.id}`}
                  className="flex items-center space-x-3"
                >
                  <span className="font-bold text-lg text-white">
                    {t.position}
                  </span>
                  {t.position <= 3 && (
                    <span className="text-2xl">
                      {t.position === 1 ? '🥇' : t.position === 2 ? '🥈' : '🥉'}
                    </span>
                  )}
                </div>,
                <div
                  key={`team-info-${t.id}`}
                  className="flex items-center space-x-3"
                >
                  <span
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{ backgroundColor: t.color || getTeamColor(t.name) }}
                  />
                  <span className="font-semibold text-white">{t.name}</span>
                </div>,
                <div key={`team-wins-${t.id}`} className="text-center">
                  <span className="font-bold text-lg text-white bg-gray-800 px-3 py-1.5 rounded-lg">
                    {t.wins}
                  </span>
                </div>,
                <div key={`team-points-${t.id}`} className="text-center">
                  <span className="font-bold text-xl text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg shadow-lg">
                    {t.points}
                  </span>
                </div>,
              ])}
            />
          </div>
        )}
      </main>
    </div>
  );
};

// Enhanced Table component với styling tốt hơn
interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const EnhancedTable: React.FC<TableProps> = ({ headers, rows }) => (
  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm uppercase tracking-wide border-b border-gray-700">
            {headers.map((h, index) => (
              <th
                key={`header-${index}`}
                className="text-left py-5 px-6 font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.length > 0 ? (
            rows.map((row, i) => (
              <tr
                key={`row-${i}`}
                className="hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
              >
                {row.map((cell, j) => (
                  <td key={`cell-${i}-${j}`} className="py-5 px-6">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-12 text-gray-400"
              >
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-4xl">🏎️</span>
                  <p className="text-lg">No data available</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ResultsSection;
