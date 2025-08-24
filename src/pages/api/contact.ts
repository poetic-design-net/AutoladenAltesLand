import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const phone = data.get('phone')?.toString() || 'Nicht angegeben';
    const subject = data.get('subject')?.toString();
    const message = data.get('message')?.toString();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Bitte alle Pflichtfelder ausfüllen' }),
        { status: 400 }
      );
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'Kontaktformular <onboarding@resend.dev>', // You'll need to verify your domain
      to: 'alex@autoladen-altesland.de',
      subject: `Neue Anfrage: ${subject}`,
      html: `
        <h2>Neue Kontaktanfrage über die Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <h3>Nachricht:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: email,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return new Response(
        JSON.stringify({ error: 'Fehler beim Senden der E-Mail' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'E-Mail erfolgreich gesendet' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Serverfehler beim Senden der E-Mail' }),
      { status: 500 }
    );
  }
};