import test from 'node:test';
import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN || 'http://localhost:4321';
test('home has canonical metadata, logo favicons and safe business schema', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /rel="canonical" href="https:\/\/www.autoladen-altesland.de\/"/);
  assert.match(html, /property="og:url" content="https:\/\/www.autoladen-altesland.de\/"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /favicon-96.png/);
  assert.match(html, /apple-touch-icon.png/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  const graph = JSON.parse(json)['@graph'];
  assert.equal(graph[0]['@type'], 'AutoDealer');
  assert.equal(graph[0].address.addressLocality, 'Grünendeich');
  assert.equal(graph[0].aggregateRating, undefined);
  assert.equal(graph[1]['@type'], 'WebSite');
  assert.doesNotMatch(html, /AIza[\w-]{35}/);
});

test('SSR sitemap covers vehicle pages and excludes APIs / redirects', async () => {
  const index = await (await fetch(`${origin}/sitemap-index.xml`)).text();
  assert.match(index, /https:\/\/www.autoladen-altesland.de\/sitemap.xml/);
  const response = await fetch(`${origin}/sitemap.xml`);
  assert.match(response.headers.get('content-type'), /application\/xml/);
  const xml = await response.text();
  const links = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert(links.some((link) => link.includes('/fahrzeuge/')));
  assert(links.every((link) => !link.includes('/api/') && !link.endsWith('/app')));
  for (const link of links) {
    const page = await fetch(`${origin}${new URL(link).pathname}`);
    assert.equal(page.status, 200, link);
  }
});

test('favicon assets serve successfully and missing vehicles return 404', async () => {
  for (const path of ['/favicon-32.png', '/favicon-96.png', '/apple-touch-icon.png']) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /image\/png/);
  }
  assert.equal((await fetch(`${origin}/fahrzeuge/nicht-vorhandenes-fahrzeug`)).status, 404);
});
