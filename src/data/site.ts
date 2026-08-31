/**
 * Zentrale Inhalte der Website.
 *
 * Kontaktdaten: leer lassen heißt "noch nicht bekannt" – die Oberfläche zeigt dann
 * einen sichtbaren Platzhalter statt eines toten Links. Sobald die echten Daten da
 * sind, hier eintragen; alles andere zieht automatisch nach.
 */
export const contact: { phone: string; whatsapp: string; email: string } = {
  /** z. B. '+49 4162 123456' */
  phone: '',
  /** international, ohne + und ohne Leerzeichen, z. B. '4916212345678' */
  whatsapp: '',
  /** z. B. 'moin@autoladen-altesland.de' */
  email: '',
};

export const brand = {
  name: 'Autoladen Altes Land',
  claim: 'Nutzfahrzeuge · Dienstwagen · Leasing',
  person: 'Alex',
  region: 'Altes Land',
} as const;

export type Tone = 'green' | 'blue' | 'grey';

export type Vehicle = {
  id: string;
  /** Wird in der Anfrage als Bezug übernommen */
  name: string;
  /** Kurzform für enge Kacheln */
  short: string;
  kicker: string;
  /** Vorbelegung im Anfrageformular */
  topic: 'firma' | 'transporter' | 'privat';
  status: string;
  tone: Tone;
  image: string;
  alt: string;
  features: string[];
  /**
   * Beispielwerte. `old` muss die tatsächlich verlangte reguläre Rate sein –
   * ein Streichpreis ohne echten Bezugspreis ist nicht zulässig.
   */
  price: {
    old: string;
    rate: string;
    save: string;
    terms: string;
  };
};

export const vehicles: Vehicle[] = [
  {
    id: 'e-transporter',
    name: 'Kompakter E-Transporter',
    short: 'E-Transporter',
    kicker: 'Nutzfahrzeug',
    topic: 'transporter',
    status: 'Kontingent verfügbar',
    tone: 'green',
    image: '/veh1.jpg',
    alt: 'Kompakter elektrischer Transporter',
    features: ['Vollelektrisch', 'Für Handwerk & Lieferdienst', 'Gewerbliches Leasing möglich'],
    price: {
      old: '489 €',
      rate: '379 €',
      save: '−110 € mtl.',
      terms: '36 Monate · 10.000 km/Jahr · ohne Anzahlung',
    },
  },
  {
    id: 'e-limousine',
    name: 'Elektrische Limousine',
    short: 'Limousine',
    kicker: 'Dienstwagen',
    topic: 'firma',
    status: 'Kurzfristig möglich',
    tone: 'blue',
    image: '/veh2.jpg',
    alt: 'Elektrische Limousine',
    features: ['Vollelektrisch', 'Als Dienstwagen geeignet', 'Privat & gewerblich'],
    price: {
      old: '529 €',
      rate: '419 €',
      save: '−110 € mtl.',
      terms: '36 Monate · 10.000 km/Jahr · ohne Anzahlung',
    },
  },
  {
    id: 'kompakt-stromer',
    name: 'Kompakter Stromer',
    short: 'Kompakt',
    kicker: 'Alltag & Familie',
    topic: 'privat',
    status: 'Auf Anfrage',
    tone: 'grey',
    image: '/veh3.jpg',
    alt: 'Kompaktes Elektrofahrzeug',
    features: ['Vollelektrisch', 'Viel Platz für den Alltag', 'Privat & gewerblich'],
    price: {
      old: '349 €',
      rate: '269 €',
      save: '−80 € mtl.',
      terms: '36 Monate · 10.000 km/Jahr · ohne Anzahlung',
    },
  },
];

export const priceNote =
  'Beispielraten, netto für Gewerbe · 36 Monate · 10.000 km/Jahr · ohne Anzahlung. ' +
  'Streichrate ist die reguläre Rate.';

export const topics = [
  { id: 'firma', label: 'Firmenwagen' },
  { id: 'transporter', label: 'Transporter' },
  { id: 'privat', label: 'Privat' },
  { id: 'offen', label: 'Noch offen' },
] as const;

export const telHref = contact.phone ? `tel:${contact.phone.replace(/[^+\d]/g, '')}` : null;
export const waHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : null;
export const mailHref = contact.email ? `mailto:${contact.email}` : null;
