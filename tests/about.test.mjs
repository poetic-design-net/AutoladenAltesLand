import test from 'node:test';
import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN || 'http://localhost:4321';

test('about page renders an indexable profile, photo and working contact destinations', async () => {
  const response = await fetch(`${origin}/ueber-mich`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/www.autoladen-altesland.de\/ueber-mich"/);
  const structuredData = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1]
  );
  assert.equal(structuredData['@type'], 'AboutPage');
  assert.equal(structuredData.mainEntity['@type'], 'Person');
  assert.ok(structuredData.mainEntity.name);
  assert.ok(structuredData.description);
  const photo = await fetch(structuredData.mainEntity.image, { signal: AbortSignal.timeout(10000) });
  assert.equal(photo.status, 200);
  assert.ok((await photo.arrayBuffer()).byteLength > 0);
  assert.ok(
    /href="\/\?anfrage=allgemein(?:&amp;|&#38;|&)aal_source=about_contact"/.test(html),
    'The inquiry link must open the general contact form.'
  );
  assert.match(html, /href="\/impressum"/);
  assert.match(html, /href="\/datenschutz"/);
});

test('home links to the about page instead of the retired dialog and sitemap includes it', async () => {
  const home = await (await fetch(origin)).text();
  // Intro, mobile navigation and footer are independent entry points.
  assert.ok((home.match(/href="\/ueber-mich"/g) || []).length >= 3);
  assert.doesNotMatch(home, /data-view="alex"|id="sheet-alex"/);
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  assert.match(sitemap, /<loc>https:\/\/www.autoladen-altesland.de\/ueber-mich<\/loc>/);
});
