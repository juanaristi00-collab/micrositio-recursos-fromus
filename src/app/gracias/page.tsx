import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Gracias",
  description: "Tu guía está en camino.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <>
      <SiteHeader />
      <section className="container-tight flex flex-col items-center py-24 text-center">
        <span className="font-display text-2xl text-emerald">✓ Listo</span>
        <h1 className="mt-4 font-display text-3xl text-beige sm:text-4xl">
          Tu guía está en camino.
        </h1>
        <p className="mt-4 max-w-md text-beige/70">
          Revisa tu correo (incluida la carpeta de spam). Mientras tanto, puedes
          leer las guías directamente aquí.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/rup/guia" className="btn-ghost">
            Guía del RUP
          </Link>
          <Link href="/licitar/guia" className="btn-ghost">
            Guía para licitar
          </Link>
        </div>
      </section>
    </>
  );
}
