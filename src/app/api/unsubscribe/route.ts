import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { isSource } from "@/lib/content";
import { verifyUnsubscribeToken } from "@/lib/tokens";

export const runtime = "nodejs";

function page(title: string, message: string, ok: boolean): NextResponse {
  const color = ok ? "#10B981" : "#E8672E";
  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} · Fromus</title>
<style>
  body{margin:0;background:#000;color:#E8E0D0;font-family:system-ui,Arial,sans-serif;
    display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;}
  .box{max-width:440px;background:#0F0F0F;border:1px solid #1A1A1A;border-radius:12px;padding:32px;text-align:center;}
  .tag{font-family:monospace;color:#E8672E;font-size:13px;letter-spacing:1px;}
  h1{font-size:20px;margin:16px 0 8px;color:${color};}
  p{color:#a8a294;line-height:1.6;font-size:15px;}
  a{color:#E8672E;text-decoration:none;}
</style></head>
<body><div class="box">
  <span class="tag">fromus.tech</span>
  <h1>${title}</h1>
  <p>${message}</p>
  <p style="margin-top:24px;"><a href="https://fromus.tech">← Volver a fromus.tech</a></p>
</div></body></html>`;
  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();
  const source = searchParams.get("source");
  const token = searchParams.get("token") ?? "";

  if (!email || !isSource(source) || !token) {
    return page("Enlace inválido", "El enlace de baja no es válido.", false);
  }
  if (!verifyUnsubscribeToken(email, source, token)) {
    return page(
      "Enlace inválido",
      "No pudimos verificar este enlace de baja. Si el problema persiste, escríbenos a recursos@fromus.tech.",
      false,
    );
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("leads")
      .update({ unsubscribed: true })
      .eq("email", email)
      .eq("source", source);
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error(
      "[unsubscribe] error:",
      err instanceof Error ? err.message : err,
    );
    return page(
      "Algo salió mal",
      "No pudimos procesar tu baja en este momento. Escríbenos a recursos@fromus.tech y lo hacemos manualmente.",
      false,
    );
  }

  return page(
    "Listo, te diste de baja",
    "No volverás a recibir correos de este recurso. Gracias por habernos dado una oportunidad.",
    true,
  );
}
