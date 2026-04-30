import { getBook } from "@/lib/db";

export async function GET(_request, ctx) {
  const { id } = await ctx.params;
  const book = getBook(id);
  if (!book) {
    return Response.json({ error: "Libro no encontrado" }, { status: 404 });
  }
  return Response.json(book);
}
