import type { MetadataRoute } from 'next';
import { SITE_URL, ENTITY_TYPES, CITIES, DEFAULT_REGION } from '@/lib/seo';
import { makeObjectSlug } from '@/lib/slugify';
import { getAttractions, getHotels, getRestaurants, getEvents } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();

  // Главная
  entries.push({ url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 });

  // Регион
  entries.push({
    url: `${SITE_URL}/mari-el/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // Города
  for (const [citySlug, city] of Object.entries(CITIES)) {
    entries.push({
      url: `${SITE_URL}/${city.region}/${citySlug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Типы в городе
    for (const et of Object.values(ENTITY_TYPES)) {
      entries.push({
        url: `${SITE_URL}/${city.region}/${citySlug}/${et.slug}/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.8,
      });
    }
  }

  // Типы в регионе
  for (const et of Object.values(ENTITY_TYPES)) {
    entries.push({
      url: `${SITE_URL}/${DEFAULT_REGION}/${et.slug}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    });
  }

  // Объекты — достопримечательности
  try {
    const { items } = await getAttractions({ pageSize: 100 });
    for (const a of items) {
      entries.push({
        url: `${SITE_URL}/${DEFAULT_REGION}/yoshkar-ola/dostoprimechatelnosti/${makeObjectSlug(a.name, a.id)}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  } catch {}

  // Объекты — отели
  try {
    const { items } = await getHotels({ pageSize: 100 });
    for (const h of items) {
      entries.push({
        url: `${SITE_URL}/${DEFAULT_REGION}/yoshkar-ola/oteli/${makeObjectSlug(h.name, h.id)}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  } catch {}

  // Объекты — рестораны
  try {
    const { items } = await getRestaurants({ pageSize: 100 });
    for (const r of items) {
      entries.push({
        url: `${SITE_URL}/${DEFAULT_REGION}/yoshkar-ola/restorany/${makeObjectSlug(r.name, r.id)}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  } catch {}

  // Объекты — события
  try {
    const { items } = await getEvents({ pageSize: 100 });
    for (const e of items) {
      entries.push({
        url: `${SITE_URL}/${DEFAULT_REGION}/yoshkar-ola/sobytiya/${makeObjectSlug(e.title, e.id)}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  } catch {}

  // Статические страницы
  for (const page of ['about', 'contacts', 'privacy', 'terms']) {
    entries.push({
      url: `${SITE_URL}/${page}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    });
  }

  return entries;
}
