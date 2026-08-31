import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Eq_p7M-R.mjs';
import 'kleur/colors';
import { $ as $$Base, b as brand } from '../chunks/site_NKK7khPo.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Impressum = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `Impressum \u2013 ${brand.name}`, "description": "Impressum", "theme": "light", "data-astro-cid-7dpr4qcz": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="legal" data-astro-cid-7dpr4qcz> <a class="back" href="/" data-astro-cid-7dpr4qcz>← Zurück</a> <h1 data-astro-cid-7dpr4qcz>Impressum</h1> <p class="hint" data-astro-cid-7dpr4qcz>
Die folgenden Angaben fehlen noch. Ohne vollständiges Impressum darf die Seite nicht online gehen
      (§ 5 DDG).
</p> <dl data-astro-cid-7dpr4qcz> <dt data-astro-cid-7dpr4qcz>Anbieter</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[Firmierung / Inhaber]</span></dd> <dt data-astro-cid-7dpr4qcz>Anschrift</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[Straße, PLZ, Ort]</span></dd> <dt data-astro-cid-7dpr4qcz>Telefon</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[Nummer]</span></dd> <dt data-astro-cid-7dpr4qcz>E-Mail</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[Adresse]</span></dd> <dt data-astro-cid-7dpr4qcz>Umsatzsteuer-ID</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[falls vorhanden]</span></dd> <dt data-astro-cid-7dpr4qcz>Verantwortlich für den Inhalt</dt><dd data-astro-cid-7dpr4qcz><span class="ph" data-astro-cid-7dpr4qcz>[Name, Anschrift]</span></dd> </dl> </main> ` })} `;
}, "/Users/frederikkarschuk/Projects/AutoladenAltesLand/src/pages/impressum.astro", void 0);

const $$file = "/Users/frederikkarschuk/Projects/AutoladenAltesLand/src/pages/impressum.astro";
const $$url = "/impressum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Impressum,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
