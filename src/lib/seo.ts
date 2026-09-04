import { legal } from '../data/site';
import type { SiteSettings } from './content';

export const SITE_URL = `https://${legal.web}`;

export function canonicalUrl(path = '/') {
  const url = new URL(path, SITE_URL);
  url.search = '';
  url.hash = '';
  return url.href;
}

/** Keep CMS text from closing the JSON-LD script element. */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function businessSchema(site: SiteSettings, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoDealer',
        '@id': `${SITE_URL}/#unternehmen`,
        name: site.brandName,
        legalName: legal.company,
        url: `${SITE_URL}/`,
        logo: new URL(site.logo, SITE_URL).href,
        description,
        telephone: site.phone,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: legal.street,
          postalCode: legal.city.split(' ')[0],
          addressLocality: legal.city.split(' ').slice(1).join(' '),
          addressCountry: 'DE',
        },
        ...(site.instagramUrl?.startsWith('https://') ? { sameAs: [site.instagramUrl] } : {}),
        // No self-serving review markup or unverified hours, stock and prices.
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: site.brandName,
        url: `${SITE_URL}/`,
        inLanguage: 'de-DE',
        publisher: { '@id': `${SITE_URL}/#unternehmen` },
      },
    ],
  };
}

export function escapeXml(value: string) {
  return value.replace(
    /[<>&"']/g,
    (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!
  );
}
