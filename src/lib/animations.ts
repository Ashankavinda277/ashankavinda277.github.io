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
const SHIFT = 12;

/**
 * Keyframes are given explicitly as [from, to] rather than animating toward a
 * single target. Motion would otherwise have to read the start value back out
 * of the CSS `transform: translateY(...)` the stylesheet sets, and animating
 * *to* `transform: 'none'` is not interpolatable at all — which silently
 * leaves the element at opacity 0.
 */
function play(elements: Element[], fromY: number = SHIFT) {
  if (!elements.length) return;
  animate(
    elements,
    { opacity: [0, 1], y: [fromY, 0] },
    {
      duration: DURATION,
      ease: EASE,
      delay: elements.length > 1 ? stagger(STEP) : 0,
    }
  );
}

declare global {
  interface Window {
    __animReady?: boolean;
  }
}

export function initAnimations(): void {
  const root = document.documentElement;

  // .anim is set by the inline head script only when motion is permitted.
  if (!root.classList.contains('anim')) return;

  try {
    // Split by direction: "down" enters from above (the navbar), the rest rise.
    play(Array.from(document.querySelectorAll('[data-reveal="now"]')), SHIFT);
    play(Array.from(document.querySelectorAll('[data-reveal="down"]')), -SHIFT);

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
        // 'some' rather than a ratio: intersectionRatio is visible ÷ total, so
        // any element taller than the viewport can never reach a threshold and
        // would stay hidden forever. The negative bottom margin is what delays
        // the trigger until the element is properly on screen.
        { amount: 'some', margin: '0px 0px -12% 0px' }
      );
    });

    // Tells the failsafe in BaseLayout that the gate is being handled.
    window.__animReady = true;
  } catch (err) {
    // Never leave the page hidden behind a broken animation.
    root.classList.remove('anim');
    console.error('[animations] disabled after failure:', err);
  }
}
