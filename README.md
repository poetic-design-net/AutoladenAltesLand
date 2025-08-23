# Autoladen Altes Land - Website mit Sanity CMS

## 📋 Übersicht

Moderne Landingpage für ein Autohandelsunternehmen mit Fokus auf Elektromobilität, verbunden mit Sanity CMS für dynamisches Content Management.

## 🚀 Setup

### 1. Sanity Projekt erstellen

1. Gehen Sie zu [sanity.io](https://sanity.io) und erstellen Sie einen Account
2. Erstellen Sie ein neues Projekt
3. Notieren Sie sich die **Project ID** und den **Dataset Namen** (normalerweise "production")

### 2. Sanity Studio einrichten

```bash
# In einem separaten Ordner (z.B. sanity-studio)
npm create sanity@latest

# Wählen Sie:
# - "Create new project"
# - Geben Sie Ihrem Projekt einen Namen
# - Wählen Sie "Clean project with no predefined schemas"
```

### 3. Schemas zu Sanity Studio hinzufügen

Kopieren Sie alle Dateien aus dem `sanity-studio/schemas/` Ordner in Ihr Sanity Studio Projekt:

- `hero.js` - Hero Section Content
- `angebot.js` - Angebote/Services
- `fahrzeug.js` - Fahrzeuge/Vehicles  
- `kontakt.js` - Kontaktinformationen
- `siteSettings.js` - Allgemeine Website-Einstellungen

### 4. Frontend konfigurieren

1. Öffnen Sie `sanity-config.js`
2. Ersetzen Sie `YOUR_PROJECT_ID` mit Ihrer tatsächlichen Sanity Project ID:

```javascript
export const sanityConfig = {
  projectId: 'abc123xyz', // Ihre Project ID hier
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
};
```

3. Öffnen Sie auch `js/sanity-client.js` und aktualisieren Sie die Project ID dort.

### 5. Content in Sanity erstellen

1. Starten Sie Sanity Studio:
```bash
cd sanity-studio
npm run dev
```

2. Öffnen Sie http://localhost:3333 und erstellen Sie:
   - **Hero Section**: Titel, Untertitel, Buttons, Bild
   - **Angebote**: Mindestens 6 verschiedene Services
   - **Fahrzeuge**: Optional - Highlight-Fahrzeuge
   - **Kontakt**: Firmeninformationen, Öffnungszeiten
   - **Site Settings**: Navigation, Farben, Meta-Informationen

### 6. Website starten

```bash
# Im Hauptprojekt-Ordner
npm install

# Für lokale Entwicklung mit Live-Reload
npx live-server
```

Öffnen Sie `index-dynamic.html` für die Sanity-verbundene Version.

## 📁 Projektstruktur

```
/AutoladenAltesLand
├── index.html              # Statische Version (ohne Sanity)
├── index-dynamic.html      # Dynamische Version (mit Sanity)
├── kontakt.html           # Kontaktseite
├── /js
│   ├── sanity-client.js  # Sanity Client & Queries
│   └── app.js             # Hauptanwendungslogik
├── /sanity-studio
│   └── /schemas           # Sanity Content-Schemas
├── /dist
│   └── output.css         # Kompiliertes Tailwind CSS
└── /src
    └── input.css          # Tailwind Eingabedatei
```

## 🎨 Features

### Content Management
- **Hero Section**: Dynamischer Titel, Bild und CTAs
- **Angebote**: Bis zu 6 Services mit Icons und Beschreibungen
- **Fahrzeuge**: Featured Elektrofahrzeuge mit Details
- **Kontaktdaten**: Zentral verwaltete Kontaktinformationen
- **Site Settings**: Navigation, Farben, SEO-Einstellungen

### Design & UX
- Responsives Design (Mobile-First)
- Moderne Animationen und Micro-Interactions
- Optimierte Performance und Accessibility
- SEO-optimiert mit Meta-Tags
- Lazy Loading für Bilder

### Technologie
- **Sanity CMS**: Headless CMS für Content
- **Tailwind CSS**: Utility-First CSS Framework
- **Vanilla JavaScript**: Keine Framework-Abhängigkeiten
- **ES6 Modules**: Moderne JavaScript-Module

## 🔧 Anpassungen

### Farben ändern
In Sanity Studio unter "Site Settings" können Sie die Primär- und Sekundärfarben anpassen.

### Navigation bearbeiten
Fügen Sie neue Navigationspunkte in Sanity Studio unter "Site Settings" > "Navigation" hinzu.

### Neue Angebote hinzufügen
Erstellen Sie neue "Angebote" Dokumente in Sanity Studio mit:
- Titel
- Beschreibung
- Icon (aus vordefinierter Liste)
- Gradient-Farben
- Reihenfolge (1-6)

## 📝 Deployment

### Sanity Studio
```bash
cd sanity-studio
npm run deploy
```
Ihr Studio ist dann unter `https://[projektname].sanity.studio` erreichbar.

### Frontend
Die HTML-Dateien können auf jedem statischen Hosting-Service gehostet werden:
- Netlify
- Vercel
- GitHub Pages
- oder traditionelles Web-Hosting

**Wichtig**: Stellen Sie sicher, dass die Sanity Project ID in den JavaScript-Dateien korrekt konfiguriert ist.

## 🔒 Sicherheit

- Sanity Project ID ist öffentlich sichtbar (das ist normal und sicher)
- Verwenden Sie KEINE privaten API-Tokens im Frontend-Code
- Für private Datasets nutzen Sie Server-Side Rendering oder API-Routes

## 📞 Support

Bei Fragen zur Einrichtung oder Anpassung wenden Sie sich an Ihren Entwickler oder konsultieren Sie die [Sanity Dokumentation](https://www.sanity.io/docs).