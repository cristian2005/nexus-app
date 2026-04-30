"use client";

// Client Component: necesita useState para abrir/cerrar el menu desplegable
// y usePathname para resaltar la categoria activa.
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategorySidebar({ categories }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold uppercase tracking-wide text-slate-300"
      >
        <span>Categorias</span>
        <span className="text-amber-400">{open ? "▾" : "▸"}</span>
      </button>
      {open ? (
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href="/libreria"
              className={`block rounded px-2 py-1 text-sm hover:bg-slate-800 ${
                pathname === "/libreria" ? "bg-slate-800 text-amber-300" : "text-slate-200"
              }`}
            >
              Todas
            </Link>
          </li>
          {categories.map((cat) => {
            const href = `/libreria/categoria/${cat.slug}`;
            const active = pathname === href;
            return (
              <li key={cat.slug}>
                <Link
                  href={href}
                  className={`block rounded px-2 py-1 text-sm hover:bg-slate-800 ${
                    active ? "bg-slate-800 text-amber-300" : "text-slate-200"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </aside>
  );
}
