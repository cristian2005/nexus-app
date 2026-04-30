"use client";

// Client Component: el carrito esta en localStorage y consulta /api/books/[id]
// del lado cliente para obtener los datos de cada libro guardado.
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const DEMO_USER_ID = "u1";

export default function CartView() {
  const [ids, setIds] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState(null);

  const loadCart = useCallback(() => {
    try {
      const raw = window.localStorage.getItem("nexus-cart");
      const parsed = raw ? JSON.parse(raw) : [];
      setIds(parsed);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    loadCart();
    window.addEventListener("nexus-cart-update", loadCart);
    return () => window.removeEventListener("nexus-cart-update", loadCart);
  }, [loadCart]);

  useEffect(() => {
    let cancelled = false;
    async function fetchItems() {
      setLoading(true);
      const results = await Promise.all(
        ids.map((id) => fetch(`/api/books/${id}`).then((r) => (r.ok ? r.json() : null))),
      );
      if (!cancelled) {
        setItems(results.filter(Boolean));
        setLoading(false);
      }
    }
    fetchItems();
    return () => {
      cancelled = true;
    };
  }, [ids]);

  function removeFromCart(id) {
    const next = ids.filter((x) => x !== id);
    window.localStorage.setItem("nexus-cart", JSON.stringify(next));
    setIds(next);
  }

  function clearCart() {
    window.localStorage.setItem("nexus-cart", "[]");
    setIds([]);
  }

  async function confirmPurchase() {
    setConfirming(true);
    setMessage(null);
    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: DEMO_USER_ID, bookIds: ids }),
    });
    setConfirming(false);
    if (res.ok) {
      const data = await res.json();
      setMessage(`Compra realizada: ${data.purchased.length} producto(s).`);
      clearCart();
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error ?? "No se pudo completar la compra");
    }
  }

  const total = items.reduce((sum, b) => sum + b.price, 0);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold text-white">Carrito</h1>

      {loading ? (
        <p className="text-slate-400">Cargando productos…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-300">El carrito esta vacio.</p>
          <Link
            href="/libreria"
            className="mt-3 inline-block text-sm text-amber-300 hover:underline"
          >
            Explorar libreria →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={book.title}
                className="h-20 w-14 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-white">{book.title}</p>
                <p className="text-sm text-slate-400">{book.author}</p>
              </div>
              <span className="font-semibold text-amber-300">
                {book.price.toFixed(2)} €
              </span>
              <button
                type="button"
                onClick={() => removeFromCart(book.id)}
                className="rounded border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-rose-500 hover:text-rose-300"
              >
                Quitar
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between rounded-lg border border-amber-700/40 bg-amber-950/20 p-4">
            <span className="text-lg text-slate-200">Total</span>
            <span className="text-2xl font-bold text-amber-300">
              {total.toFixed(2)} €
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={confirmPurchase}
              disabled={confirming}
              className="flex-1 rounded-md bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-60"
            >
              {confirming ? "Procesando…" : "Confirmar compra"}
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="rounded-md border border-slate-700 px-4 py-2 text-slate-300 hover:border-rose-500 hover:text-rose-300"
            >
              Vaciar
            </button>
          </div>
        </div>
      )}

      {message ? (
        <p className="mt-4 rounded border border-emerald-700/40 bg-emerald-950/30 p-3 text-emerald-300">
          {message}
        </p>
      ) : null}
    </section>
  );
}
