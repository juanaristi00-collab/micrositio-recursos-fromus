/**
 * Rate-limit básico en memoria por IP (ventana deslizante simple).
 * Suficiente para frenar abuso trivial del formulario. Para escala real
 * (varias instancias serverless) conviene mover a Upstash/Redis, pero
 * para este micrositio el control en proceso cumple.
 */
type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

const WINDOW_MS = 60_000; // 1 minuto
const MAX_HITS = 5; // máx. envíos por IP por ventana

export function rateLimit(key: string): {
  allowed: boolean;
  retryAfter: number;
} {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (hit.count >= MAX_HITS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((hit.resetAt - now) / 1000),
    };
  }

  hit.count += 1;
  return { allowed: true, retryAfter: 0 };
}

// Limpieza perezosa para que el Map no crezca indefinidamente.
export function pruneRateLimit(): void {
  const now = Date.now();
  for (const [key, hit] of store.entries()) {
    if (now > hit.resetAt) store.delete(key);
  }
}
