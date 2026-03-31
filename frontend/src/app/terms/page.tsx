import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Условия использования | ${SITE_NAME}`,
  description: 'Условия использования туристического портала Йошкар-Олы.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Условия использования</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
        <p>
          Используя данный портал, вы соглашаетесь с нижеизложенными условиями.
        </p>
        <h2 className="text-xl font-semibold mt-6">1. Информация на сайте</h2>
        <p>
          Информация на портале носит справочный характер. Мы стремимся к актуальности данных,
          но рекомендуем уточнять информацию непосредственно у заведений.
        </p>
        <h2 className="text-xl font-semibold mt-6">2. Интеллектуальная собственность</h2>
        <p>
          Все материалы портала защищены авторским правом. Использование материалов
          допускается только с указанием источника.
        </p>
        <h2 className="text-xl font-semibold mt-6">3. Ограничение ответственности</h2>
        <p>
          Портал не несёт ответственности за действия третьих лиц, а также за изменения
          в работе заведений и мероприятий.
        </p>
      </div>
    </div>
  );
}
