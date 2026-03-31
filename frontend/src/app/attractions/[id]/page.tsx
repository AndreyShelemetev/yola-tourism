import { getAttraction } from '@/lib/api';
import type { AttractionDetail } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let attraction: AttractionDetail | null = null;
  try {
    attraction = await getAttraction(Number(id));
  } catch {
    notFound();
  }
  if (!attraction) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/attractions"
        className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block"
      >
        ← Все достопримечательности
      </Link>

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
        <span className="text-accent-400 font-semibold">
          ★ {attraction.rating.toFixed(1)}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-4">{attraction.name}</h1>
      <p className="text-gray-500 mb-6">📍 {attraction.address}</p>
      {attraction.workingHours && (
        <p className="text-gray-500 mb-6">🕐 {attraction.workingHours}</p>
      )}
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {attraction.description}
      </p>
    </div>
  );
}
