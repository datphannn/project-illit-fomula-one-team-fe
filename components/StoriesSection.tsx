// components/StoriesSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from './ui/Card';
import { Story } from '@/lib/types/story';

interface StoriesSectionProps {
  stories: Story[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  maxItems?: number;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({
  stories,
  title = 'Latest Stories',
  showViewAll = true,
  viewAllLink = '/stories',
  maxItems = 6,
}) => {
  const displayedStories = stories.slice(0, maxItems);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide transition-colors duration-200"
          >
            View All
          </Link>
        )}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedStories.map(story => (
          <Link key={story.id} href={story.link}>
            <Card className="group bg-white dark:bg-gray-800 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-lg">
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Summary on Hover */}
                <div className="absolute inset-0 p-3 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs leading-tight line-clamp-3">
                    {story.summary}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="text-gray-900 dark:text-white text-xs font-bold leading-tight line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                  {story.title}
                </h4>

                {/* Read More Indicator */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wide">
                    Read More
                  </span>
                  <div className="w-0 group-hover:w-4 h-0.5 bg-red-600 dark:bg-red-400 transition-all duration-300"></div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
            No stories available
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Check back later for new stories
          </p>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
