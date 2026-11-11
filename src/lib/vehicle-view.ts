/** Pure vehicle mapping: no imports at runtime, so it also runs under `node --test`. */
import type { Vehicle } from '../data/site';

export type VehicleDetail = Vehicle & { description: string };
type ImageUrl = (image: unknown, width: number, height: number) => string;

export function toVehicle(d: any, url: ImageUrl): VehicleDetail {
  return {
    id: d.id,
    name: d.name,
    kicker: d.kicker ?? '',
    topic: d.topic ?? 'firma',
    status: d.status ?? '',
    tone: d.tone ?? 'green',
    image: d.image ? url(d.image, 1200, 800) : '',
    thumb: d.image ? url(d.image, 640, 400) : '',
    images: (d.gallery ?? []).filter((g: any) => g?.asset).map((g: unknown) => url(g, 1200, 800)),
    alt: d.alt ?? d.name,
    features: d.features ?? [],
    description: d.beschreibung ?? '',
    discount: d.discount ?? '',
    ctaLabel: d.ctaLabel ?? '',
    // Model tiles have no fixed price; an empty value hides the price row everywhere.
    price: { value: d.price ?? '', old: d.priceOld || undefined, terms: d.priceTerms ?? '' },
  };
}

export function vehicleDescription(
  v: Pick<Vehicle, 'name' | 'features' | 'discount' | 'price'>,
  copy: { priceLabel: string; seoText: string }
) {
  return (
    [
      v.features.length ? `${v.name}: ${v.features.join(', ')}` : v.name,
      v.discount,
      v.price.value && `${copy.priceLabel} ${v.price.value}`,
      copy.seoText,
    ]
      .filter(Boolean)
      .map((part) => String(part).replace(/\.$/, ''))
      .join('. ') + '.'
  );
}
