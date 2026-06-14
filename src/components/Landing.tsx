"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { GuideConfig } from "@/lib/content";
import { LeadForm, unlockKey } from "@/components/LeadForm";

interface LandingProps {
  guide: GuideConfig;
}

/**
 * Landing con muro de correo. La guía NO vive en esta página (ni en su HTML):
 * al capturar el correo, redirigimos a /<slug>/guia con token firmado, donde
 * el servidor verifica y renderiza la guía. Así el contenido nunca se entrega
 * sin dejar el correo.
 */
export function Landing({ guide }: LandingProps) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Si este navegador ya convirtió antes, lo llevamos directo a la guía.
  useEffect(() => {
    try {
      const path = localStorage.getItem(unlockKey(guide.source));
      if (path && path.startsWith(`/${guide.slug}/guia`)) {
        setRedirecting(true);
        router.replace(path);
      }
    } catch {
      /* sin localStorage: se muestra el muro normalmente */
    }
  }, [guide.source, guide.slug, router]);

  function handleSuccess(unlockPath: string) {
    setRedirecting(true);
    router.push(unlockPath);
  }

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
            <li key={i} className="card flex gap-3 hover:border-orange/60">
              <span className="num mt-0.5 shrink-0 text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-beige/85">{b}</span>
            </li>
          ))}
        </ul>

        {/* CREDIBILIDAD */}
        <p className="mt-6 border-l-2 border-emerald/60 bg-surface-raised py-3 pl-4 pr-3 text-sm text-beige/70">
          {guide.credibility}
        </p>
      </section>

      {/* FORMULARIO DE CAPTURA */}
      <section className="container-tight pb-16" id="recibir">
        {redirecting ? (
          <div className="card border-emerald/40 bg-emerald/5 p-6 text-center">
            <p className="font-display text-lg text-emerald">
              ✓ Listo, abriendo tu guía…
            </p>
          </div>
        ) : (
          <LeadForm guide={guide} onSuccess={handleSuccess} />
        )}
      </section>
    </div>
  );
}
