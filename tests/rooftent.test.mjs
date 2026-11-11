import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

test('CMS outage fallback includes a selectable rooftop-tent enquiry topic', async () => {
  const { fallbackFrontpage } = JSON.parse(
    await readFile(new URL('../src/data/content-defaults.json', import.meta.url), 'utf8')
  );
  assert.equal(fallbackFrontpage.rooftent.enabled, true);
  assert.deepEqual(
    fallbackFrontpage.form.topics.find((topic) => topic.id === 'dachzelt'),
    {
      id: 'dachzelt',
      label: 'Dachzelt',
    }
  );
});

test('rooftent defaults keep original photos and an attributed manufacturer award image', async () => {
  const {
    fallbackFrontpage: { rooftent },
  } = JSON.parse(
    await readFile(new URL('../src/data/content-defaults.json', import.meta.url), 'utf8')
  );
  assert.equal(rooftent.enabled, true);
  assert.equal(rooftent.gallery.length, 5);
  assert.equal(rooftent.gallery[4].fit, 'contain');
  assert.match(rooftent.gallery[4].alt, /Auszeichnung des Herstellers/);
  assert.equal(rooftent.awardSourceUrl, 'https://disq.de/qualitaets-sieger.html');
  assert.match(rooftent.text, /Bei mir/);
  assert.equal(rooftent.topicLabel, 'Dachzelt');
  for (const item of [
    { image: rooftent.image, thumbnail: rooftent.imageSmall },
    ...rooftent.gallery,
  ]) {
    for (const path of [item.image, item.thumbnail]) {
      assert.match(path, /^\/dachzelte\/[a-z0-9-]+\.webp$/);
      const file = new URL(`../public${path}`, import.meta.url);
      assert.ok((await stat(file)).size < 250000);
      assert.ok((await stat(new URL(`${file.href}.json`))).size > 0);
    }
  }
});

test('rooftop tents live on their own page; the homepage only links there', async () => {
  const origin = process.env.TEST_ORIGIN || 'http://localhost:4321';
  const response = await fetch(`${origin}/dachzelte`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /href="\/\?anfrage=dachzelt&(amp;)?aal_source=rooftent_contact"/);
  assert.match(html, /data-track-id="rooftent_contact"/);
  assert.equal((html.match(/data-gallery-image/g) || []).length, 5);
  assert.match(html, /data-fit="contain"/);
  assert.match(html, /rooftent_award_source/);
  assert.match(html, /class="viewer"/);
  // Static tent images share the /dachzelte/ path prefix with the page.
  const image = await fetch(`${origin}/dachzelte/dachzelt-bulli-see-800.webp`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type') || '', /image\/webp/);

  const home = await (await fetch(`${origin}/`)).text();
  assert.doesNotMatch(home, /id="dachzelte"/);
  assert.doesNotMatch(home, /data-gallery-image/);
  assert.match(home, /href="\/dachzelte"/);
  assert.match(home, /data-val="dachzelt"/);
  assert.ok(home.indexOf('id="ablauf"') < home.indexOf('id="finanzierung"'));
});
