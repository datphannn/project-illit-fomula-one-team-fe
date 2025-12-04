// components/StoriesSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Story } from '@/lib/types/story';
import { ArrowRight } from 'lucide-react';

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

  const getCardHeight = () => {
    switch (variant) {
      case 'compact':
        return 'h-[180px]';
      case 'featured':
        return 'h-[320px]';
      default:
        return 'h-[240px]';
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
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      {(title || showViewAll) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {showViewAll && (
            <Link
              href={viewAllLink}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 flex items-center gap-1 group"
            >
              View All
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {displayedStories.map((story, index) => {
          // Xác định số cột dựa trên variant và index
          let colSpan = 'col-span-1';
          if (variant === 'featured' && index < 2) {
            colSpan = 'sm:col-span-2 lg:col-span-3 xl:col-span-3';
          }

          return (
            <Link
              key={story.id}
              href={story.link || '#'}
              className={`block h-full ${colSpan}`}
            >
              <div
                className={`group bg-white dark:bg-gray-800 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-xl rounded-xl ${getCardHeight()} flex flex-col h-full`}
              >
                {/* Image Container */}
                <div
                  className={`relative ${getImageRatio()} overflow-hidden flex-shrink-0`}
                >
                  {/* Sử dụng thẻ img thay vì Next.js Image */}
                  <img
                    src={story.image || '/default-image.jpg'}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Summary on Hover */}
                  {variant === 'featured' && (
                    <div className="absolute inset-0 p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-white text-sm leading-tight line-clamp-3">
                        {story.summary}
                      </p>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {variant === 'featured' && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4
                    className={`text-gray-900 dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 mb-2 ${getTitleSize()}`}
                  >
                    {story.title}
                  </h4>

                  {/* Summary for featured variant */}
                  {variant === 'featured' && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                      {story.summary}
                    </p>
                  )}

                  {/* Read More Indicator */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wide group-hover:underline">
                      Read More
                    </span>
                    <div className="w-0 group-hover:w-4 h-0.5 bg-red-600 dark:bg-red-400 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
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
