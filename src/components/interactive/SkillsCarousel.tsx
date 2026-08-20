import { useState } from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SkillCategory } from '@/data/skills';
import { badgeClass } from '@/components/ui/badgeStyles';
import { buttonClass } from '@/components/ui/buttonStyles';

type Slot = 'active' | 'left' | 'right' | 'offLeft' | 'offRight';

type SlotState = TargetAndTransition;

const SLOTS: Record<Slot, SlotState> = {
  active: { x: '0%', scale: 1.05, rotateY: 0, rotateZ: 0, opacity: 1, zIndex: 30 },
  left: { x: '-75%', scale: 0.84, rotateY: 20, rotateZ: -3, opacity: 1, zIndex: 10 },
  right: { x: '75%', scale: 0.84, rotateY: -20, rotateZ: 3, opacity: 1, zIndex: 10 },
  offLeft: { x: '-140%', scale: 0.6, rotateY: 24, rotateZ: -3, opacity: 0, zIndex: 0 },
  offRight: { x: '140%', scale: 0.6, rotateY: -24, rotateZ: 3, opacity: 0, zIndex: 0 },
};

/**
 * Side cards recede by converging toward the section background rather than
 * toward black. Darkening a white card on a white page reads as dirt, not
 * distance; a scrim tinted with --surface works in both themes.
 */
const SCRIM: Record<Slot, number> = {
  active: 0,
  left: 0.55,
  right: 0.55,
  offLeft: 0.55,
  offRight: 0.55,
};

function slotFor(index: number, activeIndex: number, total: number): Slot {
  let diff = index - activeIndex;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  if (diff === 0) return 'active';
  if (diff === -1) return 'left';
  if (diff === 1) return 'right';
  return diff < 0 ? 'offLeft' : 'offRight';
}

interface SkillsCarouselProps {
  categories: SkillCategory[];
}

export function SkillsCarousel({ categories }: SkillsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const total = categories.length;
  if (total === 0) return null;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  // Rotation is the vestibular offender; the offset composition is not, so
  // reduced motion flattens the cards and snaps rather than dropping the look.
  const flatten = (s: SlotState): SlotState =>
    shouldReduceMotion ? { ...s, rotateY: 0, rotateZ: 0 } : s;

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.25, 1, 0.5, 1] as const };

  const activeCategory = categories[activeIndex];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Skill categories"
      onKeyDown={handleKeyDown}
      className="relative mx-auto w-full space-y-8"
    >
      <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden sm:h-[400px]">
        {/* Perspective must sit on the cards' direct parent to foreshorten them. */}
        <div
          className="relative h-[320px] w-[300px] sm:h-[340px] sm:w-[440px]"
          style={{ perspective: '1400px' }}
        >
          {categories.map((category, idx) => {
            const slot = slotFor(idx, activeIndex, total);
            const isActive = slot === 'active';
            const isOff = slot === 'offLeft' || slot === 'offRight';
            const state = flatten(SLOTS[slot]);

            return (
              <motion.button
                key={category.title}
                type="button"
                // Serialised into the SSR markup so the static page already
                // shows the coverflow instead of five stacked cards.
                initial={state}
                animate={state}
                transition={transition}
                onClick={() => setActiveIndex(idx)}
                inert={isOff}
                aria-current={isActive || undefined}
                aria-label={isActive ? undefined : `Show ${category.title} skills`}
                className={`absolute inset-0 flex flex-col rounded-card border bg-card p-6 text-left transition-colors sm:p-8 ${
                  isActive
                    ? 'cursor-default border-foreground/20'
                    : isOff
                      ? 'pointer-events-none border-border'
                      : 'cursor-pointer border-border hover:border-foreground/20'
                }`}
              >
                <span className="flex min-h-0 flex-1 flex-col" aria-hidden={!isActive || undefined}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="block text-lg font-semibold tracking-tight text-foreground">
                      {category.title}
                    </span>
                    <span className={badgeClass({ variant: 'outline', className: 'shrink-0' })}>
                      {category.skills.length}
                    </span>
                  </span>

                  <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </span>

                  {/* my-auto splits the slack symmetrically so short categories
                      read as composed rather than unfinished. */}
                  <span className="my-auto flex flex-wrap gap-2 pt-4">
                    {category.skills.map((skill) => (
                      <span key={skill} className={badgeClass()}>
                        {skill}
                      </span>
                    ))}
                  </span>
                </span>

                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 rounded-card bg-surface"
                  initial={{ opacity: SCRIM[slot] }}
                  animate={{ opacity: SCRIM[slot] }}
                  transition={transition}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous category"
          className={buttonClass({ variant: 'secondary', size: 'sm', className: 'px-2.5' })}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {categories.map((category, idx) => (
            <button
              key={category.title}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${category.title}`}
              aria-current={idx === activeIndex || undefined}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-foreground'
                  : 'w-2.5 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next category"
          className={buttonClass({ variant: 'secondary', size: 'sm', className: 'px-2.5' })}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {activeCategory ? `${activeCategory.title}, ${activeIndex + 1} of ${total}` : ''}
      </div>
    </div>
  );
}
