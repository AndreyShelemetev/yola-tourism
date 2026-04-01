import { searchAll } from '@/lib/api';
import type { SearchResult } from '@/lib/types';
import Card from '@/components/Card';
import StarRating from '@/components/StarRating';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export const metadata = {
  title: 'Поиск — Йошкар-Ола Туризм',
  robots: { index: false, follow: true },
  alternates: { canonical: '/search/' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';

  let results: SearchResult | null = null;
  if (query) {
    try {
      results = await searchAll(query);
    } catch {
      results = null;
    }
  }

  const totalCount = results
    ? results.attractions.length +
      results.hotels.length +
      results.restaurants.length +
      results.events.length
    : 0;

  return (
    <>
      <div className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Поиск</h1>
          <p className="mt-2 text-primary-200">
            Найдите достопримечательности, отели, рестораны и события
          </p>
          <div className="mt-4">
            <SearchBar
              placeholder="Поиск по всему сайту..."
              paramName="q"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!query && (
          <p className="text-gray-500 text-center py-12 text-lg">
            Введите запрос для поиска по достопримечательностям, отелям, ресторанам и событиям
          </p>
        )}

        {query && totalCount === 0 && (
          <p className="text-gray-500 text-center py-12 text-lg">
            По запросу «{query}» ничего не найдено
          </p>
        )}

        {results && results.attractions.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Достопримечательности
              </h2>
              <Link
                href={`/attractions?search=${encodeURIComponent(query)}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Все результаты →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.attractions.map((a) => (
                <Card
                  key={a.id}
                  href={`/attractions/${a.id}`}
                  imageUrl={a.imageUrl}
                  title={a.name}
                  subtitle={a.address}
                  badge={a.isFree ? 'Бесплатно' : undefined}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-accent-400">★ {a.rating.toFixed(1)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{a.category}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {results && results.hotels.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Отели</h2>
              <Link
                href={`/hotels?search=${encodeURIComponent(query)}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Все результаты →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.hotels.map((h) => (
                <Card
                  key={h.id}
                  href={`/hotels/${h.id}`}
                  imageUrl={h.imageUrl}
                  title={h.name}
                  subtitle={h.address}
                >
                  <div className="space-y-1">
                    <StarRating stars={h.stars} />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-accent-400">★ {h.rating.toFixed(1)}</span>
                      <span className="font-semibold text-primary-700">
                        от {h.priceFrom.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {results && results.restaurants.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Рестораны и кафе
              </h2>
              <Link
                href={`/restaurants?search=${encodeURIComponent(query)}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Все результаты →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.restaurants.map((r) => (
                <Card
                  key={r.id}
                  href={`/restaurants/${r.id}`}
                  imageUrl={r.imageUrl}
                  title={r.name}
                  subtitle={r.address}
                  badge={r.hasDelivery ? 'Доставка' : undefined}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-accent-400">★ {r.rating.toFixed(1)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{r.cuisine}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{r.priceRange}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {results && results.events.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">События</h2>
              <Link
                href={`/events?search=${encodeURIComponent(query)}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Все результаты →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.events.map((e) => (
                <Card
                  key={e.id}
                  href={`/events/${e.id}`}
                  imageUrl={e.imageUrl}
                  title={e.title}
                  subtitle={e.location}
                  badge={
                    e.isFree ? 'Бесплатно' : e.price ? `${e.price} ₽` : undefined
                  }
                >
                  <div className="text-sm text-gray-500">
                    📅 {formatDate(e.startDate)}
                    {e.endDate && ` — ${formatDate(e.endDate)}`}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
