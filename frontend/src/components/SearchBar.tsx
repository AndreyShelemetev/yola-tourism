'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getSuggestions } from '@/lib/api';
import type { Suggestion } from '@/lib/types';

import { makeObjectSlug } from '@/lib/slugify';

const typeConfig: Record<string, { icon: React.ReactNode; label: string; href: (id: number, name: string) => string }> = {
  attraction: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 3V21M5.5 12v9M3 9h18" />
      </svg>
    ),
    label: 'Достопримечательность',
    href: (id, name) => `/mari-el/yoshkar-ola/dostoprimechatelnosti/${makeObjectSlug(name, id)}`,
  },
  hotel: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25V21M8.25 8.25h.008v.008H8.25V8.25zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3.75-6h.008v.008h-.008V8.25zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3.75-6h.008v.008h-.008V8.25zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    label: 'Отель',
    href: (id, name) => `/mari-el/yoshkar-ola/oteli/${makeObjectSlug(name, id)}`,
  },
  restaurant: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5a14.878 14.878 0 00-18 0" />
      </svg>
    ),
    label: 'Ресторан',
    href: (id, name) => `/mari-el/yoshkar-ola/restorany/${makeObjectSlug(name, id)}`,
  },
  event: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
    label: 'Событие',
    href: (id, name) => `/mari-el/yoshkar-ola/sobytiya/${makeObjectSlug(name, id)}`,
  },
};

const typeColors: Record<string, string> = {
  attraction: 'bg-emerald-100 text-emerald-600',
  hotel: 'bg-blue-100 text-blue-600',
  restaurant: 'bg-orange-100 text-orange-600',
  event: 'bg-purple-100 text-purple-600',
};

export default function SearchBar({
  placeholder,
  targetPath,
  paramName,
}: {
  placeholder?: string;
  targetPath?: string;
  paramName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = paramName ?? 'search';
  const [query, setQuery] = useState(searchParams.get(key) ?? '');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuery(searchParams.get(key) ?? '');
  }, [searchParams, key]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const data = await getSuggestions(value.trim());
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 200);
  }

  function navigateTo(path: string) {
    setShowSuggestions(false);
    router.push(path);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowSuggestions(false);
    if (targetPath) {
      const params = new URLSearchParams();
      if (query.trim()) params.set(key, query.trim());
      const qs = params.toString();
      router.push(`${targetPath}${qs ? `?${qs}` : ''}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set(key, query.trim());
      } else {
        params.delete(key);
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`);
    }
  }

  function handleClear() {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (targetPath) {
      router.push(targetPath);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const s = suggestions[activeIndex];
      const cfg = typeConfig[s.type];
      if (cfg) navigateTo(cfg.href(s.entityId, s.title));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Поиск...'}
            className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-dark bg-white"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Найти
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-[400px] overflow-y-auto">
          {suggestions.map((s, i) => {
            const cfg = typeConfig[s.type];
            const colorClass = typeColors[s.type] ?? 'bg-gray-100 text-gray-600';
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => cfg && navigateTo(cfg.href(s.entityId, s.title))}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  i === activeIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
                } ${i > 0 ? 'border-t border-gray-100' : ''}`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${colorClass}`}>
                  {cfg?.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-dark truncate text-sm">
                    {s.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {cfg?.label} · {s.subtitle || s.address}
                  </div>
                </div>
                {s.rating > 0 && (
                  <div className="flex-shrink-0 text-xs font-medium text-amber-500">
                    ★ {s.rating.toFixed(1)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
