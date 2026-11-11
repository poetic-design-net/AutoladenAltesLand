import test from 'node:test';
import assert from 'node:assert/strict';
import { processRoute } from '../src/lib/process.ts';

test('five steps reproduce the established road and stop positions', () => {
  const route = processRoute(5);
  assert.equal(
    route.path,
    'M100 80 C180 80 220 40 300 40 S420 70 500 70 S620 35 700 35 S820 75 900 75'
  );
  assert.deepEqual(
    route.stops.map(({ x, y }) => [x, y]),
    [
      [10, 0.667],
      [30, 0.333],
      [50, 0.583],
      [70, 0.292],
      [90, 0.625],
    ]
  );
  assert.deepEqual(
    route.stops.map((s) => s.icon),
    ['chat', 'sliders', 'car', 'shield', 'steering']
  );
});

test('three and four steps stay inside the drawing area and end at the destination', () => {
  for (const count of [3, 4]) {
    const route = processRoute(count);
    assert.equal(route.stops.length, count);
    assert.equal(route.stops.at(-1).icon, 'steering');
    const numbers = route.path.match(/-?\d+(\.\d+)?/g).map(Number);
    assert.ok(
      numbers.every((n) => n >= 0 && n <= 1000),
      route.path
    );
    const xs = route.stops.map((s) => s.x);
    assert.deepEqual(
      xs,
      [...xs].sort((a, b) => a - b)
    );
  }
});

test('an unexpected step count still yields one stop per step', () => {
  assert.equal(processRoute(6).stops.length, 6);
  assert.equal(processRoute(1).path, '');
});
