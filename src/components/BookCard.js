import Link from "next/link";

// Server Component: presentacional puro, no necesita estado ni efectos.
export default function BookCard({ book, rank }) {
  return (
    <Link
      href={`/libreria/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900 transition hover:border-amber-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {rank ? (
          <span className="absolute left-2 top-2 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold text-slate-950">
            #{rank}
          </span>
        ) : null}
        {book.type === "magazine" ? (
          <span className="absolute right-2 top-2 rounded-md bg-sky-500/90 px-2 py-0.5 text-xs font-medium text-white">
            Revista
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-white">{book.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{book.author}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-amber-300">{book.price.toFixed(2)} €</span>
          <span className="text-xs text-slate-500">{book.year}</span>
        </div>
      </div>
    </Link>
  );
}
