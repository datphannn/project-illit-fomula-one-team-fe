'use client';

import ScheduleSection from '@/components/ScheduleSection';
const ScheduleSectionAny: any = ScheduleSection;
import {
  mockRacesDetailed,
  mockRacesByYear,
  RACE_FLAGS,
} from '@/lib/api/mockData';
import { useState, useMemo } from 'react';

// Helper function để lấy flag từ grand prix name
const getFlagFromGrandPrix = (grandPrix: string) => {
  const flagMap: Record<string, string> = {
    Bahrain: '🇧🇭',
    'Saudi Arabian': '🇸🇦',
    Australian: '🇦🇺',
    Japanese: '🇯🇵',
    Chinese: '🇨🇳',
    Miami: '🇺🇸',
    'Emilia-Romagna': '🇮🇹',
    Monaco: '🇲🇨',
    Canadian: '🇨🇦',
    Spanish: '🇪🇸',
    Austrian: '🇦🇹',
    British: '🇬🇧',
    Hungarian: '🇭🇺',
    Belgian: '🇧🇪',
    Dutch: '🇳🇱',
    Italian: '🇮🇹',
    Azerbaijan: '🇦🇿',
    Singapore: '🇸🇬',
    'United States': '🇺🇸',
    'Mexico City': '🇲🇽',
    'São Paulo': '🇧🇷',
    'Las Vegas': '🇺🇸',
    Qatar: '🇶🇦',
    'Abu Dhabi': '🇦🇪',
  };

  const key = grandPrix.replace(' Grand Prix', '');
  return flagMap[key] || RACE_FLAGS[key] || '🏁';
};

// Helper function để lấy location từ grand prix name
const getLocationFromGrandPrix = (grandPrix: string) => {
  const locationMap: Record<string, string> = {
    Bahrain: 'Sakhir, Bahrain',
    'Saudi Arabian': 'Jeddah, Saudi Arabia',
    Australian: 'Melbourne, Australia',
    Japanese: 'Suzuka, Japan',
    Chinese: 'Shanghai, China',
    Miami: 'Miami, USA',
    'Emilia-Romagna': 'Imola, Italy',
    Monaco: 'Monte Carlo, Monaco',
    Canadian: 'Montreal, Canada',
    Spanish: 'Barcelona, Spain',
    Austrian: 'Spielberg, Austria',
    British: 'Silverstone, UK',
    Hungarian: 'Budapest, Hungary',
    Belgian: 'Spa, Belgium',
    Dutch: 'Zandvoort, Netherlands',
    Italian: 'Monza, Italy',
    Azerbaijan: 'Baku, Azerbaijan',
    Singapore: 'Singapore, Singapore',
    'United States': 'Austin, USA',
    'Mexico City': 'Mexico City, Mexico',
    'São Paulo': 'Sao Paulo, Brazil',
    'Las Vegas': 'Las Vegas, USA',
    Qatar: 'Lusail, Qatar',
    'Abu Dhabi': 'Yas Island, UAE',
  };

  const key = grandPrix.replace(' Grand Prix', '');
  return locationMap[key] || `${key}, Unknown`;
};

// Helper function để lấy circuit từ grand prix name
const getCircuitFromGrandPrix = (grandPrix: string) => {
  const circuitMap: Record<string, string> = {
    Bahrain: 'Bahrain International Circuit',
    'Saudi Arabian': 'Jeddah Corniche Circuit',
    Australian: 'Albert Park Circuit',
    Japanese: 'Suzuka International Racing Course',
    Chinese: 'Shanghai International Circuit',
    Miami: 'Miami International Autodrome',
    'Emilia-Romagna': 'Autodromo Enzo e Dino Ferrari',
    Monaco: 'Circuit de Monaco',
    Canadian: 'Circuit Gilles Villeneuve',
    Spanish: 'Circuit de Barcelona-Catalunya',
    Austrian: 'Red Bull Ring',
    British: 'Silverstone Circuit',
    Hungarian: 'Hungaroring',
    Belgian: 'Circuit de Spa-Francorchamps',
    Dutch: 'Circuit Zandvoort',
    Italian: 'Autodromo Nazionale di Monza',
    Azerbaijan: 'Baku City Circuit',
    Singapore: 'Marina Bay Street Circuit',
    'United States': 'Circuit of the Americas',
    'Mexico City': 'Autódromo Hermanos Rodríguez',
    'São Paulo': 'Interlagos',
    'Las Vegas': 'Las Vegas Strip Circuit',
    Qatar: 'Lusail International Circuit',
    'Abu Dhabi': 'Yas Marina Circuit',
  };

  const key = grandPrix.replace(' Grand Prix', '');
  return circuitMap[key] || 'Unknown Circuit';
};

export default function SchedulePage() {
  const [selectedYear, setSelectedYear] = useState('2025');

  // Combine mockRacesDetailed and mockRacesByYear
  const allRaces = useMemo(() => {
    const detailedRaces = mockRacesDetailed;
    const byYearRaces = Object.values(mockRacesByYear).flat();

    const raceMap = new Map();

    // Thêm detailed races (2025) vào map trước
    detailedRaces.forEach(race => {
      raceMap.set(race.id, {
        ...race,
        status: race.status || 'upcoming',
        flag: getFlagFromGrandPrix(race.grandPrix || race.name || ''),
      });
    });

    byYearRaces.forEach((race, index) => {
      const raceId =
        race.grandPrix?.toLowerCase().replace(/ /g, '-') || `race-${index}`;

      if (!raceMap.has(raceId)) {
        raceMap.set(raceId, {
          id: raceId,
          name: race.grandPrix,
          date: race.date,
          location: getLocationFromGrandPrix(race.grandPrix || ''),
          flag: getFlagFromGrandPrix(race.grandPrix || ''),
          round: index + 1,
          status: race.status || 'finished',
          circuit: getCircuitFromGrandPrix(race.grandPrix || ''),
          laps: race.laps,
          distance: race.race_distance,
          winner: race.winner,
          team: race.team,
          time: race.time,
          pole_sitter: race.pole_sitter,
          pole_team: race.pole_team,
          fastest_lap: race.fastest_lap,
          fastest_lap_time: race.fastest_lap_time,
          qualifying_time: race.qualifying_time,
          weather: race.weather,
          results: race.results
            ? race.results.map(result => ({
                position: result.position,
                driverName: result.driver,
                teamName: result.team,
                timeOrGap: result.time,
                points: result.points,
                lapsCompleted: result.lapsCompleted,
                status: result.status || 'Finished',
              }))
            : undefined,
        });
      }
    });

    return Array.from(raceMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, []);

  // Filter races by selected year
  const filteredRaces = useMemo(() => {
    return allRaces.filter(race => {
      const raceYear = new Date(race.date).getFullYear().toString();
      return raceYear === selectedYear;
    });
  }, [allRaces, selectedYear]);

  // Get available years from races
  const availableYears = useMemo(() => {
    const years = new Set(
      allRaces.map(race => new Date(race.date).getFullYear().toString())
    );
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [allRaces]);

  // Count races by status
  const raceStats = useMemo(() => {
    const finished = filteredRaces.filter(
      race => race.status === 'finished'
    ).length;
    const upcoming = filteredRaces.filter(
      race => race.status === 'upcoming'
    ).length;
    const live = filteredRaces.filter(race => race.status === 'live').length;

    return { finished, upcoming, live, total: filteredRaces.length };
  }, [filteredRaces]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f15] to-[#1a1a2e] text-white">
      {/* Header với Background */}
      <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Race Schedule{' '}
                <span className="text-red-500">{selectedYear}</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Formula 1 Season - {raceStats.total} races
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredRaces.length > 0 ? (
          <ScheduleSectionAny
            races={filteredRaces}
            selectedYear={selectedYear}
            availableYears={availableYears}
            onYearChange={setSelectedYear}
          />
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏎️</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">
                No Races Scheduled
              </h3>
              <p className="text-gray-400 mb-6">
                No races found for the season {selectedYear}
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                {availableYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
