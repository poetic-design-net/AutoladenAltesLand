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
  /** Kleinere Fassung für Kacheln */
  thumb?: string;
  alt: string;
  /** Weitere Bilder für den Slider auf der Detailseite */
  images?: string[];
  features: string[];
  /** z. B. „Bis zu 42 % Nachlass“ – ersetzt auf Kacheln die Status-Plakette */
  discount?: string;
  /** Button-Text der Kachel, z. B. „Ducato anfragen“ */
  ctaLabel?: string;
  /**
   * Kaufpreis; `value` ist leer, wenn es keinen festen Preis gibt. `old` ist optional und muss der tatsächlich verlangte reguläre
   * Preis sein – ein Streichpreis ohne echten Bezugspreis ist nicht zulässig.
   */
  price: {
    value: string;
    old?: string;
    /** z. B. „EU-Neuwagen und Jahreswagen“ */
    terms: string;
  };
};
