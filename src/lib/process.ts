/** Road layout for the process section: one waypoint per step, at its column centre. */
export type StepIcon = 'chat' | 'sliders' | 'car' | 'shield' | 'steering';

const VIEW_W = 1000;
const VIEW_H = 120;
// Waypoint heights inside the 120-unit viewBox; the five-step row is the original design.
const HEIGHTS: Record<number, number[]> = {
  3: [80, 40, 75],
  4: [80, 40, 70, 35],
  5: [80, 40, 70, 35, 75],
};
const ICONS: Record<number, StepIcon[]> = {
  3: ['chat', 'car', 'steering'],
  4: ['chat', 'car', 'shield', 'steering'],
  5: ['chat', 'sliders', 'car', 'shield', 'steering'],
};
const f = (value: number) => String(Math.round(value * 10) / 10);

export function processRoute(count: number) {
  const n = Math.max(1, Math.floor(Number(count)) || 1);
  // ponytail: the CMS allows 3–5 steps; other counts get a plain zigzag instead of a crash.
  const heights = HEIGHTS[n] ?? Array.from({ length: n }, (_, i) => (i % 2 ? 40 : 80));
  const icons =
    ICONS[n] ??
    heights.map((_, i): StepIcon => (i === 0 ? 'chat' : i === n - 1 ? 'steering' : 'car'));
  const handle = (VIEW_W / n) * 0.4;
  const xs = heights.map((_, i) => ((2 * i + 1) * VIEW_W) / (2 * n));
  const stops = heights.map((h, i) => ({
    x: Math.round(xs[i] * 10) / 100,
    y: Math.round((h / VIEW_H) * 1000) / 1000,
    icon: icons[i],
  }));
  const path =
    n < 2
      ? ''
      : `M${f(xs[0])} ${heights[0]} C${f(xs[0] + handle)} ${heights[0]} ${f(xs[1] - handle)} ${heights[1]} ${f(xs[1])} ${heights[1]}` +
        heights
          .slice(2)
          .map((h, k) => ` S${f(xs[k + 2] - handle)} ${h} ${f(xs[k + 2])} ${h}`)
          .join('');
  return { stops, path };
}
