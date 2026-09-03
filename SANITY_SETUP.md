# Sanity

Das Studio verwendet das Projekt `dgeh1xh8` und das Dataset `production`.

## Inhalte pflegen

```bash
cd studio
npm install
npm run dev
```

Im Studio gibt es drei klar getrennte Bereiche:

- **Startseite** – alle Texte und Bilder der Frontpage, inklusive SEO, Einstieg, Fahrzeugbereich, Ablauf, Leasing/Finanzierung, Alex-Dialog, Anfrageformular und Footer.
- **Fahrzeuge** – Fahrzeugkarten und Fahrzeugdetailseiten.
- **Website** – Logo, Markenname, Kontaktangaben, Fahrzeuganzahl und allgemeiner Preis-Hinweis.

`Startseite` und `Website` sind Singletons. Sie können nicht versehentlich dupliziert oder gelöscht werden.

## Aktuellen Ausgangsstand erneut übertragen

In `studio/.env` muss ein Editor-Token stehen:

```dotenv
SANITY_TOKEN=...
```

Danach:

```bash
cd studio
npm run migrate
```

Die Migration ist wiederholbar. Sie übernimmt den in `seed.js` festgehaltenen Ausgangsstand, verwendet bereits hochgeladene Bilder erneut und entfernt Dokumente der alten, nicht mehr verwendeten Schemas.

> Nach der erstmaligen Migration Inhalte regulär im Studio bearbeiten. Ein erneuter Migrationslauf setzt die fünf Ausgangsdokumente wieder auf den Stand aus `seed.js`.

## Builds

```bash
# Website
npm run build

# Studio
cd studio
npm run build
```

Für das Studio Node.js 22 verwenden.
