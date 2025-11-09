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
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  variant?: 'default' | 'compact' | 'featured';
}

const StoriesSection: React.FC<StoriesSectionProps> = ({
  stories,
  title = 'Latest Stories',
  showViewAll = true,
  viewAllLink = '/stories',
  maxItems = 6,
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 3,
    large: 6,
  },
  variant = 'default',
}) => {
  const displayedStories = stories.slice(0, maxItems);

  // Grid configuration
  const getGridClasses = () => {
    const mobileCols = columns.mobile || 2;
    const tabletCols = columns.tablet || 3;
    const desktopCols = columns.desktop || 3;
    const largeCols = columns.large || 6;

    return `grid grid-cols-${mobileCols} md:grid-cols-${tabletCols} lg:grid-cols-${desktopCols} xl:grid-cols-${largeCols} gap-4`;
  };

  const getCardHeight = () => {
    switch (variant) {
      case 'compact':
        return 'min-h-[160px]';
      case 'featured':
        return 'min-h-[280px]';
      default:
        return 'min-h-[200px]';
    }
  };

  const getImageRatio = () => {
    switch (variant) {
      case 'compact':
        return 'aspect-[3/2]';
      case 'featured':
        return 'aspect-[4/3]';
      default:
        return 'aspect-[4/3]';
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case 'compact':
        return 'text-xs';
      case 'featured':
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      {(title || showViewAll) && (
        <div className="flex items-center justify-between">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {showViewAll && (
            <Link
              href={viewAllLink}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 flex items-center gap-1 group"
            >
              View All
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      )}

      {/* Stories Grid */}
      <div className={getGridClasses()}>
        {displayedStories.map(story => (
          <Link key={story.id} href={story.link} className="block h-full">
            <Card
              className={`group bg-white dark:bg-gray-800 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-lg ${getCardHeight()} flex flex-col h-full`}
            >
              {/* Image Container */}
              <div
                className={`relative ${getImageRatio()} overflow-hidden flex-shrink-0`}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                  priority={variant === 'featured'}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Summary on Hover */}
                <div className="absolute inset-0 p-3 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-white text-xs leading-tight line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                {/* Featured Badge */}
                {variant === 'featured' && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 flex-1 flex flex-col">
                <h4
                  className={`text-gray-900 dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 mb-2 ${getTitleSize()}`}
                >
                  {story.title}
                </h4>

                {/* Summary for featured variant */}
                {variant === 'featured' && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
                    {story.summary}
                  </p>
                )}

                {/* Read More Indicator */}
                <div className="flex items-center justify-between mt-auto">
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
