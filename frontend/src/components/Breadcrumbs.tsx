import Link from 'next/link';
import { REGIONS, CITIES, ENTITY_TYPES, buildPath } from '@/lib/seo';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function buildBreadcrumbs(parsed: {
  region?: string;
  city?: string;
  type?: string;
  objectName?: string;
}): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Главная', href: '/' }];

  if (parsed.region) {
    const r = REGIONS[parsed.region];
    crumbs.push({
      label: r?.name ?? parsed.region,
      href: buildPath(parsed.region),
    });
  }

  if (parsed.city && parsed.region) {
    const c = CITIES[parsed.city];
    crumbs.push({
      label: c?.name ?? parsed.city,
      href: buildPath(parsed.region, parsed.city),
    });
  }

  if (parsed.type && parsed.region) {
    const t = ENTITY_TYPES[parsed.type];
    const href = parsed.city
      ? buildPath(parsed.region, parsed.city, parsed.type)
      : buildPath(parsed.region, parsed.type);
    crumbs.push({ label: t?.namePlural ?? parsed.type, href });
  }

  if (parsed.objectName) {
    crumbs.push({ label: parsed.objectName });
  }

  // Последний элемент без ссылки
  if (crumbs.length > 1 && !parsed.objectName) {
    delete crumbs[crumbs.length - 1].href;
  }

  return crumbs;
}

export default function Breadcrumbs({ items, variant = 'light' }: { items: BreadcrumbItem[]; variant?: 'light' | 'dark' }) {
  if (items.length <= 1) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter((item) => item.href)
      .map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: item.href?.startsWith('/') ? `https://yoshkar-ola-tourism.ru${item.href}` : item.href,
      })),
  };

  const navColor = variant === 'dark' ? 'text-gray-500' : 'text-white/80';
  const sepColor = variant === 'dark' ? 'text-gray-400' : 'text-white/60';
  const linkColor = variant === 'dark' ? 'text-[rgb(204,1,0)] hover:text-red-700' : 'hover:text-white';
  const activeColor = variant === 'dark' ? 'text-gray-800 font-medium' : 'text-white font-medium';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`text-sm ${navColor} mb-4`}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className={sepColor}>/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className={`${linkColor} transition-colors`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={activeColor}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
