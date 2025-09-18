import React from 'react';
import { Race } from '@/lib/types/race';

interface ResultsSectionProps {
  races: Race[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ races }) => {
  return (
    <div>
      {races.map(race => (
        <div key={race.id} className="p-2 border-b">
          <h3 className="font-bold">{race.name}</h3>
          <p>
            {race.circuit} - {race.location}
          </p>
          <span>{new Date(race.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultsSection;
