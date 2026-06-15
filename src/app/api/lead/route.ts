import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { buildDeliveryEmail } from "@/lib/emails";
import { GUIDES, isSource } from "@/lib/content";
import {
  unsubscribeUrl,
  guideUnlockUrl,
  makeUnlockToken,
} from "@/lib/tokens";
import { rateLimit, pruneRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

// Validación de email sobria pero efectiva.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  // 1. Rate-limit por IP
  pruneRateLimit();
  const ip = getClientIp(req);
  const { allowed, retryAfter } = rateLimit(`lead:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Espera un momento." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  // 2. Parseo y validación de entrada
  let body: { email?: unknown; source?: unknown; consent?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = body.source;
  const consent = body.consent === true;

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Ingresa un correo válido." },
      { status: 400 },
    );
  }
  if (!isSource(source)) {
    return NextResponse.json(
      { ok: false, error: "Origen inválido." },
      { status: 400 },
    );
  }
  if (!consent) {
    return NextResponse.json(
      {
        ok: false,
        error: "Necesitamos tu consentimiento para enviarte la guía.",
      },
      { status: 400 },
    );
  }

  const guide = GUIDES[source];

  // Ruta de desbloqueo (relativa) que el cliente usará para abrir la guía con
  // token firmado. Se devuelve siempre que la validación pasó.
  const unlockToken = makeUnlockToken(email, source);
  const unlockPath = `/${guide.slug}/guia?e=${encodeURIComponent(
    email,
  )}&t=${unlockToken}`;

  // 3. Upsert del lead (no duplicar por email+source). Si Supabase no está
  //    configurado, no rompemos la experiencia: revelamos la guía igual.
  let leadSaved = false;
  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("leads").upsert(
      {
        email,
        source,
        consent_marketing: consent,
        ip,
      },
      { onConflict: "email,source", ignoreDuplicates: false },
    );
    if (error) {
      console.error("[lead] Supabase upsert error:", error.message);
    } else {
      leadSaved = true;
    }
  } catch (err) {
    console.error(
      "[lead] No se pudo guardar el lead:",
      err instanceof Error ? err.message : err,
    );
  }

  // 4. Correo de entrega — DESACTIVADO por defecto. El objetivo es solo
  //    capturar el correo; el email marketing se hará aparte, después.
  //    Para reactivar el envío transaccional, pon EMAIL_DELIVERY_ENABLED=true
  //    (requiere RESEND_API_KEY y dominio verificado).
  let emailSent = false;
  if (process.env.EMAIL_DELIVERY_ENABLED === "true") {
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
      const guideUrl = guideUnlockUrl(siteUrl, guide.slug, email, source);
      const unsubUrl = unsubscribeUrl(siteUrl, email, source);
      const { subject, html, text } = buildDeliveryEmail(source, {
        guideUrl,
        unsubscribeUrl: unsubUrl,
      });
      const result = await sendEmail({ to: email, subject, html, text });
      emailSent = result.ok;
      if (!result.ok) console.error("[lead] Resend error:", result.error);
    } catch (err) {
      console.error(
        "[lead] No se pudo enviar el correo:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  // La guía se desbloquea siempre que la validación pasó: el cliente redirige
  // a unlockPath, donde el servidor verifica el token y renderiza la guía.
  return NextResponse.json({ ok: true, leadSaved, emailSent, unlockPath });
}
