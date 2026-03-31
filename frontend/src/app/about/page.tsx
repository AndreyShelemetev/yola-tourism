import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `О проекте | ${SITE_NAME}`,
  description: 'Информация о туристическом портале Йошкар-Олы и Республики Марий Эл.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">О проекте</h1>
      <div className="prose prose-gray max-w-none">
        <p>
          Туристический портал <strong>Йошкар-Ола Туризм</strong> — это удобный путеводитель
          по столице Республики Марий Эл и всему региону. Мы собираем актуальную информацию
          о достопримечательностях, отелях, ресторанах и событиях.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Наша миссия</h2>
        <p>
          Помочь туристам и жителям города открыть лучшие места для отдыха, обеспечить
          актуальную информацию о ценах, режиме работы и рейтингах заведений.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Источники данных</h2>
        <p>
          Информация собирается из открытых источников и проверяется нашей командой.
          Рейтинги основаны на отзывах посетителей.
        </p>
      </div>
    </div>
  );
}
