import { listPurchasedBooks } from "@/lib/db";

export async function GET(_request, ctx) {
  const { id } = await ctx.params;
  return Response.json(listPurchasedBooks(id));
}
