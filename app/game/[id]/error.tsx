'use client';

import { useEffect } from 'react';

export default function GameError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Зловлено помилку:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl border border-red-500/30 text-center max-w-md shadow-xl">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-2xl font-bold mt-4 text-red-400">Упс, щось пішло не так!</h2>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
          Не вдалося завантажити дані гри. Можливо, проблеми із сервером або базою даних.
        </p>
        
        <button
          onClick={() => reset()} // reset() спробує перерендерити серверний компонент сторінки
          className="mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-xl transition cursor-pointer"
        >
          Спробувати знову
        </button>
      </div>
    </div>
  );
}
