# 🚀 Sanity Projekt Setup - Schritt für Schritt

## Option 1: Über das Terminal (Empfohlen)

1. **Terminal öffnen** und ins Studio-Verzeichnis wechseln:
```bash
cd /Users/frederikkarschuk/Projects/AutoladenAltesLand/studio
```

2. **Sanity initialisieren**:
```bash
sanity init --bare
```

3. **Bei den Prompts**:
   - Wählen Sie: **"Create new project"** (mit Pfeiltasten und Enter)
   - Project name: **"Autoladen Altes Land"**
   - Organization: Wählen Sie Ihre Organisation oder erstellen Sie eine neue
   - Visibility: **Public** (empfohlen für Client-Side Access)

4. **Project ID notieren**: 
   Nach der Erstellung zeigt Sanity Ihre Project ID an (z.B. `abc123xyz`)

## Option 2: Über Sanity.io Website

1. **Browser öffnen** und zu [sanity.io/manage](https://sanity.io/manage) gehen

2. **"Create Project" klicken**

3. **Projekt-Details eingeben**:
   - Project Name: **Autoladen Altes Land**
   - Dataset: **production**
   - Visibility: **Public**

4. **Project ID kopieren** (wird in der URL und im Dashboard angezeigt)

## Nach der Projekt-Erstellung

### 1. Project ID in Studio-Dateien eintragen

Öffnen Sie folgende Dateien und ersetzen Sie `TEMP_PROJECT_ID` mit Ihrer echten Project ID:

**`studio/sanity.config.js`**:
```javascript
projectId: 'IhreProjectID', // z.B. 'abc123xyz'
```

**`studio/sanity.cli.js`**:
```javascript
projectId: 'IhreProjectID', // z.B. 'abc123xyz'
```

### 2. Project ID im Frontend eintragen

**`sanity-config.js`**:
```javascript
export const sanityConfig = {
  projectId: 'IhreProjectID', // Hier eintragen
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
};
```

**`js/sanity-client.js`**:
```javascript
const client = createClient({
  projectId: 'IhreProjectID', // Hier auch eintragen
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

### 3. Studio starten

```bash
cd studio
npm run dev
```

Das Studio läuft dann unter: http://localhost:3333

### 4. Content erstellen

Im Sanity Studio können Sie nun Inhalte erstellen:

1. **Hero Section**: 
   - Titel: "Fahren Sie in die"
   - Highlighted Text: "Zukunft"
   - Subtitle: Ihre Beschreibung
   - Buttons konfigurieren
   - Bild hochladen

2. **Angebote** (6 Stück):
   - Fahrzeugverkauf
   - Ladeinfrastruktur
   - Beratung
   - Finanzierung & Leasing
   - Service & Wartung
   - Probefahrten

3. **Kontakt**:
   - Firmenname: Autoladen Altes Land
   - Adresse, Telefon, E-Mail
   - Öffnungszeiten

4. **Site Settings**:
   - Navigation
   - Farben
   - SEO-Einstellungen

### 5. Frontend testen

Öffnen Sie `index-dynamic.html` in einem Browser. Die Inhalte werden automatisch von Sanity geladen!

## 🎉 Fertig!

Ihre Website ist jetzt mit Sanity CMS verbunden. Alle Änderungen im Studio werden live auf der Website angezeigt.

## Troubleshooting

**CORS-Fehler?**
- Gehen Sie zu [sanity.io/manage](https://sanity.io/manage)
- Wählen Sie Ihr Projekt
- Gehen Sie zu Settings → API → CORS Origins
- Fügen Sie `http://localhost` und Ihre Domain hinzu

**Keine Daten?**
- Prüfen Sie die Project ID in allen Dateien
- Stellen Sie sicher, dass Content im Studio erstellt wurde
- Öffnen Sie die Browser-Konsole für Fehlermeldungen