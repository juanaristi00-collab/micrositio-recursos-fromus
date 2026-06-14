import type { Source } from "./content";

interface EmailData {
  guideUrl: string;
  unsubscribeUrl: string;
}

interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Copy EXACTO de la sección 5 del paquete de entrega, maquetado sobre la
 * identidad Fromus (terminal dark-mode). El naranja se usa solo en el botón.
 */
const COPY: Record<
  Source,
  {
    subject: string;
    preheader: string;
    button: string;
    intro: string[];
    bulletsLead: string;
    bullets: string[];
    closing: string[];
  }
> = {
  rup: {
    subject: "Tu guía del RUP está lista 👇",
    preheader: "El documento más esencial para ganarle al Estado.",
    button: "ABRIR LA GUÍA DEL RUP",
    intro: [
      "Hola,",
      "Aquí está lo que pediste: la guía completa para construir tu RUP y empezar a licitar con el Estado.",
    ],
    bulletsLead: "Adentro vas a encontrar, sin vueltas:",
    bullets: [
      "Qué es el RUP y por qué es tu “hoja de vida” para licitar.",
      "Quién está obligado a tenerlo (y quién no).",
      "Los 5 indicadores financieros y organizacionales que te habilitan, con sus fórmulas.",
      "Cómo renovarlo a tiempo para no perderlo (ojo con la fecha de abril).",
    ],
    closing: [
      "En Fromus te decimos en un minuto si estás habilitado o no para una oportunidad — en vez de escarbar un PDF desorganizado, te ponemos esa información en la mano.",
      "Si tienes dudas, responde este correo. Lo leemos.",
    ],
  },
  licitar: {
    subject: "Tu paso a paso para licitar 👇",
    preheader: "El mercado más grande del país, explicado sin jerga.",
    button: "ABRIR LA GUÍA PARA LICITAR",
    intro: [
      "Hola,",
      "Aquí está tu paso a paso para presentarte a procesos con el Estado.",
    ],
    bulletsLead: "Adentro:",
    bullets: [
      "Cómo crear tu cuenta de proveedor en SECOP II.",
      "Las 5 modalidades de selección y cuándo aplica cada una.",
      "Qué son los requisitos habilitantes y cómo se subsanan.",
      "El error que descalifica ofertas y casi nadie revisa a tiempo.",
    ],
    closing: [
      "Recuerda: tu empresa no vive de sentencias, vive de contratos. Fromus encuentra los procesos, valida si cumples y te arma la propuesta económica.",
      "¿Dudas? Responde este correo.",
    ],
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildDeliveryEmail(
  source: Source,
  data: EmailData,
): BuiltEmail {
  const c = COPY[source];

  const bulletsHtml = c.bullets
    .map(
      (b) =>
        `<tr><td style="padding:4px 0;color:#E8E0D0;font-size:15px;line-height:1.6;"><span style="color:#E8672E;">•</span>&nbsp; ${escapeHtml(
          b,
        )}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(c.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
    c.preheader,
  )}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0F0F0F;border:1px solid #1A1A1A;border-radius:12px;overflow:hidden;">
  <tr><td style="padding:28px 32px 8px 32px;">
    <span style="font-family:'Courier New',monospace;font-size:13px;color:#E8672E;letter-spacing:1px;">fromus.tech</span>
  </td></tr>
  <tr><td style="padding:8px 32px 0 32px;">
    ${c.intro
      .map(
        (p) =>
          `<p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#E8E0D0;">${escapeHtml(
            p,
          )}</p>`,
      )
      .join("")}
  </td></tr>
  <tr><td align="center" style="padding:20px 32px 24px 32px;">
    <a href="${data.guideUrl}" style="display:inline-block;background-color:#E8672E;color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:8px;">${escapeHtml(
      c.button,
    )} →</a>
  </td></tr>
  <tr><td style="padding:0 32px;">
    <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#E8E0D0;">${escapeHtml(
      c.bulletsLead,
    )}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bulletsHtml}</table>
  </td></tr>
  <tr><td style="padding:20px 32px 0 32px;">
    ${c.closing
      .map(
        (p) =>
          `<p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#E8E0D0;">${escapeHtml(
            p,
          )}</p>`,
      )
      .join("")}
  </td></tr>
  <tr><td style="padding:8px 32px 28px 32px;">
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#E8E0D0;">— El equipo de Fromus<br /><a href="https://fromus.tech" style="color:#E8672E;text-decoration:none;">fromus.tech</a></p>
  </td></tr>
  <tr><td style="border-top:1px solid #1A1A1A;padding:18px 32px;">
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a8578;">¿No quieres más correos? <a href="${data.unsubscribeUrl}" style="color:#8a8578;text-decoration:underline;">Date de baja aquí</a>.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    ...c.intro,
    "",
    `→ ${c.button}: ${data.guideUrl}`,
    "",
    c.bulletsLead,
    ...c.bullets.map((b) => `• ${b}`),
    "",
    ...c.closing,
    "",
    "— El equipo de Fromus",
    "fromus.tech",
    "",
    `¿No quieres más correos? Date de baja aquí: ${data.unsubscribeUrl}`,
  ].join("\n");

  return { subject: c.subject, html, text };
}
