import { mockTeamsDetailed } from '@/lib/api/mockData';
import Card from '@/components/ui/Card';
import { Team } from '@/lib/types/team';

interface TeamsSectionProps {
  teams?: Team[];
}

export default function TeamsSection({
  teams = mockTeamsDetailed,
}: TeamsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {teams.map(team => (
        <Card
          key={team.id}
          className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer overflow-hidden"
        >
          <div className="flex items-center p-4">
            {/* Team Logo */}
            <div className="w-16 h-16 flex items-center justify-center mr-4">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Team Info */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">{team.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                Position: #{team.position} | Points: {team.points}
              </p>

              {/* Team Color Bar */}
              <div
                className="w-full h-1 rounded"
                style={{ backgroundColor: team.color }}
              ></div>

              {/* Drivers */}
              {team.drivers && (
                <div className="mt-2">
                  <p className="text-gray-300 text-xs">
                    Drivers: {team.drivers.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
