import { listCategories } from "@/lib/db";

export async function GET() {
  return Response.json(listCategories());
}
