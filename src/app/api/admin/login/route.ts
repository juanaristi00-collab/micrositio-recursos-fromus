import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  makeAdminToken,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El panel no está configurado: falta la variable ADMIN_PASSWORD.",
      },
      { status: 500 },
    );
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  if (!checkPassword(body.password)) {
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  const token = makeAdminToken(Date.now());
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
