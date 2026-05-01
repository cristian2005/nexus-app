import { getSpace } from "@/lib/db";

export async function GET(_request, ctx) {
  const { id } = await ctx.params;
  const space = getSpace(id);
  if (!space) {
    return Response.json({ error: "Espacio no encontrado" }, { status: 404 });
  }
  return Response.json(space);
}