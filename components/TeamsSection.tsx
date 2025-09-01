import { teams } from '@/lib/api/mockData';
import Card from '@/components/ui/Card';

export default async function TeamsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {teams.map((team) => (
        <Card
          key={team.id}
          title={team.name}
          description={`Base: ${team.base}`}
          image={team.image}
        />
      ))}
    </div>
  );
}