import { getEvents } from '@/lib/api';
import type { Event, PagedResult } from '@/lib/types';
import SectionGrid from '@/components/SectionGrid';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  return {
    title: 'События в Йошкар-Оле' + (page > 1 ? ` — страница ${page}` : ''),
    alternates: { canonical: '/events/' },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  let result: PagedResult<Event> = { items: [], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  try {
    result = await getEvents({ upcoming: true, search: params.search, page });
  } catch {
    // keep default empty result
  }

  return (
    <>
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">События</h1>
          <p className="mt-2 text-white">
            Мероприятия и фестивали Йошкар-Олы
          </p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск событий..." />
          </div>
        </div>
      </div>

      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((e) => (
            <Card
              key={e.id}
              href={`/events/${e.id}`}
              imageUrl={e.imageUrl}
              title={e.title}
              subtitle={e.location}
              badge={e.isFree ? 'Бесплатно' : e.price ? `${e.price} ₽` : undefined}
            >
              <div className="text-sm text-gray-500">
                📅 {formatDate(e.startDate)}
                {e.endDate && ` — ${formatDate(e.endDate)}`}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            {params.search
              ? `По запросу «${params.search}» ничего не найдено`
              : 'Данные загружаются... Убедитесь, что сервер запущен.'}
          </p>
        )}
      </SectionGrid>

      <Suspense>
        <Pagination currentPage={result.page} totalPages={result.totalPages} totalCount={result.totalCount} />
      </Suspense>
    </>
  );
}
