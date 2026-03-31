import { getEvent } from '@/lib/api';
import type { Event } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let event: Event | null = null;
  try {
    event = await getEvent(Number(id));
  } catch {
    notFound();
  }
  if (!event) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/events"
        className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block"
      >
        ← Все события
      </Link>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
          {event.category}
        </span>
        {event.isFree ? (
          <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
            Бесплатно
          </span>
        ) : event.price ? (
          <span className="bg-accent-400 text-white text-sm font-medium px-3 py-1 rounded-full">
            {event.price} ₽
          </span>
        ) : null}
      </div>

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-500 mb-2">📍 {event.location}, {event.address}</p>
      <p className="text-gray-500 mb-6">
        📅 {formatDate(event.startDate)}
        {event.endDate && ` — ${formatDate(event.endDate)}`}
      </p>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {event.shortDescription}
      </p>
    </div>
  );
}
