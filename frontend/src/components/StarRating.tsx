export default function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < stars ? 'text-accent-yellow' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
