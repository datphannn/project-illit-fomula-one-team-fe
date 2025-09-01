import { races } from '@/lib/api/mockData';

export default async function ScheduleSection() {
  const upcomingRaces = races.filter((race) => race.status === 'upcoming');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {upcomingRaces.map((race) => (
        <div key={race.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold dark:text-white">{race.name}</h2>
          <p className="dark:text-white">{race.date}</p>
          <p className="dark:text-white">{race.location}</p>
        </div>
      ))}
    </div>
  );
}