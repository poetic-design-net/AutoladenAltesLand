import type { APIRoute } from 'astro';
import { getAllVehicles } from '../lib/vehicles';
import { canonicalUrl, escapeXml } from '../lib/seo';

export const GET: APIRoute = async () => {
  const vehicles = await getAllVehicles();
  const paths = [
    '/',
    '/impressum',
    '/datenschutz',
    ...vehicles.map((vehicle) => `/fahrzeuge/${encodeURIComponent(vehicle.id)}`),
  ];
  const entries = [...new Set(paths)]
    .map((path) => `<url><loc>${escapeXml(canonicalUrl(path))}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    }
  );
};
