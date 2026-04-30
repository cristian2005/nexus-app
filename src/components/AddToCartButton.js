"use client";

// Client Component: necesita estado local (feedback visual) y acceder a
// localStorage para mantener el carrito entre paginas.
import { useState } from "react";

export default function AddToCartButton({ bookId, title }) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    try {
      const raw = window.localStorage.getItem("nexus-cart");
      const cart = raw ? JSON.parse(raw) : [];
      if (!cart.includes(bookId)) {
        cart.push(bookId);
        window.localStorage.setItem("nexus-cart", JSON.stringify(cart));
      }
      setAdded(true);
      window.dispatchEvent(new Event("nexus-cart-update"));
      setTimeout(() => setAdded(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Anadir ${title} al carrito`}
      className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60"
      disabled={added}
    >
      {added ? "Anadido ✓" : "Anadir al carrito"}
    </button>
  );
}
