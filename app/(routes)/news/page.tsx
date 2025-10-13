// File: app/news/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsSection from '@/components/NewsSection';
import { mockNewsDetailed } from '@/lib/api/mockData';

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'race', label: 'Races' },
  { id: 'driver', label: 'Drivers' },
  { id: 'team', label: 'Teams' },
  { id: 'general', label: 'General' },
];

export default function NewsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  // Lọc tin tức theo category
  const filteredNews = mockNewsDetailed.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f15] to-[#1a1a2e]">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              F1 NEWS
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stay updated with the latest Formula 1 news, race results, team
              updates, and driver insights
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25'
                  : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-red-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing{' '}
            <span className="text-white font-semibold">
              {filteredNews.length}
            </span>{' '}
            news articles
            {activeCategory !== 'all' && (
              <span>
                {' '}
                in{' '}
                <span className="text-red-500 font-semibold capitalize">
                  {activeCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* News Grid với Load More tích hợp */}
        <NewsSection
          news={filteredNews}
          onNewsClick={handleNewsClick}
          initialItems={9}
          showLoadMore={true}
        />

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">
                No News Found
              </h3>
              <p className="text-gray-400 mb-6">
                There are no news articles in the{' '}
                <span className="text-red-500">{activeCategory}</span> category.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                View All News
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
