'use client'; // 1. Це обов'язково в Next.js для інтерактивних компонентів

import { useEffect, useState, useRef } from 'react'; // 2. Імпортуємо функцію для стану
import UserCard from './components/userCard';
import Link from 'next/link';
import { Game, INITIAL_GAMES } from './data/data';
import { getGames } from './actions';
import { useUser } from './context/userContext';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Home() {
  //    name — це сама змінна (аналог public name = 'Steve').
  // setName — це єдиний спосіб її змінити. Ти не можеш написати name = 'Alex'. React просто не помітить цього і не оновить екран. Треба обов'язково викликати setName('Alex').
  //   const [name, setName] = useState('Steve');
  //   const [likes, setLikes] = useState(0);
  //   ЗАМІСТЬ ЛОКАЛЬНОГО useState БЕРЕМО ДАНІ З КОНТЕКСТУ
  const { name, likes, setName, incrementLikes, resetUser } = useUser();
  const [games, setGames] = useState<Game[]>([]);
  const [newGameTitle, setNewGameTitle] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); // replace змінює URL без додавання нової історії в браузер (back button)
  const timerRef = import('react').then(() => {});
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const currentSearchValue = searchParams.get('search') || '';

  useEffect(() => {
    console.log(`Компонент з'явився (як ngOnInit)`);
    // Створюємо асинхронну функцію всередині useEffect
    const fetchGames = async () => {
      const freshGames = await getGames(); // Запитуємо свіжі дані з сервера

      if (currentSearchValue) {
        const filtered = freshGames.filter((game: any) =>
          game.title.toLowerCase().includes(currentSearchValue.toLowerCase()),
        );
        setGames(filtered);
      } else {
        setGames(freshGames);
      }

      //   setGames([...freshGames]);
    };

    fetchGames();
    return () => {};
  }, [currentSearchValue]);

  const handleSearch = (term: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    const params = new URLSearchParams(searchParams);

    searchTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      
      replace(`${pathname}?${params.toString()}`);
      console.log(`URL оновлено значенням: ${term}`);
    }, 400);

    // Оновлюємо URL "на льоту"
    replace(`${pathname}?${params.toString()}`);
  };

  const addNewGame = () => {
    if (!newGameTitle.trim()) return; // Перевірка на порожній рядок

    const newGame: Game = {
      id: Date.now(),
      title: newGameTitle,
      genre: 'Unknown',
      isFavorite: false,
      image: '',
    };

    setGames([...games, newGame]);
    setNewGameTitle(''); // Очищуємо інпут після додавання
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDeleteGame = (id: number) => () => {
    setGames(games.filter((game: Game) => game.id !== id));
  };
  const handleReset = () => {
    // setName('Steve');
    // setLikes(0);
    resetUser(); // Викликаємо ресет з контексту
    setGames([...INITIAL_GAMES]);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (newGameTitle.length < 3) {
      return;
    }

    if (event.key === 'Enter') {
      addNewGame();
    }
  };

  return (
    <main className="p-10 flex flex-col items-center gap-6">
      <div className="flex gap-[24px]">
        <button
          onClick={handleReset}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Reset
        </button>
      </div>
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
        <UserCard name={name} level={likes} avatarColor="bg-green-500" onLike={incrementLikes} />
        <UserCard name={'Alex'} level={5 + likes} isVip={true} avatarColor="bg-green-500" onLike={incrementLikes} />
      </div>

      <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
        <h2 className="text-xl font-bold">Додати нову гру</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Назва гри..."
            value={newGameTitle} // "Прив'язка" до стану
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewGameTitle(e.target.value)} // Оновлення стану при кожному символі
            className="flex-1 bg-gray-900 border border-gray-600 p-2 rounded-lg outline-none focus:border-blue-500"
          />

          <button
            onClick={addNewGame}
            disabled={newGameTitle.length < 3}
            className={`${newGameTitle.length < 3 ? 'bg-gray-300 opacity-50' : 'bg-green-600 hover:bg-green-500 cursor-pointer'}  px-4 py-2 rounded-lg font-bold transition`}
          >
            Додати
          </button>
        </div>
      </div>

      {/* Інпут для пошуку */}
      <div className="flex flex-col gap-2 w-full max-w-md mt-6">
        <label className="text-sm text-gray-400 text-left">Пошук ігор на сторінці:</label>
        <input
          type="text"
          placeholder="Введіть назву для фільтрації..."
          defaultValue={currentSearchValue} // Беремо початкове значення з URL
          onChange={(e) => handleSearch(e.target.value)} // При зміні — оновлюємо URL
          className="bg-gray-700 border border-gray-600 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-white"
        />
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
                  <Link href={`/game/${game.id}`} className="text-blue-400 hover:underline">
                    {game.title}
                  </Link>

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
