import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/adminAuth";
import { getServiceSupabase } from "@/lib/supabase";
import { isSource } from "@/lib/content";

export const runtime = "nodejs";

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  // Escapar comillas y envolver siempre para evitar problemas con comas/saltos.
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token, Date.now())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, {
      status: 401,
    });
  }

  const sourceParam = new URL(req.url).searchParams.get("source");
  const filterSource = isSource(sourceParam) ? sourceParam : null;

  let rows: Record<string, unknown>[] = [];
  try {
    const supabase = getServiceSupabase();
    let query = supabase
      .from("leads")
      .select("email,source,consent_marketing,unsubscribed,created_at,ip")
      .order("created_at", { ascending: false })
      .limit(50000);
    if (filterSource) query = query.eq("source", filterSource);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    rows = data ?? [];
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "No se pudo leer la tabla de leads.",
      },
      { status: 500 },
    );
  }

  const header = [
    "email",
    "source",
    "consent_marketing",
    "unsubscribed",
    "created_at",
    "ip",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(header.map((h) => csvCell(r[h])).join(","));
  }
  // BOM para que Excel respete UTF-8.
  const csv = "﻿" + lines.join("\r\n");

  const suffix = filterSource ? `-${filterSource}` : "";
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-fromus${suffix}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
