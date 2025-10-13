'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

type Race = any;
interface ScheduleSectionProps {
  races: Race[];
  selectedYear: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  races,
  selectedYear,
  availableYears,
  onYearChange,
}) => {
  const t = useTranslations('schedule');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'live':
        return 'bg-red-500/20 text-red-300 border-red-500/30 animate-pulse';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'finished':
        return t('finished');
      case 'live':
        return t('live');
      case 'upcoming':
        return t('upcoming');
      default:
        return status;
    }
  };

  if (!races || races.length === 0) {
    return (
      <div className="text-center py-16 cursor-default">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🏎️</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            {t('noRacesTitle')}
          </h3>
          <p className="text-gray-400 mb-6">
            {t('noRacesDescription')} {selectedYear}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header chỉ còn dropdown */}
      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm font-medium cursor-default">
            {t('season')}:
          </span>
          <select
            value={selectedYear}
            onChange={e => onYearChange(e.target.value)}
            className="bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white font-medium 
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
              hover:border-gray-600 transition-all duration-200 cursor-pointer backdrop-blur-sm 
              min-w-[140px] appearance-none bg-gradient-to-b from-gray-800 to-gray-900
              hover:bg-gray-800/90 active:bg-gray-800"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year} {t('season')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Race Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {races.map((race, index) => (
          <div
            key={race.id || race.name}
            className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm overflow-hidden cursor-pointer active:scale-95 active:border-red-500/60"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-800/5 to-gray-700/10" />

            {/* Header với Flag và Round */}
            <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/80 to-gray-800/60">
              <div className="flex items-center gap-4">
                {/* Flag Image */}
                <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  {race.flag ? (
                    <span className="text-2xl">{race.flag}</span>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">F1</span>
                    </div>
                  )}
                </div>

                {/* Race Name và Round */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {race.name.replace(' Grand Prix', '')}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30">
                      Round {race.round || index + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold border px-2 py-1 rounded ${getStatusColor(race.status)}`}
                    >
                      {getStatusText(race.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6 space-y-4">
              {/* Date và Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center gap-2 flex-1">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium text-sm">
                      {formatDate(race.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center gap-2 flex-1">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">{race.location}</span>
                  </div>
                </div>

                {/* Circuit */}
                {race.circuit && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-2 flex-1">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-sm truncate">{race.circuit}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Winner Section */}
              {race.winner && race.status === 'finished' && (
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-200">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 text-center cursor-default">
                      {t('winner') || 'WINNER'}
                    </p>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="font-bold text-white text-lg leading-tight">
                          {race.winner}
                        </p>
                        {race.team && (
                          <p className="text-sm text-emerald-300 mt-1">
                            {race.team}
                          </p>
                        )}
                      </div>
                      {race.time && (
                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-emerald-500/20">
                          <span className="text-xs text-gray-400 cursor-default">
                            Time
                          </span>
                          <p className="text-sm font-mono text-white bg-black/20 px-2 py-1 rounded">
                            {race.time}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming Race Info */}
              {race.status === 'upcoming' && (
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-200">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 text-center cursor-default">
                      {t('upcoming') || 'UPCOMING'}
                    </p>
                    <p className="text-white font-medium text-center">
                      Starting {formatDate(race.date)}
                    </p>
                  </div>
                </div>
              )}

              {/* Live Race Info */}
              {race.status === 'live' && (
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors duration-200">
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1 cursor-default">
                          {t('liveNow') || 'LIVE NOW'}
                        </p>
                        <p className="text-white font-medium">
                          Race in Progress
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse cursor-default" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSection;
