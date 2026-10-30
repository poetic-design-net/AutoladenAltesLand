# Vita on the about page

The Vita section extends `/ueber-mich` with a date-led, expandable career ledger.

## Component provenance

- Source: [Experience Timeline Section / Pigment Experience Ledger](https://21st.dev/@kedhareswer/components/pigment-experience-ledger) by **kedhareswer**.
- Retrieved on 2026-10-30 using `21st search "timeline resume career scroll" --context auto` and `21st get 38037 --json` (component ID 21271, demo ID 38037).
- `src/components/VitaTimeline.astro` adapts its two-column year/title layout, expandable description and pigment highlight to this site's typography, spacing, navy and green.
- Native `details`/`summary` replace React state and work without JavaScript. A static SVG texture with short CSS transitions replaces continuous per-row canvas animation. Reduced-motion settings disable transitions. No new framework or runtime dependency was added.

## Content and publication

The **Über mich → Vita** Sanity group owns visibility, headings, introduction, station order, period, title, role, optional location and description. An empty list or disabled section hides the entire Vita. Incomplete records are omitted rather than rendered as empty controls.

No dated biographical facts were present in the supplied project. Therefore defaults and the Sanity import intentionally contain **no example career history**. Add Alexander's confirmed station details and publish to show the real Vita.

For design review only, the local development URL `/ueber-mich?vita-vorschau=1#vita` displays a clearly labelled example structure. `src/data/vita-preview.ts` is imported only in development; this query cannot activate sample entries in production. Never import this fixture into Sanity.

```sh
npm --prefix studio run import -- --only=aboutPage
npm --prefix studio run import:apply -- --only=aboutPage
```

Existing biography, editorial edits and visibility choices are preserved. Deploy the Studio schema as well as the website code to expose the new fields online.
