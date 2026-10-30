import type { VitaContent } from '../lib/vita';

// Development-only design fixture. Never import this into Sanity.
export const vitaPreview: VitaContent = {
  enabled: true,
  eyebrow: 'Vita',
  heading: 'Mein Weg zum Autoladen.',
  intro: 'Die Stationen, die meine Arbeit heute prägen.',
  items: [
    {
      period: 'Zeitraum ergänzen',
      title: 'Ausbildung',
      role: 'Beispielstation',
      location: 'Ort ergänzen',
      description:
        'Hier ist Platz für Alexanders Ausbildung: der erste Schritt, was ihn daran begeistert hat und welche Erfahrungen ihn bis heute begleiten.',
    },
    {
      period: 'Zeitraum ergänzen',
      title: 'Berufliche Station',
      role: 'Beispielstation',
      location: '',
      description:
        'Hier folgt eine berufliche Station mit Unternehmen, Tätigkeit und einer kurzen persönlichen Geschichte. Die tatsächlichen Angaben stehen noch aus.',
    },
    {
      period: 'Heute',
      title: 'Autoladen Altes Land',
      role: 'Persönliche Fahrzeugberatung',
      location: 'Grünendeich',
      description:
        'Bei mir bist du nicht an eine bestimmte Marke gebunden und musst dich auch nicht selbst durch unzählige Angebote kämpfen. Ich suche das Fahrzeug, das zu deinem Bedarf und deinem Budget passt.',
    },
  ],
};
