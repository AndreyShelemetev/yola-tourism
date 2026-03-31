import Link from 'next/link';
import HeroSection from '@/components/HeroSection';

const sections = [
  {
    title: 'Достопримечательности',
    description: 'Набережная Брюгге, Благовещенская башня, Царевококшайский кремль и многое другое',
    href: '/mari-el/yoshkar-ola/dostoprimechatelnosti',
    image: 'https://avatars.mds.yandex.net/i?id=1b405ea94e1ac276d0be199287f7f268acac8aa6-5139440-images-thumbs&n=13',
  },
  {
    title: 'Отели',
    description: 'Комфортное размещение на любой бюджет — от хостелов до премиум-отелей',
    href: '/mari-el/yoshkar-ola/oteli',
    image: 'https://avatars.mds.yandex.net/i?id=f7dd2d63384def0fe6bd0e83bff66d9b46e6af9c-10353822-images-thumbs&n=13',
  },
  {
    title: 'Рестораны',
    description: 'Марийская кухня, европейские рестораны и уютные кафе',
    href: '/mari-el/yoshkar-ola/restorany',
    image: 'https://avatars.mds.yandex.net/get-altay/753950/2a00000185a16cd6ce887f73ccd8a607ef9a/XXL_height',
  },
  {
    title: 'События',
    description: 'Фестивали, концерты, выставки и городские мероприятия',
    href: '/mari-el/yoshkar-ola/sobytiya',
    image: 'https://i.ytimg.com/vi/U5nI3D2384U/maxresdefault.jpg',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-2 text-dark">
          Откройте Йошкар-Олу
        </h2>
        <p className="text-center text-gray-500 mb-12">Выберите интересующий раздел</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold mb-2 text-dark group-hover:text-primary-500 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-dark">
            Почему Йошкар-Ола?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="relative w-full h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{backgroundSize: '200% 100%'}} />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3b/%D0%99%D0%BE%D1%88%D0%BA%D0%B0%D1%80-%D0%9E%D0%BB%D0%B0%2C_%D0%A2%D0%B5%D0%B0%D1%82%D1%80_%D0%BA%D1%83%D0%BA%D0%BE%D0%BB.jpg"
                  alt="Уникальная архитектура Йошкар-Олы"
                  className="relative w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-dark">Уникальная архитектура</h3>
                <p className="text-gray-500 text-sm">
                  Фламандские фасады на набережной Брюгге, Благовещенская башня —
                  копия Спасской башни Кремля, и десятки других шедевров.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="relative w-full h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{backgroundSize: '200% 100%'}} />
                <img
                  src="https://avatars.mds.yandex.net/i?id=2435f7e1625bbc36f93dffad7b2fc018_l-6335046-images-thumbs&n=13"
                  alt="Природа Марий Эл"
                  className="relative w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-dark">Природа Марий Эл</h3>
                <p className="text-gray-500 text-sm">
                  Озёра, леса и национальные парки региона — идеальное место
                  для экотуризма и отдыха на природе.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="relative w-full h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{backgroundSize: '200% 100%'}} />
                <img
                  src="https://cdn.culture.ru/images/b3a6aacc-1d8a-563e-9d6a-343ff8482c57"
                  alt="Культура и традиции Марий Эл"
                  className="relative w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-dark">Культура и традиции</h3>
                <p className="text-gray-500 text-sm">
                  Марийская культура — одна из самых самобытных в России.
                  Театры, музеи и национальные праздники круглый год.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
