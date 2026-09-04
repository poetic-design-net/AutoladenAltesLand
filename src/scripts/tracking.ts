import {
  campaignParameters,
  campaignRecord,
  safeEventParameters,
  safePagePath,
  trackingId,
  linkDetails,
  type EventParameters,
} from '../lib/tracking';

declare global {
  interface Window {
    dataLayer?: unknown[];
    AutoladenTracking?: { setConsent: (granted: boolean) => void };
  }
}

const STORAGE_KEY = 'aal_campaign_v1';
let consent = false;
let initialized = false;
let source = 'direct';
let campaign: Record<string, string> = {};
let sectionObserver: IntersectionObserver | undefined;
const seenSections = new Set<string>();

/** A CMP must explicitly grant analytics consent on each page. No pre-consent replay. */
export function track(event: string, parameters: EventParameters = {}) {
  if (!consent || !trackingId(event)) return;
  window.dataLayer ??= [];
  window.dataLayer.push({
    event,
    schema_version: '1',
    page_path: safePagePath(location.pathname),
    // Nulls prevent GTM's data model retaining parameters from a previous event.
    section: null,
    cta_id: null,
    action: null,
    destination: null,
    contact_method: null,
    vehicle_id: null,
    form_id: null,
    form_source: null,
    error_type: null,
    selection: null,
    position: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    ...campaign,
    ...safeEventParameters(parameters),
  });
}

export function setFormSource(value: unknown) {
  source = trackingId(value, 'direct');
}
export function formSource() {
  return source;
}
export function formAttribution() {
  return { source, ...(consent ? { campaign: { ...campaign } } : {}) };
}

function setConsent(granted: boolean) {
  const wasGranted = consent;
  consent = granted === true;
  if (!consent) {
    campaign = {};
    sectionObserver?.disconnect();
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* Storage may be blocked. */
    }
    // This is a control signal for the CMP/GTM, not an analytics event.
    if (wasGranted)
      window.dataLayer?.push({ event: 'aal_consent_update', analytics_consent: 'denied' });
    return;
  }
  if (wasGranted) return;
  campaign = campaignParameters(location.search);
  try {
    if (!Object.keys(campaign).length) {
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
      campaign = campaignRecord(stored);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(campaign));
  } catch {
    /* Consent works even without browser storage. */
  }
  window.dataLayer ??= [];
  window.dataLayer.push({ event: 'aal_consent_update', analytics_consent: 'granted' });
  track('aal_page_view');
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const section = trackingId((entry.target as HTMLElement).dataset.trackSection);
        if (entry.isIntersecting && section && !seenSections.has(section)) {
          seenSections.add(section);
          track('aal_section_view', { section });
        }
      }
    },
    { threshold: 0.25 }
  );
  document
    .querySelectorAll('[data-track-section]')
    .forEach((element) => sectionObserver?.observe(element));
}

export function initTracking() {
  if (initialized) return;
  initialized = true;
  // Exposes only consent control, never form data. Tag loading belongs to the consent-managed container.
  window.AutoladenTracking = { setConsent };
  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('a, button, summary');
      if (!element || element.closest('[data-track-ignore]') || element.matches(':disabled'))
        return;
      const section = trackingId(
        element.closest<HTMLElement>('[data-track-section]')?.dataset.trackSection,
        'page'
      );
      let details: EventParameters = { action: 'interaction' };
      if (element instanceof HTMLAnchorElement)
        details = linkDetails(element.href, location.origin);
      else if (element.dataset.view)
        details = { action: 'dialog_open', destination: trackingId(element.dataset.view) };
      else if (element.hasAttribute('data-close')) details = { action: 'dialog_close' };
      else if (element.dataset.val)
        details = { action: 'selection', selection: trackingId(element.dataset.val) };
      else if (element.matches('[data-slider-prev], .review-prev, [data-dir="-1"]'))
        details = { action: 'slider_previous' };
      else if (element.matches('[data-slider-next], .review-next, [data-dir="1"]'))
        details = { action: 'slider_next' };
      else if (element.tagName === 'SUMMARY') details = { action: 'disclosure' };
      else if (element.getAttribute('type') === 'submit') details = { action: 'submit_click' };
      const ctaId = trackingId(element.dataset.trackId, `${section}_${details.action}`);
      track('aal_click', {
        section,
        cta_id: ctaId,
        ...details,
        ...(element.dataset.trackVehicle
          ? { vehicle_id: trackingId(element.dataset.trackVehicle) }
          : {}),
      });
    },
    { capture: true }
  );
}
