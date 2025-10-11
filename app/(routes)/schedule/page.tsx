'use client';

import { useTranslations } from 'next-intl';
import ScheduleSection from '@/components/ScheduleSection';
import { mockRacesDetailed } from '@/lib/api/mockData';
import { useState } from 'react';

export default function SchedulePage() {
  const t = useTranslations('schedule');
  const [selectedYear, setSelectedYear] = useState('2025');

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
              className="bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Race Grid */}
      <div className="container mx-auto px-4 pb-16">
        <ScheduleSection races={mockRacesDetailed} />
      </div>
    </div>
  );
}
