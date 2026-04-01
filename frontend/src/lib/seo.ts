export const SITE_NAME = 'Йошкар-Ола Туризм';
export const SITE_DOMAIN = 'yolatur.ru';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const DEFAULT_REGION = 'mari-el';
export const DEFAULT_CITY = 'yoshkar-ola';

/* ─── Регионы ─── */
export interface RegionInfo {
  name: string;
  nameIn: string;
  nameGen: string;
}

export const REGIONS: Record<string, RegionInfo> = {
  'mari-el': { name: 'Марий Эл', nameIn: 'Марий Эл', nameGen: 'Марий Эл' },
};

/* ─── Города / районы ─── */
export interface CityInfo {
  name: string;
  nameIn: string;
  nameGen: string;
  region: string;
}

export const CITIES: Record<string, CityInfo> = {
  'yoshkar-ola': {
    name: 'Йошкар-Ола',
    nameIn: 'Йошкар-Оле',
    nameGen: 'Йошкар-Олы',
    region: 'mari-el',
  },
};

/* ─── Типы сущностей ─── */
export interface EntityTypeInfo {
  slug: string;
  nameSingular: string;
  namePlural: string;
  nameInCity: string; // "Достопримечательности в Йошкар-Оле"
  apiPath: string;
  titleTemplate: (city: string) => string;
  descriptionTemplate: (city: string) => string;
}

export const ENTITY_TYPES: Record<string, EntityTypeInfo> = {
  dostoprimechatelnosti: {
    slug: 'dostoprimechatelnosti',
    nameSingular: 'Достопримечательность',
    namePlural: 'Достопримечательности',
    nameInCity: 'Достопримечательности',
    apiPath: 'attractions',
    titleTemplate: (city) =>
      `Достопримечательности ${city} — что посмотреть 2026 | ${SITE_NAME}`,
    descriptionTemplate: (city) =>
      `Лучшие достопримечательности ${city}: фото, описания, адреса, рейтинги и режим работы. Спланируйте идеальную прогулку.`,
  },
  oteli: {
    slug: 'oteli',
    nameSingular: 'Отель',
    namePlural: 'Отели',
    nameInCity: 'Отели',
    apiPath: 'hotels',
    titleTemplate: (city) =>
      `Отели ${city} — бронирование и цены 2026 | ${SITE_NAME}`,
    descriptionTemplate: (city) =>
      `Подборка отелей ${city}: фото, цены, звёздность, удобства и отзывы. Выберите лучший вариант размещения.`,
  },
  restorany: {
    slug: 'restorany',
    nameSingular: 'Ресторан',
    namePlural: 'Рестораны и кафе',
    nameInCity: 'Рестораны и кафе',
    apiPath: 'restaurants',
    titleTemplate: (city) =>
      `Рестораны и кафе ${city} — где вкусно поесть 2026 | ${SITE_NAME}`,
    descriptionTemplate: (city) =>
      `Лучшие рестораны и кафе ${city}: фото, меню, кухня, рейтинги и часы работы. Откройте гастрономию города.`,
  },
  sobytiya: {
    slug: 'sobytiya',
    nameSingular: 'Событие',
    namePlural: 'События',
    nameInCity: 'События',
    apiPath: 'events',
    titleTemplate: (city) =>
      `События ${city} — афиша мероприятий 2026 | ${SITE_NAME}`,
    descriptionTemplate: (city) =>
      `Актуальные события ${city}: фестивали, концерты, выставки и городские праздники. Узнайте, что посетить.`,
  },
};

/* ─── Helpers ─── */
export function isKnownRegion(s: string): boolean {
  return s in REGIONS;
}
export function isKnownCity(s: string): boolean {
  return s in CITIES;
}
export function isKnownType(s: string): boolean {
  return s in ENTITY_TYPES;
}

export function getTypeByApiPath(
  apiPath: string
): EntityTypeInfo | undefined {
  return Object.values(ENTITY_TYPES).find((t) => t.apiPath === apiPath);
}

export function buildPath(...segments: string[]): string {
  return '/' + segments.filter(Boolean).join('/');
}

/**
 * Разбор slug-сегментов URL.
 * Возвращает распознанные части: region, city, type, objectSlug, page.
 */
export interface ParsedSlug {
  region?: string;
  city?: string;
  type?: string;
  objectSlug?: string;
  page?: number;
  valid: boolean;
}

export function parseSlugSegments(segments: string[]): ParsedSlug {
  const result: ParsedSlug = { valid: false };
  let i = 0;

  // 1. Регион
  if (i < segments.length && isKnownRegion(segments[i])) {
    result.region = segments[i];
    i++;
  } else {
    return result;
  }

  // Если больше нет сегментов — страница региона
  if (i >= segments.length) {
    result.valid = true;
    return result;
  }

  // 2. Город/район или тип
  if (isKnownCity(segments[i])) {
    result.city = segments[i];
    i++;
  } else if (isKnownType(segments[i])) {
    result.type = segments[i];
    i++;
    // Проверяем пагинацию: .../type/page/N
    if (i < segments.length && segments[i] === 'page' && i + 1 < segments.length) {
      const p = parseInt(segments[i + 1], 10);
      if (!isNaN(p) && p >= 1) {
        result.page = p;
        i += 2;
      }
    }
    if (i >= segments.length) {
      result.valid = true;
      return result;
    }
    return result; // лишние сегменты
  } else {
    return result; // неизвестный сегмент
  }

  // Если после города ничего нет — страница города
  if (i >= segments.length) {
    result.valid = true;
    return result;
  }

  // 3. Тип в городе
  if (isKnownType(segments[i])) {
    result.type = segments[i];
    i++;
  } else {
    return result;
  }

  if (i >= segments.length) {
    result.valid = true;
    return result;
  }

  // 4. page/N или slug объекта
  if (segments[i] === 'page' && i + 1 < segments.length) {
    const p = parseInt(segments[i + 1], 10);
    if (!isNaN(p) && p >= 1) {
      result.page = p;
      i += 2;
      if (i >= segments.length) {
        result.valid = true;
        return result;
      }
    }
    return result;
  }

  // Это slug объекта
  result.objectSlug = segments[i];
  i++;

  if (i >= segments.length) {
    result.valid = true;
  }

  return result;
}

/* ─── SEO мета-генераторы ─── */
export function generateListingMeta(parsed: ParsedSlug) {
  const city = parsed.city ? CITIES[parsed.city] : undefined;
  const region = parsed.region ? REGIONS[parsed.region] : undefined;
  const entityType = parsed.type ? ENTITY_TYPES[parsed.type] : undefined;

  const locationName = city?.nameGen ?? region?.nameGen ?? '';
  const locationIn = city?.nameIn ?? region?.nameIn ?? '';

  let title: string;
  let description: string;
  let h1: string;

  if (entityType && locationName) {
    title = entityType.titleTemplate(locationName);
    description = entityType.descriptionTemplate(locationName);
    h1 = `${entityType.nameInCity} в ${locationIn}`;
  } else if (city) {
    title = `${city.name} — путеводитель для туристов 2026 | ${SITE_NAME}`;
    description = `Всё о ${city.nameIn}: достопримечательности, отели, рестораны и события. Планируйте путешествие в ${city.name}.`;
    h1 = `Добро пожаловать в ${city.name}`;
  } else if (region) {
    title = `Туризм в ${region.nameIn} — путеводитель 2026 | ${SITE_NAME}`;
    description = `Откройте ${region.name}: достопримечательности, отели, рестораны и события республики. Лучшие места для путешествий.`;
    h1 = `Туризм в ${region.nameIn}`;
  } else {
    title = SITE_NAME;
    description = 'Туристический портал Йошкар-Олы';
    h1 = 'Йошкар-Ола';
  }

  // Пагинация: noindex + дополнение title
  const noindex = (parsed.page && parsed.page > 1) || false;
  if (parsed.page && parsed.page > 1) {
    title = title.replace(` | ${SITE_NAME}`, ` — страница ${parsed.page} | ${SITE_NAME}`);
  }

  return { title, description, h1, noindex };
}
