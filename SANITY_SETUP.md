# Sanity-Inhalte verwalten

Online-Studio: https://studio-aal.vercel.app — Projekt `dgeh1xh8`, Dataset `production`.

- **Startseite** öffnet direkt das vorhandene Dokument. Die Reiter enthalten SEO, Einstieg, Navigation, Fahrzeuge, Vorteilsleiste, Ablauf, Dachzelte mit Galerie, Leasing/Finanzierung, Google-Bewertungen, Anfrageformular und Footer inklusive FAQ.
- **Über mich** verwaltet die Unterseite `/ueber-mich`: Überschriften, persönlicher Einstieg, Foto und Bildbeschreibung, beliebig erweiterbare Absätze, Beratung, Kontaktabschluss sowie SEO. Logo, Ansprechpartner, Telefonnummer, WhatsApp und Rechtliches stammen weiterhin aus den zentralen Einstellungen. „Mehr über Alex“, die mobile Alex-Navigation und der Footer führen auf diese Seite; das alte Alex-Modal entfällt.
- **Fahrzeuge** verwaltet Angebote, Bilder/Galerien, Beschreibung, Preise, Reihenfolge und Sichtbarkeit. Wenn alle Fahrzeuge ausgeblendet werden, bleibt die Liste leer.
- **Website, Kontakt & Rechtliches** enthält Logo, Kontaktinformationen, Instagram, Fahrzeugdetailseiten-Texte, Unternehmensangaben, Impressum-Beschriftungen und Datenschutzabschnitte. `{{email}}` in Datenschutzabsätzen verwendet die zentrale E-Mail-Adresse.

Änderungen mit **Publish / Veröffentlichen** freigeben. Die Website lädt veröffentlichte Inhalte serverseitig; Entwürfe erscheinen nicht öffentlich. Neue Felder und Studio-Menüs benötigen ein Studio-Deployment, normale Textänderungen nicht.

## Aktuelle Website-Inhalte importieren

Eine Quelle für Starttexte/Bilder: `src/data/content-defaults.json`; Fahrzeuge: `src/data/vehicle-defaults.json`. Der Import verwendet die aktuellen Schemas und erzeugt gültige Bildreferenzen und Array-Schlüssel.

In `studio/.env` muss `SANITY_TOKEN` mit Editor-Rechten stehen. Optional: `SANITY_PROJECT_ID` und `SANITY_DATASET` (Standard oben).

```bash
npm --prefix studio run import          # Vorschau, schreibt nichts
npm --prefix studio run import:apply    # fehlende Inhalte ergänzen
```

Der Import legt fehlende Startseite/Website-Dokumente an, ergänzt fehlende Felder, lädt lokale Bilder hoch und verwendet identische vorhandene Assets erneut. Bestehende Texte, bewusst leere Listen, ausgeschaltete Abschnitte und Entwürfe bleiben erhalten. Ein zweiter Lauf ändert nichts. Beispiel-Fahrzeuge werden nur bei der Ersteinrichtung oder für bereits vorhandene Beispiel-Dokumente übernommen; gelöschte Beispiele werden nicht neu angelegt.

### Über-mich-Seite einrichten

Unter **Über mich → Vita** lassen sich Zeitraum, Station, Tätigkeit, Ort, Beschreibung und Reihenfolge pflegen. Der Abschnitt erscheint nur mit vollständigen Stationen und lässt sich ausschalten. Auf Wunsch wurden drei klar gekennzeichnete Platzhalter direkt im Sanity-Dokument angelegt. Zeiträume, Titel, Tätigkeiten, Orte und Beschreibungen können dort ersetzt werden; die normale Unterseite zeigt diese Inhalte nach „Publish“. Eine separate lokale Vorschau gibt es nicht mehr.

Der Import übernimmt für das neue Dokument `aboutPage` die **veröffentlichten** Texte und das Foto aus dem bisherigen `frontpage.about`. Unveröffentlichte Startseiten-Entwürfe werden nicht übernommen. Bestehende Änderungen an `aboutPage` bleiben erhalten; der alte Inhalt wird nicht gelöscht. Bis das neue Dokument veröffentlicht ist, verwendet die Unterseite die vorhandenen Dialoginhalte, bei einem CMS-Ausfall die lokalen Defaults.

```bash
npm --prefix studio run import -- --only=aboutPage
npm --prefix studio run import:apply -- --only=aboutPage
```

Anschließend Website und Studio veröffentlichen. Die neue Seite lädt Änderungen nach **Publish** ohne Website-Neubau. Die Anfragebuttons öffnen das bestehende Formular auf der Startseite mit dem Thema „Noch offen“ und ohne Fahrzeugbezug.

Vor jedem Schreibdurchlauf entsteht eine lokale Sicherung unter `studio/backups/` (nicht in Git). Änderungen an vorhandenen Dokumenten sind durch ihre Revision gegen gleichzeitige Bearbeitung geschützt. Keine Dokumente werden gelöscht. Alte Dokumenttypen werden nicht mehr im Studio angeboten.

`npm --prefix studio run migrate` ist ebenfalls nur eine Vorschau. Die älteren `sync-*.mjs` sind historische, gezielte Migrationen; für die allgemeine Einrichtung ausschließlich den neuen Import verwenden.

## Entwicklung und Veröffentlichung

Node.js 22 verwenden.

```bash
npm run build
npm --prefix studio run build
node --test tests/cms.test.mjs
```

Das Online-Studio gehört zum Vercel-Projekt **autoladen-studio** im Team **frdrks-projects**. Das andere Projekt namens `studio` ist nicht die Adresse aus der Sanity-Verwaltung.

Website und Studio werden über das GitHub-Repository **poetic-design-net/AutoladenAltesLand** veröffentlicht. Beide Projekte verwenden **main** als Produktionszweig. Das Website-Projekt `autoladen-altes-land` baut aus der Repository-Wurzel, `autoladen-studio` aus dem Unterverzeichnis **studio** mit Node.js 22 und `studio/vercel.json`.

Nach erfolgreichen Tests und Builds den geprüften Stand nach `main` übernehmen und pushen. Vercel baut und veröffentlicht beide Projekte automatisch. Andere Branches erzeugen Vorschauen. Bei Schemaänderungen auch den erfolgreichen Studio-Build prüfen; erst dieser aktualisiert die Online-Eingabefelder. Ein manueller `vercel --prod`-Upload ist im normalen Ablauf nicht nötig.

Die Import-Scripte werden beim Deployment nicht ausgeführt. Bereits veröffentlichte Sanity-Inhalte und redaktionelle Änderungen bleiben erhalten.
