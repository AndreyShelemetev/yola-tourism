import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Контакты | ${SITE_NAME}`,
  description: 'Контактная информация туристического портала Йошкар-Олы.',
};

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <p className="text-gray-700">
          <strong>Адрес:</strong> г. Йошкар-Ола, Республика Марий Эл, Россия
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> info@yoshkar-ola-tourism.ru
        </p>
        <p className="text-gray-500 text-sm mt-6">
          По вопросам сотрудничества и добавления объектов на портал обращайтесь по электронной почте.
        </p>
      </div>
    </div>
  );
}
