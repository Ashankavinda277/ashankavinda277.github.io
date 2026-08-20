import { animate, inView, stagger } from 'motion';

/**
 * Page-level reveals, driven by Motion One's vanilla API so they cost no
 * React island. Interactive widgets (skills carousel, exploring panel,
 * command palette) keep using motion/react, where animation follows
 * component state rather than scroll position.
 *
 * Markup opts in with a single attribute:
 *   data-reveal          fade up when scrolled into view
 *   data-reveal="now"    fade up immediately (above the fold)
 *   data-reveal="down"   drop in from above immediately (navbar)
 *   data-stagger         on a parent: its reveals run as one staggered group
 */

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const DURATION = 0.5;
const STEP = 0.07;

const SHOWN = { opacity: 1, transform: 'none' };

function play(elements: Element[]) {
  if (!elements.length) return;
  animate(elements, SHOWN, {
    duration: DURATION,
    ease: EASE,
    delay: elements.length > 1 ? stagger(STEP) : 0,
  });
}

export function initAnimations(): void {
  // .anim is set by the inline head script only when motion is permitted.
  if (!document.documentElement.classList.contains('anim')) return;

  const immediate = Array.from(
    document.querySelectorAll('[data-reveal="now"], [data-reveal="down"]')
  );
  play(immediate);

  // Group scroll reveals by their nearest [data-stagger] ancestor so siblings
  // (project cards, spec columns) animate as one sequence rather than
  // independently as each crosses the threshold.
  const groups = new Map<Element, Element[]>();
  document
    .querySelectorAll('[data-reveal]:not([data-reveal="now"]):not([data-reveal="down"])')
    .forEach((el) => {
      const key = el.closest('[data-stagger]') ?? el;
      const bucket = groups.get(key);
      if (bucket) bucket.push(el);
      else groups.set(key, [el]);
    });

  groups.forEach((elements, trigger) => {
    let played = false;
    inView(
      trigger,
      () => {
        if (played) return;
        played = true;
        play(elements);
      },
      { amount: 0.15 }
    );
  });
}
