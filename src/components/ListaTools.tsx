"use client";

import { useState } from "react";
import {
  CATEGORIES,
  TIERS,
  TOOL_COUNT,
  type Category,
  type Tool,
  type Tier,
} from "@/lib/lista";
import { ListaSignup } from "@/components/ListaSignup";

const TIER_ORDER: Tier[] = ["EXCELENTE", "BUENA", "MALA"];

/**
 * Página /lista — herramientas de IA por tarea en tres niveles.
 * Destino de un reel: identidad Fromus, reusa tokens y fuentes del sitio.
 * El CTA y la captura de correo viven en <ListaSignup />.
 */
export function ListaTools() {
  return (
    <section className="container-tight py-14 sm:py-20">
      <Hero />

      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
        {CATEGORIES.map((cat, i) => (
          <CategoryBlock key={cat.index} category={cat} order={i} />
        ))}
      </div>

      <ListaSignup />
    </section>
  );
}

function Hero() {
  return (
    <header className="motion-safe:animate-fade-in-up">
      <span className="font-mono text-xs text-orange">
        <span className="text-beige/40">fromus@recursos</span>:~$ cat lista-ia
      </span>

      <h1 className="mt-5 font-display text-3xl leading-tight text-beige sm:text-5xl">
        Las herramientas de IA que{" "}
        <span className="text-orange">de verdad usamos.</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-beige/70 sm:text-lg">
        Ordenadas por tarea, sin ranking inflado: para cada cosa, la que vuela,
        la que sirve y la que mejor dejás quieta.
      </p>

      {/* Leyenda de niveles — el color codifica, no decora */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
        {TIER_ORDER.map((tier) => (
          <span key={tier} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: TIERS[tier].color }}
            />
            <span style={{ color: TIERS[tier].color }}>{tier}</span>
          </span>
        ))}
      </div>

      <p className="num mt-5 text-xs tracking-wider text-beige/40">
        {TOOL_COUNT} HERRAMIENTAS · {CATEGORIES.length} CATEGORÍAS · 1 LISTA
      </p>
    </header>
  );
}

function CategoryBlock({
  category,
  order,
}: {
  category: Category;
  order: number;
}) {
  return (
    <section
      className="motion-safe:animate-fade-in-up"
      style={{ animationDelay: `${0.05 + order * 0.06}s` }}
    >
      <div className="flex items-baseline gap-3">
        <span className="num text-sm text-beige/40">{category.index}</span>
        <h2 className="font-display text-2xl text-beige sm:text-3xl">
          <span className="mr-1.5 text-orange">&gt;</span>
          {category.title}
        </h2>
      </div>
      <p className="mt-2 pl-9 font-hand text-xl text-beige/60">
        {category.verdict}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {category.tools.map((tool) => (
          <ToolCard key={`${category.index}-${tool.name}`} tool={tool} />
        ))}
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const color = TIERS[tool.tier].color;
  const isLink = tool.url !== null;

  const inner = (
    <>
      {/* Barra superior del color del tier */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 rounded-t-lg"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between">
        <span
          className="num rounded px-2 py-0.5 text-[11px] font-semibold tracking-wide"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          {tool.tier}
        </span>
        <ToolLogo tool={tool} color={color} />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-lg text-beige">{tool.name}</h3>
        <p className="mt-1 text-sm text-beige/55">{tool.tag}</p>
      </div>

      {isLink ? (
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-orange">
          Visitá <span aria-hidden>↗</span>
        </span>
      ) : (
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-beige/30">
          Sin enlace
        </span>
      )}
    </>
  );

  // La "MALA" Terminal no lleva link: card apagado, sin enlace.
  if (!isLink) {
    return (
      <div className="card group relative overflow-hidden opacity-60">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={tool.url!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tool.name} — ${tool.tier}: ${tool.tag} (abre en una pestaña nueva)`}
      className="card group relative overflow-hidden outline-none transition-all
        duration-150 hover:border-orange focus-visible:ring-2 focus-visible:ring-orange
        focus-visible:ring-offset-2 focus-visible:ring-offset-black
        motion-safe:hover:-translate-y-1"
    >
      {inner}
    </a>
  );
}

function ToolLogo({ tool, color }: { tool: Tool; color: string }) {
  const [failed, setFailed] = useState(false);

  // Terminal: glyph "> _" en mono verde, sin imagen.
  if (tool.glyph) {
    return (
      <span
        aria-hidden
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-edge bg-black font-mono text-sm font-bold"
        style={{ color: TIERS.EXCELENTE.color }}
      >
        &gt;_
      </span>
    );
  }

  // Casilla clara estilo ícono de app.
  return (
    <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#F4F1E8]">
      {tool.logo && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.logo}
          alt=""
          aria-hidden
          width={28}
          height={28}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-7 w-7 object-contain"
        />
      ) : (
        <span
          aria-hidden
          className="font-mono text-sm font-bold"
          style={{ color }}
        >
          {tool.initials}
        </span>
      )}
    </span>
  );
}
