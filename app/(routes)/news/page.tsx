import NewsSection from '@/components/NewsSection';

export default function NewsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">News</h1>
      <NewsSection />
    </div>
  );
}