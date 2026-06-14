"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { GuideConfig } from "@/lib/content";
import { LeadForm, unlockKey } from "@/components/LeadForm";

interface GuideGateProps {
  guide: GuideConfig;
}

/**
 * Muro de correo para /<slug>/guia cuando NO llega token válido. La guía no se
 * renderiza aquí: si la persona ya convirtió en este navegador, redirigimos a
 * la ruta con token; si no, mostramos el formulario y, al enviarlo, redirigimos
 * a la guía desbloqueada. El contenido nunca se entrega sin correo.
 */
export function GuideGate({ guide }: GuideGateProps) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

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
    router.replace(unlockPath);
  }

  if (redirecting) {
    return (
      <div className="card border-emerald/40 bg-emerald/5 p-6 text-center">
        <p className="font-display text-lg text-emerald">
          ✓ Listo, abriendo tu guía…
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <p className="text-base leading-relaxed text-beige/70">
        {guide.heroSubtitle}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {guide.bullets.map((b, i) => (
          <li key={i} className="card flex gap-3">
            <span className="num mt-0.5 shrink-0 text-orange">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-beige/85">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <LeadForm
          guide={guide}
          onSuccess={handleSuccess}
          title="Desbloquea la guía completa"
          subtitle="Déjanos tu correo y la lees aquí mismo, al instante. Sin esperar ningún correo."
        />
      </div>
    </div>
  );
}
