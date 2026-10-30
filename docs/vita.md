# Vita on the about page

The Vita section extends `/ueber-mich` with a date-led, expandable career ledger.

## Component provenance

- Source: [Experience Timeline Section / Pigment Experience Ledger](https://21st.dev/@kedhareswer/components/pigment-experience-ledger) by **kedhareswer**.
- Retrieved on 2026-10-30 using `21st search "timeline resume career scroll" --context auto` and `21st get 38037 --json` (component ID 21271, demo ID 38037).
- `src/components/VitaTimeline.astro` adapts its two-column year/title layout, expandable description and pigment highlight to this site's typography, spacing, navy and green.
- Native `details`/`summary` replace React state and work without JavaScript. A static SVG texture with short CSS transitions replaces continuous per-row canvas animation. Reduced-motion settings disable transitions. No new framework or runtime dependency was added.

## Content and publication

The **Über mich → Vita** Sanity group owns visibility, headings, introduction, station order, period, title, role, optional location and description. An empty list or disabled section hides the entire Vita. Incomplete records are omitted rather than rendered as empty controls.

At the user's explicit request on 2026-10-30, the Sanity document contains three clearly labelled placeholders: Ausbildung, Berufliche Station and Autoladen Altes Land. Each uses a non-factual period such as “Zeitraum ergänzen” and editable placeholder copy. They render on the normal `/ueber-mich` route and can be replaced in **Über mich → Vita**.

The former development-only fixture and query override have been removed. All versions of the page now read the same Sanity fields. Local fallback defaults intentionally keep an empty list so a regular import never reintroduces deleted placeholders or replaces an authored Vita.

```sh
npm --prefix studio run import -- --only=aboutPage
npm --prefix studio run import:apply -- --only=aboutPage
```

Existing biography, editorial edits and visibility choices are preserved. Deploy the Studio schema as well as the website code to expose the new fields online.
