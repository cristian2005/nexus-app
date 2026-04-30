import BookCard from "@/components/BookCard";
import { listBooks } from "@/lib/db";

// Server Component: lee searchParams (filtros), consulta el data layer en
// servidor y renderiza el listado. Sin JS en cliente para esta vista.
export default async function LibreriaPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const books = listBooks({
    year: params.year,
    type: params.type,
    q: params.q,
  });

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold text-white">Libreria</h1>
      {books.length === 0 ? (
        <p className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No se han encontrado libros con los filtros seleccionados.
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
