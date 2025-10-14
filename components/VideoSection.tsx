'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockVideosDetailed } from '@/lib/api/mockData';
import { useLocale } from '@/lib/utils/locale';
import { useRouter } from 'next/navigation';

export default function VideoSection() {
  const { locale } = useLocale();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const navigateToVideos = () => {
    router.push(`/${locale}/videos`);
  };

  const navigateToVideoDetail = (id: string) => {
    router.push(`/${locale}/videos/${id}`);
  };

  const filters = [
    { key: 'all', label: 'All Videos' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'interviews', label: 'Interviews' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'behind-scenes', label: 'Behind the Scenes' },
  ];

  const filteredVideos = mockVideosDetailed
    .filter(video => activeFilter === 'all' || video.category === activeFilter)
    .slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-8 bg-red-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Featured Videos
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl">
              Watch the latest highlights, exclusive interviews, and in-depth
              analysis from the world of Formula 1
            </p>
          </div>

          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 transition-all duration-300"
            onClick={navigateToVideos}
          >
            View All Videos
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured Video */}
        {filteredVideos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Main Featured Video */}
            <Card className="bg-gray-800 overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]">
              <div
                className="relative h-80 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${filteredVideos[0].thumbnail})`,
                }}
                onClick={() => navigateToVideoDetail(filteredVideos[0].id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {filteredVideos[0]?.category?.toUpperCase() ?? ''}
                    </span>
                    <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⏱️ {filteredVideos[0].duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                    {filteredVideos[0].title}
                  </h3>
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    <span>📅 {filteredVideos[0].date}</span>
                    <span>•</span>
                    <span>👁️ {filteredVideos[0].view}</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Video List */}
            <div className="space-y-4">
              {filteredVideos.slice(1, 5).map((video, index) => (
                <Card
                  key={video.id}
                  className="bg-gray-800 overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => navigateToVideoDetail(video.id)}
                >
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/90 px-1.5 py-0.5 text-xs rounded text-white">
                        {video.duration}
                      </div>
                    </div>

                    <div className="flex-1 py-2 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold">
                          {video.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors text-sm line-clamp-2 mb-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{video.date}</span>
                        <span>{video.view}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Additional Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.slice(5).map(video => (
            <Card
              key={video.id}
              className="bg-gray-800 overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 text-xs rounded text-white">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {video.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-3 text-sm line-clamp-2 group-hover:text-red-400 transition-colors text-white">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{video.date}</span>
                  <span>{video.view}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Never Miss a Moment
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to F1 TV for exclusive access to live races, team
              radios, onboard cameras, and much more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300 font-bold"
                onClick={() => router.push(`/${locale}/f1tv`)}
              >
                🎬 Subscribe to F1 TV
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg transition-all duration-300"
                onClick={navigateToVideos}
              >
                Browse All Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
