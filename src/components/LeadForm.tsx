"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideConfig } from "@/lib/content";

export const unlockKey = (source: string) => `fromus_unlock_${source}`;

interface LeadFormProps {
  guide: GuideConfig;
  /**
   * Se llama tras capturar el correo. unlockPath es la ruta de la guía con
   * token firmado; emailSent indica si Resend confirmó el envío.
   */
  onSuccess: (unlockPath: string, emailSent: boolean) => void;
  title?: string;
  subtitle?: string;
}

type Status = "idle" | "loading" | "error";

export function LeadForm({
  guide,
  onSuccess,
  title = "Recibe la guía completa",
  subtitle = "Déjanos tu correo y te la mostramos aquí mismo. También te la enviamos para que la tengas siempre a mano.",
}: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Marca la casilla de consentimiento para recibir la guía.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: guide.source, consent }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "No pudimos procesar tu solicitud.");
        return;
      }
      const unlockPath: string = data.unlockPath ?? `/${guide.slug}/guia`;
      // Recordar el desbloqueo (ruta con token) en este navegador para no
      // volver a pedir el correo si la persona regresa a la guía.
      try {
        localStorage.setItem(unlockKey(guide.source), unlockPath);
      } catch {
        /* localStorage puede estar deshabilitado; no es crítico */
      }
      onSuccess(unlockPath, Boolean(data.emailSent));
    } catch {
      setStatus("error");
      setError("Hubo un problema de red. Intenta de nuevo.");
    }
  }

  return (
    <div className="card border-orange/30 bg-surface-raised p-6 sm:p-8">
      <h2 className="font-display text-xl text-beige sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-beige/60">{subtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="tu@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-mono"
            disabled={status === "loading"}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-beige/60">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-orange"
            disabled={status === "loading"}
          />
          <span>
            Autorizo a Fromus S.A.S. a tratar mi correo para enviarme este
            material y comunicaciones relacionadas, conforme a la{" "}
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
          <p className="font-mono text-xs text-orange" role="alert">
            ! {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-orange w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando…" : "Recibir la guía"}
        </button>

        <p className="text-center text-[11px] text-beige/30">
          Sin spam. Puedes darte de baja cuando quieras.
        </p>
      </form>
    </div>
  );
}
