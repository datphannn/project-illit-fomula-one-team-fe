'use client';

import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Feedback</h1>
      <FeedbackForm />
    </div>
  );
}