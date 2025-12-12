import ResultsSection from '@/components/ResultsSection';
import { mockRacesDetailed } from '@/lib/api/mockData'; // Sử dụng dữ liệu chi tiết

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 border-b border-gray-700 pb-4">
          RESULTS
        </h1>

        {/* cast to any to satisfy TypeScript if component props are not declared */}
        <ResultsSection {...({ races: mockRacesDetailed } as any)} />
      </div>
    </div>
  );
}
