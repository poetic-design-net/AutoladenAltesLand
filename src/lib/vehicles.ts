/**
 * Fahrzeuge aus Sanity. Fällt auf die Modell-Kacheln in
 * src/data/vehicle-defaults.json zurück, wenn die Anfrage fehlschlägt –
 * die Seite bleibt damit immer lauffähig.
 */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import defaults from '../data/vehicle-defaults.json';
import { toVehicle, type VehicleDetail } from './vehicle-view';

export type { VehicleDetail };

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'dgeh1xh8',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  // ponytail: kein CDN, damit Änderungen im Studio sofort sichtbar sind; bei viel Traffic auf true + Revalidierung wechseln
  useCdn: false,
});
const img = imageUrlBuilder(client);

const QUERY = `{
  "configured": defined(*[_id == "siteSettings"][0]),
  "limit": coalesce(*[_id == "siteSettings"][0].featuredVehicleCount, 0),
  "items": *[_type == "fahrzeug" && verfuegbar == true && defined(slug.current) && defined(name)] | order(sortierung asc, _createdAt asc) {
    "id": slug.current, name, kicker, topic, status, tone,
    image, "alt": image.alt, gallery, features, beschreibung,
    discount, ctaLabel, price, priceOld, priceTerms
  }
}`;

const url = (i: any, width: number, height: number) =>
  img.image(i).width(width).height(height).fit('crop').auto('format').url();

async function load(): Promise<{ all: VehicleDetail[]; limit: number }> {
  try {
    const r = await client.fetch<{ configured: boolean; limit: number; items: any[] }>(QUERY);
    if (r.configured || r.items.length)
      return { all: r.items.map((d) => toVehicle(d, url)), limit: r.limit };
  } catch (e) {
    console.warn('[sanity] Fahrzeuge konnten nicht geladen werden, nutze Fallback:', e);
  }
  // ponytail: Nachlässe ändern sich; im Ausfall zeigt die Live-Seite keine Angaben aus dem Code.
  // Lokal (DEV) bleiben sie sichtbar, damit der Endzustand ohne Sanity prüfbar ist.
  return {
    all: defaults.map((v) =>
      toVehicle({ ...v, discount: import.meta.env.DEV ? (v as any).discount : '' }, url)
    ),
    limit: 0,
  };
}

/** Alle sichtbaren Fahrzeuge, in Sanity-Reihenfolge */
export async function getAllVehicles() {
  return (await load()).all;
}

/** Startseite: `featured` für die Kacheln (Anzahl aus Sanity, 0 = alle), `all` für den Anfrage-Bezug */
export async function getHomepageVehicles() {
  const { all, limit } = await load();
  return { all, featured: limit > 0 ? all.slice(0, limit) : all };
}
