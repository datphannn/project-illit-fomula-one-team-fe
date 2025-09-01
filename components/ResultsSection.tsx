import { races } from '@/lib/api/mockData';

export default async function ResultsSection() {
  const completedRaces = races.filter((race) => race.status === 'completed');

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="p-2 dark:text-white">Race</th>
            <th className="p-2 dark:text-white">Winner</th>
            <th className="p-2 dark:text-white">Location</th>
          </tr>
        </thead>
        <tbody>
          {completedRaces.map((race) => (
            <tr key={race.id}>
              <td className="p-2 dark:text-white">{race.name}</td>
              <td className="p-2 dark:text-white">{race.winner}</td>
              <td className="p-2 dark:text-white">{race.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}