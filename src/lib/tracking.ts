/** Analytics identifiers only: never accept form values or full contact URLs. */
export function trackingId(value: unknown, fallback = ''): string {
  return typeof value === 'string' && /^[a-z][a-z0-9_-]{0,79}$/i.test(value) ? value : fallback;
}

export const campaignKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export function campaignParameters(search: string): Record<string, string> {
  const query = new URLSearchParams(search);
  return Object.fromEntries(
    campaignKeys.flatMap((key) => {
      const value = query.get(key)?.trim();
      // Campaign labels only; reject obvious emails, phone numbers and URL fragments.
      if (
        !value ||
        value.length > 100 ||
        !/^[\p{L}\p{N} _.-]+$/u.test(value) ||
        /\d{7,}/.test(value)
      )
        return [];
      return [[key, value]];
    })
  );
}

export function campaignRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const record = value as Record<string, unknown>;
  const entries = campaignKeys.flatMap((key) =>
    typeof record[key] === 'string' ? [[key, record[key] as string]] : []
  );
  return campaignParameters(new URLSearchParams(entries).toString());
}

export function safePagePath(path: string): string {
  const pathname = path.split(/[?#]/)[0];
  if (['/', '/impressum', '/datenschutz', '/app'].includes(pathname)) return pathname;
  const vehicle = pathname.match(/^\/fahrzeuge\/([a-z0-9_-]+)\/?$/i);
  return vehicle ? `/fahrzeuge/${vehicle[1]}` : '/other';
}

export function linkDetails(href: string, origin: string) {
  try {
    const url = new URL(href, origin);
    if (url.protocol === 'tel:') return { action: 'contact', contact_method: 'phone' };
    if (url.protocol === 'mailto:') return { action: 'contact', contact_method: 'email' };
    if (!['https:', 'http:'].includes(url.protocol)) return { action: 'link' };
    if (['wa.me', 'api.whatsapp.com'].includes(url.hostname))
      return { action: 'contact', contact_method: 'whatsapp' };
    if (url.origin !== origin) return { action: 'outbound', destination: url.hostname };
    if (url.pathname.startsWith('/fahrzeuge/'))
      return {
        action: 'vehicle_view',
        destination: safePagePath(url.pathname),
        vehicle_id: trackingId(url.pathname.split('/')[2]),
      };
    if (url.searchParams.has('anfrage'))
      return { action: 'contact', contact_method: 'form', destination: '/' };
    return {
      action: url.hash ? 'anchor' : 'navigation',
      destination: url.hash
        ? `#${trackingId(url.hash.slice(1), 'section')}`
        : safePagePath(url.pathname),
    };
  } catch {
    return { action: 'link' };
  }
}

export type EventParameters = Record<string, string | number | undefined>;
const allowed = new Set([
  'section',
  'cta_id',
  'action',
  'destination',
  'contact_method',
  'vehicle_id',
  'form_id',
  'form_source',
  'error_type',
  'selection',
  'position',
]);
export function safeEventParameters(values: EventParameters) {
  return Object.fromEntries(
    Object.entries(values).filter(([key, value]) => {
      if (!allowed.has(key)) return false;
      if (typeof value === 'number') return Number.isFinite(value) && value >= 0;
      return typeof value === 'string' && value.length <= 120 && /^[a-z0-9_./#-]*$/i.test(value);
    })
  );
}
