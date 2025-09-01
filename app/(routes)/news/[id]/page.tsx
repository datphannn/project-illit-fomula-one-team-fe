import { news } from '@/lib/api/mockData';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = news.find((n) => n.id === params.id);
  if (!item) return <div className="container mx-auto p-4 dark:text-white">Not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">{item.title}</h1>
      <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-4" />
      <p className="dark:text-white">{item.description}</p>
      <p className="text-gray-600 dark:text-gray-300">Author: {item.author}</p>
      <p className="text-gray-600 dark:text-gray-300">Views: {item.views}</p>
    </div>
  );
}