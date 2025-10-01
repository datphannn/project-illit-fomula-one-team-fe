'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/lib/utils/locale';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { Race } from '@/lib/types/race';
import {
  mockDriversSimple as mockDrivers,
  mockTeamsSimple as mockTeams,
} from '@/lib/api/mockData';

// Dữ liệu 2025 Race Results từ tài liệu
const raceResults2025 = [
  {
    grandPrix: 'Australia',
    date: '2025-03-16',
    winner: 'Lando Norris',
    team: 'McLaren',
    laps: 57,
    time: '1:42:06.304',
  },
  {
    grandPrix: 'China',
    date: '2025-03-23',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 56,
    time: '1:30:55.026',
  },
  {
    grandPrix: 'Japan',
    date: '2025-04-06',
    winner: 'Max Verstappen',
    team: 'Red Bull Racing',
    laps: 53,
    time: '1:22:06.983',
  },
  {
    grandPrix: 'Bahrain',
    date: '2025-04-13',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 57,
    time: '1:35:39.435',
  },
  {
    grandPrix: 'Saudi Arabia',
    date: '2025-04-20',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 50,
    time: '1:21:06.758',
  },
  {
    grandPrix: 'Miami',
    date: '2025-05-04',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 57,
    time: '1:28:51.587',
  },
  {
    grandPrix: 'Emilia-Romagna',
    date: '2025-05-18',
    winner: 'Max Verstappen',
    team: 'Red Bull Racing',
    laps: 63,
    time: '1:31:33.199',
  },
  {
    grandPrix: 'Monaco',
    date: '2025-05-25',
    winner: 'Lando Norris',
    team: 'McLaren',
    laps: 78,
    time: '1:40:33.843',
  },
  {
    grandPrix: 'Spain',
    date: '2025-06-01',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 66,
    time: '1:32:57.375',
  },
  {
    grandPrix: 'Canada',
    date: '2025-06-15',
    winner: 'George Russell',
    team: 'Mercedes',
    laps: 70,
    time: '1:31:52.688',
  },
  {
    grandPrix: 'Austria',
    date: '2025-06-29',
    winner: 'Lando Norris',
    team: 'McLaren',
    laps: 70,
    time: '1:23:47.693',
  },
  {
    grandPrix: 'Great Britain',
    date: '2025-07-06',
    winner: 'Lando Norris',
    team: 'McLaren',
    laps: 52,
    time: '1:37:15.735',
  },
  {
    grandPrix: 'Belgium',
    date: '2025-07-27',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 44,
    time: '1:25:22.601',
  },
  {
    grandPrix: 'Hungary',
    date: '2025-08-03',
    winner: 'Lando Norris',
    team: 'McLaren',
    laps: 70,
    time: '1:35:21.231',
  },
  {
    grandPrix: 'Netherlands',
    date: '2025-08-31',
    winner: 'Oscar Piastri',
    team: 'McLaren',
    laps: 72,
    time: '1:38:29.849',
  },
  {
    grandPrix: 'Italy',
    date: '2025-09-07',
    winner: 'Max Verstappen',
    team: 'Red Bull Racing',
    laps: 53,
    time: '1:13:24.325',
  },
  {
    grandPrix: 'Azerbaijan',
    date: '2025-09-21',
    winner: 'Max Verstappen',
    team: 'Red Bull Racing',
    laps: 51,
    time: '1:33:26.408',
  },
];

interface ResultsSectionProps {
  races: Race[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ races }) => {
  const t = useTranslations('results');
  const { locale } = useLocale();

  // Driver Standings (cập nhật điểm dựa trên race results)
  const mockDriverStandings = mockDrivers
    .map(driver => {
      const wins = raceResults2025.filter(r => r.winner === driver.name).length;
      const points = wins * 25 + (6 - mockDrivers.indexOf(driver)) * 10; // Giả lập điểm
      return {
        position: mockDrivers.indexOf(driver) + 1,
        name: driver.name,
        team:
          mockTeams.find(t => t.drivers.includes(driver.id))?.name || 'Unknown',
        points,
      };
    })
    .sort((a, b) => b.points - a.points);

  // Team Standings (cập nhật điểm dựa trên race results)
  const mockTeamStandings = mockTeams
    .map(team => {
      const teamWins = raceResults2025.filter(r => {
        const winnerDriver = mockDrivers.find(d => d.name === r.winner);
        // if winnerDriver is undefined, this race does not count for the team
        return winnerDriver ? team.drivers.includes(winnerDriver.id) : false;
      }).length;
      return {
        position: team.position,
        name: team.name,
        points: team.points + teamWins * 25, // Cộng điểm từ chiến thắng
      };
    })
    .sort((a, b) => a.position - b.position);

  // Race Results (dùng dữ liệu từ tài liệu)
  const mockRaceResults = raceResults2025.map((result, index) => ({
    position: index + 1,
    driver: result.winner,
    team: result.team,
    time: result.time,
  }));

  const [activeTab, setActiveTab] = useState<'drivers' | 'teams' | 'races'>(
    'races'
  );

  useEffect(() => {
    console.log('Active Tab:', activeTab, 'Race Results:', mockRaceResults);
  }, [activeTab, mockRaceResults]);

  const getCountryFlag = (raceName: string) => {
    const flags: { [key: string]: string } = {
      Australia: '🇦🇺',
      China: '🇨🇳',
      Japan: '🇯🇵',
      Bahrain: '🇧🇭',
      'Saudi Arabia': '🇸🇦',
      Miami: '🇺🇸',
      Monaco: '🇲🇨',
      Spain: '🇪🇸',
      Canada: '🇨🇦',
      Austria: '🇦🇹',
      'Great Britain': '🇬🇧',
      Belgium: '🇧🇪',
      Hungary: '🇭🇺',
      Netherlands: '🇳🇱',
      Italy: '🇮🇹',
      Azerbaijan: '🇦🇿',
    };
    return flags[raceName] || '🏁';
  };

  const getTeamColor = (team: string) => {
    const colors: { [key: string]: string } = {
      McLaren: 'bg-orange-500',
      'Red Bull Racing': 'bg-blue-600',
      Mercedes: 'bg-cyan-400',
      Ferrari: 'bg-red-600',
      'Aston Martin': 'bg-green-500',
      Alpine: 'bg-pink-500',
    };
    return colors[team] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-800">
            <button
              className={`pb-4 px-2 font-medium text-sm uppercase tracking-wide ${
                activeTab === 'races'
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-gray-200'
              } transition-colors`}
              onClick={() => setActiveTab('races')}
            >
              RACES
            </button>
            <button
              className={`pb-4 px-2 font-medium text-sm uppercase tracking-wide ${
                activeTab === 'drivers'
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-gray-200'
              } transition-colors`}
              onClick={() => setActiveTab('drivers')}
            >
              DRIVERS
            </button>
            <button
              className={`pb-4 px-2 font-medium text-sm uppercase tracking-wide ${
                activeTab === 'teams'
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-gray-200'
              } transition-colors`}
              onClick={() => setActiveTab('teams')}
            >
              TEAMS
            </button>
            <button className="pb-4 px-2 font-medium text-sm uppercase tracking-wide text-gray-400 hover:text-gray-200 transition-colors">
              AWARDS
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">2025 RACE RESULTS</h1>
          {activeTab === 'races' && (
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors">
              All
            </button>
          )}
        </div>

        {/* Race Results */}
        {activeTab === 'races' && (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
                    <th className="text-left py-4 px-6 font-medium">
                      Grand Prix
                    </th>
                    <th className="text-left py-4 px-6 font-medium">Date</th>
                    <th className="text-left py-4 px-6 font-medium">Winner</th>
                    <th className="text-left py-4 px-6 font-medium">Team</th>
                    <th className="text-left py-4 px-6 font-medium">Laps</th>
                    <th className="text-left py-4 px-6 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {mockRaceResults.map((result, index) => (
                    <tr
                      key={`${result.driver}-${result.position}`}
                      className="hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">
                            {getCountryFlag(raceResults2025[index].grandPrix)}
                          </span>
                          <span className="font-medium">
                            {raceResults2025[index].grandPrix}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {new Date(
                          raceResults2025[index].date
                        ).toLocaleDateString(locale, {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getTeamColor(result.team)}`}
                          ></div>
                          <span className="font-medium">{result.driver}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getTeamColor(result.team)}`}
                          ></div>
                          <span>{result.team}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {raceResults2025[index].laps}
                      </td>
                      <td className="py-4 px-6 text-gray-300">{result.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Driver Standings */}
        {activeTab === 'drivers' && (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
                    <th className="text-left py-4 px-6 font-medium">
                      POSITION
                    </th>
                    <th className="text-left py-4 px-6 font-medium">DRIVER</th>
                    <th className="text-left py-4 px-6 font-medium">TEAM</th>
                    <th className="text-left py-4 px-6 font-medium">POINTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {mockDriverStandings.map(driver => (
                    <tr
                      key={driver.name}
                      className="hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-lg">
                        {driver.position}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getTeamColor(driver.team)}`}
                          ></div>
                          <span className="font-medium">{driver.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{driver.team}</td>
                      <td className="py-4 px-6 font-bold">{driver.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Standings */}
        {activeTab === 'teams' && (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
                    <th className="text-left py-4 px-6 font-medium">
                      POSITION
                    </th>
                    <th className="text-left py-4 px-6 font-medium">TEAM</th>
                    <th className="text-left py-4 px-6 font-medium">POINTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {mockTeamStandings.map(team => (
                    <tr
                      key={team.name}
                      className="hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-lg">
                        {team.position}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getTeamColor(team.name)}`}
                          ></div>
                          <span className="font-medium">{team.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSection;
