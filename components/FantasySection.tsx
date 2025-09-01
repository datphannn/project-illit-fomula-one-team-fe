'use client';

import { useState } from 'react';
import { drivers } from '@/lib/api/mockData';
import Button from '@/components/ui/Button';

export default function FantasySection() {
  const [winner, setWinner] = useState('');

  const handleSubmit = () => {
    console.log({ winner }); // Push to mockData.fantasyGaming later
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Predict Winner</h2>
      <select
        value={winner}
        onChange={(e) => setWinner(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.name}>{driver.name}</option>
        ))}
      </select>
      <Button onClick={handleSubmit}>Submit Prediction</Button>
    </div>
  );
}