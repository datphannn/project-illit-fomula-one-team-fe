'use client';

import { useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Help Shape F1
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your feedback helps us improve the Formula 1 experience for millions
            of fans worldwide
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-2xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'form'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📝 Submit Feedback
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'faq'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ❓ FAQ
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'form' ? (
          <div className="max-w-4xl mx-auto">
            <FeedbackForm />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="font-bold text-white mb-3 text-lg">
                    How is my feedback used?
                  </h3>
                  <p className="text-gray-300">
                    Your feedback is carefully reviewed by our product team and
                    used to prioritize improvements, fix issues, and develop new
                    features for the F1 digital platform.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="font-bold text-white mb-3 text-lg">
                    Will I receive a response?
                  </h3>
                  <p className="text-gray-300">
                    While we can't respond to every submission, we read all
                    feedback and may contact you if we need more details about
                    your suggestion or issue.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="font-bold text-white mb-3 text-lg">
                    What type of feedback is most helpful?
                  </h3>
                  <p className="text-gray-300">
                    Specific, detailed feedback about your experience - what you
                    liked, what confused you, features you'd love to see, or any
                    issues you encountered.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="font-bold text-white mb-3 text-lg">
                    Can I report bugs through this form?
                  </h3>
                  <p className="text-gray-300">
                    Absolutely! Please select "Bug Report" as the category and
                    provide as much detail as possible about the issue,
                    including steps to reproduce it.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-red-600/10 border border-red-600/20 rounded-xl">
                <h3 className="font-bold text-white mb-2">
                  Need immediate help?
                </h3>
                <p className="text-gray-300 mb-4">
                  For urgent issues or account-related problems, please contact
                  our support team.
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open('mailto:support@formula1.com')}
                >
                  📧 Contact Support
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/20 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Thank You for Your Support!
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              The F1 digital experience continues to evolve thanks to valuable
              input from our global community of fans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:translate-y-[-3px] hover:shadow-lg transform transition-all duration-300 ease-in-out"
                onClick={() =>
                  window.open('https://www.formula1.com', '_blank')
                }
              >
                🏎️ Visit F1 Official Site
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => window.open('https://www.fia.com', '_blank')}
              >
                🏛️ FIA Website
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
