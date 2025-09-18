// components/DriversSection.tsx
import React from 'react';
import Card from './ui/Card';
import { Driver } from '@/lib/types/driver';

interface DriversSectionProps {
  drivers: Driver[];
}

const DriversSection: React.FC<DriversSectionProps> = ({ drivers }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {drivers.map(driver => (
        <Card
          key={driver.id}
          className="bg-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="relative">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-full h-48 object-cover"
            />
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: driver.teamColor }}
            ></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="text-center text-white">
                <div className="text-lg font-bold mb-1">#{driver.number}</div>
                <div className="text-sm font-semibold">
                  {driver.name.split(' ').pop()}
                </div>
                <div className="text-xs text-gray-300">{driver.team}</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DriversSection;

// components
