import Link from 'next/link';

interface CardProps {
  href: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function Card({
  href,
  imageUrl,
  title,
  subtitle,
  badge,
  children,
}: CardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              🏛️
            </div>
          )}
          {badge && (
            <span className="absolute top-3 right-3 bg-accent-red text-white text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-dark group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </Link>
  );
}
