'use client';

import { useState } from 'react';
import { likeGame } from '@/app/actions';

export default function LikeButton({ gameId }: { gameId: number }) {
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    const result = await likeGame(gameId); // Магія: клієнт викликає сервер як звичайну функцію
    alert(result.message);
    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold transition flex items-center gap-2 cursor-pointer"
    >
      <span>{loading ? '...' : '❤️ Like'}</span>
    </button>
  );
}
