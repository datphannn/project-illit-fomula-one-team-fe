// File: components/TeamsSection.tsx

import React from 'react';
import { Team } from '@/lib/types/team';
import { ChevronRight } from 'lucide-react';

interface TeamsSectionProps {
  teams: Team[];
  onTeamClick?: (id: string) => void;
}

const TeamsSection: React.FC<TeamsSectionProps> = ({ teams, onTeamClick }) => {
  // Helper function để lấy số race wins
  const getRaceWins = (team: Team): number => {
    return team.teamStats?.raceWins || team.seasonStats?.grandPrixWins || 0;
  };

  // Helper function để lấy số championships
  const getChampionships = (team: Team): number => {
    return team.teamStats?.worldChampionships || 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {teams.map((team, index) => (
        <div
          key={team.id}
          onClick={() => onTeamClick?.(team.id)}
          className="group cursor-pointer bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-gray-600 hover:shadow-lg"
        >
          <div className="relative">
            {/* Team Color Header */}
            <div className="h-2" style={{ backgroundColor: team.color }} />

            {/* Position Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-black/90 backdrop-blur-sm text-white font-bold text-lg px-3 py-1 rounded-md">
                P{team.position}
              </div>
            </div>

            {/* Team Logo */}
            <div className="h-40 bg-gray-800 flex items-center justify-center group-hover:bg-gray-750 transition-colors duration-300">
              <img
                src={team.logo}
                alt={team.name}
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Team Info */}
          <div className="p-6">
            {/* Team Name */}
            <h3 className="text-white text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-white">
              {team.name}
            </h3>

            {/* Base Location */}
            {team.base && (
              <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                {team.base}
              </p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
              <div className="text-center">
                <div className="text-gray-500 text-xs uppercase mb-1">
                  Points
                </div>
                <div className="text-white font-bold text-lg">
                  {team.points}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs uppercase mb-1">Wins</div>
                <div className="text-white font-bold text-lg">
                  {getRaceWins(team)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs uppercase mb-1">
                  Titles
                </div>
                <div className="text-white font-bold text-lg">
                  {getChampionships(team)}
                </div>
              </div>
            </div>

            {/* Team Details */}
            <div className="space-y-2 mb-4 text-sm">
              {team.chief && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Team Principal</span>
                  <span className="text-gray-300 font-medium">
                    {team.chief}
                  </span>
                </div>
              )}
              {team.powerUnit && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Power Unit</span>
                  <span className="text-gray-300 font-medium">
                    {team.powerUnit}
                  </span>
                </div>
              )}
              {team.chassis && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Chassis</span>
                  <span className="text-gray-300 font-medium">
                    {team.chassis}
                  </span>
                </div>
              )}
            </div>

            {/* Drivers List */}
            {team.drivers && team.drivers.length > 0 && (
              <div className="mb-4">
                <div className="text-gray-500 text-xs uppercase mb-2">
                  Drivers
                </div>
                <div className="flex gap-2">
                  {team.drivers.map(driverId => (
                    <div
                      key={driverId}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm transition-colors duration-300 hover:bg-gray-600"
                    >
                      {driverId}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View More Link */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
              <span
                className="text-sm font-medium transition-all duration-300 group-hover:translate-x-1"
                style={{ color: team.color }}
              >
                View Team Profile
              </span>
              <ChevronRight
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: team.color }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamsSection;
