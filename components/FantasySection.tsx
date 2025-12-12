'use client';

import Link from 'next/link';

export default function FantasySection() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"></h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Join the F1 Fantasy League and predict race outcomes!
      </p>
      <Link
        href={`/fantasy`}
        className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Play Now
      </Link>
    </div>
  );
}
