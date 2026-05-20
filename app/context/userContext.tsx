'use client'; // Контекст працює на клієнті

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Описуємо тип даних, які будуть жити в нашому "сервісі"
interface UserContextType {
  name: string;
  likes: number;
  setName: (name: string) => void;
  incrementLikes: () => void;
  resetUser: () => void;
}

// 2. Створюємо сам Контекст (це як токен для ін'єкції в Angular)
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Створюємо Провайдер (компонент, який зберігає стан і роздає його іншим)
export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Steve');
  const [likes, setLikes] = useState(0);

  const incrementLikes = () => setLikes((prev) => prev + 1);
  
  const resetUser = () => {
    setName('Steve');
    setLikes(0);
  };

  return (
    <UserContext.Provider value={{ name, likes, setName, incrementLikes, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 4. Створюємо кастомний хук для зручного використання (аналог inject(UserContext))
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser має використовуватися всередині UserProvider');
  }
  return context;
}
