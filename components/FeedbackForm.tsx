'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = () => {
    console.log({ feedback, rating }); // Push to mockData.feedback later
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your feedback"
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}