import { INITIAL_GAMES } from '@/app/data/data';
import Link from 'next/link';
import Image from 'next/image';
import LikeButton from '@/app/components/likeButton';

export default async function GameDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = INITIAL_GAMES.find((g) => g.id === Number(id));

  if (!game) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <p className="mt-2 text-xl">Гру не знайдено</p>
          <Link href="/" className="mt-4 inline-block text-blue-400 hover:underline">
            Повернутися на головну
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* 1. Секція з великим банером */}
      <div className="absolute top-20 right-6 z-1">
        <LikeButton gameId={game.id} />
      </div>
      <div className="relative h-[400px] w-full">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover opacity-60"
          priority // Завантажуємо цю картинку першою (LCP)
        />
        {/* Градієнт для плавного переходу знизу */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-black tracking-tight">{game.title}</h1>
          <p className="mt-2 text-lg text-blue-400 uppercase tracking-widest font-semibold">{game.genre}</p>
        </div>
      </div>

      {/* 2. Контентна частина */}
      <div className="max-w-4xl px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Картка статусу */}

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase">Статус</h3>
            <p className="text-xl font-bold mt-1">{game.isFavorite ? '🌟 В списку обраних' : '🎮 В колекції'}</p>
          </div>

          {/* Картка платформи (приклад) */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase">ID Гри</h3>
            <p className="text-xl font-bold mt-1 text-blue-400">#00{id}</p>
          </div>

          {/* Картка з кнопкою назад */}
          <div className="flex items-center">
            <Link
              href="/"
              className="w-full text-center bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition"
            >
              ← Назад до списку
            </Link>
          </div>
        </div>

        {/* 3. Опис (placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold border-b border-gray-800 pb-4">Про гру</h2>
          <p className="mt-6 text-gray-400 leading-relaxed text-lg">
            Тут буде детальний опис для {game.title}. Оскільки ти створюєш контент для YouTube по
            {game.title === 'Civilization VII' ? ' стратегіях' : ' виживанню'}, ця сторінка ідеально підійде для опису
            твоїх проходжень або стрімів.
          </p>
        </div>
      </div>
    </main>
  );
}
