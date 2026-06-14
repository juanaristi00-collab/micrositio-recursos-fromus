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

/**
 * Token de desbloqueo de la guía. Permite que el enlace del correo de
 * marketing abra la guía directo (sin volver a pedir el correo) en cualquier
 * dispositivo, porque viaja firmado. Se usa un sufijo distinto al de baja para
 * que un token no sirva para la otra acción.
 */
export function makeUnlockToken(email: string, source: Source): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`unlock:${email.toLowerCase()}:${source}`)
    .digest("hex");
}

export function verifyUnlockToken(
  email: string,
  source: Source,
  token: string,
): boolean {
  const expected = makeUnlockToken(email, source);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** URL de la guía con token de desbloqueo (para el botón del correo). */
export function guideUnlockUrl(
  siteUrl: string,
  slug: string,
  email: string,
  source: Source,
): string {
  const token = makeUnlockToken(email, source);
  const params = new URLSearchParams({ e: email, t: token });
  return `${siteUrl}/${slug}/guia?${params.toString()}`;
}
