import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { vitaItems } from '../src/lib/vita.ts';
import aboutSchema from '../studio/schemas/aboutPage.js';
import { fillMissing, toSanity } from '../studio/import-utils.mjs';

test('vita retains editorial order and skips incomplete CMS records', () => {
  const item = {
    period: ' 2020–2024 ',
    title: ' Station A ',
    description: ' A real description. ',
  };
  assert.deepEqual(
    vitaItems([null, {}, item, { ...item, title: 'Station B' }, { ...item, period: '' }]),
    [
      {
        period: '2020–2024',
        title: 'Station A',
        description: 'A real description.',
        role: '',
        location: '',
      },
      {
        period: '2020–2024',
        title: 'Station B',
        description: 'A real description.',
        role: '',
        location: '',
      },
    ]
  );
  assert.deepEqual(vitaItems(null), []);
  assert.deepEqual(vitaItems('invalid'), []);
});

test('vita import adds no fabricated career and preserves authored stations and visibility', async () => {
  const { fallbackAboutPage } = JSON.parse(
    await readFile(new URL('../src/data/content-defaults.json', import.meta.url))
  );
  assert.deepEqual(fallbackAboutPage.vita.items, []);
  const authored = {
    vita: {
      enabled: false,
      heading: 'My history',
      items: [
        { _key: 'keep-me', period: '2020–2024', title: 'Station A', description: 'My story' },
      ],
    },
  };
  const upload = async () => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: 'image-test' },
  });
  const converted = await toSanity(fillMissing(authored, fallbackAboutPage), aboutSchema, upload);
  assert.equal(converted.vita.enabled, false);
  assert.equal(converted.vita.heading, 'My history');
  assert.equal(converted.vita.items.length, 1);
  assert.equal(converted.vita.items[0]._key, 'keep-me');
  assert.equal(converted.vita.items[0].description, 'My story');
  assert.deepEqual(await toSanity(converted, aboutSchema, upload), converted);
});
