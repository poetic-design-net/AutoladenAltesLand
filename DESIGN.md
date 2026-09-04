---
name: Autoladen Altes Land
description: Current homepage styling, extracted from the implemented customer mockup.
colors:
  primary: "#003366"
  primary-deep: "#00284f"
  footer: "#003566"
  green: "#009966"
  background: "#f5f4f1"
  surface: "#ffffff"
  ink: "#14181c"
  secondary-text: "#4c5660"
  focus: "#3366cc"
typography:
  display:
    fontFamily: "Geist, Manrope, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 62px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
rounded:
  control: "8px"
  hero-button: "10px"
  card: "12px"
  hero: "16px"
spacing:
  small: "12px"
  medium: "20px"
  large: "32px"
components:
  header-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  offer-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
---

# Design System: Autoladen Altes Land

## Overview

The homepage follows the customer-supplied mockup: personal automotive advice on a light ground, real Alex photography, navy actions and restrained green details. This records the current homepage, not a redesign instruction for the separate app or legal pages.

## Colors

Navy carries actions, emphasized headline text and the closing footer. Green marks small identity details and the footer rim. White surfaces sit on the warm light background. Secondary copy uses the established secondary-text token.

## Typography

The homepage overrides the global light-theme font with Geist and Manrope. Headlines use medium-to-semibold weight and tight tracking. Intro headings are 26–34px; vehicle headings are 16–18px. Prices use tabular numerals. Mobile hero typography scales from 25px to 40px.

## Layout

Header and hero have a 1400px maximum width; inner content is capped at 1240px. Desktop horizontal page padding is 40px, mobile padding is 20px. The hero uses separate supplied desktop/mobile WebP assets through a picture element. Text sits in the desktop image's left free space and the mobile image's upper free space.

The plain trust strip has three columns. Intro and offers form one section: the intro heading becomes the vehicle heading, with the introduction and Alex dialog link alongside it on desktop and below it under 1024px. There is no duplicate icon-benefit row or separate “Was gerade geht” heading. Equal-sized vehicle cards form a native horizontal scroll-snap track on every viewport. Its left edge aligns to the 1240px content column; its right edge reaches the viewport. Mobile reveals part of the next card. Previous/next controls appear only when content overflows; touch, trackpad, keyboard arrows and Home/End work without autoplay. Sanity controls the vehicle count and order.

Process and financing retain their existing layouts and behavior; they were expressly excluded from this redesign. Their provider-facing copy now uses Alex’s first-person singular voice. Footer content uses three desktop groups and stacks on mobile.

## Elevation & Depth

Hero and offer cards are flat at rest. Offer-card hover uses a soft offset shadow. Existing form sheets and process/finance buttons retain their established elevation. The mobile bottom bar has a subtle upward shadow.

## Shapes

Cards and hero use gently rounded corners. Small status labels are not interactive chips. The footer has large rounded upper corners with the green/white rim explicitly shown in the customer mockup.

## Components

- Header: linked brand, visible navigation at 1024px and above, WhatsApp and contact action. No desktop drawer or initial mobile bubble menu.
- Hero: supplied imagery, headline, short introduction, primary inquiry action and WhatsApp link. Desktop and mobile imagery are editable in Sanity; Astro derives responsive WebP URLs, with local WebP fallbacks. Never bake copy into images.
- Offers: whole-card links to real vehicle pages; status overlays, current CMS prices and facts. Do not substitute mockup specifications for real data.
- Footer: direct phone/email/WhatsApp links, section links, FAQ/contact dialogs and legal links.
- Dialogs: background inertness, initial focus, Escape closure, Tab containment and focus restoration. FAQ answers use native details/summary.
- Mobile navigation: four section links appear at 150px of vertical scroll on viewports up to 760px wide and hide again below that threshold. Hidden navigation is inert. Active section is identified semantically and visually.
- Icons: existing Hugeicons stroke-rounded set. Parent-scoped Astro styles use `:global(.ic)` when styling the child icon component.

### Rooftop-tent banner and gallery

The local extension after process and before financing pairs a navy copy field with the supplied lakeside Bulli illustration. Heading, copy and pale inquiry button remain semantic HTML; the navy-to-photo transition is CSS. Green eyebrow and focus accents, rounded corners and the existing icon set connect it to the homepage without changing the wider visual system. At 760px and below, copy sits above a separate photographic region; neither this banner nor the spacious mobile homepage hero is forced into one viewport.

Four supplied original installation photos plus a manufacturer award image form a compact horizontal scroll-snap gallery. Photo thumbnails may crop for consistency; the award thumbnail uses `contain` so the seal stays whole. The modal viewer contains the full image. A small source-linked note attributes the verified ntv/DISQ award to Naturbummler, not Alex. Native modal focus containment and Escape closure, arrow-key navigation, focus restoration, visible focus rings and reduced-motion handling remain intact. Photo links still open the images without JavaScript; enlarged images load only when selected.

Sanity's rooftop-tent fields own copy, responsive imagery, gallery order/alt text and visibility, with local defaults. The inquiry opens the existing contact dialog with the `dachzelt` topic and `rooftent_contact` attribution. Preserve the distinction between the illustrative banner and original gallery photos, plus the README and per-image provenance JSON in `public/dachzelte`. The surface brief and verification record live in `docs/dachzelte.md`.

## Do's and Don'ts

- Do retain the supplied logo, Alex imagery, source-backed vehicle data and contact details. Visible homepage content and navigation labels are sourced from Sanity; JSON defaults provide resilience when content is missing.
- Do keep both original PNGs untouched; WebP conversion provenance is stored alongside each new asset.
- Do preserve responsive image selection, focus behavior and reduced-motion support.
- Don't reintroduce an initial mobile menu or pin the process section.
- Don't treat example car photos, dates or prices in generated mockups as authoritative business data.
