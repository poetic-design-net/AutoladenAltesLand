# Dachzelt divider

User-directed extension of the existing homepage, not a redesign. Mode: Persuade. The user supplied the composition and explicitly requested CSS/text/gradient implementation; no new image generation or design-option round is needed.

Place after the process and before financing. The main vehicle workflow remains uninterrupted, followed by an invitation to a different use for the vehicle. Navy left-hand copy field transitions into the supplied lakeside Bulli image, vehicle on the right. White heading and CTA, existing green label and Hugeicons. Mobile stacks copy and the photographic focal region without a viewport-height constraint.

The original reference is `Downloads/ChatGPT Image 4. Sept. 2026, 10_11_53.png`; the user-approved alternative image is `Downloads/ChatGPT Image 4. Sept. 2026, 10_18_54.png`. Its generated scene is illustrative, not a customer photograph. Four original installation photos form a small horizontal gallery with an accessible enlarged view. The promotional award photo is omitted pending verification.

Inventory: banner/photo = supplied raster, responsive WebP; navy overlay/radii/layout = CSS; heading/copy = semantic HTML; tent/arrow/close = existing icon set; inquiry button = existing contact dialog with `dachzelt` topic and `rooftent_contact` source. Text, image, gallery order/alt text and visibility editable in Sanity. No invented pricing, certifications or rental claims.

## Verification / CMS

`node studio/sync-rooftent.mjs` previews the additive sync; `--apply` uploads deduplicated image assets and adds only missing rooftop-tent content and the enquiry topic, with backup and revision checks. Applied on 2026-09-04; rerun confirmed no remaining changes. The Studio schema contains the new Dachzelte group; the hosted Studio still needs its normal code deployment.

Desktop (1440×900), mobile (390×844), horizontal gallery and full-image dialog captured under `.impeccable/review/rooftent-*.png`. Verified next image, Escape, focus restoration, selected enquiry topic and `rooftent_contact` attribution. Astro build and tests pass. Studio builds with `/opt/homebrew/opt/node@22/bin/node node_modules/sanity/bin/sanity build` from `studio`; local Node 26 fails in the existing CLI dependency.

The detector's missing-src warning is intentional: the closed lightbox has no source until an image is selected; JS assigns src/alt before `showModal()`, avoiding a large unused initial download. Original links work without JavaScript. New color/size advisories correspond to the supplied banner design, not unrelated global changes.
