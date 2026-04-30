import Link from "next/link";

// Server Component: solo renderiza enlaces, sin interaccion ni estado.
// NOTA: los enlaces de /coworking, /coworking/mis-reservas y /login los
// anadira la Persona B cuando implemente esa parte.
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          <span className="text-amber-400">Nexus</span> DFR
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-slate-300 hover:text-white" href="/libreria">
            Libreria
          </Link>
          <Link className="text-slate-300 hover:text-white" href="/libreria/mis-libros">
            Mis libros
          </Link>
          <Link
            className="text-slate-300 hover:text-white"
            href="/libreria/carrito"
          >
            Carrito
          </Link>
        </nav>
      </div>
    </header>
  );
}
