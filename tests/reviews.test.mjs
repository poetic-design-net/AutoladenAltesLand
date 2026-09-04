import test from 'node:test';
import assert from 'node:assert/strict';
import {
  httpsUrl,
  reviewItems,
  reviewSummary,
  latestFiveStarReviews,
  isReviewDate,
  reviewExcerpt,
} from '../src/lib/reviews.ts';

const source = 'https://share.google/gFobC5DRrZ41b2eUf';
test('Google excerpts are bounded without rewriting the source', () => {
  const words = Array.from({ length: 40 }, (_, index) => `Testwort${index}`);
  assert.equal(reviewExcerpt(words.join(' ')), `${words.slice(0, 25).join(' ')} …`);
  assert.equal(reviewExcerpt('Kurzer Testtext.'), 'Kurzer Testtext.');
});
const fixture = {
  name: 'Testprofil – keine echte Rezension',
  text: 'Nur technische Testdaten.',
  rating: 5,
  date: '2026-09-01',
};

test('missing source content never creates testimonials or aggregate numbers', () => {
  assert.deepEqual(reviewItems([], source), []);
  assert.deepEqual(reviewItems(null, source), []);
  assert.equal(reviewSummary(null, null, ''), null);
  assert.equal(reviewSummary(4.9, 67, ''), null);
  assert.equal(reviewSummary(5, 0, '2026-09-04'), null);
});

test('only valid https links are rendered', () => {
  assert.equal(httpsUrl('javascript:alert(1)'), '');
  assert.equal(httpsUrl('http://example.com'), '');
  assert.equal(httpsUrl(source), source);
  assert.equal(reviewItems([fixture], source)[0].sourceUrl, source);
  assert.deepEqual(reviewItems([fixture], 'javascript:alert(1)'), []);
});

test('the selection contains only dated five-star reviews, newest first', () => {
  const result = latestFiveStarReviews(
    [
      fixture,
      { ...fixture, date: '2026-09-04', rating: 4 },
      { ...fixture, date: '2026-09-03' },
      { ...fixture, date: '' },
      { ...fixture, date: '2026-09-02' },
      { ...fixture, date: '2026-02-31' },
    ],
    source
  );
  assert.deepEqual(
    result.map((item) => item.date),
    ['2026-09-03', '2026-09-02', '2026-09-01']
  );
  assert.ok(result.every((item) => item.rating === 5));
});

test('review names, text and source are retained without marketing rewrites', () => {
  assert.equal(reviewItems([fixture], source)[0].text, fixture.text);
  assert.deepEqual(
    reviewItems(
      [
        { ...fixture, name: '' },
        { ...fixture, text: '' },
        { ...fixture, rating: 6 },
      ],
      source
    ),
    []
  );
});

test('aggregate uses independently supplied totals and a real verification date', () => {
  assert.deepEqual(reviewSummary(4.8, 120, '2026-09-04'), {
    rating: 4.8,
    count: 120,
    date: '2026-09-04',
  });
  assert.equal(reviewSummary(6, 120, '2026-09-04'), null);
  assert.equal(reviewSummary(4.8, 1.5, '2026-09-04'), null);
  assert.equal(reviewSummary(4.8, 120, '2026-02-31'), null);
  assert.equal(isReviewDate('2024-02-29'), true);
  assert.equal(isReviewDate('2026-02-29'), false);
});
