import Link from "next/link";
import BookCard from "@/components/BookCard";
import { getTopBooks } from "@/lib/db";

// Server Component: hace fetch en el servidor (en este caso accede a la
// capa de datos directamente, pero el endpoint /api/books/top expone los
// mismos datos publicamente). No necesita JS en cliente.
export default async function HomePage() {
  const top = getTopBooks(10);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900 to-amber-950/40 p-10">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Bienvenido a <span className="text-amber-400">Nexus</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Tu libreria universitaria y zona de co-working en un mismo espacio.
          Explora los libros y revistas mas vendidos.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/libreria"
            className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400"
          >
            Ir a la libreria
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Top 10 mas vendidos
          </h2>
          <Link href="/libreria" className="text-sm text-amber-300 hover:underline">
            Ver toda la libreria →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {top.map((book, idx) => (
            <BookCard key={book.id} book={book} rank={idx + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
