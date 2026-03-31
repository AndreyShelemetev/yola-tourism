import { getHotel } from '@/lib/api';
import type { HotelDetail } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StarRating from '@/components/StarRating';

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let hotel: HotelDetail | null = null;
  try {
    hotel = await getHotel(Number(id));
  } catch {
    notFound();
  }
  if (!hotel) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/hotels"
        className="text-primary-500 hover:text-primary-600 text-sm mb-4 inline-block"
      >
        ← Все отели
      </Link>

      {hotel.imageUrl && (
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex items-center gap-3 mb-4">
        <StarRating stars={hotel.stars} />
        <span className="text-accent-400 font-semibold">
          ★ {hotel.rating.toFixed(1)}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <p className="text-gray-500 mb-2">📍 {hotel.address}</p>
      <p className="text-2xl font-bold text-dark mb-6">
        от {hotel.priceFrom.toLocaleString('ru-RU')} ₽ / ночь
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {hotel.hasWifi && (
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">📶 Wi-Fi</span>
        )}
        {hotel.hasParking && (
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">🅿️ Парковка</span>
        )}
        {hotel.hasPool && (
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">🏊 Бассейн</span>
        )}
        {hotel.hasRestaurant && (
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">🍽️ Ресторан</span>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
        {hotel.description}
      </p>

      {(hotel.phone || hotel.website) && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Контакты</h3>
          {hotel.phone && <p className="text-gray-600">📞 {hotel.phone}</p>}
          {hotel.website && (
            <p>
              🌐{' '}
              <a
                href={hotel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                {hotel.website}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
