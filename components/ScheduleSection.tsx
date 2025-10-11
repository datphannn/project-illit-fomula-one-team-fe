'use client';

import { Race } from '@/lib/types/race';
import Link from 'next/link';
import { useLocale } from '@/lib/utils/locale';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface ScheduleSectionProps {
  races: Race[];
}

export default function ScheduleSection({ races }: ScheduleSectionProps) {
  const t = useTranslations('schedule');
  const { locale } = useLocale();

  // Xác định chặng sắp tới
  const today = new Date();
  const nextRaceIndex = races.findIndex(race => new Date(race.date) >= today);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {races.map((race, index) => {
        const isNextRace = index === nextRaceIndex;
        const isFinished = race.status === 'finished';

        return (
          <Link
            key={race.id}
            href={`/${locale}/results/${race.id}`}
            className={`group relative block rounded-xl overflow-hidden bg-gray-900 
              border border-gray-800 hover:border-red-600 
              transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] 
              hover:-translate-y-1`}
          >
            {/* Live/Next Badge */}
            {isNextRace && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase z-10">
                Next Race
              </div>
            )}

            {/* Nội dung chính */}
            <div className="p-6 relative">
              {/* Round + Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Round {race.round}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(race.date)
                    .toLocaleDateString(locale, {
                      day: '2-digit',
                      month: 'short',
                    })
                    .toUpperCase()}
                </div>
              </div>

              {/* Status Badge cho finished */}
              {isFinished && (
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <span className="text-xs text-gray-400 uppercase font-semibold">
                    Finished
                  </span>
                </div>
              )}

              {/* Country / Location */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{race.flag}</span>
                <h3 className="text-xl font-bold text-white">
                  {race.location.split(',')[1]?.trim() ?? race.location}
                </h3>
              </div>

              {/* Race Name */}
              <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide group-hover:text-gray-200 transition-colors">
                {race.name}
              </p>

              {/* Winner Info (chỉ hiện nếu đã hoàn thành) */}
              {isFinished && race.winner && (
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-xs font-bold text-white">
                        1
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {race.winner}
                        </div>
                        <div className="text-xs text-gray-500">{race.team}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {race.time}
                    </div>
                  </div>
                </div>
              )}

              {/* Circuit + Info (nếu chưa diễn ra) */}
              {!isFinished && (
                <div className="border-t border-gray-800 pt-4 space-y-1">
                  <div className="text-xs text-gray-500 uppercase">
                    {race.circuit}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span>Laps: {race.laps}</span>
                    <span>Distance: {race.distance}</span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
