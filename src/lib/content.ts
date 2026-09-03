import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import defaults from '../data/content-defaults.json';

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'dgeh1xh8',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

const imageBuilder = imageUrlBuilder(client);

export const { fallbackSite, fallbackFrontpage } = defaults;

export type SiteSettings = typeof fallbackSite;
export type Frontpage = typeof fallbackFrontpage;

function merge<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback))
    return (Array.isArray(value) && value.length ? value : fallback) as T;
  if (fallback && typeof fallback === 'object') {
    const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(fallback as Record<string, unknown>).map(([key, defaultValue]) => [
        key,
        merge(defaultValue, source[key]),
      ])
    ) as T;
  }
  return (value === undefined || value === null || value === '' ? fallback : value) as T;
}

function imageUrl(image: unknown, fallback: string, width: number, height: number) {
  if (!image || typeof image !== 'object' || !('asset' in image)) return fallback;
  return imageBuilder.image(image).width(width).height(height).fit('crop').auto('format').url();
}

function heroImageUrl(image: unknown, fallback: string, width: number) {
  if (!image || typeof image !== 'object' || !('asset' in image)) return fallback;
  return imageBuilder.image(image).width(width).fit('max').format('webp').quality(84).url();
}

const QUERY = `{
  "site": *[_id == "siteSettings"][0],
  "page": *[_id == "frontpage"][0]
}`;

export async function getContent(): Promise<{ site: SiteSettings; page: Frontpage }> {
  try {
    const raw = await client.fetch<{ site?: any; page?: any }>(QUERY);
    const site = merge(fallbackSite, raw.site);
    const page = merge(fallbackFrontpage, raw.page);
    page.hero.desktopImage = heroImageUrl(
      raw.page?.hero?.desktopImage,
      fallbackFrontpage.hero.desktopImage,
      1672
    );
    page.hero.desktopImageSmall = heroImageUrl(
      raw.page?.hero?.desktopImage,
      fallbackFrontpage.hero.desktopImageSmall,
      1000
    );
    page.hero.mobileImage = heroImageUrl(
      raw.page?.hero?.mobileImage,
      fallbackFrontpage.hero.mobileImage,
      941
    );
    page.hero.mobileImageSmall = heroImageUrl(
      raw.page?.hero?.mobileImage,
      fallbackFrontpage.hero.mobileImageSmall,
      480
    );
    site.logo = imageUrl(raw.site?.logo, fallbackSite.logo, 320, 320);
    site.logoAlt = raw.site?.logo?.alt || site.brandName;
    page.hero.portrait = imageUrl(
      raw.page?.hero?.portrait,
      fallbackFrontpage.hero.portrait,
      960,
      1440
    );
    page.hero.portraitAlt =
      raw.page?.hero?.portrait?.alt || `${site.contactName} vom ${site.brandName}`;
    page.about.image = imageUrl(raw.page?.about?.image, fallbackFrontpage.about.image, 1600, 1067);
    page.about.imageAlt =
      raw.page?.about?.image?.alt || `${site.contactName} vom ${site.brandName}`;
    return { site, page };
  } catch (error) {
    console.warn('[sanity] Website-Inhalte konnten nicht geladen werden, nutze Fallback:', error);
    return { site: { ...fallbackSite }, page: structuredClone(fallbackFrontpage) };
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await getContent()).site;
}

export function contactLinks(site: SiteSettings) {
  return {
    telHref: site.phone ? `tel:${site.phone.replace(/[^+\d]/g, '')}` : null,
    waHref: site.whatsapp ? `https://wa.me/${site.whatsapp}` : null,
    mailHref: site.email ? `mailto:${site.email}` : null,
  };
}
