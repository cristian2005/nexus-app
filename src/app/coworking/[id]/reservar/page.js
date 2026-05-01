import { getSpace } from "@/lib/db";
import ReservationForm from "@/components/ReservationForm";
import Link from "next/link";

// Server Component: hace fetch del data layer en servidor.
export default async function ReservePage({ params }) {
  const { id } = await params;
  const space = getSpace(id);

  if (!space) {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Espacio no encontrado</h1>
        <Link href="/coworking" className="mt-4 text-amber-400 hover:underline">
          Volver a coworking
        </Link>
      </div>
    );
  }

  // Usuario mock para demo (en producción vendría de sesión/auth)
  const user = { id: "u1", name: "Estudiante Demo" };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link
        href={`/coworking/${id}`}
        className="text-sm text-amber-400 hover:underline"
      >
        ← Volver al espacio
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-white">Reservar {space.name}</h1>
      <p className="mt-2 text-slate-400">
        Selecciona la fecha y hora para tu reserva
      </p>

      <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <ReservationForm space={space} user={user} />
      </div>
    </div>
  );
}