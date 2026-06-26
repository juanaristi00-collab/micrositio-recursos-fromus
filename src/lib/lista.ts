/**
 * Datos de la lista de herramientas de IA, ordenadas por tarea en tres niveles
 * (EXCELENTE / BUENA / MALA). Una sola fuente de verdad para la página /lista.
 * El contenido (nombres, tags, links) es fijo: no inventar ni alterar.
 */

export type Tier = "EXCELENTE" | "BUENA" | "MALA";

export interface TierStyle {
  /** Color del tier (hex) — usado en barra, badge y acentos */
  color: string;
}

export const TIERS: Record<Tier, TierStyle> = {
  EXCELENTE: { color: "#10B981" },
  BUENA: { color: "#E8B23E" },
  MALA: { color: "#E5484D" },
};

export interface Tool {
  tier: Tier;
  /** Nombre de la herramienta */
  name: string;
  /** Tag corto que la describe */
  tag: string;
  /** Destino del card. null = sin link (no hay a dónde ir) */
  url: string | null;
  /** Logo local en /public/logos. null = sin imagen (se usa glyph/monograma) */
  logo: string | null;
  /** Iniciales para el monograma de respaldo si el logo no carga */
  initials: string;
  /** Terminal: en vez de logo, un glyph "> _" en mono verde */
  glyph?: boolean;
}

export interface Category {
  /** Índice mostrado en mono (01–05) */
  index: string;
  /** Título tipo "Para X" */
  title: string;
  /** Veredicto en cursiva */
  verdict: string;
  tools: Tool[];
}

export const CATEGORIES: Category[] = [
  {
    index: "01",
    title: "Para escribir",
    verdict: "Esta escribe mejor que vos.",
    tools: [
      {
        tier: "EXCELENTE",
        name: "Claude",
        tag: "La que mejor escribe",
        url: "https://claude.ai",
        logo: "/logos/claude.svg",
        initials: "CL",
      },
      {
        tier: "BUENA",
        name: "ChatGPT",
        tag: "Te saca del apuro",
        url: "https://chatgpt.com",
        logo: "/logos/openai.png",
        initials: "GP",
      },
      {
        tier: "MALA",
        name: "Grok",
        tag: "Floja pa' esto",
        url: "https://grok.com",
        logo: "/logos/grok.ico",
        initials: "GR",
      },
    ],
  },
  {
    index: "02",
    title: "Para investigar",
    verdict: "Te encuentra cualquier dato en segundos.",
    tools: [
      {
        tier: "EXCELENTE",
        name: "Perplexity",
        tag: "Datos en segundos",
        url: "https://www.perplexity.ai",
        logo: "/logos/perplexity.svg",
        initials: "PX",
      },
      {
        tier: "BUENA",
        name: "Gemini",
        tag: "Pasable",
        url: "https://gemini.google.com",
        logo: "/logos/gemini.svg",
        initials: "GE",
      },
      {
        tier: "MALA",
        name: "Wikipedia",
        tag: "Punto de partida",
        url: "https://www.wikipedia.org",
        logo: "/logos/wikipedia.svg",
        initials: "WK",
      },
    ],
  },
  {
    index: "03",
    title: "Para páginas y apps",
    verdict: "Te arma una app entera sola.",
    tools: [
      {
        tier: "EXCELENTE",
        name: "Lovable",
        tag: "Te arma la app sola",
        url: "https://lovable.dev",
        logo: "/logos/lovable.jpg",
        initials: "LO",
      },
      {
        tier: "BUENA",
        name: "Shopify",
        tag: "Pa' vender ya",
        url: "https://www.shopify.com",
        logo: "/logos/shopify.svg",
        initials: "SH",
      },
      {
        tier: "MALA",
        name: "WordPress",
        tag: "Se queda corta",
        url: "https://wordpress.org",
        logo: "/logos/wordpress.svg",
        initials: "WP",
      },
    ],
  },
  {
    index: "04",
    title: "Para crear contenido",
    verdict: "Te ayuda a viralizar.",
    tools: [
      {
        tier: "EXCELENTE",
        name: "Poppy AI",
        tag: "Pa' viralizar",
        url: "https://getpoppy.ai",
        logo: "/logos/poppy.png",
        initials: "PA",
      },
      {
        tier: "BUENA",
        name: "Claude",
        tag: "Decente",
        url: "https://claude.ai",
        logo: "/logos/claude.svg",
        initials: "CL",
      },
      {
        tier: "MALA",
        name: "Canva",
        tag: "Genérica",
        url: "https://www.canva.com",
        logo: "/logos/canva.ico",
        initials: "CA",
      },
    ],
  },
  {
    index: "05",
    title: "Para programar",
    verdict: "Programa mientras vos dormís.",
    tools: [
      {
        tier: "EXCELENTE",
        name: "Codex",
        tag: "Programa mientras dormís",
        url: "https://openai.com/codex",
        logo: "/logos/openai.png",
        initials: "CX",
      },
      {
        tier: "BUENA",
        name: "Claude Code",
        tag: "Buena de verdad",
        url: "https://www.claude.com/product/claude-code",
        logo: "/logos/claude.svg",
        initials: "CC",
      },
      {
        tier: "MALA",
        name: "Terminal",
        tag: "A puro pulso",
        url: null,
        logo: null,
        initials: "TE",
        glyph: true,
      },
    ],
  },
];

/** Total de herramientas listadas (para la línea de stats del hero) */
export const TOOL_COUNT = CATEGORIES.reduce(
  (acc, c) => acc + c.tools.length,
  0,
);
