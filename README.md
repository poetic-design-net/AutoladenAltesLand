# Autoladen Altes Land

Astro-Website mit Sanity Studio. Inhalte kommen aus dem Sanity-Projekt `dgeh1xh8`, Dataset `production`.

## Inhalte verwalten

Studio: https://studio-aal.vercel.app

Unter **Startseite**:
- **Navigation**: Desktop-Links, Kontaktbutton und Beschriftung/Reihenfolge der mobilen Bottom-Navigation.
- **Einstieg**: Desktop- und Mobile-Hero-Grafik, Alternativtext, Überschrift, Einleitung und Buttons.
- **Vorstellung & Vorteile**: Intro, drei Aussagen unter dem Hero und drei Vorteile inklusive Symbol.
- **Fahrzeuge**, **Ablauf**, **Leasing & Finanzierung**, **Über Alex**, **Anfrage**: jeweilige Texte und Beschriftungen.
- **Footer**: Abschlusssatz, Links, WhatsApp-Beschriftung und Fragen & Antworten.

Unter **Website**: Logo, Name, Telefonnummer, WhatsApp, E-Mail und Preis-Hinweis.
Unter **Fahrzeuge**: Bilder, Preise, Verfügbarkeit, Merkmale und Sortierung.

Änderungen im Studio **veröffentlichen**. Die Website lädt die veröffentlichten Inhalte serverseitig ohne Sanity-CDN-Cache. Für reine Inhaltsänderungen ist kein Code-Deployment erforderlich. Schemaänderungen erfordern dagegen einen neuen Build und ein Deployment des Studios.

Alex ist der einzige Ansprechpartner. Anbietertexte in der Ich-Form schreiben, nicht als Team („Wir kümmern uns …“).

## Entwicklung

Website:

```sh
npm install
npm run dev
npm run build
```

Studio (Node.js 22 empfohlen):

```sh
cd studio
npm install
npm run dev
npm run build
```

Das bestehende Studio wird separat über Vercel gehostet. Ein Website-Deployment aktualisiert dessen gebündelte Eingabefelder nicht automatisch.

## Inhaltssynchronisierung dieses Relaunches

`src/data/content-defaults.json` enthält gemeinsame Fallback-Inhalte für Website und Import. `src/lib/content.ts` verbindet diese mit veröffentlichten Sanity-Inhalten und erzeugt die Bild-URLs.

```sh
# Nur lesen: zeigt die geplanten Änderungen
node studio/sync-homepage.mjs

# Explizit veröffentlichen: Hero-Assets und Relaunch-Inhalte
node studio/sync-homepage.mjs --apply
```

Der Import benötigt `SANITY_TOKEN` aus `studio/.env`. Er sichert die Startseiten-Dokumente in einem temporären Verzeichnis, ergänzt fehlende Felder, setzt die beiden gelieferten Hero-Bilder und die vorgesehenen Ich-Texte. Bestehende Fahrzeug- und Website-Dokumente bleiben unberührt. Entwürfe bleiben Entwürfe; Revisionsprüfung schützt vor parallelen Änderungen.

Dies ist ein gezielter Relaunch-Import, **kein regelmäßiger Deployment-Schritt**: er setzt ausgewählte Texte und Hero-Bilder erneut auf diesen Stand. Nach redaktionellen Änderungen nicht ungeprüft erneut ausführen. Das ältere `studio/seed.js` ist ein historischer, überschreibender Import und für normale Aktualisierungen nicht verwenden.

## Hero-Bilder

Die gelieferten PNGs wurden ohne generative Änderungen in WebP konvertiert. Lokale Fallbacks liegen unter `public/hero-desktop-*.webp` und `public/hero-mobile-*.webp`; Herkunft und Konvertierungsparameter stehen in den zugehörigen JSON-Dateien. Im Normalbetrieb werden die in Sanity gewählten Bilder ausgeliefert.

Designbeschreibung: [DESIGN.md](DESIGN.md).
