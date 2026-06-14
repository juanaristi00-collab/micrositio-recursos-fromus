import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <section className="container-tight flex flex-col items-center py-24 text-center">
        <span className="num text-5xl font-bold text-orange">404</span>
        <h1 className="mt-4 font-display text-2xl text-beige">
          Esta página no existe.
        </h1>
        <p className="mt-3 text-beige/60">
          Pero estas dos guías sí, y son gratis:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/rup" className="btn-ghost">
            La guía del RUP
          </Link>
          <Link href="/licitar" className="btn-ghost">
            Paso a paso para licitar
          </Link>
        </div>
      </section>
    </>
  );
}
