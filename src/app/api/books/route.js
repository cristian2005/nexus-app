import { listBooks } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const books = listBooks({
    category: searchParams.get("category") ?? undefined,
    year: searchParams.get("year") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return Response.json(books);
}
