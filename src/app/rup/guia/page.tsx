import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { RupGuide } from "@/components/RupGuide";
import { GUIDES } from "@/lib/content";

export const metadata: Metadata = {
  title: GUIDES.rup.guideTitle,
  description:
    "Guía completa del RUP en Colombia: definición, obligados, los 5 indicadores con fórmulas, inscripción, renovación, tarifas 2026 y errores comunes.",
};

export default function RupGuidePage() {
  return (
    <>
      <SiteHeader />
      <div className="container-prose py-12">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ cat{" "}
          {GUIDES.rup.tag}
        </span>
        <h1 className="mt-4 font-display text-3xl leading-tight text-beige sm:text-4xl">
          {GUIDES.rup.guideTitle}
        </h1>
        <div className="mt-10">
          <RupGuide />
        </div>
        <div className="mt-14 rounded-lg border border-orange/30 bg-surface-raised p-6">
          <p className="font-display text-lg text-beige">
            ¿Quieres saltarte el PDF desorganizado?
          </p>
          <p className="mt-2 text-sm text-beige/70">
            En Fromus te decimos en un minuto si estás habilitado o no para una
            oportunidad, y te armamos la propuesta. Conócenos.
          </p>
          <a
            href="https://fromus.tech"
            className="btn-orange mt-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a fromus.tech →
          </a>
        </div>
        <p className="mt-8 text-sm">
          <Link href="/licitar" className="text-orange hover:underline">
            → Ver también: paso a paso para licitar
          </Link>
        </p>
      </div>
    </>
  );
}
