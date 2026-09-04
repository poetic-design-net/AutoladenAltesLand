/** Render only source-backed reviews. Empty CMS content must never become sample testimonials. */
export type Review = {
  name: string;
  rating: number;
  text: string;
  date: string;
  sourceUrl: string;
  authorUrl?: string;
  avatarUrl?: string;
};

export function isReviewDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function httpsUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

export function reviewItems(value: unknown, sourceUrl: string): Review[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const name = typeof item.name === 'string' ? item.name.trim() : '';
    const text = typeof item.text === 'string' ? item.text.trim() : '';
    const rating = Number(item.rating);
    const url = httpsUrl(item.sourceUrl) || httpsUrl(sourceUrl);
    if (!name || !text || !url || !Number.isInteger(rating) || rating < 1 || rating > 5) return [];
    return [
      {
        name,
        text,
        rating,
        date: typeof item.date === 'string' ? item.date : '',
        sourceUrl: url,
        ...(httpsUrl(item.authorUrl) ? { authorUrl: httpsUrl(item.authorUrl) } : {}),
        ...(httpsUrl(item.avatarUrl) ? { avatarUrl: httpsUrl(item.avatarUrl) } : {}),
      },
    ];
  });
}

export function reviewExcerpt(text: string) {
  const words = text.trim().split(/\s+/);
  return words.length > 25 ? `${words.slice(0, 25).join(' ')} …` : text.trim();
}

export function reviewSummary(rating: unknown, count: unknown, verifiedAt: unknown) {
  // Date and both numbers are required: a few curated cards are not an aggregate rating.
  const score = Number(rating);
  const total = Number(count);
  const date = typeof verifiedAt === 'string' ? verifiedAt : '';
  if (
    score < 1 ||
    score > 5 ||
    !Number.isFinite(score) ||
    !Number.isInteger(total) ||
    total < 1 ||
    !isReviewDate(date)
  )
    return null;
  return { rating: score, count: total, date };
}

export function latestFiveStarReviews(value: unknown, sourceUrl: string): Review[] {
  return reviewItems(value, sourceUrl)
    .filter((item) => item.rating === 5 && isReviewDate(item.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}
