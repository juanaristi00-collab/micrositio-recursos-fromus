import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/adminAuth";
import { getServiceSupabase } from "@/lib/supabase";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminLogout } from "@/components/AdminLogout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de leads",
  robots: { index: false, follow: false },
};

interface Lead {
  email: string;
  source: "rup" | "licitar";
  consent_marketing: boolean;
  unsubscribed: boolean;
  created_at: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function AdminPage() {
  const authed = verifyAdminToken(
    cookies().get(ADMIN_COOKIE)?.value,
    Date.now(),
  );

  if (!authed) {
    return <AdminLogin />;
  }

  let leads: Lead[] = [];
  let dbError: string | null = null;
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("leads")
      .select("email,source,consent_marketing,unsubscribed,created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);
    leads = (data ?? []) as Lead[];
  } catch (err) {
    dbError =
      err instanceof Error
        ? err.message
        : "No se pudo conectar con Supabase.";
  }

  const total = leads.length;
  const rup = leads.filter((l) => l.source === "rup").length;
  const licitar = leads.filter((l) => l.source === "licitar").length;
  const activos = leads.filter((l) => !l.unsubscribed).length;

  const stats: [string, number | string][] = [
    ["total", total],
    ["rup", rup],
    ["licitar", licitar],
    ["activos", activos],
  ];

  return (
    <div className="container-prose py-12">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ ./leads
        </span>
        <AdminLogout />
      </div>
      <h1 className="mt-3 font-display text-3xl text-beige">Panel de leads</h1>

      {dbError ? (
        <div className="mt-8 rounded-lg border border-orange/40 bg-orange/5 p-5 text-sm text-beige/80">
          <p className="font-semibold text-orange">
            No se pudo leer la tabla de leads.
          </p>
          <p className="mt-1">
            Verifica que <span className="num">SUPABASE_URL</span> y{" "}
            <span className="num">SUPABASE_SERVICE_ROLE_KEY</span> estén
            configuradas y que la tabla <span className="num">leads</span> exista
            (ejecuta <span className="num">supabase/schema.sql</span>).
          </p>
          <p className="mt-2 font-mono text-xs text-beige/40">{dbError}</p>
        </div>
      ) : (
        <>
          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="card text-center">
                <div className="num text-3xl font-bold text-orange">
                  {value}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-beige/45">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* EXPORTAR */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/api/admin/export" className="btn-orange text-sm">
              ↓ Descargar CSV (todos)
            </a>
            <a
              href="/api/admin/export?source=rup"
              className="btn-ghost text-sm"
            >
              CSV solo RUP
            </a>
            <a
              href="/api/admin/export?source=licitar"
              className="btn-ghost text-sm"
            >
              CSV solo Licitar
            </a>
          </div>

          {/* TABLA */}
          <div className="mt-8 overflow-x-auto rounded-lg border border-edge">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-edge bg-surface-raised text-left text-beige/50">
                  <th className="px-4 py-3 font-mono font-normal">correo</th>
                  <th className="px-4 py-3 font-mono font-normal">fuente</th>
                  <th className="px-4 py-3 font-mono font-normal">estado</th>
                  <th className="px-4 py-3 font-mono font-normal">fecha</th>
                </tr>
              </thead>
              <tbody>
                {total === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-beige/40"
                    >
                      Aún no hay leads. Cuando alguien deje su correo, aparecerá
                      aquí.
                    </td>
                  </tr>
                ) : (
                  leads.map((l, i) => (
                    <tr
                      key={`${l.email}-${l.source}-${i}`}
                      className="border-b border-edge/40"
                    >
                      <td className="px-4 py-2.5 font-mono text-beige/85">
                        {l.email}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-xs ${
                            l.source === "rup"
                              ? "bg-indigo/15 text-indigo"
                              : "bg-emerald/15 text-emerald"
                          }`}
                        >
                          {l.source}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        {l.unsubscribed ? (
                          <span className="font-mono text-xs text-beige/35">
                            baja
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-emerald">
                            activo
                          </span>
                        )}
                      </td>
                      <td className="num px-4 py-2.5 text-xs text-beige/55">
                        {formatDate(l.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-mono text-xs text-beige/30">
            Mostrando {total} {total === 1 ? "lead" : "leads"}
            {total >= 5000 ? " (máx. 5000 en pantalla; el CSV trae todo)." : "."}
          </p>
        </>
      )}
    </div>
  );
}
