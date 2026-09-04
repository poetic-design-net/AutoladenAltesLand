const slider = document.getElementById('vehicle-slider');
const controls = document.querySelector<HTMLElement>('[data-slider-controls]');
const previous = document.querySelector<HTMLButtonElement>('[data-slider-prev]');
const next = document.querySelector<HTMLButtonElement>('[data-slider-next]');

if (slider && controls && previous && next) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const cards = () => [...slider.querySelectorAll<HTMLElement>('.ocard')];
  const maxScroll = () => Math.max(0, slider.scrollWidth - slider.clientWidth);
  const update = () => {
    const maximum = maxScroll();
    controls.hidden = maximum <= 2;
    previous.disabled = slider.scrollLeft <= 2;
    next.disabled = slider.scrollLeft >= maximum - 2;
  };
  const goTo = (left: number) => {
    slider.scrollTo({
      left: Math.max(0, Math.min(left, maxScroll())),
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  };
  const move = (direction: number) => {
    const items = cards();
    if (!items.length) return;
    const origin = items[0].getBoundingClientRect().left;
    const stops = items.map((card) => card.getBoundingClientRect().left - origin);
    const destination =
      direction > 0
        ? (stops.find((stop) => stop > slider.scrollLeft + 2) ?? maxScroll())
        : (stops.reverse().find((stop) => stop < slider.scrollLeft - 2) ?? 0);
    goTo(destination);
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  slider.addEventListener('keydown', (event) => {
    // Links retain their normal Enter/Tab behavior. Arrow keys only control the focused track.
    if (event.target !== slider || event.altKey || event.ctrlKey || event.metaKey) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(maxScroll());
    else move(event.key === 'ArrowRight' ? 1 : -1);
  });
  slider.addEventListener('scroll', update, { passive: true });
  const observer = new ResizeObserver(update);
  observer.observe(slider);
  cards().forEach((card) => observer.observe(card));
  // Supports content refreshed in-place without assuming a fixed number of vehicles.
  new MutationObserver(() => {
    observer.disconnect();
    observer.observe(slider);
    cards().forEach((card) => observer.observe(card));
    update();
  }).observe(slider, { childList: true });
  update();
}
