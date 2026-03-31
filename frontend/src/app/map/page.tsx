'use client';

import { useEffect, useState, useRef } from 'react';
import type { Attraction, Hotel, Restaurant, Event } from '@/lib/types';
import { makeObjectSlug } from '@/lib/slugify';

interface MapData {
  attractions: Attraction[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  events: Event[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

async function fetchMapData(): Promise<MapData> {
  const [attractions, hotels, restaurants, events] = await Promise.all([
    fetch(`${API_BASE}/api/attractions?pageSize=999`).then((r) => r.json()).then((d) => d.items),
    fetch(`${API_BASE}/api/hotels?pageSize=999`).then((r) => r.json()).then((d) => d.items),
    fetch(`${API_BASE}/api/restaurants?pageSize=999`).then((r) => r.json()).then((d) => d.items),
    fetch(`${API_BASE}/api/events?pageSize=999`).then((r) => r.json()).then((d) => d.items),
  ]);
  return { attractions, hotels, restaurants, events };
}

const CATEGORY_CONFIG: Record<string, { color: string; label: string; emoji: string }> = {
  attraction: { color: '#71BB00', label: 'Достопримечательности', emoji: '🏛️' },
  hotel: { color: '#0071BB', label: 'Отели', emoji: '🏨' },
  restaurant: { color: '#E95E02', label: 'Рестораны', emoji: '🍽️' },
  event: { color: '#996BB9', label: 'События', emoji: '📅' },
};

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MapData | null>(null);
  const [filters, setFilters] = useState({
    attraction: true,
    hotel: true,
    restaurant: true,
    event: true,
  });
  const ymapInstanceRef = useRef<any>(null);
  const placemarkCollectionsRef = useRef<Record<string, any>>({});

  useEffect(() => {
    fetchMapData().then(setData);
  }, []);

  useEffect(() => {
    if (!data || !mapRef.current) return;
    if (typeof window === 'undefined') return;

    // Load Yandex Maps API
    if (!(window as any).ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
      script.onload = () => {
        (window as any).ymaps.ready(initMap);
      };
      document.head.appendChild(script);
    } else {
      (window as any).ymaps.ready(initMap);
    }

    function initMap() {
      const ymaps = (window as any).ymaps;
      if (ymapInstanceRef.current) {
        ymapInstanceRef.current.destroy();
      }

      const map = new ymaps.Map(mapRef.current, {
        center: [56.6316, 47.8869],
        zoom: 14,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
      });

      ymapInstanceRef.current = map;

      // Attractions
      const attractionCollection = new ymaps.GeoObjectCollection();
      data!.attractions.forEach((a) => {
        const placemark = new ymaps.Placemark(
          [a.latitude, a.longitude],
          {
            hintContent: a.name,
            balloonContentHeader: `<strong>${a.name}</strong>`,
            balloonContentBody: `<p style="margin:4px 0">${a.shortDescription}</p><p style="margin:4px 0;color:#666">${a.address}</p><p style="margin:4px 0">⭐ ${a.rating}</p>`,
            balloonContentFooter: `<a href="/mari-el/yoshkar-ola/dostoprimechatelnosti/${makeObjectSlug(a.name, a.id)}" style="color:#0071BB">Подробнее →</a>`,
          },
          {
            preset: 'islands#greenDotIcon',
          }
        );
        attractionCollection.add(placemark);
      });
      map.geoObjects.add(attractionCollection);
      placemarkCollectionsRef.current['attraction'] = attractionCollection;

      // Hotels
      const hotelCollection = new ymaps.GeoObjectCollection();
      data!.hotels.forEach((h) => {
        if (!h.latitude || !h.longitude) return;
        const placemark = new ymaps.Placemark(
          [h.latitude, h.longitude],
          {
            hintContent: h.name,
            balloonContentHeader: `<strong>${h.name}</strong>`,
            balloonContentBody: `<p style="margin:4px 0">${h.shortDescription}</p><p style="margin:4px 0;color:#666">${h.address}</p><p style="margin:4px 0">⭐ ${h.rating} · от ${h.priceFrom} ₽</p>`,
            balloonContentFooter: `<a href="/mari-el/yoshkar-ola/oteli/${makeObjectSlug(h.name, h.id)}" style="color:#0071BB">Подробнее →</a>`,
          },
          {
            preset: 'islands#blueDotIcon',
          }
        );
        hotelCollection.add(placemark);
      });
      map.geoObjects.add(hotelCollection);
      placemarkCollectionsRef.current['hotel'] = hotelCollection;

      // Restaurants
      const restaurantCollection = new ymaps.GeoObjectCollection();
      data!.restaurants.forEach((r) => {
        if (!r.latitude || !r.longitude) return;
        const placemark = new ymaps.Placemark(
          [r.latitude, r.longitude],
          {
            hintContent: r.name,
            balloonContentHeader: `<strong>${r.name}</strong>`,
            balloonContentBody: `<p style="margin:4px 0">${r.shortDescription}</p><p style="margin:4px 0;color:#666">${r.address}</p><p style="margin:4px 0">⭐ ${r.rating} · ${r.cuisine} · ${r.priceRange}</p>`,
            balloonContentFooter: `<a href="/mari-el/yoshkar-ola/restorany/${makeObjectSlug(r.name, r.id)}" style="color:#0071BB">Подробнее →</a>`,
          },
          {
            preset: 'islands#orangeDotIcon',
          }
        );
        restaurantCollection.add(placemark);
      });
      map.geoObjects.add(restaurantCollection);
      placemarkCollectionsRef.current['restaurant'] = restaurantCollection;

      // Events (use city center since events don't have coordinates)
      const eventCollection = new ymaps.GeoObjectCollection();
      data!.events.forEach((ev) => {
        const placemark = new ymaps.Placemark(
          [56.6316, 47.8869],
          {
            hintContent: ev.title,
            balloonContentHeader: `<strong>${ev.title}</strong>`,
            balloonContentBody: `<p style="margin:4px 0">${ev.shortDescription}</p><p style="margin:4px 0;color:#666">${ev.address}</p><p style="margin:4px 0">${ev.isFree ? '🟢 Бесплатно' : `💰 ${ev.price} ₽`}</p>`,
            balloonContentFooter: `<a href="/mari-el/yoshkar-ola/sobytiya/${makeObjectSlug(ev.title, ev.id)}" style="color:#0071BB">Подробнее →</a>`,
          },
          {
            preset: 'islands#violetDotIcon',
          }
        );
        eventCollection.add(placemark);
      });
      map.geoObjects.add(eventCollection);
      placemarkCollectionsRef.current['event'] = eventCollection;
    }

    // Cleanup
    return () => {
      if (ymapInstanceRef.current) {
        ymapInstanceRef.current.destroy();
        ymapInstanceRef.current = null;
      }
    };
  }, [data]);

  // Toggle visibility
  useEffect(() => {
    const map = ymapInstanceRef.current;
    if (!map) return;
    Object.entries(filters).forEach(([key, visible]) => {
      const collection = placemarkCollectionsRef.current[key];
      if (!collection) return;
      if (visible) {
        collection.options.set('visible', true);
      } else {
        collection.options.set('visible', false);
      }
    });
  }, [filters]);

  function toggleFilter(key: string) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  }

  const counts = data
    ? {
        attraction: data.attractions.length,
        hotel: data.hotels.length,
        restaurant: data.restaurants.length,
        event: data.events.length,
      }
    : { attraction: 0, hotel: 0, restaurant: 0, event: 0 };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Filter panel */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-dark mr-2">Показать на карте:</span>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const active = filters[key as keyof typeof filters];
            return (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
                }`}
                style={active ? { backgroundColor: cfg.color } : {}}
              >
                <span>{cfg.emoji}</span>
                {cfg.label}
                <span className={`text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>
                  {counts[key as keyof typeof counts]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!data && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500">Загрузка карты...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
