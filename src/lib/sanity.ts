import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Queries
export const queries = {
  hero: `*[_type == "hero"][0]{
    _id,
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
  
  leistungen: `*[_type == "leistung"] | order(order asc)[0...6]{
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
    verfuegbar,
    highlight,
    beschreibung,
    ausstattung,
    "hauptbild": hauptbild.asset->url,
    "hauptbildAlt": hauptbild.alt,
    "bilder": bilder[].asset->url
  }`,
  
  kontakt: `*[_type == "kontakt"][0]{
    _id,
    firmenname,
    strasse,
    plz,
    ort,
    telefon,
    telefonService,
    email,
    emailService,
    oeffnungszeiten
  }`,
  
  siteSettings: `*[_type == "siteSettings"][0]{
    _id,
    title,
    description,
    keywords,
    primaryColor,
    secondaryColor,
    footerText,
    navigation,
    phone,
    email,
    address,
    openingHours,
    facebook,
    instagram,
    linkedin
  }`,
  
  about: `*[_type == "about"][0]{
    _id,
    title,
    subtitle,
    introText,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    timeline,
    quote,
    phoneButtonText,
    contactButtonText
  }`,
  
  stats: `*[_type == "stats"][0]{
    _id,
    title,
    stats
  }`,
  
  kundenstimmen: `*[_type == "kundenstimmen"][0]{
    _id,
    title,
    subtitle,
    testimonials,
    ctaTitle,
    ctaText,
    primaryButtonText,
    secondaryButtonText,
    googleReviewLink
  }`
};