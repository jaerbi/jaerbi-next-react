// app/about/page.tsx
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="p-10 flex flex-col items-center gap-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold">Про проект</h1>
      <p className="text-gray-400 max-w-md text-center">
        Це навчальний проект на Next.js, де я практикуюся переносити свій досвід з Angular 
        у світ React та сучасного фронтенду.
      </p>
      
      {/* Кнопка повернення додому */}
      <Link 
        href="/" 
        className="text-blue-400 hover:underline border border-blue-400 px-4 py-2 rounded-lg"
      >
        ← Повернутися до ігор
      </Link>
    </main>
  );
}
