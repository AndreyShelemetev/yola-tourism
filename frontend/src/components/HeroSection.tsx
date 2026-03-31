import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';

export default function HeroSection() {
  return (
    <section className="relative text-white overflow-hidden min-h-[520px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://visit-mariel.ru/upload/iblock/773/s1ts0pax2cj28wsxpwfofygfmhkh0p59.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Откройте для себя<br />
            <span className="text-accent-yellow">Йошкар-Олу</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed">
            Столица Республики Марий Эл — город с уникальной европейской
            архитектурой, богатой культурой и гостеприимными жителями.
          </p>
          <div className="mb-8">
            <Suspense fallback={<div className="h-11" />}>
              <SearchBar
                placeholder="Поиск по достопримечательностям, отелям, ресторанам..."
                targetPath="/search"
                paramName="q"
              />
            </Suspense>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/attractions"
              className="bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
            >
              Достопримечательности
            </Link>
            <Link
              href="/map"
              className="bg-accent-green text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Карта объектов
            </Link>
            <Link
              href="/hotels"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors shadow-lg"
            >
              Найти отель
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
