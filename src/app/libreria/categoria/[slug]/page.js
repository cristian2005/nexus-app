import { notFound } from "next/navigation";
import BookCard from "@/components/BookCard";
import { listBooks, listCategories } from "@/lib/db";

// Server Component: ruta dinamica /libreria/categoria/[slug].
// Combina el segmento dinamico con searchParams para filtros adicionales.
export default async function CategoriaPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const category = listCategories().find((c) => c.slug === slug);
  if (!category) notFound();

  const books = listBooks({
    category: slug,
    year: sp.year,
    type: sp.type,
    q: sp.q,
  });

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold text-white">{category.name}</h1>
      <p className="mb-6 text-sm text-slate-400">
        {books.length} resultado{books.length === 1 ? "" : "s"}
      </p>
      {books.length === 0 ? (
        <p className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Sin resultados en esta categoria.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
