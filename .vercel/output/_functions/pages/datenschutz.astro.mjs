import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Eq_p7M-R.mjs';
import 'kleur/colors';
import { $ as $$Base, b as brand } from '../chunks/site_NKK7khPo.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$Datenschutz = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `Datenschutz \u2013 ${brand.name}`, "description": "Datenschutzerkl\xE4rung", "theme": "light", "data-astro-cid-7i3oie76": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="legal" data-astro-cid-7i3oie76> <a class="back" href="/" data-astro-cid-7i3oie76>← Zurück</a> <h1 data-astro-cid-7i3oie76>Datenschutz</h1> <p class="hint" data-astro-cid-7i3oie76>
Diese Seite ist noch ein Gerüst. Die Datenschutzerklärung muss vor dem Livegang ergänzt werden –
      am besten juristisch geprüft.
</p> <h2 data-astro-cid-7i3oie76>Was die Seite verarbeitet</h2> <ul data-astro-cid-7i3oie76> <li data-astro-cid-7i3oie76>Beim Absenden einer Anfrage: die Angaben aus dem Formular (Name, Kontaktweg, Nummer bzw. Adresse, Nachricht). Sie werden per E-Mail an <span class="ph" data-astro-cid-7i3oie76>[Empfänger]</span> zugestellt und dort gespeichert.</li> <li data-astro-cid-7i3oie76>Versanddienstleister: Resend (Auftragsverarbeitung). <span class="ph" data-astro-cid-7i3oie76>[AV-Vertrag ergänzen]</span></li> <li data-astro-cid-7i3oie76>Schriften werden von Google Fonts geladen. <span class="ph" data-astro-cid-7i3oie76>[Alternativ lokal einbinden]</span></li> <li data-astro-cid-7i3oie76>Hosting: Vercel. <span class="ph" data-astro-cid-7i3oie76>[Serverstandort und AV-Vertrag ergänzen]</span></li> </ul> <h2 data-astro-cid-7i3oie76>Deine Rechte</h2> <p data-astro-cid-7i3oie76>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit. Kontakt: <span class="ph" data-astro-cid-7i3oie76>[Adresse]</span></p> </main> ` })} `;
}, "/Users/frederikkarschuk/Projects/AutoladenAltesLand/src/pages/datenschutz.astro", void 0);

const $$file = "/Users/frederikkarschuk/Projects/AutoladenAltesLand/src/pages/datenschutz.astro";
const $$url = "/datenschutz";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Datenschutz,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
