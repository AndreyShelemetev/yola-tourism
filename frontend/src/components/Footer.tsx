import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <img src="/logo.jpeg" alt="" className="w-12 h-12 rounded" />
              Йошкар-Ола
            </h3>
            <p className="text-sm leading-relaxed">
              Туристический портал столицы Республики Марий Эл. Откройте для себя
              уникальную архитектуру и культуру города.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Разделы</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mari-el/yoshkar-ola/dostoprimechatelnosti" className="hover:text-primary-400 transition-colors">Достопримечательности</Link></li>
              <li><Link href="/mari-el/yoshkar-ola/oteli" className="hover:text-primary-400 transition-colors">Отели</Link></li>
              <li><Link href="/mari-el/yoshkar-ola/restorany" className="hover:text-primary-400 transition-colors">Рестораны</Link></li>
              <li><Link href="/mari-el/yoshkar-ola/sobytiya" className="hover:text-primary-400 transition-colors">События</Link></li>
              <li><Link href="/map" className="hover:text-primary-400 transition-colors">Карта</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">О проекте</Link></li>
              <li><Link href="/contacts" className="hover:text-primary-400 transition-colors">Контакты</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Условия использования</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Контакты</h4>
            <p className="text-sm">г. Йошкар-Ола, Республика Марий Эл</p>
            <p className="text-sm mt-1">Россия</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Туристический портал Йошкар-Олы
        </div>
      </div>
    </footer>
  );
}
