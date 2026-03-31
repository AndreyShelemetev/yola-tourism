import { getRestaurant } from '@/lib/api';
import type { RestaurantDetail } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let restaurant: RestaurantDetail | null = null;
  try {
    restaurant = await getRestaurant(Number(id));
  } catch {
    notFound();
  }
  if (!restaurant) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/restaurants"
        className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block"
      >
        ← Все рестораны
      </Link>

      {restaurant.imageUrl && (
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
          {restaurant.cuisine}
        </span>
        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
          {restaurant.priceRange}
        </span>
        {restaurant.hasDelivery && (
          <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
            🚗 Доставка
          </span>
        )}
        <span className="text-accent-400 font-semibold">
          ★ {restaurant.rating.toFixed(1)}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="text-gray-500 mb-2">📍 {restaurant.address}</p>
      {restaurant.workingHours && (
        <p className="text-gray-500 mb-2">🕐 {restaurant.workingHours}</p>
      )}
      {restaurant.phone && (
        <p className="text-gray-500 mb-6">📞 {restaurant.phone}</p>
      )}

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {restaurant.description}
      </p>
    </div>
  );
}
