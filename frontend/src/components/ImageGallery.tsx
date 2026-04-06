'use client';

import { useState, useCallback, useEffect } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  /** Grid layout: 'hero' = large first + small grid, 'grid' = equal grid */
  layout?: 'hero' | 'grid';
}

export default function ImageGallery({ images, alt, layout = 'hero' }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = useCallback((i: number) => {
    setIdx(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  if (!images.length) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      {layout === 'hero' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
          <div
            className="md:col-span-2 md:row-span-2 cursor-pointer"
            onClick={() => openAt(0)}
          >
            <img
              src={images[0]}
              alt={alt}
              className="w-full h-64 md:h-[400px] object-cover hover:brightness-90 transition"
              loading="eager"
            />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="hidden md:block cursor-pointer"
              onClick={() => openAt(i + 1)}
            >
              <img
                src={img}
                alt={`${alt} — фото ${i + 2}`}
                className="w-full h-[196px] object-cover hover:brightness-90 transition"
                loading="lazy"
              />
            </div>
          ))}
          {images.length > 5 && (
            <button
              onClick={() => openAt(5)}
              className="hidden md:flex absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-black/90 transition"
            >
              +{images.length - 5} фото
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
          {images.slice(0, 1).map((img, i) => (
            <div
              key={i}
              className="md:col-span-2 md:row-span-2 cursor-pointer"
              onClick={() => openAt(i)}
            >
              <img
                src={img}
                alt={`${alt} — фото ${i + 1}`}
                className="w-full h-full object-cover min-h-[200px] md:min-h-[420px] hover:brightness-90 transition"
                loading="eager"
              />
            </div>
          ))}
          {images.slice(1).map((img, i) => (
            <div
              key={i + 1}
              className="cursor-pointer"
              onClick={() => openAt(i + 1)}
            >
              <img
                src={img}
                alt={`${alt} — фото ${i + 2}`}
                className="w-full h-[206px] object-cover hover:brightness-90 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition z-10"
            aria-label="Закрыть"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm z-10">
            {idx + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition z-10 p-2"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <img
            src={images[idx]}
            alt={`${alt} — фото ${idx + 1}`}
            className="max-h-[90vh] max-w-[95vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition z-10 p-2"
              aria-label="Следующее фото"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
