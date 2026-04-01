import { getAttractions } from '@/lib/api';
import type { Attraction, PagedResult } from '@/lib/types';
import Card from '@/components/Card';
import SectionGrid from '@/components/SectionGrid';
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
    title: 'Достопримечательности Йошкар-Олы' + (page > 1 ? ` — страница ${page}` : ''),
    alternates: { canonical: '/attractions/' },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function AttractionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  let result: PagedResult<Attraction> = { items: [], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  try {
    result = await getAttractions({ category: params.category, search: params.search, page });
  } catch {
    // keep default empty result
  }

  return (
    <>
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Достопримечательности</h1>
          <p className="mt-2 text-white">
            Лучшие места для посещения в Йошкар-Оле
          </p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск достопримечательностей..." />
          </div>
        </div>
      </div>

      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((a) => (
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
