import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  parseSlugSegments,
  ENTITY_TYPES,
  REGIONS,
  CITIES,
  SITE_NAME,
  SITE_URL,
  generateListingMeta,
  buildPath,
  type ParsedSlug,
} from '@/lib/seo';
import { makeObjectSlug, extractIdFromSlug } from '@/lib/slugify';
import {
  getAttractions,
  getAttraction,
  getHotels,
  getHotel,
  getRestaurants,
  getRestaurant,
  getEvents,
  getEvent,
} from '@/lib/api';
import Card from '@/components/Card';
import SectionGrid from '@/components/SectionGrid';
import SearchBar from '@/components/SearchBar';
import StarRating from '@/components/StarRating';
import Pagination from '@/components/Pagination';
import Breadcrumbs, { buildBreadcrumbs } from '@/components/Breadcrumbs';
import HotelFilters from '@/components/HotelFilters';
import {
  OrganizationLd,
  TouristAttractionLd,
  LodgingLd,
  RestaurantLd,
  EventLd,
} from '@/components/JsonLd';
import { Suspense } from 'react';

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlugSegments(slug);
  if (!parsed.valid) return { title: 'Страница не найдена' };

  // Карточка объекта
  if (parsed.objectSlug) {
    const meta = await getObjectMeta(parsed);
    if (meta) {
      return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: meta.canonical },
      };
    }
    return { title: 'Страница не найдена' };
  }

  // Листинг
  const { title, description, noindex } = generateListingMeta(parsed);
  const canonicalPath = buildCanonicalPath(parsed);
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ─── Page ─── */
export default async function CatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const parsed = parseSlugSegments(slug);
  if (!parsed.valid) notFound();

  // Карточка объекта
  if (parsed.objectSlug) {
    return renderObjectDetail(parsed);
  }

  // Листинг или обзор
  if (parsed.type) {
    return renderListing(parsed, sp);
  }

  // Страница города
  if (parsed.city) {
    return renderCityOverview(parsed);
  }

  // Страница региона
  if (parsed.region) {
    return renderRegionOverview(parsed);
  }

  notFound();
}

/* ─── Rendering helpers ─── */

function buildCanonicalPath(parsed: ParsedSlug): string {
  const parts: string[] = [];
  if (parsed.region) parts.push(parsed.region);
  if (parsed.city) parts.push(parsed.city);
  if (parsed.type) parts.push(parsed.type);
  // Canonical всегда указывает на основную страницу (без /page/N)
  return buildPath(...parts);
}

async function getObjectMeta(parsed: ParsedSlug) {
  if (!parsed.objectSlug || !parsed.type) return null;
  const id = extractIdFromSlug(parsed.objectSlug);
  if (!id) return null;
  const et = ENTITY_TYPES[parsed.type];
  if (!et) return null;

  try {
    let name = '';
    let desc = '';
    if (et.apiPath === 'attractions') {
      const obj = await getAttraction(id);
      name = obj.name;
      desc = obj.shortDescription;
    } else if (et.apiPath === 'hotels') {
      const obj = await getHotel(id);
      name = obj.name;
      desc = obj.shortDescription;
    } else if (et.apiPath === 'restaurants') {
      const obj = await getRestaurant(id);
      name = obj.name;
      desc = obj.shortDescription;
    } else if (et.apiPath === 'events') {
      const obj = await getEvent(id);
      name = obj.title;
      desc = obj.shortDescription;
    }
    const canonical = buildPath(
      parsed.region!,
      parsed.city ?? '',
      parsed.type,
      parsed.objectSlug!
    );
    return {
      title: `${name} — ${et.nameSingular.toLowerCase()} в Марий Эл | ${SITE_NAME}`,
      description: desc,
      canonical,
    };
  } catch {
    return null;
  }
}

function buildObjectHref(
  parsed: ParsedSlug,
  name: string,
  id: number
): string {
  return buildPath(
    parsed.region ?? 'mari-el',
    parsed.city ?? 'yoshkar-ola',
    parsed.type!,
    makeObjectSlug(name, id)
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ─── Region overview ─── */
async function renderRegionOverview(parsed: ParsedSlug) {
  const region = REGIONS[parsed.region!];
  const crumbs = buildBreadcrumbs({ region: parsed.region });

  return (
    <>
      <OrganizationLd />
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">
            Туризм в {region.nameIn}
          </h1>
          <p className="mt-2 text-white">
            Достопримечательности, отели, рестораны и события республики
          </p>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(ENTITY_TYPES).map((et) => (
            <Link
              key={et.slug}
              href={buildPath(parsed.region!, et.slug)}
              className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-2 text-dark group-hover:text-primary-500 transition-colors">
                {et.namePlural}
              </h3>
              <p className="text-gray-500 text-sm">
                {et.nameInCity} {region.nameIn}
              </p>
            </Link>
          ))}
        </div>
        {/* Города */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Города и районы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(CITIES)
            .filter(([, c]) => c.region === parsed.region)
            .map(([slug, c]) => (
              <Link
                key={slug}
                href={buildPath(parsed.region!, slug)}
                className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all p-6"
              >
                <h3 className="text-lg font-semibold text-dark group-hover:text-primary-500 transition-colors">
                  {c.name}
                </h3>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

/* ─── City overview ─── */
async function renderCityOverview(parsed: ParsedSlug) {
  const city = CITIES[parsed.city!];
  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
  });

  return (
    <>
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">
            {city.name}
          </h1>
          <p className="mt-2 text-white">
            Путеводитель по {city.nameIn} — что посмотреть, где остановиться и поесть
          </p>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(ENTITY_TYPES).map((et) => (
            <Link
              key={et.slug}
              href={buildPath(parsed.region!, parsed.city!, et.slug)}
              className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-2 text-dark group-hover:text-primary-500 transition-colors">
                {et.namePlural}
              </h3>
              <p className="text-gray-500 text-sm">
                {et.nameInCity} в {city.nameIn}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── Listing page ─── */
async function renderListing(parsed: ParsedSlug, sp: Record<string, string | undefined>) {
  const et = ENTITY_TYPES[parsed.type!];
  const { h1, noindex } = generateListingMeta(parsed);
  const page = parsed.page ?? (sp.page ? Number(sp.page) : 1);
  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
    type: parsed.type,
  });
  const canonicalPath = buildCanonicalPath(parsed);

  if (et.apiPath === 'attractions') {
    return renderAttractionsList(parsed, et, h1, crumbs, page, noindex, canonicalPath, sp);
  }
  if (et.apiPath === 'hotels') {
    return renderHotelsList(parsed, et, h1, crumbs, page, noindex, canonicalPath, sp);
  }
  if (et.apiPath === 'restaurants') {
    return renderRestaurantsList(parsed, et, h1, crumbs, page, noindex, canonicalPath, sp);
  }
  if (et.apiPath === 'events') {
    return renderEventsList(parsed, et, h1, crumbs, page, noindex, canonicalPath, sp);
  }
  notFound();
}

async function renderAttractionsList(
  parsed: ParsedSlug,
  et: typeof ENTITY_TYPES[string],
  h1: string,
  crumbs: ReturnType<typeof buildBreadcrumbs>,
  page: number,
  noindex: boolean,
  canonicalPath: string,
  sp: Record<string, string | undefined>
) {
  let result = { items: [] as any[], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  try {
    result = await getAttractions({ page, category: sp.category, search: sp.search });
  } catch {}

  return (
    <>
      {noindex && <meta name="robots" content="noindex,follow" />}
      <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">{h1}</h1>
          <p className="mt-2 text-white">Лучшие места для посещения</p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск достопримечательностей..." />
          </div>
        </div>
      </div>
      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((a: any) => (
            <Card
              key={a.id}
              href={buildObjectHref(parsed, a.name, a.id)}
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
            Данные загружаются...
          </p>
        )}
      </SectionGrid>
      <Suspense>
        <Pagination currentPage={result.page} totalPages={result.totalPages} totalCount={result.totalCount} />
      </Suspense>
    </>
  );
}

async function renderHotelsList(
  parsed: ParsedSlug,
  et: typeof ENTITY_TYPES[string],
  h1: string,
  crumbs: ReturnType<typeof buildBreadcrumbs>,
  page: number,
  noindex: boolean,
  canonicalPath: string,
  sp: Record<string, string | undefined>
) {
  let result = { items: [] as any[], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  try {
    result = await getHotels({
      page,
      sort: sp.sort,
      minStars: sp.minStars ? Number(sp.minStars) : undefined,
      minRating: sp.minRating ? Number(sp.minRating) : undefined,
      city: sp.city,
      search: sp.search,
    });
  } catch {}

  return (
    <>
      {noindex && <meta name="robots" content="noindex,follow" />}
      <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">{h1}</h1>
          <p className="mt-2 text-white">Лучшие варианты размещения</p>
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
          result.items.map((h: any) => (
            <Card
              key={h.id}
              href={buildObjectHref(parsed, h.name, h.id)}
              imageUrl={h.imageUrl}
              title={h.name}
              subtitle={h.address}
            >
              <div className="space-y-1">
                <StarRating stars={h.stars} />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-primary-600 text-white font-bold px-1.5 py-0.5 rounded text-xs">{h.rating.toFixed(1)}</span>
                    {h.reviewCount > 0 && (
                      <span className="text-gray-400 text-xs">{h.reviewCount} отз.</span>
                    )}
                  </div>
                  <span className="font-semibold text-primary-700">
                    от {h.priceFrom?.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                {h.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {h.amenities.slice(0, 3).map((a: string, i: number) => (
                      <span key={i} className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{a}</span>
                    ))}
                    {h.amenities.length > 3 && (
                      <span className="text-gray-400 text-[10px] py-0.5">+{h.amenities.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            Данные загружаются...
          </p>
        )}
      </SectionGrid>
      <Suspense>
        <Pagination currentPage={result.page} totalPages={result.totalPages} totalCount={result.totalCount} />
      </Suspense>
    </>
  );
}

async function renderRestaurantsList(
  parsed: ParsedSlug,
  et: typeof ENTITY_TYPES[string],
  h1: string,
  crumbs: ReturnType<typeof buildBreadcrumbs>,
  page: number,
  noindex: boolean,
  canonicalPath: string,
  sp: Record<string, string | undefined>
) {
  let result = { items: [] as any[], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  try {
    result = await getRestaurants({ page, cuisine: sp.cuisine, search: sp.search });
  } catch {}

  return (
    <>
      {noindex && <meta name="robots" content="noindex,follow" />}
      <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">{h1}</h1>
          <p className="mt-2 text-white">Где вкусно поесть</p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск ресторанов и кафе..." />
          </div>
        </div>
      </div>
      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((r: any) => (
            <Card
              key={r.id}
              href={buildObjectHref(parsed, r.name, r.id)}
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
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            Данные загружаются...
          </p>
        )}
      </SectionGrid>
      <Suspense>
        <Pagination currentPage={result.page} totalPages={result.totalPages} totalCount={result.totalCount} />
      </Suspense>
    </>
  );
}

async function renderEventsList(
  parsed: ParsedSlug,
  et: typeof ENTITY_TYPES[string],
  h1: string,
  crumbs: ReturnType<typeof buildBreadcrumbs>,
  page: number,
  noindex: boolean,
  canonicalPath: string,
  sp: Record<string, string | undefined>
) {
  let result = { items: [] as any[], totalCount: 0, page: 1, pageSize: 12, totalPages: 0 };
  try {
    result = await getEvents({ upcoming: true, page, search: sp.search });
  } catch {}

  return (
    <>
      {noindex && <meta name="robots" content="noindex,follow" />}
      <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
      <div className="bg-[rgb(204,1,0)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl md:text-4xl font-bold">{h1}</h1>
          <p className="mt-2 text-white">Мероприятия и фестивали</p>
          <div className="mt-4">
            <SearchBar placeholder="Поиск событий..." />
          </div>
        </div>
      </div>
      <SectionGrid title="">
        {result.items.length > 0 ? (
          result.items.map((e: any) => (
            <Card
              key={e.id}
              href={buildObjectHref(parsed, e.title, e.id)}
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
            Данные загружаются...
          </p>
        )}
      </SectionGrid>
      <Suspense>
        <Pagination currentPage={result.page} totalPages={result.totalPages} totalCount={result.totalCount} />
      </Suspense>
    </>
  );
}

/* ─── Object detail ─── */
async function renderObjectDetail(parsed: ParsedSlug) {
  const et = ENTITY_TYPES[parsed.type!];
  if (!et) notFound();

  const id = extractIdFromSlug(parsed.objectSlug!);
  if (!id) notFound();

  if (et.apiPath === 'attractions') return renderAttractionDetail(parsed, id);
  if (et.apiPath === 'hotels') return renderHotelDetail(parsed, id);
  if (et.apiPath === 'restaurants') return renderRestaurantDetail(parsed, id);
  if (et.apiPath === 'events') return renderEventDetail(parsed, id);
  notFound();
}

async function renderAttractionDetail(parsed: ParsedSlug, id: number) {
  let attraction;
  try {
    attraction = await getAttraction(id);
  } catch {
    notFound();
  }
  if (!attraction) notFound();

  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
    type: parsed.type,
    objectName: attraction.name,
  });
  const canonicalUrl = `${SITE_URL}${buildPath(
    parsed.region!,
    parsed.city ?? 'yoshkar-ola',
    parsed.type!,
    makeObjectSlug(attraction.name, id)
  )}`;

  return (
    <>
      <TouristAttractionLd
        name={attraction.name}
        description={attraction.description}
        address={attraction.address}
        image={attraction.imageUrl}
        rating={attraction.rating}
        url={canonicalUrl}
      />
      <link rel="canonical" href={canonicalUrl} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={crumbs} />
        {attraction.imageUrl && (
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
          />
        )}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
            {attraction.category}
          </span>
          {attraction.isFree && (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Бесплатно
            </span>
          )}
          <span className="text-accent-400 font-semibold">★ {attraction.rating.toFixed(1)}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{attraction.name}</h1>
        <p className="text-gray-500 mb-6">📍 {attraction.address}</p>
        {attraction.workingHours && <p className="text-gray-500 mb-6">🕐 {attraction.workingHours}</p>}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{attraction.description}</p>
      </div>
    </>
  );
}

async function renderHotelDetail(parsed: ParsedSlug, id: number) {
  let hotel;
  try {
    hotel = await getHotel(id);
  } catch {
    notFound();
  }
  if (!hotel) notFound();

  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
    type: parsed.type,
    objectName: hotel.name,
  });
  const canonicalUrl = `${SITE_URL}${buildPath(
    parsed.region!,
    parsed.city ?? 'yoshkar-ola',
    parsed.type!,
    makeObjectSlug(hotel.name, id)
  )}`;

  const descSections = [
    { title: 'Расположение и транспорт', text: hotel.descriptionLocation },
    { title: 'Номера и размещение', text: hotel.descriptionRooms },
    { title: 'Питание и завтрак', text: hotel.descriptionFood },
    { title: 'Инфраструктура и удобства', text: hotel.descriptionInfrastructure },
    { title: 'Сервис и персонал', text: hotel.descriptionService },
    { title: 'Достопримечательности рядом', text: hotel.descriptionAttractions },
  ].filter(s => s.text);

  const reviewCats = [
    { label: 'Питание', value: hotel.ratingFood },
    { label: 'Номер', value: hotel.ratingRoom },
    { label: 'Wi-Fi', value: hotel.ratingWifi },
    { label: 'Цена', value: hotel.ratingPrice },
    { label: 'Гигиена', value: hotel.ratingHygiene },
    { label: 'Расположение', value: hotel.ratingLocation },
    { label: 'Услуги', value: hotel.ratingService },
    { label: 'Чистота', value: hotel.ratingCleanliness },
  ].filter(c => c.value > 0);

  const allImages = hotel.images?.length ? hotel.images : hotel.imageUrl ? [hotel.imageUrl] : [];

  return (
    <>
      <LodgingLd
        name={hotel.name}
        description={hotel.description}
        address={hotel.address}
        image={allImages[0] || hotel.imageUrl}
        rating={hotel.rating}
        stars={hotel.stars}
        priceFrom={hotel.priceFrom}
        url={canonicalUrl}
      />
      <link rel="canonical" href={canonicalUrl} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={crumbs} />

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
              <div className="md:col-span-2 md:row-span-2">
                <img src={allImages[0]} alt={hotel.name} className="w-full h-64 md:h-[400px] object-cover" loading="eager" />
              </div>
              {allImages.slice(1, 5).map((img, i) => (
                <div key={i} className="hidden md:block">
                  <img src={img} alt={`${hotel.name} - фото ${i + 2}`} className="w-full h-[196px] object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            {allImages.length > 5 && (
              <p className="text-sm text-gray-500 mt-2">+{allImages.length - 5} фото</p>
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <StarRating stars={hotel.stars} />
          <div className="flex items-center gap-2">
            <span className="bg-primary-600 text-white font-bold px-2.5 py-1 rounded-lg text-lg">{hotel.rating.toFixed(1)}</span>
            {hotel.reviewCount > 0 && (
              <span className="text-gray-500 text-sm">{hotel.reviewCount} отзывов</span>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-gray-500 mb-2">📍 {hotel.address}</p>

        {hotel.priceFrom > 0 && (
          <p className="text-2xl font-bold text-dark mb-4">
            от {hotel.priceFrom.toLocaleString('ru-RU')} ₽ / ночь
          </p>
        )}

        {(hotel.checkIn || hotel.checkOut) && (
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            {hotel.checkIn && <span>Заезд: с {hotel.checkIn}</span>}
            {hotel.checkOut && <span>Выезд: до {hotel.checkOut}</span>}
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {hotel.amenities.map((a, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Main Description */}
        {hotel.description && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Описание</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {/* Description Sections */}
        {descSections.length > 0 && (
          <div className="mb-8 space-y-4">
            {descSections.map((s, i) => (
              <details key={i} className="bg-gray-50 rounded-lg" open={i === 0}>
                <summary className="cursor-pointer px-4 py-3 font-semibold text-dark hover:bg-gray-100 rounded-lg">
                  {s.title}
                </summary>
                <p className="px-4 pb-4 text-gray-700 leading-relaxed">{s.text}</p>
              </details>
            ))}
          </div>
        )}

        {/* Review Category Ratings */}
        {reviewCats.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Оценки по категориям</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reviewCats.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-28 shrink-0">{c.label}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${c.value * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">{c.value.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts */}
        {(hotel.phone || hotel.website) && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Контакты</h3>
            {hotel.phone && <p className="text-gray-600">📞 {hotel.phone}</p>}
            {hotel.website && (
              <p>
                🌐{' '}
                <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  {hotel.website}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

async function renderRestaurantDetail(parsed: ParsedSlug, id: number) {
  let restaurant;
  try {
    restaurant = await getRestaurant(id);
  } catch {
    notFound();
  }
  if (!restaurant) notFound();

  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
    type: parsed.type,
    objectName: restaurant.name,
  });
  const canonicalUrl = `${SITE_URL}${buildPath(
    parsed.region!,
    parsed.city ?? 'yoshkar-ola',
    parsed.type!,
    makeObjectSlug(restaurant.name, id)
  )}`;

  return (
    <>
      <RestaurantLd
        name={restaurant.name}
        description={restaurant.description}
        address={restaurant.address}
        image={restaurant.imageUrl}
        rating={restaurant.rating}
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        phone={restaurant.phone}
        url={canonicalUrl}
      />
      <link rel="canonical" href={canonicalUrl} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={crumbs} />
        {restaurant.imageUrl && (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
        )}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">{restaurant.cuisine}</span>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">{restaurant.priceRange}</span>
          {restaurant.hasDelivery && (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">🚗 Доставка</span>
          )}
          <span className="text-accent-400 font-semibold">★ {restaurant.rating.toFixed(1)}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-gray-500 mb-2">📍 {restaurant.address}</p>
        {restaurant.workingHours && <p className="text-gray-500 mb-2">🕐 {restaurant.workingHours}</p>}
        {restaurant.phone && <p className="text-gray-500 mb-6">📞 {restaurant.phone}</p>}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{restaurant.description}</p>
      </div>
    </>
  );
}

async function renderEventDetail(parsed: ParsedSlug, id: number) {
  let event;
  try {
    event = await getEvent(id);
  } catch {
    notFound();
  }
  if (!event) notFound();

  const crumbs = buildBreadcrumbs({
    region: parsed.region,
    city: parsed.city,
    type: parsed.type,
    objectName: event.title,
  });
  const canonicalUrl = `${SITE_URL}${buildPath(
    parsed.region!,
    parsed.city ?? 'yoshkar-ola',
    parsed.type!,
    makeObjectSlug(event.title, id)
  )}`;

  return (
    <>
      <EventLd
        name={event.title}
        description={event.shortDescription}
        location={event.location}
        startDate={event.startDate}
        endDate={event.endDate}
        image={event.imageUrl}
        isFree={event.isFree}
        price={event.price}
        url={canonicalUrl}
      />
      <link rel="canonical" href={canonicalUrl} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={crumbs} />
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
        )}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">{event.category}</span>
          {event.isFree ? (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Бесплатно</span>
          ) : event.price ? (
            <span className="bg-accent-400 text-white text-sm font-medium px-3 py-1 rounded-full">{event.price} ₽</span>
          ) : null}
        </div>
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-500 mb-2">📍 {event.location}, {event.address}</p>
        <p className="text-gray-500 mb-6">
          📅 {formatDate(event.startDate)}
          {event.endDate && ` — ${formatDate(event.endDate)}`}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.shortDescription}</p>
      </div>
    </>
  );
}
