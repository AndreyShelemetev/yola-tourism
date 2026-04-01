import { getHotels } from '@/lib/api';
import type { Hotel, PagedResult } from '@/lib/types';
import Card from '@/components/Card';
import StarRating from '@/components/StarRating';
import SectionGrid from '@/components/SectionGrid';
import SearchBar from '@/components/SearchBar';
import HotelFilters from '@/components/HotelFilters';
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
    title: 'Отели Йошкар-Олы' + (page > 1 ? ` — страница ${page}` : ''),
    alternates: { canonical: '/hotels/' },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; minStars?: string; minRating?: string; city?: string; search?: string; page?: string }>;
}) {
  let result: PagedResult<Hotel> = { items: [], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  try {
    result = await getHotels({
      sort: params.sort,
      minStars: params.minStars ? Number(params.minStars) : undefined,
      minRating: params.minRating ? Number(params.minRating) : undefined,
      city: params.city,
      search: params.search,
      page,
    });
  } catch {
    // keep default empty result
  }

  return (
    <>
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Отели</h1>
          <p className="mt-2 text-white">
            Лучшие варианты размещения в Йошкар-Оле
          </p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск отелей..." />
          </div>
          <Suspense>
            <HotelFilters />
          </Suspense>
        </div>
      </div>

      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((h) => (
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
                <div className="flex gap-2 text-xs text-gray-400">
                  {h.hasWifi && <span>📶 Wi-Fi</span>}
                  {h.hasParking && <span>🅿️ Парковка</span>}
                </div>
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
