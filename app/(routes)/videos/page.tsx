'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockVideosDetailed } from '@/lib/api/mockData';

export default function VideosPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { key: 'all', label: 'All Videos' },
    { key: 'highlights', label: 'Race Highlights' },
    { key: 'interviews', label: 'Interviews' },
    { key: 'analysis', label: 'Technical Analysis' },
    { key: 'behind-scenes', label: 'Behind the Scenes' },
    { key: 'press-conferences', label: 'Press Conferences' },
  ];

  const filteredVideos = mockVideosDetailed.filter(video => {
    const matchesFilter =
      activeFilter === 'all' || video.category === activeFilter;
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);
    return matchesFilter && matchesSearch;
  });

  const navigateToVideoDetail = (id: string) => {
    router.push(`/videos/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              F1 Videos
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch exclusive content, race highlights, interviews, and
            behind-the-scenes footage from the world of Formula 1
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 transform scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Showing {filteredVideos.length} video
            {filteredVideos.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' &&
              ` in ${filters.find(f => f.key === activeFilter)?.label}`}
          </p>
          <div className="flex items-center gap-4">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredVideos.map(video => (
              <Card
                key={video.id}
                className="bg-gray-800 overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10 border border-gray-700"
                onClick={() => navigateToVideoDetail(video.id)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform shadow-2xl">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 text-xs rounded text-white font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-red-400 transition-colors text-sm mb-3 line-clamp-2 leading-relaxed">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      📅 {video.date}
                    </span>
                    <span className="flex items-center gap-1">
                      👁️ {video.view}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="text-center py-16 bg-gray-800 border border-gray-700">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎥</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No videos found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Load More */}
        {filteredVideos.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 px-8 py-3"
            >
              Load More Videos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
