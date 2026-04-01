import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Карта — Йошкар-Ола Туризм',
  description: 'Интерактивная карта достопримечательностей, отелей, ресторанов и событий Йошкар-Олы.',
  alternates: { canonical: '/map/' },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
