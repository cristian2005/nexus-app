import { getTopBooks } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 10);
  return Response.json(getTopBooks(limit));
}
