import type { Frontpage } from './content';
import { httpsUrl, reviewExcerpt, type Review } from './reviews';

export type ReviewsContent = Omit<Frontpage['reviews'], 'items' | 'rating' | 'count'> & {
  items: Review[];
  rating: number | null;
  count: number | null;
  live?: boolean;
};

/** Server only. Never persist Google content in Sanity, files, or a shared cache. */
export async function getGoogleReviews(content: Frontpage['reviews']): Promise<ReviewsContent> {
  const fallback: ReviewsContent = { ...content, items: content.items };
  if (!content.enabled || !content.useGoogleApi) return fallback;
  // Runtime environment takes precedence, so production key rotation needs no rebuild.
  const key = process.env.GOOGLE_PLACES_API_KEY || import.meta.env.GOOGLE_PLACES_API_KEY;
  const empty: ReviewsContent = { ...fallback, items: [], rating: null, count: null };
  if (!key || !/^[\w-]+$/.test(content.placeId)) return empty;
  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(content.placeId)}?languageCode=de`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask':
            'rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks,attributions',
        },
        signal: AbortSignal.timeout(3500),
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      console.warn(`[google-reviews] Abruf fehlgeschlagen (HTTP ${response.status}).`);
      return empty;
    }
    const data = await response.json();
    // Avoid displaying a result with third-party attributions we cannot render yet.
    if (data.attributions?.length) return empty;
    const items: Review[] = (Array.isArray(data.reviews) ? data.reviews : []).flatMap(
      (review: any) => {
        const text = review.originalText?.text;
        const name = review.authorAttribution?.displayName;
        const sourceUrl = httpsUrl(review.googleMapsUri);
        if (review.rating !== 5 || typeof text !== 'string' || !name || !sourceUrl) return [];
        return [
          {
            name,
            text: reviewExcerpt(text),
            rating: review.rating,
            date: typeof review.publishTime === 'string' ? review.publishTime.slice(0, 10) : '',
            sourceUrl,
            authorUrl: httpsUrl(review.authorAttribution?.uri),
            avatarUrl: httpsUrl(review.authorAttribution?.photoUri),
          },
        ];
      }
    );
    return {
      ...fallback,
      live: true,
      items,
      rating: typeof data.rating === 'number' ? data.rating : null,
      count: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
      verifiedAt: new Date().toISOString().slice(0, 10),
      sourceUrl:
        httpsUrl(data.googleMapsLinks?.reviewsUri) ||
        httpsUrl(data.googleMapsUri) ||
        content.sourceUrl,
      writeUrl: httpsUrl(data.googleMapsLinks?.writeAReviewUri),
      selectionLabel:
        '5-Sterne-Rezensionen aus der Google-Auswahl · neueste zuerst innerhalb dieser Auswahl',
      note: 'Google liefert bis zu fünf nach Relevanz ausgewählte Rezensionen. Hier siehst du daraus ausschließlich Bewertungen mit fünf Sternen, nach Datum sortiert, als Auszug. Die Gesamtwertung berücksichtigt alle Bewertungen.',
    };
  } catch {
    // Never log an exception/request that might include the credential.
    console.warn('[google-reviews] Abruf nicht verfügbar; der Google-Link bleibt erreichbar.');
    return empty;
  }
}
