import test from 'node:test';
import assert from 'node:assert/strict';
import {
  campaignParameters,
  campaignRecord,
  trackingId,
  safePagePath,
  linkDetails,
  safeEventParameters,
} from '../src/lib/tracking.ts';

test('campaigns allow only named labels, not query-string PII or click IDs', () => {
  assert.deepEqual(
    campaignParameters(
      '?utm_source=instagram&utm_medium=social&utm_campaign=Herbst%202026&email=test@example.com&gclid=secret'
    ),
    { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'Herbst 2026' }
  );
  assert.deepEqual(campaignParameters('?utm_content=test%40example.com&utm_term=491751234567'), {});
  assert.deepEqual(
    campaignRecord({
      utm_source: 'instagram',
      utm_medium: { toString: 'broken' },
      email: 'test@example.com',
    }),
    { utm_source: 'instagram' }
  );
});
test('contact destinations never reveal phone numbers or email addresses', () => {
  const origin = 'https://www.autoladen-altesland.de';
  assert.deepEqual(linkDetails('tel:+491751234567', origin), {
    action: 'contact',
    contact_method: 'phone',
  });
  assert.deepEqual(linkDetails('mailto:private@example.com', origin), {
    action: 'contact',
    contact_method: 'email',
  });
  assert.deepEqual(linkDetails('https://wa.me/491751234567?text=private', origin), {
    action: 'contact',
    contact_method: 'whatsapp',
  });
  assert.deepEqual(linkDetails('https://google.com/maps?author=private', origin), {
    action: 'outbound',
    destination: 'google.com',
  });
});
test('internal routes strip arbitrary parameters while preserving vehicle identity', () => {
  assert.deepEqual(
    linkDetails(
      '/fahrzeuge/test-auto?email=private@example.com',
      'https://www.autoladen-altesland.de'
    ),
    { action: 'vehicle_view', destination: '/fahrzeuge/test-auto', vehicle_id: 'test-auto' }
  );
  assert.equal(safePagePath('/?reach=private'), ' /'.trim());
  assert.equal(safePagePath('/unexpected/private@example.com'), '/other');
  assert.equal(trackingId('<script>'), '');
});
test('event payload cannot include form values or an arbitrary URL', () => {
  assert.deepEqual(
    safeEventParameters({
      cta_id: 'hero_contact',
      reach: '491751234567',
      message: 'private',
      name: 'Test',
      destination: 'https://example.com?email=test',
      form_source: 'hero_contact',
    }),
    { cta_id: 'hero_contact', form_source: 'hero_contact' }
  );
});
