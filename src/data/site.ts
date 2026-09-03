export const legal = {
  company: 'Autoladen Altes Land GmbH',
  street: 'Johann-Ropers-Trift 10',
  city: '21720 Grünendeich',
  ceo: 'Alexander Philippowsky',
  vatId: 'DE453802095',
  register: 'HRB 211846, Amtsgericht Tostedt',
  web: 'www.autoladen-altesland.de',
} as const;

export type Tone = 'green' | 'blue' | 'grey';

export type Vehicle = {
  id: string;
  /** Wird in der Anfrage als Bezug übernommen */
  name: string;
  kicker: string;
  /** Vorbelegung im Anfrageformular */
  topic: 'firma' | 'transporter' | 'privat';
  status: string;
  tone: Tone;
  image: string;
  alt: string;
  /** Weitere Bilder für den Slider auf der Detailseite */
  images?: string[];
  features: string[];
  /**
   * Kaufpreis. `old` ist optional und muss der tatsächlich verlangte reguläre
   * Preis sein – ein Streichpreis ohne echten Bezugspreis ist nicht zulässig.
   */
  price: {
    value: string;
    old?: string;
    /** z. B. „EU-Neuwagen und Jahreswagen“ */
    terms: string;
  };
};

/** Beispiel-Fahrzeuge, solange in Sanity nichts gepflegt ist. */
export const vehicles: Vehicle[] = [
  {
    id: 'fiat-ducato-kastenwagen',
    name: 'FIAT DUCATO Kastenwagen',
    kicker: 'Nutzfahrzeug',
    topic: 'transporter',
    status: 'Sofort verfügbar',
    tone: 'green',
    image: '/veh1.jpg',
    alt: 'FIAT DUCATO Kastenwagen',
    features: ['Für Handwerk & Lieferdienst', 'EU-Neuwagen oder Jahreswagen', 'Gewerblich & privat'],
    price: { value: '34.900 €', terms: 'EU-Neuwagen und Jahreswagen' },
  },
  {
    id: 'e-limousine',
    name: 'Elektrische Limousine',
    kicker: 'Dienstwagen',
    topic: 'firma',
    status: 'Kurzfristig möglich',
    tone: 'blue',
    image: '/veh2.jpg',
    alt: 'Elektrische Limousine',
    features: ['Vollelektrisch', 'Als Dienstwagen geeignet', 'Privat & gewerblich'],
    price: { value: '42.900 €', old: '46.900 €', terms: 'Jahreswagen' },
  },
  {
    id: 'kompakt-stromer',
    name: 'Kompakter Stromer',
    kicker: 'Alltag & Familie',
    topic: 'privat',
    status: 'Auf Anfrage',
    tone: 'grey',
    image: '/veh3.jpg',
    alt: 'Kompaktes Elektrofahrzeug',
    features: ['Vollelektrisch', 'Viel Platz für den Alltag', 'Privat & gewerblich'],
    price: { value: '27.900 €', terms: 'EU-Neuwagen' },
  },
];
