"use client";

// Client Component: usa useRouter + useSearchParams para actualizar la URL
// (los filtros se aplican via searchParams, leidos en la pagina Server).
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Filters({ years }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYear = searchParams.get("year") ?? "";
  const currentType = searchParams.get("type") ?? "";
  const currentQ = searchParams.get("q") ?? "";

  function update(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Filtros
      </h3>

      <label className="mb-3 block text-xs text-slate-400">
        Buscar por titulo o autor
        <input
          type="search"
          defaultValue={currentQ}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Ej. Cervantes"
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
        />
      </label>

      <label className="mb-3 block text-xs text-slate-400">
        Tipo
        <select
          value={currentType}
          onChange={(e) => update("type", e.target.value)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
        >
          <option value="">Todos</option>
          <option value="book">Libro</option>
          <option value="magazine">Revista</option>
        </select>
      </label>

      <label className="block text-xs text-slate-400">
        Ano de publicacion
        <select
          value={currentYear}
          onChange={(e) => update("year", e.target.value)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
        >
          <option value="">Cualquiera</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      {(currentYear || currentType || currentQ) && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="mt-3 w-full rounded border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-amber-500 hover:text-amber-300"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
