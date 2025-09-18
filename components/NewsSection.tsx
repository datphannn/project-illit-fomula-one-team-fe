import React from 'react';
import { NewsItem } from '@/lib/types/news';

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map(item => (
        <div key={item.id} className="bg-gray-800 rounded-lg p-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-white text-lg font-bold mt-4">{item.title}</h3>
          <p className="text-gray-400">
            {item.date} • {item.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
