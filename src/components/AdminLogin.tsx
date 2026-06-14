"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Problema de red. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="container-tight flex min-h-[70vh] items-center py-16">
      <div className="card mx-auto w-full max-w-sm border-orange/30 bg-surface-raised p-7">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ sudo login
        </span>
        <h1 className="mt-3 font-display text-xl text-beige">Panel de leads</h1>
        <p className="mt-1 text-sm text-beige/55">
          Acceso restringido. Ingresa la contraseña del panel.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-mono"
            disabled={loading}
            autoFocus
          />
          {error && (
            <p className="font-mono text-xs text-orange" role="alert">
              ! {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-orange w-full"
            disabled={loading}
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
