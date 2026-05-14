'use client'; // 1. Це обов'язково в Next.js для інтерактивних компонентів

import { useState } from 'react'; // 2. Імпортуємо функцію для стану
import UserCard from './components/userCard';

interface Game {
  id: number;
  title: string;
  genre: string;
  isFavorite: boolean;
}

const INITIAL_GAMES: Game[] = [
    { id: 1, title: 'Civilization VII', genre: 'Strategy', isFavorite: true },
    { id: 2, title: 'Minecraft', genre: 'Sandbox', isFavorite: false },
    { id: 3, title: 'Chess', genre: 'Board Game', isFavorite: false },
    { id: 4, title: 'Subnautica 2', genre: 'Adventures', isFavorite: false },
]

export default function Home() {
  //    name — це сама змінна (аналог public name = 'Steve').
  // setName — це єдиний спосіб її змінити. Ти не можеш написати name = 'Alex'. React просто не помітить цього і не оновить екран. Треба обов'язково викликати setName('Alex').
  const [name, setName] = useState('Steve');
  const [likes, setLikes] = useState(0);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDeleteGame = (id: number) => () => {
    setGames(games.filter((game: Game) => game.id !== id));
  };
  const handleReset = () => {
    setName('Steve');
    setLikes(0);
    setGames(INITIAL_GAMES);
  };

  return (
    <main className="p-10 flex flex-col items-center gap-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={handleReset}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition cursor-pointer"
      >
        Reset
      </button>
      <div className="flex flex-col gap-2 w-80">
        <label className="text-sm text-gray-400 text-left">Змінити ім'я:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="bg-gray-700 border border-gray-600 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <h1 className="text-3xl font-bold text-white">Керування героями</h1>

      <div className="flex gap-[24px]">
        {/* Передаємо дані через атрибути (Props) */}
        <UserCard name={name} level={likes} avatarColor="bg-green-500" onLike={() => setLikes(likes + 1)} />
        <UserCard name={'Alex'} level={5+likes} isVip={true} avatarColor="bg-green-500" onLike={() => setLikes(likes + 1)} />
      </div>

      {!!games.length && (
        <div className="w-full max-w-md mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Список ігор:</h2>

          <ul className="space-y-3">
            {/* 3. Аналог *ngFor — використовуємо .map() */}
            {games.map((game) => (
              <li
                key={game.id} // Ключ — обов'язковий (як trackBy в Angular)
                className={`p-4 rounded-lg border transition ${
                  game.title === 'Civilization VII'
                    ? 'border-blue-500 bg-blue-900/20 font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{game.title}</span>

                  {/* 5. Аналог *ngIf — логічне && */}
                  {game.isFavorite && (
                    <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full uppercase font-black">
                      Favorite
                    </span>
                  )}
                  <button
                    onClick={handleDeleteGame(game.id)}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">{game.genre}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
