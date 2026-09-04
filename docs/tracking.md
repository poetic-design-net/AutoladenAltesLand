# Measurement plan (GA4 / Google Tag Manager)

## Current state

The site has stable interaction identifiers, a consent-gated data layer and form attribution. It does **not yet load Google Analytics or GTM**: the container/measurement ID and consent-managed integration are still required. Adding attributes alone is not a live Analytics connection.

The tracking layer does not change visual styling. All pages using `Base.astro` initialize one delegated click listener, covering header, hero, navigation, vehicles, process, financing, reviews, footer, legal links and dialog controls. Newly added links/buttons inside a tagged section inherit its section identifier; give important CTAs an explicit `data-track-id`.

## Consent integration contract

1. Use the site's CMP to load the chosen GTM container / Google tag only after analytics consent (basic consent mode). Do not add an unconditional script or noscript iframe.
2. After the site's scripts are initialized, call `window.AutoladenTracking.setConsent(true)` for granted analytics consent, on every page. On revocation call it with `false`, and update the Google/CMP consent state too. This API gates the **site's events only**, not arbitrary third-party tags.
3. Default analytics and advertising consent to denied in the CMP. Analytics consent must not grant ad storage, ad user data, or ad personalization. GTM consent templates must use `setDefaultConsentState` / `updateConsentState` as documented by Google.
4. Provide a persistent, keyboard-accessible way to change consent. Update the privacy information for the actual Google configuration before activating it.

No page/click/form analytics events or campaign session storage are created before consent; earlier clicks are not replayed. The consent bridge emits `aal_consent_update` as a control signal. Revocation stops this site's events and deletes its campaign session entry. CMP/vendor cookies and tag shutdown remain the integration's responsibility.

## Events and parameters

| Event | Meaning |
| --- | --- |
| `aal_page_view` | Current page after analytics consent |
| `aal_section_view` | A tagged section first reaches 25% visibility on this page |
| `aal_click` | Link, button, slider control, selection or disclosure activation |
| `aal_form_open` | Contact dialog opens; carries the initiating CTA |
| `aal_form_start` | First input event after opening (not automatic focus) |
| `aal_form_submit` | Valid submission attempt |
| `aal_form_error` | Validation or delivery failure; no error message text |
| `aal_form_close` | Closed, abandoned after input, or completed |
| `generate_lead` | Server has confirmed successful submission |

Common fields: `schema_version`, `page_path`, `section`, `cta_id`, `action`, `destination`, `contact_method`, `vehicle_id`, `form_id`, `form_source`, `error_type`, `selection`, `position`; absent event-specific fields are reset to null to avoid stale GTM values.

Examples of form sources: `header_contact`, `hero_contact`, `vehicles_contact_desktop`, `vehicles_contact_mobile`, `process_contact`, `finance_contact`, `footer_contact`, `alex_dialog_contact`, `faq_dialog_contact`, `vehicle_detail_contact`. Vehicle detail request links carry `aal_source=vehicle_detail_contact`; this does not replace UTM campaign attribution. Successful lead events are not fired for telephone or WhatsApp clicks: those only prove an intent to contact.

Incoming `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term` are allowlisted and retained across same-tab pages in session storage **after consent only**. Internal links receive no UTM tags. Do not place names, email addresses, phone numbers, or other personal information in marketing campaign labels. The filter rejects obvious email/phone values but cannot infer whether an ordinary word is a person's name.

No input values, names, messages, email addresses, telephone numbers, reviewer names, full external URLs, full query strings, or click IDs are included in analytics payloads. The enquiry email carries the initiating CTA, plus permitted campaign labels only when consent was granted. Client attribution is descriptive, not trusted authentication data.

## GTM / GA4 setup still required

- Supply the actual `GTM-…` container ID or `G-…` measurement ID; do not install both independently, which would duplicate measurement.
- Configure a consent initialization tag with the CMP. Map `aal_page_view` to GA4 `page_view`, custom `aal_*` events to their event names, and `generate_lead` to the GA4 key event.
- Register the reporting dimensions needed for `section`, `cta_id`, `form_source`, `vehicle_id`, and `contact_method` in GA4. Map the UTM values to campaign fields as appropriate.
- For privacy-safe page measurement, set `page_location` from the canonical origin plus `page_path`, not the raw URL. Do not send raw referrers, contact links or form text. Disable automatic/enhanced form tracking and duplicate page views before publishing the container.
- Verify in Tag Assistant and GA4 DebugView: reject → no vendor requests/events; accept → one page view; each CTA → correct section; server success → one lead; failure → no lead; revoke → no further measurement.

## Tests

`node --test tests/tracking.test.mjs` checks payload allowlists, campaign sanitization and destination redaction. Browser verification must intercept `/api/contact` for submission scenarios so no test email reaches Alex. A local data-layer assertion is not proof of delivery into GA4; that requires the configured property/container.

Local browser verification (2026-09-04): no pre-consent events/storage; correct hero CTA attribution after consent; validation and mocked delivery failure produce no lead; mocked success produces exactly one lead even on double submission; no phone input in the event payload; revocation stops events and clears campaign storage. All contact requests were intercepted in the test browser, not delivered.

Primary references: [Google consent integration](https://developers.google.com/tag-platform/security/guides/consent), [GTM data layer](https://developers.google.com/tag-platform/tag-manager/datalayer), [avoiding PII in Analytics](https://support.google.com/analytics/answer/6366371).
