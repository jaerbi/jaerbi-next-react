'use client';

import { useUser } from '../context/userContext';

export default function UserBadge() {
  const { name } = useUser();

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Показуємо, хто саме зараз дивиться гру */}
      <span className="text-sm text-gray-400">Геймер: <b className="text-white">{name}</b></span>
    </div>
  );
}
