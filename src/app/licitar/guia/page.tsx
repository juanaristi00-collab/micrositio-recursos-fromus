import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { GuideGate } from "@/components/GuideGate";
import { LicitarGuide } from "@/components/LicitarGuide";
import { GUIDES } from "@/lib/content";
import { verifyUnlockToken } from "@/lib/tokens";

export const metadata: Metadata = {
  title: GUIDES.licitar.guideTitle,
  description:
    "Paso a paso para licitar con el Estado: registro en SECOP II, las 5 modalidades y cuantías, requisitos habilitantes, subsanabilidad, cronograma y errores.",
};

export default function LicitarGuidePage({
  searchParams,
}: {
  searchParams: { e?: string; t?: string };
}) {
  const email = (searchParams.e ?? "").trim().toLowerCase();
  const token = searchParams.t ?? "";
  const unlockedByToken =
    !!email && !!token && verifyUnlockToken(email, "licitar", token);

  return (
    <>
      <SiteHeader />
      <div className="container-prose py-12">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ cat{" "}
          {GUIDES.licitar.tag}
        </span>
        <h1 className="mt-4 font-display text-3xl leading-tight text-beige sm:text-4xl">
          {GUIDES.licitar.guideTitle}
        </h1>

        <div className="mt-10">
          {unlockedByToken ? (
            <>
              <LicitarGuide />
              <div className="mt-14 rounded-lg border border-orange/30 bg-surface-raised p-6">
                <p className="font-display text-lg text-beige">
                  Tu empresa no vive de sentencias, vive de contratos.
                </p>
                <p className="mt-2 text-sm text-beige/70">
                  Fromus encuentra los procesos, valida si cumples y te arma la
                  propuesta económica. Conócenos.
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
                <Link href="/rup" className="text-orange hover:underline">
                  → Ver también: la guía del RUP
                </Link>
              </p>
            </>
          ) : (
            <GuideGate guide={GUIDES.licitar} />
          )}
        </div>
      </div>
    </>
  );
}
