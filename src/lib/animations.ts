import { animate, inView } from 'motion';

/**
 * Page-level reveals, driven by Motion One's vanilla API so they cost no
 * React island. Interactive widgets (skills carousel, exploring panel,
 * command palette) keep using motion/react, where animation follows
 * component state rather than scroll position.
 *
 * Two independent attributes:
 *   data-reveal="<type>"  what the motion is    (default "up")
 *   data-reveal-now       run on load instead of on scroll
 *   data-stagger          on a parent: its reveals run as one staggered group
 *
 * Types: up | down | left | right | zoom | mask | rule
 *   mask  slides up from inside an overflow-hidden parent — the type itself
 *         stays opaque and is uncovered rather than faded in.
 *   rule  a hairline drawing out from its left edge.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.6;
const STEP = 0.08;
const SHIFT = 20;

type Keyframes = {
  opacity?: number[];
  y?: (number | string)[];
  x?: number[];
  scale?: number[];
  scaleX?: number[];
};

function keyframesFor(type: string): Keyframes {
  switch (type) {
    // Uncovered, not faded: opacity stays 1 so the letterforms slide up
    // cleanly behind the mask instead of ghosting through it.
    case 'mask':
      return { y: ['100%', '0%'] };
    case 'rule':
      return { scaleX: [0, 1] };
    case 'down':
      return { opacity: [0, 1], y: [-SHIFT, 0] };
    case 'left':
      return { opacity: [0, 1], x: [-24, 0] };
    case 'right':
      return { opacity: [0, 1], x: [24, 0] };
    case 'zoom':
      return { opacity: [0, 1], scale: [0.94, 1] };
    default:
      return { opacity: [0, 1], y: [SHIFT, 0], scale: [0.98, 1] };
  }
}

function playGroup(elements: Element[]) {
  if (!elements.length) return;

  elements.forEach((el, index) => {
    const type = el.getAttribute('data-reveal') || 'up';
    // Rules read better drawn a touch slower than the type they sit beside.
    const duration = type === 'rule' ? DURATION * 1.3 : DURATION;

    animate(el, keyframesFor(type), {
      duration,
      ease: EASE,
      delay: index * STEP,
    });
  });
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
    // Above the fold: play in document order so the hero arrives as a sequence.
    playGroup(Array.from(document.querySelectorAll('[data-reveal-now]')));

    // Group scroll reveals by their nearest [data-stagger] ancestor so siblings
    // cascade together instead of each tripping its own observer.
    const groups = new Map<Element, Element[]>();
    document
      .querySelectorAll('[data-reveal]:not([data-reveal-now])')
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
          playGroup(elements);
        },
        // 'some' rather than a ratio: intersectionRatio is visible ÷ total, so
        // any element taller than the viewport can never reach a threshold and
        // would stay hidden forever.
        { amount: 'some', margin: '0px 0px -10% 0px' }
      );
    });

    window.__animReady = true;
  } catch (err) {
    root.classList.remove('anim');
    console.error('[animations] disabled after failure:', err);
  }
}
