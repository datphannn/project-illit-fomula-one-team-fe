'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/lib/utils/locale';
import {
  mockDriversSimple as mockDrivers,
  mockTeamsSimple as mockTeams,
  mockRacesByYear,
  TEAM_COLORS,
  RACE_FLAGS,
} from '@/lib/api/mockData';
import type { Race } from '@/lib/types/race';

interface ResultsSectionProps {
  initialYear?: number;
  races: Race[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  initialYear = 2025,
  races,
}) => {
  const t = useTranslations('results');
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<'races' | 'drivers' | 'teams'>(
    'races'
  );
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const raceResults = mockRacesByYear[selectedYear] ?? [];

  // 🏎️ DRIVER STANDINGS - Fixed Logic
  const driverStandings = useMemo(() => {
    if (!mockDrivers?.length) return [];

    // Calculate points for each driver
    const standings = mockDrivers.map(driver => {
      const wins = raceResults.filter(r => r.winner === driver.name).length;
      const team =
        mockTeams.find(t => t.drivers.includes(driver.id))?.name ?? 'Unknown';

      // Simple points calculation: 25 points per win
      // You can make this more sophisticated with podium points
      const points = wins * 25;

      return {
        position: 0, // Will be set after sorting
        name: driver.name,
        team,
        points,
      };
    });

    // Sort by points and assign positions
    return standings
      .sort((a, b) => b.points - a.points)
      .map((d, i) => ({ ...d, position: i + 1 }));
  }, [raceResults]);

  // 🏁 TEAM STANDINGS - Fixed Logic
  const teamStandings = useMemo(() => {
    if (!mockTeams?.length) return [];

    const standings = mockTeams.map(team => {
      // Count wins for this team
      const wins = raceResults.filter(r => r.team === team.name).length;

      // Calculate total points from wins only
      // In real F1, you'd sum all driver points for the team
      const points = wins * 25;

      return {
        ...team,
        points,
        position: 0, // Will be set after sorting
      };
    });

    // Sort and assign positions
    return standings
      .sort((a, b) => b.points - a.points)
      .map((t, i) => ({ ...t, position: i + 1 }));
  }, [raceResults]);

  // 🏆 RACE RESULTS
  const raceRows = useMemo(
    () =>
      raceResults.map((r, i) => ({
        position: i + 1,
        grandPrix: r.grandPrix,
        date: r.date,
        driver: r.winner,
        team: r.team,
        laps: r.laps,
        time: r.time,
      })),
    [raceResults]
  );

  // 🎨 Helpers - Made simpler (no need for useCallback here)
  const getTeamColor = (team: string) => TEAM_COLORS[team] || 'bg-gray-500';
  const getFlag = (gp: string) => RACE_FLAGS[gp] || '🏁';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔺 Header */}
      <header className="bg-black px-6 py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Tabs */}
          <div className="flex space-x-8">
            {(['races', 'drivers', 'teams'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium text-sm uppercase tracking-wide transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-gray-200'
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
            className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            {Object.keys(mockRacesByYear)
              .map(Number)
              .sort((a, b) => b - a)
              .map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </header>

      {/* 🔹 Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'races' && (
          <Table
            headers={['Grand Prix', 'Date', 'Winner', 'Team', 'Laps', 'Time']}
            rows={raceRows.map(r => [
              <>
                <span className="text-xl mr-2">{getFlag(r.grandPrix)}</span>
                {r.grandPrix}
              </>,
              new Date(r.date).toLocaleDateString(locale, {
                day: '2-digit',
                month: 'short',
              }),
              <>
                <span
                  className={`w-3 h-3 rounded-full inline-block mr-2 ${getTeamColor(r.team)}`}
                />
                {r.driver}
              </>,
              r.team,
              r.laps,
              r.time,
            ])}
          />
        )}

        {activeTab === 'drivers' && (
          <Table
            headers={['Position', 'Driver', 'Team', 'Points']}
            rows={driverStandings.map(d => [
              d.position,
              <>
                <span
                  className={`w-3 h-3 rounded-full inline-block mr-2 ${getTeamColor(d.team)}`}
                />
                {d.name}
              </>,
              d.team,
              d.points,
            ])}
          />
        )}

        {activeTab === 'teams' && (
          <Table
            headers={['Position', 'Team', 'Points']}
            rows={teamStandings.map(t => [
              t.position,
              <>
                <span
                  className={`w-3 h-3 rounded-full inline-block mr-2 ${getTeamColor(t.name)}`}
                />
                {t.name}
              </>,
              t.points,
            ])}
          />
        )}
      </main>
    </div>
  );
};

// 🔸 Reusable Table
interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wide">
            {headers.map(h => (
              <th key={h} className="text-left py-4 px-6 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.length > 0 ? (
            rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-800 transition-colors">
                {r.map((cell, j) => (
                  <td key={j} className="py-4 px-6">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ResultsSection;
