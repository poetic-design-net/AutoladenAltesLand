import 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function clean(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.slice(0, max).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]).trim();
}
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Anfrage konnte nicht gelesen werden" }, 400);
  }
  const reach = clean(body.reach, 120);
  const channel = clean(body.channel, 20);
  clean(body.message, 2e3);
  const looksLikeMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(reach);
  const looksLikePhone = reach.replace(/\D/g, "").length >= 6;
  if (!reach || (channel === "mail" ? !looksLikeMail : !looksLikePhone)) {
    return json({ error: "Bitte eine erreichbare Nummer oder E-Mail-Adresse angeben" }, 400);
  }
  {
    console.error("CONTACT_TO ist nicht gesetzt – Anfrage kann nicht zugestellt werden.");
    return json({ error: "Der Mailversand ist noch nicht eingerichtet" }, 503);
  }
};
function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
