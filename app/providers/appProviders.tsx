// src/providers/AppProviders.tsx
'use client';

import { ReactNode } from 'react';
import { UserProvider } from '../context/userContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
        {/* Сюди можна додати мову, тему, кошик тощо */}
        {children}
    </UserProvider>
  );
}
