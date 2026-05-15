'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Імпортуємо хук

export default function Navigation() {
  const pathname = usePathname(); // Отримуємо поточний шлях (наприклад, "/" або "/about")

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="flex gap-4 p-4 bg-gray-800">
      {navLinks.map((link) => {
        const isActive = pathname === link.href; // Перевіряємо, чи ми зараз тут

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg transition ${
              isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
