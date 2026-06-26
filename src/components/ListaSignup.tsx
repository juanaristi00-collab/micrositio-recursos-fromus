"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Captura de correo para /lista. Sigue el mismo patrón que las guías
 * (POST /api/lead con consentimiento y nota de Habeas Data), pero con
 * source "lista": no desbloquea contenido, solo guarda el lead.
 *
 * TODO(links): no existe aún un archivo de constantes de enlaces en el repo.
 * Reemplazá la URL de Instagram por la real cuando esté disponible.
 */
const INSTAGRAM_URL = "https://instagram.com/fromus"; // TODO: confirmar handle real
const FROMUS_URL = "https://fromus.tech"; // usado en el resto del micrositio

type Status = "idle" | "loading" | "done" | "error";

export function ListaSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Marca la casilla de consentimiento para recibir novedades.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lista", consent }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "No pudimos procesar tu solicitud.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Hubo un problema de red. Intenta de nuevo.");
    }
  }

  return (
    <footer className="mt-20 border-t border-edge pt-12 sm:mt-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-2xl text-beige sm:text-3xl">
          ¿Te sirvió la lista?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-beige/60">
          Dejá tu correo y te avisamos cuando subamos más sobre IA aplicada a tu
          empresa. Después, seguinos y contale a tu equipo.
        </p>

        {status === "done" ? (
          <div className="card mt-7 border-orange/30 bg-surface-raised p-6 text-center">
            <p className="font-display text-lg text-beige">
              <span className="text-orange">✓</span> Quedaste en la lista.
            </p>
            <p className="mt-2 text-sm text-beige/60">
              Te escribimos cuando haya algo nuevo. Mientras tanto:
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="card mt-7 border-orange/30 bg-surface-raised p-6 text-left sm:p-8"
            noValidate
          >
            <label htmlFor="lista-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="lista-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="tu@empresa.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="input-mono"
              disabled={status === "loading"}
            />

            <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-beige/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(ev) => setConsent(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-orange"
                disabled={status === "loading"}
              />
              <span>
                Autorizo a Fromus S.A.S. a tratar mi correo para enviarme
                novedades, conforme a la{" "}
                <Link
                  href="/privacidad"
                  target="_blank"
                  className="text-orange underline underline-offset-2"
                >
                  política de tratamiento de datos
                </Link>{" "}
                (Ley 1581 de 2012).
              </span>
            </label>

            {error && (
              <p className="mt-3 font-mono text-xs text-orange" role="alert">
                ! {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-orange mt-5 w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : "Avísenme de novedades"}
            </button>

            <p className="mt-3 text-center text-[11px] text-beige/30">
              Sin spam. Puedes darte de baja cuando quieras.
            </p>
          </form>
        )}

        {/* CTA social — siempre visible (destino del reel) */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange"
          >
            Seguime en Instagram
          </a>
          <a
            href={FROMUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Conocé Fromus
          </a>
        </div>

        <p className="mt-8 font-hand text-2xl text-orange">
          — Miguel, cofundador de Fromus
        </p>
      </div>
    </footer>
  );
}
