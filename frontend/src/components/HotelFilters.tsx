'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const CITIES = [
  { value: '', label: 'Все города' },
  { value: 'Йошкар-Ола', label: 'Йошкар-Ола' },
  { value: 'Звениговский', label: 'Звениговский район' },
  { value: 'Юринский', label: 'Юринский район' },
];

const STARS = [
  { value: '', label: 'Любые звёзды' },
  { value: '5', label: '5 ★' },
  { value: '4', label: 'от 4 ★' },
  { value: '3', label: 'от 3 ★' },
];

const RATINGS = [
  { value: '', label: 'Любой рейтинг' },
  { value: '4.5', label: 'от 4.5 ★' },
  { value: '4', label: 'от 4.0 ★' },
  { value: '3.5', label: 'от 3.5 ★' },
];

export default function HotelFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get('city') ?? '';
  const currentStars = searchParams.get('minStars') ?? '';
  const currentRating = searchParams.get('minRating') ?? '';

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  }

  const hasFilters = currentCity || currentStars || currentRating;

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('city');
    params.delete('minStars');
    params.delete('minRating');
    params.delete('page');
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  }

  const selectClass =
    'appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-9 py-2 text-sm text-dark focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-no-repeat cursor-pointer';

  const arrowStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
    backgroundPosition: 'right 0.65rem center',
    backgroundSize: '12px',
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <select
        value={currentStars}
        onChange={(e) => update('minStars', e.target.value)}
        className={selectClass}
        style={arrowStyle}
      >
        {STARS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <select
        value={currentCity}
        onChange={(e) => update('city', e.target.value)}
        className={selectClass}
        style={arrowStyle}
      >
        {CITIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <select
        value={currentRating}
        onChange={(e) => update('minRating', e.target.value)}
        className={selectClass}
        style={arrowStyle}
      >
        {RATINGS.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-sm text-primary-500 hover:text-primary-600 underline transition-colors"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}
