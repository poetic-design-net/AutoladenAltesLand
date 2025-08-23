import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity Client Configuration
const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for better performance
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// GROQ Queries
const queries = {
  hero: `*[_type == "hero"][0]{
    title,
    highlightedText,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`,
  
  angebote: `*[_type == "angebot"] | order(order asc)[0...6]{
    _id,
    title,
    description,
    icon,
    gradientFrom,
    gradientTo,
    link,
    order
  }`,
  
  fahrzeuge: `*[_type == "fahrzeug" && verfuegbar == true && highlight == true] | order(_createdAt desc)[0...3]{
    _id,
    marke,
    modell,
    jahr,
    preis,
    reichweite,
    ladezeit,
    leistung,
    batterie,
    zustand,
    "hauptbild": bilder[0].asset->url,
    "hauptbildAlt": bilder[0].alt,
    beschreibung
  }`,
  
  kontakt: `*[_type == "kontakt"][0]{
    firmenname,
    strasse,
    plz,
    ort,
    telefon,
    telefonService,
    email,
    emailService,
    oeffnungszeiten,
    googleMapsUrl,
    googleMapsEmbed,
    socialMedia
  }`,
  
  siteSettings: `*[_type == "siteSettings"][0]{
    title,
    description,
    keywords,
    "logoUrl": logo.asset->url,
    "faviconUrl": favicon.asset->url,
    "ogImageUrl": ogImage.asset->url,
    primaryColor,
    secondaryColor,
    footerText,
    cookieBanner,
    navigation
  }`
};

// Data fetching functions
export async function getHeroData() {
  try {
    const data = await client.fetch(queries.hero);
    return data;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export async function getAngebote() {
  try {
    const data = await client.fetch(queries.angebote);
    return data;
  } catch (error) {
    console.error('Error fetching angebote:', error);
    return [];
  }
}

export async function getFahrzeuge() {
  try {
    const data = await client.fetch(queries.fahrzeuge);
    return data;
  } catch (error) {
    console.error('Error fetching fahrzeuge:', error);
    return [];
  }
}

export async function getKontakt() {
  try {
    const data = await client.fetch(queries.kontakt);
    return data;
  } catch (error) {
    console.error('Error fetching kontakt:', error);
    return null;
  }
}

export async function getSiteSettings() {
  try {
    const data = await client.fetch(queries.siteSettings);
    return data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Helper function to get all data for initial page load
export async function getAllPageData() {
  const [hero, angebote, fahrzeuge, kontakt, siteSettings] = await Promise.all([
    getHeroData(),
    getAngebote(),
    getFahrzeuge(),
    getKontakt(),
    getSiteSettings()
  ]);
  
  return {
    hero,
    angebote,
    fahrzeuge,
    kontakt,
    siteSettings
  };
}

// Icon mapping for angebote
export const iconMap = {
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  lightning: 'M13 10V3L4 14h7v7l9-11h-7z',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  euro: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
};

export default client;