export default function GameLoading() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Анімований спінер на Tailwind */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 font-medium animate-pulse">
        Завантаження інформації про гру...
      </p>
    </div>
  );
}
