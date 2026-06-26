import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <section className="container-tight py-16 sm:py-24">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ ls
          ./guias
        </span>
        <h1 className="mt-5 font-display text-3xl leading-tight text-beige sm:text-5xl">
          El mercado público no es para abogados.
          <br />
          <span className="text-orange">Es para tu empresa.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-beige/70 sm:text-lg">
          Dos guías gratuitas, sin jerga, para empezar a contratar con el Estado
          en Colombia. Construidas sobre el marco legal vigente y los datos
          públicos de SECOP.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/rup"
            className="card group hover:border-orange"
          >
            <span className="font-mono text-xs text-beige/40">guia/rup</span>
            <h2 className="mt-2 font-display text-xl text-beige">
              La guía del RUP
            </h2>
            <p className="mt-2 text-sm text-beige/65">
              El documento más esencial para ganarle al Estado: qué es, los 5
              indicadores que te habilitan y cómo no perderlo.
            </p>
            <span className="mt-4 inline-block text-sm text-orange group-hover:underline">
              Abrir la guía →
            </span>
          </Link>

          <Link
            href="/licitar"
            className="card group hover:border-orange"
          >
            <span className="font-mono text-xs text-beige/40">
              guia/licitar
            </span>
            <h2 className="mt-2 font-display text-xl text-beige">
              Paso a paso para licitar
            </h2>
            <p className="mt-2 text-sm text-beige/65">
              El mercado más grande del país, explicado sin jerga: SECOP II,
              modalidades y el error que descalifica ofertas.
            </p>
            <span className="mt-4 inline-block text-sm text-orange group-hover:underline">
              Abrir la guía →
            </span>
          </Link>
        </div>

        <Link
          href="/lista"
          className="card group mt-4 flex items-center justify-between gap-4 hover:border-orange"
        >
          <div>
            <span className="font-mono text-xs text-beige/40">lista/ia</span>
            <h2 className="mt-2 font-display text-xl text-beige">Lista IA</h2>
            <p className="mt-2 text-sm text-beige/65">
              Las herramientas de IA que sí usamos, por tarea y en tres niveles:
              la que vuela, la que sirve y la que mejor dejás quieta.
            </p>
          </div>
          <span className="shrink-0 text-sm text-orange group-hover:underline">
            Ver la lista →
          </span>
        </Link>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["5", "indicadores RUP"],
            ["5", "modalidades"],
            ["10%", "garantía mínima"],
            ["1581/2012", "Habeas Data"],
          ].map(([n, label]) => (
            <div key={label} className="card text-center">
              <div className="num text-2xl font-bold text-orange">{n}</div>
              <div className="mt-1 text-xs text-beige/50">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
