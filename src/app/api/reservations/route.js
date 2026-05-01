import { listReservationsByUser, createReservation } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ error: "userId requerido" }, { status: 400 });
  }
  return Response.json(listReservationsByUser(userId));
}

export async function POST(request) {
  const body = await request.json();
  const { spaceId, userId, userName, startTime, endTime } = body;

  if (!spaceId || !userId || !userName || !startTime || !endTime) {
    return Response.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  const result = createReservation({ spaceId, userId, userName, startTime, endTime });
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json(result);
}