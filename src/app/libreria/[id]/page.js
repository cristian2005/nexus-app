import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

// Server Component: hace la lectura del libro en el servidor y compone la
// vista. El boton de carrito se delega a un Client Component.
export default async function BookDetailPage({ params }) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) notFound();

  return (
    <article className="grid gap-8 md:grid-cols-[260px_1fr]">
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
      </div>

      <div>
        <Link
          href="/libreria"
          className="mb-4 inline-block text-sm text-slate-400 hover:text-amber-300"
        >
          ← Volver al listado
        </Link>
        <h1 className="text-3xl font-bold text-white">{book.title}</h1>
        <p className="mt-1 text-slate-400">{book.author}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-slate-800 px-2 py-1 text-slate-300">
            {book.type === "magazine" ? "Revista" : "Libro"}
          </span>
          <span className="rounded bg-slate-800 px-2 py-1 text-slate-300 capitalize">
            {book.category}
          </span>
          <span className="rounded bg-slate-800 px-2 py-1 text-slate-300">
            {book.year}
          </span>
          <span className="rounded bg-slate-800 px-2 py-1 text-slate-300 uppercase">
            {book.language}
          </span>
        </div>

        <p className="mt-6 max-w-prose text-slate-200">{book.synopsis}</p>

        <div className="mt-8 flex items-center gap-6">
          <span className="text-3xl font-bold text-amber-300">
            {book.price.toFixed(2)} €
          </span>
          <span className="text-sm text-slate-400">
            {book.stock > 0 ? `${book.stock} unidades disponibles` : "Sin stock"}
          </span>
        </div>

        <div className="mt-6">
          <AddToCartButton bookId={book.id} title={book.title} />
        </div>
      </div>
    </article>
  );
}
