import { getSpace } from "@/lib/db";
import Link from "next/link";

// Server Component: hace fetch del data layer en servidor.
// force-dynamic para recalcular estado ocupado/libre.
export const dynamic = "force-dynamic";

export default async function SpaceDetailPage({ params }) {
  const { id } = await params;
  const space = getSpace(id);
  const now = new Date();

  if (!space) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Espacio no encontrado</h1>
        <Link href="/coworking" className="mt-4 text-amber-400 hover:underline">
          Volver a coworking
        </Link>
      </div>
    );
  }

  // Filtrar reservas de hoy
  const todayStr = now.toISOString().split("T")[0];
  const todayReservations = space.reservations?.filter((r) =>
    r.startTime.startsWith(todayStr)
  ) || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/coworking" className="text-sm text-amber-400 hover:underline">
        ← Volver a coworking
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={space.image}
            alt={space.name}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">{space.name}</h1>
          <p className="mt-2 text-slate-400">{space.description}</p>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-slate-300">
              Capacidad: <span className="text-white">{space.capacity}</span> personas
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {space.amenities?.map((amenity) => (
              <span
                key={amenity}
                className="rounded bg-slate-800 px-3 py-1 text-sm text-slate-300"
              >
                {amenity}
              </span>
            ))}
          </div>

          <Link
            href={`/coworking/${id}/reservar`}
            className="mt-6 inline-block rounded-md bg-amber-500 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Reservar este espacio
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white">Reservas de hoy</h2>
        {todayReservations.length === 0 ? (
          <p className="mt-2 text-slate-400">No hay reservas para hoy</p>
        ) : (
          <div className="mt-4 space-y-3">
            {todayReservations.map((res) => (
              <div
                key={res.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{res.userName}</span>
                  <span className="text-sm text-slate-400">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}