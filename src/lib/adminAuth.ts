import crypto from "crypto";

/**
 * Autenticación mínima para el panel /admin. Una sola contraseña
 * (ADMIN_PASSWORD) protege el acceso. Al iniciar sesión se emite una cookie
 * httpOnly con un token firmado (HMAC) que incluye expiración, de modo que la
 * contraseña nunca viaja en la cookie y el token no se puede falsificar.
 */
export const ADMIN_COOKIE = "fromus_admin";

const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

function secret(): string {
  return process.env.UNSUBSCRIBE_SECRET ?? "dev-insecure-secret-change-me";
}

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Verifica la contraseña ingresada contra ADMIN_PASSWORD (tiempo constante). */
export function checkPassword(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (typeof input !== "string") return false;
  return safeEqual(input, expected);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function makeAdminToken(now: number): string {
  const exp = String(now + TTL_MS);
  return `${exp}.${sign(`admin:${exp}`)}`;
}

export function verifyAdminToken(
  token: string | undefined | null,
  now: number,
): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if (!safeEqual(sig, sign(`admin:${payload}`))) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || now > exp) return false;
  return true;
}
