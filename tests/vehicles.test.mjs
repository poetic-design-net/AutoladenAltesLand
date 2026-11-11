import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { toVehicle, vehicleDescription } from '../src/lib/vehicle-view.ts';

const url = (image, width, height) => `img:${image}:${width}x${height}`;
const copy = { priceLabel: 'Kaufpreis', seoText: 'Jetzt anfragen.' };

test('a vehicle without a price carries no price text', () => {
  const v = toVehicle({ id: 'ducato', name: 'Fiat Ducato', discount: 'Bis zu 42 % Nachlass' }, url);
  assert.equal(v.price.value, '');
  assert.equal(v.discount, 'Bis zu 42 % Nachlass');
  assert.equal(v.image, '');
  assert.equal(v.thumb, '');
  assert.equal(v.topic, 'firma');
});

test('images get a detail size and a smaller card size', () => {
  const v = toVehicle(
    { id: 'a', name: 'A', image: 'x', price: '9.900 €', ctaLabel: 'A anfragen' },
    url
  );
  assert.equal(v.image, 'img:x:1200x800');
  assert.equal(v.thumb, 'img:x:640x400');
  assert.equal(v.price.value, '9.900 €');
  assert.equal(v.ctaLabel, 'A anfragen');
});

test('meta description names the discount and never a missing price', () => {
  const base = {
    name: 'Fiat Ducato',
    features: ['Lieferung inklusive'],
    price: { value: '', terms: '' },
  };
  const withDiscount = vehicleDescription({ ...base, discount: 'Bis zu 42 % Nachlass' }, copy);
  assert.equal(
    withDiscount,
    'Fiat Ducato: Lieferung inklusive. Bis zu 42 % Nachlass. Jetzt anfragen.'
  );
  assert.doesNotMatch(
    vehicleDescription({ ...base, features: [] }, copy),
    /Kaufpreis|Preis auf Anfrage|: \./
  );
  assert.match(
    vehicleDescription({ ...base, price: { value: '9.900 €', terms: '' } }, copy),
    /Kaufpreis 9\.900 €\./
  );
});

test('default tiles carry no invented price or image', async () => {
  const defaults = JSON.parse(
    await readFile(new URL('../src/data/vehicle-defaults.json', import.meta.url), 'utf8')
  );
  assert.equal(defaults.length, 8);
  for (const v of defaults) {
    assert.equal(v.price, undefined);
    assert.equal(v.image, undefined);
    assert.match(v.id, /^[a-z0-9-]+$/);
  }
});
