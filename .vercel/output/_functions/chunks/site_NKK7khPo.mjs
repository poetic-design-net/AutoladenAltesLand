import { e as createAstro, f as createComponent, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './astro/server_Eq_p7M-R.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                       */

const $$Astro = createAstro("https://autoladen-altes-land.vercel.app");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    title,
    description,
    theme = "light",
    fonts = "family=Instrument+Sans:wght@400;500;600;700"
  } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, Astro2.site ?? Astro2.url.origin).href;
  const themeColor = theme === "dark" ? "#0d1013" : "#f5f4f1";
  return renderTemplate`<html lang="de"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="icon" href="/favicon.svg" type="image/svg+xml"><meta name="theme-color"${addAttribute(themeColor, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL("/logo.png", Astro2.url.origin).href, "content")}><meta property="og:locale" content="de_DE"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet"${addAttribute(`https://fonts.googleapis.com/css2?${fonts}&display=swap`, "href")}>${renderHead()}</head> <body${addAttribute(theme, "data-theme")}> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/frederikkarschuk/Projects/AutoladenAltesLand/src/layouts/Base.astro", void 0);

const brand = {
  name: "Autoladen Altes Land",
  claim: "Nutzfahrzeuge · Dienstwagen · Leasing",
  person: "Alex",
  region: "Altes Land"
};
const vehicles = [
  {
    id: "e-transporter",
    name: "Kompakter E-Transporter",
    short: "E-Transporter",
    kicker: "Nutzfahrzeug",
    topic: "transporter",
    status: "Kontingent verfügbar",
    tone: "green",
    image: "/veh1.jpg",
    alt: "Kompakter elektrischer Transporter",
    features: ["Vollelektrisch", "Für Handwerk & Lieferdienst", "Gewerbliches Leasing möglich"],
    price: {
      old: "489 €",
      rate: "379 €",
      save: "−110 € mtl.",
      terms: "36 Monate · 10.000 km/Jahr · ohne Anzahlung"
    }
  },
  {
    id: "e-limousine",
    name: "Elektrische Limousine",
    short: "Limousine",
    kicker: "Dienstwagen",
    topic: "firma",
    status: "Kurzfristig möglich",
    tone: "blue",
    image: "/veh2.jpg",
    alt: "Elektrische Limousine",
    features: ["Vollelektrisch", "Als Dienstwagen geeignet", "Privat & gewerblich"],
    price: {
      old: "529 €",
      rate: "419 €",
      save: "−110 € mtl.",
      terms: "36 Monate · 10.000 km/Jahr · ohne Anzahlung"
    }
  },
  {
    id: "kompakt-stromer",
    name: "Kompakter Stromer",
    short: "Kompakt",
    kicker: "Alltag & Familie",
    topic: "privat",
    status: "Auf Anfrage",
    tone: "grey",
    image: "/veh3.jpg",
    alt: "Kompaktes Elektrofahrzeug",
    features: ["Vollelektrisch", "Viel Platz für den Alltag", "Privat & gewerblich"],
    price: {
      old: "349 €",
      rate: "269 €",
      save: "−80 € mtl.",
      terms: "36 Monate · 10.000 km/Jahr · ohne Anzahlung"
    }
  }
];
const priceNote = "Beispielraten, netto für Gewerbe · 36 Monate · 10.000 km/Jahr · ohne Anzahlung. Streichrate ist die reguläre Rate.";
const topics = [
  { id: "firma", label: "Firmenwagen" },
  { id: "transporter", label: "Transporter" },
  { id: "privat", label: "Privat" },
  { id: "offen", label: "Noch offen" }
];

export { $$Base as $, brand as b, priceNote as p, topics as t, vehicles as v };
