import { stories } from '@/lib/api/mockData';
import Card from '../components/ui/Card';

export default async function StoriesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stories.map((story) => (
        <Card
          key={story.id}
          title={story.title}
          description={story.description}
          image={story.image}
        />
      ))}
    </div>
  );
}