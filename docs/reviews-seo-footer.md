# Footer, Google reviews and SEO

Implementation handoff for the current Astro homepage. This records implemented behavior, not a new visual system or a deployment confirmation.

## Footer and logo

- `src/pages/index.astro` implements the supplied footer direction: full-width navy (`#09294e`), rounded upper corners, a thin green rim (`#27bf8e`), a quiet road illustration, and a prominent contact invitation.
- The light contact button opens the existing enquiry dialog. WhatsApp, phone and email use the configured contact links. Instagram appears when `site.instagramUrl` is a valid HTTPS URL; its label is CMS-editable.
- Footer copy and navigation come from the frontpage document. Existing process and financing sections remain intact.
- The header uses the configured logo at 72 × 72 px on desktop and 56 × 56 px at the mobile breakpoint (760 px).
- Mobile hero and three trust statements share the first small viewport (`100svh`, minus header and safe-area space), with intrinsic growth for short screens, zoom or longer CMS copy. The portrait is laid out below the copy; no fixed height clips the content. `hero.vehiclesLinkLabel` controls the new vehicle anchor text. Mobile vehicle consultation CTA follows the slider and price note; desktop keeps it above the slider.
- `scripts/build-favicons.mjs` derives PNG favicons from `public/logo.png`, trimming transparent padding and fitting the original artwork on white. Outputs: `favicon-32.png` (32 px), `favicon-96.png` (96 px), and `apple-touch-icon.png` (180 px).

## Live Google reviews

Sources: `src/lib/google-reviews.ts`, `src/lib/reviews.ts`, `src/components/Reviews.astro`.

- `getGoogleReviews()` runs on the server during homepage rendering. It calls Google Places with the configured Place ID and German language preference, with a 3.5-second timeout.
- Set `GOOGLE_PLACES_API_KEY` in the server environment. Runtime `process.env` takes precedence over the build environment. The key is sent in the server request header, never in rendered markup.
- Sanity's frontpage `reviews.enabled` controls visibility; `reviews.useGoogleApi` enables live retrieval; `reviews.placeId` selects the business. With API mode off, the existing source-backed editorial review fields remain available.
- Google Places supplies at most five relevance-selected reviews. The implementation keeps five-star reviews with original text, author and HTTPS source, then renders valid dated entries newest-first **within that selection**. It cannot promise the newest reviews across all Google reviews.
- Live texts are excerpts of at most 25 whitespace-separated words, with an ellipsis when shortened. Cards retain author attribution, profile/avatar links when supplied, dates, and links to the original review. The section identifies Google Maps and links its terms and privacy policy.
- The overall rating and count come from Google's full aggregate, not the selected cards. A summary requires a valid rating, positive count and valid verification date.
- Google content is not persisted to Sanity, files or a shared application cache. The outbound request uses `cache: 'no-store'`; API-mode homepage responses use `Cache-Control: private, no-store`.
- Missing keys, invalid IDs, failed requests, timeouts, or unsupported third-party attributions produce an empty live result rather than sample reviews or a stale aggregate. The configured Google source link remains available when valid.
- The review track supports horizontal scrolling, optional previous/next controls, keyboard navigation, and reduced-motion preferences.

## SEO and discovery

Sources: `src/layouts/Base.astro`, `src/lib/seo.ts`, vehicle detail routes and sitemap routes.

- Canonical URLs use `https://www.autoladen-altesland.de`, stripping query strings and fragments. The shared layout outputs title/description, Open Graph metadata, Twitter large-image cards, PNG icons, and German language/locale metadata.
- Vercel preview deployments receive `noindex, follow`. This is separate from production indexing behavior.
- The homepage emits `AutoDealer` and `WebSite` JSON-LD from existing site/business facts, including Instagram when configured. It intentionally excludes self-serving review markup and unverified opening hours, stock or prices.
- Vehicle pages emit `WebPage`/`Car` data and a two-level `BreadcrumbList`; nonexistent vehicles return HTTP 404. JSON-LD serialization escapes `<` from CMS text.
- `/sitemap-index.xml` points to `/sitemap.xml`. The sitemap is an SSR endpoint containing the homepage, legal pages and vehicles returned by the existing vehicle loader; it is not a build-time-only vehicle list. API and redirect routes are excluded.
- These changes establish technical metadata and discovery endpoints; they do not guarantee indexing, search rankings, rich results, or a Search Console submission.

## CMS update scripts

- `studio/sync-reviews.mjs` adds missing review/footer fields and Instagram settings to existing published/draft documents. It uses `setIfMissing` and revision guards rather than replacing editorial content; it publishes no sample reviews.
- `studio/sync-seo.mjs` updates only missing SEO values or recognized old defaults, preserving independently edited copy. It also uses revision guards.
- Both scripts are non-writing without `--apply`. Before an applied transaction, they write a restricted-permission backup to a newly created temporary directory and print its path. They require the existing Sanity credential setup; no credentials belong in this document.
- These are targeted extension/update scripts, not seed operations. Do not run a seed script to deploy these changes.

## Verification and deployment

- Implementation QA reported `node --test tests/*.test.mjs` and `npm run build` passing. The documentation handoff does not rerun them.
- `tests/seo.test.mjs` requires a running local site at `http://localhost:4321`, or another running origin supplied as `TEST_ORIGIN`. It checks canonical/social metadata, business schema, sitemap routes, PNG assets and missing-vehicle behavior. Review tests cover the supporting review logic.
- Configure `GOOGLE_PLACES_API_KEY` in the intended Vercel server environments before relying on live production reviews; a local key does not configure Vercel.
- Deploy the updated Sanity Studio schemas so editors can access the review switch, Place ID, footer and SEO fields. Apply targeted CMS updates only through the guarded scripts and review their dry-run output first.
- Deploy the website separately and verify the live review response, metadata, icons and sitemap. Committing or pushing this code alone does not confirm those external configuration or deployment steps.
