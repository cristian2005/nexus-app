import { getUserByEmail } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return Response.json({ error: "Email requerido" }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return Response.json(user);
}