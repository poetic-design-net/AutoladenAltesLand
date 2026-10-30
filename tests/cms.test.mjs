import test from 'node:test';
import assert from 'node:assert/strict';
import { fillMissing, toSanity } from '../studio/import-utils.mjs';
import page from '../studio/schemas/frontpage.js';
import settings from '../studio/schemas/siteSettings.js';
import aboutPage from '../studio/schemas/aboutPage.js';
import { readFile } from 'node:fs/promises';

test('import preserves edits, false, zero and deliberately empty arrays/text', () => {
  const existing = {
    title: 'Edited',
    enabled: false,
    count: 0,
    items: [],
    note: '',
    nested: { text: 'Mine' },
  };
  const filled = fillMissing(existing, {
    title: 'Old',
    enabled: true,
    count: 3,
    items: ['sample'],
    note: 'old',
    nested: { text: 'Old', added: 'New' },
  });
  assert.deepEqual(filled, { ...existing, nested: { text: 'Mine', added: 'New' } });
  assert.deepEqual(existing.nested, { text: 'Mine' });
});

test('all default content converts to schema fields with stable keys and images', async () => {
  const defaults = JSON.parse(
    await readFile(new URL('../src/data/content-defaults.json', import.meta.url))
  );
  const upload = async (path, alt) => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: `image-${path}` },
    alt,
  });
  for (const [schema, values] of [
    [page, defaults.fallbackFrontpage],
    [settings, defaults.fallbackSite],
    [aboutPage, defaults.fallbackAboutPage],
  ]) {
    const converted = await toSanity(values, schema, upload);
    assert.deepEqual(
      await toSanity(converted, schema, upload),
      converted,
      'repeat import must not alter converted fields'
    );
    assert(
      Object.keys(converted).every((key) => schema.fields.some((field) => field.name === key))
    );
    if (schema === page) {
      assert.equal(converted.hero.desktopImage._type, 'image');
      assert.equal(converted.hero.desktopImageSmall, undefined);
      assert.equal(converted.rooftent.gallery[0].image._type, 'image');
      assert(converted.process.steps.every((step) => step._key && step._type === 'object'));
      assert.equal(converted.faq.items.length, values.faq.items.length);
    }
  }
});
