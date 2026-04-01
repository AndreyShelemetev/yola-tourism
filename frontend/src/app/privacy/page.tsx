import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Политика конфиденциальности | ${SITE_NAME}`,
  description: 'Политика конфиденциальности туристического портала Йошкар-Олы.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
        <p>
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты
          персональных данных пользователей портала.
        </p>
        <h2 className="text-xl font-semibold mt-6">1. Сбор данных</h2>
        <p>
          Мы собираем только те данные, которые необходимы для функционирования сервиса:
          данные о посещённых страницах, поисковых запросах и используемом устройстве.
        </p>
        <h2 className="text-xl font-semibold mt-6">2. Использование данных</h2>
        <p>
          Собранные данные используются исключительно для улучшения работы портала
          и предоставления релевантной информации.
        </p>
        <h2 className="text-xl font-semibold mt-6">3. Cookies</h2>
        <p>
          Сайт использует файлы cookies для обеспечения корректной работы сервиса.
          Вы можете отключить cookies в настройках браузера.
        </p>
      </div>
    </div>
  );
}
