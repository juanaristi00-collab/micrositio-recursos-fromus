import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="container-tight flex flex-col gap-4 py-8 text-sm text-beige/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-display text-beige">Fromus</span>
          <span className="mx-2 text-edge">·</span>
          <span className="font-mono text-xs">fromus.tech</span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/rup" className="hover:text-orange">
            RUP
          </Link>
          <Link href="/licitar" className="hover:text-orange">
            Licitar
          </Link>
          <Link href="/lista" className="hover:text-orange">
            Lista IA
          </Link>
          <Link href="/privacidad" className="hover:text-orange">
            Privacidad
          </Link>
        </nav>
      </div>
      <div className="container-tight pb-8 text-xs text-beige/30">
        Fromus S.A.S. · Tratamiento de datos conforme a la Ley{" "}
        <span className="num">1581</span> de <span className="num">2012</span>{" "}
        (Habeas Data).
      </div>
    </footer>
  );
}
