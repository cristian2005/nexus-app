"use client";

// Client Component: necesita useState para gestionar el formulario y
// useRouter para refrescar tras la reserva.
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservationForm({ space, user }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtener fecha actual en formato YYYY-MM-DD para el valor inicial del input
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const startTime = `${formData.get("date")}T${formData.get("startTime")}:00`;
    const endTime = `${formData.get("date")}T${formData.get("endTime")}:00`;

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: space.id,
          userId: user.id,
          userName: user.name,
          startTime,
          endTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear la reserva");
        return;
      }

      router.refresh();
      router.push("/coworking/mis-reservas");
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300">Fecha</label>
        <input
          type="date"
          name="date"
          defaultValue={today}
          required
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">Hora inicio</label>
          <input
            type="time"
            name="startTime"
            defaultValue="09:00"
            required
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Hora fin</label>
          <input
            type="time"
            name="endTime"
            defaultValue="11:00"
            required
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-50"
      >
        {loading ? "Reservando..." : "Confirmar reserva"}
      </button>
    </form>
  );
}