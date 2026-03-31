'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function Pagination({ currentPage, totalPages, totalCount }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `?${params.toString()}`;
  }

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <Link
            href={buildHref(currentPage - 1)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-primary-50 transition-colors"
          >
            ←
          </Link>
        )}
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 py-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-300 hover:bg-primary-50'
              }`}
            >
              {p}
            </Link>
          )
        )}
        {currentPage < totalPages && (
          <Link
            href={buildHref(currentPage + 1)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-primary-50 transition-colors"
          >
            →
          </Link>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Всего: {totalCount}
      </p>
    </div>
  );
}
