// app/[locale]/stories/page.tsx
import React from 'react';
import { getTranslations } from 'next-intl/server';
import StoriesSection from '@/components/StoriesSection';
import { Story } from '@/lib/types/story';

// Mock data - thay thế bằng API call thực tế
const mockStories: Story[] = [
  {
    id: '1',
    title: 'Verstappen Dominates Monaco GP with Stunning Performance',
    image: '/images/stories/monaco-verstappen.jpg',
    link: '/stories/verstappen-monaco-domination',
    summary:
      'Red Bull driver Max Verstappen delivers a masterclass in Monaco, leading from start to finish in challenging wet conditions.',
    content: 'Full story content about Verstappen...',
  },
  {
    id: '2',
    title: 'Ferrari Reveals Major Upgrade Package for Canadian GP',
    image: '/images/stories/ferrari-upgrade.jpg',
    link: '/stories/ferrari-canada-upgrade',
    summary:
      'Scuderia Ferrari introduces significant aerodynamic updates aimed at closing the gap to Red Bull in the championship fight.',
    content: 'Full story content about Ferrari upgrades...',
  },
  {
    id: '3',
    title: 'Hamilton Signs New Multi-Year Contract with Mercedes',
    image: '/images/stories/hamilton-contract.jpg',
    link: '/stories/hamilton-mercedes-contract',
    summary:
      'Seven-time world champion Lewis Hamilton commits his future to Mercedes with a new contract extending through 2026.',
    content: 'Full story content about Hamilton contract...',
  },
  {
    id: '4',
    title: 'Alpine Introduces Revolutionary Sidepod Design',
    image: '/images/stories/alpine-sidepods.jpg',
    link: '/stories/alpine-innovation',
    summary:
      'French team Alpine surprises paddock with innovative sidepod concept that could change F1 aerodynamics.',
    content: 'Full story content about Alpine design...',
  },
  {
    id: '5',
    title: 'Young Driver Test: Who Impressed at Silverstone?',
    image: '/images/stories/young-driver-test.jpg',
    link: '/stories/young-driver-silverstone',
    summary:
      'Analysis of the young driver test session with standout performances from F2 and F3 prospects.',
    content: 'Full story content about young drivers...',
  },
  {
    id: '6',
    title: 'Technical Analysis: How Red Bull Maintains Advantage',
    image: '/images/stories/red-bull-tech.jpg',
    link: '/stories/red-bull-technical-edge',
    summary:
      'Deep dive into the technical innovations that keep Red Bull Racing ahead of the competition.',
    content: 'Full story content about Red Bull technology...',
  },
  {
    id: '7',
    title: 'Norris: "We Can Challenge for Wins This Season"',
    image: '/images/stories/norris-interview.jpg',
    link: '/stories/norris-interview',
    summary:
      'McLaren star Lando Norris confident about team progress and believes victories are within reach.',
    content: 'Full interview content with Norris...',
  },
  {
    id: '8',
    title: 'Sustainable Fuel: F1 Leads Motorsport Revolution',
    image: '/images/stories/sustainable-fuel.jpg',
    link: '/stories/f1-sustainable-fuel',
    summary:
      'How Formula 1 is pioneering sustainable fuel technology that could benefit the entire automotive industry.',
    content: 'Full story about sustainable fuel...',
  },
  {
    id: '9',
    title: 'Behind the Scenes: Race Control Operation',
    image: '/images/stories/race-control.jpg',
    link: '/stories/race-control-inside',
    summary:
      'Exclusive look at how race control manages complex F1 events with multiple stakeholders and split-second decisions.',
    content: 'Full behind the scenes content...',
  },
  {
    id: '10',
    title: 'Zhou Guanyu Makes History with First Podium',
    image: '/images/stories/zhou-podium.jpg',
    link: '/stories/zhou-historic-podium',
    summary:
      'Chinese driver Zhou Guanyu scores his maiden F1 podium in dramatic Austrian Grand Prix finish.',
    content: 'Full story about Zhou podium...',
  },
  {
    id: '11',
    title: 'Pirelli Explains 2025 Tire Compound Changes',
    image: '/images/stories/pirelli-tires.jpg',
    link: '/stories/pirelli-2025-tires',
    summary:
      'Tire manufacturer Pirelli details upcoming changes to compound selection for the 2025 season.',
    content: 'Full story about Pirelli tires...',
  },
  {
    id: '12',
    title: 'Haas Reveals New Team Principal',
    image: '/images/stories/haas-principal.jpg',
    link: '/stories/haas-new-principal',
    summary:
      'American team Haas F1 announces surprise appointment of new team principal ahead of summer break.',
    content: 'Full story about Haas appointment...',
  },
];

// Featured stories for the hero section
const featuredStories: Story[] = [
  {
    id: 'featured-1',
    title: 'Season Midpoint Analysis: Who Leads the Development Race?',
    image: '/images/stories/midpoint-analysis.jpg',
    link: '/stories/midpoint-development-analysis',
    summary:
      'Comprehensive analysis of team development progress as we reach the halfway point of the 2024 season.',
    content: 'Full analysis content...',
  },
  {
    id: 'featured-2',
    title: 'Exclusive: Inside the Red Bull Powertrains Facility',
    image: '/images/stories/red-bull-factory.jpg',
    link: '/stories/red-bull-factory-tour',
    summary:
      'Never-before-seen access to Red Bulls state-of-the-art power unit manufacturing facility.',
    content: 'Full factory tour content...',
  },
];

export default async function StoriesPage() {
  const t = await getTranslations('stories');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title') || 'F1 Stories'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle') ||
              'Dive deep into the world of Formula 1 with exclusive stories, analysis, and behind-the-scenes content.'}
          </p>
        </div>

        {/* Featured Stories */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {featuredStories.map((story, index) => (
              <div
                key={story.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                      {story.title}
                    </h2>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {story.summary}
                    </p>
                    <div className="mt-4 flex items-center text-red-400 font-semibold">
                      Read Full Story
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Stories */}
        <section className="mb-12">
          <StoriesSection
            stories={mockStories.slice(0, 6)}
            title={t('latest_stories') || 'Latest Stories'}
            showViewAll={false}
          />
        </section>

        {/* All Stories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('all_stories') || 'All Stories'}
            </h2>
            <div className="flex items-center space-x-4">
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="newest">
                  {t('sort_newest') || 'Newest First'}
                </option>
                <option value="oldest">
                  {t('sort_oldest') || 'Oldest First'}
                </option>
                <option value="popular">
                  {t('sort_popular') || 'Most Popular'}
                </option>
              </select>
            </div>
          </div>

          <StoriesSection
            stories={mockStories}
            title=""
            showViewAll={false}
            maxItems={12}
          />
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t('newsletter_title') || 'Never Miss a Story'}
            </h3>
            <p className="text-red-100 mb-6">
              {t('newsletter_subtitle') ||
                'Subscribe to our newsletter and get the latest F1 stories delivered to your inbox.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter_placeholder') || 'Enter your email'}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                {t('newsletter_button') || 'Subscribe'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata() {
  const t = await getTranslations('stories');

  return {
    title: t('meta_title') || 'F1 Stories - Formula 1 News & Analysis',
    description:
      t('meta_description') ||
      'Explore the latest Formula 1 stories, exclusive interviews, technical analysis, and behind-the-scenes content from the world of F1.',
    keywords: 'F1, Formula 1, racing, stories, news, analysis, interviews',
  };
}
