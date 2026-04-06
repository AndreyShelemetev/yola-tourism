import { getHotel } from '@/lib/api';
import type { HotelDetail } from '@/lib/types';
import { notFound, redirect } from 'next/navigation';

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Redirect to SEO-friendly URL
  redirect(`/mari-el/yoshkar-ola/oteli/`);
}
