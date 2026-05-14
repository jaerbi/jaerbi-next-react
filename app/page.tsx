'use client'; // 1. Це обов'язково в Next.js для інтерактивних компонентів

import { useState } from 'react'; // 2. Імпортуємо функцію для стану

export default function CharacterCard() {

//    name — це сама змінна (аналог public name = 'Steve').
// setName — це єдиний спосіб її змінити. Ти не можеш написати name = 'Alex'. React просто не помітить цього і не оновить екран. Треба обов'язково викликати setName('Alex').
  const [name, setName] = useState('Steve'); 
  const [color, setColor] = useState('bg-green-500');
  const [likes, setLikes] = useState(0);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleReset = () => {
    setName('Stave');
    setLikes(0);
  };

  return (
    <main className="p-10 flex flex-col items-center gap-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Редактор Персонажа</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 w-80 text-center">
        <div className={color + ' w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-4xl'}>
          {name[0]}
        </div>
        
        <h2 className="text-2xl mb-2">{name}</h2>
        <p className="text-gray-400 mb-4">Рівень лайків: {likes}</p>

        <button 
          onClick={() => setLikes(likes + 1)}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Дати Like 👍
        </button>
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
    </main>
  );
}
