import crypto from "crypto";
import type { Source } from "./content";

/**
 * Genera un token HMAC para el enlace de baja. Permite procesar la baja
 * sin sesión y sin exponer una operación de escritura abierta: solo quien
 * recibió el correo (con el token firmado) puede darse de baja.
 */
function secret(): string {
  return process.env.UNSUBSCRIBE_SECRET ?? "dev-insecure-secret-change-me";
}

export function makeUnsubscribeToken(email: string, source: Source): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`${email.toLowerCase()}:${source}`)
    .digest("hex");
}

export function verifyUnsubscribeToken(
  email: string,
  source: Source,
  token: string,
): boolean {
  const expected = makeUnsubscribeToken(email, source);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function unsubscribeUrl(
  siteUrl: string,
  email: string,
  source: Source,
): string {
  const token = makeUnsubscribeToken(email, source);
  const params = new URLSearchParams({ email, source, token });
  return `${siteUrl}/api/unsubscribe?${params.toString()}`;
}
