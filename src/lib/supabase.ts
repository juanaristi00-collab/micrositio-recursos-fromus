import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con SERVICE ROLE key.
 * SOLO debe usarse en código que corre del lado servidor (Route Handlers).
 * La service role key salta RLS, por eso jamás se expone al browser.
 *
 * Se crea de forma perezosa para que el build no falle si las variables
 * aún no están configuradas (p. ej. con valores placeholder).
 */
let cached: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno.",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
