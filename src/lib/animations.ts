import { animate, inView } from 'motion';

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
 *   data-reveal="left" / "right" / "zoom"  directional reveals
 *   data-stagger         on a parent: its reveals run as one staggered group
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.6;
const STEP = 0.08;
const SHIFT = 20;

function playGroup(elements: Element[]) {
  if (!elements.length) return;
  
  elements.forEach((el, index) => {
    const type = el.getAttribute('data-reveal') || 'up';
    let keyframes: { opacity: number[]; y?: number[]; x?: number[]; scale?: number[] } = {
      opacity: [0, 1],
    };

    if (type === 'down') {
      keyframes.y = [-SHIFT, 0];
    } else if (type === 'left') {
      keyframes.x = [-24, 0];
    } else if (type === 'right') {
      keyframes.x = [24, 0];
    } else if (type === 'zoom') {
      keyframes.scale = [0.94, 1];
    } else {
      keyframes.y = [SHIFT, 0];
      keyframes.scale = [0.98, 1];
    }

    animate(el, keyframes, {
      duration: DURATION,
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
    // Above fold reveals
    playGroup(Array.from(document.querySelectorAll('[data-reveal="now"]')));
    playGroup(Array.from(document.querySelectorAll('[data-reveal="down"]')));

    // Group scroll reveals by their nearest [data-stagger] ancestor
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
          playGroup(elements);
        },
        { amount: 'some', margin: '0px 0px -10% 0px' }
      );
    });

    window.__animReady = true;
  } catch (err) {
    root.classList.remove('anim');
    console.error('[animations] disabled after failure:', err);
  }
}
