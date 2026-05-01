import { listSpaces } from "@/lib/db";
import SpaceCard from "@/components/SpaceCard";

// Server Component: hace fetch del data layer en servidor, no requiere interactividad.
// force-dynamic para que el estado ocupado/libre se recalcule en cada request.
export const dynamic = "force-dynamic";

export default async function CoworkingPage() {
  const now = new Date();
  const spaces = listSpaces();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">Espacios de Coworking</h1>
      <p className="mt-2 text-slate-400">
        Reserva tu espacio de trabajo ideal
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} now={now} />
        ))}
      </div>
    </div>
  );
}