import { useTranslations } from 'next-intl';
import ResultsSection from '@/components/ResultsSection';
import { mockRacesDetailed } from '@/lib/api/mockData'; // Sử dụng dữ liệu chi tiết

export default function ResultsPage() {
  const t = useTranslations('results');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 border-b border-gray-700 pb-4">
          RESULTS
        </h1>
        <div className="mb-6">
          <select className="bg-gray-800 text-white p-2 rounded border border-gray-700">
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </div>
        <ResultsSection races={mockRacesDetailed} />
      </div>
    </div>
  );
}
