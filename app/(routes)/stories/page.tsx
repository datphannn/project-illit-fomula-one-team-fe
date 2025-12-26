'use client';

import React, { useState } from 'react';
import StoriesSection from '@/components/StoriesSection';
import { Story } from '@/lib/types/story';
import Link from 'next/link';
import {
  Search,
  Filter,
  Mail,
  ArrowRight,
  ChevronRight,
  Calendar,
  User,
  Clock,
} from 'lucide-react';
import { mockStoriesDetailed } from '@/lib/api/mockData';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function StoriesPage() {
  const [sortBy, setSortBy] = useState('newest');
  const [showAllStories, setShowAllStories] = useState(false);
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Phân loại stories từ mockStoriesDetailed
  const featuredStories = mockStoriesDetailed.filter(story =>
    story.id.includes('featured')
  );
  const popularStories = mockStoriesDetailed.filter(story =>
    story.id.includes('popular')
  );
  const regularStories = mockStoriesDetailed.filter(
    story => !story.id.includes('featured') && !story.id.includes('popular')
  );

  // Lấy tất cả category
  const allCategories = Array.from(
    new Set(mockStoriesDetailed.map(story => story.category || 'Uncategorized'))
  );

  // Lọc stories
  const filteredStories = regularStories.filter(
    story =>
      (activeCategory === 'all' || story.category === activeCategory) &&
      (story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (story.summary &&
          story.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (story.author &&
          story.author.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Sắp xếp stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    const dateA = new Date(a.publishedAt || '');
    const dateB = new Date(b.publishedAt || '');

    if (sortBy === 'newest') return dateB.getTime() - dateA.getTime();
    if (sortBy === 'oldest') return dateA.getTime() - dateB.getTime();
    return 0;
  });

  const displayedStories = showAllStories
    ? sortedStories
    : sortedStories.slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm font-bold mb-6 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            EXCLUSIVE CONTENT
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            F1 Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Dive deep into the world of Formula 1 with exclusive stories,
            analysis, and behind-the-scenes content.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search stories by title, content, or author..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-base"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 min-w-[180px] text-base"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Categories
            </button>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Stories Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                In-depth analysis and exclusive content
              </p>
            </div>
            <Link
              href="/stories/featured"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide flex items-center gap-1 group"
            >
              View All Featured
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStories.map((story, index) => (
              <article
                key={story.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <Link
                  href={story.link || `/stories/${story.id}`}
                  className="block h-full"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="mb-3">
                        <span className="inline-block bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                          Featured
                        </span>
                        {story.category && (
                          <span className="inline-block ml-2 bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                            {story.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2 leading-tight">
                        {story.title}
                      </h2>
                      <p className="text-gray-200 text-base md:text-lg line-clamp-2 leading-relaxed mb-6">
                        {story.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {story.publishedAt && formatDate(story.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {story.author || 'Anonymous'}
                          </span>
                          {story.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {story.readTime} min read
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-white font-semibold group-hover:text-red-300 transition-colors">
                          Read Full Story
                          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Popular Stories Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Popular Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most read and shared stories
              </p>
            </div>
            <Link
              href="/stories/popular"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide flex items-center gap-1 group"
            >
              View All Popular
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularStories.map(story => (
              <div
                key={story.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all duration-300 group"
              >
                <Link
                  href={story.link || `/stories/${story.id}`}
                  className="block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                        Popular
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-md text-xs font-medium mb-3">
                      {story.category || 'Story'}
                    </span>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {story.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{story.author}</span>
                      </div>
                      {story.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.readTime} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Stories Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Latest Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fresh content from the F1 world
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredStories.length} stories
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStories.map(story => (
              <div
                key={story.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all duration-300 group"
              >
                <Link
                  href={story.link || `/stories/${story.id}`}
                  className="block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-md text-xs font-medium">
                        {story.category || 'Story'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {story.publishedAt && formatDate(story.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {story.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{story.author || 'Anonymous'}</span>
                      </div>
                      {story.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.readTime} min read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {!showAllStories && filteredStories.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllStories(true)}
                className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg flex items-center gap-2 mx-auto"
              >
                Load More Stories
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                Showing 6 of {filteredStories.length} stories
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white mb-8 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <Mail className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 text-white/90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Never Miss a Story
            </h3>
            <p className="text-red-100 text-lg md:text-xl mb-8 leading-relaxed">
              Subscribe to our newsletter and get the latest F1 stories
              delivered to your inbox every week.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 transition-all duration-200 placeholder-gray-500 text-base"
                required
              />
              <button
                type="submit"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-lg flex items-center justify-center gap-2"
              >
                Subscribe Now
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
