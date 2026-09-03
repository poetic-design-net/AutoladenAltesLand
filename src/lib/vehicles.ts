/**
 * Fahrzeuge aus Sanity. Fällt auf die statischen Beispiel-Fahrzeuge in
 * src/data/site.ts zurück, solange in Sanity nichts gepflegt ist oder die
 * Anfrage fehlschlägt – die Seite bleibt damit immer lauffähig.
 */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { vehicles as fallback, type Vehicle } from '../data/site';

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'dgeh1xh8',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  // ponytail: kein CDN, damit Änderungen im Studio sofort sichtbar sind; bei viel Traffic auf true + Revalidierung wechseln
  useCdn: false,
});
const img = imageUrlBuilder(client);

export type VehicleDetail = Vehicle & { description: string };

const QUERY = `{
  "limit": coalesce(*[_id == "siteSettings"][0].featuredVehicleCount, 3),
  "items": *[_type == "fahrzeug" && verfuegbar == true && defined(slug.current) && defined(name)] | order(sortierung asc, _createdAt asc) {
    "id": slug.current, name, kicker, topic, status, tone,
    image, "alt": image.alt, gallery, features, beschreibung,
    price, priceOld, priceTerms
  }
}`;

const url = (i: any) => img.image(i).width(1200).height(800).fit('crop').auto('format').url();

function map(d: any): VehicleDetail {
  return {
    id: d.id,
    name: d.name,
    kicker: d.kicker ?? '',
    topic: d.topic ?? 'firma',
    status: d.status ?? '',
    tone: d.tone ?? 'green',
    image: d.image ? url(d.image) : '',
    images: (d.gallery ?? []).filter((g: any) => g?.asset).map(url),
    alt: d.alt ?? d.name,
    features: d.features ?? [],
    description: d.beschreibung ?? '',
    price: {
      value: d.price ?? 'Preis auf Anfrage',
      old: d.priceOld || undefined,
      terms: d.priceTerms ?? '',
    },
  };
}

async function load(): Promise<{ all: VehicleDetail[]; limit: number }> {
  try {
    const r = await client.fetch<{ limit: number; items: any[] }>(QUERY);
    if (r.items.length) return { all: r.items.map(map), limit: r.limit };
  } catch (e) {
    console.warn('[sanity] Fahrzeuge konnten nicht geladen werden, nutze Fallback:', e);
  }
  // ponytail: Fallback bleibt, bis Sanity befüllt ist – dann kann er weg
  return { all: fallback.map((v) => ({ ...v, description: '' })), limit: 3 };
}

/** Alle sichtbaren Fahrzeuge, in Sanity-Reihenfolge */
export async function getAllVehicles() {
  return (await load()).all;
}

/** Die auf auf der Startseite gezeigten Fahrzeuge (Anzahl aus Sanity) */
export async function getFeaturedVehicles() {
  const { all, limit } = await load();
  return limit > 0 ? all.slice(0, limit) : all;
}

export async function getVehicle(id: string) {
  return (await load()).all.find((v) => v.id === id) ?? null;
}
