import BookCard from "@/components/BookCard";
import { listPurchasedBooks } from "@/lib/db";

// Server Component: para Actividad 1 mostramos los libros del usuario
// demo (u1). En la Actividad 2/3 esto se obtendra de la sesion de Auth0.
// force-dynamic para que tras una compra se vea reflejado al instante.
export const dynamic = "force-dynamic";

const DEMO_USER_ID = "u1";

export default async function MisLibrosPage() {
  const books = listPurchasedBooks(DEMO_USER_ID);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold text-white">Mis libros</h1>
      {books.length === 0 ? (
        <p className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Aun no has adquirido ningun libro.
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
