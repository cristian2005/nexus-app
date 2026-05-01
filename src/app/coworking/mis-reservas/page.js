import { listReservationsByUser } from "@/lib/db";
import Link from "next/link";

// Server Component: hace fetch del data layer en servidor.
export default async function MyReservationsPage() {
  // Usuario mock para demo (en producción vendría de sesión/auth)
  const userId = "u1";
  const reservations = listReservationsByUser(userId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/coworking" className="text-sm text-amber-400 hover:underline">
        ← Volver a coworking
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-white">Mis Reservas</h1>
      <p className="mt-2 text-slate-400">
        Historial de tus reservas de espacios
      </p>

      {reservations.length === 0 ? (
        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-slate-400">No tienes reservas</p>
          <Link
            href="/coworking"
            className="mt-4 inline-block text-amber-400 hover:underline"
          >
            Ver espacios disponibles
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Espacio {res.spaceId}</span>
                  <p className="text-sm text-slate-400">
                    {new Date(res.startTime).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-amber-400">
                    {new Date(res.startTime).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(res.endTime).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}