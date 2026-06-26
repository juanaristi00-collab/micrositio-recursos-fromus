import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-edge bg-base/80 backdrop-blur">
      <div className="container-tight flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-lg text-beige">Fromus</span>
          <span className="font-mono text-xs text-orange opacity-0 transition-opacity group-hover:opacity-100">
            /recursos
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/rup" className="text-beige/70 hover:text-orange">
            RUP
          </Link>
          <Link href="/licitar" className="text-beige/70 hover:text-orange">
            Licitar
          </Link>
          <Link href="/lista" className="text-beige/70 hover:text-orange">
            Lista IA
          </Link>
        </nav>
      </div>
    </header>
  );
}
