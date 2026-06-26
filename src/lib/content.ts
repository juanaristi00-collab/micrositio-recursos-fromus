/**
 * Configuración de los dos materiales/guías. Centraliza copy y metadatos
 * para que landings, páginas de guía y correos compartan una sola fuente.
 */
export type Source = "rup" | "licitar";

export interface GuideConfig {
  source: Source;
  /** Slug de la landing: /rup, /licitar */
  slug: string;
  /** Etiqueta de terminal mostrada en el hero */
  tag: string;
  /** Titular del hero (Dela Gothic One) */
  heroTitle: string;
  /** Subtítulo del hero */
  heroSubtitle: string;
  /** Bloque "qué te llevas" */
  bullets: string[];
  /** Línea de credibilidad anclada a datos públicos de SECOP */
  credibility: string;
  /** Asunto del correo de entrega */
  emailSubject: string;
  /** Preheader del correo */
  emailPreheader: string;
  /** Texto del botón del correo */
  emailButton: string;
  /** Título de la página de guía completa */
  guideTitle: string;
}

export const GUIDES: Record<Source, GuideConfig> = {
  rup: {
    source: "rup",
    slug: "rup",
    tag: "guia/rup",
    heroTitle: "El documento más esencial para ganarle al Estado.",
    heroSubtitle:
      "El RUP es tu hoja de vida para licitar. Aquí está la guía completa para construirlo, entender sus 5 indicadores y no perderlo por una fecha.",
    bullets: [
      "Qué es el RUP y por qué es tu “hoja de vida” para licitar con el Estado.",
      "Quién está obligado a tenerlo (y quién no).",
      "Los 5 indicadores financieros y organizacionales que te habilitan, con sus fórmulas exactas.",
      "El paso a paso de inscripción y los documentos que necesitas.",
      "Cómo renovarlo a tiempo para no perderlo (ojo con la fecha de abril).",
      "Los errores que más rechazan inscripciones — y cómo evitarlos.",
    ],
    credibility:
      "Construido sobre el marco legal vigente (Ley 1150/2007, Decreto 1082/2015) y verificado contra Colombia Compra Eficiente, Confecámaras y los datos públicos de SECOP.",
    emailSubject: "Tu guía del RUP está lista 👇",
    emailPreheader: "El documento más esencial para ganarle al Estado.",
    emailButton: "ABRIR LA GUÍA DEL RUP",
    guideTitle: "Guía completa del RUP",
  },
  licitar: {
    source: "licitar",
    slug: "licitar",
    tag: "guia/licitar",
    heroTitle: "El mercado más grande del país, explicado sin jerga.",
    heroSubtitle:
      "Tu paso a paso para presentarte a procesos con el Estado en SECOP II: modalidades, requisitos habilitantes y el error que descalifica ofertas.",
    bullets: [
      "Cómo crear tu cuenta de proveedor en SECOP II, paso a paso.",
      "Las 5 modalidades de selección y cuándo aplica cada una.",
      "Qué son los requisitos habilitantes y cómo se subsanan.",
      "Cómo armar y presentar la oferta sin que te la rechacen.",
      "El cronograma típico de una licitación, etapa por etapa.",
      "El error que descalifica ofertas y casi nadie revisa a tiempo.",
    ],
    credibility:
      "Anclado a la Ley 80/1993, la Ley 1150/2007 y los conceptos vigentes de la ANCP-CCE, sobre el flujo real de SECOP II y los datos públicos de contratación.",
    emailSubject: "Tu paso a paso para licitar 👇",
    emailPreheader: "El mercado más grande del país, explicado sin jerga.",
    emailButton: "ABRIR LA GUÍA PARA LICITAR",
    guideTitle: "Paso a paso para licitar con el Estado",
  },
};

export function isSource(value: unknown): value is Source {
  return value === "rup" || value === "licitar";
}

/**
 * Orígenes válidos para un lead. Además de las guías (rup/licitar) existe
 * "lista": la página /lista captura el correo igual que las guías, pero no
 * desbloquea contenido (no hay guía detrás). Se mantiene separado de `Source`
 * para no exigir una entrada en `GUIDES` que no aplica.
 */
export type LeadSource = Source | "lista";

export function isLeadSource(value: unknown): value is LeadSource {
  return isSource(value) || value === "lista";
}
