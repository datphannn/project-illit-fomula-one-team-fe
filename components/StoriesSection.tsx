// components/StoriesSection.tsx
import React from 'react';
import Card from './ui/Card';
import { Story } from '@/lib/types/story';

interface StoriesSectionProps {
  stories: Story[];
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ stories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stories.map(story => (
        <Card
          key={story.id}
          className="bg-gray-800 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="relative">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
              <h4 className="text-white text-xs font-bold leading-tight line-clamp-2">
                {story.title}
              </h4>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StoriesSection;
