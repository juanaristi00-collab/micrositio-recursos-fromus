"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { GuideConfig } from "@/lib/content";

interface LandingProps {
  guide: GuideConfig;
  /** Contenido completo de la guía, revelado tras capturar el correo. */
  children: ReactNode;
}

type Status = "idle" | "loading" | "revealed" | "error";

export function Landing({ guide, children }: LandingProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

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
      setEmailSent(Boolean(data.emailSent));
      setStatus("revealed");
      // Llevar la vista al contenido revelado.
      requestAnimationFrame(() => {
        document
          .getElementById("guia")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setStatus("error");
      setError("Hubo un problema de red. Intenta de nuevo.");
    }
  }

  const revealed = status === "revealed";

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-edge">
        <div className="container-tight py-16 sm:py-24">
          <span className="font-mono text-xs text-orange">
            <span className="text-beige/40">fromus@recursos</span>:~$ cat{" "}
            {guide.tag}
          </span>
          <h1 className="mt-5 font-display text-3xl leading-tight text-beige sm:text-5xl">
            {guide.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-beige/70 sm:text-lg">
            {guide.heroSubtitle}
          </p>
        </div>
      </section>

      {/* QUÉ TE LLEVAS */}
      <section className="container-tight py-12">
        <h2 className="font-mono text-sm uppercase tracking-widest text-beige/40">
          // qué te llevas
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {guide.bullets.map((b, i) => (
            <li
              key={i}
              className="card flex gap-3 hover:border-orange/60"
            >
              <span className="num mt-0.5 shrink-0 text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-beige/85">
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* CREDIBILIDAD */}
        <p className="mt-6 border-l-2 border-emerald/60 bg-surface-raised py-3 pl-4 pr-3 text-sm text-beige/70">
          {guide.credibility}
        </p>
      </section>

      {/* FORMULARIO DE CAPTURA */}
      {!revealed && (
        <section className="container-tight pb-16" id="recibir">
          <div className="card border-orange/30 bg-surface-raised p-6 sm:p-8">
            <h2 className="font-display text-xl text-beige sm:text-2xl">
              Recibe la guía completa
            </h2>
            <p className="mt-2 text-sm text-beige/60">
              Te la mostramos aquí mismo y te la enviamos a tu correo para que la
              tengas siempre a mano.
            </p>

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
        </section>
      )}

      {/* GUÍA REVELADA IN-LINE */}
      {revealed && (
        <section
          id="guia"
          className="container-prose scroll-mt-6 animate-fade-in-up pb-20"
        >
          <div className="mb-8 rounded-lg border border-emerald/40 bg-emerald/5 p-5">
            <p className="font-display text-lg text-emerald">
              ✓ Aquí está tu guía
            </p>
            <p className="mt-1 text-sm text-beige/70">
              {emailSent
                ? "También te lo enviamos a tu correo. Si no lo ves, revisa la carpeta de spam."
                : "Léela aquí mismo. (El correo de respaldo puede tardar unos minutos en llegar.)"}
            </p>
          </div>
          {children}
        </section>
      )}
    </div>
  );
}
