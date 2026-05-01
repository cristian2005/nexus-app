import Link from "next/link";

// Server Component: solo presenta datos, el cálculo de estado Libre/Ocupado
// se hace en el servidor para evitar enviar JavaScript innecesario al cliente.
export default function SpaceCard({ space, now }) {
  // Determinar si el espacio está ocupado actualmente
  const isOccupied = space.reservations?.some((res) => {
    const start = new Date(res.startTime);
    const end = new Date(res.endTime);
    return now >= start && now < end;
  });

  return (
    <Link
      href={`/coworking/${space.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900 transition hover:border-amber-500"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={space.image}
          alt={space.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span
          className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-xs font-bold ${
            isOccupied
              ? "bg-red-500/90 text-white"
              : "bg-green-500/90 text-white"
          }`}
        >
          {isOccupied ? "Ocupado" : "Libre"}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{space.name}</h3>
          <p className="mt-1 text-sm text-slate-400 line-clamp-2">
            {space.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Capacidad: <span className="text-white">{space.capacity}</span> personas
          </span>
          <div className="flex gap-1">
            {space.amenities?.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}