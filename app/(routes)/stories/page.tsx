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

// Mock data - sử dụng URLs từ Unsplash
const mockStories: Story[] = [
  {
    id: '1',
    title: 'Verstappen Dominates Monaco GP with Stunning Performance',
    image:
      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=800&q=80',
    link: '/stories/verstappen-monaco-domination',
    summary:
      'Red Bull driver Max Verstappen delivers a masterclass in Monaco, leading from start to finish in challenging wet conditions.',
    content: 'Full story content about Verstappen...',
    category: 'Race Report',
    publishedAt: '2024-05-26',
    author: 'John Doe',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Ferrari Reveals Major Upgrade Package for Canadian GP',
    image:
      'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80',
    link: '/stories/ferrari-canada-upgrade',
    summary:
      'Scuderia Ferrari introduces significant aerodynamic updates aimed at closing the gap to Red Bull in the championship fight.',
    content: 'Full story content about Ferrari upgrades...',
    category: 'Technical',
    publishedAt: '2024-05-25',
    author: 'Sarah Smith',
    readTime: 4,
  },
  {
    id: '3',
    title: 'Hamilton Signs New Multi-Year Contract with Mercedes',
    image:
      'https://images.unsplash.com/photo-1613582265326-059e3da796c0?auto=format&fit=crop&w=800&q=80',
    link: '/stories/hamilton-mercedes-contract',
    summary:
      'Seven-time world champion Lewis Hamilton commits his future to Mercedes with a new contract extending through 2026.',
    content: 'Full story content about Hamilton contract...',
    category: 'News',
    publishedAt: '2024-05-24',
    author: 'Mike Johnson',
    readTime: 6,
  },
  {
    id: '4',
    title: 'Alpine Introduces Revolutionary Sidepod Design',
    image:
      'https://images.unsplash.com/photo-1562181839-5a7c78d560a4?auto=format&fit=crop&w=800&q=80',
    link: '/stories/alpine-innovation',
    summary:
      'French team Alpine surprises paddock with innovative sidepod concept that could change F1 aerodynamics.',
    content: 'Full story content about Alpine design...',
    category: 'Technical',
    publishedAt: '2024-05-23',
    author: 'Admin',
    readTime: 7,
  },
  {
    id: '5',
    title: 'Young Driver Test: Who Impressed at Silverstone?',
    image:
      'https://images.unsplash.com/photo-1600682502972-6e8c88a2e106?auto=format&fit=crop&w=800&q=80',
    link: '/stories/young-driver-silverstone',
    summary:
      'Analysis of the young driver test session with standout performances from F2 and F3 prospects.',
    content: 'Full story content about young drivers...',
    category: 'Analysis',
    publishedAt: '2024-05-22',
    author: 'Sarah Smith',
    readTime: 5,
  },
  {
    id: '6',
    title: 'Technical Analysis: How Red Bull Maintains Advantage',
    image:
      'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?auto=format&fit=crop&w=800&q=80',
    link: '/stories/red-bull-technical-edge',
    summary:
      'Deep dive into the technical innovations that keep Red Bull Racing ahead of the competition.',
    content: 'Full story content about Red Bull technology...',
    category: 'Technical',
    publishedAt: '2024-05-21',
    author: 'Tech Team',
    readTime: 8,
  },
  {
    id: '7',
    title: 'Norris: "We Can Challenge for Wins This Season"',
    image:
      'https://images.unsplash.com/photo-1594729564534-5c14c4ae7f77?auto=format&fit=crop&w=800&q=80',
    link: '/stories/norris-interview',
    summary:
      'McLaren star Lando Norris confident about team progress and believes victories are within reach.',
    content: 'Full interview content with Norris...',
    category: 'Interview',
    publishedAt: '2024-05-20',
    author: 'Interview Team',
    readTime: 4,
  },
  {
    id: '8',
    title: 'Sustainable Fuel: F1 Leads Motorsport Revolution',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    link: '/stories/f1-sustainable-fuel',
    summary:
      'How Formula 1 is pioneering sustainable fuel technology that could benefit the entire automotive industry.',
    content: 'Full story about sustainable fuel...',
    category: 'Feature',
    publishedAt: '2024-05-19',
    author: 'Environmental Desk',
    readTime: 6,
  },
  {
    id: '9',
    title: 'Behind the Scenes: Race Control Operation',
    image:
      'https://images.unsplash.com/photo-1592075556625-84f1656766c5?auto=format&fit=crop&w=800&q=80',
    link: '/stories/race-control-inside',
    summary:
      'Exclusive look at how race control manages complex F1 events with multiple stakeholders and split-second decisions.',
    content: 'Full behind the scenes content...',
    category: 'Exclusive',
    publishedAt: '2024-05-18',
    author: 'Race Officials',
    readTime: 7,
  },
  {
    id: '10',
    title: 'Zhou Guanyu Makes History with First Podium',
    image:
      'https://images.unsplash.com/photo-1547106636-7374979c01f0?auto=format&fit=crop&w=800&q=80',
    link: '/stories/zhou-historic-podium',
    summary:
      'Chinese driver Zhou Guanyu scores his maiden F1 podium in dramatic Austrian Grand Prix finish.',
    content: 'Full story about Zhou podium...',
    category: 'Race Report',
    publishedAt: '2024-05-17',
    author: 'Asia Desk',
    readTime: 5,
  },
  {
    id: '11',
    title: 'Pirelli Explains 2025 Tire Compound Changes',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2b8?auto=format&fit=crop&w=800&q=80',
    link: '/stories/pirelli-2025-tires',
    summary:
      'Tire manufacturer Pirelli details upcoming changes to compound selection for the 2025 season.',
    content: 'Full story about Pirelli tires...',
    category: 'Technical',
    publishedAt: '2024-05-16',
    author: 'Technical Team',
    readTime: 6,
  },
  {
    id: '12',
    title: 'Haas Reveals New Team Principal',
    image:
      'https://images.unsplash.com/photo-1562181839-5a7c78d560a4?auto=format&fit=crop&w=800&q=80',
    link: '/stories/haas-new-principal',
    summary:
      'American team Haas F1 announces surprise appointment of new team principal ahead of summer break.',
    content: 'Full story about Haas appointment...',
    category: 'News',
    publishedAt: '2024-05-15',
    author: 'News Desk',
    readTime: 4,
  },
];

// Featured stories for the hero section
const featuredStories: Story[] = [
  {
    id: 'featured-1',
    title: 'Season Midpoint Analysis: Who Leads the Development Race?',
    image:
      'https://images.unsplash.com/photo-1591439653790-8ad3ed46c7e0?auto=format&fit=crop&w=1200&q=80',
    link: '/stories/midpoint-development-analysis',
    summary:
      'Comprehensive analysis of team development progress as we reach the halfway point of the 2024 season. Discover which teams are making the biggest gains.',
    content: 'Full analysis content...',
    category: 'Analysis',
    publishedAt: '2024-05-26',
    author: 'Analysis Team',
    readTime: 10,
  },
  {
    id: 'featured-2',
    title: 'Exclusive: Inside the Red Bull Powertrains Facility',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    link: '/stories/red-bull-factory-tour',
    summary:
      'Never-before-seen access to Red Bulls state-of-the-art power unit manufacturing facility. Witness the cutting-edge technology.',
    content: 'Full factory tour content...',
    category: 'Exclusive',
    publishedAt: '2024-05-25',
    author: 'Exclusive Team',
    readTime: 12,
  },
];

// Popular stories
const popularStories: Story[] = [
  {
    id: 'popular-1',
    title: 'The Science of F1: Aerodynamics Explained',
    image:
      'https://images.unsplash.com/photo-1547516508-4c1f9c7c4ec3?auto=format&fit=crop&w=800&q=80',
    link: '/stories/f1-aerodynamics-explained',
    summary:
      'Understanding the complex aerodynamics that make Formula 1 cars so fast and why downforce is everything.',
    content: 'Full aerodynamics content...',
    category: 'Technical',
    publishedAt: '2024-05-20',
    author: 'Science Team',
    readTime: 9,
  },
  {
    id: 'popular-2',
    title: 'Driver Market: Who Goes Where in 2025?',
    image:
      'https://images.unsplash.com/photo-1614727263357-9b4d6b9c4b0b?auto=format&fit=crop&w=800&q=80',
    link: '/stories/2025-driver-market',
    summary:
      'Complete breakdown of the F1 driver market for 2025 with analysis of potential moves and contract situations.',
    content: 'Full driver market content...',
    category: 'Analysis',
    publishedAt: '2024-05-19',
    author: 'Market Analysis',
    readTime: 7,
  },
  {
    id: 'popular-3',
    title: 'Budget Cap: How It Changed F1 Forever',
    image:
      'https://images.unsplash.com/photo-1594729564534-5c14c4ae7f77?auto=format&fit=crop&w=800&q=80',
    link: '/stories/budget-cap-impact',
    summary:
      'Exploring the profound impact of the budget cap on team operations, development, and competitive balance.',
    content: 'Full budget cap analysis...',
    category: 'Analysis',
    publishedAt: '2024-05-18',
    author: 'Finance Desk',
    readTime: 8,
  },
];

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

  const filteredStories = mockStories.filter(
    story =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.author &&
        story.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedStories = showAllStories
    ? filteredStories
    : filteredStories.slice(0, 6);

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
                <option value="featured">Featured</option>
              </select>
            </div>
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
                <Link href={story.link} className="block h-full">
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
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {story.readTime} min read
                          </span>
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

          <StoriesSection
            stories={popularStories}
            title=""
            showViewAll={false}
            columns={{ mobile: 2, tablet: 3, desktop: 3, large: 3 }}
            variant="default"
          />
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
            <Link
              href="/stories/latest"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm uppercase tracking-wide flex items-center gap-1 group"
            >
              View All Latest
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StoriesSection
            stories={displayedStories}
            title=""
            showViewAll={false}
            columns={{ mobile: 2, tablet: 2, desktop: 3, large: 3 }}
            variant="default"
          />

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

        {/* All Stories Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                All Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our complete collection
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <StoriesSection
            stories={filteredStories.slice(0, 12)}
            title=""
            showViewAll={false}
            maxItems={12}
            columns={{ mobile: 2, tablet: 3, desktop: 3, large: 4 }}
            variant="default"
          />
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
              delivered to your inbox every week. Exclusive content, analysis,
              and behind-the-scenes access.
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
            <p className="text-red-100 text-sm mt-6 opacity-90">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at
              any time.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to contribute?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you a writer, photographer, or F1 expert? We're always looking
            for talented contributors.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Contact Our Editorial Team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
