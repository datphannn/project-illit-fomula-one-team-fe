// File: components/NewsSection.tsx

import React, { useState } from 'react';
import { ChevronRight, Calendar, User, Eye, Loader } from 'lucide-react';

interface NewsSectionProps {
  news: any[];
  onNewsClick?: (id: string) => void;
  initialItems?: number;
  showLoadMore?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  onNewsClick,
  initialItems = 6,
  showLoadMore = true,
}) => {
  const [visibleItems, setVisibleItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'race':
        return 'bg-red-600/90 text-white cursor-default';
      case 'driver':
        return 'bg-blue-600/90 text-white cursor-default';
      case 'team':
        return 'bg-green-600/90 text-white cursor-default';
      case 'general':
        return 'bg-purple-600/90 text-white cursor-default';
      default:
        return 'bg-gray-600/90 text-white cursor-default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLoadMore = async () => {
    if (visibleItems >= news.length) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setVisibleItems(prev => Math.min(prev + 6, news.length));
    setIsLoading(false);
  };

  const displayedNews = news.slice(0, visibleItems);
  const hasMore = visibleItems < news.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map(item => (
          <div
            key={item.id}
            onClick={() => onNewsClick?.(item.id)}
            className="group cursor-pointer bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl border border-gray-700/50 hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm overflow-hidden active:scale-95"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden h-48 cursor-pointer">
              <img
                src={
                  item.image ||
                  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop'
                }
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent cursor-pointer" />

              {/* Category Badge */}
              {item.category && (
                <div className="absolute top-3 left-3 cursor-default">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                </div>
              )}

              {/* Source Badge */}
              {item.source && (
                <div className="absolute top-3 right-3 cursor-default">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded cursor-default">
                    {item.source}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 cursor-pointer">
              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 group-hover:text-red-400 transition-colors leading-tight cursor-pointer">
                {item.title}
              </h3>

              {/* Description/Content */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed cursor-pointer">
                {item.description || item.content}
              </p>

              {/* Metadata */}
              <div className="space-y-3">
                {/* Date and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-sm cursor-default">
                    <Calendar className="w-4 h-4 cursor-default" />
                    <span className="cursor-default">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-red-500 font-semibold text-sm group-hover:gap-2 transition-all cursor-pointer">
                    Read more
                    <ChevronRight className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>

                {/* Author and Views */}
                {(item.author || item.views) && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50 text-xs text-gray-500 cursor-default">
                    {item.author && (
                      <div className="flex items-center gap-1 cursor-default">
                        <User className="w-3 h-3 cursor-default" />
                        <span className="cursor-default">{item.author}</span>
                      </div>
                    )}
                    {item.views && (
                      <div className="flex items-center gap-1 cursor-default">
                        <Eye className="w-3 h-3 cursor-default" />
                        <span className="cursor-default">
                          {item.views.toLocaleString()} views
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More News'
            )}
          </button>
        </div>
      )}

      {/* No more news message */}
      {!hasMore && news.length > initialItems && (
        <div className="text-center mt-8">
          <p className="text-gray-400 text-lg">
            🎉 You've seen all {news.length} news articles!
          </p>
        </div>
      )}
    </>
  );
};

export default NewsSection;
