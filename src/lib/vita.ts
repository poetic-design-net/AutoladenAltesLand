export type VitaItem = {
  period: string;
  title: string;
  role: string;
  location: string;
  description: string;
};

export type VitaContent = {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  intro: string;
  items: VitaItem[];
};

/** Incomplete CMS records must not create empty or misleading timeline entries. */
export function vitaItems(value: unknown): VitaItem[] {
  if (!Array.isArray(value)) return [];
  const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const entry = {
      period: text(item.period),
      title: text(item.title),
      role: text(item.role),
      location: text(item.location),
      description: text(item.description),
    };
    return entry.period && entry.title && entry.description ? [entry] : [];
  });
}
