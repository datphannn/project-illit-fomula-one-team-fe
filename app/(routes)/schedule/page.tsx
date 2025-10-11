'use client';

import { useTranslations } from 'next-intl';
import ScheduleSection from '@/components/ScheduleSection';
import { mockRacesDetailed } from '@/lib/api/mockData';
import { useState, useMemo } from 'react';

export default function SchedulePage() {
  const t = useTranslations('schedule');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Filter races by selected year
  const filteredRaces = useMemo(() => {
    return mockRacesDetailed.filter(race => {
      const raceYear = new Date(race.date).getFullYear().toString();
      return raceYear === selectedYear;
    });
  }, [selectedYear]);

  // Get available years from races
  const availableYears = useMemo(() => {
    const years = new Set(
      mockRacesDetailed.map(race =>
        new Date(race.date).getFullYear().toString()
      )
    );
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  return (
    <div className="min-h-screen bg-[#15151e] text-white">
      {/* Year Selector */}
      <div className="border-b border-gray-800 mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {t('title')} {selectedYear}
            </h1>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600 hover:border-red-500 transition-colors cursor-pointer"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Race Grid */}
      <div className="container mx-auto px-4 pb-16">
        {filteredRaces.length > 0 ? (
          <ScheduleSection races={filteredRaces} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No races found for {selectedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
