export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-f1-red text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {children}
    </button>
  );
}