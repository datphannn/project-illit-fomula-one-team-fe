import ScheduleSection from '@/components/ScheduleSection';

export default function SchedulePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Race Schedule</h1>
      <ScheduleSection />
    </div>
  );
}