export default function Card({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
      <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}