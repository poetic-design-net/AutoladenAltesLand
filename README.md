# Autoladen Altes Land

Astro-Website mit Sanity Studio. Inhalte kommen aus dem Sanity-Projekt `dgeh1xh8`, Dataset `production`.

## Inhalte verwalten

Studio: https://studio-aal.vercel.app

Unter **Startseite**:
- **Navigation**: Desktop-Links, Kontaktbutton und Beschriftung/Reihenfolge der mobilen Bottom-Navigation.
- **Einstieg**: Desktop- und Mobile-Hero-Grafik, Alternativtext, Überschrift, Einleitung und Buttons.
- **Vorstellung & Vorteile**: Intro, drei Aussagen unter dem Hero und drei Vorteile inklusive Symbol.
- **Fahrzeuge**, **Ablauf** (3 bis 5 Schritte), **Leasing & Finanzierung**, **Anfrage**: jeweilige Texte und Beschriftungen. Die Alex-Leiste steht unter **Einstieg**.
- **Dachzelte**: Inhalte der Unterseite `/dachzelte` sowie Hinweis und Footer-Link auf der Startseite.
- **Footer**: Abschlusssatz, Links, WhatsApp-Beschriftung und Fragen & Antworten.

Unter **Website**: Logo, Name, Telefonnummer, WhatsApp, E-Mail und Preis-Hinweis.
Unter **Fahrzeuge**: Bilder, Nachlass-Hinweis oder Preis (beides optional), Button-Text, Verfügbarkeit, Merkmale und Sortierung.
Unter **Über mich → Vita**: die Stationen der Timeline mit Zeitraum, Tätigkeit, Ort, Beschreibung und Reihenfolge. Die drei gekennzeichneten Platzhalter können direkt ersetzt werden.

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

## Veröffentlichung über GitHub

Beide Vercel-Projekte sind mit `poetic-design-net/AutoladenAltesLand` verbunden und veröffentlichen automatisch nach einem Push auf **`main`**:

| Anwendung | Vercel-Projekt | Root Directory | Live-Adresse |
| --- | --- | --- | --- |
| Website | `autoladen-altes-land` | Repository-Wurzel | https://autoladen-altes-land.vercel.app |
| Sanity Studio | `autoladen-studio` | `studio` | https://studio-aal.vercel.app |

Andere Branches, beispielsweise `relaunch`, erzeugen Vorschau-Deployments. Einen geprüften Stand nach `main` übernehmen und pushen; anschließend die Deployment-Ergebnisse beider Projekte prüfen. Ein separater manueller CLI-Upload ist nicht erforderlich. Sanity-Inhaltsimporte sind kein Build-Schritt und laufen beim Deployment nicht erneut.

## Inhalte der Review-Runde (November 2026)

`src/data/content-defaults.json` enthält die Fallback-Texte, `src/data/vehicle-defaults.json` die acht Modell-Kacheln. `src/lib/content.ts` verbindet die Fallbacks mit den veröffentlichten Sanity-Inhalten.

```sh
node studio/sync-revision.mjs                    # Vorschau: alt → neu je Feld, schreibt nichts
node studio/sync-revision.mjs --apply            # Texte setzen, Kacheln versteckt anlegen
node studio/sync-revision.mjs --apply --golive   # Platzhalter aus, Kacheln an, Preis-Hinweis neu
```

Reihenfolge: **erst Code und Studio live, dann Inhalte.** Der alte Code kann weder drei Ablauf-Schritte noch Fahrzeuge ohne Preis darstellen. Das Skript benötigt `SANITY_TOKEN` in `studio/.env`, sichert nach `studio/backups/` und ersetzt nur Texte, die noch dem früheren Standard entsprechen; im Studio geänderte Stellen meldet es und lässt sie stehen (`--force` überschreibt). Es ist ein einmaliger Import, kein Deployment-Schritt.

Endzustand ohne Sanity ansehen: `SANITY_DATASET=vorschau npm run dev` erzwingt die lokalen Fallbacks samt acht Kacheln.

Das frühere `studio/sync-homepage.mjs` wurde entfernt; mit den neuen Standardwerten hätte ein erneuter Lauf Inhalte beschädigt.

## Hero-Bilder

Die gelieferten PNGs wurden ohne generative Änderungen in WebP konvertiert. Lokale Fallbacks liegen unter `public/hero-desktop-*.webp` und `public/hero-mobile-*.webp`; Herkunft und Konvertierungsparameter stehen in den zugehörigen JSON-Dateien. Im Normalbetrieb werden die in Sanity gewählten Bilder ausgeliefert.

Designbeschreibung: [DESIGN.md](DESIGN.md).
