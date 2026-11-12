// Texte sind bewusst keine Pflichtfelder: Ein leeres Feld zeigt auf der Website den
// Standardtext (merge() in src/lib/content.ts) und darf das Veröffentlichen nicht blockieren.
const stringField = (name, title, extra = {}) => ({ name, title, type: 'string', ...extra });

const textField = (name, title, rows = 3, extra = {}) => ({
  name,
  title,
  type: 'text',
  rows,
  ...extra,
});

const sectionTargets = [
  { title: 'Über mich (Unterseite)', value: 'alex' },
  { title: 'Fahrzeuge', value: 'fahrzeuge' },
  { title: 'Ablauf', value: 'ablauf' },
  { title: 'Leasing & Finanzierung', value: 'finanzierung' },
  { title: 'Dachzelte (Unterseite)', value: 'dachzelte' },
];
const navigationLinks = (name, title, { footer = false, mobile = false } = {}) => ({
  name,
  title,
  type: 'array',
  validation: (R) =>
    mobile
      ? R.required()
          .min(4)
          .max(5)
          .custom(
            (items) =>
              new Set(items?.map((item) => item.target)).size === items?.length ||
              'Jedes Ziel darf nur einmal vorkommen.'
          )
      : R.required()
          .min(1)
          .max(footer ? 8 : 5),
  of: [
    {
      type: 'object',
      fields: [
        stringField('label', 'Beschriftung'),
        stringField('target', 'Ziel', {
          options: {
            list: footer
              ? [
                  ...sectionTargets,
                  { title: 'Fragen & Antworten (Dialog)', value: 'faq' },
                  { title: 'Kontakt (Dialog)', value: 'ask' },
                ]
              : sectionTargets,
          },
        }),
      ],
      preview: { select: { title: 'label', subtitle: 'target' } },
    },
  ],
});

export default {
  name: 'frontpage',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Einstieg', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'offers', title: 'Fahrzeuge' },
    { name: 'intro', title: 'Kachel-Überschrift & Vorteilsleiste' },
    { name: 'process', title: 'Ablauf' },
    { name: 'rooftent', title: 'Dachzelte' },
    { name: 'finance', title: 'Leasing & Finanzierung' },
    { name: 'reviews', title: 'Google-Rezensionen' },
    { name: 'form', title: 'Anfrage' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    {
      name: 'rooftent',
      title: 'Dachzelt-Seite (/dachzelte): Banner & Galerie',
      type: 'object',
      group: 'rooftent',
      fields: [
        {
          name: 'enabled',
          title: 'Dachzelt-Seite und Hinweis auf der Startseite anzeigen',
          type: 'boolean',
          initialValue: true,
        },
        stringField('eyebrow', 'Hinweis über der Überschrift'),
        textField('heading', 'Überschrift (Zeilenumbruch möglich)', 2),
        textField('text', 'Beschreibung'),
        stringField('ctaLabel', 'Anfragebutton'),
        stringField('topicLabel', 'Thema im Anfrageformular'),
        stringField('finePrint', 'Hinweis unter dem Button'),
        {
          name: 'image',
          title: 'Bannermotiv',
          type: 'image',
          options: { hotspot: true },
          description:
            'Breites Motiv mit Dachzelt rechts. Text und dunkler Verlauf werden von der Website ergänzt.',
          fields: [stringField('alt', 'Bildbeschreibung')],
          validation: (R) => R.required(),
        },
        stringField('seoTitle', 'Unterseite /dachzelte – Seitentitel'),
        textField('seoDescription', 'Unterseite /dachzelte – Meta-Beschreibung', 2),
        stringField('backLabel', 'Unterseite – Link zurück zur Startseite'),
        stringField('teaserText', 'Startseite – Hinweis auf die Dachzelt-Seite'),
        stringField('teaserLinkLabel', 'Startseite – Linktext zur Dachzelt-Seite'),
        stringField('galleryLabel', 'Galerieüberschrift'),
        stringField('galleryNote', 'Galerie-Kurztext'),
        stringField('openLabel', 'Bild öffnen – Beschriftung'),
        stringField('closeLabel', 'Galerie schließen – Beschriftung'),
        stringField('previousLabel', 'Vorheriges Bild – Beschriftung'),
        stringField('nextLabel', 'Nächstes Bild – Beschriftung'),
        {
          name: 'awardText',
          title: 'Hersteller-Auszeichnung – Hinweis',
          type: 'text',
          rows: 2,
          description:
            'Die Auszeichnung gilt Naturbummler, nicht Autoladen Altes Land. Kein TÜV-Siegel oder Partnerschaftsnachweis.',
        },
        { name: 'awardSourceLabel', title: 'Auszeichnung – Linkbeschriftung', type: 'string' },
        {
          name: 'awardSourceUrl',
          title: 'Auszeichnung – Quellenlink',
          type: 'url',
          validation: (R) => R.uri({ scheme: ['https'] }),
        },
        {
          name: 'gallery',
          title: 'Galerie – Originalfotos & Herstellerbilder',
          type: 'array',
          description: 'Reihenfolge per Ziehen ändern. Eine leere Liste blendet die Galerie aus.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Foto',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (R) => R.required(),
                },
                stringField('alt', 'Bildbeschreibung / Bildunterschrift'),
                {
                  name: 'fit',
                  title: 'Vorschaubild',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Fläche füllen (Foto)', value: 'cover' },
                      { title: 'Vollständig zeigen (Siegel / Text)', value: 'contain' },
                    ],
                  },
                },
              ],
              preview: { select: { title: 'alt', media: 'image' } },
            },
          ],
        },
      ],
    },
    stringField('seoTitle', 'Seitentitel', { group: 'seo' }),
    textField('seoDescription', 'Meta-Beschreibung', 3, { group: 'seo' }),
    {
      name: 'seoImage',
      title: 'Social-Vorschaubild',
      type: 'image',
      group: 'seo',
      description:
        'Vorschau beim Teilen der Startseite. Empfohlen: 1200 × 630 Pixel. Ohne Bild wird das Hero-Motiv verwendet.',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Bildbeschreibung', type: 'string' }],
    },
    {
      name: 'seoImageAlt',
      title: 'Beschreibung des Standard-Vorschaubilds',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'header',
      title: 'Desktop-Header',
      type: 'object',
      group: 'navigation',
      fields: [
        stringField('navigationLabel', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Navigationslinks'),
        stringField('contactLabel', 'Kontaktbutton'),
        stringField('whatsappLabel', 'Barrierefreie WhatsApp-Beschriftung'),
      ],
    },
    {
      name: 'mobileNavigation',
      title: 'Mobile Bottom-Navigation',
      type: 'object',
      group: 'navigation',
      description:
        'Erscheint automatisch nach dem Hero. Beschriftungen und Reihenfolge sind hier änderbar.',
      fields: [
        stringField('label', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Vier oder fünf Navigationsziele', { mobile: true }),
      ],
    },
    {
      name: 'hero',
      title: 'Einstieg',
      type: 'object',
      group: 'hero',
      fields: [
        ...['desktopImage', 'mobileImage'].map((name) => ({
          name,
          title:
            name === 'desktopImage' ? 'Hero-Grafik Desktop (16:9)' : 'Hero-Grafik Mobile (9:16)',
          type: 'image',
          options: { hotspot: true },
          validation: (R) => R.required(),
          description:
            name === 'desktopImage'
              ? 'Freie Fläche links für den Text. Die Seite erzeugt WebP-Größen automatisch.'
              : 'Freie Fläche oben für den Text. Wird bis 760 Pixel Bildschirmbreite verwendet.',
        })),
        stringField('imageAlt', 'Alternativtext der Hero-Grafiken'),
        { name: 'eyebrow', title: 'Hinweis über der Hauptüberschrift', type: 'string' },
        { name: 'aboutLinkLabel', title: 'Alex-Leiste: Link zur Über-mich-Seite', type: 'string' },
        {
          name: 'availability',
          title: 'Früherer Erreichbarkeits-Hinweis',
          type: 'string',
          hidden: true,
        },
        stringField('personTitle', 'Alex-Leiste: Überschrift'),
        textField('personIntro', 'Alex-Leiste: Kurztext', 2),
        { name: 'moreLabel', title: 'Früherer Link zu „Über Alex“', type: 'string', hidden: true },
        {
          name: 'portrait',
          title: 'Alex-Leiste: Porträt (Hochformat)',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
          validation: (R) => R.required(),
        },
        stringField('headline', 'Hauptüberschrift'),
        stringField('headlineAccent', 'Hervorgehobene zweite Zeile'),
        textField('quote', 'Einleitung', 2),
        {
          name: 'note',
          title: 'Zusatzzeile mit Lieferwagen-Symbol (optional)',
          type: 'string',
          description:
            'z. B. „Deutschlandweite Lieferung inklusive.“ Leer = keine Zeile. Kurz halten: Auf dem Handy steht der Text über dem Foto.',
        },
        stringField('phoneLabel', 'Telefon-Button'),
        stringField('whatsappLabel', 'WhatsApp-Button'),
        stringField('whatsappLinkLabel', 'WhatsApp-Link unter dem Hero-Button'),
        stringField('vehiclesLinkLabel', 'Hauptbutton: Sprung zu den Fahrzeugen'),
        stringField('ctaLabel', 'Zweiter Button: Anfrage'),
      ],
    },
    {
      name: 'offers',
      title: 'Fahrzeugbereich',
      type: 'object',
      group: 'offers',
      fields: [
        { name: 'ctaLabel', title: 'Button „Anderes Fahrzeug anfragen“', type: 'string' },
        stringField('cardCtaLabel', 'Standard-Button auf den Kacheln', {
          description: 'Gilt für Fahrzeuge ohne eigenen Button-Text, z. B. „Angebot anfragen“.',
        }),
        // Fields of the removed slider and vehicle dialog; kept so stored values stay valid.
        ...[
          'heading',
          'intro',
          'sliderLabel',
          'previousLabel',
          'nextLabel',
          'allLabel',
          'sheetSubtitle',
        ].map((name) => ({ name, title: `Früher: ${name}`, type: 'string', hidden: true })),
        stringField('priceLabel', 'Preisbezeichnung'),
      ],
    },
    {
      name: 'intro',
      title: 'Kachel-Überschrift & Vorteilsleiste',
      type: 'object',
      group: 'intro',
      fields: [
        { name: 'eyebrow', title: 'Hinweis über der Überschrift (optional)', type: 'string' },
        textField('heading', 'Überschrift über den Fahrzeugen', 2),
        textField('text', 'Kurzer Satz neben der Überschrift', 2),
        stringField('promisesLabel', 'Bezeichnung der Vorteilsleiste'),
        ...['promises', 'benefits'].map((name) => ({
          name,
          title: name === 'promises' ? 'Leiste unter dem Hero' : 'Drei Vorteile',
          // Keep existing content without exposing controls for the removed icon row.
          hidden: name === 'benefits',
          type: 'array',
          validation: (R) => R.length(3),
          of: [
            {
              type: 'object',
              fields: [
                stringField('title', 'Titel'),
                textField('text', 'Text', 2),
                ...(name === 'benefits'
                  ? [
                      stringField('icon', 'Symbol', {
                        options: {
                          list: [
                            { title: 'Uhr', value: 'clock' },
                            { title: 'Gespräch', value: 'chat' },
                            { title: 'Sicherheit', value: 'shield' },
                          ],
                        },
                      }),
                    ]
                  : []),
              ],
            },
          ],
        })),
      ],
    },
    {
      name: 'process',
      title: 'Ablauf',
      type: 'object',
      group: 'process',
      fields: [
        stringField('heading', 'Überschrift'),
        textField('intro', 'Einleitung', 2),
        {
          name: 'steps',
          title: 'Schritte (3 bis 5)',
          type: 'array',
          description: 'Die Straße passt sich der Anzahl an.',
          validation: (R) => R.required().min(3).max(5),
          of: [
            {
              type: 'object',
              fields: [stringField('title', 'Titel'), textField('text', 'Text', 3)],
              preview: { select: { title: 'title', subtitle: 'text' } },
            },
          ],
        },
        stringField('ctaLabel', 'Button'),
        stringField('finePrint', 'Hinweis unter dem Button'),
      ],
    },
    {
      name: 'finance',
      title: 'Leasing & Finanzierung',
      type: 'object',
      group: 'finance',
      fields: [
        stringField('heading', 'Überschrift'),
        textField('intro', 'Einleitung', 3),
        stringField('comparisonLabel', 'Text zwischen den Möglichkeiten'),
        {
          name: 'ways',
          title: 'Möglichkeiten',
          type: 'array',
          validation: (R) =>
            R.required()
              .length(2)
              .custom((items) => {
                const ids = items?.map(({ id }) => id) ?? [];
                return ids.includes('leasing') && ids.includes('finanzierung')
                  ? true
                  : 'Leasing und Finanzierung müssen jeweils genau einmal vorkommen.';
              }),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'id',
                  title: 'Art',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Leasing', value: 'leasing' },
                      { title: 'Finanzierung', value: 'finanzierung' },
                    ],
                    layout: 'radio',
                  },
                  validation: (R) => R.required(),
                },
                stringField('tag', 'Kategorie-Zeile'),
                stringField('title', 'Titel'),
                textField('intro', 'Einleitung', 3),
                {
                  name: 'pros',
                  title: 'Vorteile',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (R) => R.required().min(1),
                },
                textField('fit', 'Für wen passt es?', 3),
              ],
              preview: { select: { title: 'title', subtitle: 'tag' } },
            },
          ],
        },
        stringField('compareLabel', 'Aufklapp-Zeile für den Vergleich'),
        stringField('helpHeading', 'Beratungs-Überschrift'),
        textField('helpText', 'Beratungs-Text', 3),
        stringField('ctaLabel', 'Beratungs-Button'),
        stringField('finePrint', 'Hinweis unter dem Button'),
        textField('legal', 'Rechtlicher Hinweis', 3),
      ],
    },
    {
      name: 'about',
      title: 'Bisheriger Über-Alex-Dialog (Archiv)',
      type: 'object',
      hidden: true,
      fields: [
        stringField('title', 'Überschrift'),
        stringField('subtitle', 'Untertitel'),
        {
          name: 'image',
          title: 'Bild',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
          validation: (R) => R.required(),
        },
        textField('lead', 'Hervorgehobener Einstieg', 2),
        {
          name: 'paragraphs',
          title: 'Absätze',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (R) => R.required().min(1),
        },
        stringField('kicker', 'Zwischenüberschrift'),
        stringField('ruleHeading', 'Vorteils-Überschrift'),
        {
          name: 'ruleParagraphs',
          title: 'Vorteils-Absätze',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (R) => R.required().min(1),
        },
        stringField('ruleEmphasis', 'Hervorgehobener Schlusssatz'),
        stringField('ctaLabel', 'Button'),
      ],
    },
    {
      name: 'form',
      title: 'Anfrageformular',
      type: 'object',
      group: 'form',
      fields: [
        stringField('title', 'Überschrift'),
        stringField('subtitle', 'Untertitel'),
        stringField('topicLabel', 'Themen-Frage'),
        {
          name: 'topics',
          title: 'Themen',
          type: 'array',
          validation: (R) => R.required().min(1),
          of: [
            {
              type: 'object',
              fields: [
                stringField('id', 'Technischer Wert', {
                  options: {
                    list: [
                      { title: 'Firmenwagen', value: 'firma' },
                      { title: 'Transporter', value: 'transporter' },
                      { title: 'Privat', value: 'privat' },
                      { title: 'Noch offen', value: 'offen' },
                      { title: 'Dachzelt', value: 'dachzelt' },
                    ],
                  },
                }),
                stringField('label', 'Bezeichnung'),
              ],
              preview: { select: { title: 'label', subtitle: 'id' } },
            },
          ],
        },
        stringField('channelLabel', 'Kontaktweg-Frage'),
        stringField('phoneOption', 'Telefon-Option'),
        stringField('whatsappOption', 'WhatsApp-Option'),
        stringField('phoneLabel', 'Beschriftung Telefonnummer'),
        stringField('whatsappLabel', 'Beschriftung WhatsApp-Nummer'),
        stringField('phonePlaceholder', 'Platzhalter Telefonnummer'),
        stringField('missingContactError', 'Fehler bei fehlender Nummer'),
        stringField('messageLabel', 'Beschriftung Nachricht'),
        stringField('optionalLabel', 'Optional-Hinweis'),
        stringField('messagePlaceholder', 'Platzhalter Nachricht'),
        stringField('submitLabel', 'Senden-Button'),
        stringField('submittingLabel', 'Text beim Senden'),
        stringField('finePrint', 'Hinweis unter dem Button'),
        stringField('contextPrefix', 'Fahrzeugbezug-Präfix'),
        stringField('sendErrorSuffix', 'Zusatz bei Sendefehler'),
        stringField('successTitle', 'Erfolgs-Überschrift'),
        textField('successText', 'Erfolgs-Text', 2),
        stringField('doneLabel', 'Abschluss-Button'),
        stringField('closeLabel', 'Barrierefreier Text für Schließen'),
        stringField('removeContextLabel', 'Barrierefreier Text für Fahrzeugbezug entfernen'),
      ],
    },
    {
      name: 'reviews',
      title: 'Google-Rezensionen',
      type: 'object',
      group: 'reviews',
      description:
        'Live-Abruf aus Google Places oder redaktionelle Auswahl. Im Live-Modus kommen Sterne, Anzahl, Auszüge und Quellen direkt von Google; manuelle Werte werden dann nicht verwendet. Gesamtbewertung und Gesamtanzahl beziehen sich auf ALLE Google-Rezensionen.',
      fields: [
        { name: 'enabled', title: 'Bereich anzeigen', type: 'boolean', initialValue: true },
        {
          name: 'useGoogleApi',
          title: 'Live aus Google Places laden',
          type: 'boolean',
          initialValue: true,
          description:
            'Google liefert maximal fünf relevante Rezensionen, nicht garantiert die neuesten. Die Website filtert fünf Sterne und sortiert diese Auswahl nach Datum. Schlüssel nur in der Server-Umgebung hinterlegen. API-Inhalte werden nicht in Sanity gespeichert.',
        },
        {
          name: 'placeId',
          title: 'Google Place ID',
          type: 'string',
          validation: (R) => R.regex(/^[\w-]+$/),
        },
        stringField('eyebrow', 'Hinweis über der Überschrift'),
        textField('heading', 'Überschrift', 2),
        textField('intro', 'Einleitung', 2),
        stringField('sourceLabel', 'Bezeichnung der Quelle'),
        {
          name: 'sourceUrl',
          title: 'Google-Unternehmenseintrag / alle Rezensionen',
          type: 'url',
          validation: (R) => R.required().uri({ scheme: ['https'] }),
        },
        {
          name: 'rating',
          title: 'Google-Gesamtbewertung',
          type: 'number',
          description:
            'Leer lassen, bis der aktuelle Wert verifiziert wurde. Nicht aus der Auswahl berechnen.',
          validation: (R) => R.min(1).max(5).precision(1),
        },
        {
          name: 'count',
          title: 'Gesamtanzahl aller Google-Rezensionen',
          type: 'number',
          validation: (R) => R.min(1).integer(),
        },
        {
          name: 'verifiedAt',
          title: 'Bewertung und Anzahl zuletzt geprüft am',
          type: 'date',
          description:
            'Die Zusammenfassung erscheint nur, wenn Bewertung, Anzahl und Prüfdatum vorhanden sind.',
        },
        {
          name: 'items',
          title: 'Neueste 5-Sterne-Rezensionen',
          type: 'array',
          description:
            'Die Website sortiert nach Datum, neueste zuerst. Namen und Wortlaut unverändert vom Original übernehmen.',
          of: [
            {
              type: 'object',
              fields: [
                stringField('name', 'Name wie bei Google'),
                {
                  name: 'rating',
                  title: 'Sterne',
                  type: 'number',
                  initialValue: 5,
                  validation: (R) => R.required().min(5).max(5).integer(),
                },
                textField('text', 'Originaltext', 6),
                {
                  name: 'date',
                  title: 'Datum der Rezension',
                  type: 'date',
                  validation: (R) => R.required(),
                },
                {
                  name: 'sourceUrl',
                  title: 'Direktlink zur Rezension',
                  type: 'url',
                  description: 'Ohne Direktlink wird der Google-Unternehmenseintrag verlinkt.',
                  validation: (R) => R.uri({ scheme: ['https'] }),
                },
              ],
              preview: { select: { title: 'name', subtitle: 'text' } },
            },
          ],
        },
        stringField('selectionLabel', 'Hinweis zur 5-Sterne-Auswahl'),
        stringField('allLabel', 'Link zu allen Rezensionen'),
        {
          name: 'writeUrl',
          title: 'Direktlink zum Bewerten',
          type: 'url',
          description:
            'Google-Link „Um Rezensionen bitten“ eintragen. Ohne Link wird kein Bewertungsbutton angezeigt.',
          validation: (R) => R.uri({ scheme: ['https'] }),
        },
        stringField('writeLabel', 'Button zum Bewerten'),
        textField('emptyText', 'Text, solange noch keine Rezensionen hinterlegt sind', 2),
        textField('note', 'Quellenhinweis unter der Auswahl', 2),
        stringField('trackLabel', 'Slider-Bezeichnung für Screenreader'),
        stringField('previousLabel', 'Zurück-Pfeil'),
        stringField('nextLabel', 'Weiter-Pfeil'),
        stringField('readMoreLabel', 'Langen Text öffnen'),
        stringField('readLessLabel', 'Langen Text schließen'),
        stringField('originalLabel', 'Link zum Original'),
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        stringField('eyebrow', 'Hinweis über der Kontakt-Überschrift'),
        stringField('heading', 'Kontakt-Überschrift'),
        textField('intro', 'Persönliche Einladung', 2),
        stringField('ctaLabel', 'Hauptbutton'),
        stringField('whatsappCtaLabel', 'Großer WhatsApp-Button'),
        stringField('finePrint', 'Hinweis unter den Buttons'),
        stringField('brandTagline', 'Text unter dem Markennamen'),
        stringField('contactLabel', 'Überschrift Kontaktdaten'),
        stringField('exploreLabel', 'Überschrift Entdecken-Links'),
        stringField('moreLabel', 'Überschrift weitere Links'),
        textField('tagline', 'Persönlicher Abschlusssatz', 2),
        stringField('whatsappLabel', 'WhatsApp-Link'),
        stringField('instagramLabel', 'Instagram-Linktext'),
        stringField('navigationLabel', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Footer-Links', { footer: true }),
        stringField('phonePrefix', 'Präfix Telefon'),
        stringField('emailPrefix', 'Präfix E-Mail'),
        stringField('legalLabel', 'Link Impressum'),
        stringField('privacyLabel', 'Link Datenschutz'),
      ],
    },
    {
      name: 'faq',
      title: 'Fragen & Antworten im Dialog',
      type: 'object',
      group: 'footer',
      fields: [
        stringField('title', 'Überschrift'),
        {
          name: 'items',
          title: 'Fragen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [stringField('question', 'Frage'), textField('answer', 'Antwort')],
            },
          ],
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
};
