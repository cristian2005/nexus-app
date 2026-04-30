import { purchase } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const { userId, bookIds } = body ?? {};
  if (!userId || !Array.isArray(bookIds) || bookIds.length === 0) {
    return Response.json(
      { error: "userId y bookIds (array) son obligatorios" },
      { status: 400 },
    );
  }
  const result = purchase({ userId, bookIds });
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json({ purchased: result.purchased }, { status: 201 });
}
