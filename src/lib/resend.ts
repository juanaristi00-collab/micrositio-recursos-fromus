import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Falta RESEND_API_KEY en las variables de entorno.");
  }
  cached = new Resend(key);
  return cached;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ ok: boolean; error?: string }> {
  const from = process.env.RESEND_FROM ?? "Fromus <recursos@fromus.tech>";
  try {
    const { error } = await getResend().emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Error desconocido al enviar.",
    };
  }
}
