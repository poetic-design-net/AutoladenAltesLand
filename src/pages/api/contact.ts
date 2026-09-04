import { getSiteSettings } from '../../lib/content';
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { campaignRecord, trackingId } from '../../lib/tracking';

export const prerender = false;

/** Empfängeradresse – über die Umgebung setzbar, damit sie nicht im Code steht. */
const FROM = import.meta.env.CONTACT_FROM ?? 'Website <onboarding@resend.dev>';

const LABELS: Record<string, string> = {
  privat: 'Privatkunde',
  firma: 'Unternehmen',
  transporter: 'Transporter',
  offen: 'Noch offen',
  tel: 'Anruf',
  wa: 'WhatsApp',
  mail: 'E-Mail',
};

/** Kürzt und entschärft Freitext, bevor er in eine HTML-Mail geht. */
function clean(value: unknown, max = 500): string {
  if (typeof value !== 'string') return '';
  return value
    .slice(0, max)
    .replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string)
    .trim();
}

function row(label: string, value: string): string {
  return value ? `<p><strong>${label}:</strong> ${value}</p>` : '';
}

export const POST: APIRoute = async ({ request }) => {
  const TO = import.meta.env.CONTACT_TO ?? (await getSiteSettings()).email;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Anfrage konnte nicht gelesen werden' }, 400);
  }

  const reach = clean(body.reach, 120);
  const channel = clean(body.channel, 20);
  const message = clean(body.message, 2000);

  // Ohne Rückkanal ist die Anfrage wertlos – hier wird geprüft, nicht im Browser.
  const looksLikeMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(reach);
  const looksLikePhone = reach.replace(/\D/g, '').length >= 6;
  if (!reach || (channel === 'mail' ? !looksLikeMail : !looksLikePhone)) {
    return json({ error: 'Bitte eine erreichbare Nummer oder E-Mail-Adresse angeben' }, 400);
  }

  if (!TO) {
    console.error('CONTACT_TO ist nicht gesetzt – Anfrage kann nicht zugestellt werden.');
    return json({ error: 'Der Mailversand ist noch nicht eingerichtet' }, 503);
  }
  if (!import.meta.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY fehlt.');
    return json({ error: 'Der Mailversand ist noch nicht eingerichtet' }, 503);
  }

  const name = clean(body.name, 120);
  const vehicle = clean(body.vehicle, 160);
  const need = clean(body.need, 300);
  const kind = clean(body.kind, 20);
  const topic = clean(body.topic, 20);
  const budget = clean(body.budget, 120);
  const timing = clean(body.timing, 120);
  const source = trackingId(body.source, 'direct');
  const attribution =
    body.attribution && typeof body.attribution === 'object'
      ? (body.attribution as Record<string, unknown>)
      : {};
  const campaign = campaignRecord(attribution.campaign);

  const subject = vehicle
    ? `Anfrage: ${vehicle}`
    : `Anfrage${name ? ` von ${name}` : ''}${topic ? ` – ${LABELS[topic] ?? topic}` : ''}`;

  const html = [
    '<h2>Neue Anfrage über die Website</h2>',
    row('Name', name),
    row('Kunde', LABELS[kind] ?? kind),
    row('Thema', LABELS[topic] ?? topic),
    row('Fahrzeug', vehicle),
    row('Bedarf', need),
    row('Budget', budget),
    row('Zeitraum', timing),
    row('Rückmeldung per', LABELS[channel] ?? channel),
    row('Erreichbar unter', reach),
    message ? `<h3>Nachricht</h3><p>${message.replace(/\n/g, '<br>')}</p>` : '',
    `<hr><p style="color:#888;font-size:12px">Quelle: ${source || 'unbekannt'}</p>`,
    ...Object.entries(campaign).map(([key, value]) => row(key, clean(value, 100))),
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      ...(looksLikeMail ? { replyTo: reach } : {}),
    });

    if (result.error) {
      console.error('Resend:', result.error);
      return json({ error: 'Die Anfrage konnte gerade nicht gesendet werden' }, 502);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    console.error('Mailversand fehlgeschlagen:', error);
    return json({ error: 'Die Anfrage konnte gerade nicht gesendet werden' }, 500);
  }
};

function json(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
