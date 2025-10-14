'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    feedback: '',
    rating: 5,
    category: 'general',
    email: '',
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'design', label: 'Design Suggestion' },
    { value: 'content', label: 'Content Feedback' },
    { value: 'performance', label: 'Performance Issue' },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Feedback submitted:', {
      ...formData,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        feedback: '',
        rating: 5,
        category: 'general',
        email: '',
        name: '',
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="text-lg opacity-90">
          Your feedback has been received. We appreciate you helping us improve
          the F1 experience!
        </p>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl">💬</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Help Shape F1 Website
        </h2>
        <p className="text-gray-300 text-lg">
          Share your thoughts and help us improve your F1 experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Feedback Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            How would you rate your experience?
          </label>
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className={`text-2xl transition-transform hover:scale-110 ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-500'
                }`}
              >
                {star <= formData.rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-gray-400">
            {formData.rating === 1 && 'Poor'}
            {formData.rating === 2 && 'Fair'}
            {formData.rating === 3 && 'Good'}
            {formData.rating === 4 && 'Very Good'}
            {formData.rating === 5 && 'Excellent'}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Your Feedback
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Tell us what you think about the website, what you'd like to see improved, or any features you'd love to have..."
            rows={6}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {formData.feedback.length}/500 characters
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !formData.feedback.trim()}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            '📋 Submit Feedback'
          )}
        </Button>

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-500">
          Your feedback helps us improve. We may contact you for follow-up
          questions.
        </p>
      </form>
    </Card>
  );
}
